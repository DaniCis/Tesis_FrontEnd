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
                                 <div class="d-lg-flex">
                                    <div>
                                        <h5>Productos</h5>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body px-0 pt-0 pb-2">
                                <b-form>
                                    <div>
                                        
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
    axios.defaults.baseURL ='http://10.147.17.173:5000';
    
    export default{
        components: { Sidebar, Navbar },
        middleware: 'authenticated',
        data(){
            return{
                form:{
                    nombre,
                    detalle,
                    marca,
                    unidad,
                    cantidad,
                    imagen
                },
                producto:[]
            }
        },
        mounted(){
            getProducto()
        },

        methods:{
            async getProducto(productId){
                await axios.get(`/productos/${productId}`,{ headers:{ Authorization: 'Bearer ' + getAccessToken() }
                }).then(response => {
                    this.form.nombre = response.data.nombre_producto
                    this.form.detalle = response.data.detalle_producto
                    this.form.marca = response.data.marca_producto
                    this.form.unidad = response.data.unidadMedida_producto
                    this.form.cantidad = response.data.cantidad_producto
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
                        cantidad_producto:this.form.cantidad,
                        imagen_producto: this.form.imagen
                    }
                    await axios.put(`/productos/${productId}`, params, { headers:{ Authorization: 'Bearer ' + getAccessToken() }
                    }).then(() => {
                        this.$toast.success('Producto editado con éxito')
                        this.$router.push('/productos');
                    }).catch (e => {
                        this.$toast.error(e.response.data.detail)
                    })
                }else{
                    this.$toast.error('No tiene permisos para modificar')
                }
            },
        },
    }
</script>