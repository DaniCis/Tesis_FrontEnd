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
                                                            name="radio-sub-component">
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
                                                    label-for="cliente-select"
                                                    invalid-feedback="Seleccione un nombre" 
                                                    :state="form.clienteState">
                                                    <b-form-input id="cliente-select" placeholder='Nombre' list="list-cli" v-model="form.nombreCliente" ref='cliente_select' :state="form.clienteState" required @change="busquedaPor($event)"></b-form-input>
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
                                                        label-for="ident-input"
                                                        invalid-feedback="Este campo es requerido" 
                                                        :state="form.identState">
                                                        <b-form-input  @change="busquedaPor($event)"
                                                            id="ident-input" class="form-control" type="text" placeholder="Identificación" ref='ident_input'
                                                            v-model="form.ident" :state="form.identState" required>
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
                                                            <option disabled :value='null'> Seleccione</option>
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
                                                        label-for="ident-input" 
                                                        invalid-feedback="Este campo es requerido" 
                                                        :state="form.identState">
                                                        <b-form-input  
                                                            id="ident-input" class="form-control" type="text" placeholder="Identificación" ref='ident_input'
                                                            v-model="form.ident" :state="form.identState" required>
                                                        </b-form-input>
                                                    </b-form-group>
                                                </div>
                                                <div class="col-12 col-md-8 col-lg-5" v-if="this.form.busqueda == 'ident' || this.form.busqueda == 'nuevo'">
                                                    <b-form-group 
                                                        label="Nombre" 
                                                        label-for="nombre-input" 
                                                        invalid-feedback="Este campo es requerido" 
                                                        :state="form.nombreState">
                                                        <b-form-input  
                                                            id="nombre-input" class="form-control" type="text" ref='nombre_input'
                                                            v-model="form.nombre" :state="form.nombreState" required>
                                                        </b-form-input>
                                                    </b-form-group>
                                                </div>
                                                <div class="col-12 col-md-8 col-lg-5 ">
                                                    <b-form-group 
                                                        label="Dirección" 
                                                        label-for="dir-input" 
                                                        invalid-feedback="Este campo es requerido" 
                                                        :state="form.direccionState">
                                                        <b-form-input  
                                                            id="dir-input" class="form-control" type="text" ref='dir_input'
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
                                                        <b-form-input  
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
                                                        <b-form-input  
                                                            id="correo-input" class="form-control" type="text" placeholder="Correo" ref='correo_input'
                                                            v-model="form.correo" :state="form.correoState" required>
                                                        </b-form-input>
                                                    </b-form-group>
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
                                                    <b-form-input :state="detalle.productoState" ref='producto_select' required id="producto-select" list="list-prod" v-model="detalle.producto.nombre"></b-form-input>
                                                    <datalist id="list-prod">
                                                        <option v-for="producto in this.productos">
                                                            {{producto.nombre_producto}}
                                                        </option>
                                                    </datalist>
                                                </b-form-group>
                                            </div>
                                            <div class="row mt-2">
                                                <div class="col-12 col-md-5">
                                                    <b-form-group 
                                                        label="Cantidad" 
                                                        label-for="cant-input"
                                                        invalid-feedback="Este campo es requerido" 
                                                        :state="detalle.cantidadState">
                                                        <b-form-input @change="calcularPrecioTotal()" required :state="detalle.cantidadState" ref="cant_input" id="cant-input" class="form-control" type="number" min='1' v-model="detalle.cantidad">
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
                                            <div class="row mt-2">
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
                    numeroComprobante:'',
                    comprobanteState:null,
                    nombreCliente:'',
                    clienteState:null,
                    clienteId:null,
                    total:null,
                    subtotal:null,
                    descuento:null,
                    busqueda:''
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
                cliente:[],
                productos:[],
                detalles:[],
                detallesCopia:[],
                precios:[],
                descuentos:[],
                nombres_productos:[],
                nombres_clientes:[],
                crear:null,
                iva:null,
                editId:null,
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
            
            async getProductos(){
                await axios.get(`http://10.147.17.173:5002/productosExistentes`,{ headers:{ Authorization: 'Bearer ' + getAccessToken() }
                }).then(response => {
                    this.productos = response.data
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

            getFecha(){
                let date = new Date();
                this.form.fecha = date.toISOString().split('T')[0]
            },

            busquedaPor($event){
                this.cliente = []
                if(this.form.busqueda == 'nombre')
                    this.getClienteNombre($event)
                else
                    this.getClienteIdent($event)
            },

            async getClienteIdent(ident){
                await axios.get(`http://10.147.17.173:5004/clientes/findByIdentificacion/${ident}`,{ headers:{ Authorization: 'Bearer ' + getAccessToken() }
                }).then(response => {
                    this.cliente = response.data
                })
                .catch(e => {
                    this.$toast.error(e.response.data.detail)
                })
            },

            async getClienteNombre(nombre){
                await axios.get(`http://10.147.17.173:5004/clientes/findByNombre/${nombre}`,{ headers:{ Authorization: 'Bearer ' + getAccessToken() }
                }).then(response => {
                    this.cliente = response.data
                })
                .catch(e => {
                    this.$toast.error(e.response.data.detail)
                })
            },

            closeModal(){
                this.$bvModal.hide('detalle-modal')
            },

            openModal(detalleId,action){
                this.$bvModal.show('detalle-modal')
                //this.onReset()
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
        }
    }
</script>