import { useState } from 'react'
import {
  X,
  CreditCard,
  Trash2,
  ArrowRight,
  ExternalLink,
  ChevronRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { type SubscriptionItem, type CardItem } from '@/lib/cards-store'

// Cancellation URLs for each provider
const CANCEL_URLS: Record<string, string> = {
  spotify: 'https://www.spotify.com/account/subscription/',
  netflix: 'https://www.netflix.com/youraccount',
  youtube: 'https://www.youtube.com/paid_memberships',
  adobe: 'https://account.adobe.com/plans',
  medium: 'https://medium.com/me/membership',
  transit: 'https://app.transit.app/',
}

const CANCEL_REASONS = [
  "I'm not using it enough",
  "It's too expensive",
  "I found a better alternative",
  "I'm taking a break",
  "I don't need it anymore",
]

// 3-step flow: 'idle' → 'reason' → 'confirm'
type CancelStep = 'idle' | 'reason' | 'confirm'

interface SubscriptionDetailProps {
  subscription: SubscriptionItem
  cards?: CardItem[]
  onClose: () => void
  onUpdateCard?: (subId: string, newCardId: string) => void
  onCancelSubscription: (subId: string) => void
}

export function SubscriptionDetail({
  subscription,
  onClose,
  onCancelSubscription,
}: SubscriptionDetailProps) {
  const [cancelStep, setCancelStep] = useState<CancelStep>('idle')
  const [selectedReason, setSelectedReason] = useState<string | null>(null)
  const [cancelled, setCancelled] = useState(false)

  const cancelUrl = CANCEL_URLS[subscription.brand] ?? `https://www.google.com/search?q=cancel+${encodeURIComponent(subscription.name)}+subscription`

  const renderServiceIcon = (brand: string) => {
    switch (brand) {
      case 'spotify':
        return (
          <div className="w-13 h-13 rounded-2xl bg-[#1DB954] flex items-center justify-center shadow-xs">
            <svg viewBox="0 0 50 50" className="w-8 h-8 text-white">
              <circle cx="25" cy="25" r="23" fill="#1DB954" />
              <g fill="none" stroke="#FFFFFF" strokeWidth="3.6" strokeLinecap="round">
                <path d="M12 18c9-3 18-2 27 2M14 25c8-2 15-1 22 2M16 32c6-1.5 12-1 18 2" />
              </g>
            </svg>
          </div>
        )
      case 'netflix':
        return (
          <div className="w-13 h-13 rounded-2xl bg-[#141414] flex items-center justify-center shadow-xs border border-border/50">
            <svg viewBox="0 0 40 54" className="w-7 h-9 text-[#E50914]">
              <path d="M5 3h10v47L5 52zM25 3h10v49l-10-2z" fill="#B81D24" />
              <path d="M5 3h10l20 49-10-2z" fill="#E50914" />
            </svg>
          </div>
        )
      case 'youtube':
        return (
          <div className="w-13 h-13 rounded-2xl bg-[#FF0000] flex items-center justify-center shadow-xs">
            <svg viewBox="0 0 50 38" className="w-8 h-6 text-white fill-current">
              <rect x="2" y="3" width="46" height="32" rx="8" fill="none" />
              <path d="m20 11 13 8-13 8z" fill="#FFFFFF" />
            </svg>
          </div>
        )
      case 'medium':
        return (
          <div className="w-13 h-13 rounded-2xl bg-[#191919] flex items-center justify-center shadow-xs">
            <svg viewBox="0 0 55 35" className="w-8 h-5 text-white fill-current">
              <ellipse cx="17" cy="18" rx="14" ry="14" />
              <ellipse cx="40" cy="18" rx="8" ry="13" />
              <ellipse cx="52" cy="18" rx="2" ry="12" />
            </svg>
          </div>
        )
      case 'adobe':
        return (
          <div className="w-13 h-13 rounded-2xl bg-[#FA0F00] flex items-center justify-center font-black text-white text-xl tracking-tighter shadow-xs">
            Ai
          </div>
        )
      case 'transit':
        return (
          <div className="w-13 h-13 rounded-2xl bg-[#0284C7] flex items-center justify-center text-white font-bold text-sm shadow-xs">
            Transit
          </div>
        )
      default:
        return (
          <div className="w-13 h-13 rounded-2xl bg-[var(--balance)] flex items-center justify-center text-white shadow-xs">
            <CreditCard className="w-6 h-6" />
          </div>
        )
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end">
      {/* Dim backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Swipe-up Sheet leaving ~20px at top with curved top left & right */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={`${subscription.name} details`}
        className="relative z-50 w-full max-w-[440px] mx-auto bg-background rounded-t-[28px] shadow-2xl flex flex-col overflow-hidden border-t border-border animate-in slide-in-from-bottom duration-300"
        style={{ height: 'calc(100dvh - 20px)' }}
      >
        {/* Top Handle bar */}
        <div className="flex-shrink-0 pt-3 pb-1">
          <div className="w-10 h-1 bg-muted-foreground/30 rounded-full mx-auto" />
        </div>

        {/* Header with close X button at top left */}
        <div className="flex-shrink-0 flex items-center justify-between px-5 pb-3">
          <button
            type="button"
            onClick={onClose}
            className="p-1 -ml-1 rounded-full hover:bg-accent text-foreground transition-colors cursor-pointer"
            aria-label="Close details"
          >
            <X className="w-5 h-5" />
          </button>
          <span className="text-xs font-semibold text-muted-foreground">Subscription Details</span>
          <div className="w-7" />
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 pb-8 space-y-6">
          {/* Service Branding & Price (Clean, minimal, matching signup page) */}
          <div className="flex flex-col items-center text-center pt-2 pb-1">
            <div className="mb-3">{renderServiceIcon(subscription.brand)}</div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              {subscription.name}
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">{subscription.plan}</p>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="text-3xl font-extrabold text-foreground tracking-tight">
                {subscription.price}
              </span>
              <span className="text-xs text-muted-foreground font-medium">
                /{subscription.cycle.toLowerCase() === 'yearly' ? 'yr' : 'mo'}
              </span>
            </div>
          </div>

          {/* Simple, Minimal Clean Detail Rows */}
          <div className="space-y-3.5 divide-y divide-border/60 text-sm">
            {/* Next Payment */}
            <div className="flex items-center justify-between pt-3">
              <span className="text-xs font-medium text-muted-foreground">Next Payment</span>
              <div className="text-right">
                <span className="font-semibold text-foreground block">{subscription.nextPayment}</span>
                <span className="text-[11px] text-[var(--balance)] font-medium">{subscription.due}</span>
              </div>
            </div>

            {/* Last Paid */}
            <div className="flex items-center justify-between pt-3.5">
              <span className="text-xs font-medium text-muted-foreground">When I Paid Last</span>
              <div className="text-right">
                <span className="font-semibold text-foreground block">{subscription.lastPaid}</span>
                <span className="text-[11px] text-muted-foreground">{subscription.price} cleared</span>
              </div>
            </div>

            {/* When Started Paying */}
            <div className="flex items-center justify-between pt-3.5">
              <span className="text-xs font-medium text-muted-foreground">When I Started Paying</span>
              <span className="font-semibold text-foreground">{subscription.startedDate}</span>
            </div>

            {/* Plan Chosen */}
            <div className="flex items-center justify-between pt-3.5">
              <span className="text-xs font-medium text-muted-foreground">Plan Chosen</span>
              <span className="font-semibold text-foreground">{subscription.plan}</span>
            </div>

            {/* Billing Cycle */}
            <div className="flex items-center justify-between pt-3.5">
              <span className="text-xs font-medium text-muted-foreground">Billing Cycle</span>
              <span className="font-semibold text-foreground">{subscription.cycle} (Auto-renews)</span>
            </div>

            {/* Renewal Reminder */}
            <div className="flex items-center justify-between pt-3.5">
              <span className="text-xs font-medium text-muted-foreground">Renewal Reminder</span>
              <span className="font-semibold text-foreground">Active (48h alert)</span>
            </div>

            {/* Category */}
            <div className="flex items-center justify-between pt-3.5">
              <span className="text-xs font-medium text-muted-foreground">Category</span>
              <span className="font-semibold text-foreground">{subscription.category}</span>
            </div>

            {/* Total Spent */}
            <div className="flex items-center justify-between pt-3.5">
              <span className="text-xs font-medium text-muted-foreground">Total Spent</span>
              <span className="font-semibold text-foreground">{subscription.totalSpent}</span>
            </div>
          </div>

          {/* ── Cancel Subscription Flow ── */}
          <div className="pt-4">

            {/* Step 0: idle — show button */}
            {cancelStep === 'idle' && (
              <Button
                type="button"
                variant="outline"
                onClick={() => setCancelStep('reason')}
                className="w-full h-11 rounded-xl text-xs font-semibold text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/30 gap-1.5 cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                Cancel Subscription
              </Button>
            )}

            {/* Step 1: Pick a reason */}
            {cancelStep === 'reason' && (
              <div className="rounded-2xl border border-border bg-accent/20 overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-200">
                <div className="px-4 pt-4 pb-3 border-b border-border/60">
                  <p className="text-sm font-bold text-foreground">Why are you cancelling?</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">Help us improve. Your answer won't affect anything.</p>
                </div>
                <div className="divide-y divide-border/60">
                  {CANCEL_REASONS.map((reason) => (
                    <button
                      key={reason}
                      type="button"
                      onClick={() => {
                        setSelectedReason(reason)
                        setCancelStep('confirm')
                      }}
                      className="w-full flex items-center justify-between px-4 py-3 text-left text-xs font-medium text-foreground hover:bg-accent/60 transition-colors cursor-pointer"
                    >
                      <span>{reason}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                    </button>
                  ))}
                </div>
                <div className="px-4 py-3 border-t border-border/60">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setCancelStep('idle')}
                    className="w-full text-xs text-muted-foreground"
                  >
                    Never mind, keep it
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Confirm + direct link */}
            {cancelStep === 'confirm' && !cancelled && (
              <div className="rounded-2xl border border-destructive/30 bg-destructive/5 overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-200">
                <div className="px-4 pt-4 pb-3">
                  <p className="text-sm font-bold text-foreground">Ready to cancel?</p>
                  {selectedReason && (
                    <p className="text-[11px] text-muted-foreground mt-0.5 italic">"{selectedReason}"</p>
                  )}
                  <p className="text-[12px] text-muted-foreground mt-2 leading-relaxed">
                    We'll remove <span className="font-semibold text-foreground">{subscription.name}</span> from your Paidly tracker and open its cancellation page so you can finish on their end.
                  </p>
                </div>

                {/* Primary: open provider page + remove from tracker */}
                <div className="px-4 pb-3 space-y-2">
                  <a
                    href={cancelUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      onCancelSubscription(subscription.id)
                      setCancelled(true)
                    }}
                    className="flex items-center justify-between w-full h-11 px-4 rounded-xl bg-destructive text-destructive-foreground text-xs font-semibold hover:bg-destructive/90 transition-colors"
                  >
                    <span>Cancel on {subscription.name}</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => { setCancelStep('idle'); setSelectedReason(null) }}
                    className="w-full text-xs text-muted-foreground"
                  >
                    Go back
                  </Button>
                </div>
              </div>
            )}

            {/* Done state */}
            {cancelled && (
              <div className="rounded-2xl border border-border bg-accent/30 px-4 py-5 text-center space-y-1 animate-in fade-in duration-300">
                <p className="text-sm font-bold text-foreground">Removed from Paidly ✓</p>
                <p className="text-[11px] text-muted-foreground">
                  Finish the rest on {subscription.name}'s website if you haven't already.
                </p>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="mt-1 text-xs"
                >
                  Close <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </div>
            )}

          </div>
        </div>
      </aside>
    </div>
  )
}
