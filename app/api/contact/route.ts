import { NextResponse } from "next/server";

import { buildLeadEmailHtml, buildLeadEmailText, type ContactLead } from "./email-template";

export const runtime = "nodejs";

type ContactApiPayload = Partial<ContactLead>;

type ResendSendEmailResponse = {
  id?: string;
  message?: string;
  name?: string;
};

const RESEND_API_URL = "https://api.resend.com/emails";
const DEFAULT_FROM = "Sistema IJA <onboarding@resend.dev>";
const DEFAULT_SITE_ORIGIN = "Site institucional";

function normalizeValue(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function getEnvValue(name: string) {
  return process.env[name]?.trim() ?? "";
}

function resolveRecipient(origin: string) {
  const formRecipients: Record<string, string> = {
    "IJA Drones": getEnvValue("IJA_DRONES_RECIPIENT") || "suporte@ijadrones.com.br",
    "Oceano Azul": getEnvValue("OCEANO_AZUL_RECIPIENT"),
  };

  return formRecipients[origin] || getEnvValue("DEFAULT_LEAD_RECIPIENT") || "";
}

export async function POST(request: Request) {
  const payload = (await request.json().catch(() => null)) as ContactApiPayload | null;

  if (!payload) {
    return NextResponse.json(
      {
        message: "Corpo da requisicao invalido.",
      },
      { status: 400 }
    );
  }

  const rawOrigin = normalizeValue(payload.origem);
  const lead: ContactLead = {
    nome: normalizeValue(payload.nome),
    email_cliente: normalizeValue(payload.email_cliente),
    telefone: normalizeValue(payload.telefone),
    interesse: normalizeValue(payload.interesse),
    mensagem: normalizeValue(payload.mensagem),
    origem: rawOrigin || DEFAULT_SITE_ORIGIN,
  };

  const errors: Record<string, string> = {};

  if (!lead.nome) {
    errors.name = "Informe seu nome.";
  }

  if (!lead.email_cliente) {
    errors.email = "Informe seu e-mail.";
  }

  if (!lead.mensagem) {
    errors.message = "Escreva uma mensagem.";
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      {
        message: "Preencha os campos obrigatorios.",
        errors,
      },
      { status: 400 }
    );
  }

  const resendApiKey = getEnvValue("RESEND_API_KEY");

  if (!resendApiKey) {
    return NextResponse.json(
      {
        message: "RESEND_API_KEY nao configurada.",
      },
      { status: 500 }
    );
  }

  const recipient = resolveRecipient(rawOrigin);

  if (!recipient) {
    const formName = rawOrigin || "este formulario";

    return NextResponse.json(
      {
        message: `Destinatario nao configurado para ${formName}.`,
      },
      { status: 503 }
    );
  }

  try {
    const resendResponse = await fetch(RESEND_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: getEnvValue("RESEND_FROM_EMAIL") || DEFAULT_FROM,
        to: [recipient],
        subject: `[${rawOrigin || "Lead do site"}] ${lead.nome}`,
        html: buildLeadEmailHtml(lead),
        text: buildLeadEmailText(lead),
        reply_to: lead.email_cliente,
      }),
      cache: "no-store",
    });

    const responseBody = (await resendResponse.json().catch(() => null)) as
      | ResendSendEmailResponse
      | null;

    if (!resendResponse.ok) {
      return NextResponse.json(
        {
          message:
            responseBody?.message ??
            "Nao foi possivel enviar sua mensagem agora.",
        },
        { status: resendResponse.status }
      );
    }

    return NextResponse.json(
      {
        message: "Mensagem enviada com sucesso.",
        emailId: responseBody?.id ?? null,
        recipient,
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      {
        message: "Nao foi possivel conectar ao Resend.",
      },
      { status: 502 }
    );
  }
}
