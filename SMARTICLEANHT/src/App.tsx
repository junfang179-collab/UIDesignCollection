import { useEffect, useState } from "react"

const slides = [
  { id: "overview", label: "平台全貌" },
  { id: "outcome", label: "能力闭环" },
]

const duoOverview = [
  {
    src: "/screenshots/dashboard.png",
    alt: "SMART ICLEAN 全局驾驶舱",
    title: "全局驾驶舱",
    en: "COMMAND CENTER",
  },
  {
    src: "/screenshots/deployment.png",
    alt: "空间部署与区域列表",
    title: "空间部署",
    en: "SPACE DEPLOYMENT",
  },
  {
    src: "/screenshots/project.png",
    alt: "项目管理列表",
    title: "项目管理",
    en: "PROJECT MANAGEMENT",
  },
]

const duoOutcome = [
  {
    src: "/screenshots/evaluation.png",
    alt: "服务质量评估报告",
    title: "质量评估",
    en: "QUALITY EVALUATION",
  },
  {
    src: "/screenshots/menu-list.png",
    alt: "后台菜单列表",
    title: "菜单与权限",
    en: "MENU LIST",
  },
  {
    src: "/screenshots/menu-form.png",
    alt: "新建后台菜单表单",
    title: "配置表单",
    en: "MENU FORM",
  },
]

type ShotItem = { src: string; alt: string; title: string; en: string }

function Shot({
  item,
  index,
  lead = false,
}: {
  item: ShotItem
  index: number
  lead?: boolean
}) {
  return (
    <figure className={`duo-shot ${lead ? "duo-shot--lead" : ""}`}>
      <img src={item.src} alt={item.alt} />
      <figcaption>
        <b>{String(index).padStart(2, "0")}</b>
        <strong>{item.title}</strong>
        <span>{item.en}</span>
      </figcaption>
    </figure>
  )
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="eyebrow">
      <span className="eyebrow-line" />
      {children}
    </div>
  )
}

function SlideNumber({ current }: { current: string }) {
  return (
    <div className="slide-number">
      <span>{current}</span>
      <i />
      <span>02</span>
    </div>
  )
}

function Tag({ children }: { children: React.ReactNode }) {
  return <span className="tag">{children}</span>
}

export default function App() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = slides.findIndex(
              (slide) => slide.id === entry.target.id,
            )
            if (index >= 0) setActive(index)
          }
        })
      },
      { threshold: 0.55 },
    )

    slides.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })
    return () => observer.disconnect()
  }, [])

  const goTo = (index: number) => {
    document
      .getElementById(slides[index].id)
      ?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <main>
      <nav className="deck-nav" aria-label="演示文稿导航">
        <button
          className="brand-mark"
          onClick={() => goTo(0)}
          aria-label="返回首页"
        >
          <span>SI</span>
        </button>
        <div className="nav-track">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              className={index === active ? "active" : ""}
              onClick={() => goTo(index)}
              aria-label={`前往${slide.label}`}
            >
              <i />
              <span>{slide.label}</span>
            </button>
          ))}
        </div>
      </nav>

      <section id="overview" className="slide duo-slide">
        <div className="duo-head">
          <div className="duo-head__copy">
            <Eyebrow>UI / UX CASE STUDY · 2021</Eyebrow>
            <h1>
              SMART ICLEAN
              <em>DATA PLATFORM</em>
            </h1>
            <p>
              智慧清洁数据平台 · 以实时数据驱动空间运维决策，让清洁管理可见、可控、可追溯。
            </p>
          </div>
          <div className="duo-head__meta">
            <div>
              <small>MY ROLE</small>
              <strong>UI/UX DESIGN</strong>
            </div>
            <div>
              <small>PLATFORM</small>
              <strong>WEB · B2B</strong>
            </div>
            <div>
              <small>DURATION</small>
              <strong>12 WEEKS</strong>
            </div>
          </div>
        </div>

        <div className="duo-wall">
          <Shot item={duoOverview[0]} index={1} lead />
          <div className="duo-wall__stack">
            <Shot item={duoOverview[1]} index={2} />
            <Shot item={duoOverview[2]} index={3} />
          </div>
        </div>

        <div className="duo-foot">
          <div className="duo-foot__stats">
            <div>
              <b>20+</b>
              <span>核心业务模块</span>
            </div>
            <div>
              <b>4</b>
              <span>关键用户角色</span>
            </div>
            <div>
              <b>1</b>
              <span>统一管理入口</span>
            </div>
          </div>
          <p>
            业务挑战：数据分散 · 响应滞后 · 质量难量化　→　设计策略：将空间、事件与人员映射为统一的数据对象
          </p>
        </div>
        <SlideNumber current="01" />
      </section>

      <section id="outcome" className="slide duo-slide">
        <div className="duo-head">
          <div className="duo-head__copy">
            <Eyebrow>DESIGN OUTCOME / 设计成果</Eyebrow>
            <h2>
              从“数据展示”到
              <br />
              <em>运营决策系统</em>
            </h2>
            <p>
              不只是后台工具，而是一套连接空间、设备、人员与服务质量的数字化运营语言。
            </p>
          </div>
          <div className="duo-head__tags">
            <Tag>平台管理员</Tag>
            <Tag>项目经理</Tag>
            <Tag>现场主管</Tag>
          </div>
        </div>

        <div className="duo-wall">
          <Shot item={duoOutcome[0]} index={4} lead />
          <div className="duo-wall__stack">
            <Shot item={duoOutcome[1]} index={5} />
            <Shot item={duoOutcome[2]} index={6} />
          </div>
        </div>

        <div className="duo-foot">
          <div className="duo-foot__stats">
            <div>
              <b>01</b>
              <span>看得见 · 异常不再淹没在表格</span>
            </div>
            <div>
              <b>02</b>
              <span>管得住 · 项目到设备可追溯</span>
            </div>
            <div>
              <b>03</b>
              <span>可优化 · 评估形成改善闭环</span>
            </div>
          </div>
          <p>全局感知 MONITOR → 智能调度 OPERATE → 闭环评估 OPTIMIZE</p>
        </div>
        <SlideNumber current="02" />
      </section>
    </main>
  )
}
