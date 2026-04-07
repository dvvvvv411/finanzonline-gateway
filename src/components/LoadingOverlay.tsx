import { useEffect, useState } from "react";

interface LoadingOverlayProps {
  message?: string;
  duration?: number;
  onComplete: () => void;
}

const LoadingOverlay = ({ message = "Daten werden überprüft...", duration = 2500, onComplete }: LoadingOverlayProps) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onComplete();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onComplete]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white">
      <div className="mb-6">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-[#00436b]" />
      </div>
      <p className="text-sm text-gray-600">{message}</p>
    </div>
  );
};

export default LoadingOverlay;
