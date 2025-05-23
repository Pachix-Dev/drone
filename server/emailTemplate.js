
const email_template = async ({ formData }) => {

    return (
        `<h1>¡Hola Tienes un nuevo contacto de expositor para DRONE 2025!</h1>
        <p>${formData.name} te ha enviado un mensaje: <br />"${formData.message}" <br /><br />su correo es: ${formData.email} y su teléfono es ${formData.phone}</p>
        <p>Por favor, ponte en contacto con él lo antes posible.</p>
        <p>Este es un mensaje automatizado no es necesario responder este correo.</p>
        
        <p><strong>ITALIAN GERMAN EXHIBITION COMPANY</strong></p>
    `
    )
}

export { email_template }
