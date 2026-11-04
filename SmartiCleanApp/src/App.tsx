type IconName = "building" | "people" | "chart" | "target" | "layers" | "check" | "clock" | "bell" | "map" | "shield"

const assets = {
  home: "/smart-iclean/1b7b2d5a-a0d4-45f0-8846-afb0f30c7948",
  notification: "/smart-iclean/5526a82a-6107-47f1-a193-340303ca4ddf",
  traffic: "/smart-iclean/c75f58d8-2f7b-47aa-962c-3c53f3d54cca",
  daily: "/smart-iclean/7bbf79bd-2a2a-41ec-8193-5282e0ef7536",
  taskEdit: "/smart-iclean/3213031f-5f6d-4ad7-8c8d-2c8de4372a96",
  taskDetail: "/smart-iclean/746ef78b-f8bb-4500-ba1d-28802311b6a4",
  checklist: "/smart-iclean/2b3168fa-e254-4d51-b06a-d860c9f3191c",
  mall: "/smart-iclean/64369ef5-6bd6-4380-99df-852ccadaa3ff",
  attendance: "/smart-iclean/85f73f9d-ef62-4c87-bd28-d1137ad0f82f",
  attendanceList: "/smart-iclean/2f5f854a-e868-48a5-96b3-1ab93c884246",
}

function Icon({ name, size = 28 }: { name: IconName; size?: number }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  }
  const paths: Record<IconName, React.ReactNode> = {
    building: (
      <>
        <path d="M4 21V5l8-3 8 3v16" />
        <path d="M8 8h2M14 8h2M8 12h2M14 12h2M8 16h2M14 16h2M2 21h20" />
      </>
    ),
    people: (
      <>
        <circle cx="9" cy="8" r="3" />
        <path d="M3 20c.5-4 2.5-6 6-6s5.5 2 6 6" />
        <circle cx="17" cy="9" r="2" />
        <path d="M16 15c3-.4 5 1.5 5 4" />
      </>
    ),
    chart: (
      <>
        <path d="M4 20V10M10 20V4M16 20v-7M22 20V7" />
        <path d="M2 20h21" />
      </>
    ),
    target: (
      <>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1" />
      </>
    ),
    layers: (
      <>
        <path d="m12 3 9 5-9 5-9-5 9-5Z" />
        <path d="m3 12 9 5 9-5M3 16l9 5 9-5" />
      </>
    ),
    check: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="m8 12 2.5 2.5L16 9" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    bell: (
      <>
        <path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 7h18s-3 0-3-7" />
        <path d="M10 20h4" />
      </>
    ),
    map: (
      <>
        <path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Z" />
        <path d="M9 3v15M15 6v15" />
      </>
    ),
    shield: (
      <>
        <path d="M12 3 4 6v5c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V6l-8-3Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
  }
  return <svg {...common}>{paths[name]}</svg>
}

function Slide({
  index,
  label,
  title,
  dark = false,
  className = "",
  children,
}: {
  index: string
  label: string
  title?: string
  dark?: boolean
  className?: string
  children: React.ReactNode
}) {
  return (
    <section className={`slide ${dark ? "slide-dark" : ""} ${className}`}>
      <div className="slide-top">
        <div className="mini-brand">
          <span className="brand-dot" /> SMART ICLEAN
        </div>
        <div className="slide-index">{index}</div>
      </div>
      {title && (
        <header className="section-heading">
          <span>{label}</span>
          <h2>{title}</h2>
        </header>
      )}
      {children}
      <div className="slide-foot">
        <span>SMART ICLEAN · UX/UI CASE STUDY</span>
        <span>2024 PORTFOLIO</span>
      </div>
    </section>
  )
}

function Phone({
  src,
  className = "",
  position = "top",
  tall = false,
}: {
  src: string
  className?: string
  position?: "top" | "center"
  tall?: boolean
}) {
  return (
    <div className={`phone ${tall ? "phone-tall" : ""} ${className}`}>
      <div className="phone-speaker" />
      <div className="phone-screen">
        <img
          src={src}
          alt="Smart iclean 应用界面"
          style={{ objectPosition: position }}
        />
      </div>
      <div className="phone-home" />
    </div>
  )
}

const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="badge">{children}</span>
)

