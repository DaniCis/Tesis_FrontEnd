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
                                <b-form class="ps-4 mt-3 pe-4" @submit.stop.prevent="handleSubmit2()" novalidate>
                                    <div class="row mt-2">
                                        <div class="col-12 col-lg-4">
                                            <div class="row mt-2">
                                                <div class="col-12 col-md-8 ">
                                                    <label class="col-4">Fecha</label>
                                                    <span class="col-4 text-sm">{{this.form.fecha}}</span>
                                                </div>
                                            </div>
                                            <div class="row mt-2">
                                                <div class="col-12 col-md-8 col-lg-10 mt-2 ">
                                                    <b-form-group 
                                                        label="Buscar cliente por"
                                                        label-for='radio-group'>
                                                        <b-form-radio-group
                                                            id="radio-group"
                                                            v-model="form.busqueda"
                                                            name="radio-sub-component" @change='onResetOptionBus()'>
                                                            <b-form-radio value="ident">Identificación</b-form-radio>
                                                            <b-form-radio value="nombre">Nombre</b-form-radio>
                                                            <b-form-radio value="nuevo">Nuevo</b-form-radio>
                                                        </b-form-radio-group>
                                                    </b-form-group>
                                                </div>
                                            </div>
                                            <div class="row mt-2">
                                                <div class="col-10 col-md-8 col-lg-7 " v-if="this.form.busqueda == 'nombre'">
                                                    <b-form-group 
                                                    label="Nombre" 
                                                    label-for="clienteBus-select"
                                                    invalid-feedback="Seleccione un nombre" 
                                                    :state="form.clienteBusState">
                                                    <b-form-input id="clienteBus-select" placeholder='Nombre' list="list-cli" v-model="form.clienteBus" ref='clienteBus_select' :state="form.clienteBusState" required @change="busquedaPor($event)"></b-form-input>
                                                        <datalist id="list-cli">
                                                            <option v-for="cliente in this.clientes">
                                                            {{cliente.nombre_cliente}}
                                                        </option>
                                                        </datalist>
                                                    </b-form-group>
                                                </div>
                                                <div class="col-10 col-md-8 col-lg-7" v-if="this.form.busqueda == 'ident'">
                                                    <b-form-group
                                                        label="Identificación"
                                                        label-for="identBus-input"
                                                        invalid-feedback="Este campo es requerido" 
                                                        :state="form.identBusState">
                                                        <b-form-input  @change="busquedaPor($event)"
                                                            id="identBus-input" class="form-control" type="text" placeholder="Identificación" ref='identBus_input'
                                                            v-model="form.identBus" :state="form.identBusState" required>
                                                        </b-form-input>
                                                    </b-form-group>
                                                </div>
                                            </div>
                                            <div class="row mt-2" v-if="this.form.busqueda == 'nuevo'">
                                                <div class="col-12 col-md-5 col-lg-4">
                                                    <b-form-group 
                                                        label="Tipo de Identificación" 
                                                        label-for="tipo-select" 
                                                        invalid-feedback="Este campo es requerido"
                                                        :state="form.tipoState">
                                                        <select 
                                                            id="tipo-select" v-model="form.tipo" class="form-select" :state="form.tipoState" ref='tipo_select' required>
                                                            <option disabled hidden value=''> Seleccione</option>
                                                            <option value='Cedula' >Cédula</option>
                                                            <option value='RUC'>RUC</option>
                                                        </select>
                                                    </b-form-group>
                                                </div>
                                                <div class="col-12 col-md-8 col-lg-6">
                                                    <b-form-group 
                                                        label="Identificación" 
                                                        label-for="ident-input" 
                                                        invalid-feedback="Este campo es requerido" 
                                                        :state="form.identState">
                                                        <b-form-input  
                                                            id="ident-input" class="form-control" type="text" placeholder="Identificación" ref='ident_input'
                                                            v-model="form.ident" :state="form.identState" required>
                                                        </b-form-input>
                                                    </b-form-group>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12 col-lg-6">
                                            <div class="row mt-2" >
                                                <div class="col-12 col-md-8 col-lg-5" v-if="this.form.busqueda == 'nombre'">
                                                    <b-form-group 
                                                        label="Identificación" 
                                                        label-for="ident-input" >
                                                        <b-form-input  
                                                            id="ident-input" class="form-control" type="text" ref='ident_input' placeholder='Identificación'
                                                            v-model="form.ident" :readonly="this.form.busqueda == 'nombre'">
                                                        </b-form-input>
                                                    </b-form-group>
                                                </div>
                                                <div class="col-12 col-md-8 col-lg-5" v-if="this.form.busqueda == 'ident' || this.form.busqueda == 'nuevo'">
                                                    <b-form-group 
                                                        label="Nombre" 
                                                        label-for="nombre-input" 
                                                        invalid-feedback="Este campo es requerido" 
                                                        :state="form.nombreState">
                                                        <b-form-input  :readonly="this.form.busqueda == 'ident'"
                                                            id="nombre-input" class="form-control" type="text" ref='nombre_input'
                                                            v-model="form.nombre" :state="form.nombreState" required placeholder='Nombre'>
                                                        </b-form-input>
                                                    </b-form-group>
                                                </div>
                                                <div class="col-12 col-md-8 col-lg-5 ">
                                                    <b-form-group 
                                                        label="Dirección" 
                                                        label-for="dir-input" 
                                                        invalid-feedback="Este campo es requerido" 
                                                        :state="form.direccionState">
                                                        <b-form-input :readonly="this.form.busqueda == 'ident' || this.form.busqueda == 'nombre'"
                                                            id="dir-input" class="form-control" type="text" ref='dir_input' placeholder='Dirección'
                                                            v-model="form.direccion" :state="form.direccionState" required>
                                                        </b-form-input>
                                                    </b-form-group>
                                                </div>
                                            </div>
                                            <div class="row mt-2">
                                                <div class="col-12 col-md-6 col-lg-5">
                                                    <b-form-group 
                                                        label="Teléfono" 
                                                        label-for="telf-input" 
                                                        invalid-feedback="Este campo es requerido" 
                                                        :state="form.telefonoState">
                                                        <b-form-input :readonly="this.form.busqueda == 'ident' || this.form.busqueda == 'nombre'"
                                                            id="telf-input" class="form-control" type="text" placeholder="Teléfono" ref='telf_input'
                                                            v-model="form.telefono" :state="form.telefonoState" required>
                                                        </b-form-input>
                                                    </b-form-group>
                                                </div>
                                                <div class="col-12 col-md-6 col-lg-5 mt-2 mt-md-0">
                                                   <b-form-group 
                                                        label="Correo" 
                                                        label-for="correo-input" 
                                                        invalid-feedback="Este campo es requerido" 
                                                        :state="form.correoState">
                                                        <b-form-input :readonly="this.form.busqueda == 'ident' || this.form.busqueda == 'nombre'"
                                                            id="correo-input" class="form-control" type="text" placeholder="Correo" ref='correo_input'
                                                            v-model="form.correo" :state="form.correoState" required>
                                                        </b-form-input>
                                                    </b-form-group>
                                                </div>
                                            </div>
                                            <div class="row mt-2" v-if="this.form.busqueda == 'nuevo'">
                                                <div class="ms-auto my-auto">
                                                    <a @click="registrarCliente()" class="btn bg-gradient-primary btn-sm mb-0">Registrar Cliente</a>
                                                </div>
                                            </div>
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
                                                         <tr v-if="this.detalles.length == 0">
                                                            <td colspan="10">
                                                                <h6 class="ms-3 mb-2 text-sm text-center mt-4">Sin Productos </h6> 
                                                            </td> 
                                                        </tr>
                                                        <tr  v-else v-for="(detalle,i) in this.detalles">
                                                            <td>
                                                                <h6 class=" ms-3 mb-2 text-sm">{{i+1}}</h6>
                                                            </td>
                                                            <td class="align-middle text-center text-sm">
                                                                <p class="text-sm font-weight-bold mb-0">{{detalle.nombre_producto}}</p>
                                                            </td>
                                                            <td class="align-middle text-center text-sm">
                                                                <p class="text-sm font-weight-bold mb-0">{{detalle.cantidad_detalleVenta}}</p>
                                                            </td>
                                                            <td class="align-middle text-center text-sm">
                                                                <p class="text-sm font-weight-bold mb-0">${{detalle.precioUnitario_detalleVenta}}</p>
                                                            </td>
                                                            <td class="align-middle text-center text-sm">
                                                                <p class="text-sm font-weight-bold mb-0">%{{detalle.descuentoPorcentaje_detalleVenta}}</p>
                                                            </td>
                                                            <td class="align-middle text-center text-sm">
                                                                <p class="text-sm font-weight-bold mb-0">${{detalle.precio_detalleVenta}}</p>
                                                            </td>
                                                            <td class="align-middle">
                                                                <div class="contenedorAcciones">
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
                                <b-modal id="detalle-modal"  :title="title" cancel-title='Cancelar' :ok-title="titleBtn" @ok="handleOk($event)">
                                    <b-form @submit.stop.prevent="handleSubmit()">
                                        <div class="row mt-3">
                                            <div class="col-12 col-md-10">
                                                <b-form-group 
                                                    label="Producto" 
                                                    label-for="producto-select"
                                                    invalid-feedback="Seleccione un producto" 
                                                    :state="detalle.productoState">
                                                    <b-form-input :state="detalle.productoState" ref='producto_select' required id="producto-select" list="list-prod" v-model="detalle.producto.nombre" @change="busquedaProducto($event)"></b-form-input>
                                                    <datalist id="list-prod">
                                                        <option v-for="producto in this.productos">
                                                            {{producto.nombre_producto}}
                                                        </option>
                                                    </datalist>
                                                </b-form-group>
                                            </div>
                                            <div class="row mt-2" v-if="this.stockState">
                                                <label>Disponibilidad en stock: {{this.stock}}</label>
                                            </div>
                                            <div class="row mt-2" v-if="this.stockState">
                                                <div class="col-12 col-md-5">
                                                    <b-form-group 
                                                        label="Cantidad" 
                                                        label-for="cant-input"
                                                        invalid-feedback="Este campo es requerido" 
                                                        :state="detalle.cantidadState">
                                                        <b-form-input @change="calcularPrecioTotal()" required :state="detalle.cantidadState" ref="cant_input" id="cant-input" class="form-control" type="number" min='1' :max="this.stock" v-model="detalle.cantidad">
                                                        </b-form-input>
                                                    </b-form-group>
                                                </div>
                                                <div class="col-12 col-md-5">
                                                    <b-form-group 
                                                        label="Precio Unitario $" 
                                                        label-for="precioUnit-input">
                                                        <b-form-input  readonly  id="precioUnit-input" class="form-control" type="number" min='0' step="any" v-model="detalle.precioUnit">
                                                        </b-form-input>
                                                    </b-form-group>
                                                </div>
                                            </div>
                                            <div class="row mt-2" v-if="this.stockState">
                                                <div class="col-12 col-md-5">
                                                    <b-form-group 
                                                        label="Descuento %" 
                                                        label-for="desct-input">
                                                        <b-form-input 
                                                            id="desct-input" class="form-control" readonly type="number" min='0' v-model="detalle.desct">
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
                    clienteBus:'',
                    clienteBusState:null,
                    identBus:'',
                    identBusState:null,
                    tipo:'',
                    tipoState:null,
                    ident:'',
                    identState:null,
                    nombre:'',
                    nombreState:null,
                    direccion:'',
                    direccionState:null,
                    telefono:'',
                    telefonoState:null,
                    correo:'',
                    correoState:null,
                    clienteId:null,
                    total:null,
                    subtotal:null,
                    descuento:null,
                    busqueda:'ident'
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
                crear:null,
                editar:true,
                eliminar:true,
                iva:null,
                editId:null,
                stock:null,
                stockState:false,
                confirm:'',
                title:'',
                titleBtn:'',
            }
        },
        async mounted(){
            this.getNombresClientes()
            this.getProductos()
            this.getFecha()
            this.permisosCrud = getSubmodulos('Ventas','OrdenVenta')
            if('crear' in this.permisosCrud)
                this.crear = true
        },
        methods:{
            async crearVenta(){
                if(this.crear){
                    if(this.detalles.length ==0){
                        this.$toast.error('Debe agregar productos para registar una venta')
                    }else{
                        this.detallesCopia = JSON.parse(JSON.stringify(this.detalles));
                        for (var i = 0; i < this.detalles.length; i++) {   
                            delete this.detallesCopia[i].nombre_producto
                            delete this.detallesCopia[i].precioUnitario_detalleVenta
                            delete this.detallesCopia[i].precio_detalleVenta
                            delete this.detallesCopia[i].descuentoPorcentaje_detalleVenta
                            delete this.detallesCopia[i].editar
                            delete this.detallesCopia[i].eliminar
                        }
                        var params = {
                            total_venta: parseFloat(this.form.total).toFixed(2),
                            clientes_id_cliente: this.form.clienteId,
                            detalle_venta: this.detallesCopia,
                        }
                        console.log(params)
                        await axios.post('http://10.147.17.173:5004/ventas', params,{ headers:{ Authorization: 'Bearer ' + getAccessToken() }
                        }).then(() => {
                            this.$toast.success('Venta creada con éxito')
                            this.$router.push('/ventas');
                        }).catch (e => {
                            this.$toast.error(e.response.data.detail)
                        })
                    }
                }else{
                    this.$toast.error('No tiene permisos para agregar')
                }
            },

            async getProductos(){
                await axios.get(`http://10.147.17.173:5002/productosExistentes`,{ headers:{ Authorization: 'Bearer ' + getAccessToken() }
                }).then(response => {
                    this.productos = response.data
                    console.log(this.productos)
                })
                .catch(e => {
                    this.$toast.error(e.response.data.detail)
                })
            },

            async getNombresClientes(){
                await axios.get(`http://10.147.17.173:5004/clientes/viewNombres`,{ headers:{ Authorization: 'Bearer ' + getAccessToken() }
                }).then(response => {
                    this.clientes = response.data
                })
                .catch(e => {
                    this.$toast.error(e.response.data.detail)
                })
            },

            async registrarCliente(){
                if (!this.validarForm())
                    return
                var params = {
                    identificacion_cliente: this.form.ident,
                    tipoIdentificacion_cliente: this.form.tipo,
                    nombre_cliente: this.form.nombre,
                    direccion_cliente: this.form.direccion,
                    telefono_cliente: this.form.telefono,
                    correo_cliente: this.form.correo
                }
                await axios.post(`http://10.147.17.173:5004/clientes/`, params,{ headers:{ Authorization: 'Bearer ' + getAccessToken() }
                }).then(() => {
                    this.$toast.success('Cliente creado con éxito')
                    this.form.busqueda ='ident'
                    this.form.identBus = this.form.ident
                    this.getClienteIdent(this.form.ident)
                }).catch (e => {
                    this.$toast.error(e.response.data.detail)
                })
            },

            async getClienteIdent(ident){
                await axios.get(`http://10.147.17.173:5004/clientes/findByIdentificacion/${ident}`,{ headers:{ Authorization: 'Bearer ' + getAccessToken() }
                }).then(response => {
                    this.form.nombreState = null
                    this.form.direccionState =null
                    this.form.correoState = null
                    this.form.telefonoState = null
                    this.form.nombre = response.data.nombre_cliente
                    this.form.direccion = response.data.direccion_cliente
                    this.form.correo = response.data.correo_cliente
                    this.form.telefono = response.data.telefono_cliente
                    this.form.clienteId = response.data.id_cliente
                })
                .catch(e => {
                    this.$toast.error(e.response.data.detail)
                })
            },

            async getClienteNombre(nombre){
                await axios.get(`http://10.147.17.173:5004/clientes/findByNombre/${nombre}`,{ headers:{ Authorization: 'Bearer ' + getAccessToken() }
                }).then(response => {
                    this.form.ident = response.data.identificacion_cliente
                    this.form.direccion = response.data.direccion_cliente
                    this.form.correo = response.data.correo_cliente
                    this.form.telefono = response.data.telefono_cliente
                    this.form.clienteId = response.data.id_cliente
                })
                .catch(e => {
                    this.$toast.error(e.response.data.detail)
                })
            },
            
            async getDetalleProducto(nombre){
                 await axios.get(`http://10.147.17.173:5002/detalleProducto/venta/${nombre}`,{ headers:{ Authorization: 'Bearer ' + getAccessToken() }
                }).then(response => {
                    this.stock = response.data.cantidad_producto
                    this.detalle.precioUnit = response.data.pvp_item.slice(1)
                    this.detalle.desct = response.data.descuentoPorcentaje_item
                    this.detalle.producto.id = response.data.id_producto
                    this.detalle.producto.nombre = response.data.nombre_producto
                    this.detalle.precioTotal = response.data.pvp_item.slice(1)
                })
                .catch(e => {
                    this.$toast.error(e.response.data.detail)
                })
            },

            crearDetalles(){
                var detalle = {
                    productos_id_producto: this.detalle.producto.id,
                    nombre_producto:this.detalle.producto.nombre,
                    precioUnitario_detalleVenta: (parseFloat(this.detalle.precioUnit)).toFixed(2),
                    cantidad_detalleVenta: parseInt(this.detalle.cantidad),
                    precio_detalleVenta: (parseFloat(this.detalle.precioTotal)).toFixed(2),
                    descuentoPorcentaje_detalleVenta: parseInt(this.detalle.desct),
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
                this.detalles[detalleId].precioUnitario_detalleVenta = (parseFloat(this.detalle.precioUnit)).toFixed(2),
                this.detalles[detalleId].cantidad_detalleVenta = parseInt(this.detalle.cantidad),
                this.detalles[detalleId].precio_detalleVenta = (parseFloat(this.detalle.precioTotal)).toFixed(2),
                this.detalles[detalleId].descuentoPorcentaje_detalleVenta = parseInt(this.detalle.desct),
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
                    const precio = this.detalles[i].precio_detalleVenta
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
                    const desctInd = (parseFloat(this.detalles[i].descuentoPorcentaje_detalleVenta))/100
                    const desct = parseFloat(this.detalles[i].precio_detalleVenta) * desctInd.toFixed(2)
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
                this.iva = ((this.iva*0.12).toFixed(2))
            },

            calcularTotal(){
                this.form.total = null
                this.form.total = (this.form.subtotal - this.form.descuento) + parseFloat(this.iva)
                this.form.total = parseFloat(this.form.total).toFixed(2)
            },

            getFecha(){
                let date = new Date();
                this.form.fecha = date.toISOString().split('T')[0]
            },

            busquedaProducto($event){
                this.stockState = true
                this.getDetalleProducto($event)
            },

            busquedaPor($event){
                if(this.form.busqueda == 'nombre')
                    this.getClienteNombre($event)
                else
                    this.getClienteIdent($event)
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
                if(!this.validarBusqueda())
                    return
                this.crearVenta()
            },

            closeModal(){
                this.$bvModal.hide('detalle-modal')
            },

            openModal(detalleId,action){
                this.$bvModal.show('detalle-modal')
                this.onResetModal()
                if(action == 'editar'){
                    this.editId = detalleId
                    this.cargarFormEditar(this.editId)
                    this.title = 'Editar Detalle'
                    this.titleBtn = 'Actualizar'
                }else{
                    this.stockState = false
                    this.title='Añadir Nuevo Producto'
                    this.titleBtn = 'Agregar'
                }
            },

            cargarFormEditar(detalleId){
                this.detalle.producto.id = this.detalles[detalleId].productos_id_producto
                this.detalle.producto.nombre = this.detalles[detalleId].nombre_producto
                this.detalle.precioUnit = this.detalles[detalleId].precioUnitario_detalleVenta
                this.detalle.cantidad = this.detalles[detalleId].cantidad_detalleVenta
                this.detalle.precioTotal = this.detalles[detalleId].precio_detalleVenta
                this.detalle.desct = this.detalles[detalleId].descuentoPorcentaje_detalleVenta
                this.editar = this.detalles[detalleId].editar
                this.eliminar = this.detalles[detalleId].eliminar
            },

            validarForm(){
                const valid = this.$refs.tipo_select.checkValidity()
                const valid1 = this.$refs.ident_input.checkValidity()
                const valid2 = this.$refs.nombre_input.checkValidity()
                const valid3 = this.$refs.dir_input.checkValidity()
                const valid4 = this.$refs.telf_input.checkValidity()
                const valid5 = this.$refs.correo_input.checkValidity()
                this.form.nombreState = valid2
                this.form.tipoState = valid
                this.form.identState = valid1
                this.form.direccionState = valid3
                this.form.telefonoState = valid4
                this.form.correoState = valid5
                if(valid == false || valid1 == false || valid2 == false || valid3 == false || valid4 == false || valid5 == false)
                    return false
                else
                    return true
            },

            validarBusqueda() {
                if(this.form.busqueda == 'ident'){
                    const valid = this.$refs.identBus_input.checkValidity()
                    this.form.identBusState = valid
                    if( valid == false)
                        return false
                    else
                        return true
                }else if(this.form.busqueda == 'nombre'){
                    const valid = this.$refs.clienteBus_select.checkValidity()
                    this.form.clienteBusState = valid
                    if( valid == false)
                        return false
                    else
                        return true
                }  
            },

            validarDetalle() {
                if(this.stock== true){
                    const valid = this.$refs.producto_select.checkValidity()
                    this.detalle.productoState = valid
                    if(valid == false)
                        return false
                    else
                        return true
                }else{
                    const valid = this.$refs.producto_select.checkValidity()
                    const valid1 = this.$refs.cant_input.checkValidity()
                    this.detalle.productoState = valid
                    this.detalle.cantidadState = valid1
                    if(valid == false || valid1 == false)
                        return false
                    else
                        return true
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
            onResetForm(){
                this.form.tipo='',
                this.form.tipoState=null,
                this.form.ident='',
                this.form.identState=null,
                this.form.nombre='',
                this.form.nombreState=null,
                this.form.direccion='',
                this.form.direccionState=null,
                this.form.telefono='',
                this.form.telefonoState=null,
                this.form.correo='',
                this.form.correoState=null
            },

            onResetModal(){
                this.detalle.producto.nombre=''
                this.detalle.cantidad = 1
                this.detalle.cantidadState = null
                this.detalle.precioTotal= ''
                this.detalle.precioUnit= ''
                this.detalle.desct= ''
                this.detalle.productoState = null
            },

            onResetOptionBus(){
                this.onResetForm()
                this.form.clienteBusState =null
                this.form.identBusState =null
                this.form.ident=''
                this.form.nombre = ''
                this.form.direccion = ''
                this.form.correo = ''
                this.form.telefono = ''
                this.form.clienteBus = ''
                this.form.identBus = ''
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
        }
    }
</script>