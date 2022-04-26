<template>
    <div class="g-sidenav-show bg-gray-100 vh-completa" id='mainDashboard'> 
        <Sidebar />
        <Navbar :Modulo='"Ventas"' :Tabla='"Clientes"'/>
        <CheckToken/>
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
                                        <h4>Nuevo Cliente</h4>
                                        <p class="text-sm">Añadir Cliente</p>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body px-0 pt-0 pb-2">
                                <b-form class="ps-4 mt-3" @submit.stop.prevent="handleSubmit()" novalidate>
                                    <div class="row mt-2">
                                        <div class="col-12 col-md-5 col-lg-3">
                                            <b-form-group 
                                                label="Tipo de Identificación" 
                                                label-for="tipo-select" 
                                                invalid-feedback="Este campo es requerido"
                                                :state="form.tipoState">
                                                <select 
                                                    id="tipo-select" v-model="form.tipo" class="form-select" :state="form.tipoState" ref='tipo_select' required>
                                                    <option disabled hidden value=''> Seleccione</option>
                                                    <option value='Cedula' >Cédula</option>
                                                    <option value='RUC'>RUC</option>
                                                </select>
                                            </b-form-group>
                                        </div>
                                        <div class="col-12 col-md-5 col-lg-3 mt-2 mt-md-0">
                                            <b-form-group 
                                                label="Identificación" 
                                                label-for="ident-input" 
                                                invalid-feedback="Este campo es requerido" 
                                                :state="form.identState"
                                                description='máx.13 dígitos'>
                                                <b-form-input  
                                                    id="ident-input" class="form-control" type="number" min='0' placeholder="Identificación" ref='ident_input'
                                                    v-model="form.ident" :state="form.identState" trim required>
                                                </b-form-input>
                                            </b-form-group>
                                        </div>
                                    </div>
                                    <div class="row mt-2">
                                        <div class="col-12 col-md-5 col-lg-3">
                                            <b-form-group 
                                                label="Nombre" 
                                                label-for="nombre-input" 
                                                invalid-feedback="Este campo es requerido" 
                                                :state="form.nombreState">
                                                <b-form-input  
                                                    id="nombre-input" class="form-control" type="text" ref='nombre_input'
                                                    v-model="form.nombre" :state="form.nombreState" trim required>
                                                </b-form-input>
                                            </b-form-group>
                                        </div>
                                        <div class="col-12 col-md-5 col-lg-3 mt-2 mt-md-0">
                                            <b-form-group 
                                                label="Dirección" 
                                                label-for="dir-input" 
                                                invalid-feedback="Este campo es requerido" 
                                                :state="form.direccionState">
                                                <b-form-input  
                                                    id="dir-input" class="form-control" type="text" ref='dir_input'
                                                    v-model="form.direccion" :state="form.direccionState" trim required>
                                                </b-form-input>
                                            </b-form-group>
                                        </div>
                                    </div>
                                    <div class="row mt-2">
                                        <div class="col-12 col-md-5 col-lg-3">
                                            <b-form-group 
                                                label="Teléfono" 
                                                label-for="telf-input" 
                                                invalid-feedback="Este campo es requerido" 
                                                :state="form.telefonoState"
                                                description='máx.13 dígitos'>
                                                <b-form-input  
                                                    id="telf-input" class="form-control" type="number" min='0' placeholder="Teléfono" ref='telf_input'
                                                    v-model="form.telefono" :state="form.telefonoState" trim required>
                                                </b-form-input>
                                            </b-form-group>
                                        </div>
                                        <div class="col-12 col-md-5 col-lg-3 mt-2 mt-md-0">
                                            <b-form-group 
                                                label="Correo" 
                                                label-for="correo-input" 
                                                invalid-feedback="Este campo es requerido" 
                                                :state="form.correoState">
                                                <b-form-input  
                                                    id="correo-input" class="form-control" type="text" placeholder="Correo" ref='correo_input'
                                                    v-model="form.correo" :state="form.correoState" trim required>
                                                </b-form-input>
                                            </b-form-group>
                                        </div>
                                    </div>
                                    <div class="row mt-4">
                                        <div class="col-12 col-md-8 col-lg-6">
                                            <div class="d-flex ms-auto mb-3">
                                                <b-button class="btn bg-gradient-primary mb-0" type='submit'>Agregar</b-button>
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
    import CheckToken from '~/components/checkToken.vue';
    import { getAccessToken, getSubmodulos } from '~/utils/auth';
    
    export default{
        components: { Sidebar, Navbar, CheckToken },
        middleware: 'authenticated',
        data(){
            return{
                form:{
                    tipo:'',
                    tipoState:null,
                    ident:'',
                    identState:null,
                    nombre:'',
                    nombreState:null,
                    direccion:'',
                    direccionState:null,
                    telefono:'',
                    telefonoState:null,
                    correo:'',
                    correoState:null,
                },
                crear: null,
            }
        },
        async mounted(){
            this.permisosCrud = getSubmodulos('Ventas','Clientes')
            if('crear' in this.permisosCrud)
                this.crear = true
        },
        methods:{
            async crearCliente(){
                if(this.crear){
                    var params = {
                        identificacion_cliente: this.form.ident,
                        tipoIdentificacion_cliente: this.form.tipo,
                        nombre_cliente: this.form.nombre,
                        direccion_cliente: this.form.direccion,
                        telefono_cliente: this.form.telefono,
                        correo_cliente: this.form.correo
                    }
                    await axios.post(`http://10.147.17.173:5004/clientes/`, params,{ headers:{ Authorization: 'Bearer ' + getAccessToken() }
                    }).then(() => {
                        this.$toast.success('Cliente creado con éxito')
                        this.$router.push('/clientes');
                    }).catch (e => {
                        this.$toast.error(e.response.data.detail)
                    })
                }else{
                    this.$toast.error('No tiene permisos para agregar')
                }
            },

            validarForm(){
                const valid = this.$refs.tipo_select.checkValidity()
                const valid1 = this.$refs.ident_input.checkValidity()
                const valid2 = this.$refs.nombre_input.checkValidity()
                const valid3 = this.$refs.dir_input.checkValidity()
                const valid4 = this.$refs.telf_input.checkValidity()
                const valid5 = this.$refs.correo_input.checkValidity()
                this.form.nombreState = valid2
                this.form.tipoState = valid
                this.form.identState = valid1
                this.form.direccionState = valid3
                this.form.telefonoState = valid4
                this.form.correoState = valid5
                if(valid == false || valid1 == false || valid2 == false || valid3 == false || valid4 == false || valid5 == false)
                    return false
                else
                    return true
            },

            validarTelf(){
                if(this.form.telefono.length > 0 && this.form.telefono.length < 14)
                    return true
                else{
                    this.form.telefonoState=false
                    this.$toast.error('El teléfono debe ser máx. 13 dígitos')
                    return false
                }                   
            },

            validarIdent(){
                if(this.form.ident.length > 0 && this.form.ident.length < 14)
                    return true
                else{
                    this.form.identState=false
                    this.$toast.error('La identificación debe ser máx 13 dígitos')
                    return false
                }                   
            },

            handleSubmit() {
                if (!this.validarForm())
                    return
                if (!this.validarIdent())
                    return
                if (!this.validarTelf())
                    return
                this.crearCliente()
            },
        }
    }
</script>