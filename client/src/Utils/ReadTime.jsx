import DOMPurify from "dompurify";

class ReadTime {
  constructor() {}

  countWords(parent) {
    const elements = [...parent.querySelectorAll("p")];

    const numWords = elements.reduce((acc, el) => {
      if (!el.textContent) return acc;

      const words = el.textContent.split(" ").length;

      return (acc += words);
    }, 0);

    return numWords;
  }

  calcReadTime(content) {
    const averageReadSpeed = 130;
    const contentHTML = new DOMParser().parseFromString(
      DOMPurify.sanitize(content),
      "text/html",
    );
    const readTime = contentHTML
      ? Math.round(this.countWords(contentHTML) / averageReadSpeed)
      : 0;

    return readTime;
  }
}

export default ReadTime;
