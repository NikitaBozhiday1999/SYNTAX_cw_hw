<template>
    <div class="collection-header">
        <h4 v-neon-text:white="'#0095B6'"> <slot name= "title"></slot> </h4>
        
        <slot name="badge"></slot>
        
        <slot></slot>
    </div>
</template>



<script>
import helpers from '@/mixins/helpers';

    export default {
        mixins: [helpers],
        
        
    }
</script>