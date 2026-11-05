import { useEffect, useState } from "react"

const workspace = "/YYBusinessApp/assets/yy-business/01-workspace.png"
const history = "/YYBusinessApp/assets/yy-business/02-history.png"
const login = "/YYBusinessApp/assets/yy-business/03-login.png"
const company = "/YYBusinessApp/assets/yy-business/04-company.png"
const attendance = "/YYBusinessApp/assets/yy-business/05-attendance.png"
const profile = "/YYBusinessApp/assets/yy-business/06-profile.png"
const reviewDetail = "/YYBusinessApp/assets/yy-business/07-review-detail.png"
const qr = "/YYBusinessApp/assets/yy-business/08-qr.png"
const writeReview = "/YYBusinessApp/assets/yy-business/09-write-review.png"
const notification = "/YYBusinessApp/assets/yy-business/10-notification.png"

const pages = [
  "项目概览",
  "项目背景",
  "用户调研",
  "核心体验",
  "成果展示 I",
  "成果展示 II",
]

type MetaProps = {
  index: number
  dark?: boolean
}

function Meta({ index, dark = false }: MetaProps) {
  return (
    <>
      <div className={`slide-brand ${dark ? "is-dark" : ""}`}>
        <span className="brand-glyph">Y</span>
        <span>YY business</span>
      </div>
      <div className={`slide-count ${dark ? "is-dark" : ""}`}>
        {String(index).padStart(2, "0")} <i />{" "}
        {String(pages.length).padStart(2, "0")}
      </div>
    </>
  )
}

function SectionTitle({
  eyebrow,
  title,
  note,
  light = false,
}: {
  eyebrow: string
  title: string
  note?: string
  light?: boolean
}) {
  return (
    <header className={`section-title ${light ? "light" : ""}`}>
      <span>{eyebrow}</span>
      <h2>{title}</h2>
      {note && <p>{note}</p>}
    </header>
  )
}

function BrowserFrame({
  src,
  alt,
  className = "",
}: {
  src: string
  alt: string
  className?: string
}) {
  return (
    <figure className={`browser-frame ${className}`}>
      <div className="browser-bar">
        <span />
        <span />
        <span />
        <div>business.yygroup.com</div>
      </div>
      <img src={src} alt={alt} />
    </figure>
  )
}

