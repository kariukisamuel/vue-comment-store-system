<template>
    <div class="comment-listings">
        <div class="comment">
            <p>{{comment}}</p>
            <div class="flex reply-delete-buttons">
                <span @click="showReplyBox" ><i class="fas fa-reply"></i>Reply</span>
                <span @click="trashComment(commentId)"><i class="fas fa-trash-alt"></i>Delete</span>
            </div>
            <p class="date">{{date}}
            </p>

            <div class="reply-comment-input" v-show="replyCommentBox">
                <input type="text" v-model="reply">
                <button @click="submitReply">Submit</button>
                <p class="danger" v-if="emptyMessage">{{emptyMessage}}</p>
            </div>
            <Replies v-for="(item,index) in filteredItems" :key="'reply'+index" :replies="item.reply" :date="item.date "
                :replyId="item.replyId"></Replies>

        </div>
    </div>
</template>
<script>
    import Replies from './Replies.vue'
    import * as moment from 'moment';
    export default {
        name: 'Comments',
        components: {
            Replies,
        },
        props: ['comment', 'date', 'commentId'],
        data() {
            return {
                reply: '',
                replyCommentBox: false,
                emptyMessage:'',
           
            }
        },
        computed: {

            currentDate() {
                return moment().format('llll');
            },
            comments() {
                return this.$store.state.comments
            },
            items() {
                return this.$store.state.replies
            },
            filteredItems() {
                //filter replies to their respective comments
                 const filterById = (item) =>{
                    if(item.commentId == this.commentId){
                        return true;
                    }
                 }
                return this.$store.state.replies.filter(filterById);

            },
            replyCount() {
                return this.$store.getters.replyCount
            },

        },
        methods: {
            showReplyBox() {
                this.replyCommentBox = true
            },

            submitReply() {
                /*to ensure consistency of the primary key in a mysql manner i increment
                the id of the last object in the replies array.
                */
                let repliesLength = this.replyCount;
                let repliesArray = this.items;
                let id;
                if (repliesLength - 1 == -1) {
                    id = 0;
                } else {
                    id = repliesArray[repliesLength - 1].replyId + 1;
                }
                /*ensure no empty replies are submitted*/

                if (this.reply.length < 1) {
                    this.emptyMessage = 'You cant post an empty reply.Please type something';
                } else {
                    this.emptyMessage = '';
                //using commentId to track all replies belonging to comment    
                let latestReply = {
                    date: this.currentDate,
                    reply: this.reply,
                    commentId: this.commentId,
                    replyId: id,
                    active: true
                }
                this.$store.commit('addReply', latestReply)
                this.reply = ''
                }
            },
            trashComment(commentId){
                // perform a soft delete on comment
                this.$store.commit('softDeleteComment',commentId)
    
            }

        }
        }
</script>
<style lang="scss" scoped>
    .comment-listings {
        .comment {
            background: aliceblue;
            padding: 1rem;
            margin: 1rem 0;

            .reply-delete-buttons {
                span {
                    padding: 0 2rem;
                }
            }

            .reply-comment-input {
                margin: 1rem 0;

                input {
                    width: 100%;
                    height: 60px;
                }

                button {
                    background-color: darkviolet;
                    padding: 0.5rem;
                    color: #fff;
                    margin: 0.5rem 0;

                }
            }

            .date {
                text-align: end;
                margin: 0
            }

        }

    }
</style>