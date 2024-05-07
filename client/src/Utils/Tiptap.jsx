// src/Tiptap.jsx
import {
  EditorProvider,
  FloatingMenu,
  BubbleMenu,
  useCurrentEditor,
} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TiptapMenu from './TiptapMenu';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import Youtube from '@tiptap/extension-youtube';
import FontFamily from '@tiptap/extension-font-family';
import { useState } from 'react';

/*
<FloatingMenu>This is the floating menu</FloatingMenu>
<BubbleMenu>This is the bubble menu</BubbleMenu>
*/
// define your extension array
const extensions = [
  StarterKit.configure({
    blockquote: {
      HTMLAttributes: {
        class: 'blockquote',
      },
    },

    bulletList: {
      HTMLAttributes: {
        class: 'list-disc w-[90%] p-4 ml-3',
      },
      keepMarks: true,
      keepAttributes: true,
    },
    orderedList: {
      HTMLAttributes: {
        class: 'list-decimal w-[90%] p-4 ml-3',
      },
      keepMarks: true,
      keepAttributes: true,
    },
    codeBlock: {
      HTMLAttributes: {
        class: 'codeblock',
      },
    },
    heading: {
      HTMLAttributes: {
        class: 'tracking-widest text-2xl font-noto text-gray-800 my-3',
      },
    },
    paragraph: {
      HTMLAttributes: {
        class: 'font-noto text-gray-800 indent-6 mt-6',
      },
    },
    horizontalRule: {
      HTMLAttributes: {
        class: 'border-t-2 border-gray-500 my-3',
      },
    },
    code: {
      HTMLAttributes: {
        class: 'code',
      },
    },
  }),
  Link.configure({
    protocols: ['tel', 'mailto'],
    HTMLAttributes: {
      class: 'underline bg-blue-400 text-gray-50 px-1',
      target: '_blank',
    },
  }),
  Image.configure({
    HTMLAttributes: {
      class: 'tipImg my-8',
    },
    inline: false,
  }),
  TextAlign.configure({
    types: ['heading', 'paragraph', 'image'],
  }),
  Youtube.configure({
    modestBranding: true,
    nocookie: true,
  }),
];

function Tiptap({
  images,
  setImages,
  setPostHTML,
  setJSON,
  initContent = '<p>Hello World!</p>',
  size = 'w-[90vw] min-h-[600px]',
  useSelfContext = true,
}) {
  const [content, setContent] = useState(initContent);

  return (
    <EditorProvider
      extensions={extensions}
      content={content}
      editorProps={{
        attributes: {
          class: `border-2 border-t-0 border-gray-400 rounded-b-lg shadow-lg ${size} p-3  outline-none focus:border-blue-300 `,
        },
      }}
      slotBefore={
        <TiptapMenu
          setImages={setImages}
          images={images}
          width={size.split(' ')[0]}
          useSelfContext={useSelfContext}
        />
      }
      onUpdate={(e) => {
        setPostHTML(e.editor.getHTML());
        setJSON(e.editor.getJSON());
      }}
    ></EditorProvider>
  );
}

export default Tiptap;
