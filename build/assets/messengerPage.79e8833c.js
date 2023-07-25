import{h as G,g as j,j as J,k as X,l as Q,m as oe,n as O,p as ne,q as re,s as R,t as ie,u as Y,r as D,v as le,C as S,x as T,y as I,N as ue,a as l,d,e as x,f as r,z as s,A as de,B as $,D as ce,E as ge,F as me,G as pe,H,I as K,J as M,K as p,L as V,M as E,O as Z,P as k,R as q,S as ee,U as se,V as fe,W as _e,X as ve,Y as U,Z as te,_ as F,$ as he,o as ye,a0 as we}from"./index.764ef670.js";import{Q as ke,a as xe,b as De,c as be,d as Le,e as qe}from"./QLayout.d046db10.js";import{Q as B,a as N,b as Se}from"./QItem.7537fabd.js";import{Q as $e}from"./QList.4d252add.js";import{Q as ae}from"./QScrollArea.178221e5.js";import{w as z}from"./root_url.456ded4c.js";import{_ as Ce}from"./plugin-vue_export-helper.21dcd24c.js";import"./QResizeObserver.675943c0.js";import"./QScrollObserver.2f78a4e6.js";var Qe=G({name:"QToolbarTitle",props:{shrink:Boolean},setup(a,{slots:o}){const f=j(()=>"q-toolbar__title ellipsis"+(a.shrink===!0?" col-shrink":""));return()=>J("div",{class:f.value},X(o.default))}}),Ae=G({name:"QPage",props:{padding:Boolean,styleFn:Function},setup(a,{slots:o}){const{proxy:{$q:f}}=oe(),t=O(ne,Q);if(t===Q)return console.error("QPage needs to be a deep child of QLayout"),Q;if(O(re,Q)===Q)return console.error("QPage needs to be child of QPageContainer"),Q;const i=j(()=>{const g=(t.header.space===!0?t.header.size:0)+(t.footer.space===!0?t.footer.size:0);if(typeof a.styleFn=="function"){const h=t.isContainer.value===!0?t.containerHeight.value:f.screen.height;return a.styleFn(g,h)}return{minHeight:t.isContainer.value===!0?t.containerHeight.value-g+"px":f.screen.height===0?g!==0?`calc(100vh - ${g}px)`:"100vh":f.screen.height-g+"px"}}),c=j(()=>`q-page${a.padding===!0?" q-layout-padding":""}`);return()=>J("main",{class:c.value,style:i.value},X(o.default))}});R("proyojonuserkey",{});const A=R("proyojonloginuser",{});le.title="Requesting To Server...";const P=ie("message store",()=>{Y();const a=D(null),o=D(null),f=D(""),t=D(null),_=D(!1),i=D(!1),c=D(null),g=D(!1),h=async()=>{if(!o.value)return;i.value=!0;const m={method:"get",url:"api/message",headers:{"Content-Type":"application/json",Authorization:`Bearer ${A.value.token}`},params:{user1:A.value._id,user2:o.value.user._id}};S("get-message").showLoading();try{const e=await T.request(m);e.data.messages=e.data.messages.sort(function(n,u){return new Date(n.updatedAt)-new Date(u.updatedAt)}),c.value=e.data,t.value=e.data.page+1,i.value=!1,S("get-message").hideLoading()}catch(e){console.log(e),i.value=!1,S("get-message").hideLoading()}};return{selectedRoom:a,messageList:c,selectedRoomUser2:o,messageContent:f,messageSending:_,messageSent:g,getMessages:h,getPreviousMessages:async()=>{var e,n;if(!((e=o.value)!=null&&e.user)||((n=c.value)==null?void 0:n.pages)<t.value&&i.value==!1)return;console.log("getting previous messages"),i.value=!0;const m={method:"get",url:"api/message",headers:{"Content-Type":"application/json",Authorization:`Bearer ${A.value.token}`},params:{user1:A.value._id,user2:o.value.user._id,pageNumber:t.value}};S("get-message-s").showLoading();try{const u=await T.request(m);u.data.messages=u.data.messages.sort(function(w,y){return new Date(w.updatedAt)-new Date(y.updatedAt)}),c.value.messages.push(...u.data.messages),c.value.page=u.data.page,t.value=u.data.page+1,i.value=!1,S("get-message-s").hideLoading()}catch(u){console.log(u),i.value=!1,S("get-message-s").hideLoading()}},nextPageNumber:t,messageListLoading:i,createMessage:async()=>{const m={room:a.value,recipient:o.value.user._id,content:f.value,token:A.value.token};I.emit("creating_new_message",{...m});const e={method:"post",url:"api/message",headers:{"Content-Type":"application/json",Authorization:`Bearer ${A.value.token}`},data:m};_.value=!0,g.value=!1,S("post-message").showLoading();try{const n=await T.request(e);h(),_.value=!0,g.value=!1,f.value="",S("post-message").hideLoading()}catch(n){console.log(n),S("post-message").hideLoading(),ue.create({position:"center",type:"negative",message:n.response.data.message})}}}});const Re=["onKeypress"],Ie={style:{position:"absolute",left:"50%",top:"50%",transform:"translate(-50%, -50%)"}},Ue={__name:"typeWriter",setup(a){const o=P(),{height:f,width:t}=me,_=D(!1),i=D(null),c=()=>{t(i.value)/o.messageContent.length<=6.6?_.value=!0:_.value=!1},g=()=>{o.messageContent.length!=0&&(o.createMessage(),_.value=!1)};return(h,b)=>(l(),d("div",{class:"relative-position q-pa-sm text-black",onKeypress:ge(g,["enter"])},[x("div",{ref_key:"inputTextEl",ref:i,style:{width:"calc(100% - 50px)"}},[r(de,{modelValue:s(o).messageContent,"onUpdate:modelValue":[b[0]||(b[0]=v=>s(o).messageContent=v),c],type:_.value?"textarea":"text",outlined:"",dense:"",rounded:"",counter:"",maxlength:"1000"},null,8,["modelValue","type"])],512),x("div",{class:"absolute-top-right",style:{width:"50px",height:"100%"},onClick:g},[x("div",Ie,[r(ce,{class:$(["fs-25 text-white sendbutton",[h.$q.screen.gt.sm?"bg-primary":"bg-green"]]),name:"send",style:{"margin-top":"-19px","border-radius":"50%"}},null,8,["class"])])])],40,Re))}},Me={key:0,class:"flex justify-center q-mt-sm"},Pe={key:1,class:"text-center text-grey-6 q-mt-sm"},Te=["src"],Be={class:""},je={key:0},Ve={key:0},Fe={key:1},Ne={key:1},ze={__name:"messageArea",setup(a){const o=P(),{messageList:f}=pe(o),t=H(),_=K(),i=D(null),c=()=>{o.getPreviousMessages()},g=()=>{i.value.setScrollPercentage("vertical",1,100)};return I.on("new_message",h=>{setTimeout(()=>{g()},50)}),(h,b)=>(l(),M(ae,{ref_key:"scrollAreaRef",ref:i,class:"full-width q-px-sm",style:{height:"calc(100vh - 130px)"}},{default:p(()=>{var v,m;return[((v=s(f))==null?void 0:v.pages)>=s(o).nextPageNumber?(l(),d("div",Me,[r(V,{rounded:"",outline:"",label:"load more",size:"sm",loading:s(o).messageListLoading,onClick:c},null,8,["loading"])])):(l(),d("div",Pe,"no more content to load")),(l(!0),d(E,null,Z((m=s(o).messageList)==null?void 0:m.messages,(e,n)=>{var u;return l(),d("div",{key:n},[x("div",{class:$(["q-message q-mx-sm",[s(t).loginUserInfo._id!==e.sender._id?"q-message-sent":"q-message-received "]])},[x("div",{class:$(["q-message-container row items-end no-wrap",[s(t).loginUserInfo._id!==e.sender._id?"":"reverse"]])},[x("img",{class:"q-message-avatar q-message-avatar--received",src:s(z)+((u=e.sender)==null?void 0:u.profileImage),"aria-hidden":"true"},null,8,Te),x("div",Be,[x("div",{class:$(["q-message-name",[s(t).loginUserInfo._id!==e.sender._id?"q-message-name--received":"q-message-name--sent"]])},k(s(t).loginUserInfo._id!==e.sender._id?e.sender.name[s(_).language]:"me"),3),x("div",{class:$(["q-message-text",[s(t).loginUserInfo._id!==e.sender._id?"q-message-text--received bg-primary text-primary":"q-message-text--sent"]])},[x("div",{class:$(["q-message-text-content",[s(t).loginUserInfo._id!==e.sender._id?"q-message-text-content--received":"q-message-text-content--sent"]])},[x("div",{class:$([s(t).loginUserInfo._id!==e.sender._id?"text-white":"text-black"])},k(e.content),3),x("div",{class:$(["q-message-stamp",[s(t).loginUserInfo._id!==e.sender._id?"text-white":"text-black"]])},[s(q).isSameDate(new Date,e.updatedAt,"days")?(l(),d("span",je,[s(q).getDateDiff(new Date,e.updatedAt,"hour")==0?(l(),d("span",Ve,k(s(q).getDateDiff(new Date,e.updatedAt,"minute"))+" minute ago ",1)):(l(),d("span",Fe,k(s(q).getDateDiff(new Date,e.updatedAt,"hour"))+" hour ago ",1))])):(l(),d("span",Ne,k(s(q).getDateDiff(new Date,e.updatedAt,"days"))+" days ago",1))],2)],2)],2)])],2)],2)])}),128))]}),_:1},512))}},He=["src"],Ke=["src"],Ee={key:0},We={key:1},Oe={key:0},Ge={key:0},Je={key:1},Xe={key:1},Ye={__name:"roomsView",props:{room:Object},setup(a){const o=new Date(2017,3,8),f="days";q.getDateDiff(new Date,o,"days");const t=R("myrooms",{}),_=R("proyojonloginuser",{}),i=ee(),c=P(),g=se(),h=Y(),b=H(),v=K(),m=n=>{var u;h.push("/direct_message/"+n),c.selectedRoom=n;for(let w of(u=t.value)==null?void 0:u.rooms)w._id==n&&(c.selectedRoomUser2=w.participants.filter(y=>y.user._id!==_.value._id)[0]);c.getMessages()};var e=new Audio("/sounds/new_messenge_ton.mp3");return I.on("new_message",n=>{var u;i.getMyRooms(),n._doc.sender._id!==b.loginUserInfo._id&&(((u=i.myRoomList)==null?void 0:u.rooms[0]._id)===g.params.id&&c.messageList.messages[c.messageList.messages.length-1]._id!==n._doc._id&&c.messageList.messages.push(n._doc),e.play())}),I.on("receiving_new_message",n=>{console.log("receiving new message",n)}),(n,u)=>(l(),d(E,null,[fe((l(),M(Se,{clickable:"",onClick:u[0]||(u[0]=w=>m(a.room._id))},{default:p(()=>[r(B,{avatar:""},{default:p(()=>[r(ve,null,{default:p(()=>{var w,y,L,C;return[a.room.participants[0].user._id!==s(b).loginUserInfo._id?(l(),d("img",{key:0,src:s(z)+((y=(w=a.room.participants[0])==null?void 0:w.user)==null?void 0:y.profileImage)},null,8,He)):(l(),d("img",{key:1,src:s(z)+((C=(L=a.room.participants[1])==null?void 0:L.user)==null?void 0:C.profileImage)},null,8,Ke))]}),_:1})]),_:1}),r(B,null,{default:p(()=>{var w;return[r(N,{lines:"1"},{default:p(()=>{var y,L,C;return[((y=a.room.participants[0].user)==null?void 0:y._id)!==s(b).loginUserInfo._id?(l(),d("span",Ee,k((L=a.room.participants[0].user)==null?void 0:L.name[s(v).language]),1)):(l(),d("span",We,k((C=a.room.participants[1].user)==null?void 0:C.name[s(v).language]),1))]}),_:1}),(w=a.room)!=null&&w.messages?(l(),M(N,{key:0,caption:"",lines:"2"},{default:p(()=>{var y,L;return[U(k((L=(y=a.room)==null?void 0:y.messages)==null?void 0:L.content),1)]}),_:1})):te("",!0)]}),_:1}),r(B,{side:"",top:"",class:"fs-10"},{default:p(()=>{var w,y,L,C,W;return[s(q).isSameDate(new Date,(w=a.room)==null?void 0:w.updatedAt,f)?(l(),d("span",Oe,[s(q).getDateDiff(new Date,(y=a.room)==null?void 0:y.updatedAt,"hour")==0?(l(),d("span",Ge,k(s(q).getDateDiff(new Date,(L=a.room)==null?void 0:L.updatedAt,"minute"))+" minute ago ",1)):(l(),d("span",Je,k(s(q).getDateDiff(new Date,(C=a.room)==null?void 0:C.updatedAt,"hour"))+" hour ago ",1))])):(l(),d("span",Xe,k(s(q).getDateDiff(new Date,(W=a.room)==null?void 0:W.updatedAt,f))+" days ago",1))]}),_:1})]),_:1})),[[_e]]),r(F)],64))}};const Ze={key:0},es={__name:"messengerPage",setup(a){var b;const o=R("myrooms",{}),f=R("proyojonloginuser",{}),t=K(),_=ee(),i=P(),c=H(),g=se(),h=D(!1);if(!he(g.params)){i.selectedRoom=g.params.id;for(let v of(b=o.value)==null?void 0:b.rooms)v._id==g.params.id&&(i.selectedRoomUser2=v.participants.filter(m=>m.user._id!==f.value._id)[0]);i.getMessages()}return ye(()=>{_.getMyRooms()}),we(()=>{c.checkLogin()}),I.on("new_message",v=>{}),(v,m)=>(l(),M(qe,{view:"lHh Lpr lFf",container:"",style:{height:"100vh"},class:"shadow-2"},{default:p(()=>[r(xe,{elevated:"",class:$([v.$q.screen.gt.sm?"bg-accent-public":"bg-red-8"])},{default:p(()=>[r(ke,null,{default:p(()=>[r(V,{flat:"",onClick:m[0]||(m[0]=e=>h.value=!h.value),round:"",dense:"",icon:"menu"}),r(Qe,null,{default:p(()=>{var e,n;return[U(k(s(i).selectedRoomUser2?(n=(e=s(i).selectedRoomUser2)==null?void 0:e.user)==null?void 0:n.name[s(t).language]:"Select user."),1)]}),_:1}),r(V,{flat:"",dense:"",onClick:m[1]||(m[1]=e=>v.$router.push("/users"))},{default:p(()=>[U(k(v.$t("headermenus.users")),1)]),_:1})]),_:1})]),_:1},8,["class"]),r(De,{modelValue:h.value,"onUpdate:modelValue":m[2]||(m[2]=e=>h.value=e),"show-if-above":"",width:300,breakpoint:500},{default:p(()=>[r(ae,{class:"fit"},{default:p(()=>[r(F,{vertical:""}),r($e,{bordered:"",class:"rounded-borders",style:{"max-width":"350px"}},{default:p(()=>{var e;return[r(N,{header:""},{default:p(()=>[U("Messages List")]),_:1}),r(F),s(_).myRoomList?(l(),d("div",Ze,[(l(!0),d(E,null,Z((e=s(_).myRoomList)==null?void 0:e.rooms,(n,u)=>(l(),d("div",{key:u},[r(Ye,{room:n},null,8,["room"])]))),128))])):te("",!0)]}),_:1})]),_:1})]),_:1},8,["modelValue"]),r(be,null,{default:p(()=>[r(Ae,null,{default:p(()=>[r(ze)]),_:1})]),_:1}),r(Le,{elevated:"",class:"bg-white"},{default:p(()=>[r(Ue)]),_:1})]),_:1}))}};var ds=Ce(es,[["__scopeId","data-v-d36956c0"]]);export{ds as default};
