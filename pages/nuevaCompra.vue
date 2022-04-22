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
                                        <h4>Nueva Orden de Compra</h4>
                                        <p class="text-sm">Agregar </p>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body px-0 pt-0 pb-2">
                                <b-form class="ps-4 mt-3 pe-4" @submit.stop.prevent="handleSubmit2()" novalidate>
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
                                                label="Número de Factura" 
                                                label-for="factura-input"
                                                invalid-feedback="Este campo es requerido" 
                                                :state="form.facturaState">
                                                <b-form-input  required  :state="form.facturaState" ref="factura_input"
                                                    id="factura-input" class="form-control" type="text" placeholder="Factura" v-model='form.numeroFactura'>
                                                </b-form-input>
                                            </b-form-group>
                                        </div>
                                        <div class="col-12 col-md-8 col-lg-3">
                                            <b-form-group 
                                                label="Proveedor" 
                                                label-for="proveedor-select"
                                                invalid-feedback="Seleccione un proveedor" 
                                                :state="form.proveedorState">
                                                <b-form-input id="proveedor-select" placeholder='Proveedor' list="list-prov" v-model="form.nombreProveedor" ref='proveedor_select' :state="form.proveedorState" required></b-form-input>
                                                    <datalist id="list-prov">
                                                        <option v-for="proveedor in this.proveedores">
                                                        {{proveedor.nombre_proveedor}}
                                                    </option>
                                                </datalist>
                                            </b-form-group>
                                        </div>
                                    </div>    
                                    <div class="d-lg-flex">
                                        <div class="ms-auto my-auto mt-lg-0 mt-2">
                                            <div class="ms-auto my-auto">
                                                <a @click="openModal(null, 'agregar')" class="btn bg-gradient-primary btn-sm mb-0"> +&nbsp; Agregar productos</a>
                                            </div>
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
                                                            <th></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr v-if="this.detalles.length == 0">
                                                            <td colspan="7">
                                                                <h6 class="ms-3 mb-2 text-sm text-center mt-4">Sin Productos </h6> 
                                                            </td> 
                                                        </tr>
                                                        <tr v-else v-for="(detalle,i) in this.detalles">
                                                         <td>
                                                                <h6 class=" ms-3 mb-2 text-sm">{{i+1}}</h6>
                                                            </td>
                                                            <td class="align-middle text-center text-sm">
                                                                <p class="text-sm font-weight-bold mb-0">{{detalle.nombre_producto}}</p>
                                                            </td>
                                                            <td class="align-middle text-center text-sm">
                                                                <p class="text-sm font-weight-bold mb-0">{{detalle.cantidad_detalleCompra}}</p>
                                                            </td>
                                                            <td class="align-middle text-center text-sm">
                                                                <p class="text-sm font-weight-bold mb-0">${{detalle.precioUnitario_detalleCompra}}</p>
                                                            </td>
                                                            <td class="align-middle text-center text-sm">
                                                                <p class="text-sm font-weight-bold mb-0">%{{detalle.descuentoPorcentaje_detalleCompra}}</p>
                                                            </td>
                                                            <td class="align-middle text-center text-sm">
                                                                <p class="text-sm font-weight-bold mb-0">${{detalle.precio_detalleCompra}}</p>
                                                            </td>
                                                            <td class="align-middle">
                                                                <div class="contenedorAcciones" >
                                                                    <div v-if="detalle.editar">
                                                                        <a class="cursor-pointer" @click="openModal(i, 'editar')">
                                                                            <b-icon  class='mx-3' icon='pencil-square' style="width: 1.2em; height: 1.2em"></b-icon>
                                                                        </a>
                                                                    </div>
                                                                    <div v-if="detalle.eliminar">
                                                                        <a class="trash cursor-pointer"  @click='showModalDelete(i)'>
                                                                            <b-icon class="icon" icon='trash' style="width: 1.2em; height: 1.2em; color: #ff0c0c;"></b-icon>
                                                                        </a>
                                                                    </div>
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
                                                <b-button class="btn bg-gradient-primary mb-0" type='submit'> Agregar</b-button>
                                            </div>
                                        </div>
                                    </div>                                      
                                </b-form>
                                <b-modal id="detalle-modal" size="xl" :title="title" cancel-title='Cancelar' :ok-title="titleBtn" @ok="handleOk($event)">
                                    <b-form @submit.stop.prevent="handleSubmit()">
                                        <div class="row">
                                            <div class="col-12 col-lg-6">
                                                <b-card style="border: 1px solid rgba(0, 0, 0, 0.125);" class="header-detalle" sub-title="Detalle de la Compra">
                                                    <div class="row mt-3">
                                                        <div class="col-12 col-md-10">
                                                            <b-form-group 
                                                                label="Producto" 
                                                                label-for="producto-select"
                                                                invalid-feedback="Seleccione un producto" 
                                                                :state="detalle.productoState">
                                                                <b-form-input :state="detalle.productoState" ref='producto_select' required id="producto-select" list="list-prod" v-model="detalle.producto.nombre"></b-form-input>
                                                                <datalist id="list-prod">
                                                                    <option v-for="producto in this.productos">
                                                                        {{producto.nombre_producto}}
                                                                    </option>
                                                                </datalist>
                                                            </b-form-group>
                                                        </div>
                                                    </div>
                                                    <div class="row mt-2">
                                                        <div class="col-12 col-md-5">
                                                            <b-form-group 
                                                                label="Cantidad" 
                                                                label-for="cant-input"
                                                                invalid-feedback="Este campo es requerido" 
                                                                :state="detalle.cantidadState">
                                                                <b-form-input @change='mostrarInput($event)' required :state="detalle.cantidadState" ref="cant_input" id="cant-input" class="form-control" type="number" min='1' v-model="detalle.cantidad">
                                                                </b-form-input>
                                                            </b-form-group>
                                                        </div>
                                                        <div class="col-12 col-md-5">
                                                            <b-form-group 
                                                                label="Precio Unitario $" 
                                                                label-for="precioUnit-input"
                                                                invalid-feedback="Este campo es requerido" 
                                                                :state="detalle.precioUnitState">
                                                                <b-form-input @change="calcularPrecioTotal()" required ref="precioUnit_input" :state="detalle.precioUnitState" id="precioUnit-input" class="form-control" type="number" min='0' step="any" v-model="detalle.precioUnit">
                                                                </b-form-input>
                                                            </b-form-group>
                                                        </div>
                                                    </div>
                                                    <div class="row mt-2">
                                                        <div class="col-12 col-md-5">
                                                            <b-form-group 
                                                                label="Descuento %" 
                                                                label-for="desct-input"
                                                                invalid-feedback="Este campo es requerido" 
                                                                :state="detalle.desctState">
                                                                <b-form-input required  :state="detalle.desctState"  ref="desct_input"
                                                                    id="desct-input" class="form-control" type="number" min='0' v-model="detalle.desct">
                                                                </b-form-input>
                                                            </b-form-group>
                                                        </div>
                                                        <div class="col-12 col-md-5">
                                                            <b-form-group 
                                                                label="Precio Total $" 
                                                                label-for="precioTotal-input">
                                                                <b-form-input 
                                                                    id="precioTotal-input" class="form-control" readonly type="text" v-model="detalle.precioTotal">
                                                                </b-form-input>
                                                            </b-form-group>
                                                        </div>
                                                    </div>
                                                </b-card>
                                            </div>
                                            <div class="col-12 col-lg-6">
                                                <b-card style="border: 1px solid rgba(0, 0, 0, 0.125);" sub-title='Información del Item'>
                                                    <div class="row mt-3">
                                                        <div class="col-12 col-md-5">
                                                            <b-form-group 
                                                                label="PVP" 
                                                                label-for="pvp-input"
                                                                invalid-feedback="Este campo es requerido" 
                                                                :state="detalle.pvpState">
                                                                <b-form-input required :state="detalle.pvpState" ref="pvp_input" step="any"
                                                                    id="pvp-input" class="form-control" type="number" min='0' v-model="detalle.pvp">
                                                                </b-form-input>
                                                            </b-form-group>
                                                        </div>
                                                        <div class="col-12 col-md-5">
                                                            <b-form-group 
                                                                label="PVD" 
                                                                label-for="pvd-input"
                                                                invalid-feedback="Este campo es requerido" 
                                                                :state="detalle.pvdState">
                                                                <b-form-input required :state="detalle.pvdState" ref="pvd_input" step="any"
                                                                    id="pvd-input" class="form-control" type="number" min='0' v-model="detalle.pvd">
                                                                </b-form-input>
                                                            </b-form-group>
                                                        </div>
                                                    </div>
                                                    <div class="row mt-2">
                                                        <div class="col-12 col-md-5">
                                                            <b-form-group 
                                                                label="Descuento del Item %" 
                                                                label-for="desctItem-input"
                                                                invalid-feedback="Este campo es requerido" 
                                                                :state="detalle.desctItemState">
                                                                <b-form-input required :state="detalle.desctItemState" ref="desctItem_input"
                                                                    id="desctItem-input" class="form-control" min='0' type="number" v-model="detalle.desctItem">
                                                                </b-form-input>
                                                            </b-form-group>
                                                        </div>
                                                    </div>
                                                    <div class="row mt-2" >
                                                        <div class="col-12 col-md-5">
                                                            <div v-if="parseInt(this.numCant) == 1">
                                                                <label>Número de Serie</label>
                                                                <b-form-group >
                                                                    <b-form-input 
                                                                    id="num-input" class="form-control" type="text" v-model="detalle.serie.num[0]">
                                                                    </b-form-input>
                                                                </b-form-group>
                                                            </div>
                                                            <div v-else>
                                                                <label>Números de Series</label>
                                                                <div v-for="i in parseInt(this.numCant)" style="display: flex">
                                                                    <span style="margin-right: 1rem; margin-top: 0.8rem;" class="text-sm">{{i}}</span>
                                                                    <b-form-group >
                                                                        <b-form-input  
                                                                            id="num-input" class="form-control mt-1" type="text" v-model="detalle.serie.num[i-1]">
                                                                        </b-form-input>
                                                                    </b-form-group>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </b-card>
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
                    fecha:'',
                    fechaState:null,
                    numeroFactura:'',
                    facturaState:null,
                    nombreProveedor:'',
                    proveedorState:null,
                    proveedorId:null,
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
                    pvp:'',
                    pvpState:null,
                    pvd:'',
                    pvdState:null,
                    serie:{
                        num:[],
                    },
                    desctItem:'',
                    desctItemState:null,
                    cantidad:'',
                    cantidadState:null,
                    precioTotal:'',
                    precioUnit:'',
                    precioUnitState:null,
                    desct:'',
                    desctState:null,
                },
                proveedores:[],
                productos:[],
                detalles:[],
                detallesCopia:[],
                precios:[],
                descuentos:[],
                nombres_productos:[],
                nombres_proveedores:[],
                crear:null,
                editId:null,
                editar:true,
                eliminar:true,
                iva:null,
                numCant:1,
                confirm: '',
                title:'',
                titleBtn:'',
            }
        },
        async mounted(){
            this.getProveedores()
            this.permisosCrud = getSubmodulos('Compras','OrdenCompra')
            if('crear' in this.permisosCrud)
                this.crear = true
        },
        methods:{
            async crearCompra(){
                if(this.crear){
                    if(this.detalles.length ==0){
                        this.$toast.error('Debe agregar productos para registar una compra')
                    }else{
                        if(!this.validarProveedores())
                            return
                        this.detallesCopia = JSON.parse(JSON.stringify(this.detalles));
                        for (var i = 0; i < this.detalles.length; i++) {   
                            delete this.detallesCopia[i].nombre_producto
                            delete this.detallesCopia[i].editar
                            delete this.detallesCopia[i].eliminar
                        }
                        var params = {
                            fecha_compra: this.form.fecha,
                            numeroFactura_compra: this.form.numeroFactura,
                            subtotal_compra:parseFloat(this.form.subtotal),
                            descuento_compra: parseFloat(this.form.descuento),
                            total_compra: this.form.total,
                            proveedores_id_proveedor: this.form.proveedorId,
                            detalle_compra: this.detallesCopia,
                        }
                        await axios.post('http://10.147.17.173:5003/compra', params,{ headers:{ Authorization: 'Bearer ' + getAccessToken() }
                        }).then(() => {
                            this.$toast.success('Compra creada con éxito')
                            this.$router.push('/compras');
                        }).catch (e => {
                            this.$toast.error(e.response.data.detail)
                        })
                    }
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
                await axios.get(`http://10.147.17.173:5002/productosNombres`,{ headers:{ Authorization: 'Bearer ' + getAccessToken() }
                }).then(response => {
                    this.productos = response.data
                })
                .catch(e => {
                    this.$toast.error(e.response.data.detail)
                })
            },

            crearDetalles(){
                var detalle = {
                    productos_id_producto: this.detalle.producto.id,
                    nombre_producto:this.detalle.producto.nombre,
                    pvp_item: (parseFloat(this.detalle.pvp)).toFixed(2),
                    pvd_item: (parseFloat(this.detalle.pvd)).toFixed(2),
                    descuentoPorcentaje_item: parseInt(this.detalle.desctItem),
                    precioUnitario_detalleCompra: (parseFloat(this.detalle.precioUnit)).toFixed(2),
                    cantidad_detalleCompra: parseInt(this.detalle.cantidad),
                    precio_detalleCompra: (parseFloat(this.detalle.precioTotal)).toFixed(2),
                    descuentoPorcentaje_detalleCompra: parseInt(this.detalle.desct),
                    numeroSerie_item: this.detalle.serie.num,
                    editar: this.editar,
                    eliminar: this.eliminar
                }
                this.detalles.push(detalle)
                this.agregarPrecios()
                this.calcularSubtotal()
                this.calcularDescuentoInd()
                this.calcularDescuentoTotal()
                this.calcularIva()
                this.calcularTotal()
            },
            
            editarDetalle(detalleId){
                this.detalles[detalleId].productos_id_producto = this.detalle.producto.id,
                this.detalles[detalleId].nombre_producto =this.detalle.producto.nombre,
                this.detalles[detalleId].pvp_item = (parseFloat(this.detalle.pvp)).toFixed(2),
                this.detalles[detalleId].pvd_item = (parseFloat(this.detalle.pvd)).toFixed(2),
                this.detalles[detalleId].descuentoPorcentaje_item = parseInt(this.detalle.desctItem),
                this.detalles[detalleId].precioUnitario_detalleCompra = (parseFloat(this.detalle.precioUnit)).toFixed(2),
                this.detalles[detalleId].cantidad_detalleCompra = parseInt(this.detalle.cantidad),
                this.detalles[detalleId].precio_detalleCompra = (parseFloat(this.detalle.precioTotal)).toFixed(2),
                this.detalles[detalleId].descuentoPorcentaje_detalleCompra = parseInt(this.detalle.desct),
                this.detalles[detalleId].numeroSerie_item = this.detalle.serie.num,
                this.detalles[detalleId].editar = this.editar,
                this.detalles[detalleId].eliminar = this.eliminar
                this.agregarPrecios()
                this.calcularSubtotal()
                this.calcularDescuentoInd()
                this.calcularDescuentoTotal()
                this.calcularIva()
                this.calcularTotal()
            },
            
            eliminarDetalle(detalleId){
                this.detalles.splice(detalleId,1)
            },

            calcularPrecioTotal(){
                this.detalle.precioTotal = (parseInt(this.detalle.cantidad) * parseFloat(this.detalle.precioUnit)).toFixed(2)
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
                    const desctInd = (parseFloat(this.detalles[i].descuentoPorcentaje_detalleCompra))/100
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
                this.iva = (this.form.subtotal - this.form.descuento)
                this.iva = parseFloat((this.iva*0.12).toFixed(2))
            },

            calcularTotal(){
                this.form.total = null
                this.form.total = (this.form.subtotal - this.form.descuento) + this.iva
                this.form.total = parseFloat(this.form.total).toFixed(2)
            },

            mostrarInput(event){
                this.numCant = event
                this.calcularPrecioTotal()
            },

            handleOk(bvModalEvt){
                bvModalEvt.preventDefault()
                this.handleSubmit()
            },

            handleSubmit() {
                if (!this.validarDetalle())
                    return
                if(!this.validarProductos())
                    return
                if(this.titleBtn == 'Agregar')
                    this.crearDetalles()
                else
                    this.editarDetalle(this.editId)
                this.$nextTick(() => {
                    this.closeModal()
                })
            },

            handleSubmit2() {
                if (!this.validarCompra())
                    return
                this.crearCompra()
            },

            closeModal(){
                this.$bvModal.hide('detalle-modal')
            },

            openModal(detalleId,action){
                this.getProductos()
                this.$bvModal.show('detalle-modal')
                this.onReset()
                if(action == 'editar'){
                    this.editId = detalleId
                    this.cargarFormEditar(this.editId)
                    this.title = 'Editar Detalle'
                    this.titleBtn = 'Actualizar'
                }else{
                    this.title='Añadir Nuevo Producto'
                    this.titleBtn = 'Agregar'
                }
            },
            
            cargarFormEditar(detalleId){
                this.detalle.producto.id = this.detalles[detalleId].productos_id_producto
                this.detalle.producto.nombre = this.detalles[detalleId].nombre_producto
                this.detalle.pvp = this.detalles[detalleId].pvp_item
                this.detalle.pvd = this.detalles[detalleId].pvd_item
                this.detalle.desctItem = this.detalles[detalleId].descuentoPorcentaje_item
                this.detalle.precioUnit = this.detalles[detalleId].precioUnitario_detalleCompra
                this.detalle.cantidad = this.detalles[detalleId].cantidad_detalleCompra
                this.detalle.precioTotal = this.detalles[detalleId].precio_detalleCompra
                this.detalle.desct = this.detalles[detalleId].descuentoPorcentaje_detalleCompra
                this.detalle.serie.num = this.detalles[detalleId].numeroSerie_item
                this.editar = this.detalles[detalleId].editar
                this.eliminar = this.detalles[detalleId].eliminar
                this.numCant = this.detalles[detalleId].cantidad_detalleCompra
            },

            validarCompra() {
                var valid1 = true
                if(this.form.fecha == '')
                    valid1 = false
                const valid2 = this.$refs.factura_input.checkValidity()
                const valid3 = this.$refs.proveedor_select.checkValidity()
                this.form.fechaState = valid1
                this.form.facturaState = valid2
                this.form.proveedorState = valid3
                if( valid1 == false || valid2 == false || valid3 == false )
                    return false
                else
                    return true
            },

            validarDetalle() {
                const valid = this.$refs.producto_select.checkValidity()
                const valid1 = this.$refs.cant_input.checkValidity()
                const valid2 = this.$refs.precioUnit_input.checkValidity()
                const valid3 = this.$refs.desct_input.checkValidity()
                const valid4 = this.$refs.pvp_input.checkValidity()
                const valid5 = this.$refs.pvd_input.checkValidity()
                const valid6 = this.$refs.desctItem_input.checkValidity()
                this.detalle.productoState = valid
                this.detalle.cantidadState = valid1
                this.detalle.precioUnitState = valid2
                this.detalle.desctState = valid3
                this.detalle.pvpState = valid4
                this.detalle.pvdState = valid5
                this.detalle.desctItemState = valid6
                if(!this.validarInputs())
                    return
                if(valid == false || valid1 == false || valid2 == false || valid3 == false || valid4 == false || valid5 == false || valid6 == false)
                    return false
                else
                    return true
            },

            validarProveedores(){
                this.nombres_proveedores=[]
                for (var i = 0; i < this.proveedores.length; i++) { 
                    const nombre =this.proveedores[i].nombre_proveedor.trim()
                    this.nombres_proveedores.push(nombre)
                }
                if(this.nombres_proveedores.includes(this.form.nombreProveedor)){
                    for (var i = 0; i < this.proveedores.length; i++) {
                        if(this.proveedores[i].nombre_proveedor.trim() == this.form.nombreProveedor)
                            this.form.proveedorId = this.proveedores[i].id_proveedor
                    }
                    return true
                }
                else{
                    this.$toast.error('El proveedor ingresado no existe. Seleccione de la lista')
                    return false
                }
            },
            
            validarProductos(){
                this.nombres_productos=[]
                for (var i = 0; i < this.productos.length; i++) { 
                    const nombre =this.productos[i].nombre_producto.trim()
                    this.nombres_productos.push(nombre)
                }
                if(this.nombres_productos.includes(this.detalle.producto.nombre)){
                    for (var i = 0; i < this.productos.length; i++) {
                        if(this.productos[i].nombre_producto.trim() == this.detalle.producto.nombre)
                            this.detalle.producto.id = this.productos[i].id_producto
                    }
                    return true
                }
                else{
                    this.$toast.error('El producto ingresado no existe. Seleccione de la lista')
                    return false
                }
            },

            validarInputs(){
                for (var i = 0; i < this.detalle.serie.num.length; i++) {
                    if(this.detalle.serie.num[i]== ''){
                        this.$toast.error('El número de serie es requerido.')
                        return false
                    }
                }
                if(this.detalle.serie.num.length  == this.numCant)
                    return true
                else{
                    this.$toast.error('Ingrese todos los números de serie.')
                    return false
                }
            },

            onReset(){
                this.detalle.pvp= ''
                this.detalle.pvpState= null
                this.detalle.pvd= ''
                this.detalle.pvdState= null
                this.detalle.numSerie= ''
                this.detalle.desctItem= ''
                this.detalle.producto.nombre=''
                this.detalle.desctItemState= null
                this.detalle.cantidad= 1
                this.detalle.cantidadState = null
                this.detalle.precioTotal= ''
                this.detalle.precioUnit= ''
                this.detalle.precioUnitState= null
                this.detalle.desct= ''
                this.detalle.desctState= null
                this.numCant = 1
                this.detalle.productoState = null
                this.detalle.serie.num =[]
            },

            showModalDelete(detalleId){
                this.confirm = ''
                this.$bvModal.msgBoxConfirm('¿Está seguro que desea eliminar este detalle?', {
                    title: 'Confirmar',
                    size: 'sm',
                    buttonSize: 'sm',
                    okVariant: 'danger',
                    okTitle: 'Si',
                    cancelTitle: 'No',
                    footerClass: 'p-2',
                    hideHeaderClose: false,
                    centered: true
                }).then(value => {
                    this.confirm = value
                    if(this.confirm == true){
                        this.eliminarDetalle(detalleId)
                    }
                }).catch( e=>{
                    this.$toast.error(e.response.data.detail)
                })
            },
        },
    }
</script>