import{Q as v}from"./QImg.c0a4c0d3.js";import{K as w,m as B,az as L,L as b,M as a,N as u,a1 as d,a as n,d as g,e as i,O as I,a7 as C,y as r,p as h,x as f,B as m,f as y,q as $,z as j}from"./index.2501de3d.js";import{Q as U}from"./QFile.a9f6f737.js";import{w as z}from"./root_url.456ded4c.js";import"./QChip.14f135f5.js";b.title="Requesting To Server...";const q=w("public slider create Update store",()=>{const c=B(),e=L({id:"",slider1:[],slider2:[],slider3:[],slider4:[]});return{getSliderData:async()=>{const s={method:"get",url:"api/sliders",headers:{"Content-Type":"application/json"}};a("get-image-sliders").showLoading();try{const t=await u.request(s);e.id=t.data[0]._id,e.slider1=t.data[0].slider1,e.slider2=t.data[0].slider2,e.slider3=t.data[0].slider3,e.slider4=t.data[0].slider4,a("get-image-sliders").hideLoading()}catch(t){a("get-image-sliders").hideLoading(),console.log(t)}},sliderInfo:e,createSliders:async()=>{const s={...e},t={method:"post",url:"api/sliders",headers:{"Content-Type":"application/json",Authorization:`Bearer ${c.loginUserInfo.token}`},data:s};a("post-sliders").showLoading();try{const l=await u.request(t);a("post-sliders").hideLoading(),d.create({message:"Successfully Created Banner Image"})}catch(l){console.log(l),a("post-sliders").hideLoading(),d.create({message:"Failed to Create Banner Image"})}},updateSlider:async()=>{const s={...e},t={method:"put",url:"api/sliders/"+e.id,headers:{"Content-Type":"application/json",Authorization:`Bearer ${c.loginUserInfo.token}`},data:s};a("put-sliders").showLoading();try{const l=await u.request(t);a("put-sliders").hideLoading(),d.create({message:"Successfully Updated Banner Image",type:"positive",position:"center"})}catch(l){console.log(l),a("put-sliders").hideLoading()}},uploadSliderImage:async(s,t)=>{if(!e[s][t]||typeof e[s][t]=="string")return;const l={method:"post",url:"api/upload",headers:{"Content-Type":"multipart/form-data",Authorization:`Bearer ${c.loginUserInfo.token}`},data:{image:e[s][t]}};a("upload-image-sliders").showLoading();try{const p=await u.request(l);e[s][t]=p.data,a("upload-image-sliders").hideLoading()}catch(p){console.log(p),a("upload-image-sliders").hideLoading(),d.create({position:"center",type:"negative",message:p.response.data.message})}}}}),D={class:"container-section-py-xs"},A={class:"inner-section"},Q={class:"full-width"},V={class:"fs-16"},T={class:"row q-col-gutter-sm"},F={class:"fs-10"},N={key:0,class:"border-primary border-radius-sm q-pa-sm"},E={class:"flex justify-between"},R={class:"flex justify-end"},H={__name:"sliderController",setup(c){const e=q();e.getSliderData();const _=S=>{d.create({position:"center",type:"negative",message:"Choosen file size too big"})};return(S,k)=>(n(),g("div",D,[i("div",A,[i("div",Q,[(n(),g(I,null,C(4,o=>i("div",{key:o},[i("div",V,"Slider Images For Banner "+m(o),1),i("div",T,[(n(),g(I,null,C(10,s=>i("div",{class:"col-md-6 col-sm-6 col-12",key:s},[i("div",F," Banner "+m(o)+" image "+m(s),1),typeof r(e).sliderInfo[`slider${o}`][s-1]=="string"?(n(),g("div",N,[y(v,{src:r(z)+"/"+r(e).sliderInfo[`slider${o}`][s-1],width:"300px"},null,8,["src"]),i("div",E,[i("div",null,m(r(e).sliderInfo[`slider${o}`][s-1]),1),y(f,{class:"bg-red text-white",dense:"",size:"xs",icon:"edit",onClick:t=>r(e).sliderInfo[`slider${o}`][s-1]=null},null,8,["onClick"])])])):(n(),h(U,{key:1,outlined:"",ref_for:!0,ref:"slider1Img1El",dense:"",modelValue:r(e).sliderInfo[`slider${o}`][s-1],"onUpdate:modelValue":[t=>r(e).sliderInfo[`slider${o}`][s-1]=t,()=>{r(e).uploadSliderImage(`slider${o}`,s-1)}],label:"Add image Max Size 150KB",accept:".jpg, .png, .jpeg","max-total-size":"150000",counter:"",onRejected:_},{prepend:$(()=>[y(j,{name:"cloud_upload"})]),_:2},1032,["modelValue","onUpdate:modelValue"]))])),64))])])),64)),i("div",R,[r(e).sliderInfo.id?(n(),h(f,{key:1,label:"Update",onClick:r(e).updateSlider},null,8,["onClick"])):(n(),h(f,{key:0,label:"Create",onClick:r(e).createSliders},null,8,["onClick"]))])])])]))}};export{H as default};