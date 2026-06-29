import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Chip, Fab, Typography } from '@mui/material';
import {
  RiCalendar2Line as CalendarIcon,
  RiTimeLine as ClockIcon,
  RiPlayFill as PlayIcon,
  RiFilmLine as FilmsIcon,
} from 'react-icons/ri';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { VideoDto } from '@/dtos/video.dto';

function scrollToFilmList() {
  const el = document.getElementById('video-list-section');
  if (!el) return;
  // Use window.scrollTo so Swiper's pointer-event capture doesn't interfere
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY, behavior: 'smooth' });
}

export default function HeroSlider({ videos }: { videos: VideoDto[] }) {
  return (
    <Swiper
      effect="slide"
      speed={2000}
      loop={false}
      centeredSlides={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      pagination={{ clickable: true }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation, EffectFade]}
      className="w-full h-screen"
    >
      {videos?.map((slide, index) => (
        <SwiperSlide key={index}>
          <div
            className="relative w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.thumbnail_url})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black from-[20%]"></div>
            <div className="p-4 md:p-14 md:pl-52 md:w-1/3 absolute inset-0 flex flex-col gap-6 justify-center items-start text-white">
              <Typography variant="h6" color="primary">
                # Spotlight {index + 1}
              </Typography>

              <Typography variant="h3">{slide.title}</Typography>

              <div className="flex gap-4 items-center">
                <Typography variant="body1" className="flex gap-2">
                  <CalendarIcon size={20} />
                  {dayjs(slide.createdAt).format('MMMM DD, YYYY')}
                </Typography>

                <Typography variant="body1" className="flex gap-2">
                  <ClockIcon size={20} />
                  {slide.duration} min
                </Typography>
              </div>
              <div className="flex gap-2">
                {slide.genre.split(',').map((genre) => (
                  <Chip
                    key={genre}
                    label={genre.trim()}
                    variant="outlined"
                    sx={{
                      borderColor: 'white',
                      color: 'white',
                    }}
                  />
                ))}
              </div>
              <Typography variant="body1">{slide.short_desc}</Typography>

              <div className="flex gap-3">
                <Fab
                  variant="extended"
                  size="large"
                  color="primary"
                  component={Link}
                  to={'/video/' + slide.id}
                >
                  <PlayIcon size={20} className="mr-2" />
                  Watch Now
                </Fab>

                <Fab
                  variant="extended"
                  size="large"
                  color="inherit"
                  onClick={scrollToFilmList}
                  sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(4px)', '&:hover': { bgcolor: 'rgba(255,255,255,0.25)' } }}
                >
                  <FilmsIcon size={20} className="mr-2" />
                  All Films
                </Fab>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
