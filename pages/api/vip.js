export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const body = req.body;

      const { WEBHOOK_URL, WEBHOOK_TOKEN } = process.env

      let sporutReq = {
        data: {
          firstName: body.first_name,
          surname: body.last_name,
          email: body.email,
          mobile: body.mobile,
          dob: body.dobISO,
          gender: body.gender,
          tags: [],
          emailOptOut: false,
          customFields: {
            store: body.location,
            callFrom: "VIP",
            vIPNumber: body.vIPNumber,
            passkitId: body.passkitId,
          }
        }
      };
      fetch(`${WEBHOOK_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${WEBHOOK_TOKEN}`
        },
        body: JSON.stringify(sporutReq),
      }).then((response) => {
        console.log("Webhook");
        if (response.status != 200) {
          res.status(200).json({
            status: false,
            message: "Something going wrong, please try again.",
          });
        } else {
          res.status(200).json({
            status: true,
            message: "Thank you for registering LA FAMIGLIA program.",
          });
        }
      })
        .catch((err) => {
          console.log(err.message);
          res.status(200).json({
            status: false,
            message: "Something going wrong, please try again.",
          });
        });

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
