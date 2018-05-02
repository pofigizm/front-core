import { isEnabled } from 'front-core/src/flags'

export const routes = {
  root: {
    path: '/',
    modulePath: '_template',
  },

  template: {
    path: '/template',
    modulePath: '_template',
    role: true,
  },

  ...(isEnabled('feature-page') ? {
    feature: {
      path: '/page-under-flag',
      modulePath: '_template',
    },
  } : {}),
}
