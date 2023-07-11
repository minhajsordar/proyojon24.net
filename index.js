import otpGenerator from 'otp-generator'

const OTP_LENGTH = 6
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
console.log(generateOTP())