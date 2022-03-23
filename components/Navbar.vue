<template>
    <nav class="navbar navbar-main navbar-expand-lg px-0 mx-4 border-radius-xl shadow-none" id="navbarBlur" navbar-scroll="false">
        <div class="container-fluid py-1 px-3">
            <div class="nav-item d-xl-none d-flex">
                <i v-on:click='toggleSidenav' class="nav-link text-body p-0" id="iconNavbarSidenav">
                    <div class="sidenav-toggler-inner">
                        <b-icon icon='list' font-scale="2" ></b-icon>
                    </div>
                </i>
            </div>
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
                <div class="ms-md-auto pe-md-3"></div>
                <ul class="navbar-nav justify-content-end" >
                    <li class="nav-item d-flex align-items-center">
                        <a class="nav-link px-0 font-weight-bold">
                            <b-icon icon='person-fill' style="width: 1.3em; height: 1.3em"></b-icon>
                            <span class="d-sm-inline d-none">{{this.user}}</span>
                        </a>
                    </li>
                    <li class="nav-item px-3 d-flex align-items-center">
                        <div class="nav-link cursor-pointer" >
                            <b-icon @click="logout" icon='box-arrow-right' variant="dark" style="width: 1.3em; height: 1.3em"></b-icon>
                            <a @click="logout" class="d-sm-inline d-none">
                            Cerrar Sesión</a>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
    import { getUser } from "~/utils/auth";
    export default{
        props:['Modulo','Tabla'],
        name:'Navbar',
        data(){
            return {
                searchInput: '',
                user:'',
            }
        },
        mounted(){
           this.user = getUser()
        },
        methods: {
            toggleSidenav() {
                let body = document.getElementById("mainDashboard");
                let sidenav = document.getElementById("sidenav-main");
                let iconSidenav = document.getElementById("iconSidenav");
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
            async logout(){
                await this.$auth.logout();
            }
        },
    }
</script>
