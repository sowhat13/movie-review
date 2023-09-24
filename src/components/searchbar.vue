<template>
  <div>
    <div class="searchbar-wrapper" @keydown.enter="goSearch">
                <input type="text" class="searchbar" v-model="searchQuery" placeholder="Search" />
                <SearchIcon class="icon" @click="goSearch" />
            </div>
  </div>
</template>

<script>
import {  SearchIcon } from '@vue-hero-icons/solid';

export default {
name: 'SearchbarComponent',
data() {
    return {
        isSearching: false,
        searchQuery: null
    }
},
methods:{
    goSearch(){
        this.$router.replace({ path: '/search?query=' + this.searchQuery })
    }
},
components: { SearchIcon },
}
</script>

<style lang="scss" scoped>

.searchbar-wrapper {
    display: flex;
    align-items: center;
    gap: 8px;
    border-radius: 8px;
    background-color: $light-color;
    padding: 4px 12px;

    .searchbar {
        border: none;
        background-color: transparent;
        color: $dark-color;
        font-size: 1rem;
        font-weight: 600;
        width: 100%;
        min-width: calc(100% - 50px);

        &:focus {
            outline: none;
        }
        

        @media (max-width: 768px) {
            width: 50px;

        }

        &::placeholder {
            color: $dark-color;
            font-size: 1rem;
            font-weight: 600;
        }
    }

    .icon{
        color: $primary-color;
        border-radius: 50%;
        padding:4px;
        width: 30px;
        height: 30px;
        min-width: 30px;
        min-height: 30px;
        margin-left: auto;

        &:hover{
            cursor: pointer;
            background: $primary-color;
            color: $light-color ;
        }
    }

    @media (max-width: 768px) {
        margin-right: 0;

    }
}


</style>