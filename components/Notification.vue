<template>
    <div class="notification">
        {{message}}
    </div>
</template>

<script>
    export default{
        name:'Notification',
        props:['message']
    }
</script>

<style>
    .notification{
        color: red;
    }
</style>