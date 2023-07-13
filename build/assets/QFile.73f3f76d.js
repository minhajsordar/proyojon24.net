import{Q as K}from"./QChip.121b4c84.js";import{r as E,g as c,m as $,bp as M,am as w,b7 as X,j as p,h as Y,bf as G,aP as H,bg as J,bi as Z,bj as ee,by as te,bk as U,bz as le,bA as ne,bh as ie,b5 as ae}from"./index.73ee47d1.js";function y(e,f,x,h){const u=[];return e.forEach(s=>{h(s)===!0?u.push(s):f.push({failedPropValidation:x,file:s})}),u}function k(e){e&&e.dataTransfer&&(e.dataTransfer.dropEffect="copy"),w(e)}const ue={multiple:Boolean,accept:String,capture:String,maxFileSize:[Number,String],maxTotalSize:[Number,String],maxFiles:[Number,String],filter:Function},re=["rejected"];function se({editable:e,dnd:f,getFileInput:x,addFilesToQueue:h}){const{props:u,emit:s,proxy:b}=$(),F=E(null),z=c(()=>u.accept!==void 0?u.accept.split(",").map(t=>(t=t.trim(),t==="*"?"*/":(t.endsWith("/*")&&(t=t.slice(0,t.length-1)),t.toUpperCase()))):null),V=c(()=>parseInt(u.maxFiles,10)),j=c(()=>parseInt(u.maxTotalSize,10));function _(t){if(e.value)if(t!==Object(t)&&(t={target:null}),t.target!==null&&t.target.matches('input[type="file"]')===!0)t.clientX===0&&t.clientY===0&&M(t);else{const m=x();m&&m!==t.target&&m.click(t)}}function A(t){e.value&&t&&h(null,t)}function D(t,m,S,C){let n=Array.from(m||t.target.files);const d=[],g=()=>{d.length!==0&&s("rejected",d)};if(u.accept!==void 0&&z.value.indexOf("*/")===-1&&(n=y(n,d,"accept",i=>z.value.some(r=>i.type.toUpperCase().startsWith(r)||i.name.toUpperCase().endsWith(r))),n.length===0))return g();if(u.maxFileSize!==void 0){const i=parseInt(u.maxFileSize,10);if(n=y(n,d,"max-file-size",r=>r.size<=i),n.length===0)return g()}if(u.multiple!==!0&&n.length!==0&&(n=[n[0]]),n.forEach(i=>{i.__key=i.webkitRelativePath+i.lastModified+i.name+i.size}),C===!0){const i=S.map(r=>r.__key);n=y(n,d,"duplicate",r=>i.includes(r.__key)===!1)}if(n.length===0)return g();if(u.maxTotalSize!==void 0){let i=C===!0?S.reduce((r,T)=>r+T.size,0):0;if(n=y(n,d,"max-total-size",r=>(i+=r.size,i<=j.value)),n.length===0)return g()}if(typeof u.filter=="function"){const i=u.filter(n);n=y(n,d,"filter",r=>i.includes(r))}if(u.maxFiles!==void 0){let i=C===!0?S.length:0;if(n=y(n,d,"max-files",()=>(i++,i<=V.value)),n.length===0)return g()}if(g(),n.length!==0)return n}function I(t){k(t),f.value!==!0&&(f.value=!0)}function a(t){w(t),(t.relatedTarget!==null||X.is.safari!==!0?t.relatedTarget!==F.value:document.elementsFromPoint(t.clientX,t.clientY).includes(F.value)===!1)===!0&&(f.value=!1)}function N(t){k(t);const m=t.dataTransfer.files;m.length!==0&&h(null,m),f.value=!1}function O(t){if(f.value===!0)return p("div",{ref:F,class:`q-${t}__dnd absolute-full`,onDragenter:k,onDragover:k,onDragleave:a,onDrop:N})}return Object.assign(b,{pickFiles:_,addFiles:A}),{pickFiles:_,addFiles:A,onDragover:I,onDragleave:a,processFiles:D,getDndNode:O,maxFilesNumber:V,maxTotalSizeNumber:j}}var fe=Y({name:"QFile",inheritAttrs:!1,props:{...G,...H,...ue,modelValue:[File,FileList,Array],append:Boolean,useChips:Boolean,displayValue:[String,Number],tabindex:{type:[String,Number],default:0},counterLabel:Function,inputClass:[Array,String,Object],inputStyle:[Array,String,Object]},emits:[...J,...re],setup(e,{slots:f,emit:x,attrs:h}){const{proxy:u}=$(),s=Z(),b=E(null),F=E(!1),z=ee(e),{pickFiles:V,onDragover:j,onDragleave:_,processFiles:A,getDndNode:D}=se({editable:s.editable,dnd:F,getFileInput:Q,addFilesToQueue:R}),I=te(e),a=c(()=>Object(e.modelValue)===e.modelValue?"length"in e.modelValue?Array.from(e.modelValue):[e.modelValue]:[]),N=c(()=>U(a.value)),O=c(()=>a.value.map(l=>l.name).join(", ")),t=c(()=>le(a.value.reduce((l,o)=>l+o.size,0))),m=c(()=>({totalSize:t.value,filesNumber:a.value.length,maxFiles:e.maxFiles})),S=c(()=>({tabindex:-1,type:"file",title:"",accept:e.accept,capture:e.capture,name:z.value,...h,id:s.targetUid.value,disabled:s.editable.value!==!0})),C=c(()=>"q-file q-field--auto-height"+(F.value===!0?" q-file--dnd":"")),n=c(()=>e.multiple===!0&&e.append===!0);function d(l){const o=a.value.slice();o.splice(l,1),i(o)}function g(l){const o=a.value.indexOf(l);o>-1&&d(o)}function i(l){x("update:modelValue",e.multiple===!0?l:l[0])}function r(l){l.keyCode===13&&ae(l)}function T(l){(l.keyCode===13||l.keyCode===32)&&V(l)}function Q(){return b.value}function R(l,o){const v=A(l,o,a.value,n.value),q=Q();q!=null&&(q.value=""),v!==void 0&&((e.multiple===!0?e.modelValue&&v.every(W=>a.value.includes(W)):e.modelValue===v[0])||i(n.value===!0?a.value.concat(v):v))}function P(){return[p("input",{class:[e.inputClass,"q-file__filler"],style:e.inputStyle})]}function B(){if(f.file!==void 0)return a.value.length===0?P():a.value.map((o,v)=>f.file({index:v,file:o,ref:this}));if(f.selected!==void 0)return a.value.length===0?P():f.selected({files:a.value,ref:this});if(e.useChips===!0)return a.value.length===0?P():a.value.map((o,v)=>p(K,{key:"file-"+v,removable:s.editable.value,dense:!0,textColor:e.color,tabindex:e.tabindex,onRemove:()=>{d(v)}},()=>p("span",{class:"ellipsis",textContent:o.name})));const l=e.displayValue!==void 0?e.displayValue:O.value;return l.length!==0?[p("div",{class:e.inputClass,style:e.inputStyle,textContent:l})]:P()}function L(){const l={ref:b,...S.value,...I.value,class:"q-field__input fit absolute-full cursor-pointer",onChange:R};return e.multiple===!0&&(l.multiple=!0),p("input",l)}return Object.assign(s,{fieldClass:C,emitValue:i,hasValue:N,inputRef:b,innerValue:a,floatingLabel:c(()=>N.value===!0||U(e.displayValue)),computedCounter:c(()=>{if(e.counterLabel!==void 0)return e.counterLabel(m.value);const l=e.maxFiles;return`${a.value.length}${l!==void 0?" / "+l:""} (${t.value})`}),getControlChild:()=>D("file"),getControl:()=>{const l={ref:s.targetRef,class:"q-field__native row items-center cursor-pointer",tabindex:e.tabindex};return s.editable.value===!0&&Object.assign(l,{onDragover:j,onDragleave:_,onKeydown:r,onKeyup:T}),p("div",l,[L()].concat(B()))}}),Object.assign(u,{removeAtIndex:d,removeFile:g,getNativeElement:()=>b.value}),ne(u,"nativeEl",()=>b.value),ie(s)}});export{fe as Q};
