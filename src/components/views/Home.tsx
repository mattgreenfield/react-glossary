import React, { FunctionComponent } from "react";
import Layout from "../layouts/Default";
import Button from "../atoms/Button";
import InputText from "../atoms/InputText";

const Home: FunctionComponent = () => {
  return (
    <Layout>
      <div>
        <Button>Click</Button>
        <InputText label="Search" />
      </div>
    </Layout>
  );
};

export default Home;
