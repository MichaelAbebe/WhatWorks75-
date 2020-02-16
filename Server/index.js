const express = require("express");
const cors = require("cors");
const sgMail = require("@sendgrid/mail");

const app = express();
sgMail.setApiKey(
  "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"
);
app.use(cors());
// Welcome Page
app.get("/", (req, res) => {
  res.send("Welocme to ure server");
});
// Email Page
app.get("/send-email", (req, res) => {
  const { recipient, sender, subject, text } = req.query;

  const msg = {
    to: recipient,
    from: sender,
    subject: subject,
    text: text
  };

  sgMail.send(msg).then(msg => console.log(text));
});

app.listen(4000, () => console.log("running on port 4000"));
