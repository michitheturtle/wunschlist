/**
 * Created by michael on 08.01.16.
 */
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

exports.sendTestmail = function(req, res) {

    var mailTransport = nodemailer.createTransport(smtpTransport({
        host: process.env.smtpserver,
        port: 465,
        secure: true,
        auth: {
            user: process.env.email_address ,
            pass: process.env.email_password
        },
        maxConnections: 5,
        maxMessages: 10
    }));

    var mailOptions = {
        from: 'Info ✔ <'+ process.env.email_address  + '>', // sender address
        to: 'michael.dick@bluewin.ch', // list of receivers
        subject: 'Danke für die Übermittlung ✔', // Subject line
        text: 'Hello world ✔', // plaintext body
        html: '<b>Hello world ✔</b>' // html body
    };

    mailTransport.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ a: 1 }));
    });

};


