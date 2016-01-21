/**
 * Created by michael on 21.01.16.
 */
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

exports.getSMTP = function() {

    var mailTransport = nodemailer.createTransport(smtpTransport({
        host: process.env.smtpserver,
        port: 465,
        secure: true,
        auth: {
            user: process.env.email_address,
            pass: process.env.email_password
        },
        maxConnections: 5,
        maxMessages: 10
    }));

    return mailTransport;
}