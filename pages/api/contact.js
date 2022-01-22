
// const mail = require('@sendgrid/mail');

// mail.setApiKey(process.env.APIKEY);

// export default async (req, res) => {
//   const body = JSON.parse(req.body);

//   const message = `
//     Nombre: ${body.name}\r\n
//     Email: ${body.email}\r\n
//     Mensaje: ${body.message}
//   `;

//   const data = {
//     to: 'pedro.jimenez@iscaconsulting.com',
//     from: 'info@iscaconsulting.com',
//     subject: `Nuevo mensaje del formulario contacto`,
//     text: message,
//     html: message.replace(/\r\n/g, '<br />'),
//   };

//   await mail.send(data);

//   res.status(200).json({ status: 'OK' });
// };

export default async (req, res) => {
    require('dotenv').config()
    let nodemailer = require('nodemailer')
    const transporter = nodemailer.createTransport({
        port: 465,
        host: "smtp.gmail.com",
        auth: {
            user: 'cfticmongo@gmail.com',
            pass: process.env.PASS,
        },
        secure: true,
    })
    const body = JSON.parse(req.body);

    const message = `
    Nombre: ${body.name}\r\n
    Email: ${body.email}\r\n
    Mensaje: ${body.message}
  `;
    let from = `Formulario web de Isca Consulting <info@iscaconsulting.com>`

    const mailData = {
        from: 'info@iscaconsulting.com',
        to: 'pedro.jimenez@iscaconsulting.com',
        subject: `Nuevo mensaje del formulario contacto`,
        text: message,
        html: message.replace(/\r\n/g, '<br />'),
    }
    await new Promise((resolve, reject) => {
        transporter.sendMail(mailData, (err, info) => {
            if (err) {
                console.error(err);
                reject(err);
                res.status(500).json({ status: 'ERROR' });
            } else {
                console.log(info);
                resolve(info);
                res.status(200).json({ status: 'OK' });
            }
        });
    });
}
