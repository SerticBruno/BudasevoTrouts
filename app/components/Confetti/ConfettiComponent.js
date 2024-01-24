// Confetti.js
import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";

const ConfettiComponent = ({ duration, numberOfPieces }) => {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowConfetti(false);
    }, duration);

    return () => clearTimeout(timeout);
  }, [duration]);

  return (
    <div>
      {showConfetti && (
        <Confetti
          recycle={false}
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={numberOfPieces}
        />
      )}
    </div>
  );
};

export default ConfettiComponent;