export default function App() {
  return (
    <main>
      <Slide index="01 / 14" label="" dark className="cover">
        <div className="cover-orbit orbit-one" />
        <div className="cover-orbit orbit-two" />
        <div className="cover-copy">
          <div className="eyebrow">ENTERPRISE CLEANING MANAGEMENT SYSTEM</div>
          <h1>
            Smart
            <br />
            <i>iclean</i>
          </h1>
          <p>让现场清洁管理更智能、更透明、更高效</p>
          <div className="cover-meta">
            <div>
              <small>项目类型</small>
              <strong>企业级工具 APP</strong>
            </div>
            <div>
              <small>我的角色</small>
              <strong>UX / UI Designer</strong>
            </div>
            <div>
              <small>设计周期</small>
              <strong>12 Weeks</strong>
            </div>
          </div>
        </div>
        <div className="cover-phones">
          <Phone src={assets.home} tall />
          <Phone src={assets.traffic} />
        </div>
        <div className="cover-number">01</div>
      </Slide>

      <Slide index="02 / 14" label="PROJECT BACKGROUND" title="项目背景">
        <div className="background-layout">
          <div className="intro-copy">
            <Badge>智慧设施管理平台</Badge>
            <h3>
              从“人盯人”到
              <br />
              数据驱动的现场管理
            </h3>
            <p>
              Smart iclean
              服务于大型商场、酒店与公共设施的清洁运营团队。项目希望将分散在纸质表单、即时通讯和人工巡检中的工作，整合进一套移动化管理工具。
            </p>
            <div className="quote">
              “让管理者看见现场，让一线员工清楚下一步。”
            </div>
          </div>
          <div className="context-visual">
            <div className="building-grid">
              {[
                "任务派发",
                "日常巡检",
                "人员考勤",
                "传感器监控",
                "数据报表",
                "异常通知",
              ].map((x, i) => (
                <div key={x} className={`context-card c${i + 1}`}>
                  <span>0{i + 1}</span>
                  <strong>{x}</strong>
                </div>
              ))}
            </div>
            <div className="context-center">
              <Icon name="building" size={52} />
              <b>多场景设施运营</b>
              <small>MALL · HOTEL · OFFICE</small>
            </div>
          </div>
        </div>
        <div className="metrics">
          <div>
            <strong>20+</strong>
            <span>业务功能入口</span>
          </div>
          <div>
            <strong>4</strong>
            <span>核心用户角色</span>
          </div>
          <div>
            <strong>3</strong>
            <span>主要应用场景</span>
          </div>
          <div>
            <strong>24/7</strong>
            <span>持续运营管理</span>
          </div>
        </div>
      </Slide>

      <Slide index="03 / 14" label="CHALLENGE" title="我们需要解决什么？" dark>
        <div className="challenge-lead">
          <p>业务能力不断叠加，但信息架构与交互体验没有同步生长。</p>
          <strong>复杂的功能，不应该带来复杂的操作。</strong>
        </div>
        <div className="challenge-grid">
          {[
            [
              "01",
              "入口过载",
              "首页承载 20+ 功能，缺少分组与任务优先级，新用户难以定位。",
              "layers",
            ],
            [
              "02",
              "状态模糊",
              "待办、进行中、重开等状态仅依赖文字和颜色，缺少明确反馈。",
              "bell",
            ],
            [
              "03",
              "流程冗长",
              "巡检与周期任务填写字段多，现场操作成本高，容易中途退出。",
              "clock",
            ],
            [
              "04",
              "数据难读",
              "图表信息密度高，关键结论不突出，管理者需要自行二次分析。",
              "chart",
            ],
          ].map(([num, title, desc, icon]) => (
            <article className="challenge-card" key={num}>
              <div className="challenge-icon">
                <Icon name={icon as IconName} />
              </div>
              <span>{num}</span>
              <h3>{title}</h3>
              <p>{desc}</p>
            </article>
          ))}
        </div>
        <div className="challenge-line">
          <span>核心命题</span>
          <p>如何在不削减业务能力的前提下，让不同角色都能快速完成高频任务？</p>
        </div>
      </Slide>

      <Slide index="04 / 14" label="DESIGN PROCESS" title="设计流程拆解">
        <div className="process-line">
          {[
            ["01", "发现", "Discover", "访谈 / 竞品 / 数据"],
            ["02", "定义", "Define", "角色 / 旅程 / 痛点"],
            ["03", "构思", "Ideate", "架构 / 草图 / 方案"],
            ["04", "设计", "Design", "原型 / 视觉 / 规范"],
            ["05", "验证", "Validate", "测试 / 迭代 / 交付"],
          ].map((x, i) => (
            <div className="process-step" key={x[0]}>
              <div className="process-node">{x[0]}</div>
              <small>{x[2]}</small>
              <h3>{x[1]}</h3>
              <p>{x[3]}</p>
              {i < 4 && <div className="process-arrow">→</div>}
            </div>
          ))}
        </div>
        <div className="process-bottom">
          <div className="double-diamond">
            <div className="diamond d1">
              <span>探索问题</span>
            </div>
            <div className="diamond d2">
              <span>验证方案</span>
            </div>
          </div>
          <div className="process-note">
            <Badge>DOUBLE DIAMOND</Badge>
            <h3>先做正确的事，再把事情做对</h3>
            <p>
              通过发散与收敛交替推进，在业务目标、用户需求与技术边界之间建立清晰的设计决策链。
            </p>
          </div>
        </div>
      </Slide>

      <Slide index="05 / 14" label="USER RESEARCH" title="用户调研分析" dark>
        <div className="research-stats">
          <div>
            <strong>12</strong>
            <span>一线保洁人员</span>
          </div>
          <div>
            <strong>6</strong>
            <span>现场主管</span>
          </div>
          <div>
            <strong>3</strong>
            <span>运营管理者</span>
          </div>
          <div>
            <strong>5 days</strong>
            <span>跟岗观察</span>
          </div>
        </div>
        <div className="research-layout">
          <div className="persona-card">
            <div className="persona-avatar">L</div>
            <div>
              <small>PRIMARY PERSONA</small>
              <h3>李洁 · 现场主管</h3>
              <p>35 岁 / 商场保洁主管 / 管理 28 人团队</p>
            </div>
            <blockquote>
              “我每天最怕漏掉临时任务，也需要随时知道现场哪里出了问题。”
            </blockquote>
            <div className="persona-tags">
              <span>目标：快速调度</span>
              <span>痛点：消息分散</span>
              <span>设备：手机</span>
            </div>
          </div>
          <div className="insight-list">
            {[
              [
                "高频不等于易用",
                "任务查询与状态更新每天发生，但入口深、步骤多。",
                "78%",
              ],
              [
                "消息缺乏优先级",
                "普通提醒与紧急事件混在同一列表，容易被忽略。",
                "67%",
              ],
              [
                "数据没有结论",
                "主管更关心异常楼层与趋势，而不是完整原始数据。",
                "72%",
              ],
            ].map(([t, d, p]) => (
              <div className="insight" key={t}>
                <strong>{p}</strong>
                <div>
                  <h4>{t}</h4>
                  <p>{d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Slide>

      <Slide index="06 / 14" label="DESIGN GOALS" title="设计目标">
        <div className="goals-header">
          <h3>
            围绕 <em>效率、清晰、可信</em>
            <br />
            重构产品体验
          </h3>
          <p>
            我们将抽象的体验目标转化为可以验证的设计原则，让每一次取舍都有依据。
          </p>
        </div>
        <div className="goal-grid">
          {[
            [
              "01",
              "更快找到",
              "高频任务前置，按工作场景重新分组，减少寻找与记忆成本。",
              "目标：3 秒内定位功能",
              "target",
            ],
            [
              "02",
              "更少操作",
              "合并重复字段，提供默认值与批量操作，缩短现场填写路径。",
              "目标：步骤减少 40%",
              "clock",
            ],
            [
              "03",
              "更易判断",
              "统一状态语义与反馈，让风险、进度和结果一眼可见。",
              "目标：异常识别更准确",
              "check",
            ],
            [
              "04",
              "更可扩展",
              "建立组件与页面模板，为新增传感器和业务模块预留空间。",
              "目标：支撑持续迭代",
              "layers",
            ],
          ].map(([n, t, d, note, icon]) => (
            <article className="goal-card" key={n}>
              <span>{n}</span>
              <Icon name={icon as IconName} size={36} />
              <h3>{t}</h3>
              <p>{d}</p>
              <small>{note}</small>
            </article>
          ))}
        </div>
      </Slide>

      <Slide
        index="07 / 14"
        label="INFORMATION ARCHITECTURE"
        title="结构优化 · 页面地图"
        dark
      >
        <div className="sitemap">
          <div className="sitemap-root">
            <Icon name="layers" />
            <strong>Smart iclean</strong>
          </div>
          <div className="sitemap-branches">
            {[
              ["工作台", "任务总览", "今日待办", "快捷入口"],
              ["任务", "日常清单", "周期任务", "临时任务"],
              ["现场", "人员考勤", "环境传感", "设备状态"],
              ["数据", "客流趋势", "质量评估", "绩效报表"],
              ["我的", "消息中心", "个人资料", "系统设置"],
            ].map((group, i) => (
              <div className={`site-column site-${i + 1}`} key={group[0]}>
                <div className="site-title">
                  <span>0{i + 1}</span>
                  {group[0]}
                </div>
                {group.slice(1).map((x) => (
                  <div className="site-item" key={x}>
                    {x}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="architecture-notes">
          <span>
            <b>01</b> 从功能平铺改为场景分组
          </span>
          <span>
            <b>02</b> 核心任务控制在两层以内
          </span>
          <span>
            <b>03</b> 统一消息与异常入口
          </span>
        </div>
      </Slide>

      <Slide index="08 / 14" label="DESIGN SYSTEM" title="统一视觉语言">
        <div className="system-layout">
          <div className="system-left">
            <Badge>FOUNDATIONS</Badge>
            <h3>
              建立清晰、克制、
              <br />
              高辨识度的界面规范
            </h3>
            <p>
              延续产品原有红色资产，通过降低大面积色彩占比、扩大留白和建立层级规则，让企业工具更专业、更易读。
            </p>
            <div className="color-row">
              {[
                ["#F01E35", "BRAND"],
                ["#111827", "INK"],
                ["#516070", "SLATE"],
                ["#EEF2F5", "MIST"],
                ["#28B8A9", "SUCCESS"],
              ].map(([c, n]) => (
                <div key={c}>
                  <i style={{ background: c }} />
                  <span>{n}</span>
                  <small>{c}</small>
                </div>
              ))}
            </div>
          </div>
          <div className="system-right">
            <div className="type-spec">
              <small>TYPOGRAPHY</small>
              <strong>Aa</strong>
              <h4>清洁管理，让复杂变简单</h4>
              <p>
                中文 / Noto Sans SC
                <br />
                English / Inter
              </p>
            </div>
            <div className="spacing-spec">
              <small>SPACING</small>
              <div>
                {[8, 16, 24, 32, 48].map((x) => (
                  <span key={x} style={{ width: x * 2 }}>
                    {x}
                  </span>
                ))}
              </div>
            </div>
            <div className="component-spec">
              <small>COMPONENTS</small>
              <button>Primary Action</button>
              <button className="ghost">Secondary</button>
              <div>
                <span className="status green">已完成</span>
                <span className="status red">紧急</span>
                <span className="status grey">待处理</span>
              </div>
            </div>
          </div>
        </div>
      </Slide>

      <Slide
        index="09 / 14"
        label="VISUAL EXPLORATION"
        title="设计风格探索"
        dark
      >
        <div className="explore-copy">
          <h3>
            从“传统工具感”
            <br />
            到“智能运营感”
          </h3>
          <p>
            三种方向并行探索，最终选择更符合企业场景、兼顾数据阅读与长期扩展的「清晰秩序」方向。
          </p>
        </div>
        <div className="style-cards">
          <article className="style-card style-a">
            <span>A / LIGHT</span>
            <div className="style-demo">
              <i />
              <i />
              <i />
            </div>
            <h3>极简明亮</h3>
            <p>轻盈留白 · 柔和亲近</p>
          </article>
          <article className="style-card style-b selected">
            <div className="chosen">FINAL DIRECTION</div>
            <span>B / CLARITY</span>
            <div className="style-demo">
              <i />
              <i />
              <i />
            </div>
            <h3>清晰秩序</h3>
            <p>专业可信 · 高效易读</p>
          </article>
          <article className="style-card style-c">
            <span>C / TECH</span>
            <div className="style-demo">
              <i />
              <i />
              <i />
            </div>
            <h3>未来科技</h3>
            <p>数字氛围 · 强对比</p>
          </article>
        </div>
      </Slide>

      <Slide
        index="10 / 14"
        label="CORE EXPERIENCE 01"
        title="一个工作台，掌握所有现场信息"
      >
        <div className="feature-layout">
          <div className="feature-copy">
            <Badge>HOME · DASHBOARD</Badge>
            <h3>
              高频能力集中呈现，
              <br />
              让工作从这里开始
            </h3>
            <p>
              将复杂业务入口集中到统一工作台，覆盖巡检、人员、设备、环境与绩效。图标化设计帮助用户建立快速识别。
            </p>
            <ul>
              <li>
                <b>01</b> 高频任务置于首屏区域
              </li>
              <li>
                <b>02</b> 统一模块视觉与命名规则
              </li>
              <li>
                <b>03</b> 角标及时提示待处理事项
              </li>
            </ul>
          </div>
          <div className="feature-phones home-showcase">
            <div className="phone-caption cap-a">20+ 业务模块</div>
            <Phone src={assets.home} tall />
            <Phone src={assets.mall} />
            <div className="feature-circle">01</div>
          </div>
        </div>
      </Slide>

      <Slide
        index="11 / 14"
        label="CORE EXPERIENCE 02"
        title="从任务接收到闭环处理"
        dark
      >
        <div className="task-flow">
          <div className="flow-label">
            <span>01</span>
            <b>接收通知</b>
          </div>
          <div className="flow-label">
            <span>02</span>
            <b>查看清单</b>
          </div>
          <div className="flow-label">
            <span>03</span>
            <b>提交结果</b>
          </div>
        </div>
        <div className="three-phones">
          <Phone src={assets.notification} />
          <Phone src={assets.daily} />
          <Phone src={assets.taskEdit} />
        </div>
        <div className="flow-summary">
          <strong>任务链路清晰可追踪</strong>
          <span>消息触达</span>
          <i>→</i>
          <span>现场执行</span>
          <i>→</i>
          <span>图片佐证</span>
          <i>→</i>
          <span>完成归档</span>
        </div>
      </Slide>

      <Slide
        index="12 / 14"
        label="CORE EXPERIENCE 03"
        title="让巡检过程有据可查"
      >
        <div className="inspection-layout">
          <div className="inspection-phones">
            <Phone src={assets.checklist} />
            <Phone src={assets.taskDetail} />
          </div>
          <div className="inspection-copy">
            <Badge>CHECKLIST · PERIODIC TASK</Badge>
            <h3>
              结构化记录每一次
              <br />
              现场检查
            </h3>
            <p>
              按区域组织清单，并在详情页整合地点、时间、状态、图片与备注。管理者能快速复盘，执行者也明确下一步。
            </p>
            <div className="check-points">
              <div>
                <Icon name="map" />
                <span>
                  <b>按空间组织</b>
                  <small>Lobby / Carpark / Toilets</small>
                </span>
              </div>
              <div>
                <Icon name="clock" />
                <span>
                  <b>时间可追溯</b>
                  <small>计划、开始与结束时间</small>
                </span>
              </div>
              <div>
                <Icon name="shield" />
                <span>
                  <b>结果可佐证</b>
                  <small>现场图片与执行备注</small>
                </span>
              </div>
            </div>
          </div>
        </div>
      </Slide>

      <Slide
        index="13 / 14"
        label="CORE EXPERIENCE 04"
        title="数据不只是展示，更要辅助决策"
        dark
      >
        <div className="data-layout">
          <div className="data-copy">
            <Badge>DATA · INSIGHT</Badge>
            <h3>
              把运营数据
              <br />
              变成行动依据
            </h3>
            <p>
              整合客流、考勤与质量数据，帮助管理者识别高峰时段、人员缺口及重点区域。
            </p>
            <div className="data-pills">
              <span>客流趋势</span>
              <span>男女分布</span>
              <span>班次考勤</span>
              <span>异常预警</span>
            </div>
          </div>
          <div className="data-phones">
            <Phone src={assets.traffic} />
            <Phone src={assets.attendanceList} />
            <div className="data-chart">
              <small>WEEKLY EFFICIENCY</small>
              <strong>+24.6%</strong>
              <svg viewBox="0 0 220 70">
                <path d="M2 62C35 58 40 35 72 42s43-28 69-18 41-14 77-20" />
                <path
                  className="area"
                  d="M2 62C35 58 40 35 72 42s43-28 69-18 41-14 77-20V70H2Z"
                />
              </svg>
            </div>
          </div>
        </div>
      </Slide>

      <Slide index="14 / 14" label="FINAL DELIVERY" dark className="finale">
        <div className="final-copy">
          <span>SMART ICLEAN · FINAL EXPERIENCE</span>
          <h2>
            让每一次清洁
            <br />
            都被看见
          </h2>
          <p>从任务、现场到数据，构建完整的智慧清洁管理闭环。</p>
        </div>
        <div className="final-wall">
          <Phone src={assets.attendance} />
          <Phone src={assets.notification} />
          <Phone src={assets.checklist} />
          <Phone src={assets.traffic} />
          <Phone src={assets.taskDetail} />
        </div>
        <div className="thanks">
          <span>THANKS FOR WATCHING</span>
          <b>Smart iclean</b>
        </div>
      </Slide>
    </main>
  )
}
