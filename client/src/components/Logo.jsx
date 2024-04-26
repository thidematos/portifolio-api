function Logo({ fontSize, margin = '' }) {
  return (
    <h1
      className={`font-roboto tracking-tighter text-gray-800 ${fontSize} drop-shadow-md ${margin}`}
    >
      Thiago L. Matos
    </h1>
  );
}

export default Logo;
