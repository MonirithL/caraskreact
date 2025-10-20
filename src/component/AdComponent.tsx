import { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}
export default function AdBanner() {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("Adsense error:", e);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "inline-block", width: "728px", height: "90px" }}
      data-ad-client="ca-pub-9705932480399585"
      data-ad-slot="3895800011"
    ></ins>
  );
}
