<script setup>
import Footer from '@/components/Static/Footer.vue'
import DescriptionCard from './DescriptionCard.vue';
import Slider from './Slider.vue';
import Librare from '@/assets/images/Librare.jpg';

</script>


<template>
    <div>
        <main>


            <div class="relative pt-48 pb-12 bg-black xl:pt-60 sm:pb-16 lg:pb-32 xl:pb-48 2xl:pb-56 overflow-hidden">
                <div class="absolute inset-0 bg-fixed bg-center bg-cover z-0 brightness-50"
                    :style="`background-image: url(${Librare})`"></div>

                <div class="relative">
                    <div class="px-6 mx-auto sm:px-8 lg:px-12 max-w-7xl">
                        <div class="w-full lg:w-2/3 xl:w-1/2 flex flex-col gap-[15px]">
                            <h1 class="font-sans text-base font-normal tracking-tight text-white text-opacity-70">Read.
                                Rent. Repeat — Your library, simplified</h1>
                            <p class="mt-6 tracking-tighter text-white">
                                <span class="font-sans font-normal text-6xl">Welcome to the </span><br />
                                <span class="font-serif italic font-normal text-7xl">Rental Library</span>
                            </p>
                            <p class="mt-12 font-sans text-base font-normal leading-7 text-white text-opacity-70">
                                Explore and manage books with ease. Students can register, browse the collection, rent
                                up to three books, and manage their profiles — all in one place. Admins can efficiently
                                handle book and student records through a dedicated panel.
                            </p>

                        </div>
                    </div>
                </div>
            </div>
        </main>
        <DescriptionCard />
        <Slider />
        <Footer />

    </div>
</template>