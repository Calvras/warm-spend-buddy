import { createFileRoute } from '@tanstack/react-router'
import { MobileHome } from '@/components/mobile-subscriptions'
export const Route = createFileRoute('/')({
 head: () => ({meta:[{title:'Subscription Tracker — Daniel Smith'},{name:'description',content:'Balance, upcoming payments, and all subscriptions.'},{property:'og:title',content:'Subscription Tracker — Daniel Smith'},{property:'og:description',content:'Balance, upcoming payments, and all subscriptions.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}),
 component: MobileHome,
})
