import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const SplitText = ({
  text,
  className = "",
  delay = 100,
  duration = 0.6,
  ease = "power3.out",
  splitType = "chars",
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  textAlign = "center",
  tag = "p",
  onLetterAnimationComplete,
  isRTL = false,
}) => {
  const ref = useRef(null);
  const [chars, setChars] = useState([]);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    if (!text) return;
    // Split text into characters for animation
    setChars(text.split(""));
    setAnimationComplete(false);
  }, [text]);

  useGSAP(
    () => {
      if (!ref.current || chars.length === 0) return;

      const charElements = ref.current.querySelectorAll(
        ".split-char:not(.split-space)"
      );

      // Set initial state
      gsap.set(charElements, from);

      // Animate to final state
      gsap.to(charElements, {
        ...to,
        duration,
        ease,
        stagger: delay / 1000,
        onComplete: () => {
          setAnimationComplete(true);
          onLetterAnimationComplete?.();
        },
      });
    },
    {
      dependencies: [chars],
      scope: ref,
    }
  );

  const style = {
    textAlign,
    whiteSpace: "pre-wrap",
    direction: isRTL ? "rtl" : "ltr",
  };

  const getTagComponent = () => {
    const classes = `${className}`;
    const content = animationComplete ? (
      text
    ) : (
      <>
        {chars.map((char, index) => (
          <span
            key={index}
            className={`split-char ${char === " " ? "split-space" : ""}`}
          >
            {char}
          </span>
        ))}
      </>
    );

    switch (tag) {
      case "h1":
        return (
          <h1 ref={ref} style={style} className={classes}>
            {content}
          </h1>
        );
      case "h2":
        return (
          <h2 ref={ref} style={style} className={classes}>
            {content}
          </h2>
        );
      case "h3":
        return (
          <h3 ref={ref} style={style} className={classes}>
            {content}
          </h3>
        );
      case "h4":
        return (
          <h4 ref={ref} style={style} className={classes}>
            {content}
          </h4>
        );
      case "h5":
        return (
          <h5 ref={ref} style={style} className={classes}>
            {content}
          </h5>
        );
      case "h6":
        return (
          <h6 ref={ref} style={style} className={classes}>
            {content}
          </h6>
        );
      default:
        return (
          <p ref={ref} style={style} className={classes}>
            {content}
          </p>
        );
    }
  };

  return getTagComponent();
};

export default SplitText;
