<template>
</template>

<script>
    import { getDecoded } from '~/utils/auth';
    export default {
        data(){
            return{
                confirmar:''
            }
        },
        async mounted(){
            var decodedToken = getDecoded()
            var date = new Date( decodedToken.exp *1000)
            setTimeout(()=>{
                this.showModalToken()
            }, date - Date.now());
        },
        methods:{
            showModalToken(){
                this.confirm = ''
                this.$bvModal.msgBoxOk('Su sesión ha caducado. Por favor vuelva a ingresar.', {
                    title: 'Sesión Expirada',
                    size: 'sm',
                    buttonSize: 'sm',
                    okVariant: 'info',
                    okTitle: 'Si',
                    footerClass: 'p-2',
                    hideHeaderClose: false,
                    centered: true
                }).then(value => {
                    this.confirm = value
                    if(this.confirm == true){
                        this.$router.push('/')
                    }
                })
            },
        }
    }
</script>