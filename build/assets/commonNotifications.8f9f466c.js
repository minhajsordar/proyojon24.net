import{ac as r,F as b,a as t,d as o,f as a,q as s,v as Q,p as h,z as S,I as g,B as f,e as c,C as D,y as e,R as $,s as A,A as k,O as w,a7 as N}from"./index.b61b8051.js";import{Q as C,a as v,b as y}from"./QItemLabel.e16268fe.js";import{u as L}from"./notificationStore.fa1bb6db.js";const B={class:"relative-position"},I=c("div",{class:"gradient-bg-medium"},null,-1),V=["innerHTML"],T=["href"],q={key:0},F={key:0},H={key:1},M={key:1},x={__name:"commonNotificationCard",props:{notification:{type:Object,default:null}},setup(i){const n=new Date,p=new Date(2017,3,8),u="days";return r.getDateDiff(new Date,p,"days"),b(),(_,m)=>(t(),o("div",B,[I,a(A,{class:"full-width hover-notification-card cursor-pointer"},{default:s(()=>[Q((t(),h(C,{clickable:""},{default:s(()=>[a(v,{side:""},{default:s(()=>[a(S,{class:"fs-32 text-center",name:"notifications",color:"primary"})]),_:1}),a(v,null,{default:s(()=>{var d,l;return[a(y,null,{default:s(()=>[g(f(i.notification.title),1)]),_:1}),(d=i.notification)!=null&&d.description?(t(),h(y,{key:0,caption:""},{default:s(()=>[c("div",{innerHTML:i.notification.description},null,8,V)]),_:1})):D("",!0),(l=i.notification)!=null&&l.link?(t(),h(y,{key:1},{default:s(()=>[c("a",{href:i.notification.link,target:"_blank"},"visit now",8,T)]),_:1})):D("",!0)]}),_:1}),a(v,{side:""},{default:s(()=>[e(r).isSameDate(e(n),i.notification.updatedAt,u)?(t(),o("span",q,[e(r).getDateDiff(new Date(e(n)),i.notification.updatedAt,"hour")==0?(t(),o("span",F,f(e(r).getDateDiff(e(n),i.notification.updatedAt,"minute"))+" minute ago ",1)):(t(),o("span",H,f(e(r).getDateDiff(e(n),i.notification.updatedAt,"hour"))+" hour ago ",1))])):(t(),o("span",M,f(e(r).getDateDiff(e(n),i.notification.updatedAt,u))+" days ago",1))]),_:1})]),_:1})),[[$]])]),_:1})]))}};const O={class:"container-section-py-xs"},R={class:"notification-page-width"},j={class:"full-width"},z={class:"row q-col-gutter-md"},E={class:"col-12"},P={class:"col-12"},U={__name:"commonNotifications",setup(i){const n=L();return(p,u)=>{var _,m;return t(),o("div",O,[c("div",R,[c("div",j,[c("div",z,[c("div",E,[g(" Last 7 days "),a(k)]),(t(!0),o(w,null,N((_=e(n))==null?void 0:_.last7DaysNotification,(d,l)=>(t(),o("div",{class:"col-12",key:l},[a(x,{notification:d},null,8,["notification"])]))),128)),c("div",P,[g(" Previous "),a(k)]),(t(!0),o(w,null,N((m=e(n))==null?void 0:m.publishedNotification,(d,l)=>(t(),o("div",{class:"col-12",key:l},[a(x,{notification:d},null,8,["notification"])]))),128))])])])])}}};export{U as default};
