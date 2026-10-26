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
