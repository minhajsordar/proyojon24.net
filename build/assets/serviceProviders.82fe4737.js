import{F as K,a as r,d as a,f as s,q as p,e as i,t as M,y as e,B as l,C as b,I as C,z as V,A as T,x as _,s as A,G as z,bg as E,u as H,dl as O,p as I,v as Z,K as j,bj as R,H as X,D as Y,X as ee,bf as ie,o as se,N as te}from"./index.274b46b9.js";import{Q as re}from"./QScrollArea.b9e07159.js";import{u as oe}from"./use-meta.c1266446.js";import"./publicServiceStore.6a4d9866.js";import{a as J}from"./serviceCategoryStore.5634206b.js";import{u as W}from"./serviceProviderStore.ad2fed09.js";import{Q as ae}from"./QImg.7f8412d1.js";import{w as le}from"./root_url.456ded4c.js";import{u as ne}from"./searchLocation.4b74d1e0.js";import{C as G}from"./ClosePopup.5b7b327c.js";import{_ as ce}from"./locationFilterDialog.65d02092.js";import"./QResizeObserver.d1e0669c.js";import"./QScrollObserver.58950a84.js";import"./QSelect.ce8ca637.js";import"./QChip.1d6fe426.js";import"./QItemLabel.3e9ffd16.js";import"./position-engine.c98b355a.js";const de={class:"relative-position"},ve=i("div",{class:"gradient-bg-medium"},null,-1),ue={class:"listcard-cont"},ge={key:0,class:"text-bold text-blue-8"},me={class:"row q-col-gutter-sm"},be={class:"col-6"},pe={key:0,class:"text-bold text-blue-8"},ye={class:"text-bold"},he={class:"text-bold fs-12"},_e={class:"col-6"},Pe={key:0,class:"flex justify-end text-bold fs-12"},fe={class:"text-right"},Se={key:0,class:"text-green"},we={key:1,class:"text-red"},xe={key:2,class:"text-green"},$e={key:3,class:"text-red"},ke={class:"fs-12 text-bold"},Ce={key:0},Le={key:1},qe={key:2},De={key:3},Be={key:4},Te={class:"row q-col-gutter-sm"},Fe={class:"col-6"},Ne={class:"col-6"},U={__name:"serviceProviderListCard",props:{serviceProvider:{type:Object,default:null},register:{type:Boolean,default:!1}},setup(t){const c=K();return(d,y)=>(r(),a("div",de,[ve,s(A,{class:"full-width cursor-pointer"},{default:p(()=>[i("div",ue,[s(M,{class:"image-section q-pa-sm"},{default:p(()=>[s(ae,{src:e(le)+t.serviceProvider.image},null,8,["src"])]),_:1}),s(M,{class:"description-section q-pa-sm"},{default:p(()=>{var P,f,S,u,w,o,h,g,$,F,n,m,v,x,k,L,q,D,B,N,Q;return[t.register?(r(),a("div",ge,l(t.serviceProvider.name[e(c).language]),1)):b("",!0),i("div",me,[i("div",be,[t.register?b("",!0):(r(),a("div",pe,l(t.serviceProvider.name[e(c).language]),1)),i("div",ye,[i("span",null,l(t.serviceProvider.serviceTitle[e(c).language]),1)]),i("div",he,[C(l(d.$t("experience"))+" ",1),i("span",null,l(t.serviceProvider.experience),1)])]),i("div",_e,[t.register?b("",!0):(r(),a("div",Pe,[i("div",fe,[(P=t.serviceProvider.user)!=null&&P.isAvailable?(r(),a("div",Se,l(d.$t("available")),1)):(r(),a("div",we,l(d.$t("not_available")),1)),(f=t.serviceProvider.user)!=null&&f.nidVerified?(r(),a("div",xe,[s(V,{style:{"margin-bottom":"3px"},name:"badge"}),C(" "+l(d.$t("nid_verified")),1)])):(r(),a("div",$e,[s(V,{style:{"margin-bottom":"3px"},name:"badge"}),C(" "+l(d.$t("nid_not_verified")),1)]))])]))])]),i("div",ke,[s(V,{class:"bg-primary text-white",name:"location_on"}),(u=(S=t.serviceProvider.serviceProviderLocation)==null?void 0:S.division)!=null&&u.name[e(c).language]?(r(),a("span",Ce,l(" "+((o=(w=t.serviceProvider.serviceProviderLocation)==null?void 0:w.division)==null?void 0:o.name[e(c).language])),1)):b("",!0),(g=(h=t.serviceProvider.serviceProviderLocation)==null?void 0:h.district)!=null&&g.name[e(c).language]?(r(),a("span",Le,", "+l((F=($=t.serviceProvider.serviceProviderLocation)==null?void 0:$.district)==null?void 0:F.name[e(c).language]),1)):b("",!0),(m=(n=t.serviceProvider.serviceProviderLocation)==null?void 0:n.subDistrict)!=null&&m.name[e(c).language]?(r(),a("span",qe,", "+l((x=(v=t.serviceProvider.serviceProviderLocation)==null?void 0:v.subDistrict)==null?void 0:x.name[e(c).language]),1)):b("",!0),(L=(k=t.serviceProvider.serviceProviderLocation)==null?void 0:k.union)!=null&&L.name[e(c).language]?(r(),a("span",De,", "+l((D=(q=t.serviceProvider.serviceProviderLocation)==null?void 0:q.union)==null?void 0:D.name[e(c).language]),1)):b("",!0),(B=t.serviceProvider.serviceProviderLocation)!=null&&B.exact?(r(),a("span",Be,", "+l((N=t.serviceProvider.serviceProviderLocation)==null?void 0:N.exact[e(c).language]),1)):b("",!0)]),s(T,{class:"q-my-xs"}),i("div",Te,[i("div",Fe,[s(_,{ripple:!1,class:"full-width text-bold text-purple-6 border-purple-6",label:d.$t("view")+" "+((Q=t.serviceProvider)!=null&&Q.viewCount?t.serviceProvider.viewCount:"0"),size:"sm"},null,8,["label"])]),i("div",Ne,[s(_,{class:"full-width text-bold text-white bg-primary",label:t.register?d.$t("headermenus.register"):d.$t("details"),size:"sm",onClick:y[0]||(y[0]=()=>{t.register?d.$router.push("/register"):d.$router.push("/service_provider/"+t.serviceProvider._id)})},null,8,["label"])])])]}),_:1})])]),_:1})]))}};const Qe={class:"flex justify-between q"},Ve={__name:"serviceCategoryFilterDialog",setup(t){z("browsing-location",{});const c=z("selected-service-and-category",{}),d=E(),y=K(),P=H(),f=O(),S=W(),u=J(),w=o=>{S.getPublicServiceProviders(o),P.push("/service_providers_list/"+o)};return(o,h)=>(r(),I(Y,{modelValue:e(d).openFilterByServiceCategoryDialog,"onUpdate:modelValue":h[1]||(h[1]=g=>e(d).openFilterByServiceCategoryDialog=g),persistent:"","full-height":""},{default:p(()=>[s(A,{class:"q-pa-md dialog-card-width"},{default:p(()=>[i("div",Qe,[i("div",null,l(o.$t("selectCategory")),1),Z(s(V,{name:"close",onClick:h[0]||(h[0]=g=>e(d).openFilterByServiceCategoryDialog=!1)},null,512),[[G]])]),s(T,{class:"q-my-md"}),(r(!0),a(j,null,R(e(u).allServiceCategoryList,(g,$)=>(r(),a("div",{key:$},[Z((r(),I(_,{flat:"",class:X(["sidebar-links full-width bg-blue-grey-1",{"bg-blue-grey-3":e(f).params.id==g._id}]),onClick:F=>{w(g._id),e(c).serviceCategoryId=g._id,e(c).serviceCategoryName=g.name}},{default:p(()=>[C(l(g.name[e(y).language]),1)]),_:2},1032,["class","onClick"])),[[G]])]))),128))]),_:1})]),_:1},8,["modelValue"]))}};const je={class:"container-section-py-xs"},Ae={class:"inner-section"},Ie={class:"full-width"},Ue={class:""},ze={class:"q-mb-md"},Re={class:"row q-col-gutter-sm"},Ke={class:"col-lg-3 col-sm-6 col-xs-6 col-6"},Me={class:"col-lg-3 col-sm-6 col-xs-6 col-6"},Ze={class:"col-lg-6 col-sm-12 col-xs-12 col-12"},Ge={class:"flex full-width relative-position"},Ee={class:"row q-col-gutter-md"},He={key:0,class:"col-lg-3 col-md-4 col-4"},Oe={class:"bg-primary text-center text-white fs-19 q-pa-xs"},Xe={class:"col-lg-9 col-sm-8 col-xs-12 col-12"},Je={class:"fs-18 text-bold"},We={class:"row q-col-gutter-sm"},Ye={class:"col-lg-6 col-md-6 col-sm-12 col-12"},ei={class:"col-lg-6 col-md-6 col-sm-12 col-12"},ii={key:0,class:"flex justify-center full-width q-mt-md"},si={key:0,class:"text-center"},Pi={__name:"serviceProviders",setup(t){ee().getGlobalPinlocations();const d=ne(),y=z("selected-service-and-category",{}),P=E();ie();const f=K(),S=H(),u=O(),w=J(),o=W();se(()=>{u.params.id?o.getPublicServiceProviders(u.params.id):S.push("/allservices"),d.updateAllLocationByBrowsingLocation(),w.getServiceCategoryByServiceCategoryId(u.params.id)});const h=n=>{o.getPublicServiceProviders(n),S.push("/service_providers_list/"+n)},g=()=>{u.params.id&&o.getPublicServiceProviders(u.params.id)},$=()=>{var n,m;((n=o.allServiceProvidersList)==null?void 0:n.pages)>o.serviceProviderPageNumber&&(o.serviceProviderPageNumber=((m=o.allServiceProvidersList)==null?void 0:m.page)+1),u.params.id&&o.getPublicServiceProvidersNextPages(u.params.id)};return oe({title:"Services List",titleTemplate:n=>`${n} - Proyojon24.net`,meta:{description:{name:"description",content:"Page 1"},keywords:{name:"keywords",content:"proyojon24 services service-provider"},equiv:{"http-equiv":"Content-Type",content:"text/html; charset=UTF-8"},ogTitle:{property:"og:title",template(n){return`${n} - Proyojon24.net`}}}}),(n,m)=>(r(),a(j,null,[i("div",je,[i("div",Ae,[i("div",Ie,[i("div",Ue,[i("div",ze,[i("div",Re,[i("div",Ke,[e(y).serviceCategoryName?(r(),I(_,{key:0,class:"bg-primary text-white full-width",label:e(y).serviceCategoryName[e(f).language],onClick:m[0]||(m[0]=v=>e(P).openFilterByServiceCategoryDialog=!0)},null,8,["label"])):(r(),I(_,{key:1,class:"bg-primary text-white full-width",label:n.$t("services.category"),onClick:m[1]||(m[1]=v=>e(P).openFilterByServiceCategoryDialog=!0)},null,8,["label"]))]),i("div",Me,[s(_,{class:"bg-primary text-white full-width",label:n.$t("searchInfoByLocation"),onClick:e(P).openBrowsingLocationManager},null,8,["label","onClick"])]),i("div",Ze,[i("div",Ge,[s(te,{modelValue:e(o).searchKeyword,"onUpdate:modelValue":m[2]||(m[2]=v=>e(o).searchKeyword=v),class:"searchbar",outlined:"",dense:""},null,8,["modelValue"]),s(_,{class:"bg-primary text-white search-btn",icon:"search",onClick:g})])])])]),i("div",Ee,[n.$q.screen.gt.xs?(r(),a("div",He,[s(A,{class:"bg-white border-radius-xs q-pa-md"},{default:p(()=>[i("div",Oe,l(n.$t("services.service_category")),1),s(re,{"thumb-style":{right:"5px",borderRadius:"8px",backgroundColor:"#007c95",width:"8px",opacity:.75},"bar-style":{right:"2px",borderRadius:"14px",backgroundColor:"#007c95",width:"14px",opacity:.2,marginTop:"-3px",marginBottom:"-3px",paddingTop:"3px",paddingBottom:"3px"},style:{height:"220px"},id:"scroll-area-with-virtual-scroll-1"},{default:p(()=>[(r(!0),a(j,null,R(e(w).allServiceCategoryList,(v,x)=>(r(),a("div",{key:x},[s(_,{flat:"",class:X(["sidebar-links full-width bg-blue-grey-1 q-py-sm",{"bg-blue-grey-3":e(u).params.id==v._id}]),onClick:k=>{h(v._id),e(y).serviceCategoryId=v._id,e(y).serviceCategoryName=v.name}},{default:p(()=>[C(l(v.name[e(f).language])+" ("+l(v.serviceProviderCount)+") ",1)]),_:2},1032,["class","onClick"]),s(T)]))),128))]),_:1},8,["thumb-style","bar-style"])]),_:1})])):b("",!0),i("div",Xe,[s(A,{class:"q-pa-md"},{default:p(()=>{var v,x,k,L,q,D,B;return[i("div",Je,l(n.$t("services.service_provider")),1),s(T,{class:"q-mb-sm"}),i("div",We,[i("div",Ye,[s(U,{register:"",class:"bg-green-1",serviceProvider:{name:{bn:"\u0986\u09AA\u09A8\u09BF \u0995\u09BF \u09B8\u09BE\u09B0\u09CD\u09AD\u09BF\u09B8\u099F\u09BF \u09AA\u09CD\u09B0\u09A6\u09BE\u09A8 \u0995\u09B0\u09A4\u09C7 \u099A\u09BE\u09A8? \u0986\u09AA\u09A8\u09BE\u09B0 \u09A4\u09A5\u09CD\u09AF \u09AA\u09CD\u09B0\u09A6\u09BE\u09A8 \u0995\u09B0\u09C1\u09A8\u0964",en:"Do you want to provide service? Fill up your informations."},serviceProviderLocation:{division:{name:{bn:"\u09AC\u09BF\u09AD\u09BE\u0997",en:"Division"}},district:{name:{bn:"\u099C\u09C7\u09B2\u09BE",en:"District"}},subDistrict:{name:{bn:"\u0989\u09AA\u099C\u09C7\u09B2\u09BE",en:"Uazela"}},union:{name:{bn:"\u09B8\u09CD\u09A5\u09BE\u09A8",en:"Location"}},pinlocation:{name:{bn:null,en:null},_id:null}},specialties:{bn:null,en:null},serviceTitle:{bn:"\u09B8\u09C7\u09AC\u09BE\u09B0 \u09B6\u09BF\u09B0\u09CB\u09A8\u09BE\u09AE",en:"Service Title"},suggested:!1,_id:"647436a153654e270485a5b7",service:"646ddf32944253664c042aa9",serviceCategory:"646de0ea944253664c042afa",image:"/images/service-provider-common.jpeg",rankCount:1.5,keywords:null,rating:0,numReviews:0,reviews:[],createdAt:"2023-05-29T05:22:41.902Z",updatedAt:"2023-05-29T05:34:23.007Z",__v:1}},null,8,["serviceProvider"])]),i("div",ei,[s(U,{register:"",class:"bg-green-1",serviceProvider:{name:{bn:"\u0986\u09AA\u09A8\u09BF \u0995\u09BF \u09B8\u09BE\u09B0\u09CD\u09AD\u09BF\u09B8\u099F\u09BF \u09AA\u09CD\u09B0\u09A6\u09BE\u09A8 \u0995\u09B0\u09A4\u09C7 \u099A\u09BE\u09A8? \u0986\u09AA\u09A8\u09BE\u09B0 \u09A4\u09A5\u09CD\u09AF \u09AA\u09CD\u09B0\u09A6\u09BE\u09A8 \u0995\u09B0\u09C1\u09A8\u0964",en:"Do you want to provide service? Fill up your informations."},serviceProviderLocation:{division:{name:{bn:"\u09AC\u09BF\u09AD\u09BE\u0997",en:"Division"}},district:{name:{bn:"\u099C\u09C7\u09B2\u09BE",en:"District"}},subDistrict:{name:{bn:"\u0989\u09AA\u099C\u09C7\u09B2\u09BE",en:"Uazela"}},union:{name:{bn:"\u09B8\u09CD\u09A5\u09BE\u09A8",en:"Location"}},pinlocation:{name:{bn:null,en:null},_id:null}},specialties:{bn:null,en:null},serviceTitle:{bn:"\u09B8\u09C7\u09AC\u09BE\u09B0 \u09B6\u09BF\u09B0\u09CB\u09A8\u09BE\u09AE",en:"Service Title"},suggested:!1,_id:"647436a153654e270485a5b7",service:"646ddf32944253664c042aa9",serviceCategory:"646de0ea944253664c042afa",image:"/images/service-provider-common.jpeg",rankCount:1.5,keywords:null,rating:0,numReviews:0,reviews:[],createdAt:"2023-05-29T05:22:41.902Z",updatedAt:"2023-05-29T05:34:23.007Z",__v:1}},null,8,["serviceProvider"])]),(r(!0),a(j,null,R((v=e(o).allServiceProvidersList)==null?void 0:v.serviceProviders,(N,Q)=>(r(),a("div",{class:"col-lg-6 col-md-6 col-sm-12 col-12",key:Q},[s(U,{serviceProvider:N},null,8,["serviceProvider"])]))),128)),((x=e(o).allServiceProvidersList)==null?void 0:x.pages)>((k=e(o).allServiceProvidersList)==null?void 0:k.page)?(r(),a("div",ii,[s(_,{label:"show more",rounded:"",bordered:"",size:"sm",onClick:$})])):b("",!0)]),((L=e(o))==null?void 0:L.allServiceProvidersList)&&((q=e(o))==null?void 0:q.allServiceProvidersList.length)==0&&((D=e(o))==null?void 0:D.suggestedServiceProvidersList.serviceProviders)&&((B=e(o))==null?void 0:B.suggestedServiceProvidersList.serviceProviders.length)==0?(r(),a("div",si,[C(l(n.$t("noInfo"))+" ",1),s(T,{class:"q-mb-sm"})])):b("",!0)]}),_:1})])])])])])]),s(Ve),s(ce)],64))}};export{Pi as default};
