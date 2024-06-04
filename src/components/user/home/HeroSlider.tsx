import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Chip, Fab, Typography } from "@mui/material";
import {
  RiCalendar2Line as CalendarIcon,
  RiTimeLine as ClockIcon,
  RiPlayFill as PlayIcon,
} from "react-icons/ri";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { PlaylistTag } from "@/constants/enums";
import usePlaylistManagementActions from "@/hooks/usePlaylistManagementAction";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

export default function HeroSlider() {
  const { usePlaylistTagQuery } = usePlaylistManagementActions();

  const { data: playlist } = usePlaylistTagQuery(PlaylistTag.Carousel);

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
      {playlist?.videos.map((slide, index) => (
        <SwiperSlide key={index}>
          <div
            className="relative w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.thumbnail_url})` }}
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
                  {dayjs(slide.createdAt).format("MMMM DD, YYYY")}
                </Typography>

                <Typography variant="body1" className="flex gap-2">
                  <ClockIcon size={20} />
                  {slide.duration} min
                </Typography>
              </div>
              <div className="flex gap-2">
                {slide.genre.split(",").map((genre) => (
                  <Chip
                    key={genre}
                    label={genre.trim()}
                    variant="outlined"
                    sx={{
                      borderColor: "white",
                      color: "white",
                    }}
                  />
                ))}
              </div>
              <Typography variant="body1">{slide.short_desc}</Typography>

              <Fab
                variant="extended"
                size="large"
                color="primary"
                component={Link}
                to={"/video/" + slide.id}
              >
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
