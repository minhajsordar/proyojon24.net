import{K as _,m as C,r as p,L as M,M as n,N as v,a1 as u,a as L,d as S,e as f,f as a,q as g,t as m,U as x,y as d,A as U,x as w,s as V}from"./index.b61b8051.js";M.title="Requesting To Server...";const q=_("moving text create Update store",()=>{const c=C(),e=p(null),i=p(null),t=p(null),l=async()=>{const r={method:"get",url:"api/movingtext",headers:{"Content-Type":"application/json"}};n("get-moving-text").showLoading();try{const o=await v.request(r);t.value=o.data,o.data.length>0&&(e.value=o.data[0].announcement,i.value=o.data[0].speed),n("get-moving-text").hideLoading()}catch(o){console.log(o),n("get-moving-text").hideLoading()}},h=()=>{t.value.length>0?T():y()},y=async()=>{const r={announcement:e.value,speed:i.value},o={method:"post",url:"api/movingtext",headers:{"Content-Type":"application/json",Authorization:`Bearer ${c.loginUserInfo.token}`},data:r};n("post-moving-text").showLoading();try{const s=await v.request(o);t.value[0]=s.data,n("post-moving-text").hideLoading(),u.create({message:"Successfully Created Moving Text",type:"positive",position:"center"})}catch(s){console.log(s),n("post-moving-text").hideLoading(),u.create({message:"Failed to Create Moving Text",type:"negative",position:"center"})}},T=async()=>{const r={announcement:e.value,speed:i.value},o={method:"put",url:"api/movingtext/"+t.value[0]._id,headers:{"Content-Type":"application/json",Authorization:`Bearer ${c.loginUserInfo.token}`},data:r};n("put-moving-text").showLoading();try{const s=await v.request(o);t.value[0]=s.data,n("put-moving-text").hideLoading(),u.create({message:"Successfully Updated Moving Text",type:"positive",position:"center"})}catch(s){console.log(s),n("put-moving-text").hideLoading(),u.create({message:"Failed to Update Moving Text",type:"negative",position:"center"})}};return{movingTextData:t,movingText:e,getMovingText:l,updateMovingTextManager:h,speed:i}});const k={class:"flex justify-center"},B={class:"moving-text-controller-container q-pa-sm"},j=f("div",null,"Speed",-1),Q={__name:"movingTextControl",setup(c){const e=q();return e.getMovingText(),(i,t)=>(L(),S("div",k,[f("div",B,[a(V,null,{default:g(()=>[a(m,null,{default:g(()=>[j,a(x,{modelValue:d(e).speed,"onUpdate:modelValue":t[0]||(t[0]=l=>d(e).speed=l),type:"number",outlined:"",dense:""},null,8,["modelValue"])]),_:1}),a(U),a(m,null,{default:g(()=>[a(x,{modelValue:d(e).movingText,"onUpdate:modelValue":t[1]||(t[1]=l=>d(e).movingText=l),type:"textarea",outlined:"",dense:"",rows:"30"},null,8,["modelValue"])]),_:1}),a(m,{class:"q-pt-none flex justify-end"},{default:g(()=>[a(w,{label:i.$t("update"),color:"primary",onClick:d(e).updateMovingTextManager},null,8,["label","onClick"])]),_:1})]),_:1})])]))}};export{Q as default};
