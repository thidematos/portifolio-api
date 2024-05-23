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
    <img
      src="/gopher-like.png"
      className={`w-[20%] rounded-full border border-blue-500  `}
    />
  );
}

export default Gophers;
