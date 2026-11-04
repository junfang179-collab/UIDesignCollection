import { useEffect, useState } from "react"

const assets = {
  home: "/assets/yyforce-home.png",
  circle: "/assets/yyforce-circle.png",
  facilities: "/assets/yyforce-facilities.png",
  analytics: "/assets/yyforce-analytics.png",
  leadership: "/assets/yyforce-leadership.png",
  contact: "/assets/yyforce-contact.png",
}

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
  "overview",
  "system",
  "circle",
  "solutions",
  "leadership",
  "contact",
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
        <span className="nav-total">08</span>
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
          <p>
            为综合人力与科技服务集团 YYFORCE
            构建统一、可信、可扩展的数字品牌体验。
          </p>
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

      <section id="overview" className="slide light">
        <SlideHeader number="01" title="项目概览 / OVERVIEW" />
        <div className="overview-layout">
          <div className="overview-copy">
            <Eyebrow>设计命题</Eyebrow>
            <h2>
              一个品牌，
              <br />
              <span>两种增长引擎。</span>
            </h2>
            <p>
              YYFORCE 同时服务企业与一线劳动者，业务横跨人力、设施管理、机器人及
              AI
              视觉分析。挑战不在于展示更多信息，而在于建立一套能让不同受众快速理解的内容秩序。
            </p>
            <div className="goal-list">
              <div>
                <b>01</b>
                <span>
                  <strong>重构信息架构</strong>
                  从企业结构转向用户任务
                </span>
              </div>
              <div>
                <b>02</b>
                <span>
                  <strong>统一品牌语言</strong>
                  在科技感与可信度间平衡
                </span>
              </div>
              <div>
                <b>03</b>
                <span>
                  <strong>建立转化路径</strong>
                  让每类访问者都有下一步
                </span>
              </div>
            </div>
          </div>
          <div className="overview-visual">
            <Browser src={assets.home} alt="YYFORCE 首页全貌" />
            <div className="caption">Homepage / 品牌与业务全景入口</div>
          </div>
        </div>
        <div className="section-tag">RESEARCH · DEFINE · DESIGN</div>
      </section>

      <section id="system" className="slide system-slide">
        <SlideHeader number="02" title="视觉系统 / DESIGN SYSTEM" />
        <div className="system-top">
          <div>
            <Eyebrow light>视觉策略</Eyebrow>
            <h2>
              克制的科技感，
              <br />
              <span>稳定的企业信任。</span>
            </h2>
          </div>
          <p>
            以深海军蓝建立专业底色，用高亮科技蓝引导行动；大字号标题与充足留白提升信息效率，
            模块化卡片则支撑多业务线持续扩展。
          </p>
        </div>
        <div className="system-board">
          <div className="type-card">
            <span className="card-label">TYPE SCALE</span>
            <div className="type-sample">Aa</div>
            <div className="type-name">Inter / Sans Serif</div>
            <div className="type-weights">
              Regular&nbsp;&nbsp; Medium&nbsp;&nbsp; Semibold
            </div>
          </div>
          <div className="color-card">
            <span className="card-label">COLOR PALETTE</span>
            <div className="swatches">
              <div className="swatch navy">
                <span>#08111C</span>
              </div>
              <div className="swatch blue">
                <span>#2498D4</span>
              </div>
              <div className="swatch mist">
                <span>#F3F7FB</span>
              </div>
              <div className="swatch white">
                <span>#FFFFFF</span>
              </div>
            </div>
          </div>
          <div className="component-card">
            <span className="card-label">UI COMPONENTS</span>
            <button>
              Explore Our Solutions <ArrowIcon />
            </button>
            <div className="mini-card">
              <div className="mini-icon">AI</div>
              <strong>AI-Powered Matching</strong>
              <p>Intelligent products, clearly explained.</p>
            </div>
          </div>
          <div className="principle-card">
            <span className="card-label">DESIGN PRINCIPLES</span>
            <ol>
              <li>
                <b>01</b>清晰优先于装饰
              </li>
              <li>
                <b>02</b>模块支持业务增长
              </li>
              <li>
                <b>03</b>行动始终清楚可见
              </li>
            </ol>
          </div>
        </div>
      </section>

      <section id="circle" className="slide light product-slide">
        <SlideHeader number="03" title="核心产品 / YY CIRCLE" />
        <div className="product-copy">
          <Eyebrow>AI-ENABLED WORKFORCE</Eyebrow>
          <h2>
            从“找人”到“到岗”，
            <br />
            <span>把复杂流程变简单。</span>
          </h2>
          <p>
            围绕按需用工场景，将匹配、排班、预订、考勤与绩效整合成连贯的数字旅程。
            页面采用“价值主张—核心能力—双边收益—平台数据”的顺序，让企业与求职者都能快速找到相关信息。
          </p>
          <div className="metrics">
            <div>
              <b>544K+</b>
              <span>平台注册账户</span>
            </div>
            <div>
              <b>12</b>
              <span>覆盖国家</span>
            </div>
            <div>
              <b>95%</b>
              <span>岗位履约率</span>
            </div>
          </div>
        </div>
        <div className="product-visual">
          <Browser src={assets.circle} alt="YY Circle 产品页面" />
          <div className="image-note">
            <span>03.1</span>
            页面以真实产品场景建立信任，再通过卡片系统降低理解成本。
          </div>
        </div>
        <div className="blue-ribbon">
          WORKFORCE · MATCHING · DEPLOYMENT · PERFORMANCE
        </div>
      </section>

      <section id="solutions" className="slide solutions-slide">
        <SlideHeader number="04" title="业务矩阵 / SOLUTION ECOSYSTEM" />
        <div className="solutions-heading">
          <div>
            <Eyebrow light>多业务，同一套体验语言</Eyebrow>
            <h2>
              让每条产品线独立表达，
              <br />
              又始终属于同一个品牌。
            </h2>
          </div>
          <p>
            通过一致的首屏结构、能力卡片、场景证明与
            CTA，建立可复用的页面模板，显著降低扩展成本。
          </p>
        </div>
        <div className="solution-grid">
          <article>
            <div className="solution-number">01 / 24IFM</div>
            <div className="solution-shot">
              <img src={assets.facilities} alt="24IFM 页面" />
            </div>
            <div className="solution-info">
              <div>
                <h3>Facility Operations</h3>
                <p>将工单、人员与现场服务连接为统一运营平台。</p>
              </div>
              <ArrowIcon />
            </div>
          </article>
          <article>
            <div className="solution-number">02 / AI VIDEO ANALYTICS</div>
            <div className="solution-shot">
              <img src={assets.analytics} alt="AI Video Analytics 页面" />
            </div>
            <div className="solution-info">
              <div>
                <h3>Actionable Intelligence</h3>
                <p>把既有摄像头转化为实时洞察与安全预警。</p>
              </div>
              <ArrowIcon />
            </div>
          </article>
        </div>
      </section>

      <section id="leadership" className="slide leadership-slide light">
        <SlideHeader number="05" title="信任构建 / LEADERSHIP" />
        <div className="leadership-visual">
          <Browser src={assets.leadership} alt="YYFORCE 领导团队页面" />
        </div>
        <div className="leadership-copy">
          <Eyebrow>企业品牌体验</Eyebrow>
          <h2>
            科技叙事之外，
            <br />
            <span>让“人”成为信任锚点。</span>
          </h2>
          <p>
            对投资者与企业客户而言，管理团队是品牌可信度的重要证明。我们将成员照片、角色与履历统一为高密度但易扫描的内容系统，
            用稳定网格强化组织专业度。
          </p>
          <div className="quote">
            “Operating Depth.
            <br />
            Financial Discipline.
            <br />
            Technology Expertise.”
          </div>
          <div className="design-note">
            <span>DESIGN NOTE</span>
            清晰层级与统一影像比例，使 14 位成员的信息在长页面中仍保持节奏。
          </div>
        </div>
      </section>

      <section id="contact" className="slide contact-slide">
        <SlideHeader number="06" title="转化体验 / CONTACT" />
        <div className="contact-copy">
          <Eyebrow light>从浏览到行动</Eyebrow>
          <h2>
            不做一个万能表单，
            <br />
            <span>先帮用户找到对的人。</span>
          </h2>
          <p>
            联系页先按需求分流至 Workforce、Facility、AI & Robotics、Investor
            Relations
            等团队，再进入统一表单。减少选择焦虑，也让内部线索分配更高效。
          </p>
          <div className="flow">
            <div>
              <b>01</b>
              <span>
                识别需求
                <br />
                <small>Intent</small>
              </span>
            </div>
            <ArrowIcon />
            <div>
              <b>02</b>
              <span>
                匹配团队
                <br />
                <small>Route</small>
              </span>
            </div>
            <ArrowIcon />
            <div>
              <b>03</b>
              <span>
                提交咨询
                <br />
                <small>Convert</small>
              </span>
            </div>
          </div>
        </div>
        <div className="contact-visual">
          <Browser src={assets.contact} alt="YYFORCE 联系页面" />
          <div className="hotspot hotspot-one">需求分流</div>
          <div className="hotspot hotspot-two">简洁表单</div>
        </div>
      </section>

      <section id="outcome" className="slide outcome-slide dark">
        <div className="outcome-collage" aria-hidden="true">
          <div>
            <img src={assets.home} alt="" />
          </div>
          <div>
            <img src={assets.circle} alt="" />
          </div>
          <div>
            <img src={assets.analytics} alt="" />
          </div>
        </div>
        <div className="outcome-overlay" />
        <div className="outcome-copy">
          <Eyebrow light>项目总结 / OUTCOME</Eyebrow>
          <h2>
            从业务集合，
            <br />到<span>清晰、有力的品牌系统。</span>
          </h2>
          <p>
            最终方案以可复用的结构承载多元业务，让品牌表达更统一、产品价值更易理解、用户行动路径更明确。
          </p>
          <div className="outcome-results">
            <div>
              <b>01</b>
              <span>
                统一
                <br />
                品牌认知
              </span>
            </div>
            <div>
              <b>02</b>
              <span>
                提升
                <br />
                信息效率
              </span>
            </div>
            <div>
              <b>03</b>
              <span>
                支持
                <br />
                持续扩展
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
