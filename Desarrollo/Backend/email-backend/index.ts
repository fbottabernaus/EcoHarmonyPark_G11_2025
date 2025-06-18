import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import multer from 'multer';
import * as QRCode from 'qrcode';
import { Participante } from './participante';

const app = express();


app.use(cors());
app.use(express.json());

// Configurar multer para manejar archivos
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

function mostrarParticipante(p: Participante): string {
  let cadena = `
Nombre: ${p.nombre} 
DNI: ${p.dni}
Edad: ${p.edad}`
  if (p.talla){
    cadena += `
Talla: ${p.talla}
    `;
  }
  return cadena
}

app.post('/send-email', upload.none(), async (req, res) => {
  const { nombre, email, inscripcion }: { nombre: string, email: string, inscripcion: string } = req.body;

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'espanonbraian@gmail.com',
      pass: 'qhjvbofdtclkkqsv'
    }
  });

  const qrBuffer = await QRCode.toBuffer(JSON.stringify(inscripcion));

  const inscripcionObj = JSON.parse(inscripcion);

  const participantesList = inscripcionObj.participantes
  .map((p:Participante) => mostrarParticipante(p))
  .join('\n'); // Cada participante estará en una línea nueva

  const mailOptions = {
    from: 'tu_email@gmail.com',
    to: email,
    subject: `Te has inscripto a ${inscripcionObj.actividad.nombre}`,
    text:
`Hola ${nombre}, gracias por tu inscripción a ${inscripcionObj.actividad.nombre} el día ${inscripcionObj.diaElegido.fecha} a las ${inscripcionObj.horarioElegido.horaInicio}.
Los participantes inscriptos son:
-----
${participantesList}
-----
Adjuntamos tu código QR.`,
    attachments: [{
      filename: 'codigo-qr.png',
      content: qrBuffer
    }]
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true });
  } catch (err : any) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(3000, () => console.log('Servidor corriendo en http://localhost:3000'));
