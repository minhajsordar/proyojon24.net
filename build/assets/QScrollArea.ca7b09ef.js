import{h as x,a1 as ee,r as n,a2 as te,g as i,a9 as g,an as le,w as ae,ao as re,ap as oe,i as ie,j as u,af as ne,U as A,m as ue,a8 as C,aq as O,ar as y}from"./index.73ee47d1.js";import{Q as j}from"./QResizeObserver.44a423c4.js";import{Q as se}from"./QScrollObserver.37b3e38c.js";const D=["vertical","horizontal"],p={vertical:{offset:"offsetY",scroll:"scrollTop",dir:"down",dist:"y"},horizontal:{offset:"offsetX",scroll:"scrollLeft",dir:"right",dist:"x"}},Q={prevent:!0,mouse:!0,mouseAllDir:!0},$=r=>r>=250?50:Math.ceil(r/5);var be=x({name:"QScrollArea",props:{...ee,thumbStyle:Object,verticalThumbStyle:Object,horizontalThumbStyle:Object,barStyle:[Array,String,Object],verticalBarStyle:[Array,String,Object],horizontalBarStyle:[Array,String,Object],contentStyle:[Array,String,Object],contentActiveStyle:[Array,String,Object],delay:{type:[String,Number],default:1e3},visible:{type:Boolean,default:null},tabindex:[String,Number],onScroll:Function},setup(r,{slots:B,emit:R}){const b=n(!1),h=n(!1),f=n(!1),o={vertical:n(0),horizontal:n(0)},e={vertical:{ref:n(null),position:n(0),size:n(0)},horizontal:{ref:n(null),position:n(0),size:n(0)}},{proxy:v}=ue(),k=te(r,v.$q);let d=null,_;const s=n(null),E=i(()=>"q-scrollarea"+(k.value===!0?" q-scrollarea--dark":""));e.vertical.percentage=i(()=>{const t=e.vertical.size.value-o.vertical.value;if(t<=0)return 0;const l=g(e.vertical.position.value/t,0,1);return Math.round(l*1e4)/1e4}),e.vertical.thumbHidden=i(()=>(r.visible===null?f.value:r.visible)!==!0&&b.value===!1&&h.value===!1||e.vertical.size.value<=o.vertical.value+1),e.vertical.thumbStart=i(()=>e.vertical.percentage.value*(o.vertical.value-e.vertical.thumbSize.value)),e.vertical.thumbSize=i(()=>Math.round(g(o.vertical.value*o.vertical.value/e.vertical.size.value,$(o.vertical.value),o.vertical.value))),e.vertical.style=i(()=>({...r.thumbStyle,...r.verticalThumbStyle,top:`${e.vertical.thumbStart.value}px`,height:`${e.vertical.thumbSize.value}px`})),e.vertical.thumbClass=i(()=>"q-scrollarea__thumb q-scrollarea__thumb--v absolute-right"+(e.vertical.thumbHidden.value===!0?" q-scrollarea__thumb--invisible":"")),e.vertical.barClass=i(()=>"q-scrollarea__bar q-scrollarea__bar--v absolute-right"+(e.vertical.thumbHidden.value===!0?" q-scrollarea__bar--invisible":"")),e.horizontal.percentage=i(()=>{const t=e.horizontal.size.value-o.horizontal.value;if(t<=0)return 0;const l=g(Math.abs(e.horizontal.position.value)/t,0,1);return Math.round(l*1e4)/1e4}),e.horizontal.thumbHidden=i(()=>(r.visible===null?f.value:r.visible)!==!0&&b.value===!1&&h.value===!1||e.horizontal.size.value<=o.horizontal.value+1),e.horizontal.thumbStart=i(()=>e.horizontal.percentage.value*(o.horizontal.value-e.horizontal.thumbSize.value)),e.horizontal.thumbSize=i(()=>Math.round(g(o.horizontal.value*o.horizontal.value/e.horizontal.size.value,$(o.horizontal.value),o.horizontal.value))),e.horizontal.style=i(()=>({...r.thumbStyle,...r.horizontalThumbStyle,[v.$q.lang.rtl===!0?"right":"left"]:`${e.horizontal.thumbStart.value}px`,width:`${e.horizontal.thumbSize.value}px`})),e.horizontal.thumbClass=i(()=>"q-scrollarea__thumb q-scrollarea__thumb--h absolute-bottom"+(e.horizontal.thumbHidden.value===!0?" q-scrollarea__thumb--invisible":"")),e.horizontal.barClass=i(()=>"q-scrollarea__bar q-scrollarea__bar--h absolute-bottom"+(e.horizontal.thumbHidden.value===!0?" q-scrollarea__bar--invisible":""));const F=i(()=>e.vertical.thumbHidden.value===!0&&e.horizontal.thumbHidden.value===!0?r.contentStyle:r.contentActiveStyle),V=[[C,t=>{H(t,"vertical")},void 0,{vertical:!0,...Q}]],L=[[C,t=>{H(t,"horizontal")},void 0,{horizontal:!0,...Q}]];function q(){const t={};return D.forEach(l=>{const a=e[l];t[l+"Position"]=a.position.value,t[l+"Percentage"]=a.percentage.value,t[l+"Size"]=a.size.value,t[l+"ContainerSize"]=o[l].value}),t}const M=le(()=>{const t=q();t.ref=v,R("scroll",t)},0);function P(t,l,a){if(D.includes(t)===!1){console.error("[QScrollArea]: wrong first param of setScrollPosition (vertical/horizontal)");return}(t==="vertical"?O:y)(s.value,l,a)}function N({height:t,width:l}){let a=!1;o.vertical.value!==t&&(o.vertical.value=t,a=!0),o.horizontal.value!==l&&(o.horizontal.value=l,a=!0),a===!0&&z()}function U({position:t}){let l=!1;e.vertical.position.value!==t.top&&(e.vertical.position.value=t.top,l=!0),e.horizontal.position.value!==t.left&&(e.horizontal.position.value=t.left,l=!0),l===!0&&z()}function I({height:t,width:l}){e.horizontal.size.value!==l&&(e.horizontal.size.value=l,z()),e.vertical.size.value!==t&&(e.vertical.size.value=t,z())}function H(t,l){const a=e[l];if(t.isFirst===!0){if(a.thumbHidden.value===!0)return;_=a.position.value,h.value=!0}else if(h.value!==!0)return;t.isFinal===!0&&(h.value=!1);const c=p[l],S=o[l].value,K=(a.size.value-S)/(S-a.thumbSize.value),W=t.distance[c.dist],Z=_+(t.direction===c.dir?1:-1)*W*K;w(Z,l)}function T(t,l){const a=e[l];if(a.thumbHidden.value!==!0){const c=t[p[l].offset];if(c<a.thumbStart.value||c>a.thumbStart.value+a.thumbSize.value){const S=c-a.thumbSize.value/2;w(S/o[l].value*a.size.value,l)}a.ref.value!==null&&a.ref.value.dispatchEvent(new MouseEvent(t.type,t))}}function X(t){T(t,"vertical")}function Y(t){T(t,"horizontal")}function z(){b.value=!0,d!==null&&clearTimeout(d),d=setTimeout(()=>{d=null,b.value=!1},r.delay),r.onScroll!==void 0&&M()}function w(t,l){s.value[p[l].scroll]=t}function G(){f.value=!0}function J(){f.value=!1}let m=null;return ae(()=>v.$q.lang.rtl,t=>{s.value!==null&&y(s.value,Math.abs(e.horizontal.position.value)*(t===!0?-1:1))}),re(()=>{m={top:e.vertical.position.value,left:e.horizontal.position.value}}),oe(()=>{if(m===null)return;const t=s.value;t!==null&&(y(t,m.left),O(t,m.top))}),ie(M.cancel),Object.assign(v,{getScrollTarget:()=>s.value,getScroll:q,getScrollPosition:()=>({top:e.vertical.position.value,left:e.horizontal.position.value}),getScrollPercentage:()=>({top:e.vertical.percentage.value,left:e.horizontal.percentage.value}),setScrollPosition:P,setScrollPercentage(t,l,a){P(t,l*(e[t].size.value-o[t].value)*(t==="horizontal"&&v.$q.lang.rtl===!0?-1:1),a)}}),()=>u("div",{class:E.value,onMouseenter:G,onMouseleave:J},[u("div",{ref:s,class:"q-scrollarea__container scroll relative-position fit hide-scrollbar",tabindex:r.tabindex!==void 0?r.tabindex:void 0},[u("div",{class:"q-scrollarea__content absolute",style:F.value},ne(B.default,[u(j,{debounce:0,onResize:I})])),u(se,{axis:"both",onScroll:U})]),u(j,{debounce:0,onResize:N}),u("div",{class:e.vertical.barClass.value,style:[r.barStyle,r.verticalBarStyle],"aria-hidden":"true",onMousedown:X}),u("div",{class:e.horizontal.barClass.value,style:[r.barStyle,r.horizontalBarStyle],"aria-hidden":"true",onMousedown:Y}),A(u("div",{ref:e.vertical.ref,class:e.vertical.thumbClass.value,style:e.vertical.style.value,"aria-hidden":"true"}),V),A(u("div",{ref:e.horizontal.ref,class:e.horizontal.thumbClass.value,style:e.horizontal.style.value,"aria-hidden":"true"}),L)])}});export{be as Q};
