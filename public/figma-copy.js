/*!
 * Copy-to-Figma 侧边按钮
 * 把当前页面（或当前滚动到的那一屏）序列化成可粘贴到 Figma 的图层结构。
 * 依赖同目录下的 /capture.js（Figma 官方 capture 脚本，首次点击时才加载）。
 */
;(function () {
  'use strict'

  if (window.__figmaCopyRailInstalled) return
  window.__figmaCopyRailInstalled = true

  var CAPTURE_SRC = '/capture.js'
  var RESET_MS = 2600
  var captureScriptPromise = null
  var resetTimer = null

  var COPY_ICON =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="8.5" y="8.5" width="11" height="11" rx="2.4"/>' +
    '<path d="M15.8 8.5V6.2A2.2 2.2 0 0 0 13.6 4H6.2A2.2 2.2 0 0 0 4 6.2v7.4A2.2 2.2 0 0 0 6.2 15.8h2.3"/></svg>'
  var CHECK_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.4 4.4L19 7.4"/></svg>'
  var CLOSE_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 6.5l11 11M17.5 6.5l-11 11"/></svg>'

  /* ------------------------------------------------------------------ 样式 */

  var CSS = [
    '.fcr{position:fixed;right:0;top:50%;z-index:2147483000;transform:translateY(-50%);',
    'font-family:Inter,"PingFang SC","Microsoft YaHei",system-ui,sans-serif;-webkit-font-smoothing:antialiased}',
    '.fcr,.fcr *{box-sizing:border-box}',

    /* 收起的贴边标签 */
    '.fcr-tab{display:flex;flex-direction:column;align-items:center;gap:9px;width:46px;padding:18px 0 16px;',
    'border:0;border-radius:15px 0 0 15px;background:#0d1922;color:#fff;cursor:pointer;',
    'opacity:.72;box-shadow:-12px 14px 34px rgba(4,24,40,.24);',
    'transition:opacity .18s ease,transform .18s ease,background .18s ease}',
    '.fcr-tab:hover{opacity:1;transform:translateX(-3px)}',
    '.fcr[data-open="true"] .fcr-tab{opacity:1;background:#12506e}',
    '.fcr-tab .fcr-tab-icon{display:grid;place-items:center;color:#5cc4ee}',
    '.fcr-tab svg{width:17px;height:17px;fill:none;stroke:currentColor;stroke-width:1.9;stroke-linecap:round;stroke-linejoin:round}',
    '.fcr-tab b{writing-mode:vertical-rl;text-orientation:mixed;font-size:9px;font-weight:700;letter-spacing:2.4px;line-height:1;color:rgba(255,255,255,.72)}',

    /* 展开面板 */
    '.fcr-panel{position:absolute;right:54px;top:50%;width:276px;padding:15px 17px 14px;border-radius:16px;',
    'background:#0d1922;color:#fff;border:1px solid rgba(255,255,255,.11);',
    'box-shadow:0 26px 64px rgba(3,18,32,.5);opacity:0;pointer-events:none;',
    'transform:translate(16px,-50%);transition:opacity .2s ease,transform .24s cubic-bezier(.22,.9,.28,1)}',
    '.fcr[data-open="true"] .fcr-panel{opacity:1;pointer-events:auto;transform:translate(0,-50%)}',

    '.fcr-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:11px}',
    '.fcr-eyebrow{font-size:9px;font-weight:800;letter-spacing:2px;color:#5cc4ee}',
    '.fcr-close{display:grid;place-items:center;width:22px;height:22px;padding:0;border:0;border-radius:7px;',
    'background:rgba(255,255,255,.07);color:rgba(255,255,255,.62);cursor:pointer;transition:background .16s ease,color .16s ease}',
    '.fcr-close:hover{background:rgba(255,255,255,.14);color:#fff}',
    '.fcr-close svg{width:11px;height:11px;fill:none;stroke:currentColor;stroke-width:2.1;stroke-linecap:round}',

    '.fcr-title{margin:0 0 10px;font-size:13px;font-weight:600;line-height:1.55;color:rgba(255,255,255,.95)}',
    '.fcr-scope{display:flex;align-items:center;gap:7px;margin:0 0 13px;font-size:10.5px;font-weight:600;',
    'letter-spacing:.3px;color:#5cc4ee}',
    '.fcr-scope i{width:5px;height:5px;border-radius:50%;background:#5cc4ee;box-shadow:0 0 0 3px rgba(92,196,238,.16);flex:none}',

    '.fcr-action{display:flex;align-items:center;justify-content:center;gap:9px;width:100%;height:43px;padding:0 14px;',
    'border:0;border-radius:11px;background:linear-gradient(135deg,#25ade6,#1577a8);color:#fff;',
    'font-family:inherit;font-size:12.5px;font-weight:800;letter-spacing:.2px;cursor:pointer;',
    'transition:filter .16s ease,background .24s ease,transform .12s ease}',
    '.fcr-action:hover{filter:brightness(1.07)}',
    '.fcr-action:active{transform:scale(.985)}',
    '.fcr-action:disabled{cursor:progress}',
    '.fcr-action svg{width:16px;height:16px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;flex:none}',

    '.fcr[data-status="copied"] .fcr-action{background:linear-gradient(135deg,#1fbf87,#128a63)}',
    '.fcr[data-status="failed"] .fcr-action{background:linear-gradient(135deg,#e2685f,#b03a33)}',
    '.fcr[data-status="copying"] .fcr-action svg{animation:fcr-spin .9s linear infinite}',
    '@keyframes fcr-spin{to{transform:rotate(360deg)}}',

    '.fcr-hint{margin:11px 0 0;font-size:10.5px;line-height:1.62;color:rgba(255,255,255,.55)}',
    '.fcr-hint kbd{font-family:inherit;font-size:10px;font-weight:700;color:rgba(255,255,255,.82);',
    'background:rgba(255,255,255,.13);border-radius:4px;padding:1px 4px}',

    /* 截图期间：隐藏自身，并把缩放的画布还原成原始尺寸 */
    'html.is-figma-capturing .fcr{display:none!important}',
    'html.is-figma-capturing .slide{transform:none!important;left:0!important;top:0!important}',
    'html.is-figma-capturing{--s:1!important;--stage-s:1!important}',

    '@media (max-width:720px){',
    '.fcr-tab{width:38px;padding:13px 0 12px}',
    '.fcr-panel{width:min(276px,calc(100vw - 72px))}',
    '}',
  ].join('')

  /* -------------------------------------------------------------- 剪贴板桥 */

  function copyHtmlWithExecCommand(html) {
    return new Promise(function (resolve, reject) {
      var onCopy = function (event) {
        if (!event.clipboardData) {
          reject(new Error('剪贴板不可用'))
          return
        }
        event.preventDefault()
        event.clipboardData.setData('text/html', html)
        event.clipboardData.setData('text/plain', '24iFM Figma payload')
      }
      document.addEventListener('copy', onCopy)
      try {
        var ok = document.execCommand('copy')
        if (!ok) reject(new Error('浏览器阻止了复制操作'))
        else resolve()
      } catch (err) {
        reject(err)
      } finally {
        document.removeEventListener('copy', onCopy)
      }
    })
  }

  function installClipboardBridge() {
    var clipboard = navigator.clipboard
    if (!clipboard) throw new Error('当前环境不支持剪贴板')

    var resolveCopied = null
    var rejectCopied = null
    var copied = new Promise(function (resolve, reject) {
      resolveCopied = resolve
      rejectCopied = reject
    })

    var originalWrite = clipboard.write
    var originalWriteText = clipboard.writeText

    clipboard.write = function (items) {
      return Promise.all(
        items.map(function (item) {
          var out = { html: '', plain: '' }
          var tasks = []
          if (item.types.indexOf('text/html') > -1) {
            tasks.push(item.getType('text/html').then(function (b) { return b.text() }).then(function (t) { out.html = t }))
          }
          if (item.types.indexOf('text/plain') > -1) {
            tasks.push(item.getType('text/plain').then(function (b) { return b.text() }).then(function (t) { out.plain = t }))
          }
          return Promise.all(tasks).then(function () { return out })
        })
      ).then(function (parts) {
        var html = parts.map(function (p) { return p.html }).join('')
        var plain = parts.map(function (p) { return p.plain }).join('')
        return copyHtmlWithExecCommand(html || plain).then(
          function () { resolveCopied && resolveCopied() },
          function (err) { rejectCopied && rejectCopied(err); throw err }
        )
      })
    }

    clipboard.writeText = function (text) {
      return copyHtmlWithExecCommand(text).then(
        function () { resolveCopied && resolveCopied() },
        function (err) { rejectCopied && rejectCopied(err); throw err }
      )
    }

    return {
      copied: copied,
      restore: function () {
        clipboard.write = originalWrite
        clipboard.writeText = originalWriteText
      },
    }
  }

  /* ----------------------------------------------------------- capture 脚本 */

  function ensureCaptureScript() {
    if (window.figma && window.figma.captureForDesign) return Promise.resolve()
    if (captureScriptPromise) return captureScriptPromise

    captureScriptPromise = new Promise(function (resolve, reject) {
      var script = document.createElement('script')
      script.src = CAPTURE_SRC + '?v=' + Date.now()
      script.async = true
      script.addEventListener('load', function () {
        if (window.figma && window.figma.captureForDesign) resolve()
        else reject(new Error('capture 脚本已加载但未提供接口'))
      })
      script.addEventListener('error', function () {
        captureScriptPromise = null
        reject(new Error('capture.js 加载失败'))
      })
      document.head.appendChild(script)
    })

    return captureScriptPromise
  }

  /* ------------------------------------------------------------- 取截图目标 */

  function slideList() {
    return Array.prototype.filter.call(
      document.querySelectorAll('.slide'),
      function (node) { return node.offsetWidth > 240 && node.offsetHeight > 240 }
    )
  }

  function pickTarget() {
    var explicit = document.querySelector('[data-figma-frame]')
    if (explicit) return explicit

    var slides = slideList()
    if (slides.length) {
      var mid = window.innerHeight / 2
      var best = null
      slides.forEach(function (node) {
        var rect = node.getBoundingClientRect()
        var distance = Math.abs(rect.top + rect.height / 2 - mid)
        if (!best || distance < best.distance) best = { node: node, distance: distance }
      })
      return best.node
    }

    return document.querySelector('#root') || document.body
  }

  function describeTarget(target) {
    var slides = slideList()
    if (slides.length > 1) {
      var index = slides.indexOf(target)
      if (index > -1) {
        var no = (index + 1 < 10 ? '0' : '') + (index + 1)
        return '第 ' + no + ' 屏 · 共 ' + slides.length + ' 屏'
      }
    }
    return '整个页面'
  }

  // 让目标里的懒加载图片先就位，否则会粘出空白占位
  function primeImages(target) {
    if (!target.querySelectorAll) return Promise.resolve()

    var waiting = []
    Array.prototype.forEach.call(target.querySelectorAll('img'), function (img) {
      if (img.loading === 'lazy') img.loading = 'eager'
      if (img.complete && img.naturalWidth) return
      waiting.push(
        new Promise(function (resolve) {
          var done = function () { resolve() }
          img.addEventListener('load', done, { once: true })
          img.addEventListener('error', done, { once: true })
          window.setTimeout(done, 1600)
        })
      )
    })

    if (!waiting.length) return Promise.resolve()
    return Promise.race([
      Promise.all(waiting),
      new Promise(function (resolve) { window.setTimeout(resolve, 1400) }),
    ])
  }

  function nextFrames() {
    return new Promise(function (resolve) {
      requestAnimationFrame(function () {
        requestAnimationFrame(function () { resolve() })
      })
    })
  }

  /* ---------------------------------------------------------------- DOM */

  function buildStyle() {
    if (document.getElementById('fcr-style')) return
    var style = document.createElement('style')
    style.id = 'fcr-style'
    style.textContent = CSS
    document.head.appendChild(style)
  }

  function buildRail() {
    var rail = document.createElement('div')
    rail.className = 'fcr'
    rail.setAttribute('data-open', 'false')
    rail.setAttribute('data-status', 'idle')
    rail.innerHTML =
      '<button class="fcr-tab" type="button" aria-expanded="false" aria-controls="fcr-panel" title="复制为 Figma 图层">' +
      '<span class="fcr-tab-icon">' + COPY_ICON + '</span><b>COPY</b>' +
      '</button>' +
      '<div class="fcr-panel" id="fcr-panel" role="dialog" aria-label="复制为 Figma 图层">' +
      '<div class="fcr-top"><span class="fcr-eyebrow">COPY TO FIGMA</span>' +
      '<button class="fcr-close" type="button" aria-label="收起">' + CLOSE_ICON + '</button></div>' +
      '<p class="fcr-title">把当前页面复制成可编辑图层</p>' +
      '<p class="fcr-scope"><i></i><span>整个页面</span></p>' +
      '<button class="fcr-action" type="button"><span class="fcr-action-icon">' + COPY_ICON + '</span>' +
      '<span class="fcr-action-text">Copy 复制</span></button>' +
      '<p class="fcr-hint">复制后到 Figma 画布按 <kbd>⌘V</kbd> / <kbd>Ctrl V</kbd> 粘贴，层级与文字都会保留。</p>' +
      '</div>'
    document.body.appendChild(rail)
    return rail
  }

  function boot() {
    buildStyle()
    var rail = buildRail()

    var tab = rail.querySelector('.fcr-tab')
    var close = rail.querySelector('.fcr-close')
    var action = rail.querySelector('.fcr-action')
    var actionText = rail.querySelector('.fcr-action-text')
    var actionIcon = rail.querySelector('.fcr-action-icon')
    var title = rail.querySelector('.fcr-title')
    var scope = rail.querySelector('.fcr-scope span')

    var setOpen = function (open) {
      rail.setAttribute('data-open', open ? 'true' : 'false')
      tab.setAttribute('aria-expanded', open ? 'true' : 'false')
      // 收起时把状态复位，避免下次打开残留“已复制”
      if (open) scope.textContent = describeTarget(pickTarget())
      else setStatus('idle')
    }

    var setStatus = function (status, message) {
      rail.setAttribute('data-status', status)
      if (status === 'idle') {
        action.disabled = false
        actionIcon.innerHTML = COPY_ICON
        actionText.textContent = 'Copy 复制'
        title.textContent = '把当前页面复制成可编辑图层'
      } else if (status === 'copying') {
        action.disabled = true
        actionIcon.innerHTML = COPY_ICON
        actionText.textContent = '正在生成图层…'
      } else if (status === 'copied') {
        action.disabled = false
        actionIcon.innerHTML = CHECK_ICON
        actionText.textContent = '已复制 · 去 Figma 粘贴'
      } else {
        action.disabled = false
        actionIcon.innerHTML = COPY_ICON
        actionText.textContent = '复制失败 · 重试'
        title.textContent = message || '复制失败，请重试'
      }

      if (resetTimer) window.clearTimeout(resetTimer)
      if (status === 'copied' || status === 'failed') {
        resetTimer = window.setTimeout(function () { setStatus('idle') }, RESET_MS)
      }
    }

    var runCopy = function () {
      if (rail.getAttribute('data-status') === 'copying') return

      setStatus('copying')

      var target = pickTarget()
      var root = document.documentElement
      var previousScale = root.style.getPropertyValue('--s')
      var previousStage = root.style.getPropertyValue('--stage-s')
      var bridge = null

      scope.textContent = describeTarget(target)

      primeImages(target)
        .then(function () { return ensureCaptureScript() })
        .then(function () {
          if (!window.figma || typeof window.figma.captureForDesign !== 'function') {
            throw new Error('当前页面无法调用 Figma capture')
          }

          bridge = installClipboardBridge()
          target.setAttribute('data-figma-target', '')
          root.classList.add('is-figma-capturing')
          if (previousScale) root.style.removeProperty('--s')
          if (previousStage) root.style.setProperty('--stage-s', '1')

          return nextFrames().then(function () {
            var result = window.figma.captureForDesign({
              selector: '[data-figma-target]',
              extractSourceData: false,
              verbose: false,
            })

            if (!result || typeof result.then !== 'function') return bridge.copied
            result.catch(function () { /* 失败由下面的 race 统一处理 */ })

            return Promise.race([
              bridge.copied,
              result.then(function (res) {
                if (res && res.success === false) {
                  throw new Error(res.error || 'Figma 序列化失败')
                }
              }),
            ])
          })
        })
        .then(function () {
          setStatus('copied')
        })
        .catch(function (error) {
          var message = error && error.message ? error.message : String(error)
          setStatus('failed', message)
          if (window.console) console.warn('[copy-to-figma]', error)
        })
        .then(function () {
          root.classList.remove('is-figma-capturing')
          target.removeAttribute('data-figma-target')
          if (previousScale) root.style.setProperty('--s', previousScale)
          if (previousStage) root.style.setProperty('--stage-s', previousStage)
          if (bridge) bridge.restore()
        })
    }

    tab.addEventListener('click', function (event) {
      event.stopPropagation()
      setOpen(rail.getAttribute('data-open') !== 'true')
    })

    close.addEventListener('click', function (event) {
      event.stopPropagation()
      setOpen(false)
    })

    action.addEventListener('click', function (event) {
      event.stopPropagation()
      runCopy()
    })

    rail.addEventListener('click', function (event) { event.stopPropagation() })

    document.addEventListener('click', function () {
      if (rail.getAttribute('data-open') === 'true') setOpen(false)
    })

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && rail.getAttribute('data-open') === 'true') setOpen(false)
    })
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot)
  } else {
    boot()
  }
})()
