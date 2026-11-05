import { useEffect, useState } from "react"

const IMG = "/yy-pet/"

const slides = [
  "封面",
  "项目背景",
  "机会洞察",
  "核心任务流",
  "组件系统",
  "风格探索",
  "核心体验",
  "社交与激励",
  "成长闭环",
  "项目回顾",
]

type PhoneProps = {
  src: string
  className?: string
  tall?: boolean
  label?: string
}

function Phone({ src, className = "", tall = false, label }: PhoneProps) {
  return (
    <figure className={`phone ${tall ? "phone--tall" : ""} ${className}`}>
      <div className="phone__speaker" />
      <img src={`${IMG}${src}`} alt={label || "YY Pet app screen"} />
      {label && <figcaption>{label}</figcaption>}
    </figure>
  )
}

function PageMeta({ n, dark = false }: { n: string; dark?: boolean }) {
  return (
    <div className={`page-meta ${dark ? "page-meta--dark" : ""}`}>
      <span>YY PET · UX/UI CASE STUDY</span>
      <span>{n} / {String(slides.length).padStart(2, "0")}</span>
    </div>
  )
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <div className="eyebrow">{children}</div>
}

function SlideTitle({
  en,
  children,
  light = false,
}: {
  en: string
  children: React.ReactNode
  light?: boolean
}) {
  return (
    <header className={`slide-title ${light ? "slide-title--light" : ""}`}>
      <Eyebrow>{en}</Eyebrow>
      <h2>{children}</h2>
    </header>
  )
}

