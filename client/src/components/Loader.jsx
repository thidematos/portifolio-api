function Loader({ width = 'w-full', margin = '', position, size = 120 }) {
  const numberSize = Number(size);

  return (
    <div
      className={`${width} ${margin} ${position} flex flex-row justify-center items-center`}
    >
      <div
        style={{
          border: `${numberSize / 7.5}px solid #f3f3f3`,
          borderTop: `${numberSize / 7.5}px solid #3498db`,
          height: `${numberSize}px`,
          width: `${numberSize}px`,
        }}
        className={`loader `}
      ></div>
    </div>
  );
}

export default Loader;
