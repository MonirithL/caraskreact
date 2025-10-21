import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export default function AdBanner() {
  const adRef = useRef<HTMLDivElement | null>(null);
  const [adLoaded, setAdLoaded] = useState(false);

  useEffect(() => {
    try {
      // Load AdSense script only once globally
      if (!document.querySelector('script[src*="adsbygoogle.js"]')) {
        const script = document.createElement("script");
        script.async = true;
        script.src =
          "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9705932480399585";
        script.crossOrigin = "anonymous";
        document.head.appendChild(script);
      }

      // Try to render ad
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense error:", e);
    }

    // Observe ad container to detect if ad loads
    const el = adRef.current;
    if (!el) return;

    const observer = new MutationObserver(() => {
      // AdSense injects iframe if the ad successfully loads
      if (el.querySelector("iframe")) {
        setAdLoaded(true);
        observer.disconnect();
      }
    });

    observer.observe(el, { childList: true, subtree: true });

    // Safety timeout: if ad doesn’t load within 5 seconds → collapse
    const timeout = setTimeout(() => {
      if (!el.querySelector("iframe")) setAdLoaded(false);
    }, 5000);

    return () => {
      observer.disconnect();
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div
      ref={adRef as any}
      className="adsbygoogle"
      style={{
        display: adLoaded ? "inline-block" : "none",
        width: "100%",
        height: adLoaded ? "90px" : "0px",
        transition: "height 0.3s ease",
        overflow: "hidden",
      }}
      data-ad-client="ca-pub-9705932480399585"
      data-ad-slot="3895800011"
    ></div>
  );
}
