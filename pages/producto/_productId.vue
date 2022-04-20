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
                                        <h4>{{this.nombre}}</h4>
                                        <p class="text-sm">Editar producto</p>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body px-0 pt-0 pb-2">
                                <b-form class="ps-4 mt-3 pe-4" >
                                    <div class="row">
                                        <div class="col-12 col-lg-6">
                                            <div class="row mt-2">
                                                <div class="col-12 col-md-10 ">
                                                    <b-form-group 
                                                        label="Nombre" 
                                                        label-for="name-input" 
                                                        invalid-feedback="Este campo es requerido"
                                                        :state="form.nombreState">
                                                        <b-form-input  :state="form.nombreState" required ref='name_input'
                                                            id="name-input" class="form-control" type="text" placeholder="Nombre"
                                                            v-model="form.nombre">
                                                        </b-form-input>
                                                    </b-form-group>
                                                </div>
                                            </div>
                                            <div class="row mt-2">
                                                <div class="col-12 col-md-10 ">
                                                    <b-form-group 
                                                        label="Detalle" 
                                                        label-for="detail-input"
                                                        invalid-feedback="Este campo es requerido" 
                                                        :state="form.detalleState">
                                                        <b-form-input :state="form.detalleState" required ref='detail_input'
                                                            id="detail-input" class="form-control" type="text" placeholder="Detalle" 
                                                            v-model="form.detalle">
                                                        </b-form-input>
                                                    </b-form-group>
                                                </div>
                                            </div>
                                            <div class="row mt-2">
                                                <div class="col-12 col-md-5 ">
                                                    <b-form-group 
                                                        label="Marca" 
                                                        label-for="marca-input"
                                                        invalid-feedback="Este campo es requerido" 
                                                        :state="form.marcaState">
                                                        <b-form-input  :state="form.marcaState" required ref='marca_input'
                                                            id="marca-input" class="form-control" type="text" placeholder="Marca" 
                                                            v-model="form.marca">
                                                        </b-form-input>
                                                    </b-form-group>
                                                </div>
                                            </div>
                                            <div class="row mt-2">
                                                <div class="col-12 col-md-10">
                                                    <b-form-group 
                                                        label="Nueva Imagen"  
                                                        label-for="imagen">
                                                        <b-form-file
                                                            id='imagen'
                                                            multiple
                                                            accept='image/*'
                                                            @change='onChange'
                                                            placeholder="Seleccione una imagen o arrástrela aquí..."
                                                            drop-placeholder="Suelte la imagen aquí"
                                                            size='sm'
                                                            ></b-form-file>
                                                    </b-form-group>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12 col-lg-6 mt-3 mt-lg-0">
                                            <p>Imágenes</p>
                                            <vueper-slides class="no-shadow ex--center-mode" fixed-height="350px" :touchable="false" 
                                            arrows-outside bullets-outside fractions>
                                                <vueper-slide 
                                                v-for="imagen in this.imagenes" 
                                                :key="imagen"
                                                :image="`http://10.147.17.173:5002/productos/images/${form.id}/${imagen}`">
                                                <template #content>
                                                    <a class="trash cursor-pointer vueperslide__content-wrapper"  @click='showModalDelete(imagen)'>
                                                        <b-icon class="icon" icon='trash' style="width: 1.2em; height: 1.2em; color: #f81212;"></b-icon>
                                                    </a>
                                                </template>
                                                </vueper-slide>
                                            </vueper-slides>
                                        </div>
                                    </div>    
                                    <div class="row mt-4">
                                        <div class="col-12 col-md-8 col-lg-6">
                                            <div class="d-flex ms-auto mb-3">
                                                <b-button @click="editarProducto(form.id)" class="btn bg-gradient-primary mb-0"> Actualizar</b-button>
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
    import 'vueperslides/dist/vueperslides.css'
    import { VueperSlides, VueperSlide } from 'vueperslides'
    import { getAccessToken, getSubmodulos } from '~/utils/auth';
    
    export default{
        components: { Sidebar, Navbar, VueperSlides, VueperSlide},
        middleware: 'authenticated',
        data(){
            return{
                form:{
                    nombre:'',
                    nombreState:null,
                    detalle:'',
                    detalleState:null,
                    marca:'',
                    marcaState:null,
                },
                imagen:null,
                imagenes:[],
                producto:[],
                editar:null,
                productId:'',
                confirm: '',
                nombre:'',
                slide: 0,
            }
        },
        mounted(){
            this.productId = this.$route.params.productId
            this.permisosCrud = getSubmodulos('Inventario','Productos')
            if('editar' in this.permisosCrud)
                this.editar = true
            if('leer' in this.permisosCrud)
                this.getProducto(this.productId)
            else
                this.$toast.error('No tiene permiso de lectura')
        },
        methods:{
            async getProducto(productId){
                await axios.get(`http://10.147.17.173:5002/producto/${productId}`,{ headers:{ Authorization: 'Bearer ' + getAccessToken() }
                }).then(response => {
                    this.form.id = response.data.id_producto
                    this.nombre = response.data.nombre_producto
                    this.form.nombre = response.data.nombre_producto
                    this.form.detalle = response.data.detalle_producto
                    this.form.marca = response.data.marca_producto
                    this.imagenes = response.data.imagen_producto
                })
                .catch(e => {
                     this.$toast.error(e.response.data.detail)
                })
            },
            
            onChange(e){
                this.imagen = e.target.files
            },
            
            validarForm() {
                const valid = this.$refs.name_input.checkValidity()
                const valid2 = this.$refs.detail_input.checkValidity()
                const valid3 = this.$refs.marca_input.checkValidity()
                this.form.nombreState = valid
                this.form.detalleState = valid2
                this.form.marcaState = valid3
                if(valid == false || valid2 == false || valid3 == false)
                    return false
                else
                    return true
            },

            async editarProducto(productId){
                if(this.editar){
                    if (!this.validarForm())
                        return
                    if(this.imagenes.length == 0 && this.imagen == null){
                        this.$toast.error('Por favor añada una imagen antes de continuar.')
                    } 
                    else{
                        const formData = new FormData()
                        if(this.imagen!= null){
                            for (let i = 0; i < this.imagen.length; i++){
                                formData.append('files',this.imagen[i])
                            }
                        }
                        formData.append('nombre_producto',this.form.nombre)
                        formData.append('detalle_producto',this.form.detalle)
                        formData.append('marca_producto',this.form.marca)
                        if( this.imagenes.length != 0){
                            for (let i = 0; i < this.imagenes.length; i++){
                                formData.append('imagen_producto',this.imagenes[i])
                            }
                        }

                        await axios.put(`http://10.147.17.173:5002/producto/${productId}`, formData, { headers:{ Authorization: 'Bearer ' + getAccessToken() }
                        }).then(() => {
                            this.$toast.success('Producto editado con éxito')
                            this.onReset()
                            this.$router.push('/productos');
                        }).catch (e => {
                            this.$toast.error(e.response.data.detail)
                        })
                    }
                }else{
                    this.$toast.error('No tiene permisos para modificar')
                }
            },

            onReset(){
                this.form.nombre = ''
                this.form.detalle = ''
                this.form.marca =''
                this.form.nombreState = null,
                this.form.detalleState = null,
                this.form.marcaState = null
            },

            removeItemFromArr (arr, item ) {
                var i = arr.indexOf(item );
                if ( i !== -1 ) {
                    arr.splice( i, 1 );
                }
            },

            showModalDelete(imagen){
                this.confirm = ''
                this.$bvModal.msgBoxConfirm('¿Está seguro que desea eliminar esta imagen?', {
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
                        this.removeItemFromArr(this.imagenes, imagen );
                    }
                }).catch( e=>{
                    this.$toast.error(e.response.data.detail)
                })
            },
        },
    }
</script>
