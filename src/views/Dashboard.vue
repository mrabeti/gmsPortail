<template >
    <main>
        <div class="grid grid-cols-4 gap-4 mb-6">
            <figure class="rounded-card flex justify-between bg-[#e0eafc] border border-[#cfdbf1] text-[#3f80ea]">
                <div class="p-4 flex justify-between flex-col">
                    <span class="font-semibold text-lg leading-5">{{ getTimeOfDay() }} </span>
                    <p class="text-sm mt-8 block">{{ nomSociete }}</p>
                </div>
                <div class="flex items-end">
                    <img src="/images/customer-support.png" class="w-44" />
                </div>
            </figure>
            <AnalyticCard label1="24.000 DH" label2="Total de ventes ce mois" icon="fas fa-dollar-sign" />
            <AnalyticCard label1="27" label2="Nouveaux clients" icon="fas fa-user-tie" />
            <AnalyticCard label1="72" label2="Tickets non traités" icon="fas fa-headset" />
        </div>
        <div class="grid grid-cols-2 gap-4">
            <div class="card">
                <VueApexCharts type="bar" height="350" :options="lineChart.chartOptions" :series="lineChart.series">
                </VueApexCharts>
            </div>
            <div class="card">
                <VueApexCharts type="radialBar" height="390" :options="radialBar.chartOptions" :series="radialBar.series">
                </VueApexCharts>
            </div>
        </div>
    </main>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import VueApexCharts from "vue3-apexcharts"
import AnalyticCard from '../components/AnalyticCard.vue'

const props = defineProps({
    pageTitle: Object,
})

let nomSociete = ref('');

onMounted(() => {
    nomSociete.value = atob(localStorage.getItem('nomSociete'))
})

// Set Hello Message depending of Time
function getTimeOfDay() {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();

    if (currentHour >= 5 && currentHour < 12) {
        return "Bonjour";
    } else if (currentHour >= 12 && currentHour < 18) {
        return "Bon après-midi";
    } else {
        return "Bonsoir";
    }
}

// Charts
const lineChart = ref({
    series: [
        {
            name: 'Q1 Budget',
            group: 'budget',
            data: [44000, 55000, 41000, 67000, 22000]
        },
        {
            name: 'Q1 Actual',
            group: 'actual',
            data: [48000, 50000, 40000, 65000, 25000]
        },
        {
            name: 'Q2 Budget',
            group: 'budget',
            data: [13000, 36000, 20000, 8000, 13000]
        },
        {
            name: 'Q2 Actual',
            group: 'actual',
            data: [20000, 40000, 25000, 10000, 12000]
        }
    ],
    chartOptions: {
        chart: {
            type: 'bar',
            height: 350,
            stacked: true,
        },
        stroke: {
            width: 1,
            colors: ['#fff']
        },
        dataLabels: {
            formatter: (val) => {
                return val / 1000 + 'K'
            }
        },
        plotOptions: {
            bar: {
                horizontal: true
            }
        },
        xaxis: {
            categories: [
                'Online advertising',
                'Sales Training',
                'Print advertising',
                'Catalogs',
                'Meetings'
            ],
            labels: {
                formatter: (val) => {
                    return val / 1000 + 'K'
                }
            }
        },
        fill: {
            opacity: 1,
        },
        colors: ['#80c7fd', '#008FFB', '#80f1cb', '#00E396'],
        legend: {
            position: 'top',
            horizontalAlign: 'left'
        }
    }
})

const radialBar = ref({
    series: [76, 67, 61, 90],
    chartOptions: {
        chart: {
            height: 390,
            type: 'radialBar',
            fontFamily: 'inherit'
        },
        plotOptions: {
            radialBar: {
                offsetY: 0,
                startAngle: 0,
                endAngle: 270,
                hollow: {
                    margin: 5,
                    size: '30%',
                    background: 'transparent',
                    image: undefined,
                },
                dataLabels: {
                    name: {
                        show: false,
                    },
                    value: {
                        show: false,
                    }
                }
            }
        },
        colors: ['#1ab7ea', '#0084ff', '#39539E', '#0077B5'],
        labels: ['Vimeo', 'Messenger', 'Facebook', 'LinkedIn'],
        legend: {
            show: true,
            floating: true,
            fontSize: '15px',
            position: 'left',
            offsetX: 160,
            offsetY: 15,
            labels: {
                useSeriesColors: true,
            },
            markers: {
                size: 0
            },
            formatter: function (seriesName, opts) {
                return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
            },
            itemMargin: {
                vertical: 3
            }
        },
        responsive: [{
            breakpoint: 480,
            options: {
                legend: {
                    show: false
                }
            }
        }]
    }
})
</script>