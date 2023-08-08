import{r as L,aG as k,aH as y,ak as S,aA as H,az as $,w as m,o as A,i as T,a8 as q,ay as B,aF as g,aI as W,aJ as O,ar as P}from"./index.9c7f7a59.js";const K={target:{default:!0},noParentEvent:Boolean,contextMenu:Boolean};function N({showing:t,avoidEmit:l,configureAnchorEl:o}){const{props:e,proxy:n,emit:u}=q(),i=L(null);let d=null;function s(a){return i.value===null?!1:a===void 0||a.touches===void 0||a.touches.length<=1}const r={};o===void 0&&(Object.assign(r,{hide(a){n.hide(a)},toggle(a){n.toggle(a),a.qAnchorHandled=!0},toggleKey(a){k(a,13)===!0&&r.toggle(a)},contextClick(a){n.hide(a),y(a),S(()=>{n.show(a),a.qAnchorHandled=!0})},prevent:y,mobileTouch(a){if(r.mobileCleanup(a),s(a)!==!0)return;n.hide(a),i.value.classList.add("non-selectable");const h=a.target;H(r,"anchor",[[h,"touchmove","mobileCleanup","passive"],[h,"touchend","mobileCleanup","passive"],[h,"touchcancel","mobileCleanup","passive"],[i.value,"contextmenu","prevent","notPassive"]]),d=setTimeout(()=>{d=null,n.show(a),a.qAnchorHandled=!0},300)},mobileCleanup(a){i.value.classList.remove("non-selectable"),d!==null&&(clearTimeout(d),d=null),t.value===!0&&a!==void 0&&$()}}),o=function(a=e.contextMenu){if(e.noParentEvent===!0||i.value===null)return;let h;a===!0?n.$q.platform.is.mobile===!0?h=[[i.value,"touchstart","mobileTouch","passive"]]:h=[[i.value,"mousedown","hide","passive"],[i.value,"contextmenu","contextClick","notPassive"]]:h=[[i.value,"click","toggle","passive"],[i.value,"keyup","toggleKey","passive"]],H(r,"anchor",h)});function c(){B(r,"anchor")}function z(a){for(i.value=a;i.value.classList.contains("q-anchor--skip");)i.value=i.value.parentNode;o()}function w(){if(e.target===!1||e.target===""||n.$el.parentNode===null)i.value=null;else if(e.target===!0)z(n.$el.parentNode);else{let a=e.target;if(typeof e.target=="string")try{a=document.querySelector(e.target)}catch{a=void 0}a!=null?(i.value=a.$el||a,o()):(i.value=null,console.error(`Anchor: target "${e.target}" not found`))}}return m(()=>e.contextMenu,a=>{i.value!==null&&(c(),o(a))}),m(()=>e.target,()=>{i.value!==null&&c(),w()}),m(()=>e.noParentEvent,a=>{i.value!==null&&(a===!0?c():o())}),A(()=>{w(),l!==!0&&e.modelValue===!0&&i.value===null&&u("update:modelValue",!1)}),T(()=>{d!==null&&clearTimeout(d),c()}),{anchorEl:i,canShow:s,anchorEvents:r}}function F(t,l){const o=L(null);let e;function n(d,s){const r=`${s!==void 0?"add":"remove"}EventListener`,c=s!==void 0?s:e;d!==window&&d[r]("scroll",c,g.passive),window[r]("scroll",c,g.passive),e=s}function u(){o.value!==null&&(n(o.value),o.value=null)}const i=m(()=>t.noParentEvent,()=>{o.value!==null&&(u(),l())});return T(i),{localScrollTarget:o,unconfigureScrollTarget:u,changeScrollEvent:n}}const{notPassiveCapture:v}=g,f=[];function p(t){const l=t.target;if(l===void 0||l.nodeType===8||l.classList.contains("no-pointer-events")===!0)return;let o=W.length-1;for(;o>=0;){const e=W[o].$;if(e.type.name!=="QDialog")break;if(e.props.seamless!==!0)return;o--}for(let e=f.length-1;e>=0;e--){const n=f[e];if((n.anchorEl.value===null||n.anchorEl.value.contains(l)===!1)&&(l===document.body||n.innerRef.value!==null&&n.innerRef.value.contains(l)===!1))t.qClickOutside=!0,n.onClickOutside(t);else return}}function X(t){f.push(t),f.length===1&&(document.addEventListener("mousedown",p,v),document.addEventListener("touchstart",p,v))}function Y(t){const l=f.findIndex(o=>o===t);l>-1&&(f.splice(l,1),f.length===0&&(document.removeEventListener("mousedown",p,v),document.removeEventListener("touchstart",p,v)))}let E,M;function D(t){const l=t.split(" ");return l.length!==2?!1:["top","center","bottom"].includes(l[0])!==!0?(console.error("Anchor/Self position must start with one of top/center/bottom"),!1):["left","middle","right","start","end"].includes(l[1])!==!0?(console.error("Anchor/Self position must end with one of left/middle/right/start/end"),!1):!0}function G(t){return t?!(t.length!==2||typeof t[0]!="number"||typeof t[1]!="number"):!0}const b={"start#ltr":"left","start#rtl":"right","end#ltr":"right","end#rtl":"left"};["left","middle","right"].forEach(t=>{b[`${t}#ltr`]=t,b[`${t}#rtl`]=t});function J(t,l){const o=t.split(" ");return{vertical:o[0],horizontal:b[`${o[1]}#${l===!0?"rtl":"ltr"}`]}}function I(t,l){let{top:o,left:e,right:n,bottom:u,width:i,height:d}=t.getBoundingClientRect();return l!==void 0&&(o-=l[1],e-=l[0],u+=l[1],n+=l[0],i+=l[0],d+=l[1]),{top:o,bottom:u,height:d,left:e,right:n,width:i,middle:e+(n-e)/2,center:o+(u-o)/2}}function R(t,l,o){let{top:e,left:n}=t.getBoundingClientRect();return e+=l.top,n+=l.left,o!==void 0&&(e+=o[1],n+=o[0]),{top:e,bottom:e+1,height:1,left:n,right:n+1,width:1,middle:n,center:e}}function V(t){return{top:0,center:t.offsetHeight/2,bottom:t.offsetHeight,left:0,middle:t.offsetWidth/2,right:t.offsetWidth}}function C(t,l,o){return{top:t[o.anchorOrigin.vertical]-l[o.selfOrigin.vertical],left:t[o.anchorOrigin.horizontal]-l[o.selfOrigin.horizontal]}}function Q(t){if(O.is.ios===!0&&window.visualViewport!==void 0){const d=document.body.style,{offsetLeft:s,offsetTop:r}=window.visualViewport;s!==E&&(d.setProperty("--q-pe-left",s+"px"),E=s),r!==M&&(d.setProperty("--q-pe-top",r+"px"),M=r)}const{scrollLeft:l,scrollTop:o}=t.el,e=t.absoluteOffset===void 0?I(t.anchorEl,t.cover===!0?[0,0]:t.offset):R(t.anchorEl,t.absoluteOffset,t.offset);let n={maxHeight:t.maxHeight,maxWidth:t.maxWidth,visibility:"visible"};(t.fit===!0||t.cover===!0)&&(n.minWidth=e.width+"px",t.cover===!0&&(n.minHeight=e.height+"px")),Object.assign(t.el.style,n);const u=V(t.el);let i=C(e,u,t);if(t.absoluteOffset===void 0||t.offset===void 0)x(i,e,u,t.anchorOrigin,t.selfOrigin);else{const{top:d,left:s}=i;x(i,e,u,t.anchorOrigin,t.selfOrigin);let r=!1;if(i.top!==d){r=!0;const c=2*t.offset[1];e.center=e.top-=c,e.bottom-=c+2}if(i.left!==s){r=!0;const c=2*t.offset[0];e.middle=e.left-=c,e.right-=c+2}r===!0&&(i=C(e,u,t),x(i,e,u,t.anchorOrigin,t.selfOrigin))}n={top:i.top+"px",left:i.left+"px"},i.maxHeight!==void 0&&(n.maxHeight=i.maxHeight+"px",e.height>i.maxHeight&&(n.minHeight=n.maxHeight)),i.maxWidth!==void 0&&(n.maxWidth=i.maxWidth+"px",e.width>i.maxWidth&&(n.minWidth=n.maxWidth)),Object.assign(t.el.style,n),t.el.scrollTop!==o&&(t.el.scrollTop=o),t.el.scrollLeft!==l&&(t.el.scrollLeft=l)}function x(t,l,o,e,n){const u=o.bottom,i=o.right,d=P(),s=window.innerHeight-d,r=document.body.clientWidth;if(t.top<0||t.top+u>s)if(n.vertical==="center")t.top=l[e.vertical]>s/2?Math.max(0,s-u):0,t.maxHeight=Math.min(u,s);else if(l[e.vertical]>s/2){const c=Math.min(s,e.vertical==="center"?l.center:e.vertical===n.vertical?l.bottom:l.top);t.maxHeight=Math.min(u,c),t.top=Math.max(0,c-u)}else t.top=Math.max(0,e.vertical==="center"?l.center:e.vertical===n.vertical?l.top:l.bottom),t.maxHeight=Math.min(u,s-t.top);if(t.left<0||t.left+i>r)if(t.maxWidth=Math.min(i,r),n.horizontal==="middle")t.left=l[e.horizontal]>r/2?Math.max(0,r-i):0;else if(l[e.horizontal]>r/2){const c=Math.min(r,e.horizontal==="middle"?l.middle:e.horizontal===n.horizontal?l.right:l.left);t.maxWidth=Math.min(i,c),t.left=Math.max(0,c-t.maxWidth)}else t.left=Math.max(0,e.horizontal==="middle"?l.middle:e.horizontal===n.horizontal?l.left:l.right),t.maxWidth=Math.min(i,r-t.left)}export{G as a,F as b,N as c,X as d,J as p,Y as r,Q as s,K as u,D as v};