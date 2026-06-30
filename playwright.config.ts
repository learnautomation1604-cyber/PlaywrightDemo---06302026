import { defineConfig, devices } from '@playwright/test';

export default defineConfig({

  reporter:[
    ['list'],
    ['html', {open:'never'}]
  ],

  use:{
    headless: true,
    screenshot:'only-on-failure',
    video:'retain-on-failure',
    trace:'retain-on-failure'
  },
  projects:[{
    name:'chromium',
    use:{ ...devices['Desktop Chrome']}
  }
  ]
});
