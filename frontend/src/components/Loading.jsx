import React from "react";

function Loading() {
  const dots = Array.from({ length: 6 }, (_, index) => {
    const angle = (index * Math.PI) / 3;

    return {
      x: 50 + 30 * Math.cos(angle),
      y: 50 + 30 * Math.sin(angle),
      opacity: 0.35 + index * 0.1,
    };
  });

  return (
    <div className="absolute inset-0 z-100 h-screen w-full bg-[#f6e7d8]/70 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="flex flex-col items-center gap-3">
        <div className="h-24 w-24 sm:h-28 sm:w-28">
          <svg
            viewBox="0 0 100 100"
            className="h-full w-full animate-[spin_1.4s_linear_infinite]"
            aria-label="Loading"
            role="img"
          >
            {dots.map((dot, index) => (
              <circle
                key={index}
                cx={dot.x}
                cy={dot.y}
                r="6.5"
                fill="#9333ea"
                opacity={dot.opacity}
              />
            ))}
          </svg>
        </div>
      </div>
    </div>
  );
}

export default Loading;
