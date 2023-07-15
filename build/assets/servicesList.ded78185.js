import{Q as ee,a as U,b as te,c as A}from"./QTabPanels.640b1a1e.js";import{G as M,br as V,F as Q,H as Y,o as F,a as v,d as f,e,O as a,f as o,z as t,K as d,Z as D,J as k,L as O,M as E,B as K,dw as N,P as L,r as R,aF as le,aH as oe,aI as se,aK as ae,I as w,az as ne,u as re}from"./index.273a432d.js";import{u as I}from"./use-meta.ee93e784.js";import{Q as G}from"./QMarkupTable.97b57c74.js";import{Q as J}from"./QPagination.b658193b.js";import{u as Z}from"./use-quasar.959cba31.js";import{u as j,a as W}from"./serviceCategoryStore.d240ba82.js";import{a as H}from"./QSelect.147e17c2.js";import{a as X,u as x}from"./serviceProviderStore.a98fcf13.js";import"./QResizeObserver.49a3ca62.js";import"./QChip.e52b471f.js";import"./QItem.cdf4e3bd.js";import"./QItemLabel.35dc9b54.js";import"./position-engine.eb02c146.js";const ie={class:"flex justify-between"},ce={class:"fs-18"},de={class:"bg-blue-grey-2"},ue={__name:"serviceTable",setup(z){const h=M(),C=Z(),{t:_}=V(),c=j(),{serviceList:l}=Q(c),g=Y(),p=n=>{c.serviceInfo.id=n._id,C.dialog({title:_("confirm"),message:_("confirm_delete_start")+n.name[g.language]+_("confirm_delete_end"),cancel:!0,persistent:!0}).onOk(()=>{c.deleteService()})},y=()=>{c.servicePage=c.paginationCurrent,c.getServiceList()};return F(()=>{h.checkLogin()}),I({title:"Services List",titleTemplate:n=>`${n} - Proyojon24.net`,meta:{description:{name:"description",content:"Page 1"},keywords:{name:"keywords",content:"proyojon24 services service-provider"},equiv:{"http-equiv":"Content-Type",content:"text/html; charset=UTF-8"},ogTitle:{property:"og:title",template(n){return`${n} - Proyojon24.net`}}}}),(n,q)=>{var T;return v(),f("div",null,[e("div",ie,[e("div",ce,a(n.$t("headermenus.services")),1),o(d,{class:"btn-h-22",color:"positive",label:n.$t("addnew"),icon:"add",dense:"",glossy:"",size:"sm",onClick:t(c).openServiceCreateDialogManager},null,8,["label","onClick"])]),o(D,{class:"q-my-sm"}),o(G,{flat:"",bordered:"",separator:"cell",class:"text-left"},{default:k(()=>[e("thead",de,[e("tr",null,[e("th",null,a(n.$t("serial")),1),e("th",null,a(n.$t("name")),1),e("th",null,a(n.$t("datetime")),1),e("th",null,a(n.$t("action")),1)])]),e("tbody",null,[(v(!0),f(O,null,E(t(l).services,(b,r)=>(v(),f("tr",{key:r,class:K({"bg-blue-grey-1":r%2!=0})},[e("td",null,a(t(N)(String(r+1),t(g).language)),1),e("td",null,a(b.name[t(g).language]),1),e("td",null,[e("p",null," Created At: "+a(t(L).formatDate(b.createdAt,"YYYY-MM-DD HH:mm:ss")),1),e("p",null," Updated At: "+a(t(L).formatDate(b.updatedAt,"YYYY-MM-DD HH:mm:ss")),1)]),e("td",null,[o(d,{label:n.$t("preview"),size:"sm",dense:"",glossy:"",color:"primary",onClick:s=>t(c).openServicePreviewDialogManager(b)},null,8,["label","onClick"]),o(d,{class:"q-ml-xs",label:n.$t("edit"),size:"sm",dense:"",glossy:"",color:"positive",onClick:s=>t(c).openServiceEditDialogManager(b)},null,8,["label","onClick"]),o(d,{class:"q-ml-xs",label:n.$t("delete"),size:"sm",dense:"",glossy:"",color:"negative",onClick:s=>p(b)},null,8,["label","onClick"])])],2))),128))])]),_:1}),o(D,{class:"q-mt-md"}),o(J,{class:"q-mt-md",color:"blue-grey-7",modelValue:t(c).paginationCurrent,"onUpdate:modelValue":[q[0]||(q[0]=b=>t(c).paginationCurrent=b),y],max:(T=t(c).serviceList)==null?void 0:T.pages,"max-pages":6,"boundary-numbers":""},null,8,["modelValue","max"])])}}},me={class:"flex justify-between"},ge={class:"fs-18"},ve={class:"row q-col-gutter-sm"},pe={class:"col-lg-4 col-md-7 col-sm-12 col-12"},ye={class:"col-lg-4 col-md-5 col-sm-12 col-12 fs-16 text-bold"},be={class:"bg-blue-grey-2"},Se={__name:"serviceCategoryTable",setup(z){const h=j(),C=M(),_=Z(),{t:c}=V(),l=W(),{serviceCategoryList:g}=Q(l),p=Y(),y=X(),$=r=>{l.serviceCategoryInfo.id=r._id,_.dialog({title:c("confirm"),message:c("confirm_delete_start")+r.name[p.language]+c("confirm_delete_end"),cancel:!0,persistent:!0}).onOk(()=>{l.deleteServiceCategory()})},n=()=>{l!=null&&l.filteredByServiseId&&(y.updateServiceCategoryForService(),l.getServiceCategoryList())},q=()=>{l.getServiceCategoryList()};R(1);const T=()=>{l.serviceCategoryPage=l.paginationCurrent,l.getServiceCategoryList()};return F(()=>{C.checkLogin()}),I({title:"Services List",titleTemplate:r=>`${r} - Proyojon24.net`,meta:{description:{name:"description",content:"Page 1"},keywords:{name:"keywords",content:"proyojon24 services service-provider"},equiv:{"http-equiv":"Content-Type",content:"text/html; charset=UTF-8"},ogTitle:{property:"og:title",template(r){return`${r} - Proyojon24.net`}}}}),(r,s)=>{var S;return v(),f("div",null,[e("div",me,[e("div",ge,a(r.$t("services.service_category")),1),o(d,{class:"btn-h-22",color:"positive",label:r.$t("addnew"),icon:"add",dense:"",glossy:"",size:"sm",onClick:t(l).openServiceCategoryCreateDialogManager},null,8,["label","onClick"])]),e("div",null,a(r.$t("getInfoByService")),1),e("div",ve,[e("div",pe,[o(H,{ref:"parentEl",modelValue:t(l).filteredByServiseId,"onUpdate:modelValue":s[0]||(s[0]=u=>t(l).filteredByServiseId=u),options:t(h).serviceList.services,"option-label":u=>Object(u)===u&&"name"in u?u.name[t(p).language]:null,"options-dense":"",outlined:"",dense:""},null,8,["modelValue","options","option-label"])]),e("div",ye,[o(d,{label:r.$t("search"),color:"primary",glossy:"",onClick:n},null,8,["label"]),o(d,{class:"q-ml-sm",label:r.$t("restore"),glossy:"",color:"primary",onClick:q},null,8,["label"])])]),o(D,{class:"q-mb-md q-mt-sm"}),o(G,{flat:"",bordered:"",separator:"cell",class:"text-left"},{default:k(()=>[e("thead",be,[e("tr",null,[e("th",null,a(r.$t("serial")),1),e("th",null,a(r.$t("name")),1),e("th",null,a(r.$t("datetime")),1),e("th",null,a(r.$t("action")),1)])]),e("tbody",null,[(v(!0),f(O,null,E(t(g).serviceCategorys,(u,i)=>(v(),f("tr",{key:i,class:K({"bg-blue-grey-1":i%2!=0})},[e("td",null,a(t(N)(String(i+1),t(p).language)),1),e("td",null,a(u.name[t(p).language]),1),e("td",null,[e("p",null," Created At: "+a(t(L).formatDate(u.createdAt,"YYYY-MM-DD  HH:mm:ss")),1),e("p",null," Updated At: "+a(t(L).formatDate(u.updatedAt,"YYYY-MM-DD  HH:mm:ss")),1)]),e("td",null,[o(d,{label:r.$t("preview"),size:"sm",dense:"",glossy:"",color:"primary",onClick:m=>t(l).openServiceCategoryPreviewDialogManager(u)},null,8,["label","onClick"]),o(d,{class:"q-ml-xs",label:r.$t("edit"),size:"sm",dense:"",glossy:"",color:"positive",onClick:m=>t(l).openServiceCategoryEditDialogManager(u)},null,8,["label","onClick"]),o(d,{class:"q-ml-xs",label:r.$t("delete"),size:"sm",dense:"",glossy:"",color:"negative",onClick:m=>$(u)},null,8,["label","onClick"])])],2))),128))])]),_:1}),o(D,{class:"q-mt-md"}),o(J,{class:"q-mt-md",color:"blue-grey-7",modelValue:t(l).paginationCurrent,"onUpdate:modelValue":[s[1]||(s[1]=u=>t(l).paginationCurrent=u),T],max:(S=t(l).serviceCategoryList)==null?void 0:S.pages,"max-pages":6,"boundary-numbers":""},null,8,["modelValue","max"])])}}},fe={class:"flex justify-between"},Ce={class:"fs-18"},$e={class:"row q-col-gutter-sm"},ke={class:"col-lg-4 col-sm-4 col-xs-12 col-12"},he={class:"col-sm-8 col-xs-12 col-12"},_e={class:"row q-col-gutter-sm"},De={class:"col-lg-6 col-sm-6 col-xs-12 col-12"},qe={class:"col-lg-6 col-sm-6 col-xs-12 col-12 fs-16 text-bold"},Te={class:"bg-blue-grey-2"},Pe={__name:"serviceProviderTable",setup(z){le(),oe(),se(),ae();const h=j(),C=M(),_=Z(),{t:c}=V(),l=x();Q(l);const g=W(),p=Y(),y=X(),$=s=>{l.serviceProviderInfo.id=s._id,_.dialog({title:c("confirm"),message:c("confirm_delete_start")+s.name[p.language]+c("confirm_delete_end"),cancel:!0,persistent:!0}).onOk(()=>{l.deleteServiceProvider()})},n=()=>{l!=null&&l.filteredByServiseCategoryId&&l.getServiceProviderList()},q=()=>{l.getServiceProviderList()};R(1);const T=()=>{l.serviceProviderPage=l.paginationCurrent,l.getServiceProviderList()},b=s=>{console.log(s)};return F(()=>{C.checkLogin()}),I({title:"Services List",titleTemplate:s=>`${s} - Proyojon24.net`,meta:{description:{name:"description",content:"Page 1"},keywords:{name:"keywords",content:"proyojon24 services service-provider"},equiv:{"http-equiv":"Content-Type",content:"text/html; charset=UTF-8"},ogTitle:{property:"og:title",template(s){return`${s} - Proyojon24.net`}}}}),(s,S)=>{var u;return v(),f("div",null,[e("div",fe,[e("div",Ce,a(s.$t("services.service_category")),1),o(d,{class:"btn-h-22",color:"positive",label:s.$t("addnew"),icon:"add",dense:"",glossy:"",size:"sm",onClick:t(l).openServiceProviderCreateDialogManager},null,8,["label","onClick"])]),e("div",$e,[e("div",ke,[e("div",null,a(s.$t("getInfoByService")),1),o(H,{modelValue:t(g).filteredByServiseId,"onUpdate:modelValue":[S[0]||(S[0]=i=>t(g).filteredByServiseId=i),S[1]||(S[1]=()=>{t(y).updateServiceCategoryOnServiceProviderTable(),t(l).filteredByServiseCategoryId=null})],options:t(h).serviceList.services,"option-label":i=>Object(i)===i&&"name"in i?i.name[t(p).language]:null,"options-dense":"",outlined:"",dense:""},null,8,["modelValue","options","option-label"])]),e("div",he,[e("div",null,a(s.$t("getInfoByServiceCategory")),1),e("div",_e,[e("div",De,[o(H,{modelValue:t(l).filteredByServiseCategoryId,"onUpdate:modelValue":S[2]||(S[2]=i=>t(l).filteredByServiseCategoryId=i),options:t(g).allServiceCategoryList,"option-label":i=>Object(i)===i&&"name"in i?i.name[t(p).language]:null,"options-dense":"",outlined:"",dense:""},null,8,["modelValue","options","option-label"])]),e("div",qe,[o(d,{label:s.$t("search"),color:"primary",glossy:"",onClick:n},null,8,["label"]),o(d,{class:"q-ml-sm",label:s.$t("restore"),color:"primary",glossy:"",onClick:q},null,8,["label"])])])])]),o(D,{class:"q-mb-md q-mt-sm"}),o(G,{flat:"",bordered:"",separator:"cell",class:"text-left"},{default:k(()=>{var i;return[e("thead",Te,[e("tr",null,[e("th",null,a(s.$t("serial")),1),e("th",null,a(s.$t("name")),1),e("th",null,a(s.$t("datetime")),1),e("th",null,a(s.$t("action")),1)])]),e("tbody",null,[(v(!0),f(O,null,E((i=t(l).serviceProviderList)==null?void 0:i.serviceProviders,(m,B)=>(v(),f("tr",{key:B,class:K({"bg-blue-grey-1":B%2!=0})},[e("td",null,a(t(N)(String(B+1),t(p).language)),1),e("td",null,a(m.name[t(p).language]),1),e("td",null,[e("p",null," Created At: "+a(t(L).formatDate(m.createdAt,"YYYY-MM-DD  HH:mm:ss")),1),e("p",null," Updated At: "+a(t(L).formatDate(m.updatedAt,"YYYY-MM-DD  HH:mm:ss")),1)]),e("td",null,[o(d,{label:s.$t("preview"),size:"sm",dense:"",glossy:"",color:"primary",onClick:P=>t(l).openServiceProviderPreviewDialogManager(m)},null,8,["label","onClick"]),o(d,{class:"q-ml-xs",label:s.$t("edit"),size:"sm",dense:"",glossy:"",color:"positive",onClick:P=>{t(l).openServiceProviderEditDialogManager(m),b(m)}},null,8,["label","onClick"]),m.suggested?(v(),w(d,{key:1,class:"q-ml-xs",label:s.$t("removeFromSuggestion"),size:"sm",dense:"",glossy:"",color:"negative",onClick:P=>t(l).removeFromSuggestionServiceProvider(m._id)},null,8,["label","onClick"])):(v(),w(d,{key:0,class:"q-ml-xs",label:s.$t("addToSuggestion"),size:"sm",dense:"",glossy:"",color:"orange",onClick:P=>t(l).addToSuggestionServiceProvider(m._id)},null,8,["label","onClick"])),m.topSuggested?(v(),w(d,{key:3,class:"q-ml-xs",label:s.$t("removeFromTopSuggestion"),size:"sm",dense:"",glossy:"",color:"negative",onClick:P=>t(l).removeFromTopSuggestionServiceProvider(m._id)},null,8,["label","onClick"])):(v(),w(d,{key:2,class:"q-ml-xs",label:s.$t("addToTopSuggestion"),size:"sm",dense:"",glossy:"",color:"orange-14",onClick:P=>t(l).addToTopSuggestionServiceProvider(m._id)},null,8,["label","onClick"])),o(d,{class:"q-ml-xs",label:s.$t("delete"),size:"sm",dense:"",glossy:"",color:"negative",onClick:P=>$(m)},null,8,["label","onClick"])])],2))),128))])]}),_:1}),o(D,{class:"q-mt-md"}),o(J,{class:"q-mt-md",color:"blue-grey-7",modelValue:t(l).paginationCurrent,"onUpdate:modelValue":[S[3]||(S[3]=i=>t(l).paginationCurrent=i),T],max:(u=t(l).serviceProviderList)==null?void 0:u.pages,"max-pages":6,"boundary-numbers":""},null,8,["modelValue","max"])])}}},Le={class:"container-section-py-xs"},we={class:"inner-section"},Me={class:"full-width"},Ne={__name:"servicesList",setup(z){const h=re(),C=M();F(()=>{C.checkLogin()||h.push("/home"),(!C.loginUserInfo.permission=="superAdmin"||!C.loginUserInfo.permission=="admin")&&h.push("/profile")}),j().getServiceList(),x().getServiceProviderList();const l=W();l.getServiceCategoryList(),l.getAllServiceCategorys(),V(),Y();const g=R("service");return I({title:"Services List",titleTemplate:y=>`${y} - Proyojon24.net`,meta:{description:{name:"description",content:"Page 1"},keywords:{name:"keywords",content:"proyojon24 services service-provider"},equiv:{"http-equiv":"Content-Type",content:"text/html; charset=UTF-8"},ogTitle:{property:"og:title",template(y){return`${y} - Proyojon24.net`}}}}),(y,$)=>(v(),f("div",Le,[e("div",we,[e("div",Me,[o(ne,{class:"border-primary"},{default:k(()=>[o(ee,{modelValue:g.value,"onUpdate:modelValue":$[0]||($[0]=n=>g.value=n),dense:"",class:"text-grey-10","indicator-color":"blue-grey-10","active-bg-color":"blue-grey-2",align:"justify","narrow-indicator":""},{default:k(()=>[o(U,{class:"bg-blue-grey-1",name:"service",label:y.$t("services.services")},null,8,["label"]),o(U,{class:"bg-blue-grey-1",name:"service_category",label:y.$t("services.service_category")},null,8,["label"]),o(U,{class:"bg-blue-grey-1",name:"service_provider",label:y.$t("services.service_provider")},null,8,["label"])]),_:1},8,["modelValue"]),o(D),o(te,{modelValue:g.value,"onUpdate:modelValue":$[1]||($[1]=n=>g.value=n),animated:""},{default:k(()=>[o(A,{name:"service"},{default:k(()=>[o(ue)]),_:1}),o(A,{name:"service_category"},{default:k(()=>[o(Se)]),_:1}),o(A,{name:"service_provider"},{default:k(()=>[o(Pe)]),_:1})]),_:1},8,["modelValue"])]),_:1})])])]))}};export{Ne as default};
