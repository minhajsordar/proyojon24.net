import{K as E,G as M,bi as ee,r as l,S as ie,W as re,Y as oe,Z as ne,$ as te,u as se,m as ae,bj as ce,az as I,L as t,M as T,N as d,bk as j,a1 as p}from"./index.2501de3d.js";import{u as R,a as J}from"./serviceCategoryStore.0867741b.js";const le=E("search service store",()=>{const g=de();R();const u=J();return{updateServiceCategory:()=>{u.getAllServiceCategorys(g.serviceProviderInfo.service._id),u.getServiceCategoryList()},updateServiceCategoryForService:()=>{var _;u.getAllServiceCategorys((_=u==null?void 0:u.filteredByServiseId)==null?void 0:_._id)},updateServiceCategoryOnServiceProviderTable:()=>{u.getAllServiceCategorys(u.filteredByServiseId._id)}}});M("proyojonuserkey",{});const s=M("proyojonloginuser",{});t.title="Requesting To Server...";const de=E("service provider store",()=>{const{t:g}=ee(),u=le();l(null),ie();const B=re(),x=oe(),q=ne(),_=te(),D=se();ae();const z=R(),c=ce(),P=J(),S=l(!1),k=l(!1),O=l(!1),V=l(1),m=l(null),v=I({imageCover1:null,imageCover2:null,imageCover3:null}),G=l(null),C=l(null),$=l(1),r=I({division:null,district:null,subDistrict:null,union:null,pinlocation:null,exact:{bn:null,en:null}}),N=l([]),F=I({name:{bn:null,en:null},username:null,phone:null,email:null,password:null,password2:null}),e=I({id:null,user:null,name:{bn:null,en:null},description:{bn:null,en:null},serviceImage1:null,serviceImage2:null,serviceImage3:null,serviceCategory:null,service:null,image:null,rankCount:1,serviceProviderLocation:{division:{_id:null,name:{bn:null,en:null}},district:{_id:null,name:{bn:null,en:null}},subDistrict:{_id:null,name:{bn:null,en:null}},union:{_id:null,name:{bn:null,en:null}},pinlocation:{_id:null,name:{bn:null,en:null}},exact:{bn:null,en:null}},degree:{bn:null,en:null},serviceTitle:{bn:null,en:null},phoneNumber1:null,phoneNumber2:null,facebook:null,whatsapp:null,imo:null,twitter:null,email:null,experience:null,keywords:null,registrationNo:null,bankAccountName:"",phoneNumber:"",transactionId:"",amount:0,reference:null}),U=()=>{m.value=null,v.imageCover1=null,v.imageCover2=null,v.imageCover3=null,e.user=null,e.name={bn:null,en:null},e.description={bn:null,en:null},e.serviceImage1=null,e.serviceImage2=null,e.serviceImage3=null,e.image=null,e.service=null,e.serviceCategory=null,e.rankCount=1,r.division=null,r.district=null,r.subDistrict=null,r.union=null,r.pinlocation=null,r.exact={bn:null,en:null},e.serviceProviderLocation={division:{_id:null,name:{bn:null,en:null}},district:{_id:null,name:{bn:null,en:null}},subDistrict:{_id:null,name:{bn:null,en:null}},union:{_id:null,name:{bn:null,en:null}},pinlocation:{_id:null,name:{bn:null,en:null}},exact:{bn:null,en:null}},e.degree={bn:null,en:null},e.extraCources={bn:null,en:null},e.serviceTitle={bn:null,en:null},e.serviceList=[{bn:null,en:null}],e.specialties={bn:null,en:null},e.phoneNumber1=null,e.phoneNumber2=null,e.facebook=null,e.whatsapp=null,e.imo=null,e.email=null,e.experience=null,e.twitter=null,e.keywords=[],e.bankAccountName="",e.phoneNumber="",e.transactionId="",e.amount=0,e.reference=null},W=()=>{U(),S.value=!0},Y=i=>{["id","user","name","description","serviceImage1","serviceImage2","serviceImage3","serviceCategory","service","image","rankCount","serviceProviderLocation","serviceTitle","phoneNumber1","phoneNumber2","facebook","whatsapp","imo","email","experience","twitter","keywords","bankAccountName","phoneNumber","transactionId","amount","reference"].forEach((n,a)=>{e[n]=i[n]}),e.id=i==null?void 0:i._id,e.service=z.serviceList.services.filter(n=>n._id==e.service)[0],e.serviceCategory=P.serviceCategoryList.serviceCategorys.filter(n=>n._id==e.serviceCategory)[0],v.imageCover1={name:e.serviceImage1},v.imageCover2={name:e.serviceImage2},v.imageCover2={name:e.serviceImage3},m.value={name:e.icon},r.division=i.serviceProviderLocation.division,r.district=i.serviceProviderLocation.district,r.subDistrict=i.serviceProviderLocation.subDistrict,r.union=i.serviceProviderLocation.union,r.pinlocation=i.serviceProviderLocation.pinlocation,u.updateServiceCategory(),k.value=!0,r.division&&B.getAllDistricts(r.division._id),r.district&&x.getAllSubDistricts(r.district._id),r.subDistrict&&q.getAllUnions(r.subDistrict._id),r.union&&_.getAllPinlocations(r.union._id)},Z=i=>{const o=["id","user","name","description","serviceImage1","serviceImage2","serviceImage3","serviceCategory","service","image","rankCount","serviceProviderLocation","degree","extraCources","serviceTitle","serviceList","specialties","phoneNumber1","phoneNumber2","facebook","whatsapp","imo","email","experience","twitter","keywords","bankAccountName","phoneNumber","transactionId","amount","reference"];O.value=!0,o.forEach((n,a)=>{e[n]=i[n]}),e.id=i==null?void 0:i._id,e.service=z.serviceList.services.filter(n=>n._id==e.service)[0],e.serviceCategory=P.serviceCategoryList.serviceCategorys.filter(n=>n._id==e.serviceCategory)[0],v.imageCover1={name:e.serviceImage1},v.imageCover2={name:e.serviceImage2},v.imageCover2={name:e.serviceImage3},m.value={name:e.icon},r.division=i.serviceProviderLocation.division,r.district=i.serviceProviderLocation.district,r.subDistrict=i.serviceProviderLocation.subDistrict,r.union=i.serviceProviderLocation.union,r.pinlocation=i.serviceProviderLocation.pinlocation},y=l(null),H=l([]),b=l(!1);l(0);const A=l(1),L=l(""),Q=async i=>{b.value=!0;const o={};i&&(o.serviceCategoryId=i),L.value!==""&&(o.keywords=L.value),o.pageNumber=1,c.browsingLocation.pinlocation?o.pinlocationId=c.browsingLocation.pinlocation._id:c.browsingLocation.union?o.unionId=c.browsingLocation.union._id:c.browsingLocation.subDistrict?o.subDistrictId=c.browsingLocation.subDistrict._id:c.browsingLocation.district?o.districtId=c.browsingLocation.district._id:c.browsingLocation.division&&(o.divisionId=c.browsingLocation.division._id);const n={method:"get",url:"api/service_providers/all",headers:{"Content-Type":"application/json"},params:o};T("get-service-providers-all").showLoading();try{const a=await d.request(n);y.value=a.data,T("get-service-providers-all").hideLoading(),b.value=!1}catch(a){console.log(a),T("get-service-providers-all").hideLoading(),b.value=!1}},X=async i=>{b.value=!0;const o={};i&&(o.serviceCategoryId=i),L.value!==""&&(o.keywords=L.value),A.value&&(o.pageNumber=A.value),c.browsingLocation.pinlocation?o.pinlocationId=c.browsingLocation.pinlocation._id:c.browsingLocation.union?o.unionId=c.browsingLocation.union._id:c.browsingLocation.subDistrict?o.subDistrictId=c.browsingLocation.subDistrict._id:c.browsingLocation.district?o.districtId=c.browsingLocation.district._id:c.browsingLocation.division&&(o.divisionId=c.browsingLocation.division._id);const n={method:"get",url:"api/service_providers/all",headers:{"Content-Type":"application/json"},params:o};t.showLoader();try{const a=await d.request(n);y.value.page=a.data.page,y.value.pages=a.data.pages,y.value.serviceProviders.push(...a.data.serviceProviders),t.hideLoader(),b.value=!1}catch(a){console.log(a),t.hideLoader(),b.value=!1}},h=async()=>{const i={pageNumber:$.value};C.value?i.serviceCategoryId=C.value._id:P.filteredByServiseId&&(i.serviceId=P.filteredByServiseId._id);const o={method:"get",url:"api/service_providers/",headers:{"Content-Type":"application/json",Authorization:`Bearer ${s.value.token}`},params:i};t.showLoader();try{const n=await d.request(o);N.value=n.data,t.hideLoader()}catch(n){console.log(n),t.hideLoader()}},K=l(null),w=l(!1);return{openServiceProviderEditDialog:k,openServiceProviderEditDialogManager:Y,openServiceProviderPreviewDialog:O,openServiceProviderPreviewDialogManager:Z,openServiceProviderCreateDialog:S,openServiceProviderCreateDialogManager:W,allServiceProvidersList:y,allServiceProvidersListLoading:b,suggestedServiceProvidersList:H,searchKeyword:L,serviceProviderPageNumber:A,getPublicServiceProviders:Q,getPublicServiceProvidersNextPages:X,addToSuggestionServiceProvider:async i=>{const o={method:"put",url:"api/service_providers/suggest/"+i,headers:{"Content-Type":"application/json",Authorization:`Bearer ${s.value.token}`},data:{suggested:!0}};t.showLoader();try{const n=await d.request(o);h(),t.hideLoader()}catch(n){console.log(n),p.create({position:"center",type:"negative",message:JSON.stringify(n)}),t.hideLoader()}},removeFromSuggestionServiceProvider:async i=>{const o={method:"put",url:"api/service_providers/suggest/"+i,headers:{"Content-Type":"application/json",Authorization:`Bearer ${s.value.token}`},data:{suggested:!1}};t.showLoader();try{const n=await d.request(o);h(),t.hideLoader()}catch(n){console.log(n),p.create({position:"center",type:"negative",message:n.response.data.message}),t.hideLoader()}},paginationCurrent:V,serviceProvider:K,serviceProviderLoading:w,getServiceProviderById:async i=>{w.value=!0;const o={method:"get",url:"api/service_providers/"+i,headers:{"Content-Type":"application/json"}};t.showLoader();try{const n=await d.request(o);K.value=n.data,t.hideLoader(),w.value=!1}catch(n){console.log(n),t.hideLoader(),w.value=!1}},increaseServiceProviderView:async i=>{const o={method:"put",url:"api/service_providers/service_provider_view/"+i,headers:{"Content-Type":"application/json",Authorization:`Bearer ${s.value.token}`},data:{_id:i}};try{const n=await d.request(o)}catch(n){console.log(n)}},serviceProviderPage:$,serviceProviderList:N,serviceProviderInfo:e,serviceProviderRegisterInfo:F,getServiceProviderList:h,createServiceProvider:async()=>{var n,a;e.service instanceof Object&&(e.service=e.service._id),e.serviceCategory instanceof Object&&(e.serviceCategory=e.serviceCategory._id),e.serviceProviderLocation.division.name=r.division.name,e.serviceProviderLocation.division._id=r.division._id,e.serviceProviderLocation.district.name=r.district.name,e.serviceProviderLocation.district._id=r.district._id,e.serviceProviderLocation.subDistrict.name=r.subDistrict.name,e.serviceProviderLocation.subDistrict._id=r.subDistrict._id,(n=r.union)!=null&&n._id&&(e.serviceProviderLocation.union.name=r.union.name,e.serviceProviderLocation.union._id=r.union._id),(a=r.pinlocation)!=null&&a._id&&(e.serviceProviderLocation.pinlocation.name=r.pinlocation.name,e.serviceProviderLocation.pinlocation._id=r.pinlocation._id),e.serviceProviderLocation.exact=r.exact,s.value.permission=="admin"||s.value.permission=="superAdmin"||s.value.permission!=="self"||(e.user=s.value._id);const i=e;e.bankAccountName&&e.phoneNumber&&e.transactionId&&e.amount&&(i.bankAccountName=e.bankAccountName,i.phoneNumber=e.phoneNumber,i.transactionId=e.transactionId,i.amount=e.amount);const o={method:"post",url:"api/service_providers",headers:{"Content-Type":"application/json",Authorization:`Bearer ${s.value.token}`},data:i};t.showLoader();try{const f=await d.request(o);S.value=!1,s.value.permission=="admin"&&h(),j.create({title:g("create_service_provider_success"),message:g("wait_for_confirmation"),ok:{push:!0},persistent:!0}).onOk(()=>{D.push("/profile")}),t.hideLoader()}catch(f){console.log(f),p.create({position:"center",type:"negative",message:f.response.data.message}),t.hideLoader()}},createUserAndServiceProvider:async()=>{var n,a;e.service instanceof Object&&(e.service=e.service._id),e.serviceCategory instanceof Object&&(e.serviceCategory=e.serviceCategory._id),e.serviceProviderLocation.division.name=r.division.name,e.serviceProviderLocation.division._id=r.division._id,e.serviceProviderLocation.district.name=r.district.name,e.serviceProviderLocation.district._id=r.district._id,e.serviceProviderLocation.subDistrict.name=r.subDistrict.name,e.serviceProviderLocation.subDistrict._id=r.subDistrict._id,(n=r.union)!=null&&n._id&&(e.serviceProviderLocation.union.name=r.union.name,e.serviceProviderLocation.union._id=r.union._id),(a=r.pinlocation)!=null&&a._id&&(e.serviceProviderLocation.pinlocation.name=r.pinlocation.name,e.serviceProviderLocation.pinlocation._id=r.pinlocation._id),e.serviceProviderLocation.exact=r.exact,s.value.permission=="admin"||s.value.permission=="superAdmin"||s.value.permission!=="self"||(e.user=s.value._id);const i={...e,...F};e.bankAccountName&&e.phoneNumber&&e.transactionId&&e.amount&&(i.bankAccountName=e.bankAccountName,i.phoneNumber=e.phoneNumber,i.transactionId=e.transactionId,i.amount=e.amount);const o={method:"post",url:"api/service_providers/user_and_provider",headers:{"Content-Type":"application/json",Authorization:`Bearer ${s.value.token}`},data:i};console.log(i),t.showLoader();try{const f=await d.request(o);S.value=!1,s.value.permission=="admin"&&h(),j.create({title:g("create_service_provider_success"),message:g("wait_for_confirmation"),ok:{push:!0},persistent:!0}).onOk(()=>{D.push("/profile")}),t.hideLoader()}catch(f){console.log(f),p.create({position:"center",type:"negative",message:f.response.data.message}),t.hideLoader()}},updateServiceProvider:async()=>{e.service instanceof Object&&(e.service=e.service._id),e.serviceCategory instanceof Object&&(e.serviceCategory=e.serviceCategory._id),e.serviceProviderLocation.division.name=r.division.name,e.serviceProviderLocation.division._id=r.division._id,e.serviceProviderLocation.district.name=r.district.name,e.serviceProviderLocation.district._id=r.district._id,e.serviceProviderLocation.subDistrict.name=r.subDistrict.name,e.serviceProviderLocation.subDistrict._id=r.subDistrict._id,e.serviceProviderLocation.union.name=r.union.name,e.serviceProviderLocation.union._id=r.union._id,e.serviceProviderLocation.pinlocation=r.pinlocation,e.serviceProviderLocation.pinlocation._id=r.pinlocation._id;const i=e,o={method:"put",url:"api/service_providers/"+e.id,headers:{"Content-Type":"application/json",Authorization:`Bearer ${s.value.token}`},data:i};t.showLoader();try{const n=await d.request(o);k.value=!1,t.hideLoader(),j.create({title:g("success"),message:g("wait_for_confirmation"),ok:{push:!0},persistent:!0}).onOk(()=>{D.push("/profile")})}catch(n){console.log(n),t.hideLoader(),p.create({position:"center",type:"negative",message:n})}},deleteServiceProvider:async()=>{const i={method:"delete",url:"api/service_providers/"+e.id,headers:{"Content-Type":"application/json",Authorization:`Bearer ${s.value.token}`}};t.showLoader();try{const o=await d.request(i);h(),t.hideLoader()}catch(o){console.log(o),p.create({position:"center",type:"negative",message:JSON.stringify(o)}),t.hideLoader()}},serviceProviderLocationR:r,emptyServiceProviderInfo:U,imageIcon:m,imageCover:v,uploadIcon:async()=>{if(!m.value||typeof m.value=="string"||typeof m.value=="Object")return;e.icon;const i={method:"post",url:"api/upload",headers:{"Content-Type":"multipart/form-data",Authorization:`Bearer ${s.value.token}`},data:{image:m.value}};try{const o=await d.request(i);e.image=o.data}catch(o){console.log(o),p.create({position:"center",type:"negative",message:o.response.data.message})}},selectedServiceCategory:G,uploadCoverImage:async(i,o)=>{if(!v[i]||typeof v[i]=="string")return;const n={method:"post",url:"api/upload",headers:{"Content-Type":"multipart/form-data",Authorization:`Bearer ${s.value.token}`},data:{image:v[i]}};try{const a=await d.request(n);e[o]=a.data}catch(a){console.log(a),p.create({position:"center",type:"negative",message:a.response.data.message})}},filteredByServiseCategoryId:C,getFilteredServiceProviderByServiceCategory:async()=>{const i={method:"get",url:"api/service_providers/service_category/"+C.value._id,headers:{"Content-Type":"application/json",Authorization:`Bearer ${s.value.token}`},params};t.showLoader();try{const o=await d.request(i);N.value=o.data,t.hideLoader()}catch(o){console.log(o),t.hideLoader()}},addToTopSuggestionServiceProvider:async i=>{const o={method:"put",url:"api/service_providers/suggest/"+i,headers:{"Content-Type":"application/json",Authorization:`Bearer ${s.value.token}`},data:{topSuggested:!0}};t.showLoader();try{const n=await d.request(o);h(),t.hideLoader()}catch(n){console.log(n),p.create({position:"center",type:"negative",message:n.response.data.message}),t.hideLoader()}},removeFromTopSuggestionServiceProvider:async i=>{const o={method:"put",url:"api/service_providers/suggest/"+i,headers:{"Content-Type":"application/json",Authorization:`Bearer ${s.value.token}`},data:{topSuggested:!1}};t.showLoader();try{const n=await d.request(o);h(),t.hideLoader()}catch(n){console.log(n),p.create({position:"center",type:"negative",message:n.response.data.message}),t.hideLoader()}}}});export{le as a,de as u};
