function ProjectDetails({ project, onCloseProject }) {
  return (
    <div className="w-full h-full flex-col justify-center items-center mb-8 ">
      <Hero>
        <Title
          fontSize="text-4xl md:text-5xl lg:text-3xl 2xl:text-4xl"
          textAlign="text-center"
        >
          {project.title.toUpperCase()}
        </Title>
        <TextBlock
          textAlign="text-center"
          fontSize="text-base md:text-lg lg:text-sm 2xl:text-lg"
          color="text-gray-600"
          width="w-[85%] md:w-[65%]"
          padding="md:py-8"
        >
          {project.description}
        </TextBlock>
        <Button
          bgColor="bg-blue-500"
          color="text-neutral-50"
          margin="my-3"
          link={project.link}
          fontSize="text-lg md:text-xl lg:text-base"
          width="w-[150px] md:w-[200px] lg:w-[140px]"
        />
        <img
          src={project.mainImg}
          alt=""
          className="w-[99%] md:w-[40%] lg:w-[30%] rounded-lg border border-gray-300 mt-3"
        ></img>
      </Hero>
      <Title
        fontSize="text-2xl md:text-3xl lg:text-2xl 2xl:text-3xl"
        width="w-full"
        textAlign="text-center"
        padding="pt-16"
      >
        {project.subTitle}
      </Title>
      {project.sections.map((section, ind) => (
        <Section
          key={section.title}
          bgColor={ind % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
          flexDirection={
            (ind + 1) % 2 === 0
              ? 'flex-col md:flex-row'
              : 'flex-col md:flex-row-reverse'
          }
          padding={'pt-16 md:py-16 2xl:p-24'}
        >
          <div className="w-full md:w-[60%] flex flex-col justify-center items-center">
            <Title
              fontSize="text-xl md:text-2xl lg:text-xl 2xl:text-2xl"
              width="w-[90%] md:w-[85%]"
              textAlign="text-left"
              padding={`${ind + 1 === 1 ? 'pt-16 md:pt-0' : ''}`}
            >
              {section.title}
            </Title>
            <TextBlock
              textAlign="text-left"
              fontSize="text-sm md:text-base lg:text-sm 2xl:text-base"
              color="text-gray-600"
              width="w-[90%] md:w-[85%]"
            >
              {section.description}
            </TextBlock>
          </div>
          <img
            src={section.img}
            className={`w-[95%] md:w-[60%] lg:w-[40%] 2xl:w-[35%] border border-gray-300 drop-shadow-md ${
              (ind + 1) % 2 === 0
                ? 'self-end rounded-l-xl'
                : 'self-start rounded-r-xl'
            }`}
            alt=""
          ></img>
        </Section>
      ))}
      <div className="flex flex-col md:flex-row justify-center items-center w-full md:pb-16 2xl:px-36">
        <FinalDetails width="w-full md:w-[50%]">
          <div className="flex flex-row justify-center items-baseline gap-3">
            <Title
              width=""
              fontSize="text-2xl md:text-3xl lg:text-xl 2xl:text-2xl"
            >
              {project.title}
            </Title>
            <span className="font-poppins text-gray-600 md:text-lg lg:text-base 2xl:text-lg">
              {project.year}
            </span>
          </div>
          <TextBlock
            textAlign="text-center md:text-left"
            fontSize="text-base md:text-lg lg:text-sm 2xl:text-base"
            color="text-gray-700"
            width="w-[90%]"
          >
            {project.abilities}
          </TextBlock>
        </FinalDetails>
        <div className="flex flex-col justify-center items-center md:items-end pb-16 pt-6 md:pb-0 md:pt-16 md:pr-8 gap-4 w-full md:w-[50%] h-full">
          <Button
            bgColor={'bg-blue-500'}
            color={'text-neutral-50'}
            link={project.link}
            fontSize="text-lg lg:text-base"
            width="w-[150px]"
          />
          <Button
            type={'Fechar'}
            bgColor={'bg-gray-300'}
            onCloseProject={onCloseProject}
            fontSize="text-lg lg:text-base"
            width="w-[150px]"
          />
        </div>
      </div>
    </div>
  );
}

function Hero({ children }) {
  return (
    <div className="bg-white w-full flex flex-col justify-center items-center pt-16">
      {children}
    </div>
  );
}

function Section({ children, bgColor, flexDirection, padding }) {
  return (
    <div
      className={`${bgColor} ${padding} flex ${flexDirection}  justify-center items-center`}
    >
      {children}
    </div>
  );
}

function FinalDetails({ children, width }) {
  return (
    <div
      className={`${width} flex flex-col justify-center items-center md:items-start md:pl-8 h-full pt-16`}
    >
      {children}
    </div>
  );
}

function Title({
  fontSize = '',
  width = 'w-full',
  textAlign = '',
  padding = '',
  children,
}) {
  return (
    <h1
      className={`${fontSize} ${width} ${textAlign} ${padding} font-poppins tracking-wider drop-shadow-xl text-gray-800 `}
    >
      {children}
    </h1>
  );
}

function TextBlock({
  textAlign = '',
  fontSize = '',
  color = '',
  width = 'w-full',
  padding = '',
  children,
}) {
  return (
    <p
      className={`${padding} ${textAlign} ${fontSize} ${color} ${width} py-4 font-poppins`}
    >
      {children}
    </p>
  );
}

function Button({
  fontSize = '',
  type = 'Acessar site',
  color,
  bgColor,
  margin,
  width = '',
  link,
  onCloseProject = () => null,
}) {
  return (
    <button
      className={`${color} ${bgColor} ${margin} ${width} font-poppins ${fontSize} py-3 px-5 rounded-md shadow-md drop-shadow`}
      onClick={onCloseProject}
    >
      <a href={link} target="_blank" rel="noreferrer">
        {type}
      </a>
    </button>
  );
}

export default ProjectDetails;
