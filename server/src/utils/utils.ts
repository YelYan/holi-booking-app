import config from "#config/config.js"
import multer from "multer"
import nodemailer from "nodemailer"

export const sendEmail = (options : Record< "subject" | "text" | "to"  , string>) => {

  const port = Number(config.SMTP_PORT);
  const isSecure = port === 465;
  const smtpTransparent = nodemailer.createTransport({
    host: config.SMTP_SERVER,
    port: port,
    secure: isSecure, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_KEY,
    },
  })

  const mailOptions = {
    from: `"Yel Yan Team " <${config.SMTP_USER}>`,
    to: options.to,
    subject: options.subject,
    html: options.text,
  }

  return smtpTransparent.sendMail(mailOptions)
}

export const forgotPasswordMessgae = (resetUrl  :string, user : string) => {
  return `
          <body 
            style="
              color: rgb(68, 68, 68);
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            "
          >
            <h2 class="title" style="text-align: center">Reset Your Password</h2>
            <h4>Hello ${user},</h4>
            <p>
              Tap the link below to reset your account password. If you didn't request a
              new password, you can safely delete this email.
      
              <a
                class="reset-btn"
                style="
                  color: rgb(68, 68, 68);
                  font-weight: 900;
                  text-decoration: none;
                  text-transform: uppercase;
                "
                target="blank"
                href="${resetUrl}"
              >
                Reset Password
              </a>
            </p>
      
            <p>
              If that doesn't work, copy and paste the following link in your browser:
            </p>
            <div class="text-link">
              <a target="blank" href="${resetUrl}"> ${resetUrl} </a>
            </div>
      
            <p class="footer" style="font-size: small; font-style: italic">
              <span>Thank you,</span> <br />
              <span>Yel Yan Team</span>
            </p>
          </body>
      `
}


export function getErrorMessages (error : unknown) :string {
    if(error instanceof Error) {
        return error.message;
    }

    if(error && typeof error === "object" && "message" in error){
        return String(error.message)
    }

    if(typeof error === "string") {
        return error
    }
    return "Unknown error occurred!!!";
}

const storage = multer.memoryStorage();
export const upload = multer({
  storage : storage,
    limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
})

