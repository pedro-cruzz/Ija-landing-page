export type ContactLead = {
  nome: string;
  email_cliente: string;
  telefone: string;
  interesse: string;
  mensagem: string;
  origem: string;
};

type BrandContact = {
  label: string;
  value: string;
};

type BrandTheme = {
  name: string;
  logoAlt: string;
  logoPath: string;
  introTitle: string;
  introBody: string;
  eyebrow: string;
  accentColor: string;
  accentSoftColor: string;
  gradientStart: string;
  gradientEnd: string;
  footerText: string;
  contacts: BrandContact[];
};

const NOT_PROVIDED = "Nao informado";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatOptionalValue(value: string) {
  return value || NOT_PROVIDED;
}

function formatMultilineHtml(value: string) {
  return escapeHtml(value).replace(/\r?\n/g, "<br />");
}

function resolvePublicBaseUrl() {
  const explicitUrl =
    process.env.SITE_URL?.trim() ||
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    process.env.RENDER_EXTERNAL_URL?.trim();

  if (!explicitUrl) {
    return "";
  }

  return explicitUrl.replace(/\/$/, "");
}

function resolveLogoUrl(logoPath: string) {
  const publicBaseUrl = resolvePublicBaseUrl();

  if (!publicBaseUrl) {
    return "";
  }

  return `${publicBaseUrl}${logoPath}`;
}

function getBrandTheme(origin: string): BrandTheme {
  if (origin === "IJA Drones") {
    return {
      name: "IJA Drones",
      logoAlt: "IJA Drones",
      logoPath: "/images/logo-ija-sem-fundo.png",
      introTitle: "Novo lead para o IJA System",
      introBody:
        "Um novo contato demonstrou interesse na plataforma IJA System. Veja abaixo os dados recebidos e avance com o atendimento.",
      eyebrow: "NOVO LEAD DO IJA SYSTEM",
      accentColor: "#0284c7",
      accentSoftColor: "#e0f2fe",
      gradientStart: "#0f172a",
      gradientEnd: "#0369a1",
      footerText: "IJA Drones | Software e gestao para operacoes com drones.",
      contacts: [
        { label: "E-mail da equipe", value: "suporte@ijadrones.com.br" },
        { label: "Suporte comercial", value: "+55 (35) 99239-4222" },
      ],
    };
  }

  return {
    name: "Oceano Azul",
    logoAlt: "Oceano Azul",
    logoPath: "/images/oceano-azul-logo-sem-fundo.png",
    introTitle: "Novo lead para a Oceano Azul",
    introBody:
      "Um novo potencial cliente entrou em contato com a equipe Oceano Azul. Confira os dados capturados e siga com o atendimento.",
    eyebrow: "NOVO LEAD OCEANO AZUL",
    accentColor: "#2563eb",
    accentSoftColor: "#dbeafe",
    gradientStart: "#102a43",
    gradientEnd: "#243b53",
    footerText: "Oceano Azul | Pulverizacao, controle urbano e servicos com drones.",
    contacts: [
      { label: "E-mail da equipe", value: "contato@oceanoazul.com.br" },
      { label: "WhatsApp comercial", value: "+55 (11) 98765-4321" },
      { label: "LinkedIn", value: "linkedin.com/company/agroazul" },
    ],
  };
}

function renderBrandContacts(contacts: BrandContact[]) {
  return contacts
    .map(
      (contact) => `
                  <tr>
                    <td style="padding-bottom: 12px;">
                      <span style="color: #94a3b8; font-size: 12px; font-weight: bold; text-transform: uppercase;">${escapeHtml(contact.label)}</span><br />
                      <span style="color: #1e293b; font-size: 15px; font-weight: 600;">${escapeHtml(contact.value)}</span>
                    </td>
                  </tr>`
    )
    .join("");
}

