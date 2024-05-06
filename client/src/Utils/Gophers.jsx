function Gophers({ gophers = 155 }) {
  return (
    <div className="flex flex-row justify-center items-center gap-1 ">
      <img
        src="/gopher-like.png"
        className="rounded-full w-[30%] border border-blue-500  grayscale-[50%]"
      />
      <span>{gophers}</span>
    </div>
  );
}

export default Gophers;
