import{h as o,a1 as n,a2 as u,g as d,j as e,k as b,m as q}from"./index.73ee47d1.js";const c=["horizontal","vertical","cell","none"];var k=o({name:"QMarkupTable",props:{...n,dense:Boolean,flat:Boolean,bordered:Boolean,square:Boolean,wrapCells:Boolean,separator:{type:String,default:"horizontal",validator:a=>c.includes(a)}},setup(a,{slots:t}){const r=q(),l=u(a,r.proxy.$q),s=d(()=>`q-markup-table q-table__container q-table__card q-table--${a.separator}-separator`+(l.value===!0?" q-table--dark q-table__card--dark q-dark":"")+(a.dense===!0?" q-table--dense":"")+(a.flat===!0?" q-table--flat":"")+(a.bordered===!0?" q-table--bordered":"")+(a.square===!0?" q-table--square":"")+(a.wrapCells===!1?" q-table--no-wrap":""));return()=>e("div",{class:s.value},[e("table",{class:"q-table"},b(t.default))])}});export{k as Q};
