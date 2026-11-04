import type { ReactNode } from "react"
import activities from "./assets/screens/activities.png"
import country from "./assets/screens/country.png"
import forgetPassword from "./assets/screens/forget-password.png"
import helpCenter from "./assets/screens/help-center.png"
import home from "./assets/screens/home.png"
import jobDetail from "./assets/screens/job-detail.png"
import login from "./assets/screens/login.png"
import profile from "./assets/screens/profile.png"
import signup from "./assets/screens/signup.png"
import slots from "./assets/screens/slots.png"

const slides = [
  "封面",
  "项目背景",
  "设计流程",
  "用户调研",
  "设计目标",
  "信息架构",
  "设计语言",
  "新手引导",
  "核心体验",
  "任务闭环",
  "项目回顾",
]

type SlideProps = {
  index: number
  title?: string
  eyebrow?: string
  dark?: boolean
  children: ReactNode
  className?: string
}

function Slide({
  index,
  title,
  eyebrow,
  dark = false,
  children,
  className = "",
}: SlideProps) {
  return (
    <section
      id={`slide-${index}`}
      className={`slide ${dark ? "slide-dark" : ""} ${className}`}
    >
      <div className="slide-rule" />
      {title && (
        <header className="slide-header">
          <div>
            <p className="eyebrow">
              {String(index).padStart(2, "0")} / {eyebrow}
            </p>
            <h2>{title}</h2>
          </div>
          <span className="section-mark">YY CIRCLE®</span>
        </header>
      )}
      {children}
      <footer className="slide-footer">
        <span>YY CIRCLE · UX CASE STUDY</span>
        <span>
          {String(index).padStart(2, "0")} /{" "}
          {String(slides.length).padStart(2, "0")}
        </span>
      </footer>
    </section>
  )
}

type PhoneProps = {
  src: string
  alt: string
  label?: string
  className?: string
  position?: string
}

function Phone({
  src,
  alt,
  label,
  className = "",
  position = "top",
}: PhoneProps) {
  return (
    <figure className={`phone-wrap ${className}`}>
      <div className="phone">
        <div className="phone-speaker" />
        <div className="phone-screen">
          <img src={src} alt={alt} style={{ objectPosition: position }} />
        </div>
      </div>
      {label && <figcaption>{label}</figcaption>}
    </figure>
  )
}

