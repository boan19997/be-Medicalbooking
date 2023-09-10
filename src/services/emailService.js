require('dotenv').config()
import nodemailer from 'nodemailer'

let sendSimpleEmail = async (dataSend) => {

    //set mail người gửi 
    let transporter = nodemailer.createTransport({
        service: "Gmail",
        host: "stmp.email.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD,
        }
    })

    //code format thông tin trong mail
    let info = await transporter.sendMail({
        from: '"Nguyễn Đạt 👻" <boan19997@gmail.com>',
        to: dataSend.reciverEmail,
        subject: "Thông tin đặt lịch khám bệnh", // Subject line
        html: getBodyHTMLEmail(dataSend),
    })

}

let getBodyHTMLEmail = (dataSend) => {
    let result = ''
    if (dataSend.language === 'vi') {
        result = `
        <h3>Xin chào ${dataSend.patientName}!</h3>
        <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên ...</p>
        <p>Thông tin đặt lịch khám bệnh:</p>
        <div><b>Thời gian: ${dataSend.time}</b></div>
        <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>

        <p>Nếu các thông tin trên đúng, vui lòng click vào đường link để xác nhận
            và hoàn tất thủ tục đặt lịch khám bệnh
        </p>
        <div>
        <a href=${dataSend.redirectLink} target="_blank">Click here</a>
        </div>

        <div>Xin chân thành cám ơn!</div>
        `
    }
    if (dataSend.language === 'en') {
        result =
            `
        <h3>Dear ${dataSend.patientName}!</h3>
        <p>You received this email because you booked an online medical appointment on...</p>
        <p>Information to schedule an appointment:</p>
        <div><b>Time: ${dataSend.time}</b></div>
        <div><b>Doctor: ${dataSend.doctorName}</b></div>

        <p>If the above information is correct, please click on the link to confirm and complete the medical appointment booking procedure
        </p>
        <div>
        <a href=${dataSend.redirectLink} target="_blank">Click here</a>
        </div>

        <div>Thank you very much!</div>
        `
    }
    return result
}

let getBodyHTMLEmailRemedy = (dataSend) => {
    let result = ''
    if (dataSend.language === 'vi') {
        result = `
        <h3>Xin chào ${dataSend.patientName} !</h3>
        <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên thành công</p>
        <p>Thông tin đơn thuốc/ hoá đơn được gửi trong file đính kèm.</p>

        <div>Xin chân thành cám ơn!</div>
        `
    }
    if (dataSend.language === 'en') {
        result =
            `
        <h3>Dear ${dataSend.patientName} !</h3>
        <p>You received this email because you booked an online medical appointment on...</p>
        <p>bla bla</p>

        <div>Thank you very much!</div>
        `
    }
    return result
}

let sendAttachment = async (dataSend) => {
    //set mail người gửi 
    let transporter = nodemailer.createTransport({
        service: "Gmail",
        host: "stmp.email.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD,
        }
    })

    //code format thông tin trong mail
    let info = await transporter.sendMail({
        from: '"Nguyễn Đạt 👻" <boan19997@gmail.com>',
        to: dataSend.email,
        subject: "Kết quả đặt lịch khám bệnh", // Subject line
        html: getBodyHTMLEmailRemedy(dataSend),
        attachments: [
            {
                filename: `remedy-${dataSend.patientId}-${new Date().getTime()}.png`,
                content: dataSend.imgBase64.split("base64,")[1],
                encoding: 'base64'
            }
        ]
    })
}

module.exports = {
    sendSimpleEmail, getBodyHTMLEmail, sendAttachment
}