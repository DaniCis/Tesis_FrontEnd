<template>
    <div class="g-sidenav-show  bg-gray-100 vh-completa" id='mainDashboard'>
        <Sidebar/>
        <Navbar :Modulo='"Administración"' :Tabla='"Permisos"'/>
        <main class="main-content position-relative max-height-vh-100 mt-1 border-radius-lg media-left">
             <div class="container-fluid py-4">
                <div class="row">
                    <div class="col-12">
                        <div class="card mb-4">
                            <div class="card-header pb-0">
                                <div class="d-lg-flex">
                                    <div>
                                        <h5>Permisos</h5>
                                    </div>
                                    <div class="ms-auto my-auto mt-lg-0 mt-4" >
                                        <div class="ms-auto my-auto">
                                            <a  class="btn bg-gradient-primary btn-sm mb-0"> +&nbsp; Nuevo permiso</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body px-0 pt-0 pb-2">
                                <div class="table-responsive p-0">
                                    <div class="dataTable-wrapper dataTable-loading no-footer sortable searchable fixed-columns">
                                        <div class="dataTable-top">
                                            <div class="dataTable-dropdown">
                                                <label style="width: 200px"> 
                                                    <select class="form-select dataTable-selector" v-model='porPag'>
                                                        <option value=5>5</option>
                                                        <option value=10>10</option>
                                                        <option value=15>15</option>
                                                    </select>
                                                    Registros por página
                                                </label>
                                            </div>
                                        </div>
                                        <div class="dataTable-container">
                                            <table class="table table-flush dataTable-table">
                                                <thead>
                                                    <tr>
                                                        <th class="text-uppercase text-secondary text-xs font-weight-bolder opacity-7">Id</th>
                                                        <th class="text-uppercase text-secondary text-xs font-weight-bolder opacity-7 ps-2">Submódulo</th>
                                                        <th colspan="4" class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7">Permisos</th>
                                                        <th class="text-secondary opacity-7"></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="permiso in paginador(this.permisos)">
                                                        <td>
                                                            <h6 class="ms-3 mb-2 text-sm">1</h6>
                                                        </td>
                                                        <td>
                                                            <p class="text-sm font-weight-bold mb-0">{{permiso.nombre_submodulo}}</p>
                                                        </td>
                                                        <td class="align-middle text-md">
                                                            <div class="form-check">
                                                                <input v-if="permiso.crearProceso_autorizacion == true" class="form-check-input" type="checkbox" value="" id="check1" checked>
                                                                <input v-else class="form-check-input" type="checkbox" value="" id="check1" >
                                                                <label class="form-check-label" for="check1">Crear</label>
                                                            </div>
                                                        </td>
                                                        <td class="align-middle text-md">
                                                            <div class="form-check">
                                                                <input v-if="permiso.leerProceso_autorizacion == true" class="form-check-input" type="checkbox" value="" id="check2" checked>
                                                                <input v-else class="form-check-input" type="checkbox" value="" id="check2">
                                                                <label class="form-check-label" for="check2">Leer</label>
                                                            </div>
                                                        </td>
                                                        <td class="align-middle text-md">
                                                            <div class="form-check">
                                                                <input v-if="permiso.editarProceso_autorizacion == true" class="form-check-input" type="checkbox" value="" id="check3" checked>
                                                                <input v-else class="form-check-input" type="checkbox" value="" id="check3">
                                                                <label class="form-check-label" for="check3">Editar</label>
                                                            </div>
                                                        </td>
                                                        <td class="align-middle text-md">
                                                            <div class="form-check">
                                                                <input v-if="permiso.eliminarProceso_autorizacion == true" class="form-check-input" type="checkbox" value="" id="check4" checked>
                                                                <input v-else class="form-check-input" type="checkbox" value="" id="check3">
                                                                <label class="form-check-label" for="check4">Eliminar</label>
                                                            </div>
                                                        </td>
                                                        <td class="align-middle">
                                                            <div class="contenedorAcciones">
                                                                <div >
                                                                    <a class="cursor-pointer" >
                                                                        <b-icon  class='mx-3' icon='pencil-square' style="width: 1.2em; height: 1.2em"></b-icon>
                                                                    </a>
                                                                </div>
                                                                <div >
                                                                    <a class="trash cursor-pointer" >
                                                                        <b-icon class="icon" icon='trash' style="width: 1.2em; height: 1.2em; color: #ff0c0c;"></b-icon>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div class="dataTable-bottom">
                                            <div class="dataTable-info"> </div>
                                            <nav class="dataTable-pagination">
                                                <b-pagination
                                                v-model="pagActual"
                                                :total-rows="this.permisos.length"
                                                :per-page="porPag"
                                                ></b-pagination>
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
    import { getAccessToken, getSubmodulos } from '~/utils/auth';
    axios.defaults.baseURL ='http://10.147.17.173:5000';

    export default{
        components: { Sidebar, Navbar},
        middleware: 'authenticated',
        data(){
            return{
                permisos:[],
                inicio:'',
                fin:'',
                pagActual:1,
                porPag:5,
            }
        },
        async mounted(){
            this.getPermisos(3)
        },
        methods:{
            async getPermisos(rolId){
                await axios.get(`/rol_submodulos/${rolId}`,{ headers:{ Authorization: 'Bearer ' + getAccessToken() }
                }).then(response => {
                    this.permisos = response.data;
                    console.log(this.permisos)
                })
                .catch(e => {
                     this.$toast.error('Ocurrió un error al cargar: ' + e.message)
                })
            },
            paginador(items) {
                const inicio = (this.pagActual - 1) * this.porPag;
                const final =
                    inicio + this.porPag > items.length
                    ? items.length
                    : inicio  + this.porPag;
                this.inicio = inicio + 1
                this.fin = final
                return items.slice(inicio, final);
            }
        }
        
    }

</script>