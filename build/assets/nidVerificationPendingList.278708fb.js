import{Q as z}from"./QImg.6d043c52.js";import{s as A,t as I,r as h,v as g,x as C,N as V,H as M,bs as Y,a as f,d as k,e,f as a,J as o,O as l,L as B,M as U,z as c,Z as H,az as q,K as v,I as w,X as Q,Y as D,U as F,aA as O,aB as E,B as J,P as K}from"./index.73ee47d1.js";import{Q as R}from"./QMarkupTable.13f903f2.js";import{Q as X}from"./QPagination.f82d53b5.js";import{a as Z,Q as G}from"./QBar.fb1d83ac.js";import{Q as j}from"./QTooltip.c5b4d7b2.js";import{C as W}from"./ClosePopup.8bf21f66.js";import{u as ee}from"./use-quasar.f757091f.js";import{C as $}from"./loadiingApi.a5e57147.js";import{w as x}from"./root_url.5e50e74c.js";import"./position-engine.76a16864.js";A("proyojonuserkey",{});const S=A("proyojonloginuser",{});g.title="Requesting To Server...";const te=I("pending nid verification store",()=>{const N=h(1),i=h("Please make sure you have paid correct amount or the transaction id is correct"),m=h(null),n=h(!1);return{currentPage:N,rejectNote:i,pendingNidVerificationList:m,pendingNidVerificationListLoading:n,getPendingNidVerificationList:async()=>{$("pending-nid-verification-list").showLoading();const p={method:"get",url:"api/users/pending_verification",headers:{"Content-Type":"application/json",Authorization:`Bearer ${S.value.token}`},params:{pageSize:2,pageNumber:N.value}};n.value=!0;try{const d=await C.request(p);m.value=d.data,n.value=!1,$("pending-nid-verification-list").hideLoading()}catch(d){console.log(d),$("pending-nid-verification-list").hideLoading(),V.create({position:"center",type:"negative",message:"Couldn't get payment list"}),n.value=!1}},approveNid:async p=>{const d={method:"put",url:"api/users/pending_verification/"+p,headers:{"Content-Type":"application/json",Authorization:`Bearer ${S.value.token}`},data:{nidStatus:"approved",nidVerified:!0,note:""}};n.value=!0,g.showLoader();try{const t=await C.request(d);m.value=t.data,g.hideLoader(),n.value=!1}catch(t){console.log(t),g.hideLoader(),V.create({position:"center",type:"negative",message:"Couldn't get payment list"}),n.value=!1}},rejectNid:async p=>{const d={method:"put",url:"api/users/pending_verification/"+p,headers:{"Content-Type":"application/json",Authorization:`Bearer ${S.value.token}`},data:{nidStatus:"rejected",nidVerified:!1,note:i.value}};n.value=!0,g.showLoader();try{const t=await C.request(d);m.value=t.data,g.hideLoader(),n.value=!1}catch(t){console.log(t),g.hideLoader(),V.create({position:"center",type:"negative",message:"Couldn't get payment list"}),n.value=!1}}}}),ae={class:"container-section-py-sm"},ie={class:"inner-section"},ne={class:"full-width"},oe={class:"bg-blue-grey-2"},se={class:"q-gutter-sm"},ye={__name:"nidVerificationPendingList",setup(N){const i=te();i.getPendingNidVerificationList();const m=M(),n=()=>{i.getPendingNidVerificationList()},r=h(!1),_=h(null),P=ee(),{t:p}=Y(),d=t=>{P.dialog({title:p("reject"),message:"Are you sure to reject this?",prompt:{model:"",type:"text"},cancel:!0,persistent:!0}).onOk(u=>{i.rejectNote=u,i.rejectNid(t)})};return(t,u)=>(f(),k(B,null,[e("div",ae,[e("div",ie,[e("div",ne,[a(q,{class:"border-primary q-pa-md"},{default:o(()=>{var y;return[e("div",null,[a(R,{flat:"",bordered:"",separator:"cell",class:"text-left"},{default:o(()=>{var b;return[e("thead",oe,[e("tr",null,[e("th",null,l(t.$t("serial")),1),e("th",null,l(t.$t("update_date")),1),e("th",null,l(t.$t("nidno")),1),e("th",null,l(t.$t("name")),1),e("th",null,l(t.$t("image")),1),e("th",null,l(t.$t("action")),1)])]),e("tbody",null,[(f(!0),k(B,null,U((b=c(i).pendingNidVerificationList)==null?void 0:b.users,(s,L)=>(f(),k("tr",{key:L,class:J({"bg-blue-grey-1":L%2!=0})},[e("td",null,l(L),1),e("td",null,l(c(K).formatDate(s.updatedAt,"YYYY-MM-DD  HH:mm:ss")),1),e("td",null,l(s.nidNo),1),e("td",null,l(s.name[c(m).language]),1),e("td",null,[a(z,{src:c(x)+(s==null?void 0:s.nidImage)},null,8,["src"])]),e("td",null,[e("div",se,[a(v,{class:"btn-h-39",dense:"",color:"white","text-color":"primary",icon:r.value?"fullscreen_exit":"visibility",onClick:()=>{r.value=!0,_.value=c(x)+(s==null?void 0:s.nidImage)}},null,8,["icon","onClick"]),a(v,{class:"btn-h-39",label:t.$t("approved"),color:"positive",onClick:T=>c(i).approveNid(s._id)},null,8,["label","onClick"]),a(v,{class:"btn-h-39",label:t.$t("reject"),color:"negative",onClick:T=>d(s._id)},null,8,["label","onClick"])])])],2))),128))])]}),_:1}),a(H,{class:"q-mt-md"}),a(X,{class:"q-mt-md",color:"blue-grey-7",modelValue:c(i).currentPage,"onUpdate:modelValue":[u[0]||(u[0]=b=>c(i).currentPage=b),n],max:(y=c(i).pendingNidVerificationList)==null?void 0:y.pages,"max-pages":6,"boundary-numbers":""},null,8,["modelValue","max"])])]}),_:1})])])]),a(E,{modelValue:r.value,"onUpdate:modelValue":u[2]||(u[2]=y=>r.value=y),"full-height":"","full-width":"",maximized:""},{default:o(()=>[a(q,{class:"text-black"},{default:o(()=>[a(Z,{class:"bg-primary text-white"},{default:o(()=>[a(G),a(v,{dense:"",glossy:"",flat:"",icon:"minimize",onClick:u[1]||(u[1]=y=>r.value=!1),disable:!r.value},{default:o(()=>[r.value?(f(),w(j,{key:0,class:"bg-white text-primary"},{default:o(()=>[Q("Minimize")]),_:1})):D("",!0)]),_:1},8,["disable"]),a(v,{dense:"",glossy:"",flat:"",icon:"crop_square"},{default:o(()=>[r.value?D("",!0):(f(),w(j,{key:0,class:"bg-white text-primary"},{default:o(()=>[Q("Maximize")]),_:1}))]),_:1}),F((f(),w(v,{dense:"",glossy:"",flat:"",icon:"close"},{default:o(()=>[a(j,{class:"bg-white text-primary"},{default:o(()=>[Q("Close")]),_:1})]),_:1})),[[W]])]),_:1}),a(O,null,{default:o(()=>[a(z,{src:_.value},null,8,["src"])]),_:1})]),_:1})]),_:1},8,["modelValue"])],64))}};export{ye as default};
