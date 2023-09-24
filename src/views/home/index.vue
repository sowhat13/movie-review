<template>
  <div class="home homepage">
    <div class="banner-wrapper">
      <banner :image="bannerMovie ? imageBaseUrlOriginal + bannerMovie.backdrop_path : ''" :title="bannerMovie?.title"
        :goToUrl="`/movie/${bannerMovie?.id}`" />
    </div>
    <div class="container">

      <card-swiper title="Popular Movies" :items="populars.results" :loading="populars.loading">

      </card-swiper>



      <card-swiper title="Top Rated Movies" :items="topRated.results" :loading="topRated.loading">

      </card-swiper>

    </div>

  </div>
</template>

<script>
import movies from '@/api/movies';
import Banner from '../../components/banner.vue';
import CardSwiper from '@/components/card/cardSwiper.vue';

export default {
  name: 'HomeView',
  components: {
    Banner,
    CardSwiper
  },
  data() {
    return {
      populars: {
        results: [],
        loading: false
      },
      topRated: {
        results: [],
        loading: false
      },
      bannerMovie: null,
    }
  },
  methods: {
    getPopulars() {
      this.populars.loading = true

      movies.getPopularMovies().then((response) => {
        this.populars.loading = false
        this.populars.results = response.results;
        this.bannerMovie = response.results[Math.floor(Math.random() * response.results.length)];

      });
    },
    getTopRated() {
      this.topRated.loading = true
      movies.getTopRatedMovies().then((response) => {
        this.topRated.loading = false
        this.topRated.results = response.results;
      });
    }
  },
  computed: {

    imageBaseUrlOriginal() {
      return this.$store.state.imageBaseUrlOriginal
    }
  },
  mounted() {
    this.getPopulars();
    this.getTopRated();
  }
}
</script>


<style lang="scss" scoped>
.homepage {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  padding-bottom: 100px;
}





.banner-wrapper {
  width: 100%;
  height: 40vh;
  max-height: 400px;
  position: relative;
  display: flex;
  flex-direction: column;
}
</style>