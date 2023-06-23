const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'your-email-address@gmail.com',
        pass: 'your-email-password'
    }
});

// setup email data with secure content
let mailOptions = {
    from: 'your-email-address@gmail.com',
    to: 'client-email-address@example.com',
    subject: 'Secure email from your app',
    text: 'This email contains secure content.',
    attachments: [{
        filename: 'secure-data.txt',
        content: 'This is a password-protected file.'
    }],
    // set up password protection for the attached file
    password: 'secure-password'
};

// send mail with secure content
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});
