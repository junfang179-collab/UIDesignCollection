import { useEffect, useState } from "react"

const assets = {
  home: "/assets/yyforce-home.png",
  circle: "/assets/yyforce-circle.png",
  facilities: "/assets/yyforce-facilities.png",
  analytics: "/assets/yyforce-analytics.png",
  leadership: "/assets/yyforce-leadership.png",
  contact: "/assets/yyforce-contact.png",
}

const atlas = [
  {
    src: assets.circle,
    alt: "YY Circle 产品页面",
    title: "按需用工",
    en: "YY CIRCLE",
    note: "匹配 · 排班 · 履约，串成一条旅程",
  },
  {
    src: assets.facilities,
    alt: "24IFM 设施运营页面",
    title: "设施运营",
    en: "24IFM",
    note: "工单、人员与现场服务统一",
  },
  {
    src: assets.analytics,
    alt: "AI 视频分析页面",
    title: "AI 视频洞察",
    en: "AI VIDEO ANALYTICS",
    note: "既有摄像头转为实时预警",
  },
  {
    src: assets.leadership,
    alt: "YYFORCE 领导团队页面",
    title: "团队背书",
    en: "LEADERSHIP",
    note: "14 位成员，统一影像与网格",
  },
  {
    src: assets.contact,
    alt: "YYFORCE 联系页面",
    title: "咨询转化",
    en: "CONTACT",
    note: "需求先分流，再进统一表单",
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
              YYFORCE 是连接企业与一线劳动者的人力与科技服务集团。以 <span className="nowrap">YY Circle</span> 承载按需用工，以 <span className="nowrap">24IFM</span> 打通设施运营，并把机器人与 <span className="nowrap">AI 视频分析</span> 带入现场管理——多条业务线在同一品牌体系下协同，为企业提供从人到空间的一体化服务。
            </p>
            <div className="cover-about__tags">
              <span>WORKFORCE SOLUTIONS</span>
              <i>/</i>
              <span>FACILITY OPERATIONS</span>
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
        <SlideHeader number="01" title="产品与体验全景 / EXPERIENCE ATLAS" />
        <div className="atlas-head">
          <div>
            <Eyebrow light>ONE SYSTEM · FIVE TOUCHPOINTS</Eyebrow>
            <h2>
              一套语言，<span>走完整个旅程。</span>
            </h2>
          </div>
          <p>
            从按需用工、设施运营到 AI
            洞察，再到团队背书与咨询转化；五个页面共用同一套首屏结构、能力卡片与行动路径，让多元业务始终读起来像同一个品牌。
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
          <span>WORKFORCE</span>
          <i>→</i>
          <span>FACILITY OPS</span>
          <i>→</i>
          <span>AI ANALYTICS</span>
          <i>→</i>
          <span>TRUST</span>
          <i>→</i>
          <span>CONVERSION</span>
          <em>REUSABLE STRUCTURE · CONSISTENT CTA</em>
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
