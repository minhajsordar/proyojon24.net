import{s as r,t as c,aF as a,aH as l,aI as u,aK as d}from"./index.75f7e92a.js";import{u as S}from"./serviceProviderStore.032a3619.js";const t=r("browsing-location",{}),_=c("search location store",()=>{const i=S(),n=a(),o=l(),s=u(),e=d();return{updateAllLocation:()=>{n.getAllDistricts(),o.getAllSubDistricts(),s.getAllUnions(),e.getAllPinlocations()},updateDistrict:()=>{n.getAllDistricts(i.serviceProviderLocationR.division._id)},updateSubDistrict:()=>{o.getAllSubDistricts(i.serviceProviderLocationR.district._id)},updateUnion:()=>{s.getAllUnions(i.serviceProviderLocationR.subDistrict._id)},updatePinLocation:()=>{e.getAllPinlocations(i.serviceProviderLocationR.union._id)},updateAllLocationByBrowsingLocation:()=>{t.value.district&&o.getAllSubDistricts(t.value.district._id),t.value.subDistrict&&s.getAllUnions(t.value.subDistrict._id),t.value.union&&e.getAllPinlocations(t.value.union._id)}}});export{_ as u};