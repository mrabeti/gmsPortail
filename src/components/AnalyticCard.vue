<script setup>
const props = defineProps({
    label1: String,
    label2: String,
    icon: String
})
</script>

<template>
    <figure
        class="card rounded-card border  border-[#cfdbf1] flex transition duration-500 ease-out bg-[#fff] hover:drop-shadow-sm px-3 py-2">
        <div class="flex justify-between flex-col flex-1">
            <span class="font-semibold text-2xl">{{ label1 }}</span>
            <p class="text-sm mt-8 block">{{ label2 }}</p>
        </div>
        <div>
            <div class="icon w-12 h-12 rounded-full bg-[#e0eafc] text-[#3f80ea] flex items-center justify-center ml-4">
                <i :class="['text-xl', icon]"></i>
            </div>
        </div>
    </figure>
</template>