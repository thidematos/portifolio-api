function ReadLater({ readLater = 36 }) {
  return (
    <div className="flex flex-row justify-center items-center gap-1 ">
      <img src="/bookmark-active.png" className="rounded-full w-[30%]" />
      <span>{readLater}</span>
    </div>
  );
}

export default ReadLater;
