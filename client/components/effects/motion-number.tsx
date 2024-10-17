"use client";

import { ArrowUp, ArrowDown } from "lucide-react";
import MotionNumber from "motion-number";
import React, { useEffect, useState } from "react";

const PriceNumber = ({ value }: { value: number }) => {
  const [isClient, setIsClient] = useState(false);
  const [diff, setDiff] = useState(0);

  useEffect(() => {
    setIsClient(true);

    const generateRandomDiff = () => {
      // Génère un nombre aléatoire entre -5 et 5
      return (Math.random() - 0.5) * 10;
    };

    // Mise à jour initiale
    setDiff(generateRandomDiff());

    // Mise à jour toutes les 3 secondes
    const interval = setInterval(() => {
      setDiff(generateRandomDiff());
    }, 3000);

    // Nettoyage de l'intervalle lors du démontage du composant
    return () => clearInterval(interval);
  }, []);

  if (!isClient) {
    return null; // ou un placeholder, comme <div>Loading...</div>
  }

  return (
    <MotionNumber
      value={value}
      format={{ style: "currency", currency: "USD" }}
      style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 32 }}
      after={() => (
        <MotionNumber
          value={diff}
          format={{ style: "percent", maximumFractionDigits: 2 }}
          animate={{ backgroundColor: diff > 0 ? "#34d399" : "#ef4444" }}
          style={{
            borderRadius: 999,
            display: "flex",
            alignItems: "center",
            rowGap: 4,
            padding: "2px 6px",
          }}
          first={() =>
            diff > 0 ? (
              <ArrowUp className="w-4 h-4" />
            ) : (
              <ArrowDown className="w-4 h-4" />
            )
          }
        />
      )}
    />
  );
};

export default PriceNumber;
