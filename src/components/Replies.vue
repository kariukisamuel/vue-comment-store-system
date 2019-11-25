<template>
    <div class="replies">
        <p>{{replies}}</p>
        <div class="flex reply-delete-buttons">
            <span @click="replyBox"><i class="fas fa-reply"></i>Reply</span>
            <span @click="deleteReply(replyId)"><i class="fas fa-trash-alt"></i>Delete</span>
        </div>
        <p class="date">{{date}}</p>
        <div class="replyofreply-input" v-show="replyofreply">
            <input type="text" v-model="reply">
            <button @click="submitReply">Submit</button>
             <p class="danger" v-if="emptyMessage">{{emptyMessage}}</p>
            <ReplyOfReplies v-for="(item,index) in filteredItems" :key="'replies'+index" :reply="item.replyOfReply"
                :date="item.date " :replyofReplyId="item.replyOfReplyId" />

        </div>


    </div>
</template>
<script>
    import ReplyOfReplies from './ReplyOfReplies.vue'
    import * as moment from 'moment'
    export default {
        name: 'Replies',
        components: {
            ReplyOfReplies
        },
        props: ['replies', 'date', 'replyId'],
        data() {
            return {
                replyofreply: false,
                reply: '',
                emptyMessage:'',
            }
        },
        methods: {
            replyBox() {
                this.replyofreply = true;
            },
            submitReply() {
                /*to ensure consistency of the primary key in a mysql manner i increment
                the id of the last object in the repliesofReply array.
                */
                let repliesLength = this.replyOfReplyCount;
                let repliesArray = this.items;
                let id;
                if (repliesLength - 1 == -1) {
                    id = 0;
                } else {
                    id = repliesArray[repliesLength - 1].replyOfReplyId + 1;
                }
                /*ensure no empty replies are submitted*/

                if (this.reply.length < 1) {
                    this.emptyMessage = 'You cant post an empty reply.Please type something';
                } else {
                    this.emptyMessage = '';
                //using commentId to track all replies belonging to comment    
                let latestReply = {
                    date: this.currentDate,
                    replyOfReply: this.reply,
                    replyId: this.replyId,
                    replyOfReplyId: id,
                    active: true
                };
                this.$store.commit('addreplyOfReply', latestReply);
                this.reply = ''
                }
            },
            deleteReply(id){
                this.$store.commit('trashReply',id)
            }

        },
        computed: {
            currentDate() {
                return moment().format('llll');
            },
            items() {
                return this.$store.state.repliesOfReply
            },
            filteredItems() {
                //filter replies of replies to their respective reply
                const filterById = (item) => {
                    if (item.replyId == this.replyId) {
                        return true;
                    }
                }
                return this.$store.state.repliesOfReply.filter(filterById);

            },
            replyOfReplyCount() {
                return this.$store.getters.replyOfReplyCount
            },
        }
    }
</script>
<style lang="scss" scoped>
    .replies {
        padding: 0.5rem;
        background: #E8AFBE;
        margin: 0rem 0rem 0.5rem 2rem;

        .replyofreply-input {
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

        .replyofreplies {
            background: #957aff;
            margin: 0rem 0rem 0.5rem 2rem;
        }
    }
</style>