import { useEffect, useState } from 'react'
import { Link, useNavigate } from '@tanstack/react-router'
import { ArrowLeft, ArrowRight, Building2, Check, CreditCard, Eye, EyeOff, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { LegalModal, type LegalDocType } from '@/components/legal-modal'
import {
  isUserLoggedIn,
  setStoredAuth,
  saveStoredProfile,
  getStoredCards,
  saveStoredCards,
  getStoredSubscriptions,
  saveStoredSubscriptions,
  saveActiveCardId,
  type CardItem,
} from '@/lib/cards-store'
import { createLinkTokenFn, exchangePublicTokenFn } from '@/lib/plaid-api'

function CardVisual({ checking = false }: { checking?: boolean }) {
  return (
    <div className={`welcome-card ${checking ? 'card-checking' : ''}`}>
      <div className="welcome-card-top">
        <div className="flex items-center gap-1.5">
          <CreditCard className="w-5 h-5 text-current opacity-85" />
          <span>Debit Card</span>
        </div>
      </div>
      <div className="card-chip">
        <i />
        <i />
        <i />
      </div>
      <div className="welcome-card-number">•••• &nbsp; •••• &nbsp; •••• &nbsp; 6084</div>
      <div className="welcome-card-bottom">
        <span>DANIEL SMITH</span>
        <span>09/28</span>
      </div>
    </div>
  )
}

export function CardIntro() {
  const navigate = useNavigate()
  useEffect(() => {
    const loggedIn = isUserLoggedIn()
    const timer = setTimeout(() => {
      if (loggedIn) {
        navigate({ to: '/home', replace: true })
      } else {
        navigate({ to: '/auth', replace: true })
      }
    }, loggedIn ? 1400 : 2800)
    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <main className="mobile-screen intro-screen">
      <div className="intro-art">
        <div className="card-shadow" />
        <CardVisual />
      </div>
      <div className="intro-title">
        <div className="flex items-center justify-center gap-2.5 mb-2">
          <img src="/logo.png" alt="Paidly Logo" className="w-9 h-9 rounded-xl object-cover shadow-sm" />
          <h1 className="text-2xl font-bold tracking-tight">Paidly</h1>
        </div>
        <p>A little clarity. All in one place.</p>
      </div>
      <div className="intro-loader" aria-label="Loading">
        <i />
        <i />
        <i />
      </div>
    </main>
  )
}

export function AuthScreen() {
  const navigate = useNavigate()
  const [login, setLogin] = useState(false)
  const [visible, setVisible] = useState(false)
  const [forgot, setForgot] = useState(false)
  const [sent, setSent] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const [name, setName] = useState('Daniel Smith')
  const [email, setEmail] = useState('daniel@example.com')
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [legalDoc, setLegalDoc] = useState<LegalDocType>(null)

  useEffect(() => {
    if (isUserLoggedIn()) {
      navigate({ to: '/home', replace: true })
    }
  }, [navigate])

  return (
    <main className="mobile-screen onboarding-screen">
      <header className="onboarding-top">
        <Button asChild variant="ghost" size="icon" aria-label="Back">
          <Link to="/">
            <ArrowLeft />
          </Link>
        </Button>
      </header>
      <div className="auth-mark overflow-hidden shadow-sm">
        <img src="/logo.png" alt="Paidly Logo" className="w-full h-full object-cover rounded-[15px]" />
      </div>
      <div className="onboarding-heading">
        <h1>{forgot ? 'Reset your password' : login ? 'Welcome back.' : 'A fresh start.'}</h1>
        <p>
          {forgot
            ? 'Enter your email to receive recovery instructions.'
            : login
              ? 'Good to see you again.'
              : 'Keep everything you subscribe to, together.'}
        </p>
      </div>

      {sent ? (
        <div className="demo-message">
          <Check />
          <h2>Email Sent</h2>
          <p>We sent a secure password reset link to your email address.</p>
          <Button
            onClick={() => {
              setForgot(false)
              setSent(false)
            }}
          >
            Back to login
          </Button>
        </div>
      ) : (
        <form
          className="onboarding-form"
          onSubmit={(e) => {
            e.preventDefault()
            if (forgot) {
              setSent(true)
              return
            }
            if (login) {
              setStoredAuth(true)
              navigate({ to: '/home', replace: true })
              return
            }
            if (!agreed) {
              setErrorMsg('Please confirm you are 18+ and accept the Terms to continue.')
              return
            }
            setErrorMsg(null)
            setStoredAuth(true)
            if (name.trim()) {
              const initials =
                name
                  .trim()
                  .split(' ')
                  .map((w) => w[0])
                  .slice(0, 2)
                  .join('')
                  .toUpperCase() || 'DS'
              saveStoredProfile({
                name: name.trim(),
                email: email.trim() || 'daniel@example.com',
                phone: '+1 (555) 019-2834',
                initials,
              })
            }
            navigate({ to: '/connect-card' })
          }}
        >
          {!login && !forgot && (
            <label className="welcome-field">
              Full name
              <Input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                placeholder="Daniel Smith"
              />
            </label>
          )}
          <label className="welcome-field">
            Email address
            <Input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              placeholder="daniel@example.com"
            />
          </label>
          {!forgot && (
            <label className="welcome-field">
              Password
              <div className="password-field">
                <Input
                  type={visible ? 'text' : 'password'}
                  required
                  minLength={6}
                  autoComplete="current-password"
                  placeholder="At least 6 characters"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label={visible ? 'Hide password' : 'Show password'}
                  onClick={() => setVisible(!visible)}
                >
                  {visible ? <EyeOff /> : <Eye />}
                </Button>
              </div>
            </label>
          )}

          {/* Terms of Service & Privacy Policy checkbox with 18+ confirmation */}
          {!login && !forgot && (
            <div className="space-y-1.5 pt-0.5">
              <div className="flex items-start gap-2.5 text-xs text-muted-foreground leading-snug">
                <Checkbox
                  id="terms-agreement"
                  checked={agreed}
                  onCheckedChange={(val) => {
                    setAgreed(!!val)
                    if (val) setErrorMsg(null)
                  }}
                  className="mt-0.5 cursor-pointer"
                />
                <label htmlFor="terms-agreement" className="select-none cursor-pointer">
                  I confirm I am{' '}
                  <span className="font-semibold text-foreground">18 years or older</span>
                  {', '}and I agree to Paidly's{' '}
                  <button
                    type="button"
                    onClick={() => setLegalDoc('terms')}
                    className="text-foreground font-semibold underline underline-offset-2 hover:opacity-80 transition-opacity cursor-pointer"
                  >
                    Terms of Service
                  </button>{' '}
                  and{' '}
                  <button
                    type="button"
                    onClick={() => setLegalDoc('privacy')}
                    className="text-foreground font-semibold underline underline-offset-2 hover:opacity-80 transition-opacity cursor-pointer"
                  >
                    Privacy Policy
                  </button>
                  .
                </label>
              </div>
              {errorMsg && <p className="text-[11px] text-destructive font-medium pl-6">{errorMsg}</p>}
            </div>
          )}

          {login && !forgot && (
            <Button
              type="button"
              variant="link"
              className="forgot-link"
              onClick={() => setForgot(true)}
            >
              Forgot password?
            </Button>
          )}
          <Button type="submit" className="welcome-primary">
            {forgot ? 'Send reset link' : login ? 'Log in' : 'Create account'}
            <ArrowRight />
          </Button>
        </form>
      )}

      <div className="auth-switch">
        {forgot ? (
          <Button
            variant="link"
            onClick={() => {
              setForgot(false)
              setSent(false)
            }}
          >
            Back to login
          </Button>
        ) : (
          <>
            <span>{login ? 'New here?' : 'Already have an account?'}</span>
            <Button
              variant="link"
              onClick={() => {
                setLogin(!login)
                setErrorMsg(null)
              }}
            >
              {login ? 'Sign up' : 'Log in'}
            </Button>
          </>
        )}
      </div>

      {/* Swipe-up Legal Modal */}
      <LegalModal type={legalDoc} onClose={() => setLegalDoc(null)} />
    </main>
  )
}

export function ConnectCardScreen() {
  const navigate = useNavigate()
  const [stage, setStage] = useState<'entry' | 'checking' | 'ready'>('entry')
  const [number, setNumber] = useState('4242 4242 4242 6084')
  const [expiry, setExpiry] = useState('09/28')
  const [progress, setProgress] = useState(0)
  const [isPlaidLoading, setIsPlaidLoading] = useState(false)
  const [plaidError, setPlaidError] = useState<string | null>(null)

  useEffect(() => {
    if (stage !== 'checking') return
    const timer = setInterval(() => setProgress((p) => Math.min(p + 1, 3)), 800)
    return () => clearInterval(timer)
  }, [stage])

  useEffect(() => {
    if (stage === 'checking' && progress === 3) {
      const timer = setTimeout(() => setStage('ready'), 400)
      return () => clearTimeout(timer)
    }
    return undefined
  }, [stage, progress])

  // Handle Plaid Live Bank Connection
  const handleConnectPlaid = async () => {
    setIsPlaidLoading(true)
    setPlaidError(null)
    try {
      const tokenRes = await createLinkTokenFn()
      if (tokenRes.error || !tokenRes.link_token) {
        setPlaidError(tokenRes.error || 'Could not connect to bank authentication servers.')
        setIsPlaidLoading(false)
        return
      }

      if (typeof (window as any).Plaid === 'undefined') {
        setPlaidError('Banking security interface is loading. Please tap again.')
        setIsPlaidLoading(false)
        return
      }

      const plaidHandler = (window as any).Plaid.create({
        token: tokenRes.link_token,
        onSuccess: async (public_token: string, metadata: any) => {
          setIsPlaidLoading(true)
          const exchangeResult = await exchangePublicTokenFn({
            data: {
              public_token,
              institution_name: metadata?.institution?.name,
            },
          })

          if (exchangeResult.error) {
            setPlaidError(exchangeResult.error)
            setIsPlaidLoading(false)
            return
          }

          if (exchangeResult.cards && exchangeResult.cards.length > 0) {
            const existing = getStoredCards()
            const updated = [...exchangeResult.cards, ...existing]
            saveStoredCards(updated)
            saveActiveCardId(exchangeResult.cards[0].id)
          }

          if (exchangeResult.subscriptions && exchangeResult.subscriptions.length > 0) {
            const existingSubs = getStoredSubscriptions()
            const updatedSubs = [...exchangeResult.subscriptions, ...existingSubs]
            saveStoredSubscriptions(updatedSubs)
          }

          setStoredAuth(true)
          navigate({ to: '/home', replace: true })
        },
        onExit: (err: any) => {
          setIsPlaidLoading(false)
          if (err) {
            console.warn('Plaid Link exited:', err)
          }
        },
      })

      plaidHandler.open()
    } catch (err: any) {
      setPlaidError(err?.message || 'Error initializing bank link')
      setIsPlaidLoading(false)
    }
  }

  // Handle Manual Card Form
  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setProgress(0)
    setStage('checking')

    const digits = number.replace(/\s/g, '')
    const last4 = digits.length >= 4 ? digits.slice(-4) : '6084'
    const newCard: CardItem = {
      id: `card-${Date.now()}`,
      holder: 'Daniel Smith',
      number: number.trim() || '4242 4242 4242 6084',
      last4: last4,
      expiry: expiry.trim() || '09/28',
      cvv: '123',
      brand: digits.startsWith('5') ? 'mastercard' : 'visa',
      isDefault: true,
    }

    const currentCards = getStoredCards()
    saveStoredCards([newCard, ...currentCards])
    saveActiveCardId(newCard.id)
  }

  return (
    <main className="mobile-screen onboarding-screen card-onboarding">
      <header className="onboarding-top">
        <Button asChild variant="ghost" size="icon" aria-label="Back">
          <Link to="/auth">
            <ArrowLeft />
          </Link>
        </Button>
      </header>

      <div className="connect-card-art">
        <CardVisual checking={stage === 'checking'} />
        {stage === 'ready' && (
          <span className="card-success">
            <Check />
          </span>
        )}
      </div>

      <div className="onboarding-heading">
        <h1>{stage === 'entry' ? 'Add your card.' : stage === 'checking' ? 'Verifying card...' : 'Card Verified'}</h1>
        <p>
          {stage === 'entry'
            ? 'Connect your bank via Plaid to auto-detect subscriptions, or enter your card manually.'
            : stage === 'checking'
              ? 'Authenticating card issuer and running security verification...'
              : 'Card authenticated successfully. Your subscriptions are ready.'}
        </p>
      </div>

      {stage === 'entry' ? (
        <div className="space-y-4">
          {/* Primary Option: Real Plaid Bank Link */}
          <Button
            type="button"
            onClick={handleConnectPlaid}
            disabled={isPlaidLoading}
            className="welcome-primary w-full h-12 bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 text-xs shadow-sm hover:bg-primary/95 transition-all"
          >
            {isPlaidLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Connecting to Bank...</span>
              </>
            ) : (
              <>
                <Building2 className="w-4 h-4" />
                <span>Connect with Bank (Plaid)</span>
                <ArrowRight className="w-3.5 h-3.5 ml-auto opacity-75" />
              </>
            )}
          </Button>

          {plaidError && (
            <p className="text-xs text-destructive text-center bg-destructive/10 p-2 rounded-lg">
              {plaidError}
            </p>
          )}

          <div className="flex items-center gap-3 my-2">
            <div className="flex-1 h-px bg-border" />
            <span className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold">
              Or enter card manually
            </span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <form className="onboarding-form" onSubmit={handleManualSubmit}>
            <label className="welcome-field">
              Name on card
              <Input required defaultValue="Daniel Smith" autoComplete="name" />
            </label>
            <label className="welcome-field">
              Card number
              <Input
                required
                value={number}
                onChange={(e) =>
                  setNumber(e.target.value.replace(/[^\d ]/g, '').slice(0, 23))
                }
                pattern="[0-9 ]{16,23}"
                inputMode="numeric"
                autoComplete="cc-number"
              />
            </label>
            <div className="card-form-pair">
              <label className="welcome-field">
                Expiry date
                <Input
                  required
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  pattern="[0-9]{2}/[0-9]{2}"
                  placeholder="MM/YY"
                  maxLength={5}
                  autoComplete="cc-exp"
                />
              </label>
              <label className="welcome-field">
                Security code (CVV)
                <Input
                  required
                  defaultValue="123"
                  pattern="[0-9]{3,4}"
                  maxLength={4}
                  inputMode="numeric"
                  autoComplete="cc-csc"
                />
              </label>
            </div>
            <Button type="submit" variant="outline" className="w-full h-11 text-xs font-semibold rounded-lg mt-1">
              Verify card & link
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </form>
        </div>
      ) : stage === 'checking' ? (
        <div className="check-steps" aria-live="polite">
          {[
            'Validating card number & BIN network',
            'Running bank fraud & card legitimacy check',
            'Detecting active recurring subscriptions',
          ].map((text, i) => (
            <div key={text} className={`check-step ${progress > i ? 'complete' : ''}`}>
              <span>{progress > i ? <Check /> : <i className={progress === i ? 'step-spinner' : ''} />}</span>
              {text}
            </div>
          ))}
        </div>
      ) : (
        <div className="sample-result pt-2 pb-1 text-center">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center justify-center mx-auto mb-3 shadow-xs">
            <Check className="w-7 h-7 stroke-[2.5]" />
          </div>
          <h3 className="text-xl font-bold text-foreground">Card Authenticated</h3>
          <p className="text-xs text-muted-foreground mt-1 mb-5">
            Card validated with bank issuer. Active subscriptions detected.
          </p>
          <Button
            className="welcome-primary"
            onClick={() => {
              setStoredAuth(true)
              navigate({ to: '/home', replace: true })
            }}
          >
            Open Dashboard
            <ArrowRight />
          </Button>
        </div>
      )}
    </main>
  )
}
