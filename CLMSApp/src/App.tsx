import { useEffect, useRef, useState } from "react"

const screens = {
  edit: "/images/clms-01.png",
  examine: "/images/clms-02.png",
  report: "/images/clms-03.png",
  dashboard: "/images/clms-04.png",
  jobs: "/images/clms-05.png",
  capture: "/images/clms-06.png",
  attendance: "/images/clms-07.png",
  country: "/images/clms-08.png",
  login: "/images/clms-09.png",
  request: "/images/clms-10.png",
}

const slideNames = [
  "封面",
  "项目洞察",
  "身份与地区",
  "运营中枢",
  "用工闭环",
  "移动考勤",
  "审核与报表",
]

function ArrowIcon({ direction = "down" }: { direction?: "down" | "right" }) {
  return (
    <svg
      aria-hidden="true"
      className={direction === "right" ? "-rotate-90" : ""}
      viewBox="0 0 24 24"
    >
      <path
        d="M5 9.5 12 16l7-6.5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  )
}

function Phone({
  src,
  alt,
  className = "",
  position = "top",
}: {
  src: string
  alt: string
  className?: string
  position?: "top" | "center"
}) {
  return (
    <figure className={`phone ${className}`}>
      <div className="phone__speaker" />
      <img
        className={position === "center" ? "object-center" : ""}
        src={src}
        alt={alt}
      />
    </figure>
  )
}

function Kicker({
  index,
  children,
}: {
  index: string
  children: React.ReactNode
}) {
  return (
    <div className="kicker">
      <span>{index}</span>
      <i />
      <p>{children}</p>
    </div>
  )
}

function MiniFlow({
  number,
  title,
  text,
}: {
  number: string
  title: string
  text: string
}) {
  return (
    <article className="mini-flow">
      <span>{number}</span>
      <div>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </article>
  )
}

export default function App() {
  const [active, setActive] = useState(0)
  const slidesRef = useRef<(HTMLElement | null)[]>([])

  const goTo = (index: number) => {
    slidesRef.current[
      Math.max(0, Math.min(slideNames.length - 1, index))
    ]?.scrollIntoView({
      behavior: "smooth",
    })
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible)
          setActive(Number((visible.target as HTMLElement).dataset.index))
      },
      { threshold: [0.45, 0.7] },
    )

    slidesRef.current.forEach((slide) => slide && observer.observe(slide))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (["ArrowDown", "ArrowRight", "PageDown", " "].includes(event.key)) {
        event.preventDefault()
        goTo(active + 1)
      }
      if (["ArrowUp", "ArrowLeft", "PageUp"].includes(event.key)) {
        event.preventDefault()
        goTo(active - 1)
      }
      if (event.key === "Home") goTo(0)
      if (event.key === "End") goTo(slideNames.length - 1)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [active])

  const slideProps = (index: number) => ({
    ref: (node: HTMLElement | null) => {
      slidesRef.current[index] = node
    },
    "data-index": index,
  })

  return (
    <main>
      <aside className="slide-nav" aria-label="演示文稿导航">
        <div className="slide-nav__brand">CL</div>
        <div className="slide-nav__dots">
          {slideNames.map((name, index) => (
            <button
              className={active === index ? "is-active" : ""}
              key={name}
              onClick={() => goTo(index)}
              aria-label={`前往第 ${index + 1} 屏：${name}`}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <i />
            </button>
          ))}
        </div>
        <p>
          {String(active + 1).padStart(2, "0")} /{" "}
          {String(slideNames.length).padStart(2, "0")}
        </p>
      </aside>

      <section className="slide cover" {...slideProps(0)}>
        <div className="stage cover__stage">
          <div className="ambient ambient--one" />
          <div className="ambient ambient--two" />
          <header className="topline">
            <span>UI/UX PORTFOLIO · 2025</span>
            <span>HOSPITALITY / WORKFORCE / MOBILE</span>
          </header>
          <div className="cover__copy">
            <p className="eyebrow">酒店临时用工管理系统</p>
            <h1>CLMS</h1>
            <h2>
              让酒店用工，从需求到核算
              <br />
              形成清晰的数字闭环。
            </h2>
            <div className="cover__meta">
              <div>
                <b>10</b>
                <span>核心界面</span>
              </div>
              <div>
                <b>06</b>
                <span>业务模块</span>
              </div>
              <div>
                <b>01</b>
                <span>统一体验</span>
              </div>
            </div>
          </div>
          <div className="cover__phones">
            <Phone
              src={screens.dashboard}
              alt="CLMS 酒店工作台界面"
              className="cover-phone cover-phone--back"
            />
            <Phone
              src={screens.login}
              alt="CLMS 登录界面"
              className="cover-phone cover-phone--front"
            />
          </div>
          <button className="scroll-cue" onClick={() => goTo(1)}>
            <span>向下探索项目</span>
            <ArrowIcon />
          </button>
          <p className="vertical-note">CASE STUDY · 01</p>
        </div>
      </section>

      <section className="slide insight" {...slideProps(1)}>
        <div className="stage">
          <header className="topline topline--dark">
            <span>CLMS / CASE STUDY</span>
            <span>01 — PROJECT OVERVIEW</span>
          </header>
          <div className="insight__title">
            <Kicker index="01">项目洞察</Kicker>
            <h2>
              将分散的酒店用工流程，
              <br />
              收束为一条可追踪的服务链。
            </h2>
          </div>
          <div className="insight__grid">
            <div className="challenge">
              <p className="label">THE CHALLENGE</p>
              <p className="challenge__quote">
                “临时用工需求变化快，
                <br />
                但审批、签到与核算
                <br />
                往往散落在不同环节。”
              </p>
            </div>
            <div className="insight__flows">
              <MiniFlow
                number="01"
                title="需求可视化"
                text="把岗位、人数、成本与时段整合为结构化工单。"
              />
              <MiniFlow
                number="02"
                title="状态可追踪"
                text="以颜色和操作状态提示审批、招募与到岗进度。"
              />
              <MiniFlow
                number="03"
                title="数据可复盘"
                text="从考勤凭证到成本报表，形成酒店管理依据。"
              />
            </div>
            <div className="outcome">
              <p className="label">DESIGN GOAL</p>
              <div className="outcome__ring">
                <span>ONE</span>
                <small>FLOW</small>
              </div>
              <p>
                降低多角色协作成本，
                <br />
                提高现场决策效率。
              </p>
            </div>
          </div>
          <footer className="slide-footer">
            <span>CLMS</span>
            <p>Casual Labour Management System</p>
          </footer>
        </div>
      </section>

      <section className="slide onboarding" {...slideProps(2)}>
        <div className="stage">
          <header className="topline">
            <span>CLMS / EXPERIENCE</span>
            <span>02 — ONBOARDING</span>
          </header>
          <div className="section-heading section-heading--light">
            <Kicker index="02">身份与地区</Kicker>
            <h2>
              三步建立可信的
              <br />
              用工身份起点
            </h2>
            <p>
              以国家选择适配区域业务，以账户登录承接权限，
              <br />
              再用现场影像完成签到凭证。
            </p>
          </div>
          <div className="onboarding__phones">
            <div className="phone-step">
              <span>01</span>
              <p>选择服务地区</p>
              <Phone src={screens.country} alt="国家选择界面" />
            </div>
            <div className="phone-step phone-step--raised">
              <span>02</span>
              <p>账户安全登录</p>
              <Phone src={screens.login} alt="用户登录界面" />
            </div>
            <div className="phone-step">
              <span>03</span>
              <p>现场影像签到</p>
              <Phone src={screens.capture} alt="现场拍照签到界面" />
            </div>
          </div>
          <div className="onboarding__line">
            <i />
            <i />
            <i />
          </div>
          <footer className="slide-footer slide-footer--light">
            <span>CLMS</span>
            <p>区域适配 · 账户验证 · 影像留档</p>
          </footer>
        </div>
      </section>

      <section className="slide hub" {...slideProps(3)}>
        <div className="stage">
          <header className="topline topline--dark">
            <span>CLMS / INFORMATION ARCHITECTURE</span>
            <span>03 — OPERATION HUB</span>
          </header>
          <div className="hub__phone-wrap">
            <div className="hub__halo" />
            <Phone
              src={screens.dashboard}
              alt="CLMS 酒店运营工作台"
              className="hub__phone"
              position="center"
            />
            <div className="hub__tag hub__tag--one">
              <b>01</b>
              <span>排班签到</span>
            </div>
            <div className="hub__tag hub__tag--two">
              <b>02</b>
              <span>用工申请</span>
            </div>
            <div className="hub__tag hub__tag--three">
              <b>03</b>
              <span>审核追踪</span>
            </div>
            <div className="hub__tag hub__tag--four">
              <b>04</b>
              <span>经营报表</span>
            </div>
          </div>
          <div className="hub__copy">
            <Kicker index="03">运营中枢</Kicker>
            <h2>
              一个工作台，
              <br />
              连接酒店用工全流程。
            </h2>
            <p>
              以任务场景而不是组织架构划分入口。高频操作优先呈现，审核与报表自然下沉，让管理者在移动端快速定位下一步。
            </p>
            <div className="metric-row">
              <div>
                <b>9</b>
                <span>功能入口</span>
              </div>
              <div>
                <b>4</b>
                <span>核心任务域</span>
              </div>
            </div>
          </div>
          <footer className="slide-footer">
            <span>CLMS</span>
            <p>清晰分组，让复杂业务一眼可达</p>
          </footer>
        </div>
      </section>

      <section className="slide lifecycle" {...slideProps(4)}>
        <div className="stage">
          <header className="topline">
            <span>CLMS / CORE WORKFLOW</span>
            <span>04 — LABOUR REQUEST</span>
          </header>
          <div className="lifecycle__heading">
            <Kicker index="04">用工闭环</Kicker>
            <h2>
              从发布岗位到确认成本，
              <br />
              每个节点都有明确反馈。
            </h2>
          </div>
          <div className="lifecycle__track">
            <article>
              <span>01</span>
              <h3>发现任务</h3>
              <p>按日期浏览岗位需求，快速判断时段、部门与招募进度。</p>
            </article>
            <article>
              <span>02</span>
              <h3>创建申请</h3>
              <p>结构化录入人数、资质、活动信息与预计成本。</p>
            </article>
            <article>
              <span>03</span>
              <h3>追踪状态</h3>
              <p>对比预选、审批与实际金额，持续掌握执行变化。</p>
            </article>
          </div>
          <div className="lifecycle__phones">
            <Phone src={screens.jobs} alt="岗位列表界面" />
            <Phone src={screens.edit} alt="用工申请编辑界面" />
            <Phone src={screens.request} alt="用工申请状态界面" />
          </div>
          <footer className="slide-footer slide-footer--light">
            <span>CLMS</span>
            <p>Browse → Create → Track</p>
          </footer>
        </div>
      </section>

      <section className="slide attendance" {...slideProps(5)}>
        <div className="stage">
          <header className="topline topline--dark">
            <span>CLMS / ATTENDANCE</span>
            <span>05 — CHECK IN & OUT</span>
          </header>
          <div className="attendance__copy">
            <Kicker index="05">移动考勤</Kicker>
            <h2>
              让每一次到岗，
              <br />
              都有时间与影像依据。
            </h2>
            <p>
              搜索、日期筛选与字母索引帮助快速定位员工；签到与签退照片直接附着在个人记录下，减少现场核验成本。
            </p>
            <div className="feature-list">
              <div>
                <span>01</span>
                <p>
                  <b>快速定位</b>
                  <small>姓名 / 手机 / 日期 / 字母索引</small>
                </p>
              </div>
              <div>
                <span>02</span>
                <p>
                  <b>即时操作</b>
                  <small>Check In / Check Out 状态分色</small>
                </p>
              </div>
              <div>
                <span>03</span>
                <p>
                  <b>可信凭证</b>
                  <small>人像与时间形成双重记录</small>
                </p>
              </div>
            </div>
          </div>
          <div className="attendance__visual">
            <div className="attendance__number">08:50</div>
            <Phone
              src={screens.attendance}
              alt="员工签到签退记录界面"
              className="attendance__phone"
            />
            <div className="attendance__badge">
              <i />
              <span>
                ATTENDANCE
                <br />
                <b>VERIFIED</b>
              </span>
            </div>
          </div>
          <footer className="slide-footer">
            <span>CLMS</span>
            <p>更少核对，更强追溯</p>
          </footer>
        </div>
      </section>

      <section className="slide reporting" {...slideProps(6)}>
        <div className="stage">
          <header className="topline">
            <span>CLMS / MANAGEMENT</span>
            <span>06 — REVIEW & REPORT</span>
          </header>
          <div className="reporting__heading">
            <Kicker index="06">审核与报表</Kicker>
            <h2>从审批动作，到经营判断。</h2>
            <p>
              管理端批量处理申请，并将人员、部门与成本数据汇总成可复盘的经营视图。
            </p>
          </div>
          <div className="reporting__visual">
            <Phone
              src={screens.examine}
              alt="用工申请审核界面"
              className="reporting__phone reporting__phone--one"
            />
            <div className="reporting__connector">
              <span>REVIEW</span>
              <i />
              <ArrowIcon direction="right" />
              <i />
              <span>INSIGHT</span>
            </div>
            <Phone
              src={screens.report}
              alt="酒店用工报表中心界面"
              className="reporting__phone reporting__phone--two"
            />
          </div>
          <div className="reporting__stats">
            <div>
              <b>批量审核</b>
              <span>统一确认或驳回多条需求</span>
            </div>
            <div>
              <b>成本洞察</b>
              <span>按月份、日期与部门查看报表</span>
            </div>
            <div>
              <b>闭环管理</b>
              <span>让执行数据回到下一次决策</span>
            </div>
          </div>
          <div className="end-mark">
            <p>CLMS</p>
            <span>酒店临时用工管理系统 · UI/UX CASE STUDY</span>
          </div>
        </div>
      </section>
    </main>
  )
}
