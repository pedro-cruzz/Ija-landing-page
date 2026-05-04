"use client";

import React, { useState } from "react";

export type LeadFormField = "name" | "email" | "message" | "form";

export type LeadFormState = {
  succeeded: boolean;
  submitting: boolean;
  errors: Partial<Record<LeadFormField, string>>;
};

function createInitialLeadFormState(): LeadFormState {
  return {
    succeeded: false,
    submitting: false,
    errors: {},
  };
}

export function FieldError({
  message,
  className = "text-red-500 text-xs mt-1",
}: {
  message?: string;
  className?: string;
}) {
  if (!message) {
    return null;
  }

  return <p className={className}>{message}</p>;
}

export function useLeadForm(origin: string) {
  const [state, setState] = useState<LeadFormState>(() =>
    createInitialLeadFormState()
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      nome: String(formData.get("name") ?? "").trim(),
      email_cliente: String(formData.get("email") ?? "").trim(),
      telefone: String(formData.get("phone") ?? "").trim(),
      interesse: String(formData.get("interest") ?? "").trim(),
      mensagem: String(formData.get("message") ?? "").trim(),
      origem: origin,
    };

    const nextErrors: LeadFormState["errors"] = {};

    if (!payload.nome) {
      nextErrors.name = "Informe seu nome.";
    }

    if (!payload.email_cliente) {
      nextErrors.email = "Informe seu e-mail.";
    }

    if (!payload.mensagem) {
      nextErrors.message = "Escreva uma mensagem.";
    }

    if (Object.keys(nextErrors).length > 0) {
      setState({
        succeeded: false,
        submitting: false,
        errors: nextErrors,
      });
      return;
    }

    setState({
      succeeded: false,
      submitting: true,
      errors: {},
    });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = (await response.json().catch(() => null)) as
        | {
            message?: string;
            errors?: LeadFormState["errors"];
          }
        | null;

      if (!response.ok) {
        setState({
          succeeded: false,
          submitting: false,
          errors: {
            ...(result?.errors ?? {}),
            form:
              result?.message ??
              "Não foi possível enviar sua mensagem agora.",
          },
        });
        return;
      }

      form.reset();
      setState({
        succeeded: true,
        submitting: false,
        errors: {},
      });
    } catch {
      setState({
        succeeded: false,
        submitting: false,
        errors: {
          form:
            "Não foi possível conectar ao serviço de e-mail. Tente novamente em instantes.",
        },
      });
    }
  };

  const resetForm = () => {
    setState(createInitialLeadFormState());
  };

  return { state, handleSubmit, resetForm };
}
