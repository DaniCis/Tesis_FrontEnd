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
                                <div class='text-sm'>
                                    <nuxt-link to='/compras'>
                                         <b-icon class='cursor-pointer' icon='arrow90deg-left' style="width: 1.3em; height: 1.3em"></b-icon> &nbsp;
                                        Regresar
                                    </nuxt-link>
                                </div>
                                <div class="d-lg-flex mt-4">
                                    <div>
                                        <h4>Orden de Compra #{{this.compraId}}</h4>
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
                                            <label>Número de Factura</label>
                                            <span class="text-sm ps-4">{{this.form.numeroFactura}}</span>
                                        </div>
                                        <div class="col-12 col-md-8 col-lg-3">
                                            <label>Proveedor</label>
                                            <span class="text-sm ps-4">{{this.form.nombreProveedor}}</span>
                                        </div>
                                    </div>                          
                                    <div class="table-responsive p-0 mt-4">
                                        <div class="dataTable-wrapper dataTable-loading no-footer sortable searchable fixed-columns">
                                            <div class="dataTable-container">
                                                <table class="table table-flush dataTable-table">
                                                    <thead>
                                                        <tr>
                                                            <th class="text-uppercase text-secondary text-xs font-weight-bolder opacity-7">#</th>
                                                            <th class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7">Producto</th>
                                                            <th class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7">Cant.</th>
                                                            <th class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7">Precio Unit</th>
                                                            <th class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7">Desct.</th>
                                                            <th class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7">Precio Total</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr v-for="detalle in this.detalles">
                                                            <td>
                                                                <h6 class=" ms-3 mb-2 text-sm">{{detalle.id_detalleCompra}}</h6>
                                                            </td>
                                                            <td class="align-middle text-center text-sm">
                                                                <p class="text-sm font-weight-bold mb-0">{{detalle.productos.nombre_producto}}</p>
                                                            </td>
                                                            <td class="align-middle text-center text-sm">
                                                                <p class="text-sm font-weight-bold mb-0">{{detalle.cantidad_detalleCompra}}</p>
                                                            </td>
                                                            <td class="align-middle text-center text-sm">
                                                                <p class="text-sm font-weight-bold mb-0">{{detalle.precioUnitario_detalleCompra}}</p>
                                                            </td>
                                                            <td class="align-middle text-center text-sm">
                                                                <p class="text-sm font-weight-bold mb-0">%{{detalle.descuentoPorcentaje_detalleCompra}}</p>
                                                            </td>
                                                            <td class="align-middle text-center text-sm">
                                                                <p class="text-sm font-weight-bold mb-0">{{detalle.precio_detalleCompra}}</p>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row mt-3 d-lg-flex pe-4">
                                        <div class="col-12 col-md-8 col-lg-3 ms-auto my-auto">
                                            <label class="col-5">Subtotal</label>
                                            <span class="col-4 text-sm">{{this.form.subtotal}}</span>
                                        </div>
                                    </div>
                                    <div class="row mt-1 d-lg-flex pe-4">
                                        <div class="col-12 col-md-8 col-lg-3 ms-auto my-auto">
                                            <label class="col-5">Descuento</label>
                                            <span class="text-sm col-4">{{this.form.descuento}}</span>
                                        </div>
                                    </div>
                                    <div class="row mt-1 d-lg-flex pe-4">
                                        <div class="col-12 col-md-8 col-lg-3 ms-auto my-auto">
                                            <label class="col-5">IVA %12</label>
                                            <span class="text-sm col-4">${{this.iva}}</span>
                                        </div>
                                    </div>  
                                    <div class="row mt-1 d-lg-flex pe-4">
                                        <div class="col-12 col-md-8 col-lg-3 ms-auto my-auto">
                                            <label class="col-5">Total</label>
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
                    numeroFactura:'',
                    nombreProveedor:'',
                    total:'',
                    subtotal:'',
                    descuento:'',
                },
                permisosCrud:[],
                compras:[],
                detalles:[],
                iva:null,
                compraId:'',
            }
        },
        async mounted(){
            this.compraId = this.$route.params.detalleId
            this.permisosCrud = getSubmodulos('Compras','OrdenCompra')
            if('leer' in this.permisosCrud)
                this.getCompra(this.compraId)
            else
                this.$toast.error('No tiene permiso de lectura')
        },    
        methods:{
            calcularIva(subtotal, descuento){
                const subt = parseFloat(subtotal.slice(1).replace(',', ''))
                const desct = parseFloat(descuento.slice(1).replace(',', ''))
                this.iva = subt - desct
                this.iva = (this.iva*0.12).toFixed(2)
            },

            async getCompra(compraId){
                await axios.get(`http://10.147.17.173:5003/compraDetalle/${compraId}`,{ headers:{ Authorization: 'Bearer ' + getAccessToken() }
                }).then(response => {
                    this.compras = response.data[0].Compras
                    this.form.fecha = this.compras.fecha_compra
                    this.form.numeroFactura = this.compras.numeroFactura_compra
                    this.form.total = this.compras.total_compra
                    this.form.subtotal = this.compras.subtotal_compra
                    this.form.descuento = this.compras.descuento_compra
                    this.form.nombreProveedor = response.data[0].nombre_proveedor
                    this.detalles = this.compras.detalle_compra
                    this.calcularIva(this.form.subtotal,this.form.descuento)
                    console.log(response.data)
                })
                .catch(e => {
                     this.$toast.error(e.response.data.detail)
                })
            },
        }
    }
</script>