"use strict";(self.webpackChunkexperimenter_docs=self.webpackChunkexperimenter_docs||[]).push([[6336],{4137:(e,t,r)=>{r.d(t,{Zo:()=>c,kt:()=>u});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var l=n.createContext({}),p=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},c=function(e){var t=p(e.components);return n.createElement(l.Provider,{value:t},e.children)},d="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},h=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,i=e.originalType,l=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),d=p(r),h=a,u=d["".concat(l,".").concat(h)]||d[h]||m[h]||i;return r?n.createElement(u,o(o({ref:t},c),{},{components:r})):n.createElement(u,o({ref:t},c))}));function u(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=r.length,o=new Array(i);o[0]=h;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[d]="string"==typeof e?e:a,o[1]=s;for(var p=2;p<i;p++)o[p]=r[p];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}h.displayName="MDXCreateElement"},5110:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>m,frontMatter:()=>i,metadata:()=>s,toc:()=>p});var n=r(7462),a=(r(7294),r(4137));const i={id:"for-leadership",title:"Leadership",slug:"/for-leadership"},o=void 0,s={unversionedId:"getting-started/for-leadership",id:"getting-started/for-leadership",title:"Leadership",description:"How can leadership interact with experiments?",source:"@site/docs/getting-started/for-leadership.md",sourceDirName:"getting-started",slug:"/for-leadership",permalink:"/for-leadership",draft:!1,editUrl:"https://github.com/mozilla/experimenter-docs/edit/main/docs/getting-started/for-leadership.md",tags:[],version:"current",frontMatter:{id:"for-leadership",title:"Leadership",slug:"/for-leadership"},sidebar:"sidebar",previous:{title:"Experiment Owners",permalink:"/for-product"},next:{title:"Overview",permalink:"/workflow/overview"}},l={},p=[{value:"How can leadership interact with experiments?",id:"how-can-leadership-interact-with-experiments",level:2},{value:"Where do I find Experimentation Program metrics?",id:"where-do-i-find-experimentation-program-metrics",level:2}],c={toc:p},d="wrapper";function m(e){let{components:t,...r}=e;return(0,a.kt)(d,(0,n.Z)({},c,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h2",{id:"how-can-leadership-interact-with-experiments"},"How can leadership interact with experiments?"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("a",{parentName:"p",href:"https://experimenter.services.mozilla.com/nimbus/"},"Nimbus Console")," is the best place for exploring what is running, completed, and in draft.  Currently there is basic filtering - which will be expanded this year to enable easier experiment discovery.")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"Each experiment should have an Experiment Brief following this ",(0,a.kt)("a",{parentName:"p",href:"https://docs.google.com/document/d/1eFGL9FATIuZudjSItpIT2Ct1C5qb5E3Qk7hJuJQT67s/edit#"},"template"),", as a link from Nimbus Console - which goes into the background, learning goals, and experiment design.")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"After an experiment is completed, there is a Results link in the right hand vertical gray bar.  ",(0,a.kt)("img",{parentName:"p",src:"https://user-images.githubusercontent.com/8192232/171439876-33124105-514b-40ec-8edc-cfa4fd681ffb.png",alt:"image"}))),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},'For completed experiments, there should be information added to Nimbus Console in the "Takeaways" section for a high level tl;dr interpretations and actions taken for each experiment.  If that is blank - ask the Product Manager for the takeaways and learnings and to fill that section. ',(0,a.kt)("img",{parentName:"p",src:"https://user-images.githubusercontent.com/8192232/171439992-3bb9c53d-0595-40d9-99ee-7b20d5e3f5b7.png",alt:"image"})))),(0,a.kt)("h2",{id:"where-do-i-find-experimentation-program-metrics"},"Where do I find Experimentation Program metrics?"),(0,a.kt)("p",null,"The ",(0,a.kt)("a",{parentName:"p",href:"https://docs.google.com/spreadsheets/d/1oEvS0CI52kod7i-prk8rnVPr_6Nk19QSBVHAvxmVRgI/edit?gid=408542968#gid=408542968"},"Experiment Tracking spreadsheet")," is the current source of truth on experimentation program metrics."),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"This is updated monthly before Product Days"),(0,a.kt)("li",{parentName:"ul"},"The summary view has the SPI metrics that are being reported out regularly."),(0,a.kt)("li",{parentName:"ul"},'Tabs for "by feature" and "by area" information in graph format for experiments based on feature area and area (desktop, mobile, platform).')),(0,a.kt)("p",null,"Until we improve discovery in the Console - the ",(0,a.kt)("strong",{parentName:"p"},"2022 data")," sheet tab is a possible hack to discover experiments. There are comments at the top cell of each column explaining what is being captured."),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Please do not edit it"),"."),(0,a.kt)("li",{parentName:"ul"},'Example: you can find experiments that had a "CDOU Stat Sig" and "Leading Indicator Stat Sig" change. to easily find experiments that saw a stat sig change.'),(0,a.kt)("li",{parentName:"ul"},"Ask Shell, Jim Thomas, Devyani, or Daniel Berry for help interpreting anything in that spreadsheet.")))}m.isMDXComponent=!0}}]);