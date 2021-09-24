
const mail = require('@sendgrid/mail');

mail.setApiKey('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');

export default async (req, res) => {
  const body = JSON.parse(req.body);

  const message = `
    Nombre: ${body.name}\r\n
    Email: ${body.email}\r\n
    Mensaje: ${body.message}
  `;

  const data = {
    to: 'info@sapienslearning.com',
    from: 'pedro.jimenez@iscaconsulting.com',
    subject: `Nuevo mensaje del formulario contacto`,
    text: message,
    html: message.replace(/\r\n/g, '<br />'),
  };

  await mail.send(data);

  res.status(200).json({ status: 'OK' });
};
