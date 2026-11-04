import { useEffect, useMemo, useState } from "react"

type PageShot = {
  src: string
  label: string
  title: string
  description: string
}

const shots: Record<string, PageShot> = {
  home: {
    src: "/yy-circle/home.png",
    label: "HOME / SERVICE OVERVIEW",
    title: "让复杂服务，一眼就懂",
    description:
      "以场景化内容替代企业自述，帮助访客快速理解服务边界与专业能力。",
  },
  ifm: {
    src: "/yy-circle/ifm.png",
    label: "INTEGRATED FACILITIES MANAGEMENT",
    title: "整合式设施管理",
    description:
      "用服务矩阵、里程碑与团队信息，建立大型企业采购所需要的可信度。",
  },
  cleaning: {
    src: "/yy-circle/cleaning.png",
    label: "PROFESSIONAL CLEANING",
    title: "专业清洁服务",
    description: "从需求场景到服务能力，以模块化内容完成完整的业务说明。",
  },
  disinfection: {
    src: "/yy-circle/disinfection.png",
    label: "DISINFECTION",
    title: "消毒服务解决方案",
    description: "将流程、规范和行业方案分层呈现，把专业细节转化为客户信心。",
  },
  security: {
    src: "/yy-circle/security.png",
    label: "SECURITY SERVICES",
    title: "安保服务",
    description: "以强对比影像和能力卡片，强化可靠、迅速、全天候的品牌感知。",
  },
  pest: {
    src: "/yy-circle/pest-control.png",
    label: "PEST CONTROL",
    title: "虫害防治",
    description: "围绕防治流程、应用场景与长期合作，形成系统化服务叙事。",
  },
  portfolio: {
    src: "/yy-circle/portfolio.png",
    label: "OUR PROJECT",
    title: "项目案例",
    description: "用真实项目和客户品牌构建社会证明，让浏览自然走向咨询转化。",
  },
  blog: {
    src: "/yy-circle/blog.png",
    label: "INSIGHTS / BLOG",
    title: "行业内容",
    description: "持续更新的专业内容同时服务客户教育、品牌沉淀与搜索发现。",
  },
  contact: {
    src: "/yy-circle/contact.png",
    label: "CONTACT",
    title: "联系与转化",
    description: "把地址、营业时间、常见问题与表单集中在同一条转化路径中。",
  },
}

function BrowserFrame({
  shot,
  className = "",
  position = "top",
}: {
  shot: PageShot
  className?: string
  position?: "top" | "middle" | "bottom"
}) {
  return (
    <figure className={`browser-frame ${className}`}>
      <div className="browser-bar">
        <span />
        <span />
        <span />
        <div className="address">hongyegroup.com.sg</div>
      </div>
      <div className={`website-crop website-crop--${position}`}>
        <img src={shot.src} alt={`${shot.title}官网页面截图`} />
      </div>
    </figure>
  )
}

function SlideNumber({ n, light = false }: { n: string; light?: boolean }) {
  return (
    <div className={`slide-number ${light ? "is-light" : ""}`}>{n} / 10</div>
  )
}

