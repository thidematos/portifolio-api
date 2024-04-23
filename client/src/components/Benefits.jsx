import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cube';
import 'swiper/css/pagination';

function Benefits({ isMobile }) {
  return (
    <section
      className="relative lg:min-h-screen w-full bg-zinc-800 overflow-hidden flex flex-col justify-evenly items-center py-16 md:px-0 md:py-24 lg:px-8 xl:px-24 2xl:px-36 lg:py-20 xl:py-24 2xl:py-28 3xl:py-36"
      id="beneficios"
    >
      <BackgroundGradient />
      <BenefitsTitle />
      <TilesBox />
      <HugeTile isMobile={isMobile} />
      <div className="flex flex-col justify-center items-center gap-6 pt-[260px] md:pt-0 w-[80%] md:w-[90%] lg:w-[70%]">
        <div className="flex flex-row w-full justify-center items-center flex-wrap md:flex-nowrap gap-4 md:gap-6">
          <BigTile
            padding={'pl-8 lg:pl-6 xl:pl-8 2xl:pl-16 '}
            width={'w-full md:w-[50%]'}
          >
            <BigTileImgContent title={'Códigos limpos e eficientes.'}>
              <img
                src="jsx.png"
                alt=""
                className="rounded-xl border-l border-t border-gray-400  h-full lg:h-auto"
              ></img>
            </BigTileImgContent>
          </BigTile>
          <BigTile padding={''} width={'w-full md:w-[50%]'}>
            <BigTileImgContent
              title={'Projetos Ágeis.'}
              paddingLeft="px-8 md:px-10"
            >
              <div className="w-full border-t border-gray-400 font-poppins flex flex-col justify-start items-center h-full luminous">
                <div className="relative mt-8 md:mt-10 lg:mt-8 xl:mt-10 2xl:mt-12">
                  <h6 className="text-xl md:text-2xl lg:text-xl xl:text-2xl 2xl:text-3xl 3xl:text-4xl text-zinc-700">
                    Meses
                  </h6>
                  <div className="absolute w-[110%] h-[4px] bg-zinc-700 top-[52%] ml-[-5%]"></div>
                </div>
                <h6 className="text-2xl md:text-3xl lg:text-2xl xl:text-3xl 2xl:text-4xl 3xl:text-5xl textGradient">
                  Semanas
                </h6>
              </div>
            </BigTileImgContent>
          </BigTile>
        </div>
      </div>
      <ResponsiveTile isMobile={isMobile} />
    </section>
  );
}

function BenefitsTitle() {
  return (
    <div className="flex flex-col justify-center items md:w-[45%] z-10 mb-16 md:mb-20 xl:mb-24 2xl:mb-28 3xl:mb-36">
      <h6 className="benefitsTitle">Transforme sua marca.</h6>
      <h6 className="benefitsTitle">Crie novas tendências.</h6>
    </div>
  );
}

function ResponsiveTile({ isMobile }) {
  return (
    <div className="w-[80%] md:w-[90%] lg:w-[70%] border border-gray-400 bg-kindBlack h-[240px] md:h-[270px] lg:h-[240px] xl:h-[270px] 2xl:h-[300px] 3xl:h-[356px] my-4 md:my-6 z-10 rounded-xl shadow-lg font-poppins flex flex-row justify-start items-center flex-wrap md:flex-nowrap px-6 md:px-8 lg:px-6 xl:px-8 2xl:px-10 3xl:px-16 gap-4 mb-40 md:mb-0">
      <div className="w-full md:w-[30%] lg:w-[25%] h-full flex flex-col justify-center">
        <h6 className="font-poppins text-gray-50 text-lg lg:text-base xl:text-lg 2xl:text-xl 3xl:text-2xl pb-8">
          Interfaces responsivas.
        </h6>
        <p className="font-poppins text-gray-400 tracking-wide text-sm lg:text-xs xl:text-sm 3xl:text-base drop-shadow-lg pl-2">
          Experiências únicas para cada dispositivo. Aumente o engajamento e as
          conversões em todas as plataformas.
        </p>
      </div>
      {isMobile ? (
        <img src="./mocks.png" alt="" className="w-full scale-125 mt-4"></img>
      ) : (
        <div className="w-full md:w-[70%] lg:w-[75%] h-full relative flex flex-col justify-end items-center overflow-hidden luminous">
          <img
            src="notebook-mock.png"
            alt=""
            className="md:w-[85%] lg:w-[75%] xl:w-[80%] 2xl:w-[75%] 3xl:w-[70%] absolute left-[10%] opacity-90 brightness-90"
          ></img>
          <img
            src="phone-mock.png"
            alt=""
            className="w-[20%] absolute left-1 top-[40%] brightness-[.85]"
          ></img>
          <img
            src="tablet-mock.png"
            alt=""
            className="md:w-[32%] 3xl:w-[30%] bottom-[7%] left-[67%] absolute brightness-[.85]"
          ></img>
        </div>
      )}
    </div>
  );
}

