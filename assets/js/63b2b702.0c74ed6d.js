"use strict";(self.webpackChunkexperimenter_docs=self.webpackChunkexperimenter_docs||[]).push([[163],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>d});var r=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var s=r.createContext({}),f=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},u=function(e){var t=f(e.components);return r.createElement(s.Provider,{value:t},e.children)},m="mdxType",c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},p=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,a=e.originalType,s=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),m=f(n),p=i,d=m["".concat(s,".").concat(p)]||m[p]||c[p]||a;return n?r.createElement(d,o(o({ref:t},u),{},{components:n})):r.createElement(d,o({ref:t},u))}));function d(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var a=n.length,o=new Array(a);o[0]=p;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[m]="string"==typeof e?e:i,o[1]=l;for(var f=2;f<a;f++)o[f]=n[f];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}p.displayName="MDXCreateElement"},3756:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>o,default:()=>c,frontMatter:()=>a,metadata:()=>l,toc:()=>f});var r=n(7462),i=(n(7294),n(3905));const a={title:"Feature Definition",sidebar_label:"Feature Definition",slug:"/feature-definition",sidebar_position:2},o=void 0,l={unversionedId:"workflow/implementing/feature-definition",id:"workflow/implementing/feature-definition",title:"Feature Definition",description:"In the experimentation ecosystem, experiment surfaces are described as features. A feature is an area of code instrumented with telemetry and accessible for remote configuration. It can be as small as a single function or as complex as a whole page. Some examples:",source:"@site/docs/workflow/implementing/feature-definition.md",sourceDirName:"workflow/implementing",slug:"/feature-definition",permalink:"/feature-definition",draft:!1,editUrl:"https://github.com/mozilla/experimenter-docs/edit/main/docs/workflow/implementing/feature-definition.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{title:"Feature Definition",sidebar_label:"Feature Definition",slug:"/feature-definition",sidebar_position:2},sidebar:"sidebar",previous:{title:"Experiment Owners",permalink:"/experiment-owners"},next:{title:"Custom Audiences",permalink:"/workflow/implementing/custom-audiences"}},s={},f=[{value:"To define your feature in the feature manifest file",id:"to-define-your-feature-in-the-feature-manifest-file",level:2}],u={toc:f},m="wrapper";function c(e){let{components:t,...n}=e;return(0,i.kt)(m,(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"In the experimentation ecosystem, experiment surfaces are described as features. A feature is an area of code instrumented with telemetry and accessible for remote configuration. It can be as small as a single function or as complex as a whole page. Some examples:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"aboutwelcome: The about:welcome page in Desktop\nhomescreen: The homescreen page in Fenix\ntabTrayFeature: The tab tray in Firefox iOS\n")),(0,i.kt)("p",null,"Features are defined in a Feature Manifest file for the application, and the client code uses the Nimbus SDK to access variables associated with those features."),(0,i.kt)("h2",{id:"to-define-your-feature-in-the-feature-manifest-file"},"To define your feature in the feature manifest file"),(0,i.kt)("p",null,"First, look at what is already defined in the manifest file:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://searchfox.org/mozilla-central/source/toolkit/components/nimbus/FeatureManifest.yaml"},"Desktop")),(0,i.kt)("li",{parentName:"ul"},"Mobile",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://github.com/mozilla-mobile/firefox-android/blob/main/fenix/app/nimbus.fml.yaml"},"Fenix (Firefox Android)")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://github.com/mozilla-mobile/firefox-android/blob/main/focus-android/app/nimbus.fml.yaml"},"Focus Android")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://github.com/mozilla-mobile/firefox-ios/blob/main/nimbus.fml.yaml"},"Firefox iOS")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://github.com/mozilla-mobile/focus-ios/blob/main/nimbus.fml.yaml"},"Focus iOS"))))))}c.isMDXComponent=!0}}]);