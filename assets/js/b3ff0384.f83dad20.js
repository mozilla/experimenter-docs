"use strict";(self.webpackChunkexperimenter_docs=self.webpackChunkexperimenter_docs||[]).push([[20],{4137:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>m});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=r.createContext({}),p=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},d=function(e){var t=p(e.components);return r.createElement(l.Provider,{value:t},e.children)},u="mdxType",c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},f=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,i=e.originalType,l=e.parentName,d=s(e,["components","mdxType","originalType","parentName"]),u=p(n),f=o,m=u["".concat(l,".").concat(f)]||u[f]||c[f]||i;return n?r.createElement(m,a(a({ref:t},d),{},{components:n})):r.createElement(m,a({ref:t},d))}));function m(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=n.length,a=new Array(i);a[0]=f;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[u]="string"==typeof e?e:o,a[1]=s;for(var p=2;p<i;p++)a[p]=n[p];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}f.displayName="MDXCreateElement"},1861:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>a,default:()=>c,frontMatter:()=>i,metadata:()=>s,toc:()=>p});var r=n(7462),o=(n(7294),n(4137));const i={},a="Introduction",s={unversionedId:"workflow/implementing/desktop-onboarding/onboarding-feature-desktop",id:"workflow/implementing/desktop-onboarding/onboarding-feature-desktop",title:"Introduction",description:"The onboarding feature enables experimentation with the 'new user onboarding flow'. The onboarding flow is presented to the user on each new install and is made up of a series of full screen 'views', referred to as 'cards'. The purpose of the onboarding flow is to enable the user to configure a small number of app enhancing settings. Each card provides context for each setting and the ability to enable/skip.",source:"@site/docs/workflow/implementing/desktop-onboarding/onboarding-feature-desktop.md",sourceDirName:"workflow/implementing/desktop-onboarding",slug:"/workflow/implementing/desktop-onboarding/onboarding-feature-desktop",permalink:"/workflow/implementing/desktop-onboarding/onboarding-feature-desktop",draft:!1,editUrl:"https://github.com/mozilla/experimenter-docs/edit/main/docs/workflow/implementing/desktop-onboarding/onboarding-feature-desktop.md",tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"Types of Risk",permalink:"/types-of-risk"},next:{title:"Experiments & User Messaging",permalink:"/messaging/experiments-and-user-messaging"}},l={},p=[{value:"How do first run experiments work on Windows?",id:"how-do-first-run-experiments-work-on-windows",level:2},{value:"How do first run experiments work on Mac?",id:"how-do-first-run-experiments-work-on-mac",level:2},{value:"Background",id:"background",level:3}],d={toc:p},u="wrapper";function c(e){let{components:t,...n}=e;return(0,o.kt)(u,(0,r.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"introduction"},"Introduction"),(0,o.kt)("p",null,"The onboarding feature enables experimentation with the 'new user onboarding flow'. The onboarding flow is presented to the user on each new install and is made up of a series of full screen 'views', referred to as 'cards'. The purpose of the onboarding flow is to enable the user to configure a small number of app enhancing settings. Each card provides context for each setting and the ability to enable/skip."),(0,o.kt)("p",null,"The onboarding feature enables staff \u2014 most likely experiment owners, product owners, user research and marketing teams to customize each card's:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"title copy\nbody copy\nimagery\nbutton copy\nsequencing\n")),(0,o.kt)("p",null,"At the time of writing, Desktop first run experiments are only supported on Windows.  This note describes what first run experiments are, sketches how first run experiments work on Windows, and suggests approaches for supporting first run experiments on macOS."),(0,o.kt)("p",null,"First run experiments are those that make changes to onboarding, that need data from brand-new clients, or that otherwise relate to clients who are using Firefox on their device for the first time, ",(0,o.kt)("a",{parentName:"p",href:"https://experimenter.info/mobile-first-run-experiments/#how-do-i-know-if-an-experiment-should-be-first-run"},"reference"),"."),(0,o.kt)("h2",{id:"how-do-first-run-experiments-work-on-windows"},"How do first run experiments work on Windows?"),(0,o.kt)("p",null,"Firefox experiments are defined by recipes.  Recipes that might apply to a particular Firefox user are delivered to Firefox via a \u201cpull\u201d -- an HTTP GET request -- from ",(0,o.kt)("a",{parentName:"p",href:"https://firefox.settings.services.mozilla.com"},"Remote Settings"),".  The ",(0,o.kt)("a",{parentName:"p",href:"https://experimenter.services.mozilla.com/nimbus/"},"Experimenter")," system manages the recipes themselves and pushes them to Remote Settings for wider distribution; you can safely think of Remote Settings as a CDN (Content Distribution Network) for efficiently distributing recipes."),(0,o.kt)("p",null,"The initial pull of the experiment recipes is both time consuming and relatively late in Firefox startup.  To avoid the perception of slow Firefox startup, the Windows installer and Firefox coordinate to start Firefox while the installer UI is still present and to only display the Firefox UI (and hide the installer UI) after the initial pull of current experiment recipes is complete.  See the ",(0,o.kt)("a",{parentName:"p",href:"https://firefox-source-docs.mozilla.org/toolkit/modules/toolkit_modules/FirstStartup.html"},"First Startup documentation"),"."),(0,o.kt)("h2",{id:"how-do-first-run-experiments-work-on-mac"},"How do first run experiments work on Mac?"),(0,o.kt)("p",null,"First run experiments are not supported on Mac.  Nick Alexander ",(0,o.kt)("a",{parentName:"p",href:"https://docs.google.com/document/d/1RYoekrHwd5NRqE7mgMSIvkl1l9fhwOpfc2J2S92CwS0/edit"},"explores some of the challenges and possible approaches here"),".  There is considerable engineering and QA work needed.   "),(0,o.kt)("h3",{id:"background"},"Background"),(0,o.kt)("p",null,"The onboarding feature is built on top of Nimbus, Mozilla's experimentation platform. Nimbus allows you to send bits of configuration to application features from Experimenter, the web-application staff use to launch and manage experiments and rollouts."),(0,o.kt)("p",null,"Using Experimenter in the general case is documented elsewhere, so this document is specifically concerned with configuring the onboarding feature.\nReferences"),(0,o.kt)("p",null,"For the most up-to-date configurations, the main code base will always be the best place to check."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"Nimbus manifest\nonboarding feature manifest\n")),(0,o.kt)("p",null,"Creating an experiment"),(0,o.kt)("p",null,"Only values that differ from the default card(s) needs providing by the Experimenter. E.g:\nExisting default card"),(0,o.kt)("p",null,"(add example)"),(0,o.kt)("p",null,"Experimenter card config"),(0,o.kt)("p",null,"(see sample experiments on the ",(0,o.kt)("a",{parentName:"p",href:"https://experimenter.services.mozilla.com/nimbus?applications=DESKTOP&allFeatureConfigs=DESKTOP%3Aaboutwelcome&tab=completed"},"about-welcome feature"),")"))}c.isMDXComponent=!0}}]);