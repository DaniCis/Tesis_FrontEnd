<template>
    <div class="g-sidenav-show bg-gray-100 vh-completa" id='mainDashboard'> 
        <Sidebar />
        <Navbar :Modulo='"Soporte Técnico"' :Tabla='"Garantías"'/>
        <CheckToken />
        <main class="main-content position-relative max-height-vh-100 mt-1 border-radius-lg media-left">
            <div class="container-fluid py-4">
                <div class="row">
                    <div class="col-12">
                        <div class="card mb-4">
                            <div class="card-header pb-0">
                                 <div class="d-lg-flex">
                                    <div>
                                        <h5>Garantías</h5>
                                    </div>
                                    <div class="ms-auto my-auto mt-lg-0 mt-4" v-if="crear">
                                        <div class="ms-auto my-auto">
                                            <a @click="openModal(null, 'agregar')" class="btn bg-gradient-primary btn-sm mb-0"> +&nbsp; Nueva Garantía</a>
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
                                            <table id='content-table' class="table table-flush dataTable-table">
                                                <thead>
                                                    <tr>
                                                        <th class="text-uppercase text-secondary text-xs font-weight-bolder opacity-7">ID</th>
                                                        <th class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7 ps-2">Fecha de Entrada</th>
                                                        <th class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7">Producto</th>
                                                        <th class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7">Num Serie</th>
                                                        <th class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7">Cliente</th>
                                                        <th></th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-if="error">
                                                        <td colspan="7">
                                                            <h6 class="ms-3 mb-2 text-sm text-center">No existen registros</h6> 
                                                        </td>       
                                                    </tr>
                                                    <tr v-for="(garantia,i) in paginador(this.garantias)" :key="i">
                                                        <td class="align-middle">
                                                            <h6 class="ms-3 mb-2 text-sm">{{garantia.id_garantia}}</h6>
                                                        </td>
                                                        <td class="align-middle text-center text-sm">
                                                            <p class="text-sm font-weight-bold mb-0">{{garantia.fechaEntrada_garantia}}</p>
                                                        </td>
                                                        <td class="align-middle text-center text-sm">
                                                            <p class="text-sm font-weight-bold mb-0">{{garantia.nombre_producto}}</p>
                                                        </td>
                                                        <td class="align-middle text-center text-sm">
                                                            <p class="text-sm font-weight-bold mb-0">{{garantia.numeroSerie_item}}</p>
                                                        </td>
                                                        <td class="align-middle text-center text-sm">
                                                            <p class="text-sm font-weight-bold mb-0">{{garantia.nombre_cliente}}</p>
                                                        </td>
                                                        <td class="align-middle text-sm">
                                                            <div class="mb-0">
                                                                <a class="cursor-pointer" @click="openModal(garantia.id_garantia,'ver')">
                                                                    Ver detalles
                                                                </a>
                                                            </div>
                                                        </td>
                                                        <td class="align-middle">
                                                            <div class="contenedorAcciones">
                                                                <div v-if="eliminar">
                                                                    <a class="trash cursor-pointer"  @click='showModalDelete(garantia.id_garantia)'>
                                                                        <b-icon class="icon" icon='trash' style="width: 1.2em; height: 1.2em; color: #ff0c0c;"></b-icon>
                                                                    </a>
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
                                                :total-rows="this.garantias.length"
                                                :per-page="porPag"
                                                ></b-pagination>
                                            </nav>
                                        </div>
                                    </div>
                                </div>
                                <b-modal id="garantia-modal" size="xl" :title="title"  cancel-title='Cancelar' :ok-title="titleBtn" @ok="handleOk($event)">
                                    <b-form @submit.stop.prevent="handleSubmit()">
                                        <div class="row">
                                            <div class="col-12 col-lg-6">
                                                <b-card style="border: 1px solid rgba(0, 0, 0, 0.125);" class="header-detalle" sub-title="Datos del Cliente">
                                                    <div class="row mt-3" v-if="titleBtn == 'Agregar'">
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
                                                                </b-form-radio-group>
                                                            </b-form-group>
                                                        </div>
                                                    </div>
                                                    <div class="row mt-2" v-if="titleBtn == 'Agregar'">
                                                        <div class="col-10 col-md-8 col-lg-7 " v-if="this.form.busqueda == 'nombre'">
                                                            <b-form-group 
                                                            label="Nombre" 
                                                            label-for="clienteBus-select"
                                                            invalid-feedback="Seleccione un nombre" 
                                                            :state="form.clienteBusState">
                                                            <b-form-input id="clienteBus-select" placeholder='Nombre' list="list-cli" v-model="form.clienteBus" ref='clienteBus_select' :state="form.clienteBusState" trim required @change="busquedaPor($event)"></b-form-input>
                                                                <datalist id="list-cli">
                                                                    <option v-for="(cliente,i) in this.clientes" :key="i">
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
                                                                :state="form.identBusState"
                                                                description='máx.13 dígitos'>
                                                                <b-form-input  @change="busquedaPor($event)"
                                                                    id="identBus-input" class="form-control" type="number" min='0' placeholder="Identificación" ref='identBus_input'
                                                                    v-model="form.identBus" :state="form.identBusState" required>
                                                                </b-form-input>
                                                            </b-form-group>
                                                        </div>
                                                    </div>
                                                    <div class="row mt-1">
                                                        <div class="col-12" v-if="titleBtn == 'ok'">
                                                            <label class="col-4 col-lg-3">Identificación:</label>
                                                            <span class="col-8 text-sm">{{this.form.ident}}</span>
                                                        </div>
                                                        <div class="col-12" v-if="this.form.busqueda == 'nombre'">
                                                            <label class="col-4 col-lg-3">Identificación:</label>
                                                            <span class="col-8 text-sm">{{this.form.ident}}</span>
                                                        </div>
                                                        <div class="col-12" v-if="this.form.busqueda == 'ident'">
                                                            <label class="col-4 col-lg-3">Nombre:</label>
                                                            <span class="col-8 text-sm">{{this.form.nombre}}</span>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-12" >
                                                            <label class="col-4 col-lg-3">Dirección:</label>
                                                            <span class="col-8 text-sm">{{this.form.direccion}}</span>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-12" >
                                                            <label class="col-4 col-lg-3">Teléfono:</label>
                                                            <span class="col-8 text-sm">{{this.form.telefono}}</span>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-12" >
                                                            <label class="col-4 col-lg-3">Correo:</label>
                                                            <span class="col-8 text-sm">{{this.form.correo}}</span>
                                                        </div>
                                                    </div>
                                                </b-card>
                                            </div>
                                            <div class="col-12 col-lg-6">
                                                <b-card style="border: 1px solid rgba(0, 0, 0, 0.125);" sub-title='Información del Producto'>
                                                    <div class="row mt-3">
                                                        <div class="col-12 col-md-8" v-if="titleBtn != 'ok'">
                                                            <b-form-group 
                                                                label="Número de Serie" 
                                                                label-for="num-select"
                                                                invalid-feedback="Este campo es requerido" 
                                                                :state="form.numState">
                                                                <b-form-input trim :state="form.numState" placeholder="Número de Serie" ref='num_select' required id="num-select" v-model="form.num" @change="getProductoItem($event)"></b-form-input>
                                                            </b-form-group>
                                                        </div>
                                                        <div class="col-12" v-else>
                                                            <label class="col-6 col-lg-4">Fecha:</label>
                                                            <span class="col-6 text-sm">{{this.form.fecha}}</span>
                                                        </div>
                                                    </div>
                                                    <div class="row mt-2">
                                                        <div class="col-12" v-if="titleBtn == 'ok'">
                                                            <label class="col-6 col-lg-4">Número de Serie:</label>
                                                            <span class="col-6 text-sm">{{this.form.num}}</span>
                                                        </div>
                                                    </div>
                                                    <div class="row mt-2">
                                                        <div class="col-12 col-md-8" v-if="titleBtn != 'ok'">
                                                            <b-form-group 
                                                                label="Producto" 
                                                                label-for="producto-input">
                                                                <b-form-input id="producto-input" v-model="form.producto" readonly></b-form-input>
                                                            </b-form-group>
                                                        </div>
                                                        <div class="col-12" v-else>
                                                            <label class="col-6 col-lg-4">Producto:</label>
                                                            <span class="col-6 text-sm">{{this.form.producto}}</span>
                                                        </div>
                                                    </div>
                                                    <div class="row mt-2" >
                                                        <div class="col-12 col-md-8" v-if="titleBtn != 'ok'">
                                                            <b-form-group 
                                                                label="Detalle" 
                                                                label-for="detalle-area"
                                                                invalid-feedback="Este campo es requerido" 
                                                                :state="form.detalleState">
                                                                <b-form-textarea
                                                                    id="detalle-area"
                                                                    ref="detalle_area"
                                                                    v-model="form.detalle"
                                                                    :state="form.detalleState"
                                                                    placeholder="Detalle"
                                                                    rows="3" trim
                                                                    max-rows="4"
                                                                    required>
                                                                </b-form-textarea>
                                                            </b-form-group>
                                                        </div>
                                                        <div class="col-12" v-else>
                                                            <label class="col-6 col-lg-4">Detalle:</label>
                                                            <span class="col-6 text-sm">{{this.form.detalle}}</span>
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
    import CheckToken from '~/components/checkToken.vue';
    import { getAccessToken, getSubmodulos } from '~/utils/auth';


    export default{
        components: { Sidebar, Navbar, CheckToken },
        middleware: 'authenticated',
        data(){
            return{
                form:{
                    busqueda:'ident',
                    clienteBus:'',
                    clienteBusState:null,
                    identBus:'',
                    identBusState:null,
                    ident:'',
                    nombre:'',
                    direccion:'',
                    telefono:'',
                    correo:'',
                    clienteId:null,
                    num:'',
                    numState:null,
                    detalle:'',
                    detalleState:null,
                    producto:'',
                    itemId:'',
                    fecha:''
                },
                permisosCrud:[],
                garantias:[],
                clientes:[],
                productos:[],
                crear:null,
                editar:null,
                eliminar:null,
                editId:null,
                error:false,
                confirm: '',
                title:'',
                titleBtn:'',
                pagActual:1,
                porPag:10,
            }
        },
        async mounted(){
            this.permisosCrud = getSubmodulos('SoporteTécnico','Garantías')
            if('crear' in this.permisosCrud)
                this.crear = true
            if('eliminar' in this.permisosCrud)
                this.eliminar = true
            if('leer' in this.permisosCrud)
                this.getGarantias()
            else
                this.$toast.error('No tiene permiso de lectura')
        },
        methods:{
            async getGarantias(){
                await axios.get('http://10.147.17.173:5004/garantias',{ headers:{ Authorization: 'Bearer ' + getAccessToken() }
                }).then(response => {
                    if(response.data !=null)
                        this.garantias = response.data
                    else
                        this.error=true
                }).catch (e=> {
                    this.$toast.error(e.response.data.detail)
                })
            },

            async getGarantia(garantiaId){
                await axios.get(`http://10.147.17.173:5004/garantias/${garantiaId}`,{ headers:{ Authorization: 'Bearer ' + getAccessToken() }
                }).then(response => {
                    this.form.fecha = response.data.fechaEntrada_garantia
                    this.form.ident = response.data.identificacion_cliente
                    this.getClienteIdent(this.form.ident)
                    this.form.num = response.data.numeroSerie_item
                    this.form.producto = response.data.nombre_producto
                    this.form.detalle = response.data.detalle_garantia

                }).catch (e=> {
                    this.$toast.error(e.response.data.detail)
                })
            },

            async crearGarantia(){
                if(this.crear){
                    var params = {
                        clientes_id_cliente: this.form.clienteId,
                        detalle_garantia:  this.form.detalle,
                        inventario_id_item: this.form.itemId
                    }
                    await axios.post('http://10.147.17.173:5004/garantias', params,{ headers:{ Authorization: 'Bearer ' + getAccessToken() }
                    }).then(() => {
                        this.$toast.success('Garantía creada con éxito')
                        this.getGarantias()
                    }).catch (e => {
                        this.$toast.error(e.response.data.detail)
                    })
                }else{
                    this.$toast.error('No tiene permisos para agregar')
                }
            },

            async eliminarGarantia(garantiaId){
                if(this.eliminar){
                    await axios.delete(`http://10.147.17.173:5004/garantias/${garantiaId}`,{ headers:{ Authorization: 'Bearer ' + getAccessToken() }
                    }).then(() => {
                        this.$toast.success('Garantía eliminado con éxito')
                        this.getGarantias()
                    }).catch (e => {
                        this.$toast.error(e.response.data.detail)
                    })
                }else{
                    this.$toast.error('No tiene permisos para eliminar')
                }
            },
            
            async getClienteIdent(ident){
                await axios.get(`http://10.147.17.173:5004/clientes/findByIdentificacion/${ident}`,{ headers:{ Authorization: 'Bearer ' + getAccessToken() }
                }).then(response => {
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
            
            async getNombresClientes(){
                await axios.get(`http://10.147.17.173:5004/clientes/viewNombres`,{ headers:{ Authorization: 'Bearer ' + getAccessToken() }
                }).then(response => {
                    this.clientes = response.data
                })
                .catch(e => {
                    this.$toast.error(e.response.data.detail)
                })
            },
            
            async getProductoItem(item){
                await axios.get(`http://10.147.17.173:5004/findProductoByNumeroSerie/${item}`,{ headers:{ Authorization: 'Bearer ' + getAccessToken() }
                }).then(response => {
                    if(response.data !=null){
                        this.form.producto = response.data.nombre_producto
                        this.form.itemId = response.data.id_item
                    }
                    else
                        this.$toast.error('Número de serie no encontrado')
                })
                .catch(e => {
                    this.$toast.error(e.response.data.detail)
                })
            },

            busquedaPor($event){
                if(this.form.busqueda == 'nombre')
                    this.getClienteNombre($event)
                else
                    this.getClienteIdent($event)
            },

            validarForm(){
                const valid = this.$refs.num_select.checkValidity()
                const valid1 = this.$refs.detalle_area.checkValidity()
                this.form.numState = valid
                this.form.detalleState = valid1
                if(valid == false || valid1 == false)
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

            handleOk(bvModalEvt){
                bvModalEvt.preventDefault()
                this.handleSubmit()
            },

            handleSubmit() {
                if(this.titleBtn=='Agregar'){
                    if(!this.validarBusqueda())
                    return
                    if (!this.validarForm())
                        return
                    this.crearGarantia()
                }
                this.$nextTick(() => {
                    this.closeModal('garantia-modal')
                })
            },

            onReset(){
                this.form.detalleState = null
                this.form.numState = null
                this.form.fecha=''
                this.form.num =''
                this.form.producto=''
                this.form.detalle=''
            },
            
            onResetOptionBus(){
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

            closeModal(name){
                this.$bvModal.hide(name)
            },

            openModal(garantiaId, action){
                this.getNombresClientes()
                this.$bvModal.show('garantia-modal')
                this.onReset()
                this.onResetOptionBus()
                if(action == 'ver'){
                    this.getGarantia(garantiaId)
                    this.editId = garantiaId
                    this.title = 'Garantía #' + garantiaId
                    this.titleBtn = 'ok'
                }else{
                    this.title='Añadir Nueva Garantía'
                    this.titleBtn = 'Agregar'
                }
            },

            showModalDelete(garantiaId){
                this.confirm = ''
                this.$bvModal.msgBoxConfirm('¿Está seguro que desea eliminar este registro?', {
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
                        this.eliminarGarantia(garantiaId)
                    }
                }).catch( e=>{
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
        },
    }
</script>