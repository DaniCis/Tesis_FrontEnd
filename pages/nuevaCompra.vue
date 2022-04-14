<template>
    <div class="g-sidenav-show  bg-gray-100 vh-completa" id='mainDashboard'> 
        <Sidebar />
        <Navbar :Modulo='"Compras"' :Tabla='"Orden de Compra"'/>
        <main class="main-content position-relative max-height-vh-100 mt-1 border-radius-lg media-left">
            <div class="container-fluid py-4">
                <div class="row">
                    <div class="col-12">
                        <div class="card mb-4">
                            <div class="card-header pb-0">
                                <div class='text-sm'>
                                    <nuxt-link to='/compras'>
                                         <b-icon class='cursor-pointer' icon='arrow90deg-left' style="width: 1.3em; height: 1.3em"></b-icon> &nbsp;
                                        Regresar
                                    </nuxt-link>
                                </div>
                                <div class="d-lg-flex mt-4">
                                    <div>
                                        <h4>Nueva Orden de Compra</h4>
                                        <p class="text-sm">Agregar </p>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body px-0 pt-0 pb-2">
                                <b-form class="ps-4 mt-3 pe-4">
                                    <div class="row mt-2">
                                        <div class="col-12 col-md-8 col-lg-3">
                                            <b-form-group 
                                                label="Fecha" 
                                                label-for="fecha-input">
                                                <b-form-datepicker style="height: 38px;"
                                                id="fecha-input" locale="es" placeholder="Seleccione una fecha"></b-form-datepicker>
                                            </b-form-group>
                                        </div>
                                        <div class="col-12 col-md-8 col-lg-3">
                                            <b-form-group 
                                                label="Número de Factura" 
                                                label-for="factura-input">
                                                <b-form-input  
                                                    id="factura-input" class="form-control" type="text" placeholder="Factura"
                                                >
                                                </b-form-input>
                                            </b-form-group>
                                        </div>
                                        <div class="col-12 col-md-8 col-lg-3">
                                            <b-form-group 
                                                label="Proveedor" 
                                                label-for="proveedor-input">
                                                <b-form-input list="input-list" id="proveedor-input" placeholder="Seleccione un Proveedor"></b-form-input>
                                                <datalist id="input-list">
                                                    <option value="San Francisco"></option>
                                                    <option value="New York"></option>
                                                    <option value="Seattle"></option>
                                                    <option value="Los Angeles"></option>
                                                </datalist>
                                            </b-form-group>
                                        </div>
                                    </div>    
                                    <div class="d-lg-flex">
                                            <div class="ms-auto my-auto">
                                                <nuxt-link :to="{name:'nuevaCompra'}" class="btn bg-gradient-primary btn-sm mb-0">
                                                +&nbsp; Agregar productos
                                                </nuxt-link>
                                            </div>
                                    </div>                            
                                    <div class="table-responsive p-0 mt-4">
                                        <div class="dataTable-wrapper dataTable-loading no-footer sortable searchable fixed-columns">
                                            <div class="dataTable-container">
                                                <table class="table table-flush dataTable-table">
                                                    <thead>
                                                        <tr>
                                                            <th class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7">Producto</th>
                                                            <th class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7">PVP</th>
                                                            <th class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7">PVD</th>
                                                            <th class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7">Num Serie</th>
                                                            <th class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7">Desct.</th>
                                                            <th class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7">Precio Unit</th>
                                                            <th class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7">Cant.</th>
                                                            <th class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7">Precio</th>
                                                            <th class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7">Desct.</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td class="align-middle text-center text-sm">
                                                                <p class="text-sm font-weight-bold mb-0">hola</p>
                                                            </td>
                                                            <td class="align-middle text-center text-sm">
                                                                <p class="text-sm font-weight-bold mb-0">hola</p>
                                                            </td>
                                                            <td class="align-middle text-center text-sm">
                                                                <p class="text-sm font-weight-bold mb-0">hola</p>
                                                            </td>
                                                            <td class="align-middle text-center text-sm">
                                                                <p class="text-sm font-weight-bold mb-0">hola</p>
                                                            </td>
                                                            <td class="align-middle text-center text-sm">
                                                                <p class="text-sm font-weight-bold mb-0">hola</p>
                                                            </td>
                                                            <td class="align-middle text-center text-sm">
                                                                <p class="text-sm font-weight-bold mb-0">hola</p>
                                                            </td>
                                                            <td class="align-middle text-center text-sm">
                                                                <p class="text-sm font-weight-bold mb-0">hola</p>
                                                            </td>
                                                            <td class="align-middle text-center text-sm">
                                                                <p class="text-sm font-weight-bold mb-0">hola</p>
                                                            </td>
                                                            <td class="align-middle text-center text-sm">
                                                                <p class="text-sm font-weight-bold mb-0">hola</p>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row mt-4 d-lg-flex pe-4">
                                        <div class="col-12 col-md-8 col-lg-2 ms-auto my-auto">
                                            <b-form-group 
                                                label="Subtotal" 
                                                label-for="subtotal-input">
                                                <b-form-input  
                                                    id="subtotal-input" class="form-control" type="text" placeholder="Subtotal">
                                                </b-form-input>
                                            </b-form-group>
                                        </div>
                                        <div class="col-12 col-md-8 col-lg-2">
                                            <b-form-group 
                                                label="Descuento" 
                                                label-for="descuento-input">
                                                <b-form-input  
                                                    id="descuento-input" class="form-control" type="text" placeholder="Descuento">
                                                </b-form-input>
                                            </b-form-group>
                                        </div>
                                    </div>
                                    <div class="row mt-1 d-lg-flex pe-4">
                                        <div class="col-12 col-md-8 col-lg-2 ms-auto my-auto">
                                            <b-form-group 
                                                label="Total" 
                                                label-for="total-input">
                                                <b-form-input  
                                                    id="total-input" class="form-control" type="text" placeholder="Total">
                                                </b-form-input>
                                            </b-form-group>
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

    export default{
        components: { Sidebar, Navbar },
        middleware: 'authenticated',
        data(){
            return{
                crear:null,
            }
        },
        async mounted(){
            this.permisosCrud = getSubmodulos('Compras','OrdenCompra')
            if('crear' in this.permisosCrud)
                this.crear = true
        },
        methods:{

        },
    }
</script>