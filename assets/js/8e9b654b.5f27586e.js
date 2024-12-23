"use strict";(self.webpackChunkexperimenter_docs=self.webpackChunkexperimenter_docs||[]).push([[3613],{4137:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>m});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=r.createContext({}),s=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},d=function(e){var t=s(e.components);return r.createElement(l.Provider,{value:t},e.children)},g="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},u=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,l=e.parentName,d=c(e,["components","mdxType","originalType","parentName"]),g=s(n),u=a,m=g["".concat(l,".").concat(u)]||g[u]||p[u]||i;return n?r.createElement(m,o(o({ref:t},d),{},{components:n})):r.createElement(m,o({ref:t},d))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=u;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c[g]="string"==typeof e?e:a,o[1]=c;for(var s=2;s<i;s++)o[s]=n[s];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}u.displayName="MDXCreateElement"},4910:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>p,frontMatter:()=>i,metadata:()=>c,toc:()=>s});var r=n(7462),a=(n(7294),n(4137));const i={id:"advanced-targeting",title:"Advanced targeting",slug:"/targeting/advanced-targeting"},o=void 0,c={unversionedId:"faq/targeting/advanced-targeting",id:"faq/targeting/advanced-targeting",title:"Advanced targeting",description:"Question",source:"@site/docs/faq/targeting/advanced-targeting.mdx",sourceDirName:"faq/targeting",slug:"/targeting/advanced-targeting",permalink:"/targeting/advanced-targeting",draft:!1,editUrl:"https://github.com/mozilla/experimenter-docs/edit/main/docs/faq/targeting/advanced-targeting.mdx",tags:[],version:"current",frontMatter:{id:"advanced-targeting",title:"Advanced targeting",slug:"/targeting/advanced-targeting"},sidebar:"sidebar",previous:{title:"Sizing rollouts",permalink:"/rollouts/sizing"},next:{title:"Targeting dot releases or specific betas",permalink:"/targeting/version-targeting"}},l={},s=[{value:"Question",id:"question",level:3},{value:"Answer",id:"answer",level:3}],d={toc:s},g="wrapper";function p(e){let{components:t,...n}=e;return(0,a.kt)(g,(0,r.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h3",{id:"question"},"Question"),(0,a.kt)("p",null,"How can I add a new advanced targeting option for experiment audiences?"),(0,a.kt)("h3",{id:"answer"},"Answer"),(0,a.kt)("p",null,"To add new advanced targeting you can open a PR against the ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/mozilla/experimenter/blob/main/experimenter/experimenter/targeting/constants.py"},(0,a.kt)("inlineCode",{parentName:"a"},"constants.py")," file")," in Experimenter. The advanced targeting is evaluated by the client at the moment we try to determine if we can enroll an eligible user. Think of it more like a funnel than a target.  All that\u2019s needed is to add a new ",(0,a.kt)("inlineCode",{parentName:"p"},"NimbusTargetingConfig")," object, e.g.:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-python"},'NEW_ANDROID_13_USERS = NimbusTargetingConfig(\n    name="New Android 13 Users",\n    slug="new_android_13_users",\n    description="Users who have Android 13 and are on their first run of the application",\n    targeting="(android_sdk_version|versionCompare(\'33\') >= 0) && is_first_run",\n    desktop_telemetry="",\n    sticky_required=True,\n    is_first_run_required=True,\n    application_choice_names=(Application.FENIX.name,),\n)\n')),(0,a.kt)("p",null,"If you need help writing the targeting expression, let us know in ",(0,a.kt)("a",{parentName:"p",href:"https://mozilla.slack.com/archives/CF94YGE03"},(0,a.kt)("inlineCode",{parentName:"a"},"#ask-experimenter"))," on Slack."))}p.isMDXComponent=!0}}]);