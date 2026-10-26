import { createFileRoute } from '@tanstack/react-router'
import { MobileSubscriptions } from '@/components/mobile-subscriptions'
export const Route = createFileRoute('/subscriptions')({
 head: () => ({meta:[{title:'My Subscriptions — Paidly'},{name:'description',content:'Your subscriptions, payment information, and plan details.'},{property:'og:title',content:'My Subscriptions — Paidly'},{property:'og:description',content:'Your subscriptions, payment information, and plan details.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}),
 component: MobileSubscriptions,
})
