function t() {}
function e(t, e) {
  for (const n in e) t[n] = e[n];
  return t;
}
function n(t) {
  return t();
}
function r() {
  return Object.create(null);
}
function o(t) {
  t.forEach(n);
}
function s(t) {
  return "function" == typeof t;
}
function a(t, e) {
  return t != t
    ? e == e
    : t !== e || (t && "object" == typeof t) || "function" == typeof t;
}
function c(e, ...n) {
  if (null == e) return t;
  const r = e.subscribe(...n);
  return r.unsubscribe ? () => r.unsubscribe() : r;
}
function i(t, e, n) {
  t.$$.on_destroy.push(c(e, n));
}
function u(t, e, n, r) {
  if (t) {
    const o = l(t, e, n, r);
    return t[0](o);
  }
}
function l(t, n, r, o) {
  return t[1] && o ? e(r.ctx.slice(), t[1](o(n))) : r.ctx;
}
function f(t, e, n, r) {
  if (t[2] && r) {
    const o = t[2](r(n));
    if ("object" == typeof e.dirty) {
      const t = [],
        n = Math.max(e.dirty.length, o.length);
      for (let r = 0; r < n; r += 1) t[r] = e.dirty[r] | o[r];
      return t;
    }
    return e.dirty | o;
  }
  return e.dirty;
}
function p(t, e) {
  t.appendChild(e);
}
function d(t, e, n) {
  t.insertBefore(e, n || null);
}
function h(t) {
  t.parentNode.removeChild(t);
}
function m(t, e) {
  for (let n = 0; n < t.length; n += 1) t[n] && t[n].d(e);
}
function g(t) {
  return document.createElement(t);
}
function $(t) {
  return document.createElementNS("http://www.w3.org/2000/svg", t);
}
function y(t) {
  return document.createTextNode(t);
}
function b() {
  return y(" ");
}
function v() {
  return y("");
}
function w(t, e, n, r) {
  return t.addEventListener(e, n, r), () => t.removeEventListener(e, n, r);
}
function x(t, e, n) {
  null == n
    ? t.removeAttribute(e)
    : t.getAttribute(e) !== n && t.setAttribute(e, n);
}
function S(t) {
  return Array.from(t.childNodes);
}
function _(t, e, n, r) {
  for (let r = 0; r < t.length; r += 1) {
    const o = t[r];
    if (o.nodeName === e) {
      let e = 0;
      for (; e < o.attributes.length; ) {
        const t = o.attributes[e];
        n[t.name] ? e++ : o.removeAttribute(t.name);
      }
      return t.splice(r, 1)[0];
    }
  }
  return r ? $(e) : g(e);
}
function E(t, e) {
  for (let n = 0; n < t.length; n += 1) {
    const r = t[n];
    if (3 === r.nodeType) return (r.data = "" + e), t.splice(n, 1)[0];
  }
  return y(e);
}
function A(t) {
  return E(t, " ");
}
function L(t, e) {
  (e = "" + e), t.data !== e && (t.data = e);
}
function k(t, e, n, r) {
  t.style.setProperty(e, n, r ? "important" : "");
}
function R(t, e) {
  for (let n = 0; n < t.options.length; n += 1) {
    const r = t.options[n];
    if (r.__value === e) return void (r.selected = !0);
  }
}
function C(t) {
  const e = t.querySelector(":checked") || t.options[0];
  return e && e.__value;
}
function P(t, e) {
  "static" === getComputedStyle(t).position && (t.style.position = "relative");
  const n = document.createElement("object");
  let r;
  return (
    n.setAttribute(
      "style",
      "display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; pointer-events: none; z-index: -1;"
    ),
    n.setAttribute("aria-hidden", "true"),
    (n.type = "text/html"),
    (n.tabIndex = -1),
    (n.onload = () => {
      (r = n.contentDocument.defaultView), r.addEventListener("resize", e);
    }),
    /Trident/.test(navigator.userAgent)
      ? (t.appendChild(n), (n.data = "about:blank"))
      : ((n.data = "about:blank"), t.appendChild(n)),
    {
      cancel: () => {
        r && r.removeEventListener && r.removeEventListener("resize", e),
          t.removeChild(n);
      }
    }
  );
}
function q(t, e, n) {
  t.classList[n ? "add" : "remove"](e);
}
let N;
function j(t) {
  N = t;
}
function O() {
  if (!N) throw new Error("Function called outside component initialization");
  return N;
}
function U(t) {
  O().$$.on_mount.push(t);
}
function I(t, e) {
  O().$$.context.set(t, e);
}
function M(t) {
  return O().$$.context.get(t);
}
const T = [],
  z = [],
  B = [],
  D = [],
  J = Promise.resolve();
