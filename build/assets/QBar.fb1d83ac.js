import{j as e,h as s,a1 as c,a2 as p,g as u,k as l,m as d}from"./index.73ee47d1.js";const m=e("div",{class:"q-space"});var v=s({name:"QSpace",setup(){return()=>m}}),k=s({name:"QBar",props:{...c,dense:Boolean},setup(a,{slots:r}){const{proxy:{$q:t}}=d(),n=p(a,t),o=u(()=>`q-bar row no-wrap items-center q-bar--${a.dense===!0?"dense":"standard"}  q-bar--${n.value===!0?"dark":"light"}`);return()=>e("div",{class:o.value,role:"toolbar"},l(r.default))}});export{v as Q,k as a};
