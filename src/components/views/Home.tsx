import React, { FunctionComponent, useEffect, useRef } from "react";
import Layout from "../layouts/Default";
// import Button from "../atoms/Button";
import InputText from "../atoms/InputText";
import classNames from "classnames";
import allTerms from "../../data.json";

interface Term {
  _id: string;
  term: string;
  description: string;
  abbreviation?: string;
  tags?: Object;
}

const Home: FunctionComponent = () => {
  const [search, setSearch] = React.useState("");
  const [currentLetter, setCurrentLetter] = React.useState("A");

  const getTermsByLetter = (allTerms: Term[]) => {
    const groupedByLetter = allTerms.reduce((acc, term) => {
      const firstLetter = term.term.charAt(0).toUpperCase();
      if (acc[firstLetter]) {
        acc[firstLetter].push(term);
      } else {
        acc[firstLetter] = [term];
      }
      return acc;
    }, {} as { [key: string]: Term[] });

    const ordered = {} as { [key: string]: Term[] };
    Object.keys(groupedByLetter)
      .sort()
      .forEach((key) => {
        ordered[key] = groupedByLetter[key];
      });

    return ordered;
  };

  const termsByLetter = getTermsByLetter(allTerms);

  /**
   * Intersection observor for when an element is 1px off the screen, used to detect position: sticky
   */
  const observer = new IntersectionObserver(
    ([e]) => {
      const intersectionRatio = e.intersectionRatio;
      // If it's not full visible AND not fully hidden, then it's sticky, becuase of the -1px hack we have
      if (intersectionRatio > 0.95 && intersectionRatio < 1) {
        const letter = e.target.innerHTML;
        console.log(letter, e.intersectionRatio);
        setCurrentLetter(letter);
      }
    },
    { threshold: [1] }
  );

  /**
   * Create multiple refs that we'll put on the sections headers to observe position:sticky
   */
  const headerRefs = useRef({}) as React.MutableRefObject<{
    [key: string]: HTMLHeadingElement | null;
  }>;

  /**
   * Loop through every section heading ref and add the observor
   */
  useEffect(() => {
    const elements = headerRefs.current;
    Object.values(elements).forEach((el) => {
      if (el) {
        observer.observe(el);
      }
    });

    // unmount
    return function () {
      Object.values(elements).forEach((el) => {
        if (el) {
          observer.unobserve(el);
        }
      });
    };
  }, [headerRefs, observer]);

  return (
    <Layout>
      <>
        <InputText
          label="Search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <nav className="sticky top-0 -ml-8">
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
            <div
              className={classNames({
                "font-black": currentLetter === letter,
              })}
            >
              {letter}
            </div>
          ))}
        </nav>
        <ol type="A">
          {Object.keys(termsByLetter).map((letter) => (
            <li className="relative" key={letter}>
              <h3
                ref={(element) => (headerRefs.current[letter] = element)}
                className="text-xl font-black sticky top-0 p-1 bg-white border-solid border-b border-black"
                style={{ top: "-1px", paddingTop: "1px" }}
              >
                {letter}
              </h3>
              <ul>
                {termsByLetter[letter].map((term) => (
                  <li className="mb-6">
                    <h4 className="text-2xl">{term.term}</h4>
                    <div>{term.abbreviation}</div>
                    <p>{term.description}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </>
    </Layout>
  );
};

export default Home;
