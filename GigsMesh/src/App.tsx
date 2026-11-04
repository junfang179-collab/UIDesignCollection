import { useState } from "react"

type PhoneKind = "jobs" | "fulltime" | "bookings" | "payment" | "profile"

const screens: { kind: PhoneKind; index: string; title: string; note: string }[] =
  [
    {
      kind: "jobs",
      index: "01",
      title: "灵活工作发现",
      note: "附近职位 · 快速筛选 · 即时申请",
    },
    {
      kind: "fulltime",
      index: "02",
      title: "全职机会探索",
      note: "分类浏览 · 薪资透明 · 信息聚焦",
    },
    {
      kind: "bookings",
      index: "03",
      title: "工作进度管理",
      note: "统一状态 · 节点清晰 · 降低焦虑",
    },
    {
      kind: "payment",
      index: "04",
      title: "收入与结算",
      note: "收益总览 · 状态追踪 · 记录可查",
    },
    {
      kind: "profile",
      index: "05",
      title: "个人资料中心",
      note: "资质管理 · 审核反馈 · 信任建立",
    },
  ]

const jobData = [
  {
    title: "Banquet Kitchen",
    place: "Grand Hyatt Kuala Lumpur",
    pay: "est RM90",
    image: "/assets/078e8.png",
    tag: "FEATURED",
  },
  {
    title: "Waiter",
    place: "Sunway Resort Hotel",
    pay: "est RM60",
    image: "/assets/2fd05.png",
    tag: "APPLIED",
  },
  {
    title: "Steward",
    place: "Pavilion Kuala Lumpur",
    pay: "est RM99",
    image: "/assets/59754.png",
    tag: "FEATURED",
  },
]

const fulltimeData = [
  ["5 vacancies", "Senior Accountant", "FinancePro Sdn Bhd", "RM 4,500–7,000"],
  [
    "2 vacancies",
    "Marketing Executive",
    "TrendBrands Malaysia",
    "RM 5,500–8,000",
  ],
  [
    "3 vacancies",
    "Frontend Developer",
    "Nexwave Software Sdn Bhd",
    "RM 4,000–6,500",
  ],
]

const bookingData = [
  ["/assets/18528.png", "My Pending Jobs", "Awaiting store confirmation", "1"],
  ["/assets/bfe09.png", "My Scheduled", "Confirmed shifts coming up", "9"],
  ["/assets/ebe6e.png", "My Waiting List", "Queue positions you hold", "2"],
  ["/assets/d4e4e.png", "My Cancelled Jobs", "Cancelled or declined jobs", ""],
  [
    "/assets/e9038.png",
    "My Jobs Payment Status",
    "Payout progress per job",
    "",
  ],
]

function BottomNav({ active }: { active: string }) {
  return (
    <div className="phone-nav">
      {["Jobs", "Full Time", "My Bookings", "Payment"].map((item) => (
        <span className={active === item ? "is-active" : ""} key={item}>
          <i />
          <small>{item}</small>
        </span>
      ))}
    </div>
  )
}

function SearchHeader({ fulltime = false }: { fulltime?: boolean }) {
  return (
    <div className={`search-head ${fulltime ? "short" : ""}`}>
      {!fulltime && (
        <div className="brand-row">
          <img src="/assets/af2ac.png" alt="Nur Aisyah" />
          <strong>
            <b>G</b> GigsMesh
          </strong>
          <span className="round-control" />
        </div>
      )}
      <p>{fulltime ? "PERMANENT POSITIONS" : "FIND WORK NEAR YOU"}</p>
      <h3>{fulltime ? "Full Time" : "Jobs"}</h3>
      <div className="search-box">
        ⌕&nbsp;&nbsp; Search {fulltime ? "job title, company…" : ""}
      </div>
      <div className="filters">
        <span>All⌄</span>
        <span>Date</span>
        <span>
          Filter By <b>(5)</b>
        </span>
      </div>
    </div>
  )
}

