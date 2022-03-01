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
                                                        <b-form-input class="form-control" type="text" v-model="form.nombre" v-bind:placeholder="(this.user.nombre_usuario)"></b-form-input>
                                                    </div>
                                                </div>
                                                <div class="row mt-3">
                                                    <div class="col-12 col-sm-6">
                                                        <label>Contraseña</label>
                                                        <b-form-input class="form-control" type="text" v-model="form.password" v-bind:placeholder="(this.user.password_usuario)"></b-form-input>
                                                    </div>
                                                </div>
                                                <div class="row mt-3">
                                                    <div class="col-12 col-sm-6">
                                                        <label>Rol</label>
                                                        <b-form-input class="form-control" type="number" v-model="form.rol" v-bind:placeholder="(this.user.roles_id_rol)"></b-form-input>
                                                    </div>
                                                </div>
                                                <div class="button-row d-flex mt-4">
                                                    <b-button href="/usuarios" class="btn bg-gradient-secondary me-3 ms-auto mb-0">
                                                        Regresar
                                                    </b-button> 
                                                    <b-button class="btn bg-gradient-primary mb-0 js-btn-next" type="submit">
                                                        Agregar
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
    axios.defaults.baseURL ='http://10.147.17.173:5000';

    export default{
        data() {
            return {
                user:[],
                form:{
                    nombre:'',
                    password:'',
                    rol:''
                }
            };
        },
        async mounted(){
            await this.getUser()
        },
        fetch ({ store, redirect }) {
            if (!store.state.user) {
                return redirect('/')
            }
        },
        methods:{
            async getUser(){
                if(this.$store.state.token){
                    await axios.get(`/usuario/${this.$route.params.usuarioId}`,{
                        headers: {
                            'Authorization': `Bearer ${this.$store.state.token}`
                        }
                    })
                    .then(response => {
                        this.user= response.data;
                    })
                    .catch(e => {
                        console.log(e.message)
                    })
                }
            },
            async editarUsuario(){
                if(this.$store.state.token){
                    var params ={
                        nombre_usuario: this.form.nombre,
                        password_usuario: this.form.password,
                        roles_id_rol:this.form.rol
                    }
                    await axios.put(`/usuario/${this.$route.params.usuarioId}`, params,{
                        headers: {
                            'Authorization': `Bearer ${this.$store.state.token}`
                        }
                    })
                    .then((response) => {
                    console.log("correcto")
                    }).catch (e => {
                        console.log(e.message)
                    })
                }
            },           
        },
        components: { Sidebar, Navbar }
    }
</script>