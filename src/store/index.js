import Vue from 'vue'
import Vuex from 'vuex'
// import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
     comments:[
          // {date:" ", comment:" ",commentId:" ",active:""} 
     ],
     replies:[
          // {date:" ", reply:" ",commentId:"",replyId:" ",active:""}
     ],
     repliesOfReply:[
          // {replyId:" ",replyOfReply:" ",replyOfReplyId:" ",date:" "}
      ],
     replyOfrepliesReply:[
        // {replyId:" ",replyOfReply:" ",replyOfReplyId:" ",date:" "}
     ],
     trash:[

     ]

  },
  getters:{
     commentsCount: state => state.comments.length,
     replyCount: state => state.replies.length,
     replyOfReplyCount: state => state.repliesOfReply.length,
  },
  mutations: {
      addComment(state,comment) {
          state.comments.push(comment)
      },
      addReply(state,reply) {
        state.replies.push(reply)
      },
      addreplyOfReply(state,reply) {
        state.repliesOfReply.push(reply)
      },
      softDeleteComment(state,id){
          let trashedComment =state.comments[id];
          state.trash.push(trashedComment);
          state.comments.splice(id, 1);
      },
      emptyTrash(state){
        state.trash = [];
      },
      removeTrash(state,id){
        state.trash.splice(id,1)
      },
      trashReply(state,id){
        state.replies.splice(id, 1);
      },
      trashReplyOfReply(state,id){
        console.log(id);
        state.repliesOfReply.splice(id, 1);
      },
      undoTrash(){}
    
  },
  actions: {
  },
  modules: {
  },
  // plugins: [new VuexPersistence().plugin]
})
