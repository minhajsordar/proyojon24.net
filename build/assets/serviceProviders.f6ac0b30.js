import{I as M,a as r,d as a,f as s,K as y,e as i,aB as Z,z as e,P as n,Z as b,D as N,Y as T,_ as B,L as h,aA as I,s as z,bq as E,u as G,U as J,J as j,V as K,M as Q,O as R,B as Y,aC as X,aL as ee,bp as ie,o as se,A as re}from"./index.c2c0cf9a.js";import{Q as te}from"./QScrollArea.7d66558f.js";import{u as oe}from"./use-meta.9b095d68.js";import"./publicServiceStore.cfdb917e.js";import{a as H}from"./serviceCategoryStore.1d8158ad.js";import{u as W}from"./serviceProviderStore.0f3a7ad2.js";import{Q as ae}from"./QImg.a4e642a0.js";import{w as le}from"./root_url.5e50e74c.js";import{u as ne}from"./searchLocation.4212702c.js";import{C as O}from"./ClosePopup.94a6c1ed.js";import{_ as ce}from"./locationFilterDialog.bbcd29a0.js";import"./QResizeObserver.593a3ce0.js";import"./QScrollObserver.3a2903df.js";import"./QSelect.7a3f3314.js";import"./QChip.82d43651.js";import"./QItem.f7807fce.js";import"./position-engine.763fdc46.js";const de={class:"relative-position"},ve=i("div",{class:"gradient-bg-medium"},null,-1),ue={class:"listcard-cont"},ge={key:0,class:"text-bold text-blue-8"},me={class:"row q-col-gutter-sm"},be={class:"col-6"},ye={key:0,class:"text-bold text-blue-8"},pe={class:"text-bold"},_e={class:"col-6"},he={key:0,class:"flex justify-end text-bold"},Pe={key:0,class:"text-green"},fe={key:1},Se={key:2,class:"text-green"},we={key:3},$e={class:"fs-12 text-bold"},ke={key:0},Ce={key:1},xe={key:2},Le={key:3},qe={key:4},De={class:"row q-col-gutter-sm"},Be={class:"col-6"},Te={class:"col-6"},U={__name:"serviceProviderListCard",props:{serviceProvider:{type:Object,default:null},register:{type:Boolean,default:!1}},setup(t){const c=M();return(v,p)=>(r(),a("div",de,[ve,s(I,{class:"full-width cursor-pointer"},{default:y(()=>[i("div",ue,[s(Z,{class:"image-section q-pa-sm"},{default:y(()=>[s(ae,{src:e(le)+t.serviceProvider.image},null,8,["src"])]),_:1}),s(Z,{class:"description-section q-pa-sm"},{default:y(()=>{var P,f,S,u,w,o,_,g,k,V,l,m,d,$,C,x,L,q,D,A,F;return[t.register?(r(),a("div",ge,n(t.serviceProvider.name[e(c).language]),1)):b("",!0),i("div",me,[i("div",be,[t.register?b("",!0):(r(),a("div",ye,n(t.serviceProvider.name[e(c).language]),1)),i("div",pe,[i("span",null,n(t.serviceProvider.serviceTitle[e(c).language]),1)])]),i("div",_e,[t.register?b("",!0):(r(),a("div",he,[(P=t.serviceProvider.user)!=null&&P.nidVerified?(r(),a("div",Pe,[s(N,{style:{"margin-bottom":"3px"},name:"badge"}),T(" "+n(v.$t("nid_verified")),1)])):(r(),a("div",fe,[s(N,{style:{"margin-bottom":"3px"},name:"badge"}),T(" "+n(v.$t("nid_not_verified")),1)])),(f=t.serviceProvider.user)!=null&&f.isAvailable?(r(),a("div",Se,n(v.$t("available")),1)):(r(),a("div",we,n(v.$t("not_available")),1))]))])]),i("div",$e,[s(N,{class:"bg-primary text-white",name:"location_on"}),(u=(S=t.serviceProvider.serviceProviderLocation)==null?void 0:S.division)!=null&&u.name[e(c).language]?(r(),a("span",ke,n(" "+((o=(w=t.serviceProvider.serviceProviderLocation)==null?void 0:w.division)==null?void 0:o.name[e(c).language])),1)):b("",!0),(g=(_=t.serviceProvider.serviceProviderLocation)==null?void 0:_.district)!=null&&g.name[e(c).language]?(r(),a("span",Ce,", "+n((V=(k=t.serviceProvider.serviceProviderLocation)==null?void 0:k.district)==null?void 0:V.name[e(c).language]),1)):b("",!0),(m=(l=t.serviceProvider.serviceProviderLocation)==null?void 0:l.subDistrict)!=null&&m.name[e(c).language]?(r(),a("span",xe,", "+n(($=(d=t.serviceProvider.serviceProviderLocation)==null?void 0:d.subDistrict)==null?void 0:$.name[e(c).language]),1)):b("",!0),(x=(C=t.serviceProvider.serviceProviderLocation)==null?void 0:C.union)!=null&&x.name[e(c).language]?(r(),a("span",Le,", "+n((q=(L=t.serviceProvider.serviceProviderLocation)==null?void 0:L.union)==null?void 0:q.name[e(c).language]),1)):b("",!0),(D=t.serviceProvider.serviceProviderLocation)!=null&&D.exact?(r(),a("span",qe,", "+n((A=t.serviceProvider.serviceProviderLocation)==null?void 0:A.exact[e(c).language]),1)):b("",!0)]),s(B,{class:"q-my-xs"}),i("div",De,[i("div",Be,[s(h,{class:"full-width text-bold text-primary border-primary",label:v.$t("view")+" "+((F=t.serviceProvider)!=null&&F.viewCount?t.serviceProvider.viewCount:"0"),size:"sm"},null,8,["label"])]),i("div",Te,[s(h,{class:"full-width text-bold text-white bg-primary",label:t.register?v.$t("headermenus.register"):v.$t("details"),size:"sm",onClick:p[0]||(p[0]=()=>{t.register?v.$router.push("/register"):v.$router.push("/service_provider/"+t.serviceProvider._id)})},null,8,["label"])])])]}),_:1})])]),_:1})]))}};const Ve={class:"flex justify-between q"},Ae={__name:"serviceCategoryFilterDialog",setup(t){z("browsing-location",{});const c=z("selected-service-and-category",{}),v=E(),p=M(),P=G(),f=J(),S=W(),u=H(),w=o=>{S.getPublicServiceProviders(o),P.push("/service_providers_list/"+o)};return(o,_)=>(r(),j(X,{modelValue:e(v).openFilterByServiceCategoryDialog,"onUpdate:modelValue":_[1]||(_[1]=g=>e(v).openFilterByServiceCategoryDialog=g),persistent:"","full-height":""},{default:y(()=>[s(I,{class:"q-pa-md dialog-card-width"},{default:y(()=>[i("div",Ve,[i("div",null,n(o.$t("selectCategory")),1),K(s(N,{name:"close",onClick:_[0]||(_[0]=g=>e(v).openFilterByServiceCategoryDialog=!1)},null,512),[[O]])]),s(B,{class:"q-my-md"}),(r(!0),a(Q,null,R(e(u).allServiceCategoryList,(g,k)=>(r(),a("div",{key:k},[K((r(),j(h,{flat:"",class:Y(["sidebar-links full-width bg-blue-grey-1",{"bg-blue-grey-3":e(f).params.id==g._id}]),onClick:V=>{w(g._id),e(c).serviceCategoryId=g._id,e(c).serviceCategoryName=g.name}},{default:y(()=>[T(n(g.name[e(p).language]),1)]),_:2},1032,["class","onClick"])),[[O]])]))),128))]),_:1})]),_:1},8,["modelValue"]))}};const Fe={class:"container-section-py-xs"},Ne={class:"inner-section"},Qe={class:"full-width"},Ie={class:""},je={class:"q-mb-md"},Ue={class:"row q-col-gutter-sm"},ze={class:"col-lg-3 col-sm-6 col-xs-6 col-6"},Re={class:"col-lg-3 col-sm-6 col-xs-6 col-6"},Me={class:"col-lg-6 col-sm-12 col-xs-12 col-12"},Ze={class:"flex full-width relative-position"},Ke={class:"row q-col-gutter-md"},Oe={key:0,class:"col-lg-3 col-md-4 col-4"},Ee={class:"bg-primary text-center text-white fs-19 q-pa-xs"},Ge={class:"col-lg-9 col-sm-8 col-xs-12 col-12"},Je={class:"fs-18 text-bold"},Ye={class:"row q-col-gutter-sm"},He={class:"col-lg-6 col-md-6 col-sm-12 col-12"},We={class:"col-lg-6 col-md-6 col-sm-12 col-12"},Xe={key:0,class:"flex justify-center full-width q-mt-md"},ei={key:0,class:"text-center"},_i={__name:"serviceProviders",setup(t){ee().getGlobalPinlocations();const v=ne(),p=z("selected-service-and-category",{}),P=E();ie();const f=M(),S=G(),u=J(),w=H(),o=W();se(()=>{u.params.id?o.getPublicServiceProviders(u.params.id):S.push("/allservices"),v.updateAllLocationByBrowsingLocation(),w.getServiceCategoryByServiceCategoryId(u.params.id)});const _=l=>{o.getPublicServiceProviders(l),S.push("/service_providers_list/"+l)},g=()=>{u.params.id&&o.getPublicServiceProviders(u.params.id)},k=()=>{var l,m;((l=o.allServiceProvidersList)==null?void 0:l.pages)>o.serviceProviderPageNumber&&(o.serviceProviderPageNumber=((m=o.allServiceProvidersList)==null?void 0:m.page)+1),u.params.id&&o.getPublicServiceProvidersNextPages(u.params.id)};return oe({title:"Services List",titleTemplate:l=>`${l} - Proyojon24.net`,meta:{description:{name:"description",content:"Page 1"},keywords:{name:"keywords",content:"proyojon24 services service-provider"},equiv:{"http-equiv":"Content-Type",content:"text/html; charset=UTF-8"},ogTitle:{property:"og:title",template(l){return`${l} - Proyojon24.net`}}}}),(l,m)=>(r(),a(Q,null,[i("div",Fe,[i("div",Ne,[i("div",Qe,[i("div",Ie,[i("div",je,[i("div",Ue,[i("div",ze,[e(p).serviceCategoryName?(r(),j(h,{key:0,class:"bg-primary text-white full-width",label:e(p).serviceCategoryName[e(f).language],onClick:m[0]||(m[0]=d=>e(P).openFilterByServiceCategoryDialog=!0)},null,8,["label"])):(r(),j(h,{key:1,class:"bg-primary text-white full-width",label:l.$t("services.category"),onClick:m[1]||(m[1]=d=>e(P).openFilterByServiceCategoryDialog=!0)},null,8,["label"]))]),i("div",Re,[s(h,{class:"bg-primary text-white full-width",label:l.$t("searchInfoByLocation"),onClick:e(P).openBrowsingLocationManager},null,8,["label","onClick"])]),i("div",Me,[i("div",Ze,[s(re,{modelValue:e(o).searchKeyword,"onUpdate:modelValue":m[2]||(m[2]=d=>e(o).searchKeyword=d),class:"searchbar",outlined:"",dense:""},null,8,["modelValue"]),s(h,{class:"bg-primary text-white search-btn",icon:"search",onClick:g})])])])]),i("div",Ke,[l.$q.screen.gt.xs?(r(),a("div",Oe,[s(I,{class:"bg-white border-radius-xs q-pa-md"},{default:y(()=>[i("div",Ee,n(l.$t("services.service_category")),1),s(te,{"thumb-style":{right:"5px",borderRadius:"8px",backgroundColor:"#007c95",width:"8px",opacity:.75},"bar-style":{right:"2px",borderRadius:"14px",backgroundColor:"#007c95",width:"14px",opacity:.2,marginTop:"-3px",marginBottom:"-3px",paddingTop:"3px",paddingBottom:"3px"},style:{height:"220px"},id:"scroll-area-with-virtual-scroll-1"},{default:y(()=>[(r(!0),a(Q,null,R(e(w).allServiceCategoryList,(d,$)=>(r(),a("div",{key:$},[s(h,{flat:"",class:Y(["sidebar-links full-width bg-blue-grey-1 q-py-sm",{"bg-blue-grey-3":e(u).params.id==d._id}]),onClick:C=>{_(d._id),e(p).serviceCategoryId=d._id,e(p).serviceCategoryName=d.name}},{default:y(()=>[T(n(d.name[e(f).language])+" ("+n(d.serviceProviderCount)+") ",1)]),_:2},1032,["class","onClick"]),s(B)]))),128))]),_:1},8,["thumb-style","bar-style"])]),_:1})])):b("",!0),i("div",Ge,[s(I,{class:"q-pa-md"},{default:y(()=>{var d,$,C,x,L,q,D;return[i("div",Je,n(l.$t("services.service_provider")),1),s(B,{class:"q-mb-sm"}),i("div",Ye,[i("div",He,[s(U,{register:"",class:"bg-green-1",serviceProvider:{name:{bn:"\u0986\u09AA\u09A8\u09BF \u0995\u09BF \u09B8\u09BE\u09B0\u09CD\u09AD\u09BF\u09B8\u099F\u09BF \u09AA\u09CD\u09B0\u09A6\u09BE\u09A8 \u0995\u09B0\u09A4\u09C7 \u099A\u09BE\u09A8? \u0986\u09AA\u09A8\u09BE\u09B0 \u09A4\u09A5\u09CD\u09AF \u09AA\u09CD\u09B0\u09A6\u09BE\u09A8 \u0995\u09B0\u09C1\u09A8\u0964",en:"Do you want to provide service? Fill up your informations."},serviceProviderLocation:{division:{name:{bn:"\u09AC\u09BF\u09AD\u09BE\u0997",en:"Division"}},district:{name:{bn:"\u099C\u09C7\u09B2\u09BE",en:"District"}},subDistrict:{name:{bn:"\u0989\u09AA\u099C\u09C7\u09B2\u09BE",en:"Uazela"}},union:{name:{bn:"\u09B8\u09CD\u09A5\u09BE\u09A8",en:"Location"}},pinlocation:{name:{bn:null,en:null},_id:null}},specialties:{bn:null,en:null},serviceTitle:{bn:"\u09B8\u09C7\u09AC\u09BE\u09B0 \u09B6\u09BF\u09B0\u09CB\u09A8\u09BE\u09AE",en:"Service Title"},suggested:!1,_id:"647436a153654e270485a5b7",service:"646ddf32944253664c042aa9",serviceCategory:"646de0ea944253664c042afa",image:"/uploads/service-provider-common.jpeg",rankCount:1.5,keywords:null,rating:0,numReviews:0,reviews:[],createdAt:"2023-05-29T05:22:41.902Z",updatedAt:"2023-05-29T05:34:23.007Z",__v:1}},null,8,["serviceProvider"])]),i("div",We,[s(U,{register:"",class:"bg-green-1",serviceProvider:{name:{bn:"\u0986\u09AA\u09A8\u09BF \u0995\u09BF \u09B8\u09BE\u09B0\u09CD\u09AD\u09BF\u09B8\u099F\u09BF \u09AA\u09CD\u09B0\u09A6\u09BE\u09A8 \u0995\u09B0\u09A4\u09C7 \u099A\u09BE\u09A8? \u0986\u09AA\u09A8\u09BE\u09B0 \u09A4\u09A5\u09CD\u09AF \u09AA\u09CD\u09B0\u09A6\u09BE\u09A8 \u0995\u09B0\u09C1\u09A8\u0964",en:"Do you want to provide service? Fill up your informations."},serviceProviderLocation:{division:{name:{bn:"\u09AC\u09BF\u09AD\u09BE\u0997",en:"Division"}},district:{name:{bn:"\u099C\u09C7\u09B2\u09BE",en:"District"}},subDistrict:{name:{bn:"\u0989\u09AA\u099C\u09C7\u09B2\u09BE",en:"Uazela"}},union:{name:{bn:"\u09B8\u09CD\u09A5\u09BE\u09A8",en:"Location"}},pinlocation:{name:{bn:null,en:null},_id:null}},specialties:{bn:null,en:null},serviceTitle:{bn:"\u09B8\u09C7\u09AC\u09BE\u09B0 \u09B6\u09BF\u09B0\u09CB\u09A8\u09BE\u09AE",en:"Service Title"},suggested:!1,_id:"647436a153654e270485a5b7",service:"646ddf32944253664c042aa9",serviceCategory:"646de0ea944253664c042afa",image:"/uploads/service-provider-common.jpeg",rankCount:1.5,keywords:null,rating:0,numReviews:0,reviews:[],createdAt:"2023-05-29T05:22:41.902Z",updatedAt:"2023-05-29T05:34:23.007Z",__v:1}},null,8,["serviceProvider"])]),(r(!0),a(Q,null,R((d=e(o).allServiceProvidersList)==null?void 0:d.serviceProviders,(A,F)=>(r(),a("div",{class:"col-lg-6 col-md-6 col-sm-12 col-12",key:F},[s(U,{serviceProvider:A},null,8,["serviceProvider"])]))),128)),(($=e(o).allServiceProvidersList)==null?void 0:$.pages)>((C=e(o).allServiceProvidersList)==null?void 0:C.page)?(r(),a("div",Xe,[s(h,{label:"show more",rounded:"",bordered:"",size:"sm",onClick:k})])):b("",!0)]),((x=e(o))==null?void 0:x.allServiceProvidersList)&&((L=e(o))==null?void 0:L.allServiceProvidersList.length)==0&&((q=e(o))==null?void 0:q.suggestedServiceProvidersList.serviceProviders)&&((D=e(o))==null?void 0:D.suggestedServiceProvidersList.serviceProviders.length)==0?(r(),a("div",ei,[T(n(l.$t("noInfo"))+" ",1),s(B,{class:"q-mb-sm"})])):b("",!0)]}),_:1})])])])])])]),s(Ae),s(ce)],64))}};export{_i as default};
