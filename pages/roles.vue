<template>
    <div class="g-sidenav-show  bg-gray-100 vh-completa" id='mainDashboard'> 
        <Sidebar />
        <Navbar :Modulo='"Administracion"' :Tabla='"Roles"'/>
        <main class="main-content position-relative max-height-vh-100  mt-1 border-radius-lg media-left">
            <div class="container-fluid py-4">
                <div class="row">
                    <div class="col-12">
                        <div class="card mb-4">
                            <div class="card-header pb-0">
                                <h6>Roles</h6>
                            </div>
                            <div class="card-body px-0 pt-0 pb-2">
                                <br>
                                <div class="table-responsive p-0">
                                    <table class="table align-items-center mb-0">
                                    <thead>
                                        <tr>
                                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">ID</th>
                                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Nombre</th>
                                        <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Descripcion</th>
                                        <th class="text-secondary opacity-7"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="rol in this.roles">
                                            <td>
                                            <h6 class=" ms-3 mb-2 text-sm">{{rol.id_rol}}</h6>
                                            </td>
                                            <td>
                                                <p class="text-s font-weight-bold mb-0">{{rol.nombre_rol}}</p>
                                            </td>
                                            <td class="align-middle text-center text-sm">
                                                <p class="text-s font-weight-bold mb-0">{{rol.descripcion_rol}}</p>
                                            </td>
                                            <td class="align-middle">
                                                <div class="contenedorAcciones">
                                                    <NuxtLink class="text-secondary font-weight-bold text-xs" :to="{name:'rol-rolId', params:{rolId: rol.id_rol}}">
                                                    <b-icon icon='pencil-square' style="width: 1.4em; height: 1.4em;"></b-icon>
                                                    </NuxtLink>
                                                    <b-icon icon='trash' style="width: 1.1em; height: 1.1em;"></b-icon>
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
            roles: []
        };
    },
    async mounted(){
        await axios.get('/roles')
        .then(response => {
            this.roles = response.data;
            console.log(this.roles);
        });
    },
    methods: {},
    components: { Sidebar, Navbar }
}
</script>

<style>
    .contenedorAcciones{
        display: flex;
        justify-content: space-evenly
    }
</style>