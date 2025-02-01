import React, { useState, useEffect } from "react";

const Timer = ({ startTime, duration }) => {
  const [timeLeft, setTimeLeft] = useState(duration * 60); // Convert minutes to seconds

  useEffect(() => {
    if (!startTime) return; // Prevent running without startTime

    const interval = setInterval(() => {
      const elapsedTime = Math.floor((Date.now() - startTime) / 1000); 
      const remainingTime = Math.max(duration * 60 - elapsedTime, 0); // Ensure time doesn’t go negative
      setTimeLeft(remainingTime);

      if (remainingTime <= 0) clearInterval(interval);
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [startTime, duration]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <div style={{
      position: "absolute",
      top: "20px",
      right: "20px",
      fontSize: "1.2rem",
      color: "#fff",
      backgroundColor: "#000",
      padding: "5px 15px",
      borderRadius: "5px"
    }}>
      {formatTime(timeLeft)}
    </div>
  );
};

export default Timer;
