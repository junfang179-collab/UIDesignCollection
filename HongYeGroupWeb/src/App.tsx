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
    title: "服务全景首页",
    description:
      "以 IFM 能力矩阵与场景化入口替代企业自述，让访客在首屏理解集团的服务边界与技术底座。",
  },
  ifm: {
    src: "/yy-circle/ifm.png",
    label: "INTEGRATED FACILITIES MANAGEMENT",
    title: "整合式设施管理",
    description:
      "围绕建筑性能、运营成本与 ESG 目标，串联清洁、消毒、虫害防治、安保、园艺与办公室维护的一体化服务矩阵。",
  },
  cleaning: {
    src: "/yy-circle/cleaning.png",
    label: "PROFESSIONAL CLEANING",
    title: "专业清洁服务",
    description:
      "按商业、住宅、工业与医疗场景拆分服务范围，以 NEA 执照、BCA 认证与 Smart iClean 智能设备建立可验证的交付标准。",
  },
  disinfection: {
    src: "/yy-circle/disinfection.png",
    label: "DISINFECTION & SANITISATION",
    title: "消毒与卫生方案",
    description:
      "将药剂规范、作业流程与雾化 / 静电喷涂工艺分层呈现，把合规细节转化为客户可感知的安全感。",
  },
  security: {
    src: "/yy-circle/security.png",
    label: "SECURITY SERVICES / UNIFORCE",
    title: "安保服务",
    description:
      "由旗下 Uniforce Security Services 提供受训守卫与监控体系，以强对比影像和能力卡片传达响应速度与全天候守护。",
  },
  pest: {
    src: "/yy-circle/pest-control.png",
    label: "PEST CONTROL / PEST FIGHTER",
    title: "虫害防治",
    description:
      "由 Pest Fighter 承接，围绕侦测、治理、预防与长期合约，形成 IPM 综合虫害管理的系统化叙事。",
  },
  portfolio: {
    src: "/yy-circle/portfolio.png",
    label: "OUR PROJECTS",
    title: "项目案例",
    description:
      "以酒店、零售、医疗与政府客户的真实项目构建社会证明，配合服务规模与成果指标支撑企业采购决策。",
  },
  blog: {
    src: "/yy-circle/blog.png",
    label: "INSIGHTS / BLOG",
    title: "行业洞察",
    description:
      "持续输出清洁标准、设施管理与 ESG 实践的专业内容，兼顾客户教育、品牌沉淀与自然搜索可见性。",
  },
  contact: {
    src: "/yy-circle/contact.png",
    label: "CONTACT & ENQUIRY",
    title: "联系与转化",
    description:
      "把地址、营业时间、电话、邮箱与咨询表单收拢到同一条路径，让企业客户以最低成本发起询价。",
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
    <div className={`slide-number ${light ? "is-light" : ""}`}>{n} / 05</div>
  )
}

