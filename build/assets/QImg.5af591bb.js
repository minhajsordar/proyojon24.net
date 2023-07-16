import{g,h as j,r as o,w as Q,i as I,j as a,T as $,k as E,Q as F}from"./index.75f7e92a.js";const H={ratio:[String,Number]};function L(e,r){return g(()=>{const u=Number(e.ratio||(r!==void 0?r.value:void 0));return isNaN(u)!==!0&&u>0?{paddingBottom:`${100/u}%`}:null})}const M=16/9;var P=j({name:"QImg",props:{...H,src:String,srcset:String,sizes:String,alt:String,crossorigin:String,decoding:String,referrerpolicy:String,draggable:Boolean,loading:{type:String,default:"lazy"},fetchpriority:{type:String,default:"auto"},width:String,height:String,initialRatio:{type:[Number,String],default:M},placeholderSrc:String,fit:{type:String,default:"cover"},position:{type:String,default:"50% 50%"},imgClass:String,imgStyle:Object,noSpinner:Boolean,noNativeMenu:Boolean,noTransition:Boolean,spinnerColor:String,spinnerSize:String},emits:["load","error"],setup(e,{slots:r,emit:u}){const h=o(e.initialRatio),S=L(e,h);let t=null,d=!1;const l=[o(null),o(m())],n=o(0),s=o(!1),c=o(!1),w=g(()=>`q-img q-img--${e.noNativeMenu===!0?"no-":""}menu`),C=g(()=>({width:e.width,height:e.height})),T=g(()=>`q-img__image ${e.imgClass!==void 0?e.imgClass+" ":""}q-img__image--with${e.noTransition===!0?"out":""}-transition`),z=g(()=>({...e.imgStyle,objectFit:e.fit,objectPosition:e.position}));Q(()=>y(),_);function y(){return e.src||e.srcset||e.sizes?{src:e.src,srcset:e.srcset,sizes:e.sizes}:null}function m(){return e.placeholderSrc!==void 0?{src:e.placeholderSrc}:null}function _(i){t!==null&&(clearTimeout(t),t=null),c.value=!1,i===null?(s.value=!1,l[n.value^1].value=m()):s.value=!0,l[n.value].value=i}function k({target:i}){d!==!0&&(t!==null&&(clearTimeout(t),t=null),h.value=i.naturalHeight===0?.5:i.naturalWidth/i.naturalHeight,b(i,1))}function b(i,f){d===!0||f===1e3||(i.complete===!0?N(i):t=setTimeout(()=>{t=null,b(i,f+1)},50))}function N(i){d!==!0&&(n.value=n.value^1,l[n.value].value=null,s.value=!1,c.value=!1,u("load",i.currentSrc||i.src))}function B(i){t!==null&&(clearTimeout(t),t=null),s.value=!1,c.value=!0,l[n.value].value=null,l[n.value^1].value=m(),u("error",i)}function q(i){const f=l[i].value,v={key:"img_"+i,class:T.value,style:z.value,crossorigin:e.crossorigin,decoding:e.decoding,referrerpolicy:e.referrerpolicy,height:e.height,width:e.width,loading:e.loading,fetchpriority:e.fetchpriority,"aria-hidden":"true",draggable:e.draggable,...f};return n.value===i?(v.class+=" q-img__image--waiting",Object.assign(v,{onLoad:k,onError:B})):v.class+=" q-img__image--loaded",a("div",{class:"q-img__container absolute-full",key:"img"+i},a("img",v))}function R(){return s.value!==!0?a("div",{key:"content",class:"q-img__content absolute-full q-anchor--skip"},E(r[c.value===!0?"error":"default"])):a("div",{key:"loading",class:"q-img__loading absolute-full flex flex-center"},r.loading!==void 0?r.loading():e.noSpinner===!0?void 0:[a(F,{color:e.spinnerColor,size:e.spinnerSize})])}return _(y()),I(()=>{d=!0,t!==null&&(clearTimeout(t),t=null)}),()=>{const i=[];return S.value!==null&&i.push(a("div",{key:"filler",style:S.value})),c.value!==!0&&(l[0].value!==null&&i.push(q(0)),l[1].value!==null&&i.push(q(1))),i.push(a($,{name:"q-transition--fade"},R)),a("div",{class:w.value,style:C.value,role:"img","aria-label":e.alt},i)}}});export{P as Q};