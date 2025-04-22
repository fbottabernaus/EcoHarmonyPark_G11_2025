import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { InscripcionDTO } from '../DTOs/inscripcionDTO';
import { HttpClient } from '@angular/common/http';

interface CorreoTemplate{
  nombre:string,
  email:string,
  actividad:string,
  fecha:string,
  horario:string,
  inscripcion:string
}

@Injectable({
  providedIn: 'root'
})

export class CorreoService {

  constructor(private http: HttpClient) { }
  
  public generarCorreo(inscripcion: InscripcionDTO){
    console.log("Generando correo")
    let form:CorreoTemplate = {
      nombre: "Braian desde el front prueba QR",
      email: "braianespanon@gmail.com",
      actividad: inscripcion.actividad.nombre,
      fecha: inscripcion.diaElegido.fecha,
      horario: inscripcion.horarioElegido.horaInicio,
      inscripcion: JSON.stringify(inscripcion)
    };
    console.log("Correo generado")
    this.enviarCorreo(form)
  }

  private mandarCorreo(form: any) {
    console.log("Enviando correo")
    emailjs.send('service_ft2t10w', 'template_k7iu6mq', form, 'a8mVOawSQcFYnQ1wA')
      .then((response: EmailJSResponseStatus) => {
        console.log("Correo enviado")
        alert('✅ Inscripción enviada correctamente');
      }, (error) => {
        console.log("Error al enviar")
        console.error('❌ Error al enviar', error);
        alert('Hubo un error al enviar el formulario.');
      });
    console.log("Fin de correo")
  }
  
  enviarCorreo(form: any) {
    const formData = new FormData();
    formData.append('nombre', form.nombre);
    formData.append('email', form.email);
    if (form.archivo) {
      formData.append('archivo', form.archivo);
    }

    this.http.post('http://localhost:3000/send-email', form).subscribe({
      next: () => alert('Correo enviado con éxito'),
      error: err => alert('Error al enviar: ' + err.message)
    });
  }
}
