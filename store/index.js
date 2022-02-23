import jwt_decode from "jwt-decode";

export const state = () => ({
    token: null,
    decoded_token:null,
    user: null
})

export const mutations = {
    saveUser(state, user){
      state.user = user;
    },
    saveToken(state, token){
      state.token = token;
    },
    decodeToken(state,token){
        state.decoded_token = jwt_decode(token);
        user = decoded_token.nombre_usuario;
        this.saveUser(state,user)
    }
}