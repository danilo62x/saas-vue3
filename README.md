# SaaS marketing site and app template (Vue 3 + Tailwind CSS 4)

[Leia em português](./README.pt-BR.md)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
![Free](https://img.shields.io/badge/price-free-brightgreen)

A complete SaaS product front end built with Vue 3, TypeScript, Vite 6 and Tailwind CSS v4. It has the two halves a SaaS usually needs: a public marketing site (landing, features, pricing with a monthly/annual toggle, about, contact) and an auth-guarded application (dashboard with charts, projects, team, billing and settings). All content is mock data, so the project runs without a backend.

## Views included

15 routed views, split between the marketing site and the app.

Marketing and auth (8 views, navbar and footer layout, auth pages use a blank layout):

- Landing (`/`): hero, client logos, features grid, how it works, stats band, testimonials, plans, FAQ and CTA
- Features (`/recursos`): expanded feature descriptions
- Pricing (`/precos`): 4 plans (free, pro, business, enterprise) with a monthly/annual toggle, comparison table and FAQ
- About (`/sobre`) and Contact (`/contato`): institutional pages
- Login (`/login`), Register (`/registro`) and Forgot password (`/esqueci-senha`): auth forms with VeeValidate and Yup

App (7 views, sidebar layout, guarded by `requiresAuth` in the router):

- Onboarding (`/onboarding`): multi-step setup after registration
- Dashboard (`/app`): KPI cards, revenue and signups charts, plan distribution and usage against plan limits
- Projects (`/app/projetos`): project list with a data table
- Team (`/app/equipe`): members and roles
- Billing (`/app/cobranca`): current plan, payment method and invoice history
- Settings (`/app/configuracoes`): 5 tabs (profile, account, API keys, integrations, notifications)
- Not found: catch-all 404

## Tech stack

- Vue 3.5 (`<script setup>`) and TypeScript 5.7
- Vite 6.0 with `@vitejs/plugin-vue` 5.2
- Tailwind CSS 4.0 via `@tailwindcss/vite` (CSS-first config, no `tailwind.config.js`)
- Vue Router 4.4 with a `requiresAuth` navigation guard
- Pinia 3.0 with `pinia-plugin-persistedstate` 4.2, in 5 stores: `auth`, `projects`, `subscription`, `team`, `ui`
- ApexCharts 5.13 through `vue3-apexcharts` 1.11 (wrapped in `components/ui/ApexChart.vue`)
- `@tanstack/vue-table` 8.21 behind the `DataTable` component
- VeeValidate 4.15 with `@vee-validate/yup` and Yup 1.7 for forms
- `vue-i18n` 11.4 (pt-BR, en, es)
- `vite-plugin-pwa` 1.3 for the service worker and install manifest
- `vue-tsc` 2.2 for type-checked builds

## Requirements

- Node.js 18 or newer
- npm (bundled with Node)

## Getting started

```bash
npm install
npm run dev
```

The dev server runs at http://localhost:5173.

## Build for production

```bash
npm run build
```

The build script runs `vue-tsc --noEmit` for type checking, then `vite build`. Output goes to `dist/`. Use `npm run preview` to check the production bundle locally.

## Project structure

```
src/
  assets/styles/app.css   Tailwind v4 theme tokens (brand palette, fonts, breakpoints)
  components/
    app/                  PageHeader, UsageBar
    layout/               AppLayout, AppSidebar, AppHeader, AppFooter,
                          MarketingLayout, MarketingNavbar, MarketingFooter
    marketing/            Hero, FeaturesGrid, PricingTable, PlanCard, PricingToggle,
                          Testimonials, FaqSection, StatsBand, AuthShell, ...
    ui/                   DataTable, ModalBase, StatsCard, Tabs, Steps, ToastStack,
                          ApexChart, FormField, CookieBanner, ...
  composables/            useTheme, usePageTitle
  data/mock.ts            all mock data in one module
  i18n/                   vue-i18n setup and locales (pt-BR.json, en.json, es.json)
  lib/format.ts           currency and date formatting helpers
  router/index.ts         route table, layout metadata and auth guard
  stores/                 Pinia stores: auth, projects, subscription, team, ui
  views/
    marketing/            8 views
    app/                  7 views, plus settings/ tab components
```

## Theming and customization

Tailwind CSS v4 is configured in CSS. All design tokens live in `src/assets/styles/app.css` inside the `@theme` block: the brand color scale (`--color-brand-25` to `--color-brand-950`, base color `#465fff`), the gray scale, title sizes, the Outfit font and extra breakpoints (`2xsm`, `xsm`, `3xl`). Change a token there and every utility class that uses it follows.

Dark mode is class-based (`@custom-variant dark`). The `useTheme` composable toggles the `.dark` class on the root element and persists the choice.

### Wiring a real API

All content comes from a single module, `src/data/mock.ts`: the 4 plans with limits, dashboard KPIs, monthly revenue and signup series, plan distribution, activity feed, projects, team members, invoices, payment method, API keys, integrations, client logos, testimonials and marketing stats. Each item is a typed export, so the shortest path to a backend is to replace those exports with API calls and keep the types as the contract. The Pinia stores consume this module and persist part of their state through `pinia-plugin-persistedstate`.

### Internationalization

Interface strings live in `src/i18n/locales/` (pt-BR, en, es). The language can be changed at runtime with the language switcher. Route paths and mock content are in Portuguese.

### PWA

`vite-plugin-pwa` generates a service worker and a web manifest, so the production build is installable. Icons are in `public/`.

## Other stacks

This template also exists in 4 other stacks, with the same screens and visual identity. All of them are free:

- React 19: https://github.com/danilo62x/saas-react
- Angular 19: https://github.com/danilo62x/saas-angular
- Laravel 11: https://github.com/danilo62x/saas-laravel
- Static HTML: https://github.com/danilo62x/saas-html

More free templates (admin dashboards, vertical systems and Flutter apps): https://github.com/danilo62x?tab=repositories

## License

MIT. See [LICENSE](./LICENSE).
