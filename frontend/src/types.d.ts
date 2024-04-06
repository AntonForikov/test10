export interface Message {
  author: string,
  message: string,
  image: File | null
}

export interface MessageWithIdAndImage extends Message {
  id: string,
  image: string | null
}