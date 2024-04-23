function ProjectLogo({ work, padding, width, margin }) {
  return (
    <div
      className={` ${padding} ${margin} flex flex-col justify-center items-center rounded-xl`}
    >
      <img src={`/${work.projectLogo}`} className={`${width}`} />
      <h1 className="font-poppins text-xl text-gray-700 mt-6 tracking-wider">
        {work.title?.toUpperCase()}
      </h1>
    </div>
  );
}

export default ProjectLogo;
