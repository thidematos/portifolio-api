import { useEffect, useState } from "react";
import Gophers from "./Gophers";
import LoginUser from "./../components/LoginUser";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Music({ music, setMusic, user, setUser }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    const updateMusic = async () => {
      try {
        const res = await axios.get("/api/v1/musics");
        setMusic(res.data.data.musics);
      } catch (err) {
        console.log(err);
      }
    };

    updateMusic();
  }, [user, setMusic]);

  async function onGopher() {
    if (!user) return navigate("get-started");

    try {
      const res = await axios.patch(
        `/api/v1/musics/like-music/${music?._id}`,
        {
          goph: true,
        },
        { withCredentials: true },
      );
      setUser(res.data.data.user);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div className="flex w-full flex-col items-center justify-center gap-5 font-poppins lg:gap-5 xl:px-6 2xl:px-10 3xl:px-0">
        <h2 className="font-poppins text-gray-800 drop-shadow md:text-lg 3xl:text-2xl">
          Música do dia
        </h2>
        <div className=" flex w-[80%] flex-col items-center justify-center gap-2">
          <div className="relative md:w-[70%] lg:w-full 3xl:w-[90%]">
            <img
              src={`/${music?.cover}`}
              className="rounded opacity-75 shadow-lg blur-[1px]"
            />
            <h3 className="centerDivAbsolute absolute z-10 w-[40%] bg-gray-50 py-2 text-center text-lg italic text-gray-800 md:w-[50%] lg:w-[40%] 3xl:text-xl">
              {music?.music}
            </h3>
          </div>
          <div className="flex w-full flex-row items-center justify-center gap-3">
            <p className=" text-xs drop-shadow-sm md:text-sm lg:text-xs xl:text-sm">
              <span>{music?.artist}</span> | <span>{music?.album}</span>
            </p>
            <div className="flex w-[30%] flex-row items-center justify-center gap-3 md:w-[25%] lg:w-[30%] 3xl:w-[25%]">
              <a href={music?.spotifyLink} target="_blank">
                <img src="/spotify-icon.png" />
              </a>
              <a href={music?.youtubeLink} target="_blank">
                <img src="/youtube-icon.png" className="scale-[85%]" />
              </a>
            </div>
          </div>
        </div>

        <p className="3xl:p px-5 text-xs  text-gray-600 drop-shadow-sm lg:px-8 lg:text-xs xl:text-sm 3xl:text-base">
          {music?.brief}
        </p>

        <div className="flex flex-row items-center justify-center gap-3 text-xs text-gray-800 drop-shadow xl:text-sm">
          <Gophers
            isLikeGopher={{
              width: "w-[10%]",
              onGopher,
              isLiked: user?.likedMusics.includes(music._id),
            }}
          />
          {music?.numGophs > 0 ? (
            <p>
              <span className="italic text-blue-500">Gophed</span> por{" "}
              {music?.numGophs} leitor{music?.numGophs > 1 ? "es" : ""}
            </p>
          ) : (
            <p>
              Nenhum <span className="italic text-blue-500">Gopher</span> ainda
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default Music;