let K = !1;
function V(t) {
  B.push(t);
}
let H = !1;
const F = new Set();
function G() {
  if (!H) {
    H = !0;
    do {
      for (let t = 0; t < T.length; t += 1) {
        const e = T[t];
        j(e), Q(e.$$);
      }
      for (T.length = 0; z.length; ) z.pop()();
      for (let t = 0; t < B.length; t += 1) {
        const e = B[t];
        F.has(e) || (F.add(e), e());
      }
      B.length = 0;
    } while (T.length);
    for (; D.length; ) D.pop()();
    (K = !1), (H = !1), F.clear();
  }
}
function Q(t) {
  if (null !== t.fragment) {
    t.update(), o(t.before_update);
    const e = t.dirty;
    (t.dirty = [-1]),
      t.fragment && t.fragment.p(t.ctx, e),
      t.after_update.forEach(V);
  }
}
const W = new Set();
let X;
function Y() {
  X = { r: 0, c: [], p: X };
}
function Z() {
  X.r || o(X.c), (X = X.p);
}
function tt(t, e) {
  t && t.i && (W.delete(t), t.i(e));
}
function et(t, e, n, r) {
  if (t && t.o) {
    if (W.has(t)) return;
    W.add(t),
      X.c.push(() => {
        W.delete(t), r && (n && t.d(1), r());
      }),
      t.o(e);
  }
}
function nt(t, e) {
  t.d(1), e.delete(t.key);
}
function rt(t, e) {
  et(t, 1, 1, () => {
    e.delete(t.key);
  });
}
function ot(t, e, n, r, o, s, a, c, i, u, l, f) {
  let p = t.length,
    d = s.length,
    h = p;
  const m = {};
  for (; h--; ) m[t[h].key] = h;
  const g = [],
    $ = new Map(),
    y = new Map();
  for (h = d; h--; ) {
    const t = f(o, s, h),
      c = n(t);
    let i = a.get(c);
    i ? r && i.p(t, e) : ((i = u(c, t)), i.c()),
      $.set(c, (g[h] = i)),
      c in m && y.set(c, Math.abs(h - m[c]));
  }
  const b = new Set(),
    v = new Set();
  function w(t) {
    tt(t, 1), t.m(c, l), a.set(t.key, t), (l = t.first), d--;
  }
  for (; p && d; ) {
    const e = g[d - 1],
      n = t[p - 1],
      r = e.key,
      o = n.key;
    e === n
      ? ((l = e.first), p--, d--)
      : $.has(o)
      ? !a.has(r) || b.has(r)
        ? w(e)
        : v.has(o)
        ? p--
        : y.get(r) > y.get(o)
        ? (v.add(r), w(e))
        : (b.add(o), p--)
      : (i(n, a), p--);
  }
  for (; p--; ) {
    const e = t[p];
    $.has(e.key) || i(e, a);
  }
  for (; d; ) w(g[d - 1]);
  return g;
}
function st(t, e) {
  const n = {},
    r = {},
    o = { $$scope: 1 };
  let s = t.length;
  for (; s--; ) {
    const a = t[s],
      c = e[s];
    if (c) {
      for (const t in a) t in c || (r[t] = 1);
      for (const t in c) o[t] || ((n[t] = c[t]), (o[t] = 1));
      t[s] = c;
    } else for (const t in a) o[t] = 1;
  }
  for (const t in r) t in n || (n[t] = void 0);
  return n;
}
function at(t) {
  return "object" == typeof t && null !== t ? t : {};
}
function ct(t) {
  t && t.c();
}
function it(t, e) {
  t && t.l(e);
}
function ut(t, e, r) {
  const { fragment: a, on_mount: c, on_destroy: i, after_update: u } = t.$$;
  a && a.m(e, r),
    V(() => {
      const e = c.map(n).filter(s);
      i ? i.push(...e) : o(e), (t.$$.on_mount = []);
    }),
    u.forEach(V);
}
function lt(t, e) {
  const n = t.$$;
  null !== n.fragment &&
    (o(n.on_destroy),
    n.fragment && n.fragment.d(e),
    (n.on_destroy = n.fragment = null),
    (n.ctx = []));
}
function ft(t, e) {
  -1 === t.$$.dirty[0] &&
    (T.push(t), K || ((K = !0), J.then(G)), t.$$.dirty.fill(0)),
    (t.$$.dirty[(e / 31) | 0] |= 1 << e % 31);
}
function pt(e, n, s, a, c, i, u = [-1]) {
  const l = N;
  j(e);
  const f = n.props || {},
    p = (e.$$ = {
      fragment: null,
      ctx: null,
      props: i,
      update: t,
      not_equal: c,
      bound: r(),
      on_mount: [],
      on_destroy: [],
      before_update: [],
      after_update: [],
      context: new Map(l ? l.$$.context : []),
      callbacks: r(),
      dirty: u
    });
  let d = !1;
  (p.ctx = s
    ? s(e, f, (t, n, ...r) => {
        const o = r.length ? r[0] : n;
        return (
          p.ctx &&
            c(p.ctx[t], (p.ctx[t] = o)) &&
            (p.bound[t] && p.bound[t](o), d && ft(e, t)),
          n
        );
      })
    : []),
    p.update(),
    (d = !0),
    o(p.before_update),
    (p.fragment = !!a && a(p.ctx)),
    n.target &&
      (n.hydrate
        ? p.fragment && p.fragment.l(S(n.target))
        : p.fragment && p.fragment.c(),
      n.intro && tt(e.$$.fragment),
      ut(e, n.target, n.anchor),
      G()),
    j(l);
}
class dt {
  $destroy() {
    lt(this, 1), (this.$destroy = t);
  }
  $on(t, e) {
    const n = this.$$.callbacks[t] || (this.$$.callbacks[t] = []);
    return (
      n.push(e),
      () => {
        const t = n.indexOf(e);
        -1 !== t && n.splice(t, 1);
      }
    );
  }
  $set() {}
}
const ht = [];
function mt(e, n = t) {
  let r;
  const o = [];
  function s(t) {
    if (a(e, t) && ((e = t), r)) {
      const t = !ht.length;
      for (let t = 0; t < o.length; t += 1) {
        const n = o[t];
        n[1](), ht.push(n, e);
      }
      if (t) {
        for (let t = 0; t < ht.length; t += 2) ht[t][0](ht[t + 1]);
        ht.length = 0;
      }
    }
  }
  return {
    set: s,
    update: function(t) {
      s(t(e));
    },
    subscribe: function(a, c = t) {
      const i = [a, c];
      return (
        o.push(i),
        1 === o.length && (r = n(s) || t),
        a(e),
        () => {
          const t = o.indexOf(i);
          -1 !== t && o.splice(t, 1), 0 === o.length && (r(), (r = null));
        }
      );
    }
  };
}
function gt(e, n, r) {
  const a = !Array.isArray(e),
    i = a ? [e] : e,
    u = n.length < 2;
  return (function(t, e) {
    return { subscribe: mt(t, e).subscribe };
  })(r, e => {
    let r = !1;
    const l = [];
    let f = 0,
      p = t;
    const d = () => {
        if (f) return;
        p();
        const r = n(a ? l[0] : l, e);
        u ? e(r) : (p = s(r) ? r : t);
      },
      h = i.map((t, e) =>
        c(
          t,
          t => {
            (l[e] = t), (f &= ~(1 << e)), r && d();
          },
          () => {
            f |= 1 << e;
          }
        )
      );
    return (
      (r = !0),
      d(),
      function() {
        o(h), p();
      }
    );
  });
}
const $t = {},
  yt = () => ({});
