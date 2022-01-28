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
                    <a class="nav-link active" href="/dashboard">
                        <div class="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                            <b-icon icon='house' style="color:#fff"></b-icon>
                        </div>
                        <span class="nav-link-text ms-1">Inicio</span>
                    </a>
                </li>
                 <div class="nav-item">
                    <a class="nav-link" id="submenuAdm" v-b-toggle.collapse-1 v-on:click="chevron_up_down('submenuAdm','show_upAdm','show_downAdm')" >
                        <div class="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                            <b-icon icon='tools' style="color:#000"></b-icon>
                        </div>
                        <span class="nav-link-text ms-1">Administración</span>
                        <span class="ps-4" >
                            <b-icon icon='chevron-down' id="show_downAdm" style="width: 0.8em; height: 0.8em;" ></b-icon>
                            <b-icon icon='chevron-up' class='d-none' id="show_upAdm" style="width: 0.8em; height: 0.8em;"></b-icon>
                        </span>
                    </a>
                    <b-collapse id="collapse-1"> 
                        <b-card>
                            <b-card-text>
                                <nuxt-link to="/usuarios">Usuarios</nuxt-link>
                            </b-card-text>
                            <b-card-text>
                                <nuxt-link to="/roles">Roles</nuxt-link>
                            </b-card-text>
                            <b-card-text>
                                <nuxt-link to="/autorizaciones">Autorizaciones</nuxt-link>
                            </b-card-text>
                        </b-card>
                    </b-collapse>
                </div>
                <li class="nav-item mt-3">
                    <h6 class="ps-4 ms-2 text-uppercase text-xs font-weight-bolder opacity-6">Módulos</h6>
                </li>
                <div class="nav-item">
                    <a class="nav-link" id="submenuCom" v-b-toggle.collapse-2 v-on:click="chevron_up_down('submenuCom','show_upCom','show_downCom')">
                        <div class="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                            <b-icon icon='cart' style="color:#000"></b-icon>
                        </div>
                        <span class="nav-link-text ms-1">Compras</span>
                        <span class="ms-6">
                            <b-icon icon='chevron-down' id="show_downCom" style="width: 0.8em; height: 0.8em;" ></b-icon>
                            <b-icon icon='chevron-up' class='d-none' id="show_upCom" style="width: 0.8em; height: 0.8em;"></b-icon>
                        </span>
                    </a>
                    <b-collapse id="collapse-2"> 
                        <b-card>
                            <b-card-text>
                                <nuxt-link to="/roles">Proveedores</nuxt-link>
                            </b-card-text>
                            <b-card-text>
                                <nuxt-link to="/roles">Compras</nuxt-link>
                            </b-card-text>
                        </b-card>
                    </b-collapse>
                </div>
                <div class="nav-item">
                    <a class="nav-link" id="submenuVen" v-b-toggle.collapse-3 v-on:click="chevron_up_down('submenuVen','show_upVen','show_downVen')">
                        <div class="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                            <b-icon icon='bag' style="color:#000"></b-icon>
                        </div>
                        <span class="nav-link-text ms-1">Ventas&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <span class="ms-6" >
                            <b-icon icon='chevron-down' id="show_downVen" style="width: 0.8em; height: 0.8em;" ></b-icon>
                            <b-icon icon='chevron-up' class='d-none' id="show_upVen" style="width: 0.8em; height: 0.8em;"></b-icon>
                        </span>
                    </a>
                    <b-collapse id="collapse-3"> 
                        <b-card>
                            <b-card-text>
                                <nuxt-link to="/roles">Clientes</nuxt-link>
                            </b-card-text>
                            <b-card-text>
                                <nuxt-link to="/roles">Ventas</nuxt-link>
                            </b-card-text>
                        </b-card>
                    </b-collapse>
                </div>
                <div class="nav-item">
                    <a class="nav-link" id="submenuInv" v-b-toggle.collapse-4 v-on:click="chevron_up_down('submenuInv','show_upInv','show_downInv')">
                        <div class="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                            <b-icon icon='box-seam' style="color:#000"></b-icon>
                        </div>
                        <span class="nav-link-text ms-1">Inventarios&nbsp;</span>
                        <span class="ms-5" >
                            <b-icon icon='chevron-down' id="show_downInv" style="width: 0.8em; height: 0.8em;" ></b-icon>
                            <b-icon icon='chevron-up' class='d-none' id="show_upInv" style="width: 0.8em; height: 0.8em;"></b-icon>
                        </span>
                    </a>
                    <b-collapse id="collapse-4"> 
                        <b-card>
                            <b-card-text>
                                <nuxt-link to="/roles">Items</nuxt-link>
                            </b-card-text>
                            <b-card-text>
                                <nuxt-link to="/roles">Inventarios</nuxt-link>
                            </b-card-text>
                        </b-card>
                    </b-collapse>
                </div>
                <div class="nav-item">
                    <a class="nav-link" id="submenuMov" v-b-toggle.collapse-5 v-on:click="chevron_up_down('submenuMov','show_upCon','show_downCon')">
                        <div class="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                            <b-icon icon='cash-stack' style="color:#000"></b-icon>
                        </div>
                        <span class="nav-link-text ms-1">Contabilidad&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <span class="ms-4" >
                            <b-icon icon='chevron-down' id="show_downCon" style="width: 0.8em; height: 0.8em;" ></b-icon>
                            <b-icon icon='chevron-up' class='d-none' id="show_upCon" style="width: 0.8em; height: 0.8em;"></b-icon>
                        </span>
                    </a>
                    <b-collapse id="collapse-5"> 
                        <b-card>
                            <b-card-text>
                                <nuxt-link to="/roles">Movimientos</nuxt-link>
                            </b-card-text>
                        </b-card>
                    </b-collapse>
                </div>
            </ul>
        </div>
    </aside>
</template>

<script>
    export default{
        methods:{
            chevron_up_down(submenu, up, down) {
                var menu = document.getElementById(submenu);
                var show_up = document.getElementById(up);
                var show_down = document.getElementById(down);
                var className = "not-collapsed";
                show_up.classList.remove("d-none");
                if (menu.classList.contains(className)){
                    show_up.style.display = 'none';
                    show_down.style.display = 'block';
                }else {
                    show_up.style.display = "block";
                    show_down.style.display = "none";
                }
            },
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