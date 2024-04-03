"use strict";(self.webpackChunkexperimenter_docs=self.webpackChunkexperimenter_docs||[]).push([[4283],{4137:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>g});var r=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var s=r.createContext({}),p=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},u=function(e){var t=p(e.components);return r.createElement(s.Provider,{value:t},e.children)},c="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,a=e.originalType,s=e.parentName,u=o(e,["components","mdxType","originalType","parentName"]),c=p(n),d=i,g=c["".concat(s,".").concat(d)]||c[d]||m[d]||a;return n?r.createElement(g,l(l({ref:t},u),{},{components:n})):r.createElement(g,l({ref:t},u))}));function g(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var a=n.length,l=new Array(a);l[0]=d;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o[c]="string"==typeof e?e:i,l[1]=o;for(var p=2;p<a;p++)l[p]=n[p];return r.createElement.apply(null,l)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},6807:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>l,default:()=>m,frontMatter:()=>a,metadata:()=>o,toc:()=>p});var r=n(7462),i=(n(7294),n(4137));const a={id:"warnings",title:"Experimenter warnings",slug:"/faq/warnings"},l=void 0,o={unversionedId:"faq/warnings/warnings",id:"faq/warnings/warnings",title:"Experimenter warnings",description:"There are a number of warning messages that you may encounter on Experimenter in the course of launching your experiment. These warnings are listed below, along with any restrictions that they may impose on an experiment.",source:"@site/docs/faq/warnings/warnings.mdx",sourceDirName:"faq/warnings",slug:"/faq/warnings",permalink:"/faq/warnings",draft:!1,editUrl:"https://github.com/mozilla/experimenter-docs/edit/main/docs/faq/warnings/warnings.mdx",tags:[],version:"current",frontMatter:{id:"warnings",title:"Experimenter warnings",slug:"/faq/warnings"},sidebar:"sidebar",previous:{title:"Targeting dot releases or specific betas",permalink:"/targeting/version-targeting"},next:{title:"Glossary",permalink:"/glossary"}},s={},p=[{value:"Rollout bucketing warning",id:"rollout-bucketing-warning",level:2},{value:"Rollouts and setPref Interaction (Desktop)",id:"rollouts-and-setpref-interaction-desktop",level:2},{value:"Audience overlap",id:"audience-overlap",level:2},{value:"Live experiments exist on a previous iteration of a namespace",id:"live-experiments-exist-on-a-previous-iteration-of-a-namespace",level:4},{value:"Live multi-feature experiments exist on this feature",id:"live-multi-feature-experiments-exist-on-this-feature",level:4},{value:"An experiment excludes other live deliveries",id:"an-experiment-excludes-other-live-deliveries",level:4}],u={toc:p},c="wrapper";function m(e){let{components:t,...n}=e;return(0,i.kt)(c,(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"There are a number of warning messages that you may encounter on Experimenter in the course of launching your experiment. These warnings are listed below, along with any restrictions that they may impose on an experiment."),(0,i.kt)("h2",{id:"rollout-bucketing-warning"},"Rollout bucketing warning"),(0,i.kt)("admonition",{type:"tip"},(0,i.kt)("p",{parentName:"admonition"},"See the ",(0,i.kt)("a",{parentName:"p",href:"/deep-dives/experimenter/rollouts"},"Rollout FAQ")," for general rollout information")),(0,i.kt)("p",null),(0,i.kt)("img",{style:{border:"1px solid grey"},title:"Duplicate bucket warning",src:"/img/faq/dupe-rollout-warning.png",align:"center"}),(0,i.kt)("p",null),(0,i.kt)("p",null,"If you are using the ",(0,i.kt)("a",{parentName:"p",href:"/deep-dives/experimenter/rollouts#without-using-live-editability"},"multiple-rollout approach"),", this warning can be safely ignored because you are explicitly creating more than one rollout in the same bucket."),(0,i.kt)("p",null,"However, if you are using ",(0,i.kt)("a",{parentName:"p",href:"/deep-dives/experimenter/rollouts#live-editability"},"live editability for rollouts"),", this warning tells you that there is a rollout that is ",(0,i.kt)("strong",{parentName:"p"},"already live")," that has the same application, channel, feature, and advanced targeting as the rollout that you are creating. This means that there will be collision, and your rollout will not function as-is. Users are already enrolled in the live rollout with the same criteria, and they will not be able to enroll in your rollout."),(0,i.kt)("p",null,"If you are encountering this and you would still like to proceed with your rollout, feel free to reach out to us in ",(0,i.kt)("a",{parentName:"p",href:"https://mozilla.slack.com/archives/CF94YGE03"},"#ask-experimenter")," on Slack  and we will be able to provide more guidance."),(0,i.kt)("h2",{id:"rollouts-and-setpref-interaction-desktop"},"Rollouts and setPref Interaction (Desktop)"),(0,i.kt)("p",null,"Rollouts that set prefs via ",(0,i.kt)("a",{parentName:"p",href:"/desktop-pref-experiments"},(0,i.kt)("inlineCode",{parentName:"a"},"setPref"))," features can have unexpected interactions. The Nimbus client will always enroll in any available rollouts--including rollouts it was previously enrolled in--unless the user has specifically opted out via ",(0,i.kt)("inlineCode",{parentName:"p"},"about:studies"),". If an enrolled user changes a pref set by the rollout they will be unenrolled from the rollout, but it will not be marked as an opt-out. This interaction will result in rollouts that will constantly override users' prefs ",(0,i.kt)("em",{parentName:"p"},"unless")," targeting prevents re-enrollment."),(0,i.kt)("p",null,'To prevent this situation, check the "Prevent enrollment if users have changed any prefs set by this experiment" box on the branches page of your rollout.'),(0,i.kt)("p",null),(0,i.kt)("img",{style:{border:"1px solid grey"},title:"SetPrefs prevent enrollment",src:"/img/faq/setpref-prevent-enrollment.png",align:"center"}),(0,i.kt)("h2",{id:"audience-overlap"},"Audience overlap"),(0,i.kt)("p",null,"There are cases where the audience of two experiments/rollouts will overlap in ways that Experimenter can predict. Audience overlap will generally result in under enrollment which can potentially invalidate an experiment. There are three scenarios where we can detectable cases of audience overlap so that experiment owners can adjust their ",(0,i.kt)("a",{parentName:"p",href:"/overview#sampling-framework"},"sizing")," accordingly. "),(0,i.kt)("p",null,"The warnings list the ",(0,i.kt)("inlineCode",{parentName:"p"},"slugs")," of the experiments that overlap with yours (the ",(0,i.kt)("inlineCode",{parentName:"p"},"slug")," of an experiment is the hyphenated name listed underneath the experiment title). Easily navigate to one of these experiments by replacing the slug in your URL with one copied from the warning: ",(0,i.kt)("a",{parentName:"p",href:"https://experimenter.services.mozilla.com/nimbus/put-the-slug-here/summary"},"https://experimenter.services.mozilla.com/nimbus/put-the-slug-here/summary"),"."),(0,i.kt)("p",null,"These warnings do not prevent experiments from being launched."),(0,i.kt)("h4",{id:"live-experiments-exist-on-a-previous-iteration-of-a-namespace"},"Live experiments exist on a previous iteration of a namespace"),(0,i.kt)("img",{style:{border:"1px solid grey"},title:"Live experiments in namespace warning",src:"/img/faq/prev-namespace-warning.png",align:"center"}),(0,i.kt)("p",null),(0,i.kt)("h4",{id:"live-multi-feature-experiments-exist-on-this-feature"},"Live multi-feature experiments exist on this feature"),(0,i.kt)("img",{style:{border:"1px solid grey"},title:"Live multfeature experiments warning",src:"/img/faq/multifeature-warning.png",align:"center"}),(0,i.kt)("p",null),(0,i.kt)("h4",{id:"an-experiment-excludes-other-live-deliveries"},"An experiment excludes other live deliveries"),(0,i.kt)("img",{style:{border:"1px solid grey"},title:"Excludes live deliveries warning",src:"/img/faq/excluded-warning.png",align:"center"}))}m.isMDXComponent=!0}}]);