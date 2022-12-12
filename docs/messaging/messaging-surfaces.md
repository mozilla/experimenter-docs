---
id: messaging-surfaces
title: Messaging Surfaces
slug: /messaging/messaging-surfaces
---

The following messaging surfaces are currently remotely available in Firefox Desktop, meaning that you create new messages *without* shipping code changes.

## Doorhanger
<img src="/img/messaging/doorhanger.png" alt="Example of doorhanger component" className="img-sm"/>
<br/>
The doorhanger has to be anchored to a UI element such as the application menu, the identity panel, and so on.

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
This type of message is a URL that the browser will open at the start of the browsing session and will focus on that tab.
These pages appears on start-up as a full content page.

## PrivateBrowsing
<img src="/img/messaging/privatebrowsing.png" alt="Example of private browsing message" />
<br/>
Messages shown inside about:privatebrowsing content area when new private window is opened.

## Snippets
<img src="/img/messaging/snippets.png" alt="Example of snippets component" />
<br/>
Short messages that appear on New Tab Page to highlight products, features and initiatives

## Spotlight
<img src="/img/messaging/spotlight.png" alt="Example of spotlight component" className="img-sm" />
<br/>
This is a window level modal, all other interactions are prevented. The user is given a primary and a secondary button to interact with the modal.
