<template>
    <main>
        <div class="loading" v-if="loading">
            Loading...
        </div>
        <div v-else-if="error">
            error: {{ error.statusCode }} - {{ error.message }}
        </div>
        <div v-else-if="currentPost.meta.published === 'false'">
            Not visible.
        </div>
        <component :is="component" v-else />
    </main>
</template>

<script>
import { mapState } from 'vuex'

export default {
    data() {
        return {
            error: null,
            loading: true,
            component: null,
        }
    },
    created () {
        this.fetchData()
    },
    watch: {
        // call again the method if the route changes
        '$route': 'fetchData'
    },
    mounted() {
        //
    },
    methods: {
        async fetchData () {
            this.loading = true
            try {
                await this.$store.dispatch('FETCH_POST', this.$route.params.post_id)
            } catch (e) {
                this.error = { statusCode: 404, message: e.message }
            } finally {
                if (!this.currentPost.meta.type) {
                    this.component = () => import('./PostTemplates/default')
                } else if (this.currentPost.meta.type == 'post') {
                    this.component = () => import('./PostTemplates/default')
                } else {
                    this.component = () => import(`./PostTemplates/${this.currentPost.meta.type}`)
                }
                this.loading = false
            }
        },
    },
    computed: {
        ...mapState(['currentPost']),
    },
    metaInfo () {
        return {
            title: this.loading ? 'Loading ...' : 'Andreas Georghiou - ' + this.$store.state.currentPost.meta.title,
            meta: this.loading ? [] : [
                { hid: 'og:title', name: 'og:title', content: this.currentPost.meta.title },
                { hid: 'og:description', name: 'og:description', content: this.currentPost.meta.description || this.currentPost.firstSentence },
                { hid: 'description', name: 'description', content: this.currentPost.meta.description || this.currentPost.firstSentence }
            ]
        }
    }
}
</script>