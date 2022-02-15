<template>
    <div class="g-sidenav-show bg-gray-10 vh-completa" id='mainDashboard'>
        <Sidebar />
        <Navbar :Modulo='"Administracion"' :Tabla='"Autorizaciones"'/>
        <main class="main-content position-relative max-height-vh-100 mt-1 border-radius-lg media-left">
            <div class="container-fluid py-4">
                <div class="row">
                    <div class="col-12">
                        <div class="card mb-4">
                            <div class="card-header pb-0">
                                <h6>Autorizaciones</h6>
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
                                        <tr >
                                            <td>
                                                <h6 class=" ms-3 mb-2 text-sm">{{}}</h6>
                                            </td>
                                            <td>
                                                <p class="text-s font-weight-bold mb-0">{{}}</p>
                                            </td>
                                            <td class="align-middle text-center text-sm">
                                                <span class="badge badge-sm bg-gradient-success">{{}}</span>
                                            </td>
                                            <td class="align-middle">
                                                <div class="contenedorAcciones">
                                                    <NuxtLink class="text-secondary font-weight-bold text-xs" :to="{name:'usuario-usuarioId', params:{usuarioId: 1}}">
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
    import {getAccessToken} from "@/utils/auth";
    import axios from 'axios';
    import Sidebar from '~/components/Sidebar.vue'; 
    import Navbar from '~/components/Navbar.vue';
    axios.defaults.baseURL ='http://10.147.17.173:5000';

    export default{
        data(){
            return{
                autorizaciones:[]
            }
        },
         async mounted(){
            console.log(`Bearer ${getAccessToken()}`);
            await axios.get('/autorizaciones',{
                headers:{
                    Authorization: `Bearer ${getAccessToken()}`
                }
            }).then(response => {
                this.autorizaciones = response.data;
                console.log(this.autorizaciones);
            });
        },
        methods: {},
        components: { Sidebar, Navbar }
    }
</script>