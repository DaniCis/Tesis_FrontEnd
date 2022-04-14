<template>
    <div class="g-sidenav-show  bg-gray-100 vh-completa" id='mainDashboard'> 
        <Sidebar />
        <Navbar :Modulo='"Compras"' :Tabla='"Orden de Compra"'/>
        <main class="main-content position-relative max-height-vh-100 mt-1 border-radius-lg media-left">
            <div class="container-fluid py-4">
                <div class="row">
                    <div class="col-12">
                        <div class="card mb-4">
                            <div class="card-header pb-0">
                                <div class="d-lg-flex">
                                    <div>
                                        <h5>Órdenes de Compra</h5>
                                    </div>
                                    <div class="ms-auto my-auto mt-lg-0 mt-4" v-if="crear">
                                        <div class="ms-auto my-auto">
                                            <nuxt-link :to="{name:'nuevaCompra'}" class="btn bg-gradient-primary btn-sm mb-0">
                                            +&nbsp; Nueva Orden de Compra
                                            </nuxt-link>
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
                                                         <option value=10>10</option>
                                                        <option value=20>20</option>
                                                        <option value=30>30</option>
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
                                                    <th class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7 ps-2"> # de Factura</th>
                                                    <th class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7 ps-2">Fecha</th>
                                                    <th class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7 ps-2">Proveedor</th>
                                                    <th class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7 ps-2">Total</th>
                                                    <th></th>
                                                    <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-if="error">
                                                        <td colspan="4">
                                                            <h6 class="ms-3 mb-2 text-sm text-center mt-4">No existen registros</h6> 
                                                        </td>       
                                                    </tr>
                                                    <tr v-for="compra in paginador(this.compras)">
                                                        <td>
                                                            <h6 class=" ms-3 mb-2 text-sm">{{compra.id_compra}}</h6>
                                                        </td>
                                                        <td class="align-middle text-center text-sm">
                                                            <p class="text-sm font-weight-bold mb-0">{{compra.numeroFactura_compra}}</p>
                                                        </td>
                                                        <td class="align-middle text-center text-sm">
                                                            <p class="text-s font-weight-bold mb-0">{{compra.fecha_compra}}</p>
                                                        </td>
                                                        <td class="align-middle text-center text-sm">
                                                            <p class="text-s font-weight-bold mb-0">{{compra.nombre_proveedor}}</p>
                                                        </td>
                                                        <td class="align-middle text-center text-sm">
                                                            <p class="text-s font-weight-bold mb-0">{{compra.total_compra}}</p>
                                                        </td>
                                                        <td class="align-middle text-sm">
                                                            <div>
                                                                <nuxt-link :to="{name:'compra-compraId',params:{compraId: compra.id_compra}}">
                                                                    Ver detalles
                                                                </nuxt-link>
                                                            </div>
                                                        </td>
                                                        <td class="align-middle">
                                                            <div class="contenedorAcciones">
                                                                <div v-if="editar">
                                                                    <nuxt-link :to="{name:'compra-compraId',params:{compraId: compra.id_compra}}">
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
                                                :total-rows="this.compras.length"
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
                compras:[],
                crear:null,
                editar:null,
                error:null,
                pagActual:1,
                porPag:10,
            }
        },
        async mounted(){
            this.permisosCrud = getSubmodulos('Compras','OrdenCompra')
            if('crear' in this.permisosCrud)
                this.crear = true
            if('editar' in this.permisosCrud)
                this.editar = true
            if('leer' in this.permisosCrud)
                this.getCompras()
            else
                this.$toast.error('No tiene permiso de lectura')
        },
        methods: {
            async getCompras(){
                await axios.get('http://10.147.17.173:5003/compras',{ headers:{ Authorization: 'Bearer ' + getAccessToken() }
                }).then(response => {
                    if(response.data !=null)
                        this.compras = response.data
                    else
                        this.error=true
                    console.log(this.compras)
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
        }
    }

</script>