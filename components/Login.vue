<template>
    <div class='container bg-gray-100 vh-completa'>
        <main class="main-content mt-0">
            <br/><br/><br/>
                <div class="page-header min-vh-75 card">
                    <div class="container">
                        <div class="row">
                            <div class="col-xl-4 col-lg-5 col-md-6 d-flex flex-column mx-auto">
                                <div class="card card-plain mt-8">
                                    <div class="card-header pb-0 text-left bg-transparent">
                                        <h3 class="font-weight-bolder text-info text-gradient">Bienvenido</h3>
                                        <p class="mb-0">Ingrese sus credenciales de acceso</p>
                                    </div>
                                    <div class="card-body">
                                        <b-form class="needs-validation" method="post" @submit.prevent="login" >
                                            <label>Usuario</label>
                                            <div class="mb-3">
                                                <b-form-input type="text" class="form-control" placeholder="Usuario" v-model="form.user" required></b-form-input>
                                            </div>
                                            <label>Contraseña</label>
                                            <div class="input-group mb-3">
                                                <b-form-input type="password" class="form-control" placeholder="Contraseña" id='password' v-model="form.password" required></b-form-input>
                                                <div class="input-group-append ">
                                                    <span class="input-group-text" v-on:click="password_show_hide() ">
                                                        <b-icon v-show='!show' icon='eye' style="width: 0.9em; height: 0.9em;"></b-icon>
                                                        <b-icon v-show='show' icon='eye-slash' style="width: 0.9em; height: 0.9em;"></b-icon>
                                                    </span>
                                                </div>
                                            </div>
                                            <Notification :message="error" v-if="error"/>
                                            <div class="text-center">
                                                <b-button type="submit" class="btn bg-gradient-info w-100 mt-4 mb-0">Iniciar</b-button>
                                            </div>
                                        </b-form>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6" style="position: static">
                                <div class="oblique position-absolute top-0 h-100 d-md-block d-none me-n8">
                                    <div class="oblique-image bg-cover position-absolute fixed-top ms-auto h-100 z-index-0 ms-n6">
                                        <img src="@/assets/img/curved6.jpg"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            <br/><br/><br/>
        </main>
    </div>
</template>

<script>
    
    import axios from 'axios';
    import Notification from '@/components/Notification'
    axios.defaults.baseURL ='http://10.147.17.173:5001';
    
    export default{
        components:{Notification},
        data(){
            return{
                form: {
                    user:'',
                    password:'',
                },
                show:true,
                error:null,
            };
        },
        methods:{
            async login() {
                this.error=''
                const formData = new FormData();
                formData.append('username',this.form.user);
                formData.append('password',this.form.password);
                await this.$auth.loginWith('local', {
                    data: formData
                }).then((response) => {
                    if(response != null && response != undefined){
                        this.user=''
                        this.password=''
                        this.$router.push('/dashboard');
                    }
                }).catch (e=> {
                    //this.$toast.error('Usuario o contraseña incorrecta ')
                    this.$toast.error(e.response.data.detail)
                })

            },
            password_show_hide() {
                this.show = !this.show;
                var input = document.getElementById("password");
                if (input.type === "password") {
                    input.type = "text";
                } else {
                    input.type = "password";
                }
            },
        }
    };
</script>

<style>
    #__layout{
        background-color: #f8f9fa!important;
    }
</style>