function bt(t) {
  let e;
  const n = t[1].default,
    r = u(n, t, t[0], null);
  return {
    c() {
      r && r.c();
    },
    l(t) {
      r && r.l(t);
    },
    m(t, n) {
      r && r.m(t, n), (e = !0);
    },
    p(t, [e]) {
      r && r.p && 1 & e && r.p(l(n, t, t[0], null), f(n, t[0], e, null));
    },
    i(t) {
      e || (tt(r, t), (e = !0));
    },
    o(t) {
      et(r, t), (e = !1);
    },
    d(t) {
      r && r.d(t);
    }
  };
}
function vt(t, e, n) {
  let { $$slots: r = {}, $$scope: o } = e;
  return (
    (t.$set = t => {
      "$$scope" in t && n(0, (o = t.$$scope));
    }),
    [o, r]
  );
}
class wt extends dt {
  constructor(t) {
    super(), pt(this, t, vt, bt, a, {});
  }
}
function xt(e) {
  let n,
    r,
    o,
    s,
    a,
    c,
    i,
    u = e[0].message + "";
  return {
    c() {
      (n = g("h1")),
        (r = y(e[1])),
        (o = b()),
        (s = g("p")),
        (a = y(u)),
        (c = b()),
        (i = v());
    },
    l(t) {
      n = _(t, "H1", {});
      var l = S(n);
      (r = E(l, e[1])), l.forEach(h), (o = A(t)), (s = _(t, "P", {}));
      var f = S(s);
      (a = E(f, u)), f.forEach(h), (c = A(t)), (i = v());
    },
    m(t, e) {
      d(t, n, e),
        p(n, r),
        d(t, o, e),
        d(t, s, e),
        p(s, a),
        d(t, c, e),
        d(t, i, e);
    },
    p(t, [e]) {
      2 & e && L(r, t[1]), 1 & e && u !== (u = t[0].message + "") && L(a, u);
    },
    i: t,
    o: t,
    d(t) {
      t && h(n), t && h(o), t && h(s), t && h(c), t && h(i);
    }
  };
}
function St(t, e, n) {
  let { error: r } = e,
    { status: o } = e;
  return (
    (t.$set = t => {
      "error" in t && n(0, (r = t.error)),
        "status" in t && n(1, (o = t.status));
    }),
    [r, o]
  );
}
class _t extends dt {
  constructor(t) {
    super(), pt(this, t, St, xt, a, { error: 0, status: 1 });
  }
}
function Et(t) {
  let n, r;
  const o = [t[4].props];
  var s = t[4].component;
  function a(t) {
    let n = {};
    for (let t = 0; t < o.length; t += 1) n = e(n, o[t]);
    return { props: n };
  }
  if (s) var c = new s(a());
  return {
    c() {
      c && ct(c.$$.fragment), (n = v());
    },
    l(t) {
      c && it(c.$$.fragment, t), (n = v());
    },
    m(t, e) {
      c && ut(c, t, e), d(t, n, e), (r = !0);
    },
    p(t, e) {
      const r = 16 & e ? st(o, [at(t[4].props)]) : {};
      if (s !== (s = t[4].component)) {
        if (c) {
          Y();
          const t = c;
          et(t.$$.fragment, 1, 0, () => {
            lt(t, 1);
          }),
            Z();
        }
        s
          ? (ct((c = new s(a())).$$.fragment),
            tt(c.$$.fragment, 1),
            ut(c, n.parentNode, n))
          : (c = null);
      } else s && c.$set(r);
    },
    i(t) {
      r || (c && tt(c.$$.fragment, t), (r = !0));
    },
    o(t) {
      c && et(c.$$.fragment, t), (r = !1);
    },
    d(t) {
      t && h(n), c && lt(c, t);
    }
  };
}
function At(t) {
  let e;
  const n = new _t({ props: { error: t[0], status: t[1] } });
  return {
    c() {
      ct(n.$$.fragment);
    },
    l(t) {
      it(n.$$.fragment, t);
    },
    m(t, r) {
      ut(n, t, r), (e = !0);
    },
    p(t, e) {
      const r = {};
      1 & e && (r.error = t[0]), 2 & e && (r.status = t[1]), n.$set(r);
    },
    i(t) {
      e || (tt(n.$$.fragment, t), (e = !0));
    },
    o(t) {
      et(n.$$.fragment, t), (e = !1);
    },
    d(t) {
      lt(n, t);
    }
  };
}
function Lt(t) {
  let e, n, r, o;
  const s = [At, Et],
    a = [];
  function c(t, e) {
    return t[0] ? 0 : 1;
  }
  return (
    (e = c(t)),
    (n = a[e] = s[e](t)),
    {
      c() {
        n.c(), (r = v());
      },
      l(t) {
        n.l(t), (r = v());
      },
      m(t, n) {
        a[e].m(t, n), d(t, r, n), (o = !0);
      },
      p(t, o) {
        let i = e;
        (e = c(t)),
          e === i
            ? a[e].p(t, o)
            : (Y(),
              et(a[i], 1, 1, () => {
                a[i] = null;
              }),
              Z(),
              (n = a[e]),
              n || ((n = a[e] = s[e](t)), n.c()),
              tt(n, 1),
              n.m(r.parentNode, r));
      },
      i(t) {
        o || (tt(n), (o = !0));
      },
      o(t) {
        et(n), (o = !1);
      },
      d(t) {
        a[e].d(t), t && h(r);
      }
    }
  );
}
function kt(t) {
  let n;
  const r = [{ segment: t[2][0] }, t[3].props];
  let o = { $$slots: { default: [Lt] }, $$scope: { ctx: t } };
  for (let t = 0; t < r.length; t += 1) o = e(o, r[t]);
  const s = new wt({ props: o });
  return {
    c() {
      ct(s.$$.fragment);
    },
    l(t) {
      it(s.$$.fragment, t);
    },
    m(t, e) {
      ut(s, t, e), (n = !0);
    },
    p(t, [e]) {
      const n =
        12 & e
          ? st(r, [4 & e && { segment: t[2][0] }, 8 & e && at(t[3].props)])
          : {};
      83 & e && (n.$$scope = { dirty: e, ctx: t }), s.$set(n);
    },
    i(t) {
      n || (tt(s.$$.fragment, t), (n = !0));
    },
    o(t) {
      et(s.$$.fragment, t), (n = !1);
    },
    d(t) {
      lt(s, t);
    }
  };
}
function Rt(t, e, n) {
  let { stores: r } = e,
    { error: o } = e,
    { status: s } = e,
    { segments: a } = e,
    { level0: c } = e,
    { level1: i = null } = e;
  return (
    I($t, r),
    (t.$set = t => {
      "stores" in t && n(5, (r = t.stores)),
        "error" in t && n(0, (o = t.error)),
        "status" in t && n(1, (s = t.status)),
        "segments" in t && n(2, (a = t.segments)),
        "level0" in t && n(3, (c = t.level0)),
        "level1" in t && n(4, (i = t.level1));
    }),
    [o, s, a, c, i, r]
  );
}
class Ct extends dt {
  constructor(t) {
    super(),
      pt(this, t, Rt, kt, a, {
        stores: 5,
        error: 0,
        status: 1,
        segments: 2,
        level0: 3,
        level1: 4
      });
  }
}
const Pt = [],
  qt = [{ js: () => import("index.045f8af2.js"), css: ["index.045f8af2.css"] }],
  Nt = [{ pattern: /^\/$/, parts: [{ i: 0 }] }];
