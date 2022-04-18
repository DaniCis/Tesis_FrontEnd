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
                                        <p class="text-sm">Editar</p>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body px-0 pt-0 pb-2">
                                <b-form class="ps-4 mt-3 pe-4" @submit.stop.prevent="handleSubmit2()">
                                    <div class="row mt-2">
                                        <div class="col-12 col-md-8 col-lg-3">
                                            <b-form-group 
                                                label="Fecha" 
                                                label-for="fecha-input">
                                                <b-form-datepicker style="height: 38px;"
                                                id="fecha-input" locale="es" placeholder="Fecha" v-model='form.fecha'></b-form-datepicker>
                                            </b-form-group>
                                        </div>
                                        <div class="col-12 col-md-8 col-lg-3">
                                            <b-form-group 
                                                label="Número de Factura" 
                                                label-for="factura-input">
                                                <b-form-input  
                                                    id="factura-input" class="form-control" type="text" placeholder="Factura"
                                                    v-model="form.numeroFactura">
                                                </b-form-input>
                                            </b-form-group>
                                        </div>
                                        <div class="col-12 col-md-8 col-lg-3">
                                            <b-form-group 
                                                label="Proveedor" 
                                                label-for="proveedor-input">
                                                <select 
                                                    id="proveedor-input" v-model="form.nombreProveedor" class="form-select">
                                                   <option v-for="proveedor in this.proveedores" :value="proveedor.id_proveedor">
                                                        {{proveedor.nombre_proveedor}}
                                                    </option>
                                                </select>
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
                                                            <th class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7">Desct.</th>
                                                            <th class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7">Precio Total</th>
                                                            <th></th>
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
                                                            <td class="align-middle text-center text-sm" v-if="detalle.precioUnitario_detalleCompra.includes('$')">
                                                                <p class="text-sm font-weight-bold mb-0">{{detalle.precioUnitario_detalleCompra}}</p>
                                                            </td>
                                                            <td class="align-middle text-center text-sm" v-else>
                                                                <p class="text-sm font-weight-bold mb-0">${{detalle.precioUnitario_detalleCompra}}</p>
                                                            </td>
                                                            <td class="align-middle text-center text-sm">
                                                                <p class="text-sm font-weight-bold mb-0">%{{detalle.descuentoPorcentaje_detalleCompra}}</p>
                                                            </td>
                                                            <td class="align-middle text-center text-sm" v-if="detalle.precio_detalleCompra.includes('$')">
                                                                <p class="text-sm font-weight-bold mb-0">{{detalle.precio_detalleCompra}}</p>
                                                            </td>
                                                            <td class="align-middle text-center text-sm" v-else>
                                                                <p class="text-sm font-weight-bold mb-0">${{detalle.precio_detalleCompra}}</p>
                                                            </td>
                                                            <td class="align-middle">
                                                                <div class="contenedorAcciones">
                                                                    <a class="cursor-pointer" @click="openModal(detalle.id_detalleCompra)">
                                                                        <b-icon class='mx-3' icon='pencil-square' style="width: 1.2em; height: 1.2em"></b-icon>
                                                                    </a>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row d-lg-flex pe-4">
                                        <div class="col-12 col-md-8 col-lg-3 ms-auto my-auto">
                                            <label class="col-5">Subtotal</label>
                                            <span class="col-4 text-sm">${{this.form.subtotal}}</span>
                                        </div>
                                    </div>
                                    <div class="row d-lg-flex pe-4">
                                        <div class="col-12 col-md-8 col-lg-3 ms-auto my-auto">
                                            <label class="col-5">Descuento</label>
                                            <span class="text-sm col-4">${{this.form.descuento}}</span>
                                        </div>
                                    </div>
                                    <div class="row d-lg-flex pe-4">
                                        <div class="col-12 col-md-8 col-lg-3 ms-auto my-auto">
                                            <label class="col-5">IVA %12</label>
                                            <span class="text-sm col-4">${{this.iva}}</span>
                                        </div>
                                    </div>  
                                    <div class="row d-lg-flex pe-4">
                                        <div class="col-12 col-md-8 col-lg-3 ms-auto my-auto">
                                            <label class="col-5">Total</label>
                                            <span class="text-sm col-4">${{this.form.total}}</span>
                                        </div>
                                    </div> 
                                    <div class="row mt-4">
                                        <div class="col-12 col-md-8 col-lg-6">
                                            <div class="d-flex ms-auto mb-3">
                                                <b-button  @click="editarCompra(form.id)" class="btn bg-gradient-primary mb-0">Actualizar</b-button>
                                            </div>
                                        </div>
                                    </div>             
                                </b-form>
                                <b-modal id="detalle-modal" title='Editar Detalle' cancel-title='Cancelar' ok-title='Actualizar' @ok="handleOk($event)">
                                    <b-form @submit.stop.prevent="handleSubmit()">
                                        <div class="row mt-2">
                                            <div class="col-12 col-md-8">
                                                <b-form-group 
                                                    label="Producto" 
                                                    label-for="producto-select">
                                                    <select 
                                                        id="producto-select" v-model="detalle.producto" class="form-select">
                                                        <option v-for="producto in this.productos" :value="{id: producto.id_producto, nombre: producto.nombre_producto}">
                                                            {{producto.nombre_producto}}
                                                        </option>
                                                    </select>
                                                </b-form-group>
                                            </div>
                                        </div>
                                        <div class="row mt-2">
                                            <div class="col-12 col-md-4">
                                                <b-form-group 
                                                    label="Precio Unitario $" 
                                                    label-for="precioUnit-input">
                                                    <b-form-input 
                                                        id="precioUnit-input" class="form-control" type="number" step='any' v-model="detalle.precioUnit">
                                                    </b-form-input>
                                                </b-form-group>
                                            </div>
                                            <div class="col-12 col-md-4">
                                                <b-form-group 
                                                    label="Descuento %" 
                                                    label-for="desct-input">
                                                    <b-form-input 
                                                        id="desct-input" class="form-control" type="number"  min="0" v-model="detalle.desct">
                                                    </b-form-input>
                                                </b-form-group>
                                            </div>
                                        </div>
                                    </b-form>
                                </b-modal>
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
                    id:'',
                    fecha:'',
                    numeroFactura:null,
                    nombreProveedor:'',
                    total:null,
                    subtotal:null,
                    descuento:null,
                },
                detalle:{
                    producto:'',
                    precioUnit:'',
                    desct:'',
                    cantidad:'',
                },
                permisosCrud:[],
                compras:[],
                proveedores:[],
                detalles:[],
                detallesCopia:[],
                productos:[],
                precios:[],
                descuentos:[],
                editar:null,
                iva:null,
                compraId:'',
                detalleId:'',
            }
        },
        async mounted(){
            this.getProveedores()
            this.getProductos()
            this.compraId = this.$route.params.compraId
            this.permisosCrud = getSubmodulos('Compras','OrdenCompra')
            if('editar' in this.permisosCrud)
                this.editar = true
            if('leer' in this.permisosCrud)
                this.getCompra(this.compraId)
            else
                this.$toast.error('No tiene permiso de lectura')
        },    
        methods:{
            async getCompra(compraId){
                await axios.get(`http://10.147.17.173:5003/compraDetalle/${compraId}`,{ headers:{ Authorization: 'Bearer ' + getAccessToken() }
                }).then(response => {
                    this.compras = response.data[0].Compras
                    this.form.id = this.compras.id_compra
                    this.form.fecha = this.compras.fecha_compra
                    this.form.numeroFactura = this.compras.numeroFactura_compra
                    this.form.total = this.compras.total_compra.slice(1)
                    this.form.subtotal = this.compras.subtotal_compra.slice(1)
                    this.form.descuento = this.compras.descuento_compra.slice(1)
                    this.form.nombreProveedor = this.compras.proveedores_id_proveedor
                    this.detalles = this.compras.detalle_compra
                    this.calcularIva()
                })
                .catch(e => {
                     this.$toast.error(e.response.data.detail)
                })
            },

            async editarCompra(compraId){
                if(this.editar){
                    this.detallesCopia = JSON.parse(JSON.stringify(this.detalles));
                    for (var i = 0; i < this.detalles.length; i++) {   
                        delete this.detallesCopia[i].productos
                        delete this.detallesCopia[i].cantidad_detalleCompra
                        delete this.detallesCopia[i].compras_id_compra
                        delete this.detallesCopia[i].borradoLogico_detalleCompra
                        delete this.detallesCopia[i].fechaActualizacion_detalleCompra
                        delete this.detallesCopia[i].fechaBorrado_detalleCompra
                    }
                    var params = {
                        fecha_compra: this.form.fecha,
                        numeroFactura_compra: parseInt(this.form.numeroFactura),
                        subtotal_compra:parseFloat(this.form.subtotal),
                        descuento_compra: parseFloat(this.form.descuento),
                        total_compra: this.form.total,
                        proveedores_id_proveedor: this.form.nombreProveedor,
                        detalle_compra: this.detallesCopia,
                    }
                    console.log(params)
                    await axios.put(`http://10.147.17.173:5003/compra/${compraId}`, params,{ headers:{ Authorization: 'Bearer ' + getAccessToken() }
                    }).then(() => {
                        this.$toast.success('Compra editada con éxito')
                        this.$router.push('/compras');
                    }).catch (e => {
                        this.$toast.error(e.response.data.detail)
                    })
                }else{
                    this.$toast.error('No tiene permisos para agregar')
                }
            },

            async getProveedores(){
                await axios.get(`http://10.147.17.173:5003/proveedoresHabilitados`,{ headers:{ Authorization: 'Bearer ' + getAccessToken() }
                }).then(response => {
                    this.proveedores = response.data
                })
                .catch(e => {
                    this.$toast.error(e.response.data.detail)
                })
            },

            async getProductos(){
                await axios.get(`http://10.147.17.173:5002/productosHabilitados`,{ headers:{ Authorization: 'Bearer ' + getAccessToken() }
                }).then(response => {
                    this.productos = response.data
                })
                .catch(e => {
                    this.$toast.error(e.response.data.detail)
                })
            },

            async getDetalle(detalleId){
                await axios.get(`http://10.147.17.173:5003/detalle_compra/${detalleId}`,{ headers:{ Authorization: 'Bearer ' + getAccessToken()}
                }) .then(response => {
                    this.detalle.producto = response.data.nombre_producto
                    this.detalle.precioUnit = response.data.precioUnitario_detalleCompra.slice(1)
                    this.detalle.desct = response.data.descuentoPorcentaje_detalleCompra
                    this.detalle.cantidad = response.data.cantidad_detalleCompra
                }) .catch(e => {
                    this.$toast.error(e.response.data.detail)
                })
            },

            editarDetalle(){
                console.log(this.detalle.precioUnit)
                var precio = parseFloat(this.detalle.precioUnit).toFixed(2)
                var desct = parseInt(this.detalle.desct)
                var total = parseFloat(this.detalle.cantidad * precio).toFixed(2)
                for (var i = 0; i < this.detalles.length; i++) {
                    if(this.detalles[i].id_detalleCompra == this.detalleId){
                        this.detalles[i].productos_id_producto = this.detalle.producto.id
                        this.detalles[i].productos.nombre_producto = this.detalle.producto.nombre
                        this.detalles[i].precioUnitario_detalleCompra = precio
                        this.detalles[i].descuentoPorcentaje_detalleCompra = desct
                        this.detalles[i].precio_detalleCompra = total
                    }
                }
                this.agregarPrecios()
                this.calcularSubtotal()
                this.calcularDescuentoInd()
                this.calcularDescuentoTotal()
                this.calcularIva()
                this.calcularTotal()
            },

            agregarPrecios(){
                this.precios=[]
                for (var i = 0; i < this.detalles.length; i++) {
                    const precio = this.detalles[i].precio_detalleCompra
                    this.precios.push((parseFloat(precio)).toFixed(2))
                }
            },
            
            calcularSubtotal(){  
                this.form.subtotal = null
                for (var i = 0; i < this.precios.length; i++) 
                    this.form.subtotal += parseFloat(this.precios[i])       
                this.form.subtotal = this.form.subtotal.toFixed(2)
            },

            calcularDescuentoInd(){
                this.descuentos = []
                for (var i = 0; i < this.detalles.length; i++) {
                    const porcentaje = this.detalles[i].descuentoPorcentaje_detalleCompra
                    const desctInd = (parseFloat(porcentaje))/100
                    const desct = parseFloat(this.detalles[i].precio_detalleCompra) * desctInd.toFixed(2)
                    this.descuentos.push((parseFloat(desct)).toFixed(2))
                }
            },
            
            calcularDescuentoTotal(){
                this.form.descuento = null
                for (var i = 0; i < this.descuentos.length; i++)
                    this.form.descuento += parseFloat(this.descuentos[i])
                this.form.descuento = this.form.descuento.toFixed(2)
            },
            
            calcularIva(){
                this.iva = parseFloat(this.form.subtotal) - parseFloat(this.form.descuento)
                this.iva = (this.iva*0.12).toFixed(2)
            },

            calcularTotal(){
                this.form.total = null
                this.form.total = (this.form.subtotal - this.form.descuento) + parseFloat(this.iva)
            },

            handleOk(bvModalEvt){
                bvModalEvt.preventDefault()
                this.handleSubmit()
            },

            handleSubmit() {
                this.editarDetalle()
                this.$nextTick(() => {
                    this.closeModal()
                })
            },
            
            closeModal(){
                this.$bvModal.hide('detalle-modal')
            },

            openModal(detalleId){
                this.$bvModal.show('detalle-modal')
                this.getDetalle(detalleId)
                this.detalleId = detalleId
            },
        }
    }
</script>