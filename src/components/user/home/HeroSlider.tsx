import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import {
  RiCalendar2Line as CalendarIcon,
  RiTimeLine as ClockIcon,
  RiPlayFill as PlayIcon,
} from "react-icons/ri";
import { Chip, Fab, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";

import { slides } from "@/data/dummyData";

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
      className="w-full h-screen"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div
            className="relative w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.img})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black from-[20%]"></div>
            <div className="p-14 md:pl-52 md:w-1/3 absolute inset-0 flex flex-col gap-6 justify-center items-start text-white">
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
