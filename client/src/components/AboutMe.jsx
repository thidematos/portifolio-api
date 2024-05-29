function AboutMe() {
  return (
    <div className=" relative flex h-full w-full flex-col items-start justify-start overflow-hidden p-8 md:px-14 md:py-10 lg:py-8 2xl:py-10 3xl:py-16">
      <h1 className="font-poppins text-lg text-gray-800 md:text-2xl lg:text-lg xl:text-2xl 2xl:text-3xl 3xl:text-4xl">
        Sobre Thiago.
      </h1>
      <div className="categoriesScroll z-10 flex h-[80%] flex-col items-center justify-start overflow-y-scroll">
        <p className="mt-4 font-poppins text-xs leading-relaxed tracking-wide text-gray-500 md:w-[90%] md:text-sm lg:mb-4 lg:text-xs xl:mb-4 xl:text-sm 2xl:w-[85%] 3xl:mt-6">
          Meu interesse por tecnologia começou logo quando tinha 13 anos. Nessa
          época, eu passava a maior parte do meu dia jogando com os meus amigos.
          Mas, nem sempre o meu velho guerreiro (apelido carinhoso que demos ao
          meu notebook) rodava bem os jogos. Como sempre fui bem insistente,
          fazia de tudo para otimizar meu sistema, até que os jogos funcionassem
          minimamente. Consigo sentir até hoje a alegria que dava abrir o jogo
          sem que o notebook travasse!
        </p>
        <h2 className="mt-4 font-poppins text-gray-800 md:text-lg lg:mt-0 lg:text-base xl:text-lg 3xl:text-xl">
          Sonhos vêm, sonhos vão.
        </h2>
        <p className="mt-4 font-poppins text-xs leading-relaxed tracking-wide text-gray-500 md:w-[90%] md:text-sm lg:mb-6 lg:text-xs xl:mb-8 xl:text-sm 2xl:w-[85%]">
          O tempo passou. Me graduei em História pela Universidade Federal de
          Ouro Preto. Atualmente, já há dois anos, voltei ao mundo da tecnologia
          e estou cursando Sistemas de Informação na Universidade Federal de
          Uberlândia. Descobri minha sensibilidade para projetar sistemas. E,
          hoje, essa se tornou minha profissão.
        </p>
      </div>
      <img
        src="draw-signature.png"
        alt=""
        className="mt-4 w-[70%] opacity-85 md:mt-6 md:w-[60%] lg:mt-0 lg:w-[50%] xl:w-[45%] 2xl:w-[60%]"
      ></img>
      <img
        src="me.png"
        alt=""
        className="me absolute bottom-0 right-[-35%] opacity-25 grayscale-[50%] md:w-[90%] lg:w-auto xl:w-[85%] 3xl:w-[90%]"
      ></img>
    </div>
  );
}

export default AboutMe;
