import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { FIND_BOOKS, SET_BOOKS, SET_DISPLAYED_BOOKS, SET_CURRENT_PAGE, SET_FLAGS } from '@/assets/js/constants';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        books: [],
        displayedBooks: [],
        currentPage: 1,
        error: false,
        loading: false
    },
    mutations: {
        [SET_FLAGS](state, payload) {
            state.loading = payload.loading;
            state.error = payload.error;
        },
        [SET_BOOKS](state, payload) {
            state.books = payload.books;
        },
        [SET_DISPLAYED_BOOKS](state, payload) {
            state.displayedBooks = payload.displayedBooks;
        },
        [SET_CURRENT_PAGE](state, payload) {
            state.currentPage = payload.currentPage;
        }
    },
    actions: {
        async [FIND_BOOKS](context, payload) {
            try {
                const booksAPI = process.env.VUE_APP_BOOKS_API_URL;
                //console.log('booksAPI env:', booksAPI+payload.search);
                //const query = payload.search.replace(/[, ]+/g,'');
                //console.log('query :', query);
                //const { data } = await axios.get(`${booksAPI}${query}`);
                //console.log('payload.search :', payload.search);
                const { data } = await axios.get(`${booksAPI}${payload.search}`);
                //console.log('books :', data);
                //data.items.filter((book, index) => data.items.indexOf(book)  == index);
                // context.commit(SET_BOOKS, { books: data.items });
                // context.commit(SET_FLAGS, { error: false, loading: false });
                return data.items;
            }
            catch (error) {
                // console.log('error :', error);
                context.commit(SET_FLAGS, { error: true, loading: false });
            }
        }
    }
});
