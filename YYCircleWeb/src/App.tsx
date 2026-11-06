import { useEffect, useRef, useState } from "react"

const screens = [
  { id: "intro", label: "品牌与首页" },
  { id: "roles", label: "双端旅程" },
  { id: "journey", label: "转化闭环" },
]

const roles = [
  {
    no: "01",
    tag: "FOR JOB SEEKER",
    en: "WORKER JOURNEY",
    title: "随时开工",
    src: "/yycircle/worker.png",
    points: ["按时间与地点挑岗位", "资料驱动岗位推荐", "完成班次累积奖励"],
  },
  {
    no: "02",
    tag: "FOR BUSINESS",
    en: "EMPLOYER CONVERSION",
    title: "即刻补员",
    src: "/yycircle/employer.png",
    points: ["智能匹配候选档案", "履历与雇主评分可见", "提交需求快速到岗"],
  },
]

const conversions = [
  {
    no: "01",
    title: "Hire Workers",
    cn: "人才匹配",
    note: "按评价与经验筛选合适人选",
    src: "/yycircle/employer-overview.png",
  },
  {
    no: "02",
    title: "Request Staff",
    cn: "快速获客",
    note: "提交用人需求，直达询盘",
    src: "/yycircle/hire-worker.png",
  },
  {
    no: "03",
    title: "Get Started",
    cn: "下载引导",
    note: "下载 App，开始接单与赚奖励",
    src: "/yycircle/get-started.png",
  },
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
      <span className="slide-index">{index} / 03</span>
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

function Frame({
  src,
  url,
  children,
}: {
  src: string
  url: string
  children?: React.ReactNode
}) {
  return (
    <div className="tc-frame">
      <div className="tc-frame-bar">
        <span />
        <span />
        <span />
        <b>{url}</b>
      </div>
      <div className="tc-frame-view">
        <img src={src} alt={`${url} 页面截图`} />
      </div>
      {children}
    </div>
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
        <section id="intro" className="slide slide-cover tc-slide">
          <div className="slide-canvas tc-canvas tc-intro">
            <header className="tc-top">
              <Mark light />
              <span>YY CIRCLE · WEB EXPERIENCE REDESIGN</span>
              <b>01 / 03</b>
            </header>

            <div className="tc-intro-body">
              <div className="tc-intro-copy">
                <span className="tc-kicker">ON-DEMAND STAFFING PLATFORM · SINGAPORE</span>
                <h1>
                  让每一次
                  <br />
                  <em>灵活匹配</em>更快发生
                </h1>
                <p>
                  YY Circle 是 AI 驱动的按需用工平台。企业发布临时与轮班岗位，平台从
                  <strong> 10 万+ 技能工人 </strong>
                  中完成智能匹配，覆盖酒店、餐饮、零售、电商与会展等行业；累计完成
                  900 万+ 工时，服务 12 个国家的 300+ 客户。
                </p>
                <div className="tc-stats">
                  <div>
                    <b>9M+</b>
                    <span>累计完成工时</span>
                  </div>
                  <div>
                    <b>95%</b>
                    <span>岗位填充率</span>
                  </div>
                  <div>
                    <b>12</b>
                    <span>覆盖国家</span>
                  </div>
                </div>
                <div className="tc-intro-brief">
                  <span>DESIGN BRIEF</span>
                  <p>
                    把双边用工的复杂流程，转译成清晰、可信、可快速行动的数字体验——从角色分流到转化收口，六个页面共用一套语言。
                  </p>
                </div>
                <button className="tc-cta" onClick={() => goTo(1)}>
                  查看双端体验 <ArrowIcon />
                </button>
              </div>

              <div className="tc-intro-shot">
                <Frame src="/yycircle/home.png" url="yycircle.com">
                  <div className="tc-intro-shot-label">
                    <span>HOMEPAGE</span>
                    <b>品牌首页 · 双角色分流</b>
                  </div>
                </Frame>
              </div>
            </div>

            <div className="tc-intro-foot">
              <span>AI MATCHING</span>
              <span>100,000+ SKILLED WORKERS</span>
              <span>300+ CLIENTS</span>
              <span>1,000+ EMPLOYERS</span>
              <i>FOR JOB SEEKER / FOR BUSINESS</i>
            </div>
          </div>
        </section>

        <section id="roles" className="slide slide-paper tc-slide">
          <div className="slide-canvas tc-canvas">
            <SlideHead index="02" eyebrow="TWO-SIDED JOURNEY" />
            <div className="tc-head">
              <div>
                <span className="tc-kicker">ONE SYSTEM · TWO AUDIENCES</span>
                <h2>同一套系统，两种沟通语言</h2>
              </div>
              <p>
                品牌表达保持一致，内容密度与行动指引按角色调整：求职者关心「何时、何地、多久结薪」，企业关心「多快到岗、是否可靠」。
              </p>
            </div>

            <div className="tc-role-wall">
              {roles.map((role) => (
                <article className="tc-role" key={role.no}>
                  <div className="tc-role-title">
                    <span>{role.tag}</span>
                    <h3>
                      <b>{role.no}</b>
                      {role.title}
                      <i>{role.en}</i>
                    </h3>
                  </div>
                  <Frame src={role.src} url="yycircle.com" />
                  <ul className="tc-role-points">
                    {role.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>

            <div className="tc-role-foot">
              <span>SHARED DESIGN SYSTEM</span>
              <p>一致的导航、卡片语言与 CTA，配合蓝色视觉资产与信任表达，让两端读起来像同一个品牌。</p>
            </div>
          </div>
        </section>

        <section id="journey" className="slide slide-ink tc-slide">
          <div className="slide-canvas tc-canvas">
            <SlideHead index="03" eyebrow="CONVERSION & PAGE SYSTEM" light />
            <div className="tc-head is-light">
              <div>
                <span className="tc-kicker">SIX PAGES · ONE PATH</span>
                <h2>从认知到行动，六个页面一条路径</h2>
              </div>
              <p>
                首页完成品牌认知与角色分流，双端页面承接各自诉求，最后由人才匹配、需求提交与下载引导收口转化。
              </p>
            </div>

            <div className="tc-trio-wall">
              {conversions.map((item) => (
                <Frame src={item.src} url="yycircle.com" key={item.no}>
                  <div className="tc-shot-label">
                    <b>{item.no}</b>
                    <div>
                      <strong>{item.title}</strong>
                      <span>{item.cn}</span>
                    </div>
                    <p>{item.note}</p>
                  </div>
                </Frame>
              ))}
            </div>

            <div className="tc-flow">
              <span>DISCOVER</span>
              <i>→</i>
              <span>MATCH</span>
              <i>→</i>
              <span>DEPLOY</span>
              <i>→</i>
              <span>EARN</span>
              <em>CLARITY · TRUST · CONVERSION</em>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default App
