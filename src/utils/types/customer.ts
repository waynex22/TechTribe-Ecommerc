export type TypePayload = {
  username: string;
  phone: string;
  role: string;
  sub: string;
  avata: string;
}

export const defaultUser: TypePayload = {
  username: '',
  phone: '',
  role: '',
  sub: '',
  avata: '',
}

export type typeCustomer = {
  _id: string,
  name: string,
  phone: string,
  avata: string
}