<template>
    <div class="g-sidenav-show  bg-gray-100 vh-completa" id='mainDashboard'>
        <Sidebar />
        <Navbar :Modulo='"Roles"' :Tabla='"Rol id"'/>
        <main class="main-content position-relative max-height-vh-100  mt-1 border-radius-lg ">
            <div>
                <p>UN ROL</p>
                <h1>this.rol</h1>
            </div>
        </main>
    </div>
</template>

<script>
    import axios from 'axios'
    import Sidebar from "../../components/Sidebar.vue";
    import Navbar from "~/components/Navbar.vue";

    export default{
        data(){
            return{
                rol:null,
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

<style>
    @media (min-width: 1200px){
        .main-content {
        margin-left: 17.125rem;
        }
    }
</style>