function TilesBox() {
  return (
    <div className="flex flex-row justify-center items-center flex-wrap md:flex-nowrap w-[80%] md:w-[90%] lg:w-[70%] gap-4">
      <div className="flex flex-col justify-center items-center gap-4 w-full md:w-[50%] z-10">
        <div className="flex flex-row justify-center items-center gap-4 w-full">
          <Tile subText={'completos'} width={'w-[50%] md:w-[48%] lg:w-[50%]'}>
            Apps
          </Tile>
          <Tile subText={'experiência'} width={'w-[50%] md:w-[48%] lg:w-[50%]'}>
            2
            <span className="md:text-2xl xl:text-2xl 3xl:text-3xl text-gray-100 self-end">
              anos
            </span>
          </Tile>
        </div>
        <div className="flex flex-row justify-center items-center gap-4 w-full">
          <Tile subText={'inovadores'} width={'w-[50%] md:w-[48%] lg:w-[50%]'}>
            Designs
          </Tile>
          <Tile subText={'pages'} width={'w-[50%] md:w-[48%] lg:w-[50%]'}>
            Landing
          </Tile>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-4 w-full md:w-[50%] z-10">
        <BigTile
          padding={'p-10 md:p-8 xl:p-12 2xl:p-16 3xl:p-20'}
          width={'w-full'}
        >
          <BiggerTilesContent
            title={'Apps inovadores com designs modernos e funcionais.'}
            textWidth={'text-xs md:text-sm lg:text-xs xl:text-sm 3xl:text-base'}
          >
            Meu método de trabalho valoriza cada detalhe que torna um aplicativo
            único, desde a escolha da tipografia até a paleta de cores e a
            experiência do usuário. Juntos, construíremos um projeto que atenda
            todas as necessidades e objetivos de seu negócio.
          </BiggerTilesContent>
        </BigTile>
      </div>
    </div>
  );
}

function Tile({ children, subText, width }) {
  return (
    <div
      className={`flex flex-col justify-center items-center border border-gray-400 ${width} p-14 bg-kindBlack font-roboto text-gray-50 rounded-xl gap-2 h-[110px] md:h-[140px] lg:h-[110px] xl:h-[140px] 2xl:h-[170px] shadow-lg`}
    >
      <h6 className="text-xl md:text-2xl lg:text-xl xl:text-2xl 2xl:text-3xl 3xl:text-4xl flex flex-row justify-center gap-2">
        {children}
      </h6>
      <h6 className="text-sm md:text-base lg:text-sm xl:text-base 3xl:text-lg text-gray-400 drop-shadow-lg">
        {subText}
      </h6>
    </div>
  );
}

function BigTileImgContent({ title, children, paddingLeft = '' }) {
  return (
    <div className="flex flex-col justify-start items-start rounded-xl overflow-hidden w-full h-full">
      <h6
        className={`${paddingLeft} font-poppins text-gray-50 py-10 xl:py-14 text-lg md:text-2xl lg:text-lg xl:text-2xl drop-shadow-lg tracking-tighter`}
      >
        {title}
      </h6>

      {children}
    </div>
  );
}

function BigTile({ children, padding, width }) {
  return (
    <div
      className={`flex flex-col justify-center items-center border border-gray-400 ${padding} bg-kindBlack font-roboto text-gray-50 rounded-xl h-[240px] md:h-[295px] lg:h-[240px] xl:h-[295px] 2xl:h-[356px] ${width} gap-6 shadow-lg z-10`}
    >
      {children}
    </div>
  );
}

function BiggerTilesContent({ title, children, textWidth }) {
  return (
    <>
      <h6 className="font-poppins text-gray-50 text-base md:text-lg lg:text-base xl:text-lg 2xl:text-xl 3xl:text-2xl drop-shadow-lg tracking-tighter">
        {title}
      </h6>
      <p
        className={`font-poppins text-gray-400 tracking-wide drop-shadow-lg ${textWidth}`}
      >
        {children}
      </p>
    </>
  );
}

function HugeTile({ isMobile }) {
  return (
    <div className="w-[80%] md:w-[90%] lg:w-[70%] border border-gray-400 h-[250px] md:h-[270px] lg:h-[250px] xl:h-[300px] 2xl:h-[356px] my-4 md:my-6 z-10 rounded-xl shadow-lg font-poppins flex flex-row justify-center items-center flex-wrap md:flex-nowrap">
      <div className="flex flex-col justify-center items-start w-full md:w-[50%] h-full gap-6 bg-kindBlack p-8 md:p-16 rounded-xl md:rounded-l-xl md:rounded-r-none luminous">
        <BiggerTilesContent
          title={'Apps Full-Stack.'}
          textWidth={'text-sm 2xl:text-base'}
        >
          Utilizo o conjunto mais atual de tecnologias do mercado. Interfaces,
          lógicas de negócio, banco de dados e hospedagem: entrego seu App
          pronto para a produção.
        </BiggerTilesContent>
      </div>
      <div className="w-full md:w-[50%] h-full">
        <MySwiper isMobile={isMobile} />
      </div>
    </div>
  );
}

function MySwiper({ isMobile }) {
  return (
    <>
      <Swiper
        pagination={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
        modules={[Pagination, Autoplay]}
        className={` h-full w-full bg-transparent`}
      >
        <SwiperSlide>
          <ImgSlide src={'react.png'} />
        </SwiperSlide>
        <SwiperSlide>
          <ImgSlide src={'node.png'} />
        </SwiperSlide>
        <SwiperSlide>
          <ImgSlide src={'mongo.png'} />
        </SwiperSlide>
        <SwiperSlide>
          <ImgSlide src={'tailwind.png'} />
        </SwiperSlide>
        <SwiperSlide>
          <ImgSlide src={'aws.png'} />
        </SwiperSlide>
        <SwiperSlide>
          <ImgSlide src={'photoshop.png'} />
        </SwiperSlide>
        <SwiperSlide>
          <ImgSlide src={'github.png'} />
        </SwiperSlide>
      </Swiper>
    </>
  );
}

function ImgSlide({ src }) {
  return (
    <div className="forceFlex flex-col justify-center items-center h-full">
      <img src={src} alt="" className="w-[45%]" />
    </div>
  );
}

function BackgroundGradient() {
  return (
    <div className="absolute w-full h-full blur-[180px]">
      <div className="absolute w-[60%] h-[60%] top-[35%] left-[20%] opacity-60 gradientOverlay  bg-center"></div>
    </div>
  );
}

export default Benefits;
