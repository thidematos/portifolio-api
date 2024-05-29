import { NavBar } from "./../components/NavBar";
import Hero from "./../components/Hero";
import { Works } from "./../components/Works";
import Reports from "./../components/Reports";
import Benefits from "./../components/Benefits";
import WorkFlow from "./../components/WorkFlow";
import AskedQuestions from "./../components/AskedQuestions";
import Ending from "./../components/Ending";
import Footer from "./../components/Footer";
import { useState } from "react";
//<Reports />
function Portifolio({ isMobile }) {
  return (
    <>
      <div className="relative flex min-h-screen w-screen flex-col items-center justify-start overflow-x-hidden bg-slate-50 pb-16">
        <WelcomePage>
          <NavBar isMobile={isMobile}></NavBar>
          <Hero isMobile={isMobile}></Hero>
        </WelcomePage>
        <Works />
        <Benefits isMobile={isMobile} />
        <WorkFlow isMobile={isMobile} />
        <AskedQuestions />
        <Ending />
      </div>
      <Footer
        bgColor={"bg-slate-50"}
        padding={"py-6"}
        fontSize={"text-sm md:text-base lg:text-xs xl:text-sm 3xl:text-base"}
        textColor={"text-gray-500"}
      />
    </>
  );
}

function WelcomePage({ children }) {
  return (
    <div className="flex h-screen w-screen flex-col items-center  md:h-auto md:justify-start lg:h-screen lg:justify-evenly">
      {children}
    </div>
  );
}

export default Portifolio;
