---
id: bucketing
title: Bucketing
slug: /Bucketing
---

**Bucketing** is the process of assigning branches of experiments to users. When a user is “bucketed” into an experiment, it means that the configuration in one of its branches (such as a change to part of the UI) can be activated, and that any interactions we record from that moment on can be associated with the experiment and branch identifier.

For Firefox experiments, we bucket users into experiments client-side using inputs from configuration delivered from a server. Assignment happens during sychronization time v.s. being generated on demand for each feature.

### Which experiments does this apply to?

Experiments launched through Nimbus and Normandy to Desktop, iOS, and Android Firefox. Differences in the implementation or capabilities are noted when relevant.

## Supported Capabilities

- We can randomly assign users to one or more branches of one or more experiments simultaneously.
- We can control interactions between experiments (i.e. ensure experiments don't overlap) if we want to.
- We can specify "targeting" conditions for an experiment, that is, certain characteristics about a client that must be met before the client can be considered a candidate (e.g. region, profile age).
- We can assign users to unevenly distributed branches(e.g. 10% to A, 90% to B)

### Statistical Requirements

In order to support the analysis of controlled experiments, the selected bucketing strategy must satisfy the following requirements. The steps described in the mplementation section should clarify how each of the requirements should be satisfied.

- Assignment of targeted clients to branches is uniformly random with respect to all observables. If we were to look at the set of users for each branch (where unique users are identified by the randomization unit), we should see roughly the same distribution of locale, location, profile age, etc.
- Branch assignment must not depend on anything the user can influence.
- Actual enrollment is probabilistically equal to the percentage of total traffic allocated to that branch. e.g. If we configured an experiment with two equal branches to enroll 10% of the population, we should see 5% of the total population enroll in each branch.
- Enrollment in a branch is deterministic. Given the same experiment configuration, interaction rules, and user identifier, the result should always be the same. Shipping a new experiment must not change the basis for assigning a client to a branch.
- Enrollment in a branch is persistent. Once a user is bucketed into a branch, they should continue to see the same branch for the duration of the experiment.
- We should be able to control undesired interactions between experiments based on the specific requirements of our system. For example, as a first step, we can’t enroll users in more than one branch that contains configuration for the same feature.

## Implementation

### Overview

Note that "Experimenter" is the server-side application that defines experiments and delivers them to Firefox clients. Technically definitions come from Normandy

1. A user creates an experiment in **Experimenter** with (a) an overall population percentage to three decimal places (b) a set of branches, each with a "ratio" (the default is `1`). The experiment can also include targeting, e.g. only clients in the US region.
2. The server allocates a "bucket rage" configuration for the experiment, which includes a namespace and a range between `0` and `10 000` representing the population percentage.
3. The experiment is added to the set of live experiments and synchronized to clients.
4. When a Firefox client revieves a new experiment configuration, the experiment SDK takes a hash of the namespace, the experimenter identifier, and a unique identifier for that client (see [Randomization Unit](#randomization-unit)) and determines if the result falls in the given range.
5. If the client is assigned to the experiment, a branch is randomly assigned based on the ratios configured for the branch.
6. The client is enrolled; the correct feature value is returned (or for Normandy, prefs are set) and an enrollment event is sent.

### Randomization Unit

Bucketing uses a unique identifier (the `normandy_id`" on desktop, the `nimbus_id` on mobile) generated at startup.

See [Desktop implementation](https://searchfox.org/mozilla-central/source/toolkit/components/utils/ClientEnvironment.jsm#99).

### Hashing function
