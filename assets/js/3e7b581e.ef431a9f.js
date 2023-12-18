"use strict";(self.webpackChunkexperimenter_docs=self.webpackChunkexperimenter_docs||[]).push([[3100],{4137:(e,t,r)=>{r.d(t,{Zo:()=>u,kt:()=>d});var a=r(7294);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function n(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?n(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):n(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,a,i=function(e,t){if(null==e)return{};var r,a,i={},n=Object.keys(e);for(a=0;a<n.length;a++)r=n[a],t.indexOf(r)>=0||(i[r]=e[r]);return i}(e,t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);for(a=0;a<n.length;a++)r=n[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}var l=a.createContext({}),c=function(e){var t=a.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},u=function(e){var t=c(e.components);return a.createElement(l.Provider,{value:t},e.children)},m="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},f=a.forwardRef((function(e,t){var r=e.components,i=e.mdxType,n=e.originalType,l=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),m=c(r),f=i,d=m["".concat(l,".").concat(f)]||m[f]||p[f]||n;return r?a.createElement(d,o(o({ref:t},u),{},{components:r})):a.createElement(d,o({ref:t},u))}));function d(e,t){var r=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var n=r.length,o=new Array(n);o[0]=f;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[m]="string"==typeof e?e:i,o[1]=s;for(var c=2;c<n;c++)o[c]=r[c];return a.createElement.apply(null,o)}return a.createElement.apply(null,r)}f.displayName="MDXCreateElement"},5780:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>p,frontMatter:()=>n,metadata:()=>s,toc:()=>c});var a=r(7462),i=(r(7294),r(4137));const n={id:"feature-metrics",title:"Feature metrics aren't there?",slug:"/metric-availability/feature-metrics"},o=void 0,s={unversionedId:"faq/metric-availability/feature-metrics",id:"faq/metric-availability/feature-metrics",title:"Feature metrics aren't there?",description:"Watch this video to know how metrics work with experiments.  The video covers the steps below. These details are provided here for ease of reference and links.",source:"@site/docs/faq/metric-availability/non-guardrail-outcome.mdx",sourceDirName:"faq/metric-availability",slug:"/metric-availability/feature-metrics",permalink:"/metric-availability/feature-metrics",draft:!1,editUrl:"https://github.com/mozilla/experimenter-docs/edit/main/docs/faq/metric-availability/non-guardrail-outcome.mdx",tags:[],version:"current",frontMatter:{id:"feature-metrics",title:"Feature metrics aren't there?",slug:"/metric-availability/feature-metrics"},sidebar:"sidebar",previous:{title:"General FAQ",permalink:"/faq/general-faq"},next:{title:"Mobile First Run",permalink:"/faq/first-run"}},l={},c=[],u={toc:c},m="wrapper";function p(e){let{components:t,...r}=e;return(0,i.kt)(m,(0,a.Z)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("admonition",{type:"tip"},(0,i.kt)("p",{parentName:"admonition"},"Watch ",(0,i.kt)("a",{parentName:"p",href:"https://mozilla.hosted.panopto.com/Panopto/Pages/Viewer.aspx?id=7f677cde-3b61-4cd5-8119-af7b013c7579"},"this video")," to know how metrics work with experiments.  The video covers the steps below. These details are provided here for ease of reference and links.")),(0,i.kt)("p",null,"After completing your experiment brief and defining your learning goals - attend an office hours to discuss how you could measure the changes.  Based on that discussion - go through the steps below until the metrics needed for this experiment are covered.  You do not need to complete all the steps - just enough to answer your questions."),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Step 1")," - Check  ",(0,i.kt)("a",{parentName:"p",href:"/jetstream/metrics/#how-do-i-add-a-metric-to-my-experiment"},"here")," to learn if the existing Guardrail/Core metrics or Outcomes will answer your questions."),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Step 2")," - Did an experiment run previously had these metrics you need?  "),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Look at previous experiments in your feature area - do those metrics meet your needs?  Re-using metrics is a much quicker than writing custom metrics from scratch.   "),(0,i.kt)("li",{parentName:"ul"},"If yes, create a ",(0,i.kt)("a",{parentName:"li",href:"https://mozilla-hub.atlassian.net/jira/software/c/projects/DO/boards/269"},"DO Jira ticket")," including:  ",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"the link to your current experiment "),(0,i.kt)("li",{parentName:"ul"},"the link to the previous experiment(s) results.  Specify the metrics from the previous experiment you are interested in and how they answer your question.    "))),(0,i.kt)("li",{parentName:"ul"},"BEST PRACTICE: If you want these metrics for future experiments on this feature - ask to have an Outcome added instead of a custom config file.  Adding an Outcome means these metrics will be available to select from the Outcome drop down in Metrics for future experiments.  ")),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Step 3")," - Provide information to create a custom metric for this experiment."),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Create a ",(0,i.kt)("a",{parentName:"li",href:"https://mozilla-hub.atlassian.net/jira/software/c/projects/DO/boards/269"},"DO Jira ticket")," including: ",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"the link to your current experiment  "),(0,i.kt)("li",{parentName:"ul"},"the questions you need to answer about the feature (that aren't covered by metrics from step 1 or step 2)"),(0,i.kt)("li",{parentName:"ul"},"the specific telemetry probes in your feature that will be used to answer the question - including the possible values those probes collect and when they are sent. "))),(0,i.kt)("li",{parentName:"ul"},"A data scientist will work with feature product and engineering to create a custom jetstream config file to add these metrics.  Provided the telemetry probes exist and are testing - the custom configuration file can be written after experiment launch (before end) and applied.")))}p.isMDXComponent=!0}}]);