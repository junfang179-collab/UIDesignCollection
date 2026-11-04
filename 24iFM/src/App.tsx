import { useEffect, type ReactNode } from 'react'

const screens = {
  profile: '/screens/profile.png',
  community: '/screens/community.png',
  login: '/screens/login.png',
  home: '/screens/home.png',
  cleaning: '/screens/cleaning.png',
  services: '/screens/services.png',
  bookingStep1: '/screens/booking-step-1.png',
  bookingStep2: '/screens/booking-step-2.png',
  bookingStep3: '/screens/booking-step-3.png',
  bookingStep4: '/screens/booking-step-4.png',
  bookingStep5: '/screens/booking-step-5.png',
}

const navItems = [
  ['01', '项目背景', 'overview'],
  ['02', '设计过程', 'process'],
  ['03', '设计系统', 'system'],
  ['04', '界面展示', 'screens'],
]

/** 画布基准尺寸：所有版式按 1920 × 1080 设计，再整体等比缩放 */
const STAGE_W = 1920
const STAGE_H = 1080

function useStageScale() {
  useEffect(() => {
    const fit = () => {
      const s = Math.min(window.innerWidth / STAGE_W, window.innerHeight / STAGE_H)
      document.documentElement.style.setProperty('--s', String(s))
    }
    fit()
    window.addEventListener('resize', fit)
    window.addEventListener('orientationchange', fit)
    return () => {
      window.removeEventListener('resize', fit)
      window.removeEventListener('orientationchange', fit)
    }
  }, [])
}

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <span className={diagonal ? 'arrow diagonal' : 'arrow'} aria-hidden="true">
      →
    </span>
  )
}

const ICONS = {
  interview: 'M4 5.6h16v9.2H9.6L4 19V5.6Z',
  observe: 'M2.8 12S6.4 6.6 12 6.6 21.2 12 21.2 12 17.6 17.4 12 17.4 2.8 12 2.8 12Z M12 9.5a2.5 2.5 0 1 0 .01 5 2.5 2.5 0 0 0-.01-5Z',
  audit: 'M4 4h6.4v6.4H4V4Zm9.6 0H20v6.4h-6.4V4ZM4 13.6h6.4V20H4v-6.4Zm9.6 0H20V20h-6.4v-6.4Z',
  speed: 'M13.4 3 5.2 13.9h5.4l-1 7.1 8.2-10.9h-5.4L13.4 3Z',
  clear: 'M12 3.4 20.6 12 12 20.6 3.4 12 12 3.4Z',
  trust: 'M12 3.2 19 6v6.1c0 4.2-3 7.1-7 8.4-4-1.3-7-4.2-7-8.4V6l7-2.8Z M8.7 12.1l2.3 2.3 4.3-4.5',
} as const

function Icon({ name, size = 22 }: { name: keyof typeof ICONS; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.65}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={ICONS[name]} />
    </svg>
  )
}

function Slide({
  id,
  kind,
  flush = false,
  children,
}: {
  id?: string
  kind: string
  flush?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="slot" id={id}>
      <section className={`slide ${kind}${flush ? ' flush' : ''}`}>
        {flush ? children : <div className="slide-pad">{children}</div>}
      </section>
    </div>
  )
}

function SectionTitle({
  number,
  eyebrow,
  title,
  intro,
  light = false,
}: {
  number: string
  eyebrow: string
  title: ReactNode
  intro?: string
  light?: boolean
}) {
  return (
    <header className={`sec-title${light ? ' light' : ''}`}>
      <div className="sec-kicker">
        <span>{number}</span>
        {eyebrow}
      </div>
      <h2>{title}</h2>
      {intro && <p>{intro}</p>}
    </header>
  )
}

function Phone({
  src,
  alt,
  className = '',
  lazy = true,
}: {
  src: string
  alt: string
  className?: string
  lazy?: boolean
}) {
  return (
    <div className={`phone ${className}`}>
      <img src={src} alt={alt} loading={lazy ? 'lazy' : 'eager'} />
    </div>
  )
}

