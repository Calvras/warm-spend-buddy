import { Link, useRouterState, useNavigate } from '@tanstack/react-router'
import {
  ArrowLeft,
  Bell,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  CreditCard,
  Home,
  LayoutList,
  LogOut,
  Pencil,
  Plus,
  Trash2,
  User,
  X,
  Mail,
  ShieldCheck,
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import {
  getStoredCards,
  saveStoredCards,
  getStoredProfile,
  saveStoredProfile,
  getStoredNotifications,
  saveStoredNotifications,
  type CardItem,
  type UserProfile,
  type NotificationSettings,
} from '@/lib/cards-store'

export function Brand({ name }: { name: string }) {
  return (
    <span className={`service-logo service-${name}`} aria-hidden="true">
      {name === 'netflix' ? (
        <svg viewBox="0 0 40 54">
          <path d="M5 3h10v47L5 52zM25 3h10v49l-10-2z" fill="currentColor" />
          <path d="M5 3h10l20 49-10-2z" fill="currentColor" />
        </svg>
      ) : name === 'spotify' ? (
        <svg viewBox="0 0 50 50">
          <circle cx="25" cy="25" r="23" fill="currentColor" />
          <g className="spotify-lines" fill="none" strokeWidth="3.2" strokeLinecap="round">
            <path d="M12 18c9-3 18-2 27 2M14 25c8-2 15-1 22 2M16 32c6-1.5 12-1 18 2" />
          </g>
        </svg>
      ) : name === 'medium' ? (
        <svg viewBox="0 0 55 35">
          <ellipse cx="17" cy="18" rx="14" ry="14" fill="currentColor" />
          <ellipse cx="40" cy="18" rx="8" ry="13" fill="currentColor" />
          <ellipse cx="52" cy="18" rx="2" ry="12" fill="currentColor" />
        </svg>
      ) : name === 'youtube' ? (
        <svg viewBox="0 0 50 38">
          <rect x="2" y="3" width="46" height="32" rx="8" fill="currentColor" />
          <path className="youtube-play" d="m21 12 13 7-13 7z" />
        </svg>
      ) : (
        <svg viewBox="0 0 50 40" fill="none" stroke="currentColor" strokeWidth="3">
          <path d="M22 11c-10-11-24 3-17 14 4 7 12 7 17 2l6-6-7-7c-4-4-9-1-7 3l8 8c10 11 27-2 21-14-4-9-15-10-22-3l-4 4" />
          <path d="m26 12 8 8c4 4 8-1 5-5l-5-5" />
        </svg>
      )}
    </span>
  )
}

function SeeAll() {
  return (
    <Button asChild variant="ghost" className="see-all">
      <Link to="/subscriptions">
        See all
        <ChevronRight />
      </Link>
    </Button>
  )
}

const navItems = [
  { to: '/home', label: 'Home', icon: Home },
  { to: '/subscriptions', label: 'Subscriptions', icon: LayoutList },
  { to: '/profile', label: 'Profile', icon: User },
] as const

export function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const index = pathname.startsWith('/subscriptions') ? 1 : pathname.startsWith('/profile') ? 2 : 0
  return (
    <nav className="bottom-nav" aria-label="Main navigation">
      <span
        className="bottom-nav-indicator"
        style={{ transform: `translateX(${index * 52}px)` }}
        aria-hidden="true"
      />
      {navItems.map((item, i) => (
        <Button
          asChild
          variant="ghost"
          key={item.to}
          className={`bottom-nav-item ${i === index ? 'active' : ''}`}
          aria-label={item.label}
          aria-current={i === index ? 'page' : undefined}
        >
          <Link to={item.to}>
            <item.icon />
          </Link>
        </Button>
      ))}
    </nav>
  )
}

