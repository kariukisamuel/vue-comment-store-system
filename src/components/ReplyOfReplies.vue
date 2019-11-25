<template>
    <div class="replyofreplies">
        <p>{{reply}}</p>
        <div class="flex reply-delete-buttons">
            <span @click="deleteReply(replyofReplyId)"><i class="fas fa-trash-alt"></i>Delete</span></div>
        <p class="date">{{date}}</p>
    </div>
</template>
<script>
    
    export default {
        name: 'ReplyOfReplies',
        props:['reply','date','replyofReplyId'],
        methods:{
            deleteReply(id){
                 this.$store.commit('trashReplyOfReply',id)
            }
        }
    }
</script>