function App() {
  useStageScale()

  return (
    <>
      <div className="frame-anchor">
        <nav className="deck-nav" aria-label="作品集章节导航">
          <a className="brand" href="#top" aria-label="返回顶部">
            <span className="brand-mark">
              <i />
              <i />
              <i />
            </span>
            <span>
              24iFM <b>CASE STUDY</b>
            </span>
          </a>
          <div className="nav-links">
            {navItems.map(([num, label, id]) => (
              <a href={`#${id}`} key={id}>
                <sup>{num}</sup>
                {label}
              </a>
            ))}
          </div>
          <div className="nav-meta">UI/UX DESIGN · 2025 · 11 SCREENS</div>
        </nav>
      </div>

      <main className="deck">
        {/* ===== 01 封面 ===== */}
        <Slide kind="s-hero" id="top" flush>
          <div className="hero-orbit orbit-a" />
          <div className="hero-orbit orbit-b" />
          <div className="hero-copy">
            <div className="hero-tag">
              <span>PRODUCT CASE STUDY</span>
              <i />
            </div>
            <h1>
              让社区生活
              <br />
              <em>更简单一点</em>
            </h1>
            <p className="hero-en">
              A smarter way to manage
              <br />
              everyday condo living.
            </p>
            <p className="hero-desc">
              24iFM
              是面向新加坡公寓住户的一站式社区生活平台。我们重新梳理了高频服务、社区信息与物业事务之间的关系，让繁琐的日常管理变得清晰、可信且随手可达。
            </p>
            <a href="#overview" className="round-link">
              <span>探索案例</span>
              <Arrow diagonal />
            </a>
          </div>

          <div className="hero-stage" aria-label="24iFM 核心界面预览">
            <Phone src={screens.community} alt="24iFM 社区动态界面" className="hero-phone left" lazy={false} />
            <Phone src={screens.home} alt="24iFM 首页界面" className="hero-phone center" lazy={false} />
            <Phone src={screens.services} alt="24iFM 服务列表界面" className="hero-phone right" lazy={false} />
          </div>

          <div className="hero-foot">
            <span>SINGAPORE · RESIDENT SUPER APP</span>
            <span>
              SCROLL TO EXPLORE <b>↓</b>
            </span>
          </div>
        </Slide>

        {/* ===== 02 项目背景 ===== */}
        <Slide id="overview" kind="s-overview">
          <SectionTitle
            number="01"
            eyebrow="PROJECT OVERVIEW"
            title="一个入口，连接社区生活的每个场景"
            intro="从找服务、看公告，到支付账单和邻里互动，24iFM 将分散在多个渠道的居民任务聚合到一个清晰、可预测的数字入口中。"
          />
          <div className="challenge-list">
            <article>
              <span>01</span>
              <div>
                <b>信息散落</b>
                <p>社区公告、账单和活动缺少统一的信息优先级。</p>
              </div>
            </article>
            <article>
              <span>02</span>
              <div>
                <b>服务难找</b>
                <p>分类逻辑模糊，用户难以快速判断价格与服务范围。</p>
              </div>
            </article>
            <article>
              <span>03</span>
              <div>
                <b>信任不足</b>
                <p>缺少标准报价、服务保障与过程状态反馈。</p>
              </div>
            </article>
          </div>

          <article className="project-card">
            <div className="project-card-top">
              <span>24iFM</span>
              <span>
                RESIDENT
                <br />
                SUPER APP
              </span>
            </div>
            <div className="project-logo">
              24<span>iFM</span>
            </div>
            <div className="project-lines">
              <div>
                <small>项目类型</small>
                <b>移动端产品体验升级</b>
              </div>
              <div>
                <small>核心用户</small>
                <b>公寓住户 / 物业管理者</b>
              </div>
              <div>
                <small>我的角色</small>
                <b>UX Research · UI Design</b>
              </div>
              <div>
                <small>项目周期</small>
                <b>12 Weeks</b>
              </div>
            </div>
          </article>

          <div className="impact-strip">
            <div>
              <strong>08</strong>
              <span>核心功能模块</span>
            </div>
            <div>
              <strong>06</strong>
              <span>关键场景重构</span>
            </div>
            <div>
              <strong>3×</strong>
              <span>信息获取效率提升目标</span>
            </div>
            <div>
              <strong>01</strong>
              <span>统一居民数字入口</span>
            </div>
          </div>
        </Slide>

        {/* ===== 03 用户研究 ===== */}
        <Slide kind="s-research">
          <SectionTitle
            number="02"
            eyebrow="USER RESEARCH"
            title="先理解真实生活，再设计数字路径"
            intro="围绕“住户为什么打开物业 APP”展开轻量研究，将日常任务、情绪波动和信任因素放在同一张体验地图上。"
          />

          <div className="research-grid">
            <article className="method-card">
              <span className="method-index">01</span>
              <span className="app-icon">
                <Icon name="interview" />
              </span>
              <h3>半结构访谈</h3>
              <p>覆盖新住户、家庭用户与活跃社区成员，了解真实使用场景与信息习惯。</p>
              <b>8 位住户 · 30–45 min</b>
            </article>
            <article className="method-card accent">
              <span className="method-index">02</span>
              <span className="app-icon">
                <Icon name="observe" />
              </span>
              <h3>任务观察</h3>
              <p>观察住户完成报修、找保洁和查询账单的路径，记录停顿与回退节点。</p>
              <b>5 个任务 · 42 个节点</b>
            </article>
            <article className="method-card">
              <span className="method-index">03</span>
              <span className="app-icon">
                <Icon name="audit" />
              </span>
              <h3>竞品审计</h3>
              <p>对比社区管理、家政服务与本地生活平台的信息结构及信任表达。</p>
              <b>6 款产品 · 4 个维度</b>
            </article>
          </div>

          <div className="insight-board">
            <div className="insight-head">
              <div>
                <span>KEY FINDINGS</span>
                <h3>
                  用户需要的不是更多功能，
                  <br />
                  而是更少的判断成本。
                </h3>
              </div>
              <p>“我只想知道现在要做什么、要付多少钱，以及事情有没有在进行。”</p>
            </div>
            <div className="insight-content">
              <div className="persona-card">
                <div className="persona-avatar">
                  <span>JL</span>
                </div>
                <div>
                  <small>PRIMARY PERSONA</small>
                  <h4>Jasmine Lee</h4>
                  <p>34 岁 · 两口之家 · 新公寓住户</p>
                </div>
                <blockquote>“我不介意在线处理事务，但每一步都要让我知道接下来会发生什么。”</blockquote>
              </div>
              <div className="finding-list">
                {[
                  ['72%', '希望首页直接呈现待处理事项'],
                  ['68%', '会优先选择价格明确的服务'],
                  ['61%', '担心线上预约后无人跟进'],
                  ['54%', '依赖社区动态了解邻里信息'],
                ].map(([n, text], i) => (
                  <div className="finding" key={text}>
                    <span>{n}</span>
                    <p>{text}</p>
                    <i
                      style={
                        {
                          '--w': `${[88, 78, 70, 62][i]}%`,
                        } as React.CSSProperties
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Slide>

        {/* ===== 04 设计目标 ===== */}
        <Slide id="process" kind="s-goals">
          <SectionTitle number="03" eyebrow="DESIGN GOALS" title="把复杂系统，转化为三种明确感受" />

          <div className="goal-grid">
            <article>
              <span>01</span>
              <div className="goal-symbol">
                <Icon name="speed" size={26} />
              </div>
              <h3>快速</h3>
              <h4>Fast to act</h4>
              <p>首屏聚焦高频入口与待办，让用户在最短路径内开始任务。</p>
            </article>
            <article>
              <span>02</span>
              <div className="goal-symbol">
                <Icon name="clear" size={26} />
              </div>
              <h3>清晰</h3>
              <h4>Clear to understand</h4>
              <p>统一卡片层级、价格语言与状态表达，降低判断和学习成本。</p>
            </article>
            <article>
              <span>03</span>
              <div className="goal-symbol">
                <Icon name="trust" size={26} />
              </div>
              <h3>可信</h3>
              <h4>Safe to trust</h4>
              <p>通过固定报价、保障标签与过程反馈，建立服务交易的安全感。</p>
            </article>
          </div>

          <div className="process-flow">
            <div className="process-copy">
              <span>DESIGN PROCESS</span>
              <h3>从问题定义到视觉交付</h3>
              <p>以双钻模型推进，在每个阶段保留可回溯的依据，并通过任务验证不断收敛方案。</p>
            </div>
            <div className="diamonds">
              {[
                ['01', 'DISCOVER', '访谈 / 观察'],
                ['02', 'DEFINE', '洞察 / 定义'],
                ['03', 'DEVELOP', '原型 / 测试'],
                ['04', 'DELIVER', '系统 / 交付'],
              ].map(([n, t, d]) => (
                <div className="diamond-item" key={t}>
                  <div>
                    <span>{n}</span>
                    <b>{t}</b>
                    <small>{d}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Slide>

        {/* ===== 05 信息架构 ===== */}
        <Slide kind="s-arch">
          <SectionTitle
            number="04"
            eyebrow="INFORMATION ARCHITECTURE"
            title="围绕居民任务，重组产品结构"
            intro="将原先以物业部门划分的功能，转换为用户可理解的生活场景；首页负责触达，二级页负责选择，详情页负责决策。"
            light
          />

          <div className="site-map" aria-label="24iFM 页面地图">
            <div className="map-root">
              24iFM<span>Resident Hub</span>
            </div>
            <div className="map-trunk" />
            <div className="map-columns">
              {[
                ['首页 Home', ['待办提醒', '快捷入口', '社区动态', '热门服务']],
                ['服务 Services', ['服务搜索', '分类浏览', '服务详情', '预约记录']],
                ['社区 Community', ['Notice Board', 'Social Wall', 'Marketplace', '互动消息']],
                ['物业 Property', ['账单支付', '设施预约', '访客登记', '房产信息']],
                ['我的 Profile', ['住户档案', '家庭成员', '通知设置', '安全退出']],
              ].map(([title, children]) => (
                <div className="map-column" key={title as string}>
                  <h3>{title as string}</h3>
                  {(children as string[]).map((child) => (
                    <div key={child}>{child}</div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="journey">
            <div className="journey-label">
              <span>CORE JOURNEY</span>
              <h3>预约家政服务</h3>
              <p>从意图到完成，每一步都有清楚的预期。</p>
            </div>
            <div className="journey-steps">
              {['发现服务', '比较分类', '查看定价', '选择时段', '确认预约'].map((step, i) => (
                <div key={step}>
                  <span>0{i + 1}</span>
                  <b>{step}</b>
                  {i < 4 && <Arrow />}
                </div>
              ))}
            </div>
          </div>
        </Slide>

        {/* ===== 06 视觉方向 ===== */}
        <Slide id="system" kind="s-visual">
          <SectionTitle
            number="05"
            eyebrow="VISUAL DIRECTION"
            title="亲和的效率感，可靠的生活感"
            intro="用清透蓝色承载服务效率，以深海军蓝建立秩序感；圆角、柔和阴影和充足留白让复杂内容保持轻盈。"
          />

          <div className="mood-grid">
            <div className="mood-photo mood-one">
              <img src="/assets/9ca01.png" alt="" />
            </div>
            <div className="mood-word">
              <small>KEYWORD 01</small>
              <strong>TRUST</strong>
              <span>可信 · 安心 · 有序</span>
            </div>
            <div className="mood-color blue">
              <span>#1C9DD7</span>
            </div>
            <div className="mood-word dark">
              <small>KEYWORD 02</small>
              <strong>CLARITY</strong>
              <span>清晰 · 直接 · 高效</span>
            </div>
            <div className="mood-photo">
              <img src="/assets/a0248.png" alt="" />
            </div>
            <div className="mood-color green">
              <span>#1AA87E</span>
            </div>
          </div>

          <div className="system-grid">
            <article className="type-system">
              <header>
                <span>01 / TYPOGRAPHY</span>
                <b>Inter</b>
              </header>
              <div className="type-hero">Aa</div>
              <div className="type-samples">
                <div>
                  <span>Display / 72</span>
                  <b>生活服务，一目了然</b>
                </div>
                <div>
                  <span>Heading / 32</span>
                  <b>Popular Services</b>
                </div>
                <div>
                  <span>Body / 16</span>
                  <p>Clear information helps residents make confident decisions.</p>
                </div>
              </div>
            </article>

            <article className="color-system">
              <header>
                <span>02 / COLOR PALETTE</span>
                <b>Accessible &amp; Calm</b>
              </header>
              <div className="swatches">
                <div className="swatch navy">
                  <b>Deep Navy</b>
                  <span>#16324F</span>
                </div>
                <div className="swatch cyan">
                  <b>24iFM Blue</b>
                  <span>#1C9DD7</span>
                </div>
                <div className="swatch mint">
                  <b>Success</b>
                  <span>#1AA87E</span>
                </div>
                <div className="swatch ice">
                  <b>Ice White</b>
                  <span>#F6FBFE</span>
                </div>
              </div>
            </article>
          </div>

          <div className="component-row">
            <div className="component-copy">
              <span>03 / COMPONENTS</span>
              <h3>统一但不单调</h3>
              <p>通过一致的圆角、间距与状态颜色，让跨场景操作保持熟悉感。</p>
            </div>
            <div className="component-demo">
              <button type="button">
                Book Now <Arrow />
              </button>
              <div className="search-demo">
                <span>⌕</span>Search “House Cleaning”
              </div>
              <div className="service-chip">
                <span className="app-icon">✓</span>
                <span>
                  <b>Verified Professionals</b>
                  <small>Quality you can trust</small>
                </span>
              </div>
            </div>
          </div>
        </Slide>

        {/* ===== 07 首页 ===== */}
        <Slide id="screens" kind="s-showcase" flush>
          <div className="showcase-copy">
            <SectionTitle
              number="06"
              eyebrow="KEY SCREEN · HOME"
              title={
                <>
                  首页不是功能集合，
                  <br />
                  而是每日生活的仪表盘
                </>
              }
              light
            />
            <p>首屏用场景化问候、八大快捷入口与待办提醒建立方向感；服务、房产和社区内容按使用频率逐层展开。</p>
            <div className="feature-points">
              <div>
                <span>01</span>
                <p>
                  <b>任务优先</b>账单、公告与预约状态先于内容推荐。
                </p>
              </div>
              <div>
                <span>02</span>
                <p>
                  <b>场景聚合</b>将物业与生活服务放在同一个心智模型中。
                </p>
              </div>
              <div>
                <span>03</span>
                <p>
                  <b>快速扫描</b>模块化卡片确保长页面仍然有稳定节奏。
                </p>
              </div>
            </div>
          </div>
          <div className="home-phone-wrap">
            <Phone src={screens.home} alt="24iFM 完整首页设计" className="showcase-phone" />
          </div>
          <span className="giant-word">HOME</span>
        </Slide>

        {/* ===== 08 服务流程 ===== */}
        <Slide kind="s-service">
          <div className="service-head">
            <SectionTitle number="07" eyebrow="SERVICE JOURNEY" title="从发现到决策，价格始终透明" />
            <p>服务列表强化类别与保障，详情页把固定价格、服务范围和增值项完整展开，减少预约前的不确定性。</p>
          </div>

          <div className="service-screens">
            <div className="screen-caption left-caption">
              <span>01</span>
              <b>EXPLORE</b>
              <p>
                按类别发现服务
                <br />
                快速建立价格预期
              </p>
            </div>
            <Phone src={screens.services} alt="24iFM 服务发现页" className="service-phone one" />
            <div className="flow-arrow">
              <Arrow />
            </div>
            <Phone src={screens.cleaning} alt="24iFM 保洁服务详情页" className="service-phone two" />
            <div className="screen-caption right-caption">
              <span>02</span>
              <b>DECIDE</b>
              <p>
                标准服务与增值项
                <br />
                报价清楚无隐藏费用
              </p>
            </div>
          </div>
        </Slide>

        {/* ===== 09 预约流程 ===== */}
        <Slide kind="s-booking">
          <div className="booking-head">
            <SectionTitle
              number="08"
              eyebrow="BOOKING FLOW"
              title="将复杂下单，拆成五个简单选择"
              intro="从服务类型到最终确认，每一步只处理一个关键决策；价格随选择实时更新，让用户始终清楚当前进度与费用。"
            />
            <div className="booking-principles">
              <span>01</span>
              <p>
                <b>分步完成</b>
                降低一次填写大量信息的负担
              </p>
              <span>02</span>
              <p>
                <b>费用可见</b>
                服务与附加项即时计入总价
              </p>
            </div>
          </div>

          <div className="booking-steps">
            {[
              ['01', '选择类型', 'TYPE', screens.bookingStep1],
              ['02', '确认规格', 'SIZE', screens.bookingStep2],
              ['03', '预约时间', 'SCHEDULE', screens.bookingStep3],
              ['04', '添加服务', 'EXTRAS', screens.bookingStep4],
              ['05', '确认订单', 'CONFIRM', screens.bookingStep5],
            ].map(([number, title, label, src]) => (
              <article className="booking-step" key={number}>
                <header>
                  <span>{number}</span>
                  <div>
                    <b>{title}</b>
                    <small>{label}</small>
                  </div>
                </header>
                <Phone src={src} alt={`保洁服务下单流程：${title}`} className="step-phone" />
              </article>
            ))}
          </div>
        </Slide>

        {/* ===== 10 更多界面 ===== */}
        <Slide kind="s-gallery">
          <SectionTitle
            number="09"
            eyebrow="MORE SCREENS"
            title="一个系统，多种生活触点"
            intro="登录、社区与个人中心沿用相同的视觉语法，在不同信息密度下维持一致体验。"
            light
          />
          <div className="gallery-grid">
            <div className="gallery-item login-shot">
              <div className="gallery-caption">
                <span>01</span>
                <div>
                  <b>Secure Access</b>
                  <p>安全登录与账户引导</p>
                </div>
              </div>
              <Phone src={screens.login} alt="24iFM 登录页" />
            </div>
            <div className="gallery-item community-shot">
              <div className="gallery-caption">
                <span>02</span>
                <div>
                  <b>Social Wall</b>
                  <p>邻里动态与社区连接</p>
                </div>
              </div>
              <Phone src={screens.community} alt="24iFM 社区动态页" />
            </div>
            <div className="gallery-item profile-shot">
              <div className="gallery-caption">
                <span>03</span>
                <div>
                  <b>My Profile</b>
                  <p>住户档案与家庭资产</p>
                </div>
              </div>
              <Phone src={screens.profile} alt="24iFM 个人中心页" />
            </div>
          </div>
        </Slide>

        {/* ===== 11 结论 ===== */}
        <Slide kind="s-outcome" flush>
          <div className="outcome-top">
            <SectionTitle number="10" eyebrow="OUTCOME & REFLECTION" title="设计的终点，是让生活少一点摩擦" light />
            <p>
              通过统一信息结构、透明服务语言与可扩展的视觉系统，24iFM
              从“物业工具”转变为真正面向住户的社区生活入口。
            </p>
          </div>

          <div className="outcome-metrics">
            <div>
              <span>01</span>
              <strong>更快</strong>
              <p>高频任务从首页直接触达</p>
            </div>
            <div>
              <span>02</span>
              <strong>更清楚</strong>
              <p>复杂服务变成可比较的信息</p>
            </div>
            <div>
              <span>03</span>
              <strong>更安心</strong>
              <p>关键决策都有反馈和保障</p>
            </div>
          </div>

          <footer>
            <div className="footer-logo">
              24<span>iFM</span>
            </div>
            <h2>
              Thank you
              <br />
              <em>for viewing.</em>
            </h2>
            <a href="#top">
              返回顶部 <span>↑</span>
            </a>
            <p>UI/UX PORTFOLIO · CASE STUDY 2025</p>
          </footer>
        </Slide>
      </main>
    </>
  )
}

export default App
