import{g as s,w as o,dh as e,b1 as u,b0 as l,at as v,di as c}from"./index.15bbd68c.js";function f(a){{const t={active:!0};if(typeof a=="function"){const n=s(a);t.val=n.value,o(n,i=>{t.val=i,t.active===!0&&e()})}else t.val=a;c.push(t),e(),u(()=>{t.active=!0,e()}),l(()=>{t.active=!1,e()}),v(()=>{c.splice(c.indexOf(t),1),e()})}}export{f as u};