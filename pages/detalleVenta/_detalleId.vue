<template>
    <div class="g-sidenav-show  bg-gray-100 vh-completa" id='mainDashboard'> 
        <Sidebar />
        <Navbar :Modulo='"Ventas"' :Tabla='"Orden de Venta"'/>
        <main class="main-content position-relative max-height-vh-100 mt-1 border-radius-lg media-left">
            <div class="container-fluid py-4">
                <div class="row">
                    <div class="col-12">
                        <div class="card mb-4">
                            <div class="card-header pb-0">
                                <div class='text-sm'>
                                    <nuxt-link to='/ventas'>
                                         <b-icon class='cursor-pointer' icon='arrow90deg-left' style="width: 1.3em; height: 1.3em"></b-icon> &nbsp;
                                        Regresar
                                    </nuxt-link>
                                </div>
                                <div class="d-lg-flex mt-4">
                                    <div>
                                        <h4>Orden de Venta #{{this.ventaId}}</h4>
                                        <p class="text-sm">Detalles</p>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body px-0 pt-0 pb-2">
                                <b-form class="ps-4 mt-3 pe-4">
                                    <div class="row mt-2">
                                        <div class="col-12 col-md-8 col-lg-3">
                                            <label>Fecha</label>
                                            <span class="text-sm ps-4">{{this.form.fecha}}</span>
                                        </div>
                                        <div class="col-12 col-md-8 col-lg-3">
                                            <label># Comprobante</label>
                                            <span class="text-sm ps-4">{{this.form.numeroComprobante}}</span>
                                        </div>
                                        <div class="col-12 col-md-8 col-lg-3">
                                            <label>Cliente</label>
                                            <span class="text-sm ps-4">{{this.form.nombreCliente}}</span>
                                        </div>
                                        <div class="col-12 col-md-8 col-lg-3">
                                            <label>Ident. Cliente</label>
                                            <span class="text-sm ps-4">{{this.form.identCliente}}</span>
                                        </div>
                                    </div>                          
                                    <div class="table-responsive p-0 mt-4">
                                        <div class="dataTable-wrapper dataTable-loading no-footer sortable searchable fixed-columns">
                                            <div class="dataTable-container">
                                                <table class="table table-flush dataTable-table">
                                                    <thead>
                                                        <tr>
                                                            <th class="text-uppercase text-secondary text-xs font-weight-bolder opacity-7">ID</th>
                                                            <th class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7">Producto</th>
                                                            <th class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7">Num Serie</th>
                                                            <th class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7">Desct.</th>
                                                            <th class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7">Cant.</th>
                                                            <th class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7">Precio Unit</th>
                                                            <th class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7">Precio Total</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr v-for="(detalle,i) in this.detalles">
                                                            <td>
                                                                <h6 class=" ms-3 mb-2 text-sm">{{i+1}}</h6>
                                                            </td>
                                                            <td class="align-middle text-center text-sm">
                                                                <p class="text-sm font-weight-bold mb-0">{{detalle.nombre_producto}}</p>
                                                            </td>
                                                            <td class="align-middle text-center text-sm" v-for="num in detalle.numeros_serie">
                                                                <p class="text-sm font-weight-bold mb-0">{{num.numeroSerie_item}}</p>
                                                            </td>
                                                            <td class="align-middle text-center text-sm">
                                                                <p class="text-sm font-weight-bold mb-0">%{{detalle.descuentoPorcentaje_detalleVenta}}</p>
                                                            </td>
                                                            <td class="align-middle text-center text-sm">
                                                                <p class="text-sm font-weight-bold mb-0">{{detalle.cantidad_detalleVenta}}</p>
                                                            </td>
                                                            <td class="align-middle text-center text-sm">
                                                                <p class="text-sm font-weight-bold mb-0">{{detalle.precioUnitario_detalleVenta}}</p>
                                                            </td>
                                                            <td class="align-middle text-center text-sm">
                                                                <p class="text-sm font-weight-bold mb-0">{{detalle.precio_detalleVenta}}</p>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row mt-3 d-lg-flex pe-4">
                                        <div class="col-12 col-md-8 col-lg-3 ms-auto my-auto">
                                            <label class="col-5 col-lg-6">Subtotal</label>
                                            <span class="col-4 text-sm">{{this.form.subtotal}}</span>
                                        </div>
                                    </div>
                                    <div class="row mt-1 d-lg-flex pe-4">
                                        <div class="col-12 col-md-8 col-lg-3 ms-auto my-auto">
                                            <label class="col-5 col-lg-6">Descuento</label>
                                            <span class="text-sm col-4">{{this.form.descuento}}</span>
                                        </div>
                                    </div>
                                    <div class="row mt-1 d-lg-flex pe-4">
                                        <div class="col-12 col-md-8 col-lg-3 ms-auto my-auto">
                                            <label class="col-5 col-lg-6">IVA %12</label>
                                            <span class="text-sm col-4">${{this.iva}}</span>
                                        </div>
                                    </div>  
                                    <div class="row mt-1 d-lg-flex pe-4">
                                        <div class="col-12 col-md-8 col-lg-3 ms-auto my-auto">
                                            <label class="col-5 col-lg-6">Total</label>
                                            <span class="text-sm col-4">{{this.form.total}}</span>
                                        </div>
                                    </div>              
                                </b-form>
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
                form:{
                    fecha:'',
                    numeroComprobante:'',
                    nombreCliente:'',
                    identCliente:'',
                    total:'',
                    subtotal:'',
                    descuento:'',
                },
                permisosCrud:[],
                detalles:[],
                iva:null,
                ventaId:'',
            }
        },
        async mounted(){
            this.ventaId = this.$route.params.detalleId
            this.permisosCrud = getSubmodulos('Ventas','OrdenVenta')
            if('leer' in this.permisosCrud)
                this.getVenta(this.ventaId)
            else
                this.$toast.error('No tiene permiso de lectura')
        },    
        methods:{
            calcularIva(subtotal, descuento){
                this.iva = parseFloat(subtotal.slice(1)) - parseFloat(descuento.slice(1))
                this.iva = (this.iva*0.12).toFixed(2)
            },

            async getVenta(ventaId){
                await axios.get(`http://10.147.17.173:5004/ventaDetalle/${ventaId}`,{ headers:{ Authorization: 'Bearer ' + getAccessToken() }
                }).then(response => {
                    this.form.fecha = response.data.fecha_venta
                    this.form.numeroComprobante = response.data.numeroComprobante_venta
                    this.form.total = response.data.total_venta
                    this.form.subtotal = response.data.subtotal_venta
                    this.form.descuento = response.data.descuento_venta
                    this.form.nombreCliente = response.data.nombre_cliente
                    this.form.identCliente = response.data.identificacion_cliente

                    this.detalles = response.data.detalle_venta
                    this.calcularIva(this.form.subtotal,this.form.descuento)
                })
                .catch(e => {
                    this.$toast.error(e.response.data.detail)
                })
            },
        }
    }
</script>