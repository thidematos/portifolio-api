function AboutMe() {
  return (
    <div className="flex flex-col justify-start items-start p-8 md:px-14 md:py-10 lg:py-8 2xl:py-10 3xl:py-16 h-full w-full relative overflow-hidden">
      <h1 className="font-poppins text-gray-800 text-lg md:text-2xl lg:text-lg xl:text-2xl 2xl:text-3xl 3xl:text-4xl">
        Sobre Thiago.
      </h1>
      <p className="font-poppins text-xs md:text-sm lg:text-xs xl:text-sm text-gray-500 tracking-wide leading-relaxed mt-4 3xl:mt-6 lg:mb-4 xl:mb-4 md:w-[90%] 2xl:w-[85%]">
        Meu interesse por tecnologia começou logo quando tinha 13 anos. Nessa
        época, eu passava a maior parte do meu dia jogando com os meus amigos.
        Mas, nem sempre o meu velho guerreiro (apelido carinhoso que demos ao
        meu notebook) rodava bem os jogos. Como sempre fui bem insistente, fazia
        de tudo para otimizar meu sistema, até que os jogos funcionassem
        minimamente. Consigo sentir até hoje a alegria que dava abrir o jogo sem
        que o notebook travasse!
      </p>
      <h2 className="font-poppins text-gray-800 mt-4 lg:mt-0 md:text-lg lg:text-base xl:text-lg 3xl:text-xl">
        Sonhos vêm, sonhos vão.
      </h2>
      <p className="font-poppins text-xs md:text-sm lg:text-xs xl:text-sm text-gray-500 tracking-wide leading-relaxed mt-4 lg:mb-6 xl:mb-8 md:w-[90%] 2xl:w-[85%]">
        O tempo passou. Me graduei em História pela Universidade Federal de Ouro
        Preto. Atualmente, já há dois anos, voltei ao mundo da tecnologia e
        estou cursando Sistemas de Informação na Universidade Federal de
        Uberlândia. Descobri minha sensibilidade para projetar sistemas. E,
        hoje, essa se tornou minha profissão.
      </p>
      <img
        src="draw-signature.png"
        alt=""
        className="mt-4 md:mt-6 lg:mt-0 w-[70%] md:w-[60%] lg:w-[50%] xl:w-[45%] 2xl:w-[60%] opacity-85"
      ></img>
      <img
        src="me.png"
        alt=""
        className="absolute md:w-[90%] lg:w-auto xl:w-[85%] 3xl:w-[90%] me grayscale-[50%] opacity-25 right-[-35%] bottom-0"
      ></img>
    </div>
  );
}

export default AboutMe;
