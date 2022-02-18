<template>
    <aside class="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3 " id="sidenav-main">
        <div class="sidenav-header">
            <i class="p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav"></i>
            <a class="navbar-brand m-0" target="_blank">
                <img src="" class="navbar-brand-img h-100" alt="main_logo">
                <span class="ms-1 font-weight-bold">Compunex</span>
            </a>
        </div>
        <hr class="horizontal dark mt-0">
        <div class="collapse navbar-collapse  w-auto  max-height-vh-100 h-100" id="sidenav-collapse-main">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link active" href="/dashboard" id='menuDash'>
                        <div class="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                            <b-icon icon='house' style="color:#fff"></b-icon>
                        </div>
                        <span class="nav-link-text ms-1">Inicio</span>
                    </a>
                </li>
                 <div class="nav-item" v-if="'Administración' in this.modulos">
                    <a class="nav-link" id="submenuAdm" v-b-toggle.collapse-1 v-on:click="actAdm = !actAdm" >
                        <div class="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                            <b-icon icon='tools' style="color:#000"></b-icon>
                        </div>
                        <span class="nav-link-text ms-1">Administración</span>
                        <span class="ps-4" >
                            <b-icon v-show='actAdm' icon='chevron-down' style="width: 0.8em; height: 0.8em;" ></b-icon>
                            <b-icon v-show='!actAdm' icon='chevron-up' style="width: 0.8em; height: 0.8em;"></b-icon>
                        </span>
                    </a>
                    <b-collapse id="collapse-1"> 
                        <b-card>
                            <b-card-text v-if="'Usuarios' in this.modulos.Administración">
                                <nuxt-link to="/usuarios">Usuarios</nuxt-link>
                            </b-card-text>
                            <b-card-text v-if="'Roles' in this.modulos.Administración">
                                <nuxt-link to="/roles">Roles</nuxt-link>
                            </b-card-text>
                            <b-card-text v-if="'Modulos' in this.modulos.Administración">
                                <nuxt-link to="/modulos">Módulos</nuxt-link>
                            </b-card-text>
                        </b-card>
                    </b-collapse>
                </div>
                <li class="nav-item mt-3">
                    <h6 class="ps-4 ms-2 text-uppercase text-xs font-weight-bolder opacity-6">Módulos</h6>
                </li>
                <div class="nav-item" v-if="'Compras' in this.modulos">
                    <a class="nav-link" id="submenuCom" v-b-toggle.collapse-2 v-on:click="actComp = !actComp">
                        <div class="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                            <b-icon icon='cart' style="color:#000"></b-icon>
                        </div>
                        <span class="nav-link-text ms-1">Compras</span>
                        <span class="ms-6">
                            <b-icon v-show='actComp' icon='chevron-down' style="width: 0.8em; height: 0.8em;" ></b-icon>
                            <b-icon v-show='!actComp' icon='chevron-up' style="width: 0.8em; height: 0.8em;"></b-icon>
                        </span>
                    </a>
                    <b-collapse id="collapse-2"> 
                        <b-card>
                            <b-card-text v-if="'Proveedores' in this.modulos.Compras">
                                <nuxt-link to="/proveedores">Proveedores</nuxt-link>
                            </b-card-text>
                            <b-card-text v-if="'Compras' in this.modulos.Compras">
                                <nuxt-link to="/compras">Compras</nuxt-link>
                            </b-card-text>
                        </b-card>
                    </b-collapse>
                </div>
                <div class="nav-item" v-if="'Ventas' in this.modulos">
                    <a class="nav-link" id="submenuVen" v-b-toggle.collapse-3 v-on:click="actVent = !actVent">
                        <div class="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                            <b-icon icon='bag' style="color:#000"></b-icon>
                        </div>
                        <span class="nav-link-text ms-1">Ventas&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <span class="ms-6" >
                            <b-icon v-show='actVent' icon='chevron-down' style="width: 0.8em; height: 0.8em;" ></b-icon>
                            <b-icon v-show='!actVent' icon='chevron-up' style="width: 0.8em; height: 0.8em;"></b-icon>
                        </span>
                    </a>
                    <b-collapse id="collapse-3"> 
                        <b-card>
                            <b-card-text v-if="'Clientes' in this.modulos.Ventas">
                                <nuxt-link to="/clientes">Clientes</nuxt-link>
                            </b-card-text>
                            <b-card-text v-if="'Ventas' in this.modulos.Ventas">
                                <nuxt-link to="/ventas">Ventas</nuxt-link>
                            </b-card-text>
                        </b-card>
                    </b-collapse>
                </div>
                <div class="nav-item" v-if="'Inventarios' in this.modulos">
                    <a class="nav-link" id="submenuInv" v-b-toggle.collapse-4 v-on:click="actInv = !actInv">
                        <div class="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                            <b-icon icon='box-seam' style="color:#000"></b-icon>
                        </div>
                        <span class="nav-link-text ms-1">Inventarios&nbsp;</span>
                        <span class="ms-5" >
                            <b-icon v-show='actInv' icon='chevron-down' style="width: 0.8em; height: 0.8em;" ></b-icon>
                            <b-icon v-show='!actInv' icon='chevron-up' style="width: 0.8em; height: 0.8em;"></b-icon>
                        </span>
                    </a>
                    <b-collapse id="collapse-4"> 
                        <b-card>
                            <b-card-text v-if="'Items' in this.modulos.Inventarios">
                                <nuxt-link to="/items">Items</nuxt-link>
                            </b-card-text>
                            <b-card-text v-if="'Inventarios' in this.modulos.Inventarios">
                                <nuxt-link to="/inventarios">Inventarios</nuxt-link>
                            </b-card-text>
                        </b-card>
                    </b-collapse>
                </div>
                <div class="nav-item" v-if="'Movimientos' in this.modulos">
                    <a class="nav-link" id="submenuMov" v-b-toggle.collapse-5 v-on:click="actMov= !actMov">
                        <div class="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                            <b-icon icon='cash-stack' style="color:#000"></b-icon>
                        </div>
                        <span class="nav-link-text ms-1">Contabilidad&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <span class="ms-4" >
                            <b-icon v-show='actMov' icon='chevron-down' style="width: 0.8em; height: 0.8em;" ></b-icon>
                            <b-icon v-show='!actMov' icon='chevron-up' style="width: 0.8em; height: 0.8em;"></b-icon>
                        </span>
                    </a>
                    <b-collapse id="collapse-5"> 
                        <b-card>
                            <b-card-text v-if="'Movimientos' in this.modulos.Movimientos">
                                <nuxt-link to="/movimientos">Movimientos</nuxt-link>
                            </b-card-text>
                            <b-card-text v-if="'TiposMovimientos' in this.modulos.Movimientos">
                                <nuxt-link to="/tiposmovimientos">Tipos de Movimientos</nuxt-link>
                            </b-card-text>
                        </b-card>
                    </b-collapse>
                </div>
            </ul>
        </div>
    </aside>
</template>

<script>
    import { getDecoded} from "@/utils/auth";
    export default{
        data(){
            return{
                actMov:true,
                actInv:true,
                actVent:true,
                actComp:true,
                actAdm:true,
                decoded_token:[],
                modulos:[]
            }
        },
        mounted(){
           this.decoded_token = getDecoded();
           this.modulos = this.decoded_token.autorizaciones.modulos;
        },
        methods:{
            
        }
    }
</script>
<style>
    aside .card-body{
        padding-left: 75px!important;
    }
    .card-body p{
        font-size: 0.9rem;
    }
</style>