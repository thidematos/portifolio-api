function DialogueBox({
  children,
  notification,
  fontSize,
  textColor,
  bgColor,
  width,
  position,
  margin,
}) {
  return (
    <div
      className={`${margin} ${bgColor} ${width} ${position} flex flex-col justify-center items-center py-8 px-6 rounded-md shadow-xl`}
    >
      <h1 className={`font-poppins ${fontSize} ${textColor} text-center`}>
        {notification}
      </h1>
      {children}
    </div>
  );
}

export default DialogueBox;
