<template>
    <div class="g-sidenav-show bg-gray-10 vh-completa" id='mainDashboard'> 
        <Sidebar />
        <Navbar :Modulo='"Inventario"' :Tabla='"Productos"'/>
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
                                        <h4>Producto {{this.form.nombre}}</h4>
                                        <p class="text-sm">Editar producto</p>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body px-0 pt-0 pb-2">
                                <b-form class="ps-4 mt-3" @submit="editarProducto" @reset="onReset">
                                    <div class="row mt-2">
                                        <div class="col-12 col-md-8 col-lg-5">
                                            <b-form-group 
                                                label="Nombre" 
                                                label-for="name-input">
                                                <b-form-input  
                                                    id="name-input" class="form-control" type="text" placeholder="Nombre"
                                                    v-model="form.nombre">
                                                </b-form-input>
                                            </b-form-group>
                                        </div>
                                    </div>
                                    <div class="row mt-2">
                                        <div class="col-12 col-md-8 col-lg-5">
                                            <b-form-group 
                                                label="Detalle" 
                                                label-for="detail-input">
                                                <b-form-input  
                                                    id="detail-input" class="form-control" type="text" placeholder="Detalle" 
                                                    v-model="form.detalle">
                                                </b-form-input>
                                            </b-form-group>
                                        </div>
                                    </div>
                                    <div class="row mt-2">
                                        <div class="col-12 col-md-4 col-lg-3">
                                            <b-form-group 
                                                label="Marca" 
                                                label-for="marca-input">
                                                <b-form-input  
                                                    id="marca-input" class="form-control" type="text" placeholder="Marca" 
                                                    v-model="form.marca">
                                                </b-form-input>
                                            </b-form-group>
                                        </div>
                                        <div class="col-12 col-md-4 col-lg-2 mt-2 mt-md-0">
                                            <b-form-group 
                                                label="Unidad de Medida" 
                                                label-for="med-input">
                                                <b-form-input  
                                                    id="med-input" class="form-control" type="text" placeholder="Unidad de medida" 
                                                    v-model="form.unidad">
                                                </b-form-input>
                                            </b-form-group>
                                        </div>
                                    </div>
                                    <div class="row mt-2">
                                        <div class="col-12 col-md-8 col-lg-5">
                                            <b-form-group 
                                                label="Imagen"  
                                                label-for="imagen">
                                                <b-form-file
                                                    v-model="form.imagen"
                                                    id='imagen'
                                                    placeholder="Seleccione una imagen o arrástrela aquí..."
                                                    drop-placeholder="Suelte la imagen aquí"
                                                    size='sm'
                                                    ></b-form-file>
                                            </b-form-group>
                                        </div>
                                    </div>
                                    <div class="row mt-2">
                                        <div class="col-12 col-md-8 col-lg-5">
                                            <label for="tags-basic">Archivos </label>
                                            <b-form-tags 
                                                input-id="tags-basic" class='form-control' placeholder="" 
                                                v-model="form.imagen" disabled>
                                            </b-form-tags>
                                        </div>
                                    </div>
                                    <div class="row mt-4">
                                        <div class="col-12 col-md-8 col-lg-6">
                                            <div class="d-flex ms-auto mb-3">
                                                <b-button type='submit' class="btn bg-gradient-primary mb-0"> Actualizar</b-button>
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
                    detalle:'',
                    marca:'',
                    unidad:'',
                    imagen:['hola','hola3', 'jola'],
                },
                producto:[],
                editar:null,
                productId:'',
            }
        },
        mounted(){
            this.productId = this.$route.params.productId
            this.permisosCrud = getSubmodulos('Inventario','Productos')
            if('editar' in this.permisosCrud)
                this.editar = true
            if('leer' in this.permisosCrud)
                this.getProducto(this.productId)
        },

        methods:{
            async getProducto(productId){
                await axios.get(`/producto/${productId}`,{ headers:{ Authorization: 'Bearer ' + getAccessToken() }
                }).then(response => {
                    this.form.nombre = response.data.nombre_producto
                    this.form.detalle = response.data.detalle_producto
                    this.form.marca = response.data.marca_producto
                    this.form.unidad = response.data.unidadMedida_producto
                    this.form.imagen = response.data.imagen_producto
                })
                .catch(e => {
                     this.$toast.error(e.response.data.detail)
                })
            },
            async editarProducto(productId){
                if(this.editar){
                    var params = {
                        nombre_producto: this.form.nombre,
                        detalle_producto:this.form.detalle,
                        marca_producto:this.form.marca,
                        unidadMedida_producto:this.form.unidad,
                        imagen_producto: this.form.imagen
                    }
                    await axios.put(`/producto/${productId}`, params, { headers:{ Authorization: 'Bearer ' + getAccessToken() }
                    }).then(() => {
                        this.$toast.success('Producto editado con éxito')
                        this.onReset()
                        this.$router.push('/productos');
                    }).catch (e => {
                        this.$toast.error(e.response.data.detail)
                    })
                }else{
                    this.$toast.error('No tiene permisos para modificar')
                }
            },
            onReset(){
                this.form.nombre = ''
                this.form.detalle = ''
                this.form.marca =''
                this.form.unidad =''
                this.form.imagen= []
            }
        },
    }
</script>