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