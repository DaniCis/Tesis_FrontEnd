import jwt_decode from "jwt-decode";

export function getAccessToken(){
    return localStorage.getItem('auth._token.local')     
}
export function getDecoded(){
    if(getAccessToken()){
        let token_decoded = jwt_decode(getAccessToken())
        return token_decoded
    }
}
export function getUser(){
    let decoded = getDecoded()
    let user = decoded.nombre_usuario
    return user
}
export function getMenuAuth(){
    let decoded = getDecoded()
    let menu = decoded.autorizaciones.modulos
    return menu
}
export function getModulo(modulo){
    let menu = getMenuAuth()
    let modulos
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
    let mod = getModulo(modulo)
    let submodulos = mod
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
