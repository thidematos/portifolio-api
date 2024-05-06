function ColorInput({ label, color, direction, onChangeColor }) {
  return (
    <div className="flex flex-col justify-center items-center relative gap-2">
      <p>{label}</p>
      <input
        type="color"
        id="picker"
        value={color[direction]}
        onChange={(e) => onChangeColor(e, direction)}
        className="inputColor"
      />
    </div>
  );
}

export default ColorInput;
