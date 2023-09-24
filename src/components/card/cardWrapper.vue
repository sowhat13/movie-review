<template>
    <div class="card-wrapper" @click="goToDetails()">

        <div class="card" :class="[type, loading ? 'shiny-element' : '']">
            <div class="card-image unselectable">
                <img v-if="image" loading="lazy" :src="imageBaseUrl + image" :alt="title ? title + ' image' : 'Card image'" />
                <div v-else class="card-image"></div>
            </div>
            <div class="card-date" v-if="date">
                    {{ newDate }}
                </div>
            <div class="card-content" :class="visibleContent ? 'visible-content' : ''">

             
                <span class="card-title" v-if="title">
                    {{ title }}
                </span>

                <div class="card-vote" v-if="voteAverage">
                    {{ voteAverage.toFixed(1) }}
                </div>
            </div>
            <div v-if="isFavable" class="favorite-wrapper">

                <div class="favorite" v-if="favorite" @click.stop="favIt(1)">
                    <SolidHeartIcon class="icon heart-icon" />
                </div>
                <div class="favorite" @click.stop="favIt(2)" v-else-if="!favorite">
                    <OutlineHeartIcon class="icon" />
                </div>
            </div>
            <div class="shiner"></div>
        </div>

    </div>
</template>

<script>
import { HeartIcon as OutlineHeartIcon } from '@vue-hero-icons/outline';
import { HeartIcon as SolidHeartIcon } from '@vue-hero-icons/solid';


export default {
    name: 'CardComponent',
    data() {
        return {
            isHovered: false,
        };
    },
    computed: {
        favorite() {
            return this.$store.getters.isFavorite(this.id)
        },
        imageBaseUrl() {
            return this.$store.state.imageBaseUrl
        },
        newDate(){
            return this.date ? new Date(this.date).toLocaleDateString() : ''
        }
    },
    methods: {
        favIt(type) {
            if (!this.id) return console.error('No id provided')
            if (type == 1) {
                this.$store.dispatch('removeFromFavorites', { id: this.id, title: this.title, image: this.image, date: this.date, voteAverage: this.voteAverage })
            } else {
                this.$store.dispatch('addToFavorites', { id: this.id, title: this.title, image: this.image, date: this.date, voteAverage: this.voteAverage })
            }
        },
        goToDetails() {
            if (this.noclick) return
            this.$router.push({ path: 'movie' + '/' + this.id })
        }
    },
    props: {
        type: {
            type: String,
            false: true,
            default: 'regular'
        },
        image: {
            required: false,
        },
        loading: {
            type: Boolean,
            required: false,
            default: false
        },

        isFavable: {
            type: Boolean,
            required: true,
            default: true
        },
        title: {
            type: String,
            required: false,
        },
        id: {
            required: false,
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
        },
        date: {
            type: String,
            required: false,
        },
        voteAverage: {
            required: false,
        }
    },
    components: {
        OutlineHeartIcon,
        SolidHeartIcon
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/mixins.scss";

.card-wrapper {
    display: flex;
    width: 100%;
    height: 100%;
    min-height: 100%;
    flex-direction: column;
}

.card {
    display: flex;
    flex-direction: column;

    border-radius: 8px;
    box-shadow: 0 2px 10px 1px rgba(0, 0, 0, 0.5);
    overflow: hidden;
    transition: all 0.3s ease-in-out;
    position: relative;
    cursor: pointer;

    &:hover {
        @extend .card-hovered;
    }

    width: 100%;
    height: 100%;
    min-width: 100%;
    min-height: 100%;

    
    .card-date {
            font-size: 12px;
            font-weight: 600;
            color: $light-color;
            margin-left: 8px;
            display: flex;
            position:absolute;
            top: 15px;
            left: 10px;
            background: $primary-gradient;
            border-radius: 12px;
            padding: 4px 8px;
            box-shadow: 0 0 20px 1px rgba(0,0,0,0.5);
        }

    .card-content {
        position: absolute;
        bottom: 0px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;
        padding: 8px;
        transition: all 0.3s ease-in-out;
        background: transparent;
        backdrop-filter: blur(12px);
        height: 60px;

        .card-title {
            font-size: 14px;
            font-weight: 600;
            color: $light-color;
            text-align: center;
            @include ellipsisLine(2);
        }

        .card-vote {
            font-size: 1rem;
            font-weight: 600;
            color: $light-color;
            text-align: center;
            position: absolute;
            right: 20px;
            top: -18px;
            background: $primary-gradient;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 0 20px 1px rgba(0,0,0,0.5);
        }

    }

    .visible-content {
        .card-title {
            @include ellipsisLine(2);
        }
    }

    .card-image {
        width: 100%;
        height: 100%;
        min-height: 100%;
        background: $primary-gradient;
        display:flex;
        img {
            width: 100%;
            height: 100%;
            min-height:100%;
            object-fit: cover;
        }
    }

    .favorite-wrapper {
        position: absolute;
        top: 10px;
        right: 10px;
        z-index: 10;

        .favorite {
            background-color: $background-color;
            border-radius: 50%;
            padding: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 30px;
            height: 30px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease-in-out;
            cursor: pointer;

            &:hover {
                transform: scale(1.1);
            }

            .icon {
                width: 20px;
                height: 20px;
                color: $green-color;
            }
        }
    }
}

.card-hovered {
    transform: rotate3d(0, 1, 0, 18deg) scale(1.1);
    z-index: 40;
    box-shadow: $primary-color -2px 2px 0px 1px, -3px 3px 8px 5px $primary-color-50 ;

    .card-content {
        backdrop-filter: blur(0px);
        box-shadow: none;
        background:transparent;

        .card-title {
            text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);

        }
    }

    .shiner {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(45deg, transparent 40%, rgba(255, 255, 255, 0.2) 60%, transparent);
        animation: shine-bottom 5s forwards;
        background-size: 300% 300%;
    }
}

.card-hovered2 {
    transform: rotate3d(0, 1, 0, 18deg) scale(1.1);
    z-index: 40;
    box-shadow: $green-color -2px 2px 0px 1px, -3px 3px 8px 5px $green-color-50 ;

    .card-content {
        opacity: 1;
        transform: translateY(-10px);
    }

    .shiner {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(45deg, transparent 40%, rgba(251, 255, 197, 0.3) 60%, transparent);
        animation: shine-bottom 5s infinite forwards;
        background-size: 100% 300%;
    }
}
</style>