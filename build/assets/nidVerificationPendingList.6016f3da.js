import{Q as $}from"./QImg.7f8412d1.js";import{G as z,aD as T,r as f,bc as I,bd as d,be as L,Z as N,F,bf as M,a as g,d as V,e,f as i,q as s,B as r,K as D,bj as Y,y as u,A as H,s as q,x as m,p as k,I as Q,C as B,v as U,t as E,D as G,H as K,a3 as O}from"./index.274b46b9.js";import{Q as R}from"./QMarkupTable.cb00f4f0.js";import{Q as Z}from"./QPagination.5cea5140.js";import{Q as J}from"./QSpace.b375da17.js";import{Q as w}from"./QTooltip.abe7a508.js";import{Q as W}from"./QBar.608f8fdb.js";import{C as X}from"./ClosePopup.5b7b327c.js";import{u as ee}from"./use-quasar.90b80ee0.js";import{u as te}from"./pendingForApprovalListCountStore.c8a40604.js";import{w as x}from"./root_url.456ded4c.js";import"./position-engine.c98b355a.js";z("proyojonuserkey",{});const j=z("proyojonloginuser",{});I.title="Requesting To Server...";const ae=T("pending nid verification store",()=>{const b=te(),o=f(1),h=f("Please make sure you have paid correct amount or the transaction id is correct"),p=f(null),t=f(!1);return{currentPage:o,rejectNote:h,pendingNidVerificationList:p,pendingNidVerificationListLoading:t,getPendingNidVerificationList:async()=>{d("pending-nid-verification-list").showLoading();const c={method:"get",url:"api/users/pending_verification",headers:{"Content-Type":"application/json",Authorization:`Bearer ${j.value.token}`},params:{pageSize:30,pageNumber:o.value}};t.value=!0;try{const a=await L.request(c);p.value=a.data,t.value=!1,d("pending-nid-verification-list").hideLoading()}catch(a){console.log(a),d("pending-nid-verification-list").hideLoading(),N.create({position:"center",type:"negative",message:"Couldn't get payment list"}),t.value=!1}},approveNid:async c=>{const a={method:"put",url:"api/users/pending_verification/"+c,headers:{"Content-Type":"application/json",Authorization:`Bearer ${j.value.token}`},data:{nidStatus:"approved",nidVerified:!0,note:""}};t.value=!0,d("put-pending-verification").showLoading();try{const n=await L.request(a);p.value=n.data,d("put-pending-verification").hideLoading(),t.value=!1,b.getPendingCount()}catch(n){console.log(n),d("put-pending-verification").hideLoading(),N.create({position:"center",type:"negative",message:"Couldn't get payment list"}),t.value=!1}},rejectNid:async c=>{const a={method:"put",url:"api/users/pending_verification/"+c,headers:{"Content-Type":"application/json",Authorization:`Bearer ${j.value.token}`},data:{nidStatus:"rejected",nidVerified:!1,note:h.value}};t.value=!0,d("put-users-pendinglist").showLoading();try{const n=await L.request(a);p.value=n.data,d("put-users-pendinglist").hideLoading(),t.value=!1,b.getPendingCount()}catch(n){console.log(n),d("put-users-pendinglist").hideLoading(),N.create({position:"center",type:"negative",message:"Couldn't get payment list"}),t.value=!1}}}}),ie={class:"container-section-py-sm"},ne={class:"inner-section"},oe={class:"full-width"},se={class:"bg-blue-grey-2"},le={class:"q-gutter-sm"},Ce={__name:"nidVerificationPendingList",setup(b){const o=ae();o.getPendingNidVerificationList();const h=F(),p=()=>{o.getPendingNidVerificationList()},t=f(!1),C=f(null),S=ee(),{t:P}=M(),c=a=>{S.dialog({title:P("reject"),message:"Are you sure to reject this?",prompt:{model:"",type:"text"},cancel:!0,persistent:!0}).onOk(n=>{o.rejectNote=n,o.rejectNid(a)})};return(a,n)=>(g(),V(D,null,[e("div",ie,[e("div",ne,[e("div",oe,[i(q,{class:"border-primary q-pa-md"},{default:s(()=>{var v;return[e("div",null,[i(R,{flat:"",bordered:"",separator:"cell",class:"text-left"},{default:s(()=>{var y;return[e("thead",se,[e("tr",null,[e("th",null,r(a.$t("serial")),1),e("th",null,r(a.$t("update_date")),1),e("th",null,r(a.$t("nidno")),1),e("th",null,r(a.$t("name")),1),e("th",null,r(a.$t("image")),1),e("th",null,r(a.$t("action")),1)])]),e("tbody",null,[(g(!0),V(D,null,Y((y=u(o).pendingNidVerificationList)==null?void 0:y.users,(l,_)=>(g(),V("tr",{key:_,class:K({"bg-blue-grey-1":_%2!=0})},[e("td",null,r(_),1),e("td",null,r(u(O).formatDate(l.updatedAt,"YYYY-MM-DD  HH:mm:ss")),1),e("td",null,r(l.nidNo),1),e("td",null,r(l.name[u(h).language]),1),e("td",null,[i($,{src:u(x)+(l==null?void 0:l.nidImage)},null,8,["src"])]),e("td",null,[e("div",le,[i(m,{class:"btn-h-39",dense:"",color:"white","text-color":"primary",icon:t.value?"fullscreen_exit":"visibility",onClick:()=>{t.value=!0,C.value=u(x)+(l==null?void 0:l.nidImage)}},null,8,["icon","onClick"]),i(m,{class:"btn-h-39",label:a.$t("approved"),color:"positive",onClick:A=>u(o).approveNid(l._id)},null,8,["label","onClick"]),i(m,{class:"btn-h-39",label:a.$t("reject"),color:"negative",onClick:A=>c(l._id)},null,8,["label","onClick"])])])],2))),128))])]}),_:1}),i(H,{class:"q-mt-md"}),i(Z,{class:"q-mt-md",color:"blue-grey-7",modelValue:u(o).currentPage,"onUpdate:modelValue":[n[0]||(n[0]=y=>u(o).currentPage=y),p],max:(v=u(o).pendingNidVerificationList)==null?void 0:v.pages,"max-pages":6,"boundary-numbers":""},null,8,["modelValue","max"])])]}),_:1})])])]),i(G,{modelValue:t.value,"onUpdate:modelValue":n[2]||(n[2]=v=>t.value=v),"full-height":"","full-width":"",maximized:""},{default:s(()=>[i(q,{class:"text-black"},{default:s(()=>[i(W,{class:"bg-primary text-white"},{default:s(()=>[i(J),i(m,{dense:"",glossy:"",flat:"",icon:"minimize",onClick:n[1]||(n[1]=v=>t.value=!1),disable:!t.value},{default:s(()=>[t.value?(g(),k(w,{key:0,class:"bg-white text-primary"},{default:s(()=>[Q("Minimize")]),_:1})):B("",!0)]),_:1},8,["disable"]),i(m,{dense:"",glossy:"",flat:"",icon:"crop_square"},{default:s(()=>[t.value?B("",!0):(g(),k(w,{key:0,class:"bg-white text-primary"},{default:s(()=>[Q("Maximize")]),_:1}))]),_:1}),U((g(),k(m,{dense:"",glossy:"",flat:"",icon:"close"},{default:s(()=>[i(w,{class:"bg-white text-primary"},{default:s(()=>[Q("Close")]),_:1})]),_:1})),[[X]])]),_:1}),i(E,null,{default:s(()=>[i($,{src:C.value},null,8,["src"])]),_:1})]),_:1})]),_:1},8,["modelValue"])],64))}};export{Ce as default};
