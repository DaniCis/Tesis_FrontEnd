<template>
    <div class="g-sidenav-show bg-gray-10 vh-completa" id='mainDashboard'> 
        <Sidebar />
        <Navbar :Modulo='"Ventas"' :Tabla='"Clientes"'/>
        <main class="main-content position-relative max-height-vh-100 mt-1 border-radius-lg media-left">
            <div class="container-fluid py-4">
                <div class="row">
                    <div class="col-12">
                        <div class="card mb-4">
                            <div class="card-header pb-0">
                                <div class='text-sm'>
                                    <nuxt-link to='/clientes'>
                                         <b-icon class='cursor-pointer' icon='arrow90deg-left' style="width: 1.3em; height: 1.3em"></b-icon> &nbsp;
                                        Regresar
                                    </nuxt-link>
                                </div>
                                <div class="d-lg-flex mt-4">
                                    <div>
                                        <h4>this.form.nombre</h4>
                                        <p class="text-sm">Editar Cliente</p>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body px-0 pt-0 pb-2">
                                <b-form class="ps-4 mt-3" @submit.stop.prevent="handleSubmit()">
                                    <div class="row mt-2">
                                        <div class="col-12 col-md-4 col-lg-2">
                                            <b-form-group 
                                                label="Tipo de Identificación" 
                                                label-for="tipo-select">
                                                <select 
                                                    id="tipo-select" v-model="form.tipo" class="form-select">
                                                    <option disabled :value='null'> Seleccione</option>
                                                    <option>Cédula</option>
                                                    <option>RUC</option>
                                                </select>
                                            </b-form-group>
                                        </div>
                                         <div class="col-12 col-md-6 col-lg-3">
                                            <b-form-group 
                                                label="Identificación" 
                                                label-for="ident-input">
                                                <b-form-input  
                                                    id="ident-input" class="form-control" type="text" v-model="form.ident">
                                                </b-form-input>
                                            </b-form-group>
                                        </div>
                                    </div>
                                    <div class="row mt-2">
                                        <div class="col-12 col-md-5 col-lg-4">
                                            <b-form-group 
                                                label="Nombre" 
                                                label-for="nombre-input">
                                                <b-form-input  
                                                    id="nombre-input" class="form-control" type="text" v-model="form.nombre">
                                                </b-form-input>
                                            </b-form-group>
                                        </div>
                                    </div>
                                    <div class="row mt-2">
                                        <div class="col-12 col-md-5 col-lg-4">
                                            <b-form-group 
                                                label="Dirección" 
                                                label-for="dir-input">
                                                <b-form-input  
                                                    id="dir-input" class="form-control" type="text"  v-model="form.direccion">
                                                </b-form-input>
                                            </b-form-group>
                                        </div>
                                    </div>
                                    <div class="row mt-2">
                                        <div class="col-12 col-md-4 col-lg-2">
                                            <b-form-group 
                                                label="Teléfono" 
                                                label-for="telf-input">
                                                <b-form-input  
                                                    id="telf-input" class="form-control" type="text" v-model="form.telefono" >
                                                </b-form-input>
                                            </b-form-group>
                                        </div>
                                        <div class="col-12 col-md-4 col-lg-3">
                                            <b-form-group 
                                                label="Correo" 
                                                label-for="correo-input">
                                                <b-form-input  
                                                    id="correo-input" class="form-control" type="text"  v-model="form.correo">
                                                </b-form-input>
                                            </b-form-group>
                                        </div>
                                    </div>
                                    <div class="row mt-4">
                                        <div class="col-12 col-md-8 col-lg-6">
                                            <div class="d-flex ms-auto mb-3">
                                                <b-button class="btn bg-gradient-primary mb-0" type='submit'> Agregar</b-button>
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
    
    export default{
        components: { Sidebar, Navbar },
        middleware: 'authenticated',
        data(){
            return{
                form:{
                    tipo:'',
                    ident:'',
                    nombre:'',
                    direccion:'',
                    telefono:'',
                    correo:'',
                },
                editar: null,
                clienteId:''
            }
        },
        async mounted(){
            this.clienteId = this.$route.params.clienteId
            this.permisosCrud = getSubmodulos('Ventas','Clientes')
            if('editar' in this.permisosCrud)
                this.editar = true
            if('leer' in this.permisosCrud)
                this.getCliente(this.clienteId)
            else
                this.$toast.error('No tiene permiso de lectura')
        },
        methods:{
            async editarCliente(){
                if(this.editar){
                    var params = {

                    }

                }else{
                    this.$toast.error('No tiene permisos para agregar')
                }
            },

            async getCliente(clienteId){
                await axios.get(`http://10.147.17.173:5004/cliente/${clienteId}`,{ headers:{ Authorization: 'Bearer ' + getAccessToken() }
                }).then(response => {
                    this.form.tipo = response.data.tipoIdentificacion_cliente
                    this.form.ident = response.data.identificacion_cliente
                    this.form.nombre = response.data.nombre_cliente
                    this.form.direccion = response.data.direccion_cliente
                    this.form.telefono = response.data.telefono_cliente
                    this.form.correo = response.data.correo_cliente
                })
                .catch(e => {
                    this.$toast.error(e.response.data.detail)
                })
            },

            handleSubmit() {                
                this.editarCliente()
            },
        }
    }
</script>