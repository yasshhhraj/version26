export const registrationOtpTemplate = (params: {
  otp: string;
  expiresInMinutes: number;
}) => {
  const { otp, expiresInMinutes } = params;

  return `
  <div style="
    background-color: #f5f0ff;
    padding: 40px 20px;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    color: #333333;
  ">
    <div style="
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 12px;
      box-shadow: 0 8px 24px rgba(102, 51, 153, 0.08);
      overflow: hidden;
    ">

      <!-- Header -->
      <div style="
        background: linear-gradient(135deg, #6a3cc8 0%, #552aaf 100%);
        padding: 32px 40px;
        text-align: center;
      ">
        <h1 style="
          color: #ffffff;
          font-size: 28px;
          font-weight: 600;
          margin: 0;
          letter-spacing: 1px;
        ">
          VERSION'26
        </h1>
      </div>

      <!-- Body -->
      <div style="padding: 40px; text-align: center;">
        <h2 style="
          margin: 0 0 24px 0;
          color: #552aaf;
          font-size: 24px;
          font-weight: 600;
        ">
          Verify Your Email Address
        </h2>

        <p style="
          font-size: 16px;
          line-height: 1.6;
          margin: 0 0 32px 0;
          color: #555555;
        ">
          Thank you for registering! Please use the one-time verification code below to complete your account setup.
        </p>

        <div style="
          margin: 40px 0;
        ">
          <div style="
            display: inline-block;
            padding: 20px 40px;
            font-size: 32px;
            font-weight: bold;
            letter-spacing: 8px;
            color: #552aaf;
            background-color: #f0e8ff;
            border-radius: 12px;
            border: 1px solid #e0d0ff;
            box-shadow: 0 4px 12px rgba(102, 51, 153, 0.1);
          ">
            ${otp}
          </div>
        </div>

        <p style="
          font-size: 15px;
          line-height: 1.6;
          color: #555555;
          margin: 0 0 16px 0;
        ">
          This code is valid for <strong>${expiresInMinutes} minutes</strong>.
        </p>

        <p style="
          font-size: 15px;
          line-height: 1.6;
          color: #777777;
          margin: 0;
        ">
          If you didn't request this code, please ignore this email.
        </p>
      </div>

      <!-- Footer -->
      <div style="
        background-color: #f8f5ff;
        padding: 24px;
        font-size: 13px;
        color: #888888;
        text-align: center;
        border-top: 1px solid #e8e0ff;
      ">
        <p style="margin: 0;">
          This is an automated message — please do not reply to this email.<br>
          © 2026 Version26. All rights reserved.
        </p>
      </div>

    </div>
  </div>
  `;
};
