export type IVideo = {
  id: string;
  title: string;
  videoData: [
    {
      quality: string;
      url: string;
      type: string;
      size: string;
      resolution: string;
    }
  ];
  duration: number;
  thumbnail: string;
  createdAt: string;
  updatedAt: string;
  genre: string[];
  about: string;
  primaryLesson: string;
  theme: string;
  impact: string;
};

export const videoData: IVideo = {
  id: "1",
  title: "The Shawshank Redemption",
  duration: 60 * 60 * 2,
  videoData: [
    {
      quality: "1080p",
      url: "https://www.w3schools.com/html/mov_bbb.mp4",
      type: "video/mp4",
      size: "1024x768",
      resolution: "1080p",
    },
  ],
  thumbnail:
    "https://images.squarespace-cdn.com/content/v1/6247629c7ddcb32cb3082400/1649443692195-U0VTSEYT7EPXFKFRUBWT/Slide%2B1.jpg",
  createdAt: "2021-10-10T12:00:00Z",
  updatedAt: "2021-10-10T12:00:00Z",
  genre: ["Action", "Adventure", "Comedy", "Romance", "Sci Fi"],
  about:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  primaryLesson:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  theme:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  impact:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
};

export const vidoeList = Array(10).fill(videoData) as (typeof videoData)[];

export const playListItemData = {
  id: "1",
  title: "The Shawshank Redemption",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  videoCount: 2,
  createdAt: "2021-10-10T12:00:00Z",
  updatedAt: "2021-10-10T12:00:00Z",
};

export const playList = Array(10).fill(
  playListItemData
) as (typeof playListItemData)[];

export const user = {
  id: "1",
  firstName: "John",
  lastName: "Doe",
  avatar: "https://uko-react.vercel.app/static/avatar/001-man.svg",
  email: "john.doe@email.com",
  contactNumber: "+8801234567890",
  gender: "Male",
  createdAt: "2021-10-10T12:00:00Z",
  updatedAt: "2021-10-10T12:00:00Z",
  role: "User",
  status: "Active",
  language: "English",
  about:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
};

export const userList = Array(10).fill(user) as (typeof user)[];

export const slides = [
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
  {
    img: "https://images.squarespace-cdn.com/content/v1/6247629c7ddcb32cb3082400/1649442673872-FE667OKK8O8GKJDNI9PD/Slide%2B28.jpg",
    title: "Day 96",
    createdAt: new Date(),
    duration: "20 min",
    genre: ["Thriller", "Mystery"],
    summary:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque.",
  },
];
