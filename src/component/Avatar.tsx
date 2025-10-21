import { useState } from "react";
import default_avatar from "../assets/anon_profile.png";
interface AvatarProps {
  src: string;
  alt: string;
  width?: number;
  maxRetries?: number;
}
export default function Avatar({
  src,
  alt,
  width = 100,
  maxRetries = 3,
}: AvatarProps) {
  const [retryCount, setRetryCount] = useState(0);
  const [currentSrc, setCurrentSrc] = useState(src);

  const handleError = () => {
    if (retryCount < maxRetries) {
      setRetryCount(retryCount + 1);
      // Add a tiny delay or change the URL to force reload
      setTimeout(() => setCurrentSrc(src + `?retry=${retryCount}`), 3000);
    } else {
      setCurrentSrc(default_avatar);
    }
  };

  return (
    <img
      src={currentSrc}
      alt={alt}
      width={width}
      onError={handleError}
      style={{ objectFit: "cover", borderRadius: "50%" }}
    />
  );
}
