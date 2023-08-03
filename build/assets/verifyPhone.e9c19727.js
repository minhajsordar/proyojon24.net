import{G as y,aD as C,bf as D,u as L,F as S,m as V,r as h,as as U,bc as d,be as g,bk as I,Z as c,bl as R,bd as o}from"./index.274b46b9.js";y("proyojonuserkey",{});const _=y("proyojonloginuser",{}),T=y("myrooms",{});d.title="Requesting To Server...";const b=200,q={origin:{y:.7}};function u(r,a){R(Object.assign({},q,a,{particleCount:Math.floor(b*r)}))}const j=C("register store",()=>{M();const{t:r}=D(),a=L(),f=S(),t=V(),p=h(null),e=U({name:{bn:null,en:null},username:null,phone:null,email:null,password:null,password2:null,bankAccountName:"",phoneNumber:"",transactionId:"",amount:0,reference:null,accountType:"personal"});return{newUserInfo:e,matchPassword:()=>e.password==e.password2?!0:"Password Not Matched",nidImage:p,registerNewUser:async()=>{const w={name:e.name,phone:e.phone,username:e.username,email:e.email,password:e.password,reference:e.reference},O={method:"post",url:"api/users/register",headers:{"Content-Type":"application/json"},data:w};d.showLoader();try{const n=await g.request(O);d.hideLoader(),u(.25,{spread:26,startVelocity:55}),u(.2,{spread:60}),u(.35,{spread:100,decay:.91,scalar:.8}),u(.1,{spread:120,startVelocity:25,decay:.92,scalar:1.2}),u(.1,{spread:120,startVelocity:45}),I.create({title:r("register_success"),message:r("create_service_provider"),ok:{push:!0},cancel:{push:!0,color:"negative"},persistent:!0}).onOk(()=>{t.loginUserInfo=n.data,_.value=n.data,_.value=n.data,t.isAuthorized=!0,t.rememberUserData(),f.switchToBn(),T.value=null,a.push("/service_provider_profile")}).onCancel(()=>{a.push("/login")})}catch(n){console.log(n),d.hideLoader(),c.create({position:"center",type:"negative",message:n})}}}});d.title="Requesting To Server...";const M=C("otp verification store",()=>{const r=V(),a=j(),f=L(),t=h(!1),p=h(!1),e=h(""),m=()=>{t.value=!0,e.value=""},v=()=>{p.value=!0,e.value=""};return{getOtpVerificationCode:async s=>{const i={method:"post",url:"api/otp/request_phone_verification_otp",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r.loginUserInfo.token}`},data:{phone:r.loginUserInfo.phone}};o("get-otp-verirication-code").showLoading();try{const l=await g.request(i);o("get-otp-verirication-code").hideLoading(),c.create({position:"center",type:"positive",message:"Otp Sent successfully"}),s()}catch(l){console.log(l),o("get-otp-verirication-code").hideLoading(),c.create({position:"center",type:"negative",message:"Could not send OTP. Server error."})}},verifyOtpCode:async()=>{if(e.value=="")return;const s={method:"post",url:"api/otp/verify_phone",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r.loginUserInfo.token}`},data:{otp:e.value}};o("verify-otp-verirication-code").showLoading();try{const i=await g.request(s);r.loginUserInfo.phoneVerified=!0,t.value=!1,f.push("/service_provider_profile"),o("verify-otp-verirication-code").hideLoading()}catch(i){console.log(i),t.value=!1,o("verify-otp-verirication-code").hideLoading(),c.create({position:"center",type:"negative",message:"Could not verify otp. Try again later."})}},getOtpVerificationCodeWhileRegistration:async()=>{console.log(a.newUserInfo);const s={method:"post",url:"api/otp/request_phone_verification_otp_while_registration",headers:{"Content-Type":"application/json"},data:{phone:a.newUserInfo.phone}};o("get-otp-verirication-code-while-registration").showLoading();try{await g.request(s),v(),o("get-otp-verirication-code-while-registration").hideLoading()}catch(i){console.log(i),o("get-otp-verirication-code-while-registration").hideLoading(),c.create({position:"center",type:"negative",message:"Could not send OTP. Server error."})}},verifyOtpCodeWhileRegistration:async s=>{if(e.value=="")return;const i={method:"post",url:"api/otp/verify_phone_while_registration",headers:{"Content-Type":"application/json"},data:{otp:e.value,phone:a.newUserInfo.phone}};o("verify-otp-verirication-code").showLoading();try{const l=await g.request(i);t.value=!1,f.push("/service_provider_profile"),o("verify-otp-verirication-code").hideLoading(),a.registerNewUser()}catch(l){console.log(l),t.value=!1,o("verify-otp-verirication-code").hideLoading(),c.create({position:"center",type:"negative",message:"Could not verify otp. Try again later."})}},openOtpVerificationDialog:t,otpInput:e,openOtpVerificationDialogManager:m,closeOtpVerificationDialogManager:()=>{t.value=!1},openOtpRegistationVerificationDialogManager:v,openOtpRegistrationVerificationDialog:p,closeOtpRegistationVerificationDialogManager:()=>{p.value=!1}}});export{j as a,M as u};
