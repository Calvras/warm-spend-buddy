import { createFileRoute } from '@tanstack/react-router'
import { ConnectCardScreen } from '@/components/welcome-flow'
export const Route = createFileRoute('/connect-card')({
 head: () => ({meta:[{title:'Add a sample card — Paidly'},{name:'description',content:'Preview a simulated card check and sample balance.'},{property:'og:title',content:'Add a sample card — Paidly'},{property:'og:description',content:'Preview a simulated card check and sample balance.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}),
 component: ConnectCardScreen,
})
