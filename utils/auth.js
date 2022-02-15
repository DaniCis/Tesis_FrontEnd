import jwt_decode from "jwt-decode";


export function getAccessToken(){
    return sessionStorage.getItem('token');
    
}
export function getDecoded(){
    var token_decoded = jwt_decode(getAccessToken());
    return token_decoded;
}
  
export function clearAccessToken(){
    return sessionStorage.removeItem('token');
}

export function logout(){
    clearAccessToken()
    this.$router.push('/');
}