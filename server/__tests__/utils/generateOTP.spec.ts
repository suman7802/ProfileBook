import bcrypt from 'bcryptjs';
import generateOTP from '../../src/utils/generateOTP';

describe('generateOTP', () => {
  let OTP: string, hashedOTP: string;

  beforeAll(async () => {
    const result = await generateOTP();
    OTP = result.OTP;
    hashedOTP = result.hashedOTP;
  });

  it('should generate a 5-character OTP', () => {
    expect(OTP).toHaveLength(5);
  });

  it('should generate an OTP containing only alphabets', () => {
    expect(OTP).toMatch(/^[A-Za-z]+$/);
  });

  it('should generate a hashed OTP that is not the same as the OTP', () => {
    expect(hashedOTP).not.toBe(OTP);
  });

  it('should generate a hashed OTP that is a valid hash of the OTP', async () => {
    const isMatch = await bcrypt.compare(OTP, hashedOTP);
    expect(isMatch).toBe(true);
  });
});
