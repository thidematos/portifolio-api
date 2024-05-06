function countWords(parent) {
  const elements = [...parent.querySelectorAll('p')];

  const numWords = elements.reduce((acc, el) => {
    if (!el.textContent) return acc;

    const words = el.textContent.split(' ').length;

    return (acc += words);
  }, 0);

  return numWords;
}

export default countWords;
