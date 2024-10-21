"use strict";(self.webpackChunkexperimenter_docs=self.webpackChunkexperimenter_docs||[]).push([[9149],{4137:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>m});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var l=n.createContext({}),c=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},p=function(e){var t=c(e.components);return n.createElement(l.Provider,{value:t},e.children)},u="mdxType",g={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,i=e.originalType,l=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),u=c(r),d=a,m=u["".concat(l,".").concat(d)]||u[d]||g[d]||i;return r?n.createElement(m,o(o({ref:t},p),{},{components:r})):n.createElement(m,o({ref:t},p))}));function m(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=r.length,o=new Array(i);o[0]=d;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[u]="string"==typeof e?e:a,o[1]=s;for(var c=2;c<i;c++)o[c]=r[c];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},7865:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>g,frontMatter:()=>i,metadata:()=>s,toc:()=>c});var n=r(7462),a=(r(7294),r(4137));const i={id:"version-targeting",title:"Targeting dot releases or specific betas",slug:"/targeting/version-targeting"},o=void 0,s={unversionedId:"faq/targeting/version-targeting",id:"faq/targeting/version-targeting",title:"Targeting dot releases or specific betas",description:"Question",source:"@site/docs/faq/targeting/version-targeting.mdx",sourceDirName:"faq/targeting",slug:"/targeting/version-targeting",permalink:"/targeting/version-targeting",draft:!1,editUrl:"https://github.com/mozilla/experimenter-docs/edit/main/docs/faq/targeting/version-targeting.mdx",tags:[],version:"current",frontMatter:{id:"version-targeting",title:"Targeting dot releases or specific betas",slug:"/targeting/version-targeting"},sidebar:"sidebar",previous:{title:"Advanced targeting",permalink:"/targeting/advanced-targeting"},next:{title:"Experimenter warnings",permalink:"/faq/warnings"}},l={},c=[{value:"Question",id:"question",level:3},{value:"Answer",id:"answer",level:3}],p={toc:c},u="wrapper";function g(e){let{components:t,...r}=e;return(0,a.kt)(u,(0,n.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h3",{id:"question"},"Question"),(0,a.kt)("p",null,'Can Nimbus experiments/rollouts target specific beta releases, i.e. can I express "roll this out to everyone on 104b6 and later"?'),(0,a.kt)("h3",{id:"answer"},"Answer"),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Yes.")," "),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://searchfox.org/mozilla-central/source/mobile/android/docs/shared/versioning.md"},"Here")," is where you can learn about our dot release version naming pattern by platform (so is the first dot release x.1.0 or x.0.1) "),(0,a.kt)("p",null,"If you are a mobile engineer, see steps ",(0,a.kt)("a",{parentName:"p",href:"/faq/mobile-faq"},"here")," for how to add a version.  To find how the version numbers work for your platform check ",(0,a.kt)("a",{parentName:"p",href:"https://searchfox.org/mozilla-central/source/mobile/android/docs/shared/versioning.md"},"https://searchfox.org/mozilla-central/source/mobile/android/docs/shared/versioning.md"),"."),(0,a.kt)("p",null,"Otherwise, file an issue ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/mozilla/experimenter/issues/new"},"here")," to add a specific version (of beta, nightly, or release) and then ping in ",(0,a.kt)("a",{parentName:"p",href:"https://mozilla.slack.com/archives/CF94YGE03"},(0,a.kt)("inlineCode",{parentName:"a"},"#ask-experimenter"))," on Slack."),(0,a.kt)("p",null,"The version requested will get added as an option to the Minimum Version and Maximum Version drop down menues. It is a minor and quick change. By default Experimenter (Nimbus) only exposes the whole valued versions, until requested."))}g.isMDXComponent=!0}}]);