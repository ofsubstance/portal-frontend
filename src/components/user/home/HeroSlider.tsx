import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";
import "swiper/css/effect-fade";

import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import {
  RiCalendar2Line as CalendarIcon,
  RiTimeLine as ClockIcon,
  RiPlayFill as PlayIcon,
} from "react-icons/ri";
import { Chip, Fab, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";

const slides = [
  {
    img: "https://images.squarespace-cdn.com/content/v1/6247629c7ddcb32cb3082400/1649443692195-U0VTSEYT7EPXFKFRUBWT/Slide%2B1.jpg",
    title: "The Future of Storytelling",
    createdAt: new Date(),
    duration: "15 min",
    genre: ["Drama", "Thriller"],
    summary:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque.",
  },
  {
    img: "https://images.squarespace-cdn.com/content/v1/6247629c7ddcb32cb3082400/1649442525770-8J75N5GLA1D2WGVANJE1/Trapped+-+Vimeo+Thumbnail.png",
    title: "Trapped",
    createdAt: new Date(),
    duration: "30 min",
    genre: ["Drama", "Thriller", "Mystery"],
    summary:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque.",
  },
];

export default function HeroSlider() {
  return (
    <Swiper
      effect="fade"
      loop={true}
      centeredSlides={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      pagination={{ clickable: true }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation, EffectFade]}
      className="w-full h-[80vh]"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div
            className="relative w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.img})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black from-[20%]"></div>
            <div className="w-1/3 absolute inset-0 mt-40 pl-52 space-y-6 text-white">
              <Typography variant="h6" color="primary">
                # Spotlight {index + 1}
              </Typography>

              <Typography variant="h3">{slide.title}</Typography>

              <div className="flex gap-4 items-center">
                <Typography variant="body1" className="flex gap-2">
                  <CalendarIcon size={20} />
                  {slide.createdAt.toDateString()}
                </Typography>

                <Typography variant="body1" className="flex gap-2">
                  <ClockIcon size={20} />
                  {slide.duration}
                </Typography>
              </div>
              <div className="flex gap-2">
                {slide.genre.map((genre) => (
                  <Chip
                    key={genre}
                    label={genre}
                    variant="outlined"
                    sx={{
                      borderColor: "white",
                      color: "white",
                    }}
                  />
                ))}
              </div>
              <Typography variant="body1">{slide.summary}</Typography>

              <Fab variant="extended" size="large" color="primary">
                <PlayIcon size={20} className="mr-2" />
                Watch Now
              </Fab>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
