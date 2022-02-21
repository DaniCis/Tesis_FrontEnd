<template>
    <div class="g-sidenav-show bg-gray-100 vh-completa" id='mainDashboard'>
        <Sidebar />
        <Navbar :Modulo='"Submódulos"' :Tabla='"Submódulo" + $route.params.submoduloId'/>
        <main class="main-content position-relative max-height-vh-100 mt-1 border-radius-lg media-left">
            <div class="container-fluid py-4">
                <div class="row">
                    <div class="col-12">
                        <div class="form mb-5">
                            <div class="row">
                                <div class="col-12 col-lg-6">
                                    <b-form class="mb-8" method="post" @submit.prevent="editarSubmodulo" style="height: 408px;">
                                        <div class="card multisteps-form__panel p-3 border-radius-xl bg-white js-active">
                                            <h4 class="font-weight-bolder mb-0">{{this.submodulo.nombre_submodulo}}</h4>
                                            <p class="mb-0 text-sm">Editar</p>
                                            <div>
                                                <div class="row mt-3">
                                                    <div class="col-12 col-sm-6">
                                                        <label>Nombre</label>
                                                        <b-form-input class="form-control" type="text" v-model="form.nombre" v-bind:placeholder="(this.submodulo.nombre_submodulo)"></b-form-input>
                                                    </div>
                                                </div>
                                                <div class="row mt-3">
                                                    <div class="col-12 col-sm-6">
                                                        <label>Módulo</label>
                                                        <b-form-input class="form-control" type="text" v-model="form.modulo" v-bind:placeholder="(this.submodulo.modulos_id_modulo)"></b-form-input>
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
                submodulo:[],
                form:{
                    nombre:'',
                    modulo:''
                }
            }
        },
        async fetch(){
            await this.getSubmodulo()
        },
        methods:{
            async getSubmodulo(){
                const data = axios.get(`/submodulos/${this.$route.params.submoduloId}`)
                const result = await data
                this.submodulo = result.data
            },
            async editarModulo(){
                try{
                    var params = {
                        nombre_submodulo: this.form.nombre,
                        modulos_id_modulo:this.form.modulo
                    }
                    await axios.put(`/submodulos/${this.$route.params.submoduloId}`, params);
                }catch(e){
                    console.log(e.message)
                }
            }
        },
        components: { Sidebar, Navbar }
    }
</script>