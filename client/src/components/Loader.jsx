function Loader({ width = 'w-full', margin = '', position }) {
  return (
    <div
      className={`${width} ${margin} ${position} flex flex-row justify-center items-center `}
    >
      <div className="loader"></div>
    </div>
  );
}

export default Loader;
