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