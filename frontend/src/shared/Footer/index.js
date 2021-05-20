import React from "react";
import { PageFooter, TextFooter } from "../styles/index";
class Footer extends React.Component {
  render() {
    return (
      <PageFooter>
        <TextFooter>© Copyright 2020</TextFooter>
        <TextFooter style={{ fontWeight: "bold" }}>SiS Contabil</TextFooter>
      </PageFooter>
    );
  }
}

export default Footer;
