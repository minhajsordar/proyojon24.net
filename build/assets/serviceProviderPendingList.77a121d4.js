import{G as $,aG as Y,u as T,m as B,r as g,bf as j,bg as s,bh as C,Z as D,bi as z,a0 as M,dt as Q,F as U,o as F,a as S,d as _,e as t,f as p,q,B as i,A as I,K as N,a3 as O,y as u,s as K,H as R,dr as E,a8 as w,x as b}from"./index.d50f7643.js";import{Q as G}from"./QMarkupTable.09f5d5f0.js";import{u as V}from"./use-quasar.48fd301d.js";import{u as H}from"./use-meta.7c0be237.js";import"./QItemLabel.e9fe2607.js";import"./QSelect.94dd54a2.js";/* empty css                                                                   */import{u as Z}from"./pendingForApprovalListCountStore.af4f472d.js";import"./QChip.b21c81c3.js";import"./position-engine.bfd02074.js";$("proyojonuserkey",{});const k=$("proyojonloginuser",{});j.title="Requesting To Server...";const x=Y("service provider pending store",()=>{const f=Z();T(),B(),g(1),g(1);const n=g([]),d=g(!1),a=async()=>{const l={method:"get",url:"api/service_providers/pending_list",headers:{"Content-Type":"application/json",Authorization:`Bearer ${k.value.token}`}};s("get-service-providers-pendinglist").showLoading(),d.value=!0;try{const r=await C.request(l);n.value=r.data,d.value=!1,s("get-service-providers-pendinglist").hideLoading()}catch(r){console.log(r),d.value=!1,s("get-service-providers-pendinglist").hideLoading()}};return{serviceProviderPendingList:n,serviceProviderPendingListLoading:d,getServiceProviderPendingList:a,approveServiceProviderProfile:async(l,r)=>{const v={method:"patch",url:"api/service_providers/"+l,headers:{"Content-Type":"application/json",Authorization:`Bearer ${k.value.token}`},data:{approved:!0,dataCollectorId:r}};s("patch-service-providers").showLoading();try{const c=await C.request(v);a(),s("patch-service-providers").hideLoading(),f.getPendingCount()}catch(c){console.log(c),s("patch-service-providers").hideLoading(),D.create({position:"center",type:"negative",message:c}),j.hideLoader()}},rejectServiceProviderProfile:async(l,r,v)=>{const c={method:"patch",url:"api/service_providers/"+l,headers:{"Content-Type":"application/json",Authorization:`Bearer ${k.value.token}`},data:{rejected:!0,rejectNote:v,dataCollectorId:r}};s("patch-service-providers").showLoading();try{const m=await C.request(c);a(),s("patch-service-providers").hideLoading(),f.getPendingCount()}catch(m){console.log(m),s("patch-service-providers").hideLoading(),D.create({position:"center",type:"negative",message:m}),j.hideLoader()}}}}),J={class:"container-section-py-xs"},W={class:"inner-section"},X={class:"full-width"},ee={class:"fs-18"},te={class:"bg-blue-grey-2"},ue={__name:"serviceProviderPendingList",setup(f){const n=x();n.getServiceProviderPendingList(),$("proyojonloginuser",{});const d=T(),a=B(),y=V(),{t:P}=z(),l=M();Q(l);const r=U();g("self");const v=(e,h)=>{y.dialog({title:P("confirm"),message:"Are you sure to approved this?",cancel:!0,persistent:!0}).onOk(()=>{n.approveServiceProviderProfile(e,h),console.log(">>>> OK")})},c=(e,h)=>{y.dialog({title:P("reject"),message:"Are you sure to reject this?",prompt:{model:"",type:"text"},cancel:!0,persistent:!0}).onOk(o=>{n.rejectServiceProviderProfile(e,h,o),console.log(">>>> OK",o)})};return F(()=>{var e;a.checkLogin(),["superAdmin","admin","district","division","subDistrict","union"].includes((e=a==null?void 0:a.loginUserInfo)==null?void 0:e.permission)||d.push("/profile")}),H({title:"User List",titleTemplate:e=>`${e} - Proyojon24.net`,meta:{description:{name:"description",content:"Page 1"},keywords:{name:"keywords",content:"proyojon24 services service-provider"},equiv:{"http-equiv":"Content-Type",content:"text/html; charset=UTF-8"},ogTitle:{property:"og:title",template(e){return`${e} - Proyojon24.net`}}}}),(e,h)=>(S(),_("div",J,[t("div",W,[t("div",X,[p(K,{class:"border-primary q-pa-md"},{default:q(()=>[t("div",null,[t("div",ee,i(e.$t("headermenus.pending_list")),1),p(I,{class:"q-my-sm"}),p(G,{flat:"",bordered:"",separator:"cell",class:"text-left"},{default:q(()=>[t("thead",te,[t("tr",null,[t("th",null,i(e.$t("serial")),1),t("th",null,i(e.$t("name")),1),t("th",null,i(e.$t("datetime")),1),t("th",null,i(e.$t("action")),1)])]),t("tbody",null,[(S(!0),_(N,null,O(u(n).serviceProviderPendingList,(o,L)=>(S(),_("tr",{key:L,class:R({"bg-blue-grey-1":L%2!=0})},[t("td",null,i(u(E)(String(L+1),u(r).language)),1),t("td",null,i(o.name[u(r).language]),1),t("td",null,[t("p",null," Created At: "+i(u(w).formatDate(o.createdAt,"YYYY-MM-DD")),1),t("p",null," Updated At: "+i(u(w).formatDate(o.updatedAt,"YYYY-MM-DD")),1)]),t("td",null,[p(b,{class:"q-ml-xs",label:e.$t("preview"),size:"sm",dense:"",color:"blue-grey-10",onClick:A=>e.$router.push("/service_provider_preview/"+o._id)},null,8,["label","onClick"]),p(b,{class:"q-ml-xs",label:e.$t("approved"),size:"sm",dense:"",color:"positive",onClick:A=>v(o._id,o.dataCollector)},null,8,["label","onClick"]),p(b,{class:"q-ml-xs",label:e.$t("reject"),size:"sm",dense:"",color:"negative",onClick:A=>c(o._id,o.dataCollector)},null,8,["label","onClick"])])],2))),128))])]),_:1})])]),_:1})])])]))}};export{ue as default};
