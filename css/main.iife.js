var Vf = Object.defineProperty;
var Hf = (xr, Se, He) =>
  Se in xr
    ? Vf(xr, Se, { enumerable: !0, configurable: !0, writable: !0, value: He })
    : (xr[Se] = He);
var Ve = (xr, Se, He) => (Hf(xr, typeof Se != "symbol" ? Se + "" : Se, He), He);
(function () {
  "use strict";
  var xr =
      typeof globalThis < "u"
        ? globalThis
        : typeof window < "u"
          ? window
          : typeof global < "u"
            ? global
            : typeof self < "u"
              ? self
              : {},
    Se = { exports: {} };
  function He() {}
  (He.prototype = {
    on: function (o, t, r) {
      var e = this.e || (this.e = {});
      return (e[o] || (e[o] = [])).push({ fn: t, ctx: r }), this;
    },
    once: function (o, t, r) {
      var e = this;
      function i() {
        e.off(o, i), t.apply(r, arguments);
      }
      return (i._ = t), this.on(o, i, r);
    },
    emit: function (o) {
      var t = [].slice.call(arguments, 1),
        r = ((this.e || (this.e = {}))[o] || []).slice(),
        e = 0,
        i = r.length;
      for (e; e < i; e++) r[e].fn.apply(r[e].ctx, t);
      return this;
    },
    off: function (o, t) {
      var r = this.e || (this.e = {}),
        e = r[o],
        i = [];
      if (e && t)
        for (var n = 0, s = e.length; n < s; n++)
          e[n].fn !== t && e[n].fn._ !== t && i.push(e[n]);
      return i.length ? (r[o] = i) : delete r[o], this;
    },
  }),
    (Se.exports = He),
    (Se.exports.TinyEmitter = He);
  var ho = { exports: {} };
  (function (o, t) {
    (function (r, e) {
      o.exports = e();
    })(xr, function () {
      var r = 0;
      function e(p) {
        return "__private_" + r++ + "_" + p;
      }
      function i(p, g) {
        if (!Object.prototype.hasOwnProperty.call(p, g))
          throw new TypeError("attempted to use private field on non-instance");
        return p;
      }
      function n() {}
      n.prototype = {
        on: function (p, g, v) {
          var y = this.e || (this.e = {});
          return (y[p] || (y[p] = [])).push({ fn: g, ctx: v }), this;
        },
        once: function (p, g, v) {
          var y = this;
          function w() {
            y.off(p, w), g.apply(v, arguments);
          }
          return (w._ = g), this.on(p, w, v);
        },
        emit: function (p) {
          for (
            var g = [].slice.call(arguments, 1),
              v = ((this.e || (this.e = {}))[p] || []).slice(),
              y = 0,
              w = v.length;
            y < w;
            y++
          )
            v[y].fn.apply(v[y].ctx, g);
          return this;
        },
        off: function (p, g) {
          var v = this.e || (this.e = {}),
            y = v[p],
            w = [];
          if (y && g)
            for (var m = 0, x = y.length; m < x; m++)
              y[m].fn !== g && y[m].fn._ !== g && w.push(y[m]);
          return w.length ? (v[p] = w) : delete v[p], this;
        },
      };
      var s = n;
      s.TinyEmitter = n;
      var a,
        u = "virtualscroll",
        l = e("options"),
        f = e("el"),
        d = e("emitter"),
        h = e("event"),
        c = e("touchStart"),
        _ = e("bodyTouchAction");
      return (function () {
        function p(v) {
          var y = this;
          Object.defineProperty(this, l, { writable: !0, value: void 0 }),
            Object.defineProperty(this, f, { writable: !0, value: void 0 }),
            Object.defineProperty(this, d, { writable: !0, value: void 0 }),
            Object.defineProperty(this, h, { writable: !0, value: void 0 }),
            Object.defineProperty(this, c, { writable: !0, value: void 0 }),
            Object.defineProperty(this, _, { writable: !0, value: void 0 }),
            (this._onWheel = function (w) {
              var m = i(y, l)[l],
                x = i(y, h)[h];
              (x.deltaX = w.wheelDeltaX || -1 * w.deltaX),
                (x.deltaY = w.wheelDeltaY || -1 * w.deltaY),
                a.isFirefox &&
                  w.deltaMode === 1 &&
                  ((x.deltaX *= m.firefoxMultiplier),
                  (x.deltaY *= m.firefoxMultiplier)),
                (x.deltaX *= m.mouseMultiplier),
                (x.deltaY *= m.mouseMultiplier),
                y._notify(w);
            }),
            (this._onMouseWheel = function (w) {
              var m = i(y, h)[h];
              (m.deltaX = w.wheelDeltaX ? w.wheelDeltaX : 0),
                (m.deltaY = w.wheelDeltaY ? w.wheelDeltaY : w.wheelDelta),
                y._notify(w);
            }),
            (this._onTouchStart = function (w) {
              var m = w.targetTouches ? w.targetTouches[0] : w;
              (i(y, c)[c].x = m.pageX), (i(y, c)[c].y = m.pageY);
            }),
            (this._onTouchMove = function (w) {
              var m = i(y, l)[l];
              m.preventTouch &&
                !w.target.classList.contains(m.unpreventTouchClass) &&
                w.preventDefault();
              var x = i(y, h)[h],
                C = w.targetTouches ? w.targetTouches[0] : w;
              (x.deltaX = (C.pageX - i(y, c)[c].x) * m.touchMultiplier),
                (x.deltaY = (C.pageY - i(y, c)[c].y) * m.touchMultiplier),
                (i(y, c)[c].x = C.pageX),
                (i(y, c)[c].y = C.pageY),
                y._notify(w);
            }),
            (this._onKeyDown = function (w) {
              var m = i(y, h)[h];
              m.deltaX = m.deltaY = 0;
              var x = window.innerHeight - 40;
              switch (w.keyCode) {
                case 37:
                case 38:
                  m.deltaY = i(y, l)[l].keyStep;
                  break;
                case 39:
                case 40:
                  m.deltaY = -i(y, l)[l].keyStep;
                  break;
                case 32:
                  m.deltaY = x * (w.shiftKey ? 1 : -1);
                  break;
                default:
                  return;
              }
              y._notify(w);
            }),
            (i(this, f)[f] = window),
            v && v.el && ((i(this, f)[f] = v.el), delete v.el),
            a ||
              (a = {
                hasWheelEvent: "onwheel" in document,
                hasMouseWheelEvent: "onmousewheel" in document,
                hasTouch: "ontouchstart" in document,
                hasTouchWin:
                  navigator.msMaxTouchPoints && navigator.msMaxTouchPoints > 1,
                hasPointer: !!window.navigator.msPointerEnabled,
                hasKeyDown: "onkeydown" in document,
                isFirefox: navigator.userAgent.indexOf("Firefox") > -1,
              }),
            (i(this, l)[l] = Object.assign(
              {
                mouseMultiplier: 1,
                touchMultiplier: 2,
                firefoxMultiplier: 15,
                keyStep: 120,
                preventTouch: !1,
                unpreventTouchClass: "vs-touchmove-allowed",
                useKeyboard: !0,
                useTouch: !0,
              },
              v,
            )),
            (i(this, d)[d] = new s()),
            (i(this, h)[h] = { y: 0, x: 0, deltaX: 0, deltaY: 0 }),
            (i(this, c)[c] = { x: null, y: null }),
            (i(this, _)[_] = null),
            i(this, l)[l].passive !== void 0 &&
              (this.listenerOptions = { passive: i(this, l)[l].passive });
        }
        var g = p.prototype;
        return (
          (g._notify = function (v) {
            var y = i(this, h)[h];
            (y.x += y.deltaX),
              (y.y += y.deltaY),
              i(this, d)[d].emit(u, {
                x: y.x,
                y: y.y,
                deltaX: y.deltaX,
                deltaY: y.deltaY,
                originalEvent: v,
              });
          }),
          (g._bind = function () {
            a.hasWheelEvent &&
              i(this, f)[f].addEventListener(
                "wheel",
                this._onWheel,
                this.listenerOptions,
              ),
              a.hasMouseWheelEvent &&
                i(this, f)[f].addEventListener(
                  "mousewheel",
                  this._onMouseWheel,
                  this.listenerOptions,
                ),
              a.hasTouch &&
                i(this, l)[l].useTouch &&
                (i(this, f)[f].addEventListener(
                  "touchstart",
                  this._onTouchStart,
                  this.listenerOptions,
                ),
                i(this, f)[f].addEventListener(
                  "touchmove",
                  this._onTouchMove,
                  this.listenerOptions,
                )),
              a.hasPointer &&
                a.hasTouchWin &&
                ((i(this, _)[_] = document.body.style.msTouchAction),
                (document.body.style.msTouchAction = "none"),
                i(this, f)[f].addEventListener(
                  "MSPointerDown",
                  this._onTouchStart,
                  !0,
                ),
                i(this, f)[f].addEventListener(
                  "MSPointerMove",
                  this._onTouchMove,
                  !0,
                )),
              a.hasKeyDown &&
                i(this, l)[l].useKeyboard &&
                document.addEventListener("keydown", this._onKeyDown);
          }),
          (g._unbind = function () {
            a.hasWheelEvent &&
              i(this, f)[f].removeEventListener("wheel", this._onWheel),
              a.hasMouseWheelEvent &&
                i(this, f)[f].removeEventListener(
                  "mousewheel",
                  this._onMouseWheel,
                ),
              a.hasTouch &&
                (i(this, f)[f].removeEventListener(
                  "touchstart",
                  this._onTouchStart,
                ),
                i(this, f)[f].removeEventListener(
                  "touchmove",
                  this._onTouchMove,
                )),
              a.hasPointer &&
                a.hasTouchWin &&
                ((document.body.style.msTouchAction = i(this, _)[_]),
                i(this, f)[f].removeEventListener(
                  "MSPointerDown",
                  this._onTouchStart,
                  !0,
                ),
                i(this, f)[f].removeEventListener(
                  "MSPointerMove",
                  this._onTouchMove,
                  !0,
                )),
              a.hasKeyDown &&
                i(this, l)[l].useKeyboard &&
                document.removeEventListener("keydown", this._onKeyDown);
          }),
          (g.on = function (v, y) {
            i(this, d)[d].on(u, v, y);
            var w = i(this, d)[d].e;
            w && w[u] && w[u].length === 1 && this._bind();
          }),
          (g.off = function (v, y) {
            i(this, d)[d].off(u, v, y);
            var w = i(this, d)[d].e;
            (!w[u] || w[u].length <= 0) && this._unbind();
          }),
          (g.destroy = function () {
            i(this, d)[d].off(), this._unbind();
          }),
          p
        );
      })();
    });
  })(ho);
  const Ll = ho.exports;
  function po(o, t) {
    for (var r = 0; r < t.length; r++) {
      var e = t[r];
      (e.enumerable = e.enumerable || !1),
        (e.configurable = !0),
        "value" in e && (e.writable = !0),
        Object.defineProperty(o, e.key, e);
    }
  }
  function _o(o, t, r) {
    return (
      t && po(o.prototype, t),
      r && po(o, r),
      Object.defineProperty(o, "prototype", { writable: !1 }),
      o
    );
  }
  function bi() {
    return (
      (bi = Object.assign
        ? Object.assign.bind()
        : function (o) {
            for (var t = 1; t < arguments.length; t++) {
              var r = arguments[t];
              for (var e in r)
                Object.prototype.hasOwnProperty.call(r, e) && (o[e] = r[e]);
            }
            return o;
          }),
      bi.apply(this, arguments)
    );
  }
  function Un(o, t) {
    return (
      (Un = Object.setPrototypeOf
        ? Object.setPrototypeOf.bind()
        : function (r, e) {
            return (r.__proto__ = e), r;
          }),
      Un(o, t)
    );
  }
  function go(o, t) {
    var r = o % t;
    return r < 0 && (r += t), r;
  }
  var zl = ["duration", "easing"],
    Nl = (function () {
      function o() {}
      var t = o.prototype;
      return (
        (t.to = function (r, e) {
          var i = this,
            n = e === void 0 ? {} : e,
            s = n.duration,
            a = s === void 0 ? 1 : s,
            u = n.easing,
            l =
              u === void 0
                ? function (d) {
                    return d;
                  }
                : u,
            f = (function (d, h) {
              if (d == null) return {};
              var c,
                _,
                p = {},
                g = Object.keys(d);
              for (_ = 0; _ < g.length; _++)
                h.indexOf((c = g[_])) >= 0 || (p[c] = d[c]);
              return p;
            })(n, zl);
          (this.target = r),
            (this.fromKeys = bi({}, f)),
            (this.toKeys = bi({}, f)),
            (this.keys = Object.keys(bi({}, f))),
            this.keys.forEach(function (d) {
              i.fromKeys[d] = r[d];
            }),
            (this.duration = a),
            (this.easing = l),
            (this.currentTime = 0),
            (this.isRunning = !0);
        }),
        (t.stop = function () {
          this.isRunning = !1;
        }),
        (t.raf = function (r) {
          var e = this;
          if (this.isRunning) {
            this.currentTime = Math.min(this.currentTime + r, this.duration);
            var i = this.easing(this.progress);
            this.keys.forEach(function (n) {
              var s = e.fromKeys[n];
              e.target[n] = s + (e.toKeys[n] - s) * i;
            }),
              i === 1 && this.stop();
          }
        }),
        _o(o, [
          {
            key: "progress",
            get: function () {
              return this.currentTime / this.duration;
            },
          },
        ]),
        o
      );
    })(),
    Fl = (function (o) {
      var t, r;
      function e(n) {
        var s,
          a,
          u,
          l,
          f = n === void 0 ? {} : n,
          d = f.duration,
          h = d === void 0 ? 1.2 : d,
          c = f.easing,
          _ =
            c === void 0
              ? function (N) {
                  return Math.min(1, 1.001 - Math.pow(2, -10 * N));
                }
              : c,
          p = f.smooth,
          g = p === void 0 || p,
          v = f.mouseMultiplier,
          y = v === void 0 ? 1 : v,
          w = f.smoothTouch,
          m = w !== void 0 && w,
          x = f.touchMultiplier,
          C = x === void 0 ? 2 : x,
          S = f.direction,
          k = S === void 0 ? "vertical" : S,
          O = f.gestureDirection,
          M = O === void 0 ? "vertical" : O,
          E = f.infinite,
          D = E !== void 0 && E,
          X = f.wrapper,
          W = X === void 0 ? window : X,
          $ = f.content,
          z = $ === void 0 ? document.body : $;
        ((l = o.call(this) || this).onWindowResize = function () {
          (l.wrapperWidth = window.innerWidth),
            (l.wrapperHeight = window.innerHeight);
        }),
          (l.onWrapperResize = function (N) {
            var V = N[0];
            if (V) {
              var b = V.contentRect;
              (l.wrapperWidth = b.width), (l.wrapperHeight = b.height);
            }
          }),
          (l.onContentResize = function (N) {
            var V = N[0];
            if (V) {
              var b = V.contentRect;
              (l.contentWidth = b.width), (l.contentHeight = b.height);
            }
          }),
          (l.onVirtualScroll = function (N) {
            var V = N.deltaY,
              b = N.deltaX,
              et = N.originalEvent,
              Pt = !!et.composedPath().find(function (re) {
                return re.hasAttribute && re.hasAttribute("data-lenis-prevent");
              });
            et.ctrlKey ||
              Pt ||
              ((l.smooth = et.changedTouches
                ? l.smoothTouch
                : l.options.smooth),
              l.stopped
                ? et.preventDefault()
                : l.smooth &&
                  et.buttons !== 4 &&
                  (l.smooth && et.preventDefault(),
                  (l.targetScroll -=
                    l.gestureDirection === "both"
                      ? b + V
                      : l.gestureDirection === "horizontal"
                        ? b
                        : V),
                  l.scrollTo(l.targetScroll)));
          }),
          (l.onScroll = function (N) {
            (l.isScrolling && l.smooth) ||
              ((l.targetScroll =
                l.scroll =
                l.lastScroll =
                  l.wrapperNode[l.scrollProperty]),
              l.notify());
          }),
          (window.lenisVersion = "0.2.19"),
          (l.options = {
            duration: h,
            easing: _,
            smooth: g,
            mouseMultiplier: y,
            smoothTouch: m,
            touchMultiplier: C,
            direction: k,
            gestureDirection: M,
            infinite: D,
            wrapper: W,
            content: z,
          }),
          (l.duration = h),
          (l.easing = _),
          (l.smooth = g),
          (l.mouseMultiplier = y),
          (l.smoothTouch = m),
          (l.touchMultiplier = C),
          (l.direction = k),
          (l.gestureDirection = M),
          (l.infinite = D),
          (l.wrapperNode = W),
          (l.contentNode = z),
          l.wrapperNode.addEventListener("scroll", l.onScroll),
          l.wrapperNode === window
            ? (l.wrapperNode.addEventListener("resize", l.onWindowResize),
              l.onWindowResize())
            : ((l.wrapperHeight = l.wrapperNode.offsetHeight),
              (l.wrapperWidth = l.wrapperNode.offsetWidth),
              (l.wrapperObserver = new ResizeObserver(l.onWrapperResize)),
              l.wrapperObserver.observe(l.wrapperNode)),
          (l.contentHeight = l.contentNode.offsetHeight),
          (l.contentWidth = l.contentNode.offsetWidth),
          (l.contentObserver = new ResizeObserver(l.onContentResize)),
          l.contentObserver.observe(l.contentNode),
          (l.targetScroll =
            l.scroll =
            l.lastScroll =
              l.wrapperNode[l.scrollProperty]),
          (l.animate = new Nl());
        var B =
          ((s = navigator) == null || (a = s.userAgentData) == null
            ? void 0
            : a.platform) ||
          ((u = navigator) == null ? void 0 : u.platform) ||
          "unknown";
        return (
          (l.virtualScroll = new Ll({
            el: l.wrapperNode,
            firefoxMultiplier: 50,
            mouseMultiplier:
              l.mouseMultiplier * (B.includes("Win") ? 0.84 : 0.4),
            useKeyboard: !1,
            touchMultiplier: l.touchMultiplier,
            useTouch: !0,
            passive: !1,
          })),
          l.virtualScroll.on(l.onVirtualScroll),
          l
        );
      }
      (r = o),
        ((t = e).prototype = Object.create(r.prototype)),
        (t.prototype.constructor = t),
        Un(t, r);
      var i = e.prototype;
      return (
        (i.start = function () {
          this.stopped = !1;
        }),
        (i.stop = function () {
          (this.stopped = !0), this.animate.stop();
        }),
        (i.destroy = function () {
          var n;
          this.wrapperNode === window &&
            this.wrapperNode.removeEventListener("resize", this.onWindowResize),
            this.wrapperNode.removeEventListener("scroll", this.onScroll),
            this.virtualScroll.destroy(),
            (n = this.wrapperObserver) == null || n.disconnect(),
            this.contentObserver.disconnect();
        }),
        (i.raf = function (n) {
          var s = n - (this.now || 0);
          (this.now = n),
            !this.stopped &&
              this.smooth &&
              ((this.lastScroll = this.scroll),
              this.animate.raf(0.001 * s),
              this.scroll === this.targetScroll &&
                (this.lastScroll = this.scroll),
              this.isScrolling && (this.setScroll(this.scroll), this.notify()),
              (this.isScrolling = this.scroll !== this.targetScroll));
        }),
        (i.setScroll = function (n) {
          var s = this.infinite ? go(n, this.limit) : n;
          this.direction === "horizontal"
            ? this.wrapperNode.scrollTo(s, 0)
            : this.wrapperNode.scrollTo(0, s);
        }),
        (i.notify = function () {
          var n = this.infinite ? go(this.scroll, this.limit) : this.scroll;
          this.emit("scroll", {
            scroll: n,
            limit: this.limit,
            velocity: this.velocity,
            direction: this.direction,
            progress: n / this.limit,
          });
        }),
        (i.scrollTo = function (n, s) {
          var a = s === void 0 ? {} : s,
            u = a.offset,
            l = u === void 0 ? 0 : u,
            f = a.immediate,
            d = f !== void 0 && f,
            h = a.duration,
            c = h === void 0 ? this.duration : h,
            _ = a.easing,
            p = _ === void 0 ? this.easing : _;
          if (n != null) {
            var g;
            if (typeof n == "number") g = n;
            else if (n === "top" || n === "#top") g = 0;
            else if (n === "bottom") g = this.limit;
            else {
              var v;
              if (typeof n == "string") v = document.querySelector(n);
              else {
                if (n == null || !n.nodeType) return;
                v = n;
              }
              if (!v) return;
              var y = 0;
              if (this.wrapperNode !== window) {
                var w = this.wrapperNode.getBoundingClientRect();
                y = this.direction === "horizontal" ? w.left : w.top;
              }
              var m = v.getBoundingClientRect();
              g =
                (this.direction === "horizontal" ? m.left : m.top) +
                this.scroll -
                y;
            }
            (g += l),
              (this.targetScroll = this.infinite
                ? g
                : Math.max(0, Math.min(g, this.limit))),
              !this.smooth || d
                ? ((this.scroll = this.lastScroll = this.targetScroll),
                  this.setScroll(this.targetScroll))
                : this.animate.to(this, {
                    duration: c,
                    easing: p,
                    scroll: this.targetScroll,
                  });
          }
        }),
        _o(e, [
          {
            key: "scrollProperty",
            get: function () {
              return this.wrapperNode === window
                ? this.direction === "horizontal"
                  ? "scrollX"
                  : "scrollY"
                : this.direction === "horizontal"
                  ? "scrollLeft"
                  : "scrollTop";
            },
          },
          {
            key: "limit",
            get: function () {
              return this.direction === "horizontal"
                ? this.contentWidth - this.wrapperWidth
                : this.contentHeight - this.wrapperHeight;
            },
          },
          {
            key: "velocity",
            get: function () {
              return this.scroll - this.lastScroll;
            },
          },
        ]),
        e
      );
    })(Se.exports);
  function Ue(o) {
    if (o === void 0)
      throw new ReferenceError(
        "this hasn't been initialised - super() hasn't been called",
      );
    return o;
  }
  function mo(o, t) {
    (o.prototype = Object.create(t.prototype)),
      (o.prototype.constructor = o),
      (o.__proto__ = t);
  }
  /*!
   * GSAP 3.11.3
   * https://greensock.com
   *
   * @license Copyright 2008-2022, GreenSock. All rights reserved.
   * Subject to the terms at https://greensock.com/standard-license or for
   * Club GreenSock members, the agreement issued with that membership.
   * @author: Jack Doyle, jack@greensock.com
   */ var ie = {
      autoSleep: 120,
      force3D: "auto",
      nullTargetWarn: 1,
      units: { lineHeight: "" },
    },
    Gr = { duration: 0.5, overwrite: !1, delay: 0 },
    qn,
    jt,
    gt,
    _e = 1e8,
    Q = 1 / _e,
    Gn = Math.PI * 2,
    $l = Gn / 4,
    Wl = 0,
    yo = Math.sqrt,
    Il = Math.cos,
    Yl = Math.sin,
    St = function (t) {
      return typeof t == "string";
    },
    at = function (t) {
      return typeof t == "function";
    },
    qe = function (t) {
      return typeof t == "number";
    },
    jn = function (t) {
      return typeof t > "u";
    },
    De = function (t) {
      return typeof t == "object";
    },
    Kt = function (t) {
      return t !== !1;
    },
    vo = function () {
      return typeof window < "u";
    },
    nn = function (t) {
      return at(t) || St(t);
    },
    wo =
      (typeof ArrayBuffer == "function" && ArrayBuffer.isView) ||
      function () {},
    At = Array.isArray,
    Kn = /(?:-?\.?\d|\.)+/gi,
    bo = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,
    jr = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g,
    Zn = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,
    xo = /[+-]=-?[.\d]+/,
    To = /[^,'"\[\]\s]+/gi,
    Bl = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,
    nt,
    ge,
    Qn,
    Jn,
    ne = {},
    sn = {},
    So,
    Co = function (t) {
      return (sn = Sr(t, ne)) && ae;
    },
    ts = function (t, r) {
      return console.warn(
        "Invalid property",
        t,
        "set to",
        r,
        "Missing plugin? gsap.registerPlugin()",
      );
    },
    on = function (t, r) {
      return !r && console.warn(t);
    },
    Po = function (t, r) {
      return (t && (ne[t] = r) && sn && (sn[t] = r)) || ne;
    },
    xi = function () {
      return 0;
    },
    Xl = { suppressEvents: !0, isStart: !0, kill: !1 },
    an = { suppressEvents: !0, kill: !1 },
    Vl = { suppressEvents: !0 },
    es = {},
    ir = [],
    rs = {},
    Oo,
    se = {},
    is = {},
    ko = 30,
    ln = [],
    ns = "",
    ss = function (t) {
      var r = t[0],
        e,
        i;
      if ((De(r) || at(r) || (t = [t]), !(e = (r._gsap || {}).harness))) {
        for (i = ln.length; i-- && !ln[i].targetTest(r); );
        e = ln[i];
      }
      for (i = t.length; i--; )
        (t[i] && (t[i]._gsap || (t[i]._gsap = new ea(t[i], e)))) ||
          t.splice(i, 1);
      return t;
    },
    Tr = function (t) {
      return t._gsap || ss(ve(t))[0]._gsap;
    },
    Mo = function (t, r, e) {
      return (e = t[r]) && at(e)
        ? t[r]()
        : (jn(e) && t.getAttribute && t.getAttribute(r)) || e;
    },
    Zt = function (t, r) {
      return (t = t.split(",")).forEach(r) || t;
    },
    dt = function (t) {
      return Math.round(t * 1e5) / 1e5 || 0;
    },
    Mt = function (t) {
      return Math.round(t * 1e7) / 1e7 || 0;
    },
    Kr = function (t, r) {
      var e = r.charAt(0),
        i = parseFloat(r.substr(2));
      return (
        (t = parseFloat(t)),
        e === "+" ? t + i : e === "-" ? t - i : e === "*" ? t * i : t / i
      );
    },
    Hl = function (t, r) {
      for (var e = r.length, i = 0; t.indexOf(r[i]) < 0 && ++i < e; );
      return i < e;
    },
    un = function () {
      var t = ir.length,
        r = ir.slice(0),
        e,
        i;
      for (rs = {}, ir.length = 0, e = 0; e < t; e++)
        (i = r[e]),
          i && i._lazy && (i.render(i._lazy[0], i._lazy[1], !0)._lazy = 0);
    },
    Eo = function (t, r, e, i) {
      ir.length && un(),
        t.render(r, e, i || (jt && r < 0 && (t._initted || t._startAt))),
        ir.length && un();
    },
    Do = function (t) {
      var r = parseFloat(t);
      return (r || r === 0) && (t + "").match(To).length < 2
        ? r
        : St(t)
          ? t.trim()
          : t;
    },
    Ao = function (t) {
      return t;
    },
    me = function (t, r) {
      for (var e in r) e in t || (t[e] = r[e]);
      return t;
    },
    Ul = function (t) {
      return function (r, e) {
        for (var i in e)
          i in r || (i === "duration" && t) || i === "ease" || (r[i] = e[i]);
      };
    },
    Sr = function (t, r) {
      for (var e in r) t[e] = r[e];
      return t;
    },
    Ro = function o(t, r) {
      for (var e in r)
        e !== "__proto__" &&
          e !== "constructor" &&
          e !== "prototype" &&
          (t[e] = De(r[e]) ? o(t[e] || (t[e] = {}), r[e]) : r[e]);
      return t;
    },
    fn = function (t, r) {
      var e = {},
        i;
      for (i in t) i in r || (e[i] = t[i]);
      return e;
    },
    Ti = function (t) {
      var r = t.parent || nt,
        e = t.keyframes ? Ul(At(t.keyframes)) : me;
      if (Kt(t.inherit))
        for (; r; ) e(t, r.vars.defaults), (r = r.parent || r._dp);
      return t;
    },
    ql = function (t, r) {
      for (var e = t.length, i = e === r.length; i && e-- && t[e] === r[e]; );
      return e < 0;
    },
    Lo = function (t, r, e, i, n) {
      e === void 0 && (e = "_first"), i === void 0 && (i = "_last");
      var s = t[i],
        a;
      if (n) for (a = r[n]; s && s[n] > a; ) s = s._prev;
      return (
        s
          ? ((r._next = s._next), (s._next = r))
          : ((r._next = t[e]), (t[e] = r)),
        r._next ? (r._next._prev = r) : (t[i] = r),
        (r._prev = s),
        (r.parent = r._dp = t),
        r
      );
    },
    cn = function (t, r, e, i) {
      e === void 0 && (e = "_first"), i === void 0 && (i = "_last");
      var n = r._prev,
        s = r._next;
      n ? (n._next = s) : t[e] === r && (t[e] = s),
        s ? (s._prev = n) : t[i] === r && (t[i] = n),
        (r._next = r._prev = r.parent = null);
    },
    nr = function (t, r) {
      t.parent && (!r || t.parent.autoRemoveChildren) && t.parent.remove(t),
        (t._act = 0);
    },
    Cr = function (t, r) {
      if (t && (!r || r._end > t._dur || r._start < 0))
        for (var e = t; e; ) (e._dirty = 1), (e = e.parent);
      return t;
    },
    Gl = function (t) {
      for (var r = t.parent; r && r.parent; )
        (r._dirty = 1), r.totalDuration(), (r = r.parent);
      return t;
    },
    os = function (t, r, e, i) {
      return (
        t._startAt &&
        (jt
          ? t._startAt.revert(an)
          : (t.vars.immediateRender && !t.vars.autoRevert) ||
            t._startAt.render(r, !0, i))
      );
    },
    jl = function o(t) {
      return !t || (t._ts && o(t.parent));
    },
    zo = function (t) {
      return t._repeat ? Zr(t._tTime, (t = t.duration() + t._rDelay)) * t : 0;
    },
    Zr = function (t, r) {
      var e = Math.floor((t /= r));
      return t && e === t ? e - 1 : e;
    },
    hn = function (t, r) {
      return (
        (t - r._start) * r._ts +
        (r._ts >= 0 ? 0 : r._dirty ? r.totalDuration() : r._tDur)
      );
    },
    dn = function (t) {
      return (t._end = Mt(
        t._start + (t._tDur / Math.abs(t._ts || t._rts || Q) || 0),
      ));
    },
    pn = function (t, r) {
      var e = t._dp;
      return (
        e &&
          e.smoothChildTiming &&
          t._ts &&
          ((t._start = Mt(
            e._time -
              (t._ts > 0
                ? r / t._ts
                : ((t._dirty ? t.totalDuration() : t._tDur) - r) / -t._ts),
          )),
          dn(t),
          e._dirty || Cr(e, t)),
        t
      );
    },
    No = function (t, r) {
      var e;
      if (
        ((r._time || (r._initted && !r._dur)) &&
          ((e = hn(t.rawTime(), r)),
          (!r._dur || Ci(0, r.totalDuration(), e) - r._tTime > Q) &&
            r.render(e, !0)),
        Cr(t, r)._dp && t._initted && t._time >= t._dur && t._ts)
      ) {
        if (t._dur < t.duration())
          for (e = t; e._dp; )
            e.rawTime() >= 0 && e.totalTime(e._tTime), (e = e._dp);
        t._zTime = -Q;
      }
    },
    Ae = function (t, r, e, i) {
      return (
        r.parent && nr(r),
        (r._start = Mt(
          (qe(e) ? e : e || t !== nt ? ye(t, e, r) : t._time) + r._delay,
        )),
        (r._end = Mt(
          r._start + (r.totalDuration() / Math.abs(r.timeScale()) || 0),
        )),
        Lo(t, r, "_first", "_last", t._sort ? "_start" : 0),
        as(r) || (t._recent = r),
        i || No(t, r),
        t._ts < 0 && pn(t, t._tTime),
        t
      );
    },
    Fo = function (t, r) {
      return (
        (ne.ScrollTrigger || ts("scrollTrigger", r)) &&
        ne.ScrollTrigger.create(r, t)
      );
    },
    $o = function (t, r, e, i, n) {
      if ((gs(t, r, n), !t._initted)) return 1;
      if (
        !e &&
        t._pt &&
        !jt &&
        ((t._dur && t.vars.lazy !== !1) || (!t._dur && t.vars.lazy)) &&
        Oo !== oe.frame
      )
        return ir.push(t), (t._lazy = [n, i]), 1;
    },
    Kl = function o(t) {
      var r = t.parent;
      return r && r._ts && r._initted && !r._lock && (r.rawTime() < 0 || o(r));
    },
    as = function (t) {
      var r = t.data;
      return r === "isFromStart" || r === "isStart";
    },
    Zl = function (t, r, e, i) {
      var n = t.ratio,
        s =
          r < 0 ||
          (!r &&
            ((!t._start && Kl(t) && !(!t._initted && as(t))) ||
              ((t._ts < 0 || t._dp._ts < 0) && !as(t))))
            ? 0
            : 1,
        a = t._rDelay,
        u = 0,
        l,
        f,
        d;
      if (
        (a &&
          t._repeat &&
          ((u = Ci(0, t._tDur, r)),
          (f = Zr(u, a)),
          t._yoyo && f & 1 && (s = 1 - s),
          f !== Zr(t._tTime, a) &&
            ((n = 1 - s),
            t.vars.repeatRefresh && t._initted && t.invalidate())),
        s !== n || jt || i || t._zTime === Q || (!r && t._zTime))
      ) {
        if (!t._initted && $o(t, r, i, e, u)) return;
        for (
          d = t._zTime,
            t._zTime = r || (e ? Q : 0),
            e || (e = r && !d),
            t.ratio = s,
            t._from && (s = 1 - s),
            t._time = 0,
            t._tTime = u,
            l = t._pt;
          l;

        )
          l.r(s, l.d), (l = l._next);
        r < 0 && os(t, r, e, !0),
          t._onUpdate && !e && we(t, "onUpdate"),
          u && t._repeat && !e && t.parent && we(t, "onRepeat"),
          (r >= t._tDur || r < 0) &&
            t.ratio === s &&
            (s && nr(t, 1),
            !e &&
              !jt &&
              (we(t, s ? "onComplete" : "onReverseComplete", !0),
              t._prom && t._prom()));
      } else t._zTime || (t._zTime = r);
    },
    Ql = function (t, r, e) {
      var i;
      if (e > r)
        for (i = t._first; i && i._start <= e; ) {
          if (i.data === "isPause" && i._start > r) return i;
          i = i._next;
        }
      else
        for (i = t._last; i && i._start >= e; ) {
          if (i.data === "isPause" && i._start < r) return i;
          i = i._prev;
        }
    },
    Qr = function (t, r, e, i) {
      var n = t._repeat,
        s = Mt(r) || 0,
        a = t._tTime / t._tDur;
      return (
        a && !i && (t._time *= s / t._dur),
        (t._dur = s),
        (t._tDur = n ? (n < 0 ? 1e10 : Mt(s * (n + 1) + t._rDelay * n)) : s),
        a > 0 && !i && pn(t, (t._tTime = t._tDur * a)),
        t.parent && dn(t),
        e || Cr(t.parent, t),
        t
      );
    },
    Wo = function (t) {
      return t instanceof Qt ? Cr(t) : Qr(t, t._dur);
    },
    Jl = { _start: 0, endTime: xi, totalDuration: xi },
    ye = function o(t, r, e) {
      var i = t.labels,
        n = t._recent || Jl,
        s = t.duration() >= _e ? n.endTime(!1) : t._dur,
        a,
        u,
        l;
      return St(r) && (isNaN(r) || r in i)
        ? ((u = r.charAt(0)),
          (l = r.substr(-1) === "%"),
          (a = r.indexOf("=")),
          u === "<" || u === ">"
            ? (a >= 0 && (r = r.replace(/=/, "")),
              (u === "<" ? n._start : n.endTime(n._repeat >= 0)) +
                (parseFloat(r.substr(1)) || 0) *
                  (l ? (a < 0 ? n : e).totalDuration() / 100 : 1))
            : a < 0
              ? (r in i || (i[r] = s), i[r])
              : ((u = parseFloat(r.charAt(a - 1) + r.substr(a + 1))),
                l && e && (u = (u / 100) * (At(e) ? e[0] : e).totalDuration()),
                a > 1 ? o(t, r.substr(0, a - 1), e) + u : s + u))
        : r == null
          ? s
          : +r;
    },
    Si = function (t, r, e) {
      var i = qe(r[1]),
        n = (i ? 2 : 1) + (t < 2 ? 0 : 1),
        s = r[n],
        a,
        u;
      if ((i && (s.duration = r[1]), (s.parent = e), t)) {
        for (a = s, u = e; u && !("immediateRender" in a); )
          (a = u.vars.defaults || {}), (u = Kt(u.vars.inherit) && u.parent);
        (s.immediateRender = Kt(a.immediateRender)),
          t < 2 ? (s.runBackwards = 1) : (s.startAt = r[n - 1]);
      }
      return new wt(r[0], s, r[n + 1]);
    },
    sr = function (t, r) {
      return t || t === 0 ? r(t) : r;
    },
    Ci = function (t, r, e) {
      return e < t ? t : e > r ? r : e;
    },
    Rt = function (t, r) {
      return !St(t) || !(r = Bl.exec(t)) ? "" : r[1];
    },
    tu = function (t, r, e) {
      return sr(e, function (i) {
        return Ci(t, r, i);
      });
    },
    ls = [].slice,
    Io = function (t, r) {
      return (
        t &&
        De(t) &&
        "length" in t &&
        ((!r && !t.length) || (t.length - 1 in t && De(t[0]))) &&
        !t.nodeType &&
        t !== ge
      );
    },
    eu = function (t, r, e) {
      return (
        e === void 0 && (e = []),
        t.forEach(function (i) {
          var n;
          return (St(i) && !r) || Io(i, 1)
            ? (n = e).push.apply(n, ve(i))
            : e.push(i);
        }) || e
      );
    },
    ve = function (t, r, e) {
      return gt && !r && gt.selector
        ? gt.selector(t)
        : St(t) && !e && (Qn || !ti())
          ? ls.call((r || Jn).querySelectorAll(t), 0)
          : At(t)
            ? eu(t, e)
            : Io(t)
              ? ls.call(t, 0)
              : t
                ? [t]
                : [];
    },
    us = function (t) {
      return (
        (t = ve(t)[0] || on("Invalid scope") || {}),
        function (r) {
          var e = t.current || t.nativeElement || t;
          return ve(
            r,
            e.querySelectorAll
              ? e
              : e === t
                ? on("Invalid scope") || Jn.createElement("div")
                : t,
          );
        }
      );
    },
    Yo = function (t) {
      return t.sort(function () {
        return 0.5 - Math.random();
      });
    },
    Bo = function (t) {
      if (at(t)) return t;
      var r = De(t) ? t : { each: t },
        e = Pr(r.ease),
        i = r.from || 0,
        n = parseFloat(r.base) || 0,
        s = {},
        a = i > 0 && i < 1,
        u = isNaN(i) || a,
        l = r.axis,
        f = i,
        d = i;
      return (
        St(i)
          ? (f = d = { center: 0.5, edges: 0.5, end: 1 }[i] || 0)
          : !a && u && ((f = i[0]), (d = i[1])),
        function (h, c, _) {
          var p = (_ || r).length,
            g = s[p],
            v,
            y,
            w,
            m,
            x,
            C,
            S,
            k,
            O;
          if (!g) {
            if (((O = r.grid === "auto" ? 0 : (r.grid || [1, _e])[1]), !O)) {
              for (
                S = -_e;
                S < (S = _[O++].getBoundingClientRect().left) && O < p;

              );
              O--;
            }
            for (
              g = s[p] = [],
                v = u ? Math.min(O, p) * f - 0.5 : i % O,
                y = O === _e ? 0 : u ? (p * d) / O - 0.5 : (i / O) | 0,
                S = 0,
                k = _e,
                C = 0;
              C < p;
              C++
            )
              (w = (C % O) - v),
                (m = y - ((C / O) | 0)),
                (g[C] = x =
                  l ? Math.abs(l === "y" ? m : w) : yo(w * w + m * m)),
                x > S && (S = x),
                x < k && (k = x);
            i === "random" && Yo(g),
              (g.max = S - k),
              (g.min = k),
              (g.v = p =
                (parseFloat(r.amount) ||
                  parseFloat(r.each) *
                    (O > p
                      ? p - 1
                      : l
                        ? l === "y"
                          ? p / O
                          : O
                        : Math.max(O, p / O)) ||
                  0) * (i === "edges" ? -1 : 1)),
              (g.b = p < 0 ? n - p : n),
              (g.u = Rt(r.amount || r.each) || 0),
              (e = e && p < 0 ? Qo(e) : e);
          }
          return (
            (p = (g[h] - g.min) / g.max || 0),
            Mt(g.b + (e ? e(p) : p) * g.v) + g.u
          );
        }
      );
    },
    fs = function (t) {
      var r = Math.pow(10, ((t + "").split(".")[1] || "").length);
      return function (e) {
        var i = Mt(Math.round(parseFloat(e) / t) * t * r);
        return (i - (i % 1)) / r + (qe(e) ? 0 : Rt(e));
      };
    },
    Xo = function (t, r) {
      var e = At(t),
        i,
        n;
      return (
        !e &&
          De(t) &&
          ((i = e = t.radius || _e),
          t.values
            ? ((t = ve(t.values)), (n = !qe(t[0])) && (i *= i))
            : (t = fs(t.increment))),
        sr(
          r,
          e
            ? at(t)
              ? function (s) {
                  return (n = t(s)), Math.abs(n - s) <= i ? n : s;
                }
              : function (s) {
                  for (
                    var a = parseFloat(n ? s.x : s),
                      u = parseFloat(n ? s.y : 0),
                      l = _e,
                      f = 0,
                      d = t.length,
                      h,
                      c;
                    d--;

                  )
                    n
                      ? ((h = t[d].x - a),
                        (c = t[d].y - u),
                        (h = h * h + c * c))
                      : (h = Math.abs(t[d] - a)),
                      h < l && ((l = h), (f = d));
                  return (
                    (f = !i || l <= i ? t[f] : s),
                    n || f === s || qe(s) ? f : f + Rt(s)
                  );
                }
            : fs(t),
        )
      );
    },
    Vo = function (t, r, e, i) {
      return sr(At(t) ? !r : e === !0 ? !!(e = 0) : !i, function () {
        return At(t)
          ? t[~~(Math.random() * t.length)]
          : (e = e || 1e-5) &&
              (i = e < 1 ? Math.pow(10, (e + "").length - 2) : 1) &&
              Math.floor(
                Math.round(
                  (t - e / 2 + Math.random() * (r - t + e * 0.99)) / e,
                ) *
                  e *
                  i,
              ) / i;
      });
    },
    ru = function () {
      for (var t = arguments.length, r = new Array(t), e = 0; e < t; e++)
        r[e] = arguments[e];
      return function (i) {
        return r.reduce(function (n, s) {
          return s(n);
        }, i);
      };
    },
    iu = function (t, r) {
      return function (e) {
        return t(parseFloat(e)) + (r || Rt(e));
      };
    },
    nu = function (t, r, e) {
      return Uo(t, r, 0, 1, e);
    },
    Ho = function (t, r, e) {
      return sr(e, function (i) {
        return t[~~r(i)];
      });
    },
    su = function o(t, r, e) {
      var i = r - t;
      return At(t)
        ? Ho(t, o(0, t.length), r)
        : sr(e, function (n) {
            return ((i + ((n - t) % i)) % i) + t;
          });
    },
    ou = function o(t, r, e) {
      var i = r - t,
        n = i * 2;
      return At(t)
        ? Ho(t, o(0, t.length - 1), r)
        : sr(e, function (s) {
            return (s = (n + ((s - t) % n)) % n || 0), t + (s > i ? n - s : s);
          });
    },
    Pi = function (t) {
      for (var r = 0, e = "", i, n, s, a; ~(i = t.indexOf("random(", r)); )
        (s = t.indexOf(")", i)),
          (a = t.charAt(i + 7) === "["),
          (n = t.substr(i + 7, s - i - 7).match(a ? To : Kn)),
          (e +=
            t.substr(r, i - r) +
            Vo(a ? n : +n[0], a ? 0 : +n[1], +n[2] || 1e-5)),
          (r = s + 1);
      return e + t.substr(r, t.length - r);
    },
    Uo = function (t, r, e, i, n) {
      var s = r - t,
        a = i - e;
      return sr(n, function (u) {
        return e + (((u - t) / s) * a || 0);
      });
    },
    au = function o(t, r, e, i) {
      var n = isNaN(t + r)
        ? 0
        : function (c) {
            return (1 - c) * t + c * r;
          };
      if (!n) {
        var s = St(t),
          a = {},
          u,
          l,
          f,
          d,
          h;
        if ((e === !0 && (i = 1) && (e = null), s))
          (t = { p: t }), (r = { p: r });
        else if (At(t) && !At(r)) {
          for (f = [], d = t.length, h = d - 2, l = 1; l < d; l++)
            f.push(o(t[l - 1], t[l]));
          d--,
            (n = function (_) {
              _ *= d;
              var p = Math.min(h, ~~_);
              return f[p](_ - p);
            }),
            (e = r);
        } else i || (t = Sr(At(t) ? [] : {}, t));
        if (!f) {
          for (u in r) ps.call(a, t, u, "get", r[u]);
          n = function (_) {
            return vs(_, a) || (s ? t.p : t);
          };
        }
      }
      return sr(e, n);
    },
    qo = function (t, r, e) {
      var i = t.labels,
        n = _e,
        s,
        a,
        u;
      for (s in i)
        (a = i[s] - r),
          a < 0 == !!e && a && n > (a = Math.abs(a)) && ((u = s), (n = a));
      return u;
    },
    we = function (t, r, e) {
      var i = t.vars,
        n = i[r],
        s = gt,
        a = t._ctx,
        u,
        l,
        f;
      if (!!n)
        return (
          (u = i[r + "Params"]),
          (l = i.callbackScope || t),
          e && ir.length && un(),
          a && (gt = a),
          (f = u ? n.apply(l, u) : n.call(l)),
          (gt = s),
          f
        );
    },
    Oi = function (t) {
      return (
        nr(t),
        t.scrollTrigger && t.scrollTrigger.kill(!!jt),
        t.progress() < 1 && we(t, "onInterrupt"),
        t
      );
    },
    Jr,
    lu = function (t) {
      t = (!t.name && t.default) || t;
      var r = t.name,
        e = at(t),
        i =
          r && !e && t.init
            ? function () {
                this._props = [];
              }
            : t,
        n = {
          init: xi,
          render: vs,
          add: ps,
          kill: Su,
          modifier: Tu,
          rawVars: 0,
        },
        s = { targetTest: 0, get: 0, getSetter: ys, aliases: {}, register: 0 };
      if ((ti(), t !== i)) {
        if (se[r]) return;
        me(i, me(fn(t, n), s)),
          Sr(i.prototype, Sr(n, fn(t, s))),
          (se[(i.prop = r)] = i),
          t.targetTest && (ln.push(i), (es[r] = 1)),
          (r =
            (r === "css" ? "CSS" : r.charAt(0).toUpperCase() + r.substr(1)) +
            "Plugin");
      }
      Po(r, i), t.register && t.register(ae, i, Jt);
    },
    J = 255,
    ki = {
      aqua: [0, J, J],
      lime: [0, J, 0],
      silver: [192, 192, 192],
      black: [0, 0, 0],
      maroon: [128, 0, 0],
      teal: [0, 128, 128],
      blue: [0, 0, J],
      navy: [0, 0, 128],
      white: [J, J, J],
      olive: [128, 128, 0],
      yellow: [J, J, 0],
      orange: [J, 165, 0],
      gray: [128, 128, 128],
      purple: [128, 0, 128],
      green: [0, 128, 0],
      red: [J, 0, 0],
      pink: [J, 192, 203],
      cyan: [0, J, J],
      transparent: [J, J, J, 0],
    },
    cs = function (t, r, e) {
      return (
        (t += t < 0 ? 1 : t > 1 ? -1 : 0),
        ((t * 6 < 1
          ? r + (e - r) * t * 6
          : t < 0.5
            ? e
            : t * 3 < 2
              ? r + (e - r) * (2 / 3 - t) * 6
              : r) *
          J +
          0.5) |
          0
      );
    },
    Go = function (t, r, e) {
      var i = t ? (qe(t) ? [t >> 16, (t >> 8) & J, t & J] : 0) : ki.black,
        n,
        s,
        a,
        u,
        l,
        f,
        d,
        h,
        c,
        _;
      if (!i) {
        if ((t.substr(-1) === "," && (t = t.substr(0, t.length - 1)), ki[t]))
          i = ki[t];
        else if (t.charAt(0) === "#") {
          if (
            (t.length < 6 &&
              ((n = t.charAt(1)),
              (s = t.charAt(2)),
              (a = t.charAt(3)),
              (t =
                "#" +
                n +
                n +
                s +
                s +
                a +
                a +
                (t.length === 5 ? t.charAt(4) + t.charAt(4) : ""))),
            t.length === 9)
          )
            return (
              (i = parseInt(t.substr(1, 6), 16)),
              [i >> 16, (i >> 8) & J, i & J, parseInt(t.substr(7), 16) / 255]
            );
          (t = parseInt(t.substr(1), 16)), (i = [t >> 16, (t >> 8) & J, t & J]);
        } else if (t.substr(0, 3) === "hsl") {
          if (((i = _ = t.match(Kn)), !r))
            (u = (+i[0] % 360) / 360),
              (l = +i[1] / 100),
              (f = +i[2] / 100),
              (s = f <= 0.5 ? f * (l + 1) : f + l - f * l),
              (n = f * 2 - s),
              i.length > 3 && (i[3] *= 1),
              (i[0] = cs(u + 1 / 3, n, s)),
              (i[1] = cs(u, n, s)),
              (i[2] = cs(u - 1 / 3, n, s));
          else if (~t.indexOf("="))
            return (i = t.match(bo)), e && i.length < 4 && (i[3] = 1), i;
        } else i = t.match(Kn) || ki.transparent;
        i = i.map(Number);
      }
      return (
        r &&
          !_ &&
          ((n = i[0] / J),
          (s = i[1] / J),
          (a = i[2] / J),
          (d = Math.max(n, s, a)),
          (h = Math.min(n, s, a)),
          (f = (d + h) / 2),
          d === h
            ? (u = l = 0)
            : ((c = d - h),
              (l = f > 0.5 ? c / (2 - d - h) : c / (d + h)),
              (u =
                d === n
                  ? (s - a) / c + (s < a ? 6 : 0)
                  : d === s
                    ? (a - n) / c + 2
                    : (n - s) / c + 4),
              (u *= 60)),
          (i[0] = ~~(u + 0.5)),
          (i[1] = ~~(l * 100 + 0.5)),
          (i[2] = ~~(f * 100 + 0.5))),
        e && i.length < 4 && (i[3] = 1),
        i
      );
    },
    jo = function (t) {
      var r = [],
        e = [],
        i = -1;
      return (
        t.split(or).forEach(function (n) {
          var s = n.match(jr) || [];
          r.push.apply(r, s), e.push((i += s.length + 1));
        }),
        (r.c = e),
        r
      );
    },
    Ko = function (t, r, e) {
      var i = "",
        n = (t + i).match(or),
        s = r ? "hsla(" : "rgba(",
        a = 0,
        u,
        l,
        f,
        d;
      if (!n) return t;
      if (
        ((n = n.map(function (h) {
          return (
            (h = Go(h, r, 1)) &&
            s +
              (r
                ? h[0] + "," + h[1] + "%," + h[2] + "%," + h[3]
                : h.join(",")) +
              ")"
          );
        })),
        e && ((f = jo(t)), (u = e.c), u.join(i) !== f.c.join(i)))
      )
        for (l = t.replace(or, "1").split(jr), d = l.length - 1; a < d; a++)
          i +=
            l[a] +
            (~u.indexOf(a)
              ? n.shift() || s + "0,0,0,0)"
              : (f.length ? f : n.length ? n : e).shift());
      if (!l)
        for (l = t.split(or), d = l.length - 1; a < d; a++) i += l[a] + n[a];
      return i + l[d];
    },
    or = (function () {
      var o =
          "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",
        t;
      for (t in ki) o += "|" + t + "\\b";
      return new RegExp(o + ")", "gi");
    })(),
    uu = /hsl[a]?\(/,
    Zo = function (t) {
      var r = t.join(" "),
        e;
      if (((or.lastIndex = 0), or.test(r)))
        return (
          (e = uu.test(r)),
          (t[1] = Ko(t[1], e)),
          (t[0] = Ko(t[0], e, jo(t[1]))),
          !0
        );
    },
    Mi,
    oe = (function () {
      var o = Date.now,
        t = 500,
        r = 33,
        e = o(),
        i = e,
        n = 1e3 / 240,
        s = n,
        a = [],
        u,
        l,
        f,
        d,
        h,
        c,
        _ = function p(g) {
          var v = o() - i,
            y = g === !0,
            w,
            m,
            x,
            C;
          if (
            (v > t && (e += v - r),
            (i += v),
            (x = i - e),
            (w = x - s),
            (w > 0 || y) &&
              ((C = ++d.frame),
              (h = x - d.time * 1e3),
              (d.time = x = x / 1e3),
              (s += w + (w >= n ? 4 : n - w)),
              (m = 1)),
            y || (u = l(p)),
            m)
          )
            for (c = 0; c < a.length; c++) a[c](x, h, C, g);
        };
      return (
        (d = {
          time: 0,
          frame: 0,
          tick: function () {
            _(!0);
          },
          deltaRatio: function (g) {
            return h / (1e3 / (g || 60));
          },
          wake: function () {
            So &&
              (!Qn &&
                vo() &&
                ((ge = Qn = window),
                (Jn = ge.document || {}),
                (ne.gsap = ae),
                (ge.gsapVersions || (ge.gsapVersions = [])).push(ae.version),
                Co(sn || ge.GreenSockGlobals || (!ge.gsap && ge) || {}),
                (f = ge.requestAnimationFrame)),
              u && d.sleep(),
              (l =
                f ||
                function (g) {
                  return setTimeout(g, (s - d.time * 1e3 + 1) | 0);
                }),
              (Mi = 1),
              _(2));
          },
          sleep: function () {
            (f ? ge.cancelAnimationFrame : clearTimeout)(u), (Mi = 0), (l = xi);
          },
          lagSmoothing: function (g, v) {
            (t = g || 1 / Q), (r = Math.min(v, t, 0));
          },
          fps: function (g) {
            (n = 1e3 / (g || 240)), (s = d.time * 1e3 + n);
          },
          add: function (g, v, y) {
            var w = v
              ? function (m, x, C, S) {
                  g(m, x, C, S), d.remove(w);
                }
              : g;
            return d.remove(g), a[y ? "unshift" : "push"](w), ti(), w;
          },
          remove: function (g, v) {
            ~(v = a.indexOf(g)) && a.splice(v, 1) && c >= v && c--;
          },
          _listeners: a,
        }),
        d
      );
    })(),
    ti = function () {
      return !Mi && oe.wake();
    },
    H = {},
    fu = /^[\d.\-M][\d.\-,\s]/,
    cu = /["']/g,
    hu = function (t) {
      for (
        var r = {},
          e = t.substr(1, t.length - 3).split(":"),
          i = e[0],
          n = 1,
          s = e.length,
          a,
          u,
          l;
        n < s;
        n++
      )
        (u = e[n]),
          (a = n !== s - 1 ? u.lastIndexOf(",") : u.length),
          (l = u.substr(0, a)),
          (r[i] = isNaN(l) ? l.replace(cu, "").trim() : +l),
          (i = u.substr(a + 1).trim());
      return r;
    },
    du = function (t) {
      var r = t.indexOf("(") + 1,
        e = t.indexOf(")"),
        i = t.indexOf("(", r);
      return t.substring(r, ~i && i < e ? t.indexOf(")", e + 1) : e);
    },
    pu = function (t) {
      var r = (t + "").split("("),
        e = H[r[0]];
      return e && r.length > 1 && e.config
        ? e.config.apply(
            null,
            ~t.indexOf("{") ? [hu(r[1])] : du(t).split(",").map(Do),
          )
        : H._CE && fu.test(t)
          ? H._CE("", t)
          : e;
    },
    Qo = function (t) {
      return function (r) {
        return 1 - t(1 - r);
      };
    },
    Jo = function o(t, r) {
      for (var e = t._first, i; e; )
        e instanceof Qt
          ? o(e, r)
          : e.vars.yoyoEase &&
            (!e._yoyo || !e._repeat) &&
            e._yoyo !== r &&
            (e.timeline
              ? o(e.timeline, r)
              : ((i = e._ease),
                (e._ease = e._yEase),
                (e._yEase = i),
                (e._yoyo = r))),
          (e = e._next);
    },
    Pr = function (t, r) {
      return (t && (at(t) ? t : H[t] || pu(t))) || r;
    },
    Or = function (t, r, e, i) {
      e === void 0 &&
        (e = function (u) {
          return 1 - r(1 - u);
        }),
        i === void 0 &&
          (i = function (u) {
            return u < 0.5 ? r(u * 2) / 2 : 1 - r((1 - u) * 2) / 2;
          });
      var n = { easeIn: r, easeOut: e, easeInOut: i },
        s;
      return (
        Zt(t, function (a) {
          (H[a] = ne[a] = n), (H[(s = a.toLowerCase())] = e);
          for (var u in n)
            H[
              s + (u === "easeIn" ? ".in" : u === "easeOut" ? ".out" : ".inOut")
            ] = H[a + "." + u] = n[u];
        }),
        n
      );
    },
    ta = function (t) {
      return function (r) {
        return r < 0.5 ? (1 - t(1 - r * 2)) / 2 : 0.5 + t((r - 0.5) * 2) / 2;
      };
    },
    hs = function o(t, r, e) {
      var i = r >= 1 ? r : 1,
        n = (e || (t ? 0.3 : 0.45)) / (r < 1 ? r : 1),
        s = (n / Gn) * (Math.asin(1 / i) || 0),
        a = function (f) {
          return f === 1 ? 1 : i * Math.pow(2, -10 * f) * Yl((f - s) * n) + 1;
        },
        u =
          t === "out"
            ? a
            : t === "in"
              ? function (l) {
                  return 1 - a(1 - l);
                }
              : ta(a);
      return (
        (n = Gn / n),
        (u.config = function (l, f) {
          return o(t, l, f);
        }),
        u
      );
    },
    ds = function o(t, r) {
      r === void 0 && (r = 1.70158);
      var e = function (s) {
          return s ? --s * s * ((r + 1) * s + r) + 1 : 0;
        },
        i =
          t === "out"
            ? e
            : t === "in"
              ? function (n) {
                  return 1 - e(1 - n);
                }
              : ta(e);
      return (
        (i.config = function (n) {
          return o(t, n);
        }),
        i
      );
    };
  Zt("Linear,Quad,Cubic,Quart,Quint,Strong", function (o, t) {
    var r = t < 5 ? t + 1 : t;
    Or(
      o + ",Power" + (r - 1),
      t
        ? function (e) {
            return Math.pow(e, r);
          }
        : function (e) {
            return e;
          },
      function (e) {
        return 1 - Math.pow(1 - e, r);
      },
      function (e) {
        return e < 0.5
          ? Math.pow(e * 2, r) / 2
          : 1 - Math.pow((1 - e) * 2, r) / 2;
      },
    );
  }),
    (H.Linear.easeNone = H.none = H.Linear.easeIn),
    Or("Elastic", hs("in"), hs("out"), hs()),
    (function (o, t) {
      var r = 1 / t,
        e = 2 * r,
        i = 2.5 * r,
        n = function (a) {
          return a < r
            ? o * a * a
            : a < e
              ? o * Math.pow(a - 1.5 / t, 2) + 0.75
              : a < i
                ? o * (a -= 2.25 / t) * a + 0.9375
                : o * Math.pow(a - 2.625 / t, 2) + 0.984375;
        };
      Or(
        "Bounce",
        function (s) {
          return 1 - n(1 - s);
        },
        n,
      );
    })(7.5625, 2.75),
    Or("Expo", function (o) {
      return o ? Math.pow(2, 10 * (o - 1)) : 0;
    }),
    Or("Circ", function (o) {
      return -(yo(1 - o * o) - 1);
    }),
    Or("Sine", function (o) {
      return o === 1 ? 1 : -Il(o * $l) + 1;
    }),
    Or("Back", ds("in"), ds("out"), ds()),
    (H.SteppedEase =
      H.steps =
      ne.SteppedEase =
        {
          config: function (t, r) {
            t === void 0 && (t = 1);
            var e = 1 / t,
              i = t + (r ? 0 : 1),
              n = r ? 1 : 0,
              s = 1 - Q;
            return function (a) {
              return (((i * Ci(0, s, a)) | 0) + n) * e;
            };
          },
        }),
    (Gr.ease = H["quad.out"]),
    Zt(
      "onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",
      function (o) {
        return (ns += o + "," + o + "Params,");
      },
    );
  var ea = function (t, r) {
      (this.id = Wl++),
        (t._gsap = this),
        (this.target = t),
        (this.harness = r),
        (this.get = r ? r.get : Mo),
        (this.set = r ? r.getSetter : ys);
    },
    ei = (function () {
      function o(r) {
        (this.vars = r),
          (this._delay = +r.delay || 0),
          (this._repeat = r.repeat === 1 / 0 ? -2 : r.repeat || 0) &&
            ((this._rDelay = r.repeatDelay || 0),
            (this._yoyo = !!r.yoyo || !!r.yoyoEase)),
          (this._ts = 1),
          Qr(this, +r.duration, 1, 1),
          (this.data = r.data),
          gt && ((this._ctx = gt), gt.data.push(this)),
          Mi || oe.wake();
      }
      var t = o.prototype;
      return (
        (t.delay = function (e) {
          return e || e === 0
            ? (this.parent &&
                this.parent.smoothChildTiming &&
                this.startTime(this._start + e - this._delay),
              (this._delay = e),
              this)
            : this._delay;
        }),
        (t.duration = function (e) {
          return arguments.length
            ? this.totalDuration(
                this._repeat > 0 ? e + (e + this._rDelay) * this._repeat : e,
              )
            : this.totalDuration() && this._dur;
        }),
        (t.totalDuration = function (e) {
          return arguments.length
            ? ((this._dirty = 0),
              Qr(
                this,
                this._repeat < 0
                  ? e
                  : (e - this._repeat * this._rDelay) / (this._repeat + 1),
              ))
            : this._tDur;
        }),
        (t.totalTime = function (e, i) {
          if ((ti(), !arguments.length)) return this._tTime;
          var n = this._dp;
          if (n && n.smoothChildTiming && this._ts) {
            for (
              pn(this, e), !n._dp || n.parent || No(n, this);
              n && n.parent;

            )
              n.parent._time !==
                n._start +
                  (n._ts >= 0
                    ? n._tTime / n._ts
                    : (n.totalDuration() - n._tTime) / -n._ts) &&
                n.totalTime(n._tTime, !0),
                (n = n.parent);
            !this.parent &&
              this._dp.autoRemoveChildren &&
              ((this._ts > 0 && e < this._tDur) ||
                (this._ts < 0 && e > 0) ||
                (!this._tDur && !e)) &&
              Ae(this._dp, this, this._start - this._delay);
          }
          return (
            (this._tTime !== e ||
              (!this._dur && !i) ||
              (this._initted && Math.abs(this._zTime) === Q) ||
              (!e && !this._initted && (this.add || this._ptLookup))) &&
              (this._ts || (this._pTime = e), Eo(this, e, i)),
            this
          );
        }),
        (t.time = function (e, i) {
          return arguments.length
            ? this.totalTime(
                Math.min(this.totalDuration(), e + zo(this)) %
                  (this._dur + this._rDelay) || (e ? this._dur : 0),
                i,
              )
            : this._time;
        }),
        (t.totalProgress = function (e, i) {
          return arguments.length
            ? this.totalTime(this.totalDuration() * e, i)
            : this.totalDuration()
              ? Math.min(1, this._tTime / this._tDur)
              : this.ratio;
        }),
        (t.progress = function (e, i) {
          return arguments.length
            ? this.totalTime(
                this.duration() *
                  (this._yoyo && !(this.iteration() & 1) ? 1 - e : e) +
                  zo(this),
                i,
              )
            : this.duration()
              ? Math.min(1, this._time / this._dur)
              : this.ratio;
        }),
        (t.iteration = function (e, i) {
          var n = this.duration() + this._rDelay;
          return arguments.length
            ? this.totalTime(this._time + (e - 1) * n, i)
            : this._repeat
              ? Zr(this._tTime, n) + 1
              : 1;
        }),
        (t.timeScale = function (e) {
          if (!arguments.length) return this._rts === -Q ? 0 : this._rts;
          if (this._rts === e) return this;
          var i =
            this.parent && this._ts ? hn(this.parent._time, this) : this._tTime;
          return (
            (this._rts = +e || 0),
            (this._ts = this._ps || e === -Q ? 0 : this._rts),
            this.totalTime(Ci(-this._delay, this._tDur, i), !0),
            dn(this),
            Gl(this)
          );
        }),
        (t.paused = function (e) {
          return arguments.length
            ? (this._ps !== e &&
                ((this._ps = e),
                e
                  ? ((this._pTime =
                      this._tTime || Math.max(-this._delay, this.rawTime())),
                    (this._ts = this._act = 0))
                  : (ti(),
                    (this._ts = this._rts),
                    this.totalTime(
                      this.parent && !this.parent.smoothChildTiming
                        ? this.rawTime()
                        : this._tTime || this._pTime,
                      this.progress() === 1 &&
                        Math.abs(this._zTime) !== Q &&
                        (this._tTime -= Q),
                    ))),
              this)
            : this._ps;
        }),
        (t.startTime = function (e) {
          if (arguments.length) {
            this._start = e;
            var i = this.parent || this._dp;
            return (
              i && (i._sort || !this.parent) && Ae(i, this, e - this._delay),
              this
            );
          }
          return this._start;
        }),
        (t.endTime = function (e) {
          return (
            this._start +
            (Kt(e) ? this.totalDuration() : this.duration()) /
              Math.abs(this._ts || 1)
          );
        }),
        (t.rawTime = function (e) {
          var i = this.parent || this._dp;
          return i
            ? e &&
              (!this._ts ||
                (this._repeat && this._time && this.totalProgress() < 1))
              ? this._tTime % (this._dur + this._rDelay)
              : this._ts
                ? hn(i.rawTime(e), this)
                : this._tTime
            : this._tTime;
        }),
        (t.revert = function (e) {
          e === void 0 && (e = Vl);
          var i = jt;
          return (
            (jt = e),
            (this._initted || this._startAt) &&
              (this.timeline && this.timeline.revert(e),
              this.totalTime(-0.01, e.suppressEvents)),
            this.data !== "nested" && e.kill !== !1 && this.kill(),
            (jt = i),
            this
          );
        }),
        (t.globalTime = function (e) {
          for (var i = this, n = arguments.length ? e : i.rawTime(); i; )
            (n = i._start + n / (i._ts || 1)), (i = i._dp);
          return !this.parent && this.vars.immediateRender ? -1 : n;
        }),
        (t.repeat = function (e) {
          return arguments.length
            ? ((this._repeat = e === 1 / 0 ? -2 : e), Wo(this))
            : this._repeat === -2
              ? 1 / 0
              : this._repeat;
        }),
        (t.repeatDelay = function (e) {
          if (arguments.length) {
            var i = this._time;
            return (this._rDelay = e), Wo(this), i ? this.time(i) : this;
          }
          return this._rDelay;
        }),
        (t.yoyo = function (e) {
          return arguments.length ? ((this._yoyo = e), this) : this._yoyo;
        }),
        (t.seek = function (e, i) {
          return this.totalTime(ye(this, e), Kt(i));
        }),
        (t.restart = function (e, i) {
          return this.play().totalTime(e ? -this._delay : 0, Kt(i));
        }),
        (t.play = function (e, i) {
          return e != null && this.seek(e, i), this.reversed(!1).paused(!1);
        }),
        (t.reverse = function (e, i) {
          return (
            e != null && this.seek(e || this.totalDuration(), i),
            this.reversed(!0).paused(!1)
          );
        }),
        (t.pause = function (e, i) {
          return e != null && this.seek(e, i), this.paused(!0);
        }),
        (t.resume = function () {
          return this.paused(!1);
        }),
        (t.reversed = function (e) {
          return arguments.length
            ? (!!e !== this.reversed() &&
                this.timeScale(-this._rts || (e ? -Q : 0)),
              this)
            : this._rts < 0;
        }),
        (t.invalidate = function () {
          return (this._initted = this._act = 0), (this._zTime = -Q), this;
        }),
        (t.isActive = function () {
          var e = this.parent || this._dp,
            i = this._start,
            n;
          return !!(
            !e ||
            (this._ts &&
              this._initted &&
              e.isActive() &&
              (n = e.rawTime(!0)) >= i &&
              n < this.endTime(!0) - Q)
          );
        }),
        (t.eventCallback = function (e, i, n) {
          var s = this.vars;
          return arguments.length > 1
            ? (i
                ? ((s[e] = i),
                  n && (s[e + "Params"] = n),
                  e === "onUpdate" && (this._onUpdate = i))
                : delete s[e],
              this)
            : s[e];
        }),
        (t.then = function (e) {
          var i = this;
          return new Promise(function (n) {
            var s = at(e) ? e : Ao,
              a = function () {
                var l = i.then;
                (i.then = null),
                  at(s) && (s = s(i)) && (s.then || s === i) && (i.then = l),
                  n(s),
                  (i.then = l);
              };
            (i._initted && i.totalProgress() === 1 && i._ts >= 0) ||
            (!i._tTime && i._ts < 0)
              ? a()
              : (i._prom = a);
          });
        }),
        (t.kill = function () {
          Oi(this);
        }),
        o
      );
    })();
  me(ei.prototype, {
    _time: 0,
    _start: 0,
    _end: 0,
    _tTime: 0,
    _tDur: 0,
    _dirty: 0,
    _repeat: 0,
    _yoyo: !1,
    parent: null,
    _initted: !1,
    _rDelay: 0,
    _ts: 1,
    _dp: 0,
    ratio: 0,
    _zTime: -Q,
    _prom: 0,
    _ps: !1,
    _rts: 1,
  });
  var Qt = (function (o) {
    mo(t, o);
    function t(e, i) {
      var n;
      return (
        e === void 0 && (e = {}),
        (n = o.call(this, e) || this),
        (n.labels = {}),
        (n.smoothChildTiming = !!e.smoothChildTiming),
        (n.autoRemoveChildren = !!e.autoRemoveChildren),
        (n._sort = Kt(e.sortChildren)),
        nt && Ae(e.parent || nt, Ue(n), i),
        e.reversed && n.reverse(),
        e.paused && n.paused(!0),
        e.scrollTrigger && Fo(Ue(n), e.scrollTrigger),
        n
      );
    }
    var r = t.prototype;
    return (
      (r.to = function (i, n, s) {
        return Si(0, arguments, this), this;
      }),
      (r.from = function (i, n, s) {
        return Si(1, arguments, this), this;
      }),
      (r.fromTo = function (i, n, s, a) {
        return Si(2, arguments, this), this;
      }),
      (r.set = function (i, n, s) {
        return (
          (n.duration = 0),
          (n.parent = this),
          Ti(n).repeatDelay || (n.repeat = 0),
          (n.immediateRender = !!n.immediateRender),
          new wt(i, n, ye(this, s), 1),
          this
        );
      }),
      (r.call = function (i, n, s) {
        return Ae(this, wt.delayedCall(0, i, n), s);
      }),
      (r.staggerTo = function (i, n, s, a, u, l, f) {
        return (
          (s.duration = n),
          (s.stagger = s.stagger || a),
          (s.onComplete = l),
          (s.onCompleteParams = f),
          (s.parent = this),
          new wt(i, s, ye(this, u)),
          this
        );
      }),
      (r.staggerFrom = function (i, n, s, a, u, l, f) {
        return (
          (s.runBackwards = 1),
          (Ti(s).immediateRender = Kt(s.immediateRender)),
          this.staggerTo(i, n, s, a, u, l, f)
        );
      }),
      (r.staggerFromTo = function (i, n, s, a, u, l, f, d) {
        return (
          (a.startAt = s),
          (Ti(a).immediateRender = Kt(a.immediateRender)),
          this.staggerTo(i, n, a, u, l, f, d)
        );
      }),
      (r.render = function (i, n, s) {
        var a = this._time,
          u = this._dirty ? this.totalDuration() : this._tDur,
          l = this._dur,
          f = i <= 0 ? 0 : Mt(i),
          d = this._zTime < 0 != i < 0 && (this._initted || !l),
          h,
          c,
          _,
          p,
          g,
          v,
          y,
          w,
          m,
          x,
          C,
          S;
        if (
          (this !== nt && f > u && i >= 0 && (f = u),
          f !== this._tTime || s || d)
        ) {
          if (
            (a !== this._time &&
              l &&
              ((f += this._time - a), (i += this._time - a)),
            (h = f),
            (m = this._start),
            (w = this._ts),
            (v = !w),
            d && (l || (a = this._zTime), (i || !n) && (this._zTime = i)),
            this._repeat)
          ) {
            if (
              ((C = this._yoyo),
              (g = l + this._rDelay),
              this._repeat < -1 && i < 0)
            )
              return this.totalTime(g * 100 + i, n, s);
            if (
              ((h = Mt(f % g)),
              f === u
                ? ((p = this._repeat), (h = l))
                : ((p = ~~(f / g)),
                  p && p === f / g && ((h = l), p--),
                  h > l && (h = l)),
              (x = Zr(this._tTime, g)),
              !a && this._tTime && x !== p && (x = p),
              C && p & 1 && ((h = l - h), (S = 1)),
              p !== x && !this._lock)
            ) {
              var k = C && x & 1,
                O = k === (C && p & 1);
              if (
                (p < x && (k = !k),
                (a = k ? 0 : l),
                (this._lock = 1),
                (this.render(a || (S ? 0 : Mt(p * g)), n, !l)._lock = 0),
                (this._tTime = f),
                !n && this.parent && we(this, "onRepeat"),
                this.vars.repeatRefresh && !S && (this.invalidate()._lock = 1),
                (a && a !== this._time) ||
                  v !== !this._ts ||
                  (this.vars.onRepeat && !this.parent && !this._act))
              )
                return this;
              if (
                ((l = this._dur),
                (u = this._tDur),
                O &&
                  ((this._lock = 2),
                  (a = k ? l : -1e-4),
                  this.render(a, !0),
                  this.vars.repeatRefresh && !S && this.invalidate()),
                (this._lock = 0),
                !this._ts && !v)
              )
                return this;
              Jo(this, S);
            }
          }
          if (
            (this._hasPause &&
              !this._forcing &&
              this._lock < 2 &&
              ((y = Ql(this, Mt(a), Mt(h))), y && (f -= h - (h = y._start))),
            (this._tTime = f),
            (this._time = h),
            (this._act = !w),
            this._initted ||
              ((this._onUpdate = this.vars.onUpdate),
              (this._initted = 1),
              (this._zTime = i),
              (a = 0)),
            !a && h && !n && (we(this, "onStart"), this._tTime !== f))
          )
            return this;
          if (h >= a && i >= 0)
            for (c = this._first; c; ) {
              if (
                ((_ = c._next), (c._act || h >= c._start) && c._ts && y !== c)
              ) {
                if (c.parent !== this) return this.render(i, n, s);
                if (
                  (c.render(
                    c._ts > 0
                      ? (h - c._start) * c._ts
                      : (c._dirty ? c.totalDuration() : c._tDur) +
                          (h - c._start) * c._ts,
                    n,
                    s,
                  ),
                  h !== this._time || (!this._ts && !v))
                ) {
                  (y = 0), _ && (f += this._zTime = -Q);
                  break;
                }
              }
              c = _;
            }
          else {
            c = this._last;
            for (var M = i < 0 ? i : h; c; ) {
              if (
                ((_ = c._prev), (c._act || M <= c._end) && c._ts && y !== c)
              ) {
                if (c.parent !== this) return this.render(i, n, s);
                if (
                  (c.render(
                    c._ts > 0
                      ? (M - c._start) * c._ts
                      : (c._dirty ? c.totalDuration() : c._tDur) +
                          (M - c._start) * c._ts,
                    n,
                    s || (jt && (c._initted || c._startAt)),
                  ),
                  h !== this._time || (!this._ts && !v))
                ) {
                  (y = 0), _ && (f += this._zTime = M ? -Q : Q);
                  break;
                }
              }
              c = _;
            }
          }
          if (
            y &&
            !n &&
            (this.pause(),
            (y.render(h >= a ? 0 : -Q)._zTime = h >= a ? 1 : -1),
            this._ts)
          )
            return (this._start = m), dn(this), this.render(i, n, s);
          this._onUpdate && !n && we(this, "onUpdate", !0),
            ((f === u && this._tTime >= this.totalDuration()) || (!f && a)) &&
              (m === this._start || Math.abs(w) !== Math.abs(this._ts)) &&
              (this._lock ||
                ((i || !l) &&
                  ((f === u && this._ts > 0) || (!f && this._ts < 0)) &&
                  nr(this, 1),
                !n &&
                  !(i < 0 && !a) &&
                  (f || a || !u) &&
                  (we(
                    this,
                    f === u && i >= 0 ? "onComplete" : "onReverseComplete",
                    !0,
                  ),
                  this._prom &&
                    !(f < u && this.timeScale() > 0) &&
                    this._prom())));
        }
        return this;
      }),
      (r.add = function (i, n) {
        var s = this;
        if ((qe(n) || (n = ye(this, n, i)), !(i instanceof ei))) {
          if (At(i))
            return (
              i.forEach(function (a) {
                return s.add(a, n);
              }),
              this
            );
          if (St(i)) return this.addLabel(i, n);
          if (at(i)) i = wt.delayedCall(0, i);
          else return this;
        }
        return this !== i ? Ae(this, i, n) : this;
      }),
      (r.getChildren = function (i, n, s, a) {
        i === void 0 && (i = !0),
          n === void 0 && (n = !0),
          s === void 0 && (s = !0),
          a === void 0 && (a = -_e);
        for (var u = [], l = this._first; l; )
          l._start >= a &&
            (l instanceof wt
              ? n && u.push(l)
              : (s && u.push(l),
                i && u.push.apply(u, l.getChildren(!0, n, s)))),
            (l = l._next);
        return u;
      }),
      (r.getById = function (i) {
        for (var n = this.getChildren(1, 1, 1), s = n.length; s--; )
          if (n[s].vars.id === i) return n[s];
      }),
      (r.remove = function (i) {
        return St(i)
          ? this.removeLabel(i)
          : at(i)
            ? this.killTweensOf(i)
            : (cn(this, i),
              i === this._recent && (this._recent = this._last),
              Cr(this));
      }),
      (r.totalTime = function (i, n) {
        return arguments.length
          ? ((this._forcing = 1),
            !this._dp &&
              this._ts &&
              (this._start = Mt(
                oe.time -
                  (this._ts > 0
                    ? i / this._ts
                    : (this.totalDuration() - i) / -this._ts),
              )),
            o.prototype.totalTime.call(this, i, n),
            (this._forcing = 0),
            this)
          : this._tTime;
      }),
      (r.addLabel = function (i, n) {
        return (this.labels[i] = ye(this, n)), this;
      }),
      (r.removeLabel = function (i) {
        return delete this.labels[i], this;
      }),
      (r.addPause = function (i, n, s) {
        var a = wt.delayedCall(0, n || xi, s);
        return (
          (a.data = "isPause"), (this._hasPause = 1), Ae(this, a, ye(this, i))
        );
      }),
      (r.removePause = function (i) {
        var n = this._first;
        for (i = ye(this, i); n; )
          n._start === i && n.data === "isPause" && nr(n), (n = n._next);
      }),
      (r.killTweensOf = function (i, n, s) {
        for (var a = this.getTweensOf(i, s), u = a.length; u--; )
          ar !== a[u] && a[u].kill(i, n);
        return this;
      }),
      (r.getTweensOf = function (i, n) {
        for (var s = [], a = ve(i), u = this._first, l = qe(n), f; u; )
          u instanceof wt
            ? Hl(u._targets, a) &&
              (l
                ? (!ar || (u._initted && u._ts)) &&
                  u.globalTime(0) <= n &&
                  u.globalTime(u.totalDuration()) > n
                : !n || u.isActive()) &&
              s.push(u)
            : (f = u.getTweensOf(a, n)).length && s.push.apply(s, f),
            (u = u._next);
        return s;
      }),
      (r.tweenTo = function (i, n) {
        n = n || {};
        var s = this,
          a = ye(s, i),
          u = n,
          l = u.startAt,
          f = u.onStart,
          d = u.onStartParams,
          h = u.immediateRender,
          c,
          _ = wt.to(
            s,
            me(
              {
                ease: n.ease || "none",
                lazy: !1,
                immediateRender: !1,
                time: a,
                overwrite: "auto",
                duration:
                  n.duration ||
                  Math.abs(
                    (a - (l && "time" in l ? l.time : s._time)) / s.timeScale(),
                  ) ||
                  Q,
                onStart: function () {
                  if ((s.pause(), !c)) {
                    var g =
                      n.duration ||
                      Math.abs(
                        (a - (l && "time" in l ? l.time : s._time)) /
                          s.timeScale(),
                      );
                    _._dur !== g && Qr(_, g, 0, 1).render(_._time, !0, !0),
                      (c = 1);
                  }
                  f && f.apply(_, d || []);
                },
              },
              n,
            ),
          );
        return h ? _.render(0) : _;
      }),
      (r.tweenFromTo = function (i, n, s) {
        return this.tweenTo(n, me({ startAt: { time: ye(this, i) } }, s));
      }),
      (r.recent = function () {
        return this._recent;
      }),
      (r.nextLabel = function (i) {
        return i === void 0 && (i = this._time), qo(this, ye(this, i));
      }),
      (r.previousLabel = function (i) {
        return i === void 0 && (i = this._time), qo(this, ye(this, i), 1);
      }),
      (r.currentLabel = function (i) {
        return arguments.length
          ? this.seek(i, !0)
          : this.previousLabel(this._time + Q);
      }),
      (r.shiftChildren = function (i, n, s) {
        s === void 0 && (s = 0);
        for (var a = this._first, u = this.labels, l; a; )
          a._start >= s && ((a._start += i), (a._end += i)), (a = a._next);
        if (n) for (l in u) u[l] >= s && (u[l] += i);
        return Cr(this);
      }),
      (r.invalidate = function (i) {
        var n = this._first;
        for (this._lock = 0; n; ) n.invalidate(i), (n = n._next);
        return o.prototype.invalidate.call(this, i);
      }),
      (r.clear = function (i) {
        i === void 0 && (i = !0);
        for (var n = this._first, s; n; )
          (s = n._next), this.remove(n), (n = s);
        return (
          this._dp && (this._time = this._tTime = this._pTime = 0),
          i && (this.labels = {}),
          Cr(this)
        );
      }),
      (r.totalDuration = function (i) {
        var n = 0,
          s = this,
          a = s._last,
          u = _e,
          l,
          f,
          d;
        if (arguments.length)
          return s.timeScale(
            (s._repeat < 0 ? s.duration() : s.totalDuration()) /
              (s.reversed() ? -i : i),
          );
        if (s._dirty) {
          for (d = s.parent; a; )
            (l = a._prev),
              a._dirty && a.totalDuration(),
              (f = a._start),
              f > u && s._sort && a._ts && !s._lock
                ? ((s._lock = 1), (Ae(s, a, f - a._delay, 1)._lock = 0))
                : (u = f),
              f < 0 &&
                a._ts &&
                ((n -= f),
                ((!d && !s._dp) || (d && d.smoothChildTiming)) &&
                  ((s._start += f / s._ts), (s._time -= f), (s._tTime -= f)),
                s.shiftChildren(-f, !1, -1 / 0),
                (u = 0)),
              a._end > n && a._ts && (n = a._end),
              (a = l);
          Qr(s, s === nt && s._time > n ? s._time : n, 1, 1), (s._dirty = 0);
        }
        return s._tDur;
      }),
      (t.updateRoot = function (i) {
        if ((nt._ts && (Eo(nt, hn(i, nt)), (Oo = oe.frame)), oe.frame >= ko)) {
          ko += ie.autoSleep || 120;
          var n = nt._first;
          if ((!n || !n._ts) && ie.autoSleep && oe._listeners.length < 2) {
            for (; n && !n._ts; ) n = n._next;
            n || oe.sleep();
          }
        }
      }),
      t
    );
  })(ei);
  me(Qt.prototype, { _lock: 0, _hasPause: 0, _forcing: 0 });
  var _u = function (t, r, e, i, n, s, a) {
      var u = new Jt(this._pt, t, r, 0, 1, aa, null, n),
        l = 0,
        f = 0,
        d,
        h,
        c,
        _,
        p,
        g,
        v,
        y;
      for (
        u.b = e,
          u.e = i,
          e += "",
          i += "",
          (v = ~i.indexOf("random(")) && (i = Pi(i)),
          s && ((y = [e, i]), s(y, t, r), (e = y[0]), (i = y[1])),
          h = e.match(Zn) || [];
        (d = Zn.exec(i));

      )
        (_ = d[0]),
          (p = i.substring(l, d.index)),
          c ? (c = (c + 1) % 5) : p.substr(-5) === "rgba(" && (c = 1),
          _ !== h[f++] &&
            ((g = parseFloat(h[f - 1]) || 0),
            (u._pt = {
              _next: u._pt,
              p: p || f === 1 ? p : ",",
              s: g,
              c: _.charAt(1) === "=" ? Kr(g, _) - g : parseFloat(_) - g,
              m: c && c < 4 ? Math.round : 0,
            }),
            (l = Zn.lastIndex));
      return (
        (u.c = l < i.length ? i.substring(l, i.length) : ""),
        (u.fp = a),
        (xo.test(i) || v) && (u.e = 0),
        (this._pt = u),
        u
      );
    },
    ps = function (t, r, e, i, n, s, a, u, l, f) {
      at(i) && (i = i(n || 0, t, s));
      var d = t[r],
        h =
          e !== "get"
            ? e
            : at(d)
              ? l
                ? t[
                    r.indexOf("set") || !at(t["get" + r.substr(3)])
                      ? r
                      : "get" + r.substr(3)
                  ](l)
                : t[r]()
              : d,
        c = at(d) ? (l ? wu : sa) : ms,
        _;
      if (
        (St(i) &&
          (~i.indexOf("random(") && (i = Pi(i)),
          i.charAt(1) === "=" &&
            ((_ = Kr(h, i) + (Rt(h) || 0)), (_ || _ === 0) && (i = _))),
        !f || h !== i || _s)
      )
        return !isNaN(h * i) && i !== ""
          ? ((_ = new Jt(
              this._pt,
              t,
              r,
              +h || 0,
              i - (h || 0),
              typeof d == "boolean" ? xu : oa,
              0,
              c,
            )),
            l && (_.fp = l),
            a && _.modifier(a, this, t),
            (this._pt = _))
          : (!d && !(r in t) && ts(r, i),
            _u.call(this, t, r, h, i, c, u || ie.stringFilter, l));
    },
    gu = function (t, r, e, i, n) {
      if (
        (at(t) && (t = Ei(t, n, r, e, i)),
        !De(t) || (t.style && t.nodeType) || At(t) || wo(t))
      )
        return St(t) ? Ei(t, n, r, e, i) : t;
      var s = {},
        a;
      for (a in t) s[a] = Ei(t[a], n, r, e, i);
      return s;
    },
    ra = function (t, r, e, i, n, s) {
      var a, u, l, f;
      if (
        se[t] &&
        (a = new se[t]()).init(
          n,
          a.rawVars ? r[t] : gu(r[t], i, n, s, e),
          e,
          i,
          s,
        ) !== !1 &&
        ((e._pt = u = new Jt(e._pt, n, t, 0, 1, a.render, a, 0, a.priority)),
        e !== Jr)
      )
        for (l = e._ptLookup[e._targets.indexOf(n)], f = a._props.length; f--; )
          l[a._props[f]] = u;
      return a;
    },
    ar,
    _s,
    gs = function o(t, r, e) {
      var i = t.vars,
        n = i.ease,
        s = i.startAt,
        a = i.immediateRender,
        u = i.lazy,
        l = i.onUpdate,
        f = i.onUpdateParams,
        d = i.callbackScope,
        h = i.runBackwards,
        c = i.yoyoEase,
        _ = i.keyframes,
        p = i.autoRevert,
        g = t._dur,
        v = t._startAt,
        y = t._targets,
        w = t.parent,
        m = w && w.data === "nested" ? w.vars.targets : y,
        x = t._overwrite === "auto" && !qn,
        C = t.timeline,
        S,
        k,
        O,
        M,
        E,
        D,
        X,
        W,
        $,
        z,
        B,
        N,
        V;
      if (
        (C && (!_ || !n) && (n = "none"),
        (t._ease = Pr(n, Gr.ease)),
        (t._yEase = c ? Qo(Pr(c === !0 ? n : c, Gr.ease)) : 0),
        c &&
          t._yoyo &&
          !t._repeat &&
          ((c = t._yEase), (t._yEase = t._ease), (t._ease = c)),
        (t._from = !C && !!i.runBackwards),
        !C || (_ && !i.stagger))
      ) {
        if (
          ((W = y[0] ? Tr(y[0]).harness : 0),
          (N = W && i[W.prop]),
          (S = fn(i, es)),
          v &&
            (v._zTime < 0 && v.progress(1),
            r < 0 && h && a && !p
              ? v.render(-1, !0)
              : v.revert(h && g ? an : Xl),
            (v._lazy = 0)),
          s)
        ) {
          if (
            (nr(
              (t._startAt = wt.set(
                y,
                me(
                  {
                    data: "isStart",
                    overwrite: !1,
                    parent: w,
                    immediateRender: !0,
                    lazy: Kt(u),
                    startAt: null,
                    delay: 0,
                    onUpdate: l,
                    onUpdateParams: f,
                    callbackScope: d,
                    stagger: 0,
                  },
                  s,
                ),
              )),
            ),
            (t._startAt._dp = 0),
            r < 0 && (jt || (!a && !p)) && t._startAt.revert(an),
            a && g && r <= 0 && e <= 0)
          ) {
            r && (t._zTime = r);
            return;
          }
        } else if (h && g && !v) {
          if (
            (r && (a = !1),
            (O = me(
              {
                overwrite: !1,
                data: "isFromStart",
                lazy: a && Kt(u),
                immediateRender: a,
                stagger: 0,
                parent: w,
              },
              S,
            )),
            N && (O[W.prop] = N),
            nr((t._startAt = wt.set(y, O))),
            (t._startAt._dp = 0),
            r < 0 && (jt ? t._startAt.revert(an) : t._startAt.render(-1, !0)),
            (t._zTime = r),
            !a)
          )
            o(t._startAt, Q, Q);
          else if (!r) return;
        }
        for (
          t._pt = t._ptCache = 0, u = (g && Kt(u)) || (u && !g), k = 0;
          k < y.length;
          k++
        ) {
          if (
            ((E = y[k]),
            (X = E._gsap || ss(y)[k]._gsap),
            (t._ptLookup[k] = z = {}),
            rs[X.id] && ir.length && un(),
            (B = m === y ? k : m.indexOf(E)),
            W &&
              ($ = new W()).init(E, N || S, t, B, m) !== !1 &&
              ((t._pt = M =
                new Jt(t._pt, E, $.name, 0, 1, $.render, $, 0, $.priority)),
              $._props.forEach(function (b) {
                z[b] = M;
              }),
              $.priority && (D = 1)),
            !W || N)
          )
            for (O in S)
              se[O] && ($ = ra(O, S, t, B, E, m))
                ? $.priority && (D = 1)
                : (z[O] = M =
                    ps.call(t, E, O, "get", S[O], B, m, 0, i.stringFilter));
          t._op && t._op[k] && t.kill(E, t._op[k]),
            x &&
              t._pt &&
              ((ar = t),
              nt.killTweensOf(E, z, t.globalTime(r)),
              (V = !t.parent),
              (ar = 0)),
            t._pt && u && (rs[X.id] = 1);
        }
        D && la(t), t._onInit && t._onInit(t);
      }
      (t._onUpdate = l),
        (t._initted = (!t._op || t._pt) && !V),
        _ && r <= 0 && C.render(_e, !0, !0);
    },
    mu = function (t, r, e, i, n, s, a) {
      var u = ((t._pt && t._ptCache) || (t._ptCache = {}))[r],
        l,
        f,
        d,
        h;
      if (!u)
        for (
          u = t._ptCache[r] = [], d = t._ptLookup, h = t._targets.length;
          h--;

        ) {
          if (((l = d[h][r]), l && l.d && l.d._pt))
            for (l = l.d._pt; l && l.p !== r && l.fp !== r; ) l = l._next;
          if (!l) return (_s = 1), (t.vars[r] = "+=0"), gs(t, a), (_s = 0), 1;
          u.push(l);
        }
      for (h = u.length; h--; )
        (f = u[h]),
          (l = f._pt || f),
          (l.s = (i || i === 0) && !n ? i : l.s + (i || 0) + s * l.c),
          (l.c = e - l.s),
          f.e && (f.e = dt(e) + Rt(f.e)),
          f.b && (f.b = l.s + Rt(f.b));
    },
    yu = function (t, r) {
      var e = t[0] ? Tr(t[0]).harness : 0,
        i = e && e.aliases,
        n,
        s,
        a,
        u;
      if (!i) return r;
      n = Sr({}, r);
      for (s in i)
        if (s in n)
          for (u = i[s].split(","), a = u.length; a--; ) n[u[a]] = n[s];
      return n;
    },
    vu = function (t, r, e, i) {
      var n = r.ease || i || "power1.inOut",
        s,
        a;
      if (At(r))
        (a = e[t] || (e[t] = [])),
          r.forEach(function (u, l) {
            return a.push({ t: (l / (r.length - 1)) * 100, v: u, e: n });
          });
      else
        for (s in r)
          (a = e[s] || (e[s] = [])),
            s === "ease" || a.push({ t: parseFloat(t), v: r[s], e: n });
    },
    Ei = function (t, r, e, i, n) {
      return at(t)
        ? t.call(r, e, i, n)
        : St(t) && ~t.indexOf("random(")
          ? Pi(t)
          : t;
    },
    ia = ns + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",
    na = {};
  Zt(ia + ",id,stagger,delay,duration,paused,scrollTrigger", function (o) {
    return (na[o] = 1);
  });
  var wt = (function (o) {
    mo(t, o);
    function t(e, i, n, s) {
      var a;
      typeof i == "number" && ((n.duration = i), (i = n), (n = null)),
        (a = o.call(this, s ? i : Ti(i)) || this);
      var u = a.vars,
        l = u.duration,
        f = u.delay,
        d = u.immediateRender,
        h = u.stagger,
        c = u.overwrite,
        _ = u.keyframes,
        p = u.defaults,
        g = u.scrollTrigger,
        v = u.yoyoEase,
        y = i.parent || nt,
        w = (At(e) || wo(e) ? qe(e[0]) : "length" in i) ? [e] : ve(e),
        m,
        x,
        C,
        S,
        k,
        O,
        M,
        E;
      if (
        ((a._targets = w.length
          ? ss(w)
          : on(
              "GSAP target " + e + " not found. https://greensock.com",
              !ie.nullTargetWarn,
            ) || []),
        (a._ptLookup = []),
        (a._overwrite = c),
        _ || h || nn(l) || nn(f))
      ) {
        if (
          ((i = a.vars),
          (m = a.timeline =
            new Qt({
              data: "nested",
              defaults: p || {},
              targets: y && y.data === "nested" ? y.vars.targets : w,
            })),
          m.kill(),
          (m.parent = m._dp = Ue(a)),
          (m._start = 0),
          h || nn(l) || nn(f))
        ) {
          if (((S = w.length), (M = h && Bo(h)), De(h)))
            for (k in h) ~ia.indexOf(k) && (E || (E = {}), (E[k] = h[k]));
          for (x = 0; x < S; x++)
            (C = fn(i, na)),
              (C.stagger = 0),
              v && (C.yoyoEase = v),
              E && Sr(C, E),
              (O = w[x]),
              (C.duration = +Ei(l, Ue(a), x, O, w)),
              (C.delay = (+Ei(f, Ue(a), x, O, w) || 0) - a._delay),
              !h &&
                S === 1 &&
                C.delay &&
                ((a._delay = f = C.delay), (a._start += f), (C.delay = 0)),
              m.to(O, C, M ? M(x, O, w) : 0),
              (m._ease = H.none);
          m.duration() ? (l = f = 0) : (a.timeline = 0);
        } else if (_) {
          Ti(me(m.vars.defaults, { ease: "none" })),
            (m._ease = Pr(_.ease || i.ease || "none"));
          var D = 0,
            X,
            W,
            $;
          if (At(_))
            _.forEach(function (z) {
              return m.to(w, z, ">");
            }),
              m.duration();
          else {
            C = {};
            for (k in _)
              k === "ease" || k === "easeEach" || vu(k, _[k], C, _.easeEach);
            for (k in C)
              for (
                X = C[k].sort(function (z, B) {
                  return z.t - B.t;
                }),
                  D = 0,
                  x = 0;
                x < X.length;
                x++
              )
                (W = X[x]),
                  ($ = {
                    ease: W.e,
                    duration: ((W.t - (x ? X[x - 1].t : 0)) / 100) * l,
                  }),
                  ($[k] = W.v),
                  m.to(w, $, D),
                  (D += $.duration);
            m.duration() < l && m.to({}, { duration: l - m.duration() });
          }
        }
        l || a.duration((l = m.duration()));
      } else a.timeline = 0;
      return (
        c === !0 && !qn && ((ar = Ue(a)), nt.killTweensOf(w), (ar = 0)),
        Ae(y, Ue(a), n),
        i.reversed && a.reverse(),
        i.paused && a.paused(!0),
        (d ||
          (!l &&
            !_ &&
            a._start === Mt(y._time) &&
            Kt(d) &&
            jl(Ue(a)) &&
            y.data !== "nested")) &&
          ((a._tTime = -Q), a.render(Math.max(0, -f) || 0)),
        g && Fo(Ue(a), g),
        a
      );
    }
    var r = t.prototype;
    return (
      (r.render = function (i, n, s) {
        var a = this._time,
          u = this._tDur,
          l = this._dur,
          f = i < 0,
          d = i > u - Q && !f ? u : i < Q ? 0 : i,
          h,
          c,
          _,
          p,
          g,
          v,
          y,
          w,
          m;
        if (!l) Zl(this, i, n, s);
        else if (
          d !== this._tTime ||
          !i ||
          s ||
          (!this._initted && this._tTime) ||
          (this._startAt && this._zTime < 0 !== f)
        ) {
          if (((h = d), (w = this.timeline), this._repeat)) {
            if (((p = l + this._rDelay), this._repeat < -1 && f))
              return this.totalTime(p * 100 + i, n, s);
            if (
              ((h = Mt(d % p)),
              d === u
                ? ((_ = this._repeat), (h = l))
                : ((_ = ~~(d / p)),
                  _ && _ === d / p && ((h = l), _--),
                  h > l && (h = l)),
              (v = this._yoyo && _ & 1),
              v && ((m = this._yEase), (h = l - h)),
              (g = Zr(this._tTime, p)),
              h === a && !s && this._initted)
            )
              return (this._tTime = d), this;
            _ !== g &&
              (w && this._yEase && Jo(w, v),
              this.vars.repeatRefresh &&
                !v &&
                !this._lock &&
                ((this._lock = s = 1),
                (this.render(Mt(p * _), !0).invalidate()._lock = 0)));
          }
          if (!this._initted) {
            if ($o(this, f ? i : h, s, n, d)) return (this._tTime = 0), this;
            if (a !== this._time) return this;
            if (l !== this._dur) return this.render(i, n, s);
          }
          if (
            ((this._tTime = d),
            (this._time = h),
            !this._act && this._ts && ((this._act = 1), (this._lazy = 0)),
            (this.ratio = y = (m || this._ease)(h / l)),
            this._from && (this.ratio = y = 1 - y),
            h && !a && !n && (we(this, "onStart"), this._tTime !== d))
          )
            return this;
          for (c = this._pt; c; ) c.r(y, c.d), (c = c._next);
          (w &&
            w.render(
              i < 0 ? i : !h && v ? -Q : w._dur * w._ease(h / this._dur),
              n,
              s,
            )) ||
            (this._startAt && (this._zTime = i)),
            this._onUpdate &&
              !n &&
              (f && os(this, i, n, s), we(this, "onUpdate")),
            this._repeat &&
              _ !== g &&
              this.vars.onRepeat &&
              !n &&
              this.parent &&
              we(this, "onRepeat"),
            (d === this._tDur || !d) &&
              this._tTime === d &&
              (f && !this._onUpdate && os(this, i, !0, !0),
              (i || !l) &&
                ((d === this._tDur && this._ts > 0) || (!d && this._ts < 0)) &&
                nr(this, 1),
              !n &&
                !(f && !a) &&
                (d || a || v) &&
                (we(this, d === u ? "onComplete" : "onReverseComplete", !0),
                this._prom &&
                  !(d < u && this.timeScale() > 0) &&
                  this._prom()));
        }
        return this;
      }),
      (r.targets = function () {
        return this._targets;
      }),
      (r.invalidate = function (i) {
        return (
          (!i || !this.vars.runBackwards) && (this._startAt = 0),
          (this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0),
          (this._ptLookup = []),
          this.timeline && this.timeline.invalidate(i),
          o.prototype.invalidate.call(this, i)
        );
      }),
      (r.resetTo = function (i, n, s, a) {
        Mi || oe.wake(), this._ts || this.play();
        var u = Math.min(this._dur, (this._dp._time - this._start) * this._ts),
          l;
        return (
          this._initted || gs(this, u),
          (l = this._ease(u / this._dur)),
          mu(this, i, n, s, a, l, u)
            ? this.resetTo(i, n, s, a)
            : (pn(this, 0),
              this.parent ||
                Lo(
                  this._dp,
                  this,
                  "_first",
                  "_last",
                  this._dp._sort ? "_start" : 0,
                ),
              this.render(0))
        );
      }),
      (r.kill = function (i, n) {
        if ((n === void 0 && (n = "all"), !i && (!n || n === "all")))
          return (this._lazy = this._pt = 0), this.parent ? Oi(this) : this;
        if (this.timeline) {
          var s = this.timeline.totalDuration();
          return (
            this.timeline.killTweensOf(i, n, ar && ar.vars.overwrite !== !0)
              ._first || Oi(this),
            this.parent &&
              s !== this.timeline.totalDuration() &&
              Qr(this, (this._dur * this.timeline._tDur) / s, 0, 1),
            this
          );
        }
        var a = this._targets,
          u = i ? ve(i) : a,
          l = this._ptLookup,
          f = this._pt,
          d,
          h,
          c,
          _,
          p,
          g,
          v;
        if ((!n || n === "all") && ql(a, u))
          return n === "all" && (this._pt = 0), Oi(this);
        for (
          d = this._op = this._op || [],
            n !== "all" &&
              (St(n) &&
                ((p = {}),
                Zt(n, function (y) {
                  return (p[y] = 1);
                }),
                (n = p)),
              (n = yu(a, n))),
            v = a.length;
          v--;

        )
          if (~u.indexOf(a[v])) {
            (h = l[v]),
              n === "all"
                ? ((d[v] = n), (_ = h), (c = {}))
                : ((c = d[v] = d[v] || {}), (_ = n));
            for (p in _)
              (g = h && h[p]),
                g &&
                  ((!("kill" in g.d) || g.d.kill(p) === !0) &&
                    cn(this, g, "_pt"),
                  delete h[p]),
                c !== "all" && (c[p] = 1);
          }
        return this._initted && !this._pt && f && Oi(this), this;
      }),
      (t.to = function (i, n) {
        return new t(i, n, arguments[2]);
      }),
      (t.from = function (i, n) {
        return Si(1, arguments);
      }),
      (t.delayedCall = function (i, n, s, a) {
        return new t(n, 0, {
          immediateRender: !1,
          lazy: !1,
          overwrite: !1,
          delay: i,
          onComplete: n,
          onReverseComplete: n,
          onCompleteParams: s,
          onReverseCompleteParams: s,
          callbackScope: a,
        });
      }),
      (t.fromTo = function (i, n, s) {
        return Si(2, arguments);
      }),
      (t.set = function (i, n) {
        return (n.duration = 0), n.repeatDelay || (n.repeat = 0), new t(i, n);
      }),
      (t.killTweensOf = function (i, n, s) {
        return nt.killTweensOf(i, n, s);
      }),
      t
    );
  })(ei);
  me(wt.prototype, { _targets: [], _lazy: 0, _startAt: 0, _op: 0, _onInit: 0 }),
    Zt("staggerTo,staggerFrom,staggerFromTo", function (o) {
      wt[o] = function () {
        var t = new Qt(),
          r = ls.call(arguments, 0);
        return r.splice(o === "staggerFromTo" ? 5 : 4, 0, 0), t[o].apply(t, r);
      };
    });
  var ms = function (t, r, e) {
      return (t[r] = e);
    },
    sa = function (t, r, e) {
      return t[r](e);
    },
    wu = function (t, r, e, i) {
      return t[r](i.fp, e);
    },
    bu = function (t, r, e) {
      return t.setAttribute(r, e);
    },
    ys = function (t, r) {
      return at(t[r]) ? sa : jn(t[r]) && t.setAttribute ? bu : ms;
    },
    oa = function (t, r) {
      return r.set(r.t, r.p, Math.round((r.s + r.c * t) * 1e6) / 1e6, r);
    },
    xu = function (t, r) {
      return r.set(r.t, r.p, !!(r.s + r.c * t), r);
    },
    aa = function (t, r) {
      var e = r._pt,
        i = "";
      if (!t && r.b) i = r.b;
      else if (t === 1 && r.e) i = r.e;
      else {
        for (; e; )
          (i =
            e.p +
            (e.m
              ? e.m(e.s + e.c * t)
              : Math.round((e.s + e.c * t) * 1e4) / 1e4) +
            i),
            (e = e._next);
        i += r.c;
      }
      r.set(r.t, r.p, i, r);
    },
    vs = function (t, r) {
      for (var e = r._pt; e; ) e.r(t, e.d), (e = e._next);
    },
    Tu = function (t, r, e, i) {
      for (var n = this._pt, s; n; )
        (s = n._next), n.p === i && n.modifier(t, r, e), (n = s);
    },
    Su = function (t) {
      for (var r = this._pt, e, i; r; )
        (i = r._next),
          (r.p === t && !r.op) || r.op === t
            ? cn(this, r, "_pt")
            : r.dep || (e = 1),
          (r = i);
      return !e;
    },
    Cu = function (t, r, e, i) {
      i.mSet(t, r, i.m.call(i.tween, e, i.mt), i);
    },
    la = function (t) {
      for (var r = t._pt, e, i, n, s; r; ) {
        for (e = r._next, i = n; i && i.pr > r.pr; ) i = i._next;
        (r._prev = i ? i._prev : s) ? (r._prev._next = r) : (n = r),
          (r._next = i) ? (i._prev = r) : (s = r),
          (r = e);
      }
      t._pt = n;
    },
    Jt = (function () {
      function o(r, e, i, n, s, a, u, l, f) {
        (this.t = e),
          (this.s = n),
          (this.c = s),
          (this.p = i),
          (this.r = a || oa),
          (this.d = u || this),
          (this.set = l || ms),
          (this.pr = f || 0),
          (this._next = r),
          r && (r._prev = this);
      }
      var t = o.prototype;
      return (
        (t.modifier = function (e, i, n) {
          (this.mSet = this.mSet || this.set),
            (this.set = Cu),
            (this.m = e),
            (this.mt = n),
            (this.tween = i);
        }),
        o
      );
    })();
  Zt(
    ns +
      "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",
    function (o) {
      return (es[o] = 1);
    },
  ),
    (ne.TweenMax = ne.TweenLite = wt),
    (ne.TimelineLite = ne.TimelineMax = Qt),
    (nt = new Qt({
      sortChildren: !1,
      defaults: Gr,
      autoRemoveChildren: !0,
      id: "root",
      smoothChildTiming: !0,
    })),
    (ie.stringFilter = Zo);
  var ri = [],
    _n = {},
    Pu = [],
    ua = 0,
    ws = function (t) {
      return (_n[t] || Pu).map(function (r) {
        return r();
      });
    },
    bs = function () {
      var t = Date.now(),
        r = [];
      t - ua > 2 &&
        (ws("matchMediaInit"),
        ri.forEach(function (e) {
          var i = e.queries,
            n = e.conditions,
            s,
            a,
            u,
            l;
          for (a in i)
            (s = ge.matchMedia(i[a]).matches),
              s && (u = 1),
              s !== n[a] && ((n[a] = s), (l = 1));
          l && (e.revert(), u && r.push(e));
        }),
        ws("matchMediaRevert"),
        r.forEach(function (e) {
          return e.onMatch(e);
        }),
        (ua = t),
        ws("matchMedia"));
    },
    fa = (function () {
      function o(r, e) {
        (this.selector = e && us(e)),
          (this.data = []),
          (this._r = []),
          (this.isReverted = !1),
          r && this.add(r);
      }
      var t = o.prototype;
      return (
        (t.add = function (e, i, n) {
          at(e) && ((n = i), (i = e), (e = at));
          var s = this,
            a = function () {
              var l = gt,
                f = s.selector,
                d;
              return (
                l && l !== s && l.data.push(s),
                n && (s.selector = us(n)),
                (gt = s),
                (d = i.apply(s, arguments)),
                at(d) && s._r.push(d),
                (gt = l),
                (s.selector = f),
                (s.isReverted = !1),
                d
              );
            };
          return (s.last = a), e === at ? a(s) : e ? (s[e] = a) : a;
        }),
        (t.ignore = function (e) {
          var i = gt;
          (gt = null), e(this), (gt = i);
        }),
        (t.getTweens = function () {
          var e = [];
          return (
            this.data.forEach(function (i) {
              return i instanceof o
                ? e.push.apply(e, i.getTweens())
                : i instanceof wt &&
                    !(i.parent && i.parent.data === "nested") &&
                    e.push(i);
            }),
            e
          );
        }),
        (t.clear = function () {
          this._r.length = this.data.length = 0;
        }),
        (t.kill = function (e, i) {
          var n = this;
          if (e) {
            var s = this.getTweens();
            this.data.forEach(function (u) {
              u.data === "isFlip" &&
                (u.revert(),
                u.getChildren(!0, !0, !1).forEach(function (l) {
                  return s.splice(s.indexOf(l), 1);
                }));
            }),
              s
                .map(function (u) {
                  return { g: u.globalTime(0), t: u };
                })
                .sort(function (u, l) {
                  return l.g - u.g || -1;
                })
                .forEach(function (u) {
                  return u.t.revert(e);
                }),
              this.data.forEach(function (u) {
                return !(u instanceof ei) && u.revert && u.revert(e);
              }),
              this._r.forEach(function (u) {
                return u(e, n);
              }),
              (this.isReverted = !0);
          } else
            this.data.forEach(function (u) {
              return u.kill && u.kill();
            });
          if ((this.clear(), i)) {
            var a = ri.indexOf(this);
            ~a && ri.splice(a, 1);
          }
        }),
        (t.revert = function (e) {
          this.kill(e || {});
        }),
        o
      );
    })(),
    Ou = (function () {
      function o(r) {
        (this.contexts = []), (this.scope = r);
      }
      var t = o.prototype;
      return (
        (t.add = function (e, i, n) {
          De(e) || (e = { matches: e });
          var s = new fa(0, n || this.scope),
            a = (s.conditions = {}),
            u,
            l,
            f;
          this.contexts.push(s), (i = s.add("onMatch", i)), (s.queries = e);
          for (l in e)
            l === "all"
              ? (f = 1)
              : ((u = ge.matchMedia(e[l])),
                u &&
                  (ri.indexOf(s) < 0 && ri.push(s),
                  (a[l] = u.matches) && (f = 1),
                  u.addListener
                    ? u.addListener(bs)
                    : u.addEventListener("change", bs)));
          return f && i(s), this;
        }),
        (t.revert = function (e) {
          this.kill(e || {});
        }),
        (t.kill = function (e) {
          this.contexts.forEach(function (i) {
            return i.kill(e, !0);
          });
        }),
        o
      );
    })(),
    gn = {
      registerPlugin: function () {
        for (var t = arguments.length, r = new Array(t), e = 0; e < t; e++)
          r[e] = arguments[e];
        r.forEach(function (i) {
          return lu(i);
        });
      },
      timeline: function (t) {
        return new Qt(t);
      },
      getTweensOf: function (t, r) {
        return nt.getTweensOf(t, r);
      },
      getProperty: function (t, r, e, i) {
        St(t) && (t = ve(t)[0]);
        var n = Tr(t || {}).get,
          s = e ? Ao : Do;
        return (
          e === "native" && (e = ""),
          t &&
            (r
              ? s(((se[r] && se[r].get) || n)(t, r, e, i))
              : function (a, u, l) {
                  return s(((se[a] && se[a].get) || n)(t, a, u, l));
                })
        );
      },
      quickSetter: function (t, r, e) {
        if (((t = ve(t)), t.length > 1)) {
          var i = t.map(function (f) {
              return ae.quickSetter(f, r, e);
            }),
            n = i.length;
          return function (f) {
            for (var d = n; d--; ) i[d](f);
          };
        }
        t = t[0] || {};
        var s = se[r],
          a = Tr(t),
          u = (a.harness && (a.harness.aliases || {})[r]) || r,
          l = s
            ? function (f) {
                var d = new s();
                (Jr._pt = 0),
                  d.init(t, e ? f + e : f, Jr, 0, [t]),
                  d.render(1, d),
                  Jr._pt && vs(1, Jr);
              }
            : a.set(t, u);
        return s
          ? l
          : function (f) {
              return l(t, u, e ? f + e : f, a, 1);
            };
      },
      quickTo: function (t, r, e) {
        var i,
          n = ae.to(
            t,
            Sr(((i = {}), (i[r] = "+=0.1"), (i.paused = !0), i), e || {}),
          ),
          s = function (u, l, f) {
            return n.resetTo(r, u, l, f);
          };
        return (s.tween = n), s;
      },
      isTweening: function (t) {
        return nt.getTweensOf(t, !0).length > 0;
      },
      defaults: function (t) {
        return t && t.ease && (t.ease = Pr(t.ease, Gr.ease)), Ro(Gr, t || {});
      },
      config: function (t) {
        return Ro(ie, t || {});
      },
      registerEffect: function (t) {
        var r = t.name,
          e = t.effect,
          i = t.plugins,
          n = t.defaults,
          s = t.extendTimeline;
        (i || "").split(",").forEach(function (a) {
          return (
            a &&
            !se[a] &&
            !ne[a] &&
            on(r + " effect requires " + a + " plugin.")
          );
        }),
          (is[r] = function (a, u, l) {
            return e(ve(a), me(u || {}, n), l);
          }),
          s &&
            (Qt.prototype[r] = function (a, u, l) {
              return this.add(is[r](a, De(u) ? u : (l = u) && {}, this), l);
            });
      },
      registerEase: function (t, r) {
        H[t] = Pr(r);
      },
      parseEase: function (t, r) {
        return arguments.length ? Pr(t, r) : H;
      },
      getById: function (t) {
        return nt.getById(t);
      },
      exportRoot: function (t, r) {
        t === void 0 && (t = {});
        var e = new Qt(t),
          i,
          n;
        for (
          e.smoothChildTiming = Kt(t.smoothChildTiming),
            nt.remove(e),
            e._dp = 0,
            e._time = e._tTime = nt._time,
            i = nt._first;
          i;

        )
          (n = i._next),
            (r ||
              !(
                !i._dur &&
                i instanceof wt &&
                i.vars.onComplete === i._targets[0]
              )) &&
              Ae(e, i, i._start - i._delay),
            (i = n);
        return Ae(nt, e, 0), e;
      },
      context: function (t, r) {
        return t ? new fa(t, r) : gt;
      },
      matchMedia: function (t) {
        return new Ou(t);
      },
      matchMediaRefresh: function () {
        return (
          ri.forEach(function (t) {
            var r = t.conditions,
              e,
              i;
            for (i in r) r[i] && ((r[i] = !1), (e = 1));
            e && t.revert();
          }) || bs()
        );
      },
      addEventListener: function (t, r) {
        var e = _n[t] || (_n[t] = []);
        ~e.indexOf(r) || e.push(r);
      },
      removeEventListener: function (t, r) {
        var e = _n[t],
          i = e && e.indexOf(r);
        i >= 0 && e.splice(i, 1);
      },
      utils: {
        wrap: su,
        wrapYoyo: ou,
        distribute: Bo,
        random: Vo,
        snap: Xo,
        normalize: nu,
        getUnit: Rt,
        clamp: tu,
        splitColor: Go,
        toArray: ve,
        selector: us,
        mapRange: Uo,
        pipe: ru,
        unitize: iu,
        interpolate: au,
        shuffle: Yo,
      },
      install: Co,
      effects: is,
      ticker: oe,
      updateRoot: Qt.updateRoot,
      plugins: se,
      globalTimeline: nt,
      core: {
        PropTween: Jt,
        globals: Po,
        Tween: wt,
        Timeline: Qt,
        Animation: ei,
        getCache: Tr,
        _removeLinkedListItem: cn,
        reverting: function () {
          return jt;
        },
        context: function (t) {
          return t && gt && (gt.data.push(t), (t._ctx = gt)), gt;
        },
        suppressOverwrites: function (t) {
          return (qn = t);
        },
      },
    };
  Zt("to,from,fromTo,delayedCall,set,killTweensOf", function (o) {
    return (gn[o] = wt[o]);
  }),
    oe.add(Qt.updateRoot),
    (Jr = gn.to({}, { duration: 0 }));
  var ku = function (t, r) {
      for (var e = t._pt; e && e.p !== r && e.op !== r && e.fp !== r; )
        e = e._next;
      return e;
    },
    Mu = function (t, r) {
      var e = t._targets,
        i,
        n,
        s;
      for (i in r)
        for (n = e.length; n--; )
          (s = t._ptLookup[n][i]),
            s &&
              (s = s.d) &&
              (s._pt && (s = ku(s, i)),
              s && s.modifier && s.modifier(r[i], t, e[n], i));
    },
    xs = function (t, r) {
      return {
        name: t,
        rawVars: 1,
        init: function (i, n, s) {
          s._onInit = function (a) {
            var u, l;
            if (
              (St(n) &&
                ((u = {}),
                Zt(n, function (f) {
                  return (u[f] = 1);
                }),
                (n = u)),
              r)
            ) {
              u = {};
              for (l in n) u[l] = r(n[l]);
              n = u;
            }
            Mu(a, n);
          };
        },
      };
    },
    ae =
      gn.registerPlugin(
        {
          name: "attr",
          init: function (t, r, e, i, n) {
            var s, a, u;
            this.tween = e;
            for (s in r)
              (u = t.getAttribute(s) || ""),
                (a = this.add(
                  t,
                  "setAttribute",
                  (u || 0) + "",
                  r[s],
                  i,
                  n,
                  0,
                  0,
                  s,
                )),
                (a.op = s),
                (a.b = u),
                this._props.push(s);
          },
          render: function (t, r) {
            for (var e = r._pt; e; )
              jt ? e.set(e.t, e.p, e.b, e) : e.r(t, e.d), (e = e._next);
          },
        },
        {
          name: "endArray",
          init: function (t, r) {
            for (var e = r.length; e--; )
              this.add(t, e, t[e] || 0, r[e], 0, 0, 0, 0, 0, 1);
          },
        },
        xs("roundProps", fs),
        xs("modifiers"),
        xs("snap", Xo),
      ) || gn;
  (wt.version = Qt.version = ae.version = "3.11.3"),
    (So = 1),
    vo() && ti(),
    H.Power0,
    H.Power1,
    H.Power2,
    H.Power3,
    H.Power4,
    H.Linear,
    H.Quad,
    H.Cubic,
    H.Quart,
    H.Quint,
    H.Strong,
    H.Elastic,
    H.Back,
    H.SteppedEase,
    H.Bounce,
    H.Sine,
    H.Expo,
    H.Circ;
  /*!
   * CSSPlugin 3.11.3
   * https://greensock.com
   *
   * Copyright 2008-2022, GreenSock. All rights reserved.
   * Subject to the terms at https://greensock.com/standard-license or for
   * Club GreenSock members, the agreement issued with that membership.
   * @author: Jack Doyle, jack@greensock.com
   */ var ca,
    lr,
    ii,
    Ts,
    kr,
    ha,
    Ss,
    Eu = function () {
      return typeof window < "u";
    },
    Ge = {},
    Mr = 180 / Math.PI,
    ni = Math.PI / 180,
    si = Math.atan2,
    da = 1e8,
    Cs = /([A-Z])/g,
    Du = /(left|right|width|margin|padding|x)/i,
    Au = /[\s,\(]\S/,
    je = {
      autoAlpha: "opacity,visibility",
      scale: "scaleX,scaleY",
      alpha: "opacity",
    },
    Ps = function (t, r) {
      return r.set(r.t, r.p, Math.round((r.s + r.c * t) * 1e4) / 1e4 + r.u, r);
    },
    Ru = function (t, r) {
      return r.set(
        r.t,
        r.p,
        t === 1 ? r.e : Math.round((r.s + r.c * t) * 1e4) / 1e4 + r.u,
        r,
      );
    },
    Lu = function (t, r) {
      return r.set(
        r.t,
        r.p,
        t ? Math.round((r.s + r.c * t) * 1e4) / 1e4 + r.u : r.b,
        r,
      );
    },
    zu = function (t, r) {
      var e = r.s + r.c * t;
      r.set(r.t, r.p, ~~(e + (e < 0 ? -0.5 : 0.5)) + r.u, r);
    },
    pa = function (t, r) {
      return r.set(r.t, r.p, t ? r.e : r.b, r);
    },
    _a = function (t, r) {
      return r.set(r.t, r.p, t !== 1 ? r.b : r.e, r);
    },
    Nu = function (t, r, e) {
      return (t.style[r] = e);
    },
    Fu = function (t, r, e) {
      return t.style.setProperty(r, e);
    },
    $u = function (t, r, e) {
      return (t._gsap[r] = e);
    },
    Wu = function (t, r, e) {
      return (t._gsap.scaleX = t._gsap.scaleY = e);
    },
    Iu = function (t, r, e, i, n) {
      var s = t._gsap;
      (s.scaleX = s.scaleY = e), s.renderTransform(n, s);
    },
    Yu = function (t, r, e, i, n) {
      var s = t._gsap;
      (s[r] = e), s.renderTransform(n, s);
    },
    st = "transform",
    Ce = st + "Origin",
    Bu = function (t, r) {
      var e = this,
        i = this.target,
        n = i.style;
      if (t in Ge) {
        if (
          ((this.tfm = this.tfm || {}),
          t !== "transform" &&
            ((t = je[t] || t),
            ~t.indexOf(",")
              ? t.split(",").forEach(function (s) {
                  return (e.tfm[s] = Ke(i, s));
                })
              : (this.tfm[t] = i._gsap.x ? i._gsap[t] : Ke(i, t))),
          this.props.indexOf(st) >= 0)
        )
          return;
        i._gsap.svg &&
          ((this.svgo = i.getAttribute("data-svg-origin")),
          this.props.push(Ce, r, "")),
          (t = st);
      }
      (n || r) && this.props.push(t, r, n[t]);
    },
    ga = function (t) {
      t.translate &&
        (t.removeProperty("translate"),
        t.removeProperty("scale"),
        t.removeProperty("rotate"));
    },
    Xu = function () {
      var t = this.props,
        r = this.target,
        e = r.style,
        i = r._gsap,
        n,
        s;
      for (n = 0; n < t.length; n += 3)
        t[n + 1]
          ? (r[t[n]] = t[n + 2])
          : t[n + 2]
            ? (e[t[n]] = t[n + 2])
            : e.removeProperty(t[n].replace(Cs, "-$1").toLowerCase());
      if (this.tfm) {
        for (s in this.tfm) i[s] = this.tfm[s];
        i.svg &&
          (i.renderTransform(),
          r.setAttribute("data-svg-origin", this.svgo || "")),
          (n = Ss()),
          n && !n.isStart && !e[st] && (ga(e), (i.uncache = 1));
      }
    },
    ma = function (t, r) {
      var e = { target: t, props: [], revert: Xu, save: Bu };
      return (
        r &&
          r.split(",").forEach(function (i) {
            return e.save(i);
          }),
        e
      );
    },
    ya,
    Os = function (t, r) {
      var e = lr.createElementNS
        ? lr.createElementNS(
            (r || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"),
            t,
          )
        : lr.createElement(t);
      return e.style ? e : lr.createElement(t);
    },
    Re = function o(t, r, e) {
      var i = getComputedStyle(t);
      return (
        i[r] ||
        i.getPropertyValue(r.replace(Cs, "-$1").toLowerCase()) ||
        i.getPropertyValue(r) ||
        (!e && o(t, oi(r) || r, 1)) ||
        ""
      );
    },
    va = "O,Moz,ms,Ms,Webkit".split(","),
    oi = function (t, r, e) {
      var i = r || kr,
        n = i.style,
        s = 5;
      if (t in n && !e) return t;
      for (
        t = t.charAt(0).toUpperCase() + t.substr(1);
        s-- && !(va[s] + t in n);

      );
      return s < 0 ? null : (s === 3 ? "ms" : s >= 0 ? va[s] : "") + t;
    },
    ks = function () {
      Eu() &&
        window.document &&
        ((ca = window),
        (lr = ca.document),
        (ii = lr.documentElement),
        (kr = Os("div") || { style: {} }),
        Os("div"),
        (st = oi(st)),
        (Ce = st + "Origin"),
        (kr.style.cssText =
          "border-width:0;line-height:0;position:absolute;padding:0"),
        (ya = !!oi("perspective")),
        (Ss = ae.core.reverting),
        (Ts = 1));
    },
    Ms = function o(t) {
      var r = Os(
          "svg",
          (this.ownerSVGElement &&
            this.ownerSVGElement.getAttribute("xmlns")) ||
            "http://www.w3.org/2000/svg",
        ),
        e = this.parentNode,
        i = this.nextSibling,
        n = this.style.cssText,
        s;
      if (
        (ii.appendChild(r),
        r.appendChild(this),
        (this.style.display = "block"),
        t)
      )
        try {
          (s = this.getBBox()),
            (this._gsapBBox = this.getBBox),
            (this.getBBox = o);
        } catch {}
      else this._gsapBBox && (s = this._gsapBBox());
      return (
        e && (i ? e.insertBefore(this, i) : e.appendChild(this)),
        ii.removeChild(r),
        (this.style.cssText = n),
        s
      );
    },
    wa = function (t, r) {
      for (var e = r.length; e--; )
        if (t.hasAttribute(r[e])) return t.getAttribute(r[e]);
    },
    ba = function (t) {
      var r;
      try {
        r = t.getBBox();
      } catch {
        r = Ms.call(t, !0);
      }
      return (
        (r && (r.width || r.height)) ||
          t.getBBox === Ms ||
          (r = Ms.call(t, !0)),
        r && !r.width && !r.x && !r.y
          ? {
              x: +wa(t, ["x", "cx", "x1"]) || 0,
              y: +wa(t, ["y", "cy", "y1"]) || 0,
              width: 0,
              height: 0,
            }
          : r
      );
    },
    xa = function (t) {
      return !!(t.getCTM && (!t.parentNode || t.ownerSVGElement) && ba(t));
    },
    Di = function (t, r) {
      if (r) {
        var e = t.style;
        r in Ge && r !== Ce && (r = st),
          e.removeProperty
            ? ((r.substr(0, 2) === "ms" || r.substr(0, 6) === "webkit") &&
                (r = "-" + r),
              e.removeProperty(r.replace(Cs, "-$1").toLowerCase()))
            : e.removeAttribute(r);
      }
    },
    ur = function (t, r, e, i, n, s) {
      var a = new Jt(t._pt, r, e, 0, 1, s ? _a : pa);
      return (t._pt = a), (a.b = i), (a.e = n), t._props.push(e), a;
    },
    Ta = { deg: 1, rad: 1, turn: 1 },
    Vu = { grid: 1, flex: 1 },
    fr = function o(t, r, e, i) {
      var n = parseFloat(e) || 0,
        s = (e + "").trim().substr((n + "").length) || "px",
        a = kr.style,
        u = Du.test(r),
        l = t.tagName.toLowerCase() === "svg",
        f = (l ? "client" : "offset") + (u ? "Width" : "Height"),
        d = 100,
        h = i === "px",
        c = i === "%",
        _,
        p,
        g,
        v;
      return i === s || !n || Ta[i] || Ta[s]
        ? n
        : (s !== "px" && !h && (n = o(t, r, e, "px")),
          (v = t.getCTM && xa(t)),
          (c || s === "%") && (Ge[r] || ~r.indexOf("adius"))
            ? ((_ = v ? t.getBBox()[u ? "width" : "height"] : t[f]),
              dt(c ? (n / _) * d : (n / 100) * _))
            : ((a[u ? "width" : "height"] = d + (h ? s : i)),
              (p =
                ~r.indexOf("adius") || (i === "em" && t.appendChild && !l)
                  ? t
                  : t.parentNode),
              v && (p = (t.ownerSVGElement || {}).parentNode),
              (!p || p === lr || !p.appendChild) && (p = lr.body),
              (g = p._gsap),
              g && c && g.width && u && g.time === oe.time && !g.uncache
                ? dt((n / g.width) * d)
                : ((c || s === "%") &&
                    !Vu[Re(p, "display")] &&
                    (a.position = Re(t, "position")),
                  p === t && (a.position = "static"),
                  p.appendChild(kr),
                  (_ = kr[f]),
                  p.removeChild(kr),
                  (a.position = "absolute"),
                  u && c && ((g = Tr(p)), (g.time = oe.time), (g.width = p[f])),
                  dt(h ? (_ * n) / d : _ && n ? (d / _) * n : 0))));
    },
    Ke = function (t, r, e, i) {
      var n;
      return (
        Ts || ks(),
        r in je &&
          r !== "transform" &&
          ((r = je[r]), ~r.indexOf(",") && (r = r.split(",")[0])),
        Ge[r] && r !== "transform"
          ? ((n = Ri(t, i)),
            (n =
              r !== "transformOrigin"
                ? n[r]
                : n.svg
                  ? n.origin
                  : yn(Re(t, Ce)) + " " + n.zOrigin + "px"))
          : ((n = t.style[r]),
            (!n || n === "auto" || i || ~(n + "").indexOf("calc(")) &&
              (n =
                (mn[r] && mn[r](t, r, e)) ||
                Re(t, r) ||
                Mo(t, r) ||
                (r === "opacity" ? 1 : 0))),
        e && !~(n + "").trim().indexOf(" ") ? fr(t, r, n, e) + e : n
      );
    },
    Hu = function (t, r, e, i) {
      if (!e || e === "none") {
        var n = oi(r, t, 1),
          s = n && Re(t, n, 1);
        s && s !== e
          ? ((r = n), (e = s))
          : r === "borderColor" && (e = Re(t, "borderTopColor"));
      }
      var a = new Jt(this._pt, t.style, r, 0, 1, aa),
        u = 0,
        l = 0,
        f,
        d,
        h,
        c,
        _,
        p,
        g,
        v,
        y,
        w,
        m,
        x;
      if (
        ((a.b = e),
        (a.e = i),
        (e += ""),
        (i += ""),
        i === "auto" &&
          ((t.style[r] = i), (i = Re(t, r) || i), (t.style[r] = e)),
        (f = [e, i]),
        Zo(f),
        (e = f[0]),
        (i = f[1]),
        (h = e.match(jr) || []),
        (x = i.match(jr) || []),
        x.length)
      ) {
        for (; (d = jr.exec(i)); )
          (g = d[0]),
            (y = i.substring(u, d.index)),
            _
              ? (_ = (_ + 1) % 5)
              : (y.substr(-5) === "rgba(" || y.substr(-5) === "hsla(") &&
                (_ = 1),
            g !== (p = h[l++] || "") &&
              ((c = parseFloat(p) || 0),
              (m = p.substr((c + "").length)),
              g.charAt(1) === "=" && (g = Kr(c, g) + m),
              (v = parseFloat(g)),
              (w = g.substr((v + "").length)),
              (u = jr.lastIndex - w.length),
              w ||
                ((w = w || ie.units[r] || m),
                u === i.length && ((i += w), (a.e += w))),
              m !== w && (c = fr(t, r, p, w) || 0),
              (a._pt = {
                _next: a._pt,
                p: y || l === 1 ? y : ",",
                s: c,
                c: v - c,
                m: (_ && _ < 4) || r === "zIndex" ? Math.round : 0,
              }));
        a.c = u < i.length ? i.substring(u, i.length) : "";
      } else a.r = r === "display" && i === "none" ? _a : pa;
      return xo.test(i) && (a.e = 0), (this._pt = a), a;
    },
    Sa = {
      top: "0%",
      bottom: "100%",
      left: "0%",
      right: "100%",
      center: "50%",
    },
    Uu = function (t) {
      var r = t.split(" "),
        e = r[0],
        i = r[1] || "50%";
      return (
        (e === "top" || e === "bottom" || i === "left" || i === "right") &&
          ((t = e), (e = i), (i = t)),
        (r[0] = Sa[e] || e),
        (r[1] = Sa[i] || i),
        r.join(" ")
      );
    },
    qu = function (t, r) {
      if (r.tween && r.tween._time === r.tween._dur) {
        var e = r.t,
          i = e.style,
          n = r.u,
          s = e._gsap,
          a,
          u,
          l;
        if (n === "all" || n === !0) (i.cssText = ""), (u = 1);
        else
          for (n = n.split(","), l = n.length; --l > -1; )
            (a = n[l]),
              Ge[a] && ((u = 1), (a = a === "transformOrigin" ? Ce : st)),
              Di(e, a);
        u &&
          (Di(e, st),
          s &&
            (s.svg && e.removeAttribute("transform"),
            Ri(e, 1),
            (s.uncache = 1),
            ga(i)));
      }
    },
    mn = {
      clearProps: function (t, r, e, i, n) {
        if (n.data !== "isFromStart") {
          var s = (t._pt = new Jt(t._pt, r, e, 0, 0, qu));
          return (s.u = i), (s.pr = -10), (s.tween = n), t._props.push(e), 1;
        }
      },
    },
    Ai = [1, 0, 0, 1, 0, 0],
    Ca = {},
    Pa = function (t) {
      return t === "matrix(1, 0, 0, 1, 0, 0)" || t === "none" || !t;
    },
    Oa = function (t) {
      var r = Re(t, st);
      return Pa(r) ? Ai : r.substr(7).match(bo).map(dt);
    },
    Es = function (t, r) {
      var e = t._gsap || Tr(t),
        i = t.style,
        n = Oa(t),
        s,
        a,
        u,
        l;
      return e.svg && t.getAttribute("transform")
        ? ((u = t.transform.baseVal.consolidate().matrix),
          (n = [u.a, u.b, u.c, u.d, u.e, u.f]),
          n.join(",") === "1,0,0,1,0,0" ? Ai : n)
        : (n === Ai &&
            !t.offsetParent &&
            t !== ii &&
            !e.svg &&
            ((u = i.display),
            (i.display = "block"),
            (s = t.parentNode),
            (!s || !t.offsetParent) &&
              ((l = 1), (a = t.nextElementSibling), ii.appendChild(t)),
            (n = Oa(t)),
            u ? (i.display = u) : Di(t, "display"),
            l &&
              (a
                ? s.insertBefore(t, a)
                : s
                  ? s.appendChild(t)
                  : ii.removeChild(t))),
          r && n.length > 6 ? [n[0], n[1], n[4], n[5], n[12], n[13]] : n);
    },
    Ds = function (t, r, e, i, n, s) {
      var a = t._gsap,
        u = n || Es(t, !0),
        l = a.xOrigin || 0,
        f = a.yOrigin || 0,
        d = a.xOffset || 0,
        h = a.yOffset || 0,
        c = u[0],
        _ = u[1],
        p = u[2],
        g = u[3],
        v = u[4],
        y = u[5],
        w = r.split(" "),
        m = parseFloat(w[0]) || 0,
        x = parseFloat(w[1]) || 0,
        C,
        S,
        k,
        O;
      e
        ? u !== Ai &&
          (S = c * g - _ * p) &&
          ((k = m * (g / S) + x * (-p / S) + (p * y - g * v) / S),
          (O = m * (-_ / S) + x * (c / S) - (c * y - _ * v) / S),
          (m = k),
          (x = O))
        : ((C = ba(t)),
          (m = C.x + (~w[0].indexOf("%") ? (m / 100) * C.width : m)),
          (x =
            C.y + (~(w[1] || w[0]).indexOf("%") ? (x / 100) * C.height : x))),
        i || (i !== !1 && a.smooth)
          ? ((v = m - l),
            (y = x - f),
            (a.xOffset = d + (v * c + y * p) - v),
            (a.yOffset = h + (v * _ + y * g) - y))
          : (a.xOffset = a.yOffset = 0),
        (a.xOrigin = m),
        (a.yOrigin = x),
        (a.smooth = !!i),
        (a.origin = r),
        (a.originIsAbsolute = !!e),
        (t.style[Ce] = "0px 0px"),
        s &&
          (ur(s, a, "xOrigin", l, m),
          ur(s, a, "yOrigin", f, x),
          ur(s, a, "xOffset", d, a.xOffset),
          ur(s, a, "yOffset", h, a.yOffset)),
        t.setAttribute("data-svg-origin", m + " " + x);
    },
    Ri = function (t, r) {
      var e = t._gsap || new ea(t);
      if ("x" in e && !r && !e.uncache) return e;
      var i = t.style,
        n = e.scaleX < 0,
        s = "px",
        a = "deg",
        u = getComputedStyle(t),
        l = Re(t, Ce) || "0",
        f,
        d,
        h,
        c,
        _,
        p,
        g,
        v,
        y,
        w,
        m,
        x,
        C,
        S,
        k,
        O,
        M,
        E,
        D,
        X,
        W,
        $,
        z,
        B,
        N,
        V,
        b,
        et,
        Pt,
        re,
        Ot,
        Nt;
      return (
        (f = d = h = p = g = v = y = w = m = 0),
        (c = _ = 1),
        (e.svg = !!(t.getCTM && xa(t))),
        u.translate &&
          ((u.translate !== "none" ||
            u.scale !== "none" ||
            u.rotate !== "none") &&
            (i[st] =
              (u.translate !== "none"
                ? "translate3d(" +
                  (u.translate + " 0 0").split(" ").slice(0, 3).join(", ") +
                  ") "
                : "") +
              (u.rotate !== "none" ? "rotate(" + u.rotate + ") " : "") +
              (u.scale !== "none"
                ? "scale(" + u.scale.split(" ").join(",") + ") "
                : "") +
              (u[st] !== "none" ? u[st] : "")),
          (i.scale = i.rotate = i.translate = "none")),
        (S = Es(t, e.svg)),
        e.svg &&
          (e.uncache
            ? ((N = t.getBBox()),
              (l = e.xOrigin - N.x + "px " + (e.yOrigin - N.y) + "px"),
              (B = ""))
            : (B = !r && t.getAttribute("data-svg-origin")),
          Ds(t, B || l, !!B || e.originIsAbsolute, e.smooth !== !1, S)),
        (x = e.xOrigin || 0),
        (C = e.yOrigin || 0),
        S !== Ai &&
          ((E = S[0]),
          (D = S[1]),
          (X = S[2]),
          (W = S[3]),
          (f = $ = S[4]),
          (d = z = S[5]),
          S.length === 6
            ? ((c = Math.sqrt(E * E + D * D)),
              (_ = Math.sqrt(W * W + X * X)),
              (p = E || D ? si(D, E) * Mr : 0),
              (y = X || W ? si(X, W) * Mr + p : 0),
              y && (_ *= Math.abs(Math.cos(y * ni))),
              e.svg && ((f -= x - (x * E + C * X)), (d -= C - (x * D + C * W))))
            : ((Nt = S[6]),
              (re = S[7]),
              (b = S[8]),
              (et = S[9]),
              (Pt = S[10]),
              (Ot = S[11]),
              (f = S[12]),
              (d = S[13]),
              (h = S[14]),
              (k = si(Nt, Pt)),
              (g = k * Mr),
              k &&
                ((O = Math.cos(-k)),
                (M = Math.sin(-k)),
                (B = $ * O + b * M),
                (N = z * O + et * M),
                (V = Nt * O + Pt * M),
                (b = $ * -M + b * O),
                (et = z * -M + et * O),
                (Pt = Nt * -M + Pt * O),
                (Ot = re * -M + Ot * O),
                ($ = B),
                (z = N),
                (Nt = V)),
              (k = si(-X, Pt)),
              (v = k * Mr),
              k &&
                ((O = Math.cos(-k)),
                (M = Math.sin(-k)),
                (B = E * O - b * M),
                (N = D * O - et * M),
                (V = X * O - Pt * M),
                (Ot = W * M + Ot * O),
                (E = B),
                (D = N),
                (X = V)),
              (k = si(D, E)),
              (p = k * Mr),
              k &&
                ((O = Math.cos(k)),
                (M = Math.sin(k)),
                (B = E * O + D * M),
                (N = $ * O + z * M),
                (D = D * O - E * M),
                (z = z * O - $ * M),
                (E = B),
                ($ = N)),
              g &&
                Math.abs(g) + Math.abs(p) > 359.9 &&
                ((g = p = 0), (v = 180 - v)),
              (c = dt(Math.sqrt(E * E + D * D + X * X))),
              (_ = dt(Math.sqrt(z * z + Nt * Nt))),
              (k = si($, z)),
              (y = Math.abs(k) > 2e-4 ? k * Mr : 0),
              (m = Ot ? 1 / (Ot < 0 ? -Ot : Ot) : 0)),
          e.svg &&
            ((B = t.getAttribute("transform")),
            (e.forceCSS = t.setAttribute("transform", "") || !Pa(Re(t, st))),
            B && t.setAttribute("transform", B))),
        Math.abs(y) > 90 &&
          Math.abs(y) < 270 &&
          (n
            ? ((c *= -1),
              (y += p <= 0 ? 180 : -180),
              (p += p <= 0 ? 180 : -180))
            : ((_ *= -1), (y += y <= 0 ? 180 : -180))),
        (r = r || e.uncache),
        (e.x =
          f -
          ((e.xPercent =
            f &&
            ((!r && e.xPercent) ||
              (Math.round(t.offsetWidth / 2) === Math.round(-f) ? -50 : 0)))
            ? (t.offsetWidth * e.xPercent) / 100
            : 0) +
          s),
        (e.y =
          d -
          ((e.yPercent =
            d &&
            ((!r && e.yPercent) ||
              (Math.round(t.offsetHeight / 2) === Math.round(-d) ? -50 : 0)))
            ? (t.offsetHeight * e.yPercent) / 100
            : 0) +
          s),
        (e.z = h + s),
        (e.scaleX = dt(c)),
        (e.scaleY = dt(_)),
        (e.rotation = dt(p) + a),
        (e.rotationX = dt(g) + a),
        (e.rotationY = dt(v) + a),
        (e.skewX = y + a),
        (e.skewY = w + a),
        (e.transformPerspective = m + s),
        (e.zOrigin = parseFloat(l.split(" ")[2]) || 0) && (i[Ce] = yn(l)),
        (e.xOffset = e.yOffset = 0),
        (e.force3D = ie.force3D),
        (e.renderTransform = e.svg ? ju : ya ? ka : Gu),
        (e.uncache = 0),
        e
      );
    },
    yn = function (t) {
      return (t = t.split(" "))[0] + " " + t[1];
    },
    As = function (t, r, e) {
      var i = Rt(r);
      return dt(parseFloat(r) + parseFloat(fr(t, "x", e + "px", i))) + i;
    },
    Gu = function (t, r) {
      (r.z = "0px"),
        (r.rotationY = r.rotationX = "0deg"),
        (r.force3D = 0),
        ka(t, r);
    },
    Er = "0deg",
    Li = "0px",
    Dr = ") ",
    ka = function (t, r) {
      var e = r || this,
        i = e.xPercent,
        n = e.yPercent,
        s = e.x,
        a = e.y,
        u = e.z,
        l = e.rotation,
        f = e.rotationY,
        d = e.rotationX,
        h = e.skewX,
        c = e.skewY,
        _ = e.scaleX,
        p = e.scaleY,
        g = e.transformPerspective,
        v = e.force3D,
        y = e.target,
        w = e.zOrigin,
        m = "",
        x = (v === "auto" && t && t !== 1) || v === !0;
      if (w && (d !== Er || f !== Er)) {
        var C = parseFloat(f) * ni,
          S = Math.sin(C),
          k = Math.cos(C),
          O;
        (C = parseFloat(d) * ni),
          (O = Math.cos(C)),
          (s = As(y, s, S * O * -w)),
          (a = As(y, a, -Math.sin(C) * -w)),
          (u = As(y, u, k * O * -w + w));
      }
      g !== Li && (m += "perspective(" + g + Dr),
        (i || n) && (m += "translate(" + i + "%, " + n + "%) "),
        (x || s !== Li || a !== Li || u !== Li) &&
          (m +=
            u !== Li || x
              ? "translate3d(" + s + ", " + a + ", " + u + ") "
              : "translate(" + s + ", " + a + Dr),
        l !== Er && (m += "rotate(" + l + Dr),
        f !== Er && (m += "rotateY(" + f + Dr),
        d !== Er && (m += "rotateX(" + d + Dr),
        (h !== Er || c !== Er) && (m += "skew(" + h + ", " + c + Dr),
        (_ !== 1 || p !== 1) && (m += "scale(" + _ + ", " + p + Dr),
        (y.style[st] = m || "translate(0, 0)");
    },
    ju = function (t, r) {
      var e = r || this,
        i = e.xPercent,
        n = e.yPercent,
        s = e.x,
        a = e.y,
        u = e.rotation,
        l = e.skewX,
        f = e.skewY,
        d = e.scaleX,
        h = e.scaleY,
        c = e.target,
        _ = e.xOrigin,
        p = e.yOrigin,
        g = e.xOffset,
        v = e.yOffset,
        y = e.forceCSS,
        w = parseFloat(s),
        m = parseFloat(a),
        x,
        C,
        S,
        k,
        O;
      (u = parseFloat(u)),
        (l = parseFloat(l)),
        (f = parseFloat(f)),
        f && ((f = parseFloat(f)), (l += f), (u += f)),
        u || l
          ? ((u *= ni),
            (l *= ni),
            (x = Math.cos(u) * d),
            (C = Math.sin(u) * d),
            (S = Math.sin(u - l) * -h),
            (k = Math.cos(u - l) * h),
            l &&
              ((f *= ni),
              (O = Math.tan(l - f)),
              (O = Math.sqrt(1 + O * O)),
              (S *= O),
              (k *= O),
              f &&
                ((O = Math.tan(f)),
                (O = Math.sqrt(1 + O * O)),
                (x *= O),
                (C *= O))),
            (x = dt(x)),
            (C = dt(C)),
            (S = dt(S)),
            (k = dt(k)))
          : ((x = d), (k = h), (C = S = 0)),
        ((w && !~(s + "").indexOf("px")) || (m && !~(a + "").indexOf("px"))) &&
          ((w = fr(c, "x", s, "px")), (m = fr(c, "y", a, "px"))),
        (_ || p || g || v) &&
          ((w = dt(w + _ - (_ * x + p * S) + g)),
          (m = dt(m + p - (_ * C + p * k) + v))),
        (i || n) &&
          ((O = c.getBBox()),
          (w = dt(w + (i / 100) * O.width)),
          (m = dt(m + (n / 100) * O.height))),
        (O =
          "matrix(" +
          x +
          "," +
          C +
          "," +
          S +
          "," +
          k +
          "," +
          w +
          "," +
          m +
          ")"),
        c.setAttribute("transform", O),
        y && (c.style[st] = O);
    },
    Ku = function (t, r, e, i, n) {
      var s = 360,
        a = St(n),
        u = parseFloat(n) * (a && ~n.indexOf("rad") ? Mr : 1),
        l = u - i,
        f = i + l + "deg",
        d,
        h;
      return (
        a &&
          ((d = n.split("_")[1]),
          d === "short" &&
            ((l %= s), l !== l % (s / 2) && (l += l < 0 ? s : -s)),
          d === "cw" && l < 0
            ? (l = ((l + s * da) % s) - ~~(l / s) * s)
            : d === "ccw" && l > 0 && (l = ((l - s * da) % s) - ~~(l / s) * s)),
        (t._pt = h = new Jt(t._pt, r, e, i, l, Ru)),
        (h.e = f),
        (h.u = "deg"),
        t._props.push(e),
        h
      );
    },
    Ma = function (t, r) {
      for (var e in r) t[e] = r[e];
      return t;
    },
    Zu = function (t, r, e) {
      var i = Ma({}, e._gsap),
        n = "perspective,force3D,transformOrigin,svgOrigin",
        s = e.style,
        a,
        u,
        l,
        f,
        d,
        h,
        c,
        _;
      i.svg
        ? ((l = e.getAttribute("transform")),
          e.setAttribute("transform", ""),
          (s[st] = r),
          (a = Ri(e, 1)),
          Di(e, st),
          e.setAttribute("transform", l))
        : ((l = getComputedStyle(e)[st]),
          (s[st] = r),
          (a = Ri(e, 1)),
          (s[st] = l));
      for (u in Ge)
        (l = i[u]),
          (f = a[u]),
          l !== f &&
            n.indexOf(u) < 0 &&
            ((c = Rt(l)),
            (_ = Rt(f)),
            (d = c !== _ ? fr(e, u, l, _) : parseFloat(l)),
            (h = parseFloat(f)),
            (t._pt = new Jt(t._pt, a, u, d, h - d, Ps)),
            (t._pt.u = _ || 0),
            t._props.push(u));
      Ma(a, i);
    };
  Zt("padding,margin,Width,Radius", function (o, t) {
    var r = "Top",
      e = "Right",
      i = "Bottom",
      n = "Left",
      s = (t < 3 ? [r, e, i, n] : [r + n, r + e, i + e, i + n]).map(
        function (a) {
          return t < 2 ? o + a : "border" + a + o;
        },
      );
    mn[t > 1 ? "border" + o : o] = function (a, u, l, f, d) {
      var h, c;
      if (arguments.length < 4)
        return (
          (h = s.map(function (_) {
            return Ke(a, _, l);
          })),
          (c = h.join(" ")),
          c.split(h[0]).length === 5 ? h[0] : c
        );
      (h = (f + "").split(" ")),
        (c = {}),
        s.forEach(function (_, p) {
          return (c[_] = h[p] = h[p] || h[((p - 1) / 2) | 0]);
        }),
        a.init(u, c, d);
    };
  });
  var Ea = {
    name: "css",
    register: ks,
    targetTest: function (t) {
      return t.style && t.nodeType;
    },
    init: function (t, r, e, i, n) {
      var s = this._props,
        a = t.style,
        u = e.vars.startAt,
        l,
        f,
        d,
        h,
        c,
        _,
        p,
        g,
        v,
        y,
        w,
        m,
        x,
        C,
        S,
        k;
      Ts || ks(),
        (this.styles = this.styles || ma(t)),
        (k = this.styles.props),
        (this.tween = e);
      for (p in r)
        if (
          p !== "autoRound" &&
          ((f = r[p]), !(se[p] && ra(p, r, e, i, t, n)))
        ) {
          if (
            ((c = typeof f),
            (_ = mn[p]),
            c === "function" && ((f = f.call(e, i, t, n)), (c = typeof f)),
            c === "string" && ~f.indexOf("random(") && (f = Pi(f)),
            _)
          )
            _(this, t, p, f, e) && (S = 1);
          else if (p.substr(0, 2) === "--")
            (l = (getComputedStyle(t).getPropertyValue(p) + "").trim()),
              (f += ""),
              (or.lastIndex = 0),
              or.test(l) || ((g = Rt(l)), (v = Rt(f))),
              v ? g !== v && (l = fr(t, p, l, v) + v) : g && (f += g),
              this.add(a, "setProperty", l, f, i, n, 0, 0, p),
              s.push(p),
              k.push(p, 0, a[p]);
          else if (c !== "undefined") {
            if (
              (u && p in u
                ? ((l =
                    typeof u[p] == "function" ? u[p].call(e, i, t, n) : u[p]),
                  St(l) && ~l.indexOf("random(") && (l = Pi(l)),
                  Rt(l + "") || (l += ie.units[p] || Rt(Ke(t, p)) || ""),
                  (l + "").charAt(1) === "=" && (l = Ke(t, p)))
                : (l = Ke(t, p)),
              (h = parseFloat(l)),
              (y = c === "string" && f.charAt(1) === "=" && f.substr(0, 2)),
              y && (f = f.substr(2)),
              (d = parseFloat(f)),
              p in je &&
                (p === "autoAlpha" &&
                  (h === 1 && Ke(t, "visibility") === "hidden" && d && (h = 0),
                  k.push("visibility", 0, a.visibility),
                  ur(
                    this,
                    a,
                    "visibility",
                    h ? "inherit" : "hidden",
                    d ? "inherit" : "hidden",
                    !d,
                  )),
                p !== "scale" &&
                  p !== "transform" &&
                  ((p = je[p]), ~p.indexOf(",") && (p = p.split(",")[0]))),
              (w = p in Ge),
              w)
            ) {
              if (
                (this.styles.save(p),
                m ||
                  ((x = t._gsap),
                  (x.renderTransform && !r.parseTransform) ||
                    Ri(t, r.parseTransform),
                  (C = r.smoothOrigin !== !1 && x.smooth),
                  (m = this._pt =
                    new Jt(this._pt, a, st, 0, 1, x.renderTransform, x, 0, -1)),
                  (m.dep = 1)),
                p === "scale")
              )
                (this._pt = new Jt(
                  this._pt,
                  x,
                  "scaleY",
                  h,
                  (y ? Kr(h, y + d) : d) - h || 0,
                  Ps,
                )),
                  (this._pt.u = 0),
                  s.push("scaleY", p),
                  (p += "X");
              else if (p === "transformOrigin") {
                k.push(Ce, 0, a[Ce]),
                  (f = Uu(f)),
                  x.svg
                    ? Ds(t, f, 0, C, 0, this)
                    : ((v = parseFloat(f.split(" ")[2]) || 0),
                      v !== x.zOrigin && ur(this, x, "zOrigin", x.zOrigin, v),
                      ur(this, a, p, yn(l), yn(f)));
                continue;
              } else if (p === "svgOrigin") {
                Ds(t, f, 1, C, 0, this);
                continue;
              } else if (p in Ca) {
                Ku(this, x, p, h, y ? Kr(h, y + f) : f);
                continue;
              } else if (p === "smoothOrigin") {
                ur(this, x, "smooth", x.smooth, f);
                continue;
              } else if (p === "force3D") {
                x[p] = f;
                continue;
              } else if (p === "transform") {
                Zu(this, f, t);
                continue;
              }
            } else p in a || (p = oi(p) || p);
            if (
              w ||
              ((d || d === 0) && (h || h === 0) && !Au.test(f) && p in a)
            )
              (g = (l + "").substr((h + "").length)),
                d || (d = 0),
                (v = Rt(f) || (p in ie.units ? ie.units[p] : g)),
                g !== v && (h = fr(t, p, l, v)),
                (this._pt = new Jt(
                  this._pt,
                  w ? x : a,
                  p,
                  h,
                  (y ? Kr(h, y + d) : d) - h,
                  !w && (v === "px" || p === "zIndex") && r.autoRound !== !1
                    ? zu
                    : Ps,
                )),
                (this._pt.u = v || 0),
                g !== v && v !== "%" && ((this._pt.b = l), (this._pt.r = Lu));
            else if (p in a) Hu.call(this, t, p, l, y ? y + f : f);
            else if (p in t) this.add(t, p, l || t[p], y ? y + f : f, i, n);
            else {
              ts(p, f);
              continue;
            }
            w || (p in a ? k.push(p, 0, a[p]) : k.push(p, 1, l || t[p])),
              s.push(p);
          }
        }
      S && la(this);
    },
    render: function (t, r) {
      if (r.tween._time || !Ss())
        for (var e = r._pt; e; ) e.r(t, e.d), (e = e._next);
      else r.styles.revert();
    },
    get: Ke,
    aliases: je,
    getSetter: function (t, r, e) {
      var i = je[r];
      return (
        i && i.indexOf(",") < 0 && (r = i),
        r in Ge && r !== Ce && (t._gsap.x || Ke(t, "x"))
          ? e && ha === e
            ? r === "scale"
              ? Wu
              : $u
            : (ha = e || {}) && (r === "scale" ? Iu : Yu)
          : t.style && !jn(t.style[r])
            ? Nu
            : ~r.indexOf("-")
              ? Fu
              : ys(t, r)
      );
    },
    core: { _removeProperty: Di, _getMatrix: Es },
  };
  (ae.utils.checkPrefix = oi),
    (ae.core.getStyleSaver = ma),
    (function (o, t, r, e) {
      var i = Zt(o + "," + t + "," + r, function (n) {
        Ge[n] = 1;
      });
      Zt(t, function (n) {
        (ie.units[n] = "deg"), (Ca[n] = 1);
      }),
        (je[i[13]] = o + "," + t),
        Zt(e, function (n) {
          var s = n.split(":");
          je[s[1]] = i[s[0]];
        });
    })(
      "x,y,z,scale,scaleX,scaleY,xPercent,yPercent",
      "rotation,rotationX,rotationY,skewX,skewY",
      "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective",
      "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY",
    ),
    Zt(
      "x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",
      function (o) {
        ie.units[o] = "px";
      },
    ),
    ae.registerPlugin(Ea);
  var Rs = ae.registerPlugin(Ea) || ae;
  Rs.core.Tween;
  function Da(o, t) {
    for (var r = 0; r < t.length; r++) {
      var e = t[r];
      (e.enumerable = e.enumerable || !1),
        (e.configurable = !0),
        "value" in e && (e.writable = !0),
        Object.defineProperty(o, e.key, e);
    }
  }
  function Qu(o, t, r) {
    return t && Da(o.prototype, t), r && Da(o, r), o;
  }
  /*!
   * Observer 3.11.3
   * https://greensock.com
   *
   * @license Copyright 2008-2022, GreenSock. All rights reserved.
   * Subject to the terms at https://greensock.com/standard-license or for
   * Club GreenSock members, the agreement issued with that membership.
   * @author: Jack Doyle, jack@greensock.com
   */ var Lt,
    Ls,
    le,
    cr,
    hr,
    ai,
    Aa,
    Ar,
    zi,
    Ra,
    Ze,
    Pe,
    La = function () {
      return (
        Lt ||
        (typeof window < "u" && (Lt = window.gsap) && Lt.registerPlugin && Lt)
      );
    },
    za = 1,
    li = [],
    U = [],
    Le = [],
    Ni = Date.now,
    zs = function (t, r) {
      return r;
    },
    Ju = function () {
      var t = zi.core,
        r = t.bridge || {},
        e = t._scrollers,
        i = t._proxies;
      e.push.apply(e, U),
        i.push.apply(i, Le),
        (U = e),
        (Le = i),
        (zs = function (s, a) {
          return r[s](a);
        });
    },
    dr = function (t, r) {
      return ~Le.indexOf(t) && Le[Le.indexOf(t) + 1][r];
    },
    Fi = function (t) {
      return !!~Ra.indexOf(t);
    },
    te = function (t, r, e, i, n) {
      return t.addEventListener(r, e, { passive: !i, capture: !!n });
    },
    It = function (t, r, e, i) {
      return t.removeEventListener(r, e, !!i);
    },
    vn = "scrollLeft",
    wn = "scrollTop",
    Ns = function () {
      return (Ze && Ze.isPressed) || U.cache++;
    },
    bn = function (t, r) {
      var e = function i(n) {
        if (n || n === 0) {
          za && (le.history.scrollRestoration = "manual");
          var s = Ze && Ze.isPressed;
          (n = i.v = Math.round(n) || (Ze && Ze.iOS ? 1 : 0)),
            t(n),
            (i.cacheID = U.cache),
            s && zs("ss", n);
        } else
          (r || U.cache !== i.cacheID || zs("ref")) &&
            ((i.cacheID = U.cache), (i.v = t()));
        return i.v + i.offset;
      };
      return (e.offset = 0), t && e;
    },
    Yt = {
      s: vn,
      p: "left",
      p2: "Left",
      os: "right",
      os2: "Right",
      d: "width",
      d2: "Width",
      a: "x",
      sc: bn(function (o) {
        return arguments.length
          ? le.scrollTo(o, bt.sc())
          : le.pageXOffset || cr[vn] || hr[vn] || ai[vn] || 0;
      }),
    },
    bt = {
      s: wn,
      p: "top",
      p2: "Top",
      os: "bottom",
      os2: "Bottom",
      d: "height",
      d2: "Height",
      a: "y",
      op: Yt,
      sc: bn(function (o) {
        return arguments.length
          ? le.scrollTo(Yt.sc(), o)
          : le.pageYOffset || cr[wn] || hr[wn] || ai[wn] || 0;
      }),
    },
    ee = function (t) {
      return (
        Lt.utils.toArray(t)[0] ||
        (typeof t == "string" && Lt.config().nullTargetWarn !== !1
          ? console.warn("Element not found:", t)
          : null)
      );
    },
    pr = function (t, r) {
      var e = r.s,
        i = r.sc;
      Fi(t) && (t = cr.scrollingElement || hr);
      var n = U.indexOf(t),
        s = i === bt.sc ? 1 : 2;
      !~n && (n = U.push(t) - 1), U[n + s] || t.addEventListener("scroll", Ns);
      var a = U[n + s],
        u =
          a ||
          (U[n + s] =
            bn(dr(t, e), !0) ||
            (Fi(t)
              ? i
              : bn(function (l) {
                  return arguments.length ? (t[e] = l) : t[e];
                })));
      return (
        (u.target = t),
        a || (u.smooth = Lt.getProperty(t, "scrollBehavior") === "smooth"),
        u
      );
    },
    Fs = function (t, r, e) {
      var i = t,
        n = t,
        s = Ni(),
        a = s,
        u = r || 50,
        l = Math.max(500, u * 3),
        f = function (_, p) {
          var g = Ni();
          p || g - s > u
            ? ((n = i), (i = _), (a = s), (s = g))
            : e
              ? (i += _)
              : (i = n + ((_ - n) / (g - a)) * (s - a));
        },
        d = function () {
          (n = i = e ? 0 : i), (a = s = 0);
        },
        h = function (_) {
          var p = a,
            g = n,
            v = Ni();
          return (
            (_ || _ === 0) && _ !== i && f(_),
            s === a || v - a > l
              ? 0
              : ((i + (e ? g : -g)) / ((e ? v : s) - p)) * 1e3
          );
        };
      return { update: f, reset: d, getVelocity: h };
    },
    $i = function (t, r) {
      return (
        r && !t._gsapAllow && t.preventDefault(),
        t.changedTouches ? t.changedTouches[0] : t
      );
    },
    Na = function (t) {
      var r = Math.max.apply(Math, t),
        e = Math.min.apply(Math, t);
      return Math.abs(r) >= Math.abs(e) ? r : e;
    },
    Fa = function () {
      (zi = Lt.core.globals().ScrollTrigger), zi && zi.core && Ju();
    },
    $a = function (t) {
      return (
        (Lt = t || La()),
        Lt &&
          typeof document < "u" &&
          document.body &&
          ((le = window),
          (cr = document),
          (hr = cr.documentElement),
          (ai = cr.body),
          (Ra = [le, cr, hr, ai]),
          Lt.utils.clamp,
          (Ar = "onpointerenter" in ai ? "pointer" : "mouse"),
          (Aa = mt.isTouch =
            le.matchMedia &&
            le.matchMedia("(hover: none), (pointer: coarse)").matches
              ? 1
              : "ontouchstart" in le ||
                  navigator.maxTouchPoints > 0 ||
                  navigator.msMaxTouchPoints > 0
                ? 2
                : 0),
          (Pe = mt.eventTypes =
            (
              "ontouchstart" in hr
                ? "touchstart,touchmove,touchcancel,touchend"
                : "onpointerdown" in hr
                  ? "pointerdown,pointermove,pointercancel,pointerup"
                  : "mousedown,mousemove,mouseup,mouseup"
            ).split(",")),
          setTimeout(function () {
            return (za = 0);
          }, 500),
          Fa(),
          (Ls = 1)),
        Ls
      );
    };
  (Yt.op = bt), (U.cache = 0);
  var mt = (function () {
    function o(r) {
      this.init(r);
    }
    var t = o.prototype;
    return (
      (t.init = function (e) {
        Ls || $a(Lt) || console.warn("Please gsap.registerPlugin(Observer)"),
          zi || Fa();
        var i = e.tolerance,
          n = e.dragMinimum,
          s = e.type,
          a = e.target,
          u = e.lineHeight,
          l = e.debounce,
          f = e.preventDefault,
          d = e.onStop,
          h = e.onStopDelay,
          c = e.ignore,
          _ = e.wheelSpeed,
          p = e.event,
          g = e.onDragStart,
          v = e.onDragEnd,
          y = e.onDrag,
          w = e.onPress,
          m = e.onRelease,
          x = e.onRight,
          C = e.onLeft,
          S = e.onUp,
          k = e.onDown,
          O = e.onChangeX,
          M = e.onChangeY,
          E = e.onChange,
          D = e.onToggleX,
          X = e.onToggleY,
          W = e.onHover,
          $ = e.onHoverEnd,
          z = e.onMove,
          B = e.ignoreCheck,
          N = e.isNormalizer,
          V = e.onGestureStart,
          b = e.onGestureEnd,
          et = e.onWheel,
          Pt = e.onEnable,
          re = e.onDisable,
          Ot = e.onClick,
          Nt = e.scrollSpeed,
          rt = e.capture,
          Ft = e.allowClicks,
          Ht = e.lockAxis,
          ji = e.onLockAxis;
        (this.target = a = ee(a) || hr),
          (this.vars = e),
          c && (c = Lt.utils.toArray(c)),
          (i = i || 1e-9),
          (n = n || 0),
          (_ = _ || 1),
          (Nt = Nt || 1),
          (s = s || "wheel,touch,pointer"),
          (l = l !== !1),
          u || (u = parseFloat(le.getComputedStyle(ai).lineHeight) || 22);
        var ce,
          Te,
          K,
          $t,
          he,
          We,
          Ut,
          T = this,
          tr = 0,
          it = 0,
          mr = pr(a, Yt),
          yr = pr(a, bt),
          mi = mr(),
          qt = yr(),
          Ki =
            ~s.indexOf("touch") &&
            !~s.indexOf("pointer") &&
            Pe[0] === "pointerdown",
          vr = Fi(a),
          _t = a.ownerDocument || cr,
          de = [0, 0, 0],
          Wt = [0, 0, 0],
          Zi = 0,
          Gt = function () {
            return (Zi = Ni());
          },
          Ie = function (P, A) {
            return (
              ((T.event = P) && c && ~c.indexOf(P.target)) ||
              (A && Ki && P.pointerType !== "touch") ||
              (B && B(P, A))
            );
          },
          Qi = function () {
            T._vx.reset(), T._vy.reset(), Te.pause(), d && d(T);
          },
          wr = function () {
            var P = (T.deltaX = Na(de)),
              A = (T.deltaY = Na(Wt)),
              R = Math.abs(P) >= i,
              F = Math.abs(A) >= i;
            E && (R || F) && E(T, P, A, de, Wt),
              R &&
                (x && T.deltaX > 0 && x(T),
                C && T.deltaX < 0 && C(T),
                O && O(T),
                D && T.deltaX < 0 != tr < 0 && D(T),
                (tr = T.deltaX),
                (de[0] = de[1] = de[2] = 0)),
              F &&
                (k && T.deltaY > 0 && k(T),
                S && T.deltaY < 0 && S(T),
                M && M(T),
                X && T.deltaY < 0 != it < 0 && X(T),
                (it = T.deltaY),
                (Wt[0] = Wt[1] = Wt[2] = 0)),
              ($t || K) && (z && z(T), K && (y(T), (K = !1)), ($t = !1)),
              We && !(We = !1) && ji && ji(T),
              he && (et(T), (he = !1)),
              (ce = 0);
          },
          Hr = function (P, A, R) {
            (de[R] += P),
              (Wt[R] += A),
              T._vx.update(P),
              T._vy.update(A),
              l ? ce || (ce = requestAnimationFrame(wr)) : wr();
          },
          yi = function (P, A) {
            Ht &&
              !Ut &&
              ((T.axis = Ut = Math.abs(P) > Math.abs(A) ? "x" : "y"),
              (We = !0)),
              Ut !== "y" && ((de[2] += P), T._vx.update(P, !0)),
              Ut !== "x" && ((Wt[2] += A), T._vy.update(A, !0)),
              l ? ce || (ce = requestAnimationFrame(wr)) : wr();
          },
          Z = function (P) {
            if (!Ie(P, 1)) {
              P = $i(P, f);
              var A = P.clientX,
                R = P.clientY,
                F = A - T.x,
                xt = R - T.y,
                I = T.isDragging;
              (T.x = A),
                (T.y = R),
                (I ||
                  Math.abs(T.startX - A) >= n ||
                  Math.abs(T.startY - R) >= n) &&
                  (y && (K = !0),
                  I || (T.isDragging = !0),
                  yi(F, xt),
                  I || (g && g(T)));
            }
          },
          br = (T.onPress = function (j) {
            Ie(j, 1) ||
              ((T.axis = Ut = null),
              Te.pause(),
              (T.isPressed = !0),
              (j = $i(j)),
              (tr = it = 0),
              (T.startX = T.x = j.clientX),
              (T.startY = T.y = j.clientY),
              T._vx.reset(),
              T._vy.reset(),
              te(N ? a : _t, Pe[1], Z, f, !0),
              (T.deltaX = T.deltaY = 0),
              w && w(T));
          }),
          pe = function (P) {
            if (!Ie(P, 1)) {
              It(N ? a : _t, Pe[1], Z, !0);
              var A =
                  T.isDragging &&
                  (Math.abs(T.x - T.startX) > 3 ||
                    Math.abs(T.y - T.startY) > 3),
                R = $i(P);
              A ||
                (T._vx.reset(),
                T._vy.reset(),
                f &&
                  Ft &&
                  Lt.delayedCall(0.08, function () {
                    if (Ni() - Zi > 300 && !P.defaultPrevented) {
                      if (P.target.click) P.target.click();
                      else if (_t.createEvent) {
                        var F = _t.createEvent("MouseEvents");
                        F.initMouseEvent(
                          "click",
                          !0,
                          !0,
                          le,
                          1,
                          R.screenX,
                          R.screenY,
                          R.clientX,
                          R.clientY,
                          !1,
                          !1,
                          !1,
                          !1,
                          0,
                          null,
                        ),
                          P.target.dispatchEvent(F);
                      }
                    }
                  })),
                (T.isDragging = T.isGesturing = T.isPressed = !1),
                d && !N && Te.restart(!0),
                v && A && v(T),
                m && m(T, A);
            }
          },
          Me = function (P) {
            return (
              P.touches &&
              P.touches.length > 1 &&
              (T.isGesturing = !0) &&
              V(P, T.isDragging)
            );
          },
          Ye = function () {
            return (T.isGesturing = !1) || b(T);
          },
          Be = function (P) {
            if (!Ie(P)) {
              var A = mr(),
                R = yr();
              Hr((A - mi) * Nt, (R - qt) * Nt, 1),
                (mi = A),
                (qt = R),
                d && Te.restart(!0);
            }
          },
          Ur = function (P) {
            if (!Ie(P)) {
              (P = $i(P, f)), et && (he = !0);
              var A =
                (P.deltaMode === 1
                  ? u
                  : P.deltaMode === 2
                    ? le.innerHeight
                    : 1) * _;
              Hr(P.deltaX * A, P.deltaY * A, 0), d && !N && Te.restart(!0);
            }
          },
          vi = function (P) {
            if (!Ie(P)) {
              var A = P.clientX,
                R = P.clientY,
                F = A - T.x,
                xt = R - T.y;
              (T.x = A), (T.y = R), ($t = !0), (F || xt) && yi(F, xt);
            }
          },
          er = function (P) {
            (T.event = P), W(T);
          },
          Ji = function (P) {
            (T.event = P), $(T);
          },
          tn = function (P) {
            return Ie(P) || ($i(P, f) && Ot(T));
          };
        (Te = T._dc = Lt.delayedCall(h || 0.25, Qi).pause()),
          (T.deltaX = T.deltaY = 0),
          (T._vx = Fs(0, 50, !0)),
          (T._vy = Fs(0, 50, !0)),
          (T.scrollX = mr),
          (T.scrollY = yr),
          (T.isDragging = T.isGesturing = T.isPressed = !1),
          (T.enable = function (j) {
            return (
              T.isEnabled ||
                (te(vr ? _t : a, "scroll", Ns),
                s.indexOf("scroll") >= 0 &&
                  te(vr ? _t : a, "scroll", Be, f, rt),
                s.indexOf("wheel") >= 0 && te(a, "wheel", Ur, f, rt),
                ((s.indexOf("touch") >= 0 && Aa) ||
                  s.indexOf("pointer") >= 0) &&
                  (te(a, Pe[0], br, f, rt),
                  te(_t, Pe[2], pe),
                  te(_t, Pe[3], pe),
                  Ft && te(a, "click", Gt, !1, !0),
                  Ot && te(a, "click", tn),
                  V && te(_t, "gesturestart", Me),
                  b && te(_t, "gestureend", Ye),
                  W && te(a, Ar + "enter", er),
                  $ && te(a, Ar + "leave", Ji),
                  z && te(a, Ar + "move", vi)),
                (T.isEnabled = !0),
                j && j.type && br(j),
                Pt && Pt(T)),
              T
            );
          }),
          (T.disable = function () {
            T.isEnabled &&
              (li.filter(function (j) {
                return j !== T && Fi(j.target);
              }).length || It(vr ? _t : a, "scroll", Ns),
              T.isPressed &&
                (T._vx.reset(), T._vy.reset(), It(N ? a : _t, Pe[1], Z, !0)),
              It(vr ? _t : a, "scroll", Be, rt),
              It(a, "wheel", Ur, rt),
              It(a, Pe[0], br, rt),
              It(_t, Pe[2], pe),
              It(_t, Pe[3], pe),
              It(a, "click", Gt, !0),
              It(a, "click", tn),
              It(_t, "gesturestart", Me),
              It(_t, "gestureend", Ye),
              It(a, Ar + "enter", er),
              It(a, Ar + "leave", Ji),
              It(a, Ar + "move", vi),
              (T.isEnabled = T.isPressed = T.isDragging = !1),
              re && re(T));
          }),
          (T.kill = function () {
            T.disable();
            var j = li.indexOf(T);
            j >= 0 && li.splice(j, 1), Ze === T && (Ze = 0);
          }),
          li.push(T),
          N && Fi(a) && (Ze = T),
          T.enable(p);
      }),
      Qu(o, [
        {
          key: "velocityX",
          get: function () {
            return this._vx.getVelocity();
          },
        },
        {
          key: "velocityY",
          get: function () {
            return this._vy.getVelocity();
          },
        },
      ]),
      o
    );
  })();
  (mt.version = "3.11.3"),
    (mt.create = function (o) {
      return new mt(o);
    }),
    (mt.register = $a),
    (mt.getAll = function () {
      return li.slice();
    }),
    (mt.getById = function (o) {
      return li.filter(function (t) {
        return t.vars.id === o;
      })[0];
    }),
    La() && Lt.registerPlugin(mt);
  /*!
   * ScrollTrigger 3.11.3
   * https://greensock.com
   *
   * @license Copyright 2008-2022, GreenSock. All rights reserved.
   * Subject to the terms at https://greensock.com/standard-license or for
   * Club GreenSock members, the agreement issued with that membership.
   * @author: Jack Doyle, jack@greensock.com
   */ var L,
    ui,
    q,
    ot,
    ze,
    lt,
    Wa,
    xn,
    Tn,
    fi,
    Sn,
    Cn,
    zt,
    Pn,
    $s,
    Bt,
    Ia,
    Ya,
    ci,
    Ba,
    Ws,
    Xa,
    ue,
    Va,
    Ha,
    Ua,
    _r,
    Is,
    Ys,
    Bs,
    On = 1,
    Xt = Date.now,
    Xs = Xt(),
    be = 0,
    kn = 0,
    qa = function () {
      return (Pn = 1);
    },
    Ga = function () {
      return (Pn = 0);
    },
    Ne = function (t) {
      return t;
    },
    Wi = function (t) {
      return Math.round(t * 1e5) / 1e5 || 0;
    },
    ja = function () {
      return typeof window < "u";
    },
    Ka = function () {
      return L || (ja() && (L = window.gsap) && L.registerPlugin && L);
    },
    Rr = function (t) {
      return !!~Wa.indexOf(t);
    },
    Za = function (t) {
      return (
        dr(t, "getBoundingClientRect") ||
        (Rr(t)
          ? function () {
              return (Yn.width = q.innerWidth), (Yn.height = q.innerHeight), Yn;
            }
          : function () {
              return Qe(t);
            })
      );
    },
    tf = function (t, r, e) {
      var i = e.d,
        n = e.d2,
        s = e.a;
      return (s = dr(t, "getBoundingClientRect"))
        ? function () {
            return s()[i];
          }
        : function () {
            return (r ? q["inner" + n] : t["client" + n]) || 0;
          };
    },
    ef = function (t, r) {
      return !r || ~Le.indexOf(t)
        ? Za(t)
        : function () {
            return Yn;
          };
    },
    gr = function (t, r) {
      var e = r.s,
        i = r.d2,
        n = r.d,
        s = r.a;
      return (e = "scroll" + i) && (s = dr(t, e))
        ? s() - Za(t)()[n]
        : Rr(t)
          ? (ze[e] || lt[e]) -
            (q["inner" + i] || ze["client" + i] || lt["client" + i])
          : t[e] - t["offset" + i];
    },
    Mn = function (t, r) {
      for (var e = 0; e < ci.length; e += 3)
        (!r || ~r.indexOf(ci[e + 1])) && t(ci[e], ci[e + 1], ci[e + 2]);
    },
    Oe = function (t) {
      return typeof t == "string";
    },
    Vt = function (t) {
      return typeof t == "function";
    },
    Ii = function (t) {
      return typeof t == "number";
    },
    En = function (t) {
      return typeof t == "object";
    },
    Yi = function (t, r, e) {
      return t && t.progress(r ? 0 : 1) && e && t.pause();
    },
    Vs = function (t, r) {
      if (t.enabled) {
        var e = r(t);
        e && e.totalTime && (t.callbackAnimation = e);
      }
    },
    hi = Math.abs,
    Qa = "left",
    Ja = "top",
    Hs = "right",
    Us = "bottom",
    Lr = "width",
    zr = "height",
    Bi = "Right",
    Xi = "Left",
    Vi = "Top",
    Hi = "Bottom",
    pt = "padding",
    xe = "margin",
    di = "Width",
    qs = "Height",
    Et = "px",
    Fe = function (t) {
      return q.getComputedStyle(t);
    },
    rf = function (t) {
      var r = Fe(t).position;
      t.style.position = r === "absolute" || r === "fixed" ? r : "relative";
    },
    tl = function (t, r) {
      for (var e in r) e in t || (t[e] = r[e]);
      return t;
    },
    Qe = function (t, r) {
      var e =
          r &&
          Fe(t)[$s] !== "matrix(1, 0, 0, 1, 0, 0)" &&
          L.to(t, {
            x: 0,
            y: 0,
            xPercent: 0,
            yPercent: 0,
            rotation: 0,
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            skewX: 0,
            skewY: 0,
          }).progress(1),
        i = t.getBoundingClientRect();
      return e && e.progress(0).kill(), i;
    },
    Gs = function (t, r) {
      var e = r.d2;
      return t["offset" + e] || t["client" + e] || 0;
    },
    el = function (t) {
      var r = [],
        e = t.labels,
        i = t.duration(),
        n;
      for (n in e) r.push(e[n] / i);
      return r;
    },
    nf = function (t) {
      return function (r) {
        return L.utils.snap(el(t), r);
      };
    },
    js = function (t) {
      var r = L.utils.snap(t),
        e =
          Array.isArray(t) &&
          t.slice(0).sort(function (i, n) {
            return i - n;
          });
      return e
        ? function (i, n, s) {
            s === void 0 && (s = 0.001);
            var a;
            if (!n) return r(i);
            if (n > 0) {
              for (i -= s, a = 0; a < e.length; a++) if (e[a] >= i) return e[a];
              return e[a - 1];
            } else for (a = e.length, i += s; a--; ) if (e[a] <= i) return e[a];
            return e[0];
          }
        : function (i, n, s) {
            s === void 0 && (s = 0.001);
            var a = r(i);
            return !n || Math.abs(a - i) < s || a - i < 0 == n < 0
              ? a
              : r(n < 0 ? i - t : i + t);
          };
    },
    sf = function (t) {
      return function (r, e) {
        return js(el(t))(r, e.direction);
      };
    },
    Dn = function (t, r, e, i) {
      return e.split(",").forEach(function (n) {
        return t(r, n, i);
      });
    },
    Dt = function (t, r, e, i, n) {
      return t.addEventListener(r, e, { passive: !i, capture: !!n });
    },
    Ct = function (t, r, e, i) {
      return t.removeEventListener(r, e, !!i);
    },
    An = function (t, r, e) {
      return e && e.wheelHandler && t(r, "wheel", e);
    },
    rl = {
      startColor: "green",
      endColor: "red",
      indent: 0,
      fontSize: "16px",
      fontWeight: "normal",
    },
    Rn = { toggleActions: "play", anticipatePin: 0 },
    Ln = { top: 0, left: 0, center: 0.5, bottom: 1, right: 1 },
    zn = function (t, r) {
      if (Oe(t)) {
        var e = t.indexOf("="),
          i = ~e ? +(t.charAt(e - 1) + 1) * parseFloat(t.substr(e + 1)) : 0;
        ~e && (t.indexOf("%") > e && (i *= r / 100), (t = t.substr(0, e - 1))),
          (t =
            i +
            (t in Ln
              ? Ln[t] * r
              : ~t.indexOf("%")
                ? (parseFloat(t) * r) / 100
                : parseFloat(t) || 0));
      }
      return t;
    },
    Nn = function (t, r, e, i, n, s, a, u) {
      var l = n.startColor,
        f = n.endColor,
        d = n.fontSize,
        h = n.indent,
        c = n.fontWeight,
        _ = ot.createElement("div"),
        p = Rr(e) || dr(e, "pinType") === "fixed",
        g = t.indexOf("scroller") !== -1,
        v = p ? lt : e,
        y = t.indexOf("start") !== -1,
        w = y ? l : f,
        m =
          "border-color:" +
          w +
          ";font-size:" +
          d +
          ";color:" +
          w +
          ";font-weight:" +
          c +
          ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";
      return (
        (m += "position:" + ((g || u) && p ? "fixed;" : "absolute;")),
        (g || u || !p) &&
          (m += (i === bt ? Hs : Us) + ":" + (s + parseFloat(h)) + "px;"),
        a &&
          (m +=
            "box-sizing:border-box;text-align:left;width:" +
            a.offsetWidth +
            "px;"),
        (_._isStart = y),
        _.setAttribute("class", "gsap-marker-" + t + (r ? " marker-" + r : "")),
        (_.style.cssText = m),
        (_.innerText = r || r === 0 ? t + "-" + r : t),
        v.children[0] ? v.insertBefore(_, v.children[0]) : v.appendChild(_),
        (_._offset = _["offset" + i.op.d2]),
        Fn(_, 0, i, y),
        _
      );
    },
    Fn = function (t, r, e, i) {
      var n = { display: "block" },
        s = e[i ? "os2" : "p2"],
        a = e[i ? "p2" : "os2"];
      (t._isFlipped = i),
        (n[e.a + "Percent"] = i ? -100 : 0),
        (n[e.a] = i ? "1px" : 0),
        (n["border" + s + di] = 1),
        (n["border" + a + di] = 0),
        (n[e.p] = r + "px"),
        L.set(t, n);
    },
    Y = [],
    Ks = {},
    Ui,
    il = function () {
      return Xt() - be > 34 && (Ui || (Ui = requestAnimationFrame(Yr)));
    },
    pi = function () {
      (!ue || !ue.isPressed || ue.startX > lt.clientWidth) &&
        (U.cache++,
        ue ? Ui || (Ui = requestAnimationFrame(Yr)) : Yr(),
        be || Fr("scrollStart"),
        (be = Xt()));
    },
    Zs = function () {
      (Ua = q.innerWidth), (Ha = q.innerHeight);
    },
    qi = function () {
      U.cache++,
        !zt &&
          !Xa &&
          !ot.fullscreenElement &&
          !ot.webkitFullscreenElement &&
          (!Va ||
            Ua !== q.innerWidth ||
            Math.abs(q.innerHeight - Ha) > q.innerHeight * 0.25) &&
          xn.restart(!0);
    },
    Nr = {},
    of = [],
    nl = function o() {
      return Ct(G, "scrollEnd", o) || Wr(!0);
    },
    Fr = function (t) {
      return (
        (Nr[t] &&
          Nr[t].map(function (r) {
            return r();
          })) ||
        of
      );
    },
    fe = [],
    sl = function (t) {
      for (var r = 0; r < fe.length; r += 5)
        (!t || (fe[r + 4] && fe[r + 4].query === t)) &&
          ((fe[r].style.cssText = fe[r + 1]),
          fe[r].getBBox && fe[r].setAttribute("transform", fe[r + 2] || ""),
          (fe[r + 3].uncache = 1));
    },
    Qs = function (t, r) {
      var e;
      for (Bt = 0; Bt < Y.length; Bt++)
        (e = Y[Bt]),
          e && (!r || e._ctx === r) && (t ? e.kill(1) : e.revert(!0, !0));
      r && sl(r), r || Fr("revert");
    },
    ol = function (t, r) {
      U.cache++,
        (r || !ke) &&
          U.forEach(function (e) {
            return Vt(e) && e.cacheID++ && (e.rec = 0);
          }),
        Oe(t) && (q.history.scrollRestoration = Ys = t);
    },
    ke,
    $r = 0,
    al,
    af = function () {
      if (al !== $r) {
        var t = (al = $r);
        requestAnimationFrame(function () {
          return t === $r && Wr(!0);
        });
      }
    },
    Wr = function (t, r) {
      if (be && !t) {
        Dt(G, "scrollEnd", nl);
        return;
      }
      (ke = G.isRefreshing = !0),
        U.forEach(function (i) {
          return Vt(i) && i.cacheID++ && (i.rec = i());
        });
      var e = Fr("refreshInit");
      Ba && G.sort(),
        r || Qs(),
        U.forEach(function (i) {
          Vt(i) && (i.smooth && (i.target.style.scrollBehavior = "auto"), i(0));
        }),
        Y.slice(0).forEach(function (i) {
          return i.refresh();
        }),
        Y.forEach(function (i, n) {
          if (i._subPinOffset && i.pin) {
            var s = i.vars.horizontal ? "offsetWidth" : "offsetHeight",
              a = i.pin[s];
            i.revert(!0, 1), i.adjustPinSpacing(i.pin[s] - a), i.revert(!1, 1);
          }
        }),
        Y.forEach(function (i) {
          return (
            i.vars.end === "max" &&
            i.setPositions(
              i.start,
              Math.max(i.start + 1, gr(i.scroller, i._dir)),
            )
          );
        }),
        e.forEach(function (i) {
          return i && i.render && i.render(-1);
        }),
        U.forEach(function (i) {
          Vt(i) &&
            (i.smooth &&
              requestAnimationFrame(function () {
                return (i.target.style.scrollBehavior = "smooth");
              }),
            i.rec && i(i.rec));
        }),
        ol(Ys, 1),
        xn.pause(),
        $r++,
        Yr(2),
        Y.forEach(function (i) {
          return Vt(i.vars.onRefresh) && i.vars.onRefresh(i);
        }),
        (ke = G.isRefreshing = !1),
        Fr("refresh");
    },
    ll = 0,
    $n = 1,
    Ir,
    Yr = function (t) {
      if (!ke || t === 2) {
        (G.isUpdating = !0), Ir && Ir.update(0);
        var r = Y.length,
          e = Xt(),
          i = e - Xs >= 50,
          n = r && Y[0].scroll();
        if (
          (($n = ll > n ? -1 : 1),
          (ll = n),
          i &&
            (be && !Pn && e - be > 200 && ((be = 0), Fr("scrollEnd")),
            (Sn = Xs),
            (Xs = e)),
          $n < 0)
        ) {
          for (Bt = r; Bt-- > 0; ) Y[Bt] && Y[Bt].update(0, i);
          $n = 1;
        } else for (Bt = 0; Bt < r; Bt++) Y[Bt] && Y[Bt].update(0, i);
        G.isUpdating = !1;
      }
      Ui = 0;
    },
    Js = [
      Qa,
      Ja,
      Us,
      Hs,
      xe + Hi,
      xe + Bi,
      xe + Vi,
      xe + Xi,
      "display",
      "flexShrink",
      "float",
      "zIndex",
      "gridColumnStart",
      "gridColumnEnd",
      "gridRowStart",
      "gridRowEnd",
      "gridArea",
      "justifySelf",
      "alignSelf",
      "placeSelf",
      "order",
    ],
    Wn = Js.concat([
      Lr,
      zr,
      "boxSizing",
      "max" + di,
      "max" + qs,
      "position",
      xe,
      pt,
      pt + Vi,
      pt + Bi,
      pt + Hi,
      pt + Xi,
    ]),
    lf = function (t, r, e) {
      _i(e);
      var i = t._gsap;
      if (i.spacerIsNative) _i(i.spacerState);
      else if (t._gsap.swappedIn) {
        var n = r.parentNode;
        n && (n.insertBefore(t, r), n.removeChild(r));
      }
      t._gsap.swappedIn = !1;
    },
    to = function (t, r, e, i) {
      if (!t._gsap.swappedIn) {
        for (var n = Js.length, s = r.style, a = t.style, u; n--; )
          (u = Js[n]), (s[u] = e[u]);
        (s.position = e.position === "absolute" ? "absolute" : "relative"),
          e.display === "inline" && (s.display = "inline-block"),
          (a[Us] = a[Hs] = "auto"),
          (s.flexBasis = e.flexBasis || "auto"),
          (s.overflow = "visible"),
          (s.boxSizing = "border-box"),
          (s[Lr] = Gs(t, Yt) + Et),
          (s[zr] = Gs(t, bt) + Et),
          (s[pt] = a[xe] = a[Ja] = a[Qa] = "0"),
          _i(i),
          (a[Lr] = a["max" + di] = e[Lr]),
          (a[zr] = a["max" + qs] = e[zr]),
          (a[pt] = e[pt]),
          t.parentNode !== r &&
            (t.parentNode.insertBefore(r, t), r.appendChild(t)),
          (t._gsap.swappedIn = !0);
      }
    },
    uf = /([A-Z])/g,
    _i = function (t) {
      if (t) {
        var r = t.t.style,
          e = t.length,
          i = 0,
          n,
          s;
        for ((t.t._gsap || L.core.getCache(t.t)).uncache = 1; i < e; i += 2)
          (s = t[i + 1]),
            (n = t[i]),
            s
              ? (r[n] = s)
              : r[n] && r.removeProperty(n.replace(uf, "-$1").toLowerCase());
      }
    },
    In = function (t) {
      for (var r = Wn.length, e = t.style, i = [], n = 0; n < r; n++)
        i.push(Wn[n], e[Wn[n]]);
      return (i.t = t), i;
    },
    ff = function (t, r, e) {
      for (var i = [], n = t.length, s = e ? 8 : 0, a; s < n; s += 2)
        (a = t[s]), i.push(a, a in r ? r[a] : t[s + 1]);
      return (i.t = t.t), i;
    },
    Yn = { left: 0, top: 0 },
    ul = function (t, r, e, i, n, s, a, u, l, f, d, h, c) {
      Vt(t) && (t = t(u)),
        Oe(t) &&
          t.substr(0, 3) === "max" &&
          (t = h + (t.charAt(4) === "=" ? zn("0" + t.substr(3), e) : 0));
      var _ = c ? c.time() : 0,
        p,
        g,
        v;
      if ((c && c.seek(0), Ii(t))) a && Fn(a, e, i, !0);
      else {
        Vt(r) && (r = r(u));
        var y = (t || "0").split(" "),
          w,
          m,
          x,
          C;
        (v = ee(r) || lt),
          (w = Qe(v) || {}),
          (!w || (!w.left && !w.top)) &&
            Fe(v).display === "none" &&
            ((C = v.style.display),
            (v.style.display = "block"),
            (w = Qe(v)),
            C ? (v.style.display = C) : v.style.removeProperty("display")),
          (m = zn(y[0], w[i.d])),
          (x = zn(y[1] || "0", e)),
          (t = w[i.p] - l[i.p] - f + m + n - x),
          a && Fn(a, x, i, e - x < 20 || (a._isStart && x > 20)),
          (e -= e - x);
      }
      if (s) {
        var S = t + e,
          k = s._isStart;
        (p = "scroll" + i.d2),
          Fn(
            s,
            S,
            i,
            (k && S > 20) ||
              (!k && (d ? Math.max(lt[p], ze[p]) : s.parentNode[p]) <= S + 1),
          ),
          d &&
            ((l = Qe(a)),
            d && (s.style[i.op.p] = l[i.op.p] - i.op.m - s._offset + Et));
      }
      return (
        c &&
          v &&
          ((p = Qe(v)),
          c.seek(h),
          (g = Qe(v)),
          (c._caScrollDist = p[i.p] - g[i.p]),
          (t = (t / c._caScrollDist) * h)),
        c && c.seek(_),
        c ? t : Math.round(t)
      );
    },
    cf = /(webkit|moz|length|cssText|inset)/i,
    fl = function (t, r, e, i) {
      if (t.parentNode !== r) {
        var n = t.style,
          s,
          a;
        if (r === lt) {
          (t._stOrig = n.cssText), (a = Fe(t));
          for (s in a)
            !+s &&
              !cf.test(s) &&
              a[s] &&
              typeof n[s] == "string" &&
              s !== "0" &&
              (n[s] = a[s]);
          (n.top = e), (n.left = i);
        } else n.cssText = t._stOrig;
        (L.core.getCache(t).uncache = 1), r.appendChild(t);
      }
    },
    cl = function (t, r) {
      var e = pr(t, r),
        i = "_scroll" + r.p2,
        n,
        s,
        a = function u(l, f, d, h, c) {
          var _ = u.tween,
            p = f.onComplete,
            g = {};
          return (
            (d = d || e()),
            (c = (h && c) || 0),
            (h = h || l - d),
            _ && _.kill(),
            (n = Math.round(d)),
            (f[i] = l),
            (f.modifiers = g),
            (g[i] = function (v) {
              return (
                (v = Math.round(e())),
                v !== n && v !== s && Math.abs(v - n) > 3 && Math.abs(v - s) > 3
                  ? (_.kill(), (u.tween = 0))
                  : (v = d + h * _.ratio + c * _.ratio * _.ratio),
                (s = n),
                (n = Math.round(v))
              );
            }),
            (f.onComplete = function () {
              (u.tween = 0), p && p.call(_);
            }),
            (_ = u.tween = L.to(t, f)),
            _
          );
        };
      return (
        (t[i] = e),
        (e.wheelHandler = function () {
          return a.tween && a.tween.kill() && (a.tween = 0);
        }),
        Dt(t, "wheel", e.wheelHandler),
        a
      );
    },
    G = (function () {
      function o(r, e) {
        ui ||
          o.register(L) ||
          console.warn("Please gsap.registerPlugin(ScrollTrigger)"),
          this.init(r, e);
      }
      var t = o.prototype;
      return (
        (t.init = function (e, i) {
          if (
            ((this.progress = this.start = 0),
            this.vars && this.kill(!0, !0),
            !kn)
          ) {
            this.update = this.refresh = this.kill = Ne;
            return;
          }
          e = tl(Oe(e) || Ii(e) || e.nodeType ? { trigger: e } : e, Rn);
          var n = e,
            s = n.onUpdate,
            a = n.toggleClass,
            u = n.id,
            l = n.onToggle,
            f = n.onRefresh,
            d = n.scrub,
            h = n.trigger,
            c = n.pin,
            _ = n.pinSpacing,
            p = n.invalidateOnRefresh,
            g = n.anticipatePin,
            v = n.onScrubComplete,
            y = n.onSnapComplete,
            w = n.once,
            m = n.snap,
            x = n.pinReparent,
            C = n.pinSpacer,
            S = n.containerAnimation,
            k = n.fastScrollEnd,
            O = n.preventOverlaps,
            M =
              e.horizontal || (e.containerAnimation && e.horizontal !== !1)
                ? Yt
                : bt,
            E = !d && d !== 0,
            D = ee(e.scroller || q),
            X = L.core.getCache(D),
            W = Rr(D),
            $ =
              ("pinType" in e
                ? e.pinType
                : dr(D, "pinType") || (W && "fixed")) === "fixed",
            z = [e.onEnter, e.onLeave, e.onEnterBack, e.onLeaveBack],
            B = E && e.toggleActions.split(" "),
            N = "markers" in e ? e.markers : Rn.markers,
            V = W ? 0 : parseFloat(Fe(D)["border" + M.p2 + di]) || 0,
            b = this,
            et =
              e.onRefreshInit &&
              function () {
                return e.onRefreshInit(b);
              },
            Pt = tf(D, W, M),
            re = ef(D, W),
            Ot = 0,
            Nt = 0,
            rt = pr(D, M),
            Ft,
            Ht,
            ji,
            ce,
            Te,
            K,
            $t,
            he,
            We,
            Ut,
            T,
            tr,
            it,
            mr,
            yr,
            mi,
            qt,
            Ki,
            vr,
            _t,
            de,
            Wt,
            Zi,
            Gt,
            Ie,
            Qi,
            wr,
            Hr,
            yi,
            Z,
            br,
            pe,
            Me,
            Ye,
            Be,
            Ur,
            vi,
            er;
          if (
            (Is(b),
            (b._dir = M),
            (g *= 45),
            (b.scroller = D),
            (b.scroll = S ? S.time.bind(S) : rt),
            (ce = rt()),
            (b.vars = e),
            (i = i || e.animation),
            "refreshPriority" in e &&
              ((Ba = 1), e.refreshPriority === -9999 && (Ir = b)),
            (X.tweenScroll = X.tweenScroll || {
              top: cl(D, bt),
              left: cl(D, Yt),
            }),
            (b.tweenTo = Ft = X.tweenScroll[M.p]),
            (b.scrubDuration = function (P) {
              (br = Ii(P) && P),
                br
                  ? Z
                    ? Z.duration(P)
                    : (Z = L.to(i, {
                        ease: "expo",
                        totalProgress: "+=0.001",
                        duration: br,
                        paused: !0,
                        onComplete: function () {
                          return v && v(b);
                        },
                      }))
                  : (Z && Z.progress(1).kill(), (Z = 0));
            }),
            i &&
              ((i.vars.lazy = !1),
              i._initted ||
                (i.vars.immediateRender !== !1 &&
                  e.immediateRender !== !1 &&
                  i.duration() &&
                  i.render(0, !0, !0)),
              (b.animation = i.pause()),
              (i.scrollTrigger = b),
              b.scrubDuration(d),
              (Hr = 0),
              u || (u = i.vars.id)),
            Y.push(b),
            m &&
              ((!En(m) || m.push) && (m = { snapTo: m }),
              "scrollBehavior" in lt.style &&
                L.set(W ? [lt, ze] : D, { scrollBehavior: "auto" }),
              U.forEach(function (P) {
                return (
                  Vt(P) &&
                  P.target === (W ? ot.scrollingElement || ze : D) &&
                  (P.smooth = !1)
                );
              }),
              (ji = Vt(m.snapTo)
                ? m.snapTo
                : m.snapTo === "labels"
                  ? nf(i)
                  : m.snapTo === "labelsDirectional"
                    ? sf(i)
                    : m.directional !== !1
                      ? function (P, A) {
                          return js(m.snapTo)(
                            P,
                            Xt() - Nt < 500 ? 0 : A.direction,
                          );
                        }
                      : L.utils.snap(m.snapTo)),
              (pe = m.duration || { min: 0.1, max: 2 }),
              (pe = En(pe) ? fi(pe.min, pe.max) : fi(pe, pe)),
              (Me = L.delayedCall(m.delay || br / 2 || 0.1, function () {
                var P = rt(),
                  A = Xt() - Nt < 500,
                  R = Ft.tween;
                if (
                  (A || Math.abs(b.getVelocity()) < 10) &&
                  !R &&
                  !Pn &&
                  Ot !== P
                ) {
                  var F = (P - K) / it,
                    xt = i && !E ? i.totalProgress() : F,
                    I = A ? 0 : ((xt - yi) / (Xt() - Sn)) * 1e3 || 0,
                    yt = L.utils.clamp(-F, 1 - F, (hi(I / 2) * I) / 0.185),
                    ut = F + (m.inertia === !1 ? 0 : yt),
                    Xe = fi(0, 1, ji(ut, b)),
                    tt = Math.round(K + Xe * it),
                    kt = m,
                    Ee = kt.onStart,
                    ft = kt.onInterrupt,
                    ct = kt.onComplete;
                  if (P <= $t && P >= K && tt !== P) {
                    if (R && !R._initted && R.data <= hi(tt - P)) return;
                    m.inertia === !1 && (yt = Xe - F),
                      Ft(
                        tt,
                        {
                          duration: pe(
                            hi(
                              (Math.max(hi(ut - xt), hi(Xe - xt)) * 0.185) /
                                I /
                                0.05 || 0,
                            ),
                          ),
                          ease: m.ease || "power3",
                          data: hi(tt - P),
                          onInterrupt: function () {
                            return Me.restart(!0) && ft && ft(b);
                          },
                          onComplete: function () {
                            b.update(),
                              (Ot = rt()),
                              (Hr = yi =
                                i && !E ? i.totalProgress() : b.progress),
                              y && y(b),
                              ct && ct(b);
                          },
                        },
                        P,
                        yt * it,
                        tt - P - yt * it,
                      ),
                      Ee && Ee(b, Ft.tween);
                  }
                } else b.isActive && Ot !== P && Me.restart(!0);
              }).pause())),
            u && (Ks[u] = b),
            (h = b.trigger = ee(h || c)),
            (er = h && h._gsap && h._gsap.stRevert),
            er && (er = er(b)),
            (c = c === !0 ? h : ee(c)),
            Oe(a) && (a = { targets: h, className: a }),
            c &&
              (_ === !1 ||
                _ === xe ||
                (_ =
                  !_ &&
                  c.parentNode &&
                  c.parentNode.style &&
                  Fe(c.parentNode).display === "flex"
                    ? !1
                    : pt),
              (b.pin = c),
              (Ht = L.core.getCache(c)),
              Ht.spacer
                ? (mr = Ht.pinState)
                : (C &&
                    ((C = ee(C)),
                    C && !C.nodeType && (C = C.current || C.nativeElement),
                    (Ht.spacerIsNative = !!C),
                    C && (Ht.spacerState = In(C))),
                  (Ht.spacer = qt = C || ot.createElement("div")),
                  qt.classList.add("pin-spacer"),
                  u && qt.classList.add("pin-spacer-" + u),
                  (Ht.pinState = mr = In(c))),
              e.force3D !== !1 && L.set(c, { force3D: !0 }),
              (b.spacer = qt = Ht.spacer),
              (wr = Fe(c)),
              (Zi = wr[_ + M.os2]),
              (vr = L.getProperty(c)),
              (_t = L.quickSetter(c, M.a, Et)),
              to(c, qt, wr),
              (mi = In(c))),
            N)
          ) {
            (tr = En(N) ? tl(N, rl) : rl),
              (Ut = Nn("scroller-start", u, D, M, tr, 0)),
              (T = Nn("scroller-end", u, D, M, tr, 0, Ut)),
              (Ki = Ut["offset" + M.op.d2]);
            var Ji = ee(dr(D, "content") || D);
            (he = this.markerStart = Nn("start", u, Ji, M, tr, Ki, 0, S)),
              (We = this.markerEnd = Nn("end", u, Ji, M, tr, Ki, 0, S)),
              S && (vi = L.quickSetter([he, We], M.a, Et)),
              !$ &&
                !(Le.length && dr(D, "fixedMarkers") === !0) &&
                (rf(W ? lt : D),
                L.set([Ut, T], { force3D: !0 }),
                (Ie = L.quickSetter(Ut, M.a, Et)),
                (Qi = L.quickSetter(T, M.a, Et)));
          }
          if (S) {
            var tn = S.vars.onUpdate,
              j = S.vars.onUpdateParams;
            S.eventCallback("onUpdate", function () {
              b.update(0, 0, 1), tn && tn.apply(j || []);
            });
          }
          (b.previous = function () {
            return Y[Y.indexOf(b) - 1];
          }),
            (b.next = function () {
              return Y[Y.indexOf(b) + 1];
            }),
            (b.revert = function (P, A) {
              if (!A) return b.kill(!0);
              var R = P !== !1 || !b.enabled,
                F = zt;
              R !== b.isReverted &&
                (R &&
                  ((Be = Math.max(rt(), b.scroll.rec || 0)),
                  (Ye = b.progress),
                  (Ur = i && i.progress())),
                he &&
                  [he, We, Ut, T].forEach(function (xt) {
                    return (xt.style.display = R ? "none" : "block");
                  }),
                R && ((zt = 1), b.update(R)),
                c &&
                  (R
                    ? lf(c, qt, mr)
                    : (!x || !b.isActive) && to(c, qt, Fe(c), Gt)),
                R || b.update(R),
                (zt = F),
                (b.isReverted = R));
            }),
            (b.refresh = function (P, A) {
              if (!((zt || !b.enabled) && !A)) {
                if (c && P && be) {
                  Dt(o, "scrollEnd", nl);
                  return;
                }
                !ke && et && et(b),
                  (zt = 1),
                  (Nt = Xt()),
                  Ft.tween && (Ft.tween.kill(), (Ft.tween = 0)),
                  Z && Z.pause(),
                  p && i && i.revert({ kill: !1 }).invalidate(),
                  b.isReverted || b.revert(!0, !0),
                  (b._subPinOffset = !1);
                for (
                  var R = Pt(),
                    F = re(),
                    xt = S ? S.duration() : gr(D, M),
                    I = 0,
                    yt = 0,
                    ut = e.end,
                    Xe = e.endTrigger || h,
                    tt =
                      e.start ||
                      (e.start === 0 || !h ? 0 : c ? "0 0" : "0 100%"),
                    kt = (b.pinnedContainer =
                      e.pinnedContainer && ee(e.pinnedContainer)),
                    Ee = (h && Math.max(0, Y.indexOf(b))) || 0,
                    ft = Ee,
                    ct,
                    vt,
                    wi,
                    qr,
                    Tt,
                    ht,
                    rr,
                    co,
                    Rl,
                    en;
                  ft--;

                )
                  (ht = Y[ft]),
                    ht.end || ht.refresh(0, 1) || (zt = 1),
                    (rr = ht.pin),
                    rr &&
                      (rr === h || rr === c) &&
                      !ht.isReverted &&
                      (en || (en = []), en.unshift(ht), ht.revert(!0, !0)),
                    ht !== Y[ft] && (Ee--, ft--);
                for (
                  Vt(tt) && (tt = tt(b)),
                    K =
                      ul(tt, h, R, M, rt(), he, Ut, b, F, V, $, xt, S) ||
                      (c ? -0.001 : 0),
                    Vt(ut) && (ut = ut(b)),
                    Oe(ut) &&
                      !ut.indexOf("+=") &&
                      (~ut.indexOf(" ")
                        ? (ut = (Oe(tt) ? tt.split(" ")[0] : "") + ut)
                        : ((I = zn(ut.substr(2), R)),
                          (ut = Oe(tt) ? tt : K + I),
                          (Xe = h))),
                    $t =
                      Math.max(
                        K,
                        ul(
                          ut || (Xe ? "100% 0" : xt),
                          Xe,
                          R,
                          M,
                          rt() + I,
                          We,
                          T,
                          b,
                          F,
                          V,
                          $,
                          xt,
                          S,
                        ),
                      ) || -0.001,
                    it = $t - K || ((K -= 0.01) && 0.001),
                    I = 0,
                    ft = Ee;
                  ft--;

                )
                  (ht = Y[ft]),
                    (rr = ht.pin),
                    rr &&
                      ht.start - ht._pinPush <= K &&
                      !S &&
                      ht.end > 0 &&
                      ((ct = ht.end - ht.start),
                      ((rr === h && ht.start - ht._pinPush < K) || rr === kt) &&
                        !Ii(tt) &&
                        (I += ct * (1 - ht.progress)),
                      rr === c && (yt += ct));
                if (
                  ((K += I),
                  ($t += I),
                  (b._pinPush = yt),
                  he &&
                    I &&
                    ((ct = {}),
                    (ct[M.a] = "+=" + I),
                    kt && (ct[M.p] = "-=" + rt()),
                    L.set([he, We], ct)),
                  c)
                )
                  (ct = Fe(c)),
                    (qr = M === bt),
                    (wi = rt()),
                    (de = parseFloat(vr(M.a)) + yt),
                    !xt &&
                      $t > 1 &&
                      ((W ? lt : D).style["overflow-" + M.a] = "scroll"),
                    to(c, qt, ct),
                    (mi = In(c)),
                    (vt = Qe(c, !0)),
                    (co = $ && pr(D, qr ? Yt : bt)()),
                    _ &&
                      ((Gt = [_ + M.os2, it + yt + Et]),
                      (Gt.t = qt),
                      (ft = _ === pt ? Gs(c, M) + it + yt : 0),
                      ft && Gt.push(M.d, ft + Et),
                      _i(Gt),
                      kt &&
                        Y.forEach(function (rn) {
                          rn.pin === kt &&
                            rn.vars.pinSpacing !== !1 &&
                            (rn._subPinOffset = !0);
                        }),
                      $ && rt(Be)),
                    $ &&
                      ((Tt = {
                        top: vt.top + (qr ? wi - K : co) + Et,
                        left: vt.left + (qr ? co : wi - K) + Et,
                        boxSizing: "border-box",
                        position: "fixed",
                      }),
                      (Tt[Lr] = Tt["max" + di] = Math.ceil(vt.width) + Et),
                      (Tt[zr] = Tt["max" + qs] = Math.ceil(vt.height) + Et),
                      (Tt[xe] =
                        Tt[xe + Vi] =
                        Tt[xe + Bi] =
                        Tt[xe + Hi] =
                        Tt[xe + Xi] =
                          "0"),
                      (Tt[pt] = ct[pt]),
                      (Tt[pt + Vi] = ct[pt + Vi]),
                      (Tt[pt + Bi] = ct[pt + Bi]),
                      (Tt[pt + Hi] = ct[pt + Hi]),
                      (Tt[pt + Xi] = ct[pt + Xi]),
                      (yr = ff(mr, Tt, x)),
                      ke && rt(0)),
                    i
                      ? ((Rl = i._initted),
                        Ws(1),
                        i.render(i.duration(), !0, !0),
                        (Wt = vr(M.a) - de + it + yt),
                        it !== Wt && $ && yr.splice(yr.length - 2, 2),
                        i.render(0, !0, !0),
                        Rl || i.invalidate(!0),
                        i.parent || i.totalTime(i.totalTime()),
                        Ws(0))
                      : (Wt = it);
                else if (h && rt() && !S)
                  for (vt = h.parentNode; vt && vt !== lt; )
                    vt._pinOffset &&
                      ((K -= vt._pinOffset), ($t -= vt._pinOffset)),
                      (vt = vt.parentNode);
                en &&
                  en.forEach(function (rn) {
                    return rn.revert(!1, !0);
                  }),
                  (b.start = K),
                  (b.end = $t),
                  (ce = Te = ke ? Be : rt()),
                  !S && !ke && (ce < Be && rt(Be), (b.scroll.rec = 0)),
                  b.revert(!1, !0),
                  Me &&
                    ((Ot = -1), b.isActive && rt(K + it * Ye), Me.restart(!0)),
                  (zt = 0),
                  i &&
                    E &&
                    (i._initted || Ur) &&
                    i.progress() !== Ur &&
                    i.progress(Ur, !0).render(i.time(), !0, !0),
                  (Ye !== b.progress || S) &&
                    (i && !E && i.totalProgress(Ye, !0),
                    (b.progress = (ce - K) / it === Ye ? 0 : Ye)),
                  c && _ && (qt._pinOffset = Math.round(b.progress * Wt)),
                  f && !ke && f(b);
              }
            }),
            (b.getVelocity = function () {
              return ((rt() - Te) / (Xt() - Sn)) * 1e3 || 0;
            }),
            (b.endAnimation = function () {
              Yi(b.callbackAnimation),
                i &&
                  (Z
                    ? Z.progress(1)
                    : i.paused()
                      ? E || Yi(i, b.direction < 0, 1)
                      : Yi(i, i.reversed()));
            }),
            (b.labelToScroll = function (P) {
              return (
                (i &&
                  i.labels &&
                  (K || b.refresh() || K) +
                    (i.labels[P] / i.duration()) * it) ||
                0
              );
            }),
            (b.getTrailing = function (P) {
              var A = Y.indexOf(b),
                R = b.direction > 0 ? Y.slice(0, A).reverse() : Y.slice(A + 1);
              return (
                Oe(P)
                  ? R.filter(function (F) {
                      return F.vars.preventOverlaps === P;
                    })
                  : R
              ).filter(function (F) {
                return b.direction > 0 ? F.end <= K : F.start >= $t;
              });
            }),
            (b.update = function (P, A, R) {
              if (!(S && !R && !P)) {
                var F = ke ? Be : b.scroll(),
                  xt = P ? 0 : (F - K) / it,
                  I = xt < 0 ? 0 : xt > 1 ? 1 : xt || 0,
                  yt = b.progress,
                  ut,
                  Xe,
                  tt,
                  kt,
                  Ee,
                  ft,
                  ct,
                  vt;
                if (
                  (A &&
                    ((Te = ce),
                    (ce = S ? rt() : F),
                    m && ((yi = Hr), (Hr = i && !E ? i.totalProgress() : I))),
                  g &&
                    !I &&
                    c &&
                    !zt &&
                    !On &&
                    be &&
                    K < F + ((F - Te) / (Xt() - Sn)) * g &&
                    (I = 1e-4),
                  I !== yt && b.enabled)
                ) {
                  if (
                    ((ut = b.isActive = !!I && I < 1),
                    (Xe = !!yt && yt < 1),
                    (ft = ut !== Xe),
                    (Ee = ft || !!I != !!yt),
                    (b.direction = I > yt ? 1 : -1),
                    (b.progress = I),
                    Ee &&
                      !zt &&
                      ((tt = I && !yt ? 0 : I === 1 ? 1 : yt === 1 ? 2 : 3),
                      E &&
                        ((kt =
                          (!ft && B[tt + 1] !== "none" && B[tt + 1]) || B[tt]),
                        (vt =
                          i &&
                          (kt === "complete" || kt === "reset" || kt in i)))),
                    O &&
                      (ft || vt) &&
                      (vt || d || !i) &&
                      (Vt(O)
                        ? O(b)
                        : b.getTrailing(O).forEach(function (ht) {
                            return ht.endAnimation();
                          })),
                    E ||
                      (Z && !zt && !On
                        ? ((S || (Ir && Ir !== b)) &&
                            Z.render(Z._dp._time - Z._start),
                          Z.resetTo
                            ? Z.resetTo("totalProgress", I, i._tTime / i._tDur)
                            : ((Z.vars.totalProgress = I),
                              Z.invalidate().restart()))
                        : i && i.totalProgress(I, !!zt)),
                    c)
                  ) {
                    if ((P && _ && (qt.style[_ + M.os2] = Zi), !$))
                      _t(Wi(de + Wt * I));
                    else if (Ee) {
                      if (
                        ((ct = !P && I > yt && $t + 1 > F && F + 1 >= gr(D, M)),
                        x)
                      )
                        if (!P && (ut || ct)) {
                          var wi = Qe(c, !0),
                            qr = F - K;
                          fl(
                            c,
                            lt,
                            wi.top + (M === bt ? qr : 0) + Et,
                            wi.left + (M === bt ? 0 : qr) + Et,
                          );
                        } else fl(c, qt);
                      _i(ut || ct ? yr : mi),
                        (Wt !== it && I < 1 && ut) ||
                          _t(de + (I === 1 && !ct ? Wt : 0));
                    }
                  }
                  m && !Ft.tween && !zt && !On && Me.restart(!0),
                    a &&
                      (ft || (w && I && (I < 1 || !Bs))) &&
                      Tn(a.targets).forEach(function (ht) {
                        return ht.classList[ut || w ? "add" : "remove"](
                          a.className,
                        );
                      }),
                    s && !E && !P && s(b),
                    Ee && !zt
                      ? (E &&
                          (vt &&
                            (kt === "complete"
                              ? i.pause().totalProgress(1)
                              : kt === "reset"
                                ? i.restart(!0).pause()
                                : kt === "restart"
                                  ? i.restart(!0)
                                  : i[kt]()),
                          s && s(b)),
                        (ft || !Bs) &&
                          (l && ft && Vs(b, l),
                          z[tt] && Vs(b, z[tt]),
                          w && (I === 1 ? b.kill(!1, 1) : (z[tt] = 0)),
                          ft ||
                            ((tt = I === 1 ? 1 : 3), z[tt] && Vs(b, z[tt]))),
                        k &&
                          !ut &&
                          Math.abs(b.getVelocity()) > (Ii(k) ? k : 2500) &&
                          (Yi(b.callbackAnimation),
                          Z
                            ? Z.progress(1)
                            : Yi(i, kt === "reverse" ? 1 : !I, 1)))
                      : E && s && !zt && s(b);
                }
                if (Qi) {
                  var Tt = S ? (F / S.duration()) * (S._caScrollDist || 0) : F;
                  Ie(Tt + (Ut._isFlipped ? 1 : 0)), Qi(Tt);
                }
                vi && vi((-F / S.duration()) * (S._caScrollDist || 0));
              }
            }),
            (b.enable = function (P, A) {
              b.enabled ||
                ((b.enabled = !0),
                Dt(D, "resize", qi),
                Dt(W ? ot : D, "scroll", pi),
                et && Dt(o, "refreshInit", et),
                P !== !1 && ((b.progress = Ye = 0), (ce = Te = Ot = rt())),
                A !== !1 && b.refresh());
            }),
            (b.getTween = function (P) {
              return P && Ft ? Ft.tween : Z;
            }),
            (b.setPositions = function (P, A) {
              c &&
                ((de += P - K),
                (Wt += A - P - it),
                _ === pt && b.adjustPinSpacing(A - P - it)),
                (b.start = K = P),
                (b.end = $t = A),
                (it = A - P),
                b.update();
            }),
            (b.adjustPinSpacing = function (P) {
              if (Gt) {
                var A = Gt.indexOf(M.d) + 1;
                (Gt[A] = parseFloat(Gt[A]) + P + Et),
                  (Gt[1] = parseFloat(Gt[1]) + P + Et),
                  _i(Gt);
              }
            }),
            (b.disable = function (P, A) {
              if (
                b.enabled &&
                (P !== !1 && b.revert(!0, !0),
                (b.enabled = b.isActive = !1),
                A || (Z && Z.pause()),
                (Be = 0),
                Ht && (Ht.uncache = 1),
                et && Ct(o, "refreshInit", et),
                Me &&
                  (Me.pause(), Ft.tween && Ft.tween.kill() && (Ft.tween = 0)),
                !W)
              ) {
                for (var R = Y.length; R--; )
                  if (Y[R].scroller === D && Y[R] !== b) return;
                Ct(D, "resize", qi), Ct(D, "scroll", pi);
              }
            }),
            (b.kill = function (P, A) {
              b.disable(P, A), Z && !A && Z.kill(), u && delete Ks[u];
              var R = Y.indexOf(b);
              R >= 0 && Y.splice(R, 1),
                R === Bt && $n > 0 && Bt--,
                (R = 0),
                Y.forEach(function (F) {
                  return F.scroller === b.scroller && (R = 1);
                }),
                R || ke || (b.scroll.rec = 0),
                i &&
                  ((i.scrollTrigger = null),
                  P && i.revert({ kill: !1 }),
                  A || i.kill()),
                he &&
                  [he, We, Ut, T].forEach(function (F) {
                    return F.parentNode && F.parentNode.removeChild(F);
                  }),
                Ir === b && (Ir = 0),
                c &&
                  (Ht && (Ht.uncache = 1),
                  (R = 0),
                  Y.forEach(function (F) {
                    return F.pin === c && R++;
                  }),
                  R || (Ht.spacer = 0)),
                e.onKill && e.onKill(b);
            }),
            b.enable(!1, !1),
            er && er(b),
            !i || !i.add || it
              ? b.refresh()
              : L.delayedCall(0.01, function () {
                  return K || $t || b.refresh();
                }) &&
                (it = 0.01) &&
                (K = $t = 0),
            c && af();
        }),
        (o.register = function (e) {
          return (
            ui ||
              ((L = e || Ka()),
              ja() && window.document && o.enable(),
              (ui = kn)),
            ui
          );
        }),
        (o.defaults = function (e) {
          if (e) for (var i in e) Rn[i] = e[i];
          return Rn;
        }),
        (o.disable = function (e, i) {
          (kn = 0),
            Y.forEach(function (s) {
              return s[i ? "kill" : "disable"](e);
            }),
            Ct(q, "wheel", pi),
            Ct(ot, "scroll", pi),
            clearInterval(Cn),
            Ct(ot, "touchcancel", Ne),
            Ct(lt, "touchstart", Ne),
            Dn(Ct, ot, "pointerdown,touchstart,mousedown", qa),
            Dn(Ct, ot, "pointerup,touchend,mouseup", Ga),
            xn.kill(),
            Mn(Ct);
          for (var n = 0; n < U.length; n += 3)
            An(Ct, U[n], U[n + 1]), An(Ct, U[n], U[n + 2]);
        }),
        (o.enable = function () {
          if (
            ((q = window),
            (ot = document),
            (ze = ot.documentElement),
            (lt = ot.body),
            L &&
              ((Tn = L.utils.toArray),
              (fi = L.utils.clamp),
              (Is = L.core.context || Ne),
              (Ws = L.core.suppressOverwrites || Ne),
              (Ys = q.history.scrollRestoration || "auto"),
              L.core.globals("ScrollTrigger", o),
              lt))
          ) {
            (kn = 1),
              mt.register(L),
              (o.isTouch = mt.isTouch),
              (_r =
                mt.isTouch &&
                /(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent)),
              Dt(q, "wheel", pi),
              (Wa = [q, ot, ze, lt]),
              L.matchMedia
                ? ((o.matchMedia = function (u) {
                    var l = L.matchMedia(),
                      f;
                    for (f in u) l.add(f, u[f]);
                    return l;
                  }),
                  L.addEventListener("matchMediaInit", function () {
                    return Qs();
                  }),
                  L.addEventListener("matchMediaRevert", function () {
                    return sl();
                  }),
                  L.addEventListener("matchMedia", function () {
                    Wr(0, 1), Fr("matchMedia");
                  }),
                  L.matchMedia("(orientation: portrait)", function () {
                    return Zs(), Zs;
                  }))
                : console.warn("Requires GSAP 3.11.0 or later"),
              Zs(),
              Dt(ot, "scroll", pi);
            var e = lt.style,
              i = e.borderTopStyle,
              n = L.core.Animation.prototype,
              s,
              a;
            for (
              n.revert ||
                Object.defineProperty(n, "revert", {
                  value: function () {
                    return this.time(-0.01, !0);
                  },
                }),
                e.borderTopStyle = "solid",
                s = Qe(lt),
                bt.m = Math.round(s.top + bt.sc()) || 0,
                Yt.m = Math.round(s.left + Yt.sc()) || 0,
                i
                  ? (e.borderTopStyle = i)
                  : e.removeProperty("border-top-style"),
                Cn = setInterval(il, 250),
                L.delayedCall(0.5, function () {
                  return (On = 0);
                }),
                Dt(ot, "touchcancel", Ne),
                Dt(lt, "touchstart", Ne),
                Dn(Dt, ot, "pointerdown,touchstart,mousedown", qa),
                Dn(Dt, ot, "pointerup,touchend,mouseup", Ga),
                $s = L.utils.checkPrefix("transform"),
                Wn.push($s),
                ui = Xt(),
                xn = L.delayedCall(0.2, Wr).pause(),
                ci = [
                  ot,
                  "visibilitychange",
                  function () {
                    var u = q.innerWidth,
                      l = q.innerHeight;
                    ot.hidden
                      ? ((Ia = u), (Ya = l))
                      : (Ia !== u || Ya !== l) && qi();
                  },
                  ot,
                  "DOMContentLoaded",
                  Wr,
                  q,
                  "load",
                  Wr,
                  q,
                  "resize",
                  qi,
                ],
                Mn(Dt),
                Y.forEach(function (u) {
                  return u.enable(0, 1);
                }),
                a = 0;
              a < U.length;
              a += 3
            )
              An(Ct, U[a], U[a + 1]), An(Ct, U[a], U[a + 2]);
          }
        }),
        (o.config = function (e) {
          "limitCallbacks" in e && (Bs = !!e.limitCallbacks);
          var i = e.syncInterval;
          (i && clearInterval(Cn)) || ((Cn = i) && setInterval(il, i)),
            "ignoreMobileResize" in e &&
              (Va = o.isTouch === 1 && e.ignoreMobileResize),
            "autoRefreshEvents" in e &&
              (Mn(Ct) || Mn(Dt, e.autoRefreshEvents || "none"),
              (Xa = (e.autoRefreshEvents + "").indexOf("resize") === -1));
        }),
        (o.scrollerProxy = function (e, i) {
          var n = ee(e),
            s = U.indexOf(n),
            a = Rr(n);
          ~s && U.splice(s, a ? 6 : 2),
            i && (a ? Le.unshift(q, i, lt, i, ze, i) : Le.unshift(n, i));
        }),
        (o.clearMatchMedia = function (e) {
          Y.forEach(function (i) {
            return i._ctx && i._ctx.query === e && i._ctx.kill(!0, !0);
          });
        }),
        (o.isInViewport = function (e, i, n) {
          var s = (Oe(e) ? ee(e) : e).getBoundingClientRect(),
            a = s[n ? Lr : zr] * i || 0;
          return n
            ? s.right - a > 0 && s.left + a < q.innerWidth
            : s.bottom - a > 0 && s.top + a < q.innerHeight;
        }),
        (o.positionInViewport = function (e, i, n) {
          Oe(e) && (e = ee(e));
          var s = e.getBoundingClientRect(),
            a = s[n ? Lr : zr],
            u =
              i == null
                ? a / 2
                : i in Ln
                  ? Ln[i] * a
                  : ~i.indexOf("%")
                    ? (parseFloat(i) * a) / 100
                    : parseFloat(i) || 0;
          return n ? (s.left + u) / q.innerWidth : (s.top + u) / q.innerHeight;
        }),
        (o.killAll = function (e) {
          if (
            (Y.forEach(function (n) {
              return n.vars.id !== "ScrollSmoother" && n.kill();
            }),
            e !== !0)
          ) {
            var i = Nr.killAll || [];
            (Nr = {}),
              i.forEach(function (n) {
                return n();
              });
          }
        }),
        o
      );
    })();
  (G.version = "3.11.3"),
    (G.saveStyles = function (o) {
      return o
        ? Tn(o).forEach(function (t) {
            if (t && t.style) {
              var r = fe.indexOf(t);
              r >= 0 && fe.splice(r, 5),
                fe.push(
                  t,
                  t.style.cssText,
                  t.getBBox && t.getAttribute("transform"),
                  L.core.getCache(t),
                  Is(),
                );
            }
          })
        : fe;
    }),
    (G.revert = function (o, t) {
      return Qs(!o, t);
    }),
    (G.create = function (o, t) {
      return new G(o, t);
    }),
    (G.refresh = function (o) {
      return o ? qi() : (ui || G.register()) && Wr(!0);
    }),
    (G.update = Yr),
    (G.clearScrollMemory = ol),
    (G.maxScroll = function (o, t) {
      return gr(o, t ? Yt : bt);
    }),
    (G.getScrollFunc = function (o, t) {
      return pr(ee(o), t ? Yt : bt);
    }),
    (G.getById = function (o) {
      return Ks[o];
    }),
    (G.getAll = function () {
      return Y.filter(function (o) {
        return o.vars.id !== "ScrollSmoother";
      });
    }),
    (G.isScrolling = function () {
      return !!be;
    }),
    (G.snapDirectional = js),
    (G.addEventListener = function (o, t) {
      var r = Nr[o] || (Nr[o] = []);
      ~r.indexOf(t) || r.push(t);
    }),
    (G.removeEventListener = function (o, t) {
      var r = Nr[o],
        e = r && r.indexOf(t);
      e >= 0 && r.splice(e, 1);
    }),
    (G.batch = function (o, t) {
      var r = [],
        e = {},
        i = t.interval || 0.016,
        n = t.batchMax || 1e9,
        s = function (l, f) {
          var d = [],
            h = [],
            c = L.delayedCall(i, function () {
              f(d, h), (d = []), (h = []);
            }).pause();
          return function (_) {
            d.length || c.restart(!0),
              d.push(_.trigger),
              h.push(_),
              n <= d.length && c.progress(1);
          };
        },
        a;
      for (a in t)
        e[a] =
          a.substr(0, 2) === "on" && Vt(t[a]) && a !== "onRefreshInit"
            ? s(a, t[a])
            : t[a];
      return (
        Vt(n) &&
          ((n = n()),
          Dt(G, "refresh", function () {
            return (n = t.batchMax());
          })),
        Tn(o).forEach(function (u) {
          var l = {};
          for (a in e) l[a] = e[a];
          (l.trigger = u), r.push(G.create(l));
        }),
        r
      );
    });
  var hl = function (t, r, e, i) {
      return (
        r > i ? t(i) : r < 0 && t(0),
        e > i ? (i - r) / (e - r) : e < 0 ? r / (r - e) : 1
      );
    },
    eo = function o(t, r) {
      r === !0
        ? t.style.removeProperty("touch-action")
        : (t.style.touchAction =
            r === !0
              ? "auto"
              : r
                ? "pan-" + r + (mt.isTouch ? " pinch-zoom" : "")
                : "none"),
        t === ze && o(lt, r);
    },
    dl = { auto: 1, scroll: 1 },
    hf = function (t) {
      var r = t.event,
        e = t.target,
        i = t.axis,
        n = (r.changedTouches ? r.changedTouches[0] : r).target,
        s = n._gsap || L.core.getCache(n),
        a = Xt(),
        u;
      if (!s._isScrollT || a - s._isScrollT > 2e3) {
        for (; n && n.scrollHeight <= n.clientHeight; ) n = n.parentNode;
        (s._isScroll =
          n &&
          !Rr(n) &&
          n !== e &&
          (dl[(u = Fe(n)).overflowY] || dl[u.overflowX])),
          (s._isScrollT = a);
      }
      (s._isScroll || i === "x") && (r.stopPropagation(), (r._gsapAllow = !0));
    },
    pl = function (t, r, e, i) {
      return mt.create({
        target: t,
        capture: !0,
        debounce: !1,
        lockAxis: !0,
        type: r,
        onWheel: (i = i && hf),
        onPress: i,
        onDrag: i,
        onScroll: i,
        onEnable: function () {
          return e && Dt(ot, mt.eventTypes[0], gl, !1, !0);
        },
        onDisable: function () {
          return Ct(ot, mt.eventTypes[0], gl, !0);
        },
      });
    },
    df = /(input|label|select|textarea)/i,
    _l,
    gl = function (t) {
      var r = df.test(t.target.tagName);
      (r || _l) && ((t._gsapAllow = !0), (_l = r));
    },
    pf = function (t) {
      En(t) || (t = {}),
        (t.preventDefault = t.isNormalizer = t.allowClicks = !0),
        t.type || (t.type = "wheel,touch"),
        (t.debounce = !!t.debounce),
        (t.id = t.id || "normalizer");
      var r = t,
        e = r.normalizeScrollX,
        i = r.momentum,
        n = r.allowNestedScroll,
        s,
        a,
        u = ee(t.target) || ze,
        l = L.core.globals().ScrollSmoother,
        f = l && l.get(),
        d =
          _r &&
          ((t.content && ee(t.content)) ||
            (f && t.content !== !1 && !f.smooth() && f.content())),
        h = pr(u, bt),
        c = pr(u, Yt),
        _ = 1,
        p =
          (mt.isTouch && q.visualViewport
            ? q.visualViewport.scale * q.visualViewport.width
            : q.outerWidth) / q.innerWidth,
        g = 0,
        v = Vt(i)
          ? function () {
              return i(s);
            }
          : function () {
              return i || 2.8;
            },
        y,
        w,
        m = pl(u, t.type, !0, n),
        x = function () {
          return (w = !1);
        },
        C = Ne,
        S = Ne,
        k = function () {
          (a = gr(u, bt)),
            (S = fi(_r ? 1 : 0, a)),
            e && (C = fi(0, gr(u, Yt))),
            (y = $r);
        },
        O = function () {
          (d._gsap.y = Wi(parseFloat(d._gsap.y) + h.offset) + "px"),
            (d.style.transform =
              "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " +
              parseFloat(d._gsap.y) +
              ", 0, 1)"),
            (h.offset = h.cacheID = 0);
        },
        M = function () {
          if (w) {
            requestAnimationFrame(x);
            var B = Wi(s.deltaY / 2),
              N = S(h.v - B);
            if (d && N !== h.v + h.offset) {
              h.offset = N - h.v;
              var V = Wi((parseFloat(d && d._gsap.y) || 0) - h.offset);
              (d.style.transform =
                "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " +
                V +
                ", 0, 1)"),
                (d._gsap.y = V + "px"),
                (h.cacheID = U.cache),
                Yr();
            }
            return !0;
          }
          h.offset && O(), (w = !0);
        },
        E,
        D,
        X,
        W,
        $ = function () {
          k(),
            E.isActive() &&
              E.vars.scrollY > a &&
              (h() > a ? E.progress(1) && h(a) : E.resetTo("scrollY", a));
        };
      return (
        d && L.set(d, { y: "+=0" }),
        (t.ignoreCheck = function (z) {
          return (
            (_r && z.type === "touchmove" && M()) ||
            (_ > 1.05 && z.type !== "touchstart") ||
            s.isGesturing ||
            (z.touches && z.touches.length > 1)
          );
        }),
        (t.onPress = function () {
          var z = _;
          (_ = Wi(((q.visualViewport && q.visualViewport.scale) || 1) / p)),
            E.pause(),
            z !== _ && eo(u, _ > 1.01 ? !0 : e ? !1 : "x"),
            (D = c()),
            (X = h()),
            k(),
            (y = $r);
        }),
        (t.onRelease = t.onGestureStart =
          function (z, B) {
            if ((h.offset && O(), !B)) W.restart(!0);
            else {
              U.cache++;
              var N = v(),
                V,
                b;
              e &&
                ((V = c()),
                (b = V + (N * 0.05 * -z.velocityX) / 0.227),
                (N *= hl(c, V, b, gr(u, Yt))),
                (E.vars.scrollX = C(b))),
                (V = h()),
                (b = V + (N * 0.05 * -z.velocityY) / 0.227),
                (N *= hl(h, V, b, gr(u, bt))),
                (E.vars.scrollY = S(b)),
                E.invalidate().duration(N).play(0.01),
                ((_r && E.vars.scrollY >= a) || V >= a - 1) &&
                  L.to({}, { onUpdate: $, duration: N });
            }
          }),
        (t.onWheel = function () {
          E._ts && E.pause(), Xt() - g > 1e3 && ((y = 0), (g = Xt()));
        }),
        (t.onChange = function (z, B, N, V, b) {
          if (
            ($r !== y && k(),
            B && e && c(C(V[2] === B ? D + (z.startX - z.x) : c() + B - V[1])),
            N)
          ) {
            h.offset && O();
            var et = b[2] === N,
              Pt = et ? X + z.startY - z.y : h() + N - b[1],
              re = S(Pt);
            et && Pt !== re && (X += re - Pt), h(re);
          }
          (N || B) && Yr();
        }),
        (t.onEnable = function () {
          eo(u, e ? !1 : "x"),
            G.addEventListener("refresh", $),
            Dt(q, "resize", $),
            h.smooth &&
              ((h.target.style.scrollBehavior = "auto"),
              (h.smooth = c.smooth = !1)),
            m.enable();
        }),
        (t.onDisable = function () {
          eo(u, !0),
            Ct(q, "resize", $),
            G.removeEventListener("refresh", $),
            m.kill();
        }),
        (t.lockAxis = t.lockAxis !== !1),
        (s = new mt(t)),
        (s.iOS = _r),
        _r && !h() && h(1),
        _r && L.ticker.add(Ne),
        (W = s._dc),
        (E = L.to(s, {
          ease: "power4",
          paused: !0,
          scrollX: e ? "+=0.1" : "+=0",
          scrollY: "+=0.1",
          onComplete: W.vars.onComplete,
        })),
        s
      );
    };
  (G.sort = function (o) {
    return Y.sort(
      o ||
        function (t, r) {
          return (
            (t.vars.refreshPriority || 0) * -1e6 +
            t.start -
            (r.start + (r.vars.refreshPriority || 0) * -1e6)
          );
        },
    );
  }),
    (G.observe = function (o) {
      return new mt(o);
    }),
    (G.normalizeScroll = function (o) {
      if (typeof o > "u") return ue;
      if (o === !0 && ue) return ue.enable();
      if (o === !1) return ue && ue.kill();
      var t = o instanceof mt ? o : pf(o);
      return (
        ue && ue.target === t.target && ue.kill(), Rr(t.target) && (ue = t), t
      );
    }),
    (G.core = {
      _getVelocityProp: Fs,
      _inputObserver: pl,
      _scrollers: U,
      _proxies: Le,
      bridge: {
        ss: function () {
          be || Fr("scrollStart"), (be = Xt());
        },
        ref: function () {
          return zt;
        },
      },
    }),
    Ka() && L.registerPlugin(G);
  const _f = (o, t) => {
    let r;
    return (...i) => {
      clearTimeout(r), (r = setTimeout(() => o(...i), t));
    };
  };
  function gf(o) {
    const t = o
      .replace("[", "")
      .replace("]", "")
      .split("-")
      .filter((r) => r !== "data");
    return (
      t[0] +
      t
        .slice(1)
        .map((r) => r[0].toUpperCase() + r.slice(1))
        .join("")
    );
  }
  (() => {
    function o(...e) {
      const i = e.length;
      for (let n = 0; n < i; n++) {
        const s = e[n];
        s.nodeType === 1 || s.nodeType === 11
          ? this.appendChild(s)
          : this.appendChild(document.createTextNode(String(s)));
      }
    }
    function t(...e) {
      for (; this.lastChild; ) this.removeChild(this.lastChild);
      e.length && this.append(...e);
    }
    function r(...e) {
      const i = this.parentNode;
      let n = e.length;
      if (!!i)
        for (n || i.removeChild(this); n--; ) {
          let s = e[n];
          typeof s != "object"
            ? (s = this.ownerDocument.createTextNode(s))
            : s.parentNode && s.parentNode.removeChild(s),
            n
              ? i.insertBefore(this.previousSibling, s)
              : i.replaceChild(s, this);
        }
    }
    typeof Element < "u" &&
      (Element.prototype.append ||
        ((Element.prototype.append = o),
        (DocumentFragment.prototype.append = o)),
      Element.prototype.replaceChildren ||
        ((Element.prototype.replaceChildren = t),
        (DocumentFragment.prototype.replaceChildren = t)),
      Element.prototype.replaceWith ||
        ((Element.prototype.replaceWith = r),
        (DocumentFragment.prototype.replaceWith = r)));
  })();
  function Br(o, t) {
    return Object.getOwnPropertyNames(Object(o)).reduce((r, e) => {
      const i = Object.getOwnPropertyDescriptor(Object(o), e),
        n = Object.getOwnPropertyDescriptor(Object(t), e);
      return Object.defineProperty(r, e, n || i);
    }, {});
  }
  function Gi(o) {
    return typeof o == "string";
  }
  function ro(o) {
    return Array.isArray(o);
  }
  function Bn(o = {}) {
    const t = Br(o);
    let r;
    return (
      t.types !== void 0 ? (r = t.types) : t.split !== void 0 && (r = t.split),
      r !== void 0 &&
        (t.types = (Gi(r) || ro(r) ? String(r) : "")
          .split(",")
          .map((e) => String(e).trim())
          .filter((e) => /((line)|(word)|(char))/i.test(e))),
      (t.absolute || t.position) &&
        (t.absolute = t.absolute || /absolute/.test(o.position)),
      t
    );
  }
  function io(o) {
    const t = Gi(o) || ro(o) ? String(o) : "";
    return {
      none: !t,
      lines: /line/i.test(t),
      words: /word/i.test(t),
      chars: /char/i.test(t),
    };
  }
  function Xn(o) {
    return o !== null && typeof o == "object";
  }
  function mf(o) {
    return Xn(o) && /^(1|3|11)$/.test(o.nodeType);
  }
  function yf(o) {
    return typeof o == "number" && o > -1 && o % 1 === 0;
  }
  function vf(o) {
    return Xn(o) && yf(o.length);
  }
  function Xr(o) {
    return ro(o)
      ? o
      : o == null
        ? []
        : vf(o)
          ? Array.prototype.slice.call(o)
          : [o];
  }
  function ml(o) {
    let t = o;
    return (
      Gi(o) &&
        (/^(#[a-z]\w+)$/.test(o.trim())
          ? (t = document.getElementById(o.trim().slice(1)))
          : (t = document.querySelectorAll(o))),
      Xr(t).reduce((r, e) => [...r, ...Xr(e).filter(mf)], [])
    );
  }
  const { entries: wf, keys: Uf, values: qf } = Object,
    Vn = "_splittype",
    Je = {};
  let bf = 0;
  function $e(o, t, r) {
    if (!Xn(o)) return console.warn("[data.set] owner is not an object"), null;
    const e = o[Vn] || (o[Vn] = ++bf),
      i = Je[e] || (Je[e] = {});
    return (
      r === void 0
        ? !!t &&
          Object.getPrototypeOf(t) === Object.prototype &&
          (Je[e] = { ...i, ...t })
        : t !== void 0 && (i[t] = r),
      r
    );
  }
  function Vr(o, t) {
    const r = Xn(o) ? o[Vn] : null,
      e = (r && Je[r]) || {};
    return t === void 0 ? e : e[t];
  }
  function yl(o) {
    const t = o && o[Vn];
    t && (delete o[t], delete Je[t]);
  }
  function xf() {
    wf(Je).forEach(([o, { isRoot: t, isSplit: r }]) => {
      (!t || !r) && ((Je[o] = null), delete Je[o]);
    });
  }
  function Tf(o, t = " ") {
    return (o ? String(o) : "").trim().replace(/\s+/g, " ").split(t);
  }
  const no = "\\ud800-\\udfff",
    vl = "\\u0300-\\u036f\\ufe20-\\ufe23",
    wl = "\\u20d0-\\u20f0",
    bl = "\\ufe0e\\ufe0f",
    Sf = `[${no}]`,
    so = `[${vl}${wl}]`,
    oo = "\\ud83c[\\udffb-\\udfff]",
    Cf = `(?:${so}|${oo})`,
    xl = `[^${no}]`,
    Tl = "(?:\\ud83c[\\udde6-\\uddff]){2}",
    Sl = "[\\ud800-\\udbff][\\udc00-\\udfff]",
    Cl = "\\u200d",
    Pl = `${Cf}?`,
    Ol = `[${bl}]?`,
    Pf = "(?:" + Cl + "(?:" + [xl, Tl, Sl].join("|") + ")" + Ol + Pl + ")*",
    Of = Ol + Pl + Pf,
    kf = `(?:${[`${xl}${so}?`, so, Tl, Sl, Sf].join("|")}
)`,
    Mf = RegExp(`${oo}(?=${oo})|${kf}${Of}`, "g"),
    Ef = RegExp(`[${[Cl, no, vl, wl, bl].join("")}]`);
  function Df(o) {
    return o.split("");
  }
  function kl(o) {
    return Ef.test(o);
  }
  function Af(o) {
    return o.match(Mf) || [];
  }
  function Rf(o) {
    return kl(o) ? Af(o) : Df(o);
  }
  function Lf(o) {
    return o == null ? "" : String(o);
  }
  function zf(o, t = "") {
    return (o = Lf(o)), o && Gi(o) && !t && kl(o) ? Rf(o) : o.split(t);
  }
  function ao(o, t) {
    const r = document.createElement(o);
    return (
      t &&
        Object.keys(t).forEach((e) => {
          const i = t[e],
            n = Gi(i) ? i.trim() : i;
          n === null ||
            n === "" ||
            (e === "children" ? r.append(...Xr(n)) : r.setAttribute(e, n));
        }),
      r
    );
  }
  var lo = {
    splitClass: "",
    lineClass: "line",
    wordClass: "word",
    charClass: "char",
    types: ["lines", "words", "chars"],
    absolute: !1,
    tagName: "div",
  };
  function Nf(o, t) {
    t = Br(lo, t);
    const r = io(t.types),
      e = t.tagName,
      i = o.nodeValue,
      n = document.createDocumentFragment();
    let s = [],
      a = [];
    return (
      /^\s/.test(i) && n.append(" "),
      (s = Tf(i).reduce((u, l, f, d) => {
        let h, c;
        return (
          r.chars &&
            (c = zf(l).map((_) => {
              const p = ao(e, {
                class: `${t.splitClass} ${t.charClass}`,
                style: "display: inline-block;",
                children: _,
              });
              return $e(p, "isChar", !0), (a = [...a, p]), p;
            })),
          r.words || r.lines
            ? ((h = ao(e, {
                class: `${t.wordClass} ${t.splitClass}`,
                style: `display: inline-block; ${r.words && t.absolute ? "position: relative;" : ""}`,
                children: r.chars ? c : l,
              })),
              $e(h, { isWord: !0, isWordStart: !0, isWordEnd: !0 }),
              n.appendChild(h))
            : c.forEach((_) => {
                n.appendChild(_);
              }),
          f < d.length - 1 && n.append(" "),
          r.words ? u.concat(h) : u
        );
      }, [])),
      /\s$/.test(i) && n.append(" "),
      o.replaceWith(n),
      { words: s, chars: a }
    );
  }
  function Ml(o, t) {
    const r = o.nodeType,
      e = { words: [], chars: [] };
    if (!/(1|3|11)/.test(r)) return e;
    if (r === 3 && /\S/.test(o.nodeValue)) return Nf(o, t);
    const i = Xr(o.childNodes);
    if (i.length && ($e(o, "isSplit", !0), !Vr(o).isRoot)) {
      (o.style.display = "inline-block"), (o.style.position = "relative");
      const n = o.nextSibling,
        s = o.previousSibling,
        a = o.textContent || "",
        u = n ? n.textContent : " ",
        l = s ? s.textContent : " ";
      $e(o, {
        isWordEnd: /\s$/.test(a) || /^\s/.test(u),
        isWordStart: /^\s/.test(a) || /\s$/.test(l),
      });
    }
    return i.reduce((n, s) => {
      const { words: a, chars: u } = Ml(s, t);
      return { words: [...n.words, ...a], chars: [...n.chars, ...u] };
    }, e);
  }
  function Ff(o, t, r, e) {
    if (!r.absolute) return { top: t ? o.offsetTop : null };
    const i = o.offsetParent,
      [n, s] = e;
    let a = 0,
      u = 0;
    if (i && i !== document.body) {
      const p = i.getBoundingClientRect();
      (a = p.x + n), (u = p.y + s);
    }
    const { width: l, height: f, x: d, y: h } = o.getBoundingClientRect(),
      c = h + s - u,
      _ = d + n - a;
    return { width: l, height: f, top: c, left: _ };
  }
  function El(o) {
    Vr(o).isWord
      ? (yl(o), o.replaceWith(...o.childNodes))
      : Xr(o.children).forEach((t) => El(t));
  }
  const $f = () => document.createDocumentFragment();
  function Wf(o, t, r) {
    const e = io(t.types),
      i = t.tagName,
      n = o.getElementsByTagName("*"),
      s = [];
    let a = [],
      u = null,
      l,
      f,
      d,
      h = [];
    const c = o.parentElement,
      _ = o.nextElementSibling,
      p = $f(),
      g = window.getComputedStyle(o),
      v = g.textAlign,
      w = parseFloat(g.fontSize) * 0.2;
    return (
      t.absolute &&
        ((d = { left: o.offsetLeft, top: o.offsetTop, width: o.offsetWidth }),
        (f = o.offsetWidth),
        (l = o.offsetHeight),
        $e(o, { cssWidth: o.style.width, cssHeight: o.style.height })),
      Xr(n).forEach((m) => {
        const x = m.parentElement === o,
          { width: C, height: S, top: k, left: O } = Ff(m, x, t, r);
        /^br$/i.test(m.nodeName) ||
          (e.lines &&
            x &&
            ((u === null || k - u >= w) && ((u = k), s.push((a = []))),
            a.push(m)),
          t.absolute && $e(m, { top: k, left: O, width: C, height: S }));
      }),
      c && c.removeChild(o),
      e.lines &&
        ((h = s.map((m) => {
          const x = ao(i, {
            class: `${t.splitClass} ${t.lineClass}`,
            style: `display: block; text-align: ${v}; width: 100%;`,
          });
          $e(x, "isLine", !0);
          const C = { height: 0, top: 1e4 };
          return (
            p.appendChild(x),
            m.forEach((S, k, O) => {
              const { isWordEnd: M, top: E, height: D } = Vr(S),
                X = O[k + 1];
              (C.height = Math.max(C.height, D)),
                (C.top = Math.min(C.top, E)),
                x.appendChild(S),
                M && Vr(X).isWordStart && x.append(" ");
            }),
            t.absolute && $e(x, { height: C.height, top: C.top }),
            x
          );
        })),
        e.words || El(p),
        o.replaceChildren(p)),
      t.absolute &&
        ((o.style.width = `${o.style.width || f}px`),
        (o.style.height = `${l}px`),
        Xr(n).forEach((m) => {
          const { isLine: x, top: C, left: S, width: k, height: O } = Vr(m),
            M = Vr(m.parentElement),
            E = !x && M.isLine;
          (m.style.top = `${E ? C - M.top : C}px`),
            (m.style.left = x ? `${d.left}px` : `${S - (E ? d.left : 0)}px`),
            (m.style.height = `${O}px`),
            (m.style.width = x ? `${d.width}px` : `${k}px`),
            (m.style.position = "absolute");
        })),
      c && (_ ? c.insertBefore(o, _) : c.appendChild(o)),
      h
    );
  }
  let gi = Br(lo, {});
  class Hn {
    static get data() {
      return Je;
    }
    static get defaults() {
      return gi;
    }
    static set defaults(t) {
      gi = Br(gi, Bn(t));
    }
    static setDefaults(t) {
      return (gi = Br(gi, Bn(t))), lo;
    }
    static revert(t) {
      ml(t).forEach((r) => {
        const { isSplit: e, html: i, cssWidth: n, cssHeight: s } = Vr(r);
        e &&
          ((r.innerHTML = i),
          (r.style.width = n || ""),
          (r.style.height = s || ""),
          yl(r));
      });
    }
    static create(t, r) {
      return new Hn(t, r);
    }
    constructor(t, r) {
      (this.isSplit = !1),
        (this.settings = Br(gi, Bn(r))),
        (this.elements = ml(t)),
        this.split();
    }
    split(t) {
      this.revert(),
        this.elements.forEach((i) => {
          $e(i, "html", i.innerHTML);
        }),
        (this.lines = []),
        (this.words = []),
        (this.chars = []);
      const r = [window.pageXOffset, window.pageYOffset];
      t !== void 0 && (this.settings = Br(this.settings, Bn(t)));
      const e = io(this.settings.types);
      e.none ||
        (this.elements.forEach((i) => {
          $e(i, "isRoot", !0);
          const { words: n, chars: s } = Ml(i, this.settings);
          (this.words = [...this.words, ...n]),
            (this.chars = [...this.chars, ...s]);
        }),
        this.elements.forEach((i) => {
          if (e.lines || this.settings.absolute) {
            const n = Wf(i, this.settings, r);
            this.lines = [...this.lines, ...n];
          }
        }),
        (this.isSplit = !0),
        window.scrollTo(r[0], r[1]),
        xf());
    }
    revert() {
      this.isSplit &&
        ((this.lines = null),
        (this.words = null),
        (this.chars = null),
        (this.isSplit = !1)),
        Hn.revert(this.elements);
    }
  }
  const If = 60,
    uo = {
      splitClassNames: {
        lineClass: "split-line",
        charClass: "split-character",
      },
      selector: "as",
    };
  class Yf {
    constructor(t, r = uo) {
      Ve(this, "DOM");
      Ve(this, "animations", []);
      Ve(this, "splitType", null);
      Ve(this, "splitClassNames");
      Ve(this, "timeline", null);
      Ve(this, "lineTemplates", {});
      Ve(this, "delay", 0);
      Ve(this, "selector");
      Ve(this, "attribute");
      (this.selector = r.selector || uo.selector),
        (this.attribute = gf(this.selector)),
        (this.delay = t.dataset[`${this.attribute}Delay`]
          ? Number(t.dataset[`${this.attribute}Delay`])
          : 0);
      const e = t.querySelectorAll(`[data-${this.selector}-style='split']`),
        i = t.querySelectorAll(`[data-${this.selector}-style='appear']`),
        n = t.querySelectorAll(`[data-${this.selector}-style='lines']`);
      (this.splitClassNames = { ...uo.splitClassNames, ...r.splitClassNames }),
        (this.DOM = { el: t, split: e, appear: i, lines: n }),
        this.initLineTemplates(),
        this.reSplit();
    }
    get splitCharacters() {
      var t;
      return (t = this.splitType) == null ? void 0 : t.chars;
    }
    get splitLines() {
      var t;
      return (t = this.splitType) == null ? void 0 : t.lines;
    }
    initAnimations() {
      (this.animations = []),
        this.setupSplitAnimations(),
        this.setupAppearAnimations();
    }
    reSplit(t = !1) {
      var r;
      (r = this.splitType) == null || r.revert(),
        this.DOM.el &&
          ((this.splitType = new Hn(
            this.DOM.el.querySelectorAll(
              `[data-${this.selector}-style='split']`,
            ),
            { types: "lines, chars", ...this.splitClassNames },
          )),
          this.attachLines(),
          this.initAnimations(),
          this.setupLines(t));
    }
    initLineTemplates() {
      var r;
      const t = Array.from(
        ((r = this.DOM.el) == null
          ? void 0
          : r.querySelectorAll(`[data-${this.selector}-attach]`)) || [],
      );
      this.lineTemplates = t.reduce((e, i) => {
        const n = i.dataset[`${this.attribute}Attach`];
        if (!n) return e;
        const s = i.parentElement;
        try {
          return { ...e, [n]: s == null ? void 0 : s.removeChild(i) };
        } catch {
          return e;
        }
      }, {});
    }
    attachLines() {
      var r;
      Array.from(
        ((r = this.DOM.el) == null
          ? void 0
          : r.querySelectorAll(`[data-${this.selector}-attach-target]`)) || [],
      ).forEach((e) => {
        const i =
          this.lineTemplates[e.dataset[`${this.attribute}AttachTarget`] || ""];
        i && e.appendChild(i.cloneNode(!0));
      });
    }
    setupSplitAnimations() {
      const t = Array.from(this.DOM.split || []).map((r) => {
        var l, f;
        const i =
            (((l = r.textContent) == null ? void 0 : l.length) || 0) <= If,
          n = r.dataset[`${this.attribute}Duration`]
            ? Number(r.dataset[`${this.attribute}Duration`])
            : i
              ? 0.5
              : 0.35,
          s = r.dataset[`${this.attribute}Stagger`]
            ? Number(r.dataset[`${this.attribute}Stagger`])
            : i
              ? 0.014
              : 0.009,
          a = r.dataset[`${this.attribute}Order`]
            ? Number(r.dataset[`${this.attribute}Order`])
            : 0,
          u = r.dataset[`${this.attribute}Position`] || "+=0";
        return {
          type: "split",
          el:
            (f = r.querySelectorAll(`.${this.splitClassNames.charClass}`)) !=
            null
              ? f
              : null,
          duration: n,
          stagger: s,
          order: a,
          position: u,
        };
      });
      this.animations = [
        ...this.animations,
        ...t.sort((r, e) => r.order - e.order),
      ];
    }
    setupAppearAnimations() {
      const t = Array.from(this.DOM.appear || []).map((r) => {
        const e = r.dataset[`${this.attribute}Duration`]
            ? Number(r.dataset[`${this.attribute}Duration`])
            : 0.5,
          i = r.dataset[`${this.attribute}Order`]
            ? Number(r.dataset[`${this.attribute}Order`])
            : 0,
          n = r.dataset[`${this.attribute}Position`] || "+=0";
        return { type: "appear", el: r, duration: e, order: i, position: n };
      });
      this.animations = [
        ...this.animations,
        ...t.sort((r, e) => r.order - e.order),
      ];
    }
    setupLines(t = !1) {
      if (!this.DOM.el) return;
      const r = this.DOM.el.querySelectorAll(
          `[data-${this.selector}-style='lines']`,
        ),
        e = Array.from(r).map((i) => {
          const n = i.querySelectorAll("path"),
            s = i.dataset[`${this.attribute}Stagger`]
              ? Number(i.dataset[`${this.attribute}Stagger`])
              : 0.1,
            a = i.dataset[`${this.attribute}Duration`]
              ? Number(i.dataset[`${this.attribute}Duration`])
              : 0.5,
            u = i.dataset[`${this.attribute}Order`]
              ? Number(i.dataset[`${this.attribute}Order`])
              : 0,
            l = i.dataset.asPosition || "+=0";
          return (
            Array.from(n).forEach((f) => {
              const d = f.getTotalLength();
              (f.style.strokeDasharray = `${d} ${d}`),
                (f.style.strokeDashoffset = t ? "0" : `${d}`);
            }),
            i.classList.remove("hidden"),
            {
              type: "lines",
              el: i,
              paths: Array.from(n),
              duration: a,
              stagger: s,
              order: u,
              position: l,
            }
          );
        });
      this.animations = [
        ...this.animations,
        ...e.sort((i, n) => i.order - n.order),
      ];
    }
  }
  Rs.registerPlugin(G);
  const fo = [];
  function Bf() {
    const o = new Fl({
      duration: 1.2,
      easing: (r) => Math.min(1, 1.001 - Math.pow(2, -10 * r)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: !0,
      mouseMultiplier: 1,
      smoothTouch: !1,
      touchMultiplier: 2,
      infinite: !1,
    });
    function t(r) {
      o.raf(r), requestAnimationFrame(t);
    }
    requestAnimationFrame(t);
  }
  Array.from(document.querySelectorAll("[data-as-section]")).forEach((o) => {
    fo.push(
      new Yf(o, {
        splitClassNames: {
          lineClass: "split-line",
          charClass: "split-character",
        },
      }),
    );
  });
  function Dl() {
    fo.forEach((o) => {
      o.timeline ||
        ((o.timeline = Rs.timeline({
          scrollTrigger: {
            trigger: o.DOM.el,
            start: "top 50%",
            end: "bottom top",
          },
          delay: o.delay,
        })),
        o.animations
          .sort((t, r) => t.order - r.order)
          .forEach((t) => {
            var r, e, i;
            switch (t.type) {
              case "split":
                (r = o.timeline) == null ||
                  r.from(
                    t.el,
                    {
                      duration: t.duration,
                      stagger: t.stagger,
                      ease: "power3.out",
                      y: "1.5em",
                      rotation: 30,
                    },
                    t.position,
                  );
                break;
              case "appear":
                (e = o.timeline) == null ||
                  e.from(
                    t.el,
                    {
                      duration: t.duration,
                      stagger: t.stagger,
                      ease: "power3.out",
                      y: "1.5em",
                      opacity: 0,
                    },
                    t.position,
                  );
                break;
              case "lines":
                (i = o.timeline) == null ||
                  i.to(
                    t.paths,
                    {
                      duration: t.duration,
                      stagger: t.stagger,
                      ease: "power4.out",
                      strokeDashoffset: 0,
                    },
                    t.position,
                  );
                break;
            }
          }));
    });
  }
  Bf(), Dl();
  let Al = window.innerWidth;
  function Xf() {
    Al !== window.innerWidth &&
      ((Al = window.innerWidth),
      fo.forEach((o) => {
        var t, r;
        ((t = o.timeline) == null ? void 0 : t.progress()) !== 1
          ? (o.reSplit(),
            (r = o.timeline) == null || r.progress(1).clear(),
            (o.timeline = null))
          : o.reSplit(!0);
      }),
      Dl());
  }
  window.addEventListener("resize", _f(Xf, 100));
})();