function AppleMark() {
  return (
    <svg fill="currentColor" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19.665 16.811a10.316 10.316 0 0 1-1.021 1.837c-.537.767-.978 1.297-1.316 1.592-.525.482-1.089.73-1.692.744-.432 0-.954-.123-1.562-.373-.61-.249-1.17-.371-1.683-.371-.537 0-1.113.122-1.73.371-.616.25-1.114.381-1.495.393-.577.025-1.154-.229-1.729-.764-.367-.32-.826-.87-1.377-1.648-.59-.829-1.075-1.794-1.455-2.891-.407-1.187-.611-2.335-.611-3.447 0-1.273.275-2.372.826-3.292a4.857 4.857 0 0 1 1.73-1.751 4.65 4.65 0 0 1 2.34-.662c.46 0 1.063.142 1.81.422s1.227.422 1.436.422c.158 0 .689-.167 1.593-.498.853-.307 1.573-.434 2.163-.384 1.6.129 2.801.759 3.6 1.895-1.43.867-2.137 2.08-2.123 3.637.012 1.213.453 2.222 1.317 3.023a4.33 4.33 0 0 0 1.315.863c-.106.307-.218.6-.336.882zM15.998 2.38c0 .95-.348 1.838-1.039 2.659-.836.976-1.846 1.541-2.941 1.452a2.955 2.955 0 0 1-.021-.36c0-.913.396-1.889 1.103-2.688.352-.404.8-.741 1.343-1.009.542-.264 1.054-.41 1.536-.435.013.128.019.255.019.381z" />
    </svg>
  )
}

function VisaMark() {
  return (
    <svg fill="currentColor" width="42" height="42" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M16.539 9.186a4.155 4.155 0 0 0-1.451-.251c-1.6 0-2.73.806-2.738 1.963-.01.85.803 1.329 1.418 1.613.631.292.842.476.84.737-.004.397-.504.577-.969.577-.639 0-.988-.089-1.525-.312l-.199-.093-.227 1.332c.389.162 1.09.301 1.814.313 1.701 0 2.813-.801 2.826-2.032.014-.679-.426-1.192-1.352-1.616-.563-.275-.912-.459-.912-.738 0-.247.299-.511.924-.511a2.95 2.95 0 0 1 1.213.229l.15.067.227-1.287-.039.009zm4.152-.143h-1.25c-.389 0-.682.107-.852.493l-2.404 5.446h1.701l.34-.893 2.076.002c.049.209.199.891.199.891h1.5l-1.31-5.939zm-10.642-.05h1.621l-1.014 5.942H9.037l1.012-5.944v.002zm-4.115 3.275.168.825 1.584-4.05h1.717l-2.551 5.931H5.139l-1.4-5.022a.339.339 0 0 0-.149-.199 6.948 6.948 0 0 0-1.592-.589l.022-.125h2.609c.354.014.639.125.734.503l.57 2.729v-.003zm12.757.606.646-1.662c-.008.018.133-.343.215-.566l.111.513.375 1.714H18.69v.001h.001z" />
    </svg>
  )
}

function MastercardMark() {
  return (
    <svg width="34" height="22" viewBox="0 0 36 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="#EB001B" fillOpacity="0.95" />
      <circle cx="24" cy="12" r="10" fill="#F79E1B" fillOpacity="0.95" />
      <path d="M18 4.7a10 10 0 0 1 0 14.6 10 10 0 0 1 0-14.6z" fill="#FF5F00" />
    </svg>
  )
}

export function FlipCard({
  card,
  isFlipped,
  onFlip,
}: {
  card: CardItem
  isFlipped: boolean
  onFlip: () => void
}) {
  return (
    <button
      type="button"
      className={`flip-card ${isFlipped ? 'flipped' : ''}`}
      onClick={onFlip}
      aria-pressed={isFlipped}
      aria-label="Card details, tap to flip"
    >
      <span className="flip-card-inner">
        <span className="flip-card-face flip-card-front">
          <span className="flip-card-top">
            <AppleMark />
            {card.brand === 'mastercard' ? <MastercardMark /> : <VisaMark />}
          </span>
          <span className="flip-card-holder">
            <span>{card.holder}</span>
            <span>{card.expiry}</span>
          </span>
          <span className="flip-card-number">{card.number}</span>
        </span>
        <span className="flip-card-face flip-card-back">
          <span className="flip-card-stripe" />
          <span className="flip-card-signature">
            <span className="flip-card-signature-strip">{card.holder}</span>
            <span className="flip-card-cvv">
              <small>CVV</small>
              <strong>{card.cvv}</strong>
            </span>
          </span>
          <span className="flip-card-back-note">Sample card — demo only</span>
        </span>
      </span>
    </button>
  )
}

