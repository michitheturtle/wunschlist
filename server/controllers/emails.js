/**
 * Created by michael on 08.01.16.
 */
//var nodemailer = require('nodemailer');
var smtpTransport = require('../config/smtpTransport');
//var smtpTransport = require('nodemailer-smtp-transport');

exports.sendTestmail = function(req, res) {

    var mailTransport = smtpTransport.getSMTP();

    var userData = req.body;


    var mailHtml = '<b>Hallo ' + userData.name +'</b><br /><br />' +
    'Besten Dank für die Beteiligung an ' + userData.geschenkName + '.<br /><br />' +
        'Der Betrag von ' + userData.betrag + ' CHF ';

    if(userData.uebermittlung === 'umschlag'){
        mailHtml += " kann am Fest übergeben werden.";
    }else{
        mailHtml += " kann auf folgendes Konto überwiesen werden:<br />" +
            "<p>IBAN: CH10 0077 8193 3703 8203 8200 1</p>" +
            "<p>Begünstigter: M. Dick & S. Perriard, Wengistrasse 1, 4600 Olten</p>" +
            "<p>Bank: Luzerner Kantonalbank</p>";
    }
    mailHtml += '<br /><br />' +
        'Liebe Grüsse<br />' +
        'Sabine und Michael';



    var mailOptions = {
        from: 'Info ✔ <'+ process.env.email_address  + '>', // sender address
        to: userData.email, // list of receivers
        bcc: 'gritibaenz@gmail.com',
        subject: 'Danke für die Übermittlung ✔', // Subject line
        text: 'Hallo ' + userData.name, // plaintext body
        html: mailHtml
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


