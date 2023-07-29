import{G as $,K as B,u as w,m as T,r as m,L as j,M as a,N as L,a1 as D,bi as M,a4 as Y,dt as z,F as Q,o as U,a as S,d as _,e as t,f as d,q,B as i,A as N,O,a7 as I,y as p,s as F,H as K,dr as R,ac as A,x as k}from"./index.2501de3d.js";import{Q as E}from"./QMarkupTable.f50016ee.js";import{u as V}from"./use-quasar.6f17268c.js";import{u as G}from"./use-meta.21493f53.js";import"./QItemLabel.3025cdec.js";import"./QSelect.479d4da1.js";/* empty css                                                                   */import"./QChip.14f135f5.js";import"./position-engine.4c79bc21.js";$("proyojonuserkey",{});const C=$("proyojonloginuser",{});j.title="Requesting To Server...";const H=B("service provider pending store",()=>{w(),T(),m(1),m(1);const f=m([]),o=m(!1),u=async()=>{const n={method:"get",url:"api/service_providers/pending_list",headers:{"Content-Type":"application/json",Authorization:`Bearer ${C.value.token}`}};a("get-service-providers-pendinglist").showLoading(),o.value=!0;try{const s=await L.request(n);f.value=s.data,o.value=!1,a("get-service-providers-pendinglist").hideLoading()}catch(s){console.log(s),o.value=!1,a("get-service-providers-pendinglist").hideLoading()}};return{serviceProviderPendingList:f,serviceProviderPendingListLoading:o,getServiceProviderPendingList:u,approveServiceProviderProfile:async(n,s)=>{const c={method:"patch",url:"api/service_providers/"+n,headers:{"Content-Type":"application/json",Authorization:`Bearer ${C.value.token}`},data:{approved:!0,dataCollectorId:s}};a("patch-service-providers").showLoading();try{const l=await L.request(c);u(),a("patch-service-providers").hideLoading()}catch(l){console.log(l),a("patch-service-providers").hideLoading(),D.create({position:"center",type:"negative",message:l.response.data.message}),j.hideLoader()}},rejectServiceProviderProfile:async(n,s,c)=>{const l={method:"patch",url:"api/service_providers/"+n,headers:{"Content-Type":"application/json",Authorization:`Bearer ${C.value.token}`},data:{rejected:!0,rejectNote:c,dataCollectorId:s}};a("patch-service-providers").showLoading();try{const g=await L.request(l);u(),a("patch-service-providers").hideLoading()}catch(g){console.log(g),a("patch-service-providers").hideLoading(),D.create({position:"center",type:"negative",message:g.response.data.message}),j.hideLoader()}}}}),x={class:"container-section-py-xs"},J={class:"inner-section"},W={class:"full-width"},X={class:"fs-18"},Z={class:"bg-blue-grey-2"},de={__name:"serviceProviderPendingList",setup(f){const o=H();o.getServiceProviderPendingList(),$("proyojonloginuser",{});const u=w(),v=T(),y=V(),{t:n}=M(),s=Y();z(s);const c=Q();m("self");const l=(e,h)=>{y.dialog({title:n("confirm"),message:"Are you sure to approved this?",cancel:!0,persistent:!0}).onOk(()=>{o.approveServiceProviderProfile(e,h),console.log(">>>> OK")})},g=(e,h)=>{y.dialog({title:n("reject"),message:"Are you sure to reject this?",prompt:{model:"",type:"text"},cancel:!0,persistent:!0}).onOk(r=>{o.rejectServiceProviderProfile(e,h,r),console.log(">>>> OK",r)})};return U(()=>{var e;v.checkLogin(),["superAdmin","admin","district","division","subDistrict","union"].includes((e=v==null?void 0:v.loginUserInfo)==null?void 0:e.permission)||u.push("/profile")}),G({title:"User List",titleTemplate:e=>`${e} - Proyojon24.net`,meta:{description:{name:"description",content:"Page 1"},keywords:{name:"keywords",content:"proyojon24 services service-provider"},equiv:{"http-equiv":"Content-Type",content:"text/html; charset=UTF-8"},ogTitle:{property:"og:title",template(e){return`${e} - Proyojon24.net`}}}}),(e,h)=>(S(),_("div",x,[t("div",J,[t("div",W,[d(F,{class:"border-primary q-pa-md"},{default:q(()=>[t("div",null,[t("div",X,i(e.$t("headermenus.pending_list")),1),d(N,{class:"q-my-sm"}),d(E,{flat:"",bordered:"",separator:"cell",class:"text-left"},{default:q(()=>[t("thead",Z,[t("tr",null,[t("th",null,i(e.$t("serial")),1),t("th",null,i(e.$t("name")),1),t("th",null,i(e.$t("datetime")),1),t("th",null,i(e.$t("action")),1)])]),t("tbody",null,[(S(!0),_(O,null,I(p(o).serviceProviderPendingList,(r,P)=>(S(),_("tr",{key:P,class:K({"bg-blue-grey-1":P%2!=0})},[t("td",null,i(p(R)(String(P+1),p(c).language)),1),t("td",null,i(r.name[p(c).language]),1),t("td",null,[t("p",null," Created At: "+i(p(A).formatDate(r.createdAt,"YYYY-MM-DD")),1),t("p",null," Updated At: "+i(p(A).formatDate(r.updatedAt,"YYYY-MM-DD")),1)]),t("td",null,[d(k,{class:"q-ml-xs",label:e.$t("preview"),size:"sm",dense:"",color:"blue-grey-10",onClick:b=>e.$router.push("/service_provider_preview/"+r._id)},null,8,["label","onClick"]),d(k,{class:"q-ml-xs",label:e.$t("approved"),size:"sm",dense:"",color:"positive",onClick:b=>l(r._id,r.dataCollector)},null,8,["label","onClick"]),d(k,{class:"q-ml-xs",label:e.$t("reject"),size:"sm",dense:"",color:"negative",onClick:b=>g(r._id,r.dataCollector)},null,8,["label","onClick"])])],2))),128))])]),_:1})])]),_:1})])])]))}};export{de as default};
