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
                                <div class='text-sm'>
                                    <nuxt-link to='/roles'>
                                         <b-icon class='cursor-pointer' icon='arrow90deg-left' style="width: 1.3em; height: 1.3em"></b-icon> &nbsp;
                                        Regresar a Roles 
                                    </nuxt-link>
                                </div>
                                <div class="d-lg-flex mt-4">
                                    <div>
                                        <h5>{{this.rol}}</h5>
                                    </div>
                                    <div class="ms-auto my-auto mt-lg-0 mt-4" >
                                        <div class="ms-auto my-auto">
                                            <a @click="openModal(null, 'agregar')" class="btn bg-gradient-primary btn-sm mb-0"> +&nbsp; Nuevo permiso</a>
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
                                                        <th class="text-uppercase text-secondary text-xs font-weight-bolder opacity-7">Id</th>
                                                        <th class="text-uppercase text-secondary text-xs font-weight-bolder opacity-7 ps-2">Submódulo</th>
                                                        <th colspan="4" class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7">Permisos</th>
                                                        <th class="text-secondary opacity-7"></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-if="error">
                                                        <td colspan="4">
                                                            <h6 class="ms-3 mb-2 text-sm text-center mt-4">No existen registros</h6> 
                                                        </td>       
                                                    </tr>
                                                    <tr v-for="permiso in paginador(this.permisos)">
                                                        <td>
                                                            <h6 class="ms-3 mb-2 text-sm">{{permiso.id_permiso}}</h6>
                                                        </td>
                                                        <td>
                                                            <p class="text-sm font-weight-bold mb-0">{{permiso.nombre_submodulo}}</p>
                                                        </td>
                                                        <td class="align-middle text-md">
                                                            <div class="form-check">
                                                                <input v-if="permiso.crear_autorizacion == true" class="form-check-input" type="checkbox" id="check1" disabled checked>
                                                                <input v-else class="form-check-input" type="checkbox" disabled id="check1" >
                                                                <label class="form-check-label" for="check1">Crear</label>
                                                            </div>
                                                        </td>
                                                        <td class="align-middle text-md">
                                                            <div class="form-check">
                                                                <input v-if="permiso.leer_autorizacion == true" class="form-check-input" type="checkbox" disabled id="check2" checked>
                                                                <input v-else class="form-check-input" type="checkbox" disabled id="check2">
                                                                <label class="form-check-label" for="check2">Leer</label>
                                                            </div>
                                                        </td>
                                                        <td class="align-middle text-md">
                                                            <div class="form-check">
                                                                <input v-if="permiso.editar_autorizacion == true" class="form-check-input" type="checkbox" disabled id="check3" checked>
                                                                <input v-else class="form-check-input" type="checkbox" disabled id="check3">
                                                                <label class="form-check-label" for="check3">Editar</label>
                                                            </div>
                                                        </td>
                                                        <td class="align-middle text-md">
                                                            <div class="form-check">
                                                                <input v-if="permiso.eliminar_autorizacion == true" class="form-check-input" type="checkbox" disabled id="check4" checked>
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
                                                    label="Submódulo" 
                                                    label-for="name-input">
                                                    <b-form-input
                                                        id="name-input" class="form-control" type="text" ref='submod_select' v-model='form.submodulo'
                                                        :state="form.subState" readonly>
                                                    </b-form-input>
                                                    <input type='hidden' v-model='form.id_submodulo'/>
                                                </b-form-group>
                                                <b-form-group v-else
                                                    label="Submódulo" 
                                                    label-for="submod-select"
                                                    invalid-feedback="Seleccione un submódulo"
                                                    :state="form.subState">
                                                    <select 
                                                        id="submod-select" class="form-select" ref='submod_select' v-model='form.submodulo' :state="form.subState" required>
                                                        <option disabled :value='null'> Seleccione</option>
                                                        <option v-for="subm in this.submodulos" :value="subm.id_submodulo">
                                                            {{subm.nombre_submodulo}}
                                                        </option>
                                                    </select>
                                                </b-form-group>
                                            </div>
                                        </div>
                                        <div class="row mt-2">
                                            <div class="col-12 col-md-10">
                                                <b-form-group label='Operaciones' label-for='group-check'>
                                                    <b-form-checkbox inline value=true unchecked-value=false v-model="form.crear">
                                                        Crear
                                                    </b-form-checkbox>
                                                    <b-form-checkbox inline value=true unchecked-value=false v-model="form.leer">
                                                        Leer
                                                    </b-form-checkbox>
                                                    <b-form-checkbox inline value=true unchecked-value=false v-model="form.editar">
                                                        Editar
                                                    </b-form-checkbox>
                                                    <b-form-checkbox inline value=true unchecked-value=false v-model="form.eliminar">
                                                        Eliminar
                                                    </b-form-checkbox>
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

    export default{
        components: { Sidebar, Navbar},
        middleware: 'authenticated',
        data(){
            return{
                form:{
                    id_submodulo:'',
                    submodulo:'',
                    subState:'',
                    crear:'',
                    leer:'',
                    editar:'',
                    eliminar:''
                },
                permisosCrud:[],
                permisos:[],
                permiso:[],
                submodulos:[],
                editId:null,
                crear:null,
                editar:null,
                eliminar:null,
                error:false,
                rol:'',
                rolId:'',
                confirm: '',
                title:'',
                titleBtn:'',
                pagActual:1,
                porPag:10,
            }
        },
        async mounted(){
            this.rolId = this.$route.params.rolId
            this.permisosCrud = getSubmodulos('Administración','Permisos')
            if('crear' in this.permisosCrud)
                this.crear= true
            if('editar' in this.permisosCrud)
                this.editar = true
            if('eliminar' in this.permisosCrud)
                this.eliminar = true
            if('leer' in this.permisosCrud)
                this.getPermisos(this.rolId)
            else
                this.$toast.error('No tiene permiso de lectura')
        },
        methods:{
            async getSubmodulos(){
                await axios.get('http://10.147.17.173:5000/submodulos',{ headers:{ Authorization: 'Bearer ' + getAccessToken() }
                }).then(response => {
                    this.submodulos = response.data;
                }).catch(e => {
                    this.$toast.error(e.response.data.detail)
                })
            },
            async getPermiso(permisoId){
                await axios.get(`http://10.147.17.173:5000/permiso/${permisoId}`,{ headers:{ Authorization: 'Bearer ' + getAccessToken()}
                }) .then(response => {
                    this.permiso = response.data
                    this.form.submodulo = this.permiso.nombre_submodulo
                    this.form.crear = this.permiso.crear_autorizacion
                    this.form.leer = this.permiso.leer_autorizacion
                    this.form.editar = this.permiso.editar_autorizacion
                    this.form.eliminar = this.permiso.eliminar_autorizacion
                    this.form.id_submodulo = this.permiso.id_submodulo
                }) .catch(e => {
                    this.$toast.error(e.response.data.detail)
                })
            },
            async getPermisos(rolId){
                this.error = false,
                await axios.get(`http://10.147.17.173:5000/permisos/${rolId}`,{ headers:{ Authorization: 'Bearer ' + getAccessToken() }
                }).then(response => {
                    if(response.data != null ){
                        this.rol = response.data.nombre_rol
                        this.permisos = response.data.permisos
                    }else
                        this.error = true
                })
                .catch(e => {
                    this.$toast.error(e.response.data.detail)
                })
            },
            async crearPermiso(){
                if(this.crear){
                    var params = {
                        submodulos_id_submodulo: this.form.submodulo,
                        roles_id_rol: this.rolId,
                        crear_autorizacion: this.verificarCheck(this.form.crear),
                        editar_autorizacion: this.verificarCheck(this.form.editar),
                        eliminar_autorizacion: this.verificarCheck(this.form.eliminar),
                        leer_autorizacion: this.verificarCheck(this.form.leer),
                    }
                    await axios.post('http://10.147.17.173:5000/permiso', params,{ headers:{ Authorization: 'Bearer ' + getAccessToken() }
                    }).then(() => {
                        this.$toast.success('Permiso creado con éxito')
                        this.getPermisos(this.rolId)
                    }).catch (e => {
                         this.$toast.error(e.response.data.detail)
                    })
                }else{
                    this.$toast.error('No tiene permisos para agregar')
                }
            },
            async editarPermiso(permisoId){
                if(this.editar){
                    var params = {
                        submodulos_id_submodulo: this.form.id_submodulo,
                        roles_id_rol: this.rolId,
                        crear_autorizacion: this.verificarCheck2(this.form.crear),
                        editar_autorizacion: this.verificarCheck2(this.form.editar),
                        eliminar_autorizacion: this.verificarCheck2(this.form.eliminar),
                        leer_autorizacion: this.verificarCheck2(this.form.leer),
                    }
                    await axios.put(`http://10.147.17.173:5000/permiso/${permisoId}`, params,{ headers:{ Authorization: 'Bearer ' + getAccessToken() }
                    }).then(() => {
                        this.$toast.success('Permiso editado con éxito')
                        this.getPermisos(this.rolId)
                    }).catch (e => {
                        this.$toast.error(e.response.data.detail)
                    })
                }else{
                    this.$toast.error('No tiene permisos para modificar')
                }
            },
            async eliminarPermiso(permisoId){
                if(this.eliminar){
                    await axios.delete(`http://10.147.17.173:5000/permiso/${permisoId}`,{ headers:{ Authorization: 'Bearer ' + getAccessToken() }
                    }).then(() => {
                        this.$toast.success('Permiso eliminado con éxito')
                        this.getPermisos(this.rolId)
                    }).catch (e => {
                        this.$toast.error(e.response.data.detail)
                    })
                }else{
                    this.$toast.error('No tiene permisos para eliminar')
                }
            },
            verificarCheck(check){
                if(check =='')
                    return false
                else
                    return true
            },
            verificarCheck2(check){
                if(check == 'false')
                    return false
                else
                    return true
            },
            validarForm() {
                const valid = this.$refs.submod_select.checkValidity()
                this.form.subState = valid
                if(valid == false)
                    return false
                else
                    return true
            },
            handleOk(bvModalEvt, permisoId){
                bvModalEvt.preventDefault()
                this.handleSubmit(permisoId)
            },
            handleSubmit(permisoId) {
                if (!this.validarForm())
                    return
                if(this.titleBtn == 'Agregar')
                    this.crearPermiso()
                else
                    this.editarPermiso(permisoId)
                this.$nextTick(() => {
                    this.closeModal()
                })
            },
            onReset(){
                this.form.submodulo = ''
                this.form.leer =''
                this.form.crear =''
                this.form.editar=''
                this.form.eliminar =''
                this.form.subState = null
            },
            closeModal(){
                this.$bvModal.hide('permission-modal')
            },
            openModal(permisoId, action){
                this.$bvModal.show('permission-modal')
                this.onReset()
                if(action == 'editar'){
                    this.getPermiso(permisoId)
                    this.editId = permisoId
                    this.title = 'Editar Permiso'
                    this.titleBtn = 'Actualizar'
                }else{
                    this.getSubmodulos()
                    this.title='Añadir Nuevo Permiso'
                    this.titleBtn = 'Agregar'
                }
            },
            showModalDelete(permisoId){
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
                        this.eliminarPermiso(permisoId)
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
        }
    }
</script>