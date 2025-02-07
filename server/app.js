import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import pkg from 'body-parser';

import {RegisterModel} from './db.js';

import PDFDocument from 'pdfkit';
import { Resend } from "resend";



const { json } = pkg
const app = express()
app.use(json())
app.use(express.urlencoded({extended: true}));
app.use(cors({
  origin: (origin, callback) => {
    const ACCEPTED_ORIGINS = process.env.ACCEPTED_ORIGINS.split(',')

    if (ACCEPTED_ORIGINS.includes(origin)) {
      return callback(null, true)
    }
    if (!origin) {
      return callback(null, true)
    }
    return callback(new Error('Not allowed by CORS'))
  }
}))

const PORT = process.env.PORT || 3010


const resend = new Resend(process.env.RESEND_APIKEY)

app.post('/exhibitor-lead', async (req, res) => {
    const { formData } = req.body
    const { name, email } = formData

    try{
        const response = await RegisterModel.create_suscriber({ name, email })
        res.json(response)
    }
    catch (error) {
        console.log(error)
        res.json({
            status: false,
            message: 'Error al guardar tus datos, por favor intenta de nuevo.',
        })
    }
})

app.use(express.static('public'));

app.get('/generate-pdf', async (req, res) => {
  
  const doc = new PDFDocument();
  // Set the response type to PDF
  res.setHeader('Content-Type', 'application/pdf');

  // Pipe the PDF into the response
  doc.pipe(res);

  // Draw a dashed cross in the middle of the document
  const midX = doc.page.width / 2;
  const midY = doc.page.height / 2;

  doc.save();
  doc.lineWidth(2);
  doc.dash(5, { space: 5 });

  // Vertical dashed line
  doc.moveTo(midX, 0)
     .lineTo(midX, doc.page.height)
     .stroke();
  // Horizontal dashed line
  doc.moveTo(0, midY)
     .lineTo(doc.page.width, midY)
     .stroke();
  doc.restore();


  doc.image('img/header_ITM.png', 0, 0, { width: 305 })
  // aqui iria el QR con info del usuario
  const imageQr = await generateQRDataURL('uuid-1234567890');
  doc.image(imageQr, 90, 120, { width: 120 });
  
  doc
  .font('Helvetica-Bold')
  .fontSize(18)
  .text('Juan', 30, 240)
  .text('Perez')
  .fontSize(12)
  .font('Helvetica')
  .text('CEO/Founder')
  .moveDown(0.5)
  .text('IGECO');

  doc.image('img/footer_FUTURISTIC.jpg', 0, 328, { width: 305 });
  doc
    .font('Helvetica-Bold')
    .fontSize(17)
    .text('INSTRUCCIONES', 310, 10, {
        width: 300,
        align: 'center'
    })
    .text('PARA TU VISITA', 310, 30, {
        width: 300,
        align: 'center'
    })    
    .moveDown(0.2);

    doc.fontSize(14)
        .font('Helvetica')
        .text(' ESTEGAFETE DA ACCESO A:', {
        width: 300,
        align: 'center'
    }).moveDown(1);
    
    doc.font('Helvetica-Bold')
    .fontSize(12)
    .text('Futuristic Minds', 330)
    .fontSize(10)
    .font('Helvetica-BoldOblique')
    .list(['SEDE EXPLORA'])
    .font('Helvetica')
    .fontSize(8)
    .text('Programa educativo (conferencias, talleres y recorridos interactivos) especialmente para jóvenes, realizado en el Centro de Ciencias Explora, ubicado en Blvd. Francisco Villa 202, colonia La Martinica, León, Gto. México.', {
        width: 250,
        align: 'justify'
    })
    .moveDown(0.5);
    
    doc.font('Helvetica-BoldOblique')
    .fontSize(10)    
    .list(['SEDE VELARIA'])
    .font('Helvetica')
    .fontSize(8)
    .text('Área de las competencias de electromovilidad, robótica y habilidades profesionales, que se llevará a cabo en la Velaria de la Feria de León, ubicada en Blvd. Paseo de los Niños 111, Zona Recreativa y Cultural, León, Gto. México.', {
        width: 250,
        align: 'justify'
    })
    .moveDown(0.5);

    doc.font('Helvetica-Bold')
    .fontSize(12)
    .text('Industrial Transformation Mexico.')
    .fontSize(8)
    .font('Helvetica')
    .text('Los estudiantes podrán visitar el piso de exposición el viernes 11 de octubre a partir de las 3:00 p.m en Poliforum León.',  {
        width: 250,
        align: 'justify'
    })
    .moveDown(3);

    doc.lineWidth(1);    
    doc.moveTo(320, 250)
        .lineTo( 600, 250 )
        .stroke();

    doc.fontSize(8)
    .font('Helvetica')
    .text('El gafete es ', {
        width: 250,
        align: 'justify',
        continued: true
    })
    .font('Helvetica-Bold')
    .text('personal e intransferible ', {continued: true})
    .font('Helvetica')
    .text(' y deberás presentarlo de forma impresa o digital para permitir el ingreso.')
    .moveDown(2);

    doc
    .font('Helvetica-Bold')    
    .moveDown(1)
    .text('ITALIAN GERMAN EXHIBITION COMPANY MEXICO', {
        width: 250,    
        align: 'center'
    });

  doc.image('img/footer2_FUTURISTIC.jpg', 307, 328, { width: 306 });
  
  doc.save();
  // Rotate and draw some text
  doc.rotate(180, {origin: [150, 305]})
  .fillColor('#009FE3')  
  .fontSize(20)  
  .text('HORARIOS', 50, -110, {
    width: 200,
    align: 'center'
  
  })
  .moveDown(1)
  .fillColor('black')  
  .fontSize(14)
  .font('Helvetica-BoldOblique')
  .text('SEDE EXPLORA', {
    width: 200,
    align: 'center'  
  })
  .moveDown(1)
  .text('9 OCT ', {continued: true})
  .font('Helvetica')
  .text('10:00 - 17:00 hrs. ')
  .moveDown(1)
  .font('Helvetica-Bold')
  .text('10 OCT ', {continued: true})
  .font('Helvetica')
  .text('10:00 - 17:00 hrs. ')
  .moveDown(1)
  .font('Helvetica-Bold')
  .text('11 OCT ', {continued: true})
  .font('Helvetica')
  .text('10:00 - 15:00 hrs.')
  .fontSize(14)
  .moveDown(1)
  .font('Helvetica-BoldOblique')
  .text('SEDE VELARIA', {
    width: 200,
    align: 'center'  
  })
  .moveDown(1)
  .font('Helvetica-Bold')
  .text('9 y 10 OCT ', {continued: true})
  .font('Helvetica')
  .text('9:00 - 17:00 hrs.')
  .moveDown(1)
  .font('Helvetica-Bold')
  .text('11 OCT ', {continued: true})
  .font('Helvetica')
  .text('9:00 - 16:00 hrs.')

  doc.fontSize(14)
  .font('Helvetica-Bold')
  .text('PLEGADO DE GAFETE', -360, -140, {
    width: 400,
    align: 'center'
  });

  doc.rotate(180, {origin: [-170, 50]})
  .image('img/indicaciones_ITM.jpg', -330, -100, { width: 305 });

  // Restore the previous state to avoid rotating everything else
  doc.restore();
  
  doc.end();
});

