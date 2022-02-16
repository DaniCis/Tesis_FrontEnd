<template>
    <div class="g-sidenav-show  bg-gray-100 vh-completa" id='mainDashboard'>
        <Sidebar />
        <Navbar :Modulo='"Autorizaciones"' :Tabla='"Autorización " +$route.params.autorizacionId'/>
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
                autorizacion:[],
            }
        },
        async fetch(){
            await this.getAutorizacion()
        },
        methods:{
            async getAutorizacion(){
                const data = axios.put(`/autorizaciones/${this.$route.params.autorizacionId}`)
                const result = await data
                this.autorizacion = result.data
            }
        },
        components: { Sidebar, Navbar }
    }
</script>