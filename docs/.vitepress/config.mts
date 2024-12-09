import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Laana",
  description: "现代化聊天机器人协议",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '主页', link: '/' },
    ],

    sidebar: [
      {
        text: '协议实现者指南',
        link: '/implementation',
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/LaanaProto/Laana' }
    ],

    logo: '/static/logo.png',

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present Young'
    }
  }
})
