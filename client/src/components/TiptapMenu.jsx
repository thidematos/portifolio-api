import { useCurrentEditor } from '@tiptap/react';

function TiptapMenu() {
  const { editor } = useCurrentEditor();

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
      <Button
        type={'image'}
        editor={editor}
        onAction={() =>
          editor
            .chain()
            .setImage({
              src: 'https://t.ctcdn.com.br/JlHwiRHyv0mTD7GfRkIlgO6eQX8=/640x360/smart/i257652.jpeg',
            })
            .focus()
            .run()
        }
      />
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
