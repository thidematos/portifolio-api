import { NavBar } from './../components/NavBar';
import Hero from './../components/Hero';
import { Works } from './../components/Works';
import Reports from './../components/Reports';
import Benefits from './../components/Benefits';
import WorkFlow from './../components/WorkFlow';
import AskedQuestions from './../components/AskedQuestions';
import Ending from './../components/Ending';
import Footer from './../components/Footer';

function Portifolio({ isMobile }) {
  return (
    <>
      <div className="overflow-x-hidden w-screen flex flex-col justify-start items-center min-h-screen bg-slate-50 pb-16 relative">
        <WelcomePage>
          <NavBar isMobile={isMobile}></NavBar>
          <Hero isMobile={isMobile}></Hero>
        </WelcomePage>
        <Works />
        <Reports />
        <Benefits isMobile={isMobile} />
        <WorkFlow isMobile={isMobile} />
        <AskedQuestions />
        <Ending />
      </div>
      <Footer
        bgColor={'bg-slate-50'}
        padding={'py-6'}
        fontSize={'text-sm md:text-base lg:text-xs xl:text-sm 3xl:text-base'}
        textColor={'text-gray-500'}
      />
    </>
  );
}

function WelcomePage({ children }) {
  return (
    <div className="w-screen flex flex-col md:justify-start lg:justify-evenly  items-center h-screen md:h-auto lg:h-screen">
      {children}
    </div>
  );
}

export default Portifolio;
