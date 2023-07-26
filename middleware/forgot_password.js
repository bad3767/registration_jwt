const nodemailer = require("nodemailer");

exports.send_email = (email, password) => {
    console.log('emailemail',email)
    console.log('passwordpassword',password)
    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure:false,
        auth: {
        user: "surendharcloud168@gmail.com",
        pass: "idtwkafbxxzhhrjc"
        }
        });
        var mailOptions = {
        from: 'surendharcloud168@gmail.com',
        to: email,
        subject: 'Thankyou for contacting!',
        text:  password
        };
        var mailOptionsSender = {
        from: 'surendharcloud168@gmail.com',
        to: email,
        subject: 'Someone Wants to connect With you !',
        text:  password
        };
        transporter.sendMail(mailOptions, function(error, info){
        if (error) {
        console.log(error);
        } else {
        console.log('Email sent: ' + info.response);
        transporter.sendMail(mailOptionsSender, function(error, info){
        if (error) {
        console.log(error);
        } else {
        console.log('Email sent: ' + info.response);
        }
        });
        }
        });
};
