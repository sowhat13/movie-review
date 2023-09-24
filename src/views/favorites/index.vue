
<template>
    <div class="favorites page container">
        <div class="common-card-wrapper">
            <div class="title-banner">
                <span>
                    Favorites
                    <span class="badge">{{ favorites.length }}</span>
                </span>
            </div>

            <transition-group name="scale-in-out" tag="div" class="common-card-list">
                <card-wrapper v-for="movie in favorites" :key="movie.id" :id="movie.id" :title="movie.title"
                    :image=" movie.image" :date="movie.date" :voteAverage="movie.voteAverage"
                    :isFavable="true" />
            </transition-group>
        </div>
    </div>
</template>

<script>
import CardWrapper from '@/components/card/cardWrapper.vue';
export default {

    name: 'FavoritesView',
    data() {
        return {
        }
    },
    computed: {
        favorites() {
            return this.$store.getters.favorites
        },
        computed: {
       
        
        },
    },
    components: {
        CardWrapper
    },
}
</script>

<style lang="scss" scoped></style>