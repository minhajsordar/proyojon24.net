import{Q as n}from"./QImg.117a1ea1.js";import{u as y}from"./use-meta.27f312d0.js";import{G as h,bi as f,F as S,a,d as i,e,O as C,a7 as k,y as s,B as l,C as b,u as w,dk as I,f as L,q as d,p as _,a8 as q,a9 as x}from"./index.22ce1958.js";import"./publicServiceStore.62c53286.js";import{a as B}from"./serviceCategoryStore.ccebe0b7.js";import{w as $}from"./root_url.456ded4c.js";import{_ as N}from"./plugin-vue_export-helper.21dcd24c.js";const P=r=>(q("data-v-d06cb2ec"),r=r(),x(),r),T={class:"container-section-py-sm"},j={class:"inner-section"},D={class:"full-width"},F={class:"row q-col-gutter-sm"},V=["onClick"],A={class:"icon-relative-cont"},Q=P(()=>e("div",{class:"absolute-top-center service-icon gradient-bg"},null,-1)),R={key:0,class:"col-12"},E={__name:"serviceCategorys",setup(r){const u=h("selected-service-and-category",{});f();const v=S(),m=w(),p=I(),c=B();return p.params.id?c.getAllServiceCategorys(p.params.id):m.push("/allservices"),y({title:"Services List",titleTemplate:o=>`${o} - Proyojon24.net`,meta:{description:{name:"description",content:"Page 1"},keywords:{name:"keywords",content:"proyojon24 services service-provider"},equiv:{"http-equiv":"Content-Type",content:"text/html; charset=UTF-8"},ogTitle:{property:"og:title",template(o){return`${o} - Proyojon24.net`}}}}),(o,M)=>(a(),i("div",T,[e("div",j,[e("div",D,[e("div",null,[e("div",F,[(a(!0),i(C,null,k(s(c).allServiceCategoryList,(t,g)=>(a(),i("div",{class:"col-lg-3 col-md-3 col-sm-2 col-3",key:g},[e("div",{class:"text-center cursor-pointer service-item",onClick:O=>{o.$router.push("/service_providers_list/"+t._id),s(u).serviceCategoryId=t._id,s(u).serviceCategoryName=t.name}},[e("div",A,[L(n,{src:"/images/roundedsquareshape.svg",class:"shape"},{loading:d(()=>[]),_:1}),t.icon?(a(),_(n,{key:0,class:"absolute-top-center service-icon",fit:"",src:s($)+t.icon},{loading:d(()=>[]),_:2},1032,["src"])):(a(),_(n,{key:1,class:"absolute-top-center service-icon",fit:"",src:"/images/placeholder_image.png"},{loading:d(()=>[]),_:1})),Q]),e("div",null,[e("div",null,l(t.name[s(v).language]),1),e("div",null,l(t.serviceProviderCount),1)])],8,V)]))),128)),s(c).allServiceCategoryList&&s(c).allServiceCategoryList.length==0?(a(),i("div",R,l(o.$t("noInfo")),1)):b("",!0)])])])])]))}};var Y=N(E,[["__scopeId","data-v-d06cb2ec"]]);export{Y as default};
