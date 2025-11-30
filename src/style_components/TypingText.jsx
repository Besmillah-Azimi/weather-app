import React, { useEffect, useState, useRef } from "react";

// Simple, beautiful typing text React component
// Usage:
// <TypingText
//    texts={["Hello, world!", "Welcome to my site.", "Build something beautiful."]}
//    typingSpeed={60}         // ms per character (default 60)
//    pause={1500}             // pause between texts in ms (default 1500)
//    loop={true}              // loop through texts (default true)
//    className="text-2xl font-semibold text-white" // pass Tailwind classes
// />

export default function TypingText({
  texts = ["Hello, world!"],
  typingSpeed = 60,
  pause = 1500,
  loop = true,
  className = "text-2xl font-semibold text-white",
}) {
  const [index, setIndex] = useState(0); // which string
  const [subIndex, setSubIndex] = useState(0); // char index
  const [isDeleting, setIsDeleting] = useState(false);
  const [blink, setBlink] = useState(true);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => (mounted.current = false);
  }, []);

  // Typing / deleting effect
  useEffect(() => {
    if (!mounted.current) return;

    // Guard: empty texts
    if (!texts || texts.length === 0) return;

    const current = texts[index % texts.length];

    const tick = () => {
      if (!mounted.current) return;

      // If not deleting, advance subIndex until full word
      if (!isDeleting) {
        if (subIndex < current.length) {
          setSubIndex((prev) => prev + 1);
        } else {
          // reached full word, start deleting after a pause
          setTimeout(() => {
            if (!mounted.current) return;
            setIsDeleting(true);
          }, pause);
        }
      } else {
        // deleting mode
        if (subIndex > 0) {
          setSubIndex((prev) => prev - 1);
        } else {
          // finished deleting, move to next word
          setIsDeleting(false);
          setIndex((prev) => prev + 1);
        }
      }
    };

    const delay = isDeleting ? typingSpeed / 2 : typingSpeed;
    const timer = setTimeout(tick, delay);

    return () => clearTimeout(timer);
  }, [subIndex, index, isDeleting, texts, typingSpeed, pause]);

  // cursor blink
  useEffect(() => {
    const id = setInterval(() => setBlink((b) => !b), 500);
    return () => clearInterval(id);
  }, []);

  // If not looping and finished all texts, stop at the last one
  const finished = !loop && index >= texts.length;
  const displayText = finished
    ? texts[texts.length - 1]
    : texts[index % texts.length].slice(0, subIndex);

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <span className="leading-tight tracking-tight">{displayText}</span>
      <span
        aria-hidden
        style={{
          width: 2,
          height: "1.1em",
          display: "inline-block",
          verticalAlign: "middle",
          marginLeft: 2,
          borderRadius: 1,
          backgroundColor: "currentColor",
          opacity: blink ? 1 : 0,
          transition: "opacity 120ms linear",
        }}
      />
    </div>
  );
}
