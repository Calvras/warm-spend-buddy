export interface CardItem {
  id: string;
  holder: string;
  number: string;
  last4: string;
  expiry: string;
  cvv: string;
  brand: "visa" | "mastercard" | "apple";
  colorTheme?: string;
  isDefault?: boolean;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  initials: string;
}

export interface NotificationSettings {
  pushAlerts: boolean;
  renewalReminders: boolean;
  weeklySummary: boolean;
  priceIncreaseAlerts: boolean;
}

export interface SubscriptionItem {
  id: string;
  name: string;
  brand: string;
  price: string;
  priceNum: number;
  plan: string;
  due: string;
  lastPaid: string;
  nextPayment: string;
  startedDate: string;
  cardId: string;
  category: string;
  features: string[];
  cycle: string;
  totalSpent: string;
  tone: string;
  brandColor: string;
  bannerGradient: string;
}

const DEFAULT_CARDS: CardItem[] = [];

const DEFAULT_PROFILE: UserProfile = {
  name: "Account Holder",
  email: "user@example.com",
  phone: "+1 (555) 019-2834",
  initials: "AH",
};

const DEFAULT_NOTIFICATIONS: NotificationSettings = {
  pushAlerts: true,
  renewalReminders: true,
  weeklySummary: true,
  priceIncreaseAlerts: false,
};

const DEFAULT_SUBSCRIPTIONS: SubscriptionItem[] = [];

// Legacy fake subscription IDs to clear from previous demo sessions
const LEGACY_FAKE_SUB_IDS = new Set([
  "sub-spotify",
  "sub-netflix",
  "sub-youtube",
  "sub-adobe",
  "sub-medium",
  "sub-transit",
]);

// Helper to identify demo cards
export function isDemoCard(card: Partial<CardItem>): boolean {
  if (!card) return false;
  if (card.id === "card-1" || card.id === "card-2") return true;
  if (card.holder === "Daniel Smith") return true;
  if (card.number === "4242 4242 4242 6084" && card.id === "card-1") return true;
  if (card.number === "5555 4444 3333 1192") return true;
  return false;
}

export function getStoredCards(): CardItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem("paidly_cards");
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    // Strictly filter out legacy demo cards (card-1, card-2, Daniel Smith)
    const cleaned = parsed.filter((c: CardItem) => !isDemoCard(c));
    if (cleaned.length !== parsed.length) {
      saveStoredCards(cleaned);
    }
    return cleaned;
  } catch {
    return [];
  }
}

export function saveStoredCards(cards: CardItem[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("paidly_cards", JSON.stringify(cards));
  } catch {}
}

export function getActiveCardId(): string {
  if (typeof window === "undefined") return "";
  try {
    const active = localStorage.getItem("paidly_active_card_id");
    if (active === "card-1" || active === "card-2") return "";
    return active || "";
  } catch {
    return "";
  }
}

export function saveActiveCardId(id: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("paidly_active_card_id", id);
  } catch {}
}

export function getStoredSubscriptions(): SubscriptionItem[] {
  if (typeof window === "undefined") return DEFAULT_SUBSCRIPTIONS;
  try {
    const raw = localStorage.getItem("paidly_subscriptions");
    if (!raw) return DEFAULT_SUBSCRIPTIONS;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return DEFAULT_SUBSCRIPTIONS;
    // Filter out old fake demo subscriptions so only real Plaid / user-added ones show
    const cleaned = parsed.filter(
      (item: SubscriptionItem) => !LEGACY_FAKE_SUB_IDS.has(item.id)
    );
    if (cleaned.length !== parsed.length) {
      saveStoredSubscriptions(cleaned);
    }
    return cleaned;
  } catch {
    return DEFAULT_SUBSCRIPTIONS;
  }
}

export function saveStoredSubscriptions(subs: SubscriptionItem[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("paidly_subscriptions", JSON.stringify(subs));
  } catch {}
}

export function getStoredProfile(): UserProfile {
  if (typeof window === "undefined") return DEFAULT_PROFILE;
  try {
    const raw = localStorage.getItem("paidly_profile");
    if (!raw) return DEFAULT_PROFILE;
    return { ...DEFAULT_PROFILE, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_PROFILE;
  }
}

export function saveStoredProfile(profile: UserProfile): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("paidly_profile", JSON.stringify(profile));
  } catch {}
}

export function getStoredNotifications(): NotificationSettings {
  if (typeof window === "undefined") return DEFAULT_NOTIFICATIONS;
  try {
    const raw = localStorage.getItem("paidly_notifications");
    if (!raw) return DEFAULT_NOTIFICATIONS;
    return { ...DEFAULT_NOTIFICATIONS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_NOTIFICATIONS;
  }
}

export function saveStoredNotifications(settings: NotificationSettings): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("paidly_notifications", JSON.stringify(settings));
  } catch {}
}

export function isUserLoggedIn(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const status = localStorage.getItem("paidly_auth_status");
    if (status === "logged_out") return false;
    if (status === "logged_in") return true;

    // For existing users who signed up before this flag was introduced:
    const cards = localStorage.getItem("paidly_cards");
    const activeCard = localStorage.getItem("paidly_active_card_id");
    const profile = localStorage.getItem("paidly_profile");
    if (cards || activeCard || profile) {
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

export function setStoredAuth(loggedIn: boolean): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("paidly_auth_status", loggedIn ? "logged_in" : "logged_out");
  } catch {}
}
