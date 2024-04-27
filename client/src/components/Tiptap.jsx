// src/Tiptap.jsx
import { EditorProvider, FloatingMenu, BubbleMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TiptapMenu from './TiptapMenu';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';

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
        class: 'list-disc w-[90%] p-4',
      },
      keepMarks: true,
      keepAttributes: true,
    },
    orderedList: {
      HTMLAttributes: {
        class: 'list-decimal w-[90%] p-4',
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
        class: 'tracking-widest text-2xl',
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
    },
  }),
  Image.configure({
    HTMLAttributes: {
      class: 'tipImg',
    },
  }),
];

const content = '<p>Hello World!</p>';

function Tiptap() {
  return (
    <EditorProvider
      extensions={extensions}
      content={content}
      editorProps={{
        attributes: {
          class:
            'border-2 border-t-0 border-gray-400 rounded-b-lg shadow-lg w-[90vw] min-h-[600px] p-3 font-poppins text-gray-900 outline-none focus:border-blue-300 ',
        },
      }}
      slotBefore={<TiptapMenu />}
    >
      <FloatingMenu>This is the floating menu</FloatingMenu>
      <BubbleMenu>This is the bubble menu</BubbleMenu>
    </EditorProvider>
  );
}

export default Tiptap;
