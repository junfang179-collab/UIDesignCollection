import { useEffect, useRef, useState } from "react"

const screens = [
  { id: "cover", label: "封面" },
  { id: "brief", label: "设计命题" },
  { id: "home", label: "首页策略" },
  { id: "worker", label: "求职者旅程" },
  { id: "employer", label: "雇主转化" },
  { id: "ecosystem", label: "双端生态" },
  { id: "system", label: "页面矩阵" },
  { id: "closing", label: "项目总结" },
]

const pages = [
  { src: "/yycircle/home.png", name: "Homepage", cn: "品牌首页" },
  { src: "/yycircle/worker.png", name: "For Worker", cn: "灵活就业" },
  { src: "/yycircle/employer.png", name: "For Employer", cn: "企业服务" },
  {
    src: "/yycircle/employer-overview.png",
    name: "Hire Workers",
    cn: "人才匹配",
  },
  { src: "/yycircle/get-started.png", name: "Get Started", cn: "下载引导" },
  { src: "/yycircle/hire-worker.png", name: "Request Staff", cn: "快速获客" },
]

function Mark({ light = false }: { light?: boolean }) {
  return (
    <div className={`mark ${light ? "mark-light" : ""}`} aria-label="YY Circle">
      <span className="mark-orbit">
        <b>YY</b>
      </span>
      <span className="mark-word">Circle</span>
    </div>
  )
}

function SlideHead({
  index,
  eyebrow,
  light = false,
}: {
  index: string
  eyebrow: string
  light?: boolean
}) {
  return (
    <header className={`slide-head ${light ? "is-light" : ""}`}>
      <Mark light={light} />
      <span className="eyebrow">{eyebrow}</span>
      <span className="slide-index">{index} / 08</span>
    </header>
  )
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h13M13 6l6 6-6 6" />
    </svg>
  )
}

