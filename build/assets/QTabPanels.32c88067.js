import{a9 as ue,r as R,g as m,i as Se,o as Ve,ac as We,v as Fe,R as Ne,j as w,dw as ke,aF as U,aJ as je,be as ze,z as J,at as Ke,ab as Z,b8 as Oe,bs as He,h as ee,ay as se,ai as Ce,w as H,b3 as Ue,b4 as Xe,k as te,aq as Ye,bl as Ge,aM as O,dx as we,aH as Je,dy as Pe,dz as Ze,aD as G,dA as ce,aS as qe,aC as et,aB as ve,T as tt,dB as nt,an as at,c3 as ot,af as rt,ah as it,ao as lt}from"./index.d50f7643.js";import{Q as ut}from"./QResizeObserver.6abc85f8.js";import{r as st}from"./QSelect.94dd54a2.js";let ct=0;const vt=["click","keydown"],dt={icon:String,label:[Number,String],alert:[Boolean,String],alertIcon:String,name:{type:[Number,String],default:()=>`t_${ct++}`},noCaps:Boolean,tabindex:[String,Number],disable:Boolean,contentClass:String,ripple:{type:[Boolean,Object],default:!0}};function ft(e,r,d,c){const o=We(ke,ue);if(o===ue)return console.error("QTab/QRouteTab component needs to be child of QTabs"),ue;const{proxy:n}=Z(),i=R(null),p=R(null),B=R(null),M=m(()=>e.disable===!0||e.ripple===!1?!1:Object.assign({keyCodes:[13,32],early:!0},e.ripple===!0?{}:e.ripple)),g=m(()=>o.currentModel.value===e.name),D=m(()=>"q-tab relative-position self-stretch flex flex-center text-center"+(g.value===!0?" q-tab--active"+(o.tabProps.value.activeClass?" "+o.tabProps.value.activeClass:"")+(o.tabProps.value.activeColor?` text-${o.tabProps.value.activeColor}`:"")+(o.tabProps.value.activeBgColor?` bg-${o.tabProps.value.activeBgColor}`:""):" q-tab--inactive")+(e.icon&&e.label&&o.tabProps.value.inlineLabel===!1?" q-tab--full":"")+(e.noCaps===!0||o.tabProps.value.noCaps===!0?" q-tab--no-caps":"")+(e.disable===!0?" disabled":" q-focusable q-hoverable cursor-pointer")+(c!==void 0?c.linkClass.value:"")),b=m(()=>"q-tab__content self-stretch flex-center relative-position q-anchor--skip non-selectable "+(o.tabProps.value.inlineLabel===!0?"row no-wrap q-tab__content--inline":"column")+(e.contentClass!==void 0?` ${e.contentClass}`:"")),y=m(()=>e.disable===!0||o.hasFocus.value===!0||g.value===!1&&o.hasActiveTab.value===!0?-1:e.tabindex||0);function q(l,x){if(x!==!0&&i.value!==null&&i.value.focus(),e.disable===!0){c!==void 0&&c.hasRouterLink.value===!0&&U(l);return}if(c===void 0){o.updateModel({name:e.name}),d("click",l);return}if(c.hasRouterLink.value===!0){const _=(P={})=>{let S;const I=P.to===void 0||Oe(P.to,e.to)===!0?o.avoidRouteWatcher=He():null;return c.navigateToRouterLink(l,{...P,returnRouterError:!0}).catch(E=>{S=E}).then(E=>{if(I===o.avoidRouteWatcher&&(o.avoidRouteWatcher=!1,S===void 0&&(E===void 0||E.message.startsWith("Avoided redundant navigation")===!0)&&o.updateModel({name:e.name})),P.returnRouterError===!0)return S!==void 0?Promise.reject(S):E})};d("click",l,_),l.defaultPrevented!==!0&&_();return}d("click",l)}function L(l){je(l,[13,32])?q(l,!0):ze(l)!==!0&&l.keyCode>=35&&l.keyCode<=40&&l.altKey!==!0&&l.metaKey!==!0&&o.onKbdNavigate(l.keyCode,n.$el)===!0&&U(l),d("keydown",l)}function $(){const l=o.tabProps.value.narrowIndicator,x=[],_=w("div",{ref:B,class:["q-tab__indicator",o.tabProps.value.indicatorClass]});e.icon!==void 0&&x.push(w(J,{class:"q-tab__icon",name:e.icon})),e.label!==void 0&&x.push(w("div",{class:"q-tab__label"},e.label)),e.alert!==!1&&x.push(e.alertIcon!==void 0?w(J,{class:"q-tab__alert-icon",color:e.alert!==!0?e.alert:void 0,name:e.alertIcon}):w("div",{class:"q-tab__alert"+(e.alert!==!0?` text-${e.alert}`:"")})),l===!0&&x.push(_);const P=[w("div",{class:"q-focus-helper",tabindex:-1,ref:i}),w("div",{class:b.value},Ke(r.default,x))];return l===!1&&P.push(_),P}const Q={name:m(()=>e.name),rootRef:p,tabIndicatorRef:B,routeData:c};Se(()=>{o.unregisterTab(Q)}),Ve(()=>{o.registerTab(Q)});function j(l,x){const _={ref:p,class:D.value,tabindex:y.value,role:"tab","aria-selected":g.value===!0?"true":"false","aria-disabled":e.disable===!0?"true":void 0,onClick:q,onKeydown:L,...x};return Fe(w(l,_,$()),[[Ne,M.value]])}return{renderTab:j,$tabs:o}}var St=ee({name:"QTab",props:dt,emits:vt,setup(e,{slots:r,emit:d}){const{renderTab:c}=ft(e,r,d);return()=>c("div")}});function ht(e,r,d){const c=d===!0?["left","right"]:["top","bottom"];return`absolute-${r===!0?c[0]:c[1]}${e?` text-${e}`:""}`}const bt=["left","center","right","justify"];var kt=ee({name:"QTabs",props:{modelValue:[Number,String],align:{type:String,default:"center",validator:e=>bt.includes(e)},breakpoint:{type:[String,Number],default:600},vertical:Boolean,shrink:Boolean,stretch:Boolean,activeClass:String,activeColor:String,activeBgColor:String,indicatorColor:String,leftIcon:String,rightIcon:String,outsideArrows:Boolean,mobileArrows:Boolean,switchIndicator:Boolean,narrowIndicator:Boolean,inlineLabel:Boolean,noCaps:Boolean,dense:Boolean,contentClass:String,"onUpdate:modelValue":[Function,Array]},setup(e,{slots:r,emit:d}){const{proxy:c}=Z(),{$q:o}=c,{registerTick:n}=se(),{registerTick:i}=se(),{registerTick:p}=se(),{registerTimeout:B,removeTimeout:M}=Ce(),{registerTimeout:g,removeTimeout:D}=Ce(),b=R(null),y=R(null),q=R(e.modelValue),L=R(!1),$=R(!0),Q=R(!1),j=R(!1),l=[],x=R(0),_=R(!1);let P=null,S=null,I;const E=m(()=>({activeClass:e.activeClass,activeColor:e.activeColor,activeBgColor:e.activeBgColor,indicatorClass:ht(e.indicatorColor,e.switchIndicator,e.vertical),narrowIndicator:e.narrowIndicator,inlineLabel:e.inlineLabel,noCaps:e.noCaps})),ne=m(()=>{const t=x.value,a=q.value;for(let u=0;u<t;u++)if(l[u].name.value===a)return!0;return!1}),ae=m(()=>`q-tabs__content--align-${L.value===!0?"left":j.value===!0?"justify":e.align}`),oe=m(()=>`q-tabs row no-wrap items-center q-tabs--${L.value===!0?"":"not-"}scrollable q-tabs--${e.vertical===!0?"vertical":"horizontal"} q-tabs__arrows--${e.outsideArrows===!0?"outside":"inside"} q-tabs--mobile-with${e.mobileArrows===!0?"":"out"}-arrows`+(e.dense===!0?" q-tabs--dense":"")+(e.shrink===!0?" col-shrink":"")+(e.stretch===!0?" self-stretch":"")),s=m(()=>"q-tabs__content scroll--mobile row no-wrap items-center self-stretch hide-scrollbar relative-position "+ae.value+(e.contentClass!==void 0?` ${e.contentClass}`:"")),h=m(()=>e.vertical===!0?{container:"height",content:"offsetHeight",scroll:"scrollHeight"}:{container:"width",content:"offsetWidth",scroll:"scrollWidth"}),A=m(()=>e.vertical!==!0&&o.lang.rtl===!0),W=m(()=>st===!1&&A.value===!0);H(A,K),H(()=>e.modelValue,t=>{re({name:t,setCurrent:!0,skipEmit:!0})}),H(()=>e.outsideArrows,X);function re({name:t,setCurrent:a,skipEmit:u}){q.value!==t&&(u!==!0&&e["onUpdate:modelValue"]!==void 0&&d("update:modelValue",t),(a===!0||e["onUpdate:modelValue"]===void 0)&&(_e(q.value,t),q.value=t))}function X(){n(()=>{de({width:b.value.offsetWidth,height:b.value.offsetHeight})})}function de(t){if(h.value===void 0||y.value===null)return;const a=t[h.value.container],u=Math.min(y.value[h.value.scroll],Array.prototype.reduce.call(y.value.children,(C,f)=>C+(f[h.value.content]||0),0)),T=a>0&&u>a;L.value=T,T===!0&&i(K),j.value=a<parseInt(e.breakpoint,10)}function _e(t,a){const u=t!=null&&t!==""?l.find(C=>C.name.value===t):null,T=a!=null&&a!==""?l.find(C=>C.name.value===a):null;if(u&&T){const C=u.tabIndicatorRef.value,f=T.tabIndicatorRef.value;P!==null&&(clearTimeout(P),P=null),C.style.transition="none",C.style.transform="none",f.style.transition="none",f.style.transform="none";const v=C.getBoundingClientRect(),k=f.getBoundingClientRect();f.style.transform=e.vertical===!0?`translate3d(0,${v.top-k.top}px,0) scale3d(1,${k.height?v.height/k.height:1},1)`:`translate3d(${v.left-k.left}px,0,0) scale3d(${k.width?v.width/k.width:1},1,1)`,p(()=>{P=setTimeout(()=>{P=null,f.style.transition="transform .25s cubic-bezier(.4, 0, .2, 1)",f.style.transform="none"},70)})}T&&L.value===!0&&z(T.rootRef.value)}function z(t){const{left:a,width:u,top:T,height:C}=y.value.getBoundingClientRect(),f=t.getBoundingClientRect();let v=e.vertical===!0?f.top-T:f.left-a;if(v<0){y.value[e.vertical===!0?"scrollTop":"scrollLeft"]+=Math.floor(v),K();return}v+=e.vertical===!0?f.height-C:f.width-u,v>0&&(y.value[e.vertical===!0?"scrollTop":"scrollLeft"]+=Math.ceil(v),K())}function K(){const t=y.value;if(t===null)return;const a=t.getBoundingClientRect(),u=e.vertical===!0?t.scrollTop:Math.abs(t.scrollLeft);A.value===!0?($.value=Math.ceil(u+a.width)<t.scrollWidth-1,Q.value=u>0):($.value=u>0,Q.value=e.vertical===!0?Math.ceil(u+a.height)<t.scrollHeight:Math.ceil(u+a.width)<t.scrollWidth)}function fe(t){S!==null&&clearInterval(S),S=setInterval(()=>{Le(t)===!0&&F()},5)}function he(){fe(W.value===!0?Number.MAX_SAFE_INTEGER:0)}function be(){fe(W.value===!0?0:Number.MAX_SAFE_INTEGER)}function F(){S!==null&&(clearInterval(S),S=null)}function Ae(t,a){const u=Array.prototype.filter.call(y.value.children,k=>k===a||k.matches&&k.matches(".q-tab.q-focusable")===!0),T=u.length;if(T===0)return;if(t===36)return z(u[0]),u[0].focus(),!0;if(t===35)return z(u[T-1]),u[T-1].focus(),!0;const C=t===(e.vertical===!0?38:37),f=t===(e.vertical===!0?40:39),v=C===!0?-1:f===!0?1:void 0;if(v!==void 0){const k=A.value===!0?-1:1,V=u.indexOf(a)+v*k;return V>=0&&V<T&&(z(u[V]),u[V].focus({preventScroll:!0})),!0}}const Re=m(()=>W.value===!0?{get:t=>Math.abs(t.scrollLeft),set:(t,a)=>{t.scrollLeft=-a}}:e.vertical===!0?{get:t=>t.scrollTop,set:(t,a)=>{t.scrollTop=a}}:{get:t=>t.scrollLeft,set:(t,a)=>{t.scrollLeft=a}});function Le(t){const a=y.value,{get:u,set:T}=Re.value;let C=!1,f=u(a);const v=t<f?-1:1;return f+=v*5,f<0?(C=!0,f=0):(v===-1&&f<=t||v===1&&f>=t)&&(C=!0,f=t),T(a,f),K(),C}function me(t,a){for(const u in t)if(t[u]!==a[u])return!1;return!0}function Ie(){let t=null,a={matchedLen:0,queryDiff:9999,hrefLen:0};const u=l.filter(v=>v.routeData!==void 0&&v.routeData.hasRouterLink.value===!0),{hash:T,query:C}=c.$route,f=Object.keys(C).length;for(const v of u){const k=v.routeData.exact.value===!0;if(v.routeData[k===!0?"linkIsExactActive":"linkIsActive"].value!==!0)continue;const{hash:V,query:ie,matched:Ee,href:Qe}=v.routeData.resolvedLink.value,le=Object.keys(ie).length;if(k===!0){if(V!==T||le!==f||me(C,ie)===!1)continue;t=v.name.value;break}if(V!==""&&V!==T||le!==0&&me(ie,C)===!1)continue;const N={matchedLen:Ee.length,queryDiff:f-le,hrefLen:Qe.length-V.length};if(N.matchedLen>a.matchedLen){t=v.name.value,a=N;continue}else if(N.matchedLen!==a.matchedLen)continue;if(N.queryDiff<a.queryDiff)t=v.name.value,a=N;else if(N.queryDiff!==a.queryDiff)continue;N.hrefLen>a.hrefLen&&(t=v.name.value,a=N)}t===null&&l.some(v=>v.routeData===void 0&&v.name.value===q.value)===!0||re({name:t,setCurrent:!0})}function Be(t){if(M(),_.value!==!0&&b.value!==null&&t.target&&typeof t.target.closest=="function"){const a=t.target.closest(".q-tab");a&&b.value.contains(a)===!0&&(_.value=!0,L.value===!0&&z(a))}}function $e(){B(()=>{_.value=!1},30)}function Y(){pe.avoidRouteWatcher===!1?g(Ie):D()}function ge(){if(I===void 0){const t=H(()=>c.$route.fullPath,Y);I=()=>{t(),I=void 0}}}function Me(t){l.push(t),x.value++,X(),t.routeData===void 0||c.$route===void 0?g(()=>{if(L.value===!0){const a=q.value,u=a!=null&&a!==""?l.find(T=>T.name.value===a):null;u&&z(u.rootRef.value)}}):(ge(),t.routeData.hasRouterLink.value===!0&&Y())}function De(t){l.splice(l.indexOf(t),1),x.value--,X(),I!==void 0&&t.routeData!==void 0&&(l.every(a=>a.routeData===void 0)===!0&&I(),Y())}const pe={currentModel:q,tabProps:E,hasFocus:_,hasActiveTab:ne,registerTab:Me,unregisterTab:De,verifyRouteModel:Y,updateModel:re,onKbdNavigate:Ae,avoidRouteWatcher:!1};Ye(ke,pe);function ye(){P!==null&&clearTimeout(P),F(),I!==void 0&&I()}let Te;return Se(ye),Ue(()=>{Te=I!==void 0,ye()}),Xe(()=>{Te===!0&&ge(),X()}),()=>w("div",{ref:b,class:oe.value,role:"tablist",onFocusin:Be,onFocusout:$e},[w(ut,{onResize:de}),w("div",{ref:y,class:s.value,onScroll:K},te(r.default)),w(J,{class:"q-tabs__arrow q-tabs__arrow--left absolute q-tab__icon"+($.value===!0?"":" q-tabs__arrow--faded"),name:e.leftIcon||o.iconSet.tabs[e.vertical===!0?"up":"left"],onMousedownPassive:he,onTouchstartPassive:he,onMouseupPassive:F,onMouseleavePassive:F,onTouchendPassive:F}),w(J,{class:"q-tabs__arrow q-tabs__arrow--right absolute q-tab__icon"+(Q.value===!0?"":" q-tabs__arrow--faded"),name:e.rightIcon||o.iconSet.tabs[e.vertical===!0?"down":"right"],onMousedownPassive:be,onTouchstartPassive:be,onMouseupPassive:F,onMouseleavePassive:F,onTouchendPassive:F})])}});function mt(e){const r=[.06,6,50];return typeof e=="string"&&e.length&&e.split(":").forEach((d,c)=>{const o=parseFloat(d);o&&(r[c]=o)}),r}var gt=Ge({name:"touch-swipe",beforeMount(e,{value:r,arg:d,modifiers:c}){if(c.mouse!==!0&&O.has.touch!==!0)return;const o=c.mouseCapture===!0?"Capture":"",n={handler:r,sensitivity:mt(d),direction:we(c),noop:Je,mouseStart(i){Pe(i,n)&&Ze(i)&&(G(n,"temp",[[document,"mousemove","move",`notPassive${o}`],[document,"mouseup","end","notPassiveCapture"]]),n.start(i,!0))},touchStart(i){if(Pe(i,n)){const p=i.target;G(n,"temp",[[p,"touchmove","move","notPassiveCapture"],[p,"touchcancel","end","notPassiveCapture"],[p,"touchend","end","notPassiveCapture"]]),n.start(i)}},start(i,p){O.is.firefox===!0&&ce(e,!0);const B=qe(i);n.event={x:B.left,y:B.top,time:Date.now(),mouse:p===!0,dir:!1}},move(i){if(n.event===void 0)return;if(n.event.dir!==!1){U(i);return}const p=Date.now()-n.event.time;if(p===0)return;const B=qe(i),M=B.left-n.event.x,g=Math.abs(M),D=B.top-n.event.y,b=Math.abs(D);if(n.event.mouse!==!0){if(g<n.sensitivity[1]&&b<n.sensitivity[1]){n.end(i);return}}else if(window.getSelection().toString()!==""){n.end(i);return}else if(g<n.sensitivity[2]&&b<n.sensitivity[2])return;const y=g/p,q=b/p;n.direction.vertical===!0&&g<b&&g<100&&q>n.sensitivity[0]&&(n.event.dir=D<0?"up":"down"),n.direction.horizontal===!0&&g>b&&b<100&&y>n.sensitivity[0]&&(n.event.dir=M<0?"left":"right"),n.direction.up===!0&&g<b&&D<0&&g<100&&q>n.sensitivity[0]&&(n.event.dir="up"),n.direction.down===!0&&g<b&&D>0&&g<100&&q>n.sensitivity[0]&&(n.event.dir="down"),n.direction.left===!0&&g>b&&M<0&&b<100&&y>n.sensitivity[0]&&(n.event.dir="left"),n.direction.right===!0&&g>b&&M>0&&b<100&&y>n.sensitivity[0]&&(n.event.dir="right"),n.event.dir!==!1?(U(i),n.event.mouse===!0&&(document.body.classList.add("no-pointer-events--children"),document.body.classList.add("non-selectable"),et(),n.styleCleanup=L=>{n.styleCleanup=void 0,document.body.classList.remove("non-selectable");const $=()=>{document.body.classList.remove("no-pointer-events--children")};L===!0?setTimeout($,50):$()}),n.handler({evt:i,touch:n.event.mouse!==!0,mouse:n.event.mouse,direction:n.event.dir,duration:p,distance:{x:g,y:b}})):n.end(i)},end(i){n.event!==void 0&&(ve(n,"temp"),O.is.firefox===!0&&ce(e,!1),n.styleCleanup!==void 0&&n.styleCleanup(!0),i!==void 0&&n.event.dir!==!1&&U(i),n.event=void 0)}};if(e.__qtouchswipe=n,c.mouse===!0){const i=c.mouseCapture===!0||c.mousecapture===!0?"Capture":"";G(n,"main",[[e,"mousedown","mouseStart",`passive${i}`]])}O.has.touch===!0&&G(n,"main",[[e,"touchstart","touchStart",`passive${c.capture===!0?"Capture":""}`],[e,"touchmove","noop","notPassiveCapture"]])},updated(e,r){const d=e.__qtouchswipe;d!==void 0&&(r.oldValue!==r.value&&(typeof r.value!="function"&&d.end(),d.handler=r.value),d.direction=we(r.modifiers))},beforeUnmount(e){const r=e.__qtouchswipe;r!==void 0&&(ve(r,"main"),ve(r,"temp"),O.is.firefox===!0&&ce(e,!1),r.styleCleanup!==void 0&&r.styleCleanup(),delete e.__qtouchswipe)}});function pt(){const e=new Map;return{getCache:function(r,d){return e[r]===void 0?e[r]=d:e[r]},getCacheWithFn:function(r,d){return e[r]===void 0?e[r]=d():e[r]}}}const yt={name:{required:!0},disable:Boolean},xe={setup(e,{slots:r}){return()=>w("div",{class:"q-panel scroll",role:"tabpanel"},te(r.default))}},Tt={modelValue:{required:!0},animated:Boolean,infinite:Boolean,swipeable:Boolean,vertical:Boolean,transitionPrev:String,transitionNext:String,transitionDuration:{type:[String,Number],default:300},keepAlive:Boolean,keepAliveInclude:[String,Array,RegExp],keepAliveExclude:[String,Array,RegExp],keepAliveMax:Number},Ct=["update:modelValue","beforeTransition","transition"];function wt(){const{props:e,emit:r,proxy:d}=Z(),{getCacheWithFn:c}=pt();let o,n;const i=R(null),p=R(null);function B(s){const h=e.vertical===!0?"up":"left";S((d.$q.lang.rtl===!0?-1:1)*(s.direction===h?1:-1))}const M=m(()=>[[gt,B,void 0,{horizontal:e.vertical!==!0,vertical:e.vertical,mouse:!0}]]),g=m(()=>e.transitionPrev||`slide-${e.vertical===!0?"down":"right"}`),D=m(()=>e.transitionNext||`slide-${e.vertical===!0?"up":"left"}`),b=m(()=>`--q-transition-duration: ${e.transitionDuration}ms`),y=m(()=>typeof e.modelValue=="string"||typeof e.modelValue=="number"?e.modelValue:String(e.modelValue)),q=m(()=>({include:e.keepAliveInclude,exclude:e.keepAliveExclude,max:e.keepAliveMax})),L=m(()=>e.keepAliveInclude!==void 0||e.keepAliveExclude!==void 0);H(()=>e.modelValue,(s,h)=>{const A=l(s)===!0?x(s):-1;n!==!0&&P(A===-1?0:A<x(h)?-1:1),i.value!==A&&(i.value=A,r("beforeTransition",s,h),at(()=>{r("transition",s,h)}))});function $(){S(1)}function Q(){S(-1)}function j(s){r("update:modelValue",s)}function l(s){return s!=null&&s!==""}function x(s){return o.findIndex(h=>h.props.name===s&&h.props.disable!==""&&h.props.disable!==!0)}function _(){return o.filter(s=>s.props.disable!==""&&s.props.disable!==!0)}function P(s){const h=s!==0&&e.animated===!0&&i.value!==-1?"q-transition--"+(s===-1?g.value:D.value):null;p.value!==h&&(p.value=h)}function S(s,h=i.value){let A=h+s;for(;A>-1&&A<o.length;){const W=o[A];if(W!==void 0&&W.props.disable!==""&&W.props.disable!==!0){P(s),n=!0,r("update:modelValue",W.props.name),setTimeout(()=>{n=!1});return}A+=s}e.infinite===!0&&o.length!==0&&h!==-1&&h!==o.length&&S(s,s===-1?o.length:-1)}function I(){const s=x(e.modelValue);return i.value!==s&&(i.value=s),!0}function E(){const s=l(e.modelValue)===!0&&I()&&o[i.value];return e.keepAlive===!0?[w(ot,q.value,[w(L.value===!0?c(y.value,()=>({...xe,name:y.value})):xe,{key:y.value,style:b.value},()=>s)])]:[w("div",{class:"q-panel scroll",style:b.value,key:y.value,role:"tabpanel"},[s])]}function ne(){if(o.length!==0)return e.animated===!0?[w(tt,{name:p.value},E)]:E()}function ae(s){return o=nt(te(s.default,[])).filter(h=>h.props!==null&&h.props.slot===void 0&&l(h.props.name)===!0),o.length}function oe(){return o}return Object.assign(d,{next:$,previous:Q,goTo:j}),{panelIndex:i,panelDirectives:M,updatePanelsList:ae,updatePanelIndex:I,getPanelContent:ne,getEnabledPanels:_,getPanels:oe,isValidPanelName:l,keepAliveProps:q,needsUniqueKeepAliveWrapper:L,goToPanelByOffset:S,goToPanel:j,nextPanel:$,previousPanel:Q}}var _t=ee({name:"QTabPanel",props:yt,setup(e,{slots:r}){return()=>w("div",{class:"q-tab-panel",role:"tabpanel"},te(r.default))}}),At=ee({name:"QTabPanels",props:{...Tt,...rt},emits:Ct,setup(e,{slots:r}){const d=Z(),c=it(e,d.proxy.$q),{updatePanelsList:o,getPanelContent:n,panelDirectives:i}=wt(),p=m(()=>"q-tab-panels q-panel-parent"+(c.value===!0?" q-tab-panels--dark q-dark":""));return()=>(o(r),lt("div",{class:p.value},n(),"pan",e.swipeable,()=>i.value))}});export{kt as Q,St as a,At as b,_t as c};
