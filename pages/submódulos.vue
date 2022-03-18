<template>
    <div class="g-sidenav-show  bg-gray-100 vh-completa" id='mainDashboard'>
        <Sidebar />
        <Navbar :Modulo='"Administración"' :Tabla='"Submódulos"'/>
        <main class="main-content position-relative max-height-vh-100 mt-1 border-radius-lg media-left">
            <div class="container-fluid py-4">
                <div class="row">
                    <div class="col-12">
                        <div class="card mb-4">
                            <div class="card-header pb-0">
                                 <div class="d-lg-flex">
                                    <div>
                                        <h5>Submódulos</h5>
                                    </div>
                                    <div class="ms-auto my-auto mt-lg-0 mt-4" v-if="crear">
                                        <div class="ms-auto my-auto">
                                            <a @click="openModal(submodulo.id_submodulo, 'agregar')" class="btn bg-gradient-primary btn-sm mb-0"> +&nbsp; Nuevo submódulo</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body px-0 pt-0 pb-2">
                                <div class="table-responsive p-0">
                                    <div class="dataTable-wrapper dataTable-loading no-footer sortable searchable fixed-columns">
                                        <div class="dataTable-top">
                                            <div class="dataTable-dropdown">
                                                <label style="width: 200px">
                                                    <select class="form-select dataTable-selector">
                                                        <option value="5">5</option>
                                                        <option value="10">10</option>
                                                        <option value="15">15</option>
                                                    </select>
                                                    Entradas por página
                                                </label>
                                            </div>
                                        </div>
                                        <div class="dataTable-container">
                                            <table class="table table-flush dataTable-table">
                                                <thead>
                                                    <tr>
                                                    <th class="text-uppercase text-secondary text-xs font-weight-bolder opacity-7">ID</th>
                                                    <th class="text-uppercase text-secondary text-xs font-weight-bolder opacity-7 ps-2">Nombre</th>
                                                    <th class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7">Módulo al que pertenece</th>
                                                    <th class="text-secondary opacity-7"></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="submodulo in this.submodulos">
                                                        <td>
                                                            <h6 class=" ms-3 mb-2 text-sm">{{submodulo.id_submodulo}}</h6>
                                                        </td>
                                                        <td>
                                                            <p class="text-s font-weight-bold mb-0">{{submodulo.nombre_submodulo}}</p>
                                                        </td>
                                                        <td class="align-middle text-center text-sm">
                                                            <p class="text-s font-weight-bold mb-0">{{submodulo.nombre_modulo}}</p>
                                                        </td>
                                                        <td class="align-middle">
                                                            <div class="contenedorAcciones">
                                                                <div v-if="editar">
                                                                    <a class="cursor-pointer" @click="openModal(submodulo.id_submodulo, 'editar')">
                                                                        <b-icon  class='mx-3' icon='pencil-square' style="width: 1.2em; height: 1.2em"></b-icon>
                                                                    </a>
                                                                </div>
                                                                <div v-if="eliminar">
                                                                    <a class="trash cursor-pointer"  @click='showModalDelete(submodulo.id_submodulo)'>
                                                                        <b-icon class="icon" icon='trash' style="width: 1.2em; height: 1.2em; color: #ff0c0c;"></b-icon>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div class="dataTable-bottom">
                                            <div class="dataTable-info">1 de {{this.submodulos.length}}</div>
                                            <nav class="dataTable-pagination">
                                                <ul class="dataTable-pagination-list">
                                                    
                                                </ul>
                                            </nav>
                                        </div>
                                    </div>
                                </div>
                                <b-modal id="submodule-modal" :title="title" hide-footer>
                                    <b-form method='post'>
                                        <div>
                                            <div class="row mt-2">
                                                <div class="col-12 col-md-8">
                                                    <label>Nombre</label>
                                                    <b-form-input class="form-control" type="text" v-model='form.nombre' required></b-form-input>
                                                </div>
                                            </div>
                                            <div class="row mt-2">
                                                <div class="col-12 col-md-8">
                                                    <label>Módulo al que pertenece</label>
                                                    <select v-if="titleBtn =='Agregar'" v-model="form.modulo" class="form-select" required >
                                                        <option disabled :value='null'>Seleccione</option>
                                                        <option v-for="modulo in this.modulos" :value="modulo.id_modulo">
                                                            {{modulo.nombre_modulo}}
                                                        </option>
                                                    </select>
                                                    <select v-else v-model="form.modulo" class="form-select">
                                                        <option v-for="modulo in this.modulos" :value="modulo.id_modulo">
                                                            {{modulo.nombre_modulo}}
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="button-row d-flex mt-5">
                                                <b-button  @click="closeModal('submodule-modal')" class="btn bg-gradient-secondary me-3 ms-auto mb-0">
                                                    Cancelar
                                                </b-button>
                                                <b-button v-if="titleBtn == 'Agregar' " class="btn bg-gradient-primary mb-0 js-btn-next" @click='crearSubmodulo'>
                                                    Agregar
                                                </b-button>
                                                <b-button v-else class="btn bg-gradient-primary mb-0 js-btn-next" @click='editarSubmodulo(editId)'>
                                                    Actualizar
                                                </b-button>
                                            </div>
                                        </div>
                                    </b-form>
                                </b-modal>
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
        data() {
            return {
                form:{
                    nombre:'',
                    modulo:''
                },
                permisosCrud:[],
                modulos:[],
                submodulo:[],
                submodulos:[],
                editId:null,
                editar: null,
                crear:null,
                eliminar:null,
                confirm: '',
                title:'',
                titleBtn:'',
            };
        },
        async mounted(){
            await this.getModulos()
            this.permisosCrud = getSubmodulos('Administración','Submódulos')
            if('editar' in this.permisosCrud)
                this.editar = true
            if('eliminar' in this.permisosCrud)
                this.eliminar = true
            if('crear' in this.permisosCrud)
                this.crear = true
            if('leer' in this.permisosCrud)
                this.getSubmodulos()
            else
                this.$toast.error('No tiene permiso de lectura')

        },
        methods: {
            async getModulos(){
                await axios.get('/modulos',{ headers:{ Authorization: 'Bearer ' + getAccessToken() }
                }).then(response => {
                    this.modulos = response.data;
                }).catch(e => {
                    this.$toast.error('Ocurrió un error al cargar: '+ e.message)
                })
            },
            async getSubmodulo(submoduloId){
                 await axios.get(`/submodulo/${submoduloId}`,{ headers:{ Authorization: 'Bearer ' + getAccessToken()}
                }) .then(response => {
                    this.submodulo = response.data
                    this.form.nombre = response.data.nombre_submodulos
                    this.form.modulo = response.data.nombre_submodulos
                }) .catch(e => {
                    this.$toast.error('Ocurrió un error al cargar: '+ e.message)
                })
            },
            async getSubmodulos(){
                await axios.get('/submodulos',{ headers:{ Authorization: 'Bearer ' + getAccessToken() }
                }).then(response => {
                    this.submodulos = response.data;
                }).catch(e => {
                    this.$toast.error('Ocurrió un error al cargar: ' + e.message)
                })
            },
            async crearSubmodulo(){
                if(this.crear){
                    var params = {
                        nombre_submodulo: this.form.nombre,
                        nombre_modulo:this.form.modulo
                    }
                    await axios.post('/submodulos', params,{ headers:{ Authorization: 'Bearer ' + getAccessToken() }
                    }).then(() => {
                        this.$toast.success('Submódulo creado con éxito')
                        this.closeModal('submodule-modal')
                        this.getSubmodulos()
                    }).catch (e => {
                        this.$toast.error('Ocurrió un error al agregar: '+ e.message)
                    })
                }else{
                    this.$toast.error('No tiene permisos para agregar')
                }
            },
            async editarSubmodulo(submoduloId){
                if(this.editar){
                    var params = {
                        nombre_submodulo: this.form.nombre,
                        nombre_modulo:this.form.modulo
                    }
                    await axios.put(`/submodulos/${submoduloId}`, params ,{ headers:{ Authorization: 'Bearer ' + getAccessToken()}
                    }).then(() => {
                        this.$toast.success('Submódulo editado con éxito')
                        this.closeModal('submodule-modal')
                        this.getSubmodulos()
                    }).catch (e => {
                        this.$toast.error('Ocurrió un error al editar: '+ e.message)
                    })
                }else{
                    this.$toast.error('No tiene permisos para modificar')
                }
            },
            async eliminarSubmodulo(submoduloId){
                if(this.eliminar){
                    await axios.delete(`/submodulos/${submoduloId}`,{ headers:{ Authorization: 'Bearer ' + getAccessToken() }
                    }).then(() => {
                        this.$toast.success('Submódulo eliminado con éxito')
                        this.getSubmodulos()
                    }).catch (e => {
                        this.$toast.error('Ocurrió un error al eliminar: '+ e.message)
                    })
                }else{
                    this.$toast.error('No tiene permisos para eliminar')
                }
            },
            onReset(){
                this.form.nombre = ''
                this.form.modulo= ''
            },
            closeModal(){
                this.$bvModal.hide('submodule-modal')
            },
            openModal(submoduloId, action){
                this.$bvModal.show('submodule-modal')
                if(action == 'editar'){
                    this.getSubmodulo(submoduloId)
                    this.editId = submoduloId
                    this.title = 'Editar Submódulo'
                    this.titleBtn = 'Actualizar'
                }else{
                    this.onReset()
                    this.title='Añadir Nuevo Submódulo'
                    this.titleBtn = 'Agregar'
                }
            },
            showModalDelete(submoduloId){
                this.confirm = ''
                this.$bvModal.msgBoxConfirm('¿Está seguro que desea eliminar este registro?', {
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
                        this.eliminarSubmodulo(submoduloId)
                    }
                }).catch( e=>{
                    this.$toast.error(e.message)
                })
            },   
        },
    }
</script>