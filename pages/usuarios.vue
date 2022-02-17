<template>
    <div class="g-sidenav-show bg-gray-10 vh-completa" id='mainDashboard'> 
        <Sidebar />
        <Navbar :Modulo='"Administracion"' :Tabla='"Usuarios"'/>
        <main class="main-content position-relative max-height-vh-100 mt-1 border-radius-lg media-left">
            <div class="container-fluid py-4">
                <div class="row">
                    <div class="col-12">
                        <div class="card mb-4">
                            <div class="card-header pb-0">
                                 <div class="d-lg-flex">
                                    <div>
                                        <h5>Usuarios</h5>
                                    </div>
                                    <div class="ms-auto my-auto mt-lg-0 mt-4">
                                        <div class="ms-auto my-auto">
                                            <a href='./usuario/nuevo' class="btn bg-gradient-primary btn-sm mb-0"> +&nbsp; Nuevo usuario</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body px-0 pt-0 pb-2">
                                <div class="table-responsive p-0">
                                    <div class="dataTable-wrapper dataTable-loading no-footer sortable searchable fixed-columns">
                                        <div class="dataTable-top">
                                            <div class="dataTable-dropdown">
                                                <label>
                                                    <select class="dataTable-selector">
                                                        <option value="5">5</option>
                                                        <option value="10">10</option>
                                                        <option value="15">15</option>
                                                    </select>
                                                    Entradas por pagina
                                                </label>
                                            </div>
                                        </div>
                                        <div class="dataTable-container">
                                            <table class="table table-flush dataTable-table">
                                                <thead>
                                                    <tr>
                                                    <th class="text-uppercase text-secondary text-xs font-weight-bolder opacity-7">ID</th>
                                                    <th class="text-uppercase text-secondary text-xs font-weight-bolder opacity-7 ps-2">Nombre</th>
                                                    <th class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7">Rol</th>
                                                    <th class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7">Estado</th>
                                                    <th class="text-secondary opacity-7"></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="user in this.usuarios">
                                                        <td>
                                                            <h6 class=" ms-3 mb-2 text-sm">{{user.id_usuario}}</h6>
                                                        </td>
                                                        <td>
                                                            <p class="text-s font-weight-bold mb-0">{{user.nombre_usuario}}</p>
                                                        </td>
                                                        <td class="align-middle text-center text-sm">
                                                            <p class="text-s font-weight-bold mb-0">{{user.roles_id_rol}}</p>
                                                        </td>
                                                        <td class="align-middle text-center text-sm">
                                                            <span class="badge badge-sm bg-gradient-success">{{user.estado_usuario}}</span>
                                                        </td>
                                                        <td class="align-middle">
                                                            <div class="contenedorAcciones">
                                                                <NuxtLink class="text-secondary font-weight-bold text-xs" :to="{name:'usuario-usuarioId', params:{usuarioId: user.id_usuario}}">
                                                                    <b-icon  class="icon" icon='pencil-square' style="width: 22px; height: 22px;"></b-icon>
                                                                </NuxtLink>
                                                                    <b-icon class="icon" icon='trash' style="width: 22px; height: 22px;"></b-icon>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div class="dataTable-bottom">
                                            <div class="dataTable-info">1 de 7 </div>
                                            <nav class="dataTable-pagination">
                                                <ul class="dataTable-pagination-list">
                                                    <li class="pager">
                                                        <a>‹</a>
                                                    </li>
                                                    <li class="active">
                                                        <a>1</a>
                                                    </li>
                                                    <li class="pager">
                                                        <a>2</a>
                                                    </li>
                                                    <li class="pager">
                                                        <a>3</a>
                                                    </li>
                                                    <li class="pager">
                                                        <a>›</a>
                                                    </li>
                                                </ul>
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
    axios.defaults.baseURL ='http://10.147.17.173:5000';
    
    export default{
        data() {
            return {
                usuarios:[]
            };
        },
        async mounted(){
            await axios.get('/usuarios')
            .then(response => {
                this.usuarios = response.data;
                console.log(this.usuarios);
            });
        },
        methods: {},
        components: { Sidebar, Navbar }
    }
</script>
