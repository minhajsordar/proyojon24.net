import{R as r,I as b,a as t,d as o,f as a,K as s,V as Q,J as h,D as S,Y as g,P as f,e as c,Z as p,z as e,W as $,aA as A,_ as k,M as w,O as N}from"./index.764ef670.js";import{b as L,Q as v,a as y}from"./QItem.7537fabd.js";import{u as C}from"./notificationStore.57f9f55f.js";const I={class:"relative-position"},V=c("div",{class:"gradient-bg-medium"},null,-1),B=["innerHTML"],M=["href"],T={key:0},H={key:0},O={key:1},P={key:1},x={__name:"commonNotificationCard",props:{notification:{type:Object,default:null}},setup(i){const n=new Date,D=new Date(2017,3,8),u="days";return r.getDateDiff(new Date,D,"days"),b(),(_,m)=>(t(),o("div",I,[V,a(A,{class:"full-width hover-notification-card cursor-pointer"},{default:s(()=>[Q((t(),h(L,{clickable:""},{default:s(()=>[a(v,{side:""},{default:s(()=>[a(S,{class:"fs-32 text-center",name:"notifications",color:"primary"})]),_:1}),a(v,null,{default:s(()=>{var d,l;return[a(y,null,{default:s(()=>[g(f(i.notification.title),1)]),_:1}),(d=i.notification)!=null&&d.description?(t(),h(y,{key:0,caption:""},{default:s(()=>[c("div",{innerHTML:i.notification.description},null,8,B)]),_:1})):p("",!0),(l=i.notification)!=null&&l.link?(t(),h(y,{key:1},{default:s(()=>[c("a",{href:i.notification.link,target:"_blank"},"visit now",8,M)]),_:1})):p("",!0)]}),_:1}),a(v,{side:""},{default:s(()=>[e(r).isSameDate(e(n),i.notification.updatedAt,u)?(t(),o("span",T,[e(r).getDateDiff(new Date(e(n)),i.notification.updatedAt,"hour")==0?(t(),o("span",H,f(e(r).getDateDiff(e(n),i.notification.updatedAt,"minute"))+" minute ago ",1)):(t(),o("span",O,f(e(r).getDateDiff(e(n),i.notification.updatedAt,"hour"))+" hour ago ",1))])):(t(),o("span",P,f(e(r).getDateDiff(e(n),i.notification.updatedAt,u))+" days ago",1))]),_:1})]),_:1})),[[$]])]),_:1})]))}};const R={class:"container-section-py-xs"},j={class:"notification-page-width"},q={class:"full-width"},z={class:"row q-col-gutter-md"},E={class:"col-12"},F={class:"col-12"},Y={__name:"commonNotifications",setup(i){const n=C();return(D,u)=>{var _,m;return t(),o("div",R,[c("div",j,[c("div",q,[c("div",z,[c("div",E,[g(" Last 7 days "),a(k)]),(t(!0),o(w,null,N((_=e(n))==null?void 0:_.last7DaysNotification,(d,l)=>(t(),o("div",{class:"col-12",key:l},[a(x,{notification:d},null,8,["notification"])]))),128)),c("div",F,[g(" Previous "),a(k)]),(t(!0),o(w,null,N((m=e(n))==null?void 0:m.publishedNotification,(d,l)=>(t(),o("div",{class:"col-12",key:l},[a(x,{notification:d},null,8,["notification"])]))),128))])])])])}}};export{Y as default};