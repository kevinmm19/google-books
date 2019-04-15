<template>
    <section class="bookshelf">
        <ul class="books">
            <li class="book-item" v-for="book in displayedBooks" :key="book.etag">
                <Book :book="book" />
                <BookModal :book="book" />
            </li>
        </ul>
        <Pagination :activePage="0" :pageNumbers="pageNumbers" />
    </section>
</template>

<script>
import { mapState } from 'vuex';
import { SET_DISPLAYED_BOOKS, SET_CURRENT_PAGE } from '@/assets/js/constants';
import Book from '@/components/Book.vue';
import BookModal from '@/components/BookModal.vue';
import Pagination from '@/components/Pagination.vue';

export default {
    name: 'Bookshelf',
    components: {
        Book,
        BookModal,
        Pagination
    },
    data: function () {
        return {
            pageNumbers: [],
            perPage: 3
        }
    },
    mounted() {
        this.setPages();
        this.setDisplayedBooks();
        this.$store.subscribe((mutation) => {
            switch(mutation.type) {
                case SET_CURRENT_PAGE:
                    this.setDisplayedBooks();
                    break;
                default:
                    break;
            }
        });
    },
    methods: {
        paginate() {
            const currentPage = this.currentPage;
            const perPage = this.perPage;
            const from = (currentPage * perPage) - perPage;
            const to = (currentPage * perPage);
            return this.books.slice(from, to);
        },
        setDisplayedBooks() {
            const displayedBooks = this.paginate();
            this.$store.commit(SET_DISPLAYED_BOOKS, { displayedBooks: displayedBooks });
        },
        setPages() {
            this.pageNumbers = [];
            const numberOfPages = Math.ceil(this.books.length / this.perPage);
            for (let index = 1; index <= numberOfPages; index++) {
                this.pageNumbers.push(index);
            }
        }
    },
    computed: {
        ...mapState(['books','displayedBooks','currentPage'])
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_vars.scss';
@import '@/assets/scss/_mixins.scss';

.bookshelf {
    background-color: $gradientMain;
    background: linear-gradient(0deg, $gradientMain, $gradientAlt);
    background-repeat: no-repeat;
    background-attachment: fixed;
    .books {
        padding: 2rem;
        @include respond-to($desktop) {
            display: flex;
            justify-content: space-evenly;
            align-items: center;
        }
    }
    .book-item {
        padding: 4rem 0;
        @include respond-to($mobile-400) {
            padding: 4rem;
            max-width: 36rem;
            
        }
    }
}
</style>
