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
                                <h6>Usuarios</h6>
                            </div>
                            <div class="card-body px-0 pt-0 pb-2">
                                <div class="table-responsive p-0">
                                    <table class="table align-items-center mb-0">
                                    <thead>
                                        <tr>
                                        <th class="text-uppercase text-secondary text-xs font-weight-bolder opacity-7">ID</th>
                                        <th class="text-uppercase text-secondary text-xs font-weight-bolder opacity-7 ps-2">Nombre</th>
                                        <th class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7">Rol</th>
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
                                                <span class="badge badge-sm bg-gradient-success">{{user.roles_id_rol}}</span>
                                            </td>
                                            <td class="align-middle">
                                                <div class="contenedorAcciones">
                                                    <NuxtLink class="text-secondary font-weight-bold text-xs" :to="{name:'usuario-usuarioId', params:{usuarioId: user.id_usuario}}">
                                                        <span class="badge badge-sm bg-gradient-secondary" style="padding:6.6px 10px;">
                                                            <b-icon icon='pencil-square' style="width: 20px; height: 20px;"></b-icon>
                                                        </span>
                                                    </NuxtLink>
                                                    <span class="badge badge-sm bg-gradient-danger">
                                                        <b-icon icon='trash' style="width: 20px; height: 20px;"></b-icon>
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                    </table>
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
