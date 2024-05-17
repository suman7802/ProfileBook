import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import nodemailer, { Transporter, SentMessageInfo } from 'nodemailer';

import {
  USER_EMAIL,
  NODEMAILER_CLIENT_ID,
  NODEMAILER_REFRESH_TOKEN,
  NODEMAILER_CLIENT_SECRET,
} from '../config/keys';

const { OAuth2 } = google.auth;

const createTransporter = async (): Promise<Transporter> => {
  const oauth2Client: OAuth2Client = new OAuth2(
    NODEMAILER_CLIENT_ID!,
    NODEMAILER_CLIENT_SECRET!,
    'https://developers.google.com/oauthplayground'
  );

  oauth2Client.setCredentials({
    refresh_token: NODEMAILER_REFRESH_TOKEN,
  });

  const { token, res } = await oauth2Client.getAccessToken();

  return nodemailer.createTransport({
    // @ts-ignore
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: USER_EMAIL,
      clientId: NODEMAILER_CLIENT_ID,
      clientSecret: NODEMAILER_CLIENT_SECRET,
      refreshToken: NODEMAILER_REFRESH_TOKEN,
      accessToken: token,
      expires: res ? res.data.expires_in : undefined,
    },
  });
};

const SendOTP = (otp: string, email: string): Promise<SentMessageInfo> => {
  const emailConfig = {
    from: USER_EMAIL,
    subject: 'OTP Verification',
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h2 style="color: #f60;">OTP Verification</h2>
        <p>Thank Your for Registering on <span style="color: #f60;">Profile Book</span></p>
        <p>Your OTP is:</p>
        <p style="font-weight: bold;">${otp}</p>
        <p>Expiring in 1 Hour...</p>
      </div>
    `,
    to: email,
  };

  return new Promise<SentMessageInfo>(async (resolve, reject) => {
    return await createTransporter().then((transporter) => {
      transporter.sendMail(emailConfig, (err, info) => {
        if (err) return reject(err);
        return resolve(info);
      });
    });
  });
};

export default SendOTP;
