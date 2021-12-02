import React, { useEffect } from "react";

import Layout from "../components/Layout";
import BoxWithLogo from "../components/shared/BoxWithLogo";
import Seo from "../components/seo";

const ThankYou = ({ location }) => {
  const { adsTracking = {} } = location.state || {};

  // conversion tracking code with safeguards against non-production environments
  useEffect(() => {
    typeof window !== "undefined" &&
      typeof window?.gtag === "function" &&
      window.gtag("event", "conversion", {
        send_to: "AW-943271359/NoDFCMXbkuEBEL_b5MED",
        ...adsTracking,
      });
  }, [adsTracking]);

  return (
    <Layout>
      <Seo title="Thank You" />
      <BoxWithLogo>
        <h2>See you in class!</h2>
        <p>A confirmation email will be sent shortly.</p>
      </BoxWithLogo>
    </Layout>
  );
};

export default ThankYou;