function App() {
  const [active, setActive] = useState(0)

  const goTo = (index: number) => {
    document
      .getElementById(`slide-${index + 1}`)
      ?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>(".slide")
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(Number((visible.target as HTMLElement).dataset.index))
      },
      { threshold: [0.35, 0.6] },
    )
    sections.forEach((section) => observer.observe(section))

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowDown" || event.key === "ArrowRight")
        goTo(Math.min(active + 1, pages.length - 1))
      if (event.key === "ArrowUp" || event.key === "ArrowLeft")
        goTo(Math.max(active - 1, 0))
    }
    window.addEventListener("keydown", onKeyDown)
    return () => {
      observer.disconnect()
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [active])

  return (
    <main>
      <nav className="deck-nav" aria-label="演示文稿导航">
        <button
          className="nav-logo"
          onClick={() => goTo(0)}
          aria-label="返回封面"
        >
          Y
        </button>
        <div className="nav-pages">
          {pages.map((page, index) => (
            <button
              key={page}
              className={active === index ? "active" : ""}
              onClick={() => goTo(index)}
              aria-label={`前往${page}`}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <b>{page}</b>
            </button>
          ))}
        </div>
        <div className="nav-hint">SCROLL</div>
      </nav>

      <section id="slide-1" data-index="0" className="slide cover">
        <Meta index={1} dark />
        <div className="cover-grid">
          <div className="cover-copy">
            <div className="cover-kicker">
              <i /> PRODUCT DESIGN · 2026
            </div>
            <h1>
              YY <em>business</em>
            </h1>
            <h3>灵活用工管理平台 · UX / UI DESIGN</h3>
            <p>
              为新加坡服务业打造的一体化企业端工作台，
              <br />
              让排班、考勤与员工评价从复杂走向清晰。
            </p>
            <div className="cover-tags">
              <span>企业服务</span>
              <span>体验升级</span>
              <span>响应式 Web</span>
            </div>
          </div>
          <div className="cover-visual">
            <div className="halo halo-one" />
            <div className="halo halo-two" />
            <div className="cover-shot shot-main">
              <img src={workspace} alt="YY business 工作台" />
            </div>
            <div className="cover-shot shot-side">
              <img src={attendance} alt="YY business 考勤列表" />
            </div>
            <div className="float-label">
              <b>01</b>
              <span>
                WORKSPACE
                <br />
                MANAGEMENT
              </span>
            </div>
          </div>
        </div>
        <div className="cover-footer">
          <span>CASE STUDY / PRODUCT PORTFOLIO</span>
          <i />
          <span>SINGAPORE · SG</span>
        </div>
      </section>

      <section id="slide-2" data-index="1" className="slide light-slide">
        <Meta index={2} />
        <div className="content-pad">
          <SectionTitle
            eyebrow="01 / PROJECT CONTEXT"
            title="让分散的用工管理，回到一个工作台"
            note="从业务现场出发，重构企业管理者与临时员工之间的协作链路。"
          />
          <div className="context-layout">
            <div className="context-image">
              <BrowserFrame src={login} alt="YY business 登录页面" />
              <div className="image-caption">
                <span>BEFORE</span> 多入口、跨场景、信息断层
              </div>
            </div>
            <div className="context-copy">
              <div className="statement">
                <span>PROJECT BACKGROUND</span>
                <h3>
                  管理不是增加更多功能，
                  <br />
                  而是减少每一次判断的成本。
                </h3>
              </div>
              <p className="body-copy">
                YY business
                面向酒店、餐饮、活动服务等高流动用工场景。随着团队规模增长，企业管理者需要频繁切换工具完成招聘、签到、工时核对和员工评价，数据无法形成闭环。
              </p>
              <div className="metric-row">
                <div>
                  <strong>4+</strong>
                  <span>高频业务模块</span>
                </div>
                <div>
                  <strong>3</strong>
                  <span>核心用户角色</span>
                </div>
                <div>
                  <strong>1</strong>
                  <span>统一管理入口</span>
                </div>
              </div>
              <div className="scope-list">
                <span>我的角色</span>
                <b>UX 策略</b>
                <b>信息架构</b>
                <b>UI 设计</b>
                <b>交互原型</b>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="slide-3" data-index="2" className="slide research-slide">
        <Meta index={3} />
        <div className="content-pad">
          <SectionTitle
            eyebrow="02 / USER RESEARCH"
            title="从“每天要做什么”理解真实工作流"
            note="通过访谈与任务走查，定位管理者在高频考勤场景中的阻塞点。"
          />
          <div className="research-grid">
            <div className="persona-card">
              <div className="persona-index">01</div>
              <div className="avatar avatar-one">TF</div>
              <span className="role">PRIMARY USER</span>
              <h3>Tina · 运营主管</h3>
              <p>
                “我需要一眼知道谁还没到，
                <br />
                而不是逐条核对记录。”
              </p>
              <div className="persona-meta">
                <span>高频使用</span>
                <span>多人管理</span>
                <span>结果导向</span>
              </div>
            </div>
            <div className="persona-card secondary">
              <div className="persona-index">02</div>
              <div className="avatar avatar-two">XY</div>
              <span className="role">SECONDARY USER</span>
              <h3>Xin · 临时员工</h3>
              <p>
                “签到必须足够快，也要让我
                <br />
                确认记录已经成功提交。”
              </p>
              <div className="persona-meta">
                <span>移动场景</span>
                <span>低学习成本</span>
                <span>状态敏感</span>
              </div>
            </div>
            <div className="insight-panel">
              <div className="insight-head">
                <span>KEY INSIGHTS</span>
                <b>研究洞察</b>
              </div>
              {[
                [
                  "01",
                  "状态不可见",
                  "关键信息埋在表格深处，异常到岗情况发现不及时。",
                ],
                [
                  "02",
                  "操作链路长",
                  "签到、查看档案、评价分别在不同页面，任务被频繁打断。",
                ],
                [
                  "03",
                  "反馈不明确",
                  "完成操作后缺少即时确认，管理者会重复检查与提交。",
                ],
              ].map(([num, title, text]) => (
                <div className="insight-item" key={num}>
                  <b>{num}</b>
                  <div>
                    <h4>{title}</h4>
                    <p>{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="research-method">
            <span>研究方法</span>
            <div>
              <b>06</b> 深度访谈
            </div>
            <i />
            <div>
              <b>03</b> 角色画像
            </div>
            <i />
            <div>
              <b>12</b> 任务走查
            </div>
            <i />
            <div>
              <b>28</b> 痛点归纳
            </div>
          </div>
        </div>
      </section>

      <section id="slide-4" data-index="3" className="slide feature-slide">
        <Meta index={4} dark />
        <div className="content-pad">
          <SectionTitle
            eyebrow="03 / KEY EXPERIENCE"
            title="把考勤现场，压缩成一次清晰的决策"
            note="关键数据在首屏完成聚合，员工信息与操作入口保持在当前任务上下文中。"
            light
          />
          <div className="feature-stage">
            <div className="main-device">
              <img src={attendance} alt="员工考勤管理主界面" />
            </div>
            <div className="feature-shot profile-shot">
              <img src={profile} alt="员工信息弹窗" />
            </div>
            <div className="feature-shot qr-shot">
              <img src={qr} alt="扫码签到弹窗" />
            </div>
            <div className="feature-note note-a">
              <b>01</b>
              <span>
                <strong>关键指标前置</strong>到岗、离岗、总工时一眼掌握
              </span>
            </div>
            <div className="feature-note note-b">
              <b>02</b>
              <span>
                <strong>信息就地展开</strong>不中断当前考勤核对任务
              </span>
            </div>
            <div className="feature-note note-c">
              <b>03</b>
              <span>
                <strong>多方式签到</strong>兼顾现场效率与记录准确性
              </span>
            </div>
          </div>
        </div>
      </section>

      <section id="slide-5" data-index="4" className="slide finale-slide">
        <Meta index={5} dark />
        <div className="finale-head">
          <div>
            <span>04 / FINAL OUTCOME · 01</span>
            <h2>
              核心业务，
              <br />
              在统一工作台高效流转。
            </h2>
          </div>
          <p>
            企业资料、考勤记录与消息通知完整呈现，
            <br />
            保持信息结构一致，让每一次管理动作都有迹可循。
          </p>
        </div>
        <div className="outcome-grid outcome-grid-three">
          <figure className="outcome-card">
            <img src={company} alt="公司资料" />
            <figcaption>
              <b>01</b>
              <span>COMPANY PROFILE<small>企业资料管理</small></span>
            </figcaption>
          </figure>
          <figure className="outcome-card">
            <img src={history} alt="历史记录" />
            <figcaption>
              <b>02</b>
              <span>ATTENDANCE HISTORY<small>考勤记录追溯</small></span>
            </figcaption>
          </figure>
          <figure className="outcome-card">
            <img src={notification} alt="消息通知" />
            <figcaption>
              <b>03</b>
              <span>NOTIFICATION<small>业务消息通知</small></span>
            </figcaption>
          </figure>
        </div>
        <div className="outcome-page-note">
          <span>BUSINESS FOUNDATION</span>
          <i />
          <b>01 / 02</b>
        </div>
      </section>

      <section id="slide-6" data-index="5" className="slide finale-slide finale-last">
        <Meta index={6} dark />
        <div className="finale-head">
          <div>
            <span>04 / FINAL OUTCOME · 02</span>
            <h2>
              从工作记录，
              <br />
              到持续成长的反馈闭环。
            </h2>
          </div>
          <p>
            将员工评价融入日常用工流程，
            <br />
            帮助企业沉淀可靠、可复用的人才判断依据。
          </p>
        </div>
        <div className="outcome-grid outcome-grid-two">
          <figure className="outcome-card">
            <img src={reviewDetail} alt="员工评价详情" />
            <figcaption>
              <b>04</b>
              <span>STAFF REVIEWS<small>评价详情与历史反馈</small></span>
            </figcaption>
          </figure>
          <figure className="outcome-card">
            <img src={writeReview} alt="员工评价列表" />
            <figcaption>
              <b>05</b>
              <span>WRITE REVIEWS<small>批量员工评价</small></span>
            </figcaption>
          </figure>
        </div>
        <div className="finale-footer">
          <b>YY business</b>
          <span>感谢观看 · THANKS FOR WATCHING</span>
          <button onClick={() => goTo(0)}>返回封面 ↑</button>
        </div>
      </section>
    </main>
  )
}

export default App
