<template>
    <section class="pagination-container" v-if="pageNumbers.length">
        <nav class="pagination is-centered is-large" role="navigation" aria-label="pagination">
            <button class="pagination-previous" v-if="currentPage != 1" @click="previous" aria-label="Previous page">
                <font-awesome-icon icon="arrow-left" />
            </button>
            <button class="pagination-next" v-if="currentPage < pageNumbers.length" @click="next" aria-label="Next page">
                <font-awesome-icon icon="arrow-right" />
            </button>
            <ul class="pagination-list">
                <li v-for="(pageNumber, index) in pageNumbers.slice(currentPage-1, currentPage+3)" :key="index">
                    <button :class="'js-page pagination-link pagination-link-' + index + ((index===activePage)?' pagination-link--active':'')" :aria-label="'Go to page '+pageNumber"
                         @click="setCurrentPage(pageNumber)">
                     {{pageNumber}} 
                    </button>
                </li>
            </ul>
        </nav>
    </section>
</template>

<script>
import { mapState } from 'vuex';
import { SET_CURRENT_PAGE } from '@/assets/js/constants';

export default {
    name: 'Pagination',
    props: {
        pageNumbers: Array,
        activePage: Number
    },
    methods: {
        setCurrentPage(index) {
            this.$store.commit(SET_CURRENT_PAGE, { currentPage: index });
        },
        previous() {
            const previousPage = this.currentPage - 1;
            this.$store.commit(SET_CURRENT_PAGE, { currentPage: previousPage });
        },
        next() {
            const nextPage = this.currentPage + 1;
            this.$store.commit(SET_CURRENT_PAGE, { currentPage: nextPage });
        }
    },
    computed: {
        ...mapState(['currentPage'])
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_vars.scss';
@import '@/assets/scss/_mixins.scss';

.pagination {
    padding: 2rem 2rem 6rem;
    justify-content: center;
    &-list {
        flex-grow: 0;
    }
    &-previous,
    &-next {
        flex-grow: 0;
    }
    &-previous,
    &-next,
    &-link {
        color: $mainText;
        background-color: $footer;
        cursor: pointer;
        &:hover {
            color: $mainText;
            background-color: lighten($footer, 10%);
        }
    }
    &-link {
        &--active {
            color: $footer;
            background-color: $mainText;
            &:hover {
                color: $footer;
                background-color: darken($mainText, 10%);
            }
        }
    }
    &-next {
        order: 3;
    }
}
</style>
