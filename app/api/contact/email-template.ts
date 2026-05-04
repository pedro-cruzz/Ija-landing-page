export type ContactLead = {
  nome: string;
  email_cliente: string;
  telefone: string;
  interesse: string;
  mensagem: string;
  origem: string;
};

type EmailRenderOptions = {
  publicBaseUrl?: string;
};

type BrandContact = {
  label: string;
  value: string;
};

type BrandTheme = {
  name: string;
  logoAlt: string;
  logoPath: string;
  greeting: string;
  introTitle: string;
  introBody: string;
  eyebrow: string;
  accentColor: string;
  accentSoftColor: string;
  pageBackground: string;
  panelBackground: string;
  panelBorder: string;
  textPrimary: string;
  textMuted: string;
  heroTextColor: string;
  heroBackground: string;
  heroBorder: string;
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

function resolvePublicBaseUrl(publicBaseUrl?: string) {
  const explicitUrl =
    publicBaseUrl?.trim() ||
    process.env.SITE_URL?.trim() ||
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    process.env.RENDER_EXTERNAL_URL?.trim();

  if (!explicitUrl) {
    return "";
  }

  return explicitUrl.replace(/\/$/, "");
}

function resolveLogoUrl(logoPath: string, publicBaseUrl?: string) {
  const resolvedBaseUrl = resolvePublicBaseUrl(publicBaseUrl);

  if (!resolvedBaseUrl) {
    return "";
  }

  return `${resolvedBaseUrl}${logoPath}`;
}

function getBrandTheme(): BrandTheme {
  return {
    name: "Oceano Azul",
    logoAlt: "Oceano Azul",
    logoPath: "/images/oceano-azul-logo-sem-fundo.png",
    greeting: "Ola, Equipe Oceano Azul!",
    introTitle: "Novo lead para a Oceano Azul",
    introBody:
      "Um novo potencial cliente entrou em contato com a equipe Oceano Azul. Confira os dados capturados e siga com o atendimento.",
    eyebrow: "NOTIFICACAO DE NOVO LEAD",
    accentColor: "#2563eb",
    accentSoftColor: "#dbeafe",
    pageBackground: "#eef4ff",
    panelBackground: "#f8fbff",
    panelBorder: "#dbe7ff",
    textPrimary: "#102a43",
    textMuted: "#486581",
    heroTextColor: "#dbeafe",
    heroBackground: "#102a43",
    heroBorder: "#243b53",
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
                      <span style="color: #64748b; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.08em;">${escapeHtml(contact.label)}</span><br />
                      <span style="color: #0f172a; font-size: 15px; font-weight: 600;">${escapeHtml(contact.value)}</span>
                    </td>
                  </tr>`
    )
    .join("");
}

function renderLeadField(label: string, value: string, highlightColor?: string) {
  return `
    <tr>
      <td style="padding-bottom: 14px;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td style="padding: 0;">
              <span style="color: #7b8ba5; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em;">${escapeHtml(label)}</span><br />
              <span style="color: ${highlightColor ?? "#0f172a"}; font-size: 15px; font-weight: 700; line-height: 1.6;">${escapeHtml(value)}</span>
            </td>
          </tr>
        </table>
      </td>
    </tr>`;
}

export function buildLeadEmailHtml(
  lead: ContactLead,
  options: EmailRenderOptions = {}
) {
  const phone = formatOptionalValue(lead.telefone);
  const interest = formatOptionalValue(lead.interesse);
  const brand = getBrandTheme();
  const logoUrl = resolveLogoUrl(brand.logoPath, options.publicBaseUrl);
  const logoMarkup = logoUrl
    ? `<img
                  src="${escapeHtml(logoUrl)}"
                  alt="${escapeHtml(brand.logoAlt)}"
                  width="184"
                  style="display: block; border: 0; max-height: 56px; width: auto;"
                />`
    : `<div style="color: #ffffff; font-size: 24px; font-weight: 700; letter-spacing: 0.02em;">${escapeHtml(brand.name)}</div>`;
  const replyToEmail = escapeHtml(lead.email_cliente);

  return `<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body style="margin: 0; padding: 0; background-color: ${brand.pageBackground}; font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
    <table border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="${brand.pageBackground}" style="padding: 40px 10px; background-color: ${brand.pageBackground};">
      <tr>
        <td align="center">
          <table border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="#ffffff" style="max-width: 640px; background-color: #ffffff; border-radius: 22px; overflow: hidden; box-shadow: 0 18px 45px rgba(15, 23, 42, 0.08); border: 1px solid ${brand.panelBorder};">
            <tr>
              <td style="padding: 0;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="#ffffff" style="background-color: #ffffff;">
                  <tr>
                    <td style="padding: 12px 0 0 0; line-height: 12px; font-size: 12px;">
                      <div style="height: 6px; background-color: ${brand.accentColor};"></div>
                    </td>
                  </tr>
                  <tr>
                    <td align="center" style="padding: 34px 30px 10px 30px;">
                      ${logoMarkup}
                    </td>
                  </tr>
                  <tr>
                    <td align="center" style="padding: 6px 30px 28px 30px;">
                      <span style="display: inline-block; color: #c4dbff; font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em;">${escapeHtml(
                        brand.eyebrow
                      )}</span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 28px 20px 28px;">
                <h1 style="margin: 0 0 18px 0; color: ${brand.textPrimary}; font-size: 33px; line-height: 1.15; font-weight: 800;">${escapeHtml(
                  brand.greeting
                )}</h1>
                <p style="margin: 0 0 22px 0; color: ${brand.textMuted}; font-size: 16px; line-height: 1.8; max-width: 520px;">
                  ${escapeHtml(brand.introBody)}
                </p>

                <table border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="${brand.panelBackground}" style="background-color: ${brand.panelBackground}; border-radius: 18px; padding: 24px; border: 1px solid ${brand.panelBorder};">
                  <tr>
                    <td style="padding-bottom: 12px;">
                      <span style="display: inline-block; color: ${brand.accentColor}; font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em;">Detalhes capturados</span>
                    </td>
                  </tr>
                  ${renderLeadField("Nome do lead", lead.nome)}
                  ${renderLeadField("E-mail de contato", lead.email_cliente, brand.accentColor)}
                  ${renderLeadField("WhatsApp / Telefone", phone)}
                  ${renderLeadField("Interesse", interest)}
                  ${renderLeadField("Origem do formulario", lead.origem)}
                  <tr>
                    <td>
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="#ffffff" style="background-color: #ffffff; border: 1px solid #dbe7f0; border-radius: 10px;">
                        <tr>
                          <td style="padding: 16px 18px;">
                            <span style="color: #7b8ba5; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em;">Mensagem recebida</span>
                            <div style="margin-top: 10px; color: ${brand.textMuted}; font-size: 15px; line-height: 1.8; background-color: #ffffff; border-radius: 8px;">
                        ${formatMultilineHtml(lead.mensagem)}
                            </div>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>

                <table border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="#ffffff" style="margin-top: 22px; background-color: #ffffff; border-radius: 18px; padding: 22px; border: 1px solid ${brand.panelBorder};">
                  <tr>
                    <td style="padding-bottom: 14px; border-bottom: 1px solid #e2e8f0;">
                      <span style="color: ${brand.accentColor}; font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em;">Canal da marca</span><br />
                      <span style="color: ${brand.textPrimary}; font-size: 18px; font-weight: 800; line-height: 1.6;">${escapeHtml(brand.name)}</span>
                    </td>
                  </tr>
                  <tr><td style="height: 14px; line-height: 14px; font-size: 14px;">&nbsp;</td></tr>
                  ${renderBrandContacts(brand.contacts)}
                </table>

                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 30px;">
                  <tr>
                    <td align="center">
                      <table border="0" cellpadding="0" cellspacing="0">
                        <tr>
                          <td align="center" bgcolor="${brand.accentColor}" style="background-color: ${brand.accentColor}; border-radius: 10px; box-shadow: 0 12px 24px rgba(2, 132, 199, 0.18);">
                            <a href="mailto:${replyToEmail}" style="background-color: ${brand.accentColor}; color: #ffffff; padding: 16px 34px; text-decoration: none; border-radius: 10px; font-weight: 800; font-size: 15px; display: inline-block;">
                              Responder via e-mail
                            </a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding: 0 28px 34px 28px; text-align: center;">
                <p style="margin: 0; color: #64748b; font-size: 12px; line-height: 1.7;">
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
  const brand = getBrandTheme();
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
