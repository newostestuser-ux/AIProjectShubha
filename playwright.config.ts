import { defineConfig, devices } from '@playwright/test';
import { configDotenv } from 'dotenv';

export default defineConfig({

  timeout:30*1000,
  testDir:"./tests/",
  fullyParallel:true,
  retries:process.env.CI ? 2:0,
  workers:process.env.CI ? 1:undefined,
  reporter:[
    ['list'],
    ['html',{ open: "never", outputFolder: "reports" }],
    ['allure-playwright',{open:"never", outputFolder:"allure-reports"}]
  ],
  use:{
    baseURL:process.env.WEB_APP_URL,
    trace:"on-first-retry",
    screenshot:"only-on-failure",
    video:"retain-on-failure",
    headless:false,
    viewport:{width: 1280, height: 720},
    ignoreHTTPSErrors:true,
    permissions:["geolocation"]
},
//grep:/@master/,
projects: [
{
name: "chromium",
use: { ...devices["Desktop Chrome"] },
},
]
})