function JobsScreen() {
  return (
    <div className="mobile-page">
      <SearchHeader />
      <div className="job-list">
        {jobData.map((job) => (
          <article className="job-card" key={job.title + job.place}>
            <em>{job.tag}</em>
            <div className="job-main">
              <img src={job.image} alt="" />
              <div>
                <h4>{job.title}</h4>
                <p>GigsMesh</p>
                <p>{job.place}</p>
              </div>
            </div>
            <div className="job-meta">
              <span>08 Oct 2025 · 10:00–19:30</span>
              <span>Kuala Lumpur</span>
            </div>
            <div className="job-pay">
              <small>Tap to view & apply</small>
              <b>{job.pay}</b>
            </div>
          </article>
        ))}
      </div>
      <BottomNav active="Jobs" />
    </div>
  )
}

function FulltimeScreen() {
  return (
    <div className="mobile-page">
      <SearchHeader fulltime />
      <div className="category-tabs">
        <b>All</b>
        <span>IT</span>
        <span>Accounting</span>
        <span>F&amp;B</span>
      </div>
      <div className="fulltime-list">
        {fulltimeData.map((job) => (
          <article className="fulltime-card" key={job[1]}>
            <small>{job[0]}</small>
            <h4>{job[1]}</h4>
            <p>{job[2]}</p>
            <p className="location">Bukit Bintang, Kuala Lumpur</p>
            <div>
              <span>2–3 Years</span>
              <b>
                {job[3]}
                <i>/month</i>
              </b>
            </div>
            <footer>
              <span>5 days / week</span>
              <span>Degree</span>
              <span>2 days ago</span>
            </footer>
          </article>
        ))}
      </div>
      <BottomNav active="Full Time" />
    </div>
  )
}

function BookingsScreen() {
  return (
    <div className="mobile-page light-screen screen-pad">
      <header className="simple-head">
        <p>OVERVIEW</p>
        <h3>My Bookings</h3>
        <b>12</b>
      </header>
      <div className="booking-list">
        {bookingData.map((item) => (
          <article key={item[1]}>
            <div className="booking-img">
              <img src={item[0]} alt="" />
            </div>
            <div>
              <h4>{item[1]}</h4>
              <p>{item[2]}</p>
            </div>
            {item[3] && <b>{item[3]}</b>}
            <span>›</span>
          </article>
        ))}
      </div>
      <BottomNav active="My Bookings" />
    </div>
  )
}

function PaymentScreen() {
  return (
    <div className="mobile-page light-screen screen-pad">
      <header className="simple-head">
        <p>EARNINGS</p>
        <h3>Payment</h3>
      </header>
      <div className="balance-card">
        <small>Salary in Review</small>
        <strong>RM 200.00</strong>
        <div>
          <span>
            Total Earnings as of
            <br />
            19 Aug 2023 <b>RM 566.00</b>
          </span>
          <span>
            Total this month
            <br />
            <b>RM 121.00</b>
          </span>
        </div>
      </div>
      <div className="payment-actions">
        <span>
          Cash Paid Transaction <b>›</b>
        </span>
        <span>
          Salary Bill <b>›</b>
        </span>
      </div>
      <h4 className="history-title">Payment History</h4>
      <div className="payment-tabs">
        <b>All</b>
        <span>Processing</span>
        <span>Paid</span>
      </div>
      <div className="history-list">
        {[
          [
            "/assets/078e8.png",
            "Western Banquet Kitchen",
            "14 Dec 2024",
            "RM90",
          ],
          ["", "Incentive Challenge", "13 Dec 2024", "RM20"],
          [
            "/assets/078e8.png",
            "Grand Hyatt Kuala Lumpur",
            "12 Dec 2024",
            "RM120",
          ],
        ].map((item) => (
          <article key={item[1]}>
            {item[0] ? (
              <img src={item[0]} alt="" />
            ) : (
              <div className="blank-icon" />
            )}
            <div>
              <h4>{item[1]}</h4>
              <p>{item[2]}</p>
            </div>
            <b>
              {item[3]}
              <small>Paid</small>
            </b>
          </article>
        ))}
      </div>
      <BottomNav active="Payment" />
    </div>
  )
}

