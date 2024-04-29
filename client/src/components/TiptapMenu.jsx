import { useCurrentEditor } from '@tiptap/react';
import RouterModal from './RouterModal';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

/*
       <Button
        type={'code'}
        editor={editor}
        onAction={() => editor.chain().toggleCode().focus().run()}
      />
*/

function TiptapMenu({ images, setImages }) {
  const { editor } = useCurrentEditor();
  const navigate = useNavigate();
  const [align, setAlign] = useState('left');

  useEffect(() => {
    if (!images.length > 0) return;

    editor
      .chain()
      .setImage({ src: images.at(-1).url, title: images.at(-1).legend })
      .focus()
      .run();

    navigate(-1);
  }, [images]);

  useEffect(() => {
    editor.chain().focus().setTextAlign(align).run();
  }, [align]);

  function uploadImage(image) {
    const url = window.URL.createObjectURL(image.file);
    setImages((state) => [
      ...state,
      {
        file: image.file,
        url: url,
        legend: image.legend,
      },
    ]);
  }

  return (
    <div className="w-[90vw] border-2 border-gray-700 p-4 rounded-t-lg flex flex-row justify-center flex-wrap items-baseline gap-3 overflow-x-scroll">
      <Button
        type={'heading'}
        editor={editor}
        onAction={() =>
          editor.chain().toggleHeading({ level: 2 }).focus().run()
        }
      />
      <Button
        type={'bold'}
        editor={editor}
        onAction={() => editor.chain().toggleBold().focus().run()}
      />
      <Button
        type={'italic'}
        editor={editor}
        onAction={() => editor.chain().toggleItalic().focus().run()}
      />
      <Button
        type={'link'}
        editor={editor}
        onAction={() => {
          if (!editor.isActive('link')) {
            const href = !editor.isActive('link') && window.prompt('URL:');
            editor.chain().setLink({ href: href }).focus().run();
          } else {
            editor.chain().unsetLink().focus().run();
          }
        }}
      />

      <Button
        type={'youtube'}
        editor={editor}
        onAction={() => {
          const url = prompt('URL: ');

          editor
            .chain()
            .setYoutubeVideo({
              src: url,
              width: window.innerWidth * 0.85,
              height: window.innerHeight / 3,
            })
            .focus()
            .run();
        }}
      />
      <Button type={'image'} editor={editor} onAction={() => null}>
        <Link to={'setImage'}>
          <img
            src={
              editor.isActive('image')
                ? `/${'image'}-active.png`
                : `/${'image'}.png`
            }
            alt=""
            width={''}
          />
        </Link>
      </Button>
      <Button
        type={`textAlign-${align}`}
        editor={editor}
        onAction={() => {
          const queue = ['left', 'center', 'right', 'justify'];
          const next = queue.findIndex((position) => position === align) + 1;
          setAlign(queue[next > queue.length - 1 ? 0 : next]);
        }}
      >
        <img src={`/textAlign-${align}.png`} alt="" width={''} />
      </Button>

      <Button
        type={'blockquote'}
        editor={editor}
        onAction={() => editor.chain().toggleBlockquote().focus().run()}
      />
      <Button
        type={'horizontalRule'}
        editor={editor}
        onAction={() => editor.chain().setHorizontalRule().focus().run()}
      />
      <Button
        type={'bulletList'}
        editor={editor}
        onAction={() => editor.chain().toggleBulletList().focus().run()}
      />
      <Button
        type={'orderedList'}
        editor={editor}
        onAction={() => editor.chain().toggleOrderedList().focus().run()}
      />
      <Button
        type={'codeBlock'}
        editor={editor}
        onAction={() => editor.chain().toggleCodeBlock().focus().run()}
      />
      <Outlet context={uploadImage} />
    </div>
  );
}

function Button({ children, onAction, className, editor, type }) {
  return (
    <button
      className={`w-[12%] border-2 rounded border-gray-500 ${
        editor.isActive(type) ? 'bg-gray-200' : 'bg-gray-50'
      } shadow ${className || ''}`}
      onClick={onAction}
    >
      {children || (
        <img
          src={
            editor.isActive(type) && type !== 'image'
              ? `/${type}-active.png`
              : `/${type}.png`
          }
          alt=""
          width={''}
        />
      )}
    </button>
  );
}

export default TiptapMenu;