export function buildLeadEmailHtml(lead: ContactLead) {
  const phone = formatOptionalValue(lead.telefone);
  const interest = formatOptionalValue(lead.interesse);
  const replyToEmail = encodeURIComponent(lead.email_cliente);
  const brand = getBrandTheme(lead.origem);
  const logoUrl = resolveLogoUrl(brand.logoPath);
  const logoMarkup = logoUrl
    ? `<img
                  src="${escapeHtml(logoUrl)}"
                  alt="${escapeHtml(brand.logoAlt)}"
                  width="200"
                  style="display: block; border: 0; max-height: 60px; width: auto; margin-bottom: 15px;"
                />`
    : `<div style="margin-bottom: 15px; color: #ffffff; font-size: 24px; font-weight: 700;">${escapeHtml(brand.name)}</div>`;

  return `<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body style="margin: 0; padding: 0; background-color: #f0f4f8; font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="padding: 40px 10px;">
      <tr>
        <td align="center">
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05); border: 1px solid #e1e8f0;">
            <tr>
              <td align="center" style="background: linear-gradient(135deg, ${brand.gradientStart} 0%, ${brand.gradientEnd} 100%); padding: 45px 30px;">
                ${logoMarkup}
                <p style="margin: 5px 0 0 0; color: ${brand.accentSoftColor}; font-size: 13px; letter-spacing: 1px; font-weight: bold;">
                  ${escapeHtml(brand.eyebrow)}
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding: 40px 35px;">
                <h2 style="margin: 0 0 20px 0; color: #1e293b; font-size: 22px; font-weight: 700;">
                  ${escapeHtml(brand.introTitle)}
                </h2>
                <p style="margin: 0 0 30px 0; color: #64748b; font-size: 16px; line-height: 1.6;">
                  ${escapeHtml(brand.introBody)}
                </p>

                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8fafc; border-radius: 12px; padding: 25px; border: 1px solid #f1f5f9;">
                  <tr>
                    <td style="padding-bottom: 15px;">
                      <span style="color: #94a3b8; font-size: 12px; font-weight: bold; text-transform: uppercase;">Nome do lead</span><br />
                      <span style="color: #1e293b; font-size: 16px; font-weight: 600;">${escapeHtml(lead.nome)}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-bottom: 15px;">
                      <span style="color: #94a3b8; font-size: 12px; font-weight: bold; text-transform: uppercase;">E-mail de contato</span><br />
                      <span style="color: ${brand.accentColor}; font-size: 16px; font-weight: 600;">${escapeHtml(lead.email_cliente)}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-bottom: 15px;">
                      <span style="color: #94a3b8; font-size: 12px; font-weight: bold; text-transform: uppercase;">WhatsApp / Telefone</span><br />
                      <span style="color: #1e293b; font-size: 16px; font-weight: 600;">${escapeHtml(phone)}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-bottom: 15px;">
                      <span style="color: #94a3b8; font-size: 12px; font-weight: bold; text-transform: uppercase;">Interesse</span><br />
                      <span style="color: #1e293b; font-size: 16px; font-weight: 600;">${escapeHtml(interest)}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-bottom: 15px;">
                      <span style="color: #94a3b8; font-size: 12px; font-weight: bold; text-transform: uppercase;">Origem do formulario</span><br />
                      <span style="color: #1e293b; font-size: 16px; font-weight: 600;">${escapeHtml(lead.origem)}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span style="color: #94a3b8; font-size: 12px; font-weight: bold; text-transform: uppercase;">Mensagem recebida</span><br />
                      <div style="margin-top: 8px; color: #475569; font-size: 15px; line-height: 1.6; padding: 15px; background-color: #ffffff; border-radius: 8px; border: 1px solid #e2e8f0;">
                        ${formatMultilineHtml(lead.mensagem)}
                      </div>
                    </td>
                  </tr>
                </table>

                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 24px; background-color: #ffffff; border-radius: 12px; padding: 22px; border: 1px solid #e2e8f0;">
                  <tr>
                    <td style="padding-bottom: 14px;">
                      <span style="color: #94a3b8; font-size: 12px; font-weight: bold; text-transform: uppercase;">Canal da marca</span><br />
                      <span style="color: #1e293b; font-size: 16px; font-weight: 700;">${escapeHtml(brand.name)}</span>
                    </td>
                  </tr>
                  ${renderBrandContacts(brand.contacts)}
                </table>

                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 35px;">
                  <tr>
                    <td align="center">
                      <a href="mailto:${replyToEmail}" style="background-color: ${brand.accentColor}; color: #ffffff; padding: 16px 32px; text-decoration: none; border-radius: 10px; font-weight: bold; font-size: 16px; display: inline-block; box-shadow: 0 4px 6px rgba(37, 99, 235, 0.2);">
                        Responder via e-mail
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding: 0 35px 40px 35px; text-align: center;">
                <p style="margin: 0; color: #94a3b8; font-size: 12px;">
                  ${escapeHtml(brand.footerText)}<br />
                  &copy; 2026 ${escapeHtml(brand.name)}
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export function buildLeadEmailText(lead: ContactLead) {
  const brand = getBrandTheme(lead.origem);
  const contactText = brand.contacts
    .map((contact) => `${contact.label}: ${contact.value}`)
    .join("\n");

  return [
    `${brand.introTitle}`,
    "",
    `Marca: ${brand.name}`,
    `Nome: ${lead.nome}`,
    `E-mail: ${lead.email_cliente}`,
    `Telefone: ${formatOptionalValue(lead.telefone)}`,
    `Interesse: ${formatOptionalValue(lead.interesse)}`,
    `Origem: ${lead.origem}`,
    "",
    "Mensagem:",
    lead.mensagem,
    "",
    "Contatos da equipe:",
    contactText,
  ].join("\n");
}
