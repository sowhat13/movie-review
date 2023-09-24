<template>
    <div class="banner">
        <img class="banner-img" v-if="image" :src="image" loading="lazy" />
        <div v-else class="banner-img"></div>
  
        <div class="banner-details">
            <div class="banner-vote-date" v-if="voteAverage || date">
                <span class="banner-vote" v-if="voteAverage">
                    <StarIcon class="star-icon" />
                    {{ voteAverage.toFixed(1) }}
                </span>
                <span class="banner-date" v-if="date">
                    <CalendarIcon class="calendar-icon" />
                    {{ newDate }}
                </span>
        </div>
            <div class="banner-top">

                <span class="banner-title" v-if="title">
                    {{ title }}

                </span>
                <span class="banner-overview" v-if="overview">
                    {{ overview }}
                </span>

            </div>
            <div class="banner-go-details" v-if="goToUrl">
                <router-link :to="goToUrl">
                    <div class="banner-go-details-button">
                        <span>Go to details</span>
                        <ArrowRightIcon class="right-icon" />
                    </div>
                </router-link>
            </div>

        </div>
    </div>
</template>

<script>
import { ArrowRightIcon, StarIcon, CalendarIcon } from '@vue-hero-icons/outline';

export default {
    name: 'BannerComponent',
    data() {
        return {
        }
    },
    components: {
        ArrowRightIcon,
        StarIcon,
        CalendarIcon
    },

    props: {
        image: {
            type: String,
            default: null
        },
        title: {
            type: String,
            default: null
        },
        overview: {
            type: String,
            default: null
        },
        date: {

            default: null
        },
        voteAverage: {
            type: Number,
            default: null
        },

        goToUrl: {
            type: String,
            default: null
        },
        type: {
            type: String,
            default: 'default'
        },
    },
    computed:{
        newDate() {
            return this.date ? new Date(this.date).toLocaleDateString() : ''
        }
    }
}
</script>

<style lang="scss" scoped>
.banner {
    width: 100%;
    height: 40vh;
    max-height: 400px;
    overflow: hidden;
    position: relative;
    display: flex;
    flex-direction: column;

    .banner-img {
        width: 100%;
        height: 400px;
        object-fit: cover;
        background: $gray-color3;

    }

    .banner-details {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        min-height: 100px;
        background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, $background-color 100%);
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 12px;
        color: #fff;
        font-weight: 600;
        padding: 4% 6%;

        .banner-top {
            display: flex;
            gap: 12px;
            flex-direction: column;

            .banner-title {
                font-size: 32px;
                text-shadow: $text-shadow1;
            }

            .banner-overview {
                font-size: 12px;
                color: $gray-color;
                display: flex;
                width: 420px;
                max-width: 95%;
                @include ellipsisLine(4);

            }

        }

        .banner-go-details {
            display: flex;

            .banner-go-details-button {
                background: #fff;
                color: #000;
                padding: 8px 12px;
                border-radius: 4px;
                font-size: 12px;
                gap: 8px;
                justify-content: center;
                align-items: center;
                display: flex;

                cursor: pointer;
                transition: all 0.2s ease-in-out;

                &:hover {
                    background: #000;
                    color: #fff;
                }
            }

            .right-icon {
                width: 16px;
                height: 16px;
            }
        }



    }

    .banner-vote-date {
        color: #fff;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 24px;
        margin-bottom:12px;
        .banner-vote{
            background: #fff;
            color: #000;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: 600;
            display: flex;
            align-items: center;
            justify-content: center;
            .star-icon{
                width: 16px;
                height: 16px;
                margin-right:8px;
                color: $accent-color;
            }
        }

        .banner-date{
            background: #fff;
            color: #000;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: 600;
            display: flex;
            align-items: center;
            justify-content: center;
            .calendar-icon{
                width: 16px;
                height: 16px;
                margin-right:8px;
                color:$accent-color;
            }
        }
    }
}
</style>