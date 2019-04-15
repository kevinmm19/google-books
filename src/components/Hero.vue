<template>
    <section class="hero">
        <div class="hero-body">
            <div class="container">
                <h1 class="hero__title">
                    Google Books API
                </h1>
                <h2 class="hero__subtitle">
                    Explore what is out there
                </h2>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'Hero'
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_vars.scss';

.hero {
    position: relative;
    padding-top: 7.5rem;
    background-color: $gradientAlt;
    background: linear-gradient(180deg, $gradientAlt, $gradientMain);
    box-shadow: 0 1.5rem 1rem -1.5rem $gradientAlt;
    .hero-body {
        padding: 5rem 1.5rem;
    }
    &__title {
        color: $mainText;
        font-size: 3rem;
        letter-spacing: .05rem;
    }
    &__subtitle {
        padding: .5rem 0;
        font-size: 2rem;
        color: $mainText;
    }
}
</style>
