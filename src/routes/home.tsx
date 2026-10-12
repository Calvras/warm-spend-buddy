import { createFileRoute } from '@tanstack/react-router'
import { MobileHome } from '@/components/mobile-subscriptions'
export const Route = createFileRoute('/home')({
 head: () => ({meta:[{title:'Your overview — Subscription Tracker'},{name:'description',content:'Balance, upcoming payments, and all subscriptions.'},{property:'og:title',content:'Your overview — Subscription Tracker'},{property:'og:description',content:'Balance, upcoming payments, and all subscriptions.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}),
 component: MobileHome,
})
