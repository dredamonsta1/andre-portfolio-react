import { useState, useEffect } from "react";

export default function Typewriter({ text = "", speed = 100, delay = 0 }) {
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index === 0 && delay > 0) {
      const timer = setTimeout(() => setIndex(1), delay);
      return () => clearTimeout(timer);
    }

    if (index > 0 && index <= text.length) {
      const timer = setTimeout(() => {
        setDisplayText(text.slice(0, index));
        setIndex(index + 1);
      }, speed);
      return () => clearTimeout(timer);
    }
  }, [index, text, speed, delay]);

  return (
    <span>
      {displayText}
      {index <= text.length ? <span className="cursor">|</span> : null}
    </span>
  );
}
