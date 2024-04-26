function ProgressBar({ progress, steps, position = '' }) {
  const progressPercentage = (100 / steps) * progress;

  return (
    <div
      className={`w-[60%] md:w-[40%] lg:w-[30%] bg-gray-300 h-[10px] lg:h-[7px] xl:h-[10px] rounded-xl shadow-xl mt-12 ${position}`}
    >
      <div
        style={{ width: `${progressPercentage}%` }}
        className={` bg-blue-500 h-[10px] lg:h-[7px] xl:h-[10px] rounded-xl duration-500 origin-left`}
      ></div>
    </div>
  );
}

export default ProgressBar;
