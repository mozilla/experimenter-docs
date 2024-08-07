---
id: messaging-surfaces
title: Desktop Messaging Surfaces
slug: /messaging/desktop-messaging-surfaces
sidebar_position: 5
---

The following messaging surfaces are currently remotely available in Firefox Desktop, meaning that you create new messages *without* shipping code changes.

## Doorhanger
<img src="/img/messaging/doorhanger.png" alt="Example of doorhanger component" className="img-sm-left"/> <img src="/img/messaging/doorhanger-with-icon.png" alt="Example of doorhanger component" className="img-sm"/>
<br/>
Doorhangers, also known as Contextual Feature Recommendation Panels, are anchored to a UI element such as the application menu, the identity panel, the Firefox View tab, and so on. They can include a configurable icon beside the title. Doorhangers do not reappear once the primary action button is clicked, irrespective of any frequency caps on the message. Clicking the primary button adds the message id to a block list and its messaging system impression are cleared.

## Feature Callouts
<img src="/img/messaging/feature-callout-ffv.png" alt="Example of feature callout in Firefox View with image and top center arrow" className="img-sm-left"/>
<img src="/img/messaging/feature-callout-pdf.png" alt="Example of feature callout in the PDF viewer with upper right arrow" className="img-sm"/>
<br/>
Feature Callouts point to and describe features in content pages or the browser chrome. Multiple messages can be used to create feature tours. The callout element is embedded in the page content and does not block other interactions. Callouts may be configured with a primary action and an optional dismiss button. The arrow can be positioned in the middle of one of the callout’s sides or either of its top corners. This surface is currently only available for Firefox View and the PDF viewer.

## Infobar
<img src="/img/messaging/infobar.png" alt="Example of infobar component" />
<br/>
Shown at the top of browser content area, these can be per tab (switching tabs hides it) or global (persistent across tabs).

## Moments Pages
<img src="/img/messaging/moments-page.png" alt="Example of a Moments Page" />
<br/>
This type of message is a URL that the browser will open at the start of the browsing session and will focus on that tab.
These pages appears on start-up as a full content page.

## PrivateBrowsing
<img src="/img/messaging/privatebrowsing.png" alt="Example of private browsing message" />
<br/>
Messages shown inside about:privatebrowsing content area when new private window is opened.

## Snippets
<img src="/img/messaging/snippets.png" alt="Example of snippets component"/>
<br/>
Short messages that appear on New Tab Page to highlight products, features and initiatives

## Multistage Spotlight
<img src="/img/messaging/spotlight-center-simple.png" alt="Example of spotlight component with single centered screen" className="img-sm-left" />
<img src="/img/messaging/spotlight-qr-app-store.png" alt="Example of spotlight component with centered screen, QR code, email link, and app store buttons" className="img-sm" />
<br/>
<img src="/img/messaging/spotlight-center-noodles.png" alt="Example of spotlight component with centered screen, step indicator, and noodles" className="img-sm-left" />
<img src="/img/messaging/spotlight-center-dark-steps.png" alt="Example of spotlight component with centered screen, step indicator, and noodles in dark mode" className="img-sm" />
<br/>
<img src="/img/messaging/spotlight-split.png" alt="Example of spotlight component with split screen" className="img-sm-left" />
<img src="/img/messaging/spotlight-split-dark-checkbox.png" alt="Example of spotlight component with split screen and checkbox in dark mode" className="img-sm" />
<br/>
This surface can be configured as a window or tab level modal, and all other interactions are prevented. The modal's configuration is highly flexible and may include primary and secondary actions, a logo image, background, dismiss button, localized app store icons, QR code with associated link, checkboxes, decorative noodles, and more. A given message may be configured with multiple screens. Progress through these screens may be displayed as a step indicator or a progress bar. Each screen can use a centered, single panel layout or a split screen layout with an image and/or hero text on one side and all other modal content on the other.


## What's New Page
<img src="/img/messaging/whats-new-page.png" alt="Example of a Whats New Page" />
<br/>

This feature allows us to use Nimbus to override the default evergreen What’s
New Page shown to users enrolled in these experiments. A What's New Page is a
URL to a full content page that the browser will open on the next startup of a
browsing session following a
Firefox version update and will focus on that tab.
The following configuration options are available.

### minVersion
Used to set a minimum Firefox update Version for a user to be eligible to see
the experimental What's New Page.
### maxVersion
Used to set a maximum Firefox update Version for a user to be eligible to see
the experimental What's New Page.
### disableWNP
Blocks all What's New Pages for a user enrolled in the experiment. Used
to compare no-What's New Page control branches to What's New Page treatments.