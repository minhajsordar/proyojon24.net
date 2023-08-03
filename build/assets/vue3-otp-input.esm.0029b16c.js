import{bh as D,r as f,w as C,o as T,a as h,d as y,v as $,bi as A,e as b,H as j,C as w,y as P,n as K,K as E,bj as L,p as M}from"./index.274b46b9.js";var B=D({name:"SingleOtpInput",props:{inputType:{type:String,validator:e=>["number","tel","letter-numeric","password"].includes(e),default:"tel"},inputmode:{type:String,default:"numeric"},value:{type:[String,Number]},separator:{type:String},focus:{type:Boolean},inputClasses:{type:[String,Array]},conditionalClass:{type:String},shouldAutoFocus:{type:Boolean},isLastChild:{type:Boolean},placeholder:{type:String},isDisabled:{type:Boolean}},emits:["on-change","on-keydown","on-paste","on-focus","on-blur"],setup(e,u){let{emit:s}=u;const a=f(e.value||""),n=f(null),d=()=>(a.value=a.value.toString(),a.value.length>1&&(a.value=a.value.slice(0,1)),s("on-change",a.value)),p=t=>t>=65&&t<=90,O=t=>t>=48&&t<=57||t>=96&&t<=105,o=t=>{e.isDisabled&&t.preventDefault();const i=t||window.event,g=i.which?i.which:i.keyCode;O(g)||e.inputType==="letter-numeric"&&p(g)||[8,9,13,37,39,46,86].includes(g)?s("on-keydown",t):i.preventDefault()},c=t=>s("on-paste",t),m=()=>(n.value.select(),s("on-focus")),v=()=>s("on-blur");return C(()=>e.value,(t,i)=>{t!==i&&(a.value=t)}),C(()=>e.focus,(t,i)=>{i!==t&&n.value&&e.focus&&(n.value.focus(),n.value.select())}),T(()=>{n.value&&e.focus&&e.shouldAutoFocus&&(n.value.focus(),n.value.select())}),{handleOnChange:d,handleOnKeyDown:o,handleOnPaste:c,handleOnFocus:m,handleOnBlur:v,input:n,model:a,inputTypeValue:e.inputType==="letter-numeric"?"text":e.inputType}}});const V={style:{display:"flex","align-items":"center"}},N=["type","inputmode","placeholder","disabled"],R={key:0},H=["innerHTML"];function W(e,u,s,a,n,d){return h(),y("div",V,[$(b("input",{"data-test":"single-input",type:e.inputTypeValue,inputmode:e.inputmode,placeholder:e.placeholder,disabled:e.isDisabled,ref:"input",min:"0",max:"9",maxlength:"1",pattern:"[0-9]","onUpdate:modelValue":u[0]||(u[0]=p=>e.model=p),class:j([e.inputClasses,e.conditionalClass,{"is-complete":e.model}]),onInput:u[1]||(u[1]=function(){return e.handleOnChange&&e.handleOnChange(...arguments)}),onKeydown:u[2]||(u[2]=function(){return e.handleOnKeyDown&&e.handleOnKeyDown(...arguments)}),onPaste:u[3]||(u[3]=function(){return e.handleOnPaste&&e.handleOnPaste(...arguments)}),onFocus:u[4]||(u[4]=function(){return e.handleOnFocus&&e.handleOnFocus(...arguments)}),onBlur:u[5]||(u[5]=function(){return e.handleOnBlur&&e.handleOnBlur(...arguments)})},null,42,N),[[A,e.model]]),!e.isLastChild&&e.separator?(h(),y("span",R,[b("span",{innerHTML:e.separator},null,8,H)])):w("",!0)])}B.render=W;const q=8,z=37,G=39,U=46;var S=D({name:"Vue3OtpInput",components:{SingleOtpInput:B},props:{value:{type:String,default:"",required:!0},numInputs:{default:4},separator:{type:String,default:"**"},inputClasses:{type:[String,Array]},conditionalClass:{type:Array,default:[]},inputType:{type:String,validator:e=>["number","tel","letter-numeric","password"].includes(e)},inputmode:{type:String,validator:e=>["numeric","text","tel","none"].includes(e),default:"numeric"},shouldAutoFocus:{type:Boolean,default:!1},placeholder:{type:Array,default:[]},isDisabled:{type:Boolean,default:!1}},setup(e,u){let{emit:s}=u;const a=f(0),n=f([]),d=f([]);C(()=>e.value,l=>{const r=P(l).split("");n.value=r},{immediate:!0});const p=l=>{a.value=l},O=()=>{a.value=-1},o=()=>n.value.join("").length===e.numInputs?(s("update:value",n.value.join("")),s("on-complete",n.value.join(""))):"Wait until the user enters the required number of characters",c=l=>{a.value=Math.max(Math.min(e.numInputs-1,l),0)},m=()=>{c(a.value+1)},v=()=>{c(a.value-1)},t=l=>{d.value=Object.assign([],n.value),n.value[a.value]=l,d.value.join("")!==n.value.join("")&&(s("update:value",n.value.join("")),s("on-change",n.value.join("")),o())};return{activeInput:a,otp:n,oldOtp:d,clearInput:()=>{n.value.length>0&&(s("update:value",""),s("on-change","")),n.value=[],a.value=0},handleOnPaste:l=>{l.preventDefault();const r=l.clipboardData.getData("text/plain").slice(0,e.numInputs-a.value).split("");if(e.inputType==="number"&&!r.join("").match(/^\d+$/)||e.inputType==="letter-numeric"&&!r.join("").match(/^\w+$/))return"Invalid pasted data";const I=n.value.slice(0,a.value).concat(r);return I.slice(0,e.numInputs).forEach(function(k,F){n.value[F]=k}),c(I.slice(0,e.numInputs).length),o()},handleOnKeyDown:l=>{switch(l.keyCode){case q:l.preventDefault(),t(""),v();break;case U:l.preventDefault(),t("");break;case z:l.preventDefault(),v();break;case G:l.preventDefault(),m();break}},handleOnBlur:O,changeCodeAtFocus:t,focusInput:c,focusNextInput:m,focusPrevInput:v,handleOnFocus:p,checkFilledAllInputs:o,handleOnChange:l=>{t(l),m()},fillInput:l=>{const r=l.split("");r.length===e.numInputs&&(n.value=r,s("update:value",n.value.join("")),s("on-complete",n.value.join("")))}}}});const J={style:{display:"flex"}},Q={key:0,autocomplete:"off",name:"hidden",type:"text",style:{display:"none"}};function X(e,u,s,a,n,d){const p=K("SingleOtpInput");return h(),y("div",J,[e.inputType==="password"?(h(),y("input",Q)):w("",!0),(h(!0),y(E,null,L(e.numInputs,(O,o)=>(h(),M(p,{key:o,focus:e.activeInput===o,value:e.otp[o],separator:e.separator,"input-type":e.inputType,inputmode:e.inputmode,"input-classes":e.inputClasses,conditionalClass:e.conditionalClass[o],"is-last-child":o===e.numInputs-1,"should-auto-focus":e.shouldAutoFocus,placeholder:e.placeholder[o],"is-disabled":e.isDisabled,onOnChange:e.handleOnChange,onOnKeydown:e.handleOnKeyDown,onOnPaste:e.handleOnPaste,onOnFocus:c=>e.handleOnFocus(o),onOnBlur:e.handleOnBlur},null,8,["focus","value","separator","input-type","inputmode","input-classes","conditionalClass","is-last-child","should-auto-focus","placeholder","is-disabled","onOnChange","onOnKeydown","onOnPaste","onOnFocus","onOnBlur"]))),128))])}S.render=X;var ne=(()=>{const e=S;return e.install=u=>{u.component("Vue3OtpInput",e)},e})();export{ne as e};
