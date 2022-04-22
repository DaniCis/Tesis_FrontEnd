<template>
    <div class="g-sidenav-show bg-gray-100 vh-completa" id='mainDashboard'> 
        <Sidebar />
        <Navbar :Modulo='"Inventario"' :Tabla='"Bodega"'/>
        <main class="main-content position-relative max-height-vh-100 mt-1 border-radius-lg media-left">
            <div class="container-fluid py-4">
                <div class="row">
                    <div class="col-12">
                        <div class="card mb-4">
                            <div class="card-header pb-0">
                                 <div class="d-lg-flex">
                                    <div>
                                        <h5>Items</h5>
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
                                                        <th class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7 ps-2">Producto Asociado</th>
                                                        <th class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7">PVP</th>
                                                        <th class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7">PVD</th>
                                                        <th class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7">Num Serie</th>
                                                        <th class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7">Descuento</th>
                                                        <th class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7">Estado</th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-if="error">
                                                        <td colspan="7" class="text-center align">
                                                            <h6 class="ms-3 mb-2 text-sm text-center mt-4">No existen registros</h6> 
                                                        </td>       
                                                    </tr>
                                                    <tr v-for="item in paginador(this.items)">
                                                        <td>
                                                            <h6 class=" ms-3 mb-2 text-sm">{{item.id_item}}</h6>
                                                        </td>
                                                        <td class="align-middle text-center text-sm">
                                                            <p class="text-s font-weight-bold mb-0">{{item.nombre_producto}}</p>
                                                        </td>
                                                        <td class="align-middle text-center text-sm">
                                                            <p class="text-s font-weight-bold mb-0">{{item.pvp_item}}</p>
                                                        </td>
                                                        <td class="align-middle text-center text-sm">
                                                            <p class="text-s font-weight-bold mb-0">{{item.pvd_item}}</p>
                                                        </td>
                                                        <td class="align-middle text-center text-sm">
                                                            <p class="text-s font-weight-bold mb-0">{{item.numeroSerie_item}}</p>
                                                        </td>
                                                        <td class="align-middle text-center text-sm">
                                                            <p class="text-s font-weight-bold mb-0">%{{item.descuentoPorcentaje_item}}</p>
                                                        </td>
                                                        <td class="align-middle text-center text-sm">
                                                            <div v-if="item.estado_item == 'Disponible'"> 
                                                                <span class="badge badge-sm bg-gradient-success">Disponible</span>
                                                            </div>
                                                            <div v-else>
                                                                <span class="badge badge-sm bg-gradient-danger">Vendido</span>
                                                            </div>
                                                        </td>
                                                        <td class="align-middle">
                                                            <div class="contenedorAcciones" >
                                                                <div v-if="editar">
                                                                    <a class="cursor-pointer" @click="openModal(item.id_item)">
                                                                        <b-icon  class='mx-3' icon='pencil-square' style="width: 1.2em; height: 1.2em"></b-icon>
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
                                                :total-rows="this.items.length"
                                                :per-page="porPag"
                                                ></b-pagination>
                                            </nav>
                                        </div>
                                    </div>
                                </div>
                                <b-modal id="item-modal" title="Editar Item"  cancel-title='Cancelar' ok-title="Actualizar" @ok="handleOk($event)">
                                    <b-form @submit.stop.prevent="handleSubmit()">
                                        <div class="row mt-2">
                                            <div class="col-10 ">
                                                <b-form-group 
                                                    label="Producto Asociado" 
                                                    label-for="name-input">
                                                    <b-form-input  
                                                        id="name-input" class="form-control" type="text"
                                                        v-model="form.producto" readonly>
                                                    </b-form-input>
                                                </b-form-group>
                                            </div>
                                        </div>
                                        <div class="row mt-2">
                                            <div class="col-10 col-md-5">
                                                <b-form-group 
                                                    label="PVP $"  
                                                    label-for="pvp-input"
                                                    invalid-feedback="Este campo es requerido" 
                                                    :state="form.pvpState">
                                                    <b-form-input  :state="form.pvpState" required ref='pvp_input'
                                                        id="pvp-input" class="form-control" type="number" step='any' v-model="form.pvp">
                                                    </b-form-input>
                                                </b-form-group>
                                            </div>
                                            <div class="col-10 col-md-5">
                                                <b-form-group 
                                                    label="PVD $" 
                                                    label-for="pvd-input"
                                                    invalid-feedback="Este campo es requerido" 
                                                    :state="form.pvdState">
                                                    <b-form-input  :state="form.pvdState" required ref='pvd_input'
                                                        id="pvd-input" class="form-control" type="number" step='any' v-model="form.pvd">
                                                    </b-form-input>
                                                </b-form-group>
                                            </div>
                                        </div>
                                        <div class="row mt-2">
                                            <div class="col-10 col-md-5">
                                                <b-form-group 
                                                    label="Número de Serie" 
                                                    label-for="num-input"
                                                    invalid-feedback="Este campo es requerido" 
                                                    :state="form.numeroSerieState">
                                                    <b-form-input  :state="form.numeroSerieState" required ref='num_input'
                                                        id="num-input" class="form-control" type="text" v-model="form.numeroSerie"
                                                        style='height: 42px'>
                                                    </b-form-input>
                                                </b-form-group>
                                            </div>
                                            <div class="col-10 col-md-5 ">
                                                <b-form-group 
                                                    label="Descuento" 
                                                    label-for="des-input"
                                                    invalid-feedback="Este campo es requerido" 
                                                    :state="form.descuentoState">
                                                    <b-input-group prepend="%">
                                                        <b-form-input  :state="form.descuentoState" ref='desct_input' required
                                                            id="des-input" class="form-control" type="number" min='0' v-model="form.descuento"
                                                            style='height: 42px'>
                                                        </b-form-input>
                                                    </b-input-group>
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
                form:{
                    id:'',
                    producto:'',
                    pvp:'',
                    pvpState:null,
                    pvd:'',
                    pvdState:null,
                    numeroSerie:'',
                    numeroSerieState:null,
                    descuento:'',
                    descuentoState:null,
                },
                item:[],
                permisosCrud:[],
                items:[],
                editar:null,
                error:false,
                pagActual:1,
                porPag:20,
                itemId:'',
            }
        },
        async mounted(){
            this.permisosCrud = getSubmodulos('Inventario','Bodega')
            if('editar' in this.permisosCrud)
                this.editar = true
            if('leer' in this.permisosCrud)
                this.getItems()
            else
                this.$toast.error('No tiene permiso de lectura')
        },
        methods:{
            async getItems(){
                await axios.get('http://10.147.17.173:5002/items',{ headers:{ Authorization: 'Bearer ' + getAccessToken() }
                }).then(response => {
                    if(response.data !=null)
                        this.items = response.data
                    else
                        this.error=true
                }).catch (e=> {
                    this.$toast.error(e.response.data.detail)
                })
            },
            async getItem(itemId){
                await axios.get(`http://10.147.17.173:5002/item/${itemId}`,{ headers:{ Authorization: 'Bearer ' + getAccessToken() }
                }).then(response => {
                    this.form.id = response.data.id_item
                    this.form.producto = response.data.nombre_producto
                    this.form.pvp = response.data.pvp_item.slice(1)
                    this.form.pvd = response.data.pvd_item.slice(1)
                    this.form.numeroSerie = response.data.numeroSerie_item
                    this.form.descuento = response.data.descuentoPorcentaje_item
                })
                .catch(e => {
                     this.$toast.error(e.response.data.detail)
                })
            },

            validarForm(){
                const valid = this.$refs.desct_input.checkValidity()
                const valid2 = this.$refs.pvp_input.checkValidity()
                const valid3 = this.$refs.pvd_input.checkValidity()
                const valid4 = this.$refs.num_input.checkValidity()
                this.form.descuentoState = valid
                this.form.pvpState = valid2
                this.form.pvdState = valid3
                this.form.numeroSerieState = valid4
                if(valid == false || valid2 == false || valid3 == false || valid4 == false )
                    return false
                else 
                    return true
            },

            async editarItem(itemId){
                if(this.editar){
                    var params = {
                        pvp_item:parseFloat(this.form.pvp).toFixed(2),
                        pvd_item:parseFloat(this.form.pvd).toFixed(2),
                        numeroSerie_item:this.form.numeroSerie,
                        descuentoPorcentaje_item: parseInt(this.form.descuento)
                    }
                    console.log(params)
                    await axios.put(`http://10.147.17.173:5002/item/${itemId}`, params, { headers:{ Authorization: 'Bearer ' + getAccessToken() }
                    }).then(() => {
                        this.$toast.success('Item editado con éxito')
                        this.getItems()
                    }).catch (e => {
                        this.$toast.error(e.response.data.detail)
                    })
                }else{
                    this.$toast.error('No tiene permisos para modificar')
                }
            },

            closeModal(){
                this.$bvModal.hide('item-modal')
            },

            openModal(itemId){
                this.$bvModal.show('item-modal')
                this.onReset()
                this.getItem(itemId)
                this.itemId = itemId
            },

            handleOk(bvModalEvt){
                bvModalEvt.preventDefault()
                this.handleSubmit()
            },
            
            handleSubmit() {
                if (!this.validarForm())
                    return
                this.editarItem(this.itemId)
                this.$nextTick(() => {
                    this.closeModal()
                })
            },

            onReset(){
                this.form.pvp = ''
                this.form.pvpState = null
                this.form.pvd = ''
                this.form.pvdState = null
                this.form.descuentoState = null
                this.form.descuento =''
                this.form.numeroSerie =''
                this.form.numeroSerieState = null
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