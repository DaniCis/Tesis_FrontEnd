import jwt_decode from "jwt-decode";

export function getAccessToken(){
    return localStorage.getItem('token');     
}
export function getDecoded(){
    if(getAccessToken()){
        var token_decoded = jwt_decode(getAccessToken());
        console.log(token_decoded)
        return token_decoded;
    }
}
export function getUser(){
    var decoded = getDecoded()
    var user = decoded.nombre_usuario
    return user
}
export function getMenuAuth(){
    var decoded = getDecoded()
    var menu = decoded.autorizaciones.modulos
    return menu
}
export function getModulo(modulo){
    var menu = getMenuAuth()
    var modulos
    switch(modulo){
        case 'Administración':
            modulos = menu.Administración
            break;
        case 'Compras':
            modulos = menu.Compras
            break;
        case 'Ventas':
            modulos = menu.Ventas
            break;
        case 'Movimientos':
            modulos = menu.Movimientos
            break;
        case 'Inventarios':
            modulos = menu.Inventarios
            break;
    }
    return modulos
}
export function getSubmodulos(modulo,submodulo){
    var mod = getModulo(modulo)
    var submodulos = mod
    switch (submodulo) {
        case 'Usuarios':
            submodulos = submodulos.Usuarios
            break;
        case 'Roles':
            submodulos = submodulos.Roles
            break;
        case 'Módulos':
            submodulos = submodulos.Módulos
            break;
        case 'Submódulos':
            submodulos = submodulos.Submódulos
            break;
        case 'Proveedores':
            submodulos = submodulos.Proveedores
            break;
        case 'Clientes':
            submodulos = submodulos.Clientes
            break;
    }
    return submodulos
}
export function clearAccessToken(){
    return localStorage.removeItem('token');
}
export function logout(){
    clearAccessToken()
    this.$router.push('/');
}