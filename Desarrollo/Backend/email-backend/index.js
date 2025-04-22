const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const multer = require('multer');
const app = express();
const QRCode = require('qrcode');


app.use(cors());
app.use(express.json());

// Configurar multer para manejar archivos
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/send-email', upload.none(), async (req, res) => {
  const { nombre, email, inscripcion } = req.body;

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'espanonbraian@gmail.com',
      pass: 'ekmsbwudsjghtkyc'
    }
  });

  console.log(inscripcion)
  const qrBuffer = await QRCode.toBuffer(inscripcion);

  const mailOptions = {
    from: 'tu_email@gmail.com',
    to: email,
    subject: 'Tu inscripción con código QR',
    text: `Hola ${nombre}, gracias por tu inscripción. Adjuntamos tu código QR.`,
    attachments: [{
    filename: 'codigo-qr.png',
    content: qrBuffer
    }]
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(3000, () => console.log('Servidor corriendo en http://localhost:3000'));
