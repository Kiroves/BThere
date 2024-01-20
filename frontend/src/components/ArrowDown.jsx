import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";

export default function ArrowDown() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleInteraction = () => {
      setVisible(window.scrollY === 0);
    };

    // Attach event listeners for various user interactions (e.g., scroll, click, etc.)
    window.addEventListener("scroll", handleInteraction);
    // Add more event listeners as needed

    return () => {
      // Clean up the event listeners when the component is unmounted
      window.removeEventListener("scroll", handleInteraction);
    };
  }, []);

  return (
    <>
      {visible && (
        <div className="z-2 fixed bottom-0 left-0 mb-4 flex w-full animate-bounce justify-center opacity-60 transition">
          <Icon icon="ep:arrow-down-bold" fontSize={40} />
        </div>
      )}
    </>
  );
}
