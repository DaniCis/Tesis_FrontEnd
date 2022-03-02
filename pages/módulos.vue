<template>
    <div class="g-sidenav-show  bg-gray-100 vh-completa" id='mainDashboard'>
        <Sidebar />
        <Navbar :Modulo='"Administración"' :Tabla='"Módulos"'/>
        <main class="main-content position-relative max-height-vh-100 mt-1 border-radius-lg media-left">
            <div class="container-fluid py-4">
                <div class="row">
                    <div class="col-12">
                        <div class="card mb-4">
                            <div class="card-header pb-0">
                                 <div class="d-lg-flex">
                                    <div>
                                        <h5>Módulos</h5>
                                    </div>
                                    <div class="ms-auto my-auto mt-lg-0 mt-4">
                                        <div class="ms-auto my-auto">
                                            <a href='./modulo/nuevoModulo' class="btn bg-gradient-primary btn-sm mb-0"> +&nbsp; Nuevo módulo</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body px-0 pt-0 pb-2">
                                <div class="table-responsive p-0">
                                    <div class="dataTable-wrapper dataTable-loading no-footer sortable searchable fixed-columns">
                                        <div class="dataTable-top">
                                            <div class="dataTable-dropdown">
                                                <label>
                                                    <select class="dataTable-selector">
                                                        <option value="5">5</option>
                                                        <option value="10">10</option>
                                                        <option value="15">15</option>
                                                    </select>
                                                    Entradas por página
                                                </label>
                                            </div>
                                        </div>
                                        <div class="dataTable-container">
                                            <table class="table table-flush dataTable-table">
                                                <thead>
                                                    <tr>
                                                    <th class="text-uppercase text-secondary text-xs font-weight-bolder opacity-7">ID</th>
                                                    <th class="text-uppercase text-secondary text-xs font-weight-bolder opacity-7 ps-2">Nombre</th>
                                                    <th class="text-secondary opacity-7"></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="modulo in this.modulos">
                                                        <td>
                                                            <h6 class=" ms-3 mb-2 text-sm">{{modulo.id_modulo}}</h6>
                                                        </td>
                                                        <td>
                                                            <p class="text-s font-weight-bold mb-0">{{modulo.nombre_modulo}}</p>
                                                        </td>
                                                        <td class="align-middle">
                                                            <div class="contenedorAcciones">
                                                                <NuxtLink :to="{name:'modulo-moduloId', params:{moduloId: modulo.id_modulo}}">
                                                                    <b-icon  class='mx-3' icon='pencil-square' style="width: 1.2em; height: 1.2em"></b-icon>
                                                                </NuxtLink>
                                                                <a class="trash" v-on:click='eliminarModulo(modulo.id_modulo)'>
                                                                    <b-icon class="icon cursor-pointer" icon='trash' style="width: 1.2em; height: 1.2em;color: #ff0c0c;"></b-icon>
                                                                </a>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div class="dataTable-bottom">
                                            <div class="dataTable-info">1 de {{this.modulos.length}}</div>
                                            <nav class="dataTable-pagination">
                                                <ul class="dataTable-pagination-list">
                                                    <li class="pager">
                                                        <a>‹</a>
                                                    </li>
                                                    <li class="active">
                                                        <a>1</a>
                                                    </li>
                                                    <li class="pager">
                                                        <a>2</a>
                                                    </li>
                                                    <li class="pager">
                                                        <a>3</a>
                                                    </li>
                                                    <li class="pager">
                                                        <a>›</a>
                                                    </li>
                                                </ul>
                                            </nav>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
    import axios from 'axios';
    import Sidebar from '~/components/Sidebar.vue';
    import Navbar from '~/components/Navbar.vue';
    axios.defaults.baseURL ='http://10.147.17.173:5000';
    
    export default{
        data() {
            return {
                modulos:[]
            };
        },
        fetch ({ store, redirect }) {
            if (!store.state.user) {
                return redirect('/')
            }
        },
        async mounted(){
            if(this.$store.state.token){
                await axios.get('/modulos')
                .then(response => {
                    this.modulos = response.data;
                    console.log(this.modulos);
                })
                .catch(e => {
                    console.log(e.message)
                })
            }
        },
        methods: {
            async eliminarModulo(moduloId){
                if(this.$store.state.token){
                    await axios.delete(`/modulos/${moduloId}`)
                    .then(response => {
                        console.log("bien");
                    })
                    .catch(e => {
                        console.log(e.message)
                    })
                }
            }   
        },
        components: { Sidebar, Navbar }
    }
</script>