import{Q as d}from"./QImg.5ca5ef75.js";import{G as _,aD as h,u as P,m as w,r as f,bc as y,bd as m,be as S,Z as b,F as k,dt as L,a,p as D,q as N,y as e,d as i,e as s,B as o,I,C as n,f as l,s as T,dl as Y,a3 as g}from"./index.9c7f7a59.js";import{w as u}from"./root_url.456ded4c.js";_("proyojonuserkey",{});const A=_("proyojonloginuser",{});y.title="Requesting To Server...";const C=h("service provider preview store",()=>{P(),w();const v=f(null);return{serviceProviderPreview:v,getServiceProviderPreview:async c=>{const t={method:"get",url:"api/service_providers/preview/"+c,headers:{"Content-Type":"application/json",Authorization:`Bearer ${A.value.token}`}};m("get-service-providers-preview").showLoading();try{const r=await S.request(t);v.value=r.data,m("get-service-providers-preview").hideLoading()}catch(r){console.log(r),m("get-service-providers-preview").hideLoading(),b.create({position:"center",type:"negative",message:"Service provider not found"})}}}}),q={key:0,class:"fs-16"},B={class:"fs-24 q-mb-md"},H=["innerHTML"],M={key:0},x={key:1},R={key:2},V={key:3},j={key:4},G={__name:"userServiceProviderPreview",setup(v){const p=C(),c=Y(),t=k(),{serviceProviderPreview:r}=L(p);return p.getServiceProviderPreview(c.params.id),console.log(c.params.id),(Q,E)=>(a(),D(T,{class:"q-pa-md q-ma-sm"},{default:N(()=>[e(r)?(a(),i("div",q,[s("div",B,"Name: "+o(e(r).name[e(t).language]),1),s("div",null,[I("Description: "),s("div",{innerHTML:e(r).description[e(t).language]},null,8,H)]),s("p",null," Location: "+o(e(r).serviceProviderLocation.division.name[e(t).language])+", "+o(e(r).serviceProviderLocation.district.name[e(t).language])+", "+o(e(r).serviceProviderLocation.subDistrict.name[e(t).language])+", "+o(e(r).serviceProviderLocation.union.name[e(t).language]),1),s("p",null,"Service Title: "+o(e(r).serviceTitle[e(t).language]),1),s("p",null,"Phone Number1: "+o(e(r).phoneNumber1),1),e(r).phoneNumber2?(a(),i("p",M,"Phone Number2: "+o(e(r).phoneNumber2),1)):n("",!0),s("p",null,"Email: "+o(e(r).email),1),s("p",null,"Facebook: "+o(e(r).facebook),1),s("p",null,"Whats app: "+o(e(r).whatsapp),1),s("p",null,"Imo: "+o(e(r).imo),1),s("p",null,"Twitter: "+o(e(r).twitter),1),s("p",null,"Created At: "+o(e(g).formatDate(e(r).createdAt,"YYYY-MM-DD HH:mm:ss")),1),s("p",null,"Updated At: "+o(e(g).formatDate(e(r).updatedAt,"YYYY-MM-DD HH:mm:ss")),1),e(r).image?(a(),i("div",x,[l(d,{src:e(u)+e(r).image},null,8,["src"])])):n("",!0),e(r).serviceImage1?(a(),i("div",R,[l(d,{src:e(u)+e(r).serviceImage1},null,8,["src"])])):n("",!0),e(r).serviceImage2?(a(),i("div",V,[l(d,{src:e(u)+e(r).serviceImage2},null,8,["src"])])):n("",!0),e(r).serviceImage3?(a(),i("div",j,[l(d,{src:e(u)+e(r).serviceImage3},null,8,["src"])])):n("",!0)])):n("",!0)]),_:1}))}};export{G as default};