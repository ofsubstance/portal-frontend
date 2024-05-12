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
