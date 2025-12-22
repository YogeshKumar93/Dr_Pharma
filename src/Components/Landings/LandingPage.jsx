import { useEffect } from "react";
 
import LandingPageIntro from "./LandingpageIntro";
import { Helmet } from "react-helmet-async";
import { CartProvider } from "../../Contexts/CartContext";
 
 
 

const LandingPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <>
      <Helmet>
        <title>Dr. Pharma</title>
        <meta name="description" content="Pharma - Secure Platform" />
      </Helmet>
 
      <LandingPageIntro />
       {/* <Route path="/categories" element={<Categories />} /> */}
  
      
    </>
  );
};

export default LandingPage;