function App() {
  return (
    <main className="deck">
      <nav className="deck-nav" aria-label="作品集章节">
        <a href="#slide-1" className="brand-dot" aria-label="回到封面">
          YY
        </a>
        <div className="nav-links">
          {slides.map((label, index) => (
            <a key={label} href={`#slide-${index + 1}`} title={label}>
              {String(index + 1).padStart(2, "0")}
            </a>
          ))}
        </div>
      </nav>

      <Slide index={1} dark className="cover">
        <div className="cover-orbit orbit-one" />
        <div className="cover-orbit orbit-two" />
        <div className="cover-copy">
          <p className="cover-kicker">FLEXI JOB PLATFORM · SINGAPORE</p>
          <h1>
            YY
            <br />
            <span>Circle</span>
          </h1>
          <p className="cover-subtitle">
            灵活工作
            <br />
            掌握自己的时间
          </p>
          <div className="cover-meta">
            <div>
              <small>项目类型</small>
              <strong>移动端产品重构</strong>
            </div>
            <div>
              <small>我的角色</small>
              <strong>UX / UI Designer</strong>
            </div>
            <div>
              <small>项目周期</small>
              <strong>12 Weeks</strong>
            </div>
          </div>
        </div>
        <div className="cover-phones">
          <Phone src={home} alt="YY Circle 首页" className="phone-back" />
          <Phone
            src={activities}
            alt="YY Circle 活动页"
            className="phone-front"
          />
          <div className="signal-card">
            <span>积分奖励</span>
            <strong>4,539</strong>
            <small>reward points</small>
          </div>
        </div>
        <div className="cover-index">PORTFOLIO / 01</div>
      </Slide>

      <Slide
        index={2}
        eyebrow="PROJECT OVERVIEW"
        title="从发现机会，到管理每一份工作"
      >
        <div className="overview-grid">
          <div className="overview-lead">
            <p className="big-statement">
              YY Circle
              是服务新加坡及周边市场的移动求职平台，聚合临时岗位、全职工作与自由职业机会，并提供班次管理、简历工具、奖励及求职资讯。
            </p>
            <div className="stat-row">
              <div>
                <strong>3</strong>
                <span>类求职场景</span>
              </div>
              <div>
                <strong>6+</strong>
                <span>关键任务链路</span>
              </div>
              <div>
                <strong>10</strong>
                <span>核心页面重构</span>
              </div>
            </div>
          </div>
          <div className="challenge-panel">
            <p className="panel-label">THE CHALLENGE</p>
            <h3>
              多类型岗位与服务集中在同一入口，用户需要更快判断机会是否适合，并清楚掌握申请后的每个状态。
            </h3>
            <ul className="challenge-list">
              <li>
                <span>01</span>
                <div>
                  <b>机会难发现</b>
                  <p>临时、全职与自由职业内容并列，浏览路径容易被打断。</p>
                </div>
              </li>
              <li>
                <span>02</span>
                <div>
                  <b>状态难追踪</b>
                  <p>待确认、已排期、候补及付款状态需要集中管理。</p>
                </div>
              </li>
              <li>
                <span>03</span>
                <div>
                  <b>决策依据分散</b>
                  <p>薪资、班次、要求、评价与帮助信息缺少连续的决策路径。</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="context-strip">
          {["临时岗位", "全职工作", "自由职业", "班次预订", "积分奖励"].map(
            (item) => (
              <span key={item}>{item}</span>
            ),
          )}
        </div>
      </Slide>

      <Slide
        index={3}
        dark
        eyebrow="DESIGN PROCESS"
        title="以证据驱动每一次设计决策"
      >
        <div className="process-line">
          {[
            ["01", "Discover", "发现问题", "竞品扫描 · 数据复盘 · 用户访谈"],
            ["02", "Define", "定义机会", "人物画像 · 旅程地图 · 需求排序"],
            ["03", "Design", "构建设计", "信息架构 · 原型测试 · 视觉语言"],
            ["04", "Deliver", "交付验证", "组件规范 · 可用性测试 · 设计走查"],
          ].map(([no, en, cn, detail]) => (
            <article className="process-step" key={no}>
              <span className="process-no">{no}</span>
              <p>{en}</p>
              <h3>{cn}</h3>
              <small>{detail}</small>
            </article>
          ))}
        </div>
        <div className="method-grid">
          <div className="method-card highlight">
            <span>核心原则</span>
            <h3>先降低决策成本，再提升操作效率</h3>
          </div>
          {[
            ["12", "位用户深度访谈"],
            ["03", "轮可用性测试"],
            ["02", "套关键角色旅程"],
          ].map(([number, label]) => (
            <div className="method-card" key={label}>
              <strong>{number}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </Slide>

      <Slide index={4} eyebrow="USER RESEARCH" title="用户真正需要的是确定性">
        <div className="research-layout">
          <div className="persona-card">
            <div className="persona-head">
              <div className="avatar">LW</div>
              <div>
                <span>PRIMARY PERSONA</span>
                <h3>林薇 · 29岁</h3>
                <p>灵活就业求职者 / 新加坡</p>
              </div>
            </div>
            <blockquote>
              “我想利用空闲时间工作，但要先确认地点、时段、薪资和岗位要求。”
            </blockquote>
            <div className="persona-tags">
              <span>效率导向</span>
              <span>依赖手机</span>
              <span>时间敏感</span>
            </div>
          </div>
          <div className="insights">
            {[
              [
                "73%",
                "先看薪资、地点与时段",
                "把关键条件前置到岗位卡片，减少用户反复进出详情页。",
              ],
              [
                "58%",
                "关注申请后的状态",
                "让待确认、已排期、候补及取消状态可见、可追踪。",
              ],
              [
                "67%",
                "依赖资料与评价",
                "完整档案、技能证书和个人评分影响匹配与信任。",
              ],
            ].map(([value, title, body]) => (
              <article key={value}>
                <strong>{value}</strong>
                <div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="journey">
          <div className="journey-label">
            <span>情绪曲线</span>
            <b>从犹豫到安心</b>
          </div>
          {[
            ["发现岗位", "快速浏览", "高"],
            ["判断匹配", "信息比较", "中"],
            ["选择班次", "时间确认", "低"],
            ["提交申请", "等待反馈", "低"],
            ["到岗结算", "完成任务", "高"],
          ].map(([stage, action, mood], index) => (
            <div className={`journey-stage mood-${mood}`} key={stage}>
              <span>0{index + 1}</span>
              <b>{stage}</b>
              <small>{action}</small>
              <i />
            </div>
          ))}
        </div>
      </Slide>

      <Slide
        index={5}
        dark
        eyebrow="DESIGN GOALS"
        title="把复杂系统，变成三件简单的事"
      >
        <div className="goal-grid">
          {[
            [
              "01",
              "看得懂",
              "一眼识别岗位价值",
              "重构卡片层级，突出薪资、时间、地点和空缺状态。",
              "信息效率",
            ],
            [
              "02",
              "选得快",
              "降低筛选与申请成本",
              "围绕场景组织入口，用更少步骤完成班次选择和申请。",
              "任务效率",
            ],
            [
              "03",
              "信得过",
              "让服务全程可预期",
              "统一状态反馈，强化认证、评价、帮助与规则说明。",
              "服务信任",
            ],
          ].map(([no, title, headline, body, tag]) => (
            <article className="goal-card" key={no}>
              <span className="goal-no">{no}</span>
              <div className="goal-symbol">
                <i />
                <i />
                <i />
              </div>
              <p>{title}</p>
              <h3>{headline}</h3>
              <small>{body}</small>
              <b>{tag}</b>
            </article>
          ))}
        </div>
        <p className="goal-note">
          DESIGN PRINCIPLE · 每一屏只解决一个核心问题，每一步都提供明确反馈。
        </p>
      </Slide>

      <Slide
        index={6}
        eyebrow="INFORMATION ARCHITECTURE"
        title="围绕任务重组，而不是堆叠功能"
      >
        <div className="sitemap">
          <div className="root-node">YY Circle</div>
          <div className="map-columns">
            {[
              ["首页", ["岗位分类", "区域推荐", "简历 / 资讯"]],
              ["找工作", ["搜索 / 筛选", "岗位详情", "可选班次", "立即申请"]],
              ["我的活动", ["待确认", "已排期", "候补 / 取消", "付款状态"]],
              ["电子钱包", ["收入明细", "提现", "支付方式"]],
              ["个人中心", ["个人资料", "技能与证书", "评分体系", "帮助中心"]],
            ].map(([title, items], colIndex) => (
              <div
                className={`map-column col-${colIndex}`}
                key={title as string}
              >
                <h3>{title as string}</h3>
                {(items as string[]).map((item, index) => (
                  <div
                    className={colIndex === 1 && index < 4 ? "active-node" : ""}
                    key={item}
                  >
                    {item}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="flow-note">
          <span>核心任务流</span>
          <b>发现岗位</b>
          <i>→</i>
          <b>查看详情</b>
          <i>→</i>
          <b>选择班次</b>
          <i>→</i>
          <b>提交申请</b>
          <i>→</i>
          <b>追踪状态</b>
        </div>
      </Slide>

      <Slide
        index={7}
        dark
        eyebrow="VISUAL DIRECTION"
        title="友好、可靠，也足够高效"
      >
        <div className="style-layout">
          <div className="style-copy">
            <p className="big-statement">
              延续 YY Circle
              标志性的天空蓝与活力渐变，以高对比和大留白建立年轻、友好且可信赖的求职体验。
            </p>
            <div className="keywords">
              <span>Clear</span>
              <span>Bright</span>
              <span>Human</span>
            </div>
          </div>
          <div className="palette">
            <div className="swatch blue">
              <span>#1777F2</span>
              <b>Trust Blue</b>
            </div>
            <div className="swatch cyan">
              <span>#25D7C8</span>
              <b>Energy Cyan</b>
            </div>
            <div className="swatch lime">
              <span>#D7F35A</span>
              <b>Action Lime</b>
            </div>
            <div className="swatch ink">
              <span>#071B3A</span>
              <b>Deep Ink</b>
            </div>
          </div>
        </div>
        <div className="system-row">
          <div className="type-sample">
            <span>TYPE SCALE</span>
            <strong>Aa</strong>
            <p>让信息拥有清晰节奏</p>
            <small>Display / 72 · Title / 40 · Body / 20</small>
          </div>
          <div className="component-sample">
            <span>CORE COMPONENTS</span>
            <button>Apply Now</button>
            <div className="mini-job">
              <i />
              <div>
                <b>Banquet Assistant</b>
                <small>$20 / hr · Marina Bay</small>
              </div>
              <em>Open</em>
            </div>
          </div>
          <div className="spacing-sample">
            <span>8PT GRID</span>
            <div>
              <i />
              <i />
              <i />
              <i />
            </div>
            <b>08 · 16 · 24 · 32 · 48</b>
          </div>
        </div>
      </Slide>

      <Slide
        index={8}
        eyebrow="ONBOARDING EXPERIENCE"
        title="第一次打开，就知道下一步"
      >
        <div className="showcase-copy">
          <p>
            从国家选择、登录到注册，统一界面节奏与操作反馈，帮助不同地区的求职者快速开始探索岗位。
          </p>
          <div className="annotation">
            <span>01</span>
            <b>明确的单任务页面</b>
            <small>减少并行选项，主按钮始终位于视觉动线末端。</small>
          </div>
          <div className="annotation">
            <span>02</span>
            <b>熟悉的本地化线索</b>
            <small>保留国家、区号与第三方登录，降低学习成本。</small>
          </div>
        </div>
        <div className="three-phones">
          <Phone src={country} alt="选择国家页面" label="01 · SELECT COUNTRY" />
          <Phone
            src={login}
            alt="登录页面"
            label="02 · SIGN IN"
            className="phone-raised"
          />
          <Phone src={signup} alt="注册页面" label="03 · CREATE ACCOUNT" />
          <Phone
            src={forgetPassword}
            alt="找回密码页面"
            label="04 · RECOVER ACCESS"
          />
        </div>
      </Slide>

      <Slide
        index={9}
        dark
        eyebrow="CORE EXPERIENCE"
        title="高频信息，也能一眼看清"
      >
        <div className="feature-label left-label">
          <span>DISCOVER</span>
          <h3>场景化首页</h3>
          <p>
            以临时岗位、全职工作、区域和资讯组织首页，让用户更快发现匹配机会。
          </p>
        </div>
        <div className="feature-label right-label">
          <span>MANAGE</span>
          <h3>状态集中管理</h3>
          <p>将待确认、已排期、候补与取消状态集中呈现，避免错过重要节点。</p>
        </div>
        <div className="hero-phones">
          <Phone
            src={home}
            alt="YY Circle 首页信息流"
            label="HOME · JOB DISCOVERY"
            className="hero-side left-phone"
          />
          <Phone
            src={activities}
            alt="我的活动页面"
            label="ACTIVITY · STATUS HUB"
            className="hero-center"
          />
          <Phone
            src={profile}
            alt="个人资料页面"
            label="PROFILE · TRUST SYSTEM"
            className="hero-side right-phone"
          />
        </div>
      </Slide>

      <Slide index={10} eyebrow="TASK FLOW" title="从岗位兴趣，到安心申请">
        <div className="task-flow">
          <div className="task-copy">
            <p className="big-statement">
              把影响决策的信息放在正确时机：先理解岗位，再选择班次，最后提交申请。
            </p>
            <ol>
              <li>
                <span>01</span>
                <div>
                  <b>岗位透明</b>
                  <small>薪资、地点、要求和联系人一次说明。</small>
                </div>
              </li>
              <li>
                <span>02</span>
                <div>
                  <b>班次可选</b>
                  <small>日期、时段、名额与激励状态清晰可见。</small>
                </div>
              </li>
              <li>
                <span>03</span>
                <div>
                  <b>服务兜底</b>
                  <small>常见问题与人工支持随时可达。</small>
                </div>
              </li>
            </ol>
          </div>
          <div className="task-phones">
            <Phone src={jobDetail} alt="岗位详情页" label="JOB DETAIL" />
            <Phone
              src={slots}
              alt="岗位可选班次"
              label="AVAILABLE SLOTS"
              className="phone-raised"
            />
            <Phone src={helpCenter} alt="帮助中心" label="HELP CENTER" />
          </div>
        </div>
      </Slide>

      <Slide
        index={11}
        dark
        eyebrow="IMPACT & LEARNINGS"
        title="设计不是美化，而是让服务更确定"
      >
        <div className="impact-grid">
          <div className="impact-main">
            <span>PROJECT OUTCOME</span>
            <h3>
              建立一套可延展的移动求职体验框架，覆盖岗位发现、班次申请、活动管理、个人信用与服务支持。
            </h3>
          </div>
          {[
            ["01", "信息层级", "用一致卡片规范承载高密度岗位信息。"],
            ["02", "任务闭环", "让核心状态在每个关键节点持续可见。"],
            ["03", "系统思维", "用组件和规则支持未来业务快速扩展。"],
          ].map(([no, title, body]) => (
            <article className="learning" key={no}>
              <span>{no}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
        <div className="closing-row">
          <div>
            <p>THANK YOU FOR WATCHING</p>
            <h2>YY Circle</h2>
          </div>
          <p>
            UX / UI CASE STUDY
            <br />
            MOBILE EXPERIENCE · 2024
          </p>
        </div>
      </Slide>
    </main>
  )
}

export default App
