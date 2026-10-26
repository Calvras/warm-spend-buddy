import { createFileRoute } from '@tanstack/react-router'
import { MobileProfile } from '@/components/mobile-subscriptions'
export const Route = createFileRoute('/profile')({
 head: () => ({meta:[{title:'Profile — Paidly'},{name:'description',content:'Your profile, sample card, and settings.'},{property:'og:title',content:'Profile — Paidly'},{property:'og:description',content:'Your profile, sample card, and settings.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}),
 component: MobileProfile,
})
