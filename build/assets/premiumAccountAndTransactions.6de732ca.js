import{a as i,d as m,e as t,f as n,q as y,B as e,y as o,p as b,x as d,C as h,A as g,O as _,a7 as $,s as k,H as P,ac as C}from"./index.b61b8051.js";import{Q as v}from"./QMarkupTable.a99b9d7a.js";import{Q as M}from"./QPagination.e8f7d367.js";import{u as Q,_ as q,a as B}from"./addRegistrationFeeDialog.1516580b.js";import"./QSpace.e8774a11.js";import"./QTooltip.c8545415.js";import"./position-engine.9af9d4b1.js";import"./QBar.072f4d58.js";import"./QSelect.d55d8f0d.js";import"./QChip.b3219a99.js";import"./QItemLabel.e16268fe.js";import"./ClosePopup.b2fe228e.js";const D={class:"container-section-py-sm"},F={class:"inner-section"},V={class:"full-width"},L={class:"flex justify-between"},w={class:"fs-18"},A={class:"q-gutter-sm"},S={class:"bg-blue-grey-2"},W={__name:"premiumAccountAndTransactions",setup(Y){const a=Q();a.getMyPaymentList(),a.getMyRegistrationPayment();const f=()=>{a.getMyPaymentList()};return(s,c)=>(i(),m(_,null,[t("div",D,[t("div",F,[t("div",V,[n(k,{class:"border-primary q-pa-md"},{default:y(()=>{var p;return[t("div",null,[t("div",L,[t("div",w,e(s.$t("payment_list")),1),t("div",A,[o(a).registrationFeePaid?h("",!0):(i(),b(d,{key:0,label:"Pay Registration Fee",color:"primary",size:"sm",onClick:o(a).registrationFeeDialogManager},null,8,["onClick"])),n(d,{label:"new payment",size:"sm",color:"primary",onClick:o(a).paymentDialogManager},null,8,["onClick"])])]),n(g,{class:"q-my-sm"}),n(v,{flat:"",bordered:"",separator:"cell",class:"text-left"},{default:y(()=>{var r;return[t("thead",S,[t("tr",null,[t("th",null,e(s.$t("serial")),1),t("th",null,e(s.$t("issue_date")),1),t("th",null,e(s.$t("transactionId")),1),t("th",null,e(s.$t("amount")),1),t("th",null,e(s.$t("premium_account_periods")),1),t("th",null,e(s.$t("status")),1),t("th",null,e(s.$t("paymentfor")),1),t("th",null,e(s.$t("note")),1),t("th",null,e(s.$t("action")),1)])]),t("tbody",null,[(i(!0),m(_,null,$((r=o(a).myPaymentList)==null?void 0:r.payments,(l,u)=>(i(),m("tr",{key:u,class:P({"bg-blue-grey-1":u%2!=0})},[t("td",null,e(u),1),t("td",null,e(o(C).formatDate(l.createdAt,"YYYY-MM-DD  HH:mm:ss")),1),t("td",null,e(l.transactionId),1),t("td",null,e(l.amount),1),t("td",null,e(l.periods),1),t("td",null,e(l.status),1),t("td",null,e(l.paymentFor),1),t("td",null,e(l.note),1),t("td",null,[n(d,{label:s.$t("delete"),color:"negative",disable:l.status==="approved",onClick:z=>o(a).deletePayment(l._id)},null,8,["label","disable","onClick"])])],2))),128))])]}),_:1}),n(g,{class:"q-mt-md"}),n(M,{class:"q-mt-md",color:"blue-grey-7",modelValue:o(a).currentPage,"onUpdate:modelValue":[c[0]||(c[0]=r=>o(a).currentPage=r),f],max:(p=o(a).myPaymentList)==null?void 0:p.pages,"max-pages":6,"boundary-numbers":""},null,8,["modelValue","max"])])]}),_:1})])])]),n(q),n(B)],64))}};export{W as default};
