<template>
    <div class="g-sidenav-show bg-gray-10 vh-completa" id='mainDashboard'> 
        <Sidebar />
        <Navbar :Modulo='"Inventario"' :Tabla='"Bodega"'/>
        <main class="main-content position-relative max-height-vh-100 mt-1 border-radius-lg media-left">
            <div class="container-fluid py-4">
                <div class="row">
                    <div class="col-12">
                        <div class="card mb-4">
                            <div class="card-header pb-0">
                                 <div class="d-lg-flex">
                                    <div>
                                        <h5>Items</h5>
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
                                                        <option value=10>10</option>
                                                        <option value=20>20</option>
                                                        <option value=30>30</option>
                                                    </select>
                                                    Registros por página
                                                </label>
                                            </div>
                                        </div>
                                        <div class="dataTable-container">
                                            <table id='content-table' class="table table-flush dataTable-table">
                                                <thead>
                                                    <tr>
                                                        <th class="text-uppercase text-secondary text-xs font-weight-bolder opacity-7">ID</th>
                                                        <th class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7 ps-2">Producto Asociado</th>
                                                        <th class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7">PVP</th>
                                                        <th class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7">PVD</th>
                                                        <th class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7">Num Serie</th>
                                                        <th class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7">Descuento</th>
                                                        <th class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7">Estado</th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-if="error">
                                                        <td colspan="7" class="text-center align">
                                                            <h6 class="ms-3 mb-2 text-sm text-center mt-4">No existen registros</h6> 
                                                        </td>       
                                                    </tr>
                                                    <tr v-for="item in paginador(this.items)">
                                                        <td>
                                                            <h6 class=" ms-3 mb-2 text-sm">{{item.id_item}}</h6>
                                                        </td>
                                                        <td class="align-middle text-center text-sm">
                                                            <p class="text-s font-weight-bold mb-0">{{item.nombre_producto}}</p>
                                                        </td>
                                                        <td class="align-middle text-center text-sm">
                                                            <p class="text-s font-weight-bold mb-0">{{item.pvp_item}}</p>
                                                        </td>
                                                        <td class="align-middle text-center text-sm">
                                                            <p class="text-s font-weight-bold mb-0">{{item.pvd_item}}</p>
                                                        </td>
                                                        <td class="align-middle text-center text-sm">
                                                            <p class="text-s font-weight-bold mb-0">{{item.numeroSerie_item}}</p>
                                                        </td>
                                                        <td class="align-middle text-center text-sm">
                                                            <p class="text-s font-weight-bold mb-0">%{{item.descuento_item}}</p>
                                                        </td>
                                                        <td class="align-middle text-center text-sm">
                                                            <div v-if="item.estado_item == 'Disponible'"> 
                                                                <span class="badge badge-sm bg-gradient-success">Disponible</span>
                                                            </div>
                                                            <div v-else>
                                                                <span class="badge badge-sm bg-gradient-danger">Vendido</span>
                                                            </div>
                                                        </td>
                                                        <td class="align-middle">
                                                            <div class="contenedorAcciones" >
                                                                <div v-if="editar">
                                                                    <nuxt-link :to="{name:'item-itemId',params:{itemId: item.id_item}}">
                                                                        <b-icon  class='mx-3' icon='pencil-square' style="width: 1.2em; height: 1.2em"></b-icon>
                                                                    </nuxt-link>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div class="dataTable-bottom">
                                            <nav class="dataTable-pagination">
                                                <b-pagination
                                                v-model="pagActual"
                                                :total-rows="this.items.length"
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
    
    export default{
        components: { Sidebar, Navbar },
        middleware: 'authenticated',
        data(){
            return{
                permisosCrud:[],
                items:[],
                editar:null,
                error:false,
                pagActual:1,
                porPag:10,
            }
        },
        async mounted(){
            this.permisosCrud = getSubmodulos('Inventario','Bodega')
            if('editar' in this.permisosCrud)
                this.editar = true
            if('leer' in this.permisosCrud)
                this.getItems()
            else
                this.$toast.error('No tiene permiso de lectura')
        },
        methods:{
            async getItems(){
                await axios.get('http://10.147.17.173:5002/items',{ headers:{ Authorization: 'Bearer ' + getAccessToken() }
                }).then(response => {
                    if(response.data !=null)
                        this.items = response.data
                    else
                        this.error=true
                }).catch (e=> {
                    this.$toast.error(e.response.data.detail)
                })
            },
            paginador(items) {
                const inicio = (this.pagActual - 1) * this.porPag;
                const final =
                    inicio + this.porPag > items.length
                    ? items.length
                    : inicio  + this.porPag;
                return items.slice(inicio, final);
            }
        },
    }

</script>