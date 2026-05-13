"use client";

import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";

import OceanoLandingPage from "../components/oceano/OceanoLandingPage";
import Preloader from "../preloader";

let hasCompletedInitialLoading = false;

export default function OceanoPageRoute() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(!hasCompletedInitialLoading);

  const handlePreloaderComplete = () => {
    hasCompletedInitialLoading = true;
    setIsLoading(false);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
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
