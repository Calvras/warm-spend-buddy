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

const DEFAULT_CARDS: CardItem[] = [
  {
    id: "card-1",
    holder: "Daniel Smith",
    number: "4242 4242 4242 6084",
    last4: "6084",
    expiry: "09/27",
    cvv: "123",
    brand: "visa",
    isDefault: true,
  },
  {
    id: "card-2",
    holder: "Daniel Smith",
    number: "5555 4444 3333 1192",
    last4: "1192",
    expiry: "12/28",
    cvv: "884",
    brand: "mastercard",
    isDefault: false,
  },
];

const DEFAULT_PROFILE: UserProfile = {
  name: "Daniel Smith",
  email: "daniel@example.com",
  phone: "+1 (555) 019-2834",
  initials: "DS",
};

const DEFAULT_NOTIFICATIONS: NotificationSettings = {
  pushAlerts: true,
  renewalReminders: true,
  weeklySummary: true,
  priceIncreaseAlerts: false,
};

const DEFAULT_SUBSCRIPTIONS: SubscriptionItem[] = [
  {
    id: "sub-spotify",
    name: "Spotify",
    brand: "spotify",
    price: "$9.99",
    priceNum: 9.99,
    plan: "Premium Individual",
    due: "Due in 12 days",
    lastPaid: "July 16, 2026",
    nextPayment: "August 16, 2026",
    startedDate: "January 14, 2023",
    cardId: "card-1",
    category: "Music & Audio",
    features: ["Ad-free music listening", "Offline track downloads", "Unlimited skips", "Lossless audio streaming"],
    cycle: "Monthly",
    totalSpent: "$429.57",
    tone: "yellow",
    brandColor: "#1DB954",
    bannerGradient: "linear-gradient(135deg, #1DB954 0%, #15883e 50%, #121212 100%)",
  },
  {
    id: "sub-netflix",
    name: "Netflix",
    brand: "netflix",
    price: "$9.40",
    priceNum: 9.40,
    plan: "Standard Plan",
    due: "Due in 12 days",
    lastPaid: "July 12, 2026",
    nextPayment: "August 12, 2026",
    startedDate: "March 20, 2022",
    cardId: "card-1",
    category: "Video & Movies",
    features: ["1080p Full HD video", "2 supported devices simultaneously", "Unlimited films & TV series", "Download on mobile devices"],
    cycle: "Monthly",
    totalSpent: "$488.80",
    tone: "blue",
    brandColor: "#E50914",
    bannerGradient: "linear-gradient(135deg, #E50914 0%, #8b0000 60%, #141414 100%)",
  },
  {
    id: "sub-youtube",
    name: "YouTube",
    brand: "youtube",
    price: "$15.00",
    priceNum: 15.00,
    plan: "YouTube Premium",
    due: "Due in 5 days",
    lastPaid: "July 21, 2026",
    nextPayment: "August 21, 2026",
    startedDate: "November 05, 2023",
    cardId: "card-1",
    category: "Video & Music",
    features: ["Ad-free background play", "YouTube Music Premium included", "Picture-in-picture mode", "Offline video saves"],
    cycle: "Monthly",
    totalSpent: "$495.00",
    tone: "blue",
    brandColor: "#FF0000",
    bannerGradient: "linear-gradient(135deg, #FF0000 0%, #990000 55%, #181818 100%)",
  },
  {
    id: "sub-adobe",
    name: "Adobe Creative Cloud",
    brand: "adobe",
    price: "$22.00",
    priceNum: 22.00,
    plan: "All Apps Suite",
    due: "Due in 10 days",
    lastPaid: "July 10, 2026",
    nextPayment: "August 10, 2026",
    startedDate: "June 01, 2024",
    cardId: "card-2",
    category: "Design & Productivity",
    features: ["Photoshop, Illustrator & Premiere", "100GB Cloud Storage", "Adobe Fonts access", "Behance pro portfolio"],
    cycle: "Monthly",
    totalSpent: "$572.00",
    tone: "yellow",
    brandColor: "#FA0F00",
    bannerGradient: "linear-gradient(135deg, #FA0F00 0%, #7B0099 60%, #1E0038 100%)",
  },
  {
    id: "sub-medium",
    name: "Medium",
    brand: "medium",
    price: "$20.00",
    priceNum: 20.00,
    plan: "Member Annual",
    due: "Due in 20 days",
    lastPaid: "August 20, 2025",
    nextPayment: "August 20, 2026",
    startedDate: "August 20, 2024",
    cardId: "card-2",
    category: "Publishing & Reads",
    features: ["Unlimited member stories", "Listen to audio articles", "Direct author support", "Custom publication domain"],
    cycle: "Yearly",
    totalSpent: "$40.00",
    tone: "green",
    brandColor: "#000000",
    bannerGradient: "linear-gradient(135deg, #2b2b2b 0%, #191919 60%, #000000 100%)",
  },
  {
    id: "sub-transit",
    name: "Modern Transit",
    brand: "transit",
    price: "$80.00",
    priceNum: 80.00,
    plan: "Monthly Metro Pass",
    due: "Due in 2 days",
    lastPaid: "July 28, 2026",
    nextPayment: "August 28, 2026",
    startedDate: "February 01, 2025",
    cardId: "card-2",
    category: "Transportation",
    features: ["Unlimited subway & bus rides", "Contactless NFC boarding", "Express commuter lines", "Transfer discounts"],
    cycle: "Monthly",
    totalSpent: "$1,440.00",
    tone: "blue",
    brandColor: "#0284C7",
    bannerGradient: "linear-gradient(135deg, #0284C7 0%, #0369A1 60%, #082F49 100%)",
  },
];

export function getStoredCards(): CardItem[] {
  if (typeof window === "undefined") return DEFAULT_CARDS;
  try {
    const raw = localStorage.getItem("paidly_cards");
    if (!raw) return DEFAULT_CARDS;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_CARDS;
  } catch {
    return DEFAULT_CARDS;
  }
}

export function saveStoredCards(cards: CardItem[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("paidly_cards", JSON.stringify(cards));
  } catch {}
}

export function getActiveCardId(): string {
  if (typeof window === "undefined") return "card-1";
  try {
    const active = localStorage.getItem("paidly_active_card_id");
    return active || "card-1";
  } catch {
    return "card-1";
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
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_SUBSCRIPTIONS;
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
