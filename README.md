# Landing Page IJA / Oceano Azul

Frontend em Next.js com formularios que enviam leads para a rota interna `POST /api/contact`.

## Variaveis de ambiente

Copie `.env.local.example` para `.env.local`.

```env
SITE_URL=
RESEND_API_KEY=
RESEND_FROM_EMAIL=Sistema IJA <onboarding@resend.dev>
IJA_DRONES_RECIPIENT=suporte@ijadrones.com.br
OCEANO_AZUL_RECIPIENT=suporte@ijadrones.com.br
DEFAULT_LEAD_RECIPIENT=suporte@ijadrones.com.br
```

`SITE_URL` e opcional, mas recomendado para os e-mails carregarem as logos publicas corretas de cada marca.

Regras de roteamento:

- `origem = "IJA Drones"` envia para `IJA_DRONES_RECIPIENT`
- `origem = "Oceano Azul"` envia para `OCEANO_AZUL_RECIPIENT`
- se nao houver destinatario especifico, usa `DEFAULT_LEAD_RECIPIENT`

## Instalacao

```powershell
npm install
```

## Executando localmente

```powershell
npm run dev
```

Abra `http://localhost:3000`.

## Fluxo do formulario

1. O usuario envia o formulario em uma das paginas.
2. O frontend chama `POST /api/contact`.
3. A rota do Next valida os campos obrigatorios.
4. A rota envia o e-mail diretamente para a API do Resend.
5. O lead chega no destinatario configurado por origem.

## Arquivos principais

- `app/page.tsx`: telas e formularios
- `app/api/contact/route.ts`: validacao e envio do e-mail
- `app/api/contact/email-template.ts`: template HTML/texto do lead
- `.env.local.example`: exemplo de configuracao local
