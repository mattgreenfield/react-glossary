import React, { FunctionComponent } from "react";
import classNames from "classnames";

const AZNav: FunctionComponent<{ currentLetter: string }> = ({
  currentLetter,
}) => {
  return (
    <nav className="fixed top-0 -ml-8">
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
      ].map((letter) => (
        <button
          className={classNames("block", "text-sm", {
            "font-black": currentLetter === letter,
          })}
          type="button"
          //   onClick={() => {
          //     setCurrentLetter(letter);
          //   }}
          //   disabled={!Object.keys(termsByLetter).includes(letter)}
        >
          {letter}
        </button>
      ))}
    </nav>
  );
};

export default AZNav;
