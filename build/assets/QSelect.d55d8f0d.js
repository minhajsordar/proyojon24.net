import{h as Ne,ai as Bt,aj as Pt,aB as Ht,ak as _t,r as T,g as S,al as Rt,aC as Lt,am as Dt,aD as Kt,an as Nt,aE as $t,w as se,aU as jt,aV as Qt,aW as Wt,aX as it,aI as Ut,aY as Xt,j as V,k as Yt,T as Jt,i as $e,af as je,aZ as Zt,a_ as Gt,a$ as el,aJ as me,b0 as Qe,b1 as St,b2 as gt,b3 as ht,aK as tl,b4 as ll,b5 as ul,b6 as nl,b7 as ol,ar as re,b8 as al,b9 as il,ba as rt,bb as Oe,bc as rl,bd as sl,aN as De,z as cl,be as dl,bf as xe,bg as st,aM as fl,bh as vl,D as ml,ax as Sl}from"./index.b61b8051.js";import{Q as gl}from"./QChip.b3219a99.js";import{a as hl,b as yl,Q as bl}from"./QItemLabel.e16268fe.js";import{u as wl,v as ct,a as Cl,b as Vl,c as xl,p as dt,r as ft,s as kl,d as Al}from"./position-engine.9af9d4b1.js";var pl=Ne({name:"QMenu",inheritAttrs:!1,props:{...wl,...Bt,...Pt,...Ht,persistent:Boolean,autoClose:Boolean,separateClosePopup:Boolean,noRouteDismiss:Boolean,noRefocus:Boolean,noFocus:Boolean,fit:Boolean,cover:Boolean,square:Boolean,anchor:{type:String,validator:ct},self:{type:String,validator:ct},offset:{type:Array,validator:Cl},scrollTarget:{default:void 0},touchPosition:Boolean,maxHeight:{type:String,default:null},maxWidth:{type:String,default:null}},emits:[..._t,"click","escapeKey"],setup(e,{slots:d,emit:s,attrs:C}){let O=null,i,F,y;const b=je(),{proxy:z}=b,{$q:r}=z,g=T(null),k=T(!1),w=S(()=>e.persistent!==!0&&e.noRouteDismiss!==!0),L=Rt(e,r),{registerTick:B,removeTick:j}=Lt(),{registerTimeout:Q}=Dt(),{transitionProps:_,transitionStyle:W}=Kt(e),{localScrollTarget:q,changeScrollEvent:M,unconfigureScrollTarget:U}=Vl(e,m),{anchorEl:$,canShow:le}=xl({showing:k}),{hide:ue}=Nt({showing:k,canShow:le,handleShow:a,handleHide:n,hideOnRouteChange:w,processOnMount:!0}),{showPortal:Y,hidePortal:K,renderPortal:ne}=$t(b,g,P,"menu"),ee={anchorEl:$,innerRef:g,onClickOutside(l){if(e.persistent!==!0&&k.value===!0)return ue(l),(l.type==="touchstart"||l.target.classList.contains("q-dialog__backdrop"))&&me(l),!0}},oe=S(()=>dt(e.anchor||(e.cover===!0?"center middle":"bottom start"),r.lang.rtl)),te=S(()=>e.cover===!0?oe.value:dt(e.self||"top start",r.lang.rtl)),J=S(()=>(e.square===!0?" q-menu--square":"")+(L.value===!0?" q-menu--dark q-dark":"")),Se=S(()=>e.autoClose===!0?{onClick:A}:{}),ae=S(()=>k.value===!0&&e.persistent!==!0);se(ae,l=>{l===!0?(Gt(h),Al(ee)):(it(h),ft(ee))});function Z(){Zt(()=>{let l=g.value;l&&l.contains(document.activeElement)!==!0&&(l=l.querySelector("[autofocus][tabindex], [data-autofocus][tabindex]")||l.querySelector("[autofocus] [tabindex], [data-autofocus] [tabindex]")||l.querySelector("[autofocus], [data-autofocus]")||l,l.focus({preventScroll:!0}))})}function a(l){if(O=e.noRefocus===!1?document.activeElement:null,jt(E),Y(),m(),i=void 0,l!==void 0&&(e.touchPosition||e.contextMenu)){const H=Qt(l);if(H.left!==void 0){const{top:ie,left:ce}=$.value.getBoundingClientRect();i={left:H.left-ce,top:H.top-ie}}}F===void 0&&(F=se(()=>r.screen.width+"|"+r.screen.height+"|"+e.self+"|"+e.anchor+"|"+r.lang.rtl,f)),e.noFocus!==!0&&document.activeElement.blur(),B(()=>{f(),e.noFocus!==!0&&Z()}),Q(()=>{r.platform.is.ios===!0&&(y=e.autoClose,g.value.click()),f(),Y(!0),s("show",l)},e.transitionDuration)}function n(l){j(),K(),c(!0),O!==null&&(l===void 0||l.qClickOutside!==!0)&&(((l&&l.type.indexOf("key")===0?O.closest('[tabindex]:not([tabindex^="-"])'):void 0)||O).focus(),O=null),Q(()=>{K(!0),s("hide",l)},e.transitionDuration)}function c(l){i=void 0,F!==void 0&&(F(),F=void 0),(l===!0||k.value===!0)&&(Wt(E),U(),ft(ee),it(h)),l!==!0&&(O=null)}function m(){($.value!==null||e.scrollTarget!==void 0)&&(q.value=Ut($.value,e.scrollTarget),M(q.value,f))}function A(l){y!==!0?(Xt(z,l),s("click",l)):y=!1}function E(l){ae.value===!0&&e.noFocus!==!0&&el(g.value,l.target)!==!0&&Z()}function h(l){s("escapeKey"),ue(l)}function f(){const l=g.value;l===null||$.value===null||kl({el:l,offset:e.offset,anchorEl:$.value,anchorOrigin:oe.value,selfOrigin:te.value,absoluteOffset:i,fit:e.fit,cover:e.cover,maxHeight:e.maxHeight,maxWidth:e.maxWidth})}function P(){return V(Jt,_.value,()=>k.value===!0?V("div",{role:"menu",...C,ref:g,tabindex:-1,class:["q-menu q-position-engine scroll"+J.value,C.class],style:[C.style,W.value],...Se.value},Yt(d.default)):null)}return $e(c),Object.assign(z,{focus:Z,updatePosition:f}),ne}}),Ol=Ne({name:"QField",inheritAttrs:!1,props:Qe,emits:St,setup(){return gt(ht())}});let Te=!1;{const e=document.createElement("div");e.setAttribute("dir","rtl"),Object.assign(e.style,{width:"1px",height:"1px",overflow:"auto"});const d=document.createElement("div");Object.assign(d.style,{width:"1000px",height:"1px"}),document.body.appendChild(e),e.appendChild(d),e.scrollLeft=-1e3,Te=e.scrollLeft>=0,e.remove()}const X=1e3,Fl=["start","center","end","start-force","center-force","end-force"],yt=Array.prototype.filter,ql=window.getComputedStyle(document.body).overflowAnchor===void 0?tl:function(e,d){e!==null&&(e._qOverflowAnimationFrame!==void 0&&cancelAnimationFrame(e._qOverflowAnimationFrame),e._qOverflowAnimationFrame=requestAnimationFrame(()=>{if(e===null)return;e._qOverflowAnimationFrame=void 0;const s=e.children||[];yt.call(s,O=>O.dataset&&O.dataset.qVsAnchor!==void 0).forEach(O=>{delete O.dataset.qVsAnchor});const C=s[d];C&&C.dataset&&(C.dataset.qVsAnchor="")}))};function ke(e,d){return e+d}function Ke(e,d,s,C,O,i,F,y){const b=e===window?document.scrollingElement||document.documentElement:e,z=O===!0?"offsetWidth":"offsetHeight",r={scrollStart:0,scrollViewSize:-F-y,scrollMaxSize:0,offsetStart:-F,offsetEnd:-y};if(O===!0?(e===window?(r.scrollStart=window.pageXOffset||window.scrollX||document.body.scrollLeft||0,r.scrollViewSize+=document.documentElement.clientWidth):(r.scrollStart=b.scrollLeft,r.scrollViewSize+=b.clientWidth),r.scrollMaxSize=b.scrollWidth,i===!0&&(r.scrollStart=(Te===!0?r.scrollMaxSize-r.scrollViewSize:0)-r.scrollStart)):(e===window?(r.scrollStart=window.pageYOffset||window.scrollY||document.body.scrollTop||0,r.scrollViewSize+=document.documentElement.clientHeight):(r.scrollStart=b.scrollTop,r.scrollViewSize+=b.clientHeight),r.scrollMaxSize=b.scrollHeight),s!==null)for(let g=s.previousElementSibling;g!==null;g=g.previousElementSibling)g.classList.contains("q-virtual-scroll--skip")===!1&&(r.offsetStart+=g[z]);if(C!==null)for(let g=C.nextElementSibling;g!==null;g=g.nextElementSibling)g.classList.contains("q-virtual-scroll--skip")===!1&&(r.offsetEnd+=g[z]);if(d!==e){const g=b.getBoundingClientRect(),k=d.getBoundingClientRect();O===!0?(r.offsetStart+=k.left-g.left,r.offsetEnd-=k.width):(r.offsetStart+=k.top-g.top,r.offsetEnd-=k.height),e!==window&&(r.offsetStart+=r.scrollStart),r.offsetEnd+=r.scrollMaxSize-r.offsetStart}return r}function vt(e,d,s,C){d==="end"&&(d=(e===window?document.body:e)[s===!0?"scrollWidth":"scrollHeight"]),e===window?s===!0?(C===!0&&(d=(Te===!0?document.body.scrollWidth-document.documentElement.clientWidth:0)-d),window.scrollTo(d,window.pageYOffset||window.scrollY||document.body.scrollTop||0)):window.scrollTo(window.pageXOffset||window.scrollX||document.body.scrollLeft||0,d):s===!0?(C===!0&&(d=(Te===!0?e.scrollWidth-e.offsetWidth:0)-d),e.scrollLeft=d):e.scrollTop=d}function Fe(e,d,s,C){if(s>=C)return 0;const O=d.length,i=Math.floor(s/X),F=Math.floor((C-1)/X)+1;let y=e.slice(i,F).reduce(ke,0);return s%X!==0&&(y-=d.slice(i*X,s).reduce(ke,0)),C%X!==0&&C!==O&&(y-=d.slice(C,F*X).reduce(ke,0)),y}const Ml={virtualScrollSliceSize:{type:[Number,String],default:null},virtualScrollSliceRatioBefore:{type:[Number,String],default:1},virtualScrollSliceRatioAfter:{type:[Number,String],default:1},virtualScrollItemSize:{type:[Number,String],default:24},virtualScrollStickySizeStart:{type:[Number,String],default:0},virtualScrollStickySizeEnd:{type:[Number,String],default:0},tableColspan:[Number,String]},zl={virtualScrollHorizontal:Boolean,onVirtualScroll:Function,...Ml};function Il({virtualScrollLength:e,getVirtualScrollTarget:d,getVirtualScrollEl:s,virtualScrollItemSizeComputed:C}){const O=je(),{props:i,emit:F,proxy:y}=O,{$q:b}=y;let z,r,g,k=[],w;const L=T(0),B=T(0),j=T({}),Q=T(null),_=T(null),W=T(null),q=T({from:0,to:0}),M=S(()=>i.tableColspan!==void 0?i.tableColspan:100);C===void 0&&(C=S(()=>i.virtualScrollItemSize));const U=S(()=>C.value+";"+i.virtualScrollHorizontal),$=S(()=>U.value+";"+i.virtualScrollSliceRatioBefore+";"+i.virtualScrollSliceRatioAfter);se($,()=>{J()}),se(U,le);function le(){te(r,!0)}function ue(n){te(n===void 0?r:n)}function Y(n,c){const m=d();if(m==null||m.nodeType===8)return;const A=Ke(m,s(),Q.value,_.value,i.virtualScrollHorizontal,b.lang.rtl,i.virtualScrollStickySizeStart,i.virtualScrollStickySizeEnd);g!==A.scrollViewSize&&J(A.scrollViewSize),ne(m,A,Math.min(e.value-1,Math.max(0,parseInt(n,10)||0)),0,Fl.indexOf(c)>-1?c:r>-1&&n>r?"end":"start")}function K(){const n=d();if(n==null||n.nodeType===8)return;const c=Ke(n,s(),Q.value,_.value,i.virtualScrollHorizontal,b.lang.rtl,i.virtualScrollStickySizeStart,i.virtualScrollStickySizeEnd),m=e.value-1,A=c.scrollMaxSize-c.offsetStart-c.offsetEnd-B.value;if(z===c.scrollStart)return;if(c.scrollMaxSize<=0){ne(n,c,0,0);return}g!==c.scrollViewSize&&J(c.scrollViewSize),ee(q.value.from);const E=Math.floor(c.scrollMaxSize-Math.max(c.scrollViewSize,c.offsetEnd)-Math.min(w[m],c.scrollViewSize/2));if(E>0&&Math.ceil(c.scrollStart)>=E){ne(n,c,m,c.scrollMaxSize-c.offsetEnd-k.reduce(ke,0));return}let h=0,f=c.scrollStart-c.offsetStart,P=f;if(f<=A&&f+c.scrollViewSize>=L.value)f-=L.value,h=q.value.from,P=f;else for(let l=0;f>=k[l]&&h<m;l++)f-=k[l],h+=X;for(;f>0&&h<m;)f-=w[h],f>-c.scrollViewSize?(h++,P=f):P=w[h]+f;ne(n,c,h,P)}function ne(n,c,m,A,E){const h=typeof E=="string"&&E.indexOf("-force")>-1,f=h===!0?E.replace("-force",""):E,P=f!==void 0?f:"start";let l=Math.max(0,m-j.value[P]),H=l+j.value.total;H>e.value&&(H=e.value,l=Math.max(0,H-j.value.total)),z=c.scrollStart;const ie=l!==q.value.from||H!==q.value.to;if(ie===!1&&f===void 0){ae(m);return}const{activeElement:ce}=document,G=W.value;ie===!0&&G!==null&&G!==ce&&G.contains(ce)===!0&&(G.addEventListener("focusout",oe),setTimeout(()=>{G!==null&&G.removeEventListener("focusout",oe)})),ql(G,m-l);const qe=f!==void 0?w.slice(l,m).reduce(ke,0):0;if(ie===!0){const de=H>=q.value.from&&l<=q.value.to?q.value.to:H;q.value={from:l,to:de},L.value=Fe(k,w,0,l),B.value=Fe(k,w,H,e.value),requestAnimationFrame(()=>{q.value.to!==H&&z===c.scrollStart&&(q.value={from:q.value.from,to:H},B.value=Fe(k,w,H,e.value))})}requestAnimationFrame(()=>{if(z!==c.scrollStart)return;ie===!0&&ee(l);const de=w.slice(l,m).reduce(ke,0),ge=de+c.offsetStart+L.value,Me=ge+w[m];let Ae=ge+A;if(f!==void 0){const Be=de-qe,D=c.scrollStart+Be;Ae=h!==!0&&D<ge&&Me<D+c.scrollViewSize?D:f==="end"?Me-c.scrollViewSize:ge-(f==="start"?0:Math.round((c.scrollViewSize-w[m])/2))}z=Ae,vt(n,Ae,i.virtualScrollHorizontal,b.lang.rtl),ae(m)})}function ee(n){const c=W.value;if(c){const m=yt.call(c.children,l=>l.classList&&l.classList.contains("q-virtual-scroll--skip")===!1),A=m.length,E=i.virtualScrollHorizontal===!0?l=>l.getBoundingClientRect().width:l=>l.offsetHeight;let h=n,f,P;for(let l=0;l<A;){for(f=E(m[l]),l++;l<A&&m[l].classList.contains("q-virtual-scroll--with-prev")===!0;)f+=E(m[l]),l++;P=f-w[h],P!==0&&(w[h]+=P,k[Math.floor(h/X)]+=P),h++}}}function oe(){W.value!==null&&W.value!==void 0&&W.value.focus()}function te(n,c){const m=1*C.value;(c===!0||Array.isArray(w)===!1)&&(w=[]);const A=w.length;w.length=e.value;for(let h=e.value-1;h>=A;h--)w[h]=m;const E=Math.floor((e.value-1)/X);k=[];for(let h=0;h<=E;h++){let f=0;const P=Math.min((h+1)*X,e.value);for(let l=h*X;l<P;l++)f+=w[l];k.push(f)}r=-1,z=void 0,L.value=Fe(k,w,0,q.value.from),B.value=Fe(k,w,q.value.to,e.value),n>=0?(ee(q.value.from),re(()=>{Y(n)})):Z()}function J(n){if(n===void 0&&typeof window!="undefined"){const f=d();f!=null&&f.nodeType!==8&&(n=Ke(f,s(),Q.value,_.value,i.virtualScrollHorizontal,b.lang.rtl,i.virtualScrollStickySizeStart,i.virtualScrollStickySizeEnd).scrollViewSize)}g=n;const c=parseFloat(i.virtualScrollSliceRatioBefore)||0,m=parseFloat(i.virtualScrollSliceRatioAfter)||0,A=1+c+m,E=n===void 0||n<=0?1:Math.ceil(n/C.value),h=Math.max(1,E,Math.ceil((i.virtualScrollSliceSize>0?i.virtualScrollSliceSize:10)/A));j.value={total:Math.ceil(h*A),start:Math.ceil(h*c),center:Math.ceil(h*(.5+c)),end:Math.ceil(h*(1+c)),view:E}}function Se(n,c){const m=i.virtualScrollHorizontal===!0?"width":"height",A={["--q-virtual-scroll-item-"+m]:C.value+"px"};return[n==="tbody"?V(n,{class:"q-virtual-scroll__padding",key:"before",ref:Q},[V("tr",[V("td",{style:{[m]:`${L.value}px`,...A},colspan:M.value})])]):V(n,{class:"q-virtual-scroll__padding",key:"before",ref:Q,style:{[m]:`${L.value}px`,...A}}),V(n,{class:"q-virtual-scroll__content",key:"content",ref:W,tabindex:-1},c.flat()),n==="tbody"?V(n,{class:"q-virtual-scroll__padding",key:"after",ref:_},[V("tr",[V("td",{style:{[m]:`${B.value}px`,...A},colspan:M.value})])]):V(n,{class:"q-virtual-scroll__padding",key:"after",ref:_,style:{[m]:`${B.value}px`,...A}})]}function ae(n){r!==n&&(i.onVirtualScroll!==void 0&&F("virtualScroll",{index:n,from:q.value.from,to:q.value.to-1,direction:n<r?"decrease":"increase",ref:y}),r=n)}J();const Z=ll(K,b.platform.is.ios===!0?120:35);ul(()=>{J()});let a=!1;return nl(()=>{a=!0}),ol(()=>{if(a!==!0)return;const n=d();z!==void 0&&n!==void 0&&n!==null&&n.nodeType!==8?vt(n,z,i.virtualScrollHorizontal,b.lang.rtl):Y(r)}),$e(()=>{Z.cancel()}),Object.assign(y,{scrollTo:Y,reset:le,refresh:ue}),{virtualScrollSliceRange:q,virtualScrollSliceSizeComputed:j,setVirtualScrollSize:J,onVirtualScrollEvt:Z,localResetVirtualScroll:te,padVirtualScroll:Se,scrollTo:Y,reset:le,refresh:ue}}const mt=e=>["add","add-unique","toggle"].includes(e),El=".*+?^${}()|[]\\",Tl=Object.keys(Qe);var Rl=Ne({name:"QSelect",inheritAttrs:!1,props:{...zl,...al,...Qe,modelValue:{required:!0},multiple:Boolean,displayValue:[String,Number],displayValueHtml:Boolean,dropdownIcon:String,options:{type:Array,default:()=>[]},optionValue:[Function,String],optionLabel:[Function,String],optionDisable:[Function,String],hideSelected:Boolean,hideDropdownIcon:Boolean,fillInput:Boolean,maxValues:[Number,String],optionsDense:Boolean,optionsDark:{type:Boolean,default:null},optionsSelectedClass:String,optionsHtml:Boolean,optionsCover:Boolean,menuShrink:Boolean,menuAnchor:String,menuSelf:String,menuOffset:Array,popupContentClass:String,popupContentStyle:[String,Array,Object],useInput:Boolean,useChips:Boolean,newValueMode:{type:String,validator:mt},mapOptions:Boolean,emitValue:Boolean,inputDebounce:{type:[Number,String],default:500},inputClass:[Array,String,Object],inputStyle:[Array,String,Object],tabindex:{type:[String,Number],default:0},autocomplete:String,transitionShow:String,transitionHide:String,transitionDuration:[String,Number],behavior:{type:String,validator:e=>["default","menu","dialog"].includes(e),default:"default"},virtualScrollItemSize:{type:[Number,String],default:void 0},onNewValue:Function,onFilter:Function},emits:[...St,"add","remove","inputValue","newValue","keyup","keypress","keydown","filterAbort"],setup(e,{slots:d,emit:s}){const{proxy:C}=je(),{$q:O}=C,i=T(!1),F=T(!1),y=T(-1),b=T(""),z=T(!1),r=T(!1);let g=null,k,w,L,B=null,j,Q,_,W;const q=T(null),M=T(null),U=T(null),$=T(null),le=T(null),ue=il(e),Y=dl(lt),K=S(()=>Array.isArray(e.options)?e.options.length:0),ne=S(()=>e.virtualScrollItemSize===void 0?e.optionsDense===!0?24:48:e.virtualScrollItemSize),{virtualScrollSliceRange:ee,virtualScrollSliceSizeComputed:oe,localResetVirtualScroll:te,padVirtualScroll:J,onVirtualScrollEvt:Se,scrollTo:ae,setVirtualScrollSize:Z}=Il({virtualScrollLength:K,getVirtualScrollTarget:Vt,getVirtualScrollEl:et,virtualScrollItemSizeComputed:ne}),a=ht(),n=S(()=>{const t=e.mapOptions===!0&&e.multiple!==!0,o=e.modelValue!==void 0&&(e.modelValue!==null||t===!0)?e.multiple===!0&&Array.isArray(e.modelValue)?e.modelValue:[e.modelValue]:[];if(e.mapOptions===!0&&Array.isArray(e.options)===!0){const u=e.mapOptions===!0&&k!==void 0?k:[],v=o.map(p=>Ct(p,u));return e.modelValue===null&&t===!0?v.filter(p=>p!==null):v}return o}),c=S(()=>{const t={};return Tl.forEach(o=>{const u=e[o];u!==void 0&&(t[o]=u)}),t}),m=S(()=>e.optionsDark===null?a.isDark.value:e.optionsDark),A=S(()=>rt(n.value)),E=S(()=>{let t="q-field__input q-placeholder col";return e.hideSelected===!0||n.value.length===0?[t,e.inputClass]:(t+=" q-field__input--padding",e.inputClass===void 0?t:[t,e.inputClass])}),h=S(()=>(e.virtualScrollHorizontal===!0?"q-virtual-scroll--horizontal":"")+(e.popupContentClass?" "+e.popupContentClass:"")),f=S(()=>K.value===0),P=S(()=>n.value.map(t=>N.value(t)).join(", ")),l=S(()=>e.displayValue!==void 0?e.displayValue:P.value),H=S(()=>e.optionsHtml===!0?()=>!0:t=>t!=null&&t.html===!0),ie=S(()=>e.displayValueHtml===!0||e.displayValue===void 0&&(e.optionsHtml===!0||n.value.some(H.value))),ce=S(()=>a.focused.value===!0?e.tabindex:-1),G=S(()=>{const t={tabindex:e.tabindex,role:"combobox","aria-label":e.label,"aria-readonly":e.readonly===!0?"true":"false","aria-autocomplete":e.useInput===!0?"list":"none","aria-expanded":i.value===!0?"true":"false","aria-controls":`${a.targetUid.value}_lb`};return y.value>=0&&(t["aria-activedescendant"]=`${a.targetUid.value}_${y.value}`),t}),qe=S(()=>({id:`${a.targetUid.value}_lb`,role:"listbox","aria-multiselectable":e.multiple===!0?"true":"false"})),de=S(()=>n.value.map((t,o)=>({index:o,opt:t,html:H.value(t),selected:!0,removeAtIndex:wt,toggleOption:fe,tabindex:ce.value}))),ge=S(()=>{if(K.value===0)return[];const{from:t,to:o}=ee.value;return e.options.slice(t,o).map((u,v)=>{const p=he.value(u)===!0,x=t+v,I={clickable:!0,active:!1,activeClass:Be.value,manualFocus:!0,focused:!1,disable:p,tabindex:-1,dense:e.optionsDense,dark:m.value,role:"option",id:`${a.targetUid.value}_${x}`,onClick:()=>{fe(u)}};return p!==!0&&(_e(u)===!0&&(I.active=!0),y.value===x&&(I.focused=!0),I["aria-selected"]=I.active===!0?"true":"false",O.platform.is.desktop===!0&&(I.onMousemove=()=>{i.value===!0&&ye(x)})),{index:x,opt:u,html:H.value(u),label:N.value(u),selected:I.active,focused:I.focused,toggleOption:fe,setOptionIndex:ye,itemProps:I}})}),Me=S(()=>e.dropdownIcon!==void 0?e.dropdownIcon:O.iconSet.arrow.dropdown),Ae=S(()=>e.optionsCover===!1&&e.outlined!==!0&&e.standout!==!0&&e.borderless!==!0&&e.rounded!==!0),Be=S(()=>e.optionsSelectedClass!==void 0?e.optionsSelectedClass:e.color!==void 0?`text-${e.color}`:""),D=S(()=>He(e.optionValue,"value")),N=S(()=>He(e.optionLabel,"label")),he=S(()=>He(e.optionDisable,"disable")),ze=S(()=>n.value.map(t=>D.value(t))),bt=S(()=>{const t={onInput:lt,onChange:Y,onKeydown:Ge,onKeyup:Je,onKeypress:Ze,onFocus:Xe,onClick(o){w===!0&&xe(o)}};return t.onCompositionstart=t.onCompositionupdate=t.onCompositionend=Y,t});se(n,t=>{k=t,e.useInput===!0&&e.fillInput===!0&&e.multiple!==!0&&a.innerLoading.value!==!0&&(F.value!==!0&&i.value!==!0||A.value!==!0)&&(L!==!0&&Ve(),(F.value===!0||i.value===!0)&&be(""))},{immediate:!0}),se(()=>e.fillInput,Ve),se(i,Re),se(K,Tt);function We(t){return e.emitValue===!0?D.value(t):t}function Pe(t){if(t>-1&&t<n.value.length)if(e.multiple===!0){const o=e.modelValue.slice();s("remove",{index:t,value:o.splice(t,1)[0]}),s("update:modelValue",o)}else s("update:modelValue",null)}function wt(t){Pe(t),a.focus()}function Ue(t,o){const u=We(t);if(e.multiple!==!0){e.fillInput===!0&&pe(N.value(t),!0,!0),s("update:modelValue",u);return}if(n.value.length===0){s("add",{index:0,value:u}),s("update:modelValue",e.multiple===!0?[u]:u);return}if(o===!0&&_e(t)===!0||e.maxValues!==void 0&&e.modelValue.length>=e.maxValues)return;const v=e.modelValue.slice();s("add",{index:v.length,value:u}),v.push(u),s("update:modelValue",v)}function fe(t,o){if(a.editable.value!==!0||t===void 0||he.value(t)===!0)return;const u=D.value(t);if(e.multiple!==!0){o!==!0&&(pe(e.fillInput===!0?N.value(t):"",!0,!0),ve()),M.value!==null&&M.value.focus(),(n.value.length===0||Oe(D.value(n.value[0]),u)!==!0)&&s("update:modelValue",e.emitValue===!0?u:t);return}if((w!==!0||z.value===!0)&&a.focus(),Xe(),n.value.length===0){const x=e.emitValue===!0?u:t;s("add",{index:0,value:x}),s("update:modelValue",e.multiple===!0?[x]:x);return}const v=e.modelValue.slice(),p=ze.value.findIndex(x=>Oe(x,u));if(p>-1)s("remove",{index:p,value:v.splice(p,1)[0]});else{if(e.maxValues!==void 0&&v.length>=e.maxValues)return;const x=e.emitValue===!0?u:t;s("add",{index:v.length,value:x}),v.push(x)}s("update:modelValue",v)}function ye(t){if(O.platform.is.desktop!==!0)return;const o=t>-1&&t<K.value?t:-1;y.value!==o&&(y.value=o)}function Ie(t=1,o){if(i.value===!0){let u=y.value;do u=st(u+t,-1,K.value-1);while(u!==-1&&u!==y.value&&he.value(e.options[u])===!0);y.value!==u&&(ye(u),ae(u),o!==!0&&e.useInput===!0&&e.fillInput===!0&&Ee(u>=0?N.value(e.options[u]):j))}}function Ct(t,o){const u=v=>Oe(D.value(v),t);return e.options.find(u)||o.find(u)||t}function He(t,o){const u=t!==void 0?t:o;return typeof u=="function"?u:v=>v!==null&&typeof v=="object"&&u in v?v[u]:v}function _e(t){const o=D.value(t);return ze.value.find(u=>Oe(u,o))!==void 0}function Xe(t){e.useInput===!0&&M.value!==null&&(t===void 0||M.value===t.target&&t.target.value===P.value)&&M.value.select()}function Ye(t){fl(t,27)===!0&&i.value===!0&&(xe(t),ve(),Ve()),s("keyup",t)}function Je(t){const{value:o}=t.target;if(t.keyCode!==void 0){Ye(t);return}if(t.target.value="",g!==null&&(clearTimeout(g),g=null),Ve(),typeof o=="string"&&o.length!==0){const u=o.toLocaleLowerCase(),v=x=>{const I=e.options.find(R=>x.value(R).toLocaleLowerCase()===u);return I===void 0?!1:(n.value.indexOf(I)===-1?fe(I):ve(),!0)},p=x=>{v(D)!==!0&&(v(N)===!0||x===!0||be(o,!0,()=>p(!0)))};p()}else a.clearValue(t)}function Ze(t){s("keypress",t)}function Ge(t){if(s("keydown",t),vl(t)===!0)return;const o=b.value.length!==0&&(e.newValueMode!==void 0||e.onNewValue!==void 0),u=t.shiftKey!==!0&&e.multiple!==!0&&(y.value>-1||o===!0);if(t.keyCode===27){De(t);return}if(t.keyCode===9&&u===!1){we();return}if(t.target===void 0||t.target.id!==a.targetUid.value)return;if(t.keyCode===40&&a.innerLoading.value!==!0&&i.value===!1){me(t),Ce();return}if(t.keyCode===8&&e.hideSelected!==!0&&b.value.length===0){e.multiple===!0&&Array.isArray(e.modelValue)===!0?Pe(e.modelValue.length-1):e.multiple!==!0&&e.modelValue!==null&&s("update:modelValue",null);return}(t.keyCode===35||t.keyCode===36)&&(typeof b.value!="string"||b.value.length===0)&&(me(t),y.value=-1,Ie(t.keyCode===36?1:-1,e.multiple)),(t.keyCode===33||t.keyCode===34)&&oe.value!==void 0&&(me(t),y.value=Math.max(-1,Math.min(K.value,y.value+(t.keyCode===33?-1:1)*oe.value.view)),Ie(t.keyCode===33?1:-1,e.multiple)),(t.keyCode===38||t.keyCode===40)&&(me(t),Ie(t.keyCode===38?-1:1,e.multiple));const v=K.value;if((_===void 0||W<Date.now())&&(_=""),v>0&&e.useInput!==!0&&t.key!==void 0&&t.key.length===1&&t.altKey===!1&&t.ctrlKey===!1&&t.metaKey===!1&&(t.keyCode!==32||_.length!==0)){i.value!==!0&&Ce(t);const p=t.key.toLocaleLowerCase(),x=_.length===1&&_[0]===p;W=Date.now()+1500,x===!1&&(me(t),_+=p);const I=new RegExp("^"+_.split("").map(Le=>El.indexOf(Le)>-1?"\\"+Le:Le).join(".*"),"i");let R=y.value;if(x===!0||R<0||I.test(N.value(e.options[R]))!==!0)do R=st(R+1,-1,v-1);while(R!==y.value&&(he.value(e.options[R])===!0||I.test(N.value(e.options[R]))!==!0));y.value!==R&&re(()=>{ye(R),ae(R),R>=0&&e.useInput===!0&&e.fillInput===!0&&Ee(N.value(e.options[R]))});return}if(!(t.keyCode!==13&&(t.keyCode!==32||e.useInput===!0||_!=="")&&(t.keyCode!==9||u===!1))){if(t.keyCode!==9&&me(t),y.value>-1&&y.value<v){fe(e.options[y.value]);return}if(o===!0){const p=(x,I)=>{if(I){if(mt(I)!==!0)return}else I=e.newValueMode;if(x==null)return;pe("",e.multiple!==!0,!0),(I==="toggle"?fe:Ue)(x,I==="add-unique"),e.multiple!==!0&&(M.value!==null&&M.value.focus(),ve())};if(e.onNewValue!==void 0?s("newValue",b.value,p):p(b.value),e.multiple!==!0)return}i.value===!0?we():a.innerLoading.value!==!0&&Ce()}}function et(){return w===!0?le.value:U.value!==null&&U.value.contentEl!==null?U.value.contentEl:void 0}function Vt(){return et()}function xt(){return e.hideSelected===!0?[]:d["selected-item"]!==void 0?de.value.map(t=>d["selected-item"](t)).slice():d.selected!==void 0?[].concat(d.selected()):e.useChips===!0?de.value.map((t,o)=>V(gl,{key:"option-"+o,removable:a.editable.value===!0&&he.value(t.opt)!==!0,dense:!0,textColor:e.color,tabindex:ce.value,onRemove(){t.removeAtIndex(o)}},()=>V("span",{class:"ellipsis",[t.html===!0?"innerHTML":"textContent"]:N.value(t.opt)}))):[V("span",{[ie.value===!0?"innerHTML":"textContent"]:l.value})]}function tt(){if(f.value===!0)return d["no-option"]!==void 0?d["no-option"]({inputValue:b.value}):void 0;const t=d.option!==void 0?d.option:u=>V(bl,{key:u.index,...u.itemProps},()=>V(hl,()=>V(yl,()=>V("span",{[u.html===!0?"innerHTML":"textContent"]:u.label}))));let o=J("div",ge.value.map(t));return d["before-options"]!==void 0&&(o=d["before-options"]().concat(o)),Sl(d["after-options"],o)}function kt(t,o){const u=o===!0?{...G.value,...a.splitAttrs.attributes.value}:void 0,v={ref:o===!0?M:void 0,key:"i_t",class:E.value,style:e.inputStyle,value:b.value!==void 0?b.value:"",type:"search",...u,id:o===!0?a.targetUid.value:void 0,maxlength:e.maxlength,autocomplete:e.autocomplete,"data-autofocus":t===!0||e.autofocus===!0||void 0,disabled:e.disable===!0,readonly:e.readonly===!0,...bt.value};return t!==!0&&w===!0&&(Array.isArray(v.class)===!0?v.class=[...v.class,"no-pointer-events"]:v.class+=" no-pointer-events"),V("input",v)}function lt(t){g!==null&&(clearTimeout(g),g=null),!(t&&t.target&&t.target.qComposing===!0)&&(Ee(t.target.value||""),L=!0,j=b.value,a.focused.value!==!0&&(w!==!0||z.value===!0)&&a.focus(),e.onFilter!==void 0&&(g=setTimeout(()=>{g=null,be(b.value)},e.inputDebounce)))}function Ee(t){b.value!==t&&(b.value=t,s("inputValue",t))}function pe(t,o,u){L=u!==!0,e.useInput===!0&&(Ee(t),(o===!0||u!==!0)&&(j=t),o!==!0&&be(t))}function be(t,o,u){if(e.onFilter===void 0||o!==!0&&a.focused.value!==!0)return;a.innerLoading.value===!0?s("filterAbort"):(a.innerLoading.value=!0,r.value=!0),t!==""&&e.multiple!==!0&&n.value.length!==0&&L!==!0&&t===N.value(n.value[0])&&(t="");const v=setTimeout(()=>{i.value===!0&&(i.value=!1)},10);B!==null&&clearTimeout(B),B=v,s("filter",t,(p,x)=>{(o===!0||a.focused.value===!0)&&B===v&&(clearTimeout(B),typeof p=="function"&&p(),r.value=!1,re(()=>{a.innerLoading.value=!1,a.editable.value===!0&&(o===!0?i.value===!0&&ve():i.value===!0?Re(!0):i.value=!0),typeof x=="function"&&re(()=>{x(C)}),typeof u=="function"&&re(()=>{u(C)})}))},()=>{a.focused.value===!0&&B===v&&(clearTimeout(B),a.innerLoading.value=!1,r.value=!1),i.value===!0&&(i.value=!1)})}function At(){return V(pl,{ref:U,class:h.value,style:e.popupContentStyle,modelValue:i.value,fit:e.menuShrink!==!0,cover:e.optionsCover===!0&&f.value!==!0&&e.useInput!==!0,anchor:e.menuAnchor,self:e.menuSelf,offset:e.menuOffset,dark:m.value,noParentEvent:!0,noRefocus:!0,noFocus:!0,square:Ae.value,transitionShow:e.transitionShow,transitionHide:e.transitionHide,transitionDuration:e.transitionDuration,separateClosePopup:!0,...qe.value,onScrollPassive:Se,onBeforeShow:nt,onBeforeHide:pt,onShow:Ot},tt)}function pt(t){ot(t),we()}function Ot(){Z()}function Ft(t){xe(t),M.value!==null&&M.value.focus(),z.value=!0,window.scrollTo(window.pageXOffset||window.scrollX||document.body.scrollLeft||0,0)}function qt(t){xe(t),re(()=>{z.value=!1})}function Mt(){const t=[V(Ol,{class:`col-auto ${a.fieldClass.value}`,...c.value,for:a.targetUid.value,dark:m.value,square:!0,loading:r.value,itemAligned:!1,filled:!0,stackLabel:b.value.length!==0,...a.splitAttrs.listeners.value,onFocus:Ft,onBlur:qt},{...d,rawControl:()=>a.getControl(!0),before:void 0,after:void 0})];return i.value===!0&&t.push(V("div",{ref:le,class:h.value+" scroll",style:e.popupContentStyle,...qe.value,onClick:De,onScrollPassive:Se},tt())),V(ml,{ref:$,modelValue:F.value,position:e.useInput===!0?"top":void 0,transitionShow:Q,transitionHide:e.transitionHide,transitionDuration:e.transitionDuration,onBeforeShow:nt,onBeforeHide:zt,onHide:It,onShow:Et},()=>V("div",{class:"q-select__dialog"+(m.value===!0?" q-select__dialog--dark q-dark":"")+(z.value===!0?" q-select__dialog--focused":"")},t))}function zt(t){ot(t),$.value!==null&&$.value.__updateRefocusTarget(a.rootRef.value.querySelector(".q-field__native > [tabindex]:last-child")),a.focused.value=!1}function It(t){ve(),a.focused.value===!1&&s("blur",t),Ve()}function Et(){const t=document.activeElement;(t===null||t.id!==a.targetUid.value)&&M.value!==null&&M.value!==t&&M.value.focus(),Z()}function we(){F.value!==!0&&(y.value=-1,i.value===!0&&(i.value=!1),a.focused.value===!1&&(B!==null&&(clearTimeout(B),B=null),a.innerLoading.value===!0&&(s("filterAbort"),a.innerLoading.value=!1,r.value=!1)))}function Ce(t){a.editable.value===!0&&(w===!0?(a.onControlFocusin(t),F.value=!0,re(()=>{a.focus()})):a.focus(),e.onFilter!==void 0?be(b.value):(f.value!==!0||d["no-option"]!==void 0)&&(i.value=!0))}function ve(){F.value=!1,we()}function Ve(){e.useInput===!0&&pe(e.multiple!==!0&&e.fillInput===!0&&n.value.length!==0&&N.value(n.value[0])||"",!0,!0)}function Re(t){let o=-1;if(t===!0){if(n.value.length!==0){const u=D.value(n.value[0]);o=e.options.findIndex(v=>Oe(D.value(v),u))}te(o)}ye(o)}function Tt(t,o){i.value===!0&&a.innerLoading.value===!1&&(te(-1,!0),re(()=>{i.value===!0&&a.innerLoading.value===!1&&(t>o?te():Re(!0))}))}function ut(){F.value===!1&&U.value!==null&&U.value.updatePosition()}function nt(t){t!==void 0&&xe(t),s("popupShow",t),a.hasPopupOpen=!0,a.onControlFocusin(t)}function ot(t){t!==void 0&&xe(t),s("popupHide",t),a.hasPopupOpen=!1,a.onControlFocusout(t)}function at(){w=O.platform.is.mobile!==!0&&e.behavior!=="dialog"?!1:e.behavior!=="menu"&&(e.useInput===!0?d["no-option"]!==void 0||e.onFilter!==void 0||f.value===!1:!0),Q=O.platform.is.ios===!0&&w===!0&&e.useInput===!0?"fade":e.transitionShow}return rl(at),sl(ut),at(),$e(()=>{g!==null&&clearTimeout(g)}),Object.assign(C,{showPopup:Ce,hidePopup:ve,removeAtIndex:Pe,add:Ue,toggleOption:fe,getOptionIndex:()=>y.value,setOptionIndex:ye,moveOptionSelection:Ie,filter:be,updateMenuPosition:ut,updateInputValue:pe,isOptionSelected:_e,getEmittingOptionValue:We,isOptionDisabled:(...t)=>he.value.apply(null,t)===!0,getOptionValue:(...t)=>D.value.apply(null,t),getOptionLabel:(...t)=>N.value.apply(null,t)}),Object.assign(a,{innerValue:n,fieldClass:S(()=>`q-select q-field--auto-height q-select--with${e.useInput!==!0?"out":""}-input q-select--with${e.useChips!==!0?"out":""}-chips q-select--${e.multiple===!0?"multiple":"single"}`),inputRef:q,targetRef:M,hasValue:A,showPopup:Ce,floatingLabel:S(()=>e.hideSelected!==!0&&A.value===!0||typeof b.value=="number"||b.value.length!==0||rt(e.displayValue)),getControlChild:()=>{if(a.editable.value!==!1&&(F.value===!0||f.value!==!0||d["no-option"]!==void 0))return w===!0?Mt():At();a.hasPopupOpen===!0&&(a.hasPopupOpen=!1)},controlEvents:{onFocusin(t){a.onControlFocusin(t)},onFocusout(t){a.onControlFocusout(t,()=>{Ve(),we()})},onClick(t){if(De(t),w!==!0&&i.value===!0){we(),M.value!==null&&M.value.focus();return}Ce(t)}},getControl:t=>{const o=xt(),u=t===!0||F.value!==!0||w!==!0;if(e.useInput===!0)o.push(kt(t,u));else if(a.editable.value===!0){const p=u===!0?G.value:void 0;o.push(V("input",{ref:u===!0?M:void 0,key:"d_t",class:"q-select__focus-target",id:u===!0?a.targetUid.value:void 0,value:l.value,readonly:!0,"data-autofocus":t===!0||e.autofocus===!0||void 0,...p,onKeydown:Ge,onKeyup:Ye,onKeypress:Ze})),u===!0&&typeof e.autocomplete=="string"&&e.autocomplete.length!==0&&o.push(V("input",{class:"q-select__autocomplete-input",autocomplete:e.autocomplete,tabindex:-1,onKeyup:Je}))}if(ue.value!==void 0&&e.disable!==!0&&ze.value.length!==0){const p=ze.value.map(x=>V("option",{value:x,selected:!0}));o.push(V("select",{class:"hidden",name:ue.value,multiple:e.multiple},p))}const v=e.useInput===!0||u!==!0?void 0:a.splitAttrs.attributes.value;return V("div",{class:"q-field__native row items-center",...v,...a.splitAttrs.listeners.value},o)},getInnerAppend:()=>e.loading!==!0&&r.value!==!0&&e.hideDropdownIcon!==!0?[V(cl,{class:"q-select__dropdown-icon"+(i.value===!0?" rotate-180":""),name:Me.value})]:null}),gt(a)}});export{pl as Q,Rl as a,Te as r};
