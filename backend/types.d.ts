
export interface News {
  id: string,
  title: string,
  content: string,
  image: string | null
  date: Date
}

export type NewsWithOutId = Omit<News, 'id'>;

export interface Comment {
  id: string,
  newsId: string,
  text: string,
  author: string | null
}

export type CommentWithoutId = Omit<Comment, 'id'>;