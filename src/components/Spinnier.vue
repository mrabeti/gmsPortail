<template >
    <div class="page-loader w-full h-screen bg-primary text-white flex flex-col items-center justify-center gap-5"
        ref="pageLoader">
        <v-progress-circular indeterminate :size="101" :width="5"></v-progress-circular>
        <span class="font-semibold mt-6">Chargement en cours ...</span>
    </div>
</template>
