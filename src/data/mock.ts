// Mock data for the SaaS template. i18n keys are used for human-readable
// strings where the UI renders translated copy; raw values (numbers, dates,
// emails) live here directly.

export type BillingCycle = 'monthly' | 'yearly'
export type PlanId = 'free' | 'pro' | 'business' | 'enterprise'

export interface Plan {
  id: PlanId
  /** i18n key suffix under `plans.<id>` */
  nameKey: string
  /** monthly price in BRL/USD/EUR base units (currency picked by locale at render) */
  priceMonthly: number
  priceYearly: number // per-month price when billed yearly
  popular?: boolean
  /** i18n key suffixes under `plans.features` */
  featureKeys: string[]
  limits: {
    projects: number // -1 = unlimited
    members: number
    storageGb: number
    apiCallsK: number // thousands of API calls / month
  }
}

export const PLANS: Plan[] = [
  {
    id: 'free',
    nameKey: 'free',
    priceMonthly: 0,
    priceYearly: 0,
    featureKeys: ['projects3', 'members2', 'storage1', 'communitySupport', 'basicAnalytics'],
    limits: { projects: 3, members: 2, storageGb: 1, apiCallsK: 5 },
  },
  {
    id: 'pro',
    nameKey: 'pro',
    priceMonthly: 49,
    priceYearly: 39,
    popular: true,
    featureKeys: ['projects25', 'members10', 'storage50', 'prioritySupport', 'advancedAnalytics', 'apiAccess'],
    limits: { projects: 25, members: 10, storageGb: 50, apiCallsK: 100 },
  },
  {
    id: 'business',
    nameKey: 'business',
    priceMonthly: 129,
    priceYearly: 99,
    featureKeys: ['unlimitedProjects', 'members50', 'storage500', 'sso', 'advancedAnalytics', 'apiAccess', 'auditLog'],
    limits: { projects: -1, members: 50, storageGb: 500, apiCallsK: 1000 },
  },
  {
    id: 'enterprise',
    nameKey: 'enterprise',
    priceMonthly: 0, // custom
    priceYearly: 0,
    featureKeys: ['unlimitedEverything', 'dedicatedManager', 'sla', 'sso', 'customIntegrations', 'onPremise'],
    limits: { projects: -1, members: -1, storageGb: -1, apiCallsK: -1 },
  },
]

export function getPlan(id: PlanId): Plan {
  return PLANS.find((p) => p.id === id) ?? PLANS[0]
}

// ---- Dashboard metrics ----------------------------------------------------

export const KPIS = {
  mrr: 48250,
  mrrTrend: 12.5,
  activeUsers: 2840,
  activeUsersTrend: 8.2,
  churn: 1.8,
  churnTrend: -0.4,
  conversion: 4.6,
  conversionTrend: 1.1,
}

const MONTHS = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']

export const REVENUE_SERIES = {
  categories: MONTHS,
  revenue: [18, 22, 19, 27, 31, 30, 38, 42, 40, 45, 48, 52].map((v) => v * 1000),
  expenses: [10, 12, 11, 14, 16, 15, 18, 19, 20, 21, 22, 24].map((v) => v * 1000),
}

export const SIGNUPS_SERIES = {
  categories: MONTHS,
  data: [120, 180, 150, 220, 280, 260, 340, 410, 380, 460, 520, 610],
}

export const PLAN_DISTRIBUTION = {
  labels: ['Free', 'Pro', 'Business', 'Enterprise'],
  data: [1420, 980, 360, 80],
}

export interface Activity {
  id: number
  /** i18n key under `dashboard.activity.<typeKey>` with {{name}} interpolation */
  typeKey: string
  name: string
  time: string
  icon: string
}

export const ACTIVITY: Activity[] = [
  { id: 1, typeKey: 'invited', name: 'Bruno Lima', time: '2025-05-29T14:20:00', icon: 'users' },
  { id: 2, typeKey: 'upgraded', name: 'Acme Inc.', time: '2025-05-29T11:05:00', icon: 'rocket' },
  { id: 3, typeKey: 'paid', name: 'R$ 129,00', time: '2025-05-28T18:42:00', icon: 'dollar' },
  { id: 4, typeKey: 'createdProject', name: 'Website Redesign', time: '2025-05-28T09:15:00', icon: 'folder' },
  { id: 5, typeKey: 'apiKey', name: 'Production Key', time: '2025-05-27T16:30:00', icon: 'key' },
]

// ---- Projects -------------------------------------------------------------

export interface Project {
  id: number
  name: string
  /** i18n key under `projects.statuses` */
  status: 'active' | 'paused' | 'archived'
  progress: number
  members: number
  updatedAt: string
  color: string
}

