import { useEffect, useRef, useState } from 'react';

function EditableInput({
  value,
  setValue,
  label,
  textArea,
  setDiff,
  labelClass,
  inputClass,
}) {
  const [editMode, setEditMode] = useState(false);

  const originalValue = useRef(value);

  useEffect(() => {
    setDiff(originalValue.current === value ? false : true);
  }, [value, setDiff]);

  return (
    <div className="flex flex-col justify-center items-start font-poppins">
      {label && <label className={labelClass}>{label}</label>}
      {textArea ? (
        <textarea
          cols={Number(textArea.cols)}
          rows={Number(textArea.rows)}
          value={value}
          readOnly={!editMode}
          onFocus={() => setEditMode(true)}
          onBlur={() => setEditMode(false)}
          onChange={(e) => setValue(e.target.value)}
          className={`outline-none border  border-gray-500 focus:border-blue-500 ${
            editMode ? 'bg-gray-50' : 'bg-gray-200 border-dashed'
          } ${inputClass}`}
        />
      ) : (
        <input
          type="text"
          value={value}
          readOnly={!editMode}
          onFocus={() => setEditMode(true)}
          onBlur={() => setEditMode(false)}
          onChange={(e) => setValue(e.target.value)}
          className={`outline-none border  border-gray-500 focus:border-blue-500 ${
            editMode ? 'bg-gray-50' : 'bg-gray-200  border-dashed'
          } ${inputClass}`}
        />
      )}
    </div>
  );
}

export default EditableInput;