const jt = "undefined" != typeof __SAPPER__ && __SAPPER__;
let Ot,
  Ut,
  It,
  Mt = !1,
  Tt = [],
  zt = "{}";
const Bt = {
  page: mt({}),
  preloading: mt(null),
  session: mt(jt && jt.session)
};
let Dt, Jt;
Bt.session.subscribe(async t => {
  if (((Dt = t), !Mt)) return;
  Jt = !0;
  const e = Xt(new URL(location.href)),
    n = (Ut = {}),
    { redirect: r, props: o, branch: s } = await ee(e);
  n === Ut && (await te(r, s, o, e.page));
});
let Kt,
  Vt = null;
let Ht,
  Ft = 1;
const Gt =
    "undefined" != typeof history
      ? history
      : {
          pushState: (t, e, n) => {},
          replaceState: (t, e, n) => {},
          scrollRestoration: ""
        },
  Qt = {};
function Wt(t) {
  const e = Object.create(null);
  return (
    t.length > 0 &&
      t
        .slice(1)
        .split("&")
        .forEach(t => {
          let [, n, r = ""] = /([^=]*)(?:=(.*))?/.exec(
            decodeURIComponent(t.replace(/\+/g, " "))
          );
          "string" == typeof e[n] && (e[n] = [e[n]]),
            "object" == typeof e[n] ? e[n].push(r) : (e[n] = r);
        }),
    e
  );
}
function Xt(t) {
  if (t.origin !== location.origin) return null;
  if (!t.pathname.startsWith(jt.baseUrl)) return null;
  let e = t.pathname.slice(jt.baseUrl.length);
  if (("" === e && (e = "/"), !Pt.some(t => t.test(e))))
    for (let n = 0; n < Nt.length; n += 1) {
      const r = Nt[n],
        o = r.pattern.exec(e);
      if (o) {
        const n = Wt(t.search),
          s = r.parts[r.parts.length - 1],
          a = s.params ? s.params(o) : {},
          c = { host: location.host, path: e, query: n, params: a };
        return { href: t.href, route: r, match: o, page: c };
      }
    }
}
function Yt() {
  return { x: pageXOffset, y: pageYOffset };
}
async function Zt(t, e, n, r) {
  if (e) Ht = e;
  else {
    const t = Yt();
    (Qt[Ht] = t), (e = Ht = ++Ft), (Qt[Ht] = n ? t : { x: 0, y: 0 });
  }
  (Ht = e), Ot && Bt.preloading.set(!0);
  const o = Vt && Vt.href === t.href ? Vt.promise : ee(t);
  Vt = null;
  const s = (Ut = {}),
    { redirect: a, props: c, branch: i } = await o;
  if (
    s === Ut &&
    (await te(a, i, c, t.page),
    document.activeElement && document.activeElement.blur(),
    !n)
  ) {
    let t = Qt[e];
    if (r) {
      const e = document.getElementById(r.slice(1));
      e && (t = { x: 0, y: e.getBoundingClientRect().top });
    }
    (Qt[Ht] = t), t && scrollTo(t.x, t.y);
  }
}
async function te(t, e, n, r) {
  if (t)
    return (function(t, e = { replaceState: !1 }) {
      const n = Xt(new URL(t, document.baseURI));
      return n
        ? (Gt[e.replaceState ? "replaceState" : "pushState"]({ id: Ht }, "", t),
          Zt(n, null).then(() => {}))
        : ((location.href = t), new Promise(t => {}));
    })(t.location, { replaceState: !0 });
  if ((Bt.page.set(r), Bt.preloading.set(!1), Ot)) Ot.$set(n);
  else {
    (n.stores = {
      page: { subscribe: Bt.page.subscribe },
      preloading: { subscribe: Bt.preloading.subscribe },
      session: Bt.session
    }),
      (n.level0 = { props: await It });
    const t = document.querySelector("#sapper-head-start"),
      e = document.querySelector("#sapper-head-end");
    if (t && e) {
      for (; t.nextSibling !== e; ) re(t.nextSibling);
      re(t), re(e);
    }
    Ot = new Ct({ target: Kt, props: n, hydrate: !0 });
  }
  (Tt = e), (zt = JSON.stringify(r.query)), (Mt = !0), (Jt = !1);
}
async function ee(t) {
  const { route: e, page: n } = t,
    r = n.path.split("/").filter(Boolean);
  let o = null;
  const s = { error: null, status: 200, segments: [r[0]] },
    a = {
      fetch: (t, e) => fetch(t, e),
      redirect: (t, e) => {
        if (o && (o.statusCode !== t || o.location !== e))
          throw new Error("Conflicting redirects");
        o = { statusCode: t, location: e };
      },
      error: (t, e) => {
        (s.error = "string" == typeof e ? new Error(e) : e), (s.status = t);
      }
    };
  let c;
  It ||
    (It =
      jt.preloaded[0] ||
      yt.call(
        a,
        { host: n.host, path: n.path, query: n.query, params: {} },
        Dt
      ));
  let i = 1;
  try {
    const o = JSON.stringify(n.query),
      u = e.pattern.exec(n.path);
    let l = !1;
    c = await Promise.all(
      e.parts.map(async (e, c) => {
        const f = r[c];
        if (
          ((function(t, e, n, r) {
            if (r !== zt) return !0;
            const o = Tt[t];
            return (
              !!o &&
              (e !== o.segment ||
                !(
                  !o.match ||
                  JSON.stringify(o.match.slice(1, t + 2)) ===
                    JSON.stringify(n.slice(1, t + 2))
                ) ||
                  void 0)
            );
          })(c, f, u, o) && (l = !0),
          (s.segments[i] = r[c + 1]),
          !e)
        )
          return { segment: f };
        const p = i++;
        if (!Jt && !l && Tt[c] && Tt[c].part === e.i) return Tt[c];
        l = !1;
        const { default: d, preload: h } = await (function(t) {
          const e = "string" == typeof t.css ? [] : t.css.map(ne);
          return e.unshift(t.js()), Promise.all(e).then(t => t[0]);
        })(qt[e.i]);
        let m;
        return (
          (m =
            Mt || !jt.preloaded[c + 1]
              ? h
                ? await h.call(
                    a,
                    {
                      host: n.host,
                      path: n.path,
                      query: n.query,
                      params: e.params ? e.params(t.match) : {}
                    },
                    Dt
                  )
                : {}
              : jt.preloaded[c + 1]),
          (s[`level${p}`] = {
            component: d,
            props: m,
            segment: f,
            match: u,
            part: e.i
          })
        );
      })
    );
  } catch (t) {
    (s.error = t), (s.status = 500), (c = []);
  }
  return { redirect: o, props: s, branch: c };
}
function ne(t) {
  const e = `client/${t}`;
  if (!document.querySelector(`link[href="${e}"]`))
    return new Promise((t, n) => {
      const r = document.createElement("link");
      (r.rel = "stylesheet"),
        (r.href = e),
        (r.onload = () => t()),
        (r.onerror = n),
        document.head.appendChild(r);
    });
}
function re(t) {
  t.parentNode.removeChild(t);
}
function oe(t) {
  const e = Xt(new URL(t, document.baseURI));
  if (e)
    return (
      (Vt && t === Vt.href) ||
        (function(t, e) {
          Vt = { href: t, promise: e };
        })(t, ee(e)),
      Vt.promise
    );
}
let se;
function ae(t) {
  clearTimeout(se),
    (se = setTimeout(() => {
      ce(t);
    }, 20));
}
function ce(t) {
  const e = ue(t.target);
  e && "prefetch" === e.rel && oe(e.href);
}
function ie(t) {
  if (
    1 !==
    (function(t) {
      return null === t.which ? t.button : t.which;
    })(t)
  )
    return;
  if (t.metaKey || t.ctrlKey || t.shiftKey) return;
  if (t.defaultPrevented) return;
  const e = ue(t.target);
  if (!e) return;
  if (!e.href) return;
  const n =
      "object" == typeof e.href &&
      "SVGAnimatedString" === e.href.constructor.name,
    r = String(n ? e.href.baseVal : e.href);
  if (r === location.href) return void (location.hash || t.preventDefault());
  if (e.hasAttribute("download") || "external" === e.getAttribute("rel"))
    return;
  if (n ? e.target.baseVal : e.target) return;
  const o = new URL(r);
  if (o.pathname === location.pathname && o.search === location.search) return;
  const s = Xt(o);
  if (s) {
    Zt(s, null, e.hasAttribute("sapper-noscroll"), o.hash),
      t.preventDefault(),
      Gt.pushState({ id: Ht }, "", o.href);
  }
}
function ue(t) {
  for (; t && "A" !== t.nodeName.toUpperCase(); ) t = t.parentNode;
  return t;
}
function le(t) {
  if (((Qt[Ht] = Yt()), t.state)) {
    const e = Xt(new URL(location.href));
    e ? Zt(e, t.state.id) : (location.href = location.href);
  } else
    (Ft = Ft + 1),
      (function(t) {
        Ht = t;
      })(Ft),
      Gt.replaceState({ id: Ht }, "", location.href);
}
var fe;
(fe = { target: document.querySelector("main") }),
  "scrollRestoration" in Gt && (Gt.scrollRestoration = "manual"),
  (function(t) {
    Kt = t;
  })(fe.target),
  addEventListener("click", ie),
  addEventListener("popstate", le),
  addEventListener("touchstart", ce),
  addEventListener("mousemove", ae),
  Promise.resolve().then(() => {
    const { hash: t, href: e } = location;
    Gt.replaceState({ id: Ft }, "", e);
    const n = new URL(location.href);
    if (jt.error)
      return (function(t) {
        const { host: e, pathname: n, search: r } = location,
          { session: o, preloaded: s, status: a, error: c } = jt;
        It || (It = s && s[0]),
          te(
            null,
            [],
            {
              error: c,
              status: a,
              session: o,
              level0: { props: It },
              level1: { props: { status: a, error: c }, component: _t },
              segments: s
            },
            { host: e, path: n, query: Wt(r), params: {} }
          );
      })();
    const r = Xt(n);
    return r ? Zt(r, Ft, !0, t) : void 0;
  });
export {
  E as A,
  L as B,
  m as C,
  b as D,
  A as E,
  k as F,
  q as G,
  ct as H,
  it as I,
  ut as J,
  lt as K,
  Y as L,
  Z as M,
  R as N,
  w as O,
  U as P,
  rt as Q,
  C as R,
  dt as S,
  _ as a,
  S as b,
  u as c,
  h as d,
  g as e,
  x as f,
  V as g,
  d as h,
  pt as i,
  P as j,
  l as k,
  f as l,
  et as m,
  gt as n,
  I as o,
  $ as p,
  p as q,
  M as r,
  a as s,
  tt as t,
  i as u,
  ot as v,
  mt as w,
  nt as x,
  t as y,
  y as z
};
