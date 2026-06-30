import { defineConfig, devices } from '@playwright/test';

export default defineConfig({

  reporter:[
    ['list'],
    ['allure-playwright',{
      outputFolder:'allure-results'
    }]
    // ['html', {open:'never'}]
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
