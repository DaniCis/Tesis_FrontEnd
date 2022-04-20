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
                                        <h4>Nueva Orden de Venta</h4>
                                        <p class="text-sm">Agregar</p>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body px-0 pt-0 pb-2">
                                <b-form class="ps-4 mt-3 pe-4">
                                    <div class="row mt-2">
                                        <div class="col-12 col-md-8 col-lg-3">
                                            <b-form-group 
                                                label="Fecha" 
                                                label-for="fecha-input"
                                                invalid-feedback="Este campo es requerido" 
                                                :state="form.fechaState">
                                                <b-form-datepicker style="height: 38px;" :state="form.fechaState" required ref='fecha_input'
                                                id="fecha-input" locale="es" placeholder="Seleccione una fecha" v-model='form.fecha'></b-form-datepicker>
                                            </b-form-group>
                                        </div>
                                        <div class="col-12 col-md-8 col-lg-3">
                                            <b-form-group 
                                                label="Número de Comprobante" 
                                                label-for="comp-input"
                                                invalid-feedback="Este campo es requerido" 
                                                :state="form.comprobanteState">
                                                <b-form-input  required :state="form.comprobanteState" ref="comp_input"
                                                    id="comp-input" class="form-control" type="text" placeholder="Comprobante" v-model='form.numeroComprobante'>
                                                </b-form-input>
                                            </b-form-group>
                                        </div>
                                        <div class="col-12 col-md-8 col-lg-3">
                                            <b-form-group 
                                                label="Cliente" 
                                                label-for="cliente-select"
                                                invalid-feedback="Seleccione un cliente" 
                                                :state="form.clienteState">
                                                <b-form-input id="cliente-select" placeholder='Cliente' list="list-cli" v-model="form.nombreCliente" ref='cliente_select' :state="form.clienteState" required></b-form-input>
                                                    <datalist id="list-cli">
                                                        <option v-for="cliente in this.clientes">
                                                        {{cliente.nombre_cliente}}
                                                    </option>
                                                </datalist>
                                            </b-form-group>
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
                                                            <th class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7">Cant.</th>
                                                            <th class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7">Precio Unit</th>
                                                            <th class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7">Precio Total</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody><!--
                                                        <tr v-for="detalle in this.detalles">
                                                            <td>
                                                                <h6 class=" ms-3 mb-2 text-sm">{{detalle.id_detalleVenta}}</h6>
                                                            </td>
                                                            <td class="align-middle text-center text-sm">
                                                                <p class="text-sm font-weight-bold mb-0">{{detalle.nombre_producto}}</p>
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
                                                        </tr>-->
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
                    fechaState:null,
                    numeroComprobante:'',
                    comprobanteState:null,
                    nombreCliente:'',
                    clienteState:null,
                    clienteId:null,
                    total:null,
                    subtotal:null,
                    descuento:null,
                },
                detalle:{
                    producto:{
                        id:'',
                        nombre:''
                    },
                    productoState:null,
                    cantidad:'',
                    cantidadState:null,
                    precioTotal:'',
                    precioUnit:'',
                    precioUnitState:null,
                },
                clientes:[],
                productos:[],
                detalles:[],
                detallesCopia:[],
                precios:[],
                descuentos:[],
                nombres_productos:[],
                nombres_clientes:[],
                crear:null,
                iva:null,
            }
        },
        async mounted(){
            this.getClientes()
            this.getProductos()
            this.permisosCrud = getSubmodulos('Ventas','OrdenVenta')
            if('crear' in this.permisosCrud)
                this.crear = true
        },
        methods:{
            
            async getProductos(){
                await axios.get(`http://10.147.17.173:5002/productosExistentes`,{ headers:{ Authorization: 'Bearer ' + getAccessToken() }
                }).then(response => {
                    this.productos = response.data
                })
                .catch(e => {
                    this.$toast.error(e.response.data.detail)
                })
            },

            async getClientes(){
                await axios.get(`http://10.147.17.173:5004/clientes`,{ headers:{ Authorization: 'Bearer ' + getAccessToken() }
                }).then(response => {
                    this.clientes = response.data
                })
                .catch(e => {
                    this.$toast.error(e.response.data.detail)
                })
            },
        }
    }
</script>