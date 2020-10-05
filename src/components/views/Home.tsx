import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import Layout from "../layouts/Default";
import { useLocation } from "react-router";

import AZNav from "../AZNav";
import allTerms from "../../data.json";

interface Term {
  _id: string;
  term: string;
  description: string;
  abbreviation?: string;
  tags?: Object;
}

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home: FunctionComponent = () => {
  const [termsByLetter, setTermsByLetter] = useState(
    {} as { [key: string]: Term[] }
  );

  const [currentLetter, setCurrentLetter] = useState("A");
  const searchTerm = useQuery().get("search");

  /**
   * Takes 'allTerms' and groups them by letter
   */
  useEffect(() => {
    /**
     * Filter all terms by the URL search query
     */
    let filteredTerms = allTerms;
    if (searchTerm) {
      filteredTerms = allTerms.filter((t) =>
        t.term.toLowerCase().includes(searchTerm)
      );
    }

    const groupedByLetter = filteredTerms.reduce((acc, term) => {
      const firstLetter = term.term.charAt(0).toUpperCase();
      if (acc[firstLetter]) {
        acc[firstLetter].push(term);
      } else {
        acc[firstLetter] = [term];
      }
      return acc;
    }, {} as { [key: string]: Term[] });

    /**
     * Sort the groups A-Z
     */
    const ordered = {} as { [key: string]: Term[] };
    Object.keys(groupedByLetter)
      .sort()
      .forEach((key) => {
        ordered[key] = groupedByLetter[key];
      });

    setTermsByLetter(ordered);
  }, [searchTerm]);
  // }, [allTerms]);

  /**
   * Intersection observor for when an element is 1px off the screen, used to detect position: sticky
   */
  const viewPortHeight = window.innerHeight;
  const observer = new IntersectionObserver(
    ([e]) => {
      const isIntersecting = e.isIntersecting;

      if (isIntersecting) {
        const letter = e.target.innerHTML;
        setCurrentLetter(letter);
      }
    },
    {
      threshold: [1],
      // Rather than the whole viewport, only observe the 39px box where the sticky items sit
      rootMargin: `-63px 0px -${viewPortHeight - (39 + 63)}px 0px`,
    }
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
    const elements = Object.values(headerRefs.current);
    const validElements = elements.filter((el) => !!el) as HTMLHeadingElement[];

    validElements.forEach((el) => observer.observe(el));

    // unmount
    return function () {
      // validElements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, [headerRefs, observer]);

  return (
    <Layout>
      <>
        <AZNav
          currentLetter={currentLetter}
          validLetters={Object.keys(termsByLetter)}
        />
        <ol type="A" style={{ marginTop: "-565px", minHeight: "565px" }}>
          {Object.keys(termsByLetter).map((letter) => (
            <li className="relative" key={letter} id={letter}>
              <h3
                ref={(element) => (headerRefs.current[letter] = element)}
                className="text-xl font-black sticky top-app-header p-1 bg-white border-solid border-b border-black"
              >
                {letter}
              </h3>
              <ul>
                {termsByLetter[letter].map((term) => (
                  <li className="mb-6" key={term._id}>
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
