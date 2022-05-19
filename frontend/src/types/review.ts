type User = {
  id: number;
  name: string;
  email: string;
};

export type Review = {
  id: number;
  text: string;
  movieId: number;
  user: User;
};
