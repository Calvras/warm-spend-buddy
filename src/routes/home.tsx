import { createFileRoute } from '@tanstack/react-router'
import { MobileHome } from '@/components/mobile-subscriptions'
export const Route = createFileRoute('/home')({
 head: () => ({meta:[{title:'Your overview — Paidly'},{name:'description',content:'Balance, upcoming payments, and all subscriptions.'},{property:'og:title',content:'Your overview — Paidly'},{property:'og:description',content:'Balance, upcoming payments, and all subscriptions.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}),
 component: MobileHome,
})
