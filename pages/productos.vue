<template>
    <div class="g-sidenav-show bg-gray-100 vh-completa" id='mainDashboard'> 
        <Sidebar />
        <Navbar :Modulo='"Inventario"' :Tabla='"Productos"'/>
        <CheckToken />
        <main class="main-content position-relative max-height-vh-100 mt-1 border-radius-lg media-left">
            <div class="container-fluid py-4">
                <div class="row">
                    <div class="col-12">
                        <div class="card mb-4">
                            <div class="card-header pb-0">
                                 <div class="d-lg-flex">
                                    <div>
                                        <h5>Productos</h5>
                                    </div>
                                    <div class="ms-auto my-auto mt-lg-0 mt-4" v-if="crear">
                                        <div class="ms-auto my-auto">
                                            <nuxt-link :to="{name:'nuevoProducto'}" class="btn bg-gradient-primary btn-sm mb-0">
                                            +&nbsp; Nuevo Producto
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
                                            <div>
                                                <div class="input-group mb-3">
                                                    <b-form-input type="text" trim class="form-control" @onchange="buscar()" placeholder='Buscar' v-model="textoBuscar"></b-form-input>
                                                    <div class="input-group-append">
                                                        <span v-show="this.mostrar" style="border-top-right-radius: 8px; border-bottom-right-radius: 8px;" class="input-group-text" @click="buscar()">
                                                           <b-icon icon='search'></b-icon>
                                                        </span>
                                                        <span v-show="!this.mostrar" style="border-top-right-radius: 8px; border-bottom-right-radius: 8px;"  class="input-group-text" @click="limpiarBuscar()">
                                                           <b-icon icon='x'></b-icon>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="dataTable-container">
                                            <table id='content-table' class="table table-flush dataTable-table">
                                                <thead>
                                                    <tr>
                                                        <th class="text-uppercase text-secondary text-xs font-weight-bolder opacity-7">ID</th>
                                                        <th class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7">Imagen</th>
                                                        <th class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7 ps-2">Nombre</th>
                                                        <th class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7">Detalle</th>
                                                        <th class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7">Marca</th>
                                                        <th class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7">Cantidad</th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-if="error">
                                                        <td colspan="7" class="text-center align-middle">
                                                            <h6 class="ms-3 mb-2 text-sm text-center mt-4">No existen registros</h6> 
                                                        </td>       
                                                    </tr>
                                                    <tr v-for="product in paginador(this.productos)">
                                                        <td class="align-middle">
                                                            <h6 class=" ms-3 mb-2 text-sm">{{product.id_producto}}</h6>
                                                        </td>
                                                        <td  class="align-middle text-center text-sm">
                                                           <b-img thumbnail :src="`http://10.147.17.173:5002/productos/images_small/${product.id_producto}/${product.imagen_producto[0]}`"></b-img>
                                                        </td>
                                                        <td class="align-middle text-center text-sm">
                                                            <p class="text-sm font-weight-bold mb-0">{{product.nombre_producto}}</p>
                                                        </td>
                                                        <td class="align-middle text-center text-sm">
                                                            <p class="text-sm font-weight-bold mb-0">{{product.detalle_producto}}</p>
                                                        </td>
                                                        <td class="align-middle text-center text-sm">
                                                            <p class="text-sm font-weight-bold mb-0">{{product.marca_producto}}</p>
                                                        </td>
                                                        <td class="align-middle text-center text-sm">
                                                            <p class="text-sm font-weight-bold mb-0">{{product.cantidad_producto}}</p>
                                                        </td>
                                                        <td class="align-middle">
                                                            <div class="contenedorAcciones" >
                                                                <div v-if="editar">
                                                                    <nuxt-link :to="{name:'producto-productId',params:{productId: product.id_producto}}">
                                                                        <b-icon  class='mx-3' icon='pencil-square' style="width: 1.2em; height: 1.2em"></b-icon>
                                                                    </nuxt-link>
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
                                                :total-rows="this.productos.length"
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
    import CheckToken from '~/components/checkToken.vue';
    import { getAccessToken, getSubmodulos } from '~/utils/auth';
    
    export default{
        components: { Sidebar, Navbar, CheckToken },
        middleware: 'authenticated',
        data(){
            return{
                imagenes:[],
                permisosCrud:[],
                productos:[],
                crear:null,
                editar:null,
                error:false,
                pagActual:1,
                porPag:10,
                textoBuscar:'',
                mostrar:true,
            }
        },
        async mounted(){
            this.permisosCrud = getSubmodulos('Inventario','Productos')
            if('crear' in this.permisosCrud)
                this.crear = true
            if('editar' in this.permisosCrud)
                this.editar = true
            if('leer' in this.permisosCrud)
                this.getProductos()
            else
                this.$toast.error('No tiene permiso de lectura')
        },
        methods:{
            async getProductos(){
                await axios.get('http://10.147.17.173:5002/productos',{ headers:{ Authorization: 'Bearer ' + getAccessToken() }
                }).then(response => {
                    if(response.data !=null)
                        this.productos = response.data
                    else
                        this.error=true
                }).catch (e=> {
                    this.$toast.error(e.response.data.detail)
                })
            },

            buscar(){
                if(this.textoBuscar !== '')
                    this.mostrar = false
                const texto = this.textoBuscar
                this.buscarProductos(texto)
            },
            
            limpiarBuscar(){
                this.textoBuscar = ''
                this.mostrar = true
                this.getProductos()
            },

            async buscarProductos(texto){
                if(this.textoBuscar === '')
                    this.getProductos()
                else{
                    await axios.get(`http://10.147.17.173:5002/productos/findByWord/${texto}`,{ headers:{ Authorization: 'Bearer ' + getAccessToken() }
                    }).then((response) => {
                        console.log(response.data)
                        this.productos = response.data
                    }).catch (e => {
                        this.$toast.error(e.response.data.detail)
                    })
                }
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