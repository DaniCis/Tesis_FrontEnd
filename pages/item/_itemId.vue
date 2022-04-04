<template>
    <div class="g-sidenav-show bg-gray-10 vh-completa" id='mainDashboard'> 
        <Sidebar />
        <Navbar :Modulo='"Inventarios"' :Tabla='"Items"'/>
        <main class="main-content position-relative max-height-vh-100 mt-1 border-radius-lg media-left">
            <div class="container-fluid py-4">
                <div class="row">
                    <div class="col-12">
                        <div class="card mb-4">
                            <div class="card-header pb-0">
                                <div class='text-sm'>
                                    <nuxt-link to='/items'>
                                         <b-icon class='cursor-pointer' icon='arrow90deg-left' style="width: 1.3em; height: 1.3em"></b-icon> &nbsp;
                                        Regresar
                                    </nuxt-link>
                                </div>
                                <div class="d-lg-flex mt-4">
                                    <div>
                                        <h4>Item 1</h4>
                                        <p class="text-sm">Editar item</p>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body px-0 pt-0 pb-2">
                                <b-form class="ps-4 mt-3" @submit="editarItem" @reset="onReset">
                                    <div class="row mt-2">
                                        <div class="col-12 col-md-8 col-lg-4">
                                            <b-form-group 
                                                label="Producto Asociado" 
                                                label-for="name-input">
                                                <b-form-input  
                                                    id="name-input" class="form-control" type="text"
                                                    v-model="form.producto">
                                                </b-form-input>
                                            </b-form-group>
                                        </div>
                                    </div>
                                    <div class="row mt-2">
                                        
                                        <div class="col-12 col-md-3 col-lg-2">
                                            <b-form-group 
                                                label="PVP" 
                                                label-for="pvp-input">
                                                <b-input-group prepend="$">
                                                    <b-form-input  
                                                        id="pvp-input" class="form-control" type="text" v-model="form.pvp"
                                                        style='height: 42px'>
                                                    </b-form-input>
                                                </b-input-group>
                                            </b-form-group>
                                        </div>
                                        <div class="col-12 col-md-3 col-lg-2">
                                            <b-form-group 
                                                label="PVD" 
                                                label-for="pvd-input">
                                                <b-input-group prepend="$">
                                                    <b-form-input  
                                                        id="pvd-input" class="form-control" type="text" v-model="form.pvd"
                                                        style='height: 42px'>
                                                    </b-form-input>
                                                </b-input-group>
                                            </b-form-group>
                                        </div>
                                    </div>
                                    <div class="row mt-2">
                                        <div class="col-12 col-md-3 col-lg-3">
                                            <b-form-group 
                                                label="Número de Serie" 
                                                label-for="num-input">
                                                <b-form-input  
                                                    id="num-input" class="form-control" type="text" v-model="form.numeroSerie"
                                                    style='height: 42px'>
                                                </b-form-input>
                                            </b-form-group>
                                        </div>
                                        <div class="col-12 col-md-3 col-lg-3">
                                            <b-form-group 
                                                label="Descuento" 
                                                label-for="des-input">
                                                <b-form-input  
                                                    id="des-input" class="form-control" type="text" v-model="form.descuento"
                                                    style='height: 42px'>
                                                </b-form-input>
                                            </b-form-group>
                                        </div>
                                    </div>
                                    <div class="row mt-4">
                                        <div class="col-12 col-md-8 col-lg-6">
                                            <div class="d-flex ms-auto mb-3">
                                                <b-button type='submit' class="btn bg-gradient-primary mb-0">Actualizar</b-button>
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
                    producto:'',
                    pvp:'',
                    pvd:'',
                    numeroSerie:'',
                    descuento:''
                },
                item:[],
                editar:null,
                itemId:'',
            }
        },
        mounted(){
            /*this.itemId = this.$route.params.itemId
            this.permisosCrud = getSubmodulos('Inventario','Items')
            if('editar' in this.permisosCrud)
                this.editar = true
            if('leer' in this.permisosCrud)
                this.Item(this.itemId)*/
        },

        methods:{
            async getItem(itemId){
                await axios.get(`/item/${itemId}`,{ headers:{ Authorization: 'Bearer ' + getAccessToken() }
                }).then(response => {
                    this.form.producto = response.data.nombre_item
                    this.form.pvp = response.data.pvp_item
                    this.form.pvd = response.data.pvd_item
                    this.form.numeroSerie = response.data.numeroSerie_item
                    this.form.descuento = response.data.descuento_item
                })
                .catch(e => {
                     this.$toast.error(e.response.data.detail)
                })
            },
            async editarItem(itemId){
                if(this.editar){
                    var params = {
                        pvp_item:this.form.pvp,
                        pvd_item:this.form.pvd,
                        numeroSerie_item:this.form.numeroSerie,
                        descuento_item: this.form.descuento
                    }
                    await axios.put(`/item/${itemId}`, params, { headers:{ Authorization: 'Bearer ' + getAccessToken() }
                    }).then(() => {
                        this.$toast.success('Item editado con éxito')
                        this.$router.push('/items');
                        this.onReset()
                    }).catch (e => {
                        this.$toast.error(e.response.data.detail)
                    })
                }else{
                    this.$toast.error('No tiene permisos para modificar')
                }
            },
            onReset(){
                this.form.pvp = ''
                this.form.pvd = ''
                this.form.descuento =''
                this.form.numeroSerie =''
            }
        },
    }
</script>