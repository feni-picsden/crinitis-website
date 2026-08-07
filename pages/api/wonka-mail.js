const mail = require('@sendgrid/mail');
import formHTML from '../../helpers/formHTML';

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const body = req.body;

      const { RECAPTCHA_SECRET_KEY } = process.env

      const response = await fetch(
        `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${body.captcha}`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
          },
          method: "POST",
        }
      );
      const captchaValidation = await response.json();

      if (!captchaValidation.success) {
        res.status(200).json({ success: false, message: "Invalid captcha" })
        return
      }

      let { SENDGRID_API_KEY, MAIL_TO_ADDRESS, MAIL_FROM_ADDRESS, MAIL_BCC_ADDRESS } = process.env;
      mail.setApiKey(SENDGRID_API_KEY);
      const message = `
        First name: ${body.first_name}\r\n
        Last name: ${body.last_name}\r\n
        Email address: ${body.email}\r\n
        Contact number: ${body.contact_no}\r\n
        Location: ${body.location}\r\n
        Description: ${body.description}\r\n
        Terms: ${body.edm ? 'Yes' : 'No'}\r\n
    `;

      let subject = 'Wonka - New application for Scratch-to-Win from ' + body.first_name;
      let htmlBody = {
        "First name": body.first_name,
        "Last name": body.last_name,
        "Email address": body.email,
        "Contact number": body.contact_no,
        "Location": body.location,
        "Description": body.description,
        "Terms": body.edm ? 'Yes' : 'No'
      }

      const htmlTemp = formHTML(htmlBody, subject);
      let data = {
        to: MAIL_TO_ADDRESS,
        from: MAIL_FROM_ADDRESS,
        subject: subject,
        text: message,
        html: htmlTemp,
      };

      if (typeof MAIL_BCC_ADDRESS !== 'undefined' && MAIL_BCC_ADDRESS !== '') {
        data.bcc = MAIL_BCC_ADDRESS;
      }

      mail.send(data)
        .then(() => {
          res.status(200).json({ success: true, message: 'Mail sent successfully!', 'status': 200 })
        })
        .catch((err) => {
          console.log(err);
          if (err.code === 401) {
            res.status(200).json({ message: err.message + 'Something went wrong. Please try again later!', success: false, 'status': 401 })
          } else {
            res.status(200).json({ message: 'Internal server error. Please try again later!', success: false, 'status': 500 })
          }
        })
    } catch (e) {
      console.log(e);
      res.status(200).json({
        status: false,
        message: "Something going wrong, please try again.",
      });
    }
  } else {
    res.status(405);
    res.end();
  }
}
