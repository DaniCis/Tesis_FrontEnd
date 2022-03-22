<template>
    <div class="g-sidenav-show  bg-gray-100 vh-completa" id='mainDashboard'>
        <Sidebar/>
        <Navbar :Modulo='"Administración"' :Tabla='"Permisos"'/>
        <main class="main-content position-relative max-height-vh-100 mt-1 border-radius-lg media-left">
             <div class="container-fluid py-4">
                <div class="row">
                    <div class="col-12">
                        <div class="card mb-4">
                            <div class="card-header pb-0">
                                <div class="d-lg-flex">
                                    <div>
                                        <h5>{{this.rol}}</h5>
                                    </div>
                                    <div class="ms-auto my-auto mt-lg-0 mt-4" >
                                        <div class="ms-auto my-auto">
                                            <a  class="btn bg-gradient-primary btn-sm mb-0"> +&nbsp; Nuevo permiso</a>
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
                                                        <th class="text-uppercase text-secondary text-xs font-weight-bolder opacity-7">Id</th>
                                                        <th class="text-uppercase text-secondary text-xs font-weight-bolder opacity-7 ps-2">Submódulo</th>
                                                        <th colspan="4" class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7">Permisos</th>
                                                        <th class="text-secondary opacity-7"></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="permiso in paginador(this.permisos)">
                                                        <td>
                                                            <h6 class="ms-3 mb-2 text-sm">{{permiso.id_permiso}}</h6>
                                                        </td>
                                                        <td>
                                                            <p class="text-sm font-weight-bold mb-0">{{permiso.nombre_submodulo}}</p>
                                                        </td>
                                                        <td class="align-middle text-md">
                                                            <div class="form-check">
                                                                <input v-if="permiso.crearProceso_autorizacion == true" class="form-check-input" type="checkbox" id="check1" disabled checked>
                                                                <input v-else class="form-check-input" type="checkbox" disabled id="check1" >
                                                                <label class="form-check-label" for="check1">Crear</label>
                                                            </div>
                                                        </td>
                                                        <td class="align-middle text-md">
                                                            <div class="form-check">
                                                                <input v-if="permiso.leerProceso_autorizacion == true" class="form-check-input" type="checkbox" disabled id="check2" checked>
                                                                <input v-else class="form-check-input" type="checkbox" disabled id="check2">
                                                                <label class="form-check-label" for="check2">Leer</label>
                                                            </div>
                                                        </td>
                                                        <td class="align-middle text-md">
                                                            <div class="form-check">
                                                                <input v-if="permiso.editarProceso_autorizacion == true" class="form-check-input" type="checkbox" disabled id="check3" checked>
                                                                <input v-else class="form-check-input" type="checkbox" disabled id="check3">
                                                                <label class="form-check-label" for="check3">Editar</label>
                                                            </div>
                                                        </td>
                                                        <td class="align-middle text-md">
                                                            <div class="form-check">
                                                                <input v-if="permiso.eliminarProceso_autorizacion == true" class="form-check-input" type="checkbox" disabled id="check4" checked>
                                                                <input v-else class="form-check-input" type="checkbox" disabled id="check3">
                                                                <label class="form-check-label" for="check4">Eliminar</label>
                                                            </div>
                                                        </td>
                                                        <td class="align-middle">
                                                            <div class="contenedorAcciones">
                                                                <div v-if="editar">
                                                                    <a class="cursor-pointer" @click="openModal(permiso.id_permiso, 'editar')">
                                                                        <b-icon  class='mx-3' icon='pencil-square' style="width: 1.2em; height: 1.2em"></b-icon>
                                                                    </a>
                                                                </div>
                                                                <div v-if="eliminar">
                                                                    <a class="trash cursor-pointer" @click='showModalDelete(permiso.id_permiso)'>
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
                                                :total-rows="this.permisos.length"
                                                :per-page="porPag"
                                                ></b-pagination>
                                            </nav>
                                        </div>
                                    </div>
                                </div>
                                <b-modal id="permission-modal" :title="title" cancel-title='Cancelar' :ok-title="titleBtn" @ok="handleOk($event,editId)">
                                    <b-form @submit.stop.prevent="handleSubmit(editId)">
                                            <div class="row mt-2">
                                                <div class="col-12 col-md-8"> 
                                                    <b-form-group v-if="this.titleBtn=='Actualizar'"
                                                        label="SubMódulo" 
                                                        label-for="name-input">
                                                        <b-form-input
                                                            id="name-input" class="form-control" type="text" ref='name_input'
                                                            readonly>
                                                        </b-form-input>
                                                    </b-form-group>
                                                    <b-form-group v-else
                                                        label="SubMódulo" 
                                                        label-for="submod-select">
                                                        <select 
                                                        id="submod-select"  class="form-select" ref='submod_select'  required>
                                                            <option disabled :value='null'> Seleccione</option>
                                                            <option v-for="subm in this.submodulos" :value="subm.id_submodulo">
                                                                {{subm.nombre_submodulo}}
                                                            </option>
                                                        </select>
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
        components: { Sidebar, Navbar},
        middleware: 'authenticated',
        data(){
            return{
                permisosCrud:[],
                permisos:[],
                permiso:[],
                submodulos:[],
                editId:null,
                crear:null,
                editar:null,
                eliminar:null,
                rol:'',
                confirm: '',
                title:'',
                titleBtn:'',
                pagActual:1,
                porPag:5,
            }
        },
        async mounted(){
            this.permisosCrud = getSubmodulos('Administración','Permisos')
            if('crear' in this.permisosCrud)
                this.crear= true
            if('editar' in this.permisosCrud)
                this.editar = true
            if('eliminar' in this.permisosCrud)
                this.eliminar = true
            if('leer' in this.permisosCrud)
                this.getPermisos(3)
            else
                this.$toast.error('No tiene permiso de lectura')
        },
        methods:{
            async getSubmodulos(){
                await axios.get('/submodulos',{ headers:{ Authorization: 'Bearer ' + getAccessToken() }
                }).then(response => {
                    this.submodulos = response.data;
                }).catch(e => {
                    this.$toast.error('Ocurrió un error al cargar: ' + e.message)
                })
            },
            async getPermiso(permissionId){

            },
            async getPermisos(rolId){
                await axios.get(`/permisos/${rolId}`,{ headers:{ Authorization: 'Bearer ' + getAccessToken() }
                }).then(response => {
                    this.rol= response.data.nombre_rol
                    this.permisos = response.data.permisos;
                    console.log(this.permisos)
                })
                .catch(e => {
                     this.$toast.error('Ocurrió un error al cargar: ' + e.message)
                })
            },
            async crearPermiso(){

            },
            async editarPermiso(){

            },
            async eliminarPermiso(){

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
            handleOk(bvModalEvt, permissionId){
                bvModalEvt.preventDefault()
                this.handleSubmit(permissionId)
            },
            handleSubmit(permissionId) {
                if (!this.validarForm())
                    return
                if(this.titleBtn == 'Agregar')
                    this.crearPermiso()
                else
                    this.editarPermiso(permissionId)
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
                this.$bvModal.hide('permission-modal')
            },
            openModal(permissionId, action){
                this.$bvModal.show('permission-modal')
                this.onReset()
                if(action == 'editar'){
                    this.getPermiso(permissionId)
                    this.editId = permissionId
                    this.title = 'Editar Permiso'
                    this.titleBtn = 'Actualizar'
                }else{
                    this.title='Añadir Nuevo Permiso'
                    this.titleBtn = 'Agregar'
                }
            },
            showModalDelete(permissionId){
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
                        this.eliminarPermiso(permissionId)
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
        }
        
    }

</script>