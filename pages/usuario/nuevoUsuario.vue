<template>
    <div class="g-sidenav-show bg-gray-10 vh-completa" id='mainDashboard'>
        <Sidebar />
        <Navbar :Modulo='"Administracion"' :Tabla='"Usuarios"'/>
        <main class="main-content position-relative max-height-vh-100 mt-1 border-radius-lg media-left">
            <div class="container-fluid py-4">
                <div class="row">
                    <div class="col-12">
                        <div class="form mb-5">
                            <div class="row">
                                <div class="col-12 col-lg-6">
                                    <b-form class="mb-8" method="post" @submit.prevent="crearUsuario" style="height: 408px;">
                                        <div class="card multisteps-form__panel p-3 border-radius-xl bg-white js-active">
                                            <h4 class="font-weight-bolder mb-0">Nuevo usuario</h4>
                                            <p class="mb-0 text-sm">Añadir</p>
                                            <div>
                                                <div class="row mt-3">
                                                    <div class="col-12 col-sm-6">
                                                        <label>Nombre</label>
                                                        <b-form-input class="form-control" type="text" placeholder="Nombre" v-model="form.nombre" required></b-form-input>
                                                    </div>
                                                </div>
                                                <div class="row mt-3">
                                                    <div class="col-12 col-sm-6">
                                                        <label>Contraseña</label>
                                                        <b-form-input class="form-control" type="text" placeholder="Contraseña" v-model='form.password' required></b-form-input>
                                                    </div>
                                                </div>
                                                <div class="row mt-3">
                                                    <div class="col-12 col-sm-6">
                                                        <label>Rol</label>
                                                        <b-form-input class="form-control" type="text" placeholder="Rol" v-model='form.rol' required></b-form-input>
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
    import Sidebar from '~/components/Sidebar.vue';
    import Navbar from '~/components/Navbar.vue';
    axios.defaults.baseURL ='http://10.147.17.173:5000';
    export default{
        components: { Sidebar, Navbar },
        data(){
            return{
                form:{
                    nombre:'',
                    password:'',
                    rol:''
                }
            }
        },
        methods:{
            async crearUsuario(){
                var params = {
                    nombre_usuario: this.form.nombre,
                    password_usuario: this.form.password,
                    roles_id_rol:this.form.rol
                }
                await axios.post('/usuarios', params)
                .then((response) => {
                    console.log("correcto")
                }).catch (e => {
                    console.log(e.message)
                })
            }
        }
    }
</script>