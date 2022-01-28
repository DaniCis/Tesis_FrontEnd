<template>
     <div class="g-sidenav-show  bg-gray-100 vh-completa">
        <Sidebar />
        <Navbar :Modulo='"Usuarios"' :Tabla='"Usuario Id"'/>
        <main class="main-content position-relative max-height-vh-100  mt-1 border-radius-lg ">
            <p>UN USUARIO</p>
            <h1>this.usuario</h1>
        </main>
    </div>

</template>

<script>
    import Sidebar from "../../components/Sidebar.vue";
    import Navbar from "~/components/Navbar.vue";

    export default{
        data() {
            return {
                
            };
        },
        methods: {},
        components: { Sidebar, Navbar }

    }
</script>