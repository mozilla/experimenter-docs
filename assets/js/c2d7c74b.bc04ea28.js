"use strict";(self.webpackChunkexperimenter_docs=self.webpackChunkexperimenter_docs||[]).push([[761],{3905:(e,n,t)=>{t.d(n,{Zo:()=>g,kt:()=>d});var r=t(7294);function s(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){s(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function a(e,n){if(null==e)return{};var t,r,s=function(e,n){if(null==e)return{};var t,r,s={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||(s[t]=e[t]);return s}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(s[t]=e[t])}return s}var l=r.createContext({}),p=function(e){var n=r.useContext(l),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},g=function(e){var n=p(e.components);return r.createElement(l.Provider,{value:n},e.children)},m="mdxType",c={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},u=r.forwardRef((function(e,n){var t=e.components,s=e.mdxType,o=e.originalType,l=e.parentName,g=a(e,["components","mdxType","originalType","parentName"]),m=p(t),u=s,d=m["".concat(l,".").concat(u)]||m[u]||c[u]||o;return t?r.createElement(d,i(i({ref:n},g),{},{components:t})):r.createElement(d,i({ref:n},g))}));function d(e,n){var t=arguments,s=n&&n.mdxType;if("string"==typeof e||s){var o=t.length,i=new Array(o);i[0]=u;var a={};for(var l in n)hasOwnProperty.call(n,l)&&(a[l]=n[l]);a.originalType=e,a[m]="string"==typeof e?e:s,i[1]=a;for(var p=2;p<o;p++)i[p]=t[p];return r.createElement.apply(null,i)}return r.createElement.apply(null,t)}u.displayName="MDXCreateElement"},3678:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>i,default:()=>c,frontMatter:()=>o,metadata:()=>a,toc:()=>p});var r=t(7462),s=(t(7294),t(3905));const o={id:"messaging-journey",title:"Desktop Messaging Journey",slug:"/messaging/desktop-messaging-journey",sidebar_position:6},i=void 0,a={unversionedId:"workflow/implementing/messaging/messaging-journey",id:"workflow/implementing/messaging/messaging-journey",title:"Desktop Messaging Journey",description:"From inception to launch, a message goes through the below three steps for Firefox Desktop:",source:"@site/docs/workflow/implementing/messaging/desktop-messaging-journey.md",sourceDirName:"workflow/implementing/messaging",slug:"/messaging/desktop-messaging-journey",permalink:"/messaging/desktop-messaging-journey",draft:!1,editUrl:"https://github.com/mozilla/experimenter-docs/edit/main/docs/workflow/implementing/messaging/desktop-messaging-journey.md",tags:[],version:"current",sidebarPosition:6,frontMatter:{id:"messaging-journey",title:"Desktop Messaging Journey",slug:"/messaging/desktop-messaging-journey",sidebar_position:6},sidebar:"sidebar",previous:{title:"Desktop Messaging Surfaces",permalink:"/messaging/desktop-messaging-surfaces"},next:{title:"Mobile Messaging",permalink:"/messaging/mobile-messaging"}},l={},p=[{value:"Message Design",id:"message-design",level:2},{value:"Running an Experiment",id:"running-an-experiment",level:2},{value:"Message in Firefox",id:"message-in-firefox",level:2}],g={toc:p},m="wrapper";function c(e){let{components:n,...t}=e;return(0,s.kt)(m,(0,r.Z)({},g,t,{components:n,mdxType:"MDXLayout"}),(0,s.kt)("p",null,"From inception to launch, a message goes through the below three steps for Firefox Desktop:"),(0,s.kt)("h2",{id:"message-design"},"Message Design"),(0,s.kt)("p",null,"Once an idea has been developed, the next step is designing the experiment message. A good place to start for some inspiration, is to look through previous messaging system experiments (Examples in Source doc) as well as looking into the available capabilities through the  ",(0,s.kt)("a",{parentName:"p",href:"/messaging/desktop-messaging-surfaces"},"Messaging Surfaces"),". The OMC team has vast experience with running these experiments and can provide feedback and answer any questions in the #omc Slack channel. "),(0,s.kt)("h2",{id:"running-an-experiment"},"Running an Experiment"),(0,s.kt)("p",null,"First, determine if your experiment will require any on-train development work to support the launch as well as any translated strings that need to land prior. Once that\u2019s been determined, we can get started with creating the experiment.\nFor a more in-depth guide and step by step process, visit ",(0,s.kt)("a",{parentName:"p",href:"https://mozilla-hub.atlassian.net/wiki/spaces/FIREFOX/pages/233406786/OMC+Experimenter+Onboarding"},"OMC: Experimenter onboarding document")),(0,s.kt)("h2",{id:"message-in-firefox"},"Message in Firefox"),(0,s.kt)("p",null,"Once the experiment has successfully concluded and analysis shows promising results, we can land the new message in tree. Depending on the messaging surface, the following files is where the JSON for our different messages exists"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre"},"browser/components/newtab/aboutwelcome/lib/AboutWelcomeDefaults.jsm\nbrowser/components/newtab/lib/FeatureCalloutMessages.jsm\nbrowser/components/newtab/lib/OnboardingMessageProvider.jsm\n")),(0,s.kt)("p",null,"Visit ",(0,s.kt)("a",{parentName:"p",href:"https://firefox-source-docs.mozilla.org/browser/components/newtab/docs/index.html"},"Firefox Source docs"),": newtab for details on how to develop within our components."))}c.isMDXComponent=!0}}]);