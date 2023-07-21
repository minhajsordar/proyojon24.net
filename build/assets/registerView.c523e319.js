import{a as N}from"./QSelect.e2b5ba6c.js";import{r as t,o as x,a as $,d as P,e as o,P as q,Y as A,f as a,K as m,aB as K,A as d,z as l,Z as R,D as B,L as D,aA as F,E as T,u as z,U as M,az as j,aF as i,aN as C,dr as L}from"./index.9bf41d52.js";import{u as Y}from"./registerStore.86c9bdc1.js";import"./QChip.f2ee117f.js";import"./QItem.8a821322.js";import"./QItemLabel.355cbd9a.js";import"./position-engine.2d2165cd.js";import"./verifyPhone.01880796.js";const Z=["onKeypress"],G={class:"inner-section"},H={class:"full-width"},J={class:"flex justify-between items-center"},O={class:"fs-24"},W={class:"row q-col-gutter-md"},X={class:"col-sm-6 col-xs-12 col-12"},ee={class:"col-sm-6 col-xs-12 col-12"},le={key:0,class:"col-12"},se={class:"row q-col-gutter-xs"},ne={class:"col-sm-6 col-xs-12 col-12"},oe={class:"col-sm-6 col-xs-12 col-12"},ae={class:"col-sm-6 col-xs-12 col-12"},re={class:"col-sm-6 col-xs-12 col-12"},te={class:"col-sm-6 col-xs-12 col-12"},ue={class:"row q-col-gutter-xs"},de={class:"col-12"},ie={class:"col-12"},me={class:"col-12"},ce={class:"col-12"},fe={class:"col-sm-6 col-xs-12 col-12"},ve={class:"row q-col-gutter-xs"},pe={class:"col-12"},be={class:"col-12"},we={class:"col-12"},Ue={class:"col-12"},Ne={__name:"registerView",setup(_e){const c=t("Free"),f=t(!0),v=t(!0),Q=z(),u=M(),e=Y(),p=t(null),b=t(null),w=t(null),U=t(null),_=t(null),y=t(null),V=t(null),I=t(null),k=t(null),E=t(null),h=t(null),g=()=>{p.value.validate(),b.value.validate(),w.value.validate(),U.value.validate(),_.value.validate(),y.value.validate(),V.value.validate(),!(c.value=="Paid"&&(I.value.validate(),k.value.validate(),E.value.validate(),h.value.validate(),I.value.hasError||k.value.hasError||E.value.hasError||h.value.hasError))&&(p.value.hasError||b.value.hasError||w.value.hasError||U.value.hasError||_.value.hasError||y.value.hasError||V.value.hasError||(Q.push({query:{namebn:e.newUserInfo.name.bn,nameen:e.newUserInfo.name.en,username:e.newUserInfo.username,email:e.newUserInfo.email,phone:e.newUserInfo.phone}}),e.registerNewUser()))};return x(()=>{u.query.namebn&&(e.newUserInfo.name.bn=u.query.namebn),u.query.nameen&&(e.newUserInfo.name.en=u.query.nameen),u.query.email&&(e.newUserInfo.email=u.query.email),u.query.username&&(e.newUserInfo.username=u.query.username),u.query.phone&&(e.newUserInfo.phone=u.query.phone),u.query.nid&&(e.newUserInfo.nid=u.query.nid)}),(r,s)=>{const S=j("router-link");return $(),P("div",{class:"container-section-py-sm",onKeypress:T(g,["enter"])},[o("div",G,[o("div",H,[o("div",J,[o("div",O,q(r.$t("create_new_account")),1),o("div",null,[A(q(r.$t("already_have_account"))+"? ",1),a(S,{to:"/login"},{default:m(()=>[A(q(r.$t("signin")),1)]),_:1})])]),a(F,{class:"q-pa-md q-mt-md"},{default:m(()=>[a(K,null,{default:m(()=>[o("div",W,[o("div",X,[a(N,{label:"Account Type",modelValue:c.value,"onUpdate:modelValue":s[0]||(s[0]=n=>c.value=n),"stack-label":"",outlined:"",dense:"",options:["Free","Paid"]},null,8,["modelValue"])]),o("div",ee,[a(d,{label:"Reference",modelValue:l(e).newUserInfo.reference,"onUpdate:modelValue":s[1]||(s[1]=n=>l(e).newUserInfo.reference=n),"stack-label":"",outlined:"",dense:""},null,8,["modelValue"])]),c.value=="Paid"?($(),P("div",le,[o("div",se,[o("div",ne,[a(N,{label:r.$t("bankAccountName"),ref_key:"bankAccountNameEl",ref:I,modelValue:l(e).newUserInfo.bankAccountName,"onUpdate:modelValue":s[2]||(s[2]=n=>l(e).newUserInfo.bankAccountName=n),outlined:"",options:["bKash","Dutch Bangla","Nagad"],dense:"","stack-label":"",rules:[l(i)]},null,8,["label","modelValue","rules"])]),o("div",oe,[a(d,{label:r.$t("AccoountPhoneNumber"),ref_key:"phoneNumberEl",ref:k,modelValue:l(e).newUserInfo.phoneNumber,"onUpdate:modelValue":s[3]||(s[3]=n=>l(e).newUserInfo.phoneNumber=n),outlined:"",dense:"","stack-label":"",rules:[l(C)]},null,8,["label","modelValue","rules"])]),o("div",ae,[a(d,{label:r.$t("transactionId"),ref_key:"transactionIdEl",ref:E,modelValue:l(e).newUserInfo.transactionId,"onUpdate:modelValue":s[4]||(s[4]=n=>l(e).newUserInfo.transactionId=n),outlined:"",dense:"","stack-label":"",rules:[l(i)]},null,8,["label","modelValue","rules"])]),o("div",re,[a(d,{label:r.$t("amount"),ref_key:"amountEl",ref:h,modelValue:l(e).newUserInfo.amount,"onUpdate:modelValue":s[5]||(s[5]=n=>l(e).newUserInfo.amount=n),outlined:"",dense:"","stack-label":"",type:"number",rules:[l(i)]},null,8,["label","modelValue","rules"])])])])):R("",!0),o("div",te,[o("div",ue,[o("div",de,[a(d,{ref_key:"usernameEl",ref:p,modelValue:l(e).newUserInfo.username,"onUpdate:modelValue":s[6]||(s[6]=n=>l(e).newUserInfo.username=n),label:r.$t("username"),"stack-label":"",outlined:"",dense:"",rules:[l(i)]},null,8,["modelValue","label","rules"])]),o("div",ie,[a(d,{ref_key:"emailEl",ref:b,modelValue:l(e).newUserInfo.email,"onUpdate:modelValue":s[7]||(s[7]=n=>l(e).newUserInfo.email=n),label:r.$t("email"),type:"email","stack-label":"",outlined:"",dense:"",rules:[l(i),l(L)]},null,8,["modelValue","label","rules"])]),o("div",me,[a(d,{ref_key:"passwordEl",ref:w,modelValue:l(e).newUserInfo.password,"onUpdate:modelValue":s[9]||(s[9]=n=>l(e).newUserInfo.password=n),label:r.$t("password"),"stack-label":"",outlined:"",dense:"",type:f.value?"password":"text",rules:[l(i)]},{append:m(()=>[a(B,{name:f.value?"visibility_off":"visibility",class:"cursor-pointer",onClick:s[8]||(s[8]=n=>f.value=!f.value)},null,8,["name"])]),_:1},8,["modelValue","label","type","rules"])]),o("div",ce,[a(d,{ref_key:"confirmPasswordEl",ref:U,modelValue:l(e).newUserInfo.password2,"onUpdate:modelValue":s[11]||(s[11]=n=>l(e).newUserInfo.password2=n),label:r.$t("confirm_password"),"stack-label":"",outlined:"",dense:"",rules:[l(i),l(e).matchPassword],type:v.value?"password":"text"},{append:m(()=>[a(B,{name:v.value?"visibility_off":"visibility",class:"cursor-pointer",onClick:s[10]||(s[10]=n=>v.value=!v.value)},null,8,["name"])]),_:1},8,["modelValue","label","rules","type"])])])]),o("div",fe,[o("div",ve,[o("div",pe,[a(d,{ref_key:"phoneEl",ref:_,modelValue:l(e).newUserInfo.phone,"onUpdate:modelValue":s[12]||(s[12]=n=>l(e).newUserInfo.phone=n),label:r.$t("phone"),"stack-label":"",outlined:"",dense:"",rules:[l(C)]},null,8,["modelValue","label","rules"])]),o("div",be,[a(d,{ref_key:"fullnameBnEl",ref:y,modelValue:l(e).newUserInfo.name.bn,"onUpdate:modelValue":s[13]||(s[13]=n=>l(e).newUserInfo.name.bn=n),label:r.$t("full_name_bangla"),"stack-label":"",outlined:"",dense:"",rules:[l(i)]},null,8,["modelValue","label","rules"])]),o("div",we,[a(d,{ref_key:"fullnameEnEl",ref:V,modelValue:l(e).newUserInfo.name.en,"onUpdate:modelValue":s[14]||(s[14]=n=>l(e).newUserInfo.name.en=n),label:r.$t("full_name_english"),"stack-label":"",outlined:"",dense:"",rules:[l(i)]},null,8,["modelValue","label","rules"])]),o("div",Ue,[a(D,{onClick:g,class:"full-width bg-primary text-white btn-h-39",label:"Sign up","stack-label":"",outlined:"",dense:""})])])])])]),_:1})]),_:1})])])],40,Z)}}};export{Ne as default};
