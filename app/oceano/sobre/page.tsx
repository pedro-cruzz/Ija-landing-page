"use client";

import { useRouter } from "next/navigation";

import OceanoAboutPage from "../../components/oceano/OceanoAboutPage";

export default function OceanoAboutRoute() {
  const router = useRouter();

  return (
    <OceanoAboutPage
      onBack={() => router.push("/oceano")}
      onRequestBudget={() => router.push("/oceano#contato-oceano")}
    />
  );
}
