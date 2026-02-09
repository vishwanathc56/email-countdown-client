import { useState, useEffect } from "react";

const LiveCountdown = ({ endDateTime, bgColor, fontColor, fontSize, fontFamily, width, height }) => {
    const [timeLeft, setTimeLeft] = useState("");

    useEffect(() => {
        const updateCountdown = () => {
            const now = new Date();
            const end = new Date(endDateTime);
            const diff = end - now;

            if (diff <= 0) {
                setTimeLeft("00:00:00");
                return;
            }

            const hours = String(Math.floor(diff / 3600000)).padStart(2, "0");
            const minutes = String(Math.floor((diff % 3600000) / 60000)).padStart(2, "0");
            const seconds = String(Math.floor((diff % 60000) / 1000)).padStart(2, "0");

            setTimeLeft(`${hours}:${minutes}:${seconds}`);
        };

        updateCountdown();
        const interval = setInterval(updateCountdown, 1000);
        return () => clearInterval(interval);
    }, [endDateTime]);

    return (
        <div
            style={{
                backgroundColor: bgColor || "#000",
                color: fontColor || "#fff",
                fontSize: fontSize ? `${fontSize}px` : "24px",
                fontFamily: fontFamily || "Arial",
                width: width ? `${width}px` : "400px",
                height: height ? `${height}px` : "100px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "6px",
                margin: "1rem auto",
            }}
        >
            {timeLeft}
        </div>
    );
};

export default LiveCountdown;
