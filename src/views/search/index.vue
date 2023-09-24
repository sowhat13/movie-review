
<template>
    <div class="search page container">
        <div class="common-card-wrapper">
            <div class="title-banner">
                <span>
                    {{ $route.query.query }}
                    <span>({{ totalResults }})</span>
                </span>
            </div>
            <div v-if="searchedMovies.length == 0 && !loading" class="blank">
                Could not find anything 😔
            </div>
            <div class="common-card-list">
                <card-wrapper v-for="movie in searchedMovies" :key="movie.id" :id="movie.id" :title="movie.title"
                    :image="movie.backdrop_path" :date="movie.release_date" :voteAverage="movie.vote_average"
                    :isFavable="true" />
            </div>

         

            <div v-if="loading" class="common-card-list">
                <card-wrapper v-for="(movie,index) in 20" :key="index" loading
                    :isFavable="true" />
            </div>

            <button class="show-more-button" @click="showMore" v-if="totalPages >= page && searchedMovies.length != 0">
                Show More
            </button>
            <div v-else class="show-more-button">
                No More Result
            </div>
        </div>
    </div>
</template>

<script>
import CardWrapper from '@/components/card/cardWrapper.vue';
import movies from '@/api/movies';
export default {

    name: 'SearchView',
    data() {
        return {
            searchedMovies: [],
            totalPages: 0,
            totalResults: 0,
            loading: false,
            page:1

        }
    },
    methods: {
        async searchMovies() {
            this.loading = true
             await movies.getSearchedMovies({query:this.$route.query.query, page:'1'}).then((response) => {
                this.searchedMovies = [ ...response.results]
                this.totalPages = response.total_pages
                this.totalResults = response.total_results
                this.loading = false
            });
        },
        async showMore() {
            this.loading = true
            this.page = this.page + 1
            await movies.getSearchedMovies({query:this.$route.query.query, page:this.page}).then((response) => {
                this.searchedMovies = [...this.searchedMovies, ...response.results]
                this.totalPages = response.total_pages
                this.totalResults = response.total_results
                this.loading = false
            });
        }

    },
    mounted() {
        this.searchMovies();
    },
    computed: {




    },
    watch: {
        '$route': {
            handler: function () {
                this.page = 1
                this.searchedMovies = []
                this.searchMovies();
            },
            deep: true,
            immediate: true

        }
    },
    components: {
        CardWrapper
    },
}
</script>

<style lang="scss" scoped>
.favorites-wrapper {
    display: flex;
    flex-direction: column;
    padding: 30px 20px;
    align-items: center;
    gap: 20px;

    .title-banner {

        .badge {
            width: 24px;
            height: 24px;
            font-size: 14px;
        }
    }

    .favorites-list {
        display: grid;
        width: 100%;
        justify-content: center;
        grid-template-columns: repeat(auto-fit, minmax(200px, 200px));
        grid-auto-rows: 300px;
        gap: 12px;
    }
}

.show-more-button {
    width: 200px;
    height: 50px;
    border-radius: 8px;
    border: none;
    background: $secondary-gradient;
    color: #fff;
    font-size: 16px;
    font-weight: 500;
    margin-top: 20px;
    display:flex;
    justify-content:center;
    align-items:center;
}
</style>