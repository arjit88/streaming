import { useEffect, useState } from "react";

const Loader = ({ onComplete }) => {
  const [currentProgress, setCurrentProgress] = useState(0);

  useEffect(() => {
    const loader = setInterval(() => {
      setCurrentProgress((prevProgress) => {
        let newProgress = prevProgress + Math.random() * 20; // Control increment for smoother experience
        if (newProgress >= 100) {
          newProgress = 100;
          clearInterval(loader);
          if (onComplete) onComplete(); // Trigger callback when loading is complete
        }
        return newProgress;
      });
    }, 800);

    return () => clearInterval(loader);
  }, [onComplete]);

  return (
    <div className="fixed top-0 left-0 w-full z-40">
      <div
        className={`h-1 bg-red-700 transition-all duration-200`}
        style={{ width: `${currentProgress}%` }}
      />
    </div>
  );
};

export default Loader;
