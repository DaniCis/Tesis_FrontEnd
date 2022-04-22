<template>
    <aside class="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3 ps ps--active-y" id="sidenav-main">
        <div class="sidenav-header">
            <i class=" fas fa-times p-3 pe-3 cursor-pointer opacity-5 position-absolute end-0 top-0 d-none d-xl-none" @click='toggleSidenav' id="iconSidenav"></i>
            <a class="navbar-brand m-0" target="_blank">
                <img src="@/assets/img/CompunexLogo.png" class="navbar-brand-img h-100 ps-2" alt="main_logo">
            </a>
        </div>
        <hr class="horizontal dark mt-0">
        <div class="collapse navbar-collapse w-auto" id="sidenav-collapse-main">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <nuxt-link class="nav-link"  to="/dashboard" id='menuDash'  :class='{active: actInicio && !actAdm && !actInv && !actVent}'>
                        <div class="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                            <b-icon icon='house' style="color:#000"></b-icon>
                        </div>
                        <span class="nav-link-text ms-1">Inicio</span>
                    </nuxt-link>
                </li>
                 <div class="nav-item" v-if="'Administración' in this.modulos">
                    <a class="nav-link" ref="menuAdm" v-b-toggle.collapse-1 @click="actAdm = !actAdm " :class='{active: actAdm}' >
                        <div class="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                            <b-icon icon='tools' style="color:#000"></b-icon>
                        </div>
                        <span class="nav-link-text ms-1">Administración</span>
                        <span class="ps-4" >
                            <b-icon v-show='!actAdm' icon='chevron-down' style="width: 0.8em; height: 0.8em;" ></b-icon>
                            <b-icon v-show='actAdm' icon='chevron-up' style="width: 0.8em; height: 0.8em;"></b-icon>
                        </span>
                    </a>
                    <b-collapse id="collapse-1" :visible="abrirAdm"> 
                        <b-card>
                            <b-card-text v-if="'Usuarios' in this.modulos.Administración">
                                <nuxt-link to="/usuarios">Usuarios</nuxt-link>
                            </b-card-text>
                            <b-card-text v-if="'Roles' in this.modulos.Administración">
                                <nuxt-link to="/roles">Roles</nuxt-link>
                            </b-card-text>
                            <b-card-text v-if="'Módulos' in this.modulos.Administración">
                                <nuxt-link to="/módulos">Módulos</nuxt-link>
                            </b-card-text>
                            <b-card-text v-if="'Submódulos' in this.modulos.Administración">
                                <nuxt-link to="/submódulos">Submódulos</nuxt-link>
                            </b-card-text>
                        </b-card>
                    </b-collapse>
                </div>
                <li class="nav-item mt-3">
                    <h6 class="ps-4 ms-2 text-uppercase text-xs font-weight-bolder opacity-6">Módulos</h6>
                </li>
                <div class="nav-item" v-if="'Compras' in this.modulos">
                    <a class="nav-link" id="submenuCom" v-b-toggle.collapse-2 @click="actComp = !actComp" :class='{active: actComp}' >
                        <div class="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                            <b-icon icon='cart' style="color:#000"></b-icon>
                        </div>
                        <span class="nav-link-text ms-1">Compras</span>
                        <span class="ms-6">
                            <b-icon v-show='!actComp' icon='chevron-down' style="width: 0.8em; height: 0.8em;" ></b-icon>
                            <b-icon v-show='actComp' icon='chevron-up' style="width: 0.8em; height: 0.8em;"></b-icon>
                        </span>
                    </a>
                    <b-collapse id="collapse-2" :visible="abrirComp"> 
                        <b-card>
                            <b-card-text v-if="'Proveedores' in this.modulos.Compras">
                                <nuxt-link to="/proveedores">Proveedores</nuxt-link>
                            </b-card-text>
                            <b-card-text v-if="'OrdenCompra' in this.modulos.Compras">
                                <nuxt-link to="/compras">Orden de Compra</nuxt-link>
                            </b-card-text>
                        </b-card>
                    </b-collapse>
                </div>
                <div class="nav-item" v-if="'Ventas' in this.modulos">
                    <a class="nav-link" id="submenuVen" v-b-toggle.collapse-3 @click="actVent = !actVent" :class='{active: actVent}'>
                        <div class="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                            <b-icon icon='bag' style="color:#000"></b-icon>
                        </div>
                        <span class="nav-link-text ms-1">Ventas&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <span class="ms-6" >
                            <b-icon v-show='!actVent' icon='chevron-down' style="width: 0.8em; height: 0.8em;" ></b-icon>
                            <b-icon v-show='actVent' icon='chevron-up' style="width: 0.8em; height: 0.8em;"></b-icon>
                        </span>
                    </a>
                    <b-collapse id="collapse-3" :visible="abrirVent"> 
                        <b-card>
                            <b-card-text v-if="'Clientes' in this.modulos.Ventas">
                                <nuxt-link to="/clientes">Clientes</nuxt-link>
                            </b-card-text>
                            <b-card-text v-if="'OrdenVenta' in this.modulos.Ventas">
                                <nuxt-link to="/ventas">Orden de Ventas</nuxt-link>
                            </b-card-text>
                        </b-card>
                    </b-collapse>
                </div>
                <div class="nav-item" v-if="'Inventario' in this.modulos">
                    <a class="nav-link" id="submenuInv" v-b-toggle.collapse-4 @click="actInv = !actInv" :class='{active: actInv}'>
                        <div class="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                            <b-icon icon='box-seam' style="color:#000"></b-icon>
                        </div>
                        <span class="nav-link-text ms-1">Inventarios&nbsp;</span>
                        <span class="ms-5" >
                            <b-icon v-show='!actInv' icon='chevron-down' style="width: 0.8em; height: 0.8em;" ></b-icon>
                            <b-icon v-show='actInv' icon='chevron-up' style="width: 0.8em; height: 0.8em;"></b-icon>
                        </span>
                    </a>
                    <b-collapse id="collapse-4" :visible="abrirInv"> 
                        <b-card>
                            <b-card-text v-if="'Productos' in this.modulos.Inventario">
                                <nuxt-link to="/productos">Productos</nuxt-link>
                            </b-card-text>
                             <b-card-text v-if="'Bodega' in this.modulos.Inventario">
                                <nuxt-link to="/items">Bodega</nuxt-link>
                            </b-card-text>
                        </b-card>
                    </b-collapse>
                </div>
                <div class="nav-item" v-if="'Garantías' in this.modulos">
                    <a class="nav-link" id="submenuMov" v-b-toggle.collapse-5 @:click="actGar= !actGar">
                        <div class="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                            <b-icon icon='cash-stack' style="color:#000"></b-icon>
                        </div>
                        <span class="nav-link-text ms-1">Garantías&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <span class="ms-4" >
                            <b-icon v-show='actGar' icon='chevron-down' style="width: 0.8em; height: 0.8em;" ></b-icon>
                            <b-icon v-show='!actGar' icon='chevron-up' style="width: 0.8em; height: 0.8em;"></b-icon>
                        </span>
                    </a>
                    <b-collapse id="collapse-5" > 
                        <b-card>
                            <b-card-text v-if="'Garantías' in this.modulos.Garantías">
                                <nuxt-link to="/garantías">Garantías</nuxt-link>
                            </b-card-text>
                        </b-card>
                    </b-collapse>
                </div>
            </ul>
        </div>
    </aside>
