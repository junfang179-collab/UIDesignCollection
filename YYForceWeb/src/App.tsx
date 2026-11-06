import { useEffect, useState } from "react"

const assets = {
  home: "/assets/yyforce-home.jpg",
  about: "/assets/yyforce-about.jpg",
  services: "/assets/yyforce-services.jpg",
  technology: "/assets/yyforce-technology.jpg",
  news: "/assets/yyforce-news.jpg",
}

const atlas = [
  {
    src: assets.services,
    alt: "YYFORCE Services 服务页面",
    title: "服务矩阵",
    en: "SERVICES",
    note: "三组能力共用一套卡片模板，跨业务可对照阅读",
  },
  {
    src: assets.about,
    alt: "YYFORCE About Us 页面",
    title: "信任叙事",
    en: "ABOUT US",
    note: "里程碑时间轴 + 团队网格，把长文拆成可扫读的证据",
  },
  {
    src: assets.technology,
    alt: "YYFORCE Technology 页面",
    title: "技术图鉴",
    en: "TECHNOLOGY",
    note: "产品图 / 规格 / 案例分层，复杂参数渐进披露",
  },
  {
    src: assets.news,
    alt: "YYFORCE News 页面",
    title: "内容索引",
    en: "NEWS",
    note: "搜索与年份筛选 + 统一卡片栅格，内容可持续扩展",
  },
]

type BrowserProps = {
  src: string
  alt: string
  className?: string
  position?: string
}

