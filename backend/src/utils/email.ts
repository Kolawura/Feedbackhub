import nodemailer from "nodemailer";
import { isProduction } from "./utils.js";

const transporter = nodemailer.createTransport(
  isProduction
    ? {
        host: process.env.SMTP_HOST!,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: Number(process.env.SMTP_PORT) === 465,
        auth: {
          user: process.env.SMTP_USER!,
          pass: process.env.SMTP_PASS!,
        },
      }
    : {
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
          user: process.env.ETHEREAL_USER || "ethereal_user",
          pass: process.env.ETHEREAL_PASS || "ethereal_pass",
        },
      },
);

const FROM = process.env.EMAIL_FROM || "FeedbackHub <noreply@feedbackhub.app>";
const APP_URL = process.env.APP_URL || "http://localhost:5173";

// ─── Send email verification ──────────────────────────────────────────────────
export async function sendVerificationEmail(
  to: string,
  firstName: string,
  token: string,
): Promise<void> {
  const url = `${APP_URL}/verify-email?token=${token}`;

  await transporter.sendMail({
    from: FROM,
    to,
    subject: "Verify your FeedbackHub email",
    html: `
      <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:32px 24px;background:#fff;">
        <h2 style="font-size:22px;font-weight:700;color:#111827;margin:0 0 8px;">
          Hi ${firstName}, verify your email
        </h2>
        <p style="color:#6b7280;margin:0 0 24px;line-height:1.6;">
          Click the button below to verify your email address.
          This link expires in <strong>24 hours</strong>.
        </p>
        <a href="${url}"
          style="display:inline-block;background:#f5a623;color:#0e0e0f;font-weight:600;
                 padding:12px 24px;text-decoration:none;font-size:14px;">
          Verify email →
        </a>
        <p style="color:#9ca3af;font-size:12px;margin:24px 0 0;">
          If you didn't create a FeedbackHub account, ignore this email.
        </p>
      </div>
    `,
  });
}

// ─── Send password reset ──────────────────────────────────────────────────────
export async function sendPasswordResetEmail(
  to: string,
  firstName: string,
  token: string,
): Promise<void> {
  const url = `${APP_URL}/reset-password?token=${token}`;

  await transporter.sendMail({
    from: FROM,
    to,
    subject: "Reset your FeedbackHub password",
    html: `
      <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:32px 24px;background:#fff;">
        <h2 style="font-size:22px;font-weight:700;color:#111827;margin:0 0 8px;">
          Reset your password
        </h2>
        <p style="color:#6b7280;margin:0 0 24px;line-height:1.6;">
          Hi ${firstName}, we received a request to reset your FeedbackHub password.
          This link expires in <strong>10 minutes</strong>.
        </p>
        <a href="${url}"
          style="display:inline-block;background:#f5a623;color:#0e0e0f;font-weight:600;
                 padding:12px 24px;text-decoration:none;font-size:14px;">
          Reset password →
        </a>
        <p style="color:#9ca3af;font-size:12px;margin:24px 0 0;">
          If you didn't request this, you can safely ignore this email.
          Your password won't change.
        </p>
      </div>
    `,
  });
}
