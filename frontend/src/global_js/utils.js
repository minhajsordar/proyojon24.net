import { Notify, Loading, QSpinnerGears } from "quasar";

export const convertNumberIntoDecimal = function (num) {
  // Nine Zeroes for Billions
  return Math.abs(Number(num)) >= 1.0e9
    ? Number((Math.abs(Number(num)) / 1.0e9).toFixed(2)) + "B"
    : // Six Zeroes for Millions
    Math.abs(Number(num)) >= 1.0e6
      ? Number((Math.abs(Number(num)) / 1.0e6).toFixed(2)) + "M"
      : // Three Zeroes for Thousands
      Math.abs(Number(num)) >= 1.0e3
        ? Number((Math.abs(Number(num)) / 1.0e3).toFixed(2)) + "K"
        : Math.abs(Number(num));
};

export const usernameRequired = (val) => {
  return (val && val.length > 0) ? true : "Required Feild";
};
export const passwordRequired = (val) => {
  return (val && val.length > 0) ? true : "Password Required";
};
export const required = (val) => {
  return (val && val.length > 0) ? true : "Required Feild";
};
export const requiredSelector = (val) => {
  return val ? true : "Required Feild";
};
export const zeroValue = (val) => {
  return val > 0 ? true : "This feild should be greater than zero";
};
export const fileValidate = (val) => {
  return val instanceof File ? true : "Please Attach File";
};
export const mobileNoBd = (val) => {
  if((val && val.length == 11)){
    return true
  }else if((val && val.length > 11)){
    return "Too Long. Accepting 11 charecter."
  }else{
    return "Too Short. Accepting 11 charecter."
  }
};
export const short = (val) => {
  return (val && val.length > 5) ? true : "Too Short";
};
export const strength = (val) => {
  const strength = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  return strength.test(val) ? true : "Use Strong Password"
};

export const speachialUername = (val) => {
  const strength = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  return strength.test(val) ? "Remove Speacial Charecter" : true
};
export const isEmail = (val) => {
  const emailPattern =
    /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
  return emailPattern.test(val) ? true : "Seems like not email address";
};
export const isObjEmpty=(obj)=> {
  return Object.keys(obj).length === 0;
}
export const addSessionEndTimeInMinutes = (d, minutes) => {
  const date = new Date(d)
  date.setMinutes(date.getMinutes() + minutes);
  return date;
}
export const capitalizeText = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};


export const quasarNotify = (notifData) => {
  return Notify.create(notifData);
};

export const quasarBackDropShow = (message, gearSpinner, bg) => {
  return Loading.show({
    spinnerSize: 140,
    spinnerColor: "white",
    ...(gearSpinner && { spinner: QSpinnerGears }),
    backgroundColor: bg || "primary",
    messageColor: "white",
    message: message,
  });
};

export const quasarBackDropHide = () => {
  return Loading.hide();
};

const toEn = n => n.replace(/[০-৯]/g, d => "০১২৩৪৫৬৭৮৯".indexOf(d));
const toBn = n => n.replace(/\d/g, d => "০১২৩৪৫৬৭৮৯"[d])
export const enToBnToEn = (n,l)=>{
if(l=='en'){
  return toEn(n)
}
if(l=='bn'){
  return toBn(n)
}
}
var keyStr = "ABCDEFGHIJKLMNOP" +
  "QRSTUVWXYZabcdef" +
  "ghijklmnopqrstuv" +
  "wxyz0123456789+/" +
  "=";
export const encode64 = (input) => {
  input = encodeURI(input);
  var output = "";
  var chr1, chr2, chr3 = "";
  var enc1, enc2, enc3, enc4 = "";
  var i = 0;

  do {
    chr1 = input.charCodeAt(i++);
    chr2 = input.charCodeAt(i++);
    chr3 = input.charCodeAt(i++);

    enc1 = chr1 >> 2;
    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
    enc4 = chr3 & 63;

    if (isNaN(chr2)) {
      enc3 = enc4 = 64;
    } else if (isNaN(chr3)) {
      enc4 = 64;
    }

    output = output +
      keyStr.charAt(enc1) +
      keyStr.charAt(enc2) +
      keyStr.charAt(enc3) +
      keyStr.charAt(enc4);
    chr1 = chr2 = chr3 = "";
    enc1 = enc2 = enc3 = enc4 = "";
  } while (i < input.length);

  return output;
}
export const decode64 = (input) => {
  var output = "";
  var chr1, chr2, chr3 = "";
  var enc1, enc2, enc3, enc4 = "";
  var i = 0;

  // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
  var base64test = /[^A-Za-z0-9\+\/\=]/g;
  if (base64test.exec(input)) {
    alert("There were invalid base64 characters in the input text.\n" +
      "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
      "Expect errors in decoding.");
  }
  input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

  do {
    enc1 = keyStr.indexOf(input.charAt(i++));
    enc2 = keyStr.indexOf(input.charAt(i++));
    enc3 = keyStr.indexOf(input.charAt(i++));
    enc4 = keyStr.indexOf(input.charAt(i++));

    chr1 = (enc1 << 2) | (enc2 >> 4);
    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
    chr3 = ((enc3 & 3) << 6) | enc4;

    output = output + String.fromCharCode(chr1);

    if (enc3 != 64) {
      output = output + String.fromCharCode(chr2);
    }
    if (enc4 != 64) {
      output = output + String.fromCharCode(chr3);
    }

    chr1 = chr2 = chr3 = "";
    enc1 = enc2 = enc3 = enc4 = "";

  } while (i < input.length);

  return decodeURI(output);
}
