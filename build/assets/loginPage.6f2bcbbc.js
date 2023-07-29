import{r as p,m as b,o as y,di as _,dj as w,a as x,d as P,e,f as l,q as i,U as f,y as n,z as q,a3 as I,I as V,s as k,de as E,u as j,n as C,V as g,a8 as A,a9 as M}from"./index.2501de3d.js";import{Q}from"./QTooltip.156198cc.js";import{u as S}from"./use-meta.21493f53.js";import{_ as T}from"./plugin-vue_export-helper.21dcd24c.js";import"./position-engine.4c79bc21.js";const s=d=>(A("data-v-20c710e1"),d=d(),M(),d),U=["onKeypress"],B={class:"content-wrapper"},D={class:"content-body"},N={class:"auth-wrapper auth-basic q-px-md"},F={class:"auth-inner q-my-md"},K=s(()=>e("div",{class:"gradient-bg"},null,-1)),R={class:"card-body"},$=s(()=>e("div",{class:"brand-logo"},[e("h2",{class:"brand-text text-primary ms-1"},"Proyojon24")],-1)),z=s(()=>e("h5",{class:"card-title q-mb-xs"}," Welcome to Proyojon24.net! \u{1F44B} ",-1)),L=s(()=>e("p",{class:"card-text q-mb-xs"}," Please sign-in to your account and start the adventure ",-1)),O={class:"auth-login-form q-mt-xs",novalidate:"novalidate"},W={class:"q-mb-md"},G=s(()=>e("div",null,[e("label",{for:"login-email",class:"form-label"},"Email")],-1)),H={class:"q-mb-xs"},J={class:"d-flex justify-content-between"},X=s(()=>e("small",{class:"form-label",for:"login-password"},"Password",-1)),Y=s(()=>e("small",null,"Forgot Password?",-1)),Z={class:"input-group input-group-merge form-password-toggle"},ee=s(()=>e("div",null,null,-1)),te={class:"q-mb-md"},se={class:"text-center mt-2"},oe=s(()=>e("span",null,"New on our platform?",-1)),ae=s(()=>e("span",null,"Create an account",-1)),le={__name:"loginPage",setup(d){j();const u=p(!0),c=p(null),m=p(null),t=b(),v=()=>{c.value.validate(),m.value.validate(),!(c.value.hasError||m.value.hasError)&&t.loginFunc2()};return y(()=>{if(_.value instanceof Object)console.log("null value");else if(_.value){const o=w(_.value).split("seperator");t.userAuthInfo.email=o[0],t.userAuthInfo.password=o[1],t.rememberMe=Boolean(o[2])}}),S({title:"Login Page",titleTemplate:o=>`${o} - Proyojon24.net`,meta:{description:{name:"description",content:"Page 1"},keywords:{name:"keywords",content:"proyojon24 services service-provider"},equiv:{"http-equiv":"Content-Type",content:"text/html; charset=UTF-8"},ogTitle:{property:"og:title",template(o){return`${o} - Proyojon24.net`}}}}),(o,a)=>{const h=C("router-link");return x(),P("div",{class:"app-content content",onKeypress:E(v,["enter"])},[e("div",B,[e("div",D,[e("div",N,[e("div",F,[l(k,{class:"card q-mb-none"},{default:i(()=>[K,e("div",R,[$,z,L,e("div",O,[e("div",W,[G,e("div",null,[l(f,{ref_key:"emailEl",ref:c,class:"full-width",modelValue:n(t).userAuthInfo.email,"onUpdate:modelValue":a[0]||(a[0]=r=>n(t).userAuthInfo.email=r),type:"text",placeholder:"phone/email",outlined:"",dense:"",rules:[n(g)]},null,8,["modelValue","rules"])])]),e("div",H,[e("div",J,[X,l(h,{to:"/forget_password"},{default:i(()=>[Y]),_:1})]),e("div",Z,[l(f,{ref_key:"passwordEl",ref:m,class:"full-width",modelValue:n(t).userAuthInfo.password,"onUpdate:modelValue":a[2]||(a[2]=r=>n(t).userAuthInfo.password=r),placeholder:"******",outlined:"",dense:"",type:u.value?"password":"text",rules:[n(g)]},{append:i(()=>[l(q,{name:u.value?"visibility_off":"visibility",class:"cursor-pointer",onClick:a[1]||(a[1]=r=>u.value=!u.value)},null,8,["name"])]),_:1},8,["modelValue","type","rules"]),ee])]),e("div",te,[l(I,{label:"Remember Me",modelValue:n(t).rememberMe,"onUpdate:modelValue":a[3]||(a[3]=r=>n(t).rememberMe=r),size:"xs",style:{"margin-left":"-7px"}},{default:i(()=>[l(Q,null,{default:i(()=>[V("Remember Email and Password. Don't check remember me option while you are using public computer.")]),_:1})]),_:1},8,["modelValue"])]),e("button",{class:"btn btn-primary w-100 waves-effect waves-float waves-light",tabindex:"4",onClick:v}," Sign in ")]),e("p",se,[oe,l(h,{to:"/register"},{default:i(()=>[ae]),_:1})])])]),_:1})])])])])],40,U)}}};var me=T(le,[["__scopeId","data-v-20c710e1"]]);export{me as default};
