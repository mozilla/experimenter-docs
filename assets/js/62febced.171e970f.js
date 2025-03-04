"use strict";(self.webpackChunkexperimenter_docs=self.webpackChunkexperimenter_docs||[]).push([[6174],{4137:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>h});var o=n(7294);function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){l(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function a(e,t){if(null==e)return{};var n,o,l=function(e,t){if(null==e)return{};var n,o,l={},r=Object.keys(e);for(o=0;o<r.length;o++)n=r[o],t.indexOf(n)>=0||(l[n]=e[n]);return l}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(o=0;o<r.length;o++)n=r[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(l[n]=e[n])}return l}var p=o.createContext({}),s=function(e){var t=o.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=s(e.components);return o.createElement(p.Provider,{value:t},e.children)},m="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},c=o.forwardRef((function(e,t){var n=e.components,l=e.mdxType,r=e.originalType,p=e.parentName,u=a(e,["components","mdxType","originalType","parentName"]),m=s(n),c=l,h=m["".concat(p,".").concat(c)]||m[c]||d[c]||r;return n?o.createElement(h,i(i({ref:t},u),{},{components:n})):o.createElement(h,i({ref:t},u))}));function h(e,t){var n=arguments,l=t&&t.mdxType;if("string"==typeof e||l){var r=n.length,i=new Array(r);i[0]=c;var a={};for(var p in t)hasOwnProperty.call(t,p)&&(a[p]=t[p]);a.originalType=e,a[m]="string"==typeof e?e:l,i[1]=a;for(var s=2;s<r;s++)i[s]=n[s];return o.createElement.apply(null,i)}return o.createElement.apply(null,n)}c.displayName="MDXCreateElement"},684:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>i,default:()=>d,frontMatter:()=>r,metadata:()=>a,toc:()=>s});var o=n(7462),l=(n(7294),n(4137));const r={id:"desktop-enroll-locally",title:"Desktop Local Experiment Iteration",slug:"/desktop-enroll-locally"},i="Debugging an experiment from experimenter locally",a={unversionedId:"deep-dives/desktop/desktop-enroll-locally",id:"deep-dives/desktop/desktop-enroll-locally",title:"Desktop Local Experiment Iteration",description:"Trying to iterate on an experiment in Preview on experimenter.services.mozilla.com can be painful, because even after you change something and post to preview, you have a wait a while for the updated recipe to be propagated to the CDN.",source:"@site/docs/deep-dives/desktop/desktop-enroll-locally.md",sourceDirName:"deep-dives/desktop",slug:"/desktop-enroll-locally",permalink:"/desktop-enroll-locally",draft:!1,editUrl:"https://github.com/mozilla/experimenter-docs/edit/main/docs/deep-dives/desktop/desktop-enroll-locally.md",tags:[],version:"current",frontMatter:{id:"desktop-enroll-locally",title:"Desktop Local Experiment Iteration",slug:"/desktop-enroll-locally"},sidebar:"sidebar",previous:{title:"Preenrollment Bias",permalink:"/preenrollment-bias"},next:{title:"Launching Incident Response Pref Flips",permalink:"/desktop-incident-response"}},p={},s=[{value:"Option A: Enrollment via Nimbus Developer Tools",id:"option-a-enrollment-via-nimbus-developer-tools",level:2},{value:"Recipe JSON Enrollment",id:"recipe-json-enrollment",level:3},{value:"Feature Configuration Enrollment",id:"feature-configuration-enrollment",level:3},{value:"Option B: Manual Enrollment via Browser Console",id:"option-b-manual-enrollment-via-browser-console",level:2},{value:"Enable Nimbus debugging",id:"enable-nimbus-debugging",level:3},{value:"Enable the Browser Toolbox",id:"enable-the-browser-toolbox",level:3},{value:"Prepare a few things:",id:"prepare-a-few-things",level:3},{value:"Do the Enrollment",id:"do-the-enrollment",level:3},{value:"Reload <code>about:studies</code>, and you should see the experiment",id:"reload-aboutstudies-and-you-should-see-the-experiment",level:3}],u={toc:s},m="wrapper";function d(e){let{components:t,...n}=e;return(0,l.kt)(m,(0,o.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("h1",{id:"debugging-an-experiment-from-experimenter-locally"},"Debugging an experiment from experimenter locally"),(0,l.kt)("p",null,"Trying to iterate on an experiment in Preview on experimenter.services.mozilla.com can be painful, because even after you change something and post to preview, you have a wait a while for the updated recipe to be propagated to the CDN."),(0,l.kt)("h2",{id:"option-a-enrollment-via-nimbus-developer-tools"},"Option A: Enrollment via Nimbus Developer Tools"),(0,l.kt)("p",null,"Nimbus Developer Tools provides a simple interface to debug experiments. You can download and install the extension from the ",(0,l.kt)("a",{parentName:"p",href:"https://github.com/mozilla-extensions/nimbus-devtools/releases"},"Nimbus DevTools GitHub release page"),". Here are some of the ways you can use it to debug experiments locally:"),(0,l.kt)("h3",{id:"recipe-json-enrollment"},"Recipe JSON Enrollment"),(0,l.kt)("ol",null,(0,l.kt)("li",{parentName:"ol"},"Load ",(0,l.kt)("inlineCode",{parentName:"li"},"about:studies")," and unenroll this profile from anything that might interfere"),(0,l.kt)("li",{parentName:"ol"},"On the Experimenter page for your experiment, select the contents of the ",(0,l.kt)("inlineCode",{parentName:"li"},"Recipe JSON")," field from the ",(0,l.kt)("inlineCode",{parentName:"li"},"Summary")," tab, and copy it into your Copy/Paste buffer"),(0,l.kt)("li",{parentName:"ol"},"Navigate to the Nimbus Developer Tools ",(0,l.kt)("inlineCode",{parentName:"li"},"JSON Enrollment")," page"),(0,l.kt)("li",{parentName:"ol"},"Paste the JSON from the ",(0,l.kt)("inlineCode",{parentName:"li"},"Recipe JSON")," field in the provided textarea"),(0,l.kt)("li",{parentName:"ol"},"Click ",(0,l.kt)("inlineCode",{parentName:"li"},"Enroll")),(0,l.kt)("li",{parentName:"ol"},"Reload ",(0,l.kt)("inlineCode",{parentName:"li"},"about:studies"),", and you should see the experiment")),(0,l.kt)("h3",{id:"feature-configuration-enrollment"},"Feature Configuration Enrollment"),(0,l.kt)("ol",null,(0,l.kt)("li",{parentName:"ol"},"Load ",(0,l.kt)("inlineCode",{parentName:"li"},"about:studies")," and unenroll this profile from anything that might interfere"),(0,l.kt)("li",{parentName:"ol"},"Navigate to the Nimbus Developer Tools ",(0,l.kt)("inlineCode",{parentName:"li"},"Feature Configuration")," page."),(0,l.kt)("li",{parentName:"ol"},"Select the feature ID from the dropdown"),(0,l.kt)("li",{parentName:"ol"},"Set the ",(0,l.kt)("inlineCode",{parentName:"li"},"isRollout")," option to either ",(0,l.kt)("inlineCode",{parentName:"li"},"true")," or ",(0,l.kt)("inlineCode",{parentName:"li"},"false")," as needed"),(0,l.kt)("li",{parentName:"ol"},"Paste the feature configuration JSON into the textarea."),(0,l.kt)("li",{parentName:"ol"},"Click ",(0,l.kt)("inlineCode",{parentName:"li"},"Enroll"),"."),(0,l.kt)("li",{parentName:"ol"},"Reload ",(0,l.kt)("inlineCode",{parentName:"li"},"about:studies"),", and you should see the experiment")),(0,l.kt)("p",null,"For a more comprehensive overview of the Nimbus Developer Tools, including additional features beyond this, check out the ",(0,l.kt)("a",{parentName:"p",href:"/nimbus-devtools-guide"},"Nimbus Developer Tools Guide"),"."),(0,l.kt)("h2",{id:"option-b-manual-enrollment-via-browser-console"},"Option B: Manual Enrollment via Browser Console"),(0,l.kt)("h3",{id:"enable-nimbus-debugging"},"Enable Nimbus debugging"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"In ",(0,l.kt)("inlineCode",{parentName:"li"},"about:config"),", set:",(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"nimbus.debug")," to ",(0,l.kt)("inlineCode",{parentName:"li"},"true"))))),(0,l.kt)("h3",{id:"enable-the-browser-toolbox"},"Enable the Browser Toolbox"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"In ",(0,l.kt)("inlineCode",{parentName:"li"},"about:config"),", set:",(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"devtools.chrome.enabled")," to ",(0,l.kt)("inlineCode",{parentName:"li"},"true")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"devtools.debugger.remote-enabled")," to ",(0,l.kt)("inlineCode",{parentName:"li"},"true"))))),(0,l.kt)("h3",{id:"prepare-a-few-things"},"Prepare a few things:"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"Load ",(0,l.kt)("inlineCode",{parentName:"li"},"about:studies")," and unenroll this profile from anything that might interfere"),(0,l.kt)("li",{parentName:"ul"},"On the Experimenter page for your experiment, select the contents of the ",(0,l.kt)("inlineCode",{parentName:"li"},"Recipe JSON")," field from the ",(0,l.kt)("inlineCode",{parentName:"li"},"Details")," tab, and copy it into your Copy/Paste buffer")),(0,l.kt)("h3",{id:"do-the-enrollment"},"Do the Enrollment"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"Open ",(0,l.kt)("inlineCode",{parentName:"li"},"Tools > Browser Tools > Browser Toolbox")),(0,l.kt)("li",{parentName:"ul"},"Switch to the browser console"),(0,l.kt)("li",{parentName:"ul"},"In the input area, do the following:",(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"const branchSlug = 'treatment-a'; // or whatever branch you want")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"let recipe = ")," ",(0,l.kt)("em",{parentName:"li"},"paste_recipe_json_here")," ",(0,l.kt)("inlineCode",{parentName:"li"},";")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},'const { ExperimentManager: em } = ChromeUtils.importESModule("resource://nimbus/lib/ExperimentManager.sys.mjs");')),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"let branch = recipe.branches.find(b => b.slug == branchSlug);")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"em.forceEnroll(recipe, branch);"))))),(0,l.kt)("h3",{id:"reload-aboutstudies-and-you-should-see-the-experiment"},"Reload ",(0,l.kt)("inlineCode",{parentName:"h3"},"about:studies"),", and you should see the experiment"))}d.isMDXComponent=!0}}]);