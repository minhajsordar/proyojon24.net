import{G as r,K as c,W as a,Y as l,Z as u,$ as d}from"./index.2501de3d.js";import{u as S}from"./serviceProviderStore.a96ced21.js";const t=r("browsing-location",{}),_=c("search location store",()=>{const i=S(),n=a(),o=l(),e=u(),s=d();return{updateAllLocation:()=>{n.getAllDistricts(),o.getAllSubDistricts(),e.getAllUnions(),s.getAllPinlocations()},updateDistrict:()=>{n.getAllDistricts(i.serviceProviderLocationR.division._id)},updateSubDistrict:()=>{o.getAllSubDistricts(i.serviceProviderLocationR.district._id)},updateUnion:()=>{e.getAllUnions(i.serviceProviderLocationR.subDistrict._id)},updatePinLocation:()=>{s.getAllPinlocations(i.serviceProviderLocationR.union._id)},updateAllLocationByBrowsingLocation:()=>{t.value.district&&o.getAllSubDistricts(t.value.district._id),t.value.subDistrict&&e.getAllUnions(t.value.subDistrict._id),t.value.union&&s.getAllPinlocations(t.value.union._id)}}});export{_ as u};
