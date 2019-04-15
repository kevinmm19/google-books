<template>
    <form @keydown.enter.prevent="" class="search__form">
        <span class="search__label" aria-label="Search for a book" role="img">
            <font-awesome-icon icon="search" />
        </span>
        <input class="search__input" @input.prevent="debounceFind" placeholder="Type anything..." autofocus v-model="search">
        <button class="button search__reset" v-if="search.length" @click="reset" aria-label="Clean search input">
            <font-awesome-icon icon="times" />
        </button>
    </form>
</template>

<script>
import { FIND_BOOKS, SET_BOOKS, SET_FLAGS } from '@/assets/js/constants';

export default {
    name: 'Search',
    data: function () {
        return {
            search: '',
            timeout: 0
        }
    },
    mounted() {
        this.debounceFind = this.debounce(this.find, 200);
        this.debounceFind();
    },
    destroyed() {
        clearTimeout(this.timeout);
    },
    methods: {
        debounce(func, wait, immediate) {
            return function() {
                let context = this, args = arguments;
                let later = function() {
                this.timeout = null;
                if (!immediate) func.apply(context, args);
                };
                let callNow = immediate && !this.timeout;
                clearTimeout(this.timeout);
                this.timeout = setTimeout(later, wait);
                if (callNow) func.apply(context, args);
            };
        },
        async find() {
            try {
                const query = this.search.trim().replace(/[|&;$%@"<>()+=,]/g, '');
                if(query !== '') {
                    this.$store.commit({ type: SET_FLAGS, error: false, loading: true });
                    const allBooks = await this.$store.dispatch(FIND_BOOKS, { search: query });
                    const uniqueBooks = this.removeDuplicates(allBooks);
                    this.$store.commit(SET_BOOKS, { books: uniqueBooks });
                    this.$store.commit(SET_FLAGS, { error: false, loading: false });
                }
            } catch (error) {
                this.$store.commit({ type: SET_FLAGS, error: true, loading: false });
            }
        },
        removeDuplicates(books) {
            return books.filter((book, index, self) =>
                index === self.findIndex((item) => (
                    item.id === book.id
                ))
            );
        },
        reset() {
            this.search = '';
            this.timeout = 0;
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_vars.scss';
@import '@/assets/scss/_mixins.scss';

.search {
    &__form {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    &__label {
        position: relative;
        top: .2rem;
        color: $mainText;
        padding-right: 1rem;
        font-size: 2rem;
    }
    &__input {
        height: 3.5rem;
        padding: 0.5rem;
        width: 65%;
        font-size: 1.6rem;
        @include respond-to($tablet) {
            width: 50%;
        }
    }
    &__reset {
        width: 3rem;
        height: 3.5rem;
        color: $mainText;
        font-size: 2rem;
        border: 0;
        outline: 0;
        background-color: transparent;
        &:hover,
        &:focus {
            color: darken($mainText, 10%);
        }
    }
    .fa-search,
    .fa-times {
        width: 2.5rem;
        height: 2.5rem;
        color: $mainText;
        transform: rotate(90deg);
    }
}
</style>