interface SlideHeaderProps {
  number: string
  title: string
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

function Browser({ src, alt, className = "", position = "top" }: BrowserProps) {
  return (
    <div className={`browser ${className}`}>
      <div className="browser-bar">
        <span />
        <span />
        <span />
        <div className="browser-url">yyforce.ai</div>
      </div>
      <div className="browser-view">
        <img src={src} alt={alt} style={{ objectPosition: position }} />
      </div>
    </div>
  )
}

function Eyebrow({
  children,
  light = false,
}: {
  children: React.ReactNode
  light?: boolean
}) {
  return (
    <div className={`eyebrow ${light ? "eyebrow-light" : ""}`}>{children}</div>
  )
}

function SlideHeader({ number, title }: SlideHeaderProps) {
  return (
    <header className="slide-header">
      <a href="#cover" className="wordmark" aria-label="返回首页">
        <span>YY</span>FORCE
      </a>
      <div className="slide-title">
        <span>{number}</span>
        {title}
      </div>
    </header>
  )
}

const slides = [
  "cover",
  "atlas",
  "outcome",
]

export default function App() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const elements = slides
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(slides.indexOf(visible.target.id))
      },
      { threshold: [0.35, 0.6] },
    )
    elements.forEach((element) => observer.observe(element!))

    const onKeyDown = (event: KeyboardEvent) => {
      if (
        ![
          "ArrowDown",
          "ArrowRight",
          "PageDown",
          "ArrowUp",
          "ArrowLeft",
          "PageUp",
        ].includes(event.key)
      )
        return
      event.preventDefault()
      const direction = ["ArrowDown", "ArrowRight", "PageDown"].includes(
        event.key,
      )
        ? 1
        : -1
      const next = Math.max(0, Math.min(slides.length - 1, active + direction))
      document
        .getElementById(slides[next])
        ?.scrollIntoView({ behavior: "smooth" })
    }
    window.addEventListener("keydown", onKeyDown)
    return () => {
      observer.disconnect()
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [active])

  return (
    <main>
      <nav className="deck-nav" aria-label="演示文稿页码">
        <span className="nav-current">
          {String(active + 1).padStart(2, "0")}
        </span>
        <div className="nav-line" />
        {slides.map((id, index) => (
          <a
            key={id}
            href={`#${id}`}
            className={active === index ? "active" : ""}
            aria-label={`跳转至第 ${index + 1} 页`}
          />
        ))}
        <span className="nav-total">03</span>
      </nav>

      <section id="cover" className="slide cover dark">
        <div className="cover-grid" />
        <header className="cover-nav">
          <div className="wordmark wordmark-large">
            <span>YY</span>FORCE
            <small>Powering forward together</small>
          </div>
          <div>UI / UX CASE STUDY · 2026</div>
        </header>
        <div className="cover-copy">
          <Eyebrow light>企业官网焕新 / WEBSITE REDESIGN</Eyebrow>
          <h1>
            让复杂业务
            <br />
            <em>被清晰看见。</em>
          </h1>
          <div className="cover-about">
            <span className="cover-about__label">ABOUT YYFORCE / 集团简介</span>
            <p>
              YYFORCE Inc.（NASDAQ: YFOR）是技术驱动的人力解决方案与综合设施管理集团。以 <span className="nowrap">YY Circle</span> 连接企业与灵活就业者，以 <span className="nowrap">24iFM</span> 统筹现场服务，并以 <span className="nowrap">Yolara AI</span> 与人形机器人实验室推进智能化，服务网络覆盖 12 个市场。
            </p>
            <div className="cover-about__tags">
              <span>WORKFORCE PLATFORM</span>
              <i>/</i>
              <span>INTEGRATED FACILITIES</span>
              <i>/</i>
              <span>AI &amp; ROBOTICS</span>
            </div>
          </div>
          <div className="cover-meta">
            <div>
              <span>项目角色</span>
              UI/UX Designer
            </div>
            <div>
              <span>项目范围</span>
              Strategy · UX · UI
            </div>
            <div>
              <span>交付终端</span>
              Responsive Web
            </div>
          </div>
        </div>
        <div className="cover-visual">
          <Browser src={assets.home} alt="YYFORCE 官网首页" />
          <div className="orb" />
        </div>
        <div className="scroll-note">
          SCROLL TO EXPLORE <ArrowIcon />
        </div>
      </section>

      <section id="atlas" className="slide atlas-slide dark">
        <SlideHeader number="01" title="页面类型与设计语法 / PAGE SYSTEM" />
        <div className="atlas-head">
          <div>
            <Eyebrow light>ONE SYSTEM · FOUR PAGE TYPES</Eyebrow>
            <h2>
              一套语法，<span>覆盖四类页面。</span>
            </h2>
          </div>
          <p>
            从服务矩阵、品牌叙事到技术图鉴与内容索引：共用导航、栅格与卡片语言，只按信息密度和证据类型做差异，让多元业务读起来始终像同一个产品。
          </p>
        </div>
        <div className="atlas-wall">
          {atlas.map((item, index) => (
            <article
              key={item.src}
              className={`atlas-cell ${index === 0 ? "atlas-cell--main" : ""}`}
            >
              <div className="atlas-shot">
                <img src={item.src} alt={item.alt} />
              </div>
              <div className="atlas-label">
                <b>{String(index + 1).padStart(2, "0")}</b>
                <div>
                  <strong>{item.title}</strong>
                  <span>{item.en}</span>
                </div>
              </div>
              <p>{item.note}</p>
            </article>
          ))}
        </div>
        <div className="atlas-flow">
          <span>INFORMATION ARCHITECTURE</span>
          <i>→</i>
          <span>COMPONENTS</span>
          <i>→</i>
          <span>CONTENT PATTERN</span>
          <i>→</i>
          <span>CTA</span>
          <em>ONE NAV · ONE GRID · ONE BUTTON</em>
        </div>
      </section>

      <section id="outcome" className="slide outcome-slide dark">
        <div className="outcome-overlay" />
        <div className="outcome-spec">
          <span className="spec-label">DESIGN SYSTEM / 设计交付</span>
          <h3>可复用的界面底座</h3>
          <div className="spec-block">
            <b>COLOR TOKENS</b>
            <div className="spec-swatches">
              <div>
                <i style={{ background: "#08111c" }} />
                <span>#08111C</span>
                <small>Base / Dark</small>
              </div>
              <div>
                <i style={{ background: "#29a7e4" }} />
                <span>#29A7E4</span>
                <small>Accent / CTA</small>
              </div>
              <div>
                <i style={{ background: "#eaf4fa" }} />
                <span>#EAF4FA</span>
                <small>Text / Light</small>
              </div>
            </div>
          </div>
          <div className="spec-block">
            <b>TYPE SCALE</b>
            <div className="spec-type">
              <div>
                <span>64</span> Hero / 页面标题
              </div>
              <div>
                <span>40</span> Section / 分区标题
              </div>
              <div>
                <span>16</span> Body / 正文
              </div>
              <div>
                <span>12</span> Caption / 标签
              </div>
            </div>
          </div>
          <div className="spec-block">
            <b>COMPONENT LIBRARY</b>
            <div className="spec-chips">
              <span>HERO</span>
              <span>SECTION HEAD</span>
              <span>CARD</span>
              <span>TIMELINE</span>
              <span>MEDIA GRID</span>
              <span>CTA BUTTON</span>
            </div>
          </div>
          <p className="spec-foot">12-COL GRID · 8PT SPACING · WCAG AA CONTRAST</p>
        </div>
        <div className="outcome-deliverables">
          <article>
            <b>01</b>
            <strong>IA MAP</strong>
            <span>站点地图与角色路径</span>
          </article>
          <article>
            <b>02</b>
            <strong>WIREFRAME</strong>
            <span>四类页面模板与栅格</span>
          </article>
          <article>
            <b>03</b>
            <strong>UI KIT</strong>
            <span>色彩 / 字阶 / 组件库</span>
          </article>
          <article>
            <b>04</b>
            <strong>RESPONSIVE</strong>
            <span>断点规则与适配规范</span>
          </article>
        </div>
        <div className="outcome-copy">
          <Eyebrow light>项目总结 / DESIGN OUTCOME</Eyebrow>
          <h2>
            把复杂业务，
            <br />收进<span>一套界面语言。</span>
          </h2>
          <p>
            五类页面共用导航、栅格与组件库；内容按「先结论、再证据、后参数」分层，让首次访问者能扫读、决策者能深入、新页面能直接沿用。
          </p>
          <div className="outcome-results">
            <div>
              <b>01</b>
              <span>
                统一
                <br />
                信息架构
              </span>
            </div>
            <div>
              <b>02</b>
              <span>
                复用
                <br />
                组件系统
              </span>
            </div>
            <div>
              <b>03</b>
              <span>
                明确
                <br />
                转化路径
              </span>
            </div>
          </div>
        </div>
        <footer>
          <div className="wordmark wordmark-large">
            <span>YY</span>FORCE
          </div>
          <div>UI / UX PORTFOLIO</div>
          <a href="#cover">
            BACK TO TOP <ArrowIcon />
          </a>
        </footer>
      </section>
    </main>
  )
}
