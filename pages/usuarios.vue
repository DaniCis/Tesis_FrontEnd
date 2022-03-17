<template>
    <div class="g-sidenav-show bg-gray-10 vh-completa" id='mainDashboard'> 
        <Sidebar />
        <Navbar :Modulo='"Administración"' :Tabla='"Usuarios"'/>
        <main class="main-content position-relative max-height-vh-100 mt-1 border-radius-lg media-left">
            <div class="container-fluid py-4">
                <div class="row">
                    <div class="col-12">
                        <div class="card mb-4">
                            <div class="card-header pb-0">
                                 <div class="d-lg-flex">
                                    <div>
                                        <h5>Usuarios</h5>
                                    </div>
                                    <div class="ms-auto my-auto mt-lg-0 mt-4" v-if="'crear' in this.permisosCrud">
                                        <div class="ms-auto my-auto">
                                            <a @click="openModal(user.id_usuario, 'agregar')" class="btn bg-gradient-primary btn-sm mb-0"> +&nbsp; Nuevo usuario</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body px-0 pt-0 pb-2">
                                <div class="table-responsive p-0">
                                    <div class="dataTable-wrapper dataTable-loading no-footer sortable searchable fixed-columns">
                                        <div class="dataTable-top">
                                            <div class="dataTable-dropdown">
                                                <label>
                                                    <select class="dataTable-selector">
                                                        <option value="5">5</option>
                                                        <option value="10">10</option>
                                                        <option value="15">15</option>
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
                                                        <th class="text-uppercase text-secondary text-xs font-weight-bolder opacity-7 ps-2">Nombre</th>
                                                        <th class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7">Rol</th>
                                                        <th class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7">Estado</th>
                                                        <th class="text-secondary opacity-7"></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="user in this.usuarios">
                                                        <td>
                                                            <h6 class=" ms-3 mb-2 text-sm">{{user.id_usuario}}</h6>
                                                        </td>
                                                        <td>
                                                            <p class="text-s font-weight-bold mb-0">{{user.nombre_usuario}}</p>
                                                        </td>
                                                        <td class="align-middle text-center text-sm">
                                                            <p class="text-s font-weight-bold mb-0">{{user.nombre_rol}}</p>
                                                        </td>
                                                        <td class="align-middle text-center text-sm">
                                                            <div v-if="user.estado_usuario == true"> 
                                                                <span class="badge badge-sm bg-gradient-success">Activo</span>
                                                            </div>
                                                            <div v-else>
                                                                <span class="badge badge-sm bg-gradient-danger">Inactivo</span>
                                                            </div>
                                                        </td>
                                                        <td class="align-middle">
                                                            <div class="contenedorAcciones" >
                                                                <div v-if="editar">
                                                                    <a class="cursor-pointer" @click="openModal(user.id_usuario, 'editar')">
                                                                        <b-icon  class='mx-3' icon='pencil-square' style="width: 1.2em; height: 1.2em"></b-icon>
                                                                    </a>
                                                                </div>
                                                                <div v-if="eliminar">
                                                                    <a class="trash cursor-pointer"  @click='showModalDelete(user.id_usuario)'>
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
                                            <div class="dataTable-info"> {{currentPage}} de {{this.usuarios.length}} </div>
                                            <nav class="dataTable-pagination">
                                                <b-pagination
                                                    v-model="currentPage"
                                                    aria-controls="content-table"
                                                ></b-pagination>
                                            </nav>
                                        </div>
                                    </div>
                                </div>
                                <b-modal id="user-modal" :title="title" hide-footer>
                                    <b-form  method="post">
                                        <div>
                                            <div class="row mt-2">
                                                <div class="col-12 col-md-8">
                                                    <label>Nombre</label>
                                                    <b-form-input v-if="titleBtn == 'Agregar'" class="form-control" type="text" v-model='form.nombre'></b-form-input>
                                                    <b-form-input v-else readonly class="form-control" type="text" v-model='form.nombre'></b-form-input>
                                                </div>
                                            </div>
                                            <div class="row mt-3">
                                                <div class="col-12 col-md-8" v-show="titleBtn == 'Agregar'">
                                                    <label>Contraseña</label>
                                                    <div class="input-group mb-3">
                                                        <b-form-input class="form-control" type="password" id='password' placeholder="Contraseña" v-model='form.password' required ></b-form-input>
                                                        <div class="input-group-append ">
                                                            <span class="input-group-text" v-on:click="password_show_hide() ">
                                                                <b-icon v-show='!show' icon='eye' style="width: 0.9em; height: 0.9em;"></b-icon>
                                                                <b-icon v-show='show' icon='eye-slash' style="width: 0.9em; height: 0.9em;"></b-icon>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row mt-2">
                                                <div class="col-12 col-md-8">
                                                    <label>Rol</label>
                                                    <select v-if="titleBtn =='Agregar'" v-model="form.rol" class="form-select" required >
                                                        <option disabled value="">Seleccione</option>
                                                        <option v-for="rol in this.roles" :value="rol.id_rol">
                                                            {{rol.nombre_rol}}
                                                        </option>
                                                    </select>
                                                    <select v-else v-model="form.rol" class="form-select">
                                                        <option v-for="rol in this.roles" :value="rol.id_rol">
                                                            {{rol.nombre_rol}}
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="button-row d-flex mt-5">
                                                <b-button  @click='closeModal' class="btn bg-gradient-secondary me-3 ms-auto mb-0">
                                                    Cancelar
                                                </b-button>
                                                <b-button v-if="titleBtn == 'Agregar' " class="btn bg-gradient-primary mb-0 js-btn-next" @click='crearUsuario'>
                                                    Agregar
                                                </b-button>
                                                <b-button v-else class="btn bg-gradient-primary mb-0 js-btn-next" @click='editarUsuario(editId)'>
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
                    password:'',
                    rol:''
                },
                roles:[],
                permisosCrud:[],
                user:[],
                usuarios:[],
                show:true,
                editId:null,
                editar: null,
                eliminar:null,
                confirm: '',
                title:'',
                titleBtn:'',
                currentPage:1
            };
        },
        async mounted(){
            await this.getRoles()
            this.permisosCrud = getSubmodulos('Administración','Usuarios')
            if('editar' in this.permisosCrud)
                this.editar = true
            if('eliminar' in this.permisosCrud)
                this.eliminar = true
            if('leer' in this.permisosCrud)
                this.getUsuarios()
            else
                this.$toast.error('No tiene permiso de lectura')
        },
        methods: {
            async getRoles(){
                await axios.get('/roles',{ headers:{ Authorization: 'Bearer ' + getAccessToken() }
                }).then(response => {
                    this.roles = response.data;
                }).catch(e => {
                    this.$toast.error('Ocurrió un error al cargar: ', e.message)
                })
            },
            async getUsuarios(){
                await axios.get('/usuarios',{ headers:{ Authorization: 'Bearer ' + getAccessToken() }
                }).then(response => {
                    this.usuarios = response.data;
                }) .catch(e => {
                    this.$toast.error('Ocurrió un error al cargar: ',e.message)
                })
            },
            async getUser(usuarioId){
                await axios.get(`/usuario/${usuarioId}`,{ headers:{ Authorization: 'Bearer ' + getAccessToken()}
                }) .then(response => {
                    this.user = response.data
                    this.form.nombre = response.data.nombre_usuario
                    this.form.rol = response.data.roles_id_rol
                }) .catch(e => {
                    this.$toast.error('Ocurrió un error al cargar: ',e.message)
                })
            },
            async crearUsuario(){
                if('crear' in this.permisosCrud){
                    var params = {
                        nombre_usuario: this.form.nombre,
                        password_usuario: this.form.password,
                        roles_id_rol:this.form.rol
                    }
                    await axios.post('/usuarios', params,{ headers:{ Authorization: 'Bearer ' + getAccessToken() }
                    }).then(() => {
                        this.$toast.success('Usuario creado con éxito')
                        this.cerrar()
                    }).catch (e => {
                        this.$toast.error('Ocurrió un error al agregar: ',e.message)
                    })
                }else{
                    this.$toast.error('No tiene permisos para agregar')
                }
            },
            async editarUsuario(usuarioId){
                if(this.editar){
                    var params ={
                        nombre_usuario: this.form.nombre,
                        roles_id_rol:this.form.rol,
                    }
                    await axios.put(`/usuario/${usuarioId}`, params,{ headers:{ Authorization: 'Bearer ' + getAccessToken()}
                    }).then(() => {
                        this.$toast.success('Usuario editado con éxito')
                        this.closeModal()
                        this.getUsuarios()
                    }).catch (e => {
                        this.$toast.error('Ocurrió un error al editar: ', e.message)
                    })
                }else{
                    this.$toast.error('No tiene permisos para modificar')
                }
            },
            async eliminarUsuario(usuarioId){
                if(this.eliminar){
                    await axios.delete(`/usuario/${usuarioId}`,{ headers:{ Authorization: 'Bearer ' + getAccessToken() }
                    }).then(() => {
                        this.$toast.success('Usuario eliminado con éxito')
                        this.getUsuarios()
                    }).catch (e => {
                        this.$toast.error('Ocurrió un error al eliminar: ',e.message)
                    })
                }else{
                    this.$toast.error('No tiene permisos para eliminar')
                }
            },
            password_show_hide() {
                this.show = !this.show;
                let input = document.getElementById("password");
                if (input.type === "password") {
                    input.type = "text";
                } else {
                    input.type = "password";
                }
            },
            onReset(){
                this.form.nombre = ''
                this.form.password = ''
                this.form.rol = null
            },
            closeModal(){
                this.$bvModal.hide('user-modal')
            },
            openModal(usuarioId, action){
                this.$bvModal.show('user-modal')
                if(action == 'editar'){
                    this.getUser(usuarioId)
                    this.editId = usuarioId
                    this.title = 'Editar Usuario'
                    this.titleBtn = 'Actualizar'
                }else{
                    this.onReset()
                    this.title='Añadir Nuevo Usuario'
                    this.titleBtn = 'Agregar'
                }
                
            },
            showModalDelete(usuarioId){
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
                        this.eliminarUsuario(usuarioId)
                    }
                }).catch( e=>{
                    this.$toast.error(e.message)
                })
            },
        },
    }
</script>
