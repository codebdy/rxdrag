Monorepo starter using Vite and Turborepo to create microfrontend React apps, libraries, docs, testing, tooling, and more.

# Requirements

Install [pnpm](https://pnpm.io/).

We recommend an LTS version of [Node.js](https://nodejs.org/en/) >= 16.

# Local Development

To work on Rxdrag web apps, from the root,

1. Run `pnpm install`

2. Run `pnpm dev`

# Environment

Please see `apps/core/.env` for a list of environment variables you can set.

# Testing

To run tests for all packages with Vitest, from the root, run `pnpm test`.

To run end-to-end tests for all apps with Cypress, from the root, run `pnpm e2e`.

When writing tests, we have helpers available in both environments using [@testing-library](https://testing-library.com/docs/queries/about).

# Production

To deploy the `@rxdrag/core` app, from the root,

1. Run `pnpm build`

2. Run `pnpm --filter "@rxdrag/core" run preview` to preview the app.

In production, please see [`rxdrag/server`](https://github.rxdrag.com/rxdrag/rxdrag-server).

# Tooling

We use the following tools:

- [Vite](https://vitejs.dev/)
- [Turbo](https://turbo.build/repo)
- [React](https://reactjs.org/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Storybook](https://storybook.js.org/)
- [Plop](https://github.com/plopjs/plop)
- [Husky](https://github.com/typicode/husky)
- [Vitest](https://github.com/vitest-dev/vitest)
- [Cypress](https://www.cypress.io/)
- [Sentry](https://github.com/getsentry/sentry)
- [Changesets](https://github.com/changesets/changesets)

# Guide

## How do I create a new app or package?

To create a new app, run `pnpm new-app` or `pnpm new-app-ts` (TypeScript).

To add a library, run `pnpm new-library` or `pnpm new-library-ts` (TypeScript).

## How should I create a branch for my new code?

The `main` branch is the production code.

Each package has a branch called `next-<package>`, e.g. `next-shared`. This is an eternal branch with the new code for `<package>`.

To create an update, branch `feature/*` from `next-<package>` and merge back into `next-<package>` to commit your work.

UAT branches are available, and should be named `uat-<package>` to provide a deployment in the staging environment.

## How do I preview my new code?

Every time a commit is pushed up, it will have a new review app deployed.

[实践，制作一个高扩展、可视化低代码前端，详实、完整](https://zhuanlan.zhihu.com/p/610182592)

## Available Scripts

## How do I add a dependency to my project?

### `npm start`

> **Note: Do not add dependencies to the root workspace.**

## What libraries should I know about?

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

`@rxdrag/shared`: Shared code between all Rxdrag packages

`@rxdrag/<app>-ui`: Packages with this name format are UI libraries built for specific apps but can still be used by other apps, e.g. `@rxdrag/dashboard-ui` was built for the Dashboard portal but may provide useful UI for your project

## How do I version, tag, release, or publish a new version of a package?

We handle this with the `changesets` CLI tool.

A developer creates a changeset, which is just a changelog for the package being updated. Then they'll version it, and if required, release it to a registry.

RxEditor已重启，基于模型驱动架构，插件式扩展。 
目标支持react，vue等主流前端库。内核是Immutable数据模型。

## How do I fix CORS errors in development for a URL I am using in my project?

QQ群：957619750  

微信群 
![微信群](https://github.com/rxdrag/rxeditor/blob/master/doc/images/wechatgroup6.jpg?raw=true)

In `apps/core/vite.config.ts`, configure your local API URL and the target API URL in the `server.proxy` object.
