<template>
    <div class="g-sidenav-show bg-gray-100 vh-completa" id='mainDashboard'>
        <Sidebar/>
        <Navbar :Modulo='"Inicio"' :Tabla='"Dashboard"'/>
        <main class="main-content position-relative max-height-vh-100 mt-1 border-radius-lg media-left ps ps--active-y">
            <div class="container-fluid py-4">
                <div class="row">
                    <div class="mt-3 col-xl-5 col-sm-6 mb-xl-0 mb-4">
                        <div class="card">
                            <div class="card-body p-3">
                                <div class="row">
                                    <div class="col-9">
                                        <div class="numbers">
                                            <p class="mt-2 mb-1 text-capitalize font-weight-bold">Compras</p>
                                            <h5 class="font-weight-bolder mb-3">
                                            $53,000
                                            <span class="text-success text-sm font-weight-bolder">+55%</span>
                                            </h5>
                                        </div>
                                    </div>
                                    <div class="col-3 text-end">
                                        <div class="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mt-3 col-xl-5 col-sm-6 mb-xl-0 mb-4">
                        <div class="card">
                            <div class="card-body p-3">
                                <div class="row">
                                    <div class="col-9">
                                        <div class="numbers">
                                            <p class="mt-2 mb-1 text-capitalize font-weight-bold">Ventas</p>
                                            <h5 class="font-weight-bolder mb-3">
                                            2,300
                                            <span class="text-success text-sm font-weight-bolder">+3%</span>
                                            </h5>
                                        </div>
                                    </div>
                                    <div class="col-3 text-end">
                                        <div class="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mt-3 col-xl-5 col-sm-6 mb-xl-0 mb-4">
                        <div class="card">
                            <div class="card-body p-3">
                                <div class="row">
                                    <div class="col-9">
                                        <div class="numbers">
                                            <p class="mt-2 mb-1 text-capitalize font-weight-bold">New Clients</p>
                                            <h5 class="font-weight-bolder mb-3">
                                            +3,462
                                            <span class="text-danger text-sm font-weight-bolder">-2%</span>
                                            </h5>
                                        </div>
                                    </div>
                                    <div class="col-3 text-end">
                                        <div class="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mt-3 col-xl-5 col-sm-6">
                        <div class="card">
                            <div class="card-body p-3">
                                <div class="row">
                                    <div class="col-9">
                                        <div class="numbers">
                                            <p class="mt-2 mb-1 text-capitalize font-weight-bold">Sales</p>
                                            <h5 class="font-weight-bolder mb-3">
                                            $103,430
                                            <span class="text-success text-sm font-weight-bolder">+5%</span>
                                            </h5>
                                        </div>
                                    </div>
                                    <div class="col-3 text-end">
                                        <div class="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                                            
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
    axios.defaults.baseURL ='http://10.147.17.173:5001';

    export default {
        components: { Sidebar, Navbar }, 
        middleware: 'authenticated'
    }
</script>