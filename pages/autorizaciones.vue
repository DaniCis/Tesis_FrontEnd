<template>
    <div class="g-sidenav-show bg-gray-10 vh-completa" id='mainDashboard'>
        <Sidebar />
        <Navbar :Modulo='"Administracion"' :Tabla='"Autorizaciones"'/>
        <main class="main-content position-relative max-height-vh-100 mt-1 border-radius-lg media-left">
            <div class="container-fluid py-4">
                <div class="row">
                    <div class="col-12">
                        <div class="card mb-4">
                            <div class="card-header pb-0">
                                <div class="d-lg-flex">
                                    <div>
                                        <h5>Autorizaciones</h5>
                                    </div>
                                    <div class="ms-auto my-auto mt-lg-0 mt-4">
                                        <div class="ms-auto my-auto">
                                            <a href='' class="btn bg-gradient-primary btn-sm mb-0"> +&nbsp; Nueva autorización</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body px-0 pt-0 pb-2">
                                <div class="table-responsive">
                                    <div class="dataTable-wrapper dataTable-loading no-footer sortable searchable fixed-columns">
                                        <div class="dataTable-top">
                                            <div class="dataTable-dropdown">
                                                <label>
                                                    <select class="dataTable-selector">
                                                        <option value="5">5</option>
                                                        <option value="10">10</option>
                                                        <option value="15">15</option>
                                                    </select>
                                                    Entradas por pagina
                                                </label>
                                            </div>
                                        </div>
                                        <div class="dataTable-container">
                                            <table class="table table-flush dataTable-table">
                                                <thead>
                                                    <tr>
                                                    <th class="text-uppercase text-secondary text-xs font-weight-bolder opacity-7">ID</th>
                                                    <th class="text-uppercase text-secondary text-xs font-weight-bolder opacity-7 ps-2">Crear</th>
                                                    <th class="text-uppercase text-secondary text-xs font-weight-bolder opacity-7 ps-2">Leer</th>
                                                    <th class="text-uppercase text-secondary text-xs font-weight-bolder opacity-7 ps-2">Editar</th>
                                                    <th class="text-uppercase text-secondary text-xs font-weight-bolder opacity-7 ps-2">Eliminar</th>
                                                    <th class="text-secondary opacity-7"></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="autorizacion in this.autorizaciones">
                                                        <td>
                                                            <h6 class=" ms-3 mb-2 text-sm">{{autorizacion.id_autorizacion}}</h6>
                                                        </td>
                                                        <td>
                                                            <p class="text-s font-weight-bold mb-0">{{autorizacion.crearProceso_autorizacion}}</p>
                                                        </td>
                                                        <td>
                                                            <p class="text-s font-weight-bold mb-0">{{autorizacion.leerProceso_autorizacion}}</p>
                                                        </td>
                                                        <td>
                                                            <p class="text-s font-weight-bold mb-0">{{autorizacion.editarProceso_autorizacion}}</p>
                                                        </td>
                                                        <td>
                                                            <p class="text-s font-weight-bold mb-0">{{autorizacion.eliminarProceso_autorizacion}}</p>
                                                        </td>
                                                        <td class="align-middle">
                                                            <div class="contenedorAcciones">
                                                                <NuxtLink class="text-secondary font-weight-bold text-xs" :to="{name:'autorizacion-autorizacionId', params:{autorizacionId: autorizacion.id_autorizacion}}">
                                                                    <span class="badge badge-sm bg-gradient-secondary" style="padding:6.6px 10px;">
                                                                        <b-icon icon='pencil-square' style="width: 20px; height: 20px;"></b-icon>
                                                                    </span>
                                                                </NuxtLink>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div class="dataTable-bottom">
                                            <div class="dataTable-info">1 de 7 </div>
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
                                                        <a></a>
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
    import {getAccessToken} from "@/utils/auth";
    import axios from 'axios';
    import Sidebar from '~/components/Sidebar.vue'; 
    import Navbar from '~/components/Navbar.vue';
    axios.defaults.baseURL ='http://10.147.17.173:5000';

    export default{
        data(){
            return{
                autorizaciones:[]
            }
        },
         async mounted(){
            await axios.get('/autorizaciones',{
                headers:{
                    Authorization: `Bearer ${getAccessToken()}`
                }
            }).then(response => {
                this.autorizaciones = response.data;
            });
        },
        methods: {},
        components: { Sidebar, Navbar }
    }
</script>