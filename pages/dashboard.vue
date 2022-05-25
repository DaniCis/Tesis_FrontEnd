<template>
    <div class="g-sidenav-show bg-gray-100 vh-completa" id='mainDashboard'>
        <Sidebar/>
        <Navbar :Modulo='"Inicio"' :Tabla='"Dashboard"'/>
        <CheckToken/>
        <main class="main-content position-relative max-height-vh-100 mt-1 border-radius-lg media-left ps ps--active-y">
            <div class="container-fluid py-4">
                <div class="row">
                    <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                        <div class="card">
                            <div class="card-body p-3">
                                <div class="row">
                                    <div class="col-9">
                                        <div class="numbers">
                                            <p class="text-sm mb-0 text-capitalize font-weight-bold">Compras</p>
                                            <h5 class="font-weight-bolder mb-0">{{this.comprasMensual}}</h5>
                                        </div>
                                    </div>
                                    <div class="col-3 text-end">
                                        <div class="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                                            <b-icon class="icon-dash" icon='cash-stack'></b-icon>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                        <div class="card">
                            <div class="card-body p-3">
                                <div class="row">
                                    <div class="col-9">
                                        <div class="numbers">
                                            <p class="text-sm mb-0 text-capitalize font-weight-bold">Ventas</p>
                                            <h5 class="font-weight-bolder mb-0">{{this.ventasMensual}}</h5>
                                        </div>
                                    </div>
                                    <div class="col-3 text-end">
                                        <div class="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                                            <b-icon class="icon-dash" icon='credit-card' ></b-icon>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                        <div class="card">
                            <div class="card-body p-3">
                                <div class="row">
                                    <div class="col-9">
                                        <div class="numbers">
                                            <p class="text-sm mb-0 text-capitalize font-weight-bold">Inventario</p>
                                            <h5 class="font-weight-bolder mb-0">{{this.inventarioMensual}} </h5>
                                        </div>
                                    </div>
                                    <div class="col-3 text-end">
                                        <div class="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                                            <b-icon class="icon-dash" icon='inbox-fill' ></b-icon>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-sm-6">
                        <div class="card">
                            <div class="card-body p-3">
                                <div class="row">
                                    <div class="col-9">
                                        <div class="numbers">
                                            <p class="text-sm mb-0 text-capitalize font-weight-bold">Nuevos Usuarios</p>
                                            <h5 class="font-weight-bolder mb-0">{{this.clientesRegistrados}} </h5>
                                        </div>
                                    </div>
                                    <div class="col-3 text-end">
                                        <div class="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                                            <b-icon class="icon-dash" icon='person-plus'></b-icon>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row my-4">
                    <div class="col-lg-8 col-md-6 mb-md-0 mb-4">
                        <div class="card">
                            <div class="card-header pb-0">
                                <div class="row">
                                    <h6>Últimas Ventas Realizadas</h6>
                                    <p class="text-sm mb-0">
                                        <i class="fa fa-check text-info" aria-hidden="true"></i>
                                        <span class="font-weight-bold ms-1">{{this.fechaActual}}</span> 
                                    </p>
                                </div>
                            </div>
                            <div class="card-body px-0 pb-2">
                                 <div class="table-responsive p-0">
                                    <div class="dataTable-wrapper dataTable-loading no-footer sortable searchable fixed-columns"> 
                                        <div class="dataTable-container">
                                            <table class="table table-flush dataTable-table">
                                                <thead>
                                                    <tr>
                                                        <th class="text-uppercase text-secondary text-xs font-weight-bolder opacity-7">Id</th>
                                                        <th class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7 ps-2">Fecha</th>
                                                        <th class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7 ps-2">Cliente</th>
                                                        <th class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7 ps-2">Ident. Cliente</th>
                                                        <th class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7 ps-2">Total</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-if="error">
                                                        <td colspan="8">
                                                            <h6 class="ms-3 mb-2 text-sm text-center mt-4">No existen registros</h6> 
                                                        </td>       
                                                    </tr>
                                                    <tr v-for="(venta,index) in this.ventas" :key="index">
                                                        <td class="align-middle">
                                                            <h6 class=" ms-3 mb-2 text-sm">{{index+1}}</h6>
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
                                                    </tr>
                                                </tbody>
                                            </table>
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
    axios.defaults.baseURL ='http://10.147.17.173:5001';
    import { getAccessToken } from '~/utils/auth';

    export default {
        components: { Sidebar, Navbar, CheckToken }, 
        middleware: 'authenticated',
        data(){
            return{
                ventas:[],
                comprasMensual:'',
                ventasMensual:'',
                inventarioMensual:'',
                clientesRegistrados:'',
                error:'',
                fechaActual:''
            }
        },
        async mounted(){
            this.getFecha()
            this.getVentas()
            this.getComprasMensual()
            this.getVentasMensual()
            this.getInventarioMensual()
            this.getClientesMensual()
        },
        methods:{
            getFecha(){
                var meses=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"]
                var date = new Date()
                this.fechaActual = meses[date.getMonth()] + " " + date.getFullYear()
            },

            async getVentas(){
                await axios.get('http://10.147.17.173:5004/ventas/reporte',{ headers:{ Authorization: 'Bearer ' + getAccessToken() }
                }).then(response => {
                    if(response.data !=null)
                        this.ventas = response.data
                    else
                        this.error=true
                }).catch (e=> {
                    this.$toast.error(e.response.data.detail)
                })
            },

            async getComprasMensual(){
                await axios.get('http://10.147.17.173:5003/sumatoria_compra_mensual',{ headers:{ Authorization: 'Bearer ' + getAccessToken() }
                }).then(response => {
                    this.comprasMensual = response.data
                }).catch (e=> {
                    this.$toast.error(e.response.data.detail)
                })
            },

            async getVentasMensual(){
                await axios.get('http://10.147.17.173:5004/sumatoria_venta_mensual',{ headers:{ Authorization: 'Bearer ' + getAccessToken() }
                }).then(response => {
                    this.ventasMensual = response.data
                }).catch (e=> {
                    this.$toast.error(e.response.data.detail)
                })
            },

            async getInventarioMensual(){
                await axios.get('http://10.147.17.173:5002/items/dineroEnInventario',{ headers:{ Authorization: 'Bearer ' + getAccessToken() }
                }).then(response => {
                    this.inventarioMensual = response.data
                }).catch (e=> {
                    this.$toast.error(e.response.data.detail)
                })
            },

            async getClientesMensual(){
                await axios.get('http://10.147.17.173:5005/numeroMensualUsuarios',{ headers:{ Authorization: 'Bearer ' + getAccessToken() }
                }).then(response => {
                    this.clientesRegistrados = response.data
                }).catch (e=> {
                    this.$toast.error(e.response.data.detail)
                })
            }

        },
    }
</script>