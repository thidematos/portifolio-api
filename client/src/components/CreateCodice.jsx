import { useState } from "react";
import Tiptap from "../Utils/Tiptap";
import Error from "../Utils/Error";
import axios from "axios";
import Loader from "../Utils/Loader";
import { useNavigate } from "react-router-dom";
import ImageUploader from "../Utils/TestUploader";

function CreateCodice() {
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [usedCategories, setUsedCategories] = useState([]);
  const [cover, setCover] = useState(null);
  const [postHTML, setPostHTML] = useState("");
  const [postJSON, setPostJSON] = useState({});
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const categories = [
    "React",
    "Node",
    "MongoDB",
    "Tecnologia",
    "História",
    "Cotidiano",
    "Relatos",
    "Percepções",
    "Novidades",
    "Javascript",
    "Resenha",
  ];

  async function handleCreatePost() {
    try {
      setIsLoading(true);

      const imagesInfo = images.map((image) => {
        window.URL.revokeObjectURL(image.url);
        return {
          blob: image.url,
          legend: image.legend,
        };
      });

      const content = {
        html: postHTML,
        json: postJSON,
      };

      if (!title || !summary || !usedCategories.length > 0 || !cover)
        throw new Error("Conteúdo incompleto!");

      const form = new FormData();
      form.append("title", title);
      images.forEach((file) => {
        form.append("images", file.file);
      });
      form.append("cover", cover);
      form.append("imagesInfo", JSON.stringify(imagesInfo));
      form.append("summary", summary);
      form.append("content", JSON.stringify(content));
      form.append("categories", JSON.stringify(usedCategories));

      await axios.post("/api/v1/codice", form, {
        withCredentials: true,
      });
      navigate("/admin/dashboard/codice");
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {isLoading && <Loader />}
      {error && <Error message={error} path={"/admin/dashboard/codice"} />}
      {!isLoading && !error && (
        <div className="flex w-full flex-col items-center justify-center bg-gray-100 ">
          <Textarea
            label={"TÍTULO"}
            setter={setTitle}
            state={title}
            margin={"mb-10"}
            width={"w-[70%]"}
            placeholder={"A temporalidade em Shingeki no Kiojin"}
          />
          <Tiptap
            setImages={setImages}
            images={images}
            setPostHTML={setPostHTML}
            setJSON={setPostJSON}
          />
          <Textarea
            label={"RESUMO"}
            setter={setSummary}
            state={summary}
            margin={"my-10"}
            width={"w-[90%]"}
            rows={4}
            placeholder={
              "A temporalidade de Shingeki é confusa. Mas, se mostra um traço fundamental da obra desde o primeiro episódio."
            }
          />
          <div className="mb-10 flex w-full flex-col items-center justify-center gap-2">
            <p className="font-poppins text-xl text-gray-800 drop-shadow">
              CAPA
            </p>
            <ImageUploader
              multiple={false}
              guide={"Escolha uma capa para seu códice"}
              withDialogueBox={false}
              setter={setCover}
            />
          </div>

          <div className="mb-10 flex h-[150px] w-[90%] flex-row flex-wrap items-center justify-center gap-4 overflow-y-scroll rounded border-2 border-gray-400 bg-gray-100 px-3 py-4">
            {categories.map((category) => (
              <Category
                category={category}
                key={category}
                setter={setUsedCategories}
                usedCategories={usedCategories}
              />
            ))}
          </div>
          {title && usedCategories.length > 0 && postHTML && cover && (
            <button
              className="mb-4 rounded bg-blue-500 px-5 py-3 font-poppins text-xl text-gray-50 shadow drop-shadow"
              onClick={() => handleCreatePost()}
            >
              CRIAR POST
            </button>
          )}
        </div>
      )}
    </>
  );
}

function Category({ category, usedCategories, setter }) {
  return (
    <button
      className={`w-[30%]   rounded font-poppins text-sm shadow  drop-shadow ${
        usedCategories.includes(category)
          ? "bg-blue-500 text-gray-50"
          : "border border-dashed border-orange-500 bg-gray-50 "
      }`}
      onClick={() => {
        setter((state) => {
          if (usedCategories.includes(category))
            return state.filter((el) => el !== category);

          return [...state, category];
        });
      }}
    >
      {usedCategories.includes(category) ? category?.toUpperCase() : category}
    </button>
  );
}

function Textarea({
  label,
  state,
  setter,
  placeholder,
  margin,
  width,
  rows = 2,
}) {
  const labelId = Math.random();

  return (
    <div
      className={`flex w-full flex-col items-center justify-center gap-2 font-poppins ${margin}`}
    >
      <label
        className="text-xl tracking-widest text-gray-800 drop-shadow"
        htmlFor={labelId}
      >
        {label}
      </label>
      <textarea
        className={`${width} rounded bg-gray-200 p-2 text-gray-800 shadow outline-blue-400 placeholder:text-center placeholder:text-sm`}
        value={state}
        id={labelId}
        rows={rows}
        onChange={(e) => setter(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}

export default CreateCodice;
