import{H as j,a as t,d as r,f as i,J as m,e as s,aA as M,z as e,O as l,C as O,Y as h,Z as w,K as f,az as A,s as N,bs as E,u as G,S as H,I as F,U as Z,L as T,M as Q,B as J,X as V,aB as W,aK as ee,br as se,o as ie,A as te}from"./index.273a432d.js";import{Q as re}from"./QScrollArea.1852204f.js";import{u as oe}from"./use-meta.ee93e784.js";import"./publicServiceStore.7b17904e.js";import{a as X}from"./serviceCategoryStore.d240ba82.js";import{u as Y}from"./serviceProviderStore.a98fcf13.js";import{Q as ae}from"./QImg.2252f558.js";import{w as le}from"./root_url.5e50e74c.js";import{u as ce}from"./searchLocation.2732d40a.js";import{C as K}from"./ClosePopup.f0efaec8.js";import{_ as ne}from"./locationFilterDialog.bc7fa738.js";import"./QResizeObserver.49a3ca62.js";import"./QScrollObserver.a37495c7.js";import"./QSelect.147e17c2.js";import"./QChip.e52b471f.js";import"./QItem.cdf4e3bd.js";import"./QItemLabel.35dc9b54.js";import"./position-engine.eb02c146.js";const de={class:"relative-position"},ve=s("div",{class:"gradient-bg-medium"},null,-1),ue={class:"listcard-cont"},ge={class:"text-bold flex justify-between"},me={key:0},_e={key:1},pe={key:2},ye={key:3},be={class:"text-bold"},he={class:"text-bold"},fe={class:"fs-12 text-bold"},Pe={key:0},Se={key:1},$e={key:2},we={key:3},Ce={key:4},ke={class:"row q-col-gutter-sm"},xe={class:"col-6"},Le={class:"col-6"},I={__name:"serviceProviderListCard",props:{serviceProvider:{type:Object,default:null},register:{type:Boolean,default:!1}},setup(o){const n=j();return(d,_)=>(t(),r("div",de,[ve,i(A,{class:"full-width hover-serviceprovider-card cursor-pointer",onClick:_[0]||(_[0]=function(){o.register?d.$router.push("/register"):d.$router.push("/service_provider/"+o.serviceProvider._id)})},{default:m(()=>[s("div",ue,[i(M,{class:"image-section q-pa-sm"},{default:m(()=>[i(ae,{src:e(le)+o.serviceProvider.image},null,8,["src"])]),_:1}),i(M,{class:"description-section q-pa-sm"},{default:m(()=>{var b,P,S,p,C,c,y,u,a,g,v,$,k,q,B,D,x,L,U,z,R;return[s("div",ge,[(b=o.serviceProvider.user)!=null&&b.nidVerified?(t(),r("div",me,l(d.$t("nid_verified")),1)):(t(),r("div",_e,l(d.$t("nid_not_verified")),1)),(P=o.serviceProvider.user)!=null&&P.isAvailable?(t(),r("div",pe,l(d.$t("available")),1)):(t(),r("div",ye,l(d.$t("not_available")),1))]),s("div",be,l(o.serviceProvider.name[e(n).language]),1),s("div",he,[s("span",null,l(o.serviceProvider.serviceTitle[e(n).language]),1)]),s("div",fe,[i(O,{class:"bg-primary text-white",name:"location_on"}),(p=(S=o.serviceProvider.serviceProviderLocation)==null?void 0:S.division)!=null&&p.name[e(n).language]?(t(),r("span",Pe,l(" "+((c=(C=o.serviceProvider.serviceProviderLocation)==null?void 0:C.division)==null?void 0:c.name[e(n).language])),1)):h("",!0),(u=(y=o.serviceProvider.serviceProviderLocation)==null?void 0:y.district)!=null&&u.name[e(n).language]?(t(),r("span",Se,", "+l((g=(a=o.serviceProvider.serviceProviderLocation)==null?void 0:a.district)==null?void 0:g.name[e(n).language]),1)):h("",!0),($=(v=o.serviceProvider.serviceProviderLocation)==null?void 0:v.subDistrict)!=null&&$.name[e(n).language]?(t(),r("span",$e,", "+l((q=(k=o.serviceProvider.serviceProviderLocation)==null?void 0:k.subDistrict)==null?void 0:q.name[e(n).language]),1)):h("",!0),(D=(B=o.serviceProvider.serviceProviderLocation)==null?void 0:B.union)!=null&&D.name[e(n).language]?(t(),r("span",we,", "+l((L=(x=o.serviceProvider.serviceProviderLocation)==null?void 0:x.union)==null?void 0:L.name[e(n).language]),1)):h("",!0),(U=o.serviceProvider.serviceProviderLocation)!=null&&U.exact?(t(),r("span",Ce,", "+l((z=o.serviceProvider.serviceProviderLocation)==null?void 0:z.exact[e(n).language]),1)):h("",!0)]),i(w,{class:"q-my-xs"}),s("div",ke,[s("div",xe,[i(f,{class:"full-width text-bold",label:d.$t("view")+" "+((R=o.serviceProvider)!=null&&R.viewCount?o.serviceProvider.viewCount:"0"),size:"sm"},null,8,["label"])]),s("div",Le,[i(f,{class:"full-width text-bold",label:d.$t("details"),size:"sm"},null,8,["label"])])])]}),_:1})])]),_:1})]))}};const qe={class:"flex justify-between q"},Be={__name:"serviceCategoryFilterDialog",setup(o){N("browsing-location",{});const n=N("selected-service-and-category",{}),d=E(),_=j(),b=G(),P=H(),S=Y(),p=X();p.getAllServiceCategorys(n.value.serviceId);const C=c=>{S.getPublicServiceProviders(c),b.push("/service_providers_list/"+c)};return(c,y)=>(t(),F(W,{modelValue:e(d).openFilterByServiceCategoryDialog,"onUpdate:modelValue":y[1]||(y[1]=u=>e(d).openFilterByServiceCategoryDialog=u),persistent:"","full-height":""},{default:m(()=>[i(A,{class:"q-pa-md dialog-card-width"},{default:m(()=>[s("div",qe,[s("div",null,l(c.$t("selectCategory")),1),Z(i(O,{name:"close",onClick:y[0]||(y[0]=u=>e(d).openFilterByServiceCategoryDialog=!1)},null,512),[[K]])]),i(w,{class:"q-my-md"}),(t(!0),r(T,null,Q(e(p).allServiceCategoryList,(u,a)=>(t(),r("div",{key:a},[Z((t(),F(f,{flat:"",class:J(["sidebar-links full-width bg-blue-grey-1",{"bg-blue-grey-3":e(P).params.id==u._id}]),onClick:g=>{C(u._id),e(n).serviceCategoryId=u._id,e(n).serviceCategoryName=u.name}},{default:m(()=>[V(l(u.name[e(_).language]),1)]),_:2},1032,["class","onClick"])),[[K]])]))),128))]),_:1})]),_:1},8,["modelValue"]))}};const De={class:"container-section-py-xs"},Te={class:"inner-section"},Qe={class:"full-width"},Ae={class:""},Fe={class:"q-mb-md"},Ie={class:"row q-col-gutter-sm"},Ne={class:"col-lg-3 col-sm-6 col-xs-6 col-6"},Ve={class:"col-lg-3 col-sm-6 col-xs-6 col-6"},je={class:"col-lg-6 col-sm-12 col-xs-12 col-12"},Ue={class:"flex full-width relative-position"},ze={class:"row q-col-gutter-md"},Re={key:0,class:"col-lg-3 col-md-4 col-4"},Me={class:"bg-primary text-center text-white fs-19 q-pa-xs"},Ze={class:"col-lg-9 col-sm-8 col-xs-12 col-12"},Ke={key:0},Oe={class:"fs-18 text-bold"},Ee={class:"row q-col-gutter-sm"},Ge={class:"fs-18 text-bold"},He={key:1,class:"text-center"},Je={class:"row q-col-gutter-sm"},Xe={class:"col-12"},ps={__name:"serviceProviders",setup(o){ee().getGlobalPinlocations();const d=ce(),_=N("selected-service-and-category",{}),b=E();se();const P=j(),S=G(),p=H(),C=X(),c=Y();ie(()=>{p.params.id?c.getPublicServiceProviders(p.params.id):S.push("/allservices"),d.updateAllLocationByBrowsingLocation()});const y=a=>{c.getPublicServiceProviders(a),S.push("/service_providers_list/"+a)};return oe({title:"Services List",titleTemplate:a=>`${a} - Proyojon24.net`,meta:{description:{name:"description",content:"Page 1"},keywords:{name:"keywords",content:"proyojon24 services service-provider"},equiv:{"http-equiv":"Content-Type",content:"text/html; charset=UTF-8"},ogTitle:{property:"og:title",template(a){return`${a} - Proyojon24.net`}}}}),(a,g)=>(t(),r(T,null,[s("div",De,[s("div",Te,[s("div",Qe,[s("div",Ae,[s("div",Fe,[s("div",Ie,[s("div",Ne,[e(_).serviceCategoryName?(t(),F(f,{key:0,class:"bg-primary text-white full-width",label:e(_).serviceCategoryName[e(P).language],onClick:g[0]||(g[0]=v=>e(b).openFilterByServiceCategoryDialog=!0)},null,8,["label"])):(t(),F(f,{key:1,class:"bg-primary text-white full-width",label:a.$t("services.category"),onClick:g[1]||(g[1]=v=>e(b).openFilterByServiceCategoryDialog=!0)},null,8,["label"]))]),s("div",Ve,[i(f,{class:"bg-primary text-white full-width",label:a.$t("searchInfoByLocation"),onClick:g[2]||(g[2]=v=>e(b).openBrowsingLocationDialog=!0)},null,8,["label"])]),s("div",je,[s("div",Ue,[i(te,{class:"searchbar",outlined:"",dense:""}),i(f,{class:"bg-primary text-white search-btn",icon:"search"})])])])]),s("div",ze,[a.$q.screen.gt.xs?(t(),r("div",Re,[i(A,{class:"bg-white border-radius-xs q-pa-md"},{default:m(()=>[s("div",Me,l(a.$t("services.service_category")),1),i(re,{"thumb-style":{right:"5px",borderRadius:"8px",backgroundColor:"#007c95",width:"8px",opacity:.75},"bar-style":{right:"2px",borderRadius:"14px",backgroundColor:"#007c95",width:"14px",opacity:.2,marginTop:"-3px",marginBottom:"-3px",paddingTop:"3px",paddingBottom:"3px"},style:{height:"220px"},id:"scroll-area-with-virtual-scroll-1"},{default:m(()=>[(t(!0),r(T,null,Q(e(C).allServiceCategoryList,(v,$)=>(t(),r("div",{key:$},[i(f,{flat:"",class:J(["sidebar-links full-width bg-blue-grey-1 q-py-sm",{"bg-blue-grey-3":e(p).params.id==v._id}]),onClick:k=>{y(v._id),e(_).serviceCategoryId=v._id,e(_).serviceCategoryName=v.name}},{default:m(()=>[V(l(v.name[e(P).language]),1)]),_:2},1032,["class","onClick"]),i(w)]))),128))]),_:1},8,["thumb-style","bar-style"])]),_:1})])):h("",!0),s("div",Ze,[i(A,{class:"q-pa-md"},{default:m(()=>{var v,$,k,q,B,D;return[(($=(v=e(c))==null?void 0:v.suggestedServiceProvidersList)==null?void 0:$.length)>0?(t(),r("div",Ke,[s("div",Oe,l(a.$t("services.suggestions")),1),i(w,{class:"q-mb-sm"}),s("div",Ee,[(t(!0),r(T,null,Q(e(c).suggestedServiceProvidersList,(x,L)=>(t(),r("div",{class:"col-lg-6 col-md-6 col-sm-12 col-12",key:L},[i(I,{serviceProvider:x},null,8,["serviceProvider"])]))),128))]),i(w,{class:"q-mb-sm"})])):h("",!0),s("div",Ge,l(a.$t("services.service_provider")),1),i(w,{class:"q-mb-sm"}),((k=e(c))==null?void 0:k.allServiceProvidersList)&&((q=e(c))==null?void 0:q.allServiceProvidersList.length)==0&&((B=e(c))==null?void 0:B.suggestedServiceProvidersList)&&((D=e(c))==null?void 0:D.suggestedServiceProvidersList.length)==0?(t(),r("div",He,[V(l(a.$t("noInfo"))+" ",1),i(w,{class:"q-mb-sm"})])):h("",!0),s("div",Je,[s("div",Xe,[i(I,{register:"",class:"bg-green-1",serviceProvider:{name:{bn:"\u0986\u09AA\u09A8\u09BF \u0995\u09BF \u09B8\u09BE\u09B0\u09CD\u09AD\u09BF\u09B8\u099F\u09BF \u09AA\u09CD\u09B0\u09A6\u09BE\u09A8 \u0995\u09B0\u09A4\u09C7 \u099A\u09BE\u09A8? \u0986\u09AA\u09A8\u09BE\u09B0 \u09A4\u09A5\u09CD\u09AF \u09AA\u09CD\u09B0\u09A6\u09BE\u09A8 \u0995\u09B0\u09C1\u09A8\u0964",en:"Do you want to provide service? Fill up your informations."},serviceProviderLocation:{division:{name:{bn:"\u09AC\u09BF\u09AD\u09BE\u0997",en:"Division"}},district:{name:{bn:"\u099C\u09C7\u09B2\u09BE",en:"District"}},subDistrict:{name:{bn:"\u0989\u09AA\u099C\u09C7\u09B2\u09BE",en:"Uazela"}},union:{name:{bn:"\u09B8\u09CD\u09A5\u09BE\u09A8",en:"Location"}},pinlocation:{name:{bn:null,en:null},_id:null}},specialties:{bn:null,en:null},serviceTitle:{bn:"\u09B8\u09C7\u09AC\u09BE\u09B0 \u09B6\u09BF\u09B0\u09CB\u09A8\u09BE\u09AE",en:"Service Title"},suggested:!1,_id:"647436a153654e270485a5b7",service:"646ddf32944253664c042aa9",serviceCategory:"646de0ea944253664c042afa",image:"/uploads/service-provider-common.jpeg",rankCount:1.5,keywords:null,rating:0,numReviews:0,reviews:[],createdAt:"2023-05-29T05:22:41.902Z",updatedAt:"2023-05-29T05:34:23.007Z",__v:1}},null,8,["serviceProvider"])]),(t(!0),r(T,null,Q(e(c).allServiceProvidersList,(x,L)=>(t(),r("div",{class:"col-lg-6 col-md-6 col-sm-12 col-12",key:L},[i(I,{serviceProvider:x},null,8,["serviceProvider"])]))),128))])]}),_:1})])])])])])]),i(Be),i(ne)],64))}};export{ps as default};
