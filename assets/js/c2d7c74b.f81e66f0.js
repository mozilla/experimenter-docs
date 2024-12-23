"use strict";(self.webpackChunkexperimenter_docs=self.webpackChunkexperimenter_docs||[]).push([[761],{4137:(e,n,t)=>{t.d(n,{Zo:()=>p,kt:()=>d});var r=t(7294);function s(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function a(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){s(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function i(e,n){if(null==e)return{};var t,r,s=function(e,n){if(null==e)return{};var t,r,s={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||(s[t]=e[t]);return s}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(s[t]=e[t])}return s}var l=r.createContext({}),m=function(e){var n=r.useContext(l),t=n;return e&&(t="function"==typeof e?e(n):a(a({},n),e)),t},p=function(e){var n=m(e.components);return r.createElement(l.Provider,{value:n},e.children)},g="mdxType",u={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},c=r.forwardRef((function(e,n){var t=e.components,s=e.mdxType,o=e.originalType,l=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),g=m(t),c=s,d=g["".concat(l,".").concat(c)]||g[c]||u[c]||o;return t?r.createElement(d,a(a({ref:n},p),{},{components:t})):r.createElement(d,a({ref:n},p))}));function d(e,n){var t=arguments,s=n&&n.mdxType;if("string"==typeof e||s){var o=t.length,a=new Array(o);a[0]=c;var i={};for(var l in n)hasOwnProperty.call(n,l)&&(i[l]=n[l]);i.originalType=e,i[g]="string"==typeof e?e:s,a[1]=i;for(var m=2;m<o;m++)a[m]=t[m];return r.createElement.apply(null,a)}return r.createElement.apply(null,t)}c.displayName="MDXCreateElement"},6876:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>a,default:()=>u,frontMatter:()=>o,metadata:()=>i,toc:()=>m});var r=t(7462),s=(t(7294),t(4137));const o={id:"messaging-journey",title:"Desktop Messaging Journey",slug:"/messaging/desktop-messaging-journey",sidebar_position:6},a=void 0,i={unversionedId:"workflow/implementing/messaging/messaging-journey",id:"workflow/implementing/messaging/messaging-journey",title:"Desktop Messaging Journey",description:"From inception to launch, a message goes through the below three steps for Firefox Desktop:",source:"@site/docs/workflow/implementing/messaging/desktop-messaging-journey.md",sourceDirName:"workflow/implementing/messaging",slug:"/messaging/desktop-messaging-journey",permalink:"/messaging/desktop-messaging-journey",draft:!1,editUrl:"https://github.com/mozilla/experimenter-docs/edit/main/docs/workflow/implementing/messaging/desktop-messaging-journey.md",tags:[],version:"current",sidebarPosition:6,frontMatter:{id:"messaging-journey",title:"Desktop Messaging Journey",slug:"/messaging/desktop-messaging-journey",sidebar_position:6},sidebar:"sidebar",previous:{title:"Desktop Messaging Surfaces",permalink:"/messaging/desktop-messaging-surfaces"},next:{title:"Mobile Messaging",permalink:"/messaging/mobile-messaging"}},l={},m=[{value:"Message Design",id:"message-design",level:2},{value:"Running an Experiment",id:"running-an-experiment",level:2},{value:"Message in Firefox",id:"message-in-firefox",level:2}],p={toc:m},g="wrapper";function u(e){let{components:n,...t}=e;return(0,s.kt)(g,(0,r.Z)({},p,t,{components:n,mdxType:"MDXLayout"}),(0,s.kt)("p",null,"From inception to launch, a message goes through the below three steps for Firefox Desktop:"),(0,s.kt)("h2",{id:"message-design"},"Message Design"),(0,s.kt)("p",null,"Once an idea has been developed, the next step is designing the experiment message. A good place to start for some inspiration, is to look through previous messaging system experiments (Examples in Source doc) as well as looking into the available capabilities through the  ",(0,s.kt)("a",{parentName:"p",href:"/messaging/desktop-messaging-surfaces"},"Messaging Surfaces"),". The OMC team has vast experience with running these experiments and can provide feedback and answer any questions in the #omc Slack channel."),(0,s.kt)("h2",{id:"running-an-experiment"},"Running an Experiment"),(0,s.kt)("p",null,"First, determine if your experiment will require any on-train development work to support the launch as well as any translated strings that need to land prior. Once that\u2019s been determined, we can get started with creating the experiment.\nFor a more in-depth guide and step by step process, visit ",(0,s.kt)("a",{parentName:"p",href:"https://mozilla-hub.atlassian.net/wiki/spaces/FIREFOX/pages/233406786/OMC+Experimenter+Onboarding"},"OMC: Experimenter onboarding document")),(0,s.kt)("h2",{id:"message-in-firefox"},"Message in Firefox"),(0,s.kt)("p",null,"Once the experiment has successfully concluded and analysis shows promising results, we can land the new message in tree. Depending on the messaging surface, the following files is where the JSON for our different messages exists"),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("a",{parentName:"li",href:"https://searchfox.org/mozilla-central/source/browser/components/aboutwelcome/modules/AboutWelcomeDefaults.sys.mjs"},(0,s.kt)("inlineCode",{parentName:"a"},"browser/components/aboutwelcome/modules/AboutWelcomeDefaults.sys.mjs"))),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("a",{parentName:"li",href:"https://searchfox.org/mozilla-central/source/browser/components/asrouter/modules/FeatureCalloutMessages.sys.mjs"},(0,s.kt)("inlineCode",{parentName:"a"},"browser/components/asrouter/modules/FeatureCalloutMessages.sys.mjs"))),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("a",{parentName:"li",href:"https://searchfox.org/mozilla-central/source/browser/components/asrouter/modules/OnboardingMessageProvider.sys.mjs"},(0,s.kt)("inlineCode",{parentName:"a"},"browser/components/asrouter/modules/OnboardingMessageProvider.sys.mjs")))),(0,s.kt)("p",null,"Visit ",(0,s.kt)("a",{parentName:"p",href:"https://firefox-source-docs.mozilla.org/browser/components/newtab/docs/index.html"},"Firefox Source docs"),": newtab for details on how to develop within our components."))}u.isMDXComponent=!0}}]);