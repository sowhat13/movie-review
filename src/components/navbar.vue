<template>
    <nav class="navbar " :class="{ 'navbar-scroll': isScrolled }">
        <div class="container">
            <div class="left">
                <router-link to="/" class="logo">
                    <img src="../assets/images/logo.svg" alt="Logo" class="logo-img" />
                </router-link>
            </div>

            <div class="middle">
                <Searchbar />
            </div>

            <div class="right">
                <div class="nav-links">
                    <router-link class="nav-link" to="/">Home</router-link>
                    <router-link class="nav-link" to="/favorites">Favorites</router-link>
                    <router-link class="nav-link" to="/">Blog</router-link>

                </div>
                <div class="badge">
                    <UserIcon class="icon" />
                </div>
            </div>

            <div class="right-mobile">
                <div class="badge" @click="mobileMenuOpen = !mobileMenuOpen">
                    <MenuIcon class="icon" />
                </div>
                <transition name="slide-fade">
                    <div class="menu" v-if="mobileMenuOpen">
                        <div class="menu-close">
                            <div class="badge" @click="mobileMenuOpen = !mobileMenuOpen">
                                <XIcon class="icon" />
                            </div>
                        </div>
                        <Searchbar />

                        <router-link class="nav-link" to="/">Home</router-link>
                        <router-link class="nav-link" to="/favorites">Favorites</router-link>
                        <router-link class="nav-link" to="/">Blog</router-link>
                    </div>
                </transition>
            </div>
        </div>
    </nav>
</template>
  
<script>

import { UserIcon, XIcon, MenuIcon } from '@vue-hero-icons/solid';
import Searchbar from './searchbar.vue';
export default {
    name: 'NavbarComponent',
    components: { UserIcon, Searchbar, XIcon, MenuIcon },
    data() {
        return {
            isScrolled: false,
            mobileMenuOpen: false,
        }
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll);
    },
    beforeUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
        handleScroll() {
            this.isScrolled = window.scrollY > 30;
        }
    },

}
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.navbar {
    background-color: transparent;
    min-height: 60px;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 100;
    display: flex;
    flex-wrap: wrap;
    transition: all 0.3s ease-in-out;
    position: fixed;
    align-items: center;

    .container {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        align-items: center;
        min-height: 60px;
        gap: 8px;
        padding: 4px 12px;

    }

    .logo {
        font-size: 1.5rem;
        font-weight: bold;
        color: $green-color;
        text-decoration: none;
        display: flex;
        align-items: center;
        gap: 8px;
        margin: 0 12px;

        .logo-img {
            width: 100px;
            height: 50px;
            object-fit: contain;
        }
    }

    .right {
        display: flex;
        gap: 12px;
        align-items: center;
        justify-content: flex-end;

        .nav-links {
            display: flex;
            gap: 16px;
            align-items: center;
            justify-content: flex-end;
            margin-right: 12px;

            .nav-link {
                font-size: 1rem;
                font-weight: 600;
                color: $green-color;
                text-decoration: none;
                transition: all 0.3s ease-in-out;
                text-shadow: $text-shadow1;


                &:hover {
                    color: $light-color;
                }
            }
        }
    }

    .right-mobile {
        display: none;
    }
}

.badge {
    background-color: $green-color;

    .icon {
        color: $primary-color;
    }
}



.navbar-scroll {
    background-color: $primary-color;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

    .searchbar-wrapper {
        background-color: $dark-color;
    }
}

@media (max-width: 768px) {
    .navbar {
       .container{
        grid-template-columns: 1fr 1fr;
        padding: 4px 8px;
        gap: 4px;
       }

        .right {
            display: none;
        }

        .middle {
            display: none;
        }

        .right-mobile {
            display: flex;
            justify-content: flex-end;

            .menu {
                position: absolute;
                top: 0px;
                bottom: 0;
                right: 0px;
                background-color: $secondary-color;
                padding: 12px;
                display: flex;
                flex-direction: column;
                gap: 12px;
                z-index: 1000;
                height: 100vh;
                width: 200px;
                box-shadow: -5px 0px 10px 1px rgba(0, 0, 0, 0.1);

                .nav-link {
                    font-size: 1rem;
                    font-weight: 600;
                    color: $green-color;
                    text-decoration: none;
                    transition: all 0.3s ease-in-out;
                }

                .menu-close {
                    display: flex;
                    justify-content: flex-end;

                    .badge {
                        width: 20px;
                        height: 20px;
                    }
                }
            }
        }
    }
}
</style>
  