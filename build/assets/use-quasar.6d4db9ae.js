import{p as o,ai as n,ak as u,c as d,h as e,t as c,g as b,i as q,aW as i}from"./index.5188eabf.js";const k=["horizontal","vertical","cell","none"];var f=o({name:"QMarkupTable",props:{...n,dense:Boolean,flat:Boolean,bordered:Boolean,square:Boolean,wrapCells:Boolean,separator:{type:String,default:"horizontal",validator:a=>k.includes(a)}},setup(a,{slots:t}){const r=b(),l=u(a,r.proxy.$q),s=d(()=>`q-markup-table q-table__container q-table__card q-table--${a.separator}-separator`+(l.value===!0?" q-table--dark q-table__card--dark q-dark":"")+(a.dense===!0?" q-table--dense":"")+(a.flat===!0?" q-table--flat":"")+(a.bordered===!0?" q-table--bordered":"")+(a.square===!0?" q-table--square":"")+(a.wrapCells===!1?" q-table--no-wrap":""));return()=>e("div",{class:s.value},[e("table",{class:"q-table"},c(t.default))])}});function m(){return q(i)}export{f as Q,m as u};
