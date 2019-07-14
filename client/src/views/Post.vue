<template>
  <v-container>
    <v-layout column align-center>
      <v-card min-width="60%" ma-2>
        <v-form v-model="valid" @submit.prevent="createPost">
          <v-container d-block>
              <v-textarea
                v-model="post.body"
                @focus="focusTextarea"
                @focusout="focusoutTextarea"
                outline
                label="Post"
                counter="240"
                width="100%"
                rows="1"
                :rules="postRules"
                no-resize
                required
               ></v-textarea>
              <v-text-field
                v-model="post.imageUrl"
                :rules="urlRules"
                label="Image URL"
                full-width
              ></v-text-field>
              <v-btn type="submit" :disabled="!valid">
                <span>Post</span>
              </v-btn>
          </v-container>
        </v-form>
      </v-card>
      <v-card  width="60%" style="margin: 3px; padding: 10px 0 0 0" v-for="post in posts">
        <v-list-tile class="grow">
          <v-list-tile-avatar color="grey darken-3">
            <v-img 
              v-if="post.author.imageUrl"
              class="elevation-6"
              src="post.author.imageUrl"
            ></v-img>
            <v-avatar v-if="!post.author.imageUrl" color="red" size=40>
              <span class="white--text headline">{{ post.author.displayName[0].toUpperCase() }}</span>
            </v-avatar>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{post.author.displayName}}</v-list-tile-title>
            <span secondary class="caption">@{{post.author.username}}</span>
          </v-list-tile-content>
          <v-layout
            align-center
            justify-end>
            <v-icon @click="like(post._id)">favorite</v-icon>
            <span class="subheading mr-2">{{post.likes.length}}</span>
          </v-layout>
        </v-list-tile>
        <v-card-text>
          {{post.body}}
        </v-card-text>
        <v-img v-if="post.imageUrl" :src="post.imageUrl" />
      </v-card>
      <pre>{{posts}}</pre>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  name: 'post',
  mounted() {
    this.findPosts({ query: {} })
      .then((response) => {
        const posts = response.data || response;
      });
  },
  data: () => ({
    valid: false,
    creating: false,
    post: {
      body: '',
      imageUrl: '',
    },
    postRules: [
      value => !!value || "This value can't be blank",
      value => value.length <= 240 || 'Length must be 240 characters or less',
    ],
    urlRules: [true],
  }),
  methods: {
    ...mapActions('posts', { findPosts: 'find' }),
    async createPost() {
      if (this.valid) {
        const { Post } = this.$FeathersVuex;
        const post = new Post(this.post);
        await post.save();
      }
    },
    async like(post) {
      const { Like } = this.$FeathersVuex;
      const like = new Like({ post });
      await like.save();
    },
    focusTextarea(event) {
      event.target.rows = 3;
    },
    focusoutTextarea(event) {
      event.target.value.length === 0 ? event.target.rows = 1 : event.target.rows = 3;
    },
    avatar(post) {
      return post.author.image_url || 'https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light';
    },
  },
  computed: {
    ...mapState('auth', { user: 'payload' }),
    ...mapState('posts', {
      isFindPending: 'isFindPending',
      isCreatePending: 'isCreatePending',
    }),
    ...mapState('likes', {
      isFindPending: 'isFindPending',
      isCreatePending: 'isCreatePending',
    }),
    ...mapGetters('posts', { findPostsInStore: 'find' }),
    posts() {
      return this.findPostsInStore({
        query: {},
      }).data.reverse();
    },
  },
};
</script>
