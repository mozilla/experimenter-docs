"use strict";(self.webpackChunkexperimenter_docs=self.webpackChunkexperimenter_docs||[]).push([[2996],{4137:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>d});var a=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var s=a.createContext({}),m=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},p=function(e){var t=m(e.components);return a.createElement(s.Provider,{value:t},e.children)},u="mdxType",c={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},f=a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,r=e.originalType,s=e.parentName,p=o(e,["components","mdxType","originalType","parentName"]),u=m(n),f=i,d=u["".concat(s,".").concat(f)]||u[f]||c[f]||r;return n?a.createElement(d,l(l({ref:t},p),{},{components:n})):a.createElement(d,l({ref:t},p))}));function d(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var r=n.length,l=new Array(r);l[0]=f;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o[u]="string"==typeof e?e:i,l[1]=o;for(var m=2;m<r;m++)l[m]=n[m];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}f.displayName="MDXCreateElement"},7665:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>l,default:()=>c,frontMatter:()=>r,metadata:()=>o,toc:()=>m});var a=n(7462),i=(n(7294),n(4137));const r={id:"nimbus-cli-working-with-fml",title:"Working with Feature Manifests",slug:"/nimbus-cli/fml"},l=void 0,o={unversionedId:"deep-dives/mobile/nimbus-cli/nimbus-cli-working-with-fml",id:"deep-dives/mobile/nimbus-cli/nimbus-cli-working-with-fml",title:"Working with Feature Manifests",description:"The Feature Manifest Language is a powerful way of specify the shape of the feature configurations that each branch is made up of.",source:"@site/docs/deep-dives/mobile/nimbus-cli/70-working-with-manifests.mdx",sourceDirName:"deep-dives/mobile/nimbus-cli",slug:"/nimbus-cli/fml",permalink:"/nimbus-cli/fml",draft:!1,editUrl:"https://github.com/mozilla/experimenter-docs/edit/main/docs/deep-dives/mobile/nimbus-cli/70-working-with-manifests.mdx",tags:[],version:"current",sidebarPosition:70,frontMatter:{id:"nimbus-cli-working-with-fml",title:"Working with Feature Manifests",slug:"/nimbus-cli/fml"},sidebar:"sidebar",previous:{title:"Working with Logs",permalink:"/nimbus-cli/working-with-logs"},next:{title:"Working with Devices",permalink:"/nimbus-cli/on-devices"}},s={},m=[{value:"<code>validate</code>",id:"validate",level:2},{value:"<code>defaults</code>",id:"defaults",level:2},{value:"<code>features</code>",id:"features",level:2},{value:"Other commands",id:"other-commands",level:2},{value:"<code>enroll</code>",id:"enroll",level:3},{value:"Working with the <code>nimbus-fml</code> command line",id:"working-with-the-nimbus-fml-command-line",level:2}],p={toc:m},u="wrapper";function c(e){let{components:t,...n}=e;return(0,i.kt)(u,(0,a.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"The Feature Manifest Language is a powerful way of specify the shape of the feature configurations that each branch is made up of."),(0,i.kt)("p",null,"The ",(0,i.kt)("inlineCode",{parentName:"p"},"nimbus-cli")," knows about the feature manifests for each of the apps, and can validate experiments before they launch."),(0,i.kt)("h2",{id:"validate"},(0,i.kt)("inlineCode",{parentName:"h2"},"validate")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sh"},"nimbus-cli --app firefox_ios --channel release validate ios-sync-manager-integration\n")),(0,i.kt)("p",null,"This downloads the feature manifest (the fml file), and checks each of the features in each of the branches."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sh"},"\u2705 Loaded manifest from https://raw.githubusercontent.com/mozilla-mobile/firefox-ios/main/nimbus.fml.yaml\n\u2705 control           rust-sync-manager-component\n\u2705 rust-sync-manager rust-sync-manager-component\n")),(0,i.kt)("p",null,"By default, this will download the version from ",(0,i.kt)("inlineCode",{parentName:"p"},"main"),", however you can specify a version of the FML."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sh"},"nimbus-cli --app firefox_ios --channel release validate preview/release-ios-re-engagement-notifications-ab-experiment-114 --version 114\n")),(0,i.kt)("p",null,"Using the ",(0,i.kt)("inlineCode",{parentName:"p"},"--version")," parameter, we can specify ",(0,i.kt)("inlineCode",{parentName:"p"},"114")," which for ",(0,i.kt)("inlineCode",{parentName:"p"},"firefox_ios"),", this currently translates to the ",(0,i.kt)("inlineCode",{parentName:"p"},"release/v114")," tag."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sh"},"\u2705 Loaded manifest from https://raw.githubusercontent.com/mozilla-mobile/firefox-ios/release/v114/nimbus.fml.yaml\n\u2705 control         messaging\n\u2705 treatment-a     messaging\n\u2705 treatment-b     messaging\n\u2705 treatment-c     messaging\n")),(0,i.kt)("p",null,"Using the ",(0,i.kt)("inlineCode",{parentName:"p"},"--ref")," parameter, we can a tag, a different branch or a commit hash."),(0,i.kt)("p",null,"Alternatively, we can specify a local manifest file."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sh"},"nimbus-cli --app firefox_ios --channel release validate preview/release-ios-re-engagement-notifications-ab-experiment-114 --manifest ./my-manifest.fml.yaml\n")),(0,i.kt)("h2",{id:"defaults"},(0,i.kt)("inlineCode",{parentName:"h2"},"defaults")),(0,i.kt)("p",null,"The ",(0,i.kt)("inlineCode",{parentName:"p"},"defaults")," commands outputs the default configuration, for all features of the app configured by Nimbus."),(0,i.kt)("p",null,"An optional ",(0,i.kt)("inlineCode",{parentName:"p"},"--feature")," parameter can be specified to only output the default configuration for that particular feature."),(0,i.kt)("p",null,"For example,"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sh"},"nimbus-cli --app firefox_ios --channel release defaults --feature homescreenFeature\n")),(0,i.kt)("p",null,"currently outputs the following JSON:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sh"},'{\n  "jump-back-in-synced-tab": true,\n  "pocket-sponsored-stories": false,\n  "sections-enabled": {\n    "jump-back-in": true,\n    "pocket": true,\n    "recent-explorations": true,\n    "recently-saved": true,\n    "top-sites": true\n  },\n  "sponsored-tiles": {\n    "max-number-of-tiles": 2,\n    "status": true\n  }\n}\n')),(0,i.kt)("h2",{id:"features"},(0,i.kt)("inlineCode",{parentName:"h2"},"features")),(0,i.kt)("p",null,"A manifest can be used to change the behavior of the ",(0,i.kt)("inlineCode",{parentName:"p"},"features")," command."),(0,i.kt)("p",null,"If the ",(0,i.kt)("inlineCode",{parentName:"p"},"--validate")," flag is set, then the branch feature configuration is merged with the defaults from the manifest."),(0,i.kt)("p",null,"For example, without ",(0,i.kt)("inlineCode",{parentName:"p"},"--validate"),", the command:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sh"},"nimbus-cli --app firefox_ios --channel developer features ios-search-bar-placement-v2-treatment-a-rollout --branch treatment-a\n")),(0,i.kt)("p",null,"outputs the following JSON, extracted from the experiment:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sh"},'{\n  "awesome-bar": {\n    "position": {\n      "is-bottom": false,\n    }\n  }\n}\n')),(0,i.kt)("p",null,"Using ",(0,i.kt)("inlineCode",{parentName:"p"},"--validate"),", the defaults from the feature manifest are also shown: this gives an accurate picture of the complete configuration that the app will use for this feature."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sh"},"nimbus-cli --app firefox_ios --channel developer features ios-search-bar-placement-v2-treatment-a-rollout --branch treatment-a --validate\n")),(0,i.kt)("p",null,"Gives the above output merged with the defaults from the manifest:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sh"},'{\n  "awesome-bar": {\n    "position": {\n      "is-bottom": false,\n      "is-position-feature-enabled": true,\n      "is-toolbar-cfr-on": false\n    },\n    "search-highlights": false,\n    "use-page-content": false\n  }\n}\n')),(0,i.kt)("h2",{id:"other-commands"},"Other commands"),(0,i.kt)("p",null,"By default, the ",(0,i.kt)("inlineCode",{parentName:"p"},"enroll")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"test-feature")," validates the experiments before sending them to the device."),(0,i.kt)("p",null,"This can be overridden with the ",(0,i.kt)("inlineCode",{parentName:"p"},"--no-validate")," option."),(0,i.kt)("h3",{id:"enroll"},(0,i.kt)("inlineCode",{parentName:"h3"},"enroll")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sh"},"nimbus-cli --app firefox_ios --channel release enroll ios-sync-manager-integration --branch rust-sync-manager\n")),(0,i.kt)("p",null,"The manifest itself is validated on load, so if there is a problem with that feature, you can skip validation with ",(0,i.kt)("inlineCode",{parentName:"p"},"--no-validate"),"."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sh"},"nimbus-cli --app firefox_ios --channel developer enroll ios-set-to-default-in-onboarding-final --branch control --no-validate\n")),(0,i.kt)("p",null,"Each of the ",(0,i.kt)("inlineCode",{parentName:"p"},"--manifest"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"--version")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"--ref")," options work with ",(0,i.kt)("inlineCode",{parentName:"p"},"enroll"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"test-feature"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"features")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"defaults"),"."),(0,i.kt)("h2",{id:"working-with-the-nimbus-fml-command-line"},"Working with the ",(0,i.kt)("inlineCode",{parentName:"h2"},"nimbus-fml")," command line"),(0,i.kt)("p",null,"The Feature Manifest Language has its own ",(0,i.kt)("a",{parentName:"p",href:"/fml/fml-cli"},"command line interface"),". This can be used to validate manifest files, generate code, and rationalize manifests in to a single file."),(0,i.kt)("p",null,"For example:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sh"},"nimbus-cli fml validate @mozilla/blurts-server/config/nimbus.yaml\n")),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/fml/fml-cli"},"The documentation there is better placed to explain how to use it"),", however there is one caveat: flags (i.e. modifiers that begin with ",(0,i.kt)("inlineCode",{parentName:"p"},"--"),") are caught by the ",(0,i.kt)("inlineCode",{parentName:"p"},"nimbus-cli")," command line, rather than passed to the ",(0,i.kt)("inlineCode",{parentName:"p"},"nimbus-fml")," command line."),(0,i.kt)("p",null,"Thus, you should use ",(0,i.kt)("inlineCode",{parentName:"p"},"--")," before their first use. For example:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sh"},"nimbus-cli fml -- --help\n")),(0,i.kt)("p",null,"will display the ",(0,i.kt)("inlineCode",{parentName:"p"},"nimbus-fml")," help message."),(0,i.kt)("p",null,"You can put the ",(0,i.kt)("inlineCode",{parentName:"p"},"--")," anywhere before the first modifier: the following two commands are equivalent."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sh"},"nimbus-cli fml -- generate-experimenter --channel release @mozilla/blurts-server/config/nimbus.yaml blurts.experimenter.yaml\n")),(0,i.kt)("p",null,"and"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sh"},"nimbus-cli fml generate-experimenter @mozilla/blurts-server/config/nimbus.yaml blurts.experimenter.yaml -- --channel release\n")))}c.isMDXComponent=!0}}]);