import { useEffect, useRef, useState } from "react";

interface LoadingOverlayProps {
  message?: string;
  duration?: number;
  onComplete: () => void;
}

const LoadingOverlay = ({ message = "Daten werden überprüft...", duration = 2500, onComplete }: LoadingOverlayProps) => {
  const [visible, setVisible] = useState(true);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onCompleteRef.current();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration]);

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
