import axios from 'axios';
import { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';

function Generate() {
  const [html, setHtml] = useState('');

  useEffect(() => {
    const getHTML = async () => {
      const res = await axios.get('/api/v1/codice/66308c0db1e353e46a4c5f05');

      setHtml(res.data.data.codice.content);
    };

    getHTML();
  }, []);

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
