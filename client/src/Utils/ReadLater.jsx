function ReadLater({
  readLater = 36,
  position,
  width = "w-[30%]",
  showCount = true,
  isToReadLater,
  action = () => null,
}) {
  return (
    <div className={`flex flex-row items-center justify-center gap-1 `}>
      <img
        src="/bookmark-active.png"
        className={`${position}  ${width} rounded-full ${isToReadLater ? "" : "grayscale"}`}
        onClick={() => action()}
      />
      {showCount && <span>{readLater}</span>}
    </div>
  );
}

export default ReadLater;
