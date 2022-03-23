<template>
    <div class="g-sidenav-show  bg-gray-100 vh-completa" id='mainDashboard'> 
        <Sidebar />
        <Navbar :Modulo='"Administración"' :Tabla='"Roles"'/>
        <main class="main-content position-relative max-height-vh-100 mt-1 border-radius-lg media-left">
            <div class="container-fluid py-4">
                <div class="row">
                    <div class="col-12">
                        <div class="card mb-4">
                            <div class="card-header pb-0">
                                <div class="d-lg-flex">
                                    <div>
                                        <h5>Roles</h5>
                                    </div>
                                    <div class="ms-auto my-auto mt-lg-0 mt-4" v-if="crear">
                                        <div class="ms-auto my-auto">
                                            <a @click="openModal(null, 'agregar')" class="btn bg-gradient-primary btn-sm mb-0"> +&nbsp; Nuevo rol</a>
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
                                            <table class="table table-flush dataTable-table">
                                                <thead>
                                                    <tr>
                                                    <th class="text-uppercase text-secondary text-xs font-weight-bolder opacity-7">Id</th>
                                                    <th class="text-uppercase text-secondary text-xs font-weight-bolder opacity-7 ps-2">Nombre</th>
                                                    <th class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7">Descripción</th>
                                                    <th class="text-uppercase text-secondary text-xs font-weight-bolder opacity-7 ps-2"></th>
                                                    <th class="text-secondary opacity-7"></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="rol in paginador(this.roles)">
                                                        <td>
                                                        <h6 class=" ms-3 mb-2 text-sm">{{rol.id_rol}}</h6>
                                                        </td>
                                                        <td>
                                                            <p class="text-sm font-weight-bold mb-0">{{rol.nombre_rol}}</p>
                                                        </td>
                                                        <td class="align-middle text-center text-sm">
                                                            <p class="text-s font-weight-bold mb-0">{{rol.descripcion_rol}}</p>
                                                        </td>
                                                        <td class="align-middle text-sm">
                                                            <div>
                                                                <nuxt-link :to="{name:'rol-rolId',params:{rolId: rol.id_rol}}">
                                                                    Permisos
                                                                </nuxt-link>
                                                            </div>
                                                        </td>
                                                        <td class="align-middle">
                                                            <div class="contenedorAcciones">
                                                                <div v-if="editar">
                                                                    <a class="cursor-pointer" @click="openModal(rol.id_rol, 'editar')">
                                                                        <b-icon  class='mx-3' icon='pencil-square' style="width: 1.2em; height: 1.2em"></b-icon>
                                                                    </a>
                                                                </div>
                                                                <div v-if="eliminar">
                                                                    <a class="trash cursor-pointer"  @click='showModalDelete(rol.id_rol)'>
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
                                                :total-rows="this.roles.length"
                                                :per-page="porPag"
                                                ></b-pagination>
                                            </nav>
                                        </div>
                                    </div>
                                </div>
                                <b-modal id="rol-modal" :title="title"  cancel-title='Cancelar' :ok-title="titleBtn" @ok="handleOk($event,editId)"  >
                                    <b-form  @submit.stop.prevent="handleSubmit(editId)">
                                        <div class="row mt-2">
                                            <div class="col-12 col-md-8">
                                                <b-form-group
                                                    label="Nombre" 
                                                    label-for="name-input" 
                                                    invalid-feedback="Este campo es requerido" 
                                                    :state="form.nameState">
                                                    <b-form-input
                                                        id="name-input" class="form-control" type="text" placeholder="Nombre" ref='name_input'
                                                        v-model="form.nombre" :state="form.nameState" required>
                                                    </b-form-input>
                                                </b-form-group>
                                            </div>
                                        </div>
                                        <div class="row mt-3">
                                            <div class="col-12 col-md-8">
                                                <b-form-group
                                                    label="Descripción" 
                                                    label-for="des-input" 
                                                    invalid-feedback="Este campo es requerido" 
                                                    :state="form.desState">
                                                    <b-form-input 
                                                        id="de-input" class="form-control" type="text" placeholder="Descripción" ref='des_input'
                                                        v-model="form.descripcion" :state="form.desState" required>
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
    axios.defaults.baseURL ='http://10.147.17.173:5000';
    
    export default{
        components: { Sidebar, Navbar },
        middleware: 'authenticated',
        data() {
            return {
                form:{
                    nombre:'',
                    descripcion:'',
                    nameState:null,
                    desState:null,
                },
                permisosCrud:[],
                rol:[],
                roles: [],
                editId:null,
                crear:null,
                editar:null,
                eliminar:null,
                confirm: '',
                title:'',
                titleBtn:'',
                pagActual:1,
                porPag:10,
            }
        },
        async mounted(){
            this.permisosCrud = getSubmodulos('Administración','Roles')
            if('crear' in this.permisosCrud)
                this.crear= true
            if('editar' in this.permisosCrud)
                this.editar = true
            if('eliminar' in this.permisosCrud)
                this.eliminar = true
            if('leer' in this.permisosCrud)
                this.getRoles()
            else
                this.$toast.error('No tiene permiso de lectura')
        },
        methods: {
            async getRoles(){
                await axios.get('/roles',{ headers:{ Authorization: 'Bearer ' + getAccessToken() }
                }).then(response => {
                    this.roles = response.data;
                }).catch (e=> {
                    this.$toast.error(e.response.data.detail)
                })
            },
            async getRol(rolId){
                await axios.get(`/roles/${rolId}`,{ headers:{ Authorization: 'Bearer ' + getAccessToken() }
                }).then(response => {
                    this.rol = response.data;
                    this.form.nombre = response.data.nombre_rol
                    this.form.descripcion = response.data.descripcion_rol
                })
                .catch(e => {
                     this.$toast.error(e.response.data.detail)
                })
            },
            async crearRol(){
                if(this.crear){
                    var params = {
                        nombre_rol: this.form.nombre,
                        descripcion_rol:this.form.descripcion
                    }
                    await axios.post('/roles', params)
                    .then(() => {
                        this.$toast.success('Rol creado con éxito')
                        this.getRoles()
                    }).catch (e => {
                         this.$toast.error(e.response.data.detail)
                    })
                }else{
                    this.$toast.error('No tiene permisos para agregar')
                }
            },
            async editarRol(rolId){
                if(this.editar){
                    var params = {
                        nombre_rol: this.form.nombre,
                        descripcion_rol:this.form.descripcion
                    }
                    await axios.put(`/roles/${rolId}`, params)
                    .then(() => {
                        this.$toast.success('Rol editado con éxito')
                        this.getRoles()
                    }).catch (e => {
                        this.$toast.error(e.response.data.detail)
                    })
                }else{
                    this.$toast.error('No tiene permisos para modificar')
                }
            },
            async eliminarRol(rolId){
                if(this.eliminar){
                    await axios.delete(`/roles/${rolId}`,{ headers:{ Authorization: 'Bearer ' + getAccessToken() }
                    }).then(() => {
                        this.$toast.success('Rol eliminado correctamente')
                        this.getRoles()
                    }).catch (e=> {
                        this.$toast.error(e.response.data.detail)
                    })
                }else{
                    this.$toast.error('No tiene permisos para eliminar')
                }
            },
            validarForm() {
                const valid = this.$refs.name_input.checkValidity()
                const valid2 = this.$refs.des_input.checkValidity()
                this.form.nameState = valid
                this.form.desState = valid2
                if(valid == false || valid2 == false)
                    return false
                else
                    return true
            },
            handleOk(bvModalEvt,rolId){
                bvModalEvt.preventDefault()
                this.handleSubmit(rolId)
            },
            handleSubmit(rolId) {
                if (!this.validarForm())
                    return
                if(this.titleBtn == 'Agregar')
                    this.crearRol()
                else
                    this.editarRol(rolId)
                this.$nextTick(() => {
                    this.closeModal()
                })
            },
            onReset(){
                this.form.nombre = ''
                this.form.descripcion = ''
                this.form.nameState = null
                this.form.desState = null
            },
            closeModal(){
                this.$bvModal.hide('rol-modal')
            },
            openModal(rolId, action){
                this.$bvModal.show('rol-modal')
                this.onReset()
                if(action == 'editar'){
                    this.getRol(rolId)
                    this.editId = rolId
                    this.title = 'Editar Rol'
                    this.titleBtn = 'Actualizar'
                }else{
                    this.title='Añadir Nuevo Rol'
                    this.titleBtn = 'Agregar'
                }
            },
            showModalDelete(rolId){
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
                        this.eliminarRol(rolId)
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