<template>
    <div class="g-sidenav-show bg-gray-100 vh-completa" id='mainDashboard'> 
        <Sidebar />
        <Navbar :Modulo='"Ventas"' :Tabla='"Clientes"'/>
        <main class="main-content position-relative max-height-vh-100 mt-1 border-radius-lg media-left">
            <div class="container-fluid py-4">
                <div class="row">
                    <div class="col-12">
                        <div class="card mb-4">
                            <div class="card-header pb-0">
                                 <div class="d-lg-flex">
                                    <div>
                                        <h5>Clientes</h5>
                                    </div>
                                    <div class="ms-auto my-auto mt-lg-0 mt-4" v-if="crear">
                                        <div class="ms-auto my-auto">
                                            <nuxt-link :to="{name:'nuevoCliente'}" class="btn bg-gradient-primary btn-sm mb-0">
                                            +&nbsp; Nuevo Cliente
                                            </nuxt-link>
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
                                                        <th class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7">Tipo Ident.</th>
                                                        <th class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7 ps-2">Num Ident.</th>
                                                        <th class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7">Nombre</th>
                                                        <th class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7">Dirección</th>
                                                        <th class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7">Teléfono</th>
                                                        <th class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7">Correo</th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-if="error">
                                                        <td colspan="7" class="text-center align-middle">
                                                            <h6 class="ms-3 mb-2 text-sm text-center mt-4">No existen registros</h6> 
                                                        </td>       
                                                    </tr>
                                                    <tr v-for="cliente in paginador(this.clientes)">
                                                        <td>
                                                            <h6 class=" ms-3 mb-2 text-sm">{{cliente.id_cliente}}</h6>
                                                        </td>
                                                        <td class="align-middle text-center text-sm">
                                                            <div v-if="cliente.tipoIdentificacion_cliente == 'Cedula'" >
                                                                <p class="text-s font-weight-bold mb-0">Cédula</p>
                                                            </div>
                                                            <div v-else>
                                                                <p class="text-s font-weight-bold mb-0">RUC</p>
                                                            </div>
                                                        </td>
                                                        <td class="align-middle text-center text-sm">
                                                            <p class="text-s font-weight-bold mb-0">{{cliente.identificacion_cliente}}</p>
                                                        </td>
                                                        <td class="align-middle text-center text-sm">
                                                            <p class="text-s font-weight-bold mb-0">{{cliente.nombre_cliente}}</p>
                                                        </td>
                                                        <td class="align-middle text-center text-sm">
                                                            <p class="text-s font-weight-bold mb-0">{{cliente.direccion_cliente}}</p>
                                                        </td>
                                                        <td class="align-middle text-center text-sm">
                                                            <p class="text-s font-weight-bold mb-0">{{cliente.telefono_cliente}}</p>
                                                        </td>
                                                        <td class="align-middle text-center text-sm">
                                                            <p class="text-s font-weight-bold mb-0">{{cliente.correo_cliente}}</p>
                                                        </td>
                                                        <td class="align-middle">
                                                            <div class="contenedorAcciones" >
                                                                <div v-if="editar">
                                                                    <nuxt-link :to="{name:'cliente-clienteId',params:{clienteId: cliente.id_cliente}}">
                                                                        <b-icon  class='mx-3' icon='pencil-square' style="width: 1.2em; height: 1.2em"></b-icon>
                                                                    </nuxt-link>
                                                                </div>
                                                                <div v-if="eliminar">
                                                                    <a class="trash cursor-pointer"  @click='showModalDelete(cliente.id_cliente)'>
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
                                                :total-rows="this.clientes.length"
                                                :per-page="porPag"
                                                ></b-pagination>
                                            </nav>
                                        </div>
                                    </div>
                                </div>
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
                clientes:[],
                crear:null,
                editar:null,
                eliminar:null,
                error:false,
                pagActual:1,
                porPag:10,
                confirm: '',
            }
        },
        async mounted(){
            this.permisosCrud = getSubmodulos('Ventas','Clientes')
            if('crear' in this.permisosCrud)
                this.crear = true
            if('editar' in this.permisosCrud)
                this.editar = true
            if('eliminar' in this.permisosCrud)
                this.eliminar = true
            if('leer' in this.permisosCrud)
                this.getClientes()
            else
                this.$toast.error('No tiene permiso de lectura')
        },
        methods:{
            async getClientes(){
                await axios.get('http://10.147.17.173:5004/clientes',{ headers:{ Authorization: 'Bearer ' + getAccessToken() }
                }).then(response => {
                    if(response.data !=null)
                        this.clientes = response.data
                    else
                        this.error=true
                }).catch (e=> {
                    this.$toast.error(e.response.data.detail)
                })
            },

            async eliminarCliente(clienteId){
                if(this.eliminar){
                    await axios.delete(`http://10.147.17.173:5004/clientes/${clienteId}`,{ headers:{ Authorization: 'Bearer ' + getAccessToken() }
                    }).then(() => {
                        this.$toast.success('Cliente eliminado con éxito')
                        this.getClientes()
                    }).catch (e => {
                        this.$toast.error(e.response.data.detail)
                    })
                }else{
                    this.$toast.error('No tiene permisos para eliminar')
                }
            },

            showModalDelete(clienteId){
                this.confirm = ''
                this.$bvModal.msgBoxConfirm('¿Está seguro que desea cambiar el estado del usuario?', {
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
                        this.eliminarCliente(clienteId)
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