import{aP as z,I as N,H as T,s as B,a as c,J as M,K as S,e,f as l,L as k,z as s,_ as R,P as t,Y as P,d as p,D as A,aA as Q,$ as L,N as E,o as F,X as H,Z as C,du as J,u as K}from"./index.764ef670.js";import{u as X}from"./use-meta.02af9c81.js";import{u as Y}from"./use-quasar.51ae44e7.js";import{u as Z}from"./verifyPhone.d0854d73.js";import{w as G}from"./root_url.456ded4c.js";const W={class:"flex justify-between q-mb-md"},ee=e("div",{class:"fs-20 text-bold"},"Profile Details",-1),se={class:"full-width"},oe={class:"row q-mb-md q-mt-md"},te=e("div",{class:"col-lg-4 col-sm-12 col-12"},[e("span",{class:"text-bold"},"Name:")],-1),le={class:"col-lg-4 col-sm-12 col-12"},ne={class:"row q-mb-md"},ae=e("div",{class:"col-lg-4 col-sm-12 col-12"},[e("span",{class:"text-bold"},"Email:")],-1),ie={class:"col-lg-4 col-sm-12 col-12"},re={class:"row q-mb-md"},ce=e("div",{class:"col-lg-4 col-sm-12 col-12"},[e("span",{class:"text-bold"},"Phone:")],-1),de={class:"col-lg-4 col-sm-12 col-12"},me={key:0},pe={key:1},ue={class:"row q-mb-md"},ge=e("div",{class:"col-lg-4 col-sm-12 col-12"},[e("span",{class:"text-bold"},"Nid No:")],-1),_e={class:"col-lg-4 col-sm-12 col-12"},fe={class:"row q-mb-md"},ve=e("div",{class:"col-lg-4 col-sm-12 col-12"},[e("span",{class:"text-bold"},"presentAddress:")],-1),he={class:"col-lg-4 col-sm-12 col-12"},be={class:"row"},ye=e("div",{class:"col-lg-4 col-sm-12 col-12"},[e("span",{class:"text-bold"},"permanentAddress:")],-1),Ue={class:"col-lg-4 col-sm-12 col-12"},Ie={__name:"profileInformations",setup(O){Y();const m=Z(),o=z(),u=N(),r=T(),n=B("opt-resend",{}),x=()=>{if(!L(n)&&new Date(n.value.timer)>new Date){let i=new Date(new Date(n.value.timer)-new Date);E.create({position:"center",type:"negative",message:`Try again ${i.getMinutes()} minutes later.`});return}let a=new Date;a.setMinutes(a.getMinutes()+10),n.value.timer=a,m.getOtpVerificationCode(g)},g=()=>{m.openOtpVerificationDialogManager()};return(a,i)=>(c(),M(Q,{class:"q-pa-md border-primary"},{default:S(()=>{var _,f,v,h,b,y,U,I,$,w,q,d,D,V;return[e("div",W,[ee,e("div",null,[l(k,{class:"q-mr-sm",label:a.$t("delete"),color:"negative",onClick:i[0]||(i[0]=j=>s(o).deleteRequestDialog=!0)},null,8,["label"]),l(k,{label:a.$t("edit"),color:"primary",onClick:i[1]||(i[1]=j=>a.$router.push("/settings"))},null,8,["label"])])]),e("div",se,[l(R)]),e("div",oe,[te,e("div",le,t((f=(_=s(r))==null?void 0:_.loginUserInfo)==null?void 0:f.name[s(u).language]),1)]),e("div",ne,[ae,e("div",ie,t((h=(v=s(r))==null?void 0:v.loginUserInfo)==null?void 0:h.email),1)]),e("div",re,[ce,e("div",de,[P(t((y=(b=s(r))==null?void 0:b.loginUserInfo)==null?void 0:y.phone)+" ",1),(I=(U=s(r))==null?void 0:U.loginUserInfo)!=null&&I.phoneVerified?(c(),p("span",me,[l(A,{name:"check_circle",color:"green"}),P(" phone verified ")])):(c(),p("span",pe,[l(k,{label:"send otp",size:"xs",dense:"",color:"orange",onClick:x}),l(k,{class:"q-ml-xs",label:"verify otp",size:"xs",dense:"",color:"primary",onClick:g})]))])]),e("div",ue,[ge,e("div",_e,t((w=($=s(r))==null?void 0:$.loginUserInfo)==null?void 0:w.nidNo),1)]),e("div",fe,[ve,e("div",he,t((d=(q=s(r))==null?void 0:q.loginUserInfo)==null?void 0:d.presentAddress[s(u).language]),1)]),e("div",be,[ye,e("div",Ue,t((V=(D=s(r))==null?void 0:D.loginUserInfo)==null?void 0:V.permanentAddress[s(u).language]),1)])]}),_:1}))}},$e={class:"container-section-py-sm"},we={class:"inner-section"},qe={class:"full-width text-blue-grey-8"},xe={class:"flex"},ke=["src"],Ae={class:"q-ml-md"},Se={class:"fs-20 text-bold"},De={class:"fs-13 text-bold text-blue-grey-6 q-mt-sm"},Ve={key:0},Pe={key:1},Oe={__name:"profilePage",setup(O){const m=N(),o=T(),u=K();return F(()=>{o.checkLogin()||u.push("/login")}),X({title:"User Profile",titleTemplate:n=>`${n} - Proyojon24.net`,meta:{description:{name:"description",content:"Page 1"},keywords:{name:"keywords",content:"proyojon24 services service-provider"},equiv:{"http-equiv":"Content-Type",content:"text/html; charset=UTF-8"},ogTitle:{property:"og:title",template(n){return`${n} - Proyojon24.net`}}}}),(n,x)=>(c(),p("div",$e,[e("div",we,[e("div",qe,[l(Q,{class:"q-pa-md q-mb-lg border-primary"},{default:S(()=>{var g,a,i,_,f,v,h,b,y,U,I,$,w,q;return[e("div",xe,[e("div",null,[l(H,{rounded:"",size:"130px"},{default:S(()=>{var d;return[(d=s(o).loginUserInfo)!=null&&d.profileImage?(c(),p("img",{key:0,src:s(G)+s(o).loginUserInfo.profileImage},null,8,ke)):C("",!0)]}),_:1})]),e("div",Ae,[e("div",Se,t((a=(g=s(o))==null?void 0:g.loginUserInfo)==null?void 0:a.name[s(m).language]),1),e("div",De,[l(A,{name:"person"}),e("span",null,t(((i=s(o).loginUserInfo)==null?void 0:i.permission)=="superAdmin"?"Super Admin":((_=s(o).loginUserInfo)==null?void 0:_.permission)=="admin"?"Admin":((f=s(o).loginUserInfo)==null?void 0:f.permission)=="self"?"Service Provider":(v=s(o).loginUserInfo)!=null&&v.permission?"Admin "+s(o).loginUserInfo.permission:""),1),(b=(h=s(o))==null?void 0:h.loginUserInfo)!=null&&b.presentAddress[s(m).language]?(c(),M(A,{key:0,class:"q-ml-sm",name:"location_on"})):C("",!0),e("span",null,t((U=(y=s(o))==null?void 0:y.loginUserInfo)==null?void 0:U.presentAddress[s(m).language]),1),l(A,{class:"q-ml-sm",name:"alternate_email"}),e("span",null,t(($=(I=s(o))==null?void 0:I.loginUserInfo)==null?void 0:$.email),1)]),e("div",null,[(w=s(o).loginUserInfo)!=null&&w.isAvailable?(c(),p("span",Ve,t(n.$t("available")),1)):(c(),p("span",Pe,t(n.$t("not_available")),1)),l(J,{modelValue:s(o).isAvailable,"onUpdate:modelValue":[x[0]||(x[0]=d=>s(o).isAvailable=d),s(o).updateUserAvailablity],color:"green",size:"sm"},null,8,["modelValue","onUpdate:modelValue"])]),e("div",null,t(((q=s(o).loginUserInfo)==null?void 0:q.registrationType)=="paid"?"Premium Register User":"Free Register User"),1)])])]}),_:1}),l(Ie)])])]))}};export{Oe as default};