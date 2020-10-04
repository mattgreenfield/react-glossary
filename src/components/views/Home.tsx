import React, { FunctionComponent, useEffect, useRef } from "react";
import Layout from "../layouts/Default";
// import Button from "../atoms/Button";
import InputText from "../atoms/InputText";
import AZNav from "../AZNav";
import allTerms from "../../data.json";

interface Term {
  _id: string;
  term: string;
  description: string;
  abbreviation?: string;
  tags?: Object;
}

const Home: FunctionComponent = () => {
  const [termsByLetter, setTermsByLetter] = React.useState(
    {} as { [key: string]: Term[] }
  );
  const [search, setSearch] = React.useState("");
  const [currentLetter, setCurrentLetter] = React.useState("A");

  /**
   * Takes 'allTerms' and groups them by letter
   */
  useEffect(() => {
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
    setTermsByLetter(ordered);
  }, []);
  // }, [allTerms]);

  /**
   * Intersection observor for when an element is 1px off the screen, used to detect position: sticky
   */
  const viewPortHeight = window.innerHeight;
  const observer = new IntersectionObserver(
    // Attempting to fix the issue when scrolling fast as there's more than one el in 'visibleHeaders'
    // no avail
    // (visibleHeaders) => {
    //   const orderedAZ = visibleHeaders.sort(
    //     (a, b) => a.boundingClientRect.y - b.boundingClientRect.y
    //   );
    //   const [e] = orderedAZ;
    //   console.log(
    //     orderedAZ.length,
    //     orderedAZ.map((e) => e.target.innerHTML)
    //   );
    //   // },
    ([e]) => {
      // const intersectionRatio = e.intersectionRatio;
      // const isIntersecting = e.isIntersecting;
      const letter = e.target.innerHTML;
      // console.log(letter, e);
      const pixelsFromTop = e.boundingClientRect.y;
      console.log(letter, pixelsFromTop);

      // If it's not full visible AND not fully hidden, then it's sticky, becuase of the -1px hack we have
      if (pixelsFromTop === 0) {
        setCurrentLetter(letter);
      }
    },
    {
      threshold: [1],
      rootMargin: `0px 0px -${viewPortHeight - 39}px 0px`,
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
        <InputText
          label="Search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <AZNav currentLetter={currentLetter} />
        <ol type="A">
          {Object.keys(termsByLetter).map((letter) => (
            <li className="relative" key={letter}>
              <h3
                ref={(element) => (headerRefs.current[letter] = element)}
                className="text-xl font-black sticky top-0 p-1 bg-white border-solid border-b border-black"
                // style={{ top: "-1px", paddingTop: "1px" }}
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
