//Install express server
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodeMailer = require('nodemailer');

const path = require('path');

const app = express();
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

var smtpTransport = nodeMailer.createTransport({
    host: 'smtp.office365.com',
    secureConnection: false,
    port: '587',
    tls: {
        ciphers: 'SSLv3'
    },
    auth: {
        user: 'drksc@afrizone-intl.com',
        pass: 'Afrizon20$'
    },

});

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/afrizon'));

app.get('/*', function (req, res) {

    res.sendFile(path.join(__dirname + '/dist/afrizon/index.html'));
});


// Allow callers to send an email message
app.post('/send_email', function (req, res) {

    let user = req.body;
    console.log(user.email);

    var mailOptions = {
        to: user.email,
        subject: user.subject,
        text: user.message
    }
    smtpTransport.sendMail(mailOptions, function (error, response) {
        if (error) {
            console.log(error);
            res.end("error");
        }
        else {
            console.log("Message sent: " + response);
            res.end("sent");
        }
    });

});


// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080, () => {
    console.log('server started');
});