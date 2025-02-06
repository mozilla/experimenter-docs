"use strict";(self.webpackChunkexperimenter_docs=self.webpackChunkexperimenter_docs||[]).push([[4527],{4137:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>f});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=a.createContext({}),u=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},d=function(e){var t=u(e.components);return a.createElement(s.Provider,{value:t},e.children)},c="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},p=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,s=e.parentName,d=l(e,["components","mdxType","originalType","parentName"]),c=u(n),p=r,f=c["".concat(s,".").concat(p)]||c[p]||m[p]||i;return n?a.createElement(f,o(o({ref:t},d),{},{components:n})):a.createElement(f,o({ref:t},d))}));function f(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,o=new Array(i);o[0]=p;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[c]="string"==typeof e?e:r,o[1]=l;for(var u=2;u<i;u++)o[u]=n[u];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}p.displayName="MDXCreateElement"},425:(e,t,n)=>{n.d(t,{Z:()=>o});var a=n(7294),r=n(6010);const i={tabItem:"tabItem_Ymn6"};function o(e){let{children:t,hidden:n,className:o}=e;return a.createElement("div",{role:"tabpanel",className:(0,r.Z)(i.tabItem,o),hidden:n},t)}},3992:(e,t,n)=>{n.d(t,{Z:()=>y});var a=n(7462),r=n(7294),i=n(6010),o=n(2957),l=n(6550),s=n(5238),u=n(3609),d=n(2560);function c(e){return function(e){return r.Children.map(e,(e=>{if(!e||(0,r.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}(e).map((e=>{let{props:{value:t,label:n,attributes:a,default:r}}=e;return{value:t,label:n,attributes:a,default:r}}))}function m(e){const{values:t,children:n}=e;return(0,r.useMemo)((()=>{const e=t??c(n);return function(e){const t=(0,u.l)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,n])}function p(e){let{value:t,tabValues:n}=e;return n.some((e=>e.value===t))}function f(e){let{queryString:t=!1,groupId:n}=e;const a=(0,l.k6)(),i=function(e){let{queryString:t=!1,groupId:n}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!n)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return n??null}({queryString:t,groupId:n});return[(0,s._X)(i),(0,r.useCallback)((e=>{if(!i)return;const t=new URLSearchParams(a.location.search);t.set(i,e),a.replace({...a.location,search:t.toString()})}),[i,a])]}function b(e){const{defaultValue:t,queryString:n=!1,groupId:a}=e,i=m(e),[o,l]=(0,r.useState)((()=>function(e){let{defaultValue:t,tabValues:n}=e;if(0===n.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!p({value:t,tabValues:n}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${n.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const a=n.find((e=>e.default))??n[0];if(!a)throw new Error("Unexpected error: 0 tabValues");return a.value}({defaultValue:t,tabValues:i}))),[s,u]=f({queryString:n,groupId:a}),[c,b]=function(e){let{groupId:t}=e;const n=function(e){return e?`docusaurus.tab.${e}`:null}(t),[a,i]=(0,d.Nk)(n);return[a,(0,r.useCallback)((e=>{n&&i.set(e)}),[n,i])]}({groupId:a}),h=(()=>{const e=s??c;return p({value:e,tabValues:i})?e:null})();(0,r.useLayoutEffect)((()=>{h&&l(h)}),[h]);return{selectedValue:o,selectValue:(0,r.useCallback)((e=>{if(!p({value:e,tabValues:i}))throw new Error(`Can't select invalid tab value=${e}`);l(e),u(e),b(e)}),[u,b,i]),tabValues:i}}var h=n(1048);const g={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};function v(e){let{className:t,block:n,selectedValue:l,selectValue:s,tabValues:u}=e;const d=[],{blockElementScrollPositionUntilNextRender:c}=(0,o.o5)(),m=e=>{const t=e.currentTarget,n=d.indexOf(t),a=u[n].value;a!==l&&(c(t),s(a))},p=e=>{let t=null;switch(e.key){case"Enter":m(e);break;case"ArrowRight":{const n=d.indexOf(e.currentTarget)+1;t=d[n]??d[0];break}case"ArrowLeft":{const n=d.indexOf(e.currentTarget)-1;t=d[n]??d[d.length-1];break}}t?.focus()};return r.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,i.Z)("tabs",{"tabs--block":n},t)},u.map((e=>{let{value:t,label:n,attributes:o}=e;return r.createElement("li",(0,a.Z)({role:"tab",tabIndex:l===t?0:-1,"aria-selected":l===t,key:t,ref:e=>d.push(e),onKeyDown:p,onClick:m},o,{className:(0,i.Z)("tabs__item",g.tabItem,o?.className,{"tabs__item--active":l===t})}),n??t)})))}function k(e){let{lazy:t,children:n,selectedValue:a}=e;const i=(Array.isArray(n)?n:[n]).filter(Boolean);if(t){const e=i.find((e=>e.props.value===a));return e?(0,r.cloneElement)(e,{className:"margin-top--md"}):null}return r.createElement("div",{className:"margin-top--md"},i.map(((e,t)=>(0,r.cloneElement)(e,{key:t,hidden:e.props.value!==a}))))}function N(e){const t=b(e);return r.createElement("div",{className:(0,i.Z)("tabs-container",g.tabList)},r.createElement(v,(0,a.Z)({},e,t)),r.createElement(k,(0,a.Z)({},e,t)))}function y(e){const t=(0,h.Z)();return r.createElement(N,(0,a.Z)({key:String(t)},e))}},8984:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>d,contentTitle:()=>s,default:()=>f,frontMatter:()=>l,metadata:()=>u,toc:()=>c});var a=n(7462),r=(n(7294),n(4137)),i=n(3992),o=n(425);const l={id:"recording-targeting-context-values-to-glean",title:"Recording Targeting Context Values to Glean",slug:"/recording-targeting-context-values-to-glean"},s=void 0,u={unversionedId:"deep-dives/mobile/recording-targeting-context-values-to-glean",id:"deep-dives/mobile/recording-targeting-context-values-to-glean",title:"Recording Targeting Context Values to Glean",description:"In order to support automated population sizing efforts, the Nimbus SDK has been updated to include an interface by",source:"@site/docs/deep-dives/mobile/recorded-targeting-context-values-to-glean.mdx",sourceDirName:"deep-dives/mobile",slug:"/recording-targeting-context-values-to-glean",permalink:"/recording-targeting-context-values-to-glean",draft:!1,editUrl:"https://github.com/mozilla/experimenter-docs/edit/main/docs/deep-dives/mobile/recorded-targeting-context-values-to-glean.mdx",tags:[],version:"current",frontMatter:{id:"recording-targeting-context-values-to-glean",title:"Recording Targeting Context Values to Glean",slug:"/recording-targeting-context-values-to-glean"},sidebar:"sidebar",previous:{title:"What's New",permalink:"/nimbus-cli/whats-new"},next:{title:"Branches",permalink:"/deep-dives/experimenter/branches-page"}},d={},c=[{value:"Rust Nimbus SDK code",id:"rust-nimbus-sdk-code",level:2},{value:"<code>to_json</code>",id:"to_json",level:2},{value:"<code>get_event_queries</code>",id:"get_event_queries",level:2},{value:"<code>set_event_query_values</code>",id:"set_event_query_values",level:2},{value:"<code>record</code>",id:"record",level:2},{value:"Additional methods",id:"additional-methods",level:3},{value:"Adding new fields",id:"adding-new-fields",level:2},{value:"Adding new event queries",id:"adding-new-event-queries",level:2}],m={toc:c},p="wrapper";function f(e){let{components:t,...n}=e;return(0,r.kt)(p,(0,a.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"In order to support automated population sizing efforts, the Nimbus SDK has been updated to include an interface by\nwhich values that are a part of the Nimbus targeting context can be recorded to Glean. This page documents how to\nimplement the aforementioned interface, and provides guidance on updating the Nimbus targeting context moving forward."),(0,r.kt)("p",null,"There are a number of implementation details that are worth noting. The first to be covered is how the code is\nstructured in Rust, as it uses some of the more complex features of UniFFI, followed by how the code is structured in the Firefox\nAndroid and iOS repositories."),(0,r.kt)("h2",{id:"rust-nimbus-sdk-code"},"Rust Nimbus SDK code"),(0,r.kt)("p",null,"To start, a new Rust trait was defined, with methods to be implemented to perform four key functions."),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("inlineCode",{parentName:"li"},"to_json"),": to return a JSON representation of the ",(0,r.kt)("inlineCode",{parentName:"li"},"RecordedContext"),"'s values"),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("inlineCode",{parentName:"li"},"get_event_queries"),": to return a map of an event query name to an event query"),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("inlineCode",{parentName:"li"},"set_event_query_values"),": to set the internal calculated values for the event queries"),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("inlineCode",{parentName:"li"},"record"),": to record the internal values of the object to Glean")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-rust"},"pub trait RecordedContext: Send + Sync {\n    /// Returns a JSON representation of the context object\n    ///\n    /// This method will be implemented in foreign code, i.e: Kotlin, Swift, Python, etc...\n    fn to_json(&self) -> JsonObject;\n\n    /// Returns a HashMap representation of the event queries that will be used in the targeting\n    /// context\n    ///\n    /// This method will be implemented in foreign code, i.e: Kotlin, Swift, Python, etc...\n    fn get_event_queries(&self) -> HashMap<String, String>;\n\n    /// Sets the object's internal value for the event query values\n    ///\n    /// This method will be implemented in foreign code, i.e: Kotlin, Swift, Python, etc...\n    fn set_event_query_values(&self, event_query_values: HashMap<String, f64>);\n\n    /// Records the context object to Glean\n    ///\n    /// This method will be implemented in foreign code, i.e: Kotlin, Swift, Python, etc...\n    fn record(&self);\n}\n")),(0,r.kt)("p",null,"We then use the UDL to define this trait such that it uses foreign implementations. As such, we will end up with kotlin/\nswift classes that implement the methods as described above."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"[Trait, WithForeign]\ninterface RecordedContext {\n    JsonObject to_json();\n\n    record<string, string> get_event_queries();\n\n    void set_event_query_values(record<string, f64> event_query_values);\n\n    void record();\n};\n")),(0,r.kt)("p",null,"We also have some internal Rust methods extending off the trait for validating/executing the event queries, but they are\nnot really of much consequence to implementing developers."),(0,r.kt)("h2",{id:"to_json"},(0,r.kt)("inlineCode",{parentName:"h2"},"to_json")),(0,r.kt)("p",null,"The JSON object value returned from ",(0,r.kt)("inlineCode",{parentName:"p"},"to_json")," will ultimately be flattened on top of the existing fields present in the\ntargeting attributes. ",(0,r.kt)("strong",{parentName:"p"},"Values present in the targeting attributes by default will be overridden by values in the\nrecorded context.")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-rust"},"// components/nimbus/src/stateful/evaluator.rs\n#[derive(Serialize, Deserialize, Debug, Clone, Default)]\npub struct TargetingAttributes {\n    #[serde(flatten)]\n    pub app_context: AppContext,\n    pub language: Option<String>,\n    pub region: Option<String>,\n    #[serde(flatten)]\n    pub recorded_context: Option<JsonObject>,\n")),(0,r.kt)("p",null,"Below is an example implementation of ",(0,r.kt)("inlineCode",{parentName:"p"},"to_json")," in both Kotlin and Swift."),(0,r.kt)(i.Z,{defaultValue:"kotlin",values:[{label:"Kotlin",value:"kotlin"},{label:"Swift",value:"swift"}],mdxType:"Tabs"},(0,r.kt)(o.Z,{value:"kotlin",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-kotlin"},'// RecordedNimbusContext.kt\noverride fun toJson(): JsonObject {\n  val obj = JSONObject(\n    mapOf(\n      "is_first_run" to isFirstRun,\n      // more fields here\n    ),\n  )\n  return obj\n}\n'))),(0,r.kt)(o.Z,{value:"swift",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-swift"},'// RecordedNimbusContext.swift\nfunc toJson() -> JsonObject {\n  guard let data = try? JSONSerialization.data(withJSONObject: [\n    "is_first_run": isFirstRun,\n  ]),\n  let jsonString = NSString(data: data, encoding: String.Encoding.utf8.rawValue) as? String\n  else {\n    return "{}"\n  }\n  return jsonString\n}\n')))),(0,r.kt)("h2",{id:"get_event_queries"},(0,r.kt)("inlineCode",{parentName:"h2"},"get_event_queries")),(0,r.kt)("p",null,"In both Kotlin and Swift, as long as the member variable for ",(0,r.kt)("inlineCode",{parentName:"p"},"eventQueries")," conforms to the type ",(0,r.kt)("inlineCode",{parentName:"p"},"Map<String, String>"),"\nit can be simply returned from this function."),(0,r.kt)(i.Z,{defaultValue:"kotlin",values:[{label:"Kotlin",value:"kotlin"},{label:"Swift",value:"swift"}],mdxType:"Tabs"},(0,r.kt)(o.Z,{value:"kotlin",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-kotlin"},"// RecordedNimbusContext.kt\noverride fun getEventQueries(): Map<String, String> {\n  return eventQueries\n}\n"))),(0,r.kt)(o.Z,{value:"swift",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-swift"},"// RecordedNimbusContext.swift\nfunc getEventQueries() -> [String: String] {\n  return eventQueries\n}\n")))),(0,r.kt)("h2",{id:"set_event_query_values"},(0,r.kt)("inlineCode",{parentName:"h2"},"set_event_query_values")),(0,r.kt)("p",null,"In both Kotlin and Swift, as long as the member variable for ",(0,r.kt)("inlineCode",{parentName:"p"},"eventQueryValues")," conforms to the type\n",(0,r.kt)("inlineCode",{parentName:"p"},"Map<String, Double>")," it can be simply returned from this function."),(0,r.kt)(i.Z,{defaultValue:"kotlin",values:[{label:"Kotlin",value:"kotlin"},{label:"Swift",value:"swift"}],mdxType:"Tabs"},(0,r.kt)(o.Z,{value:"kotlin",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-kotlin"},"// RecordedNimbusContext.kt\noverride fun setEventQueryValues(eventQueryValues: Map<String, Double>) {\n  this.eventQueryValues = eventQueryValues\n}\n"))),(0,r.kt)(o.Z,{value:"swift",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-swift"},"// RecordedNimbusContext.swift\nfunc setEventQueryValues(eventQueryValues: [String: Double]) {\n  self.eventQueryValues = eventQueryValues\n}\n")))),(0,r.kt)("h2",{id:"record"},(0,r.kt)("inlineCode",{parentName:"h2"},"record")),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"record")," method should actually record the context's value to Glean. The Glean metric's definition can be found in\nthe ",(0,r.kt)("inlineCode",{parentName:"p"},"metrics.yaml")," file."),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://searchfox.org/mozilla-central/source/mobile/android/fenix/app/metrics.yaml"},"Android ",(0,r.kt)("inlineCode",{parentName:"a"},"metrics.yaml"))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://github.com/mozilla-mobile/firefox-ios/blob/main/firefox-ios/Client/metrics.yaml"},"iOS ",(0,r.kt)("inlineCode",{parentName:"a"},"metrics.yaml")))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},"# metrics.yaml\nnimbus_system:\n  recorded_nimbus_context:\n    type: object\n    structure:\n      type: object\n      properties:\n        is_first_run:\n          type: boolean\n        event_query_values:\n          type: object\n          properties:\n            days_opened_in_last_28:\n              type: number\n")),(0,r.kt)("p",null,"The metric definition determines what properties exist for the Glean types, so we must make sure to use those types when\nsetting the value for the metric."),(0,r.kt)(i.Z,{defaultValue:"kotlin",values:[{label:"Kotlin",value:"kotlin"},{label:"Swift",value:"swift"}],mdxType:"Tabs"},(0,r.kt)(o.Z,{value:"kotlin",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-kotlin"},"// RecordedNimbusContext.kt\noverride fun record() {\n  val eventQueryValuesObject = NimbusSystem.RecordedNimbusContextObjectItemEventQueryValuesObject(\n    daysOpenedInLast28 = eventQueryValues[DAYS_OPENED_IN_LAST_28]?.toInt(),\n  )\n  NimbusSystem.recordedNimbusContext.set(\n    NimbusSystem.RecordedNimbusContextObject(\n      isFirstRun = isFirstRun,\n      eventQueryValues = eventQueryValuesObject,\n    ),\n  )\n}\n"))),(0,r.kt)(o.Z,{value:"swift",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-swift"},"// RecordedNimbusContext.swift\nfunc record() {\n  let eventQueryValuesObject = GleanMetrics.NimbusSystem.RecordedNimbusContextObjectItemEventQueryValuesObject(\n    daysOpenedInLast28: eventQueryValues[RecordedNimbusContext.DAYS_OPENED_IN_LAST_28].toInt64()\n  )\n\n  GleanMetrics.NimbusSystem.recordedNimbusContext.set(\n    GleanMetrics.NimbusSystem.RecordedNimbusContextObject(\n      isFirstRun: isFirstRun,\n      eventQueryValues: eventQueryValuesObject,\n    )\n  )\n}\n")))),(0,r.kt)("h3",{id:"additional-methods"},"Additional methods"),(0,r.kt)("p",null,"Two additional methods have also been exposed to assist developers with a) validating their event queries and b)\ncalculating targeting attributes that have historically been provided by the Rust code. ",(0,r.kt)("inlineCode",{parentName:"p"},"validateEventQueries")," is used\nin testing, to ensure the event queries being run are in fact valid event queries."),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"getCalculatedAttributes")," accepts the app installation date, the path to the Nimbus database, and the locale string,\nexecutes some commands in Rust to read from the database and calculate additional fields based on the installation date,\nand returns the resulting values to the caller. It should be used during the construction of any foreign implementation\nof the ",(0,r.kt)("inlineCode",{parentName:"p"},"RecordedContext")," trait."),(0,r.kt)("h2",{id:"adding-new-fields"},"Adding new fields"),(0,r.kt)("p",null,"The new field should be added to the ",(0,r.kt)("inlineCode",{parentName:"p"},"RecordedNimbusContext")," class in each of the following locations:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"the constructor"),(0,r.kt)("li",{parentName:"ul"},"as a member variable ",(0,r.kt)("strong",{parentName:"li"},"(Swift only)")),(0,r.kt)("li",{parentName:"ul"},"the ",(0,r.kt)("inlineCode",{parentName:"li"},"record")," method"),(0,r.kt)("li",{parentName:"ul"},"the ",(0,r.kt)("inlineCode",{parentName:"li"},"toJson")," method"),(0,r.kt)("li",{parentName:"ul"},"the ",(0,r.kt)("inlineCode",{parentName:"li"},"create")," method ",(0,r.kt)("strong",{parentName:"li"},"(Kotlin only)")),(0,r.kt)("li",{parentName:"ul"},"the ",(0,r.kt)("inlineCode",{parentName:"li"},"createForTest")," method ",(0,r.kt)("strong",{parentName:"li"},"(Kotlin only)"))),(0,r.kt)("p",null,"The field also needs to be added to the appropriate ",(0,r.kt)("inlineCode",{parentName:"p"},"metrics.yaml")," file for the application, under the\n",(0,r.kt)("inlineCode",{parentName:"p"},"nimbus_system.recorded_nimbus_context")," metric."),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://searchfox.org/mozilla-central/source/mobile/android/fenix/app/src/main/java/org/mozilla/fenix/experiments/RecordedNimbusContext.kt"},"Android ",(0,r.kt)("inlineCode",{parentName:"a"},"RecordedNimbusContext")," class")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://searchfox.org/mozilla-central/source/mobile/android/fenix/app/metrics.yaml"},"Android ",(0,r.kt)("inlineCode",{parentName:"a"},"metrics.yaml"))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://github.com/mozilla-mobile/firefox-ios/blob/main/firefox-ios/Client/Experiments/RecordedNimbusContext.swift"},"iOS ",(0,r.kt)("inlineCode",{parentName:"a"},"RecordedNimbusContext")," class")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://github.com/mozilla-mobile/firefox-ios/blob/main/firefox-ios/Client/metrics.yaml"},"iOS ",(0,r.kt)("inlineCode",{parentName:"a"},"metrics.yaml")))),(0,r.kt)("admonition",{type:"info"},(0,r.kt)("p",{parentName:"admonition"},"In the future, the goal is for this file and its tests to be statically assessed to ensure all the fields are present where they should be.")),(0,r.kt)("h2",{id:"adding-new-event-queries"},"Adding new event queries"),(0,r.kt)("p",null,"Event queries are marginally simpler to add than new fields. Adding a new one requires the following changes:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"a new ",(0,r.kt)("inlineCode",{parentName:"li"},"const"),"/",(0,r.kt)("inlineCode",{parentName:"li"},"static")," value for the event query's name"),(0,r.kt)("li",{parentName:"ul"},"a new record in the ",(0,r.kt)("inlineCode",{parentName:"li"},"EVENT_QUERIES")," map"),(0,r.kt)("li",{parentName:"ul"},"a new entry in the ",(0,r.kt)("inlineCode",{parentName:"li"},"event_query_values")," property in the ",(0,r.kt)("inlineCode",{parentName:"li"},"nimbus_system.recorded_nimbus_context")," metric")),(0,r.kt)(i.Z,{defaultValue:"kotlin",values:[{label:"Kotlin",value:"kotlin"},{label:"Swift",value:"swift"}],mdxType:"Tabs"},(0,r.kt)(o.Z,{value:"kotlin",mdxType:"TabItem"},(0,r.kt)("p",null,"  ",(0,r.kt)("a",{parentName:"p",href:"https://searchfox.org/mozilla-central/source/mobile/android/fenix/app/metrics.yaml"},(0,r.kt)("inlineCode",{parentName:"a"},"metrics.yaml")),"\n",(0,r.kt)("a",{parentName:"p",href:"https://searchfox.org/mozilla-central/source/mobile/android/fenix/app/src/main/java/org/mozilla/fenix/experiments/RecordedNimbusContext.kt"},(0,r.kt)("inlineCode",{parentName:"a"},"RecordedNimbusContext")," file")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-kotlin"},"/**\n* The following constants are string constants of the keys that appear in the [EVENT_QUERIES] map.\n*/\nconst val DAYS_OPENED_IN_LAST_28 = \"days_opened_in_last_28\"\n\n/**\n* [EVENT_QUERIES] is a map of keys to Nimbus SDK EventStore queries.\n*/\nprivate val EVENT_QUERIES = mapOf(\nDAYS_OPENED_IN_LAST_28 to \"'events.app_opened'|eventCountNonZero('Days', 28, 0)\",\n)\n"))),(0,r.kt)(o.Z,{value:"swift",mdxType:"TabItem"},(0,r.kt)("p",null,"  ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/mozilla-mobile/firefox-ios/blob/main/firefox-ios/Client/metrics.yaml"},(0,r.kt)("inlineCode",{parentName:"a"},"metrics.yaml")),"\n",(0,r.kt)("a",{parentName:"p",href:"https://github.com/mozilla-mobile/firefox-ios/blob/main/firefox-ios/Client/Experiments/RecordedNimbusContext.swift"},(0,r.kt)("inlineCode",{parentName:"a"},"RecordedNimbusContext")," class")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-swift"},"class RecordedNimbusContext: RecordedContext {\n/**\n * The following constants are string constants of the keys that appear in the [EVENT_QUERIES] map.\n */\nstatic let DAYS_OPENED_IN_LAST_28: String = \"days_opened_in_last_28\"\n\n/**\n * [EVENT_QUERIES] is a map of keys to Nimbus SDK EventStore queries.\n */\nstatic let EVENT_QUERIES = [\n  DAYS_OPENED_IN_LAST_28: \"'events.app_opened'|eventCountNonZero('Days', 28, 0)\",\n]\n")))))}f.isMDXComponent=!0}}]);