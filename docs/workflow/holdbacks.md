---
id: holdbacks
title: Holdbacks
slug: /workflow/holdbacks
---

How long-term holdbacks are analyzed automatically using the `is_holdback` flag.

## What a holdback is

A holdback keeps a slice of the population on the old experience after a feature ships,
so you can keep measuring the feature's impact over a long period. Unlike a normal
experiment, a holdback enrolls continuously and does not have a planned end date.

That continuous enrollment is what makes holdbacks awkward to analyze. Jetstream expects
an enrollment period followed by an observation period, and a holdback never closes
enrollment, so there is no window to analyze. Historically the way round this was to
hand-write `enrollment_period` and `end_date` into the experiment's Jetstream config and
update them by hand whenever you wanted fresher numbers.

## The `is_holdback` flag

Setting the **is_holdback** flag on an experiment replaces that manual configuration.
Experimenter then synthesizes an analysis window for Jetstream and moves it forward once
a week, so results accumulate on their own.

The window works like this:

- The **observation period** is the last 21 days of the window.
- Everything between the experiment's start date and the beginning of that observation
  period counts as **enrollment**. There must be at least 7 days of it.
- The window ends on the date of the most recent weekly rerun, not on today's date. The
  two are the same on the day a rerun fires and differ on other days. Anchoring on the
  rerun is deliberate: anchoring on today would shift the window by a day every time the
  API is read, instead of stepping cleanly once a week.

Each weekly rerun pushes the window out by another 7 days, so the analysis covers more
time as the holdback runs and you get a cumulative read rather than a fixed snapshot.

Jetstream computes only the **Overall** period for a flagged holdback. There are no
weekly or 28-day breakdowns, because a holdback is long-running by nature.

## When the first results appear

The first rerun fires once the experiment is **28 days old** — 21 days of observation
plus the 7-day minimum enrollment — and then on every 7th day after the start date.

Two details are worth knowing:

- Eligible days are days where the age of the experiment in days is an exact multiple of
  7. This is counted from the start date, not from the previous run, and there is no
  catch-up. If an eligible day is missed, the next opportunity is a week later.
- The job runs daily at **03:00 UTC**. The flag needs to be set before that time on an
  eligible day for that day's run to pick it up.

## When the flag does nothing

The flag only has an effect while a holdback is **still enrolling**. The rolling
enrollment window is the whole mechanism, so it is skipped for an experiment that has
either:

- an end date, or
- an enrollment end date.

In that case the experiment is marked as a holdback but nothing else changes, and there
is no warning. If you have set the flag and no results are appearing, check those two
dates first.

## Do not configure the dates by hand

Once the flag is on, Experimenter owns the enrollment and end dates. Anything in the
experiment's Jetstream config that sets them will override what Experimenter sends and
pin the analysis back to a fixed window, which quietly defeats the flag.

That means, in the experiment's `.toml` in
[metric-hub](https://github.com/mozilla/metric-hub/tree/main/jetstream):

- do not set `enrollment_period` or `end_date`
- avoid a custom `enrollment_query` with a hard-coded date range, which caps enrollment in
  SQL and has the same effect

See [Jetstream configuration](/data-analysis/jetstream/configuration) for the config
format itself.

## Migrating an existing holdback

Holdbacks that were set up before this feature existed are being migrated in stages, and
the owner is contacted before their experiment is changed. If you own one, you will hear
from the Experimentation team first. After the migration, leave the Jetstream config
alone — the flag takes over from there.
