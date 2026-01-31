import { json } from "@sveltejs/kit";
import { b as private_env } from "../../../../chunks/shared-server.js";
const POST = async ({ request }) => {
  try {
    const { message, metadata } = await request.json();
    if (!message) {
      return json({ error: "Message is required" }, { status: 400 });
    }
    const htmlBody = `
      <div style="font-family: sans-serif; line-height: 1.5;">
        <h2>SECURE UPLINK :: NEW INTEL</h2>
        <p style="white-space: pre-wrap;">${message}</p>
        <hr style="border: none; border-top: 1px solid #ccc; margin: 20px 0;" />
        <div style="font-size: 12px; color: #666;">
          <p><strong>METADATA INJECTION:</strong></p>
          <ul>
            <li><strong>App Version:</strong> ${metadata.appVersion || "Unknown"}</li>
            <li><strong>Platform:</strong> ${metadata.platform || "Unknown"}</li>
            <li><strong>Device Model:</strong> ${metadata.deviceModel || "Unknown"}</li>
            <li><strong>Body Count:</strong> ${metadata.bodyCount || "0"}</li>
            <li><strong>Timestamp:</strong> ${(/* @__PURE__ */ new Date()).toISOString()}</li>
          </ul>
        </div>
      </div>
    `;
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${private_env.RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: "Kill List Uplink <killist@feedback.nivel.africa>",
        to: [private_env.UPLINK_RECIPIENT_EMAIL],
        subject: "SECURE UPLINK :: NEW INTEL",
        html: htmlBody
      })
    });
    const data = await response.json();
    if (!response.ok) {
      console.error("Resend API error:", data);
      return json({ error: data.message || "Failed to send uplink" }, { status: response.status });
    }
    return json({ success: true, id: data.id });
  } catch (err) {
    console.error("Uplink error:", err);
    return json({ error: "Internal server error" }, { status: 500 });
  }
};
export {
  POST
};
