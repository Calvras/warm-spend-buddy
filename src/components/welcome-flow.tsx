import { useEffect, useState } from 'react'
import { Link, useNavigate } from '@tanstack/react-router'
import { ArrowLeft, ArrowRight, Check, CreditCard, Eye, EyeOff, LockKeyhole } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { LegalModal, type LegalDocType } from '@/components/legal-modal'
import { isUserLoggedIn, setStoredAuth, saveStoredProfile } from '@/lib/cards-store'

function DemoCard({checking=false}:{checking?:boolean}) {
 return (
  <div className={`welcome-card ${checking?'card-checking':''}`}>
   <div className="welcome-card-top">
    <div className="flex items-center gap-1.5">
     <CreditCard className="w-5 h-5 text-current opacity-85" />
     <span>Debit Card</span>
    </div>
   </div>
   <div className="card-chip"><i/><i/><i/></div>
   <div className="welcome-card-number">Ã¢â‚¬Â¢Ã¢â‚¬Â¢Ã¢â‚¬Â¢Ã¢â‚¬Â¢ &nbsp; Ã¢â‚¬Â¢Ã¢â‚¬Â¢Ã¢â‚¬Â¢Ã¢â‚¬Â¢ &nbsp; Ã¢â‚¬Â¢Ã¢â‚¬Â¢Ã¢â‚¬Â¢Ã¢â‚¬Â¢ &nbsp; 6084</div>
   <div className="welcome-card-bottom"><span>DANIEL SMITH</span><span>09/27</span></div>
  </div>
 )
}

export function CardIntro() {
 const navigate=useNavigate()
 useEffect(()=>{
  const loggedIn = isUserLoggedIn()
  const timer=setTimeout(()=>{
   if (loggedIn) {
    navigate({to:'/home',replace:true})
   } else {
    navigate({to:'/auth',replace:true})
   }
  }, loggedIn ? 1400 : 2800)
  return()=>clearTimeout(timer)
 },[navigate])
 return (
  <main className="mobile-screen intro-screen">
   <div className="intro-art">
    <div className="card-shadow"/>
    <DemoCard/>
   </div>
   <div className="intro-title">
    <div className="flex items-center justify-center gap-2.5 mb-2">
     <img src="/logo.png" alt="Paidly Logo" className="w-9 h-9 rounded-xl object-cover shadow-sm" />
     <h1 className="text-2xl font-bold tracking-tight">Paidly</h1>
    </div>
    <p>A little clarity. All in one place.</p>
   </div>
   <div className="intro-loader" aria-label="Loading"><i/><i/><i/></div>
  </main>
 )
}

