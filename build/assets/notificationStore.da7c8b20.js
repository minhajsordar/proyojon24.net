import{G as h,aD as L,u as N,r as a,as as D,bc as w,bd as e,be as s,Z as c,a3 as m}from"./index.274b46b9.js";h("proyojonuserkey",{});const u=h("proyojonloginuser",{});w.title="Requesting To Server...";const A=L("notification store",()=>{N();const f=a(null),l=a(null),g=a(null),d=a(!1),p=a(!1),t=D({id:null,title:null,description:null,published:!1,link:null}),y=()=>{t.id=null,t.title=null,t.description=null,t.published=!1,t.link=null,d.value=!0},v=i=>{t.id=i._id,t.title=i.title,t.description=i.description,t.published=i.published,t.link=i.link,p.value=!0},r=async()=>{const i={method:"get",url:"api/common_notifications",headers:{"Content-Type":"application/json"}};e("get-common-notifications").showLoading();try{const o=await s.request(i);f.value=o.data,e("get-common-notifications").hideLoading(),c.create({position:"center",type:"positive",message:"you have "+o.data.length+" unread notifications"})}catch(o){console.log(o),e("get-common-notifications").hideLoading()}};return{openCreateNotificationDialog:d,openCreateNotificationManager:y,openEditNotificationDialog:p,openEditNotificationManager:v,notificationInfo:t,notificationList:f,getPublishedNotification:async()=>{const i={method:"get",url:"api/common_notifications",headers:{"Content-Type":"application/json"},params:{published:!0}};e("get-common-notifications-p").showLoading();try{const o=await s.request(i);l.value=o.data,g.value=o.data.notifications.filter(n=>m.getDateDiff(new Date,n.updatedAt,"days")<=6),l.value=o.data.notifications.filter(n=>m.getDateDiff(new Date,n.updatedAt,"days")>=7),e("get-common-notifications-p").hideLoading()}catch(o){console.log(o),e("get-common-notifications-p").hideLoading()}},last7DaysNotification:g,publishedNotification:l,getNotificationList:r,createNotification:async()=>{const i=t,o={method:"post",url:"api/common_notifications",headers:{"Content-Type":"application/json",Authorization:`Bearer ${u.value.token}`},data:i};e("post-common-notifications").showLoading();try{const n=await s.request(o);r(),d.value=!1,e("post-common-notifications").hideLoading(),c.create({position:"center",type:"positive",message:"Notification Created Successfully."})}catch(n){console.log(n),e("post-common-notifications").hideLoading(),c.create({position:"center",type:"negative",message:n})}},updateNotification:async()=>{const i=t,o={method:"put",url:"api/common_notifications/"+t.id,headers:{"Content-Type":"application/json",Authorization:`Bearer ${u.value.token}`},data:i};e("put-common-notifications").showLoading();try{const n=await s.request(o);r(),p.value=!1,e("put-common-notifications").hideLoading()}catch(n){console.log(n),c.create({position:"center",type:"negative",message:n}),e("put-common-notifications").hideLoading()}},deleteNotification:async()=>{const i={method:"delete",url:"api/common_notifications/"+t.id,headers:{"Content-Type":"application/json",Authorization:`Bearer ${u.value.token}`}};e("delete-common-notifications").showLoading();try{const o=await s.request(i);r(),e("delete-common-notifications").hideLoading()}catch(o){console.log(o),e("delete-common-notifications").hideLoading(),c.create({position:"center",type:"negative",message:o})}}}});export{A as u};
