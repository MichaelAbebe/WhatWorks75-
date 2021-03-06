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
  const { recipient,sender,subject,text } = req.query;

  const msg = {
    to: recipient,
    from: sender,
    subject: subject,
    text: text
  };

  sgMail.send(msg).then(msg => console.log(text));
});

app.listen(4000, () => console.log("running on port 4000"));
