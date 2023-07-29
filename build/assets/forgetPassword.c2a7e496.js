import{K as f,u as m,r as v,M as p,N as g,a1 as _,a as w,d as y,e,f as h,q as b,U as P,y as u,s as x,de as q,a2 as C,a8 as k,a9 as S}from"./index.2501de3d.js";import{u as T}from"./use-meta.21493f53.js";import{_ as V}from"./plugin-vue_export-helper.21dcd24c.js";const j=f("reset password store",()=>{const o=m(),a=v(null);return{phone:a,getResetPassword:async()=>{var l,t,n,c;const i={method:"post",url:"api/users/reset_password",headers:{"Content-Type":"application/json"},data:{phone:a.value}};p("post-resetpass").showLoading();try{const s=await g.request(i);p("post-resetpass").hideLoading(),_.create({position:"center",type:"positive",message:"Check your Phone for one time password"}),o.push("/login")}catch(s){console.log(s),p("post-resetpass").hideLoading(),_.create({position:"center",type:"negative",message:(t=(l=s==null?void 0:s.response)==null?void 0:l.data)!=null&&t.message?(c=(n=s==null?void 0:s.response)==null?void 0:n.data)==null?void 0:c.message:"Could not reset password"})}}}});const r=o=>(k("data-v-adbf2824"),o=o(),S(),o),E=["onKeypress"],I={class:"content-wrapper"},L={class:"content-body"},N={class:"auth-wrapper auth-basic q-px-md"},R={class:"auth-inner q-my-md"},B=r(()=>e("div",{class:"gradient-bg"},null,-1)),K={class:"card-body"},D=r(()=>e("div",{class:"brand-logo"},[e("h2",{class:"brand-text text-primary ms-1"},"Proyojon24")],-1)),U=r(()=>e("h5",{class:"card-title q-mb-xs"}," Get One Time Password ",-1)),G=r(()=>e("p",{class:"card-text q-mb-xs"}," Enter phone number associated with your account ",-1)),M={class:"auth-login-form q-mt-xs",novalidate:"novalidate"},Q={class:"q-mb-md"},$=r(()=>e("div",null,[e("label",{for:"login-email",class:"form-label"},"Phone")],-1)),F={__name:"forgetPassword",setup(o){m();const a=j(),d=v(null),i=()=>{d.value.validate(),!d.value.hasError&&a.getResetPassword()};return T({title:"Login Page",titleTemplate:t=>`${t} - Proyojon24.net`,meta:{description:{name:"description",content:"Page 1"},keywords:{name:"keywords",content:"proyojon24 services service-provider"},equiv:{"http-equiv":"Content-Type",content:"text/html; charset=UTF-8"},ogTitle:{property:"og:title",template(t){return`${t} - Proyojon24.net`}}}}),(t,n)=>(w(),y("div",{class:"app-content content",onKeypress:q(i,["enter"])},[e("div",I,[e("div",L,[e("div",N,[e("div",R,[h(x,{class:"card q-mb-none"},{default:b(()=>[B,e("div",K,[D,U,G,e("div",M,[e("div",Q,[$,e("div",null,[h(P,{ref_key:"phoneEl",ref:d,class:"full-width",modelValue:u(a).phone,"onUpdate:modelValue":n[0]||(n[0]=c=>u(a).phone=c),type:"text",placeholder:"phone/email",outlined:"",dense:"",rules:[u(C)]},null,8,["modelValue","rules"])])]),e("button",{class:"btn btn-primary w-100 waves-effect waves-float waves-light",tabindex:"4",onClick:i}," Get Verification Code ")])])]),_:1})])])])])],40,E))}};var H=V(F,[["__scopeId","data-v-adbf2824"]]);export{H as default};
