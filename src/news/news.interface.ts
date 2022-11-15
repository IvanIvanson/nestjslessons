/* eslint-disable prettier/prettier */
export interface News {
  id: string | number;
  title: string;
  description: string;
  author?: string;
  createdAt: Date;
  countView?: number;
}
export type AllNews = Record<string | number, News>;
// export type NewsCreate = Record<string | number, News>;

export type NewsEdit = Partial<Omit<News, 'id'>>;

// export interface NewsEdit {
//   id?: number;
//   title?: string;
//   description?: string;
//   author?: string;
//   createdAt?: Date;
//   countView?: number;
// }