import{Q as X}from"./QChip.1d6fe426.js";import{r as E,g as c,a8 as W,b9 as Y,aC as $,aJ as K,j as b,h as M,aW as H,b2 as J,aX as Z,aZ as G,b3 as ee,bp as te,b4 as U,bq as le,br as ne,aY as ae,aH as ie}from"./index.274b46b9.js";function y(e,f,x,h){const u=[];return e.forEach(s=>{h(s)===!0?u.push(s):f.push({failedPropValidation:x,file:s})}),u}function P(e){e&&e.dataTransfer&&(e.dataTransfer.dropEffect="copy"),$(e)}const ue={multiple:Boolean,accept:String,capture:String,maxFileSize:[Number,String],maxTotalSize:[Number,String],maxFiles:[Number,String],filter:Function},re=["rejected"];function se({editable:e,dnd:f,getFileInput:x,addFilesToQueue:h}){const{props:u,emit:s,proxy:p}=W(),F=E(null),z=c(()=>u.accept!==void 0?u.accept.split(",").map(t=>(t=t.trim(),t==="*"?"*/":(t.endsWith("/*")&&(t=t.slice(0,t.length-1)),t.toUpperCase()))):null),V=c(()=>parseInt(u.maxFiles,10)),j=c(()=>parseInt(u.maxTotalSize,10));function _(t){if(e.value)if(t!==Object(t)&&(t={target:null}),t.target!==null&&t.target.matches('input[type="file"]')===!0)t.clientX===0&&t.clientY===0&&Y(t);else{const m=x();m&&m!==t.target&&m.click(t)}}function N(t){e.value&&t&&h(null,t)}function k(t,m,S,C){let n=Array.from(m||t.target.files);const d=[],g=()=>{d.length!==0&&s("rejected",d)};if(u.accept!==void 0&&z.value.indexOf("*/")===-1&&(n=y(n,d,"accept",a=>z.value.some(r=>a.type.toUpperCase().startsWith(r)||a.name.toUpperCase().endsWith(r))),n.length===0))return g();if(u.maxFileSize!==void 0){const a=parseInt(u.maxFileSize,10);if(n=y(n,d,"max-file-size",r=>r.size<=a),n.length===0)return g()}if(u.multiple!==!0&&n.length!==0&&(n=[n[0]]),n.forEach(a=>{a.__key=a.webkitRelativePath+a.lastModified+a.name+a.size}),C===!0){const a=S.map(r=>r.__key);n=y(n,d,"duplicate",r=>a.includes(r.__key)===!1)}if(n.length===0)return g();if(u.maxTotalSize!==void 0){let a=C===!0?S.reduce((r,T)=>r+T.size,0):0;if(n=y(n,d,"max-total-size",r=>(a+=r.size,a<=j.value)),n.length===0)return g()}if(typeof u.filter=="function"){const a=u.filter(n);n=y(n,d,"filter",r=>a.includes(r))}if(u.maxFiles!==void 0){let a=C===!0?S.length:0;if(n=y(n,d,"max-files",()=>(a++,a<=V.value)),n.length===0)return g()}if(g(),n.length!==0)return n}function I(t){P(t),f.value!==!0&&(f.value=!0)}function i(t){$(t),(t.relatedTarget!==null||K.is.safari!==!0?t.relatedTarget!==F.value:document.elementsFromPoint(t.clientX,t.clientY).includes(F.value)===!1)===!0&&(f.value=!1)}function A(t){P(t);const m=t.dataTransfer.files;m.length!==0&&h(null,m),f.value=!1}function O(t){if(f.value===!0)return b("div",{ref:F,class:`q-${t}__dnd absolute-full`,onDragenter:P,onDragover:P,onDragleave:i,onDrop:A})}return Object.assign(p,{pickFiles:_,addFiles:N}),{pickFiles:_,addFiles:N,onDragover:I,onDragleave:i,processFiles:k,getDndNode:O,maxFilesNumber:V,maxTotalSizeNumber:j}}var fe=M({name:"QFile",inheritAttrs:!1,props:{...H,...J,...ue,modelValue:[File,FileList,Array],append:Boolean,useChips:Boolean,displayValue:[String,Number],tabindex:{type:[String,Number],default:0},counterLabel:Function,inputClass:[Array,String,Object],inputStyle:[Array,String,Object]},emits:[...Z,...re],setup(e,{slots:f,emit:x,attrs:h}){const{proxy:u}=W(),s=G(),p=E(null),F=E(!1),z=ee(e),{pickFiles:V,onDragover:j,onDragleave:_,processFiles:N,getDndNode:k}=se({editable:s.editable,dnd:F,getFileInput:Q,addFilesToQueue:R}),I=te(e),i=c(()=>Object(e.modelValue)===e.modelValue?"length"in e.modelValue?Array.from(e.modelValue):[e.modelValue]:[]),A=c(()=>U(i.value)),O=c(()=>i.value.map(l=>l.name).join(", ")),t=c(()=>le(i.value.reduce((l,o)=>l+o.size,0))),m=c(()=>({totalSize:t.value,filesNumber:i.value.length,maxFiles:e.maxFiles})),S=c(()=>({tabindex:-1,type:"file",title:"",accept:e.accept,capture:e.capture,name:z.value,...h,id:s.targetUid.value,disabled:s.editable.value!==!0})),C=c(()=>"q-file q-field--auto-height"+(F.value===!0?" q-file--dnd":"")),n=c(()=>e.multiple===!0&&e.append===!0);function d(l){const o=i.value.slice();o.splice(l,1),a(o)}function g(l){const o=i.value.indexOf(l);o>-1&&d(o)}function a(l){x("update:modelValue",e.multiple===!0?l:l[0])}function r(l){l.keyCode===13&&ie(l)}function T(l){(l.keyCode===13||l.keyCode===32)&&V(l)}function Q(){return p.value}function R(l,o){const v=N(l,o,i.value,n.value),q=Q();q!=null&&(q.value=""),v!==void 0&&((e.multiple===!0?e.modelValue&&v.every(L=>i.value.includes(L)):e.modelValue===v[0])||a(n.value===!0?i.value.concat(v):v))}function D(){return[b("input",{class:[e.inputClass,"q-file__filler"],style:e.inputStyle})]}function w(){if(f.file!==void 0)return i.value.length===0?D():i.value.map((o,v)=>f.file({index:v,file:o,ref:this}));if(f.selected!==void 0)return i.value.length===0?D():f.selected({files:i.value,ref:this});if(e.useChips===!0)return i.value.length===0?D():i.value.map((o,v)=>b(X,{key:"file-"+v,removable:s.editable.value,dense:!0,textColor:e.color,tabindex:e.tabindex,onRemove:()=>{d(v)}},()=>b("span",{class:"ellipsis",textContent:o.name})));const l=e.displayValue!==void 0?e.displayValue:O.value;return l.length!==0?[b("div",{class:e.inputClass,style:e.inputStyle,textContent:l})]:D()}function B(){const l={ref:p,...S.value,...I.value,class:"q-field__input fit absolute-full cursor-pointer",onChange:R};return e.multiple===!0&&(l.multiple=!0),b("input",l)}return Object.assign(s,{fieldClass:C,emitValue:a,hasValue:A,inputRef:p,innerValue:i,floatingLabel:c(()=>A.value===!0||U(e.displayValue)),computedCounter:c(()=>{if(e.counterLabel!==void 0)return e.counterLabel(m.value);const l=e.maxFiles;return`${i.value.length}${l!==void 0?" / "+l:""} (${t.value})`}),getControlChild:()=>k("file"),getControl:()=>{const l={ref:s.targetRef,class:"q-field__native row items-center cursor-pointer",tabindex:e.tabindex};return s.editable.value===!0&&Object.assign(l,{onDragover:j,onDragleave:_,onKeydown:r,onKeyup:T}),b("div",l,[B()].concat(w()))}}),Object.assign(u,{removeAtIndex:d,removeFile:g,getNativeElement:()=>p.value}),ne(u,"nativeEl",()=>p.value),ae(s)}});export{fe as Q};
