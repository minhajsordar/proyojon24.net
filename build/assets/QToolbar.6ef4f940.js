import{Q as K}from"./QResizeObserver.3a08588e.js";import{h as _,ad as Q,r as z,g as n,w as v,i as ne,ae as He,j as q,af as A,ag as X,ah as I,ai as Oe,aj as Ve,ak as Pe,al as We,am as Fe,an as Me,ao as Re,ap as le,aq as U,o as _e,ar as de,v as De,as as ve,k as ue,at as pe,au as he,av as Ae,aw as me,ax as ye,ay as oe,az as E,aA as Ie}from"./index.b61b8051.js";import{Q as Ne}from"./QScrollObserver.c12b4b61.js";var Xe=_({name:"QHeader",props:{modelValue:{type:Boolean,default:!0},reveal:Boolean,revealOffset:{type:Number,default:250},bordered:Boolean,elevated:Boolean,heightHint:{type:[String,Number],default:50}},emits:["reveal","focusin"],setup(e,{slots:k,emit:y}){const{proxy:{$q:c}}=A(),a=X(I,Q);if(a===Q)return console.error("QHeader needs to be child of QLayout"),Q;const s=z(parseInt(e.heightHint,10)),g=z(!0),B=n(()=>e.reveal===!0||a.view.value.indexOf("H")>-1||c.platform.is.ios&&a.isContainer.value===!0),$=n(()=>{if(e.modelValue!==!0)return 0;if(B.value===!0)return g.value===!0?s.value:0;const u=s.value-a.scroll.value.position;return u>0?u:0}),x=n(()=>e.modelValue!==!0||B.value===!0&&g.value!==!0),l=n(()=>e.modelValue===!0&&x.value===!0&&e.reveal===!0),H=n(()=>"q-header q-layout__section--marginal "+(B.value===!0?"fixed":"absolute")+"-top"+(e.bordered===!0?" q-header--bordered":"")+(x.value===!0?" q-header--hidden":"")+(e.modelValue!==!0?" q-layout--prevent-focus":"")),L=n(()=>{const u=a.rows.value.top,S={};return u[0]==="l"&&a.left.space===!0&&(S[c.lang.rtl===!0?"right":"left"]=`${a.left.size}px`),u[2]==="r"&&a.right.space===!0&&(S[c.lang.rtl===!0?"left":"right"]=`${a.right.size}px`),S});function b(u,S){a.update("header",u,S)}function f(u,S){u.value!==S&&(u.value=S)}function w({height:u}){f(s,u),b("size",u)}function m(u){l.value===!0&&f(g,!0),y("focusin",u)}v(()=>e.modelValue,u=>{b("space",u),f(g,!0),a.animate()}),v($,u=>{b("offset",u)}),v(()=>e.reveal,u=>{u===!1&&f(g,e.modelValue)}),v(g,u=>{a.animate(),y("reveal",u)}),v(a.scroll,u=>{e.reveal===!0&&f(g,u.direction==="up"||u.position<=e.revealOffset||u.position-u.inflectionPoint<100)});const d={};return a.instances.header=d,e.modelValue===!0&&b("size",s.value),b("space",e.modelValue),b("offset",$.value),ne(()=>{a.instances.header===d&&(a.instances.header=void 0,b("size",0),b("offset",0),b("space",!1))}),()=>{const u=He(k.default,[]);return e.elevated===!0&&u.push(q("div",{class:"q-layout__shadow absolute-full overflow-hidden no-pointer-events"})),u.push(q(K,{debounce:0,onResize:w})),q("header",{class:H.value,style:L.value,onFocusin:m},u)}}});const fe=150;var Ge=_({name:"QDrawer",inheritAttrs:!1,props:{...Oe,...Ve,side:{type:String,default:"left",validator:e=>["left","right"].includes(e)},width:{type:Number,default:300},mini:Boolean,miniToOverlay:Boolean,miniWidth:{type:Number,default:57},noMiniAnimation:Boolean,breakpoint:{type:Number,default:1023},showIfAbove:Boolean,behavior:{type:String,validator:e=>["default","desktop","mobile"].includes(e),default:"default"},bordered:Boolean,elevated:Boolean,overlay:Boolean,persistent:Boolean,noSwipeOpen:Boolean,noSwipeClose:Boolean,noSwipeBackdrop:Boolean},emits:[...Pe,"onLayout","miniState"],setup(e,{slots:k,emit:y,attrs:c}){const a=A(),{proxy:{$q:s}}=a,g=We(e,s),{preventBodyScroll:B}=pe(),{registerTimeout:$,removeTimeout:x}=Fe(),l=X(I,Q);if(l===Q)return console.error("QDrawer needs to be child of QLayout"),Q;let H,L=null,b;const f=z(e.behavior==="mobile"||e.behavior!=="desktop"&&l.totalWidth.value<=e.breakpoint),w=n(()=>e.mini===!0&&f.value!==!0),m=n(()=>w.value===!0?e.miniWidth:e.width),d=z(e.showIfAbove===!0&&f.value===!1?!0:e.modelValue===!0),u=n(()=>e.persistent!==!0&&(f.value===!0||ge.value===!0));function S(t,r){if(O(),t!==!1&&l.animate(),T(0),f.value===!0){const C=l.instances[N.value];C!==void 0&&C.belowBreakpoint===!0&&C.hide(!1),P(1),l.isContainer.value!==!0&&B(!0)}else P(0),t!==!1&&ee(!1);$(()=>{t!==!1&&ee(!0),r!==!0&&y("show",t)},fe)}function i(t,r){D(),t!==!1&&l.animate(),P(0),T(M.value*m.value),te(),r!==!0?$(()=>{y("hide",t)},fe):x()}const{show:o,hide:h}=Me({showing:d,hideOnRouteChange:u,handleShow:S,handleHide:i}),{addToHistory:O,removeFromHistory:D}=Re(d,h,u),F={belowBreakpoint:f,hide:h},V=n(()=>e.side==="right"),M=n(()=>(s.lang.rtl===!0?-1:1)*(V.value===!0?1:-1)),ie=z(0),R=z(!1),G=z(!1),re=z(m.value*M.value),N=n(()=>V.value===!0?"left":"right"),J=n(()=>d.value===!0&&f.value===!1&&e.overlay===!1?e.miniToOverlay===!0?e.miniWidth:m.value:0),Y=n(()=>e.overlay===!0||e.miniToOverlay===!0||l.view.value.indexOf(V.value?"R":"L")>-1||s.platform.is.ios===!0&&l.isContainer.value===!0),p=n(()=>e.overlay===!1&&d.value===!0&&f.value===!1),ge=n(()=>e.overlay===!0&&d.value===!0&&f.value===!1),be=n(()=>"fullscreen q-drawer__backdrop"+(d.value===!1&&R.value===!1?" hidden":"")),we=n(()=>({backgroundColor:`rgba(0,0,0,${ie.value*.4})`})),se=n(()=>V.value===!0?l.rows.value.top[2]==="r":l.rows.value.top[0]==="l"),qe=n(()=>V.value===!0?l.rows.value.bottom[2]==="r":l.rows.value.bottom[0]==="l"),xe=n(()=>{const t={};return l.header.space===!0&&se.value===!1&&(Y.value===!0?t.top=`${l.header.offset}px`:l.header.space===!0&&(t.top=`${l.header.size}px`)),l.footer.space===!0&&qe.value===!1&&(Y.value===!0?t.bottom=`${l.footer.offset}px`:l.footer.space===!0&&(t.bottom=`${l.footer.size}px`)),t}),ze=n(()=>{const t={width:`${m.value}px`,transform:`translateX(${re.value}px)`};return f.value===!0?t:Object.assign(t,xe.value)}),Se=n(()=>"q-drawer__content fit "+(l.isContainer.value!==!0?"scroll":"overflow-auto")),$e=n(()=>`q-drawer q-drawer--${e.side}`+(G.value===!0?" q-drawer--mini-animate":"")+(e.bordered===!0?" q-drawer--bordered":"")+(g.value===!0?" q-drawer--dark q-dark":"")+(R.value===!0?" no-transition":d.value===!0?"":" q-layout--prevent-focus")+(f.value===!0?" fixed q-drawer--on-top q-drawer--mobile q-drawer--top-padding":` q-drawer--${w.value===!0?"mini":"standard"}`+(Y.value===!0||p.value!==!0?" fixed":"")+(e.overlay===!0||e.miniToOverlay===!0?" q-drawer--on-top":"")+(se.value===!0?" q-drawer--top-padding":""))),Ce=n(()=>{const t=s.lang.rtl===!0?e.side:N.value;return[[le,Te,void 0,{[t]:!0,mouse:!0}]]}),ke=n(()=>{const t=s.lang.rtl===!0?N.value:e.side;return[[le,ce,void 0,{[t]:!0,mouse:!0}]]}),Be=n(()=>{const t=s.lang.rtl===!0?N.value:e.side;return[[le,ce,void 0,{[t]:!0,mouse:!0,mouseAllDir:!0}]]});function Z(){Qe(f,e.behavior==="mobile"||e.behavior!=="desktop"&&l.totalWidth.value<=e.breakpoint)}v(f,t=>{t===!0?(H=d.value,d.value===!0&&h(!1)):e.overlay===!1&&e.behavior!=="mobile"&&H!==!1&&(d.value===!0?(T(0),P(0),te()):o(!1))}),v(()=>e.side,(t,r)=>{l.instances[r]===F&&(l.instances[r]=void 0,l[r].space=!1,l[r].offset=0),l.instances[t]=F,l[t].size=m.value,l[t].space=p.value,l[t].offset=J.value}),v(l.totalWidth,()=>{(l.isContainer.value===!0||document.qScrollPrevented!==!0)&&Z()}),v(()=>e.behavior+e.breakpoint,Z),v(l.isContainer,t=>{d.value===!0&&B(t!==!0),t===!0&&Z()}),v(l.scrollbarWidth,()=>{T(d.value===!0?0:void 0)}),v(J,t=>{W("offset",t)}),v(p,t=>{y("onLayout",t),W("space",t)}),v(V,()=>{T()}),v(m,t=>{T(),ae(e.miniToOverlay,t)}),v(()=>e.miniToOverlay,t=>{ae(t,m.value)}),v(()=>s.lang.rtl,()=>{T()}),v(()=>e.mini,()=>{e.noMiniAnimation||e.modelValue===!0&&(Le(),l.animate())}),v(w,t=>{y("miniState",t)});function T(t){t===void 0?de(()=>{t=d.value===!0?0:m.value,T(M.value*t)}):(l.isContainer.value===!0&&V.value===!0&&(f.value===!0||Math.abs(t)===m.value)&&(t+=M.value*l.scrollbarWidth.value),re.value=t)}function P(t){ie.value=t}function ee(t){const r=t===!0?"remove":l.isContainer.value!==!0?"add":"";r!==""&&document.body.classList[r]("q-body--drawer-toggle")}function Le(){L!==null&&clearTimeout(L),a.proxy&&a.proxy.$el&&a.proxy.$el.classList.add("q-drawer--mini-animate"),G.value=!0,L=setTimeout(()=>{L=null,G.value=!1,a&&a.proxy&&a.proxy.$el&&a.proxy.$el.classList.remove("q-drawer--mini-animate")},150)}function Te(t){if(d.value!==!1)return;const r=m.value,C=U(t.distance.x,0,r);if(t.isFinal===!0){C>=Math.min(75,r)===!0?o():(l.animate(),P(0),T(M.value*r)),R.value=!1;return}T((s.lang.rtl===!0?V.value!==!0:V.value)?Math.max(r-C,0):Math.min(0,C-r)),P(U(C/r,0,1)),t.isFirst===!0&&(R.value=!0)}function ce(t){if(d.value!==!0)return;const r=m.value,C=t.direction===e.side,j=(s.lang.rtl===!0?C!==!0:C)?U(t.distance.x,0,r):0;if(t.isFinal===!0){Math.abs(j)<Math.min(75,r)===!0?(l.animate(),P(1),T(0)):h(),R.value=!1;return}T(M.value*j),P(U(1-j/r,0,1)),t.isFirst===!0&&(R.value=!0)}function te(){B(!1),ee(!0)}function W(t,r){l.update(e.side,t,r)}function Qe(t,r){t.value!==r&&(t.value=r)}function ae(t,r){W("size",t===!0?e.miniWidth:r)}return l.instances[e.side]=F,ae(e.miniToOverlay,m.value),W("space",p.value),W("offset",J.value),e.showIfAbove===!0&&e.modelValue!==!0&&d.value===!0&&e["onUpdate:modelValue"]!==void 0&&y("update:modelValue",!0),_e(()=>{y("onLayout",p.value),y("miniState",w.value),H=e.showIfAbove===!0;const t=()=>{(d.value===!0?S:i)(!1,!0)};if(l.totalWidth.value!==0){de(t);return}b=v(l.totalWidth,()=>{b(),b=void 0,d.value===!1&&e.showIfAbove===!0&&f.value===!1?o(!1):t()})}),ne(()=>{b!==void 0&&b(),L!==null&&(clearTimeout(L),L=null),d.value===!0&&te(),l.instances[e.side]===F&&(l.instances[e.side]=void 0,W("size",0),W("offset",0),W("space",!1))}),()=>{const t=[];f.value===!0&&(e.noSwipeOpen===!1&&t.push(De(q("div",{key:"open",class:`q-drawer__opener fixed-${e.side}`,"aria-hidden":"true"}),Ce.value)),t.push(ve("div",{ref:"backdrop",class:be.value,style:we.value,"aria-hidden":"true",onClick:h},void 0,"backdrop",e.noSwipeBackdrop!==!0&&d.value===!0,()=>Be.value)));const r=w.value===!0&&k.mini!==void 0,C=[q("div",{...c,key:""+r,class:[Se.value,c.class]},r===!0?k.mini():ue(k.default))];return e.elevated===!0&&d.value===!0&&C.push(q("div",{class:"q-layout__shadow absolute-full overflow-hidden no-pointer-events"})),t.push(ve("aside",{ref:"content",class:$e.value,style:ze.value},C,"contentclose",e.noSwipeClose!==!0&&f.value===!0,()=>ke.value)),q("div",{class:"q-drawer-container"},t)}}}),Je=_({name:"QPageContainer",setup(e,{slots:k}){const{proxy:{$q:y}}=A(),c=X(I,Q);if(c===Q)return console.error("QPageContainer needs to be child of QLayout"),Q;he(Ae,!0);const a=n(()=>{const s={};return c.header.space===!0&&(s.paddingTop=`${c.header.size}px`),c.right.space===!0&&(s[`padding${y.lang.rtl===!0?"Left":"Right"}`]=`${c.right.size}px`),c.footer.space===!0&&(s.paddingBottom=`${c.footer.size}px`),c.left.space===!0&&(s[`padding${y.lang.rtl===!0?"Right":"Left"}`]=`${c.left.size}px`),s});return()=>q("div",{class:"q-page-container",style:a.value},ue(k.default))}}),Ye=_({name:"QFooter",props:{modelValue:{type:Boolean,default:!0},reveal:Boolean,bordered:Boolean,elevated:Boolean,heightHint:{type:[String,Number],default:50}},emits:["reveal","focusin"],setup(e,{slots:k,emit:y}){const{proxy:{$q:c}}=A(),a=X(I,Q);if(a===Q)return console.error("QFooter needs to be child of QLayout"),Q;const s=z(parseInt(e.heightHint,10)),g=z(!0),B=z(me.value===!0||a.isContainer.value===!0?0:window.innerHeight),$=n(()=>e.reveal===!0||a.view.value.indexOf("F")>-1||c.platform.is.ios&&a.isContainer.value===!0),x=n(()=>a.isContainer.value===!0?a.containerHeight.value:B.value),l=n(()=>{if(e.modelValue!==!0)return 0;if($.value===!0)return g.value===!0?s.value:0;const o=a.scroll.value.position+x.value+s.value-a.height.value;return o>0?o:0}),H=n(()=>e.modelValue!==!0||$.value===!0&&g.value!==!0),L=n(()=>e.modelValue===!0&&H.value===!0&&e.reveal===!0),b=n(()=>"q-footer q-layout__section--marginal "+($.value===!0?"fixed":"absolute")+"-bottom"+(e.bordered===!0?" q-footer--bordered":"")+(H.value===!0?" q-footer--hidden":"")+(e.modelValue!==!0?" q-layout--prevent-focus"+($.value!==!0?" hidden":""):"")),f=n(()=>{const o=a.rows.value.bottom,h={};return o[0]==="l"&&a.left.space===!0&&(h[c.lang.rtl===!0?"right":"left"]=`${a.left.size}px`),o[2]==="r"&&a.right.space===!0&&(h[c.lang.rtl===!0?"left":"right"]=`${a.right.size}px`),h});function w(o,h){a.update("footer",o,h)}function m(o,h){o.value!==h&&(o.value=h)}function d({height:o}){m(s,o),w("size",o)}function u(){if(e.reveal!==!0)return;const{direction:o,position:h,inflectionPoint:O}=a.scroll.value;m(g,o==="up"||h-O<100||a.height.value-x.value-h-s.value<300)}function S(o){L.value===!0&&m(g,!0),y("focusin",o)}v(()=>e.modelValue,o=>{w("space",o),m(g,!0),a.animate()}),v(l,o=>{w("offset",o)}),v(()=>e.reveal,o=>{o===!1&&m(g,e.modelValue)}),v(g,o=>{a.animate(),y("reveal",o)}),v([s,a.scroll,a.height],u),v(()=>c.screen.height,o=>{a.isContainer.value!==!0&&m(B,o)});const i={};return a.instances.footer=i,e.modelValue===!0&&w("size",s.value),w("space",e.modelValue),w("offset",l.value),ne(()=>{a.instances.footer===i&&(a.instances.footer=void 0,w("size",0),w("offset",0),w("space",!1))}),()=>{const o=ye(k.default,[q(K,{debounce:0,onResize:d})]);return e.elevated===!0&&o.push(q("div",{class:"q-layout__shadow absolute-full overflow-hidden no-pointer-events"})),q("footer",{class:b.value,style:f.value,onFocusin:S},o)}}}),Ze=_({name:"QLayout",props:{container:Boolean,view:{type:String,default:"hhh lpr fff",validator:e=>/^(h|l)h(h|r) lpr (f|l)f(f|r)$/.test(e.toLowerCase())},onScroll:Function,onScrollHeight:Function,onResize:Function},setup(e,{slots:k,emit:y}){const{proxy:{$q:c}}=A(),a=z(null),s=z(c.screen.height),g=z(e.container===!0?0:c.screen.width),B=z({position:0,direction:"down",inflectionPoint:0}),$=z(0),x=z(me.value===!0?0:oe()),l=n(()=>"q-layout q-layout--"+(e.container===!0?"containerized":"standard")),H=n(()=>e.container===!1?{minHeight:c.screen.height+"px"}:null),L=n(()=>x.value!==0?{[c.lang.rtl===!0?"left":"right"]:`${x.value}px`}:null),b=n(()=>x.value!==0?{[c.lang.rtl===!0?"right":"left"]:0,[c.lang.rtl===!0?"left":"right"]:`-${x.value}px`,width:`calc(100% + ${x.value}px)`}:null);function f(i){if(e.container===!0||document.qScrollPrevented!==!0){const o={position:i.position.top,direction:i.direction,directionChanged:i.directionChanged,inflectionPoint:i.inflectionPoint.top,delta:i.delta.top};B.value=o,e.onScroll!==void 0&&y("scroll",o)}}function w(i){const{height:o,width:h}=i;let O=!1;s.value!==o&&(O=!0,s.value=o,e.onScrollHeight!==void 0&&y("scrollHeight",o),d()),g.value!==h&&(O=!0,g.value=h),O===!0&&e.onResize!==void 0&&y("resize",i)}function m({height:i}){$.value!==i&&($.value=i,d())}function d(){if(e.container===!0){const i=s.value>$.value?oe():0;x.value!==i&&(x.value=i)}}let u=null;const S={instances:{},view:n(()=>e.view),isContainer:n(()=>e.container),rootRef:a,height:s,containerHeight:$,scrollbarWidth:x,totalWidth:n(()=>g.value+x.value),rows:n(()=>{const i=e.view.toLowerCase().split(" ");return{top:i[0].split(""),middle:i[1].split(""),bottom:i[2].split("")}}),header:E({size:0,offset:0,space:!1}),right:E({size:300,offset:0,space:!1}),footer:E({size:0,offset:0,space:!1}),left:E({size:300,offset:0,space:!1}),scroll:B,animate(){u!==null?clearTimeout(u):document.body.classList.add("q-body--layout-animate"),u=setTimeout(()=>{u=null,document.body.classList.remove("q-body--layout-animate")},155)},update(i,o,h){S[i][o]=h}};if(he(I,S),oe()>0){let h=function(){i=null,o.classList.remove("hide-scrollbar")},O=function(){if(i===null){if(o.scrollHeight>c.screen.height)return;o.classList.add("hide-scrollbar")}else clearTimeout(i);i=setTimeout(h,300)},D=function(F){i!==null&&F==="remove"&&(clearTimeout(i),h()),window[`${F}EventListener`]("resize",O)},i=null;const o=document.body;v(()=>e.container!==!0?"add":"remove",D),e.container!==!0&&D("add"),Ie(()=>{D("remove")})}return()=>{const i=ye(k.default,[q(Ne,{onScroll:f}),q(K,{onResize:w})]),o=q("div",{class:l.value,style:H.value,ref:e.container===!0?void 0:a,tabindex:-1},i);return e.container===!0?q("div",{class:"q-layout-container overflow-hidden",ref:a},[q(K,{onResize:m}),q("div",{class:"absolute-full",style:L.value},[q("div",{class:"scroll",style:b.value},[o])])]):o}}}),et=_({name:"QToolbar",props:{inset:Boolean},setup(e,{slots:k}){const y=n(()=>"q-toolbar row no-wrap items-center"+(e.inset===!0?" q-toolbar--inset":""));return()=>q("div",{class:y.value,role:"toolbar"},ue(k.default))}});export{et as Q,Xe as a,Ge as b,Je as c,Ye as d,Ze as e};
