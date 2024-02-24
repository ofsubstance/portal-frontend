export const vidoeList: {
  id: string;
  title: string;
  duration: number;
  thumbnail: string;
  createdAt: string;
  updatedAt: string;
  description: string;
  genre: string[];
}[] = [
  {
    id: "1",
    title: "The Shawshank Redemption",
    duration: 60 * 60 * 2, // in seconds
    thumbnail: "https://img.youtube.com/vi/6hB3S9bIaco/0.jpg",
    createdAt: "2021-10-10T12:00:00Z",
    updatedAt: "2021-10-10T12:00:00Z",
    description:
      "An authentic look behind the closed doors of a drug deal with a young man trying his damnedest to stop doing drugs.",
    genre: ["Drama", "Crime"],
  },
];
