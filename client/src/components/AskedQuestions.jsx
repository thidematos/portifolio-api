import { useState } from 'react';

function AskedQuestions() {
  return (
    <section className=" md:min-h-auto lg:min-h-screen w-full flex flex-col justify-start items-center py-20 md:py-24 lg:py-20 xl:py-24 2xl:py-28 3xl:py-36">
      <QuestionsTitle />
      <Accordion />
    </section>
  );
}

function QuestionsTitle() {
  return (
    <h6 className="font-poppins text-2xl md:text-3xl lg:text-2xl xl:text-3xl 2xl:text-4xl 3xl:text-6xl text-gray-800">
      Perguntas frequentes.
    </h6>
  );
}

function Accordion() {
  const faq = [
    {
      question: 'Quais são os serviços que você oferece?',
      answer:
        'Atuo em todas as etapas de confecção de um aplicativo: desde a criação da interface gráfica até o desenvolvimento da lógica interna e modelagem de banco de dados. Trabalho com aplicações para navegadores, mobile e desktop.',
    },
    {
      question: 'E em relação ao Design do produto?',
      answer:
        'Posso construir algo do zero, a partir das características de sua marca. Assim como, posso desenvolver com base em algum layout ou mock-up/protótipo prévio.',
    },
    {
      question: 'Quanto custa um projeto?',
      answer:
        'Os valores variam de acordo com a complexidade do projeto. Os preços variam de R$1000 (budget mínimo para o meu trabalho) até R$7000.',
    },
    {
      question: 'Do you work internationally?',
      answer:
        "Yes. I'm from Brazil. But, if You are at any other country and speak English (or Portuguese, of course), I believe we are good to go.",
    },
    {
      question: 'Qual a forma de pagamento por um projeto?',
      answer:
        '50% do valor no início e os outros 50% após o lançamento. Esses termos podem ser ajustados com base na complexidade do projeto.',
    },
    {
      question: 'Quanto tempo leva para um projeto ser finalizado?',
      answer:
        'A maioria dos projetos levará entre 3 semanas e 3 meses para serem finalizados.',
    },
  ];

  const [accordion, setAccordion] = useState(null);

  const toggleAccordion = (num) => {
    if (num === accordion) return setAccordion(null);

    setAccordion(num);
  };

  return (
    <ul className="w-[90%] md:w-[60%] lg:w-[45%] xl:w-[35%] flex flex-col justify-center items-center pt-12">
      {faq.map((ask, ind) => (
        <AccordionItem
          ask={ask}
          num={ind}
          accordion={accordion}
          key={ind}
          handleAccordion={toggleAccordion}
        />
      ))}
    </ul>
  );
}

function AccordionItem({ ask, num, accordion, handleAccordion }) {
  return (
    <li className="listParent w-full font-poppins border-b border-gray-300 relative">
      <div className="flex flex-row justify-between items-baseline w-full">
        <h6 className="w-[90%] py-8 text-gray-700 text-base md:text-lg lg:text-base xl:text-lg 2xl:text-xl 3xl:text-2xl tracking-tight">
          {ask.question}
        </h6>
        <img
          src="plus-close.png"
          alt=""
          className={`h-[15px] w-[15px] duration-200 opacity-85 ${
            accordion === num ? '' : 'rotate-45'
          }`}
        ></img>
      </div>

      <p
        className={`${
          accordion === num ? 'opennedAccordion' : 'closedAccordion'
        } duration-200 text-xs md:text-sm lg:text-xs xl:text-sm 3xl:text-base text-gray-500`}
      >
        {ask.answer}
      </p>
      <div
        className="absolute w-full h-full z-10 top-0 left-0"
        onClick={(e) => handleAccordion(num)}
      ></div>
    </li>
  );
}

export default AskedQuestions;
