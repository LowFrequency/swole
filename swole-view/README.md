# Swole View

Vue PWA, specifically Vue 3 composition API and Hook framework.

- services - functions that interact with third parties eg DB, APIs etc
- utils - utility functions that can be used throughout the app
- views - Vue files that contain the base views
- hooks - the logic layer functions and states
- components - simple view components that are shared across views
- assets - css, images etc
- config - config files firebase etc
- store - Vuex store for global data (not used at mo)
- router - our router for matching views

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Deploy

```
firebase deploy --only hosting
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
