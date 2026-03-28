import { useEffect } from "react";

export default function VignetteAd() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://izcle.com/vignette.min.js";
    script.dataset.zone = "10798789";
    script.async = true;

    document.body.appendChild(script);
  }, []);

  return null;
}