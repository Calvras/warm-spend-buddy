import { createFileRoute } from '@tanstack/react-router'
import { AuthScreen } from '@/components/welcome-flow'
export const Route = createFileRoute('/auth')({
 head: () => ({meta:[{title:'Sign up or log in — Subscription Tracker'},{name:'description',content:'Preview the subscription tracker signup and login experience.'},{property:'og:title',content:'Sign up or log in — Subscription Tracker'},{property:'og:description',content:'Preview the subscription tracker signup and login experience.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}),
 component: AuthScreen,
})
