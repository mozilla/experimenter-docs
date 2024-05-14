"use strict";(self.webpackChunkexperimenter_docs=self.webpackChunkexperimenter_docs||[]).push([[3363],{4137:(e,t,n)=>{n.d(t,{Zo:()=>f,kt:()=>m});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var o=r.createContext({}),p=function(e){var t=r.useContext(o),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},f=function(e){var t=p(e.components);return r.createElement(o.Provider,{value:t},e.children)},u="mdxType",c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,o=e.parentName,f=l(e,["components","mdxType","originalType","parentName"]),u=p(n),d=a,m=u["".concat(o,".").concat(d)]||u[d]||c[d]||i;return n?r.createElement(m,s(s({ref:t},f),{},{components:n})):r.createElement(m,s({ref:t},f))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,s=new Array(i);s[0]=d;var l={};for(var o in t)hasOwnProperty.call(t,o)&&(l[o]=t[o]);l.originalType=e,l[u]="string"==typeof e?e:a,s[1]=l;for(var p=2;p<i;p++)s[p]=n[p];return r.createElement.apply(null,s)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},4166:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>o,contentTitle:()=>s,default:()=>c,frontMatter:()=>i,metadata:()=>l,toc:()=>p});var r=n(7462),a=(n(7294),n(4137));const i={id:"desktop-pref-experiments",title:"Running Pref-setting Experiments on Desktop",slug:"/desktop-pref-experiments"},s=void 0,l={unversionedId:"deep-dives/desktop/desktop-pref-experiments",id:"deep-dives/desktop/desktop-pref-experiments",title:"Running Pref-setting Experiments on Desktop",description:"As of Firefox 107, Nimbus supports experiments that set preferences on Desktop.",source:"@site/docs/deep-dives/desktop/desktop-pref-experiments.md",sourceDirName:"deep-dives/desktop",slug:"/desktop-pref-experiments",permalink:"/desktop-pref-experiments",draft:!1,editUrl:"https://github.com/mozilla/experimenter-docs/edit/main/docs/deep-dives/desktop/desktop-pref-experiments.md",tags:[],version:"current",frontMatter:{id:"desktop-pref-experiments",title:"Running Pref-setting Experiments on Desktop",slug:"/desktop-pref-experiments"},sidebar:"sidebar",previous:{title:"Desktop Local Experiment Iteration",permalink:"/desktop-enroll-locally"},next:{title:"Desktop Targeting debug",permalink:"/desktop-targeting-debug"}},o={},p=[{value:"Example Feature",id:"example-feature",level:2},{value:"Experiments vs Rollouts",id:"experiments-vs-rollouts",level:2},{value:"Pref branches",id:"pref-branches",level:2},{value:"User Preference Changes",id:"user-preference-changes",level:2},{value:"Manifest Changes",id:"manifest-changes",level:2},{value:"Restrictions with Fallback Prefs",id:"restrictions-with-fallback-prefs",level:2}],f={toc:p},u="wrapper";function c(e){let{components:t,...n}=e;return(0,a.kt)(u,(0,r.Z)({},f,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"As of Firefox 107, Nimbus supports experiments that set preferences on Desktop.\nUnlike Normandy, Nimbus cannot set arbitrary preferences; instead, the\npreferences that may be set are determined by the feature manifest."),(0,a.kt)("p",null,"Each variable in a Nimbus feature can set a single pref of any type."),(0,a.kt)("p",null,"NB: Support for JSON variables was added in Firefox 126. The value of the pref\nwill be ",(0,a.kt)("inlineCode",{parentName:"p"},"JSON.stringify(value)"),"."),(0,a.kt)("h2",{id:"example-feature"},"Example Feature"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-yaml"},"pref-feature:\n  description: A description of my feature\n  owner: whoami@mozilla.com\n  variables:\n    string:\n      description: A variable setting a string pref.\n      type: string\n      setPref:\n        branch: user\n        pref: test.string\n    int:\n      description: A variable setting an integer pref.\n      type: int\n      setPref:\n        branch: default\n        pref: test.int\n    boolean:\n      description: A variable setting a boolean pref.\n      type: boolean\n      setPref:\n        branch: user\n        pref: test.boolean\n")),(0,a.kt)("h2",{id:"experiments-vs-rollouts"},"Experiments vs Rollouts"),(0,a.kt)("p",null,"Users can be enrolled in an experiment and rollout for the same feature. If both\nan experiment and rollout set a variable that sets a pref, then the experiment\nwill take precedence. If the user unenrolls from the experiment, then the pref\nwill be set to the value specified in the rollout."),(0,a.kt)("p",null,"When the user is no longer enrolled in either an experiment or a rollout setting\na given pref, then it will be reset to its original value at the time of the\nfirst enrollment, with some caveats:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"If the pref is set on the default branch (see ",(0,a.kt)("a",{parentName:"li",href:"#pref-branches"},"below"),") and the\npref was not set before enrollment, then the pref will not change until the\nnext restart. This is due to a technical limitation: default branch values\ncannot be cleared."),(0,a.kt)("li",{parentName:"ul"},"If the pref is set on the user branch and the pref was not set before\nenrollment, then the pref will be cleared and will be no longer available.")),(0,a.kt)("h2",{id:"pref-branches"},"Pref branches"),(0,a.kt)("p",null,"Each variable using ",(0,a.kt)("inlineCode",{parentName:"p"},"setPref")," must specify which branch will be written to.\nThe default branch is not persisted, so prefs set on the default branch will not\nbe available until Nimbus completes its startup and loads all its active\nexperiments from disk."),(0,a.kt)("h2",{id:"user-preference-changes"},"User Preference Changes"),(0,a.kt)("p",null,"If a user is enrolled in an experiment or rollout that sets a pref and that pref\nchanges, the user will be unenrolled from the experiment (or rollout). This\nincludes both changes made by the user and changes in code. Experiment runners\nshould be careful to ensure there is no code in tree that will modify prefs they\nare experimenting on, otherwise their populations may get spuriously unenrolled."),(0,a.kt)("p",null,"The new value of the preference will be persisted."),(0,a.kt)("h2",{id:"manifest-changes"},"Manifest Changes"),(0,a.kt)("p",null,"Some changes to the feature manifest may result in unenrollment from an active\nexperiment:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"The feature being removed."),(0,a.kt)("li",{parentName:"ul"},"A variable that is currently setting a pref is removed."),(0,a.kt)("li",{parentName:"ul"},"A variable that is currently setting a pref either changes the pref it is\nsetting or no longer sets a pref (i.e., its ",(0,a.kt)("inlineCode",{parentName:"li"},"setPref")," value changes or is\nremoved).")),(0,a.kt)("p",null,"It should be noted that unenrollment for these reasons will only occur when the\nuser is enrolled in a pref-setting experiment. If a feature specifies both\npref-setting and non-pref setting variables, then changes to the manifest will\nnot result in unenrollment if the active experiment does not have any values for\npref-setting variables."),(0,a.kt)("h2",{id:"restrictions-with-fallback-prefs"},"Restrictions with Fallback Prefs"),(0,a.kt)("p",null,"Variables may not specify both a ",(0,a.kt)("inlineCode",{parentName:"p"},"fallbackPref")," and a ",(0,a.kt)("inlineCode",{parentName:"p"},"setPref"),"."),(0,a.kt)("p",null,"Fallback prefs and set prefs are mutually exclusive. That is, If any variable in\nany feature specifies a pref as a fallback pref, no variable may set that\nvariable as a set pref and vice versa."),(0,a.kt)("p",null,"These restrictions are enforced at build time."))}c.isMDXComponent=!0}}]);