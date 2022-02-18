<template>
    <div class="g-sidenav-show bg-gray-100 vh-completa" id='mainDashboard'>
        <Sidebar />
        <Navbar :Modulo='"Roles"' :Tabla='"Rol" + $route.params.rolId'/>
        <main class="main-content position-relative max-height-vh-100 mt-1 border-radius-lg media-left">
            <div class="container-fluid py-4">
                <div class="row">
                    <div class="col-12">
                        <div class="form mb-5">
                            <div class="row">
                                <div class="col-12 col-lg-6">
                                    <b-form class="mb-8" method="post" @submit.prevent="editarRol" style="height: 408px;">
                                        <div class="card multisteps-form__panel p-3 border-radius-xl bg-white js-active">
                                            <h4 class="font-weight-bolder mb-0">{{this.rol.nombre_rol}}</h4>
                                            <p class="mb-0 text-sm">Editar</p>
                                            <div>
                                                <div class="row mt-3">
                                                    <div class="col-12 col-sm-6">
                                                        <label>Nombre</label>
                                                        <b-form-input class="form-control" type="text" v-model="form.nombre" v-bind:placeholder="(this.rol.nombre_rol)"></b-form-input>
                                                    </div>
                                                </div>
                                                <div class="row mt-3">
                                                    <div class="col-12 col-sm-6">
                                                        <label>Descripción</label>
                                                        <b-form-input class="form-control" type="text" v-model="form.descripcion" v-bind:placeholder="(this.rol.descripcion_rol)"></b-form-input>
                                                    </div>
                                                </div>
                                                <div class="button-row d-flex mt-4">
                                                    <b-button class="btn bg-gradient-dark ms-auto mb-0 js-btn-next" type="submit" >
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
    import axios from 'axios'
    import Sidebar from "../../components/Sidebar.vue";
    import Navbar from "~/components/Navbar.vue";
    axios.defaults.baseURL ='http://10.147.17.173:5000';

    export default{
        data(){
            return{
                rol:[],
                form:{
                    nombre:'',
                    descripcion:''
                }
            }
        },
        async fetch(){
            await this.getRol()
        },
        methods:{
            async getRol(){
                const data = axios.get(`/roles/${this.$route.params.rolId}`)
                const result = await data
                this.rol = result.data
            },
            async editarRol(){
                try{
                    var params = {
                        nombre_rol: this.form.nombre,
                        descripcion_rol:this.form.descripcion
                    }
                    await axios.put(`/roles/${this.$route.params.rolId}`, params);
                }catch(e){
                    console.log(e.message)
                }
            }
        },
        components: { Sidebar, Navbar }
    }
</script>