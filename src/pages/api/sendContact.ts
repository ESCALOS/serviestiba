export const prerender = false;
import type { APIRoute } from "astro";
import { Resend } from "resend";

const resend = new Resend(import.meta.env.SECRET_RESEND);

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();
  const { name, email, phone, province, city, message }: {name:string; email: string;phone:string; province: string; city:string; message:string;} = body;

  if (!name || !email || !phone || !province || !city || !message) {
    return new Response(
      JSON.stringify({
        message: "Faltan campos.",
      }),
      {
        status: 400,
        statusText: "Bad Request",
      }
    );
  }

  const send = await resend.emails.send({
    from: `Serviestiba <serviestiba@resend.dev>`,
    to: import.meta.env.PUBLIC_CONTACT_EMAIL,
    subject: "Nuevo contacto",
    html: `
          <h1>Nuevo contacto</h1>
          <h3>Nombres: ${name}</h3> 
          <h3>Correo Electrónico: ${email}</h3>
          <h3>Celular: ${phone}</h3>
          <h3>Provincia: ${province}</h3>
          <h3>Ciudad: ${city}</h3>
          <h3>Mensaje:</h3>
          <p>${message}</p>
        `,
  });

  if (send.error) {
    return new Response(
      JSON.stringify({
        message: send.error,
      }),
      {
        status: 500,
        statusText: "Internal Server Error",
      }
    );
  }

  return new Response(
    JSON.stringify({
      message: "Mensaje enviado",
    }),
    {
      status: 200,
      statusText: "OK",
    }
  );
};