export default function App() {
  const [current, setCurrent] = useState(0)
  const ids = useMemo(
    () => Array.from({ length: 10 }, (_, i) => `slide-${i + 1}`),
    [],
  )

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setCurrent(ids.indexOf(visible.target.id))
      },
      { threshold: [0.35, 0.65] },
    )
    ids.forEach((id) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })
    return () => observer.disconnect()
  }, [ids])

  useEffect(() => {
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
      const forward = ["ArrowDown", "ArrowRight", "PageDown"].includes(
        event.key,
      )
      const next = Math.max(
        0,
        Math.min(ids.length - 1, current + (forward ? 1 : -1)),
      )
      document.getElementById(ids[next])?.scrollIntoView({ behavior: "smooth" })
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [current, ids])

  return (
    <main>
      <aside className="deck-nav" aria-label="演示文稿导航">
        <div className="deck-nav__brand">HYG</div>
        <div className="deck-nav__dots">
          {ids.map((id, i) => (
            <button
              key={id}
              className={current === i ? "active" : ""}
              onClick={() =>
                document
                  .getElementById(id)
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              aria-label={`前往第 ${i + 1} 屏`}
            >
              <span>{String(i + 1).padStart(2, "0")}</span>
            </button>
          ))}
        </div>
        <div className="deck-nav__hint">SCROLL</div>
      </aside>

      <section id="slide-1" className="slide slide-cover">
        <div className="cover-glow" />
        <div className="cover-copy">
          <div className="eyebrow light">UI/UX DESIGN · 2024</div>
          <h1>
            Hong Ye Group
            <span>企业服务官网重塑</span>
          </h1>
          <p>
            将多元设施管理能力，转化为清晰、可信、可转化的
            <br />
            数字品牌体验。
          </p>
          <div className="cover-meta">
            <div>
              <b>ROLE</b>
              <span>UI/UX Designer</span>
            </div>
            <div>
              <b>SCOPE</b>
              <span>Strategy · UX · UI</span>
            </div>
            <div>
              <b>PLATFORM</b>
              <span>Responsive Web</span>
            </div>
          </div>
        </div>
        <BrowserFrame shot={shots.home} className="cover-browser" />
        <div className="cover-index">CASE STUDY 01</div>
        <SlideNumber n="01" light />
      </section>

      <section id="slide-2" className="slide slide-overview">
        <div className="overview-top">
          <div>
            <div className="eyebrow">PROJECT OVERVIEW</div>
            <h2>
              从“服务列表”
              <br />
              到“专业信任”
            </h2>
          </div>
          <p className="overview-lead">
            Hong Ye Group
            提供覆盖清洁、消毒、安保、虫害防治与综合设施管理的企业服务。
            本次设计的核心，是让复杂的服务结构变得易理解，让专业能力变得可感知。
          </p>
        </div>
        <div className="challenge-grid">
          <article>
            <span>01</span>
            <h3>信息复杂</h3>
            <p>
              多条业务线、不同服务流程与行业场景，需要统一且可扩展的内容框架。
            </p>
          </article>
          <article>
            <span>02</span>
            <h3>决策理性</h3>
            <p>
              B2B 访客关注资质、流程、覆盖范围与响应效率，信任必须被具体证明。
            </p>
          </article>
          <article>
            <span>03</span>
            <h3>转化链路</h3>
            <p>从了解服务到发起咨询，要在每个页面建立明确、低阻力的下一步。</p>
          </article>
        </div>
        <div className="overview-strip">
          <div>
            <b>9</b>
            <span>核心页面</span>
          </div>
          <div>
            <b>5</b>
            <span>服务体系</span>
          </div>
          <div>
            <b>1</b>
            <span>统一体验</span>
          </div>
          {[shots.home, shots.ifm, shots.contact].map((shot) => (
            <img key={shot.src} src={shot.src} alt="" />
          ))}
        </div>
        <SlideNumber n="02" />
      </section>

      <section id="slide-3" className="slide slide-system">
        <div className="system-copy">
          <div className="eyebrow light">DESIGN DIRECTION</div>
          <h2>
            理性秩序
            <br />
            与服务温度
          </h2>
          <p>
            延续品牌蓝作为行动色，以大面积留白建立专业感；通过真实工作场景，让企业服务不再抽象。
          </p>
          <div className="principles">
            <div>
              <span>01</span>
              <b>清晰层级</b>
              <small>Clear hierarchy</small>
            </div>
            <div>
              <span>02</span>
              <b>模块复用</b>
              <small>Scalable modules</small>
            </div>
            <div>
              <span>03</span>
              <b>证据优先</b>
              <small>Proof first</small>
            </div>
          </div>
        </div>
        <div className="system-board">
          <div className="palette">
            <div className="cyan">
              <span>#00A5D2</span>
            </div>
            <div className="navy">
              <span>#072B3B</span>
            </div>
            <div className="ice">
              <span>#EAF7FB</span>
            </div>
            <div className="white">
              <span>#FFFFFF</span>
            </div>
          </div>
          <div className="type-specimen">
            <span>TYPOGRAPHY</span>
            <strong>Aa</strong>
            <div>
              <b>Build trust at every touchpoint.</b>
              <small>建立值得信赖的每一次触点</small>
            </div>
          </div>
          <div className="ui-samples">
            <button>
              CONTACT US <i>↗</i>
            </button>
            <div className="sample-card">
              <b>Security Services</b>
              <span>Professional · Reliable · Responsive</span>
            </div>
          </div>
        </div>
        <SlideNumber n="03" light />
      </section>

      <section id="slide-4" className="slide slide-showcase">
        <div className="showcase-copy">
          <div className="eyebrow">SERVICE OVERVIEW</div>
          <h2>{shots.home.title}</h2>
          <p>{shots.home.description}</p>
          <div className="tag-row">
            <span>场景入口</span>
            <span>服务矩阵</span>
            <span>品牌背书</span>
          </div>
          <div className="note">
            <b>设计重点</b> 让用户在首屏之后的 30
            秒内，完成“我们是谁、能做什么、为什么可信”的判断。
          </div>
        </div>
        <BrowserFrame shot={shots.home} className="showcase-browser" />
        <BrowserFrame
          shot={shots.home}
          className="showcase-detail"
          position="middle"
        />
        <div className="caption-line">01 &nbsp; HOMEPAGE EXPERIENCE</div>
        <SlideNumber n="04" />
      </section>

      <section id="slide-5" className="slide slide-ifm">
        <div className="ifm-visual">
          <BrowserFrame
            shot={shots.ifm}
            className="ifm-browser"
            position="top"
          />
          <BrowserFrame
            shot={shots.ifm}
            className="ifm-detail"
            position="middle"
          />
        </div>
        <div className="ifm-copy">
          <div className="eyebrow light">{shots.ifm.label}</div>
          <h2>{shots.ifm.title}</h2>
          <p>{shots.ifm.description}</p>
          <div className="metric-list">
            <div>
              <span>01</span>
              <b>能力可视化</b>
              <small>图标与卡片快速建立服务全貌</small>
            </div>
            <div>
              <span>02</span>
              <b>历程可信化</b>
              <small>以发展节点沉淀企业经验</small>
            </div>
            <div>
              <span>03</span>
              <b>团队人格化</b>
              <small>让专业能力拥有真实面孔</small>
            </div>
          </div>
        </div>
        <SlideNumber n="05" light />
      </section>

      <section id="slide-6" className="slide slide-cleaning">
        <div className="cleaning-head">
          <div>
            <div className="eyebrow">SERVICE PAGE SYSTEM</div>
            <h2>{shots.cleaning.title}</h2>
          </div>
          <p>{shots.cleaning.description}</p>
        </div>
        <div className="cleaning-layout">
          <BrowserFrame shot={shots.cleaning} className="cleaning-browser" />
          <BrowserFrame
            shot={shots.cleaning}
            className="cleaning-detail"
            position="middle"
          />
          <div className="cleaning-insights">
            <div className="insight-no">02</div>
            <h3>
              一套结构
              <br />
              承载多类服务
            </h3>
            <ul>
              <li>
                <span>01</span>首屏快速定义服务价值
              </li>
              <li>
                <span>02</span>能力与流程分层展开
              </li>
              <li>
                <span>03</span>场景案例降低理解成本
              </li>
              <li>
                <span>04</span>统一表单承接咨询意图
              </li>
            </ul>
          </div>
        </div>
        <SlideNumber n="06" />
      </section>

      <section id="slide-7" className="slide slide-disinfection">
        <div className="disinfection-bg" />
        <div className="disinfection-copy">
          <div className="eyebrow light">{shots.disinfection.label}</div>
          <h2>{shots.disinfection.title}</h2>
          <p>{shots.disinfection.description}</p>
          <div className="process">
            <span>ASSESS</span>
            <i />
            <span>PLAN</span>
            <i />
            <span>EXECUTE</span>
            <i />
            <span>REPORT</span>
          </div>
        </div>
        <BrowserFrame
          shot={shots.disinfection}
          className="disinfection-browser"
        />
        <BrowserFrame
          shot={shots.disinfection}
          className="disinfection-detail"
          position="middle"
        />
        <SlideNumber n="07" light />
      </section>

      <section id="slide-8" className="slide slide-dual">
        <div className="dual-heading">
          <div className="eyebrow">SPECIALIZED SERVICES</div>
          <h2>
            同一品牌，
            <br />
            不同服务语境
          </h2>
          <p>
            保持交互逻辑与视觉语言一致，同时用场景影像和内容重点塑造不同服务的专业气质。
          </p>
        </div>
        <div className="dual-card dual-card--security">
          <div className="dual-card__label">
            <span>01</span>
            <b>{shots.security.title}</b>
            <small>可靠 · 响应 · 守护</small>
          </div>
          <BrowserFrame shot={shots.security} className="dual-main" />
          <BrowserFrame
            shot={shots.security}
            className="dual-detail"
            position="middle"
          />
        </div>
        <div className="dual-card dual-card--pest">
          <div className="dual-card__label">
            <span>02</span>
            <b>{shots.pest.title}</b>
            <small>预防 · 治理 · 长期管理</small>
          </div>
          <BrowserFrame shot={shots.pest} className="dual-main" />
          <BrowserFrame
            shot={shots.pest}
            className="dual-detail"
            position="middle"
          />
        </div>
        <SlideNumber n="08" />
      </section>

      <section id="slide-9" className="slide slide-content">
        <div className="content-heading">
          <div className="eyebrow light">CONTENT &amp; PROOF</div>
          <h2>
            让成果被看见，
            <br />
            让专业被发现
          </h2>
        </div>
        <div className="content-column">
          <div className="content-label">
            <span>PROJECT</span>
            <b>{shots.portfolio.title}</b>
            <p>{shots.portfolio.description}</p>
          </div>
          <BrowserFrame shot={shots.portfolio} className="content-browser" />
          <BrowserFrame
            shot={shots.portfolio}
            className="content-detail"
            position="middle"
          />
        </div>
        <div className="content-column">
          <div className="content-label">
            <span>INSIGHTS</span>
            <b>{shots.blog.title}</b>
            <p>{shots.blog.description}</p>
          </div>
          <BrowserFrame shot={shots.blog} className="content-browser" />
          <BrowserFrame
            shot={shots.blog}
            className="content-detail"
            position="middle"
          />
        </div>
        <SlideNumber n="09" light />
      </section>

      <section id="slide-10" className="slide slide-final">
        <div className="final-copy">
          <div className="eyebrow">CONTACT &amp; CONVERSION</div>
          <h2>
            从浏览到行动，
            <br />
            完成体验闭环
          </h2>
          <p>{shots.contact.description}</p>
          <div className="final-results">
            <div>
              <b>清晰</b>
              <span>统一的信息架构</span>
            </div>
            <div>
              <b>可信</b>
              <span>具体的能力证明</span>
            </div>
            <div>
              <b>高效</b>
              <span>连续的咨询入口</span>
            </div>
          </div>
          <div className="final-quote">
            “设计不是装饰信息，而是帮助用户更快做出正确判断。”
          </div>
        </div>
        <BrowserFrame shot={shots.contact} className="final-browser" />
        <BrowserFrame
          shot={shots.contact}
          className="final-detail"
          position="bottom"
        />
        <div className="thank-you">
          <span>HONG YE GROUP · WEBSITE REDESIGN</span>
          <b>THANK YOU</b>
        </div>
        <SlideNumber n="10" />
      </section>
    </main>
  )
}
