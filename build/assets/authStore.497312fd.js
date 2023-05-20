import{ab as ue,ac as de,ad as fe,o as pe,ae as R,h as g,L as me,af as Y,ag as ge,Q as ve,p as he,ah as ye,ai as we,R as be,aj as _e,ak as xe,r as C,al as Se,w as X,am as Oe,I as Ae,an as ee,M as Ce,H as Le}from"./index.7f914605.js";import{api as Pe}from"./axios.3a61adb8.js";import{u as ke}from"./vue-i18n.runtime.esm-bundler.71ce1143.js";const ze={title:"Please Wait...",showLoader:function(){let e=document.getElementsByTagName("body"),t=document.createElement("div");t.innerHTML=`<div id="loader-animation-loading" data-v-app=""><div class="loader-animation-loading fullscreen flex flex-center z-max"><div class="loader-animation-loading__backdrop"></div><div class="loader-animation-loading__box column items-center bg-grey-2 text-grey-9"><svg class="loader-spinner text-primary loader-spinner-mat loader-animation-loading__spinner" width="80" height="80" viewBox="25 25 50 50"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke="currentColor" stroke-width="5" stroke-miterlimit="10"></circle></svg><div class="loader-animation-loading__message">${this.title}</div></div></div><!----></div>
   <style>
*,*:before,*:after{box-sizing:inherit;-webkit-tap-highlight-color:transparent;-moz-tap-highlight-color:transparent;}
svg:not(:root){overflow:hidden;}
.loader-spinner{vertical-align:middle;}
.loader-spinner-mat{animation:q-spin 2s linear infinite;transform-origin:center center;}
.loader-spinner-mat .path{stroke-dasharray:1, 200 ;stroke-dashoffset:0 ;animation:q-mat-dash 1.5s ease-in-out infinite;}
.loader-animation-loading{color:#000;position:fixed!important;}
.loader-animation-loading__backdrop{position:fixed;top:0;right:0;bottom:0;left:0;opacity:0.5;z-index:-1;background-color:#000;transition:background-color 0.28s;}
.loader-animation-loading__box{border-radius:4px;padding:18px;color:#fff;max-width:450px;}
.loader-animation-loading__message{margin:40px 20px 0;text-align:center;}
.text-primary{color: #000!important;}
.text-grey-9{color:#424242!important;}
.bg-grey-2{background:#f5f5f5!important;}
.column,.flex{display:flex;flex-wrap:wrap;}
.column{flex-direction:column;}
.flex-center{justify-content:center;}
.items-center,.flex-center{align-items:center;}
.fullscreen{position:fixed;}
.fullscreen{z-index:6000;border-radius:0!important;max-width:100vw;max-height:100vh;}
.fullscreen{top:0;right:0;bottom:0;left:0;}
.z-max{z-index:9998!important;}
/*! CSS Used from: Embedded */
::selection{color:#4f005e;background:rgba(79, 0, 94, 0.1);}
#customLoader{z-index:100000000000000020;}
.loader-animation-loading__box{position:relative;}
.loaderlogo{position:absolute;width:80px;height:80px;}
@keyframes q-spin{0%{transform:rotate3d(0, 0, 1, 0deg) ;}25%{transform:rotate3d(0, 0, 1, 90deg) ;}50%{transform:rotate3d(0, 0, 1, 180deg) ;}75%{transform:rotate3d(0, 0, 1, 270deg) ;}100%{transform:rotate3d(0, 0, 1, 359deg) ;}}
@keyframes q-mat-dash{0%{stroke-dasharray:1, 200;stroke-dashoffset:0;}50%{stroke-dasharray:89, 200;stroke-dashoffset:-35px;}100%{stroke-dasharray:89, 200;stroke-dashoffset:-124px;}}
</style>`,t.id="customLoader",t.className="fullscreen",e[0].appendChild(t),e[0].classList.add("q-body--force-scrollbar-y"),e[0].classList.add("q-body--prevent-scroll")},hideLoader:function(){document.getElementById("customLoader").remove(),document.body.classList.remove("q-body--prevent-scroll"),document.body.classList.remove("q-body--force-scrollbar-y")}};var F=ze;let A,N,B=0,_=null,c={},x={};const te={group:"__default_quasar_group__",delay:0,message:!1,html:!1,spinnerSize:80,spinnerColor:"",messageColor:"",backgroundColor:"",boxClass:"",spinner:ve,customClass:""},re={...te};function je(e){if(e&&e.group!==void 0&&x[e.group]!==void 0)return Object.assign(x[e.group],e);const t=Y(e)===!0&&e.ignoreDefaults===!0?{...te,...e}:{...re,...e};return x[t.group]=t,t}const v=ue({isActive:!1},{show(e){c=je(e);const{group:t}=c;return v.isActive=!0,A!==void 0?(c.uid=B,N.$forceUpdate()):(c.uid=++B,_!==null&&clearTimeout(_),_=setTimeout(()=>{_=null;const r=de("q-loading");A=fe({name:"QLoading",setup(){pe(()=>{R(!0)});function a(){v.isActive!==!0&&A!==void 0&&(R(!1),A.unmount(r),ge(r),A=void 0,N=void 0)}function o(){if(v.isActive!==!0)return null;const n=[g(c.spinner,{class:"q-loading__spinner",color:c.spinnerColor,size:c.spinnerSize})];return c.message&&n.push(g("div",{class:"q-loading__message"+(c.messageColor?` text-${c.messageColor}`:""),[c.html===!0?"innerHTML":"textContent"]:c.message})),g("div",{class:"q-loading fullscreen flex flex-center z-max "+c.customClass.trim(),key:c.uid},[g("div",{class:"q-loading__backdrop"+(c.backgroundColor?` bg-${c.backgroundColor}`:"")}),g("div",{class:"q-loading__box column items-center "+c.boxClass},n)])}return()=>g(me,{name:"q-transition--fade",appear:!0,onAfterLeave:a},o)}},v.__parentApp),N=A.mount(r)},c.delay)),r=>{if(r===void 0||Object(r)!==r){v.hide(t);return}v.show({...r,group:t})}},hide(e){if(v.isActive===!0){if(e===void 0)x={};else{if(x[e]===void 0)return;{delete x[e];const t=Object.keys(x);if(t.length!==0){const r=t[t.length-1];v.show({group:r});return}}}_!==null&&(clearTimeout(_),_=null),v.isActive=!1}},setDefaults(e){Y(e)===!0&&Object.assign(re,e)},install({$q:e,parentApp:t}){e.loading=this,v.__parentApp=t,e.config.loading!==void 0&&this.setDefaults(e.config.loading)}}),Ee=[g("g",{transform:"translate(-20,-20)"},[g("path",{d:"M79.9,52.6C80,51.8,80,50.9,80,50s0-1.8-0.1-2.6l-5.1-0.4c-0.3-2.4-0.9-4.6-1.8-6.7l4.2-2.9c-0.7-1.6-1.6-3.1-2.6-4.5 L70,35c-1.4-1.9-3.1-3.5-4.9-4.9l2.2-4.6c-1.4-1-2.9-1.9-4.5-2.6L59.8,27c-2.1-0.9-4.4-1.5-6.7-1.8l-0.4-5.1C51.8,20,50.9,20,50,20 s-1.8,0-2.6,0.1l-0.4,5.1c-2.4,0.3-4.6,0.9-6.7,1.8l-2.9-4.1c-1.6,0.7-3.1,1.6-4.5,2.6l2.1,4.6c-1.9,1.4-3.5,3.1-5,4.9l-4.5-2.1 c-1,1.4-1.9,2.9-2.6,4.5l4.1,2.9c-0.9,2.1-1.5,4.4-1.8,6.8l-5,0.4C20,48.2,20,49.1,20,50s0,1.8,0.1,2.6l5,0.4 c0.3,2.4,0.9,4.7,1.8,6.8l-4.1,2.9c0.7,1.6,1.6,3.1,2.6,4.5l4.5-2.1c1.4,1.9,3.1,3.5,5,4.9l-2.1,4.6c1.4,1,2.9,1.9,4.5,2.6l2.9-4.1 c2.1,0.9,4.4,1.5,6.7,1.8l0.4,5.1C48.2,80,49.1,80,50,80s1.8,0,2.6-0.1l0.4-5.1c2.3-0.3,4.6-0.9,6.7-1.8l2.9,4.2 c1.6-0.7,3.1-1.6,4.5-2.6L65,69.9c1.9-1.4,3.5-3,4.9-4.9l4.6,2.2c1-1.4,1.9-2.9,2.6-4.5L73,59.8c0.9-2.1,1.5-4.4,1.8-6.7L79.9,52.6 z M50,65c-8.3,0-15-6.7-15-15c0-8.3,6.7-15,15-15s15,6.7,15,15C65,58.3,58.3,65,50,65z",fill:"currentColor"},[g("animateTransform",{attributeName:"transform",type:"rotate",from:"90 50 50",to:"0 50 50",dur:"1s",repeatCount:"indefinite"})])]),g("g",{transform:"translate(20,20) rotate(15 50 50)"},[g("path",{d:"M79.9,52.6C80,51.8,80,50.9,80,50s0-1.8-0.1-2.6l-5.1-0.4c-0.3-2.4-0.9-4.6-1.8-6.7l4.2-2.9c-0.7-1.6-1.6-3.1-2.6-4.5 L70,35c-1.4-1.9-3.1-3.5-4.9-4.9l2.2-4.6c-1.4-1-2.9-1.9-4.5-2.6L59.8,27c-2.1-0.9-4.4-1.5-6.7-1.8l-0.4-5.1C51.8,20,50.9,20,50,20 s-1.8,0-2.6,0.1l-0.4,5.1c-2.4,0.3-4.6,0.9-6.7,1.8l-2.9-4.1c-1.6,0.7-3.1,1.6-4.5,2.6l2.1,4.6c-1.9,1.4-3.5,3.1-5,4.9l-4.5-2.1 c-1,1.4-1.9,2.9-2.6,4.5l4.1,2.9c-0.9,2.1-1.5,4.4-1.8,6.8l-5,0.4C20,48.2,20,49.1,20,50s0,1.8,0.1,2.6l5,0.4 c0.3,2.4,0.9,4.7,1.8,6.8l-4.1,2.9c0.7,1.6,1.6,3.1,2.6,4.5l4.5-2.1c1.4,1.9,3.1,3.5,5,4.9l-2.1,4.6c1.4,1,2.9,1.9,4.5,2.6l2.9-4.1 c2.1,0.9,4.4,1.5,6.7,1.8l0.4,5.1C48.2,80,49.1,80,50,80s1.8,0,2.6-0.1l0.4-5.1c2.3-0.3,4.6-0.9,6.7-1.8l2.9,4.2 c1.6-0.7,3.1-1.6,4.5-2.6L65,69.9c1.9-1.4,3.5-3,4.9-4.9l4.6,2.2c1-1.4,1.9-2.9,2.6-4.5L73,59.8c0.9-2.1,1.5-4.4,1.8-6.7L79.9,52.6 z M50,65c-8.3,0-15-6.7-15-15c0-8.3,6.7-15,15-15s15,6.7,15,15C65,58.3,58.3,65,50,65z",fill:"currentColor"},[g("animateTransform",{attributeName:"transform",type:"rotate",from:"0 50 50",to:"90 50 50",dur:"1s",repeatCount:"indefinite"})])])];he({name:"QSpinnerGears",props:ye,setup(e){const{cSize:t,classes:r}=we(e);return()=>g("svg",{class:r.value,width:t.value,height:t.value,viewBox:"0 0 100 100",preserveAspectRatio:"xMidYMid",xmlns:"http://www.w3.org/2000/svg"},Ee)}});const dt=e=>e&&e.length>0?!0:"Required Feild",ft=e=>e?!0:"Required Feild",pt=e=>e instanceof File?!0:"Please Attach File",mt=e=>/^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/.test(e)?!0:"Seems like not email address",$e=e=>e.replace(/[০-৯]/g,t=>"\u09E6\u09E7\u09E8\u09E9\u09EA\u09EB\u09EC\u09ED\u09EE\u09EF".indexOf(t)),Te=e=>e.replace(/\d/g,t=>"\u09E6\u09E7\u09E8\u09E9\u09EA\u09EB\u09EC\u09ED\u09EE\u09EF"[t]),gt=(e,t)=>{if(t=="en")return $e(e);if(t=="bn")return Te(e)};var y="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";const Ne=e=>{e=encodeURI(e);var t="",r,a,o="",n,l,u,d="",s=0;do r=e.charCodeAt(s++),a=e.charCodeAt(s++),o=e.charCodeAt(s++),n=r>>2,l=(r&3)<<4|a>>4,u=(a&15)<<2|o>>6,d=o&63,isNaN(a)?u=d=64:isNaN(o)&&(d=64),t=t+y.charAt(n)+y.charAt(l)+y.charAt(u)+y.charAt(d),r=a=o="",n=l=u=d="";while(s<e.length);return t},vt=e=>{var t="",r,a,o="",n,l,u,d="",s=0,p=/[^A-Za-z0-9\+\/\=]/g;p.exec(e)&&alert(`There were invalid base64 characters in the input text.
Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='
Expect errors in decoding.`),e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");do n=y.indexOf(e.charAt(s++)),l=y.indexOf(e.charAt(s++)),u=y.indexOf(e.charAt(s++)),d=y.indexOf(e.charAt(s++)),r=n<<2|l>>4,a=(l&15)<<4|u>>2,o=(u&3)<<6|d,t=t+String.fromCharCode(r),u!=64&&(t=t+String.fromCharCode(a)),d!=64&&(t=t+String.fromCharCode(o)),r=a=o="",n=l=u=d="";while(s<e.length);return decodeURI(t)};function Fe(e){return _e()?(xe(e),!0):!1}function q(e){return typeof e=="function"?e():be(e)}const $=typeof window!="undefined",qe=()=>{};function De(e,t){function r(...a){return new Promise((o,n)=>{Promise.resolve(e(()=>t.apply(this,a),{fn:t,thisArg:this,args:a})).then(o).catch(n)})}return r}const ae=e=>e();function Me(e=ae){const t=C(!0);function r(){t.value=!1}function a(){t.value=!0}const o=(...n)=>{t.value&&e(...n)};return{isActive:Se(t),pause:r,resume:a,eventFilter:o}}var V=Object.getOwnPropertySymbols,Ie=Object.prototype.hasOwnProperty,Re=Object.prototype.propertyIsEnumerable,Be=(e,t)=>{var r={};for(var a in e)Ie.call(e,a)&&t.indexOf(a)<0&&(r[a]=e[a]);if(e!=null&&V)for(var a of V(e))t.indexOf(a)<0&&Re.call(e,a)&&(r[a]=e[a]);return r};function Ve(e,t,r={}){const a=r,{eventFilter:o=ae}=a,n=Be(a,["eventFilter"]);return X(e,De(o,t),n)}var Ue=Object.defineProperty,We=Object.defineProperties,Ze=Object.getOwnPropertyDescriptors,j=Object.getOwnPropertySymbols,ne=Object.prototype.hasOwnProperty,oe=Object.prototype.propertyIsEnumerable,U=(e,t,r)=>t in e?Ue(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,Je=(e,t)=>{for(var r in t||(t={}))ne.call(t,r)&&U(e,r,t[r]);if(j)for(var r of j(t))oe.call(t,r)&&U(e,r,t[r]);return e},Ge=(e,t)=>We(e,Ze(t)),He=(e,t)=>{var r={};for(var a in e)ne.call(e,a)&&t.indexOf(a)<0&&(r[a]=e[a]);if(e!=null&&j)for(var a of j(e))t.indexOf(a)<0&&oe.call(e,a)&&(r[a]=e[a]);return r};function Qe(e,t,r={}){const a=r,{eventFilter:o}=a,n=He(a,["eventFilter"]),{eventFilter:l,pause:u,resume:d,isActive:s}=Me(o);return{stop:Ve(e,t,Ge(Je({},n),{eventFilter:l})),pause:u,resume:d,isActive:s}}function Ke(e){var t;const r=q(e);return(t=r==null?void 0:r.$el)!=null?t:r}const E=$?window:void 0;$&&window.document;$&&window.navigator;$&&window.location;function W(...e){let t,r,a,o;if(typeof e[0]=="string"||Array.isArray(e[0])?([r,a,o]=e,t=E):[t,r,a,o]=e,!t)return qe;Array.isArray(r)||(r=[r]),Array.isArray(a)||(a=[a]);const n=[],l=()=>{n.forEach(p=>p()),n.length=0},u=(p,f,S,h)=>(p.addEventListener(f,S,h),()=>p.removeEventListener(f,S,h)),d=X(()=>[Ke(t),q(o)],([p,f])=>{l(),p&&n.push(...r.flatMap(S=>a.map(h=>u(p,S,h,f))))},{immediate:!0,flush:"post"}),s=()=>{d(),l()};return Fe(s),s}const k=typeof globalThis!="undefined"?globalThis:typeof window!="undefined"?window:typeof global!="undefined"?global:typeof self!="undefined"?self:{},z="__vueuse_ssr_handlers__",Ye=Xe();function Xe(){return z in k||(k[z]=k[z]||{}),k[z]}function et(e,t){return Ye[e]||t}function tt(e){return e==null?"any":e instanceof Set?"set":e instanceof Map?"map":e instanceof Date?"date":typeof e=="boolean"?"boolean":typeof e=="string"?"string":typeof e=="object"?"object":Number.isNaN(e)?"any":"number"}var rt=Object.defineProperty,Z=Object.getOwnPropertySymbols,at=Object.prototype.hasOwnProperty,nt=Object.prototype.propertyIsEnumerable,J=(e,t,r)=>t in e?rt(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,G=(e,t)=>{for(var r in t||(t={}))at.call(t,r)&&J(e,r,t[r]);if(Z)for(var r of Z(t))nt.call(t,r)&&J(e,r,t[r]);return e};const ot={boolean:{read:e=>e==="true",write:e=>String(e)},object:{read:e=>JSON.parse(e),write:e=>JSON.stringify(e)},number:{read:e=>Number.parseFloat(e),write:e=>String(e)},any:{read:e=>e,write:e=>String(e)},string:{read:e=>e,write:e=>String(e)},map:{read:e=>new Map(JSON.parse(e)),write:e=>JSON.stringify(Array.from(e.entries()))},set:{read:e=>new Set(JSON.parse(e)),write:e=>JSON.stringify(Array.from(e))},date:{read:e=>new Date(e),write:e=>e.toISOString()}},H="vueuse-storage";function it(e,t,r,a={}){var o;const{flush:n="pre",deep:l=!0,listenToStorageChanges:u=!0,writeDefaults:d=!0,mergeDefaults:s=!1,shallow:p,window:f=E,eventFilter:S,onError:h=i=>{console.error(i)}}=a,O=(p?Oe:C)(t);if(!r)try{r=et("getDefaultStorage",()=>{var i;return(i=E)==null?void 0:i.localStorage})()}catch(i){h(i)}if(!r)return O;const w=q(t),M=tt(w),P=(o=a.serializer)!=null?o:ot[M],{pause:ie,resume:I}=Qe(O,()=>se(O.value),{flush:n,deep:l,eventFilter:S});return f&&u&&(W(f,"storage",T),W(f,H,ce)),T(),O;function se(i){try{if(i==null)r.removeItem(e);else{const m=P.write(i),b=r.getItem(e);b!==m&&(r.setItem(e,m),f&&f.dispatchEvent(new CustomEvent(H,{detail:{key:e,oldValue:b,newValue:m,storageArea:r}})))}}catch(m){h(m)}}function le(i){const m=i?i.newValue:r.getItem(e);if(m==null)return d&&w!==null&&r.setItem(e,P.write(w)),w;if(!i&&s){const b=P.read(m);return typeof s=="function"?s(b,w):M==="object"&&!Array.isArray(b)?G(G({},w),b):b}else return typeof m!="string"?m:P.read(m)}function ce(i){T(i.detail)}function T(i){if(!(i&&i.storageArea!==r)){if(i&&i.key==null){O.value=w;return}if(!(i&&i.key!==e)){ie();try{O.value=le(i)}catch(m){h(m)}finally{i?Ae(I):I()}}}}}function D(e,t,r={}){const{window:a=E}=r;return it(e,t,a==null?void 0:a.localStorage,r)}const Q=D("proyojon24language",{}),st=ee("language store",()=>{const e=ke(),t=C("bn");return{language:t,switchToBn:()=>{e.locale.value=Q.value=t.value="bn"},switchToEn:()=>{e.locale.value=Q.value=t.value="en"}}}),K=D("proyojonuserkey",{}),L=D("proyojonloginuser",{});F.title="Requesting To Server...";const ht=ee("auth store",()=>{const e=Ce(),t=st(),r=C(!1),a=C(null),o=C(!1),n=Le({username:null,email:null,password:null,password2:null,oldPassword:null}),l=()=>{r.value?K.value=Ne(n.email+"seperator"+n.password+"seperator"+r.value):(n.password=null,n.password2=null,n.oldPassword=null,n.email=null,K.value=null)};return{rememberMe:r,loginUserInfo:a,isAuthorized:o,userAuthInfo:n,rememberUserData:l,loginFunc2:async()=>{const p={method:"post",url:"api/users/login",headers:{"Content-Type":"application/json"},data:{email:n.email,password:n.password}};F.showLoader();try{const f=await Pe.request(p);L.value=f.data,a.value=f.data,F.hideLoader(),o.value=!0,l(),t.switchToBn(),e.push("/profile")}catch(f){console.log(f),l()}},logoutFunc:()=>{L.value=null,a.value=null,o.value=!1,e.push("/login")},checkLogin:()=>{function p(f){return Object.keys(f).length===0}return L.value instanceof Object&&p(L.value)?(o.value=!1,e.push("/login"),!1):(a.value=L.value,o.value=!0,!0)}}});export{st as a,ft as b,D as c,vt as d,gt as e,pt as f,mt as i,F as l,dt as r,K as s,ht as u};