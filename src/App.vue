<template>
    <div id="app" class="wrapper">
        <Header />
        <Hero />
        <section class="wrapper--alt" v-if="loading">
            <Loading />
        </section>
        <Bookshelf v-else-if="!error && books !== undefined && books.length" />
        <section class="wrapper--alt" v-else-if="error">
            <Message :msg="'No books match your search criteria.'" />
        </section>
        <Footer />
    </div>
</template>

<script>
import { mapState } from 'vuex';
import Bookshelf from '@/components/Bookshelf.vue';
import Footer from '@/components/Footer.vue';
import Header from '@/components/Header.vue';
import Hero from '@/components/Hero.vue';
import Loading from '@/components/Loading.vue';
import Message from '@/components/Message.vue';

export default {
    name: 'app',
    components: {
        Bookshelf,
        Footer,
        Header,
        Hero,
        Loading,
        Message
    },
    computed: {
        ...mapState(['books','loading','error'])
    }
}
</script>