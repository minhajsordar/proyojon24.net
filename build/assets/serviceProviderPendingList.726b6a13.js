import{s as C,t as T,u as q,G as A,r as m,v as r,x as L,N as b,bs as z,aU as B,F as M,H as Y,o as U,a as S,d as _,e as t,f as d,J as D,O as n,Z as Q,L as N,M as O,z as u,az as I,B as F,dw as K,P as w,K as k}from"./index.73ee47d1.js";import{Q as R}from"./QMarkupTable.13f903f2.js";import{u as E}from"./use-quasar.f757091f.js";import{u as V}from"./use-meta.68872efa.js";import"./QItem.d97b45b2.js";import"./QSelect.3231505a.js";/* empty css                                                                   */import"./QChip.121b4c84.js";import"./position-engine.76a16864.js";C("proyojonuserkey",{});const j=C("proyojonloginuser",{});r.title="Requesting To Server...";const G=T("service provider pending store",()=>{q(),A(),m(1),m(1);const f=m([]),s=m(!1),p=async()=>{const i={method:"get",url:"api/service_providers/pending_list",headers:{"Content-Type":"application/json",Authorization:`Bearer ${j.value.token}`}};r.showLoader(),s.value=!0;try{const a=await L.request(i);f.value=a.data,s.value=!1,r.hideLoader()}catch(a){console.log(a),s.value=!1,r.hideLoader()}};return{serviceProviderPendingList:f,serviceProviderPendingListLoading:s,getServiceProviderPendingList:p,approveServiceProviderProfile:async(i,a)=>{const c={method:"patch",url:"api/service_providers/"+i,headers:{"Content-Type":"application/json",Authorization:`Bearer ${j.value.token}`},data:{approved:!0,dataCollectorId:a}};r.showLoader();try{const l=await L.request(c);p(),r.hideLoader()}catch(l){console.log(l),b.create({position:"center",type:"negative",message:l.response.data.message}),r.hideLoader()}},rejectServiceProviderProfile:async(i,a,c)=>{const l={method:"patch",url:"api/service_providers/"+i,headers:{"Content-Type":"application/json",Authorization:`Bearer ${j.value.token}`},data:{rejected:!0,rejectNote:c,dataCollectorId:a}};r.showLoader();try{const g=await L.request(l);p(),r.hideLoader()}catch(g){console.log(g),b.create({position:"center",type:"negative",message:g.response.data.message}),r.hideLoader()}}}}),H={class:"container-section-py-xs"},J={class:"inner-section"},Z={class:"full-width"},x={class:"fs-18"},W={class:"bg-blue-grey-2"},ce={__name:"serviceProviderPendingList",setup(f){const s=G();s.getServiceProviderPendingList(),C("proyojonloginuser",{});const p=q(),v=A(),y=E(),{t:i}=z(),a=B();M(a);const c=Y();m("self");const l=(e,h)=>{y.dialog({title:i("confirm"),message:"Are you sure to approved this?",cancel:!0,persistent:!0}).onOk(()=>{s.approveServiceProviderProfile(e,h),console.log(">>>> OK")})},g=(e,h)=>{y.dialog({title:i("reject"),message:"Are you sure to reject this?",prompt:{model:"",type:"text"},cancel:!0,persistent:!0}).onOk(o=>{s.rejectServiceProviderProfile(e,h,o),console.log(">>>> OK",o)})};return U(()=>{var e;v.checkLogin(),["superAdmin","admin","district","division","subDistrict","union"].includes((e=v==null?void 0:v.loginUserInfo)==null?void 0:e.permission)||p.push("/profile")}),V({title:"User List",titleTemplate:e=>`${e} - Proyojon24.net`,meta:{description:{name:"description",content:"Page 1"},keywords:{name:"keywords",content:"proyojon24 services service-provider"},equiv:{"http-equiv":"Content-Type",content:"text/html; charset=UTF-8"},ogTitle:{property:"og:title",template(e){return`${e} - Proyojon24.net`}}}}),(e,h)=>(S(),_("div",H,[t("div",J,[t("div",Z,[d(I,{class:"border-primary q-pa-md"},{default:D(()=>[t("div",null,[t("div",x,n(e.$t("headermenus.pending_list")),1),d(Q,{class:"q-my-sm"}),d(R,{flat:"",bordered:"",separator:"cell",class:"text-left"},{default:D(()=>[t("thead",W,[t("tr",null,[t("th",null,n(e.$t("serial")),1),t("th",null,n(e.$t("name")),1),t("th",null,n(e.$t("datetime")),1),t("th",null,n(e.$t("action")),1)])]),t("tbody",null,[(S(!0),_(N,null,O(u(s).serviceProviderPendingList,(o,P)=>(S(),_("tr",{key:P,class:F({"bg-blue-grey-1":P%2!=0})},[t("td",null,n(u(K)(String(P+1),u(c).language)),1),t("td",null,n(o.name[u(c).language]),1),t("td",null,[t("p",null," Created At: "+n(u(w).formatDate(o.createdAt,"YYYY-MM-DD")),1),t("p",null," Updated At: "+n(u(w).formatDate(o.updatedAt,"YYYY-MM-DD")),1)]),t("td",null,[d(k,{class:"q-ml-xs",label:e.$t("preview"),size:"sm",dense:"",color:"blue-grey-10",onClick:$=>e.$router.push("/service_provider_preview/"+o._id)},null,8,["label","onClick"]),d(k,{class:"q-ml-xs",label:e.$t("approved"),size:"sm",dense:"",color:"positive",onClick:$=>l(o._id,o.dataCollector)},null,8,["label","onClick"]),d(k,{class:"q-ml-xs",label:e.$t("reject"),size:"sm",dense:"",color:"negative",onClick:$=>g(o._id,o.dataCollector)},null,8,["label","onClick"])])],2))),128))])]),_:1})])]),_:1})])])]))}};export{ce as default};
