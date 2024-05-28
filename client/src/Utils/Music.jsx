function Music({ music }) {
  console.log(music);
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <h2>Música do dia</h2>
      <img src={`/${music.cover}`} />
      <h3>{music.music}</h3>
      <div>
        <p>
          <span>{music.artist}</span> | <span>{music.album}</span>
        </p>
      </div>
      <p>{music.brief}</p>
      <div className="flex w-full flex-row justify-center pt-5">
        <a href={music.spotifyLink}>
          <img src="/spotify-icon.png" className="w-[20%]" />
        </a>
        <a href={music.youtubeLink}>
          <img src="/youtube-icon.png" className="w-[20%]" />
        </a>
      </div>
    </div>
  );
}

export default Music;
