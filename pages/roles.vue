<template>
    <div class="g-sidenav-show  bg-gray-100 vh-completa" id='mainDashboard'> 
        <Sidebar />
        <Navbar :Modulo='"Administración"' :Tabla='"Roles"'/>
        <main class="main-content position-relative max-height-vh-100 mt-1 border-radius-lg media-left">
            <div class="container-fluid py-4">
                <div class="row">
                    <div class="col-12">
                        <div class="card mb-4">
                            <div class="card-header pb-0">
                                <div class="d-lg-flex">
                                    <div>
                                        <h5>Roles</h5>
                                    </div>
                                    <div class="ms-auto my-auto mt-lg-0 mt-4">
                                        <div class="ms-auto my-auto">
                                            <a href='./rol/nuevoRol' class="btn bg-gradient-primary btn-sm mb-0"> +&nbsp; Nuevo rol</a>
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
                                                    <th class="text-uppercase text-secondary text-xs font-weight-bolder opacity-7">Id</th>
                                                    <th class="text-uppercase text-secondary text-xs font-weight-bolder opacity-7 ps-2">Nombre</th>
                                                    <th class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7">Descripción</th>
                                                    <th class="text-secondary opacity-7"></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="rol in this.roles">
                                                        <td>
                                                        <h6 class=" ms-3 mb-2 text-sm">{{rol.id_rol}}</h6>
                                                        </td>
                                                        <td>
                                                            <p class="text-s font-weight-bold mb-0">{{rol.nombre_rol}}</p>
                                                        </td>
                                                        <td class="align-middle text-center text-sm">
                                                            <p class="text-s font-weight-bold mb-0">{{rol.descripcion_rol}}</p>
                                                        </td>
                                                        <td class="align-middle">
                                                            <div class="contenedorAcciones">
                                                                <NuxtLink  :to="{name:'rol-rolId', params:{rolId: rol.id_rol}}">
                                                                    <b-icon class='mx-3' icon='pencil-square' style="width: 1.2em; height: 1.2em;"></b-icon>
                                                                </NuxtLink>
                                                                <a class="trash" v-on:click='eliminarRol(rol.id_rol)'>
                                                                    <b-icon icon='trash cursor-pointer' style="width: 1.2em; height: 1.2em; color: #ff0c0c;"></b-icon>
                                                                </a>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div class="dataTable-bottom">
                                            <div class="dataTable-info">1 de {{this.roles.length}} </div>
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
import { getAccessToken } from '~/utils/auth';
    axios.defaults.baseURL ='http://10.147.17.173:5000';
    
    export default{
    data() {
        return {
            roles: []
        };
    },
    async mounted(){
        if(getAccessToken()){
            await axios.get('/roles')
            .then(response => {
                this.roles = response.data;
            }).catch (e=> {
                console.log(e.message)
            })
        }
    },
    methods: {
        async eliminarRol(rolId){
            if(getAccessToken()){
                await axios.delete(`/roles/${rolId}`)
                .then((response) => {
                    console.log("correcto")
                }).catch (e=> {
                    console.log(e.message)
                })
            }
        }
    },
    components: { Sidebar, Navbar }
}
</script>