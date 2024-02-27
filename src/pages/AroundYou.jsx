import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import { Error, Loader, SongCard } from "../components";
import { useGetSongsByCountryQuery } from "../redux/services/shazamCore";

const AroundYou = () => {
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(true);
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetSongsByCountryQuery(country);

  console.log(country);

  useEffect(() => {
    // at_m9HdNn68bqsN0YDolTGYtKdbbHLlN
    axios
      .get(
        `https://geo.ipify.org/api/v2/country?apiKey=at_m9HdNn68bqsN0YDolTGYtKdbbHLlN`
      )
      .then((response) => setCountry(response?.data?.location.country))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [country]);

  if (isFetching && loading)
    return <Loader title="Loading Songs around you..." />;
  if (error && country !== "") return <Error />;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Around you <span className="font-black">{country}</span>
      </h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-4">
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

export default AroundYou;

// data i am getting from geo.ipify
// {
//   "ip": "8.8.8.8",
//   "location": {
//       "country": "US",
//       "region": "California",
//       "timezone": "-07:00",
//   },
//   "domains": [
//       "0d2.net",
//       "003725.com",
//       "0f6.b0094c.cn",
//       "007515.com",
//       "0guhi.jocose.cn"
//   ],
//   "as": {
//       "asn": 15169,
//       "name": "Google LLC",
//       "route": "8.8.8.0/24",
//       "domain": "https://about.google/intl/en/",
//       "type": "Content"
//   },
//   "isp": "Google LLC"
// }

// data i am getting from api call
// {
//   "layout": "5",
//   "type": "MUSIC",
//   "key": "688610005",
//   "title": "Katchi Sera (From \"Think Indie\")",
//   "subtitle": "Sai Abhyankkar",
//   "share": {
//     "subject": "Katchi Sera (From \"Think Indie\") - Sai Abhyankkar",
//     "text": "Katchi Sera (From \"Think Indie\") by Sai Abhyankkar",
//     "href": "https://www.shazam.com/track/688610005/katchi-sera-from-think-indie",
//     "image": "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/80/df/08/80df0808-17e7-ab41-5972-fec5f83e3819/cover.jpg/400x400cc.jpg",
//     "twitter": "I used @Shazam to discover Katchi Sera (From \"Think Indie\") by Sai Abhyankkar.",
//     "html": "https://www.shazam.com/snippets/email-share/688610005?lang=en&country=GB",
//     "snapchat": "https://www.shazam.com/partner/sc/track/688610005"
//   },
//   "images": {
//     "background": "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/80/df/08/80df0808-17e7-ab41-5972-fec5f83e3819/cover.jpg/400x400cc.jpg",
//     "coverart": "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/80/df/08/80df0808-17e7-ab41-5972-fec5f83e3819/cover.jpg/400x400cc.jpg",
//     "coverarthq": "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/80/df/08/80df0808-17e7-ab41-5972-fec5f83e3819/cover.jpg/400x400cc.jpg",
//     "joecolor": "b:b82500p:ffffffs:fcd6cdt:f0d3cbq:efb3a4"
//   },
//   "hub": {
//     "type": "APPLEMUSIC",
//     "image": "https://images.shazam.com/static/icons/hub/web/v5/applemusic.png",
//     "actions": [
//       {
//         "name": "apple",
//         "type": "applemusicplay",
//         "id": "1725350747"
//       },
//       {
//         "name": "apple",
//         "type": "uri",
//         "uri": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/45/66/ec/4566ec7a-8635-0301-c8d1-fb35fa7938c5/mzaf_12088439455223319487.plus.aac.ep.m4a"
//       }
//     ],
//     "options": [
//       {
//         "caption": "OPEN",
//         "actions": [
//           {
//             "name": "hub:applemusic:deeplink",
//             "type": "applemusicopen",
//             "uri": "https://music.apple.com/gb/album/katchi-sera-from-think-indie/1725350674?i=1725350747&mttnagencyid=s2n&mttnsiteid=125115&mttn3pid=Apple-Shazam&mttnsub1=Shazam_web&mttnsub2=5348615A-616D-3235-3830-44754D6D5973&itscg=30201&app=music&itsct=Shazam_web"
//           },
//           {
//             "name": "hub:applemusic:deeplink",
//             "type": "uri",
//             "uri": "https://music.apple.com/gb/album/katchi-sera-from-think-indie/1725350674?i=1725350747&mttnagencyid=s2n&mttnsiteid=125115&mttn3pid=Apple-Shazam&mttnsub1=Shazam_web&mttnsub2=5348615A-616D-3235-3830-44754D6D5973&itscg=30201&app=music&itsct=Shazam_web"
//           }
//         ],
//         "beacondata": {
//           "type": "open",
//           "providername": "applemusic"
//         },
//         "image": "https://images.shazam.com/static/icons/hub/web/v5/overflow-open-option.png",
//         "type": "open",
//         "listcaption": "Open in Apple Music",
//         "overflowimage": "https://images.shazam.com/static/icons/hub/web/v5/applemusic-overflow.png",
//         "colouroverflowimage": false,
//         "providername": "applemusic"
//       }
//     ],
//     "explicit": false,
//     "displayname": "APPLE MUSIC"
//   },
//   "artists": [
//     {
//       "alias": "sai-abhyankkar",
//       "id": "42",
//       "adamid": "1652280551"
//     }
//   ],
//   "url": "https://www.shazam.com/track/688610005/katchi-sera-from-think-indie",
//   "highlightsurls": {},
//   "properties": {}
// },
