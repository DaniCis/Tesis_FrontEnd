<template>
     <div class="g-sidenav-show  bg-gray-100 vh-completa" id='mainDashboard'>
        <Sidebar />
        <Navbar :Modulo='"Usuarios"' :Tabla='"Usuario " + $route.params.usuarioId'/>
        <main class="main-content position-relative max-height-vh-100  mt-1 border-radius-lg media-left">
            <p>UN USUARIO</p>
            <h1>{{this.user.nombre_usuario}}</h1>
        </main>
    </div>

</template>

<script>
    import axios from 'axios';
    import Sidebar from "../../components/Sidebar.vue";
    import Navbar from "~/components/Navbar.vue";
    axios.defaults.baseURL ='http://10.147.17.173:5000';

    export default{
        data() {
            return {
                user:[]
            };
        },
        async fetch(){
            await this.getUser()
        },
        methods:{
            async getUser(){
                const data = axios.get(`/usuario/${this.$route.params.usuarioId}`)
                const result = await data
                this.user = result.data
            }
        },
        components: { Sidebar, Navbar }

    }
</script>