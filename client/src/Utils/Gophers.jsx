function Gophers({ gophers = 155, isLikeGopher = false }) {
  if (isLikeGopher)
    return (
      <img
        src="/gopher-like.png"
        onClick={() => isLikeGopher.onGopher()}
        className={`${isLikeGopher.width} ${isLikeGopher.position} ${isLikeGopher.isLiked ? "grayscale-[50%]" : "grayscale"} rounded-full border border-blue-500  `}
      />
    );

  return (
    <div className="flex flex-row items-center justify-center gap-1 ">
      <img
        src="/gopher-like.png"
        className="w-[30%] rounded-full border border-blue-500  grayscale-[50%]"
      />
      <span>{gophers}</span>
    </div>
  );
}

export default Gophers;
