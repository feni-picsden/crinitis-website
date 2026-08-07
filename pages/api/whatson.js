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

      const { WEBHOOK_URL, WEBHOOK_TOKEN, WHATSON_FORM_URL } = process.env;

      let apiReq = {
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        contact_no: body.contact_no,
        location: body.location,
        edm: body.edm ? 1 : 0
      };

      const apiRes = await fetch(`${WHATSON_FORM_URL}`, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiReq),
      });

      console.log('api call');
      console.log(apiReq);
      const apiResponse = await apiRes.json();
      console.log(apiResponse);
      let voucher = apiResponse?.data?.code || '';
      if (voucher === '') {
        res.status(200).json({ message: 'Promotion is expired.', success: false, 'status': 500 })
      } else {
        let sporutReq = {
          data: {
            firstName: body.first_name,
            surname: body.last_name,
            email: body.email,
            mobile: body.mobile,
            tags: ["21st Anniversary Page"],
            emailOptOut: false,
            customFields: {
              store: body.location,
              voucherCode: voucher,
              callFrom: "21st ANNIVERSARY"
            }
          }
        };

        console.log("sproute call");
        console.log(sporutReq);
        fetch(`${WEBHOOK_URL}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${WEBHOOK_TOKEN}`
          },
          body: JSON.stringify(sporutReq),
        }).then((response) => {
          console.log("Webhook");
          console.log(response);
          if (response.status != 200) {
            res.status(200).json({ message: 'Something going wrong, please try again.', success: false, 'status': 500 })
          } else {

            let { SENDGRID_API_KEY, MAIL_TO_ADDRESS, MAIL_FROM_ADDRESS, ANNI_MAIL_BCC_ADDRESS } = process.env;
            mail.setApiKey(SENDGRID_API_KEY);
            const message = `
          First name: ${body.first_name}\r\n
          Last name: ${body.last_name}\r\n
          Email address: ${body.email}\r\n
          Voucher: ${voucher}\r\n
          Contact number: ${body.contact_no}\r\n
          Location: ${body.location}\r\n
          EDM: ${body.edm ? 'Yes' : 'No'}\r\n
      `;

            let subject = 'New 21st Anny - Request by ' + body.first_name;
            let htmlBody = {
              "First name": body.first_name,
              "Last name": body.last_name,
              "Email address": body.email,
              "Voucher": voucher,
              "Contact number": body.contact_no,
              "Location": body.location,
              "EDM": body.edm ? 'Yes' : 'No'
            }

            const htmlTemp = formHTML(htmlBody, subject);
            let data = {
              to: MAIL_TO_ADDRESS,
              from: MAIL_FROM_ADDRESS,
              subject: subject,
              text: message,
              html: htmlTemp,
            };

            if (typeof ANNI_MAIL_BCC_ADDRESS !== 'undefined' && ANNI_MAIL_BCC_ADDRESS !== '') {
              data.bcc = ANNI_MAIL_BCC_ADDRESS;
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

            res.status(200).json({ success: true, message: 'Mail sent successfully!', 'status': 200 })
          }
        })
          .catch((err) => {
            console.log(err.message);
            res.status(200).json({ message: 'Something going wrong, please try again.', success: false, 'status': 500 })
          });
      }
    } catch (e) {
      console.log(e);
      res.status(200).json({ message: 'Something going wrong, please try again.', success: false, 'status': 500 })
    }
  } else {
    res.status(405);
    res.end();
  }
}
