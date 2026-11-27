# Template de site de marketing + app SaaS (Vue 3 + Tailwind CSS 4)

[Read in English](./README.md)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
![Free](https://img.shields.io/badge/price-free-brightgreen)

Um front-end completo de produto SaaS construído com Vue 3, TypeScript, Vite 6 e Tailwind CSS v4. Ele tem as duas metades que um SaaS costuma precisar: um site de marketing público (landing, recursos, pricing com alternância mensal/anual, sobre, contato) e uma aplicação protegida por auth (dashboard com gráficos, projetos, equipe, cobrança e configurações). Todo o conteúdo é dado mockado, então o projeto roda sem backend.

## Views incluídas

15 views roteadas, divididas entre o site de marketing e o app.

Marketing e auth (8 views, layout com navbar e footer; as páginas de auth usam layout em branco):

- Landing (`/`): hero, logos de clientes, grid de recursos, como funciona, faixa de estatísticas, depoimentos, planos, FAQ e CTA
- Recursos (`/recursos`): descrições ampliadas das funcionalidades
- Pricing (`/precos`): 4 planos (free, pro, business, enterprise) com alternância mensal/anual, tabela de comparação e FAQ
- Sobre (`/sobre`) e Contato (`/contato`): páginas institucionais
- Login (`/login`), Registro (`/registro`) e Esqueci a senha (`/esqueci-senha`): formulários de auth com VeeValidate e Yup

App (7 views, layout com sidebar, protegidas por `requiresAuth` no router):

- Onboarding (`/onboarding`): configuração multi-step após o registro
- Dashboard (`/app`): cards de KPI, gráficos de receita e cadastros, distribuição de planos e uso contra os limites do plano
- Projetos (`/app/projetos`): lista de projetos com tabela de dados
- Equipe (`/app/equipe`): membros e papéis
- Cobrança (`/app/cobranca`): plano atual, método de pagamento e histórico de faturas
- Configurações (`/app/configuracoes`): 5 abas (perfil, conta, chaves de API, integrações, notificações)
- Não encontrado: 404 catch-all

## Stack

- Vue 3.5 (`<script setup>`) e TypeScript 5.7
- Vite 6.0 com `@vitejs/plugin-vue` 5.2
- Tailwind CSS 4.0 via `@tailwindcss/vite` (configuração CSS-first, sem `tailwind.config.js`)
- Vue Router 4.4 com guard de navegação `requiresAuth`
- Pinia 3.0 com `pinia-plugin-persistedstate` 4.2, em 5 stores: `auth`, `projects`, `subscription`, `team`, `ui`
- ApexCharts 5.13 através do `vue3-apexcharts` 1.11 (encapsulado em `components/ui/ApexChart.vue`)
- `@tanstack/vue-table` 8.21 por trás do componente `DataTable`
- VeeValidate 4.15 com `@vee-validate/yup` e Yup 1.7 nos formulários
- `vue-i18n` 11.4 (pt-BR, en, es)
- `vite-plugin-pwa` 1.3 para o service worker e o manifest de instalação
- `vue-tsc` 2.2 para builds com checagem de tipos

## Requisitos

- Node.js 18 ou mais recente
- npm (incluso no Node)

## Como rodar

```bash
npm install
npm run dev
```

O servidor de desenvolvimento roda em http://localhost:5173.

## Build de produção

```bash
npm run build
```

O script de build roda `vue-tsc --noEmit` para checagem de tipos e depois `vite build`. A saída vai para `dist/`. Use `npm run preview` para conferir o bundle de produção localmente.

## Estrutura do projeto

```
src/
  assets/styles/app.css   Tokens do tema Tailwind v4 (paleta brand, fontes, breakpoints)
  components/
    app/                  PageHeader, UsageBar
    layout/               AppLayout, AppSidebar, AppHeader, AppFooter,
                          MarketingLayout, MarketingNavbar, MarketingFooter
    marketing/            Hero, FeaturesGrid, PricingTable, PlanCard, PricingToggle,
                          Testimonials, FaqSection, StatsBand, AuthShell, ...
    ui/                   DataTable, ModalBase, StatsCard, Tabs, Steps, ToastStack,
                          ApexChart, FormField, CookieBanner, ...
  composables/            useTheme, usePageTitle
  data/mock.ts            todos os dados mockados em um módulo
  i18n/                   setup do vue-i18n e locales (pt-BR.json, en.json, es.json)
  lib/format.ts           helpers de formatação de moeda e data
  router/index.ts         tabela de rotas, metadados de layout e guard de auth
  stores/                 stores Pinia: auth, projects, subscription, team, ui
  views/
    marketing/            8 views
    app/                  7 views, mais os componentes de abas em settings/
```

## Temas e customização

O Tailwind CSS v4 é configurado em CSS. Todos os tokens de design ficam em `src/assets/styles/app.css`, dentro do bloco `@theme`: a escala de cor da marca (`--color-brand-25` a `--color-brand-950`, cor base `#465fff`), a escala de cinzas, tamanhos de título, a fonte Outfit e breakpoints extras (`2xsm`, `xsm`, `3xl`). Altere um token ali e todas as classes utilitárias que o usam acompanham.

O dark mode é baseado em classe (`@custom-variant dark`). O composable `useTheme` alterna a classe `.dark` no elemento raiz e persiste a escolha.

### Conectando uma API real

Todo o conteúdo vem de um único módulo, `src/data/mock.ts`: os 4 planos com limites, KPIs do dashboard, séries mensais de receita e cadastros, distribuição de planos, feed de atividade, projetos, membros da equipe, faturas, método de pagamento, chaves de API, integrações, logos de clientes, depoimentos e estatísticas de marketing. Cada item é um export tipado, então o caminho mais curto para um backend é trocar esses exports por chamadas de API e manter os tipos como contrato. As stores Pinia consomem esse módulo e persistem parte do estado via `pinia-plugin-persistedstate`.

### Internacionalização

As strings de interface ficam em `src/i18n/locales/` (pt-BR, en, es). O idioma pode ser trocado em tempo de execução pelo seletor de idioma. Os caminhos de rota e o conteúdo mockado estão em português.

### PWA

O `vite-plugin-pwa` gera um service worker e um web manifest, então o build de produção é instalável. Os ícones ficam em `public/`.

## Outras stacks

Este template também existe em outras 4 tecnologias, com as mesmas telas e a mesma identidade visual. Todas são gratuitas:

- React 19: https://github.com/danilo62x/saas-react
- Angular 19: https://github.com/danilo62x/saas-angular
- Laravel 11: https://github.com/danilo62x/saas-laravel
- HTML estático: https://github.com/danilo62x/saas-html

Mais templates gratuitos (painéis admin, sistemas por segmento e apps Flutter): https://github.com/danilo62x?tab=repositories

## Licença

MIT. Veja [LICENSE](./LICENSE).
