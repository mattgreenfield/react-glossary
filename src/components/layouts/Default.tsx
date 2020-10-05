import React, { FunctionComponent, useEffect, useState } from "react";
import InputText from "../atoms/InputText";
import { useHistory } from "react-router";

const DefaultLayout: FunctionComponent = ({ children }) => {
  const [search, setSearch] = useState("");
  const history = useHistory();

  // TODO: debounce setSearch
  useEffect(() => {
    history.push({ search: `?search=${search}` });
  }, [search, history]);

  return (
    <>
      <nav className="fixed top-0 border-solid border-gray-600 border-b p-4 w-full bg-white z-10">
        <div className="text-xl font-black">GLOSSARY</div>
      </nav>
      <div className="max-w-lg mx-auto mt-32">
        <header className="mb-24 bg-gray-100 p-4 rounded">
          <div className="mb-4">
            <InputText
              label="Search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
          <ul>
            {[1, 2, 3, 4, 5].map((tag) => (
              <li
                className="bg-gray-300 rounded mr-2 py-1 px-2 inline-block text-sm"
                key={tag}
              >
                Tag {tag}
              </li>
            ))}
          </ul>
        </header>
        <main>{children}</main>
      </div>
      <footer className="border-solid border-gray-600 border-t pt-3 mt-20 mb-8">
        made by Matt
      </footer>
    </>
  );
};

export default DefaultLayout;
