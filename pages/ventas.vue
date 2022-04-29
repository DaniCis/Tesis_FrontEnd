<template>
    <div class="g-sidenav-show  bg-gray-100 vh-completa" id='mainDashboard'> 
        <Sidebar />
        <Navbar :Modulo='"Ventas"' :Tabla='"Orden de Venta"'/>
        <CheckToken />
        <main class="main-content position-relative max-height-vh-100 mt-1 border-radius-lg media-left">
            <div class="container-fluid py-4">
                <div class="row">
                    <div class="col-12">
                        <div class="card mb-4">
                            <div class="card-header pb-0">
                                <div class="d-lg-flex">
                                    <div>
                                        <h5>Órdenes de Venta</h5>
                                    </div>
                                    <div class="ms-auto my-auto mt-lg-0 mt-4" v-if="crear">
                                        <div class="ms-auto my-auto">
                                            <nuxt-link :to="{name:'nuevaVenta'}" class="btn bg-gradient-primary btn-sm mb-0">
                                            +&nbsp; Nueva Orden de Venta
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
                                                        <th class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7 ps-2"># Comprobante</th>
                                                        <th class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7 ps-2">Fecha</th>
                                                        <th class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7 ps-2">Cliente</th>
                                                        <th class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7 ps-2">Ident. Cliente</th>
                                                        <th class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7 ps-2">Total</th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-if="error">
                                                        <td colspan="8">
                                                            <h6 class="ms-3 mb-2 text-sm text-center mt-4">No existen registros</h6> 
                                                        </td>       
                                                    </tr>
                                                    <tr v-for="(venta,i) in paginador(this.ventas)" :key="i">
                                                        <td class="align-middle">
                                                            <h6 class=" ms-3 mb-2 text-sm">{{venta.id_venta}}</h6>
                                                        </td>
                                                        <td class="align-middle text-center text-sm">
                                                            <p class="text-sm font-weight-bold mb-0">{{venta.numeroComprobante_venta}}</p>
                                                        </td>
                                                        <td class="align-middle text-center text-sm">
                                                            <p class="text-sm font-weight-bold mb-0">{{venta.fecha_venta}}</p>
                                                        </td>
                                                        <td class="align-middle text-center text-sm">
                                                            <p class="text-sm font-weight-bold mb-0">{{venta.nombre_cliente}}</p>
                                                        </td>
                                                        <td class="align-middle text-center text-sm">
                                                            <p class="text-sm font-weight-bold mb-0">{{venta.identificacion_cliente}}</p>
                                                        </td>
                                                        <td class="align-middle text-center text-sm">
                                                            <p class="text-sm font-weight-bold mb-0">{{venta.total_venta}}</p>
                                                        </td>
                                                        <td class="text-sm">
                                                            <div class="mb-0">
                                                                <nuxt-link :to="{name:'detalleVenta-detalleId',params:{detalleId: venta.id_venta}}">
                                                                    Ver detalles
                                                                </nuxt-link>
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
                                                :total-rows="this.ventas.length"
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
    import CheckToken from '~/components/checkToken.vue';
    import { getAccessToken, getSubmodulos } from '~/utils/auth';

    export default{
        components: { Sidebar, Navbar, CheckToken },
        middleware: 'authenticated',
        data(){
            return{
                permisosCrud:[],
                ventas:[],
                crear:null,
                error:null,
                pagActual:1,
                porPag:10, 
                confirm:''
            }
        },
        async mounted(){
            this.permisosCrud = getSubmodulos('Ventas','OrdenVenta')
            if('crear' in this.permisosCrud)
                this.crear = true
            if('leer' in this.permisosCrud)
                this.getVentas()
            else
                this.$toast.error('No tiene permiso de lectura')
        },
        methods: {
            async getVentas(){
                await axios.get('http://10.147.17.173:5004/ventas',{ headers:{ Authorization: 'Bearer ' + getAccessToken() }
                }).then(response => {
                    if(response.data !=null)
                        this.ventas = response.data
                    else
                        this.error=true
                console.log(this.ventas)
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