function ProfileScreen() {
  return (
    <div className="mobile-page light-screen profile-screen">
      <div className="profile-top">
        <button>‹</button>
        <b>Me</b>
        <span>Q&amp;A&nbsp;&nbsp; Settings</span>
      </div>
      <div className="profile-person">
        <img src="/assets/af2ac.png" alt="Nur Aisyah" />
        <div>
          <h3>Nur Aisyah Binti Mohd Ali</h3>
          <b>My Credits (100)</b>
          <p>ahmad.rosli@gmail.com</p>
          <p>20 April, 2025</p>
        </div>
      </div>
      <div className="approval">
        <div>
          <b>View My Additional Info</b>
          <p>
            Your account status: <strong>Approve</strong>
          </p>
        </div>
        <button>Edit Now</button>
      </div>
      <div className="info-card">
        <h4>Personal Information</h4>
        {[
          ["NAME", "Nur Aisyah Binti Mohd Ali"],
          ["EMAIL", "ahmad.rosli@gmail.com"],
          ["IPHONE", "+60 13–9876 5432"],
          ["NRIC", "950412105678"],
          ["INTERNATIONAL", "Malaysian"],
        ].map((row) => (
          <p key={row[0]}>
            <small>{row[0]}</small>
            <b>{row[1]}</b>
          </p>
        ))}
      </div>
      <div className="skill-card">
        <h4>
          Skill <span>›</span>
        </h4>
        <div>
          <b>Hospitality/F&amp;B</b>
          <b>Human Resources</b>
          <b>IT/Technical/Engineers</b>
        </div>
      </div>
      <div className="vaccine-card">
        <h4>
          Typhoid Vaccine <span>›</span>
        </h4>
        <div>
          <img src="/assets/486a4.png" alt="" />
          <p>
            Typhoid Vaccine Expiration Date<strong>Sep 10, 2022</strong>
            <em>Reason: The picture is not clear, please upload again.</em>
          </p>
        </div>
      </div>
    </div>
  )
}

function Phone({
  kind,
  className = "",
}: {
  kind: PhoneKind
  className?: string
}) {
  return (
    <div className={`phone ${className}`}>
      <div className="phone-status">
        <span>9:41</span>
        <i />
        <b>▮ ◒ ▭</b>
      </div>
      {kind === "jobs" && <JobsScreen />}
      {kind === "fulltime" && <FulltimeScreen />}
      {kind === "bookings" && <BookingsScreen />}
      {kind === "payment" && <PaymentScreen />}
      {kind === "profile" && <ProfileScreen />}
    </div>
  )
}

function SectionTitle({
  number,
  eyebrow,
  title,
  desc,
  light = false,
}: {
  number: string
  eyebrow: string
  title: string
  desc?: string
  light?: boolean
}) {
  return (
    <div className={`section-title ${light ? "light" : ""}`}>
      <span>{number}</span>
      <div>
        <p>{eyebrow}</p>
        <h2>{title}</h2>
        {desc && <h3>{desc}</h3>}
      </div>
    </div>
  )
}

