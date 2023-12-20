const nodemailer = require("nodemailer");
require("dotenv").config();

async function sendMail(mailOptions) {
    try {
        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "abe1701fb87bbf",
                pass: "54f027573a08e9",
            },
        });
        // define email options
        let details = await transporter.sendMail(mailOptions);
        console.log("Message sent: %s", details.messageId);
    } catch (error) {
        console.log(error);
        return error;
    }
}

let mailOptions = {
    from: "your-email@gmail.com",
    to: "recipient@example.com",
    subject: "Test Email",
    text: "a push has been made to your repo and tests run successfully !",
};

sendMail(mailOptions);
