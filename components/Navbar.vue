<template>
    <nav class="navbar navbar-main navbar-expand-lg px-0 mx-4 border-radius-xl shadow-none" id="navbarBlur" navbar-scroll="false">
        <div class="container-fluid py-1 px-3">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
                    <li class="breadcrumb-item text-sm">
                        <span class="opacity-5 text-dark" >{{Modulo}}</span>    
                    </li>
                    <li class="breadcrumb-item text-sm text-dark active" aria-current="page">{{Tabla}}</li>
                </ol>
                <h6 class="font-weight-bolder mb-0">{{Tabla}}</h6>
           </nav>
            <div class="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
                <div class="ms-md-auto pe-md-3 d-flex align-items-center">
                    <div class="input-group">
                        <span class="input-group-text text-body">
                            <b-icon icon='search' style="width: 0.8em; height: 0.8em;"></b-icon>
                        </span>
                        <input type="text" class="form-control" placeholder="Buscar" v-model.lazy="searchInput">
                        <span class="input-group-text" >
                            <b-icon @click='clearSearch' v-show="searchInput !== ''" icon='x' style="width: 0.8em; height: 0.8em;"></b-icon>
                        </span>
                    </div>
                </div>
                <ul class="navbar-nav  justify-content-end">
                    <li class="nav-item d-flex align-items-center">
                        <a href="" class="nav-link text-body font-weight-bold px-0">
                            <b-icon icon='person' ></b-icon>
                            <span class="d-sm-inline d-none">{{this.decoded_token.nombre_usuario}}</span>
                        </a>
                    </li> 
                    <li class="nav-item d-xl-none ps-3 d-flex align-items-center">
                        <i v-on:click='toggleSidenav();' class="nav-link text-body p-0" id="iconNavbarSidenav">
                            <div class="sidenav-toggler-inner">
                                <i class="sidenav-toggler-line"></i>
                                <i class="sidenav-toggler-line"></i>
                                <i class="sidenav-toggler-line"></i>
                            </div>
                        </i>
                    </li>
                    <li class="nav-item px-3 d-flex align-items-center">
                        <a href="javascript:;" class="nav-link text-body p-0">
                            <b-icon icon='gear' class="fixed-plugin-button-nav cursor-pointer"></b-icon>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
    import { getDecoded } from "~/utils/auth";
    export default{
        props:['Modulo','Tabla'],
        name:'Navbar',
        data(){
            return {
                searchInput: '',
                decoded_token:[]
            }
        },
        mounted(){
            this.decoded_token = getDecoded();
        },
        methods: {
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
            clearSearch(){  
                this.searchInput = ''
            },
        },
    }
</script>
