import otpGenerator from 'otp-generator'

import axios from 'axios';

// The OTP_LENGTH is a number, For my app i selected 10.
const OTP_LENGTH = 4
// The OTP_CONFIG is an object that looks like 
const OTP_CONFIG = {
    digits: true,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
}
export const otpExpirationMinutes = 10;
export const generateOTP = () => {
    const OTP = otpGenerator.generate(OTP_LENGTH, OTP_CONFIG);
    return OTP;
};
export const generateOTPPassword = () => {
    const OTP = otpGenerator.generate(8, {
        digits: true,
        lowerCaseAlphabets: true,
        upperCaseAlphabets: false,
        specialChars: true,
    });
    return OTP;
};
export const isPhoneOtpValid = (phoneOtpExpiresAt) => {
    const currentDateTime = new Date();
    const otpExpiresAt = new Date(phoneOtpExpiresAt);
    console.log(otpExpiresAt, ",", currentDateTime);
    return otpExpiresAt > currentDateTime;
}
export const chechResendOtpIfBelow2minutes = (phoneOtpExpiresAt) => {
    const currentDateTime = new Date();
    const otpExpiresAt = new Date(phoneOtpExpiresAt);
    otpExpiresAt.setMinutes(otpExpiresAt.getMinutes() - (otpExpirationMinutes - 2));
    return otpExpiresAt > currentDateTime;
}
export const chechResendOtpIfUp2minutes = (phoneOtpExpiresAt) => {
    const currentDateTime = new Date();
    const otpExpiresAt = new Date(phoneOtpExpiresAt);
    otpExpiresAt.setMinutes(otpExpiresAt.getMinutes() + 2);
    return otpExpiresAt > currentDateTime;
}
export const createOtpExpirationTime = () => {
    const otpExpiresAt = new Date();
    otpExpiresAt.setMinutes(otpExpiresAt.getMinutes() + otpExpirationMinutes);
    return otpExpiresAt
}
export const phoneNumberPrefix = (str) => {
    if (str.startsWith('0')) {
        return '88' + str;
    }
    else if (str.startsWith('880')) {
        return str
    }
    else {
        return '880' + str
    }
}

export const sendOtp = () => {
    const data = {
        api_key: "GMA6nXsLWvC4uXd0UbN0",
        senderid: "8809617611783",
        number: "8801835158205",
        message: "Dear your proyojon24 verification code is - "
    };

    axios.post('http://bulksmsbd.net/api/smsapi', data)
        .then((res) => {
            console.log(`Status: ${res.status}`);
            console.log('Body: ', res.data);
        }).catch((err) => {
            console.error(err);
        });
}
