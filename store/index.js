import jwt_decode from "jwt-decode";

export const state = () => ({
  token: null,
  decoded_token:null,
  user: null
})

export const mutations = {
  saveUser(state, nombre){
    state.user = nombre
  },
  saveToken(state, token){
    state.token = token;
  },
  decodeToken(state, token){
    state.decoded_token = jwt_decode(token)
    console.log(state.decoded_token)
  },
}