export const PROJECTS: Project[] = [
  { id: 1, name: 'Website Redesign', status: 'active', progress: 72, members: 5, updatedAt: '2025-05-29', color: '#465fff' },
  { id: 2, name: 'Mobile App v2', status: 'active', progress: 41, members: 8, updatedAt: '2025-05-28', color: '#12b76a' },
  { id: 3, name: 'API Platform', status: 'paused', progress: 90, members: 3, updatedAt: '2025-05-25', color: '#f79009' },
  { id: 4, name: 'Marketing Site', status: 'active', progress: 60, members: 4, updatedAt: '2025-05-24', color: '#0ba5ec' },
  { id: 5, name: 'Data Pipeline', status: 'archived', progress: 100, members: 2, updatedAt: '2025-04-30', color: '#f04438' },
  { id: 6, name: 'Design System', status: 'active', progress: 33, members: 6, updatedAt: '2025-05-30', color: '#7592ff' },
]

// ---- Team -----------------------------------------------------------------

export type MemberRole = 'admin' | 'member' | 'viewer'
export type MemberStatus = 'active' | 'pending'

export interface Member {
  id: number
  name: string
  email: string
  role: MemberRole
  status: MemberStatus
  joinedAt: string
}

export const MEMBERS: Member[] = [
  { id: 1, name: 'Ana Martins', email: 'ana@acme.com', role: 'admin', status: 'active', joinedAt: '2024-11-02' },
  { id: 2, name: 'Bruno Lima', email: 'bruno@acme.com', role: 'member', status: 'active', joinedAt: '2025-01-15' },
  { id: 3, name: 'Carla Souza', email: 'carla@acme.com', role: 'member', status: 'active', joinedAt: '2025-02-20' },
  { id: 4, name: 'Diego Rocha', email: 'diego@acme.com', role: 'viewer', status: 'active', joinedAt: '2025-03-08' },
  { id: 5, name: 'Elena Costa', email: 'elena@acme.com', role: 'member', status: 'pending', joinedAt: '2025-05-25' },
]

// ---- Invoices -------------------------------------------------------------

export type InvoiceStatus = 'paid' | 'pending' | 'failed'

export interface Invoice {
  id: string
  date: string
  amount: number
  status: InvoiceStatus
  plan: string
}

export const INVOICES: Invoice[] = [
  { id: 'INV-2025-005', date: '2025-05-01', amount: 49, status: 'paid', plan: 'Pro' },
  { id: 'INV-2025-004', date: '2025-04-01', amount: 49, status: 'paid', plan: 'Pro' },
  { id: 'INV-2025-003', date: '2025-03-01', amount: 49, status: 'paid', plan: 'Pro' },
  { id: 'INV-2025-002', date: '2025-02-01', amount: 49, status: 'paid', plan: 'Pro' },
  { id: 'INV-2025-001', date: '2025-01-01', amount: 0, status: 'paid', plan: 'Free' },
]

export interface PaymentMethod {
  brand: string
  last4: string
  expMonth: number
  expYear: number
}

export const PAYMENT_METHOD: PaymentMethod = {
  brand: 'Visa',
  last4: '4242',
  expMonth: 12,
  expYear: 2027,
}

// ---- API keys -------------------------------------------------------------

export interface ApiKey {
  id: number
  name: string
  prefix: string
  createdAt: string
  lastUsed: string | null
}

export const API_KEYS: ApiKey[] = [
  { id: 1, name: 'Production', prefix: 'sk_live_4f8a', createdAt: '2025-01-10', lastUsed: '2025-05-29' },
  { id: 2, name: 'Staging', prefix: 'sk_test_9c2b', createdAt: '2025-03-22', lastUsed: '2025-05-20' },
]

// ---- Integrations ---------------------------------------------------------

export interface Integration {
  id: string
  /** i18n key under `settings.integrations.apps.<id>` */
  name: string
  descKey: string
  icon: string
  connected: boolean
}

export const INTEGRATIONS: Integration[] = [
  { id: 'slack', name: 'Slack', descKey: 'slack', icon: 'slack', connected: true },
  { id: 'github', name: 'GitHub', descKey: 'github', icon: 'github', connected: true },
  { id: 'google', name: 'Google Workspace', descKey: 'google', icon: 'globe', connected: false },
  { id: 'stripe', name: 'Stripe', descKey: 'stripe', icon: 'credit-card', connected: false },
  { id: 'zapier', name: 'Zapier', descKey: 'zapier', icon: 'zap', connected: false },
]

// ---- Marketing content ----------------------------------------------------

export const CLIENT_LOGOS = ['Acme', 'Globex', 'Initech', 'Umbrella', 'Soylent', 'Hooli']

export interface Testimonial {
  id: number
  name: string
  role: string
  avatar?: string
  /** i18n key under `testimonials.items` */
  quoteKey: string
}

export const TESTIMONIALS: Testimonial[] = [
  { id: 1, name: 'Marina Alves', role: 'CEO, Globex', quoteKey: 't1' },
  { id: 2, name: 'Rafael Dias', role: 'CTO, Initech', quoteKey: 't2' },
  { id: 3, name: 'JúliaNunes', role: 'Head of Ops, Hooli', quoteKey: 't3' },
]

export const MARKETING_STATS = [
  { value: '12k+', labelKey: 'customers' },
  { value: '99.9%', labelKey: 'uptime' },
  { value: '4.9/5', labelKey: 'rating' },
  { value: '180+', labelKey: 'countries' },
]
