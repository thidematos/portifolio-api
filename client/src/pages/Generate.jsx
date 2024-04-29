import axios from 'axios';
import { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';

function Generate() {
  const [html, setHtml] = useState('');

  useEffect(() => {
    const getHTML = async () => {
      const res = await axios.get('/api/v1/codice/662f018cc4a022021fded1bd');

      setHtml(res.data.data.codice.content);
    };

    getHTML();
  }, []);

  function getHTML(html) {
    const domParsed = new DOMParser().parseFromString(html, 'text/html');
    return domParsed.body.textContent;
  }

  return (
    <>
      <div
        id="container"
        dangerouslySetInnerHTML={{
          __html:
            '<p class="font-noto text-gray-800 ">Hello World!</p><p class="font-noto text-gray-800 "><img class="tipImg my-4" src="/aws.png" title="asda"><img class="tipImg my-4" src="/react.png" title="galax">asdasda</p><h2 class="tracking-widest text-2xl font-noto text-gray-800" style="text-align: center">TESTE</h2>',
        }}
      ></div>
      <div
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(html),
        }}
      ></div>
    </>
  );
}

export default Generate;
