import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, EffectCards } from 'swiper/modules';
import { Title } from './Works';

import 'swiper/css';
import 'swiper/css/effect-cards';

function Reports() {
  return (
    <section
      className="w-full min-h-screen py-16 md:py-28 lg:py-16 xl:py-20 2xl:py-24 3xl:py-36 md:min-h-0 lg:min-h-screen flex flex-col justify-evenly md:justify-start items-center"
      id="relatos"
    >
      <Title>O que meus clientes estão dizendo.</Title>
      <SwiperCards />
    </section>
  );
}

function SwiperCards() {
  const reports = [
    {
      photo: 'tiffany.png',
      report:
        'Thiago exceeded our expectations on implementation and collaboration. His detail orientation and deep implementation expertise elevated our designs. Thiago truly owns his craft.',
      name: 'Tiffany Chang',
      position: 'Product Manager',
      logoImg: 'palo-alto.png',
    },
    {
      photo: 'zeno.png',
      report:
        'Thiago is a wow factor machine. He understands the value of micro interactions aand is able to execute them to perfection. Definitely a world-class partner to have',
      position: 'Product Manager',
      name: 'Zeno Totmet',
      logoImg: 'fiap.png',
    },
  ];

  return (
    <Swiper
      modules={[EffectCards]}
      effect={'cards'}
      className="w-[80%] md:w-[45%] lg:w-[25%] h-[450px] lg:h-[350px] xl:h-[400px] 2xl:h-[450px] 3xl:h-[525px] rounded-2xl mt-16"
      loop={true}
    >
      {reports.map((report, ind) => (
        <SwiperSlide
          className="bg-gray-50 forceFlex flex-col justify-between items-start p-8 md:p-10 lg:p-8 2xl:p-10 3xl:p-16 rounded-2xl shadow-xl border border-gray-300"
          key={ind}
        >
          <CardContent report={report} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

function CardContent({ report }) {
  return (
    <>
      <img
        src={report.photo}
        alt=""
        className=" rounded-lg lg:w-[25%] xl:w-[20%]"
      ></img>
      <p className=" font-noto text-gray-900 text-base lg:text-sm xl:text-base 2xl:text-lg 3xl:text-xl leading-relaxed">
        {report.report}
      </p>
      <div className="flex flex-row justify-between items-center w-full">
        <div className="flex flex-col justify-center items-start gap-2">
          <p className=" font-poppins text-gray-800 font-bold text-sm md:text-base lg:text-sm xl:text-base 3xl:text-lg">
            {report.name}
          </p>
          <p className=" font-poppins text-xs md:text-sm lg:text-xs xl:text-sm 3xl:text-base text-gray-500">
            {report.position}
          </p>
        </div>
        <img
          src={report.logoImg}
          alt=""
          className="w-[40%] lg:w-[35%] xl:w-[40%]"
        ></img>
      </div>
    </>
  );
}

export default Reports;
