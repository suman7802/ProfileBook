import sendOTP from './sendOTP';

const OTP = process.argv[2];
const email = process.argv[3];

sendOTP(OTP, email)
  .then(() => {
    if (process.send) {
      process.send('OTP sent successfully');
      process.exit(0);
    }
  })
  .catch((error) => {
    if (process.send) {
      process.send(`Error sending OTP: ${error.message}`);
      process.exit(1);
    }
  });
