import type { ReactNode } from "react"
const activities = "/YYCircleApp/assets/screens/activities.png"
const country = "/YYCircleApp/assets/screens/country.png"
const forgetPassword = "/YYCircleApp/assets/screens/forget-password.png"
const helpCenter = "/YYCircleApp/assets/screens/help-center.png"
const home = "/YYCircleApp/assets/screens/home.png"
const jobDetail = "/YYCircleApp/assets/screens/job-detail.png"
const login = "/YYCircleApp/assets/screens/login.png"
const profile = "/YYCircleApp/assets/screens/profile.png"
const signup = "/YYCircleApp/assets/screens/signup.png"
const slots = "/YYCircleApp/assets/screens/slots.png"

const slides = [
  "封面 · 项目背景",
  "设计语言",
  "新手引导",
  "核心体验",
  "任务闭环",
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

      <Slide index={1} dark className="cover cover-merged">
        <div className="cover-orbit orbit-one" />
        <div className="cover-orbit orbit-two" />
        <div className="cover-copy">
          <p className="cover-kicker">01 / PROJECT OVERVIEW</p>
          <h1>
            YY
            <br />
            <span>Circle</span>
          </h1>
          <p className="cover-subtitle">灵活工作，掌握自己的时间</p>
          <div className="cover-body">
            <h3>从发现机会，到管理每一份工作</h3>
            <p className="cover-lead">
              YY Circle 是 YY Group 旗下的按需灵活人力 / 临时工招聘平台（APP），主打兼职、临时人手撮合
              + 劳动力管理，市场覆盖新加坡、马来西亚、香港、泰国等地区。
            </p>
            <div className="cover-split-label">两边定位</div>
            <div className="cover-split">
              <div className="cover-split-item">
                <p className="cover-split-title">
                  <span>对雇主</span>
                  酒店 · 餐饮 · 零售 · 服务业
                </p>
                <p>
                  快速招临时 / 兼职人手，支持排班、考勤、工时核算、薪资结算，解决旺季、缺人、临时顶班需求，和
                  WheelHR、24IFM 打通配合使用。
                </p>
              </div>
              <div className="cover-split-item">
                <p className="cover-split-title">
                  <span>对求职者</span>
                  弹性接单
                </p>
                <p>
                  自主挑选短期兼职、按工时接单，很多岗位可以日结薪酬，弹性上班。
                </p>
              </div>
            </div>
            <div className="cover-cap">
              <p className="cover-cap-title">配套能力</p>
              <div className="cover-cap-tags">
                <span>AI 匹配岗位</span>
                <span>人脸考勤</span>
                <span>工时记录</span>
                <span>打卡</span>
                <span>工资单</span>
                <span>订单管理</span>
                <span>商家后台</span>
                <span>求职者端 APP</span>
                <span>香港 / 马来 / 泰国本地版</span>
              </div>
            </div>
            <div className="cover-stats">
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
        </div>
        <div className="cover-phones">
          <Phone src={home} alt="YY Circle 首页" className="phone-back" />
          <Phone
            src={activities}
            alt="YY Circle 活动页"
            className="phone-front"
          />
        </div>
      </Slide>

      <Slide
        index={2}
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
        index={3}
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
        index={4}
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

      <Slide index={5} eyebrow="TASK FLOW" title="从岗位兴趣，到安心申请">
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
    </main>
  )
}

export default App
