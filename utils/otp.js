export function generateOtp(length = 6) {
  let otp = "";
  for (let i = 0; i < length; i++) {
    otp += Math.floor(Math.random() * 10);
  }
  return otp;
}

export function otpExpiry(minutes = 5) {
  return new Date(Date.now() + minutes * 60 * 1000);
}

export function isValidOtpFormat(otp, length = 6) {
  return new RegExp(`^\\d{${length}}$`).test(otp);
}