// Add Card Modal Component
function AddCardModal({
  isOpen,
  onClose,
  onCardAdded,
}: {
  isOpen: boolean
  onClose: () => void
  onCardAdded: (newCard: CardItem) => void
}) {
  const [name, setName] = useState('Daniel Smith')
  const [number, setNumber] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvv, setCvv] = useState('')
  const [brand, setBrand] = useState<'visa' | 'mastercard'>('visa')

  if (!isOpen) return null

  const handleCardNumberChange = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 16)
    const formatted = digits.replace(/(\d{4})/g, '$1 ').trim()
    setNumber(formatted)
    if (digits.startsWith('5')) {
      setBrand('mastercard')
    } else {
      setBrand('visa')
    }
  }

  const handleExpiryChange = (val: string) => {
    const cleaned = val.replace(/\D/g, '').slice(0, 4)
    if (cleaned.length > 2) {
      setExpiry(`${cleaned.slice(0, 2)}/${cleaned.slice(2)}`)
    } else {
      setExpiry(cleaned)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const digits = number.replace(/\s/g, '')
    const last4 = digits.length >= 4 ? digits.slice(-4) : '6084'
    const newCard: CardItem = {
      id: `card-${Date.now()}`,
      holder: name.trim() || 'Daniel Smith',
      number: number.trim() || '4242 4242 4242 6084',
      last4: last4,
      expiry: expiry.trim() || '09/28',
      cvv: cvv.trim() || '123',
      brand: brand,
      isDefault: false,
    }
    onCardAdded(newCard)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={onClose} />
      <div className="relative z-50 w-full max-w-[420px] mx-auto bg-background rounded-t-[28px] p-6 shadow-2xl border-t border-border animate-in slide-in-from-bottom duration-300">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-bold">Add Another Card</h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-full hover:bg-accent text-foreground"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="welcome-field">
            Name on card
            <Input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Daniel Smith"
              autoComplete="off"
            />
          </label>
          <label className="welcome-field">
            Card number
            <Input
              required
              value={number}
              onChange={(e) => handleCardNumberChange(e.target.value)}
              placeholder="4242 4242 4242 4242"
              inputMode="numeric"
              maxLength={19}
              autoComplete="off"
            />
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className="welcome-field">
              Expiry
              <Input
                required
                value={expiry}
                onChange={(e) => handleExpiryChange(e.target.value)}
                placeholder="MM/YY"
                maxLength={5}
                autoComplete="off"
              />
            </label>
            <label className="welcome-field">
              CVV
              <Input
                required
                value={cvv}
                onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                placeholder="123"
                inputMode="numeric"
                maxLength={4}
                autoComplete="off"
              />
            </label>
          </div>
          <Button type="submit" className="welcome-primary w-full mt-2">
            Save Card
            <Check className="w-4 h-4 ml-1" />
          </Button>
        </form>
      </div>
    </div>
  )
}

