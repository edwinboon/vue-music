export interface RegistrationSchema {
  name: string,
  email: string,
  password: string,
  confirm_password: string,
  tos: string,
}

export interface LoginSchema {
  email: string,
  password: string
}

export interface SongSchema {
  modified_name: string,
  genre: string
}

export interface CommentSchema {
  comment: string
}