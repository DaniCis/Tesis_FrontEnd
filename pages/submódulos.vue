<template>
    <div class="g-sidenav-show bg-gray-100 vh-completa" id='mainDashboard'>
        <Sidebar />
        <Navbar :Modulo='"Administración"' :Tabla='"Submódulos"'/>
        <CheckToken />
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
                                            <a @click="openModal(null, 'agregar')" class="btn bg-gradient-primary btn-sm mb-0"> +&nbsp; Nuevo submódulo</a>
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
                                                        <option value=10>10</option>
                                                        <option value=20>20</option>
                                                        <option value=30>30</option>
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
                                                    <th class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7 ps-2">Nombre</th>
                                                    <th class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7">Módulo al que pertenece</th>
                                                    <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-if="error">
                                                        <td colspan="4">
                                                            <h6 class="ms-3 mb-2 text-sm text-center mt-4">No existen registros</h6> 
                                                        </td>       
                                                    </tr>
                                                    <tr v-for="(submodulo,i) in paginador(this.submodulos)" :key="i">
                                                        <td class="align-middle">
                                                            <h6 class=" ms-3 mb-2 text-sm">{{submodulo.id_submodulo}}</h6>
                                                        </td>
                                                        <td  class="align-middle text-center text-sm">
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
                                            <nav class="dataTable-pagination">
                                                <b-pagination
                                                v-model="pagActual"
                                                :total-rows="this.submodulos.length"
                                                :per-page="porPag"
                                                ></b-pagination>
                                            </nav>
                                        </div>
                                    </div>
                                </div>
                                <b-modal id="submodule-modal" :title="title" cancel-title='Cancelar' :ok-title="titleBtn" @ok="handleOk($event,editId)" >
                                    <b-form  @submit.stop.prevent="handleSubmit(editId)">
                                        <div class="row mt-2">
                                            <div class="col-12 col-md-8">
                                                <b-form-group
                                                    label="Nombre" 
                                                    label-for="name-input" 
                                                    invalid-feedback="Este campo es requerido" 
                                                    :state="form.nameState">
                                                    <b-form-input
                                                        id="name-input" class="form-control" type="text" placeholder="Nombre" ref='name_input'
                                                        v-model="form.nombre" :state="form.nameState" trim required>
                                                    </b-form-input>
                                                </b-form-group>
                                            </div>
                                            <div class="row mt-2">
                                                <div class="col-12 col-md-8">
                                                    <b-form-group
                                                        label="Módulo al que pertenece" 
                                                        label-for="mod-select" 
                                                        invalid-feedback="Seleccione un módulo" 
                                                        :state="form.modState">
                                                        <select 
                                                            id="mod-select" class="form-select" v-model="form.modulo" ref='mod_select' :state="form.modState" required>
                                                            <option v-if="titleBtn =='Agregar'" disabled hidden value=''> Seleccione</option>
                                                            <option v-for="(modulo,i) in this.modulos" :key="i" :value="modulo.id_modulo">
                                                                {{modulo.nombre_modulo}}
                                                            </option>
                                                        </select>
                                                    </b-form-group>
                                                </div>
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
    import CheckToken from '~/components/checkToken.vue';
    import { getAccessToken, getSubmodulos } from '~/utils/auth';

    export default{
        components: { Sidebar, Navbar, CheckToken },
        middleware: 'authenticated',
        data() {
            return {
                form:{
                    nombre:'',
                    modulo:'',
                    nameState:null,
                    modState:null
                },
                permisosCrud:[],
                modulos:[],
                submodulo:[],
                submodulos:[],
                editId:null,
                editar: null,
                crear:null,
                eliminar:null,
                error:false,
                confirm: '',
                title:'',
                titleBtn:'',
                pagActual:1,
                porPag:10,
            };
        },
        async mounted(){
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
                await axios.get('http://10.147.17.173:5000/modulos',{ headers:{ Authorization: 'Bearer ' + getAccessToken() }
                }).then(response => {
                    this.modulos = response.data;
                }).catch(e => {
                    this.$toast.error(e.response.data.detail)
                })
            },
            
            async getSubmodulo(submoduloId){
                 await axios.get(`http://10.147.17.173:5000/submodulos/${submoduloId}`,{ headers:{ Authorization: 'Bearer ' + getAccessToken()}
                }) .then(response => {
                    this.submodulo = response.data
                    this.form.nombre = response.data.nombre_submodulo
                    this.form.modulo = response.data.modulos_id_modulo
                }) .catch(e => {
                    this.$toast.error(e.response.data.detail)
                })
            },
            
            async getSubmodulos(){
                await axios.get('http://10.147.17.173:5000/submodulos',{ headers:{ Authorization: 'Bearer ' + getAccessToken() }
                }).then(response => {
                    if(response.data != null)
                        this.submodulos = response.data
                    else
                        this.error = true
                }).catch(e => {
                    this.$toast.error(e.response.data.detail)
                })
            },

            async crearSubmodulo(){
                if(this.crear){
                    var params = {
                        nombre_submodulo: this.form.nombre,
                        modulos_id_modulo:this.form.modulo
                    }
                    await axios.post('http://10.147.17.173:5000/submodulos', params,{ headers:{ Authorization: 'Bearer ' + getAccessToken() }
                    }).then(() => {
                        this.$toast.success('Submódulo creado con éxito')
                        this.getSubmodulos()
                    }).catch (e => {
                        this.$toast.error(e.response.data.detail)
                    })
                }else{
                    this.$toast.error('No tiene permisos para agregar')
                }
            },

            async editarSubmodulo(submoduloId){
                if(this.editar){
                    var params = {
                        nombre_submodulo: this.form.nombre,
                        modulos_id_modulo: this.form.modulo
                    }
                    await axios.put(`http://10.147.17.173:5000/submodulos/${submoduloId}`, params ,{ headers:{ Authorization: 'Bearer ' + getAccessToken()}
                    }).then(() => {
                        this.$toast.success('Submódulo editado con éxito')
                        this.getSubmodulos()
                    }).catch (e => {
                        this.$toast.error(e.response.data.detail)
                    })
                }else{
                    this.$toast.error('No tiene permisos para modificar')
                }
            },

            async eliminarSubmodulo(submoduloId){
                if(this.eliminar){
                    await axios.delete(`http://10.147.17.173:5000/submodulos/${submoduloId}`,{ headers:{ Authorization: 'Bearer ' + getAccessToken() }
                    }).then(() => {
                        this.$toast.success('Submódulo eliminado con éxito')
                        this.getSubmodulos()
                    }).catch (e => {
                        this.$toast.error(e.response.data.detail)
                    })
                }else{
                    this.$toast.error('No tiene permisos para eliminar')
                }
            },

            validarForm() {
                const valid = this.$refs.name_input.checkValidity()
                const valid2 = this.$refs.mod_select.checkValidity()
                this.form.nameState = valid
                this.form.modState = valid2
                if(valid == false || valid2 == false)
                    return false
                else
                    return true
            },

            handleOk(bvModalEvt, submoduloId){
                bvModalEvt.preventDefault()
                this.handleSubmit(submoduloId)
            },

            handleSubmit(submoduloId) {
                if (!this.validarForm())
                    return
                if(this.titleBtn == 'Agregar')
                    this.crearSubmodulo()
                else
                    this.editarSubmodulo(submoduloId)
                this.$nextTick(() => {
                    this.closeModal()
                })
            },

            onReset(){
                this.form.nombre = ''
                this.form.modulo= ''
                this.form.nameState = null,
                this.form.modState = null
            },

            closeModal(){
                this.$bvModal.hide('submodule-modal')
            },

            openModal(submoduloId, action){
                this.$bvModal.show('submodule-modal')
                this.onReset()
                this.getModulos()
                if(action == 'editar'){
                    this.getSubmodulo(submoduloId)
                    this.editId = submoduloId
                    this.title = 'Editar Submódulo'
                    this.titleBtn = 'Actualizar'
                }else{
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
                    this.$toast.error(e.response.data.detail)
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