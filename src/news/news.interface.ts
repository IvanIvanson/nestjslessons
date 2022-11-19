import { Comment } from './comments/comments.interface';
export interface News {
  id: string | number;
  title: string;
  description: string;
  author: string;
  countView?: number;
  cover?: string;
  comments?: Comment[];
}

export type AllNews = Record<string | number, News>;

export type NewsEdit = Partial<Omit<News, 'id'>>;
