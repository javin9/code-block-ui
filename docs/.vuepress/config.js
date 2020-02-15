module.exports = {
  title: '区块',
  description: '专业视觉设计，每周物料更新，基于区块进行快速组合搭建应用，减少重复的开发，提升效率',
  head: [['link', { rel: 'icon', href: `/favicon.ico` }]],
  themeConfig: {
    logo: '/images/logo.jpg',
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/' },
      { text: '组件', link: '/code-block/form/basic-form/' }
    ],
    sidebar: {
      '/code-block/': [
        {
          title: "表单类",
          collapsable: true,
          children: ['form/basic-form']
        }
      ]
    }
  },
  markdown: {
    lineNumbers: true//显示行号
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@alias': 'path/to/some/dir'
      }
    }
  }
}