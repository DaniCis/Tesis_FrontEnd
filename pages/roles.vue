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
                                    <div class="ms-auto my-auto mt-lg-0 mt-4">
                                        <div class="ms-auto my-auto">
                                            <a @click="openModal(rol.id_rol, 'agregar')" class="btn bg-gradient-primary btn-sm mb-0"> +&nbsp; Nuevo rol</a>
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
                                                    <select class="form-select dataTable-selector">
                                                        <option value="5">5</option>
                                                        <option value="10">10</option>
                                                        <option value="15">15</option>
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
                                                    <th class="text-secondary opacity-7"></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="rol in this.roles">
                                                        <td>
                                                        <h6 class=" ms-3 mb-2 text-sm">{{rol.id_rol}}</h6>
                                                        </td>
                                                        <td>
                                                            <p class="text-s font-weight-bold mb-0">{{rol.nombre_rol}}</p>
                                                        </td>
                                                        <td class="align-middle text-center text-sm">
                                                            <p class="text-s font-weight-bold mb-0">{{rol.descripcion_rol}}</p>
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
                                            <div class="dataTable-info">1 de {{this.roles.length}} </div>
                                            <nav class="dataTable-pagination">
                                                <ul class="dataTable-pagination-list">
                                                    <li class="pager">
                                                        <a>‹</a>
                                                    </li>
                                                    <li class="active">
                                                        <a>1</a>
                                                    </li>
                                                    <li class="pager">
                                                        <a>2</a>
                                                    </li>
                                                    <li class="pager">
                                                        <a>3</a>
                                                    </li>
                                                    <li class="pager">
                                                        <a>›</a>
                                                    </li>
                                                </ul>
                                            </nav>
                                        </div>
                                    </div>
                                </div>
                                <b-modal id="rol-modal" :title="title" hide-footer>
                                    <b-form method='post'>
                                        <div>
                                            <div class="row mt-2">
                                                <div class="col-12 col-md-8">
                                                    <label>Nombre</label>
                                                    <b-form-input class="form-control" placeholder="Nombre" type="text" v-model='form.nombre' required></b-form-input>
                                                </div>
                                            </div>
                                            <div class="row mt-3">
                                                <div class="col-12 col-md-8">
                                                    <label>Descripción</label>
                                                    <b-form-input class="form-control" type="text" placeholder="Descripción" v-model='form.descripcion' required></b-form-input>
                                                </div>
                                            </div>
                                             <div class="button-row d-flex mt-5">
                                                <b-button  @click='closeModal' class="btn bg-gradient-secondary me-3 ms-auto mb-0">
                                                    Cancelar
                                                </b-button>
                                                <b-button v-if="titleBtn == 'Agregar' " class="btn bg-gradient-primary mb-0 js-btn-next" @click='crearRol'>
                                                    Agregar
                                                </b-button>
                                                <b-button v-else class="btn bg-gradient-primary mb-0 js-btn-next" @click='editarRol(editId)'>
                                                    Actualizar
                                                </b-button>
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
                },
                permisosCrud:[],
                rol:[],
                roles: [],
                editId:null,
                editar:null,
                eliminar:null,
                confirm: '',
                title:'',
                titleBtn:'',
            }
        },
        async mounted(){
            this.permisosCrud = getSubmodulos('Administración','Roles')
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
                    this.$toast.error('Ocurrió un error al cargar: ' + e.message)
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
                     this.$toast.error('Ocurrió un error al cargar: ' + e.message)
                })
            },
            async crearRol(){
                if('crear'in this.permisosCrud){
                    var params = {
                        nombre_rol: this.form.nombre,
                        descripcion_rol:this.form.descripcion
                    }
                    await axios.post('/roles', params)
                    .then(() => {
                        this.$toast.success('Rol creado con éxito')
                        this.cerrar()
                    }).catch (e => {
                         this.$toast.error('Ocurrió un error al agregar: ' + e.message)
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
                        this.closeModal()
                        this.getRoles()
                    }).catch (e => {
                        this.$toast.error('Ocurrió un error al editar: '+ e.message)
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
                        this.$toast.error('Ocurrió un error al eliminar: '+ e.message)
                    })
                }else{
                    this.$toast.error('No tiene permisos para eliminar')
                }
            },
            onReset(){
                this.form.nombre = ''
                this.form.descripcion = ''
            },
            closeModal(){
                this.$bvModal.hide('rol-modal')
            },
            openModal(rolId, action){
                this.$bvModal.show('rol-modal')
                if(action == 'editar'){
                    this.getRol(rolId)
                    this.editId = rolId
                    this.title = 'Editar Rol'
                    this.titleBtn = 'Actualizar'
                }else{
                    this.onReset()
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
                    this.$toast.error(e.message)
                })
            },
        },
    }
</script>