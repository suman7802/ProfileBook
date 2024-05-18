import bcrypt from 'bcryptjs';
import otpGenerator from 'otp-generator';

export default async function generateOTP() {
  const OTP = otpGenerator.generate(5, {
    digits: false,
    specialChars: false,
    upperCaseAlphabets: true,
    lowerCaseAlphabets: true,
  });

  console.log('otp:', OTP);

  const hashedOTP = await bcrypt.hash(OTP, 10);
  return { OTP, hashedOTP };
}
