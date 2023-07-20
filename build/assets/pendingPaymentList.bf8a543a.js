import{s as k,t as w,r as m,v as B,C as u,x as h,N as v,bs as D,a as f,d as P,e,f as d,K as _,P as t,M as j,O as Q,z as c,_ as S,aA as A,B as N,R as z,L as C}from"./index.ac7231d3.js";import{Q as T}from"./QMarkupTable.364e33d1.js";import{Q as V}from"./QPagination.7cd55aeb.js";import{_ as M,a as Y}from"./addRegistrationFeeDialog.04d5463e.js";import{u as F}from"./use-quasar.160f11e3.js";import"./QBar.fa02d1c3.js";import"./QTooltip.b4c807b6.js";import"./position-engine.cf20c943.js";import"./QSelect.37b12404.js";import"./QChip.e89b8b67.js";import"./QItem.1e2bb0ee.js";import"./QItemLabel.b1a21688.js";import"./ClosePopup.4f8118ce.js";k("proyojonuserkey",{});const L=k("proyojonloginuser",{});B.title="Requesting To Server...";const I=w("pending payment store",()=>{const g=m(1),n=m("Please make sure you have paid correct amount or the transaction id is correct"),p=m(null),s=m(!1);return{currentPage:g,rejectNote:n,pendingPaymentList:p,pendingPaymentListLoading:s,getPendingPaymentList:async()=>{u("pending-payment-list").showLoading();const r={method:"get",url:"api/payments/pending",headers:{"Content-Type":"application/json",Authorization:`Bearer ${L.value.token}`},params:{pageSize:1,pageNumber:g.value}};s.value=!0;try{const l=await h.request(r);p.value=l.data,s.value=!1,u("pending-payment-list").hideLoading()}catch(l){console.log(l),u("pending-payment-list").hideLoading(),v.create({position:"center",type:"negative",message:"Couldn't get payment list"}),s.value=!1}},approvePayment:async r=>{const l={method:"put",url:"api/payments/"+r,headers:{"Content-Type":"application/json",Authorization:`Bearer ${L.value.token}`},data:{note:"",status:"approved"}};s.value=!0,u("put-payments").showLoading();try{const o=await h.request(l);p.value=o.data,u("put-payments").hideLoading(),s.value=!1}catch(o){console.log(o),u("put-payments").hideLoading(),v.create({position:"center",type:"negative",message:"Couldn't get payment list"}),s.value=!1}},rejectPayment:async r=>{const l={method:"put",url:"api/payments/"+r,headers:{"Content-Type":"application/json",Authorization:`Bearer ${L.value.token}`},data:{note:n.value,status:"rejected"}};s.value=!0,u("put-payments-id").showLoading();try{const o=await h.request(l);p.value=o.data,u("put-payments-id").hideLoading(),s.value=!1}catch(o){console.log(o),u("put-payments-id").hideLoading(),v.create({position:"center",type:"negative",message:"Couldn't get payment list"}),s.value=!1}}}}),H={class:"container-section-py-sm"},O={class:"inner-section"},R={class:"full-width"},U={class:"bg-blue-grey-2"},oe={__name:"pendingPaymentList",setup(g){const n=I();n.getPendingPaymentList();const p=()=>{n.getPendingPaymentList()},s=F(),{t:$}=D(),b=a=>{s.dialog({title:$("reject"),message:"Are you sure to reject this?",prompt:{model:"",type:"text"},cancel:!0,persistent:!0}).onOk(r=>{n.rejectNote=r,n.rejectPayment(a)})};return(a,r)=>(f(),P(j,null,[e("div",H,[e("div",O,[e("div",R,[d(A,{class:"border-primary q-pa-md"},{default:_(()=>{var l;return[e("div",null,[d(T,{flat:"",bordered:"",separator:"cell",class:"text-left"},{default:_(()=>{var o;return[e("thead",U,[e("tr",null,[e("th",null,t(a.$t("serial")),1),e("th",null,t(a.$t("issue_date")),1),e("th",null,t(a.$t("transactionId")),1),e("th",null,t(a.$t("amount")),1),e("th",null,t(a.$t("premium_account_periods")),1),e("th",null,t(a.$t("status")),1),e("th",null,t(a.$t("paymentfor")),1),e("th",null,t(a.$t("note")),1),e("th",null,t(a.$t("action")),1)])]),e("tbody",null,[(f(!0),P(j,null,Q((o=c(n).pendingPaymentList)==null?void 0:o.payments,(i,y)=>(f(),P("tr",{key:y,class:N({"bg-blue-grey-1":y%2!=0})},[e("td",null,t(y),1),e("td",null,t(c(z).formatDate(i.createdAt,"YYYY-MM-DD  HH:mm:ss")),1),e("td",null,t(i.transactionId),1),e("td",null,t(i.amount),1),e("td",null,t(i.periods),1),e("td",null,t(i.status),1),e("td",null,t(i.paymentFor),1),e("td",null,t(i.note),1),e("td",null,[d(C,{label:a.$t("approved"),color:"positive",onClick:q=>c(n).approvePayment(i._id)},null,8,["label","onClick"]),d(C,{label:a.$t("reject"),color:"negative",onClick:q=>b(i._id)},null,8,["label","onClick"])])],2))),128))])]}),_:1}),d(S,{class:"q-mt-md"}),d(V,{class:"q-mt-md",color:"blue-grey-7",modelValue:c(n).currentPage,"onUpdate:modelValue":[r[0]||(r[0]=o=>c(n).currentPage=o),p],max:(l=c(n).pendingPaymentList)==null?void 0:l.pages,"max-pages":6,"boundary-numbers":""},null,8,["modelValue","max"])])]}),_:1})])])]),d(M),d(Y)],64))}};export{oe as default};
