<template>
    <div class="swiper-outter">

        <div v-if="title" class="title-banner">
            <span>
                {{ title }}
            </span>
        </div>
        <div class="swiper-wrapper" :class="type">
            <div class="blank" v-if="!loading && items.length == 0">
                Could not find anything 😔
            </div>

            <swiper class="swiper-cont" @swiper="onSwiper" :space-between="spaceBetween" :slides-per-view="(windowWidth / 260)"
                :loop="loop ? true : false"  navigation v-else-if="!loading" >
                <swiper-slide class="swiper-sl" v-for="item in items" :key="item.id">
                    <CardWrapper :noclick="noclick" :visibleContent="visibleContent" :isFavable="isFavable" :id="item.id"
                        :image="item.poster_path ? item.poster_path : ''" :type="type"
                        :title="item?.title ? item?.title : ''" :date="item.release_date"
                        :voteAverage="item.vote_average" />
                </swiper-slide>
            </swiper>
          

        </div>
    </div>
</template>
  
<script>

import CardWrapper from './cardWrapper.vue'
import { Navigation } from 'swiper'

import { SwiperCore, Swiper, SwiperSlide } from 'swiper-vue2'
// Import Swiper styles
import 'swiper/swiper-bundle.css'

SwiperCore.use([Navigation])

export default {
    data() {
        return {
            spaceBetween: 20,
            windowWidth: window.innerWidth,
        };
    },
    components: {
        Swiper,
        SwiperSlide,
        CardWrapper
    },
    mounted() {
        this.$nextTick(() => {
            window.addEventListener('resize', this.onResize);
       
        })
    },

    beforeUnmount() {
        window.removeEventListener('resize', this.onResize);
    },
    methods: {

        onSwiper(swiper) {
            console.log(swiper)
        },

        onResize() {
            this.windowWidth = window.innerWidth
        }
    },
    props: {
        items: {
            type: Array,
            required: true,
            default: () => []
        },
        type: {
            type: String,
            required: false,
            default: 'regular'
        },
        loading: {
            type: Boolean,
            required: false,
            default: false
        },
        limit: {
            type: Number,
            required: false,
            default: 12
        },
        title: {
            type: String,
            required: false,
            default: ''
        },
        loop: {
            type: Boolean,
            required: false,
            default: true
        },
        isFavable: {
            type: Boolean,
            required: false,
            default: true
        },
        noclick: {
            type: Boolean,
            required: false,
            default: false
        },
        visibleContent: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    computed: {
 
    }
}
</script>
  
<style lang="scss" scoped>
.swiper-outter {

    display: flex;
    flex-direction: column;


    .swiper-wrapper {
        display: flex;
        width: 100vw;
        max-width: 100%;
        margin: 12px 0;
        justify-content: center;
        align-items: center;

        .swiper-cont {
            padding: 24px;
            width: 100vw;
            max-width: 100%;

            .swiper-sl {
                display: flex;
                align-items: flex-end;
                

            }

        }

        .swiper-cont {
            .swiper-sl {
                height: 90%;
                margin: auto 0;

            }
        }



        &.horizontal {
            height: 180px;
        }



    }


    .title-banner {
        max-width: 95%;
        margin: 32px auto 0px auto;
    }

    .blank {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        font-size: 24px;
        font-weight: 600;
        color: $text-color;
    }
}


</style>

<style lang="scss">
.swiper-button-next, .swiper-button-prev{
    display:flex;
    align-items:center;
    justify-content:center;
    width:40px;
    height:40px;
    border-radius:50%;
    background-color:rgba(0,0,0,0.5);
    color:$light-color;
  
    &::after{
        font-size:20px !important;
        filter:drop-shadow(0px 0px 4px rgba(0,0,0,0.25));
    }
    &:hover{
        transition:0.2s ease-in-out;
        background-color:rgba(0,0,0,1);
    }
}

</style>