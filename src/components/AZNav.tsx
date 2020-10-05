import React, { FunctionComponent } from "react";
import classNames from "classnames";

const AZNav: FunctionComponent<{
  currentLetter: string;
  validLetters: string[];
}> = ({ currentLetter, validLetters }) => {
  const getClasses = (letter: string) =>
    classNames("block", "text-sm", "w-full", "text-gray-800", "text-center", {
      "font-black": currentLetter === letter,
    });

  return (
    <nav className="sticky top-80 -ml-10 bg-gray-200 rounded px-1 w-5">
      {[
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
      ].map((letter) => {
        const isLink = validLetters.includes(letter);
        return isLink ? (
          <a className={getClasses(letter)} href={`#${letter}`} key={letter}>
            {letter}
          </a>
        ) : (
          <span className={getClasses(letter)} key={letter}>
            {letter}
          </span>
        );
      })}
    </nav>
  );
};

export default AZNav;
