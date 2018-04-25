const router = require('express')();

const nodemailer = require('nodemailer');




router.get('/', (req, res) => {
  res.send('hello');
})

router.post('/sendConformation', (req, res, next) => {
  console.log(req.body);


  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
           user: 'tastybytestest@gmail.com',
           pass: 'RJJJ1234'
       },
    tls: {
      rejectUnauthorized: false
    }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Tasty Bytes" <tastybytestest@gmail.com>', // sender address
        to: req.body.email, // list of receivers
        subject: 'Order Conformation from Tasty Bytes', // Subject line
        text: ' ', // plain text body
        html: '<center><h4>Your Order has been Created. Please wait in your doorway for your sweets!</h4><img src="https://img1.goodfon.com/wallpaper/big/2/97/taynaya-zhizn-domashnih.jpg" /></center>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        res.status(200);
    });
});


module.exports = router;
