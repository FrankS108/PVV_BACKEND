import nodemailer from "nodemailer"

export const emailRegister = async(data) => {
    const { email, name, token } = data;

    //TODO: Mover hacia variables de entorno
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
    });

    const info = await transport.sendMail({
        from: '"MyCorp - Administrador de empresas" <cuentas@mycorp.com>',
        to: email,
        subject: "MyCorp - Confirma tu cuenta",
        text: "Confirma tu cuenta en MyCorp",
        html: `<p>Hola: ${name} confirma tu cuenta en MyCorp</p>
        <p>Tu cuenta ya esta casi lista, solo debes confirmarla en el siguiente enlace: </p>
        <a href="${process.env.FRONTEND_URL}/confirm/${token}">Confirmar cuenta</a>
        
        <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje.</p>
        `
    });
}


export const emailForgetPassword = async(data) => {
    const { email, name, token } = data;

    //TODO: Mover hacia variables de entorno
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
    });

    const info = await transport.sendMail({
        from: '"MyCorp - Administrador de empresas" <cuentas@mycorp.com>',
        to: email,
        subject: "MyCorp - Reestablce tu contraseña",
        text: "Reestablece tu contraseña",
        html: `<p>Hola: ${name} has solicitado reestablecer tu contraseña</p>
        <p>Sigue el siguiente enlace para generar un nuevo password: </p>
        <a href="${process.env.FRONTEND_URL}/forget-password/${token}">Confirmar cuenta</a>
        
        <p>Si tu no solicitaste este email, puedes ignorar el mensaje.</p>
        `
    });
}