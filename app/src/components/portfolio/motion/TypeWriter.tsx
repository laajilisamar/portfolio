import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

type TypeWriterProps = { words: string[]; className?: string };

/** Types and erases each word in turn. `words` should be a stable array. */
export const TypeWriter = ({ words, className }: TypeWriterProps) => {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduce) {
      setText(words.join(" · "));
      return;
    }

    const word = words[index % words.length];
    let delay = deleting ? 35 : 85;
    if (!deleting && text === word) delay = 1500;
    if (deleting && text === "") delay = 300;

    const timer = setTimeout(() => {
      if (!deleting && text === word) return setDeleting(true);
      if (deleting && text === "") {
        setDeleting(false);
        return setIndex((current) => current + 1);
      }
      setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1));
    }, delay);

    return () => clearTimeout(timer);
  }, [text, deleting, index, words, reduce]);

  return (
    <span className={className}>
      {text}
      <motion.span
        aria-hidden="true"
        className="ml-0.5 inline-block w-[2px] bg-current align-middle"
        style={{ height: "1em" }}
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      />
    </span>
  );
};
