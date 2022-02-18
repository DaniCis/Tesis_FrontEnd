<template>
    <div class="g-sidenav-show bg-gray-10 vh-completa" id='mainDashboard'>
        <!-- 
        <Sidebar />
        <Navbar :Modulo='"Administración"' :Tabla='"Roles"'/>-->
        <main class="main-content position-relative max-height-vh-100 mt-1 border-radius-lg media-left">
            <div class="container-fluid py-4">
                <div class="row">
                    <div class="col-12">
                        <div class="form mb-5">
                            <div class="row">
                                <div class="col-12 col-lg-6">
                                    <b-form class="mb-8" method="post" @submit.prevent="crearRol" style="height: 408px;">
                                        <div class="card multisteps-form__panel p-3 border-radius-xl bg-white js-active">
                                            <h4 class="font-weight-bolder mb-0">Nuevo rol</h4>
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
                                                        <label>Descripción</label>
                                                        <b-form-input class="form-control" type="text" placeholder="Descripción" v-model='form.descripcion' required></b-form-input>
                                                    </div>
                                                </div>
                                                <div class="button-row d-flex mt-4">
                                                    <b-button class="btn bg-gradient-dark ms-auto mb-0 js-btn-next" type="submit" >
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
                    descripcion:'',
                }
            }
        },
        methods:{
            async crearRol(){
                try{
                    var params = {
                        nombre_rol: this.form.nombre,
                        descripcion_rol:this.form.descripcion
                    }
                    await axios.post('/roles', params);
                }catch(e){
                    console.log(e.message)
                }
            }
        }
    }
</script>