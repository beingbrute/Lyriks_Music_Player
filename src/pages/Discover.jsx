import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Error, Loader, SongCard } from "../components";
import { genres } from "../assets/constants";
import { selectGenreListId } from "../redux/features/playerSlice";
import { useGetSongsByGenreQuery } from "../redux/services/shazamCore";

const Discover = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying, genreListId } = useSelector(
    (state) => state.player
  );

  const { data, isFetching, error } = useGetSongsByGenreQuery(genreListId || "POP");

  // console.log("kj : ", useGetTopChartsQuery());
  // console.log("jett : ", data);

  if (isFetching) return <Loader title="Loading songs..." />;

  if (error) return <Error />;

  const genreTitle = genres.find(({ value }) => value === genreListId)?.title;

  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white text-left">
          Discover {genreTitle}
        </h2>

        <select
          onChange={(e) => dispatch(selectGenreListId(e.target.value))}
          value={genreListId || "Pop"}
          className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5"
        >
          {genres.map((genre) => (
            <option key={genre.value} value={genre.value}>
              {genre.title}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap sm:justify-start justify-center gap-5">
        {data?.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default Discover;

/*


// export const shazamCoreApi = createApi({

//   // every api must have a reducerPath and we are naming our api shazamCoreApi
//   reducerPath: "shazamCoreApi",

//   baseQuery: fetchBaseQuery({
//     baseUrl: "https://shazam-core.p.rapidapi.com/v1",

//     // redux gonna call this function which will create a header for us before each and every call 
//     // so that  we don't hacve to provide options every time 
//     prepareHeaders: (headers) => {
//       headers.set(
//         "X-RapidAPI-Key",
//         "e833ff31efmsheaafc25023ce39dp14d49fjsn60f7a22d545b"
//       );

//       return headers;
//     },
//   }),


//   //building endpoints
//   endpoints: (builder) => ({
//     // getTopCharts: builder.query({ query: "/charts/world" }),
//     getTopCharts: builder.query({ query: () => "v1/charts/world" }),
//   }),
// });
// console.log("shazam core",shazamCoreApi);
*/