app.get('/template-email', async (req, res) => {
    const data = {
        name: 'Juan',
        paternSurname: 'Perez',
        maternSurname: 'Suarez',
        email: 'Pachi.claros@gmaail.com',
        phone: '4775690282',
        hour: '10:00 am',
        items: [
            {name: 'Combo Empresarial', quantity: 2},
            {name: 'item 2', quantity: 2},
        ]
    }
    const emailContent = await email_template({ ...data });
    res.send(emailContent);
});

/* EMAIL RE+ MEXICO */
async function sendEmail(data, pdfAtch = null, paypal_id_transaction = null){    
    try{
       
        
        const emailContent = data.currentLanguage === 'es' ?  await email_template({ ...data }) : await email_template_eng({ ...data });
       
        await resend.emails.send({
            from: 'RE+ MEXICO 2025 <noreply@re-plus-mexico.com.mx>',
            to: data.email,
            subject: 'Confirmación de pre registro RE+ MEXICO 2025',
            html: emailContent,
            attachments: [
                {
                    filename: `${paypal_id_transaction}.pdf`,
                    path: `https://re-plus-mexico.com.mx/invoices/${paypal_id_transaction}.pdf`,
                    content_type: 'application/pdf'
                },
              ],           
        })
        

        return {
            status: true,
            message: 'Gracias por registrarte, te hemos enviado un correo de confirmación a tu bandeja de entrada...'
        };

    } catch (err) {
        console.log(err);
        return {
            status: false,
            message: 'No pudimos enviarte el correo de confirmación de tu registro, por favor descarga tu registro en este pagina y presentalo hasta el dia del evento...'
        };              
    }    
}


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})