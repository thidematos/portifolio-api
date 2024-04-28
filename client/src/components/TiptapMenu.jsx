import { useCurrentEditor } from '@tiptap/react';
import RouterModal from './RouterModal';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function TiptapMenu({ images, setImages }) {
  const { editor } = useCurrentEditor();
  const navigate = useNavigate();

  useEffect(() => {
    if (!images.length > 0) return;

    editor
      .chain()
      .setImage({ src: images.at(-1).url, title: images.at(-1).legend })
      .focus()
      .run();

    navigate(-1);
  }, [images]);

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
        onAction={() => editor.chain().toggleLink().focus().run()}
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
        type={'code'}
        editor={editor}
        onAction={() => editor.chain().toggleCode().focus().run()}
      />
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
