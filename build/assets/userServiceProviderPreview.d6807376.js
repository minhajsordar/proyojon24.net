import{Q as d}from"./QImg.c0a4c0d3.js";import{G as _,K as h,u as P,m as w,r as f,L as y,M as m,N as S,a1 as k,F as L,dt as N,a,p as b,q as D,y as e,d as i,e as s,B as o,I,C as n,f as l,s as T,dk as Y,ac as g}from"./index.2501de3d.js";import{w as u}from"./root_url.456ded4c.js";_("proyojonuserkey",{});const A=_("proyojonloginuser",{});y.title="Requesting To Server...";const C=h("service provider preview store",()=>{P(),w();const v=f(null);return{serviceProviderPreview:v,getServiceProviderPreview:async c=>{const t={method:"get",url:"api/service_providers/preview/"+c,headers:{"Content-Type":"application/json",Authorization:`Bearer ${A.value.token}`}};m("get-service-providers-preview").showLoading();try{const r=await S.request(t);v.value=r.data,m("get-service-providers-preview").hideLoading()}catch(r){console.log(r),m("get-service-providers-preview").hideLoading(),k.create({position:"center",type:"negative",message:"Service provider not found"})}}}}),M={key:0,class:"fs-16"},q={class:"fs-24 q-mb-md"},B=["innerHTML"],H={key:0},x={key:1},R={key:2},V={key:3},j={key:4},G={__name:"userServiceProviderPreview",setup(v){const p=C(),c=Y(),t=L(),{serviceProviderPreview:r}=N(p);return p.getServiceProviderPreview(c.params.id),console.log(c.params.id),(Q,E)=>(a(),b(T,{class:"q-pa-md q-ma-sm"},{default:D(()=>[e(r)?(a(),i("div",M,[s("div",q,"Name: "+o(e(r).name[e(t).language]),1),s("div",null,[I("Description: "),s("div",{innerHTML:e(r).description[e(t).language]},null,8,B)]),s("p",null," Location: "+o(e(r).serviceProviderLocation.division.name[e(t).language])+", "+o(e(r).serviceProviderLocation.district.name[e(t).language])+", "+o(e(r).serviceProviderLocation.subDistrict.name[e(t).language])+", "+o(e(r).serviceProviderLocation.union.name[e(t).language]),1),s("p",null,"Service Title: "+o(e(r).serviceTitle[e(t).language]),1),s("p",null,"Phone Number1: "+o(e(r).phoneNumber1),1),e(r).phoneNumber2?(a(),i("p",H,"Phone Number2: "+o(e(r).phoneNumber2),1)):n("",!0),s("p",null,"Email: "+o(e(r).email),1),s("p",null,"Facebook: "+o(e(r).facebook),1),s("p",null,"Whats app: "+o(e(r).whatsapp),1),s("p",null,"Imo: "+o(e(r).imo),1),s("p",null,"Twitter: "+o(e(r).twitter),1),s("p",null,"Created At: "+o(e(g).formatDate(e(r).createdAt,"YYYY-MM-DD HH:mm:ss")),1),s("p",null,"Updated At: "+o(e(g).formatDate(e(r).updatedAt,"YYYY-MM-DD HH:mm:ss")),1),e(r).image?(a(),i("div",x,[l(d,{src:e(u)+e(r).image},null,8,["src"])])):n("",!0),e(r).serviceImage1?(a(),i("div",R,[l(d,{src:e(u)+e(r).serviceImage1},null,8,["src"])])):n("",!0),e(r).serviceImage2?(a(),i("div",V,[l(d,{src:e(u)+e(r).serviceImage2},null,8,["src"])])):n("",!0),e(r).serviceImage3?(a(),i("div",j,[l(d,{src:e(u)+e(r).serviceImage3},null,8,["src"])])):n("",!0)])):n("",!0)]),_:1}))}};export{G as default};
