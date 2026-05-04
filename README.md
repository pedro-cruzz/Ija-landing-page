# Landing Page Oceano Azul

Projeto Next.js da landing page institucional da Oceano Azul.

## Variaveis de ambiente

Copie `.env.local.example` para `.env.local`, se houver, e configure:

```env
SITE_URL=
RESEND_API_KEY=
RESEND_FROM_EMAIL=Oceano Azul <onboarding@resend.dev>
OCEANO_AZUL_RECIPIENT=
DEFAULT_LEAD_RECIPIENT=
```

`SITE_URL` e opcional, mas recomendado para os e-mails carregarem a logo publica corretamente.

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

1. O usuario envia o formulario da landing.
2. O frontend chama `POST /api/contact`.
3. A rota do Next valida os campos obrigatorios.
4. A rota envia o e-mail diretamente para a API do Resend.
5. O lead chega no destinatario configurado para a Oceano Azul.
