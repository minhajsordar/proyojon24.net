import{t as $,G as k,ah as R,r as L,v as F,x as v,N as h,H as q,bs as A,a as _,d as C,f as u,J as M,e,O as g,L as E,M as I,z as r,B as U,dw as V,K as S,aA as j,A as b,az as Q,aF as w}from"./index.73ee47d1.js";import{Q as D}from"./QMarkupTable.13f903f2.js";import{C as i}from"./loadiingApi.a5e57147.js";import{u as T}from"./use-quasar.f757091f.js";F.title="Requesting To Server...";const B=$("monthly fee store",()=>{const p=k(),a=R({amount:0,employeeCount:0}),l=L(null),c=async()=>{const s={method:"get",url:"api/monthlyfee",headers:{"Content-Type":"application/json"}};i("monthly-fee-list").showLoading();try{const t=await v.request(s);l.value=t.data,i("monthly-fee-list").hideLoading()}catch(t){i("monthly-fee-list").hideLoading(),console.log(t)}};return{monthlyFeeInfo:a,monthlyFeeData:l,getMonthlyFeeList:c,createMonthlyFee:async()=>{const s=a,t={method:"post",url:"api/monthlyfee",headers:{"Content-Type":"application/json",Authorization:`Bearer ${p.loginUserInfo.token}`},data:s};i("monthly-fee-create").showLoading();try{const o=await v.request(t);c(),i("monthly-fee-create").hideLoading(),h.create({message:"Successfully Created Monthly Fee",type:"positive",position:"center"})}catch(o){console.log(o),i("monthly-fee-create").hideLoading(),h.create({message:"Failed to Create Monthly Fee",type:"negative",position:"center"})}},updateMonthlyFee:async()=>{const s=a,t={method:"put",url:"api/monthlyfee/"+l.value[0]._id,headers:{"Content-Type":"application/json",Authorization:`Bearer ${p.loginUserInfo.token}`},data:s};F.showLoader();try{const o=await v.request(t);c(),F.hideLoader(),h.create({message:"Successfully Updated Monthly Fee",type:"positive",position:"center"})}catch(o){console.log(o),F.hideLoader(),h.create({message:"Failed to Update Monthly Fee",type:"negative",position:"center"})}},deleteMonthlyFee:async s=>{const t={method:"delete",url:"api/monthlyfee/"+s,headers:{"Content-Type":"application/json",Authorization:`Bearer ${p.loginUserInfo.token}`}};F.showLoader();try{const o=await v.request(t);c(),F.hideLoader(),h.create({message:"Successfully Updated Monthly Fee",type:"positive",position:"center"})}catch(o){console.log(o),F.hideLoader(),h.create({message:"Failed to Update Monthly Fee",type:"negative",position:"center"})}}}}),N={class:"bg-blue-grey-2"},O={__name:"monthlyFeeMethodeList",setup(p){const a=B(),l=q(),c=T(),{t:m}=A(),y=n=>{c.dialog({title:m("confirm"),message:"Are you sure you want to delete monthly fee data",cancel:!0,persistent:!0}).onOk(()=>{a.deleteMonthlyFee(n)})};return(n,s)=>(_(),C("div",null,[u(D,{flat:"",bordered:"",separator:"cell",class:"text-left"},{default:M(()=>{var t;return[e("thead",N,[e("tr",null,[e("th",null,g(n.$t("serial")),1),e("th",null,g(n.$t("amount")),1),e("th",null,g(n.$t("employeecount")),1),e("th",null,g(n.$t("action")),1)])]),e("tbody",null,[(_(!0),C(E,null,I((t=r(a).monthlyFeeData)==null?void 0:t.monthlyFees,(o,d)=>(_(),C("tr",{key:d,class:U({"bg-blue-grey-1":d%2!=0})},[e("td",null,g(r(V)(String(d+1),r(l).language)),1),e("td",null,g(o.amount),1),e("td",null,g(o.employeeCount),1),e("td",null,[u(S,{class:"q-ml-xs",label:n.$t("delete"),size:"sm",dense:"",glossy:"",color:"negative",onClick:f=>y(o._id)},null,8,["label","onClick"])])],2))),128))])]}),_:1})]))}};F.title="Requesting To Server...";const z=$("registration fee store",()=>{const p=k(),a=R({amount:0,employeeCount:0}),l=L(null),c=async()=>{const s={method:"get",url:"api/registrationfee",headers:{"Content-Type":"application/json"}};i("registration-fee-list").showLoading();try{const t=await v.request(s);l.value=t.data,i("registration-fee-list").hideLoading()}catch(t){console.log(t),i("registration-fee-list").hideLoading()}};return{registrationFeeInfo:a,registrationFeeData:l,getRegistrationFeeList:c,createRegistrationFee:async()=>{const s=a,t={method:"post",url:"api/registrationfee",headers:{"Content-Type":"application/json",Authorization:`Bearer ${p.loginUserInfo.token}`},data:s};i("registration-fee-create").showLoading();try{const o=await v.request(t);c(),i("registration-fee-create").hideLoading(),h.create({message:"Successfully Created Registration Fee",type:"positive",position:"center"})}catch(o){console.log(o),i("registration-fee-create").hideLoading(),h.create({message:"Failed to Create Registration Fee",type:"negative",position:"center"})}},updateRegistrationFee:async()=>{const s={registrationFeeInfo:a},t={method:"put",url:"api/registrationfee/"+l.value[0]._id,headers:{"Content-Type":"application/json",Authorization:`Bearer ${p.loginUserInfo.token}`},data:s};i("registration-fee-update").showLoading();try{const o=await v.request(t);c(),i("registration-fee-update").hideLoading(),h.create({message:"Successfully Updated Registration Fee",type:"positive",position:"center"})}catch(o){console.log(o),i("registration-fee-update").hideLoading(),h.create({message:"Failed to Update Registration Fee",type:"negative",position:"center"})}},deleteRegistrationFee:async s=>{const t={method:"delete",url:"api/registrationfee/"+s,headers:{"Content-Type":"application/json",Authorization:`Bearer ${p.loginUserInfo.token}`}};i("registration-fee-delete").showLoading();try{const o=await v.request(t);c(),i("registration-fee-delete").hideLoading(),h.create({message:"Successfully Updated Registration Fee",type:"positive",position:"center"})}catch(o){console.log(o),i("registration-fee-delete").hideLoading(),h.create({message:"Failed to Update Registration Fee",type:"negative",position:"center"})}}}}),G={class:"bg-blue-grey-2"},H={__name:"registrationFeeMethodeList",setup(p){const a=z(),l=q(),c=T(),{t:m}=A(),y=n=>{c.dialog({title:m("confirm"),message:"Are you sure you want to delete registration fee data",cancel:!0,persistent:!0}).onOk(()=>{a.deleteRegistrationFee(n)})};return(n,s)=>(_(),C("div",null,[u(D,{flat:"",bordered:"",separator:"cell",class:"text-left"},{default:M(()=>{var t;return[e("thead",G,[e("tr",null,[e("th",null,g(n.$t("serial")),1),e("th",null,g(n.$t("amount")),1),e("th",null,g(n.$t("employeecount")),1),e("th",null,g(n.$t("action")),1)])]),e("tbody",null,[(_(!0),C(E,null,I((t=r(a).registrationFeeData)==null?void 0:t.registrationFees,(o,d)=>(_(),C("tr",{key:d,class:U({"bg-blue-grey-1":d%2!=0})},[e("td",null,g(r(V)(String(d+1),r(l).language)),1),e("td",null,g(o.amount),1),e("td",null,g(o.employeeCount),1),e("td",null,[u(S,{class:"q-ml-xs",label:n.$t("delete"),size:"sm",dense:"",glossy:"",color:"negative",onClick:f=>y(o._id)},null,8,["label","onClick"])])],2))),128))])]}),_:1})]))}},J={class:"container-section-py-xs"},K={class:"inner-section"},P={class:"full-width"},W={class:"row q-col-gutter-md"},X={class:"col-12"},Y=e("div",{class:"fs-18 q-mb-sm"}," Create New Registration Fee Methode ",-1),Z={class:"row q-col-gutter-sm"},x={class:"col-lg-4 col-6"},ee={class:"col-lg-4 col-6"},te={class:"col-lg-4 col-12"},oe=e("div",{class:"fs-18 q-my-sm"}," Create New Monthly Fee Methode ",-1),ne={class:"row q-col-gutter-sm"},ae={class:"col-lg-4 col-6"},se={class:"col-lg-4 col-6"},le={class:"col-lg-4 col-12"},ue={__name:"paymentAndServiceConfigurationPage",setup(p){const a=z();a.getRegistrationFeeList();const l=B();l.getMonthlyFeeList();const c=L(null),m=L(null),y=L(null),n=L(null),s=()=>{y.value.validate(),n.value.validate(),!(y.value.hasError||n.value.hasError)&&l.createMonthlyFee()},t=()=>{c.value.validate(),m.value.validate(),!(c.value.hasError||m.value.hasError)&&a.createRegistrationFee()};return(o,d)=>(_(),C("div",J,[e("div",K,[e("div",P,[e("div",W,[e("div",X,[u(Q,{class:"border-primary"},{default:M(()=>[u(j,null,{default:M(()=>[e("div",null,[Y,e("div",Z,[e("div",x,[u(b,{modelValue:r(a).registrationFeeInfo.amount,"onUpdate:modelValue":d[0]||(d[0]=f=>r(a).registrationFeeInfo.amount=f),ref_key:"regFeeAmountEl",ref:c,label:"Amount",outlined:"",dense:"",rules:[r(w)]},null,8,["modelValue","rules"])]),e("div",ee,[u(b,{modelValue:r(a).registrationFeeInfo.employeeCount,"onUpdate:modelValue":d[1]||(d[1]=f=>r(a).registrationFeeInfo.employeeCount=f),ref_key:"employeeCountEl",ref:m,label:"Employee Count",outlined:"",dense:"",rules:[r(w)]},null,8,["modelValue","rules"])]),e("div",te,[u(S,{class:"btn-h-39 full-width",label:"Create",color:"primary",onClick:t})])])]),u(H),e("div",null,[oe,e("div",ne,[e("div",ae,[u(b,{modelValue:r(l).monthlyFeeInfo.amount,"onUpdate:modelValue":d[2]||(d[2]=f=>r(l).monthlyFeeInfo.amount=f),ref_key:"monthlyFeeAmountEl",ref:y,label:"Amount",outlined:"",dense:"",rules:[r(w)]},null,8,["modelValue","rules"])]),e("div",se,[u(b,{modelValue:r(l).monthlyFeeInfo.employeeCount,"onUpdate:modelValue":d[3]||(d[3]=f=>r(l).monthlyFeeInfo.employeeCount=f),ref_key:"monthlyEmployeeCountEl",ref:n,label:"Employee Count",outlined:"",dense:"",rules:[r(w)]},null,8,["modelValue","rules"])]),e("div",le,[u(S,{class:"btn-h-39 full-width",label:"Create",color:"primary",onClick:s})])])]),u(O)]),_:1})]),_:1})])])])])]))}};export{ue as default};