function App() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>(".slide")
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting)
            setActive(Number((entry.target as HTMLElement).dataset.index))
        })
      },
      { threshold: 0.55 },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const go = (index: number) => {
    document
      .querySelector(`[data-index="${index}"]`)
      ?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <main>
      <nav className="pager" aria-label="作品集页码导航">
        <button
          className="pager__current"
          onClick={() => go(active)}
          aria-label={`当前第 ${active + 1} 页`}
        >
          {String(active + 1).padStart(2, "0")}
        </button>
        <div className="pager__rail">
          {slides.map((name, index) => (
            <button
              key={name}
              className={index === active ? "is-active" : ""}
              onClick={() => go(index)}
              aria-label={`前往${name}`}
              title={name}
            />
          ))}
        </div>
        <span className="pager__total">{String(slides.length).padStart(2, "0")}</span>
      </nav>

      <section className="slide cover" data-index="0">
        <div className="cover__sun" />
        <div className="cover__cloud cover__cloud--one" />
        <div className="cover__cloud cover__cloud--two" />
        <div className="cover__copy">
          <div className="cover__year">2025 · UX/UI PORTFOLIO</div>
          <h1>
            YY <i>Pet</i>
          </h1>
          <p className="cover__lead">把碎片时间，变成一段有温度的陪伴</p>
          <div className="cover__tags">
            <span>虚拟宠物</span>
            <span>休闲养成</span>
            <span>社交互动</span>
          </div>
        </div>
        <div className="cover__phones">
          <Phone src="home.png" className="cover-phone cover-phone--back" />
          <Phone src="loading.png" className="cover-phone cover-phone--front" />
          <div className="cover__stamp">
            <b>{slides.length}</b>
            <span>SCREENS</span>
          </div>
        </div>
        <div className="cover__note">APP REDESIGN · CONCEPT CASE STUDY</div>
        <PageMeta n="01" />
      </section>

      <section className="slide sand" data-index="1">
        <SlideTitle en="01 / PROJECT CONTEXT">项目背景</SlideTitle>
        <div className="context-grid">
          <div className="context-copy">
            <p className="display-copy">
              一款以<strong>陪伴、养成与轻社交</strong>为核心的虚拟宠物产品。
            </p>
            <p className="body-copy">
              YY Pet
              将喂养、互动、好友拜访与任务奖励组合成轻量循环，帮助用户在短时高频的使用场景中建立情感连接。
            </p>
            <div className="stat-row">
              <div>
                <b>3–5</b>
                <span>分钟单次体验</span>
              </div>
              <div>
                <b>4</b>
                <span>类核心行为</span>
              </div>
              <div>
                <b>1</b>
                <span>条成长主线</span>
              </div>
            </div>
          </div>
          <div className="context-visual">
            <Phone
              src="ranch.png"
              className="phone-overlap phone-overlap--one"
            />
            <Phone
              src="home.png"
              className="phone-overlap phone-overlap--two"
            />
            <div className="context-caption">HOME / RANCH</div>
          </div>
        </div>
        <PageMeta n="02" />
      </section>

      <section className="slide navy" data-index="2">
        <SlideTitle en="02 / OPPORTUNITY" light>
          从功能堆叠到情感驱动
        </SlideTitle>
        <div className="opportunity">
          <div className="opportunity__cards">
            {[
              ["01", "入口密度高", "同屏功能入口超过 8 个，注意力被平均分散。"],
              ["02", "反馈层级弱", "成长、奖励与付费反馈使用相似视觉权重。"],
              ["03", "路径缺少串联", "喂养、任务、社交彼此独立，目标感不足。"],
            ].map(([n, title, text]) => (
              <article key={n}>
                <span>{n}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <div className="opportunity__statement">
            <span>DESIGN QUESTION</span>
            <p>
              如何在保留游戏趣味的同时，让用户更快理解“现在做什么”，并持续感受到宠物成长？
            </p>
          </div>
          <div className="opportunity__crop">
            <img src={`${IMG}home.png`} alt="YY Pet home screen detail" />
          </div>
        </div>
        <PageMeta n="03" dark />
      </section>

      <section className="slide coral" data-index="3">
        <SlideTitle en="03 / KEY USER FLOW" light>
          核心任务流
        </SlideTitle>
        <div className="flow-layout">
          <div className="flow-copy">
            <span className="flow-label">SCENARIO 01</span>
            <h3>完成一次日常喂养</h3>
            <p>
              围绕“发现需求—采取行动—获得反馈”缩短关键链路，让核心行为在 3
              步内完成。
            </p>
            <div className="flow-metric">
              <b>−42%</b>
              <span>预期操作路径缩短</span>
            </div>
          </div>
          <div className="flow-phones">
            <div>
              <Phone src="home.png" label="01 / 发现状态" />
              <span className="flow-arrow">→</span>
            </div>
            <div>
              <Phone src="shop.png" tall label="02 / 选择饲料" />
              <span className="flow-arrow">→</span>
            </div>
            <div>
              <Phone src="ranch.png" label="03 / 即时反馈" />
            </div>
          </div>
        </div>
        <PageMeta n="04" dark />
      </section>

      <section className="slide cream" data-index="4">
        <SlideTitle en="04 / COMPONENT SYSTEM">组件系统</SlideTitle>
        <div className="system-grid">
          <div className="system-col">
            <span className="spec-label">COLOR / 色彩</span>
            <div className="swatches">
              {[
                ["#F7C94B", "SUNNY"],
                ["#7DCB58", "GROWTH"],
                ["#F2765C", "ACTION"],
                ["#17324D", "INK"],
              ].map(([hex, name]) => (
                <div key={hex} style={{ background: hex }}>
                  <span>
                    {hex}
                    <small>{name}</small>
                  </span>
                </div>
              ))}
            </div>
            <span className="spec-label">TYPE / 字体层级</span>
            <div className="type-spec">
              <b>Aa</b>
              <div>
                <strong>标题 64 / Bold</strong>
                <span>正文 24 / Regular</span>
                <small>12 · 16 · 24 · 40 · 64</small>
              </div>
            </div>
          </div>
          <div className="system-col system-col--components">
            <span className="spec-label">UI COMPONENTS / 核心组件</span>
            <div className="button-spec">
              <button>Primary action</button>
              <button>Secondary</button>
            </div>
            <div className="resource-card">
              <i>10</i>
              <div>
                <b>Advanced feed</b>
                <span>Feeding can last 8 hours</span>
              </div>
              <button>Buy</button>
            </div>
            <div className="status-spec">
              <span>LEVEL 15</span>
              <i>
                <em />
              </i>
              <b>80%</b>
            </div>
            <div className="radius-notes">
              <span>R 16</span>
              <span>R 24</span>
              <span>R 36</span>
            </div>
          </div>
          <div className="system-preview">
            <Phone src="daily-task.png" tall />
          </div>
        </div>
        <PageMeta n="05" />
      </section>

      <section className="slide lavender" data-index="5">
        <SlideTitle en="05 / VISUAL DIRECTION">设计风格探索</SlideTitle>
        <div className="mood-grid">
          <div className="mood-board">
            <div className="mood-shape mood-shape--a">
              <span>SOFT</span>
            </div>
            <div className="mood-shape mood-shape--b">
              <span>WARM</span>
            </div>
            <div className="mood-shape mood-shape--c">
              <span>PLAYFUL</span>
            </div>
            <div className="mood-shape mood-shape--d" />
            <p>
              以“阳光牧场”为核心意象，用低对比自然色、圆润轮廓与轻拟物细节构建亲和体验。
            </p>
          </div>
          <div className="style-principles">
            {[
              ["01", "圆润", "降低游戏界面的攻击性"],
              ["02", "明亮", "传递轻松积极的情绪"],
              ["03", "有层次", "用材质感强化可点击性"],
            ].map(([n, title, desc]) => (
              <div key={n}>
                <span>{n}</span>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
          <Phone src="loading.png" className="mood-phone" />
        </div>
        <PageMeta n="06" />
      </section>

      <section className="slide sky" data-index="6">
        <SlideTitle en="06 / CORE EXPERIENCE">围绕宠物的核心体验</SlideTitle>
        <div className="showcase showcase--three">
          <div className="showcase__phone">
            <Phone src="home.png" />
            <span>01</span>
            <b>主场景总览</b>
            <p>状态与操作集中呈现</p>
          </div>
          <div className="showcase__phone showcase__phone--lift">
            <Phone src="ranch.png" />
            <span>02</span>
            <b>好友牧场</b>
            <p>在拜访中自然完成互动</p>
          </div>
          <div className="showcase__phone">
            <Phone src="indoor.png" />
            <span>03</span>
            <b>生活场景</b>
            <p>扩展陪伴的叙事空间</p>
          </div>
        </div>
        <div className="showcase-quote">
          “每一次点击，都让宠物世界更真实一点。”
        </div>
        <PageMeta n="07" />
      </section>

      <section className="slide dark-green" data-index="7">
        <SlideTitle en="07 / SOCIAL & REWARD" light>
          社交与激励机制
        </SlideTitle>
        <div className="reward-layout">
          <div className="reward-copy">
            <div className="reward-kicker">LIGHT SOCIAL LOOP</div>
            <h3>让关系成为持续回访的理由</h3>
            <p>
              邀请好友、访问牧场与随机奖励形成低压力社交，避免强对抗，让互动回归陪伴与分享。
            </p>
            <div className="reward-loop">
              <span>邀请</span>
              <i>→</i>
              <span>互动</span>
              <i>→</i>
              <span>奖励</span>
              <i>→</i>
              <span>回访</span>
            </div>
          </div>
          <div className="reward-phones">
            <Phone src="friends.png" />
            <Phone src="lucky-draw.png" />
            <Phone src="adopt.png" />
          </div>
        </div>
        <PageMeta n="08" dark />
      </section>

      <section className="slide peach" data-index="8">
        <SlideTitle en="08 / GROWTH LOOP">成长体验闭环</SlideTitle>
        <div className="growth-layout">
          <div className="growth-ring">
            <div className="growth-ring__center">
              <b>GROW</b>
              <span>持续成长</span>
            </div>
            {[
              ["01", "照顾", "喂养与陪伴"],
              ["02", "完成", "日常与挑战"],
              ["03", "获得", "金币与道具"],
              ["04", "解锁", "宠物与场景"],
            ].map(([n, title, desc], index) => (
              <div className={`growth-node node-${index + 1}`} key={n}>
                <span>{n}</span>
                <b>{title}</b>
                <small>{desc}</small>
              </div>
            ))}
          </div>
          <div className="growth-screens">
            <Phone src="daily-task.png" tall />
            <Phone src="scene.png" />
            <Phone src="shop.png" tall />
          </div>
        </div>
        <PageMeta n="09" />
      </section>

      <section className="slide finale" data-index="9">
        <div className="finale-collage">
          <Phone src="loading.png" />
          <Phone src="home.png" />
          <Phone src="friends.png" />
          <Phone src="lucky-draw.png" />
          <Phone src="scene.png" />
        </div>
        <div className="finale-copy">
          <Eyebrow>09 / PROJECT REFLECTION</Eyebrow>
          <h2>
            让陪伴发生，
            <br />
            让成长被看见。
          </h2>
          <p>
            YY Pet
            以更清晰的行为路径、更温暖的视觉反馈与更连续的成长机制，重新组织虚拟宠物的日常体验。
          </p>
          <div className="finale-tags">
            <span>清晰</span>
            <span>温暖</span>
            <span>持续</span>
          </div>
          <small>THANK YOU FOR WATCHING</small>
        </div>
        <PageMeta n="10" dark />
      </section>
    </main>
  )
}

export default App
