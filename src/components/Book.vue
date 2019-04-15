<template>
    <div class="book js-book">
        <div class="book__cover" v-if="book.volumeInfo.imageLinks">
            <figure>
                <img class="book__img" :src="book.volumeInfo.imageLinks.thumbnail" :alt="book.volumeInfo.title">
            </figure>
        </div>
        <div class="book__info">
            <h3 class="book__title">{{ book.volumeInfo.title }}</h3>
            <h4 class="book__authors">{{ authors }}</h4>
        </div>
        <div class="book__actions">
            <button class="button is-large book__read" @click="openModal">Details</button>
            <a :href="book.volumeInfo.previewLink" class="button is-large book__preview" target="_blank">Preview</a>
        </div>
    </div>
</template>

<script>
import Shared from '@/assets/js/shared';

export default {
    name: 'Book',
    props: {
        book: Object
    },
    methods: {
        openModal(event) {
            event.target.parentNode.parentNode.nextSibling.classList.toggle('is-active');
            document.querySelector('html').classList.toggle('is-clipped');
        }
    },
    computed: {
        authors() {
            return Shared.authorsClean(this.book.volumeInfo.authors);
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_vars.scss';
@import '@/assets/scss/_mixins.scss';

.book {
    &__title {
        padding: .5rem 0 0;
    }
    &__authors {
        padding: .5rem 0 2rem;
        max-height: 9rem;
        color: $mainText;
        font-size: 1.4rem;
        overflow: hidden;
        
    }
    &__img {
        box-shadow: 0 4rem 3rem 0 rgba(0,0,0,0.75);
    }
    &__info {
        padding-bottom: 1rem;
    }
    &__read {
        background-color: $info;
        &:hover {
            background-color: darken($info, 10%);
        }
    }
    &__preview {
        background-color: $success;
        &:hover {
            background-color: darken($success, 10%);
        }
    }
    &__actions {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        .button {
            margin: 0 .5rem;
            width: 10rem;
            color: $mainText;
            &:hover {
                color: $mainText;
                
            }
        }
    }
}
</style>
