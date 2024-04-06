export interface News {
  title: string,
  content: string,
  image: File | null
}

export interface NewsWithId extends News {
  id: string,
  image: string,
  date: string,
}

export interface Comment {
  author: string,
  text: string,
  newsId: string | undefined
}

export interface CommentWithId extends Comment {
  id: string
}