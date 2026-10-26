import { createFileRoute } from '@tanstack/react-router'
import { CardIntro } from '@/components/welcome-flow'
export const Route = createFileRoute('/')({
 head: () => ({meta:[{title:'Welcome — Paidly'},{name:'description',content:'Your subscription tracker starts here.'},{property:'og:title',content:'Welcome — Paidly'},{property:'og:description',content:'Your subscription tracker starts here.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}),
 component: CardIntro,
})