export function AuthScreen() {
 const navigate=useNavigate()
 const [login,setLogin]=useState(false)
 const [visible,setVisible]=useState(false)
 const [forgot,setForgot]=useState(false)
 const [sent,setSent]=useState(false)
 const [agreed,setAgreed]=useState(false)
 const [name,setName]=useState('Daniel Smith')
 const [email,setEmail]=useState('daniel@example.com')
 const [errorMsg,setErrorMsg]=useState<string|null>(null)
 const [legalDoc,setLegalDoc]=useState<LegalDocType>(null)

 useEffect(()=>{
  if (isUserLoggedIn()) {
   navigate({to:'/home',replace:true})
  }
 },[navigate])

 return (
  <main className="mobile-screen onboarding-screen">
   <header className="onboarding-top">
    <Button asChild variant="ghost" size="icon" aria-label="Back">
     <Link to="/"><ArrowLeft/></Link>
    </Button>
    <span className="demo-label">DEMO</span>
   </header>
   <div className="auth-mark overflow-hidden shadow-sm">
    <img src="/logo.png" alt="Paidly Logo" className="w-full h-full object-cover rounded-[15px]" />
   </div>
   <div className="onboarding-heading">
    <h1>{forgot?'Reset your password':login?'Welcome back.':'A fresh start.'}</h1>
    <p>{forgot?'Enter your email to preview password recovery.':login?'Good to see you again.':'Keep everything you subscribe to, together.'}</p>
   </div>
   {sent ? (
    <div className="demo-message">
     <Check/>
     <h2>Email preview complete</h2>
     <p>No email was sent. This is a demo.</p>
     <Button onClick={()=>{setForgot(false);setSent(false)}}>Back to login</Button>
    </div>
   ) : (
    <form className="onboarding-form" onSubmit={e=>{
      e.preventDefault();
      if (forgot) {
        setSent(true);
        return;
      }
      if (login) {
        setStoredAuth(true);
        navigate({to:'/home',replace:true});
        return;
      }
      if (!agreed) {
        setErrorMsg("Please accept the Terms of Service and Privacy Policy to continue.");
        return;
      }
      setErrorMsg(null);
      setStoredAuth(true);
      if (name.trim()) {
        const initials = name
          .trim()
          .split(' ')
          .map((w) => w[0])
          .slice(0, 2)
          .join('')
          .toUpperCase() || 'DS';
        saveStoredProfile({
          name: name.trim(),
          email: email.trim() || 'daniel@example.com',
          phone: '+1 (555) 019-2834',
          initials,
        });
      }
      navigate({to:'/connect-card'});
    }}>
     {!login&&!forgot&&<label className="welcome-field">Full name<Input required value={name} onChange={e=>setName(e.target.value)} autoComplete="off" placeholder="Daniel Smith"/></label>}
     <label className="welcome-field">Email address<Input type="email" required value={email} onChange={e=>setEmail(e.target.value)} autoComplete="off" placeholder="daniel@example.com"/></label>
     {!forgot&&<label className="welcome-field">Password<div className="password-field"><Input type={visible?'text':'password'} required minLength={6} autoComplete="off" placeholder="At least 6 characters"/><Button type="button" variant="ghost" size="icon" aria-label={visible?'Hide password':'Show password'} onClick={()=>setVisible(!visible)}>{visible?<EyeOff/>:<Eye/>}</Button></div></label>}
     
     {/* Terms of Service & Privacy Policy checkbox for Sign up */}
     {!login && !forgot && (
      <div className="space-y-1.5 pt-0.5">
       <div className="flex items-start gap-2.5 text-xs text-muted-foreground leading-snug">
        <Checkbox
          id="terms-agreement"
          checked={agreed}
          onCheckedChange={(val) => {
            setAgreed(!!val);
            if (val) setErrorMsg(null);
          }}
          className="mt-0.5 cursor-pointer"
        />
        <label htmlFor="terms-agreement" className="select-none cursor-pointer">
          I confirm I am{" "}
          <span className="font-semibold text-foreground">18 years or older</span>
          {", "}and I agree to Paidly's{" "}
          <button
            type="button"
            onClick={() => setLegalDoc("terms")}
            className="text-foreground font-semibold underline underline-offset-2 hover:opacity-80 transition-opacity cursor-pointer"
          >
            Terms of Service
          </button>{" "}
          and{" "}
          <button
            type="button"
            onClick={() => setLegalDoc("privacy")}
            className="text-foreground font-semibold underline underline-offset-2 hover:opacity-80 transition-opacity cursor-pointer"
          >
            Privacy Policy
          </button>
          .
        </label>
       </div>
       {errorMsg && (
        <p className="text-[11px] text-destructive font-medium pl-6">{errorMsg}</p>
       )}
      </div>
     )}

     {login&&!forgot&&<Button type="button" variant="link" className="forgot-link" onClick={()=>setForgot(true)}>Forgot password?</Button>}
     <Button type="submit" className="welcome-primary">{forgot?'Preview reset email':login?'Log in':'Create account'}<ArrowRight/></Button>
    </form>
   )}
   <div className="auth-switch">
    {forgot ? (
     <Button variant="link" onClick={()=>{setForgot(false);setSent(false)}}>Back to login</Button>
    ) : (
     <>
      <span>{login?'New here?':'Already have an account?'}</span>
      <Button variant="link" onClick={()=>{
        setLogin(!login);
        setErrorMsg(null);
      }}>{login?'Sign up':'Log in'}</Button>
     </>
    )}
   </div>
   <p className="welcome-disclaimer"><LockKeyhole size={12}/> Demo only. Use fictional details.</p>

   {/* Swipe-up Legal Modal */}
   <LegalModal type={legalDoc} onClose={() => setLegalDoc(null)} />
  </main>
 )
}