function App() {
  const [active, setActive] = useState(0)
  const deckRef = useRef<HTMLElement>(null)

  const goTo = (index: number) => {
    const next = Math.max(0, Math.min(screens.length - 1, index))
    document
      .getElementById(screens[next].id)
      ?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.55) {
            const index = screens.findIndex(
              (screen) => screen.id === entry.target.id,
            )
            if (index >= 0) setActive(index)
          }
        })
      },
      { threshold: [0.55] },
    )

    deckRef.current
      ?.querySelectorAll(".slide")
      .forEach((slide) => observer.observe(slide))
    const onKeyDown = (event: KeyboardEvent) => {
      if (["ArrowDown", "ArrowRight", "PageDown", " "].includes(event.key)) {
        event.preventDefault()
        goTo(active + 1)
      }
      if (["ArrowUp", "ArrowLeft", "PageUp"].includes(event.key)) {
        event.preventDefault()
        goTo(active - 1)
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => {
      observer.disconnect()
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [active])

  return (
    <>
      <nav className="deck-nav" aria-label="演示文稿导航">
        <button
          className="nav-brand"
          onClick={() => goTo(0)}
          aria-label="回到封面"
        >
          YY
        </button>
        <div className="nav-dots">
          {screens.map((screen, index) => (
            <button
              key={screen.id}
              className={active === index ? "active" : ""}
              onClick={() => goTo(index)}
              aria-label={`前往${screen.label}`}
              aria-current={active === index ? "page" : undefined}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <i>{screen.label}</i>
            </button>
          ))}
        </div>
        <button
          className="print-button"
          onClick={() => window.print()}
          aria-label="打印或导出 PDF"
        >
          PDF
        </button>
      </nav>

      <main ref={deckRef} className="deck">
        <section id="cover" className="slide slide-cover">
          <div className="slide-canvas cover-grid">
            <div className="cover-copy">
              <Mark light />
              <div className="cover-kicker">UI / UX CASE STUDY · 2026</div>
              <h1>
                让每一次
                <br />
                <em>灵活匹配</em>更高效
              </h1>
              <p>
                YY Circle 官网体验重构
                <br />
                双边用工平台的品牌表达与转化设计
              </p>
              <button className="cover-cta" onClick={() => goTo(1)}>
                查看项目 <ArrowIcon />
              </button>
            </div>
            <div className="cover-visual">
              <div className="cover-number">01</div>
              <div className="browser browser-cover">
                <div className="browser-bar">
                  <span />
                  <span />
                  <span />
                  <b>yycircle.com</b>
                </div>
                <img
                  src="/yycircle/home.png"
                  alt="YY Circle homepage screenshot"
                />
              </div>
              <div className="cover-caption">
                <span>WEB EXPERIENCE</span>
                <b>Singapore · Global</b>
              </div>
            </div>
            <span className="cover-line" />
          </div>
        </section>

        <section id="brief" className="slide slide-paper">
          <div className="slide-canvas">
            <SlideHead index="02" eyebrow="PROJECT OVERVIEW" />
            <div className="brief-layout">
              <div className="brief-title">
                <span className="section-no">01</span>
                <h2>
                  从“找工作”到
                  <br />
                  “可信赖的匹配”
                </h2>
                <p>
                  把复杂的临时用工服务，转译为清晰、可信、可快速行动的数字体验。
                </p>
              </div>
              <div className="brief-quote">
                <p>
                  如何让企业与灵活就业者，在最短路径内理解平台价值并完成下一步？
                </p>
                <span>THE DESIGN QUESTION</span>
              </div>
              <div className="brief-metrics">
                <article>
                  <strong>02</strong>
                  <span>核心用户端</span>
                  <p>Employer / Worker</p>
                </article>
                <article>
                  <strong>06</strong>
                  <span>关键落地页面</span>
                  <p>From awareness to action</p>
                </article>
                <article>
                  <strong>12</strong>
                  <span>覆盖国家</span>
                  <p>Scalable market story</p>
                </article>
              </div>
              <div className="brief-scope">
                <span>我的设计范围</span>
                <ul>
                  <li>信息架构</li>
                  <li>体验策略</li>
                  <li>界面视觉</li>
                  <li>响应式规范</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="home" className="slide slide-blue">
          <div className="slide-canvas">
            <SlideHead index="03" eyebrow="HOMEPAGE STRATEGY" light />
            <div className="feature-layout">
              <div className="feature-copy">
                <span className="section-no">02</span>
                <h2>
                  一个入口，
                  <br />
                  讲清双边价值
                </h2>
                <p>
                  首页以角色分流作为叙事中轴：先建立“全球灵活用工平台”的品牌认知，再分别承接雇主与求职者的核心诉求。
                </p>
                <div className="feature-points">
                  <div>
                    <b>01</b>
                    <span>
                      <strong>价值前置</strong>首屏集中表达效率、规模与可信度
                    </span>
                  </div>
                  <div>
                    <b>02</b>
                    <span>
                      <strong>角色分流</strong>为 Employer / Worker 提供明确路径
                    </span>
                  </div>
                  <div>
                    <b>03</b>
                    <span>
                      <strong>证据闭环</strong>
                      用评价、数据与合作品牌降低决策成本
                    </span>
                  </div>
                </div>
              </div>
              <div className="feature-browser-wrap">
                <div className="browser browser-tall">
                  <div className="browser-bar">
                    <span />
                    <span />
                    <span />
                    <b>yycircle.com</b>
                  </div>
                  <img
                    src="/yycircle/home.png"
                    alt="YY Circle homepage full page screenshot"
                  />
                </div>
                <div className="callout callout-one">
                  <i>01</i>
                  <span>清晰的价值主张</span>
                </div>
                <div className="callout callout-two">
                  <i>02</i>
                  <span>双角色内容分流</span>
                </div>
                <div className="callout callout-three">
                  <i>03</i>
                  <span>信任与社会证明</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="worker" className="slide slide-paper">
          <div className="slide-canvas">
            <SlideHead index="04" eyebrow="WORKER JOURNEY" />
            <div className="journey-layout">
              <div className="journey-copy">
                <span className="section-no">03</span>
                <h2>
                  把灵活工作
                  <br />
                  变成可预期的旅程
                </h2>
                <p>
                  求职者关心的不只是岗位数量，更是薪资、排班与上岗门槛。页面用短步骤和明确收益，将不确定感转化为行动动力。
                </p>
              </div>
              <div className="journey-steps">
                {[
                  ["01", "Discover", "发现适配岗位"],
                  ["02", "Complete", "完善个人资料"],
                  ["03", "Verify", "完成平台认证"],
                  ["04", "Start", "快速上岗工作"],
                ].map(([num, en, cn]) => (
                  <article key={num}>
                    <b>{num}</b>
                    <span>{en}</span>
                    <p>{cn}</p>
                  </article>
                ))}
              </div>
              <div className="crop-card worker-crop">
                <img
                  src="/yycircle/worker.png"
                  alt="YY Circle worker page screenshot"
                />
              </div>
              <div className="mini-page mini-page-one">
                <img
                  src="/yycircle/get-started.png"
                  alt="YY Circle get started page screenshot"
                />
                <span>APP ENTRY</span>
              </div>
              <div className="journey-note">
                <strong>“低门槛”并不等于“低信任”</strong>
                <p>
                  用透明流程、行业分类和
                  FAQ，同步回答用户最在意的上岗速度与费用问题。
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="employer" className="slide slide-ink">
          <div className="slide-canvas">
            <SlideHead index="05" eyebrow="EMPLOYER CONVERSION" light />
            <div className="employer-layout">
              <div className="employer-title">
                <span className="section-no">04</span>
                <h2>
                  从业务压力，
                  <br />
                  直达招聘方案
                </h2>
                <p>
                  围绕“快、准、可管理”组织雇主端信息，让决策者先理解平台能力，再进入询盘与招聘动作。
                </p>
              </div>
              <div className="employer-proof">
                <span>BUSINESS VALUE</span>
                <strong>95%</strong>
                <p>Fulfilment rate</p>
              </div>
              <div className="employer-cards">
                <article>
                  <i>01</i>
                  <b>Smart Screening</b>
                  <p>智能筛选，减少无效沟通</p>
                </article>
                <article>
                  <i>02</i>
                  <b>Training Included</b>
                  <p>标准培训，确保快速上岗</p>
                </article>
                <article>
                  <i>03</i>
                  <b>Smooth Deployment</b>
                  <p>灵活部署，应对临时缺口</p>
                </article>
              </div>
              <div className="employer-shot">
                <img
                  src="/yycircle/hire-worker.png"
                  alt="YY Circle hire worker page screenshot"
                />
              </div>
              <div className="employer-flow">
                <span>认知</span>
                <i />
                <span>信任</span>
                <i />
                <span>询盘</span>
                <i />
                <span>转化</span>
              </div>
            </div>
          </div>
        </section>

        <section id="ecosystem" className="slide slide-sky">
          <div className="slide-canvas">
            <SlideHead index="06" eyebrow="TWO-SIDED ECOSYSTEM" />
            <div className="ecosystem-title">
              <span className="section-no">05</span>
              <h2>
                同一套系统，
                <br />
                两种不同的沟通语言
              </h2>
              <p>
                保持品牌一致，同时针对角色目标调整内容密度、利益点与转化动作。
              </p>
            </div>
            <div className="ecosystem-board">
              <article className="persona persona-worker">
                <div className="persona-label">
                  <span>01</span>
                  <b>WORKER</b>
                  <i>发现机会</i>
                </div>
                <div className="persona-window">
                  <img
                    src="/yycircle/worker.png"
                    alt="Worker experience page"
                  />
                </div>
                <ul>
                  <li>收益：快结薪、灵活排班</li>
                  <li>动作：下载 App / Find Jobs</li>
                </ul>
              </article>
              <div className="ecosystem-core">
                <span>ONE</span>
                <Mark />
                <b>
                  DESIGN
                  <br />
                  SYSTEM
                </b>
                <i />
                <p>
                  一致的导航、模块、CTA
                  <br />
                  与信任表达
                </p>
              </div>
              <article className="persona persona-employer">
                <div className="persona-label">
                  <span>02</span>
                  <b>EMPLOYER</b>
                  <i>解决缺口</i>
                </div>
                <div className="persona-window">
                  <img
                    src="/yycircle/employer.png"
                    alt="Employer experience page"
                  />
                </div>
                <ul>
                  <li>收益：稳定供给、智能管理</li>
                  <li>动作：Request Demo / Hire Worker</li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section id="system" className="slide slide-paper">
          <div className="slide-canvas">
            <SlideHead index="07" eyebrow="PAGE SYSTEM" />
            <div className="system-title">
              <div>
                <span className="section-no">06</span>
                <h2>从品牌认知到业务转化</h2>
              </div>
              <p>
                6
                个关键页面形成完整内容网络，所有页面延续一致的蓝色视觉资产、卡片语言与行动指引。
              </p>
            </div>
            <div className="page-grid">
              {pages.map((page, index) => (
                <article key={page.name}>
                  <div className="page-preview">
                    <img src={page.src} alt={`${page.name} screenshot`} />
                  </div>
                  <div>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <b>{page.name}</b>
                    <i>{page.cn}</i>
                  </div>
                </article>
              ))}
            </div>
            <div className="system-strip">
              <span>DESIGN PRINCIPLES</span>
              <b>清晰层级</b>
              <i /> <b>角色导向</b>
              <i /> <b>可信证明</b>
              <i /> <b>低门槛转化</b>
            </div>
          </div>
        </section>

        <section id="closing" className="slide slide-closing">
          <div className="slide-canvas">
            <SlideHead index="08" eyebrow="PROJECT OUTCOME" light />
            <div className="closing-layout">
              <div className="closing-copy">
                <span className="section-no">07</span>
                <h2>
                  设计不只是呈现服务，
                  <br />
                  更是在建立连接。
                </h2>
                <p>
                  通过双角色信息架构、统一的视觉系统与证据化表达，YY Circle
                  官网将复杂的用工生态转化为清晰、可信、可行动的体验。
                </p>
                <div className="closing-tags">
                  <span>CLARITY</span>
                  <span>TRUST</span>
                  <span>CONVERSION</span>
                </div>
              </div>
              <div className="closing-pages">
                <div className="closing-page p1">
                  <img src="/yycircle/employer.png" alt="Employer page" />
                </div>
                <div className="closing-page p2">
                  <img src="/yycircle/home.png" alt="Homepage" />
                </div>
                <div className="closing-page p3">
                  <img src="/yycircle/worker.png" alt="Worker page" />
                </div>
              </div>
              <footer>
                <Mark light />
                <span>UI / UX PORTFOLIO · YY CIRCLE</span>
                <b>THANK YOU.</b>
              </footer>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default App
