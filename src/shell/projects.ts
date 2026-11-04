export type Project = {
  /** 目录名，同时用于构建入口，必须与文件夹一致 */
  dir: string
  name: string
  subtitle: string
  tag: string
  year: string
  accent: string
}

export const projects: Project[] = [
  {
    dir: '24iFM',
    name: '24iFM',
    subtitle: '移动端产品体验升级',
    tag: 'App',
    year: '2025',
    accent: '#1c9dd7',
  },
  {
    dir: 'CLMSApp',
    name: 'CLMS',
    subtitle: '酒店临时用工管理系统',
    tag: 'B 端后台',
    year: '2024',
    accent: '#196bd9',
  },
  {
    dir: 'GigsMesh',
    name: 'GigsMesh',
    subtitle: '零工招聘平台',
    tag: 'App',
    year: '2025',
    accent: '#a8b570',
  },
  {
    dir: 'HongYeGroupWeb',
    name: 'HongYe Group',
    subtitle: '企业服务官网重塑',
    tag: '官网',
    year: '2024',
    accent: '#00a5d2',
  },
  {
    dir: 'SMARTICLEANHT',
    name: 'smart-iclean',
    subtitle: 'B2B 数据平台控制台',
    tag: '后台',
    year: '2021',
    accent: '#31e4ff',
  },
  {
    dir: 'SmartiCleanApp',
    name: 'SmartiClean',
    subtitle: '企业清洁管理 App',
    tag: 'App',
    year: '2024',
    accent: '#f01e35',
  },
  {
    dir: 'YYBusinessApp',
    name: 'YY Business',
    subtitle: '灵活用工管理平台',
    tag: 'Web 应用',
    year: '2025',
    accent: '#148eff',
  },
  {
    dir: 'YYCircleApp',
    name: 'YY Circle',
    subtitle: '移动端产品重构',
    tag: 'App',
    year: '2025',
    accent: '#1777f2',
  },
  {
    dir: 'YYCircleWeb',
    name: 'Circle',
    subtitle: '关键落地页面',
    tag: '官网',
    year: '2026',
    accent: '#1479d1',
  },
  {
    dir: 'YYForceWeb',
    name: 'yyforce.ai',
    subtitle: '企业官网焕新',
    tag: '官网',
    year: '2026',
    accent: '#6ea9c9',
  },
  {
    dir: 'YYPetApp',
    name: 'YY PET',
    subtitle: '陪伴养成概念设计',
    tag: 'App',
    year: '2025',
    accent: '#f4c949',
  },
]

export const srcOf = (p: Project) => `/${p.dir}/index.html`