export function ConnectCardScreen() {
 const navigate=useNavigate()
 const [stage,setStage]=useState<'entry'|'checking'|'ready'>('entry')
 const [number,setNumber]=useState('4242 4242 4242 6084')
 const [expiry,setExpiry]=useState('09/27')
 const [progress,setProgress]=useState(0)
 useEffect(()=>{if(stage!=='checking')return;const timer=setInterval(()=>setProgress(p=>Math.min(p+1,3)),850);return()=>clearInterval(timer)},[stage])
 useEffect(()=>{if(stage==='checking'&&progress===3){const timer=setTimeout(()=>setStage('ready'),500);return()=>clearTimeout(timer)}return undefined},[stage,progress])
 return (
  <main className="mobile-screen onboarding-screen card-onboarding">
   <header className="onboarding-top">
    <Button asChild variant="ghost" size="icon" aria-label="Back">
     <Link to="/auth"><ArrowLeft/></Link>
    </Button>
    <span className="demo-label">DEMO</span>
   </header>
   <div className="connect-card-art">
    <DemoCard checking={stage==='checking'}/>
    {stage==='ready'&&<span className="card-success"><Check/></span>}
   </div>
   <div className="onboarding-heading">
    <h1>{stage==='entry'?'Add your card.':stage==='checking'?'A quick look.':'YouÃ¢â‚¬â„¢re all set.'}</h1>
    <p>{stage==='entry'?'Start with a sample card to see your overview.':stage==='checking'?'Preparing your sample balance and subscriptions.':'Your sample balance and subscriptions are ready.'}</p>
   </div>
   {stage==='entry'?(
    <form className="onboarding-form" onSubmit={e=>{e.preventDefault();setProgress(0);setStage('checking')}}>
     <label className="welcome-field">Name on card<Input required defaultValue="Daniel Smith" autoComplete="off"/></label>
     <label className="welcome-field">Sample card number<Input required value={number} onChange={e=>setNumber(e.target.value.replace(/[^\d ]/g,'').slice(0,23))} pattern="[0-9 ]{16,23}" inputMode="numeric" autoComplete="off"/></label>
     <div className="card-form-pair">
      <label className="welcome-field">Expiry date<Input required value={expiry} onChange={e=>setExpiry(e.target.value)} pattern="[0-9]{2}/[0-9]{2}" placeholder="MM/YY" maxLength={5} autoComplete="off"/></label>
      <label className="welcome-field">Sample security code<Input required defaultValue="123" pattern="[0-9]{3,4}" maxLength={4} inputMode="numeric" autoComplete="off"/></label>
     </div>
     <Button type="submit" className="welcome-primary">Verify card & link<ArrowRight/></Button>
    </form>
   ):stage==='checking'?(
    <div className="check-steps" aria-live="polite">
     {['Checking sample card','Preparing balance','Finding subscriptions'].map((text,i)=>(
      <div key={text} className={`check-step ${progress>i?'complete':''}`}>
       <span>{progress>i?<Check/>:<i className={progress===i?'step-spinner':''}/>}</span>
       {text}
      </div>
     ))}
    </div>
   ):(
    <div className="sample-result">
     <span>Sample balance</span>
     <strong>$240.50</strong>
     <div className="result-count"><Check/>3 subscriptions found</div>
     <Button className="welcome-primary" onClick={()=>{
      setStoredAuth(true);
      navigate({to:'/home',replace:true});
     }}>Continue<ArrowRight/></Button>
    </div>
   )}
   <p className="welcome-disclaimer"><LockKeyhole size={12}/> Simulation only. DonÃ¢â‚¬â„¢t enter real card details.</p>
  </main>
 )
}
