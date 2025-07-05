import nodemailer from "nodemailer";

const testAccount = await nodemailer.createTestAccount();

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false,
  auth: {
    user: testAccount.user,
    pass: testAccount.pass,
  },
});

export const sendMail = async ({ to, subject, html }) => {
  try {
    const info = await transporter.sendMail({
      from: testAccount.user,
      to,
      subject,
      html,
    });

    const testEmailUrl = nodemailer.getTestMessageUrl(info);
    console.log("Verify Email at :", testEmailUrl);
  } catch (err) {
    return null;
  }
};
