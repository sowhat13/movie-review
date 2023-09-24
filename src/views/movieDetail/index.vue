<template>
    <div class="movieDetail ">
        <banner :title="movie?.title" :overview="movie?.overview" :voteAverage="movie?.vote_average"
            :date="movie?.release_date" :image="movie?.backdrop_path ? imageBaseUrlOriginal + movie.backdrop_path : ''" />
        <div class="detail-wrapper">
            <div class="detail" v-for="(detail, index) in details" :key="index">
                <div class="detail-title title-banner">{{ detail.title }}</div>
                <div class="detail-value" v-if="loading">
                <LoadingSpinner />
                </div>
                <div v-else class="detail-value">{{ detail.value }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import banner from '@/components/banner.vue'
import movies from '@/api/movies';
import LoadingSpinner from '@/components/loadingSpinner.vue';
export default {

    name: 'MovieDetailComponent',
    data() {
        return {
            movie: null,
            loading: false,
            details: {
                genres: {
                    title: 'Genres',
                    value: ''
                },
                original_language: {
                    title: 'Original Language',
                    value: ''
                },
                original_title: {
                    title: 'Original Title',
                    value: ''
                },
                popularity: {
                    title: 'Popularity',
                    value: ''
                },
                revenue: {
                    title: 'Revenue',
                    value: ''
                },
                runtime: {
                    title: 'Runtime',
                    value: ''
                },
                production_companies: {
                    title: 'Production Companies',
                    value: ''
                },
                production_countries: {
                    title: 'Production Countries',
                    value: ''
                },
                status: {
                    title: 'Status',
                    value: ''
                },
                spoken_languages: {
                    title: 'Spoken Languages',
                    value: ''
                },

            }
        }
    },
    methods: {
        getMovieDetail() {
            this.loading = true
            movies.getMovieDetail(this.$route.params.id).then((response) => {
                this.movie = response;
                this.details.genres.value = this.movie.genres.map((genre) => genre.name).join(', ');
                this.details.original_language.value = this.movie.original_language;
                this.details.original_title.value = this.movie.original_title;
                this.details.popularity.value = this.movie.popularity;
                this.details.revenue.value = new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                }).format(this.movie.revenue);
                this.details.runtime.value = this.movie.runtime + ' minutes';
                this.details.production_companies.value = this.movie.production_companies.map((company) => company.name).join(', ');
                this.details.production_countries.value = this.movie.production_countries.map((country) => country.name).join(', ');
                this.details.status.value = this.movie.status;
                this.details.spoken_languages.value = this.movie.spoken_languages.map((language) => language?.name ? language.name : language?.english_name ? language.english_name : '').join(', ');
                this.loading = false
            });
        }
    },
    mounted() {
        this.getMovieDetail();
    },
    computed: {

        imageBaseUrlOriginal() {
            return this.$store.state.imageBaseUrlOriginal
        }
    },
    components: {
        banner,
        LoadingSpinner
    },


}
</script>

<style lang="scss" scoped>

.movieDetail{
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
    padding-bottom: 100px;
}
.detail-wrapper {
    display:grid;
    grid-template-columns:240px 240px 240px 240px 240px;
    grid-gap: 20px;
    margin: 0 auto;
    margin-top: 24px;
    padding: 12px;
    width: fit-content;

    @media (max-width: 1400px) {
        grid-template-columns: 240px 240px 240px 240px;
    }

    @media (max-width: 1200px) {
        grid-template-columns: 240px 240px 240px;
    }

    @media (max-width: 840px) {
        grid-template-columns: 240px 240px;
    }

    @media (max-width: 540px) {
        grid-template-columns: 240px;
    }

    .detail {
        background: $primary-gradient;
        border-radius: 24px;
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
        display: flex;
        width: 240px;
        flex-direction: column;
        overflow: hidden;

        .detail-title {
            font-size: 16px;
            font-weight: 600;
            margin: 0 !important;
            box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
        }

        .detail-value {
            font-size: 14px;
            font-weight: 400;
            padding: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100px;
        }
    }
}</style>