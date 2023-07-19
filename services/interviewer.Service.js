const Interviewer = require('../models/Interviewer')
const nodemailer = require('nodemailer');
const OTP = require('../models/OTP')
let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'code.rakeshkrishnan@gmail.com',
        pass: 'vuhfvtdnqqvxozau'
    }
});
const bcrypt = require("bcrypt")
const signUpService = async (body) => {
    const { fullname, companyname, workmail } = body;
    const Post = await Interviewer.create( { full_name:fullname, company_name:companyname, work_email:workmail })
    return Post
}

function generateOTP() {
    var digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let OTP = '';
    for (let i = 0; i < 8; i++ ) {
        OTP += digits[Math.floor(Math.random() * 35)];
    }
    return OTP;
}

const signUpOtpService = async (body,response) => {
    const { fullname, companyname, workmail } = body;
    const verificationCode = generateOTP()
    const mailDetails = {
        from: 'mailrkponline@gmail.com',
        to: workmail,
        subject: 'Test mail',
        text: 'Hello fullname from companyname OTP is the one time verification code for confirming your registration'.replace('fullname',fullname)
        .replace('companyname', companyname).replace('OTP',verificationCode)
    };
    await mailTransporter.sendMail(mailDetails)
    console.log((new Date().getTime() + ( 1000 * 60 * 30)))
    await OTP.create({code:verificationCode, expiry: (new Date().getTime() + ( 1000 * 60 * 30)), registerid:response.id})
}
const signUpConfirmService = async (body) => {
    const { id, code, password } = body;
    const OTPInfo = await OTP.findAll({where:{ registerid:id, code:code}})
    if ( (OTPInfo.length > 0 ) && (OTPInfo[0].expiry > new Date().getTime())) {
        const passwordhash = await bcrypt.hash(password, 10)
        const Object = await Interviewer.findByPk(id)
        Object.password_hash = passwordhash
        await Object.save()
        return true
    } else {
        return {msg:"either otp is wrong or expired", OTPInfo,time:(new Date().getTime())}
    }
}
module.exports = {
    signUpService,signUpOtpService,signUpConfirmService
}