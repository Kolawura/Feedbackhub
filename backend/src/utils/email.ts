// backend/src/utils/email.ts
import * as postmark from "postmark";

const client = new postmark.ServerClient(process.env.POSTMARK_API_TOKEN!);

const FROM = process.env.EMAIL_FROM || "FeedbackHub <noreply@yourdomain.com>";
const APP_URL = process.env.APP_URL || "http://localhost:5173";

// ─── Send email verification ──────────────────────────────────────────────────
export async function sendVerificationEmail(
  to: string,
  firstName: string,
  token: string,
): Promise<void> {
  const url = `${APP_URL}/verify-email?token=${token}`;

  await client.sendEmail({
    From: FROM,
    To: to,
    Subject: "Verify your FeedbackHub email",
    HtmlBody: `
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
    TextBody: `Hi ${firstName},\n\nVerify your email by visiting:\n${url}\n\nThis link expires in 24 hours.\n\nIf you didn't create a FeedbackHub account, ignore this email.`,
    MessageStream: "outbound",
  });
}

// ─── Send password reset ──────────────────────────────────────────────────────
export async function sendPasswordResetEmail(
  to: string,
  firstName: string,
  token: string,
): Promise<void> {
  const url = `${APP_URL}/reset-password?token=${token}`;

  await client.sendEmail({
    From: FROM,
    To: to,
    Subject: "Reset your FeedbackHub password",
    HtmlBody: `
      <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:32px 24px;background:#fff;">
        <h2 style="font-size:22px;font-weight:700;color:#111827;margin:0 0 8px;">
          Reset your password
        </h2>
        <p style="color:#6b7280;margin:0 0 24px;line-height:1.6;">
          Hi ${firstName}, we received a request to reset your FeedbackHub password.
          This link expires in <strong>1 hour</strong>.
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
    TextBody: `Hi ${firstName},\n\nReset your password by visiting:\n${url}\n\nThis link expires in 1 hour.\n\nIf you didn't request this, ignore this email.`,
    MessageStream: "outbound",
  });
}
