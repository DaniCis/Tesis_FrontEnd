<template>
    <div class="g-sidenav-show bg-gray-10 vh-completa" id='mainDashboard'> 
        <Sidebar />
        <Navbar :Modulo='"Garantías"' :Tabla='"Bodega"'/>
        <main class="main-content position-relative max-height-vh-100 mt-1 border-radius-lg media-left">
            <div class="container-fluid py-4">
                <div class="row">
                    <div class="col-12">
                        <div class="card mb-4">
                            <div class="card-header pb-0">
                                 <div class="d-lg-flex">
                                    <div>
                                        <h5>Garantías</h5>
                                    </div>
                                    <div class="ms-auto my-auto mt-lg-0 mt-4" v-if="crear">
                                        <div class="ms-auto my-auto">
                                            <a @click="openModal(null, 'agregar')" class="btn bg-gradient-primary btn-sm mb-0"> +&nbsp; Nueva Garantía</a>
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
                                            <table id='content-table' class="table table-flush dataTable-table">
                                                <thead>
                                                    <tr>
                                                        <th class="text-uppercase text-secondary text-xs font-weight-bolder opacity-7">ID</th>
                                                        <th class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7">Item</th>
                                                        <th class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7">Cliente</th>
                                                        <th class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7 ps-2">Fecha de Entrada</th>
                                                        <th class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7">Detalle</th>
                                                        <th class="text-secondary opacity-7"></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-if="error">
                                                        <td colspan="4">
                                                            <h6 class="ms-3 mb-2 text-sm text-center">No existen registros</h6> 
                                                        </td>       
                                                    </tr>
                                                    <tr v-for="garantia in paginador(this.garantias)">
                                                        <td>
                                                            <h6 class=" ms-3 mb-2 text-sm">{{garantia.id_garantia}}</h6>
                                                        </td>
                                                        <td class="align-middle text-center text-sm">
                                                            <p class="text-s font-weight-bold mb-0">{{garantia.inventario.id_item}}</p>
                                                        </td>
                                                        <td class="align-middle text-center text-sm">
                                                            <p class="text-s font-weight-bold mb-0">{{garantia.clientes.id_cliente}}</p>
                                                        </td>
                                                        <td class="align-middle text-center text-sm">
                                                            <p class="text-s font-weight-bold mb-0">{{garantia.fechaEntrada_garantia}}</p>
                                                        </td>
                                                        <td class="align-middle text-center text-sm">
                                                            <p class="text-s font-weight-bold mb-0">{{garantia.detalle_garantia}}</p>
                                                        </td>
                                                        <td class="align-middle">
                                                            <div class="contenedorAcciones" >
                                                                <div v-if="editar">
                                                                    <a class="cursor-pointer" @click="openModal(garantia.id_garantia, 'editar')">
                                                                        <b-icon  class='mx-3' icon='pencil-square' style="width: 1.2em; height: 1.2em"></b-icon>
                                                                    </a>
                                                                </div>
                                                                <div v-if="eliminar">
                                                                    <a class="trash cursor-pointer"  @click='showModalDelete(garantia.id_garantia)'>
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
                                                :total-rows="this.garantias.length"
                                                :per-page="porPag"
                                                ></b-pagination>
                                            </nav>
                                        </div>
                                    </div>
                                </div>
                                <b-modal id="garantia-modal" :title="title"  cancel-title='Cancelar' :ok-title="titleBtn" @ok="handleOk($event,editId)">
                                    <b-form @submit.stop.prevent="handleSubmit(editId)">
                                        <div class="row mt-2">
                                            <div class="col-12 col-md-8">
                                                <b-form-group v-if="titleBtn =='Agregar'"
                                                    label="Producto Asociado" 
                                                    label-for="product-select" 
                                                    invalid-feedback="Seleccione un producto" 
                                                    :state="form.productoState">
                                                    <select 
                                                        id="product-select" v-model="form.producto" class="form-select" ref='product_select' :state="form.productoState" required>
                                                        <option disabled :value='null'> Seleccione</option>
                                                        <option v-for="product in this.productos" :value="product.id_producto">
                                                            {{product.nombre_producto}}
                                                        </option>
                                                    </select>
                                                </b-form-group>
                                                <b-form-group v-else
                                                    label="Producto Asociado" 
                                                    label-for="product-select" >
                                                   <select id="product-select" v-model="form.producto" class="form-select" ref='product_select' :state="form.productoState">
                                                        <option v-for="product in this.productos" :value="product.id_producto">
                                                            {{product.nombre_producto}}
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

    export default{
        components: { Sidebar, Navbar },
        middleware: 'authenticated',
        data(){
            return{
                permisosCrud:[],
                garantias:[],
                crear:null,
                editar:null,
                eliminar:null,
                editId:null,
                error:false,
                confirm: '',
                title:'',
                titleBtn:'',
                pagActual:1,
                porPag:10,
            }
        },
        async mounted(){
            this.permisosCrud = getSubmodulos('Garantías','Garantías')
            if('crear' in this.permisosCrud)
                this.crear = true
            if('editar' in this.permisosCrud)
                this.editar = true
            if('eliminar' in this.permisosCrud)
                this.eliminar = true
            if('leer' in this.permisosCrud)
                this.getGarantias()
            else
                this.$toast.error('No tiene permiso de lectura')
        },
        methods:{
            async getGarantias(){
                await axios.get('http://10.147.17.173:5002/garantias',{ headers:{ Authorization: 'Bearer ' + getAccessToken() }
                }).then(response => {
                    console.log(response.data)
                    if(response.data !=null)
                        this.garantias = response.data
                    else
                        this.error=true
                }).catch (e=> {
                    this.$toast.error(e.response.data.detail)
                })
            },
            async getGarantia(garantiaId){
                await axios.get(`http://10.147.17.173:5002/garantia/${garantiaId}`,{ headers:{ Authorization: 'Bearer ' + getAccessToken()}
                }) .then(response => {
                    this.user = response.data
                    this.form.nombre = response.data
                    this.form.rol = response.data
                }) .catch(e => {
                    this.$toast.error(e.response.data.detail)
                })
            },
            async crearGarantia(){
                if(this.crear){
                    var params = {
                        nombre_usuario: this.form.nombre,
                        password_usuario: this.form.password,
                        roles_id_rol:this.form.rol
                    }
                    await axios.post('http://10.147.17.173:5002/garantia', params,{ headers:{ Authorization: 'Bearer ' + getAccessToken() }
                    }).then(() => {
                        this.$toast.success('Garantía creado con éxito')
                        this.getGarantias()
                    }).catch (e => {
                        this.$toast.error(e.response.data.detail)
                    })
                }else{
                    this.$toast.error('No tiene permisos para agregar')
                }
            },
            async editarGarantia(garantiaId){
                if(this.editar){
                    var params ={

                    }
                    await axios.put(`http://10.147.17.173:5002/garantia/${garantiaId}/editarRol`, params ,{ headers:{ Authorization: 'Bearer ' + getAccessToken()}
                    }).then(() => {
                        this.$toast.success('Garantía editado con éxito')
                        this.getGarantias()
                    }).catch (e => {
                        this.$toast.error(e.response.data.detail)
                    })
                }else{
                    this.$toast.error('No tiene permisos para modificar')
                }
            },
            async eliminarGarantia(garantiaId){
                if(this.eliminar){
                    await axios.delete(`http://10.147.17.173:5002/garantia/${garantiaId}`,{ headers:{ Authorization: 'Bearer ' + getAccessToken() }
                    }).then(() => {
                        this.$toast.success('Garantía eliminado con éxito')
                        this.getGarantias()
                    }).catch (e => {
                        this.$toast.error(e.response.data.detail)
                    })
                }else{
                    this.$toast.error('No tiene permisos para eliminar')
                }
            },
            validarForm(){

            },
            handleOk(bvModalEvt, garantiaId){
                bvModalEvt.preventDefault()
                this.handleSubmit(garantiaId)
            },
            handleSubmit(garantiaId) {
                if (!this.validarForm())
                    return
                if(this.titleBtn == 'Agregar')
                    this.crearGarantia()
                else
                    this.editarGarantia(garantiaId)
                this.$nextTick(() => {
                    this.closeModal('garantia-modal')
                })
            },
            onReset(){

            },
            closeModal(name){
                this.$bvModal.hide(name)
            },
            openModal(garantiaId, action){
                this.$bvModal.show('garantia-modal')
                this.onReset()
                this.getProductos()
                this.getClientes()
                if(action == 'editar'){
                    this.getGarantia(garantiaId)
                    this.editId = garantiaId
                    this.title = 'Editar Garantía'
                    this.titleBtn = 'Actualizar'
                }else{
                    this.title='Añadir Nueva Garantía'
                    this.titleBtn = 'Agregar'
                }
            },
            showModalDelete(garantiaId){
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
                        this.eliminarGarantia(garantiaId)
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