<template>
    <div id="app">
        <HelloWorld msg="Comment System" />
        <div class="comment-area">
            <textarea v-model="comment" :maxlength="textLength" data-cy="comment-input"></textarea>
            <p class="danger" v-text="(textLength - comment.length) + ' remaining'"></p>
            <p class="danger" v-if="emptyMessage">{{emptyMessage}}</p>
            <button type="submit" @click="submitComment" data-cy="submit-comment"> Submit </button>
        </div>
        <div>
            <h3>Comments</h3>
     
            <button @click="oldest">Old to New</button>
            <button @click="newest">New to Old</button>
            <button @click="shortest">Short to Long</button>
            <button @click="longest">Long to Short</button>
 
        </div>
        <Comments v-for="(item,index) in filter()" :key="'comment' + index" :comment="item.comment"
            :date="item.date" :commentId="item.commentId" />
        <h3>Trash</h3>
        <Trash />
    </div>
</template>
<script>
    import HelloWorld from './components/HelloWorld.vue'
    import Comments from './components/Comments.vue'
    import Trash from './components/Trash.vue'
    import * as moment from 'moment';

    export default {
        name: 'app',
        components: {
            HelloWorld,
            Comments,
            Trash,

        },
        data() {
            return {
                textLength: 20,
                comment: '',
                emptyMessage: '',
                byDate: false,
                byLength: false,
                orderBy:'',




            }
        },
        methods: {
            oldest() {
                this.orderBy = 'old';
            },
            newest() {
                this.orderBy = 'new';
            },
            shortest() {
                this.orderBy = 'short';
            },
            longest() {
                this.orderBy = 'long';
            },
            filter() {
                if (this.orderBy == 'old') {
                    return this.items.slice().sort((a, b) => (a.commentId > b.commentId) ? 1 : -1)            
                } else if (this.orderBy == 'new') {
   
                    return this.items.slice().sort((a, b) => (a.commentId < b.commentId) ? 1 : -1)  
                } else if (this.orderBy == 'short') {
 
                    return this.items.slice().sort((a, b) => (a.comment.length > b.comment.length) ? 1 : -1)
                } else if (this.orderBy == 'long') {
          
                    return this.items.slice().sort((a, b) => (a.comment.length < b.comment.length) ? 1 : -1)
                } else {
                    return this.items
                }

            },
            submitComment() {
                /*to ensure consistency of the primary key in a mysql manner i increment
                the id of the last object in the comments array.This is handy when deleting
                and associating comments to replies
                */
                let commentsLength = this.commentsCount;
                let commentsArray = this.items;
                let id;
                if (commentsLength - 1 == -1) {
                    id = 0;
                } else {
                    id = commentsArray[commentsLength - 1].commentId + 1;
                }
                /*ensure no empty comments are submitted*/

                if (this.comment.length < 1) {
                    this.emptyMessage = 'You cant post an empty comment.Please type something';
                } else {
                    this.emptyMessage = '';
                    let latestComment = {
                        date: this.currentDate,
                        comment: this.comment,
                        commentId: id,
                        active: true
                    }
                    this.$store.commit('addComment', latestComment);
                    this.comment = ''
                }


            }

        },
        computed: {
            currentDate() {
                return moment().format('llll');
            },
            commentsCount() {
                return this.$store.getters.commentsCount
            },
            items() {
                return this.$store.state.comments
            },

        },

    }
</script>
<style lang="scss">
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: left;
        color: #2c3e50;
        margin-top: 60px;
    }

    .comment-area {
        textarea {
            width: 100%;
            height: 100px;
        }

        .danger {
            color: red;
        }
    }
</style>