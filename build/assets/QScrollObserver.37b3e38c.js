import{h as b,w as m,o as h,i as S,as as T,au as x,m as w,at as C,av as P,aw as E}from"./index.73ee47d1.js";const{passive:v}=C,M=["both","horizontal","vertical"];var z=b({name:"QScrollObserver",props:{axis:{type:String,validator:e=>M.includes(e),default:"vertical"},debounce:[String,Number],scrollTarget:{default:void 0}},emits:["scroll"],setup(e,{emit:p}){const t={position:{top:0,left:0},direction:"down",directionChanged:!1,delta:{top:0,left:0},inflectionPoint:{top:0,left:0}};let n=null,i,u;m(()=>e.scrollTarget,()=>{f(),d()});function l(){n!==null&&n();const a=Math.max(0,P(i)),c=E(i),o={top:a-t.position.top,left:c-t.position.left};if(e.axis==="vertical"&&o.top===0||e.axis==="horizontal"&&o.left===0)return;const g=Math.abs(o.top)>=Math.abs(o.left)?o.top<0?"up":"down":o.left<0?"left":"right";t.position={top:a,left:c},t.directionChanged=t.direction!==g,t.delta=o,t.directionChanged===!0&&(t.direction=g,t.inflectionPoint=t.position),p("scroll",{...t})}function d(){i=x(u,e.scrollTarget),i.addEventListener("scroll",r,v),r(!0)}function f(){i!==void 0&&(i.removeEventListener("scroll",r,v),i=void 0)}function r(a){if(a===!0||e.debounce===0||e.debounce==="0")l();else if(n===null){const[c,o]=e.debounce?[setTimeout(l,e.debounce),clearTimeout]:[requestAnimationFrame(l),cancelAnimationFrame];n=()=>{o(c),n=null}}}const{proxy:s}=w();return m(()=>s.$q.lang.rtl,l),h(()=>{u=s.$el.parentNode,d()}),S(()=>{n!==null&&n(),f()}),Object.assign(s,{trigger:r,getPosition:()=>t}),T}});export{z as Q};
