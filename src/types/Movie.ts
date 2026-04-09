export interface Movie {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
}

/* eslint-disable */
export type RequiredFieldsEmptyState = Omit<
  Record<keyof Movie, boolean>,
  'description'
>;
