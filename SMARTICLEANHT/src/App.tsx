import { useEffect, useState } from "react"

const slides = [
  { id: "cover", label: "项目概览" },
  { id: "context", label: "背景与目标" },
  { id: "dashboard", label: "全局驾驶舱" },
  { id: "deployment", label: "空间部署" },
  { id: "project", label: "项目管理" },
  { id: "evaluation", label: "质量评估" },
  { id: "system", label: "系统配置" },
  { id: "summary", label: "设计总结" },
]

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
      <span>08</span>
    </div>
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
    <div className={`browser-frame ${className}`}>
      <div className="browser-bar">
        <div className="browser-dots">
          <span />
          <span />
          <span />
        </div>
        <div className="browser-address">smart-iclean / console</div>
        <div className="browser-status">LIVE</div>
      </div>
      <div className="browser-content">
        <img src={src} alt={alt} />
      </div>
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

      <section id="cover" className="slide cover-slide">
        <div className="grid-glow" />
        <div className="cover-orbit orbit-one" />
        <div className="cover-orbit orbit-two" />
        <div className="cover-copy">
          <Eyebrow>UI / UX CASE STUDY · 2021</Eyebrow>
          <h1>
            SMART ICLEAN
            <br />
            <em>DATA PLATFORM</em>
          </h1>
          <p className="cover-lead">
            智慧清洁数据平台
            <span>
              以实时数据驱动空间运维决策，让复杂的清洁管理变得可见、可控、可追溯。
            </span>
          </p>
          <div className="cover-meta">
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
        <div className="cover-visual">
          <div className="cover-screen back">
            <img
              src="/screenshots/evaluation.png"
              alt="Evaluation chart page"
            />
          </div>
          <div className="cover-screen front">
            <img
              src="/screenshots/deployment.png"
              alt="Deployment management page"
            />
          </div>
          <div className="data-chip chip-a">
            <span>SPACE STATUS</span>
            <strong>98.6%</strong>
          </div>
          <div className="data-chip chip-b">
            <span>RESPONSE</span>
            <strong>0.4 min</strong>
          </div>
        </div>
        <SlideNumber current="01" />
      </section>

      <section id="context" className="slide context-slide">
        <div className="top-title">
          <Eyebrow>PROJECT CONTEXT</Eyebrow>
          <h2>从分散管理，到一体化数据决策</h2>
        </div>
        <div className="context-layout">
          <div className="challenge-card">
            <span className="big-index">01</span>
            <h3>业务挑战</h3>
            <p>
              大型商业空间的清洁任务、人员、设备与环境传感器彼此割裂，管理者难以快速识别异常，更无法从结果追溯到具体空间和责任环节。
            </p>
            <div className="pain-list">
              <span>数据分散</span>
              <span>响应滞后</span>
              <span>质量难量化</span>
            </div>
          </div>
          <div className="strategy">
            <div className="strategy-head">
              <p>DESIGN STRATEGY</p>
              <span>将空间、事件与人员映射为统一的数据对象</span>
            </div>
            <div className="strategy-row">
              <div className="strategy-icon">01</div>
              <div>
                <h4>全局感知</h4>
                <p>汇聚客流、耗材、空气质量与设备状态，形成实时空间画像。</p>
              </div>
              <b>MONITOR</b>
            </div>
            <div className="strategy-row">
              <div className="strategy-icon">02</div>
              <div>
                <h4>智能调度</h4>
                <p>从异常发现到任务派发，缩短现场问题的响应链路。</p>
              </div>
              <b>OPERATE</b>
            </div>
            <div className="strategy-row">
              <div className="strategy-icon">03</div>
              <div>
                <h4>闭环评估</h4>
                <p>通过量化报表验证服务质量，为持续优化提供依据。</p>
              </div>
              <b>OPTIMIZE</b>
            </div>
          </div>
        </div>
        <div className="context-stats">
          <div>
            <strong>20+</strong>
            <span>核心业务模块</span>
          </div>
          <div>
            <strong>4</strong>
            <span>关键用户角色</span>
          </div>
          <div>
            <strong>1</strong>
            <span>统一管理入口</span>
          </div>
        </div>
        <SlideNumber current="02" />
      </section>

      <section id="dashboard" className="slide dashboard-slide">
        <div className="dashboard-copy">
          <Eyebrow>01 · COMMAND CENTER</Eyebrow>
          <h2>
            一屏掌握
            <br />
            <em>空间运行全貌</em>
          </h2>
          <p>
            驾驶舱将传感器数据、耗材状态、巡检结果与临时任务聚合在同一视图，帮助管理者从“查看数据”快速转向“发现问题”。
          </p>
          <div className="feature-list">
            <div>
              <span>01</span>
              <p>
                <b>关键指标前置</b>
                异常、缺料与占用状态优先呈现
              </p>
            </div>
            <div>
              <span>02</span>
              <p>
                <b>模块化信息架构</b>
                支持按管理场景快速定位信息
              </p>
            </div>
            <div>
              <span>03</span>
              <p>
                <b>趋势辅助判断</b>
                用时间序列识别波动与潜在风险
              </p>
            </div>
          </div>
        </div>
        <div className="dashboard-visual">
          <div className="tall-screen">
            <img
              src="/screenshots/dashboard.png"
              alt="SMART ICLEAN dashboard full page"
            />
          </div>
          <div className="dashboard-detail detail-one">
            <img
              src="/screenshots/dashboard.png"
              alt="Dashboard sensor detail"
            />
          </div>
          <div className="dashboard-detail detail-two">
            <img
              src="/screenshots/dashboard.png"
              alt="Dashboard analytics detail"
            />
          </div>
          <div className="annotation annotation-a">
            <span />
            实时传感器状态
          </div>
          <div className="annotation annotation-b">
            <span />
            多维运营指标
          </div>
        </div>
        <SlideNumber current="03" />
      </section>

      <section id="deployment" className="slide feature-slide">
        <div className="feature-heading">
          <div>
            <Eyebrow>02 · SPACE DEPLOYMENT</Eyebrow>
            <h2>让每个空间与设备都有据可查</h2>
          </div>
          <p>
            以区域为管理单元，建立空间、设备与项目之间的绑定关系。筛选条件与批量操作集中在列表上方，降低高频运维操作成本。
          </p>
        </div>
        <BrowserFrame
          src="/screenshots/deployment.png"
          alt="Deployment and area list"
          className="wide-browser"
        />
        <div className="floating-notes">
          <div>
            <span>FILTER</span>
            <b>多条件快速筛选</b>
            <p>项目 / 区域 / 楼层 / 设备</p>
          </div>
          <div>
            <span>STATUS</span>
            <b>状态即时识别</b>
            <p>以颜色编码降低扫描成本</p>
          </div>
          <div>
            <span>ACTION</span>
            <b>操作集中呈现</b>
            <p>新增、删除与详情保持一致</p>
          </div>
        </div>
        <SlideNumber current="04" />
      </section>

      <section id="project" className="slide project-slide">
        <div className="project-screen-wrap">
          <BrowserFrame
            src="/screenshots/project.png"
            alt="Project management list"
          />
        </div>
        <div className="project-copy">
          <Eyebrow>03 · PROJECT MANAGEMENT</Eyebrow>
          <h2>
            用统一规则
            <br />
            管理多项目协作
          </h2>
          <p>
            面向项目经理与运营管理员，整合项目归属、服务周期、场地、联系人和启用状态，在复杂组织结构中保持信息的一致性。
          </p>
          <div className="project-points">
            <div>
              <strong>01</strong>
              <span>清晰的字段优先级</span>
            </div>
            <div>
              <strong>02</strong>
              <span>标准化状态反馈</span>
            </div>
            <div>
              <strong>03</strong>
              <span>可扩展批量操作</span>
            </div>
          </div>
          <div className="role-strip">
            <small>服务角色</small>
            <span>平台管理员</span>
            <span>项目经理</span>
            <span>现场主管</span>
          </div>
        </div>
        <SlideNumber current="05" />
      </section>

      <section id="evaluation" className="slide evaluation-slide">
        <div className="evaluation-copy">
          <Eyebrow>04 · QUALITY EVALUATION</Eyebrow>
          <h2>把主观体验，转化为可追踪的质量指标</h2>
          <p>
            对不同时间、项目与清洁维度进行横向比较，帮助管理团队识别服务短板，并验证改进动作是否真正有效。
          </p>
          <div className="metric-row">
            <div>
              <strong>5.6</strong>
              <span>最高评分</span>
            </div>
            <div>
              <strong>+31%</strong>
              <span>改善空间</span>
            </div>
            <div>
              <strong>9</strong>
              <span>评估维度</span>
            </div>
          </div>
        </div>
        <BrowserFrame
          src="/screenshots/evaluation.png"
          alt="Evaluation report chart"
          className="evaluation-browser"
        />
        <div className="evaluation-label label-one">
          <b>多维对比</b>
          <span>统一量纲呈现评分差异</span>
        </div>
        <div className="evaluation-label label-two">
          <b>灵活筛选</b>
          <span>按周期和项目检索结果</span>
        </div>
        <SlideNumber current="06" />
      </section>

      <section id="system" className="slide system-slide">
        <div className="system-heading">
          <Eyebrow>05 · SYSTEM CONFIGURATION</Eyebrow>
          <h2>复杂权限配置，也可以保持简单</h2>
          <p>
            将后台菜单与权限配置拆解为“浏览—创建”两个清晰任务，既满足平台级扩展能力，也避免技术字段造成认知负担。
          </p>
        </div>
        <div className="system-screens">
          <BrowserFrame
            src="/screenshots/menu-list.png"
            alt="Backend menu list"
          />
          <BrowserFrame
            src="/screenshots/menu-form.png"
            alt="Create backend menu form"
          />
          <div className="flow-arrow">
            <span>CREATE</span>
            <i>→</i>
          </div>
        </div>
        <div className="system-tags">
          <Tag>层级清晰</Tag>
          <Tag>权限可控</Tag>
          <Tag>字段一致</Tag>
          <Tag>操作可回退</Tag>
        </div>
        <SlideNumber current="07" />
      </section>

      <section id="summary" className="slide summary-slide">
        <div className="summary-grid" />
        <div className="summary-heading">
          <Eyebrow>DESIGN OUTCOME</Eyebrow>
          <h2>
            从“数据展示”到
            <br />
            <em>运营决策系统</em>
          </h2>
          <p>
            SMART ICLEAN
            不只是一个后台工具，而是一套连接空间、设备、人员与服务质量的数字化运营语言。
          </p>
        </div>
        <div className="outcomes">
          <div className="outcome-card">
            <span>01</span>
            <h3>看得见</h3>
            <p>关键状态集中呈现，异常信息不再淹没在表格中。</p>
          </div>
          <div className="outcome-card featured">
            <span>02</span>
            <h3>管得住</h3>
            <p>从项目、区域到设备建立统一、可追溯的管理链路。</p>
          </div>
          <div className="outcome-card">
            <span>03</span>
            <h3>可优化</h3>
            <p>用评估数据验证服务结果，形成持续改善闭环。</p>
          </div>
        </div>
        <div className="summary-footer">
          <div className="mini-brand">SMART ICLEAN</div>
          <p>THANK YOU FOR WATCHING</p>
          <button onClick={() => goTo(0)}>
            返回开场
            <span>↑</span>
          </button>
        </div>
        <SlideNumber current="08" />
      </section>
    </main>
  )
}
