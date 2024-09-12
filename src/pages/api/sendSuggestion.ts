export const prerender = false;
import type { APIRoute } from "astro";
import { Resend } from "resend";

const resend = new Resend(import.meta.env.SECRET_RESEND);

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();
  const { firstName, lastName, jobArea, suggestion } = body;

  if (!firstName || !lastName || !jobArea || !suggestion) {
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
    to: import.meta.env.PUBLIC_SUGGESTION_EMAIL,
    subject: "Nueva sugerencia",
    html: `
          <h1>Nueva sugerencia</h1>
          <h3>Nombres: ${firstName}</h3> 
          <h3>Apellidos: ${lastName}</h3>
          <h3>Área de trabajo: ${jobArea}</h3>
          <h3>Sugerencia:</h3>
          <p>${suggestion}</p>
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
