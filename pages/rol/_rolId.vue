<template>
    <div class="g-sidenav-show  bg-gray-100 vh-completa" id='mainDashboard'>
        <Sidebar />
        <Navbar :Modulo='"Roles"' :Tabla='"Rol id"'/>
        <main class="main-content position-relative max-height-vh-100  mt-1 border-radius-lg media-left">
            <div>
                <p>UN ROL</p>
                <h1>hola</h1>
            </div>
        </main>
    </div>
</template>

<script>
    import axios from 'axios'
    import Sidebar from "../../components/Sidebar.vue";
    import Navbar from "~/components/Navbar.vue";
    axios.defaults.baseURL ='http://10.147.17.173:5000';

    export default{
        data(){
            return{
                rol:[],
            }
        },
        async fetch(){
            await this.getRol()
        },
        methods:{
            async getRol(){
                const data = axios.get(`/roles/${this.$route.params.rolId}`)
                const result = await data
                this.rol = result.data
            }
        },
        components: { Sidebar, Navbar }
    }
</script>