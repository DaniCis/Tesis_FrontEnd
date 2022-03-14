<template>
     <div class="g-sidenav-show  bg-gray-100 vh-completa" id='mainDashboard'>
        <Sidebar />
        <Navbar :Modulo='"Usuarios"' :Tabla='"Usuario " + $route.params.usuarioId'/>
        <main class="main-content position-relative max-height-vh-100  mt-1 border-radius-lg media-left">
            <div class="container-fluid py-4">
                <div class="row">
                    <div class="col-12">
                        <div class="form mb-5">
                            <div class="row">
                                <div class="col-12 col-lg-6">
                                    <b-form class="mb-8" method="post" @submit.prevent="editarUsuario" style="height: 408px;">
                                        <div class="card multisteps-form__panel p-3 border-radius-xl bg-white js-active">
                                            <h4 class="font-weight-bolder mb-0">{{this.user.nombre_usuario}}</h4>
                                            <p class="mb-0 text-sm">Editar</p>
                                            <div>
                                                <div class="row mt-3">
                                                    <div class="col-12 col-sm-6">
                                                        <label>Nombre</label>
                                                        <b-form-input class="form-control" type="text" v-model='form.nombre'></b-form-input>
                                                    </div>
                                                </div>
                                                <div class="row mt-3">
                                                    <div class="col-12 col-sm-6">
                                                        <label>Contraseña</label>
                                                        <b-form-input class="form-control" type="password" v-model="form.password"></b-form-input>
                                                    </div>
                                                </div>
                                                <div class="row mt-3">
                                                    <div class="col-12 col-sm-6">
                                                        <label>Rol</label>
                                                        <select v-model="form.rol" class="form-select" >
                                                            <option v-for="rol in this.roles" :value="rol.id_rol">
                                                                {{rol.nombre_rol}}
                                                            </option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="button-row d-flex mt-4">
                                                    <b-button href="/usuarios" class="btn bg-gradient-secondary me-3 ms-auto mb-0">
                                                        Regresar
                                                    </b-button> 
                                                    <b-button class="btn bg-gradient-primary mb-0 js-btn-next" type="submit">
                                                        Actualizar
                                                    </b-button>
                                                </div>
                                            </div>
                                        </div>
                                    </b-form>
                                </div>
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
    import Sidebar from "../../components/Sidebar.vue";
    import Navbar from "~/components/Navbar.vue";
    import { getAccessToken, getSubmodulos } from '~/utils/auth';
    axios.defaults.baseURL ='http://10.147.17.173:5000';

    export default{
        components: { Sidebar, Navbar },
        middleware: 'authenticated',
        data() {
            return {
                user:[],
                form:{
                    nombre:'',
                    password:'',
                    rol:''
                },
                permisosCrud:[],
                roles:[]
            };
        },
        async mounted(){
            await this.getUser()
            await this.getRoles()
            this.permisosCrud = getSubmodulos('Administración','Usuarios')
        },
        methods:{
            async getRoles(){
                await axios.get('/roles',{
                    headers:{
                        Authorization: 'Bearer ' + getAccessToken()
                    }
                })
                .then(response => {
                    this.roles = response.data;
                })
            },
            async getUser(){
                await axios.get(`/usuario/${this.$route.params.usuarioId}`,{
                    headers:{
                        Authorization: 'Bearer ' + getAccessToken()
                    }
                })
                .then(response => {
                    this.user = response.data
                    this.form.nombre = response.data.nombre_usuario
                    this.form.password = response.data.password_usuario
                    this.form.rol = response.data.roles_id_rol
                })
                .catch(e => {
                    this.$toast.error(e.message)
                })
            },
            async editarUsuario(){
                if('editar' in this.permisosCrud){
                    var params ={
                        nombre_usuario: this.form.nombre,
                        password_usuario: this.form.password,
                        roles_id_rol:this.form.rol,
                        estado_usuario: true
                    }
                    console.log(params)
                    await axios.put(`/usuario/${this.$route.params.usuarioId}`, params,{
                        headers:{
                            Authorization: 'Bearer ' + getAccessToken()
                        }
                    })
                    .then(() => {
                        this.$toast.success('Usuario editado correctamente')
                    }).catch (e => {
                        this.$toast.error(e.message)
                    })
                }else{
                    this.$toast.error('No tiene permisos para modificar')
                }
            },           
        },
    }
</script>