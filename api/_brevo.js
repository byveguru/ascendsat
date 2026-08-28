// Shared Brevo transactional-email sender for the engagement notification
// endpoints (api/notify.js, api/cron-daily.js) and the referral-progress
// hook inside api/referral.js. Leading underscore keeps Vercel from treating
// this as its own route (same convention as api/_gamification.js).
//
// Brevo free tier: https://api.brevo.com/v3/smtp/email — requires
// BREVO_API_KEY, and a verified sender (BREVO_SENDER_EMAIL) configured in
// the Brevo dashboard. Both are set as Vercel env vars, not handled here.

async function sendBrevoEmail({ to, toName, subject, htmlContent }) {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.error("BREVO_API_KEY not configured — skipping email send");
    return null;
  }
  if (!to || !subject || !htmlContent) return null;

  const senderEmail = process.env.BREVO_SENDER_EMAIL || "hello@ascendsat.com";
  const senderName = process.env.BREVO_SENDER_NAME || "AscendSAT";

  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: { "Content-Type": "application/json", "api-key": apiKey },
    body: JSON.stringify({
      sender: { email: senderEmail, name: senderName },
      to: [{ email: to, ...(toName ? { name: toName } : {}) }],
      subject,
      htmlContent,
    }),
  });

  if (!res.ok) {
    const detail = await res.text();
    console.error(`Brevo send failed: ${res.status} ${detail}`);
    return null;
  }
  return res.json();
}

// Minimal, reused email shell — a single accent-colored heading + body
// paragraph + optional CTA link. Keeps every notification type visually
// consistent without a templating dependency.
function emailShell({ heading, bodyHtml, ctaLabel, ctaUrl }) {
  return `
    <div style="font-family:-apple-system,Helvetica,Arial,sans-serif;max-width:480px;margin:0 auto;padding:24px 20px;color:#1f2430">
      <p style="font-size:13px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:#c2410c;margin:0 0 12px">AscendSAT</p>
      <h1 style="font-size:20px;margin:0 0 12px;line-height:1.3">${heading}</h1>
      <div style="font-size:15px;line-height:1.6;color:#3d4354">${bodyHtml}</div>
      ${ctaUrl ? `<a href="${ctaUrl}" style="display:inline-block;margin-top:20px;padding:10px 18px;background:#f5c518;color:#0b1020;font-weight:700;text-decoration:none;border-radius:8px;font-size:14px">${ctaLabel || "Open AscendSAT"}</a>` : ""}
    </div>
  `;
}

module.exports = { sendBrevoEmail, emailShell };
