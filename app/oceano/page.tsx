"use client";

import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";

import OceanoLandingPage from "../components/oceano/OceanoLandingPage";
import Preloader from "../preloader";

export default function OceanoPageRoute() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <div
        style={{
          height: isLoading ? "100vh" : "auto",
          overflow: isLoading ? "hidden" : "visible",
        }}
      >
        <OceanoLandingPage
          onNavigateToAboutOceano={() => router.push("/oceano/sobre")}
        />
      </div>
    </>
  );
}
