<template>
    <div class="g-sidenav-show  bg-gray-100 vh-completa" id='mainDashboard'> 
        <Sidebar />
        <Navbar :Modulo='"Administracion"' :Tabla='"Roles"'/>
        <main class="main-content position-relative max-height-vh-100  mt-1 border-radius-lg ">
            <div class="container-fluid py-4">
                <div class="row">
                    <div class="col-12">
                        <div class="card mb-4">
                            <div class="card-header pb-0">
                                <h6>Authors table</h6>
                            </div>
                            <div class="card-body px-0 pt-0 pb-2">
                                <br>
                                <div class="table-responsive p-0">
                                    <table class="table align-items-center mb-0">
                                    <thead>
                                        <tr>
                                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Author</th>
                                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Function</th>
                                        <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Status</th>
                                        <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Employed</th>
                                        <th class="text-secondary opacity-7"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                        <td>
                                            <div class="d-flex px-2 py-1">
                                                <div class="d-flex flex-column justify-content-center">
                                                    <h6 class="mb-0 text-sm">John Michael</h6>
                                                    <p class="text-xs text-secondary mb-0">john@creative-tim.com</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <p class="text-xs font-weight-bold mb-0">Manager</p>
                                            <p class="text-xs text-secondary mb-0">Organization</p>
                                        </td>
                                        <td class="align-middle text-center text-sm">
                                            <span class="badge badge-sm bg-gradient-success">Online</span>
                                        </td>
                                        <td class="align-middle text-center">
                                            <span class="text-secondary text-xs font-weight-bold">23/04/18</span>
                                        </td>
                                        <td class="align-middle">
                                            <div class="contenedorAcciones">
                                                <NuxtLink class="text-secondary font-weight-bold text-xs" :to="{name:'rol-rolId', params:{rolId: 1}}">
                                                <b-icon icon='pencil-square' style="width: 1.4em; height: 1.4em;"></b-icon>
                                                </NuxtLink>
                                                <b-icon icon='trash' style="width: 1.1em; height: 1.1em;"></b-icon>
                                            </div>
                                        </td>
                                        </tr>
                                        <tr>
                                        <td>
                                            <div class="d-flex px-2 py-1">
                                                <div class="d-flex flex-column justify-content-center">
                                                    <h6 class="mb-0 text-sm">Alexa Liras</h6>
                                                    <p class="text-xs text-secondary mb-0">alexa@creative-tim.com</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <p class="text-xs font-weight-bold mb-0">Programator</p>
                                            <p class="text-xs text-secondary mb-0">Developer</p>
                                        </td>
                                        <td class="align-middle text-center text-sm">
                                            <span class="badge badge-sm bg-gradient-secondary">Offline</span>
                                        </td>
                                        <td class="align-middle text-center">
                                            <span class="text-secondary text-xs font-weight-bold">11/01/19</span>
                                        </td>
                                        <td class="align-middle">
                                            <div class="contenedorAcciones">
                                                <NuxtLink class="text-secondary font-weight-bold text-xs" :to="{name:'rol-rolId', params:{rolId: 1}}">
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
    import Sidebar from '~/components/Sidebar.vue';
    import Navbar from '~/components/Navbar.vue';
    
    export default{
    data() {
        return {
            roles: []
        };
    },
    methods: {},
    components: { Sidebar, Navbar }
}
</script>

<style>
    @media (min-width: 1200px){
        .main-content {
        margin-left: 17.125rem;
        }
    }
    .contenedorAcciones{
        display: flex;
        justify-content: space-evenly
    }
</style>