export default function App() {
  const [styleMode, setStyleMode] = useState<"clarity" | "energy" | "trust">(
    "energy",
  )

  return (
    <main>
      <nav className="top-nav">
        <a href="#top" className="wordmark">
          <b>G</b> GIGSMESH®
        </a>
        <div>
          <a href="#research">Research</a>
          <a href="#process">Process</a>
          <a href="#design">Design</a>
          <a href="#screens">Screens</a>
        </div>
        <a className="nav-cta" href="#screens">
          View Case
        </a>
      </nav>

      <section className="hero" id="top">
        <div className="hero-glow" />
        <div className="hero-copy">
          <p className="case-label">UI/UX CASE STUDY · 2025</p>
          <h1>
            Work,
            <br />
            <em>without the wait.</em>
          </h1>
          <h2>
            让每一次工作匹配
            <br />
            都更简单、更透明。
          </h2>
          <div className="hero-meta">
            <div>
              <small>PROJECT</small>
              <b>GigsMesh</b>
            </div>
            <div>
              <small>ROLE</small>
              <b>UI/UX Designer</b>
            </div>
            <div>
              <small>DURATION</small>
              <b>08 Weeks</b>
            </div>
          </div>
        </div>
        <div className="hero-phones">
          <Phone kind="fulltime" className="hero-phone-back" />
          <Phone kind="jobs" className="hero-phone-front" />
        </div>
        <div className="hero-foot">
          <span>01 — CASE OVERVIEW</span>
          <i />
          <span>SCROLL TO EXPLORE</span>
        </div>
      </section>

      <section className="background page-section">
        <SectionTitle
          number="01"
          eyebrow="PROJECT BACKGROUND"
          title="项目背景"
          desc="从零散机会，到可信赖的工作网络"
        />
        <div className="background-grid">
          <div className="intro-big">
            <p>
              GigsMesh
              是面向马来西亚灵活就业人群的工作平台，连接临时工、全职人才与餐饮、酒店、零售等用工企业。
            </p>
          </div>
          <div className="context-copy">
            <p>
              用户原本需要在多个聊天群、招聘网站与联系人之间寻找工作。信息过期、薪酬不透明、申请状态不可追踪，造成大量无效沟通与信任损耗。
            </p>
            <p>
              本次改版围绕「发现—申请—履约—结算」完整链路，构建清晰、可信且可以持续扩展的移动端体验。
            </p>
          </div>
        </div>
        <div className="metrics">
          <article>
            <strong>1.7M+</strong>
            <p>马来西亚灵活就业者</p>
            <span>GROWING WORKFORCE</span>
          </article>
          <article>
            <strong>68%</strong>
            <p>更在意薪酬透明度</p>
            <span>USER PRIORITY</span>
          </article>
          <article>
            <strong>5</strong>
            <p>核心页面统一重构</p>
            <span>KEY TOUCHPOINTS</span>
          </article>
        </div>
        <div className="problem-band">
          <p>THE CHALLENGE</p>
          <h3>
            如何让用户在 <em>30 秒内</em> 找到适合的工作，
            <br />
            并清楚掌握每个申请与结算节点？
          </h3>
        </div>
      </section>

      <section className="research page-section" id="research">
        <SectionTitle
          number="02"
          eyebrow="USER RESEARCH"
          title="用户调研分析"
          desc="听见真实困扰，找到体验突破口"
        />
        <div className="research-layout">
          <div className="persona-card">
            <span className="persona-tag">PRIMARY PERSONA</span>
            <img src="/assets/af2ac.png" alt="用户画像 Nur Aisyah" />
            <h3>Nur Aisyah</h3>
            <p>24岁 · 吉隆坡 · 酒店兼职服务员</p>
            <div>
              <span>
                <small>工作频率</small>
                <b>每周 3–4 次</b>
              </span>
              <span>
                <small>设备</small>
                <b>Mobile first</b>
              </span>
            </div>
            <blockquote>
              “我最想知道的不是有多少工作，
              <br />
              而是哪些工作现在还能申请。”
            </blockquote>
          </div>
          <div className="insight-column">
            <p className="mini-label">RESEARCH METHODS</p>
            <div className="methods">
              <span>
                08
                <br />
                <small>深度访谈</small>
              </span>
              <span>
                42
                <br />
                <small>问卷样本</small>
              </span>
              <span>
                03
                <br />
                <small>竞品分析</small>
              </span>
            </div>
            <p className="mini-label">KEY FINDINGS</p>
            {[
              [
                "01",
                "信息可信度不足",
                "用户无法判断职位是否仍有效，薪资与地点信息常常缺失。",
                "HIGH",
              ],
              [
                "02",
                "申请进度不透明",
                "提交后缺少明确反馈，需要反复联系雇主确认。",
                "HIGH",
              ],
              [
                "03",
                "收入记录较分散",
                "工资、奖励和待审核收入没有统一视图。",
                "MED",
              ],
              [
                "04",
                "资料审核反馈模糊",
                "证件被拒时缺少可操作的原因和下一步指引。",
                "MED",
              ],
            ].map((item) => (
              <article className="finding" key={item[0]}>
                <b>{item[0]}</b>
                <div>
                  <h4>{item[1]}</h4>
                  <p>{item[2]}</p>
                </div>
                <span>{item[3]}</span>
              </article>
            ))}
          </div>
        </div>
        <div className="journey">
          <div className="journey-head">
            <p>AS-IS JOURNEY</p>
            <h3>原有求职旅程</h3>
            <span>情绪体验</span>
          </div>
          <div className="journey-steps">
            {[
              "寻找信息",
              "比较岗位",
              "联系雇主",
              "等待回复",
              "完成工作",
              "确认收入",
            ].map((item, i) => (
              <div key={item}>
                <span>0{i + 1}</span>
                <b>{item}</b>
                <i className={i === 0 || i === 4 ? "up" : ""} />
              </div>
            ))}
          </div>
          <p className="journey-note">
            主要断点集中于申请后的等待期，以及工作完成后的收入确认阶段。
          </p>
        </div>
      </section>

      <section className="goals page-section">
        <SectionTitle
          number="03"
          eyebrow="DESIGN GOALS"
          title="设计目标"
          desc="用清晰感建立效率，用掌控感建立信任"
        />
        <div className="goal-grid">
          {[
            [
              "01",
              "FAST",
              "更快发现",
              "通过位置、日期、类别与状态筛选，让合适机会第一时间出现。",
              "30s",
              "完成工作筛选",
            ],
            [
              "02",
              "CLEAR",
              "更易理解",
              "统一信息优先级与状态语义，让每张卡片都能被快速扫读。",
              "3层",
              "核心信息层级",
            ],
            [
              "03",
              "TRUST",
              "更有掌控",
              "覆盖申请、履约、审核与结算的关键反馈，减少未知等待。",
              "100%",
              "关键状态可追踪",
            ],
          ].map((goal) => (
            <article key={goal[0]}>
              <span>{goal[0]}</span>
              <p>{goal[1]}</p>
              <h3>{goal[2]}</h3>
              <h4>{goal[3]}</h4>
              <div>
                <strong>{goal[4]}</strong>
                <small>{goal[5]}</small>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="process page-section dark-section" id="process">
        <SectionTitle
          number="04"
          eyebrow="DESIGN PROCESS"
          title="设计流程拆解"
          desc="从问题定义到视觉落地的系统化推进"
          light
        />
        <div className="process-line">
          {[
            ["01", "DISCOVER", "理解业务与用户", "访谈 / 桌面研究"],
            ["02", "DEFINE", "聚焦核心问题", "画像 / 旅程地图"],
            ["03", "DEVELOP", "探索解决方案", "流程 / 线框原型"],
            ["04", "DELIVER", "验证并完善体验", "视觉 / 可用性测试"],
          ].map((step) => (
            <article key={step[0]}>
              <span>{step[0]}</span>
              <p>{step[1]}</p>
              <h3>{step[2]}</h3>
              <small>{step[3]}</small>
            </article>
          ))}
        </div>
        <div className="flow-showcase">
          <div className="flow-copy">
            <p className="mini-label">CORE TASK FLOW</p>
            <h3>
              把找工作压缩成
              <br />
              一条自然的路径
            </h3>
            <p>
              将原本跨平台完成的搜索、沟通与确认动作整合到单一任务流中，并在每一步给予可预测的反馈。
            </p>
            <div>
              <span>
                <b>–42%</b>
                <small>预计操作步骤</small>
              </span>
              <span>
                <b>+3</b>
                <small>关键状态反馈</small>
              </span>
            </div>
          </div>
          <div className="flow-map">
            {[
              "打开首页",
              "浏览 / 搜索",
              "筛选岗位",
              "查看详情",
              "立即申请",
              "申请成功",
            ].map((item, i) => (
              <div className={i === 5 ? "success" : ""} key={item}>
                <span>{i + 1}</span>
                <b>{item}</b>
                {i < 5 && <i>→</i>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sitemap page-section">
        <SectionTitle
          number="05"
          eyebrow="INFORMATION ARCHITECTURE"
          title="结构优化页面地图"
          desc="四个核心入口，覆盖完整工作生命周期"
        />
        <div className="sitemap-tree">
          <div className="root-node">
            <span>G</span>
            <b>GigsMesh</b>
            <small>Mobile App</small>
          </div>
          <div className="tree-line" />
          <div className="tree-columns">
            {[
              [
                "01",
                "JOBS",
                "灵活工作",
                ["附近职位", "搜索与筛选", "职位详情", "申请确认"],
              ],
              [
                "02",
                "FULL TIME",
                "全职机会",
                ["职位分类", "推荐列表", "公司信息", "投递申请"],
              ],
              [
                "03",
                "MY BOOKINGS",
                "工作管理",
                ["待确认", "已排期", "候补名单", "取消记录"],
              ],
              [
                "04",
                "PAYMENT",
                "收入结算",
                ["收入总览", "现金记录", "工资单", "支付历史"],
              ],
              [
                "05",
                "PROFILE",
                "个人资料",
                ["基本信息", "技能标签", "证件审核", "账户设置"],
              ],
            ].map((col) => (
              <article key={col[0]}>
                <span>{col[0]}</span>
                <p>{col[1]}</p>
                <h3>{col[2]}</h3>
                <ul>
                  {(col[3] as string[]).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
        <div className="architecture-note">
          <b>优化原则</b>
          <span>高频任务前置</span>
          <span>状态入口统一</span>
          <span>路径不超过 3 层</span>
          <span>命名贴近用户语言</span>
        </div>
      </section>

      <section className={`visual page-section mode-${styleMode}`} id="design">
        <SectionTitle
          number="06"
          eyebrow="VISUAL DIRECTION"
          title="设计风格探索"
          desc="在效率、活力与信任之间寻找平衡"
        />
        <div className="style-switch" role="group" aria-label="视觉方向">
          <button
            onClick={() => setStyleMode("clarity")}
            className={styleMode === "clarity" ? "active" : ""}
          >
            A · 清晰理性
          </button>
          <button
            onClick={() => setStyleMode("energy")}
            className={styleMode === "energy" ? "active" : ""}
          >
            B · 活力连接
          </button>
          <button
            onClick={() => setStyleMode("trust")}
            className={styleMode === "trust" ? "active" : ""}
          >
            C · 温暖可信
          </button>
        </div>
        <div className="style-board">
          <div className="palette">
            <p className="mini-label">COLOR SYSTEM</p>
            <div className="swatches">
              <span>
                <b>#B9F70D</b>
              </span>
              <span>
                <b>#131809</b>
              </span>
              <span>
                <b>#647F0E</b>
              </span>
              <span>
                <b>#F0F2E7</b>
              </span>
              <span>
                <b>#FFFFFF</b>
              </span>
            </div>
            <p>
              高对比荧光绿用于行动与成功状态；深橄榄黑提供专业感；暖灰白降低长时间浏览的视觉压力。
            </p>
          </div>
          <div className="type-board">
            <p className="mini-label">TYPOGRAPHY</p>
            <strong>Aa</strong>
            <h3>Inter × Microsoft YaHei</h3>
            <p>Clear. Direct. Human.</p>
            <div>
              <b>Display / 72</b>
              <span>Title / 32</span>
              <small>Body / 16</small>
            </div>
          </div>
          <div className="component-board">
            <p className="mini-label">COMPONENT LANGUAGE</p>
            <button>Primary Action</button>
            <span className="sample-chip">5 vacancies</span>
            <div className="sample-card">
              <i />
              <span>
                <b>Senior Accountant</b>
                <small>Kuala Lumpur</small>
              </span>
              <strong>RM 7,000</strong>
            </div>
            <p>18px 圆角 · 轻边框 · 高密度但不拥挤</p>
          </div>
        </div>
        <div className="design-rules">
          {["8PT GRID", "18PX RADIUS", "AA CONTRAST", "ONE-HAND REACH"].map(
            (rule, i) => (
              <span key={rule}>
                <b>0{i + 1}</b>
                {rule}
              </span>
            ),
          )}
        </div>
      </section>

      <section className="screens-intro page-section dark-section" id="screens">
        <SectionTitle
          number="07"
          eyebrow="FINAL DESIGN"
          title="多张核心页面展示"
          desc="五个页面，一套一致且可延展的产品体验"
          light
        />
        <div className="screen-fan">
          <Phone kind="fulltime" />
          <Phone kind="bookings" />
          <Phone kind="jobs" />
          <Phone kind="payment" />
          <Phone kind="profile" />
        </div>
      </section>

      {screens.map((screen, index) => (
        <section
          className={`screen-detail detail-${screen.kind}`}
          key={screen.kind}
        >
          <div className="screen-detail-copy">
            <span>{screen.index} / 05</span>
            <p>CORE SCREEN</p>
            <h2>{screen.title}</h2>
            <h3>{screen.note}</h3>
            <ul>
              {index === 0 && (
                <>
                  <li>搜索与筛选集中在首屏完成</li>
                  <li>职位卡片突出时间、地点与预估收入</li>
                  <li>清晰标记 Featured / Applied 状态</li>
                </>
              )}
              {index === 1 && (
                <>
                  <li>按行业快速切换职位类型</li>
                  <li>薪资范围成为卡片第一视觉锚点</li>
                  <li>经验与学历要求保持可扫读</li>
                </>
              )}
              {index === 2 && (
                <>
                  <li>按任务状态重组所有预约</li>
                  <li>数字徽标提示待处理数量</li>
                  <li>减少用户对申请结果的反复确认</li>
                </>
              )}
              {index === 3 && (
                <>
                  <li>收入总额与审核中金额分层呈现</li>
                  <li>支付状态使用颜色与文字双重表达</li>
                  <li>完整记录支持后续对账</li>
                </>
              )}
              {index === 4 && (
                <>
                  <li>个人、技能和证件信息模块化</li>
                  <li>审核失败提供明确原因</li>
                  <li>把资料完整度转化为求职信任</li>
                </>
              )}
            </ul>
          </div>
          <div className="detail-phone-wrap">
            <div className="detail-orbit" />
            <Phone kind={screen.kind} />
          </div>
          <div className="detail-number">{screen.index}</div>
        </section>
      ))}

      <footer className="case-footer">
        <p>GIGSMESH · UI/UX CASE STUDY</p>
        <h2>
          Find work.
          <br />
          <em>Build momentum.</em>
        </h2>
        <div>
          <span>Product Strategy</span>
          <span>User Research</span>
          <span>Interaction Design</span>
          <span>Visual Design</span>
        </div>
        <small>Designed with clarity, trust and a little electric green.</small>
      </footer>
    </main>
  )
}
