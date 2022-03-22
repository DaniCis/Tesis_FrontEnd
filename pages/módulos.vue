<template>
    <div class="g-sidenav-show  bg-gray-100 vh-completa" id='mainDashboard'>
        <Sidebar />
        <Navbar :Modulo='"Administración"' :Tabla='"Módulos"'/>
        <main class="main-content position-relative max-height-vh-100 mt-1 border-radius-lg media-left">
            <div class="container-fluid py-4">
                <div class="row">
                    <div class="col-12">
                        <div class="card mb-4">
                            <div class="card-header pb-0">
                                 <div class="d-lg-flex">
                                    <div>
                                        <h5>Módulos</h5>
                                    </div>
                                    <div class="ms-auto my-auto mt-lg-0 mt-4" v-if="crear">
                                        <div class="ms-auto my-auto">
                                            <a @click="openModal(modulo.id_modulo, 'agregar')" class="btn bg-gradient-primary btn-sm mb-0"> +&nbsp; Nuevo módulo</a>
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
                                                    <select class="form-select dataTable-selector" v-model='porPag'>
                                                        <option value=5>5</option>
                                                        <option value=10>10</option>
                                                        <option value=15>15</option>
                                                    </select>
                                                    Registros por página
                                                </label>
                                            </div>
                                        </div>
                                        <div class="dataTable-container">
                                            <table class="table table-flush dataTable-table">
                                                <thead>
                                                    <tr>
                                                    <th class="text-uppercase text-secondary text-xs font-weight-bolder opacity-7">ID</th>
                                                    <th class="text-uppercase text-secondary text-xs font-weight-bolder opacity-7 ps-2">Nombre</th>
                                                    <th class="text-secondary opacity-7"></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="modulo in paginador(this.modulos)">
                                                        <td>
                                                            <h6 class=" ms-3 mb-2 text-sm">{{modulo.id_modulo}}</h6>
                                                        </td>
                                                        <td>
                                                            <p class="text-s font-weight-bold mb-0">{{modulo.nombre_modulo}}</p>
                                                        </td>
                                                        <td class="align-middle">
                                                            <div class="contenedorAcciones">
                                                                <div v-if="editar">
                                                                    <a class="cursor-pointer" @click="openModal(modulo.id_modulo, 'editar')">
                                                                        <b-icon  class='mx-3' icon='pencil-square' style="width: 1.2em; height: 1.2em"></b-icon>
                                                                    </a>
                                                                </div>
                                                                <div v-if="eliminar">
                                                                    <a class="trash cursor-pointer"  @click='showModalDelete(modulo.id_modulo)'>
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
                                            <nav class="dataTable-pagination">
                                                <b-pagination
                                                v-model="pagActual"
                                                :total-rows="this.modulos.length"
                                                :per-page="porPag"
                                                ></b-pagination>
                                            </nav>
                                        </div>
                                    </div>
                                </div>
                                <b-modal id="module-modal" :title="title" cancel-title='Cancelar' :ok-title="titleBtn" @ok="handleOk($event,editId)">
                                    <b-form @submit.stop.prevent="handleSubmit(editId)">
                                        <div class="row mt-2">
                                            <div class="col-12 col-md-8">
                                                <b-form-group
                                                    label="Nombre" 
                                                    label-for="name-input" 
                                                    invalid-feedback="Este campo es requerido" 
                                                    :state="form.nameState">
                                                    <b-form-input
                                                        id="name-input" class="form-control" type="text" placeholder="Nombre" ref='name_input'
                                                        v-model="form.nombre" :state="form.nameState" required>
                                                    </b-form-input>
                                                </b-form-group>
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
                    nameState:null
                },
                permisosCrud:[],
                modulo:[],
                modulos:[],
                editar:null,
                eliminar:null,
                crear:null,
                editId:null,
                confirm: '',
                title:'',
                titleBtn:'',
                pagActual:1,
                porPag:5,
            };
        },
        async mounted(){
            this.permisosCrud = getSubmodulos('Administración','Módulos')
            if('editar' in this.permisosCrud)
                this.editar = true
            if('eliminar' in this.permisosCrud)
                this.eliminar = true
            if('crear' in this.permisosCrud)
                this.crear= true
            if('leer' in this.permisosCrud)
                this.getModulos()
            else
                this.$toast.error('No tiene permiso de lectura')
        },
        methods: {
            async getModulo(moduloId){
                await axios.get(`/modulos/${moduloId}`,{ headers:{ Authorization: 'Bearer ' + getAccessToken()}
                }) .then(response => {
                    this.modulo = response.data
                    this.form.nombre = response.data.nombre_modulo
                }) .catch(e => {
                    this.$toast.error('Ocurrió un error al cargar: '+ e.message)
                })
            },
            async getModulos(){
                await axios.get('/modulos',{ headers:{ Authorization: 'Bearer ' + getAccessToken() }
                }).then(response => {
                    this.modulos = response.data;
                }).catch(e => {
                    this.$toast.error('Ocurrió un error al cargar: '+ e.message)
                })
            },
            async crearModulo(){
                if(this.crear){
                    await axios.post('/modulos', {nombre_modulo: this.form.nombre,},{ headers:{ Authorization: 'Bearer ' + getAccessToken() }
                    }).then(() => {
                        this.$toast.success('Módulo creado con éxito')
                        this.getModulos()
                    }).catch (e => {
                        this.$toast.error('Ocurrió un error al agregar: '+ e.message)
                    })
                }else{
                    this.$toast.error('No tiene permisos para agregar')
                }
            },
            async editarModulo(moduloId){
                 if(this.editar){
                    await axios.put(`/modulos/${moduloId}`, {nombre_modulo: this.form.nombre} ,{ headers:{ Authorization: 'Bearer ' + getAccessToken()}
                    }).then(() => {
                        this.$toast.success('Módulo editado con éxito')
                        this.getModulos()
                    }).catch (e => {
                        this.$toast.error('Ocurrió un error al editar: '+ e.message)
                    })
                }else{
                    this.$toast.error('No tiene permisos para modificar')
                }
            },
            async eliminarModulo(moduloId){
                if(this.eliminar){
                    await axios.delete(`/modulos/${moduloId}`,{ headers:{ Authorization: 'Bearer ' + getAccessToken() }
                    }).then(() => {
                        this.$toast.success('Módulo eliminado con éxito')
                        this.getModulos()
                    }).catch (e => {
                        this.$toast.error('Ocurrió un error al eliminar: '+ e.message)
                    })
                }else{
                    this.$toast.error('No tiene permisos para eliminar')
                }
            },
            validarForm() {
                const valid = this.$refs.name_input.checkValidity()
                this.form.nameState = valid
                return valid
            },
            handleOk(bvModalEvt,moduloId){
                bvModalEvt.preventDefault()
                this.handleSubmit(moduloId)
            },
            handleSubmit(moduloId) {
                if (!this.validarForm())
                    return
                if(this.titleBtn == 'Agregar')
                    this.crearModulo()
                else
                    this.editarModulo(moduloId)
                this.$nextTick(() => {
                    this.closeModal()
                })
            },
            onReset(){
                this.form.nombre = '',
                this.form.nameState = null
            },
            closeModal(){
                this.$bvModal.hide('module-modal')
            },
            openModal(moduloId, action){
                this.$bvModal.show('module-modal')
                this.onReset()
                if(action == 'editar'){
                    this.getModulo(moduloId)
                    this.editId = moduloId
                    this.title = 'Editar Módulo'
                    this.titleBtn = 'Actualizar'
                }else{
                    this.title='Añadir Nuevo Módulo'
                    this.titleBtn = 'Agregar'
                }
            },
            showModalDelete(moduloId){
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
                        this.eliminarModulo(moduloId)
                    }
                }).catch( e=>{
                    this.$toast.error(e.message)
                })
            },  
            paginador(items) {
                const inicio = (this.pagActual - 1) * this.porPag;
                const final =
                    inicio + this.porPag > items.length
                    ? items.length
                    : inicio  + this.porPag;
                return items.slice(inicio, final);
            }
        },
    }
</script>