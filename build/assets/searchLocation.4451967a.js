import{G as r,aG as c,P as a,U as l,V as u,X as d}from"./index.ab711dbd.js";import{u as S}from"./serviceProviderStore.5bb1cfc3.js";const t=r("browsing-location",{}),U=c("search location store",()=>{const i=S(),n=a(),o=l(),e=u(),s=d();return{updateAllLocation:()=>{n.getAllDistricts(),o.getAllSubDistricts(),e.getAllUnions(),s.getAllPinlocations()},updateDistrict:()=>{n.getAllDistricts(i.serviceProviderLocationR.division._id)},updateSubDistrict:()=>{o.getAllSubDistricts(i.serviceProviderLocationR.district._id)},updateUnion:()=>{e.getAllUnions(i.serviceProviderLocationR.subDistrict._id)},updatePinLocation:()=>{s.getAllPinlocations(i.serviceProviderLocationR.union._id)},updateAllLocationByBrowsingLocation:()=>{t.value.district&&o.getAllSubDistricts(t.value.district._id),t.value.subDistrict&&e.getAllUnions(t.value.subDistrict._id),t.value.union&&s.getAllPinlocations(t.value.union._id)}}});export{U as u};
