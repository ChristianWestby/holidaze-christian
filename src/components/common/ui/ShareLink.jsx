import { useState } from "react";

export default function ShareLink() {
  const [copied, setCopied] = useState(false);
  const url = window.location.href;

  const handleCopy = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="flex items-center gap-2 text-sm">
      <button
        onClick={handleCopy}
        className="bg-white text-gray-800 px-3 py-1 rounded hover:bg-gray-200 transition"
      >
        Kopier lenke
      </button>
      {copied && <span className="text-green-400">Kopiert!</span>}
    </div>
  );
}