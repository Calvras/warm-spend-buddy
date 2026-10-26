import { useState } from 'react'
import {
  ArrowLeft,
  Calendar,
  CalendarDays,
  Check,
  Clock,
  CreditCard,
  Layers,
  Sparkles,
  Trash2,
  X,
  ChevronDown,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { type SubscriptionItem, type CardItem } from '@/lib/cards-store'

interface SubscriptionDetailProps {
  subscription: SubscriptionItem
  cards: CardItem[]
  onClose: () => void
  onUpdateCard: (subId: string, newCardId: string) => void
  onCancelSubscription: (subId: string) => void
}

export function SubscriptionDetail({
  subscription,
  cards,
  onClose,
  onUpdateCard,
  onCancelSubscription,
}: SubscriptionDetailProps) {
  const [showCardPicker, setShowCardPicker] = useState(false)
  const [showCancelConfirm, setShowCancelConfirm] = useState(false)

  const linkedCard = cards.find((c) => c.id === subscription.cardId) || cards[0] || {
    id: 'card-1',
    last4: '6084',
    brand: 'visa',
  }

  const renderServiceIcon = (brand: string) => {
    switch (brand) {
      case 'spotify':
        return (
          <svg viewBox="0 0 50 50" className="w-12 h-12 text-white">
            <circle cx="25" cy="25" r="23" fill="#1DB954" />
            <g fill="none" stroke="#FFFFFF" strokeWidth="3.6" strokeLinecap="round">
              <path d="M12 18c9-3 18-2 27 2M14 25c8-2 15-1 22 2M16 32c6-1.5 12-1 18 2" />
            </g>
          </svg>
        )
      case 'netflix':
        return (
          <svg viewBox="0 0 40 54" className="w-10 h-14 text-[#E50914]">
            <path d="M5 3h10v47L5 52zM25 3h10v49l-10-2z" fill="#B81D24" />
            <path d="M5 3h10l20 49-10-2z" fill="#E50914" />
          </svg>
        )
      case 'youtube':
        return (
          <svg viewBox="0 0 50 38" className="w-14 h-11">
            <rect x="2" y="3" width="46" height="32" rx="8" fill="#FF0000" />
            <path d="m21 12 13 7-13 7z" fill="#FFFFFF" />
          </svg>
        )
      case 'medium':
        return (
          <svg viewBox="0 0 55 35" className="w-14 h-9 text-white fill-current">
            <ellipse cx="17" cy="18" rx="14" ry="14" />
            <ellipse cx="40" cy="18" rx="8" ry="13" />
            <ellipse cx="52" cy="18" rx="2" ry="12" />
          </svg>
        )
      case 'adobe':
        return (
          <div className="w-12 h-12 rounded-xl bg-[#FA0F00] flex items-center justify-center font-black text-white text-2xl tracking-tighter">
            Ai
          </div>
        )
      case 'transit':
        return (
          <div className="w-12 h-12 rounded-xl bg-[#0284C7] flex items-center justify-center text-white">
            <CalendarDays className="w-7 h-7" />
          </div>
        )
      default:
        return (
          <div className="w-12 h-12 rounded-xl bg-[var(--balance)] flex items-center justify-center text-white">
            <CreditCard className="w-6 h-6" />
          </div>
        )
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col overflow-y-auto animate-in slide-in-from-right duration-250">
      {/* 1. Branded Top Hero Banner */}
      <div
        className="relative flex-shrink-0 text-white pt-6 pb-8 px-5 shadow-lg overflow-hidden"
        style={{ background: subscription.bannerGradient }}
      >
        {/* Subtle background glow effect */}
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-white/10 blur-2xl pointer-events-none" />

        {/* Top Nav Bar over Banner */}
        <div className="relative z-10 flex items-center justify-between mb-5">
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-md flex items-center justify-center text-white transition-colors cursor-pointer"
            aria-label="Back to Subscriptions"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white">
            {subscription.cycle}
          </span>
        </div>

        {/* Logo and Main Details inside Banner */}
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-2xl bg-black/40 backdrop-blur-md p-3.5 flex items-center justify-center shadow-xl border border-white/20 mb-3">
            {renderServiceIcon(subscription.brand)}
          </div>
          <h1 className="text-2xl font-black tracking-tight text-white drop-shadow-xs">
            {subscription.name}
          </h1>
          <p className="text-xs font-semibold text-white/85 mt-0.5">
            {subscription.plan}
          </p>
          <div className="mt-2.5 inline-flex items-baseline gap-1 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/25">
            <span className="text-xl font-extrabold text-white">{subscription.price}</span>
            <span className="text-[11px] text-white/80 font-medium">/{subscription.cycle.toLowerCase()}</span>
          </div>
        </div>
      </div>

      {/* 2. Details Down Below */}
      <div className="flex-1 p-5 space-y-4 max-w-[420px] mx-auto w-full pb-10">
        {/* Key Timeline Info Grid */}
        <div className="grid grid-cols-2 gap-3">
          {/* Next Payment */}
          <div className="p-3.5 rounded-2xl bg-accent/60 border border-border space-y-1">
            <div className="flex items-center gap-1.5 text-muted-foreground text-[11px] font-medium">
              <CalendarDays className="w-3.5 h-3.5 text-[var(--balance)]" />
              <span>Next Payment</span>
            </div>
            <strong className="block text-sm font-bold text-foreground leading-snug">
              {subscription.nextPayment}
            </strong>
            <span className="inline-block text-[10px] font-semibold text-[var(--balance)] bg-[var(--balance)]/10 px-1.5 py-0.5 rounded-md">
              {subscription.due}
            </span>
          </div>

          {/* Last Paid */}
          <div className="p-3.5 rounded-2xl bg-accent/60 border border-border space-y-1">
            <div className="flex items-center gap-1.5 text-muted-foreground text-[11px] font-medium">
              <Check className="w-3.5 h-3.5 text-emerald-500" />
              <span>Last Paid</span>
            </div>
            <strong className="block text-sm font-bold text-foreground leading-snug">
              {subscription.lastPaid}
            </strong>
            <small className="block text-[10px] text-muted-foreground">
              {subscription.price} cleared
            </small>
          </div>
        </div>

        {/* Subscribed Since (When started paying) */}
        <div className="p-4 rounded-2xl bg-accent/50 border border-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-background border border-border flex items-center justify-center text-muted-foreground">
              <Clock className="w-5 h-5 text-foreground" />
            </div>
            <div>
              <span className="text-[11px] text-muted-foreground block font-medium">
                When I Started Paying
              </span>
              <strong className="text-sm font-bold text-foreground block">
                {subscription.startedDate}
              </strong>
            </div>
          </div>
          <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
            Active Member
          </span>
        </div>

        {/* Plan Chosen & Included Features */}
        <div className="p-4 rounded-2xl bg-accent/50 border border-border space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <h3 className="text-xs font-bold text-foreground uppercase tracking-wide">
                Plan Chosen
              </h3>
            </div>
            <span className="text-xs font-bold text-foreground">
              {subscription.plan}
            </span>
          </div>
          <div className="pt-1 space-y-1.5">
            {subscription.features.map((feat, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-muted-foreground">
                <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Method / Linked Card with Quick Switch */}
        <div className="p-4 rounded-2xl bg-accent/50 border border-border space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-foreground" />
              <h3 className="text-xs font-bold text-foreground uppercase tracking-wide">
                Payment Card
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setShowCardPicker(!showCardPicker)}
              className="text-xs text-[var(--link)] font-semibold flex items-center gap-0.5 hover:underline cursor-pointer"
            >
              <span>Switch Card</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center justify-between p-2.5 rounded-xl bg-background border border-border">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-5 rounded bg-accent border border-border flex items-center justify-center font-bold text-[9px] uppercase">
                {linkedCard.brand}
              </div>
              <strong className="text-xs font-semibold text-foreground">
                •••• {linkedCard.last4}
              </strong>
            </div>
            <span className="text-[11px] text-muted-foreground">
              Expires {linkedCard.expiry}
            </span>
          </div>

          {/* Quick Card Switcher Dropdown */}
          {showCardPicker && (
            <div className="space-y-1.5 pt-1 animate-in fade-in duration-200">
              <span className="text-[10px] uppercase font-bold text-muted-foreground block">
                Assign to another card:
              </span>
              {cards.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => {
                    onUpdateCard(subscription.id, c.id)
                    setShowCardPicker(false)
                  }}
                  className={`w-full flex items-center justify-between p-2 rounded-lg text-xs transition-colors cursor-pointer ${
                    c.id === subscription.cardId
                      ? 'bg-primary text-primary-foreground font-semibold'
                      : 'bg-background hover:bg-accent border border-border text-foreground'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="uppercase text-[9px] font-bold">{c.brand}</span>
                    <span>•••• {c.last4}</span>
                    {c.holder && <span className="opacity-70 text-[10px]">({c.holder})</span>}
                  </div>
                  {c.id === subscription.cardId && <Check className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Spend Insights & Category */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-accent/40 border border-border/70">
            <span className="text-[10px] text-muted-foreground uppercase font-bold block">Category</span>
            <strong className="text-xs font-semibold text-foreground mt-0.5 block">{subscription.category}</strong>
          </div>
          <div className="p-3 rounded-xl bg-accent/40 border border-border/70">
            <span className="text-[10px] text-muted-foreground uppercase font-bold block">Total Spent</span>
            <strong className="text-xs font-semibold text-foreground mt-0.5 block">{subscription.totalSpent}</strong>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="pt-2 space-y-2">
          {!showCancelConfirm ? (
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowCancelConfirm(true)}
              className="w-full h-11 rounded-xl text-xs font-semibold text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/30 gap-1.5 cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              Cancel Subscription Tracker
            </Button>
          ) : (
            <div className="p-3.5 rounded-xl border border-destructive/40 bg-destructive/5 space-y-2.5 animate-in fade-in duration-200">
              <p className="text-xs font-medium text-foreground text-center">
                Remove <span className="font-bold">{subscription.name}</span> from your Paidly tracker?
              </p>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowCancelConfirm(false)}
                  className="flex-1 text-xs"
                >
                  Keep
                </Button>
                <Button
                  type="button"
                  size="sm"
                  onClick={() => onCancelSubscription(subscription.id)}
                  className="flex-1 text-xs bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Yes, Remove
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
