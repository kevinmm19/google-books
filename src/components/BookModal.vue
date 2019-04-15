<template>
    <div class="modal js-modal">
        <div class="modal-background"></div>
        <div class="modal-content">
            <h2 class="book__title">{{ book.volumeInfo.title }}</h2>
            <h4 class="book__authors">{{ authors }}</h4>
            <div class="book__cover" v-if="book.volumeInfo.imageLinks">
                <figure>
                    <img class="book__img" :src="book.volumeInfo.imageLinks.thumbnail" :alt="book.volumeInfo.title">
                </figure>
            </div>
            <hr class="separator">
            <div class="book__info">
                <div class="book__info-row" v-if="book.volumeInfo.publisher">
                    <label for="book-publisher" class="book__info-label">Publisher</label>
                    <p id="book-publisher" class="book__info-text">{{ book.volumeInfo.publisher }}</p>
                </div>
                <div class="book__info-row" v-if="book.volumeInfo.publishedDate">
                    <label for="book-publishedDate" class="book__info-label">Published Date</label>
                    <p id="book-publishedDate" class="book__info-text">{{ book.volumeInfo.publishedDate }}</p>
                </div>
                <div class="book__info-row" v-if="book.volumeInfo.pageCount">
                    <label for="book-pageCount" class="book__info-label">Page Count</label>
                    <p id="book-pageCount" class="book__info-text">{{ book.volumeInfo.pageCount }}</p>
                </div>
                <div class="book__info-row" v-if="book.volumeInfo.language">
                    <label for="book-language" class="book__info-label">Language</label>
                    <p id="book-language" class="book__info-text">{{ book.volumeInfo.language }}</p>
                </div>
                <div class="book__info-row" v-if="book.volumeInfo.description">
                    <label for="book-description" class="book__info-label">Description</label>
                    <p id="book-description" class="book__info-text">{{ book.volumeInfo.description }}</p>
                </div>
            </div>
            <div class="book__actions">
                <a :href="book.volumeInfo.previewLink" class="button is-large book__preview" target="_blank">Preview</a>
            </div>
        </div>
        <button class="modal-close is-large" aria-label="close" @click="closeModal"></button>
    </div>
</template>

<script>
import Shared from '@/assets/js/shared';

export default {
    name: 'BookModal',
    props: {
        book: Object
    },
    methods: {
        closeModal(event) {
            event.target.parentNode.classList.toggle('is-active');
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

.modal {
    .modal-content {
        padding: 3rem 2rem 4rem;
        max-width: 40rem;
        background-color: $gradientAlt;
        background: linear-gradient(270deg, $gradientMain, $gradientAlt);
    }
    .modal-close {
        &:hover,
        &:focus {
            background-color: $success;
        }
    }
}
.separator {
    margin: 2rem auto 1rem;
    width: 100%;
    height: 0.1rem;
    text-align: center;
    background-color: $mainText;
    opacity: 0.5;
}
.book {
    &__cover {
        padding: 0 0 1.5rem;
    }
    &__authors {
        padding: 1.5rem 0;
        font-size: 1.4rem;
    }
    &__img {
        box-shadow: 0 4rem 3rem 0 rgba(0,0,0,0.75);
    }
    &__info {
        text-align: left;
        word-break: break-word;
        &-row {
            padding: 1rem 0;
        }
        &-label {
            color: $mainText;
            font-size: 1.6rem;
            font-weight: bold;
        }
        &-text {
            padding-top: .5rem;
            color: $mainText;
            font-size: 1.3rem;
        }
    }
    &__actions {
        padding: 2rem 0;
    }
    &__preview {
        width: 15rem;
        color: $mainText;
        background-color: transparent;
        border: .1rem solid $mainText;
        &:hover,
        &:focus {
            color: $mainText;
            background-color: $success;
        }
    }
}
</style>