export function MobileHome() {
  const [cards, setCards] = useState<CardItem[]>([])
  const [activeCardIndex, setActiveCardIndex] = useState(0)
  const [cardFlipped, setCardFlipped] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)

  useEffect(() => {
    setCards(getStoredCards())
  }, [])

  const currentCard = cards[activeCardIndex] || cards[0] || {
    id: 'default',
    holder: 'Daniel Smith',
    number: '4242 4242 4242 6084',
    last4: '6084',
    expiry: '09/27',
    cvv: '123',
    brand: 'visa',
  }

  const handleCardAdded = (newCard: CardItem) => {
    const updated = [...cards, newCard]
    setCards(updated)
    saveStoredCards(updated)
    setActiveCardIndex(updated.length - 1)
    setCardFlipped(false)
  }

  return (
    <main className="mobile-screen home-screen">
      {/* Clean header: removed 'Active' badge and removed 'Subscription Tracker' subtext */}
      <header className="flex items-center justify-between mb-4 px-1">
        <div className="flex items-center gap-2.5">
          <img
            src="/logo.png"
            alt="Paidly Logo"
            className="w-8 h-8 rounded-xl object-cover shadow-xs"
          />
          <h1 className="text-lg font-bold leading-tight text-foreground">Paidly</h1>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowAddModal(true)}
          className="h-7 px-2.5 text-xs font-medium rounded-full border-border bg-accent/60 hover:bg-accent text-foreground gap-1 shadow-2xs cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Card</span>
        </Button>
      </header>

      {/* Card Section with Multi-card Switcher */}
      <section className="home-card-section">
        <FlipCard
          card={currentCard}
          isFlipped={cardFlipped}
          onFlip={() => setCardFlipped(!cardFlipped)}
        />
        {cards.length > 1 && (
          <div className="flex items-center justify-center gap-2 mt-3">
            {cards.map((c, idx) => (
              <button
                key={c.id}
                type="button"
                onClick={() => {
                  setActiveCardIndex(idx)
                  setCardFlipped(false)
                }}
                className={`transition-all rounded-full ${
                  idx === activeCardIndex
                    ? 'w-5 h-1.5 bg-[var(--balance)]'
                    : 'w-1.5 h-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/60'
                }`}
                aria-label={`Card ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </section>

      {/* Upcoming Payments */}
      <section className="upcoming mt-5">
        <h2>Upcoming</h2>
        <div className="upcoming-pair">
          {[
            {
              name: 'Modern Transit',
              price: '$80.00',
              due: 'Due in 2 days',
              icon: CalendarDays,
            },
            {
              name: 'Grapplers Plus',
              price: '$51.00',
              due: 'Due in 5 days',
              icon: CreditCard,
            },
          ].map((item) => (
            <div className="upcoming-tile" key={item.name}>
              <div className="upcoming-tile-top">
                <span className="upcoming-icon">
                  <item.icon />
                </span>
                <div>
                  <strong>{item.price}</strong>
                  <small>{item.due}</small>
                </div>
                <ChevronRight className="upcoming-chevron" />
              </div>
              <p>{item.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Subscriptions List */}
      <section className="home-subscriptions">
        <div className="home-section-title">
          <h2>All Subscriptions</h2>
          <SeeAll />
        </div>
        <div className="home-list">
          {[
            { name: 'Netflix', brand: 'netflix', price: '$9.40', date: '12 Aug', tone: 'blue' },
            { name: 'Spotify', brand: 'spotify', price: '$9.99', date: '16 Aug', tone: 'yellow' },
            { name: 'Medium', brand: 'medium', price: '$20.00', date: '20 Aug', tone: 'green' },
          ].map((item) => (
            <Button
              asChild
              variant="ghost"
              className={`home-subscription tone-${item.tone}`}
              key={item.name}
            >
              <Link to="/subscriptions">
                <Brand name={item.brand} />
                <span className="home-service-text">
                  <strong>{item.name}</strong>
                  <small>Renews on {item.date}</small>
                </span>
                <span className="home-service-price">{item.price}</span>
                <ChevronRight className="row-chevron" />
              </Link>
            </Button>
          ))}
        </div>
      </section>

      <AddCardModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onCardAdded={handleCardAdded}
      />
    </main>
  )
}

const rows = [
  { id: 1, name: 'YouTube', brand: 'youtube', price: '$15.00', plan: 'Premium', due: 'Due in 5 days' },
  { id: 2, name: 'Spotify', brand: 'spotify', price: '$8.99', plan: 'Premium', due: 'Due in 12 days' },
  { id: 3, name: 'Netflix', brand: 'netflix', price: '$9.40', plan: 'Premium', due: 'Due in 12 days' },
  { id: 4, name: 'Adobe Creative Cloud', brand: 'adobe', price: '$22.00', plan: 'All Apps', due: 'Due in 10 days' },
  { id: 5, name: 'Spotify', brand: 'spotify', price: '$15.00', plan: 'Family Plan', due: 'Due in 8 days' },
]

export function MobileProfile() {
  const navigate = useNavigate()
  const [profile, setProfile] = useState<UserProfile>({
    name: 'Daniel Smith',
    email: 'daniel@example.com',
    phone: '+1 (555) 019-2834',
    initials: 'DS',
  })
  const [cards, setCards] = useState<CardItem[]>([])
  const [notifications, setNotifications] = useState<NotificationSettings>({
    pushAlerts: true,
    renewalReminders: true,
    weeklySummary: true,
    priceIncreaseAlerts: false,
  })

  // Modals for settings: 'edit-profile' | 'notifications' | 'payment-methods' | 'help' | 'logout' | null
  const [activeModal, setActiveModal] = useState<
    'edit-profile' | 'notifications' | 'payment-methods' | 'help' | 'logout' | null
  >(null)

  // Edit profile form state
  const [editName, setEditName] = useState('')
  const [editEmail, setEditEmail] = useState('')
  const [editPhone, setEditPhone] = useState('')

  // Add card form state for payment methods modal
  const [showAddCardInMethods, setShowAddCardInMethods] = useState(false)
  const [newCardNumber, setNewCardNumber] = useState('')
  const [newCardExpiry, setNewCardExpiry] = useState('')
  const [newCardCvv, setNewCardCvv] = useState('')

  useEffect(() => {
    const p = getStoredProfile()
    setProfile(p)
    setEditName(p.name)
    setEditEmail(p.email)
    setEditPhone(p.phone)

    setCards(getStoredCards())
    setNotifications(getStoredNotifications())
  }, [])

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault()
    const initials = editName
      .trim()
      .split(' ')
      .map((w) => w[0])
      .slice(0, 2)
      .join('')
      .toUpperCase() || 'DS'

    const updated: UserProfile = {
      name: editName.trim() || 'Daniel Smith',
      email: editEmail.trim() || 'daniel@example.com',
      phone: editPhone.trim() || '+1 (555) 019-2834',
      initials: initials,
    }
    setProfile(updated)
    saveStoredProfile(updated)
    setActiveModal(null)
  }

  const handleToggleNotification = (key: keyof NotificationSettings) => {
    const updated = { ...notifications, [key]: !notifications[key] }
    setNotifications(updated)
    saveStoredNotifications(updated)
  }

  const handleSetDefaultCard = (id: string) => {
    const updated = cards.map((c) => ({
      ...c,
      isDefault: c.id === id,
    }))
    setCards(updated)
    saveStoredCards(updated)
  }

  const handleDeleteCard = (id: string) => {
    if (cards.length <= 1) return
    const updated = cards.filter((c) => c.id !== id)
    if (!updated.some((c) => c.isDefault)) {
      updated[0].isDefault = true
    }
    setCards(updated)
    saveStoredCards(updated)
  }

  const handleAddCardInMethods = (e: React.FormEvent) => {
    e.preventDefault()
    const digits = newCardNumber.replace(/\s/g, '')
    const last4 = digits.length >= 4 ? digits.slice(-4) : '7721'
    const newCard: CardItem = {
      id: `card-${Date.now()}`,
      holder: profile.name,
      number: newCardNumber.trim() || '4532 1198 8823 7721',
      last4: last4,
      expiry: newCardExpiry.trim() || '11/28',
      cvv: newCardCvv.trim() || '442',
      brand: digits.startsWith('5') ? 'mastercard' : 'visa',
      isDefault: false,
    }
    const updated = [...cards, newCard]
    setCards(updated)
    saveStoredCards(updated)
    setShowAddCardInMethods(false)
    setNewCardNumber('')
    setNewCardExpiry('')
    setNewCardCvv('')
  }

  const defaultCard = cards.find((c) => c.isDefault) || cards[0] || {
    id: 'default',
    last4: '6084',
    brand: 'visa',
  }

  return (
    <main className="mobile-screen profile-screen">
      <header className="subscriptions-header">
        <Button asChild variant="ghost" size="icon" aria-label="Back">
          <Link to="/home">
            <ArrowLeft />
          </Link>
        </Button>
        <h1>Profile</h1>
        <img src="/logo.png" alt="Paidly" className="w-6 h-6 rounded-lg object-cover" />
      </header>

      {/* Profile Hero */}
      <section className="profile-hero">
        <div className="relative inline-block mx-auto mb-2">
          <span className="profile-avatar">{profile.initials}</span>
        </div>
        <h2>{profile.name}</h2>
        <p>{profile.email}</p>
      </section>

      {/* Mini Card showing user default card */}
      <section
        className="profile-mini-card cursor-pointer"
        onClick={() => setActiveModal('payment-methods')}
        title="Tap to manage payment methods"
      >
        <div>
          <span>Default Card</span>
          <strong>•••• {defaultCard.last4}</strong>
        </div>
        {defaultCard.brand === 'mastercard' ? <MastercardMark /> : <VisaMark />}
      </section>

      {/* Live Interactive Profile Options */}
      <div className="profile-list">
        <Button
          variant="ghost"
          className="profile-row cursor-pointer"
          onClick={() => setActiveModal('edit-profile')}
        >
          <span className="profile-row-icon">
            <Pencil />
          </span>
          Edit Profile
          <ChevronRight className="row-chevron" />
        </Button>

        <Button
          variant="ghost"
          className="profile-row cursor-pointer"
          onClick={() => setActiveModal('notifications')}
        >
          <span className="profile-row-icon">
            <Bell />
          </span>
          Notifications
          <ChevronRight className="row-chevron" />
        </Button>

        <Button
          variant="ghost"
          className="profile-row cursor-pointer"
          onClick={() => setActiveModal('payment-methods')}
        >
          <span className="profile-row-icon">
            <CreditCard />
          </span>
          Payment Methods
          <ChevronRight className="row-chevron" />
        </Button>

        <Button
          variant="ghost"
          className="profile-row cursor-pointer"
          onClick={() => setActiveModal('help')}
        >
          <span className="profile-row-icon">
            <CircleHelp />
          </span>
          Help & Support
          <ChevronRight className="row-chevron" />
        </Button>
      </div>

      {/* Log Out Button */}
      <Button
        type="button"
        className="profile-logout cursor-pointer"
        onClick={() => setActiveModal('logout')}
      >
        <LogOut />
        Log out
      </Button>

      {/* 1. Edit Profile Modal */}
      {activeModal === 'edit-profile' && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setActiveModal(null)} />
          <div className="relative z-50 w-full max-w-[420px] mx-auto bg-background rounded-t-[28px] p-6 shadow-2xl border-t border-border animate-in slide-in-from-bottom duration-300">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-bold">Edit Profile</h2>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="p-1 rounded-full hover:bg-accent text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <label className="welcome-field">
                Full name
                <Input
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="Daniel Smith"
                />
              </label>
              <label className="welcome-field">
                Email address
                <Input
                  type="email"
                  required
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  placeholder="daniel@example.com"
                />
              </label>
              <label className="welcome-field">
                Phone number
                <Input
                  type="tel"
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                />
              </label>
              <Button type="submit" className="welcome-primary w-full mt-2">
                Save Changes
                <Check className="w-4 h-4 ml-1" />
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* 2. Notifications Modal */}
      {activeModal === 'notifications' && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setActiveModal(null)} />
          <div className="relative z-50 w-full max-w-[420px] mx-auto bg-background rounded-t-[28px] p-6 shadow-2xl border-t border-border animate-in slide-in-from-bottom duration-300">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-bold">Notification Settings</h2>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="p-1 rounded-full hover:bg-accent text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-accent/50 border border-border/60">
                <div>
                  <h4 className="text-xs font-semibold">Push Notifications</h4>
                  <p className="text-[11px] text-muted-foreground">Receive device alerts for payments</p>
                </div>
                <Switch
                  checked={notifications.pushAlerts}
                  onCheckedChange={() => handleToggleNotification('pushAlerts')}
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-accent/50 border border-border/60">
                <div>
                  <h4 className="text-xs font-semibold">Renewal Reminders</h4>
                  <p className="text-[11px] text-muted-foreground">Alert 2 days prior to subscription charge</p>
                </div>
                <Switch
                  checked={notifications.renewalReminders}
                  onCheckedChange={() => handleToggleNotification('renewalReminders')}
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-accent/50 border border-border/60">
                <div>
                  <h4 className="text-xs font-semibold">Weekly Spend Summary</h4>
                  <p className="text-[11px] text-muted-foreground">Every Sunday subscription digest</p>
                </div>
                <Switch
                  checked={notifications.weeklySummary}
                  onCheckedChange={() => handleToggleNotification('weeklySummary')}
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-accent/50 border border-border/60">
                <div>
                  <h4 className="text-xs font-semibold">Price Increase Alerts</h4>
                  <p className="text-[11px] text-muted-foreground">Notify when service rates change</p>
                </div>
                <Switch
                  checked={notifications.priceIncreaseAlerts}
                  onCheckedChange={() => handleToggleNotification('priceIncreaseAlerts')}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. Payment Methods Modal */}
      {activeModal === 'payment-methods' && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setActiveModal(null)} />
          <div className="relative z-50 w-full max-w-[420px] mx-auto bg-background rounded-t-[28px] p-6 shadow-2xl border-t border-border animate-in slide-in-from-bottom duration-300 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold">Payment Methods</h2>
              <button
                type="button"
                onClick={() => {
                  setActiveModal(null)
                  setShowAddCardInMethods(false)
                }}
                className="p-1 rounded-full hover:bg-accent text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cards List */}
            <div className="space-y-3 mb-4">
              {cards.map((c) => (
                <div
                  key={c.id}
                  className="flex items-center justify-between p-3.5 rounded-xl border border-border bg-accent/40"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-7 rounded-md bg-background border border-border flex items-center justify-center">
                      {c.brand === 'mastercard' ? <MastercardMark /> : <VisaMark />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <strong className="text-xs font-semibold">•••• {c.last4}</strong>
                        {c.isDefault && (
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-[var(--balance)] text-white">
                            DEFAULT
                          </span>
                        )}
                      </div>
                      <small className="text-[11px] text-muted-foreground">Expires {c.expiry}</small>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {!c.isDefault && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleSetDefaultCard(c.id)}
                        className="h-7 text-[11px] px-2"
                      >
                        Set Default
                      </Button>
                    )}
                    {cards.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleDeleteCard(c.id)}
                        className="p-1.5 text-muted-foreground hover:text-destructive rounded-md"
                        aria-label="Delete card"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Toggle Add Card Form */}
            {!showAddCardInMethods ? (
              <Button
                variant="outline"
                onClick={() => setShowAddCardInMethods(true)}
                className="w-full h-10 rounded-xl text-xs gap-1.5 font-medium border-dashed"
              >
                <Plus className="w-4 h-4" />
                Add Another Card
              </Button>
            ) : (
              <form onSubmit={handleAddCardInMethods} className="p-3.5 rounded-xl border border-border bg-accent/20 space-y-3">
                <h4 className="text-xs font-bold text-foreground">New Card Details</h4>
                <Input
                  required
                  value={newCardNumber}
                  onChange={(e) => {
                    const digits = e.target.value.replace(/\D/g, '').slice(0, 16)
                    setNewCardNumber(digits.replace(/(\d{4})/g, '$1 ').trim())
                  }}
                  placeholder="Card Number"
                  inputMode="numeric"
                  maxLength={19}
                />
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    required
                    value={newCardExpiry}
                    onChange={(e) => {
                      const cleaned = e.target.value.replace(/\D/g, '').slice(0, 4)
                      setNewCardExpiry(cleaned.length > 2 ? `${cleaned.slice(0, 2)}/${cleaned.slice(2)}` : cleaned)
                    }}
                    placeholder="MM/YY"
                    maxLength={5}
                  />
                  <Input
                    required
                    value={newCardCvv}
                    onChange={(e) => setNewCardCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                    placeholder="CVV"
                    inputMode="numeric"
                    maxLength={4}
                  />
                </div>
                <div className="flex gap-2 pt-1">
                  <Button type="button" variant="ghost" size="sm" onClick={() => setShowAddCardInMethods(false)} className="flex-1 text-xs">
                    Cancel
                  </Button>
                  <Button type="submit" size="sm" className="flex-1 text-xs bg-[var(--balance)] text-white">
                    Add Card
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* 4. Help & Support Modal */}
      {activeModal === 'help' && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setActiveModal(null)} />
          <div className="relative z-50 w-full max-w-[420px] mx-auto bg-background rounded-t-[28px] p-6 shadow-2xl border-t border-border animate-in slide-in-from-bottom duration-300 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold">Help & Support</h2>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="p-1 rounded-full hover:bg-accent text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-3.5 rounded-xl bg-accent/40 border border-border/70 space-y-1.5">
                <h4 className="font-semibold text-foreground flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  Is my card information secure?
                </h4>
                <p className="text-muted-foreground leading-relaxed">
                  Yes. Paidly operates strictly client-side for subscription tracking. Real card data is never transmitted, processed by remote processors, or stored on public servers.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-accent/40 border border-border/70 space-y-1.5">
                <h4 className="font-semibold text-foreground">How do renewal alerts work?</h4>
                <p className="text-muted-foreground leading-relaxed">
                  Paidly calculates upcoming charge dates based on the billing interval you select and notifies you 48 hours before charges occur.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-accent/40 border border-border/70 space-y-1.5">
                <h4 className="font-semibold text-foreground">How do I cancel a subscription?</h4>
                <p className="text-muted-foreground leading-relaxed">
                  You can tap any subscription on the &ldquo;My Subscriptions&rdquo; page and choose &ldquo;Cancel Subscription&rdquo; to remove it from your tracker schedule.
                </p>
              </div>

              <a
                href="mailto:support@paidly.app"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-xs bg-primary text-primary-foreground hover:bg-primary/90 transition-colors mt-2"
              >
                <Mail className="w-4 h-4" />
                Contact Support Team
              </a>
            </div>
          </div>
        </div>
      )}

      {/* 5. Log Out Confirmation Modal */}
      {activeModal === 'logout' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setActiveModal(null)} />
          <div className="relative z-50 w-full max-w-[340px] bg-background rounded-2xl p-6 shadow-2xl border border-border text-center space-y-3 animate-in zoom-in-95 duration-200">
            <div className="w-11 h-11 rounded-full bg-destructive/10 text-destructive flex items-center justify-center mx-auto">
              <LogOut className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-foreground">Log out of Paidly?</h3>
            <p className="text-xs text-muted-foreground">
              You can log back in anytime with your demo account.
            </p>
            <div className="flex gap-2.5 pt-2">
              <Button
                variant="outline"
                onClick={() => setActiveModal(null)}
                className="flex-1 text-xs h-9"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  setActiveModal(null)
                  navigate({ to: '/auth' })
                }}
                className="flex-1 text-xs h-9 bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Log Out
              </Button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

export function MobileSubscriptions() {
  const [expanded, setExpanded] = useState<number | null>(null)
  return (
    <main className="mobile-screen subscriptions-screen">
      <header className="subscriptions-header">
        <Button asChild variant="ghost" size="icon" aria-label="Back">
          <Link to="/home">
            <ArrowLeft />
          </Link>
        </Button>
        <h1>My Subscriptions</h1>
        <img src="/logo.png" alt="Paidly" className="w-6 h-6 rounded-lg object-cover" />
      </header>
      <div className="subscriptions-list">
        {rows.map((row) => (
          <article
            key={row.id}
            className={`subscription-tile ${expanded === row.id ? 'expanded' : ''}`}
          >
            <Button
              variant="ghost"
              className="subscription-tile-row"
              onClick={() => setExpanded(expanded === row.id ? null : row.id)}
              aria-expanded={expanded === row.id}
            >
              <Brand name={row.brand} />
              <span className="service-text">
                <strong>{row.name}</strong>
                <small>{row.plan}</small>
              </span>
              <span className="service-payment">
                <strong>{row.price}</strong>
                <small>{row.due}</small>
              </span>
              <ChevronRight className="row-chevron" />
            </Button>
            {expanded === row.id && (
              <div className="expanded-info">
                <div className="expanded-info-row">
                  <div>
                    <span>Payment Info</span>
                    <small>•••• 6084</small>
                  </div>
                  <Button variant="outline" className="manage-button">
                    Manage
                  </Button>
                </div>
                <div className="expanded-info-row">
                  <div>
                    <span>Plan details</span>
                    <small>{row.plan}</small>
                  </div>
                  <Button variant="outline" className="manage-button">
                    Change
                  </Button>
                </div>
                <Button className="cancel-subscription">Cancel Subscription</Button>
              </div>
            )}
          </article>
        ))}
      </div>
    </main>
  )
}
