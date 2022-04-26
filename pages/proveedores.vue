<template>
    <div class="g-sidenav-show bg-gray-100 vh-completa" id='mainDashboard'> 
        <Sidebar />
        <Navbar :Modulo='"Compras"' :Tabla='"Proveedores"'/>
        <CheckToken/>
        <main class="main-content position-relative max-height-vh-100 mt-1 border-radius-lg media-left">
            <div class="container-fluid py-4">
                <div class="row">
                    <div class="col-12">
                        <div class="card mb-4">
                            <div class="card-header pb-0">
                                 <div class="d-lg-flex">
                                    <div>
                                        <h5>Proveedores</h5>
                                    </div>
                                    <div class="ms-auto my-auto mt-lg-0 mt-4" v-if="crear">
                                        <div class="ms-auto my-auto">
                                            <a @click="openModal(null, 'agregar')" class="btn bg-gradient-primary btn-sm mb-0"> +&nbsp; Nuevo Proveedor</a>
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
                                                        <th class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7">Nombre</th>
                                                        <th class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7">Dirección</th>
                                                        <th class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7">Teléfono</th>
                                                        <th class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7">Correo</th>
                                                        <th class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7">Estado</th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-if="error">
                                                        <td colspan="5">
                                                            <h6 class="ms-3 mb-2 text-sm text-center">No existen registros</h6> 
                                                        </td>       
                                                    </tr>
                                                    <tr v-for="proveedor in paginador(this.proveedores)">
                                                        <td class="align-middle">
                                                            <h6 class=" ms-3 mb-2 text-sm">{{proveedor.id_proveedor}}</h6>
                                                        </td>
                                                        <td class="align-middle text-center text-sm">
                                                            <p class="text-sm font-weight-bold mb-0">{{proveedor.nombre_proveedor}}</p>
                                                        </td>
                                                        <td class="align-middle text-center text-sm">
                                                            <p class="text-sm font-weight-bold mb-0">{{proveedor.direccion_proveedor}}</p>
                                                        </td>
                                                        <td class="align-middle text-center text-sm">
                                                            <p class="text-sm font-weight-bold mb-0">{{proveedor.telefono_proveedor}}</p>
                                                        </td>
                                                        <td class="align-middle text-center text-sm">
                                                            <p class="text-sm font-weight-bold mb-0">{{proveedor.correo_proveedor}}</p>
                                                        </td>
                                                        <td class="align-middle text-center text-sm">
                                                            <div v-if="proveedor.estado_proveedor == true"> 
                                                                <span class="badge badge-sm bg-gradient-success">Activo</span>
                                                            </div>
                                                            <div v-else>
                                                                <span class="badge badge-sm bg-gradient-danger">Inactivo</span>
                                                            </div>
                                                        </td>
                                                        <td class="align-middle">
                                                            <div class="contenedorAcciones">
                                                                <div v-if="editar">
                                                                    <a v-if="proveedor.estado_proveedor == true" class="cursor-pointer" @click="openModal(proveedor.id_proveedor, 'editar')">
                                                                        <b-icon  class='mx-3' icon='pencil-square' style="width: 1.2em; height: 1.2em"></b-icon>
                                                                    </a>
                                                                    <a v-else class="mx-4"></a>
                                                                </div>
                                                                <div v-if="eliminar">
                                                                    <a class="trash cursor-pointer"  @click='showModalDelete(proveedor.id_proveedor)'>
                                                                        <b-icon class="icon" icon='arrow-down-up' style="width: 1.2em; height: 1.2em; color: #ff0c0c;"></b-icon>
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
                                                :total-rows="this.proveedores.length"
                                                :per-page="porPag"
                                                ></b-pagination>
                                            </nav>
                                        </div>
                                    </div>
                                </div>
                                <b-modal id="proveedor-modal" :title="title"  cancel-title='Cancelar' :ok-title="titleBtn" @ok="handleOk($event,editId)">
                                    <b-form @submit.stop.prevent="handleSubmit(editId)">
                                        <div class="row mt-2">
                                            <div class="col-12 col-md-8">
                                                <b-form-group
                                                    label="Nombre" 
                                                    label-for="name-input" 
                                                    invalid-feedback="Este campo es requerido" 
                                                    :state="form.nameState">
                                                    <b-form-input  
                                                        id="name-input" class="form-control" type="text" placeholder="Nombre" ref='name_input'
                                                        v-model="form.nombre" :state="form.nameState" trim required>
                                                    </b-form-input>
                                                </b-form-group>
                                            </div>
                                        </div>
                                        <div class="row mt-2">
                                            <div class="col-12 col-md-8">
                                                <b-form-group
                                                    label="Dirección" 
                                                    label-for="dir-input" 
                                                    invalid-feedback="Este campo es requerido" 
                                                    :state="form.direccionState">
                                                    <b-form-input  
                                                        id="dir-input" class="form-control" type="text" placeholder="Dirección" ref='dir_input'
                                                        v-model="form.direccion" :state="form.direccionState" trim required>
                                                    </b-form-input>
                                                </b-form-group>
                                            </div>
                                        </div>
                                        <div class="row mt-2">
                                            <div class="col-12 col-md-8">
                                                <b-form-group
                                                    label="Teléfono" 
                                                    label-for="telf-input" 
                                                    invalid-feedback="Este campo es requerido" 
                                                    :state="form.telefonoState"
                                                    description='máx.13 dígitos'>
                                                    <b-form-input  
                                                        id="telf-input" class="form-control" type="number" min='0' placeholder="Teléfono" ref='telf_input'
                                                        v-model="form.telefono" :state="form.telefonoState" required>
                                                    </b-form-input>
                                                </b-form-group>
                                            </div>
                                        </div>
                                        <div class="row mt-2">
                                            <div class="col-12 col-md-8">
                                                <b-form-group
                                                    label="Correo" 
                                                    label-for="correo-input" 
                                                    invalid-feedback="Este campo es requerido" 
                                                    :state="form.correoState">
                                                    <b-form-input  
                                                        id="correo-input" class="form-control" type="email" placeholder="Correo" ref='correo_input'
                                                        v-model="form.correo" :state="form.correoState" trim required>
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
    import CheckToken from '~/components/checkToken.vue';
    import { getAccessToken, getSubmodulos } from '~/utils/auth';
    
    export default{
        components: { Sidebar, Navbar, CheckToken },
        middleware: 'authenticated',
        data(){
            return{
                form:{
                    nombre:'',
                    nameState:null,
                    direccion:'',
                    direccionState:null,
                    telefono:'',
                    telefonoState:null,
                    correo:'',
                    correoState:null
                },
                permisosCrud:[],
                proveedores:[],
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
            this.permisosCrud = getSubmodulos('Compras','Proveedores')
            if('crear' in this.permisosCrud)
                this.crear = true
            if('editar' in this.permisosCrud)
                this.editar = true
            if('eliminar' in this.permisosCrud)
                this.eliminar = true
            if('leer' in this.permisosCrud)
                this.getProveedores()
            else
                this.$toast.error('No tiene permiso de lectura')
        },
        methods:{
            async getProveedores(){
                await axios.get('http://10.147.17.173:5003/proveedores',{ headers:{ Authorization: 'Bearer ' + getAccessToken() }
                }).then(response => {
                    if(response.data !=null)
                        this.proveedores = response.data
                    else
                        this.error=true
                }).catch (e=> {
                    this.$toast.error(e.response.data.detail)
                })
            },

            async getProveedor(proveedorId){
                await axios.get(`http://10.147.17.173:5003/proveedores/${proveedorId}`,{ headers:{ Authorization: 'Bearer ' + getAccessToken()}
                }) .then(response => {
                    this.form.nombre = response.data.nombre_proveedor
                    this.form.direccion = response.data.direccion_proveedor
                    this.form.telefono = response.data.telefono_proveedor
                    this.form.correo = response.data.correo_proveedor
                }) .catch(e => {
                    this.$toast.error(e.response.data.detail)
                })
            },

            async crearProveedor(){
                if(this.crear){
                    var params = {
                        nombre_proveedor: this.form.nombre,
                        direccion_proveedor: this.form.direccion,
                        telefono_proveedor:this.form.telefono,
                        correo_proveedor : this.form.correo
                    }
                    await axios.post('http://10.147.17.173:5003/proveedores', params,{ headers:{ Authorization: 'Bearer ' + getAccessToken() }
                    }).then(() => {
                        this.$toast.success('Proveedor creado con éxito')
                        this.getProveedores()
                    }).catch (e => {
                        this.$toast.error(e.response.data.detail)
                    })
                }else{
                    this.$toast.error('No tiene permisos para agregar')
                }
            },

            async editarProveedor(proveedorId){
                if(this.editar){
                    var params = {
                        nombre_proveedor: this.form.nombre,
                        direccion_proveedor: this.form.direccion,
                        telefono_proveedor:this.form.telefono,
                        correo_proveedor : this.form.correo
                    }
                    await axios.put(`http://10.147.17.173:5003/proveedores/${proveedorId}`, params, { headers:{ Authorization: 'Bearer ' + getAccessToken() }
                    }).then(() => {
                        this.$toast.success('Proveedor editado con éxito')
                        this.getProveedores()
                    }).catch (e => {
                        this.$toast.error(e.response.data.detail)
                    })
                }else{
                    this.$toast.error('No tiene permisos para modificar')
                }
            },

            async eliminarProveedor(proveedorId){
                if(this.eliminar){  
                    await axios.delete(`http://10.147.17.173:5003/proveedores/${proveedorId}`,{ headers:{ Authorization: 'Bearer ' + getAccessToken() }
                    }).then(() => {
                        this.$toast.success('Estado editado con éxito')
                        this.getProveedores()
                    }).catch (e => {
                        this.$toast.error(e.response.data.detail)
                    })
                }else{
                    this.$toast.error('No tiene permisos para eliminar')
                }
            },

            handleOk(bvModalEvt, proveedorId){
                bvModalEvt.preventDefault()
                this.handleSubmit(proveedorId)
            },

            validarForm() { 
                const valid = this.$refs.name_input.checkValidity()
                const valid2 = this.$refs.dir_input.checkValidity()
                const valid3 = this.$refs.telf_input.checkValidity()
                const valid4 = this.$refs.correo_input.checkValidity()
                this.form.nameState = valid
                this.form.direccionState = valid2
                this.form.telefonoState = valid3
                this.form.correoState = valid4
                if(valid == false || valid2 == false || valid3 == false || valid4 == false)
                    return false
                else
                    return true
            },

            validarTelf(){
                if(this.form.telefono.length > 0 && this.form.telefono.length < 14)
                    return true
                else{
                    this.form.telefonoState=false
                    this.$toast.error('El teléfono debe ser máx. 13 dígitos')
                    return false
                }
                    
            },

            handleSubmit( proveedorId) {
                if (!this.validarForm())
                    return
                if (!this.validarTelf())
                    return
                if(this.titleBtn == 'Agregar')
                    this.crearProveedor()
                else
                    this.editarProveedor(proveedorId)
                this.$nextTick(() => {
                    this.closeModal()
                })
            },

            onReset(){
                this.form.nombre ='',
                this.form.direccion ='',
                this.form.correo ='',
                this.form.telefono ='',
                this.form.nameState = null,
                this.form.direccionState = null,
                this.form.correoState = null,
                this.form.telefonoState =null
            },
            
            closeModal(){
                this.$bvModal.hide('proveedor-modal')
            },

            openModal(proveedorId, action){
                this.$bvModal.show('proveedor-modal')
                this.onReset()
                if(action == 'editar'){
                    this.getProveedor(proveedorId)
                    this.editId = proveedorId
                    this.title = 'Editar Proveedor'
                    this.titleBtn = 'Actualizar'
                }else{
                    this.title='Añadir Nuevo Proveedor'
                    this.titleBtn = 'Agregar'
                }
            },

            showModalDelete(proveedorId){
                this.confirm = ''
                this.$bvModal.msgBoxConfirm('¿Está seguro que desea cambiar el estado del proveedor?', {
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
                        this.eliminarProveedor(proveedorId)
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
        }
    }
</script>