export default function App() {
  const [current, setCurrent] = useState(0)
  const ids = useMemo(
    () => Array.from({ length: 5 }, (_, i) => `slide-${i + 1}`),
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
          <div className="cover-about">
            <b>ABOUT HONG YE GROUP</b>
            <p>
              Hong Ye Group 成立于 2010 年，是新加坡的综合设施管理（IFM）集团，面向商业、住宅、工业与公共空间提供清洁、消毒、虫害防治、安保与环境维护的一体化服务。集团以 iFM 与 Smart iClean 智能系统、IoT 传感与绩效看板驱动交付，并联动 YY Circle、Uniforce Security、Pest Fighter 组成 YYGH 服务生态。
            </p>
          </div>
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
            以整合式设施管理（IFM）为信息主干，重组 9 个核心页面；用真实场景、合规资质与 Smart iClean 技术底座，
            把多元服务能力转化为可验证的采购理由。
          </p>
        </div>
        <div className="overview-direction">
          <div className="overview-direction__label">
            <b>DESIGN DIRECTION</b>
            <span>理性秩序 · 服务温度</span>
          </div>
          <div className="overview-direction__items">
            <div><i>01</i><b>清晰层级</b></div>
            <div><i>02</i><b>模块复用</b></div>
            <div><i>03</i><b>证据优先</b></div>
          </div>
          <div className="overview-direction__palette">
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>
        <div className="overview-showcase">
          <div className="overview-showcase__bar">
            <span className="overview-showcase__label">SELECTED SCREENS</span>
            <span className="overview-showcase__note">HONG YE GROUP · OFFICIAL WEBSITE</span>
          </div>
          <div className="overview-showcase__shots">
            {[shots.ifm, shots.cleaning, shots.disinfection].map((shot) => (
              <figure key={shot.src}>
                <img src={shot.src} alt={shot.title} />
                <figcaption>{shot.label}</figcaption>
              </figure>
            ))}
          </div>
        </div>
        <SlideNumber n="02" />
      </section>

      <section id="slide-3" className="slide slide-specialty">
        <div className="specialty-intro">
          <div className="specialty-intro__top">
            <div className="eyebrow">SPECIALIZED SERVICES</div>
            <h2>
              同一品牌，
              <br />
              不同服务语境
            </h2>
            <p>
              安保与虫害防治由集团旗下 Uniforce Security Services、Pest Fighter 承接。沿用统一的信息骨架，
              以场景影像与服务范围塑造各自的专业气质。
            </p>
          </div>
          <div className="specialty-intro__mid">
            <div className="specialty-basis">
              <span>SHARED FRAMEWORK</span>
              <b>一套骨架，两种表达</b>
              <p>统一导航 · 一致栅格 · 复用组件 · 同一询价入口</p>
            </div>
            <div className="specialty-context">
              <span>CONTEXT SHIFT</span>
              <div className="specialty-context__item">
                <i>01</i>
                <div>
                  <b>UNIFORCE SECURITY</b>
                  <small>强对比影像 · 能力卡片 · 信任优先</small>
                </div>
              </div>
              <div className="specialty-context__item">
                <i>02</i>
                <div>
                  <b>PEST FIGHTER</b>
                  <small>流程图示 · 服务范围 · 证据优先</small>
                </div>
              </div>
            </div>
          </div>
          <div className="specialty-intro__foot">
            <span>YYGH ECOSYSTEM</span>
            <small>集团子品牌协同</small>
          </div>
        </div>
        <div className="specialty-grid">
          {[
            { shot: shots.security, n: "01" },
            { shot: shots.pest, n: "02" },
          ].map(({ shot, n }) => (
            <article className="specialty-case" key={shot.src}>
              <div className="specialty-case__visual">
                <BrowserFrame shot={shot} className="specialty-browser" />
              </div>
              <div className="specialty-case__copy">
                <span>
                  {n} / {shot.label}
                </span>
                <h3>{shot.title}</h3>
                <p>{shot.description}</p>
              </div>
            </article>
          ))}
        </div>
        <SlideNumber n="03" />
      </section>

      <section id="slide-4" className="slide slide-proof">
        <div className="proof-head">
          <div>
            <div className="eyebrow light">CONTENT &amp; PROOF</div>
            <h2>让成果被看见，让专业被发现</h2>
          </div>
          <p>项目案例提供社会证明，行业洞察沉淀专业话语权，共同构成官网的证据层。</p>
        </div>
        <div className="proof-grid">
          <article className="proof-case proof-case--main">
            <div className="proof-case__copy">
              <span>01 / {shots.portfolio.label}</span>
              <h3>{shots.portfolio.title}</h3>
              <p>{shots.portfolio.description}</p>
            </div>
            <div className="proof-case__visual">
              <BrowserFrame shot={shots.portfolio} className="proof-browser" />
            </div>
          </article>
          <article className="proof-case proof-case--sub">
            <div className="proof-case__copy">
              <span>02 / {shots.blog.label}</span>
              <h3>{shots.blog.title}</h3>
              <p>{shots.blog.description}</p>
            </div>
            <div className="proof-case__visual">
              <BrowserFrame shot={shots.blog} className="proof-browser" />
            </div>
          </article>
        </div>
        <SlideNumber n="04" light />
      </section>

      <section id="slide-5" className="slide slide-contact">
        <div className="contact-copy">
          <div className="eyebrow">CONVERSION &amp; CONTACT</div>
          <h2>
            从了解，
            <br />
            到合作
          </h2>
          <p>
            企业采购的决策链路长、参与角色多。因此把询价入口做成低门槛、多渠道、可追溯的一步，
            让合作意向在浏览途中随时可以落地。
          </p>
          <div className="contact-points">
            <div>
              <i>01</i>
              <b>清晰入口</b>
              <span>全站页头与页脚保留一致的咨询动作</span>
            </div>
            <div>
              <i>02</i>
              <b>结构化表单</b>
              <span>按服务类型、场地规模与需求分流</span>
            </div>
            <div>
              <i>03</i>
              <b>全渠道信息</b>
              <span>电话、邮箱、地址与营业时间一次给全</span>
            </div>
          </div>
        </div>
        <div className="contact-visual">
          <BrowserFrame shot={shots.contact} className="contact-browser" />
        </div>
        <SlideNumber n="05" />
      </section>

    </main>
  )
}
