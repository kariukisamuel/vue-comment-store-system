<template>
    <div class="comment-listings trash">
        <button @click="removeAllTrash" v-if="items.length>1">Remove all</button>
        <div class="comment" v-for="(item,index) in items" :key="'trash'+ index">
            <p> {{item.comment}}</p>
            <div class="flex reply-delete-buttons">
                <span @click="removeTrash(index)"><i class="fas fa-trash-alt"></i>Remove</span>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    name:'Trash',
    computed:{
        items(){
            return this.$store.state.trash;
        }
    },
    methods:{
        removeAllTrash(){
            this.$store.commit('emptyTrash')
        },
        removeTrash(index){
            this.$store.commit('removeTrash',index)
        }

    }
}
</script>