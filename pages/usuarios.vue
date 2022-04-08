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
                                    <div class="ms-auto my-auto mt-lg-0 mt-4" v-if="crear">
                                        <div class="ms-auto my-auto">
                                            <a @click="openModal(null, 'agregar')" class="btn bg-gradient-primary btn-sm mb-0"> +&nbsp; Nuevo usuario</a>
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
                                                        <th class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7 ps-2">Nombre</th>
                                                        <th class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7">Rol</th>
                                                        <th class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7">Estado</th>
                                                        <th class="text-secondary opacity-7"></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-if="error">
                                                        <td colspan="4">
                                                            <h6 class="ms-3 mb-2 text-sm text-center mt-4">No existen registros</h6> 
                                                        </td>       
                                                    </tr>
                                                    <tr v-for="user in paginador(this.usuarios)">
                                                        <td>
                                                            <h6 class=" ms-3 mb-2 text-sm">{{user.id_usuario}}</h6>
                                                        </td>
                                                        <td class="align-middle text-center text-sm">
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
                                                :total-rows="this.usuarios.length"
                                                :per-page="porPag"
                                                ></b-pagination>
                                            </nav>
                                        </div>
                                    </div>
                                </div>
                                <b-modal id="user-modal" :title="title"  cancel-title='Cancelar' :ok-title="titleBtn" @ok="handleOk($event,editId)" >
                                    <b-form @submit.stop.prevent="handleSubmit(editId)">
                                        <div class="row mt-2">
                                            <div class="col-12 col-md-8">
                                                <b-form-group v-if="titleBtn == 'Agregar'"
                                                    label="Nombre" 
                                                    label-for="name-input" 
                                                    invalid-feedback="Este campo es requerido" 
                                                    :state="form.nameState">
                                                    <b-form-input  
                                                        id="name-input" class="form-control" type="text" placeholder="Nombre" ref='name_input'
                                                        v-model="form.nombre" :state="form.nameState" required>
                                                    </b-form-input>
                                                </b-form-group>
                                                <b-form-group v-else
                                                    label="Nombre" 
                                                    label-for="name-input">
                                                    <b-form-input 
                                                        id="name-input" class="form-control" type="text" readonly ref='name_input' :state="form.nameState"
                                                        v-model="form.nombre" >
                                                    </b-form-input>
                                                </b-form-group>
                                            </div>
                                        </div>
                                        <div class="row mt-3" v-show="titleBtn == 'Agregar'">
                                            <div class="col-12 col-md-8" >
                                                <b-form-group
                                                    label="Contraseña" 
                                                    label-for="password" 
                                                    invalid-feedback="Este campo es requerido" 
                                                    :state="form.passState">
                                                    <div class="input-group mb-3">
                                                        <b-form-input class="form-control" type="password" id='password' placeholder="Contraseña" v-model='form.password' ref="pass_input" :state="form.passState" required>
                                                        </b-form-input>
                                                        <div class="input-group-append ">
                                                            <span class="input-group-text" v-on:click="password_show_hide('password') ">
                                                                <b-icon v-show='!show' icon='eye' style="width: 0.9em; height: 0.9em;"></b-icon>
                                                                <b-icon v-show='show' icon='eye-slash' style="width: 0.9em; height: 0.9em;"></b-icon>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </b-form-group>
                                            </div>
                                        </div>
                                        <div class="row mt-2">
                                            <div class="col-12 col-md-8">
                                                <b-form-group v-if="titleBtn =='Agregar'"
                                                    label="Rol" 
                                                    label-for="rol-select" 
                                                    invalid-feedback="Seleccione un rol" 
                                                    :state="form.rolState">
                                                    <select 
                                                        id="rol-select" v-model="form.rol" class="form-select" ref='rol_select' :state="form.rolState" required>
                                                        <option disabled :value='null'> Seleccione</option>
                                                        <option v-for="rol in this.roles" :value="rol.id_rol">
                                                            {{rol.nombre_rol}}
                                                        </option>
                                                    </select>
                                                </b-form-group>
                                                <b-form-group v-else
                                                    label="Rol" 
                                                    label-for="rol-select" >
                                                   <select id="rol-select" v-model="form.rol" class="form-select" ref='rol_select' :state="form.rolState">
                                                        <option v-for="rol in this.roles" :value="rol.id_rol">
                                                            {{rol.nombre_rol}}
                                                        </option>
                                                    </select>                                         
                                                </b-form-group>
                                            </div>
                                        </div>
                                        <div class="row mt-4" v-if="titleBtn !='Agregar'">
                                            <div class="col-12 col-md-8">
                                                <a class='link ms-2' v-b-modal.modal-multi>Editar contraseña</a>
                                            </div>
                                        </div>
                                    </b-form>
                                </b-modal>
                                <b-modal id="modal-multi" title="Editar contraseña" cancel-title='Cancelar' :ok-title="titleBtn" @ok="handleOk2($event,editId)">
                                    <b-form @submit.stop.prevent="handleSubmit2(editId)">
                                        <div class="row mt-2">
                                            <div class="col-12 col-md-8">
                                                <b-form-group
                                                    label="Contraseña" 
                                                    label-for="password2" 
                                                    invalid-feedback="Este campo es requerido" 
                                                    :state="form.pass2State">
                                                    <div class="input-group mb-3">
                                                        <b-form-input class="form-control" type="password" id='password2' placeholder="Contraseña" v-model='form.password' ref="pass2_input" :state="form.pass2State" required>
                                                        </b-form-input>
                                                        <div class="input-group-append ">
                                                            <span class="input-group-text" v-on:click="password_show_hide('password2') ">
                                                                <b-icon v-show='!show2' icon='eye' style="width: 0.9em; height: 0.9em;"></b-icon>
                                                                <b-icon v-show='show2' icon='eye-slash' style="width: 0.9em; height: 0.9em;"></b-icon>
                                                            </span>
                                                        </div>
                                                    </div>
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
        components: { Sidebar, Navbar},
        middleware: 'authenticated',
        data() {
            return {
                form:{
                    nombre:'',
                    password:'',
                    nameState:'',
                    passState:'',
                    pass2State:'',
                    rolState:'',
                    rol:''
                },
                roles:[],
                permisosCrud:[],
                user:[],
                usuarios:[],
                show:true,
                show2:true,
                error:false,
                editId:null,
                crear:null,
                editar: null,
                eliminar:null,
                error:null,
                confirm: '',
                title:'',
                titleBtn:'',
                pagActual:1,
                porPag:10,
            };
        },
        async mounted(){
            this.permisosCrud = getSubmodulos('Administración','Usuarios')
            if('editar' in this.permisosCrud)
                this.editar = true
            if('eliminar' in this.permisosCrud)
                this.eliminar = true
            if('crear' in this.permisosCrud)
                this.crear = true
            if('leer' in this.permisosCrud)
                this.getUsuarios()
            else
                this.$toast.error('No tiene permiso de lectura')
        },
        methods: {
            async getRoles(){
                await axios.get('http://10.147.17.173:5000/roles',{ headers:{ Authorization: 'Bearer ' + getAccessToken() }
                }).then(response => {
                    this.roles = response.data;
                }).catch(e => {
                    this.$toast.error(e.response.data.detail)
                })
            },
            async getUsuarios(){
                await axios.get('http://10.147.17.173:5000/usuarios',{ headers:{ Authorization: 'Bearer ' + getAccessToken() }
                }).then(response => {
                    if(response.data !=null){
                        this.usuarios = response.data
                    }else
                        this.error = true
                }) .catch(e => {
                    this.$toast.error(e.response.data.detail)
                })
            },
            async getUser(usuarioId){
                await axios.get(`http://10.147.17.173:5000/usuario/${usuarioId}`,{ headers:{ Authorization: 'Bearer ' + getAccessToken()}
                }) .then(response => {
                    this.user = response.data
                    this.form.nombre = response.data.nombre_usuario
                    this.form.rol = response.data.roles_id_rol
                }) .catch(e => {
                    this.$toast.error(e.response.data.detail)
                })
            },
            async crearUsuario(){
                if(this.crear){
                    var params = {
                        nombre_usuario: this.form.nombre,
                        password_usuario: this.form.password,
                        roles_id_rol:this.form.rol
                    }
                    await axios.post('http://10.147.17.173:5000/usuarios', params,{ headers:{ Authorization: 'Bearer ' + getAccessToken() }
                    }).then(() => {
                        this.$toast.success('Usuario creado con éxito')
                        this.getUsuarios()
                    }).catch (e => {
                        this.$toast.error(e.response.data.detail)
                    })
                }else{
                    this.$toast.error('No tiene permisos para agregar')
                }
            },
            async editarRol(usuarioId){
                if(this.editar){
                    await axios.put(`http://10.147.17.173:5000/usuario/${usuarioId}/editarRol`, {roles_id_rol: this.form.rol} ,{ headers:{ Authorization: 'Bearer ' + getAccessToken()}
                    }).then(() => {
                        this.$toast.success('Usuario editado con éxito')
                        this.getUsuarios()
                    }).catch (e => {
                        this.$toast.error(e.response.data.detail)
                    })
                }else{
                    this.$toast.error('No tiene permisos para modificar')
                }
            },
            async editarPassword(usuarioId){
                if(this.editar){
                    await axios.put(`http://10.147.17.173:5000/usuario/${usuarioId}/editarPassword`, {password_usuario: this.form.password} ,{ headers:{ Authorization: 'Bearer ' + getAccessToken()}
                    }).then(() => {
                        this.$toast.success('Contraseña editada con éxito')
                    }).catch (e => {
                        this.$toast.error(e.response.data.detail)
                    })
                }else{
                    this.$toast.error('No tiene permisos para modificar')
                }
            },
            async eliminarUsuario(usuarioId){
                if(this.eliminar){
                    await axios.delete(`http://10.147.17.173:5000/usuario/${usuarioId}`,{ headers:{ Authorization: 'Bearer ' + getAccessToken() }
                    }).then(() => {
                        this.$toast.success('Estado editado con éxito')
                        this.getUsuarios()
                    }).catch (e => {
                        this.$toast.error(e.response.data.detail)
                    })
                }else{
                    this.$toast.error('No tiene permisos para eliminar')
                }
            },
            validarForm() {
                const valid = this.$refs.name_input.checkValidity()
                const valid3 = this.$refs.rol_select.checkValidity()
                this.form.nameState = valid
                this.form.rolState = valid3
                if(this.titleBtn == 'Agregar'){
                    const valid2 = this.$refs.pass_input.checkValidity()
                    this.form.passState = valid2
                    if(valid == false || valid2 == false || valid3 == false )
                        return false
                    else
                        return true
                }else{
                    if(valid == false || valid3 == false )
                        return false
                    else
                        return true
                }
            },
            validarPass(){
                const valid = this.$refs.pass2_input.checkValidity()
                this.form.pass2State = valid
                return valid
            },
            handleOk(bvModalEvt, usuarioId){
                bvModalEvt.preventDefault()
                this.handleSubmit(usuarioId)
            },
            handleOk2(bvModalEvt, usuarioId){
                bvModalEvt.preventDefault()
                this.handleSubmit2(usuarioId)
            },
            handleSubmit(usuarioId) {
                if (!this.validarForm())
                    return
                if(this.titleBtn == 'Agregar')
                    this.crearUsuario()
                else
                    this.editarRol(usuarioId)
                this.$nextTick(() => {
                    this.closeModal('user-modal')
                })
            },
            handleSubmit2(usuarioId){
                if(!this.validarPass())
                    return
                this.editarPassword(usuarioId)
                this.$nextTick(() => {
                    this.closeModal('modal-multi')
                })
            },
            onReset(){
                this.form.nombre = ''
                this.form.password = ''
                this.form.rol = null
                this.form.nameState = null,
                this.form.passState = null,
                this.form.pass2State = null,
                this.form.rolState = null
            },
            closeModal(name){
                this.$bvModal.hide(name)
            },
            openModal(usuarioId, action){
                this.$bvModal.show('user-modal')
                this.onReset()
                this.getRoles()
                if(action == 'editar'){
                    this.getUser(usuarioId)
                    this.editId = usuarioId
                    this.title = 'Editar Usuario'
                    this.titleBtn = 'Actualizar'
                }else{
                    this.title='Añadir Nuevo Usuario'
                    this.titleBtn = 'Agregar'
                }
            },
            showModalDelete(usuarioId){
                this.confirm = ''
                this.$bvModal.msgBoxConfirm('¿Está seguro que desea cambiar el estado del usuario?', {
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
                    this.$toast.error(e.response.data.detail)
                })
            },
            password_show_hide(id) {
                var input = document.getElementById(id);
                if(id=='password')
                    this.show = !this.show;
                else
                    this.show2 = !this.show2;
                if (input.type === "password") {
                    input.type = "text";
                } else {
                    input.type = "password";
                }
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
