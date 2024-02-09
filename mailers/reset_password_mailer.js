const nodemailer = require('../config/nodemailer');

exports.newResetPassword = async (user)=> {
    try{
        let htmlString = await nodemailer.renderTemplate({user: user}, '/new_reset_password.ejs');

        nodemailer.transporter.sendMail({
            from: process.env.EMAIL_LC,
            to: user.user.email,
            subject: "Loomcart | Reset Password",
            html: htmlString
    
        }, (err, info)=> {
            if (err){
                console.log('error in sending mail', err);
                return;
            }
        });
    } catch(err){
        console.log('error in rendering template', err);
    }
}