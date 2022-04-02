<template>
    <div class="g-sidenav-show bg-gray-10 vh-completa" id='mainDashboard'> 
        <Sidebar />
        <Navbar :Modulo='"Inventarios"' :Tabla='"Productos"'/>
        <main class="main-content position-relative max-height-vh-100 mt-1 border-radius-lg media-left">
            <div class="container-fluid py-4">
                <div class="row">
                    <div class="col-12">
                        <div class="card mb-4">
                            <div class="card-header pb-0">
                                <div class='text-sm'>
                                    <nuxt-link to='/productos'>
                                         <b-icon class='cursor-pointer' icon='arrow90deg-left' style="width: 1.3em; height: 1.3em"></b-icon> &nbsp;
                                        Regresar
                                    </nuxt-link>
                                </div>
                                <div class="d-lg-flex mt-4">
                                    <div>
                                        <h4>Nuevo Producto</h4>
                                        <p class="text-sm">Añadir producto</p>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body px-0 pt-0 pb-2">
                                <b-form class="ps-4 mt-3">
                                    <div class="row mt-2">
                                        <div class="col-12 col-md-8 col-lg-5">
                                            <b-form-group 
                                                label="Nombre" 
                                                label-for="name-input" 
                                                invalid-feedback="Este campo es requerido" 
                                                :state="form.nombreState">
                                                <b-form-input  
                                                    id="name-input" class="form-control" type="text" placeholder="Nombre" ref='name_input'
                                                    v-model="form.nombre" :state="form.nombreState" required>
                                                </b-form-input>
                                            </b-form-group>
                                        </div>
                                    </div>
                                    <div class="row mt-2">
                                        <div class="col-12 col-md-8 col-lg-5">
                                            <b-form-group 
                                                label="Detalle" 
                                                label-for="detail-input" 
                                                invalid-feedback="Este campo es requerido" 
                                                :state="form.detalleState">
                                                <b-form-input  
                                                    id="detail-input" class="form-control" type="text" placeholder="Detalle" ref='detail_input'
                                                    v-model="form.detalle" :state="form.detalleState" required>
                                                </b-form-input>
                                            </b-form-group>
                                        </div>
                                    </div>
                                    <div class="row mt-2">
                                        <div class="col-12 col-md-4 col-lg-2">
                                            <b-form-group 
                                                label="Marca" 
                                                label-for="marca-input" 
                                                invalid-feedback="Este campo es requerido" 
                                                :state="form.marcaState">
                                                <b-form-input  
                                                    id="marca-input" class="form-control" type="text" placeholder="Marca" ref='marca_input'
                                                    v-model="form.marca" :state="form.marcaState" required>
                                                </b-form-input>
                                            </b-form-group>
                                        </div>
                                        <div class="col-12 col-md-4 col-lg-2 mt-2 mt-md-0">
                                            <b-form-group 
                                                label="Unidad de Medida" 
                                                label-for="med-input" 
                                                invalid-feedback="Este campo es requerido" 
                                                :state="form.medidaState">
                                                <b-form-input  
                                                    id="med-input" class="form-control" type="text" placeholder="Unidad de medida" ref='med_input'
                                                    v-model="form.medida" :state="form.medidaState" required>
                                                </b-form-input>
                                            </b-form-group>
                                        </div>
                                    </div>
                                    <div class="row mt-2">
                                        <b-form-group 
                                            label="Cantidad" 
                                            label-for="cantidad-input" 
                                            invalid-feedback="Este campo es requerido" 
                                            :state="form.cantidadState">
                                            <b-form-spinbutton  
                                                id="cantidad-input" class="form-control" type="text" min='1' placeholder='1' ref='cantidad_input'
                                                v-model="form.cantidad" :state="form.cantidadState" required inline>
                                            </b-form-spinbutton>
                                        </b-form-group>
                                    </div>
                                    <div class="row mt-2">
                                        <div class="col-12 col-md-8 col-lg-5">
                                            <b-form-group 
                                                label="Imagen"  
                                                label-for="imagen"
                                                invalid-feedback="Este campo es requerido" 
                                                :state="form.imagenState">
                                                <b-form-file
                                                    v-model="form.imagen"
                                                    id='imagen'
                                                    :state="Boolean(form.imagen)"
                                                    placeholder="Seleccione una imagen o arrastrela aqui..."
                                                    drop-placeholder="Suelte la imagen aqui"
                                                    ></b-form-file>
                                            </b-form-group>
                                        </div>
                                    </div>
                                    <div class="row mt-4">
                                        <div class="col-12 col-md-8 col-lg-6">
                                            <div class="d-flex ms-auto mb-3">
                                                <a class="btn bg-gradient-primary mb-0"> Agregar</a>
                                            </div>
                                        </div>
                                    </div>
                                </b-form>
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
    axios.defaults.baseURL ='http://10.147.17.173:5002';
    
    export default{
        components: { Sidebar, Navbar },
        middleware: 'authenticated',
        data(){
            return{
                form:{
                    nombre:'',
                    nombreState:'',
                    detalle:'',
                    detalleState:'',
                    marca:'',
                    marcaState:'',
                    medida:'',
                    medidaState:'',
                    imagen:[],
                    imagenState:''
                },
                crear: null,
            }
        },
        mounted(){
            /*this.permisosCrud = getSubmodulos('Inventarios','Productos')
            if('crear' in this.permisosCrud)
                this.crear = true*/
        },

        methods:{
            async crearProducto(){
                if(this.crear){
                    var params = {
                        nombre_producto: this.form.nombre,
                        detalle_producto:this.form.detalle,
                        marca_producto:this.form.marca,
                        unidadMedida_producto:this.form.unidad,
                        cantidad_producto:this.form.cantidad,
                        imagen_producto: this.form.imagen
                    }
                    await axios.post('/productos', params, { headers:{ Authorization: 'Bearer ' + getAccessToken() }
                    }).then(() => {
                        this.$toast.success('Producto creado con éxito')
                        this.$router.push('/productos');
                    }).catch (e => {
                         this.$toast.error(e.response.data.detail)
                    })
                }else{
                    this.$toast.error('No tiene permisos para agregar')
                }
            },
        },
    }
</script>