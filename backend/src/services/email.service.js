const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT, 10) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendPasswordResetEmail = async (toEmail, name, resetToken) => {
  const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: toEmail,
    subject: 'Geeta Portal — Password Reset Request',
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: auto;">
        <h2>नमस्ते ${name},</h2>
        <p>We received a request to reset your Geeta Portal password.</p>
        <p>Click the button below to reset it. This link is valid for <strong>30 minutes</strong>.</p>
        <a href="${resetUrl}"
           style="display:inline-block;padding:12px 24px;background:#C2440B;color:#fff;
                  border-radius:6px;text-decoration:none;font-weight:bold;">
          Reset Password
        </a>
        <p style="margin-top:24px;color:#888;font-size:13px;">
          If you didn't request this, please ignore this email.
        </p>
      </div>
    `,
  });
};

const sendWelcomeEmail = async (toEmail, name, schoolName) => {
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: toEmail,
    subject: 'Welcome to Geeta Portal!',
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: auto;">
        <h2>नमस्ते ${name}!</h2>
        <p>Welcome to <strong>Geeta Portal</strong>${schoolName ? ` — ${schoolName}` : ''}.</p>
        <p>You can now log in and begin your journey through the Bhagavad Gita teachings.</p>
        <a href="${process.env.CLIENT_URL}/login"
           style="display:inline-block;padding:12px 24px;background:#C2440B;color:#fff;
                  border-radius:6px;text-decoration:none;font-weight:bold;">
          Start Reading
        </a>
      </div>
    `,
  });
};

module.exports = { sendPasswordResetEmail, sendWelcomeEmail };