</template>

<script>
    import { getMenuAuth,} from "~/utils/auth"
    export default{
        data(){
            return{
                actGar:true,
                actInv:false,
                actVent:false,
                actComp:false,
                actAdm:false,
                actInicio:true,
                abrirAdm:false,
                abrirInv:false,
                abrirComp:false,
                abrirVent:false,
                modulos:[],
                submodulos:[],
            }
        },
        mounted(){
            this.modulos = getMenuAuth()
            this.verificarRuta(this.$route.name)
        },
        methods:{
            verificarRuta(ruta){
                if(ruta =='usuarios' || ruta =='roles' ||ruta =='módulos' ||ruta =='submódulos' ){
                    this.abrirAdm=true
                    this.actAdm= true
                    this.actInicio= false
                }
                else if(ruta =='compras' || ruta =='proveedores'){
                    this.abrirComp=true
                    this.actComp= true
                    this.actInicio= false
                }
                else if(ruta =='ventas' || ruta =='clientes'){
                    this.abrirVent=true
                    this.actVent= true
                    this.actInicio= false
                }
                else if(ruta =='productos' || ruta =='items'){
                    this.abrirInv=true
                    this.actInv= true
                    this.actInicio= false
                }
            },
            
            toggleSidenav() {
                var body = document.getElementById("mainDashboard");
                var sidenav = document.getElementById("sidenav-main");
                var iconSidenav = document.getElementById("iconSidenav");
                if (body.classList.contains("g-sidenav-pinned")) {
                    body.classList.remove("g-sidenav-pinned");
                    setTimeout(function () {
                        sidenav.classList.remove("bg-white");
                    }, 100);
                    sidenav.classList.remove("bg-transparent");
                }
                else {
                    body.classList.add("g-sidenav-pinned");
                    sidenav.classList.add("bg-white");
                    sidenav.classList.remove("bg-transparent");
                    iconSidenav.classList.remove("d-none");
                }
            },
        }
    }
</script>