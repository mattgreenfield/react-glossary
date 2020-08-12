import React, { FunctionComponent } from "react";

const DefaultLayout: FunctionComponent = ({ children }) => {
  return (
    <div className="max-w-md mx-auto">
      <header className="text-4xl">My App</header>
      <main>{children}</main>
    </div>
  );
};

export default DefaultLayout;
