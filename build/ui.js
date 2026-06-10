(() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a3, b2) => {
    for (var prop in b2 || (b2 = {}))
      if (__hasOwnProp.call(b2, prop))
        __defNormalProp(a3, prop, b2[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b2)) {
        if (__propIsEnum.call(b2, prop))
          __defNormalProp(a3, prop, b2[prop]);
      }
    return a3;
  };
  var __spreadProps = (a3, b2) => __defProps(a3, __getOwnPropDescs(b2));
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // node_modules/preact/dist/preact.module.js
  function m(n2, l3) {
    for (var u3 in l3) n2[u3] = l3[u3];
    return n2;
  }
  function b(n2) {
    n2 && n2.parentNode && n2.parentNode.removeChild(n2);
  }
  function k(l3, u3, t3) {
    var i3, r3, o3, e3 = {};
    for (o3 in u3) "key" == o3 ? i3 = u3[o3] : "ref" == o3 ? r3 = u3[o3] : e3[o3] = u3[o3];
    if (arguments.length > 2 && (e3.children = arguments.length > 3 ? n.call(arguments, 2) : t3), "function" == typeof l3 && null != l3.defaultProps) for (o3 in l3.defaultProps) void 0 === e3[o3] && (e3[o3] = l3.defaultProps[o3]);
    return x(l3, e3, i3, r3, null);
  }
  function x(n2, t3, i3, r3, o3) {
    var e3 = { type: n2, props: t3, key: i3, ref: r3, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: null == o3 ? ++u : o3, __i: -1, __u: 0 };
    return null == o3 && null != l.vnode && l.vnode(e3), e3;
  }
  function S(n2) {
    return n2.children;
  }
  function C(n2, l3) {
    this.props = n2, this.context = l3;
  }
  function $(n2, l3) {
    if (null == l3) return n2.__ ? $(n2.__, n2.__i + 1) : null;
    for (var u3; l3 < n2.__k.length; l3++) if (null != (u3 = n2.__k[l3]) && null != u3.__e) return u3.__e;
    return "function" == typeof n2.type ? $(n2) : null;
  }
  function I(n2) {
    if (n2.__P && n2.__d) {
      var u3 = n2.__v, t3 = u3.__e, i3 = [], r3 = [], o3 = m({}, u3);
      o3.__v = u3.__v + 1, l.vnode && l.vnode(o3), q(n2.__P, o3, u3, n2.__n, n2.__P.namespaceURI, 32 & u3.__u ? [t3] : null, i3, null == t3 ? $(u3) : t3, !!(32 & u3.__u), r3), o3.__v = u3.__v, o3.__.__k[o3.__i] = o3, D(i3, o3, r3), u3.__e = u3.__ = null, o3.__e != t3 && P(o3);
    }
  }
  function P(n2) {
    if (null != (n2 = n2.__) && null != n2.__c) return n2.__e = n2.__c.base = null, n2.__k.some(function(l3) {
      if (null != l3 && null != l3.__e) return n2.__e = n2.__c.base = l3.__e;
    }), P(n2);
  }
  function A(n2) {
    (!n2.__d && (n2.__d = true) && i.push(n2) && !H.__r++ || r != l.debounceRendering) && ((r = l.debounceRendering) || o)(H);
  }
  function H() {
    try {
      for (var n2, l3 = 1; i.length; ) i.length > l3 && i.sort(e), n2 = i.shift(), l3 = i.length, I(n2);
    } finally {
      i.length = H.__r = 0;
    }
  }
  function L(n2, l3, u3, t3, i3, r3, o3, e3, f3, c3, a3) {
    var s3, h3, p3, v3, y3, _2, g2, m3 = t3 && t3.__k || w, b2 = l3.length;
    for (f3 = T(u3, l3, m3, f3, b2), s3 = 0; s3 < b2; s3++) null != (p3 = u3.__k[s3]) && (h3 = -1 != p3.__i && m3[p3.__i] || d, p3.__i = s3, _2 = q(n2, p3, h3, i3, r3, o3, e3, f3, c3, a3), v3 = p3.__e, p3.ref && h3.ref != p3.ref && (h3.ref && J(h3.ref, null, p3), a3.push(p3.ref, p3.__c || v3, p3)), null == y3 && null != v3 && (y3 = v3), (g2 = !!(4 & p3.__u)) || h3.__k === p3.__k ? (f3 = j(p3, f3, n2, g2), g2 && h3.__e && (h3.__e = null)) : "function" == typeof p3.type && void 0 !== _2 ? f3 = _2 : v3 && (f3 = v3.nextSibling), p3.__u &= -7);
    return u3.__e = y3, f3;
  }
  function T(n2, l3, u3, t3, i3) {
    var r3, o3, e3, f3, c3, a3 = u3.length, s3 = a3, h3 = 0;
    for (n2.__k = new Array(i3), r3 = 0; r3 < i3; r3++) null != (o3 = l3[r3]) && "boolean" != typeof o3 && "function" != typeof o3 ? ("string" == typeof o3 || "number" == typeof o3 || "bigint" == typeof o3 || o3.constructor == String ? o3 = n2.__k[r3] = x(null, o3, null, null, null) : g(o3) ? o3 = n2.__k[r3] = x(S, { children: o3 }, null, null, null) : void 0 === o3.constructor && o3.__b > 0 ? o3 = n2.__k[r3] = x(o3.type, o3.props, o3.key, o3.ref ? o3.ref : null, o3.__v) : n2.__k[r3] = o3, f3 = r3 + h3, o3.__ = n2, o3.__b = n2.__b + 1, e3 = null, -1 != (c3 = o3.__i = O(o3, u3, f3, s3)) && (s3--, (e3 = u3[c3]) && (e3.__u |= 2)), null == e3 || null == e3.__v ? (-1 == c3 && (i3 > a3 ? h3-- : i3 < a3 && h3++), "function" != typeof o3.type && (o3.__u |= 4)) : c3 != f3 && (c3 == f3 - 1 ? h3-- : c3 == f3 + 1 ? h3++ : (c3 > f3 ? h3-- : h3++, o3.__u |= 4))) : n2.__k[r3] = null;
    if (s3) for (r3 = 0; r3 < a3; r3++) null != (e3 = u3[r3]) && 0 == (2 & e3.__u) && (e3.__e == t3 && (t3 = $(e3)), K(e3, e3));
    return t3;
  }
  function j(n2, l3, u3, t3) {
    var i3, r3;
    if ("function" == typeof n2.type) {
      for (i3 = n2.__k, r3 = 0; i3 && r3 < i3.length; r3++) i3[r3] && (i3[r3].__ = n2, l3 = j(i3[r3], l3, u3, t3));
      return l3;
    }
    n2.__e != l3 && (t3 && (l3 && n2.type && !l3.parentNode && (l3 = $(n2)), u3.insertBefore(n2.__e, l3 || null)), l3 = n2.__e);
    do {
      l3 = l3 && l3.nextSibling;
    } while (null != l3 && 8 == l3.nodeType);
    return l3;
  }
  function O(n2, l3, u3, t3) {
    var i3, r3, o3, e3 = n2.key, f3 = n2.type, c3 = l3[u3], a3 = null != c3 && 0 == (2 & c3.__u);
    if (null === c3 && null == e3 || a3 && e3 == c3.key && f3 == c3.type) return u3;
    if (t3 > (a3 ? 1 : 0)) {
      for (i3 = u3 - 1, r3 = u3 + 1; i3 >= 0 || r3 < l3.length; ) if (null != (c3 = l3[o3 = i3 >= 0 ? i3-- : r3++]) && 0 == (2 & c3.__u) && e3 == c3.key && f3 == c3.type) return o3;
    }
    return -1;
  }
  function z(n2, l3, u3) {
    "-" == l3[0] ? n2.setProperty(l3, null == u3 ? "" : u3) : n2[l3] = null == u3 ? "" : "number" != typeof u3 || _.test(l3) ? u3 : u3 + "px";
  }
  function N(n2, l3, u3, t3, i3) {
    var r3, o3;
    n: if ("style" == l3) if ("string" == typeof u3) n2.style.cssText = u3;
    else {
      if ("string" == typeof t3 && (n2.style.cssText = t3 = ""), t3) for (l3 in t3) u3 && l3 in u3 || z(n2.style, l3, "");
      if (u3) for (l3 in u3) t3 && u3[l3] == t3[l3] || z(n2.style, l3, u3[l3]);
    }
    else if ("o" == l3[0] && "n" == l3[1]) r3 = l3 != (l3 = l3.replace(s, "$1")), o3 = l3.toLowerCase(), l3 = o3 in n2 || "onFocusOut" == l3 || "onFocusIn" == l3 ? o3.slice(2) : l3.slice(2), n2.l || (n2.l = {}), n2.l[l3 + r3] = u3, u3 ? t3 ? u3[a] = t3[a] : (u3[a] = h, n2.addEventListener(l3, r3 ? v : p, r3)) : n2.removeEventListener(l3, r3 ? v : p, r3);
    else {
      if ("http://www.w3.org/2000/svg" == i3) l3 = l3.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
      else if ("width" != l3 && "height" != l3 && "href" != l3 && "list" != l3 && "form" != l3 && "tabIndex" != l3 && "download" != l3 && "rowSpan" != l3 && "colSpan" != l3 && "role" != l3 && "popover" != l3 && l3 in n2) try {
        n2[l3] = null == u3 ? "" : u3;
        break n;
      } catch (n3) {
      }
      "function" == typeof u3 || (null == u3 || false === u3 && "-" != l3[4] ? n2.removeAttribute(l3) : n2.setAttribute(l3, "popover" == l3 && 1 == u3 ? "" : u3));
    }
  }
  function V(n2) {
    return function(u3) {
      if (this.l) {
        var t3 = this.l[u3.type + n2];
        if (null == u3[c]) u3[c] = h++;
        else if (u3[c] < t3[a]) return;
        return t3(l.event ? l.event(u3) : u3);
      }
    };
  }
  function q(n2, u3, t3, i3, r3, o3, e3, f3, c3, a3) {
    var s3, h3, p3, v3, y3, d3, _2, k3, x2, M, $2, I2, P2, A3, H2, T3 = u3.type;
    if (void 0 !== u3.constructor) return null;
    128 & t3.__u && (c3 = !!(32 & t3.__u), o3 = [f3 = u3.__e = t3.__e]), (s3 = l.__b) && s3(u3);
    n: if ("function" == typeof T3) try {
      if (k3 = u3.props, x2 = T3.prototype && T3.prototype.render, M = (s3 = T3.contextType) && i3[s3.__c], $2 = s3 ? M ? M.props.value : s3.__ : i3, t3.__c ? _2 = (h3 = u3.__c = t3.__c).__ = h3.__E : (x2 ? u3.__c = h3 = new T3(k3, $2) : (u3.__c = h3 = new C(k3, $2), h3.constructor = T3, h3.render = Q), M && M.sub(h3), h3.state || (h3.state = {}), h3.__n = i3, p3 = h3.__d = true, h3.__h = [], h3._sb = []), x2 && null == h3.__s && (h3.__s = h3.state), x2 && null != T3.getDerivedStateFromProps && (h3.__s == h3.state && (h3.__s = m({}, h3.__s)), m(h3.__s, T3.getDerivedStateFromProps(k3, h3.__s))), v3 = h3.props, y3 = h3.state, h3.__v = u3, p3) x2 && null == T3.getDerivedStateFromProps && null != h3.componentWillMount && h3.componentWillMount(), x2 && null != h3.componentDidMount && h3.__h.push(h3.componentDidMount);
      else {
        if (x2 && null == T3.getDerivedStateFromProps && k3 !== v3 && null != h3.componentWillReceiveProps && h3.componentWillReceiveProps(k3, $2), u3.__v == t3.__v || !h3.__e && null != h3.shouldComponentUpdate && false === h3.shouldComponentUpdate(k3, h3.__s, $2)) {
          u3.__v != t3.__v && (h3.props = k3, h3.state = h3.__s, h3.__d = false), u3.__e = t3.__e, u3.__k = t3.__k, u3.__k.some(function(n3) {
            n3 && (n3.__ = u3);
          }), w.push.apply(h3.__h, h3._sb), h3._sb = [], h3.__h.length && e3.push(h3);
          break n;
        }
        null != h3.componentWillUpdate && h3.componentWillUpdate(k3, h3.__s, $2), x2 && null != h3.componentDidUpdate && h3.__h.push(function() {
          h3.componentDidUpdate(v3, y3, d3);
        });
      }
      if (h3.context = $2, h3.props = k3, h3.__P = n2, h3.__e = false, I2 = l.__r, P2 = 0, x2) h3.state = h3.__s, h3.__d = false, I2 && I2(u3), s3 = h3.render(h3.props, h3.state, h3.context), w.push.apply(h3.__h, h3._sb), h3._sb = [];
      else do {
        h3.__d = false, I2 && I2(u3), s3 = h3.render(h3.props, h3.state, h3.context), h3.state = h3.__s;
      } while (h3.__d && ++P2 < 25);
      h3.state = h3.__s, null != h3.getChildContext && (i3 = m(m({}, i3), h3.getChildContext())), x2 && !p3 && null != h3.getSnapshotBeforeUpdate && (d3 = h3.getSnapshotBeforeUpdate(v3, y3)), A3 = null != s3 && s3.type === S && null == s3.key ? E(s3.props.children) : s3, f3 = L(n2, g(A3) ? A3 : [A3], u3, t3, i3, r3, o3, e3, f3, c3, a3), h3.base = u3.__e, u3.__u &= -161, h3.__h.length && e3.push(h3), _2 && (h3.__E = h3.__ = null);
    } catch (n3) {
      if (u3.__v = null, c3 || null != o3) if (n3.then) {
        for (u3.__u |= c3 ? 160 : 128; f3 && 8 == f3.nodeType && f3.nextSibling; ) f3 = f3.nextSibling;
        o3[o3.indexOf(f3)] = null, u3.__e = f3;
      } else {
        for (H2 = o3.length; H2--; ) b(o3[H2]);
        B(u3);
      }
      else u3.__e = t3.__e, u3.__k = t3.__k, n3.then || B(u3);
      l.__e(n3, u3, t3);
    }
    else null == o3 && u3.__v == t3.__v ? (u3.__k = t3.__k, u3.__e = t3.__e) : f3 = u3.__e = G(t3.__e, u3, t3, i3, r3, o3, e3, c3, a3);
    return (s3 = l.diffed) && s3(u3), 128 & u3.__u ? void 0 : f3;
  }
  function B(n2) {
    n2 && (n2.__c && (n2.__c.__e = true), n2.__k && n2.__k.some(B));
  }
  function D(n2, u3, t3) {
    for (var i3 = 0; i3 < t3.length; i3++) J(t3[i3], t3[++i3], t3[++i3]);
    l.__c && l.__c(u3, n2), n2.some(function(u4) {
      try {
        n2 = u4.__h, u4.__h = [], n2.some(function(n3) {
          n3.call(u4);
        });
      } catch (n3) {
        l.__e(n3, u4.__v);
      }
    });
  }
  function E(n2) {
    return "object" != typeof n2 || null == n2 || n2.__b > 0 ? n2 : g(n2) ? n2.map(E) : void 0 !== n2.constructor ? null : m({}, n2);
  }
  function G(u3, t3, i3, r3, o3, e3, f3, c3, a3) {
    var s3, h3, p3, v3, y3, w3, _2, m3 = i3.props || d, k3 = t3.props, x2 = t3.type;
    if ("svg" == x2 ? o3 = "http://www.w3.org/2000/svg" : "math" == x2 ? o3 = "http://www.w3.org/1998/Math/MathML" : o3 || (o3 = "http://www.w3.org/1999/xhtml"), null != e3) {
      for (s3 = 0; s3 < e3.length; s3++) if ((y3 = e3[s3]) && "setAttribute" in y3 == !!x2 && (x2 ? y3.localName == x2 : 3 == y3.nodeType)) {
        u3 = y3, e3[s3] = null;
        break;
      }
    }
    if (null == u3) {
      if (null == x2) return document.createTextNode(k3);
      u3 = document.createElementNS(o3, x2, k3.is && k3), c3 && (l.__m && l.__m(t3, e3), c3 = false), e3 = null;
    }
    if (null == x2) m3 === k3 || c3 && u3.data == k3 || (u3.data = k3);
    else {
      if (e3 = "textarea" == x2 && null != k3.defaultValue ? null : e3 && n.call(u3.childNodes), !c3 && null != e3) for (m3 = {}, s3 = 0; s3 < u3.attributes.length; s3++) m3[(y3 = u3.attributes[s3]).name] = y3.value;
      for (s3 in m3) y3 = m3[s3], "dangerouslySetInnerHTML" == s3 ? p3 = y3 : "children" == s3 || s3 in k3 || "value" == s3 && "defaultValue" in k3 || "checked" == s3 && "defaultChecked" in k3 || N(u3, s3, null, y3, o3);
      for (s3 in k3) y3 = k3[s3], "children" == s3 ? v3 = y3 : "dangerouslySetInnerHTML" == s3 ? h3 = y3 : "value" == s3 ? w3 = y3 : "checked" == s3 ? _2 = y3 : c3 && "function" != typeof y3 || m3[s3] === y3 || N(u3, s3, y3, m3[s3], o3);
      if (h3) c3 || p3 && (h3.__html == p3.__html || h3.__html == u3.innerHTML) || (u3.innerHTML = h3.__html), t3.__k = [];
      else if (p3 && (u3.innerHTML = ""), L("template" == t3.type ? u3.content : u3, g(v3) ? v3 : [v3], t3, i3, r3, "foreignObject" == x2 ? "http://www.w3.org/1999/xhtml" : o3, e3, f3, e3 ? e3[0] : i3.__k && $(i3, 0), c3, a3), null != e3) for (s3 = e3.length; s3--; ) b(e3[s3]);
      c3 && "textarea" != x2 || (s3 = "value", "progress" == x2 && null == w3 ? u3.removeAttribute("value") : null != w3 && (w3 !== u3[s3] || "progress" == x2 && !w3 || "option" == x2 && w3 != m3[s3]) && N(u3, s3, w3, m3[s3], o3), s3 = "checked", null != _2 && _2 != u3[s3] && N(u3, s3, _2, m3[s3], o3));
    }
    return u3;
  }
  function J(n2, u3, t3) {
    try {
      if ("function" == typeof n2) {
        var i3 = "function" == typeof n2.__u;
        i3 && n2.__u(), i3 && null == u3 || (n2.__u = n2(u3));
      } else n2.current = u3;
    } catch (n3) {
      l.__e(n3, t3);
    }
  }
  function K(n2, u3, t3) {
    var i3, r3;
    if (l.unmount && l.unmount(n2), (i3 = n2.ref) && (i3.current && i3.current != n2.__e || J(i3, null, u3)), null != (i3 = n2.__c)) {
      if (i3.componentWillUnmount) try {
        i3.componentWillUnmount();
      } catch (n3) {
        l.__e(n3, u3);
      }
      i3.base = i3.__P = null;
    }
    if (i3 = n2.__k) for (r3 = 0; r3 < i3.length; r3++) i3[r3] && K(i3[r3], u3, t3 || "function" != typeof n2.type);
    t3 || b(n2.__e), n2.__c = n2.__ = n2.__e = void 0;
  }
  function Q(n2, l3, u3) {
    return this.constructor(n2, u3);
  }
  function R(u3, t3, i3) {
    var r3, o3, e3, f3;
    t3 == document && (t3 = document.documentElement), l.__ && l.__(u3, t3), o3 = (r3 = "function" == typeof i3) ? null : i3 && i3.__k || t3.__k, e3 = [], f3 = [], q(t3, u3 = (!r3 && i3 || t3).__k = k(S, null, [u3]), o3 || d, d, t3.namespaceURI, !r3 && i3 ? [i3] : o3 ? null : t3.firstChild ? n.call(t3.childNodes) : null, e3, !r3 && i3 ? i3 : o3 ? o3.__e : t3.firstChild, r3, f3), D(e3, u3, f3);
  }
  var n, l, u, t, i, r, o, e, f, c, a, s, h, p, v, y, d, w, _, g;
  var init_preact_module = __esm({
    "node_modules/preact/dist/preact.module.js"() {
      d = {};
      w = [];
      _ = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
      g = Array.isArray;
      n = w.slice, l = { __e: function(n2, l3, u3, t3) {
        for (var i3, r3, o3; l3 = l3.__; ) if ((i3 = l3.__c) && !i3.__) try {
          if ((r3 = i3.constructor) && null != r3.getDerivedStateFromError && (i3.setState(r3.getDerivedStateFromError(n2)), o3 = i3.__d), null != i3.componentDidCatch && (i3.componentDidCatch(n2, t3 || {}), o3 = i3.__d), o3) return i3.__E = i3;
        } catch (l4) {
          n2 = l4;
        }
        throw n2;
      } }, u = 0, t = function(n2) {
        return null != n2 && void 0 === n2.constructor;
      }, C.prototype.setState = function(n2, l3) {
        var u3;
        u3 = null != this.__s && this.__s != this.state ? this.__s : this.__s = m({}, this.state), "function" == typeof n2 && (n2 = n2(m({}, u3), this.props)), n2 && m(u3, n2), null != n2 && this.__v && (l3 && this._sb.push(l3), A(this));
      }, C.prototype.forceUpdate = function(n2) {
        this.__v && (this.__e = true, n2 && this.__h.push(n2), A(this));
      }, C.prototype.render = S, i = [], o = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, e = function(n2, l3) {
        return n2.__v.__b - l3.__v.__b;
      }, H.__r = 0, f = Math.random().toString(8), c = "__d" + f, a = "__a" + f, s = /(PointerCapture)$|Capture$/i, h = 0, p = V(false), v = V(true), y = 0;
    }
  });

  // node_modules/preact/hooks/dist/hooks.module.js
  function p2(n2, t3) {
    c2.__h && c2.__h(r2, n2, o2 || t3), o2 = 0;
    var u3 = r2.__H || (r2.__H = { __: [], __h: [] });
    return n2 >= u3.__.length && u3.__.push({}), u3.__[n2];
  }
  function d2(n2) {
    return o2 = 1, h2(D2, n2);
  }
  function h2(n2, u3, i3) {
    var o3 = p2(t2++, 2);
    if (o3.t = n2, !o3.__c && (o3.__ = [i3 ? i3(u3) : D2(void 0, u3), function(n3) {
      var t3 = o3.__N ? o3.__N[0] : o3.__[0], r3 = o3.t(t3, n3);
      t3 !== r3 && (o3.__N = [r3, o3.__[1]], o3.__c.setState({}));
    }], o3.__c = r2, !r2.__f)) {
      var f3 = function(n3, t3, r3) {
        if (!o3.__c.__H) return true;
        var u4 = o3.__c.__H.__.filter(function(n4) {
          return n4.__c;
        });
        if (u4.every(function(n4) {
          return !n4.__N;
        })) return !c3 || c3.call(this, n3, t3, r3);
        var i4 = o3.__c.props !== n3;
        return u4.some(function(n4) {
          if (n4.__N) {
            var t4 = n4.__[0];
            n4.__ = n4.__N, n4.__N = void 0, t4 !== n4.__[0] && (i4 = true);
          }
        }), c3 && c3.call(this, n3, t3, r3) || i4;
      };
      r2.__f = true;
      var c3 = r2.shouldComponentUpdate, e3 = r2.componentWillUpdate;
      r2.componentWillUpdate = function(n3, t3, r3) {
        if (this.__e) {
          var u4 = c3;
          c3 = void 0, f3(n3, t3, r3), c3 = u4;
        }
        e3 && e3.call(this, n3, t3, r3);
      }, r2.shouldComponentUpdate = f3;
    }
    return o3.__N || o3.__;
  }
  function y2(n2, u3) {
    var i3 = p2(t2++, 3);
    !c2.__s && C2(i3.__H, u3) && (i3.__ = n2, i3.u = u3, r2.__H.__h.push(i3));
  }
  function A2(n2) {
    return o2 = 5, T2(function() {
      return { current: n2 };
    }, []);
  }
  function T2(n2, r3) {
    var u3 = p2(t2++, 7);
    return C2(u3.__H, r3) && (u3.__ = n2(), u3.__H = r3, u3.__h = n2), u3.__;
  }
  function j2() {
    for (var n2; n2 = f2.shift(); ) {
      var t3 = n2.__H;
      if (n2.__P && t3) try {
        t3.__h.some(z2), t3.__h.some(B2), t3.__h = [];
      } catch (r3) {
        t3.__h = [], c2.__e(r3, n2.__v);
      }
    }
  }
  function w2(n2) {
    var t3, r3 = function() {
      clearTimeout(u3), k2 && cancelAnimationFrame(t3), setTimeout(n2);
    }, u3 = setTimeout(r3, 35);
    k2 && (t3 = requestAnimationFrame(r3));
  }
  function z2(n2) {
    var t3 = r2, u3 = n2.__c;
    "function" == typeof u3 && (n2.__c = void 0, u3()), r2 = t3;
  }
  function B2(n2) {
    var t3 = r2;
    n2.__c = n2.__(), r2 = t3;
  }
  function C2(n2, t3) {
    return !n2 || n2.length !== t3.length || t3.some(function(t4, r3) {
      return t4 !== n2[r3];
    });
  }
  function D2(n2, t3) {
    return "function" == typeof t3 ? t3(n2) : t3;
  }
  var t2, r2, u2, i2, o2, f2, c2, e2, a2, v2, l2, m2, s2, k2;
  var init_hooks_module = __esm({
    "node_modules/preact/hooks/dist/hooks.module.js"() {
      init_preact_module();
      o2 = 0;
      f2 = [];
      c2 = l;
      e2 = c2.__b;
      a2 = c2.__r;
      v2 = c2.diffed;
      l2 = c2.__c;
      m2 = c2.unmount;
      s2 = c2.__;
      c2.__b = function(n2) {
        r2 = null, e2 && e2(n2);
      }, c2.__ = function(n2, t3) {
        n2 && t3.__k && t3.__k.__m && (n2.__m = t3.__k.__m), s2 && s2(n2, t3);
      }, c2.__r = function(n2) {
        a2 && a2(n2), t2 = 0;
        var i3 = (r2 = n2.__c).__H;
        i3 && (u2 === r2 ? (i3.__h = [], r2.__h = [], i3.__.some(function(n3) {
          n3.__N && (n3.__ = n3.__N), n3.u = n3.__N = void 0;
        })) : (i3.__h.some(z2), i3.__h.some(B2), i3.__h = [], t2 = 0)), u2 = r2;
      }, c2.diffed = function(n2) {
        v2 && v2(n2);
        var t3 = n2.__c;
        t3 && t3.__H && (t3.__H.__h.length && (1 !== f2.push(t3) && i2 === c2.requestAnimationFrame || ((i2 = c2.requestAnimationFrame) || w2)(j2)), t3.__H.__.some(function(n3) {
          n3.u && (n3.__H = n3.u), n3.u = void 0;
        })), u2 = r2 = null;
      }, c2.__c = function(n2, t3) {
        t3.some(function(n3) {
          try {
            n3.__h.some(z2), n3.__h = n3.__h.filter(function(n4) {
              return !n4.__ || B2(n4);
            });
          } catch (r3) {
            t3.some(function(n4) {
              n4.__h && (n4.__h = []);
            }), t3 = [], c2.__e(r3, n3.__v);
          }
        }), l2 && l2(n2, t3);
      }, c2.unmount = function(n2) {
        m2 && m2(n2);
        var t3, r3 = n2.__c;
        r3 && r3.__H && (r3.__H.__.some(function(n3) {
          try {
            z2(n3);
          } catch (n4) {
            t3 = n4;
          }
        }), r3.__H = void 0, t3 && c2.__e(t3, r3.__v));
      };
      k2 = "function" == typeof requestAnimationFrame;
    }
  });

  // ../../../../../../private/var/folders/ky/rsp5401s0j5dhj7vxmrd2gdr0000gn/T/23c1bdb3-6377-47a2-a572-1d7b90d0ae26/base.js
  var init_base = __esm({
    "../../../../../../private/var/folders/ky/rsp5401s0j5dhj7vxmrd2gdr0000gn/T/23c1bdb3-6377-47a2-a572-1d7b90d0ae26/base.js"() {
      if (document.getElementById("0a792085d1") === null) {
        const element = document.createElement("style");
        element.id = "0a792085d1";
        element.textContent = `:root {
  --border-width-1: 1px;
  --border-width-4: 4px;
  --border-radius-2: 2px;
  --border-radius-4: 4px;
  --border-radius-6: 6px;
  --border-radius-12: 12px;
  --box-shadow: var(--box-shadow-menu);
  --box-shadow-menu:
    0 5px 17px rgba(0, 0, 0, 0.2), 0 2px 7px rgba(0, 0, 0, 0.15),
    inset 0 0 0 0.5px #000000, 0 0 0 0.5px rgba(0, 0, 0, 0.1);
  --box-shadow-modal:
    0 2px 14px rgba(0, 0, 0, 0.15), 0 0 0 0.5px rgba(0, 0, 0, 0.2);
  --box-shadow-range-slider:
    0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 3px 8px 0 rgba(0, 0, 0, 0.1),
    0 0 0.5px 0 rgba(0, 0, 0, 0.18), inset 0 0 0 0.5px rgba(0, 0, 0, 0.1);
  --color-bg-menu: #1e1e1e;
  --color-bg-overlay: rgba(0, 0, 0, 0.5);
  --font-family: 'Inter', 'Helvetica', sans-serif;
  --font-family-code:
    SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New',
    monospace;
  --font-size-11: 11px;
  --font-size-12: 12px;
  --font-weight-regular: 400;
  --font-weight-bold: 600;
  --line-height-16: 16px;
  --opacity-30: 0.3;
  --space-extra-small: 8px;
  --space-small: 12px;
  --space-medium: 16px;
  --space-large: 20px;
  --space-extra-large: 24px;
  --space-0: 0;
  --space-4: 4px;
  --space-6: 6px;
  --space-8: 8px;
  --space-12: 12px;
  --space-16: 16px;
  --space-20: 20px;
  --space-24: 24px;
  --space-28: 28px;
  --space-32: 32px;
  --transition-duration-100: 0.1s;
  --transition-duration-300: 0.3s;
  --z-index-1: 1;
  --z-index-2: 2;
}

.figma-dark {
  color-scheme: dark;
}

* {
  box-sizing: border-box;
  border-width: 0;
  border-style: solid;
  border-color: currentColor;
}

body {
  margin: 0;
  background-color: var(--figma-color-bg);
  color: var(--figma-color-text);
  font-family: var(--font-family);
  font-size: var(--font-size-11);
  font-weight: var(--font-weight-regular);
  line-height: var(--line-height-16);
}

div,
span {
  cursor: default;
  user-select: none;
}

h1,
h2,
h3 {
  margin: 0;
  font-weight: inherit;
}

button {
  padding: 0;
  border: 0;
  -webkit-appearance: none;
  background-color: transparent;
  font: inherit;
  outline: 0;
}

hr {
  border: 0;
  margin: 0;
}

label {
  display: block;
}

input,
textarea {
  padding: 0;
  border: 0;
  margin: 0;
  -webkit-appearance: none;
  cursor: default;
  font: inherit;
  outline: 0;
}

svg {
  display: block;
}

::selection {
  background-color: var(--figma-color-bg-onselected);
}
`;
        document.head.prepend(element);
      }
    }
  });

  // node_modules/@create-figma-plugin/ui/lib/utilities/render.js
  function render(Plugin2) {
    return function(rootNode2, props) {
      R(k(Plugin2, __spreadValues({}, props)), rootNode2);
    };
  }
  var init_render = __esm({
    "node_modules/@create-figma-plugin/ui/lib/utilities/render.js"() {
      init_base();
      init_preact_module();
    }
  });

  // node_modules/@create-figma-plugin/ui/lib/index.js
  var init_lib = __esm({
    "node_modules/@create-figma-plugin/ui/lib/index.js"() {
      init_render();
    }
  });

  // ../../../../../../private/var/folders/ky/rsp5401s0j5dhj7vxmrd2gdr0000gn/T/944c3237-4f7f-4b0c-af4e-db4a2ef20156/output.js
  var init_output = __esm({
    "../../../../../../private/var/folders/ky/rsp5401s0j5dhj7vxmrd2gdr0000gn/T/944c3237-4f7f-4b0c-af4e-db4a2ef20156/output.js"() {
      if (document.getElementById("db1a1ac058") === null) {
        const element = document.createElement("style");
        element.id = "db1a1ac058";
        element.textContent = `/*! tailwindcss v4.3.0 | MIT License | https://tailwindcss.com */
@layer properties;
@layer theme, base, components, utilities;
@layer theme {
  :root, :host {
    --font-sans: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji",
      "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono",
      "Courier New", monospace;
    --color-red-50: oklch(97.1% 0.013 17.38);
    --color-red-200: oklch(88.5% 0.062 18.334);
    --color-red-300: oklch(80.8% 0.114 19.571);
    --color-red-600: oklch(57.7% 0.245 27.325);
    --color-red-700: oklch(50.5% 0.213 27.518);
    --color-orange-200: oklch(90.1% 0.076 70.697);
    --color-green-50: oklch(98.2% 0.018 155.826);
    --color-green-200: oklch(92.5% 0.084 155.995);
    --color-green-500: oklch(72.3% 0.219 149.579);
    --color-teal-50: oklch(98.4% 0.014 180.72);
    --color-teal-700: oklch(51.1% 0.096 186.391);
    --color-teal-800: oklch(43.7% 0.078 188.216);
    --color-purple-200: oklch(90.2% 0.063 306.703);
    --color-gray-50: oklch(98.5% 0.002 247.839);
    --color-gray-100: oklch(96.7% 0.003 264.542);
    --color-gray-200: oklch(92.8% 0.006 264.531);
    --color-gray-300: oklch(87.2% 0.01 258.338);
    --color-gray-400: oklch(70.7% 0.022 261.325);
    --color-gray-500: oklch(55.1% 0.027 264.364);
    --color-gray-600: oklch(44.6% 0.03 256.802);
    --color-gray-700: oklch(37.3% 0.034 259.733);
    --color-gray-800: oklch(27.8% 0.033 256.848);
    --color-gray-900: oklch(21% 0.034 264.665);
    --color-black: #000;
    --color-white: #fff;
    --spacing: 0.25rem;
    --container-xs: 20rem;
    --container-sm: 24rem;
    --text-xs: 0.75rem;
    --text-xs--line-height: calc(1 / 0.75);
    --text-sm: 0.875rem;
    --text-sm--line-height: calc(1.25 / 0.875);
    --text-lg: 1.125rem;
    --text-lg--line-height: calc(1.75 / 1.125);
    --text-xl: 1.25rem;
    --text-xl--line-height: calc(1.75 / 1.25);
    --text-2xl: 1.5rem;
    --text-2xl--line-height: calc(2 / 1.5);
    --text-3xl: 1.875rem;
    --text-3xl--line-height: calc(2.25 / 1.875);
    --text-4xl: 2.25rem;
    --text-4xl--line-height: calc(2.5 / 2.25);
    --text-5xl: 3rem;
    --text-5xl--line-height: 1;
    --font-weight-medium: 500;
    --font-weight-semibold: 600;
    --font-weight-bold: 700;
    --tracking-wide: 0.025em;
    --leading-tight: 1.25;
    --leading-relaxed: 1.625;
    --radius-sm: 0.25rem;
    --radius-md: 0.375rem;
    --radius-lg: 0.5rem;
    --radius-xl: 0.75rem;
    --radius-2xl: 1rem;
    --default-transition-duration: 150ms;
    --default-transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    --default-font-family: var(--font-sans);
    --default-mono-font-family: var(--font-mono);
  }
}
@layer base {
  *, ::after, ::before, ::backdrop, ::file-selector-button {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: 0 solid;
  }
  html, :host {
    line-height: 1.5;
    -webkit-text-size-adjust: 100%;
    tab-size: 4;
    font-family: var(--default-font-family, ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji");
    font-feature-settings: var(--default-font-feature-settings, normal);
    font-variation-settings: var(--default-font-variation-settings, normal);
    -webkit-tap-highlight-color: transparent;
  }
  hr {
    height: 0;
    color: inherit;
    border-top-width: 1px;
  }
  abbr:where([title]) {
    -webkit-text-decoration: underline dotted;
    text-decoration: underline dotted;
  }
  h1, h2, h3, h4, h5, h6 {
    font-size: inherit;
    font-weight: inherit;
  }
  a {
    color: inherit;
    -webkit-text-decoration: inherit;
    text-decoration: inherit;
  }
  b, strong {
    font-weight: bolder;
  }
  code, kbd, samp, pre {
    font-family: var(--default-mono-font-family, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace);
    font-feature-settings: var(--default-mono-font-feature-settings, normal);
    font-variation-settings: var(--default-mono-font-variation-settings, normal);
    font-size: 1em;
  }
  small {
    font-size: 80%;
  }
  sub, sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }
  sub {
    bottom: -0.25em;
  }
  sup {
    top: -0.5em;
  }
  table {
    text-indent: 0;
    border-color: inherit;
    border-collapse: collapse;
  }
  :-moz-focusring {
    outline: auto;
  }
  progress {
    vertical-align: baseline;
  }
  summary {
    display: list-item;
  }
  ol, ul, menu {
    list-style: none;
  }
  img, svg, video, canvas, audio, iframe, embed, object {
    display: block;
    vertical-align: middle;
  }
  img, video {
    max-width: 100%;
    height: auto;
  }
  button, input, select, optgroup, textarea, ::file-selector-button {
    font: inherit;
    font-feature-settings: inherit;
    font-variation-settings: inherit;
    letter-spacing: inherit;
    color: inherit;
    border-radius: 0;
    background-color: transparent;
    opacity: 1;
  }
  :where(select:is([multiple], [size])) optgroup {
    font-weight: bolder;
  }
  :where(select:is([multiple], [size])) optgroup option {
    padding-inline-start: 20px;
  }
  ::file-selector-button {
    margin-inline-end: 4px;
  }
  ::placeholder {
    opacity: 1;
  }
  @supports (not (-webkit-appearance: -apple-pay-button))  or (contain-intrinsic-size: 1px) {
    ::placeholder {
      color: currentcolor;
      @supports (color: color-mix(in lab, red, red)) {
        color: color-mix(in oklab, currentcolor 50%, transparent);
      }
    }
  }
  textarea {
    resize: vertical;
  }
  ::-webkit-search-decoration {
    -webkit-appearance: none;
  }
  ::-webkit-date-and-time-value {
    min-height: 1lh;
    text-align: inherit;
  }
  ::-webkit-datetime-edit {
    display: inline-flex;
  }
  ::-webkit-datetime-edit-fields-wrapper {
    padding: 0;
  }
  ::-webkit-datetime-edit, ::-webkit-datetime-edit-year-field, ::-webkit-datetime-edit-month-field, ::-webkit-datetime-edit-day-field, ::-webkit-datetime-edit-hour-field, ::-webkit-datetime-edit-minute-field, ::-webkit-datetime-edit-second-field, ::-webkit-datetime-edit-millisecond-field, ::-webkit-datetime-edit-meridiem-field {
    padding-block: 0;
  }
  ::-webkit-calendar-picker-indicator {
    line-height: 1;
  }
  :-moz-ui-invalid {
    box-shadow: none;
  }
  button, input:where([type="button"], [type="reset"], [type="submit"]), ::file-selector-button {
    appearance: button;
  }
  ::-webkit-inner-spin-button, ::-webkit-outer-spin-button {
    height: auto;
  }
  [hidden]:where(:not([hidden="until-found"])) {
    display: none !important;
  }
}
@layer utilities {
  .pointer-events-none {
    pointer-events: none !important;
  }
  .collapse {
    visibility: collapse !important;
  }
  .visible {
    visibility: visible !important;
  }
  .visible\\! {
    visibility: visible !important;
  }
  .sr-only {
    position: absolute !important;
    width: 1px !important;
    height: 1px !important;
    padding: 0 !important;
    margin: -1px !important;
    overflow: hidden !important;
    clip-path: inset(50%) !important;
    white-space: nowrap !important;
    border-width: 0 !important;
  }
  .absolute {
    position: absolute !important;
  }
  .fixed {
    position: fixed !important;
  }
  .relative {
    position: relative !important;
  }
  .inset-0 {
    inset: calc(var(--spacing) * 0) !important;
  }
  .top-0 {
    top: calc(var(--spacing) * 0) !important;
  }
  .top-3 {
    top: calc(var(--spacing) * 3) !important;
  }
  .right-0 {
    right: calc(var(--spacing) * 0) !important;
  }
  .right-3 {
    right: calc(var(--spacing) * 3) !important;
  }
  .right-12 {
    right: calc(var(--spacing) * 12) !important;
  }
  .right-\\[-5\\] {
    right: -5 !important;
  }
  .right-\\[-10\\] {
    right: -10 !important;
  }
  .right-\\[-20\\] {
    right: -20 !important;
  }
  .right-\\[0\\] {
    right: 0 !important;
  }
  .bottom-0 {
    bottom: calc(var(--spacing) * 0) !important;
  }
  .bottom-3 {
    bottom: calc(var(--spacing) * 3) !important;
  }
  .bottom-12 {
    bottom: calc(var(--spacing) * 12) !important;
  }
  .left-0 {
    left: calc(var(--spacing) * 0) !important;
  }
  .z-10 {
    z-index: 10 !important;
  }
  .z-20 {
    z-index: 20 !important;
  }
  .z-30 {
    z-index: 30 !important;
  }
  .z-40 {
    z-index: 40 !important;
  }
  .z-50 {
    z-index: 50 !important;
  }
  .z-\\[60\\] {
    z-index: 60 !important;
  }
  .container {
    width: 100% !important;
    @media (width >= 40rem) {
      max-width: 40rem !important;
    }
    @media (width >= 48rem) {
      max-width: 48rem !important;
    }
    @media (width >= 64rem) {
      max-width: 64rem !important;
    }
    @media (width >= 80rem) {
      max-width: 80rem !important;
    }
    @media (width >= 96rem) {
      max-width: 96rem !important;
    }
  }
  .mx-2 {
    margin-inline: calc(var(--spacing) * 2) !important;
  }
  .mx-auto {
    margin-inline: auto !important;
  }
  .my-4 {
    margin-block: calc(var(--spacing) * 4) !important;
  }
  .mt-0 {
    margin-top: calc(var(--spacing) * 0) !important;
  }
  .mt-0\\.5 {
    margin-top: calc(var(--spacing) * 0.5) !important;
  }
  .mt-1 {
    margin-top: calc(var(--spacing) * 1) !important;
  }
  .mt-2 {
    margin-top: calc(var(--spacing) * 2) !important;
  }
  .mt-3 {
    margin-top: calc(var(--spacing) * 3) !important;
  }
  .mt-4 {
    margin-top: calc(var(--spacing) * 4) !important;
  }
  .mt-6 {
    margin-top: calc(var(--spacing) * 6) !important;
  }
  .mt-7 {
    margin-top: calc(var(--spacing) * 7) !important;
  }
  .mt-8 {
    margin-top: calc(var(--spacing) * 8) !important;
  }
  .mt-14 {
    margin-top: calc(var(--spacing) * 14) !important;
  }
  .mt-16 {
    margin-top: calc(var(--spacing) * 16) !important;
  }
  .mb-1 {
    margin-bottom: calc(var(--spacing) * 1) !important;
  }
  .mb-2 {
    margin-bottom: calc(var(--spacing) * 2) !important;
  }
  .mb-3 {
    margin-bottom: calc(var(--spacing) * 3) !important;
  }
  .mb-4 {
    margin-bottom: calc(var(--spacing) * 4) !important;
  }
  .block {
    display: block !important;
  }
  .flex {
    display: flex !important;
  }
  .grid {
    display: grid !important;
  }
  .hidden {
    display: none !important;
  }
  .table {
    display: table !important;
  }
  .h-1 {
    height: calc(var(--spacing) * 1) !important;
  }
  .h-1\\.5 {
    height: calc(var(--spacing) * 1.5) !important;
  }
  .h-2 {
    height: calc(var(--spacing) * 2) !important;
  }
  .h-4 {
    height: calc(var(--spacing) * 4) !important;
  }
  .h-5 {
    height: calc(var(--spacing) * 5) !important;
  }
  .h-6 {
    height: calc(var(--spacing) * 6) !important;
  }
  .h-7 {
    height: calc(var(--spacing) * 7) !important;
  }
  .h-8 {
    height: calc(var(--spacing) * 8) !important;
  }
  .h-9 {
    height: calc(var(--spacing) * 9) !important;
  }
  .h-10 {
    height: calc(var(--spacing) * 10) !important;
  }
  .h-11 {
    height: calc(var(--spacing) * 11) !important;
  }
  .h-12 {
    height: calc(var(--spacing) * 12) !important;
  }
  .h-14 {
    height: calc(var(--spacing) * 14) !important;
  }
  .h-16 {
    height: calc(var(--spacing) * 16) !important;
  }
  .h-20 {
    height: calc(var(--spacing) * 20) !important;
  }
  .h-32 {
    height: calc(var(--spacing) * 32) !important;
  }
  .h-72 {
    height: calc(var(--spacing) * 72) !important;
  }
  .h-\\[248px\\] {
    height: 248px !important;
  }
  .h-\\[420px\\] {
    height: 420px !important;
  }
  .h-\\[520px\\] {
    height: 520px !important;
  }
  .h-\\[calc\\(100\\%-48px\\)\\] {
    height: calc(100% - 48px) !important;
  }
  .h-full {
    height: 100% !important;
  }
  .h-px {
    height: 1px !important;
  }
  .h-screen {
    height: 100vh !important;
  }
  .max-h-\\[30\\%\\] {
    max-height: 30% !important;
  }
  .max-h-\\[45vh\\] {
    max-height: 45vh !important;
  }
  .max-h-\\[55\\%\\] {
    max-height: 55% !important;
  }
  .max-h-\\[72\\%\\] {
    max-height: 72% !important;
  }
  .max-h-\\[82\\%\\] {
    max-height: 82% !important;
  }
  .max-h-\\[520px\\] {
    max-height: 520px !important;
  }
  .max-h-\\[calc\\(55vh-44px\\)\\] {
    max-height: calc(55vh - 44px) !important;
  }
  .max-h-full {
    max-height: 100% !important;
  }
  .min-h-0 {
    min-height: calc(var(--spacing) * 0) !important;
  }
  .min-h-8 {
    min-height: calc(var(--spacing) * 8) !important;
  }
  .min-h-9 {
    min-height: calc(var(--spacing) * 9) !important;
  }
  .min-h-12 {
    min-height: calc(var(--spacing) * 12) !important;
  }
  .min-h-24 {
    min-height: calc(var(--spacing) * 24) !important;
  }
  .min-h-28 {
    min-height: calc(var(--spacing) * 28) !important;
  }
  .min-h-\\[45\\%\\] {
    min-height: 45% !important;
  }
  .min-h-\\[230px\\] {
    min-height: 230px !important;
  }
  .min-h-\\[240px\\] {
    min-height: 240px !important;
  }
  .min-h-\\[470px\\] {
    min-height: 470px !important;
  }
  .min-h-\\[540px\\] {
    min-height: 540px !important;
  }
  .min-h-full {
    min-height: 100% !important;
  }
  .w-1 {
    width: calc(var(--spacing) * 1) !important;
  }
  .w-1\\.5 {
    width: calc(var(--spacing) * 1.5) !important;
  }
  .w-2 {
    width: calc(var(--spacing) * 2) !important;
  }
  .w-4 {
    width: calc(var(--spacing) * 4) !important;
  }
  .w-5 {
    width: calc(var(--spacing) * 5) !important;
  }
  .w-6 {
    width: calc(var(--spacing) * 6) !important;
  }
  .w-7 {
    width: calc(var(--spacing) * 7) !important;
  }
  .w-8 {
    width: calc(var(--spacing) * 8) !important;
  }
  .w-9 {
    width: calc(var(--spacing) * 9) !important;
  }
  .w-11 {
    width: calc(var(--spacing) * 11) !important;
  }
  .w-12 {
    width: calc(var(--spacing) * 12) !important;
  }
  .w-14 {
    width: calc(var(--spacing) * 14) !important;
  }
  .w-52 {
    width: calc(var(--spacing) * 52) !important;
  }
  .w-72 {
    width: calc(var(--spacing) * 72) !important;
  }
  .w-80 {
    width: calc(var(--spacing) * 80) !important;
  }
  .w-\\[360px\\] {
    width: 360px !important;
  }
  .w-\\[420px\\] {
    width: 420px !important;
  }
  .w-\\[520px\\] {
    width: 520px !important;
  }
  .w-\\[min\\(420px\\,100vw\\)\\] {
    width: min(420px, 100vw) !important;
  }
  .w-fit {
    width: fit-content !important;
  }
  .w-full {
    width: 100% !important;
  }
  .w-screen {
    width: 100vw !important;
  }
  .max-w-full {
    max-width: 100% !important;
  }
  .max-w-sm {
    max-width: var(--container-sm) !important;
  }
  .max-w-xs {
    max-width: var(--container-xs) !important;
  }
  .min-w-0 {
    min-width: calc(var(--spacing) * 0) !important;
  }
  .flex-1 {
    flex: 1 !important;
  }
  .flex-shrink {
    flex-shrink: 1 !important;
  }
  .shrink-0 {
    flex-shrink: 0 !important;
  }
  .flex-grow {
    flex-grow: 1 !important;
  }
  .grow {
    flex-grow: 1 !important;
  }
  .border-collapse {
    border-collapse: collapse !important;
  }
  .translate-x-0 {
    --tw-translate-x: calc(var(--spacing) * 0) !important;
    translate: var(--tw-translate-x) var(--tw-translate-y) !important;
  }
  .translate-x-full {
    --tw-translate-x: 100% !important;
    translate: var(--tw-translate-x) var(--tw-translate-y) !important;
  }
  .scale-0 {
    --tw-scale-x: 0% !important;
    --tw-scale-y: 0% !important;
    --tw-scale-z: 0% !important;
    scale: var(--tw-scale-x) var(--tw-scale-y) !important;
  }
  .scale-100 {
    --tw-scale-x: 100% !important;
    --tw-scale-y: 100% !important;
    --tw-scale-z: 100% !important;
    scale: var(--tw-scale-x) var(--tw-scale-y) !important;
  }
  .rotate-180 {
    rotate: 180deg !important;
  }
  .cursor-not-allowed {
    cursor: not-allowed !important;
  }
  .cursor-pointer {
    cursor: pointer !important;
  }
  .resize {
    resize: both !important;
  }
  .resize-none {
    resize: none !important;
  }
  .grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
  }
  .grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
  }
  .grid-cols-4 {
    grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
  }
  .grid-cols-\\[44px_minmax\\(0\\,1fr\\)_44px\\] {
    grid-template-columns: 44px minmax(0,1fr) 44px !important;
  }
  .grid-cols-\\[48px_minmax\\(0\\,1fr\\)\\] {
    grid-template-columns: 48px minmax(0,1fr) !important;
  }
  .grid-cols-\\[48px_minmax\\(0\\,1fr\\)_48px\\] {
    grid-template-columns: 48px minmax(0,1fr) 48px !important;
  }
  .grid-cols-\\[380px_minmax\\(0\\,1fr\\)\\] {
    grid-template-columns: 380px minmax(0,1fr) !important;
  }
  .grid-cols-\\[760px_minmax\\(0\\,1fr\\)\\] {
    grid-template-columns: 760px minmax(0,1fr) !important;
  }
  .grid-cols-\\[minmax\\(0\\,1fr\\)_40px_minmax\\(190px\\,240px\\)\\] {
    grid-template-columns: minmax(0,1fr) 40px minmax(190px,240px) !important;
  }
  .grid-cols-\\[minmax\\(0\\,1fr\\)_60px_260px\\] {
    grid-template-columns: minmax(0,1fr) 60px 260px !important;
  }
  .grid-cols-\\[minmax\\(0\\,1fr\\)_130px\\] {
    grid-template-columns: minmax(0,1fr) 130px !important;
  }
  .grid-cols-\\[minmax\\(0\\,1fr\\)_320px\\] {
    grid-template-columns: minmax(0,1fr) 320px !important;
  }
  .grid-cols-\\[minmax\\(0\\,1fr\\)_360px\\] {
    grid-template-columns: minmax(0,1fr) 360px !important;
  }
  .grid-cols-\\[minmax\\(0\\,1fr\\)_auto\\] {
    grid-template-columns: minmax(0,1fr) auto !important;
  }
  .grid-cols-\\[minmax\\(0\\,1fr\\)_auto_minmax\\(0\\,1fr\\)\\] {
    grid-template-columns: minmax(0,1fr) auto minmax(0,1fr) !important;
  }
  .grid-rows-\\[36px_1fr_36px\\] {
    grid-template-rows: 36px 1fr 36px !important;
  }
  .grid-rows-\\[40px_1fr_40px\\] {
    grid-template-rows: 40px 1fr 40px !important;
  }
  .grid-rows-\\[minmax\\(0\\,1fr\\)_48px\\] {
    grid-template-rows: minmax(0,1fr) 48px !important;
  }
  .grid-rows-\\[minmax\\(240px\\,1fr\\)_minmax\\(260px\\,38vh\\)\\] {
    grid-template-rows: minmax(240px,1fr) minmax(260px,38vh) !important;
  }
  .grid-rows-\\[minmax\\(260px\\,1fr\\)_minmax\\(300px\\,42vh\\)\\] {
    grid-template-rows: minmax(260px,1fr) minmax(300px,42vh) !important;
  }
  .grid-rows-\\[minmax\\(360px\\,1fr\\)_minmax\\(300px\\,42vh\\)\\] {
    grid-template-rows: minmax(360px,1fr) minmax(300px,42vh) !important;
  }
  .flex-col {
    flex-direction: column !important;
  }
  .items-center {
    align-items: center !important;
  }
  .items-end {
    align-items: flex-end !important;
  }
  .items-start {
    align-items: flex-start !important;
  }
  .justify-between {
    justify-content: space-between !important;
  }
  .justify-center {
    justify-content: center !important;
  }
  .justify-start {
    justify-content: flex-start !important;
  }
  .gap-1 {
    gap: calc(var(--spacing) * 1) !important;
  }
  .gap-1\\.5 {
    gap: calc(var(--spacing) * 1.5) !important;
  }
  .gap-2 {
    gap: calc(var(--spacing) * 2) !important;
  }
  .gap-3 {
    gap: calc(var(--spacing) * 3) !important;
  }
  .gap-4 {
    gap: calc(var(--spacing) * 4) !important;
  }
  .gap-5 {
    gap: calc(var(--spacing) * 5) !important;
  }
  .gap-7 {
    gap: calc(var(--spacing) * 7) !important;
  }
  .gap-8 {
    gap: calc(var(--spacing) * 8) !important;
  }
  .gap-10 {
    gap: calc(var(--spacing) * 10) !important;
  }
  .space-y-2 {
    :where(& > :not(:last-child)) {
      --tw-space-y-reverse: 0 !important;
      margin-block-start: calc(calc(var(--spacing) * 2) * var(--tw-space-y-reverse)) !important;
      margin-block-end: calc(calc(var(--spacing) * 2) * calc(1 - var(--tw-space-y-reverse))) !important;
    }
  }
  .space-y-3 {
    :where(& > :not(:last-child)) {
      --tw-space-y-reverse: 0 !important;
      margin-block-start: calc(calc(var(--spacing) * 3) * var(--tw-space-y-reverse)) !important;
      margin-block-end: calc(calc(var(--spacing) * 3) * calc(1 - var(--tw-space-y-reverse))) !important;
    }
  }
  .space-y-4 {
    :where(& > :not(:last-child)) {
      --tw-space-y-reverse: 0 !important;
      margin-block-start: calc(calc(var(--spacing) * 4) * var(--tw-space-y-reverse)) !important;
      margin-block-end: calc(calc(var(--spacing) * 4) * calc(1 - var(--tw-space-y-reverse))) !important;
    }
  }
  .space-y-5 {
    :where(& > :not(:last-child)) {
      --tw-space-y-reverse: 0 !important;
      margin-block-start: calc(calc(var(--spacing) * 5) * var(--tw-space-y-reverse)) !important;
      margin-block-end: calc(calc(var(--spacing) * 5) * calc(1 - var(--tw-space-y-reverse))) !important;
    }
  }
  .-space-x-2 {
    :where(& > :not(:last-child)) {
      --tw-space-x-reverse: 0 !important;
      margin-inline-start: calc(calc(var(--spacing) * -2) * var(--tw-space-x-reverse)) !important;
      margin-inline-end: calc(calc(var(--spacing) * -2) * calc(1 - var(--tw-space-x-reverse))) !important;
    }
  }
  .divide-x {
    :where(& > :not(:last-child)) {
      --tw-divide-x-reverse: 0 !important;
      border-inline-style: var(--tw-border-style) !important;
      border-inline-start-width: calc(1px * var(--tw-divide-x-reverse)) !important;
      border-inline-end-width: calc(1px * calc(1 - var(--tw-divide-x-reverse))) !important;
    }
  }
  .divide-gray-200 {
    :where(& > :not(:last-child)) {
      border-color: var(--color-gray-200) !important;
    }
  }
  .truncate {
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    white-space: nowrap !important;
  }
  .overflow-auto {
    overflow: auto !important;
  }
  .overflow-hidden {
    overflow: hidden !important;
  }
  .overflow-visible {
    overflow: visible !important;
  }
  .overflow-x-hidden {
    overflow-x: hidden !important;
  }
  .overflow-y-auto {
    overflow-y: auto !important;
  }
  .overscroll-contain {
    overscroll-behavior: contain !important;
  }
  .rounded {
    border-radius: 0.25rem !important;
  }
  .rounded-2xl {
    border-radius: var(--radius-2xl) !important;
  }
  .rounded-full {
    border-radius: calc(infinity * 1px) !important;
  }
  .rounded-lg {
    border-radius: var(--radius-lg) !important;
  }
  .rounded-md {
    border-radius: var(--radius-md) !important;
  }
  .rounded-sm {
    border-radius: var(--radius-sm) !important;
  }
  .rounded-xl {
    border-radius: var(--radius-xl) !important;
  }
  .border {
    border-style: var(--tw-border-style) !important;
    border-width: 1px !important;
  }
  .border\\! {
    border-style: var(--tw-border-style) !important;
    border-width: 1px !important;
  }
  .border-0 {
    border-style: var(--tw-border-style) !important;
    border-width: 0px !important;
  }
  .border-1 {
    border-style: var(--tw-border-style) !important;
    border-width: 1px !important;
  }
  .border-1\\! {
    border-style: var(--tw-border-style) !important;
    border-width: 1px !important;
  }
  .border-2 {
    border-style: var(--tw-border-style) !important;
    border-width: 2px !important;
  }
  .border-2\\! {
    border-style: var(--tw-border-style) !important;
    border-width: 2px !important;
  }
  .border-t {
    border-top-style: var(--tw-border-style) !important;
    border-top-width: 1px !important;
  }
  .border-r {
    border-right-style: var(--tw-border-style) !important;
    border-right-width: 1px !important;
  }
  .border-b {
    border-bottom-style: var(--tw-border-style) !important;
    border-bottom-width: 1px !important;
  }
  .border-l {
    border-left-style: var(--tw-border-style) !important;
    border-left-width: 1px !important;
  }
  .border-dashed {
    --tw-border-style: dashed !important;
    border-style: dashed !important;
  }
  .border-\\[\\#0f766e\\] {
    border-color: #0f766e !important;
  }
  .border-\\[\\#0f766e\\]\\/20 {
    border-color: color-mix(in oklab, #0f766e 20%, transparent) !important;
  }
  .border-\\[\\#0f766e\\]\\/30 {
    border-color: color-mix(in oklab, #0f766e 30%, transparent) !important;
  }
  .border-\\[\\#5b35f5\\] {
    border-color: #5b35f5 !important;
  }
  .border-\\[\\#5eead4\\]\\/40 {
    border-color: color-mix(in oklab, #5eead4 40%, transparent) !important;
  }
  .border-\\[\\#111827\\]\\/20 {
    border-color: color-mix(in oklab, #111827 20%, transparent) !important;
  }
  .border-\\[\\#cbd5e1\\] {
    border-color: #cbd5e1 !important;
  }
  .border-\\[\\#d1d5db\\] {
    border-color: #d1d5db !important;
  }
  .border-\\[\\#d97706\\] {
    border-color: #d97706 !important;
  }
  .border-\\[\\#e5e7eb\\] {
    border-color: #e5e7eb !important;
  }
  .border-\\[\\#eef2f7\\] {
    border-color: #eef2f7 !important;
  }
  .border-\\[\\#f59e0b\\] {
    border-color: #f59e0b !important;
  }
  .border-black {
    border-color: var(--color-black) !important;
  }
  .border-gray-100 {
    border-color: var(--color-gray-100) !important;
  }
  .border-gray-200 {
    border-color: var(--color-gray-200) !important;
  }
  .border-gray-300 {
    border-color: var(--color-gray-300) !important;
  }
  .border-teal-700 {
    border-color: var(--color-teal-700) !important;
  }
  .border-white {
    border-color: var(--color-white) !important;
  }
  .border-white\\/10 {
    border-color: color-mix(in srgb, #fff 10%, transparent) !important;
    @supports (color: color-mix(in lab, red, red)) {
      border-color: color-mix(in oklab, var(--color-white) 10%, transparent) !important;
    }
  }
  .border-white\\/80 {
    border-color: color-mix(in srgb, #fff 80%, transparent) !important;
    @supports (color: color-mix(in lab, red, red)) {
      border-color: color-mix(in oklab, var(--color-white) 80%, transparent) !important;
    }
  }
  .bg-\\[\\#0f766e\\] {
    background-color: #0f766e !important;
  }
  .bg-\\[\\#5b35f5\\] {
    background-color: #5b35f5 !important;
  }
  .bg-\\[\\#111827\\] {
    background-color: #111827 !important;
  }
  .bg-\\[\\#d97706\\] {
    background-color: #d97706 !important;
  }
  .bg-\\[\\#e2e8f0\\] {
    background-color: #e2e8f0 !important;
  }
  .bg-\\[\\#e5e7eb\\] {
    background-color: #e5e7eb !important;
  }
  .bg-\\[\\#ecfdf5\\] {
    background-color: #ecfdf5 !important;
  }
  .bg-\\[\\#f3f0ff\\] {
    background-color: #f3f0ff !important;
  }
  .bg-\\[\\#f3f4f6\\] {
    background-color: #f3f4f6 !important;
  }
  .bg-\\[\\#f4f1ff\\] {
    background-color: #f4f1ff !important;
  }
  .bg-\\[\\#f6f7fb\\] {
    background-color: #f6f7fb !important;
  }
  .bg-\\[\\#f7f8fb\\] {
    background-color: #f7f8fb !important;
  }
  .bg-\\[\\#f7f8fb\\]\\! {
    background-color: #f7f8fb !important;
  }
  .bg-\\[\\#f7f8ff\\] {
    background-color: #f7f8ff !important;
  }
  .bg-\\[\\#f8fafc\\] {
    background-color: #f8fafc !important;
  }
  .bg-\\[\\#fbbf24\\] {
    background-color: #fbbf24 !important;
  }
  .bg-\\[\\#fbfbfd\\] {
    background-color: #fbfbfd !important;
  }
  .bg-\\[\\#fef3c7\\] {
    background-color: #fef3c7 !important;
  }
  .bg-\\[\\#fffbeb\\] {
    background-color: #fffbeb !important;
  }
  .bg-gray-50 {
    background-color: var(--color-gray-50) !important;
  }
  .bg-gray-100 {
    background-color: var(--color-gray-100) !important;
  }
  .bg-gray-200 {
    background-color: var(--color-gray-200) !important;
  }
  .bg-gray-300 {
    background-color: var(--color-gray-300) !important;
  }
  .bg-gray-900 {
    background-color: var(--color-gray-900) !important;
  }
  .bg-green-50 {
    background-color: var(--color-green-50) !important;
  }
  .bg-green-500 {
    background-color: var(--color-green-500) !important;
  }
  .bg-red-50 {
    background-color: var(--color-red-50) !important;
  }
  .bg-red-200 {
    background-color: var(--color-red-200) !important;
  }
  .bg-red-600 {
    background-color: var(--color-red-600) !important;
  }
  .bg-teal-50 {
    background-color: var(--color-teal-50) !important;
  }
  .bg-teal-700 {
    background-color: var(--color-teal-700) !important;
  }
  .bg-transparent {
    background-color: transparent !important;
  }
  .bg-white {
    background-color: var(--color-white) !important;
  }
  .bg-white\\/70 {
    background-color: color-mix(in srgb, #fff 70%, transparent) !important;
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--color-white) 70%, transparent) !important;
    }
  }
  .bg-white\\/90 {
    background-color: color-mix(in srgb, #fff 90%, transparent) !important;
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--color-white) 90%, transparent) !important;
    }
  }
  .bg-gradient-to-br {
    --tw-gradient-position: to bottom right in oklab !important;
    background-image: linear-gradient(var(--tw-gradient-stops)) !important;
  }
  .from-\\[\\#ede9ff\\] {
    --tw-gradient-from: #ede9ff !important;
    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position)) !important;
  }
  .from-orange-200 {
    --tw-gradient-from: var(--color-orange-200) !important;
    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position)) !important;
  }
  .to-purple-200 {
    --tw-gradient-to: var(--color-purple-200) !important;
    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position)) !important;
  }
  .to-white {
    --tw-gradient-to: var(--color-white) !important;
    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position)) !important;
  }
  .object-cover {
    object-fit: cover !important;
  }
  .p-1 {
    padding: calc(var(--spacing) * 1) !important;
  }
  .p-1\\.5 {
    padding: calc(var(--spacing) * 1.5) !important;
  }
  .p-2 {
    padding: calc(var(--spacing) * 2) !important;
  }
  .p-3 {
    padding: calc(var(--spacing) * 3) !important;
  }
  .p-4 {
    padding: calc(var(--spacing) * 4) !important;
  }
  .p-5 {
    padding: calc(var(--spacing) * 5) !important;
  }
  .p-6 {
    padding: calc(var(--spacing) * 6) !important;
  }
  .px-1 {
    padding-inline: calc(var(--spacing) * 1) !important;
  }
  .px-1\\.5 {
    padding-inline: calc(var(--spacing) * 1.5) !important;
  }
  .px-2 {
    padding-inline: calc(var(--spacing) * 2) !important;
  }
  .px-2\\.5 {
    padding-inline: calc(var(--spacing) * 2.5) !important;
  }
  .px-3 {
    padding-inline: calc(var(--spacing) * 3) !important;
  }
  .px-4 {
    padding-inline: calc(var(--spacing) * 4) !important;
  }
  .px-5 {
    padding-inline: calc(var(--spacing) * 5) !important;
  }
  .px-6 {
    padding-inline: calc(var(--spacing) * 6) !important;
  }
  .px-7 {
    padding-inline: calc(var(--spacing) * 7) !important;
  }
  .px-8 {
    padding-inline: calc(var(--spacing) * 8) !important;
  }
  .py-0 {
    padding-block: calc(var(--spacing) * 0) !important;
  }
  .py-0\\.5 {
    padding-block: calc(var(--spacing) * 0.5) !important;
  }
  .py-1 {
    padding-block: calc(var(--spacing) * 1) !important;
  }
  .py-1\\.5 {
    padding-block: calc(var(--spacing) * 1.5) !important;
  }
  .py-2 {
    padding-block: calc(var(--spacing) * 2) !important;
  }
  .py-2\\.5 {
    padding-block: calc(var(--spacing) * 2.5) !important;
  }
  .py-3 {
    padding-block: calc(var(--spacing) * 3) !important;
  }
  .py-4 {
    padding-block: calc(var(--spacing) * 4) !important;
  }
  .py-4\\! {
    padding-block: calc(var(--spacing) * 4) !important;
  }
  .py-5 {
    padding-block: calc(var(--spacing) * 5) !important;
  }
  .py-6 {
    padding-block: calc(var(--spacing) * 6) !important;
  }
  .pt-5 {
    padding-top: calc(var(--spacing) * 5) !important;
  }
  .pr-2 {
    padding-right: calc(var(--spacing) * 2) !important;
  }
  .pb-4 {
    padding-bottom: calc(var(--spacing) * 4) !important;
  }
  .pb-8 {
    padding-bottom: calc(var(--spacing) * 8) !important;
  }
  .pb-12 {
    padding-bottom: calc(var(--spacing) * 12) !important;
  }
  .pl-\\[var\\(--layer-indent\\)\\] {
    padding-left: var(--layer-indent) !important;
  }
  .text-center {
    text-align: center !important;
  }
  .text-left {
    text-align: left !important;
  }
  .text-right {
    text-align: right !important;
  }
  .font-mono {
    font-family: var(--font-mono) !important;
  }
  .text-2xl {
    font-size: var(--text-2xl) !important;
    line-height: var(--tw-leading, var(--text-2xl--line-height)) !important;
  }
  .text-3xl {
    font-size: var(--text-3xl) !important;
    line-height: var(--tw-leading, var(--text-3xl--line-height)) !important;
  }
  .text-4xl {
    font-size: var(--text-4xl) !important;
    line-height: var(--tw-leading, var(--text-4xl--line-height)) !important;
  }
  .text-5xl {
    font-size: var(--text-5xl) !important;
    line-height: var(--tw-leading, var(--text-5xl--line-height)) !important;
  }
  .text-lg {
    font-size: var(--text-lg) !important;
    line-height: var(--tw-leading, var(--text-lg--line-height)) !important;
  }
  .text-sm {
    font-size: var(--text-sm) !important;
    line-height: var(--tw-leading, var(--text-sm--line-height)) !important;
  }
  .text-xl {
    font-size: var(--text-xl) !important;
    line-height: var(--tw-leading, var(--text-xl--line-height)) !important;
  }
  .text-xs {
    font-size: var(--text-xs) !important;
    line-height: var(--tw-leading, var(--text-xs--line-height)) !important;
  }
  .text-\\[9px\\] {
    font-size: 9px !important;
  }
  .text-\\[10px\\] {
    font-size: 10px !important;
  }
  .text-\\[11px\\] {
    font-size: 11px !important;
  }
  .leading-4 {
    --tw-leading: calc(var(--spacing) * 4) !important;
    line-height: calc(var(--spacing) * 4) !important;
  }
  .leading-5 {
    --tw-leading: calc(var(--spacing) * 5) !important;
    line-height: calc(var(--spacing) * 5) !important;
  }
  .leading-6 {
    --tw-leading: calc(var(--spacing) * 6) !important;
    line-height: calc(var(--spacing) * 6) !important;
  }
  .leading-relaxed {
    --tw-leading: var(--leading-relaxed) !important;
    line-height: var(--leading-relaxed) !important;
  }
  .leading-tight {
    --tw-leading: var(--leading-tight) !important;
    line-height: var(--leading-tight) !important;
  }
  .font-bold {
    --tw-font-weight: var(--font-weight-bold) !important;
    font-weight: var(--font-weight-bold) !important;
  }
  .font-medium {
    --tw-font-weight: var(--font-weight-medium) !important;
    font-weight: var(--font-weight-medium) !important;
  }
  .font-semibold {
    --tw-font-weight: var(--font-weight-semibold) !important;
    font-weight: var(--font-weight-semibold) !important;
  }
  .tracking-wide {
    --tw-tracking: var(--tracking-wide) !important;
    letter-spacing: var(--tracking-wide) !important;
  }
  .text-\\[\\#0f766e\\] {
    color: #0f766e !important;
  }
  .text-\\[\\#5b35f5\\] {
    color: #5b35f5 !important;
  }
  .text-\\[\\#5eead4\\] {
    color: #5eead4 !important;
  }
  .text-\\[\\#111827\\] {
    color: #111827 !important;
  }
  .text-\\[\\#374151\\] {
    color: #374151 !important;
  }
  .text-\\[\\#a99cff\\] {
    color: #a99cff !important;
  }
  .text-\\[\\#b45309\\] {
    color: #b45309 !important;
  }
  .text-black {
    color: var(--color-black) !important;
  }
  .text-gray-100 {
    color: var(--color-gray-100) !important;
  }
  .text-gray-300 {
    color: var(--color-gray-300) !important;
  }
  .text-gray-400 {
    color: var(--color-gray-400) !important;
  }
  .text-gray-500 {
    color: var(--color-gray-500) !important;
  }
  .text-gray-600 {
    color: var(--color-gray-600) !important;
  }
  .text-gray-700 {
    color: var(--color-gray-700) !important;
  }
  .text-gray-800 {
    color: var(--color-gray-800) !important;
  }
  .text-gray-900 {
    color: var(--color-gray-900) !important;
  }
  .text-green-500 {
    color: var(--color-green-500) !important;
  }
  .text-red-300 {
    color: var(--color-red-300) !important;
  }
  .text-red-600 {
    color: var(--color-red-600) !important;
  }
  .text-red-700 {
    color: var(--color-red-700) !important;
  }
  .text-teal-800 {
    color: var(--color-teal-800) !important;
  }
  .text-transparent {
    color: transparent !important;
  }
  .text-white {
    color: var(--color-white) !important;
  }
  .uppercase {
    text-transform: uppercase !important;
  }
  .underline {
    text-decoration-line: underline !important;
  }
  .opacity-0 {
    opacity: 0% !important;
  }
  .opacity-50 {
    opacity: 50% !important;
  }
  .opacity-100 {
    opacity: 100% !important;
  }
  .shadow-2xl {
    --tw-shadow: 0 25px 50px -12px var(--tw-shadow-color, rgb(0 0 0 / 0.25)) !important;
    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow) !important;
  }
  .shadow-\\[inset_0_0_0_2px_rgba\\(248\\,113\\,113\\,0\\.75\\)\\] {
    --tw-shadow: inset 0 0 0 2px var(--tw-shadow-color, rgba(248,113,113,0.75)) !important;
    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow) !important;
  }
  .shadow-sm {
    --tw-shadow: 0 1px 3px 0 var(--tw-shadow-color, rgb(0 0 0 / 0.1)), 0 1px 2px -1px var(--tw-shadow-color, rgb(0 0 0 / 0.1)) !important;
    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow) !important;
  }
  .shadow-xl {
    --tw-shadow: 0 20px 25px -5px var(--tw-shadow-color, rgb(0 0 0 / 0.1)), 0 8px 10px -6px var(--tw-shadow-color, rgb(0 0 0 / 0.1)) !important;
    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow) !important;
  }
  .ring-2 {
    --tw-ring-shadow: var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color, currentcolor) !important;
    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow) !important;
  }
  .ring-\\[\\#5b35f5\\] {
    --tw-ring-color: #5b35f5 !important;
  }
  .ring-\\[\\#5b35f5\\]\\/30 {
    --tw-ring-color: color-mix(in oklab, #5b35f5 30%, transparent) !important;
  }
  .ring-offset-1 {
    --tw-ring-offset-width: 1px !important;
    --tw-ring-offset-shadow: var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color) !important;
  }
  .outline {
    outline-style: var(--tw-outline-style) !important;
    outline-width: 1px !important;
  }
  .outline-1 {
    outline-style: var(--tw-outline-style) !important;
    outline-width: 1px !important;
  }
  .outline-\\[\\#f59e0b\\]\\/40 {
    outline-color: color-mix(in oklab, #f59e0b 40%, transparent) !important;
  }
  .outline-green-200 {
    outline-color: var(--color-green-200) !important;
  }
  .transition {
    transition-property: color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to, opacity, box-shadow, transform, translate, scale, rotate, filter, -webkit-backdrop-filter, backdrop-filter, display, content-visibility, overlay, pointer-events !important;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function)) !important;
    transition-duration: var(--tw-duration, var(--default-transition-duration)) !important;
  }
  .transition-\\[width\\] {
    transition-property: width !important;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function)) !important;
    transition-duration: var(--tw-duration, var(--default-transition-duration)) !important;
  }
  .transition-transform {
    transition-property: transform, translate, scale, rotate !important;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function)) !important;
    transition-duration: var(--tw-duration, var(--default-transition-duration)) !important;
  }
  .duration-300 {
    --tw-duration: 300ms !important;
    transition-duration: 300ms !important;
  }
  .outline-none {
    --tw-outline-style: none !important;
    outline-style: none !important;
  }
  .\\[writing-mode\\:vertical-rl\\] {
    writing-mode: vertical-rl !important;
  }
  .focus-within\\:border-\\[\\#0f766e\\] {
    &:focus-within {
      border-color: #0f766e !important;
    }
  }
  .focus-within\\:ring-2 {
    &:focus-within {
      --tw-ring-shadow: var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color, currentcolor) !important;
      box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow) !important;
    }
  }
  .focus-within\\:ring-\\[\\#0f766e\\]\\/10 {
    &:focus-within {
      --tw-ring-color: color-mix(in oklab, #0f766e 10%, transparent) !important;
    }
  }
  .hover\\:border-\\[\\#0f766e\\] {
    &:hover {
      @media (hover: hover) {
        border-color: #0f766e !important;
      }
    }
  }
  .hover\\:border-gray-300 {
    &:hover {
      @media (hover: hover) {
        border-color: var(--color-gray-300) !important;
      }
    }
  }
  .hover\\:bg-\\[\\#0d9488\\] {
    &:hover {
      @media (hover: hover) {
        background-color: #0d9488 !important;
      }
    }
  }
  .hover\\:bg-\\[\\#4c2ee0\\] {
    &:hover {
      @media (hover: hover) {
        background-color: #4c2ee0 !important;
      }
    }
  }
  .hover\\:bg-\\[\\#115e59\\] {
    &:hover {
      @media (hover: hover) {
        background-color: #115e59 !important;
      }
    }
  }
  .hover\\:bg-\\[\\#ccfbf1\\] {
    &:hover {
      @media (hover: hover) {
        background-color: #ccfbf1 !important;
      }
    }
  }
  .hover\\:bg-\\[\\#ebe6ff\\] {
    &:hover {
      @media (hover: hover) {
        background-color: #ebe6ff !important;
      }
    }
  }
  .hover\\:bg-\\[\\#f59e0b\\] {
    &:hover {
      @media (hover: hover) {
        background-color: #f59e0b !important;
      }
    }
  }
  .hover\\:bg-black {
    &:hover {
      @media (hover: hover) {
        background-color: var(--color-black) !important;
      }
    }
  }
  .hover\\:bg-gray-50 {
    &:hover {
      @media (hover: hover) {
        background-color: var(--color-gray-50) !important;
      }
    }
  }
  .hover\\:bg-gray-100 {
    &:hover {
      @media (hover: hover) {
        background-color: var(--color-gray-100) !important;
      }
    }
  }
  .hover\\:bg-red-50 {
    &:hover {
      @media (hover: hover) {
        background-color: var(--color-red-50) !important;
      }
    }
  }
  .hover\\:bg-white {
    &:hover {
      @media (hover: hover) {
        background-color: var(--color-white) !important;
      }
    }
  }
  .hover\\:bg-white\\/5 {
    &:hover {
      @media (hover: hover) {
        background-color: color-mix(in srgb, #fff 5%, transparent) !important;
        @supports (color: color-mix(in lab, red, red)) {
          background-color: color-mix(in oklab, var(--color-white) 5%, transparent) !important;
        }
      }
    }
  }
  .hover\\:bg-white\\/70 {
    &:hover {
      @media (hover: hover) {
        background-color: color-mix(in srgb, #fff 70%, transparent) !important;
        @supports (color: color-mix(in lab, red, red)) {
          background-color: color-mix(in oklab, var(--color-white) 70%, transparent) !important;
        }
      }
    }
  }
  .hover\\:text-\\[\\#0f766e\\] {
    &:hover {
      @media (hover: hover) {
        color: #0f766e !important;
      }
    }
  }
  .hover\\:text-gray-700 {
    &:hover {
      @media (hover: hover) {
        color: var(--color-gray-700) !important;
      }
    }
  }
  .hover\\:text-gray-900 {
    &:hover {
      @media (hover: hover) {
        color: var(--color-gray-900) !important;
      }
    }
  }
  .hover\\:underline {
    &:hover {
      @media (hover: hover) {
        text-decoration-line: underline !important;
      }
    }
  }
  .focus\\:border-\\[\\#0f766e\\] {
    &:focus {
      border-color: #0f766e !important;
    }
  }
  .focus\\:border-\\[\\#5b35f5\\] {
    &:focus {
      border-color: #5b35f5 !important;
    }
  }
  .focus\\:ring-2 {
    &:focus {
      --tw-ring-shadow: var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color, currentcolor) !important;
      box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow) !important;
    }
  }
  .focus\\:ring-\\[\\#0f766e\\]\\/10 {
    &:focus {
      --tw-ring-color: color-mix(in oklab, #0f766e 10%, transparent) !important;
    }
  }
  .focus\\:ring-\\[\\#5b35f5\\]\\/10 {
    &:focus {
      --tw-ring-color: color-mix(in oklab, #5b35f5 10%, transparent) !important;
    }
  }
  .enabled\\:hover\\:bg-gray-50 {
    &:enabled {
      &:hover {
        @media (hover: hover) {
          background-color: var(--color-gray-50) !important;
        }
      }
    }
  }
  .enabled\\:hover\\:bg-teal-800 {
    &:enabled {
      &:hover {
        @media (hover: hover) {
          background-color: var(--color-teal-800) !important;
        }
      }
    }
  }
  .disabled\\:cursor-not-allowed {
    &:disabled {
      cursor: not-allowed !important;
    }
  }
  .disabled\\:bg-gray-50 {
    &:disabled {
      background-color: var(--color-gray-50) !important;
    }
  }
  .disabled\\:bg-gray-100 {
    &:disabled {
      background-color: var(--color-gray-100) !important;
    }
  }
  .disabled\\:text-gray-400 {
    &:disabled {
      color: var(--color-gray-400) !important;
    }
  }
  .disabled\\:opacity-40 {
    &:disabled {
      opacity: 40% !important;
    }
  }
  .md\\:flex {
    @media (width >= 48rem) {
      display: flex !important;
    }
  }
}
@property --tw-translate-x {
  syntax: "*";
  inherits: false;
  initial-value: 0;
}
@property --tw-translate-y {
  syntax: "*";
  inherits: false;
  initial-value: 0;
}
@property --tw-translate-z {
  syntax: "*";
  inherits: false;
  initial-value: 0;
}
@property --tw-scale-x {
  syntax: "*";
  inherits: false;
  initial-value: 1;
}
@property --tw-scale-y {
  syntax: "*";
  inherits: false;
  initial-value: 1;
}
@property --tw-scale-z {
  syntax: "*";
  inherits: false;
  initial-value: 1;
}
@property --tw-space-y-reverse {
  syntax: "*";
  inherits: false;
  initial-value: 0;
}
@property --tw-space-x-reverse {
  syntax: "*";
  inherits: false;
  initial-value: 0;
}
@property --tw-divide-x-reverse {
  syntax: "*";
  inherits: false;
  initial-value: 0;
}
@property --tw-border-style {
  syntax: "*";
  inherits: false;
  initial-value: solid;
}
@property --tw-gradient-position {
  syntax: "*";
  inherits: false;
}
@property --tw-gradient-from {
  syntax: "<color>";
  inherits: false;
  initial-value: #0000;
}
@property --tw-gradient-via {
  syntax: "<color>";
  inherits: false;
  initial-value: #0000;
}
@property --tw-gradient-to {
  syntax: "<color>";
  inherits: false;
  initial-value: #0000;
}
@property --tw-gradient-stops {
  syntax: "*";
  inherits: false;
}
@property --tw-gradient-via-stops {
  syntax: "*";
  inherits: false;
}
@property --tw-gradient-from-position {
  syntax: "<length-percentage>";
  inherits: false;
  initial-value: 0%;
}
@property --tw-gradient-via-position {
  syntax: "<length-percentage>";
  inherits: false;
  initial-value: 50%;
}
@property --tw-gradient-to-position {
  syntax: "<length-percentage>";
  inherits: false;
  initial-value: 100%;
}
@property --tw-leading {
  syntax: "*";
  inherits: false;
}
@property --tw-font-weight {
  syntax: "*";
  inherits: false;
}
@property --tw-tracking {
  syntax: "*";
  inherits: false;
}
@property --tw-shadow {
  syntax: "*";
  inherits: false;
  initial-value: 0 0 #0000;
}
@property --tw-shadow-color {
  syntax: "*";
  inherits: false;
}
@property --tw-shadow-alpha {
  syntax: "<percentage>";
  inherits: false;
  initial-value: 100%;
}
@property --tw-inset-shadow {
  syntax: "*";
  inherits: false;
  initial-value: 0 0 #0000;
}
@property --tw-inset-shadow-color {
  syntax: "*";
  inherits: false;
}
@property --tw-inset-shadow-alpha {
  syntax: "<percentage>";
  inherits: false;
  initial-value: 100%;
}
@property --tw-ring-color {
  syntax: "*";
  inherits: false;
}
@property --tw-ring-shadow {
  syntax: "*";
  inherits: false;
  initial-value: 0 0 #0000;
}
@property --tw-inset-ring-color {
  syntax: "*";
  inherits: false;
}
@property --tw-inset-ring-shadow {
  syntax: "*";
  inherits: false;
  initial-value: 0 0 #0000;
}
@property --tw-ring-inset {
  syntax: "*";
  inherits: false;
}
@property --tw-ring-offset-width {
  syntax: "<length>";
  inherits: false;
  initial-value: 0px;
}
@property --tw-ring-offset-color {
  syntax: "*";
  inherits: false;
  initial-value: #fff;
}
@property --tw-ring-offset-shadow {
  syntax: "*";
  inherits: false;
  initial-value: 0 0 #0000;
}
@property --tw-outline-style {
  syntax: "*";
  inherits: false;
  initial-value: solid;
}
@property --tw-duration {
  syntax: "*";
  inherits: false;
}
@layer properties {
  @supports ((-webkit-hyphens: none) and (not (margin-trim: inline))) or ((-moz-orient: inline) and (not (color:rgb(from red r g b)))) {
    *, ::before, ::after, ::backdrop {
      --tw-translate-x: 0;
      --tw-translate-y: 0;
      --tw-translate-z: 0;
      --tw-scale-x: 1;
      --tw-scale-y: 1;
      --tw-scale-z: 1;
      --tw-space-y-reverse: 0;
      --tw-space-x-reverse: 0;
      --tw-divide-x-reverse: 0;
      --tw-border-style: solid;
      --tw-gradient-position: initial;
      --tw-gradient-from: #0000;
      --tw-gradient-via: #0000;
      --tw-gradient-to: #0000;
      --tw-gradient-stops: initial;
      --tw-gradient-via-stops: initial;
      --tw-gradient-from-position: 0%;
      --tw-gradient-via-position: 50%;
      --tw-gradient-to-position: 100%;
      --tw-leading: initial;
      --tw-font-weight: initial;
      --tw-tracking: initial;
      --tw-shadow: 0 0 #0000;
      --tw-shadow-color: initial;
      --tw-shadow-alpha: 100%;
      --tw-inset-shadow: 0 0 #0000;
      --tw-inset-shadow-color: initial;
      --tw-inset-shadow-alpha: 100%;
      --tw-ring-color: initial;
      --tw-ring-shadow: 0 0 #0000;
      --tw-inset-ring-color: initial;
      --tw-inset-ring-shadow: 0 0 #0000;
      --tw-ring-inset: initial;
      --tw-ring-offset-width: 0px;
      --tw-ring-offset-color: #fff;
      --tw-ring-offset-shadow: 0 0 #0000;
      --tw-outline-style: solid;
      --tw-duration: initial;
    }
  }
}
`;
        document.head.append(element);
      }
    }
  });

  // src/components/ExportFramePanel.tsx
  function ExportFramePanel({
    snapshot,
    isOpen,
    onClose
  }) {
    return /* @__PURE__ */ k(
      "aside",
      {
        class: `fixed right-0 top-0 z-[60] flex h-screen w-[min(420px,100vw)] flex-col border-l border-[#e5e7eb] bg-white shadow-2xl transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`,
        "aria-hidden": !isOpen
      },
      /* @__PURE__ */ k("header", { class: "flex h-16 shrink-0 items-center justify-between border-b border-[#e5e7eb] px-5" }, /* @__PURE__ */ k("div", { class: "min-w-0" }, /* @__PURE__ */ k("h2", { class: "truncate text-sm font-bold text-gray-900" }, "Export Frame"), /* @__PURE__ */ k("p", { class: "mt-0.5 text-xs text-gray-500" }, "Applied responsive changes snapshot")), /* @__PURE__ */ k(
        "button",
        {
          type: "button",
          onClick: onClose,
          class: "rounded-lg px-2 py-1 text-sm font-bold text-gray-400 transition hover:bg-gray-100 hover:text-gray-700",
          "aria-label": "Close export panel"
        },
        "X"
      )),
      snapshot == null ? /* @__PURE__ */ k("div", { class: "flex min-h-0 flex-1 items-center justify-center px-8 text-center" }, /* @__PURE__ */ k("div", null, /* @__PURE__ */ k("h3", { class: "text-sm font-bold text-gray-900" }, "No export yet"), /* @__PURE__ */ k("p", { class: "mt-2 text-sm leading-6 text-gray-500" }, "Generate a responsive frame to see the applied output here."))) : /* @__PURE__ */ k("div", { class: "min-h-0 flex-1 overflow-auto" }, /* @__PURE__ */ k("section", { class: "border-b border-[#e5e7eb] p-5" }, /* @__PURE__ */ k("div", { class: "grid grid-cols-2 gap-3" }, /* @__PURE__ */ k(SummaryItem, { label: "Target", value: snapshot.settings.targetDevice }), /* @__PURE__ */ k(SummaryItem, { label: "Source", value: snapshot.frame.name }), /* @__PURE__ */ k(SummaryItem, { label: "Children", value: String(snapshot.frame.children.length) }))), /* @__PURE__ */ k("section", { class: "border-b border-[#e5e7eb] p-5" }, /* @__PURE__ */ k("h3", { class: "text-xs font-bold uppercase tracking-wide text-gray-500" }, "Applied Changes"), /* @__PURE__ */ k("div", { class: "mt-3 space-y-2" }, snapshot.settings.options.filter((option) => option.enabled).map((option) => /* @__PURE__ */ k(
        "div",
        {
          key: option.id,
          class: "rounded-lg border border-[#e5e7eb] bg-gray-50 px-3 py-2"
        },
        /* @__PURE__ */ k("p", { class: "text-xs font-semibold text-gray-900" }, option.label),
        /* @__PURE__ */ k("p", { class: "mt-0.5 text-xs text-gray-500" }, option.description)
      )))))
    );
  }
  function SummaryItem({
    label,
    value
  }) {
    return /* @__PURE__ */ k("div", { class: "rounded-lg border border-[#e5e7eb] bg-gray-50 px-3 py-2" }, /* @__PURE__ */ k("p", { class: "text-[10px] font-bold uppercase tracking-wide text-gray-400" }, label), /* @__PURE__ */ k("p", { class: "mt-1 truncate text-xs font-semibold text-gray-900" }, value));
  }
  var init_ExportFramePanel = __esm({
    "src/components/ExportFramePanel.tsx"() {
      "use strict";
      init_preact_module();
    }
  });

  // src/components/LayoutRules.tsx
  function LayoutRules({ value, onChange }) {
    function update(nextValue) {
      onChange(__spreadValues(__spreadValues({}, value), nextValue));
    }
    return /* @__PURE__ */ k("div", { class: "rounded-2xl border border-[#e5e7eb] bg-white p-4 shadow-sm" }, /* @__PURE__ */ k(
      RuleHeader,
      {
        title: "Layout conversion",
        description: "Choose how Auto Layout groups should change direction in generated frames."
      }
    ), /* @__PURE__ */ k(ControlGroup, { label: "Direction" }, /* @__PURE__ */ k(
      SegmentedControl,
      {
        value: value.conversionDirection,
        columns: 2,
        options: [
          { value: "row-to-column", label: "Row > Column" },
          { value: "column-to-row", label: "Column > Row" }
        ],
        onChange: (conversionDirection) => update({ conversionDirection })
      }
    )), /* @__PURE__ */ k("div", { class: "mt-3" }, /* @__PURE__ */ k(ControlGroup, { label: "Trigger" }, /* @__PURE__ */ k(
      SegmentedControl,
      {
        value: value.rowToColumnMode,
        options: [
          { value: "auto", label: "Auto" },
          { value: "always", label: "Always" },
          { value: "never", label: "Never" }
        ],
        onChange: (rowToColumnMode) => update({ rowToColumnMode })
      }
    ))), /* @__PURE__ */ k("div", { class: "mt-3 rounded-xl border border-[#e5e7eb] bg-[#f8fafc] p-3" }, /* @__PURE__ */ k("div", { class: "grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2" }, /* @__PURE__ */ k(DirectionPreviewBox, { label: value.conversionDirection === "row-to-column" ? "Row" : "Column" }), /* @__PURE__ */ k("span", { class: "text-center text-xs font-bold text-gray-400" }, "to"), /* @__PURE__ */ k(DirectionPreviewBox, { label: value.conversionDirection === "row-to-column" ? "Column" : "Row", active: true }))), /* @__PURE__ */ k("div", { class: "mt-3 grid grid-cols-2 gap-2" }, /* @__PURE__ */ k(
      NumberField,
      {
        label: value.conversionDirection === "row-to-column" ? "Max width" : "Min width",
        value: value.rowToColumnBreakpoint,
        suffix: "px",
        min: 240,
        max: 1600,
        onChange: (rowToColumnBreakpoint) => update({ rowToColumnBreakpoint })
      }
    ), /* @__PURE__ */ k(
      NumberField,
      {
        label: "Gap",
        value: value.stackGap,
        suffix: "px",
        min: 0,
        max: 96,
        onChange: (stackGap) => update({ stackGap })
      }
    )), /* @__PURE__ */ k("div", { class: "mt-3 grid grid-cols-[minmax(0,1fr)_130px] gap-2" }, /* @__PURE__ */ k(ControlGroup, { label: "Child align" }, /* @__PURE__ */ k(
      SegmentedControl,
      {
        value: value.stackAlignment,
        options: [
          { value: "start", label: "Start" },
          { value: "center", label: "Center" },
          { value: "stretch", label: "Fill" }
        ],
        onChange: (stackAlignment) => update({ stackAlignment })
      }
    )), /* @__PURE__ */ k(
      NumberField,
      {
        label: "Frame pad",
        value: value.outputPadding,
        suffix: "px",
        min: 0,
        max: 80,
        onChange: (outputPadding) => update({ outputPadding })
      }
    )), /* @__PURE__ */ k("div", { class: "my-4 h-px bg-[#e5e7eb]" }), /* @__PURE__ */ k(
      RuleHeader,
      {
        title: "Text settings",
        description: "Control how typography adapts in generated layouts."
      }
    ), /* @__PURE__ */ k(
      SegmentedControl,
      {
        value: value.textScaleMode,
        options: [
          { value: "preserve", label: "Keep" },
          { value: "scale", label: "Scale" },
          { value: "clamp", label: "Clamp" }
        ],
        onChange: (textScaleMode) => update({ textScaleMode })
      }
    ), /* @__PURE__ */ k("div", { class: "mt-3 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-2" }, /* @__PURE__ */ k(
      NumberField,
      {
        label: "Minimum text",
        value: value.minimumTextSize,
        suffix: "px",
        min: 8,
        max: 24,
        onChange: (minimumTextSize) => update({ minimumTextSize })
      }
    ), /* @__PURE__ */ k(
      "button",
      {
        type: "button",
        onClick: () => update({ tightenLineHeight: !value.tightenLineHeight }),
        class: `h-10 rounded-xl border px-3 text-xs font-semibold transition ${value.tightenLineHeight ? "border-[#d97706] bg-[#fbbf24] text-[#111827] shadow-sm" : "border-[#cbd5e1] bg-[#f8fafc] text-gray-600 hover:border-gray-300 hover:bg-white"}`
      },
      "Line height"
    )));
  }
  function DirectionPreviewBox({
    label,
    active = false
  }) {
    return /* @__PURE__ */ k("div", { class: `rounded-lg border px-2 py-2 ${active ? "border-[#0f766e] bg-white" : "border-[#e5e7eb] bg-white/70"}` }, /* @__PURE__ */ k("p", { class: `text-center text-[10px] font-bold uppercase ${active ? "text-[#0f766e]" : "text-gray-400"}` }, label), /* @__PURE__ */ k("div", { class: `mt-2 flex gap-1 ${label === "Column" ? "flex-col" : "items-center"}` }, [0, 1, 2].map((item) => /* @__PURE__ */ k(
      "span",
      {
        key: item,
        class: `block rounded-sm ${active ? "bg-[#0f766e]" : "bg-gray-300"} ${label === "Column" ? "h-1.5 w-full" : "h-5 flex-1"}`
      }
    ))));
  }
  function RuleHeader({
    title,
    description
  }) {
    return /* @__PURE__ */ k("div", { class: "mb-3" }, /* @__PURE__ */ k("h3", { class: "text-xs font-bold text-gray-900" }, title), /* @__PURE__ */ k("p", { class: "mt-0.5 text-[11px] leading-5 text-gray-500" }, description));
  }
  function ControlGroup({
    label,
    children
  }) {
    return /* @__PURE__ */ k("label", { class: "block" }, /* @__PURE__ */ k("span", { class: "mb-1 block text-[11px] font-semibold text-gray-600" }, label), children);
  }
  function SegmentedControl({
    value,
    options,
    columns = 3,
    onChange
  }) {
    return /* @__PURE__ */ k("div", { class: `grid gap-1.5 rounded-2xl border border-[#cbd5e1] bg-[#e2e8f0] p-1.5 ${columns === 2 ? "grid-cols-2" : "grid-cols-3"}` }, options.map((option) => {
      const isSelected = option.value === value;
      return /* @__PURE__ */ k(
        "button",
        {
          key: option.value,
          type: "button",
          onClick: () => onChange(option.value),
          class: `min-h-9 rounded-xl px-4 py-2 text-sm font-semibold transition ${isSelected ? "bg-[#fbbf24] text-[#111827] shadow-sm" : "text-gray-600 hover:bg-white/70 hover:text-gray-900"}`
        },
        option.label
      );
    }));
  }
  function NumberField({
    label,
    value,
    suffix,
    min,
    max,
    onChange
  }) {
    return /* @__PURE__ */ k("label", { class: "block" }, /* @__PURE__ */ k("span", { class: "mb-1 block text-[11px] font-semibold text-gray-600" }, label), /* @__PURE__ */ k("div", { class: "flex h-11 overflow-hidden rounded-xl border border-[#e5e7eb] bg-white focus-within:border-[#0f766e] focus-within:ring-2 focus-within:ring-[#0f766e]/10" }, /* @__PURE__ */ k(
      "input",
      {
        type: "number",
        value: String(value),
        min,
        max,
        onInput: (event) => {
          const nextValue = Number(event.currentTarget.value);
          if (Number.isFinite(nextValue)) {
            onChange(Math.min(max, Math.max(min, nextValue)));
          }
        },
        class: "min-w-0 flex-1 border-0 bg-transparent px-4 text-sm font-semibold text-gray-900 outline-none"
      }
    ), /* @__PURE__ */ k("span", { class: "flex w-9 shrink-0 items-center justify-center bg-gray-50 text-[11px] font-semibold text-gray-500" }, suffix)));
  }
  var defaultLayoutRules;
  var init_LayoutRules = __esm({
    "src/components/LayoutRules.tsx"() {
      "use strict";
      init_preact_module();
      defaultLayoutRules = {
        conversionDirection: "row-to-column",
        rowToColumnMode: "auto",
        rowToColumnBreakpoint: 480,
        stackGap: 16,
        outputPadding: 16,
        stackAlignment: "stretch",
        textScaleMode: "clamp",
        minimumTextSize: 12,
        tightenLineHeight: true
      };
    }
  });

  // assets/logo_small.jpg
  var logo_small_default;
  var init_logo_small = __esm({
    "assets/logo_small.jpg"() {
      logo_small_default = "data:image/jpeg;base64,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";
    }
  });

  // src/components/ResponsiveSidebar.tsx
  function createDefaultConversionOptions() {
    return [
      {
        id: "auto-stack",
        label: "Convert layout direction",
        description: "Switch rows and columns based on the layout rules.",
        enabled: true
      },
      {
        id: "resize-widths",
        label: "Scale layout reference",
        description: "Use relative width changes for generated layers.",
        enabled: true
      },
      {
        id: "preserve-text",
        label: "Preserve text",
        description: "Keep original text and layer names.",
        enabled: true
      },
      {
        id: "create-copy",
        label: "Create new frame",
        description: "Generate beside the selected frame.",
        enabled: true
      }
    ];
  }
  function getTargetDeviceWidth(targetDevice, sourceWidth) {
    const safeSourceWidth = Math.max(1, Math.round(sourceWidth));
    if (targetDevice === "mobile") {
      return Math.max(1, Math.round(safeSourceWidth * mobileWidthScale));
    }
    if (targetDevice === "custom") {
      return safeSourceWidth;
    }
    return targetDeviceWidths[targetDevice];
  }
  function ResponsiveSidebar({
    importedFrame,
    workingFrame,
    importError,
    jsonImportError,
    isJsonImportedFrame,
    targetDevice,
    layoutRules,
    onTargetDeviceChange,
    onLayoutRulesChange,
    onClearFrame,
    onImportJson,
    onGenerate
  }) {
    const [options, setOptions] = d2(createDefaultConversionOptions);
    const [isJsonImportOpen, setIsJsonImportOpen] = d2(false);
    const [jsonImportValue, setJsonImportValue] = d2("");
    function toggleOption(id) {
      setOptions(
        (current) => current.map(
          (option) => option.id === id ? __spreadProps(__spreadValues({}, option), {
            enabled: !option.enabled
          }) : option
        )
      );
    }
    function importSelectedFrame() {
      parent.postMessage(
        {
          pluginMessage: {
            type: "import-selected-frame"
          }
        },
        "*"
      );
    }
    function generateResponsiveFrame() {
      var _a;
      const frameForGeneration = workingFrame != null ? workingFrame : importedFrame;
      if (frameForGeneration == null) {
        return;
      }
      const importedWidth = Math.max(1, Math.round((_a = importedFrame == null ? void 0 : importedFrame.geometry.width) != null ? _a : frameForGeneration.geometry.width));
      const targetWidth = getTargetDeviceWidth(targetDevice, importedWidth);
      const payload = {
        targetDevice,
        sourceWidth: importedWidth,
        screenWidth: targetWidth,
        sourceFrame: isJsonImportedFrame ? null : frameForGeneration,
        layoutRules,
        options
      };
      if (!isJsonImportedFrame) {
        parent.postMessage(
          {
            pluginMessage: {
              type: "generate-responsive-frame",
              payload
            }
          },
          "*"
        );
      } else {
        parent.postMessage(
          {
            pluginMessage: {
              type: "create-export-frame-from-json",
              payload: {
                frame: frameForGeneration,
                screenWidth: targetWidth,
                layoutRules
              }
            }
          },
          "*"
        );
      }
      onGenerate(payload);
    }
    return /* @__PURE__ */ k("aside", { class: "flex h-full w-[360px] flex-col border-r border-[#e5e7eb] bg-white shadow-sm" }, /* @__PURE__ */ k(SidebarHeader, null), /* @__PURE__ */ k("div", { class: "min-h-0 flex-1 overflow-auto px-5 py-5" }, /* @__PURE__ */ k(StepTitle, { index: 1, title: "Source Frame" }), /* @__PURE__ */ k(
      SourceFrameCard,
      {
        frame: importedFrame,
        error: importError,
        onImport: importSelectedFrame,
        onClear: onClearFrame
      }
    ), /* @__PURE__ */ k(StepTitle, { index: 2, title: "Target Device", className: "mt-7" }), /* @__PURE__ */ k(
      DeviceSelector,
      {
        value: targetDevice,
        onChange: onTargetDeviceChange
      }
    ), /* @__PURE__ */ k(StepTitle, { index: 3, title: "Layout Rules", className: "mt-7" }), /* @__PURE__ */ k(
      LayoutRules,
      {
        value: layoutRules,
        onChange: onLayoutRulesChange
      }
    )), /* @__PURE__ */ k("div", { class: "border-t border-[#e5e7eb] bg-white p-5" }, /* @__PURE__ */ k(
      "button",
      {
        type: "button",
        onClick: generateResponsiveFrame,
        disabled: workingFrame == null && importedFrame == null,
        class: `flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold shadow-sm transition ${workingFrame == null && importedFrame == null ? "cursor-not-allowed bg-gray-200 text-gray-400" : "bg-[#0f766e] text-white hover:bg-[#115e59]"}`
      },
      /* @__PURE__ */ k("span", null, "\u2726"),
      isJsonImportedFrame ? "Update Export Wireframe" : "Generate Responsive Frame"
    ), /* @__PURE__ */ k("p", { class: "mt-3 text-center text-xs leading-relaxed text-gray-500" }, isJsonImportedFrame ? "The pasted JSON is the editable export wireframe." : "A new editable frame will be created next to your selected frame.")));
  }
  function SidebarHeader() {
    return /* @__PURE__ */ k("header", { class: "flex h-16 items-center justify-between border-b border-[#e5e7eb] px-5" }, /* @__PURE__ */ k("div", { class: "flex items-center gap-3" }, /* @__PURE__ */ k(
      "img",
      {
        src: logo_small_default,
        alt: "",
        "aria-hidden": "true",
        class: "h-9 w-9 shrink-0 rounded-xl object-cover"
      }
    ), /* @__PURE__ */ k("div", null, /* @__PURE__ */ k("h1", { class: "text-sm font-bold text-gray-900" }, "Responsive Studio"), /* @__PURE__ */ k("p", { class: "text-xs text-gray-500" }, "Wireframe layout converter"))), /* @__PURE__ */ k(
      "button",
      {
        type: "button",
        "aria-label": "Close plugin",
        class: "rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
      },
      "\u2715"
    ));
  }
  function StepTitle({
    index,
    title,
    className = ""
  }) {
    return /* @__PURE__ */ k("div", { class: `mb-3 flex items-center gap-2 ${className}` }, /* @__PURE__ */ k("span", { class: "flex h-5 w-5 items-center justify-center rounded-full bg-[#0f766e] text-[10px] font-bold text-white" }, index), /* @__PURE__ */ k("h2", { class: "text-[11px] font-bold uppercase tracking-wide text-[#0f766e]" }, title));
  }
  function SourceFrameCard({
    frame,
    error,
    onImport,
    onClear
  }) {
    return /* @__PURE__ */ k("div", { class: "rounded-2xl border border-[#e5e7eb] bg-white p-4 shadow-sm" }, /* @__PURE__ */ k("div", { class: "flex items-start gap-3" }, /* @__PURE__ */ k("div", { class: "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f3f4f6] text-gray-500" }, "\u25AD"), /* @__PURE__ */ k("div", { class: "min-w-0 flex-1" }, /* @__PURE__ */ k("p", { class: "truncate text-sm font-semibold text-gray-900" }, frame == null ? "No frame imported" : frame.name), /* @__PURE__ */ k("p", { class: "mt-1 text-xs text-gray-500" }, frame == null ? "Select a Figma frame and import it." : `${Math.round(frame.geometry.width)} x ${Math.round(frame.geometry.height)} px \xB7 ${frame.children.length} children`))), error !== "" && /* @__PURE__ */ k("p", { class: "mt-3 rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-700" }, error), /* @__PURE__ */ k("div", { class: "mt-4 flex gap-2" }, /* @__PURE__ */ k(
      "button",
      {
        type: "button",
        onClick: onImport,
        class: "min-w-0  flex-1 rounded-xl border border-[#d97706] bg-[#fbbf24] px-3 py-4! text-sm font-semibold text-[#111827] shadow-sm transition hover:bg-[#f59e0b]"
      },
      "Import Selected Frame"
    ), frame != null && /* @__PURE__ */ k(
      "button",
      {
        type: "button",
        onClick: onClear,
        class: "rounded-xl border border-[#e5e7eb] bg-white px-3 py-2 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 hover:text-gray-900"
      },
      "Cancel"
    )));
  }
  function DeviceSelector({
    value,
    onChange
  }) {
    const devices = [
      { id: "mobile", label: "Mobile" },
      { id: "tablet", label: "Tablet" },
      { id: "desktop", label: "Desktop" },
      { id: "custom", label: "Custom" }
    ];
    return /* @__PURE__ */ k("div", { role: "radiogroup", "aria-label": "Target device", class: "grid grid-cols-2 gap-2" }, devices.map((device) => {
      const isSelected = value === device.id;
      return /* @__PURE__ */ k(
        "button",
        {
          key: device.id,
          type: "button",
          role: "radio",
          "aria-checked": isSelected,
          onClick: () => onChange(device.id),
          class: `flex items-center justify-start gap-2 rounded-xl border px-3 py-2.5 text-xs font-semibold transition ${isSelected ? "border-[#d97706] bg-[#fbbf24] text-[#111827] shadow-sm" : "border-[#cbd5e1] bg-[#f8fafc] text-gray-600 hover:border-gray-300 hover:bg-white"}`
        },
        /* @__PURE__ */ k(
          "span",
          {
            class: `flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition ${isSelected ? "border-[#0f766e] bg-white" : "border-gray-300 bg-white"}`,
            "aria-hidden": "true"
          },
          /* @__PURE__ */ k(
            "span",
            {
              class: `h-2 w-2 rounded-full bg-[#0f766e] transition ${isSelected ? "scale-100 opacity-100" : "scale-0 opacity-0"}`
            }
          )
        ),
        /* @__PURE__ */ k("span", { class: "min-w-0 truncate" }, device.label)
      );
    }));
  }
  var targetDeviceWidths, mobileWidthScale;
  var init_ResponsiveSidebar = __esm({
    "src/components/ResponsiveSidebar.tsx"() {
      "use strict";
      init_hooks_module();
      init_preact_module();
      init_LayoutRules();
      init_logo_small();
      targetDeviceWidths = {
        tablet: 768,
        desktop: 1440
      };
      mobileWidthScale = 0.8;
    }
  });

  // src/components/editorModel.ts
  function createVirtualGroup() {
    const id = `responsive-group-${Date.now()}-${Math.round(Math.random() * 1e5)}`;
    return {
      id,
      name: "Responsive group",
      type: "RESPONSIVE_GROUP",
      responsive: {
        isVirtualGroup: true,
        groupRole: "group",
        conversionRole: "responsive-group",
        acceptsChildren: true,
        createdByUser: true
      },
      visible: true,
      locked: false,
      geometry: createEditorGeometry(0, 0, 0, 0),
      layout: {
        isAutoLayout: true,
        layoutMode: "VERTICAL",
        itemSpacing: 0,
        primaryAxisSizingMode: "AUTO",
        counterAxisSizingMode: "AUTO"
      },
      style: {},
      children: []
    };
  }
  function isVirtualGroup(node) {
    var _a;
    return ((_a = node.responsive) == null ? void 0 : _a.isVirtualGroup) === true || node.type === "RESPONSIVE_GROUP";
  }
  function canAcceptDrop(node) {
    var _a;
    return isVirtualGroup(node) || ((_a = node.responsive) == null ? void 0 : _a.groupRole) === "root";
  }
  function getLayerKind(node) {
    if (isVirtualGroup(node)) {
      return "GROUP";
    }
    if (node.layout.isAutoLayout) {
      return "AUTO";
    }
    return node.type;
  }
  function countAutoLayoutNodes(node) {
    return (node.layout.isAutoLayout ? 1 : 0) + node.children.reduce((total, child) => {
      return total + countAutoLayoutNodes(child);
    }, 0);
  }
  function findNode(node, nodeId) {
    if (node.id === nodeId) {
      return node;
    }
    for (const child of node.children) {
      const match = findNode(child, nodeId);
      if (match != null) {
        return match;
      }
    }
    return null;
  }
  function findParentNode(node, nodeId) {
    for (const child of node.children) {
      if (child.id === nodeId) {
        return node;
      }
      const parent2 = findParentNode(child, nodeId);
      if (parent2 != null) {
        return parent2;
      }
    }
    return null;
  }
  function containsNode(node, nodeId) {
    return node.children.some((child) => child.id === nodeId || containsNode(child, nodeId));
  }
  function updateNode(node, nodeId, updater) {
    if (node.id === nodeId) {
      return updater(node);
    }
    return __spreadProps(__spreadValues({}, node), {
      children: node.children.map((child) => updateNode(child, nodeId, updater))
    });
  }
  function moveNodeIntoGroup(frame, nodeId, groupId) {
    const nodeRootPosition = getNodeRootPosition(frame, nodeId);
    const groupRootPosition = getNodeRootPosition(frame, groupId);
    if (nodeRootPosition == null || groupRootPosition == null) {
      return null;
    }
    const result = removeNode(frame, nodeId);
    if (result == null) {
      return null;
    }
    const node = updateNodePosition(
      result.node,
      nodeRootPosition.x - groupRootPosition.x,
      nodeRootPosition.y - groupRootPosition.y
    );
    return updateNode(result.frame, groupId, (group) => __spreadProps(__spreadValues({}, group), {
      children: [...group.children, node]
    }));
  }
  function deleteNodeFromFrame(frame, nodeId) {
    var _a, _b;
    if (frame.id === nodeId) {
      return null;
    }
    return (_b = (_a = removeNode(frame, nodeId)) == null ? void 0 : _a.frame) != null ? _b : null;
  }
  function wrapNodeInGroup(frame, nodeId) {
    if (frame.id === nodeId) {
      return null;
    }
    const node = findNode(frame, nodeId);
    const parent2 = findParentNode(frame, nodeId);
    if (node == null || parent2 == null) {
      return null;
    }
    const group = __spreadProps(__spreadValues({}, createVirtualGroup()), {
      name: `${node.name} group`,
      geometry: createEditorGeometry(
        node.geometry.x,
        node.geometry.y,
        node.geometry.width,
        node.geometry.height
      ),
      children: [
        updateNodePosition(node, 0, 0)
      ]
    });
    return updateNode(frame, parent2.id, (parentNode) => __spreadProps(__spreadValues({}, parentNode), {
      children: parentNode.children.map((child) => child.id === node.id ? group : child)
    }));
  }
  function removeNode(node, nodeId) {
    for (const child of node.children) {
      if (child.id === nodeId) {
        return {
          frame: __spreadProps(__spreadValues({}, node), {
            children: node.children.filter((candidate) => candidate.id !== nodeId)
          }),
          node: child
        };
      }
    }
    for (const child of node.children) {
      const result = removeNode(child, nodeId);
      if (result != null) {
        return {
          frame: __spreadProps(__spreadValues({}, node), {
            children: node.children.map(
              (candidate) => candidate.id === child.id ? result.frame : candidate
            )
          }),
          node: result.node
        };
      }
    }
    return null;
  }
  function normalizeVirtualGroupGeometry(node) {
    const children = node.children.map((child) => normalizeVirtualGroupGeometry(child));
    const nextNode = __spreadProps(__spreadValues({}, node), {
      children
    });
    if (!isVirtualGroup(nextNode)) {
      return nextNode;
    }
    const bounds = getChildrenBounds(children);
    const isEmptyShell = nextNode.geometry.width === 0 && nextNode.geometry.height === 0;
    const offsetX = bounds == null ? 0 : isEmptyShell || bounds.x < 0 ? bounds.x : 0;
    const offsetY = bounds == null ? 0 : isEmptyShell || bounds.y < 0 ? bounds.y : 0;
    const groupX = nextNode.geometry.x + offsetX;
    const groupY = nextNode.geometry.y + offsetY;
    const normalizedChildren = bounds == null ? children : children.map((child) => moveNodeBy(child, -offsetX, -offsetY));
    const normalizedBounds = getChildrenBounds(normalizedChildren);
    const width = normalizedBounds == null ? nextNode.geometry.width : Math.max(nextNode.geometry.width - offsetX, normalizedBounds.x + normalizedBounds.width);
    const height = normalizedBounds == null ? nextNode.geometry.height : Math.max(nextNode.geometry.height - offsetY, normalizedBounds.y + normalizedBounds.height);
    return __spreadProps(__spreadValues({}, nextNode), {
      children: normalizedChildren,
      geometry: createEditorGeometry(
        groupX,
        groupY,
        width,
        height,
        nextNode.geometry
      )
    });
  }
  function getNodeRootPosition(node, nodeId, offset = { x: 0, y: 0 }) {
    if (node.id === nodeId) {
      return offset;
    }
    for (const child of node.children) {
      const match = getNodeRootPosition(child, nodeId, {
        x: offset.x + child.geometry.x,
        y: offset.y + child.geometry.y
      });
      if (match != null) {
        return match;
      }
    }
    return null;
  }
  function moveNodeBy(node, deltaX, deltaY) {
    return updateNodePosition(
      node,
      node.geometry.x + deltaX,
      node.geometry.y + deltaY
    );
  }
  function updateNodePosition(node, x2, y3) {
    return __spreadProps(__spreadValues({}, node), {
      geometry: createEditorGeometry(
        x2,
        y3,
        node.geometry.width,
        node.geometry.height,
        node.geometry
      )
    });
  }
  function applyFlexLayoutToNode(node) {
    var _a, _b, _c, _d;
    if (node.children.length === 0) {
      return node;
    }
    const layoutMode = node.layout.layoutMode === "HORIZONTAL" ? "HORIZONTAL" : "VERTICAL";
    const padding = (_a = node.layout.padding) != null ? _a : {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    };
    const gap = (_b = node.layout.itemSpacing) != null ? _b : 0;
    const innerWidth = Math.max(0, node.geometry.width - padding.left - padding.right);
    const innerHeight = Math.max(0, node.geometry.height - padding.top - padding.bottom);
    const isHorizontal = layoutMode === "HORIZONTAL";
    const mainSize = isHorizontal ? innerWidth : innerHeight;
    const crossSize = isHorizontal ? innerHeight : innerWidth;
    const baseChildMetrics = node.children.map((child) => {
      var _a2;
      const margin = (_a2 = child.layout.margin) != null ? _a2 : {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      };
      const mainStartMargin = isHorizontal ? margin.left : margin.top;
      const mainEndMargin = isHorizontal ? margin.right : margin.bottom;
      const crossStartMargin = isHorizontal ? margin.top : margin.left;
      const crossEndMargin = isHorizontal ? margin.bottom : margin.right;
      const childMainSize = isHorizontal ? child.geometry.width : child.geometry.height;
      const childCrossSize = isHorizontal ? child.geometry.height : child.geometry.width;
      const fillsMainAxis = getNodeAxisSizing(child, isHorizontal ? "horizontal" : "vertical", layoutMode) === "FILL";
      const fillsCrossAxis = getNodeAxisSizing(child, isHorizontal ? "vertical" : "horizontal", layoutMode) === "FILL";
      return {
        child,
        margin,
        mainStartMargin,
        mainEndMargin,
        crossStartMargin,
        crossEndMargin,
        fillsMainAxis,
        fillsCrossAxis,
        childMainSize,
        childCrossSize,
        mainSize: childMainSize + mainStartMargin + mainEndMargin,
        crossSize: childCrossSize + crossStartMargin + crossEndMargin
      };
    });
    const fillMainAxisCount = baseChildMetrics.filter((child) => child.fillsMainAxis).length;
    const fixedChildrenMainSize = baseChildMetrics.reduce((total, child) => {
      return child.fillsMainAxis ? total : total + child.mainSize;
    }, 0);
    const baseGapTotal = gap * Math.max(0, baseChildMetrics.length - 1);
    const fillChildMainSize = fillMainAxisCount === 0 ? 0 : Math.max(1, (mainSize - fixedChildrenMainSize - baseGapTotal) / fillMainAxisCount);
    const childMetrics = baseChildMetrics.map((metric) => {
      if (!metric.fillsMainAxis && !metric.fillsCrossAxis) {
        return metric;
      }
      const childMainSize = metric.fillsMainAxis ? fillChildMainSize : metric.childMainSize;
      const childCrossSize = metric.fillsCrossAxis ? Math.max(1, crossSize - metric.crossStartMargin - metric.crossEndMargin) : metric.childCrossSize;
      return __spreadProps(__spreadValues({}, metric), {
        childMainSize,
        childCrossSize,
        mainSize: childMainSize + metric.mainStartMargin + metric.mainEndMargin,
        crossSize: childCrossSize + metric.crossStartMargin + metric.crossEndMargin
      });
    });
    const totalChildrenMainSize = childMetrics.reduce((total, child) => total + child.mainSize, 0);
    const mainUsed = totalChildrenMainSize + baseGapTotal;
    const justify = (_c = node.layout.primaryAxisAlignItems) != null ? _c : "MIN";
    const align = (_d = node.layout.counterAxisAlignItems) != null ? _d : "MIN";
    const dynamicGap = justify === "SPACE_BETWEEN" && childMetrics.length > 1 ? Math.max(gap, (mainSize - totalChildrenMainSize) / (childMetrics.length - 1)) : gap;
    let cursor = padding[isHorizontal ? "left" : "top"] + getMainOffset(justify, mainSize, mainUsed);
    return __spreadProps(__spreadValues({}, node), {
      children: childMetrics.map((metric) => {
        const child = metric.child;
        const crossAvailable = Math.max(0, crossSize - metric.crossSize);
        const crossOffset = getCrossOffset(align, crossAvailable);
        const nextX = isHorizontal ? cursor + metric.mainStartMargin : padding.left + metric.crossStartMargin + crossOffset;
        const nextY = isHorizontal ? padding.top + metric.crossStartMargin + crossOffset : cursor + metric.mainStartMargin;
        const nextWidth = isHorizontal ? metric.childMainSize : metric.childCrossSize;
        const nextHeight = isHorizontal ? metric.childCrossSize : metric.childMainSize;
        const nextChild = __spreadProps(__spreadValues({}, child), {
          geometry: createEditorGeometry(
            nextX,
            nextY,
            nextWidth,
            nextHeight,
            child.geometry
          )
        });
        cursor += metric.mainSize + dynamicGap;
        return nextChild;
      })
    });
  }
  function getNodeAxisSizing(node, axis, parentLayoutMode = null) {
    const layoutSizing = axis === "horizontal" ? node.layout.layoutSizingHorizontal : node.layout.layoutSizingVertical;
    if (layoutSizing === "FILL" || layoutSizing === "HUG" || layoutSizing === "FIXED") {
      return layoutSizing;
    }
    const axisSizing = axisMatchesPrimaryAxis(node, axis) ? node.layout.primaryAxisSizingMode : node.layout.counterAxisSizingMode;
    if (axisSizing === "AUTO") {
      return "HUG";
    }
    if (axisSizing === "FIXED") {
      return "FIXED";
    }
    if (parentLayoutMode != null && node.layout.layoutAlign === "STRETCH" && axisMatchesCrossAxis(parentLayoutMode, axis)) {
      return "FILL";
    }
    if (parentLayoutMode != null && typeof node.layout.layoutGrow === "number" && node.layout.layoutGrow > 0 && axisMatchesPrimaryParentAxis(parentLayoutMode, axis)) {
      return "FILL";
    }
    return null;
  }
  function axisMatchesPrimaryAxis(node, axis) {
    return axis === "horizontal" ? node.layout.layoutMode === "HORIZONTAL" : node.layout.layoutMode === "VERTICAL";
  }
  function axisMatchesPrimaryParentAxis(parentLayoutMode, axis) {
    return axis === "horizontal" ? parentLayoutMode === "HORIZONTAL" : parentLayoutMode === "VERTICAL";
  }
  function axisMatchesCrossAxis(parentLayoutMode, axis) {
    return axis === "horizontal" ? parentLayoutMode === "VERTICAL" : parentLayoutMode === "HORIZONTAL";
  }
  function getMainOffset(justify, mainSize, mainUsed) {
    const remaining = Math.max(0, mainSize - mainUsed);
    if (justify === "CENTER") {
      return remaining / 2;
    }
    if (justify === "MAX") {
      return remaining;
    }
    return 0;
  }
  function getCrossOffset(align, available) {
    if (align === "CENTER" || align === "BASELINE") {
      return available / 2;
    }
    if (align === "MAX") {
      return available;
    }
    return 0;
  }
  function getChildrenBounds(children) {
    if (children.length === 0) {
      return null;
    }
    const boxes = children.map((child) => child.geometry);
    const minX = Math.min(...boxes.map((box) => box.x));
    const minY = Math.min(...boxes.map((box) => box.y));
    const maxX = Math.max(...boxes.map((box) => box.x + box.width));
    const maxY = Math.max(...boxes.map((box) => box.y + box.height));
    return {
      x: minX,
      y: minY,
      width: maxX - minX,
      height: maxY - minY
    };
  }
  function createEditorGeometry(x2, y3, width, height, existing) {
    var _a, _b, _c;
    const bounds = createEditorBounds(x2, y3, width, height);
    return {
      x: x2,
      y: y3,
      width,
      height,
      rotation: (_a = existing == null ? void 0 : existing.rotation) != null ? _a : 0,
      absoluteBounds: bounds,
      parentRelativeBounds: bounds,
      rootRelativeBounds: bounds,
      percentOfParent: existing == null ? void 0 : existing.percentOfParent,
      percentOfRoot: (_b = existing == null ? void 0 : existing.percentOfRoot) != null ? _b : {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        right: 0,
        bottom: 0
      },
      hierarchy: (_c = existing == null ? void 0 : existing.hierarchy) != null ? _c : {
        parentId: null,
        depth: 0,
        siblingIndex: 0,
        siblingCount: 1
      }
    };
  }
  function createEditorBounds(x2, y3, width, height) {
    return {
      x: x2,
      y: y3,
      width,
      height,
      right: x2 + width,
      bottom: y3 + height,
      centerX: x2 + width / 2,
      centerY: y3 + height / 2
    };
  }
  function getSolidFillColor(value) {
    if (!Array.isArray(value)) {
      return void 0;
    }
    const paint = value.find((entry) => {
      return isJsonObject(entry) && entry.type === "SOLID" && entry.visible !== false;
    });
    if (!isJsonObject(paint) || !isJsonObject(paint.color)) {
      return void 0;
    }
    const opacity = typeof paint.opacity === "number" ? paint.opacity : 1;
    const red = toCssColorChannel(paint.color.r);
    const green = toCssColorChannel(paint.color.g);
    const blue = toCssColorChannel(paint.color.b);
    return `rgba(${red}, ${green}, ${blue}, ${opacity})`;
  }
  function getCornerRadius(value, scale) {
    return typeof value === "number" ? `${value * scale}px` : void 0;
  }
  function getTextFontFamily(node) {
    var _a;
    const fontName = (_a = node.text) == null ? void 0 : _a.fontName;
    if (!isJsonObject(fontName) || typeof fontName.family !== "string") {
      return void 0;
    }
    return `"${fontName.family}", Inter, Arial, sans-serif`;
  }
  function getTextFontWeight(node) {
    var _a, _b;
    if (typeof ((_a = node.text) == null ? void 0 : _a.fontWeight) === "number") {
      return node.text.fontWeight;
    }
    const fontName = (_b = node.text) == null ? void 0 : _b.fontName;
    if (!isJsonObject(fontName) || typeof fontName.style !== "string") {
      return void 0;
    }
    const style = fontName.style.toLowerCase();
    if (style.includes("black")) {
      return 900;
    }
    if (style.includes("extra bold") || style.includes("extrabold")) {
      return 800;
    }
    if (style.includes("bold")) {
      return 700;
    }
    if (style.includes("semi bold") || style.includes("semibold")) {
      return 600;
    }
    if (style.includes("medium")) {
      return 500;
    }
    if (style.includes("light")) {
      return 300;
    }
    return 400;
  }
  function getTextLineHeight(node, scale) {
    var _a;
    const lineHeight = (_a = node.text) == null ? void 0 : _a.lineHeight;
    if (!isJsonObject(lineHeight)) {
      return void 0;
    }
    if (lineHeight.unit === "PIXELS" && typeof lineHeight.value === "number") {
      return `${lineHeight.value * scale}px`;
    }
    if (lineHeight.unit === "PERCENT" && typeof lineHeight.value === "number") {
      return `${lineHeight.value}%`;
    }
    return void 0;
  }
  function getTextHorizontalAlign(node) {
    var _a, _b, _c;
    if (((_a = node.text) == null ? void 0 : _a.textAlignHorizontal) === "CENTER") {
      return "center";
    }
    if (((_b = node.text) == null ? void 0 : _b.textAlignHorizontal) === "RIGHT") {
      return "right";
    }
    if (((_c = node.text) == null ? void 0 : _c.textAlignHorizontal) === "JUSTIFIED") {
      return "justify";
    }
    return "left";
  }
  function getTextVerticalJustify(node) {
    var _a, _b;
    if (((_a = node.text) == null ? void 0 : _a.textAlignVertical) === "CENTER") {
      return "center";
    }
    if (((_b = node.text) == null ? void 0 : _b.textAlignVertical) === "BOTTOM") {
      return "flex-end";
    }
    return "flex-start";
  }
  function toCssColorChannel(value) {
    return typeof value === "number" ? Math.round(value * 255) : 0;
  }
  function isJsonObject(value) {
    return value != null && !Array.isArray(value) && typeof value === "object";
  }
  var init_editorModel = __esm({
    "src/components/editorModel.ts"() {
      "use strict";
    }
  });

  // src/components/ExportPreviewDrawer.tsx
  function ExportPreviewDrawer({
    frame,
    selectedNodeId,
    onSelect,
    targetDevice,
    screenWidth,
    layoutRules,
    isExpanded,
    onToggle
  }) {
    const [inspectedNodeId, setInspectedNodeId] = d2(null);
    const inspectedNode = inspectedNodeId == null ? null : inspectedNodeId === frame.id ? frame : findNode(frame, inspectedNodeId);
    y2(() => {
      if (!isExpanded) {
        setInspectedNodeId(null);
      }
    }, [isExpanded]);
    function inspectNode(nodeId) {
      onSelect(nodeId);
      setInspectedNodeId(nodeId);
    }
    return /* @__PURE__ */ k(
      "aside",
      {
        class: `absolute bottom-0 right-0 top-0 z-40 min-h-0 border-l border-[#e5e7eb] bg-white shadow-xl transition-[width] ${isExpanded ? "w-full" : "w-12"}`
      },
      /* @__PURE__ */ k(
        "button",
        {
          type: "button",
          onClick: onToggle,
          class: `w-full text-left transition hover:bg-gray-50 ${isExpanded ? "flex h-12 items-center justify-between px-4" : "flex h-full items-center justify-center"}`
        },
        isExpanded ? /* @__PURE__ */ k("div", null, /* @__PURE__ */ k("h3", { class: "text-xs font-bold uppercase tracking-wide text-gray-500" }, "Export Preview"), /* @__PURE__ */ k("p", { class: "mt-0.5 text-[11px] text-gray-500" }, getDeviceLabel(targetDevice))) : /* @__PURE__ */ k("span", { class: "[writing-mode:vertical-rl] text-xs font-bold uppercase tracking-wide text-gray-500" }, "Export Preview"),
        isExpanded && /* @__PURE__ */ k("span", { class: "text-xs font-semibold text-[#0f766e]" }, "Collapse")
      ),
      isExpanded && /* @__PURE__ */ k("div", { class: "relative h-[calc(100%-48px)] min-h-0" }, /* @__PURE__ */ k(
        GeneratedPreview,
        {
          frame,
          selectedNodeId,
          onSelect,
          onInspect: inspectNode,
          targetDevice,
          screenWidth,
          layoutRules
        }
      ), inspectedNode != null && /* @__PURE__ */ k(
        ExportInspectorPanel,
        {
          frame,
          node: inspectedNode,
          targetDevice,
          screenWidth,
          layoutRules,
          onSelect,
          onClose: () => setInspectedNodeId(null)
        }
      ))
    );
  }
  function GeneratedPreview({
    frame,
    selectedNodeId,
    onSelect,
    onInspect,
    targetDevice,
    screenWidth,
    layoutRules
  }) {
    var _a;
    const scrollAreaRef = A2(null);
    const lastPreviewClickRef = A2(null);
    const [viewportSize, setViewportSize] = d2({
      width: 720,
      height: 520
    });
    const reviewWidth = Number.isFinite(screenWidth) && screenWidth > 0 ? screenWidth : frame.geometry.width;
    const backgroundColor = (_a = getSolidFillColor(frame.style.fills)) != null ? _a : "#ffffff";
    const exportGroups = createExportReviewGroups(frame, reviewWidth, layoutRules);
    const reviewHeight = Math.max(
      Math.min(frame.geometry.height, 760),
      exportGroups.reduce((bottom, group) => Math.max(bottom, group.y + group.height), 0) + 24
    );
    const availableWidth = Math.max(240, viewportSize.width - 48);
    const availableHeight = Math.max(180, viewportSize.height - 92);
    const fitScale = Math.min(
      availableWidth / Math.max(reviewWidth, 1),
      availableHeight / Math.max(reviewHeight, 1)
    );
    const canvasScale = Math.min(1, Math.max(0.1, fitScale));
    const canvasWidth = Math.max(1, reviewWidth * canvasScale);
    const canvasHeight = Math.max(1, reviewHeight * canvasScale);
    const isFrameSelected = selectedNodeId === frame.id;
    y2(() => {
      const scrollArea = scrollAreaRef.current;
      if (scrollArea == null) {
        return;
      }
      function updateViewportSize() {
        const currentScrollArea = scrollAreaRef.current;
        if (currentScrollArea == null) {
          return;
        }
        const rect = currentScrollArea.getBoundingClientRect();
        setViewportSize({
          width: rect.width,
          height: rect.height
        });
      }
      updateViewportSize();
      if (typeof ResizeObserver === "undefined") {
        window.addEventListener("resize", updateViewportSize);
        return () => window.removeEventListener("resize", updateViewportSize);
      }
      const observer = new ResizeObserver(updateViewportSize);
      observer.observe(scrollArea);
      return () => observer.disconnect();
    }, []);
    function selectOrInspectNode(nodeId) {
      const now = Date.now();
      const lastClick = lastPreviewClickRef.current;
      const isDoubleClick = lastClick != null && lastClick.nodeId === nodeId && now - lastClick.clickedAt < 450;
      lastPreviewClickRef.current = {
        nodeId,
        clickedAt: now
      };
      if (isDoubleClick) {
        onInspect(nodeId);
        return;
      }
      onSelect(nodeId);
    }
    return /* @__PURE__ */ k("section", { class: "flex h-full min-h-0 flex-col bg-[#fbfbfd]" }, /* @__PURE__ */ k("div", { ref: scrollAreaRef, class: "min-h-0 flex-1 overflow-auto p-5" }, /* @__PURE__ */ k(
      "div",
      {
        class: "flex min-h-full min-w-0 items-center justify-center",
        style: {
          minWidth: 0
        }
      },
      /* @__PURE__ */ k("div", { class: "w-fit max-w-full" }, /* @__PURE__ */ k("div", { class: "mb-3 flex items-center justify-between gap-4 text-xs" }, /* @__PURE__ */ k("div", { class: "flex items-center gap-2" }, /* @__PURE__ */ k("span", { class: "font-bold text-gray-900" }, "Generated"), /* @__PURE__ */ k("span", { class: "text-gray-300" }, "\xB7"), /* @__PURE__ */ k("span", { class: "font-semibold text-gray-500" }, getDeviceLabel(targetDevice))), /* @__PURE__ */ k("div", { class: "flex shrink-0 items-center gap-2" }, selectedNodeId != null && /* @__PURE__ */ k(
        "button",
        {
          type: "button",
          onClick: () => onInspect(selectedNodeId),
          class: "rounded-md border border-[#0f766e]/30 bg-[#ecfdf5] px-2 py-1 text-[10px] font-bold text-[#0f766e] transition hover:bg-[#ccfbf1]"
        },
        "Inspect"
      ), /* @__PURE__ */ k("span", { class: "rounded-md border border-[#e5e7eb] bg-white px-2 py-1 text-[10px] font-bold text-gray-500" }, Math.round(canvasScale * 100), "%"))), /* @__PURE__ */ k("div", { class: "flex justify-center" }, /* @__PURE__ */ k(
        "div",
        {
          class: "relative cursor-pointer overflow-hidden rounded border border-[#d1d5db] shadow-sm",
          onClick: (event) => {
            event.stopPropagation();
            selectOrInspectNode(frame.id);
          },
          onContextMenu: (event) => {
            event.preventDefault();
            event.stopPropagation();
            onInspect(frame.id);
          },
          style: {
            width: `${canvasWidth}px`,
            height: `${canvasHeight}px`,
            backgroundColor,
            outline: isFrameSelected ? "2px solid #0f766e" : void 0,
            outlineOffset: isFrameSelected ? "-2px" : void 0,
            boxShadow: isFrameSelected ? "0 0 0 3px rgba(15, 118, 110, 0.14)" : void 0
          }
        },
        exportGroups.map((group) => /* @__PURE__ */ k(
          "div",
          {
            key: group.node.id,
            class: "absolute overflow-hidden",
            style: {
              left: `${group.x * canvasScale}px`,
              top: `${group.y * canvasScale}px`,
              width: `${group.width * canvasScale}px`,
              height: `${group.height * canvasScale}px`
            }
          },
          /* @__PURE__ */ k(
            ResponsiveReviewNode,
            {
              node: group.node,
              origin: group.sourceBounds,
              scale: group.scale * canvasScale,
              layoutRules,
              reviewWidth,
              selectedNodeId,
              onPreviewClick: selectOrInspectNode,
              onPreviewInspect: onInspect
            }
          )
        ))
      )))
    )));
  }
  function ResponsiveReviewNode({
    node,
    origin,
    scale,
    layoutRules,
    reviewWidth,
    selectedNodeId,
    onPreviewClick,
    onPreviewInspect
  }) {
    var _a, _b;
    if (!node.visible) {
      return null;
    }
    const isSelected = selectedNodeId === node.id;
    const renderNode = (_a = materializeReplacementNode(node, reviewWidth)) != null ? _a : node;
    if (isVirtualGroup(renderNode)) {
      const arrangedChildren2 = arrangeResponsiveChildren(renderNode, layoutRules, reviewWidth);
      const renderedHeight2 = getResponsiveNodeHeight(renderNode, layoutRules, reviewWidth);
      return /* @__PURE__ */ k(
        "div",
        {
          class: "absolute cursor-pointer overflow-visible",
          title: renderNode.name,
          onClick: (event) => {
            event.stopPropagation();
            onPreviewClick(node.id);
          },
          onContextMenu: (event) => {
            event.preventDefault();
            event.stopPropagation();
            onPreviewInspect(node.id);
          },
          style: {
            left: `${(renderNode.geometry.x - origin.x) * scale}px`,
            top: `${(renderNode.geometry.y - origin.y) * scale}px`,
            width: `${renderNode.geometry.width * scale}px`,
            height: `${renderedHeight2 * scale}px`,
            outline: isSelected ? "2px solid #0f766e" : "1px dashed rgba(15, 118, 110, 0.35)",
            outlineOffset: isSelected ? "-2px" : "-1px",
            boxShadow: isSelected ? "0 0 0 3px rgba(15, 118, 110, 0.14)" : void 0
          }
        },
        arrangedChildren2.map((child) => /* @__PURE__ */ k(
          ResponsiveReviewNode,
          {
            key: child.node.id,
            node: child.node,
            origin: { x: 0, y: 0 },
            scale,
            layoutRules,
            reviewWidth,
            selectedNodeId,
            onPreviewClick,
            onPreviewInspect
          }
        ))
      );
    }
    const fillColor = getSolidFillColor(renderNode.style.fills);
    const isTextNode = renderNode.text != null;
    const backgroundColor = isTextNode ? void 0 : fillColor;
    const textColor = isTextNode ? fillColor : void 0;
    const borderColor = getSolidFillColor(renderNode.style.strokes);
    const borderWidth = borderColor == null ? 0 : Math.max(1, ((_b = renderNode.style.strokeWeight) != null ? _b : 1) * scale);
    const arrangedChildren = arrangeResponsiveChildren(renderNode, layoutRules, reviewWidth);
    const renderedHeight = getResponsiveNodeHeight(renderNode, layoutRules, reviewWidth);
    return /* @__PURE__ */ k(
      "div",
      {
        class: "absolute cursor-pointer overflow-hidden",
        title: renderNode.name,
        onClick: (event) => {
          event.stopPropagation();
          onPreviewClick(node.id);
        },
        onContextMenu: (event) => {
          event.preventDefault();
          event.stopPropagation();
          onPreviewInspect(node.id);
        },
        style: {
          left: `${(renderNode.geometry.x - origin.x) * scale}px`,
          top: `${(renderNode.geometry.y - origin.y) * scale}px`,
          width: `${renderNode.geometry.width * scale}px`,
          height: `${renderedHeight * scale}px`,
          opacity: renderNode.style.opacity,
          backgroundColor,
          borderColor,
          borderStyle: borderColor == null ? void 0 : "solid",
          borderWidth: `${borderWidth}px`,
          borderRadius: getCornerRadius(renderNode.style.cornerRadius, scale),
          outline: isSelected ? "2px solid #0f766e" : void 0,
          outlineOffset: isSelected ? "-2px" : void 0,
          boxShadow: isSelected ? "0 0 0 3px rgba(15, 118, 110, 0.14)" : void 0
        }
      },
      renderNode.text != null && /* @__PURE__ */ k(
        "div",
        {
          class: "h-full w-full overflow-hidden",
          style: {
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            justifyContent: getTextVerticalJustify(renderNode),
            fontSize: typeof renderNode.text.fontSize === "number" ? `${getResponsiveFontSize(renderNode.text.fontSize, scale, layoutRules)}px` : void 0,
            fontFamily: getTextFontFamily(renderNode),
            fontWeight: getTextFontWeight(renderNode),
            lineHeight: layoutRules.tightenLineHeight ? 1.15 : getTextLineHeight(renderNode, scale),
            color: textColor != null ? textColor : "#1f2937",
            textAlign: getTextHorizontalAlign(renderNode),
            whiteSpace: "pre-wrap",
            wordBreak: "break-word"
          }
        },
        renderNode.text.characters
      ),
      arrangedChildren.map((child) => /* @__PURE__ */ k(
        ResponsiveReviewNode,
        {
          key: child.node.id,
          node: child.node,
          origin: { x: 0, y: 0 },
          scale,
          layoutRules,
          reviewWidth,
          selectedNodeId,
          onPreviewClick,
          onPreviewInspect
        }
      ))
    );
  }
  function ExportInspectorPanel({
    frame,
    node,
    targetDevice,
    screenWidth,
    layoutRules,
    onSelect,
    onClose
  }) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const isFrame = node.id === frame.id;
    const isContainer = node.children.length > 0;
    const isText = node.text != null;
    const reviewWidth = Number.isFinite(screenWidth) && screenWidth > 0 ? screenWidth : frame.geometry.width;
    const effectiveRules = getEffectiveLayoutRules(node, layoutRules);
    const convertedLayoutMode = getConvertedLayoutMode(node, effectiveRules, reviewWidth);
    const renderedHeight = isFrame ? Math.max(frame.geometry.height, createExportReviewGroups(frame, reviewWidth, layoutRules).reduce((bottom, group) => Math.max(bottom, group.y + group.height), 0)) : getResponsiveNodeHeight(node, layoutRules, reviewWidth);
    return /* @__PURE__ */ k("aside", { class: "absolute bottom-3 right-3 top-3 z-20 flex w-72 flex-col overflow-hidden rounded-lg border border-[#d1d5db] bg-white shadow-2xl" }, /* @__PURE__ */ k("header", { class: "flex h-12 shrink-0 items-center justify-between border-b border-[#e5e7eb] px-3" }, /* @__PURE__ */ k("div", { class: "min-w-0" }, /* @__PURE__ */ k("p", { class: "truncate text-xs font-bold text-gray-900" }, node.name), /* @__PURE__ */ k("p", { class: "mt-0.5 text-[10px] font-bold uppercase tracking-wide text-gray-400" }, isFrame ? "FRAME" : getLayerKind(node))), /* @__PURE__ */ k(
      "button",
      {
        type: "button",
        onClick: onClose,
        class: "rounded px-2 py-1 text-xs font-bold text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
      },
      "X"
    )), /* @__PURE__ */ k("div", { class: "min-h-0 flex-1 overflow-auto p-3" }, /* @__PURE__ */ k(InspectorSection, { title: isFrame ? "Canvas" : "Export Box" }, /* @__PURE__ */ k("div", { class: "grid grid-cols-2 gap-2" }, /* @__PURE__ */ k(InspectorMetric, { label: "Width", value: `${Math.round(isFrame ? reviewWidth : node.geometry.width)}px` }), /* @__PURE__ */ k(InspectorMetric, { label: "Height", value: `${Math.round(renderedHeight)}px` }), /* @__PURE__ */ k(InspectorMetric, { label: "X", value: `${Math.round(node.geometry.x)}px` }), /* @__PURE__ */ k(InspectorMetric, { label: "Y", value: `${Math.round(node.geometry.y)}px` }))), isFrame && /* @__PURE__ */ k(InspectorSection, { title: "Frame Settings" }, /* @__PURE__ */ k("div", { class: "grid grid-cols-2 gap-2" }, /* @__PURE__ */ k(InspectorMetric, { label: "Device", value: getDeviceLabel(targetDevice) }), /* @__PURE__ */ k(InspectorMetric, { label: "Children", value: String(frame.children.length) }), /* @__PURE__ */ k(InspectorMetric, { label: "Padding", value: `${layoutRules.outputPadding}px` }), /* @__PURE__ */ k(InspectorMetric, { label: "Rules", value: String(countCustomRules(frame)) }))), isContainer && /* @__PURE__ */ k(InspectorSection, { title: "Container Behavior" }, /* @__PURE__ */ k("div", { class: "space-y-2" }, /* @__PURE__ */ k(InspectorRow, { label: "Current layout", value: String((_a = node.layout.layoutMode) != null ? _a : "None") }), /* @__PURE__ */ k(InspectorRow, { label: "Generated layout", value: convertedLayoutMode != null ? convertedLayoutMode : "Keep" }), /* @__PURE__ */ k(InspectorRow, { label: "Rule source", value: ((_c = (_b = node.responsive) == null ? void 0 : _b.nodeRule) == null ? void 0 : _c.enabled) === true ? "Custom" : "Inherited" }), /* @__PURE__ */ k(InspectorRow, { label: "Direction", value: formatConversionDirection(effectiveRules.conversionDirection) }), /* @__PURE__ */ k(InspectorRow, { label: "Trigger", value: effectiveRules.rowToColumnMode }), /* @__PURE__ */ k(InspectorRow, { label: "Breakpoint", value: `${effectiveRules.rowToColumnBreakpoint}px` }), /* @__PURE__ */ k(InspectorRow, { label: "Gap", value: `${effectiveRules.stackGap}px` }), /* @__PURE__ */ k(InspectorRow, { label: "Align", value: effectiveRules.stackAlignment }), /* @__PURE__ */ k(InspectorRow, { label: "Children", value: String(node.children.length) }))), isText && /* @__PURE__ */ k(InspectorSection, { title: "Text" }, /* @__PURE__ */ k("div", { class: "space-y-2" }, /* @__PURE__ */ k(InspectorRow, { label: "Size", value: typeof ((_d = node.text) == null ? void 0 : _d.fontSize) === "number" ? `${node.text.fontSize}px` : "Mixed" }), /* @__PURE__ */ k(InspectorRow, { label: "Weight", value: String((_e = getTextFontWeight(node)) != null ? _e : "Default") }), /* @__PURE__ */ k(InspectorRow, { label: "Align", value: getTextHorizontalAlign(node) }), /* @__PURE__ */ k("div", { class: "rounded-lg border border-[#e5e7eb] bg-gray-50 p-2 text-xs leading-5 text-gray-700" }, (_f = node.text) == null ? void 0 : _f.characters))), !isFrame && !isText && /* @__PURE__ */ k(InspectorSection, { title: "Visual Style" }, /* @__PURE__ */ k("div", { class: "space-y-2" }, /* @__PURE__ */ k(InspectorRow, { label: "Fill", value: (_g = getSolidFillColor(node.style.fills)) != null ? _g : "None" }), /* @__PURE__ */ k(InspectorRow, { label: "Stroke", value: (_h = getSolidFillColor(node.style.strokes)) != null ? _h : "None" }), /* @__PURE__ */ k(InspectorRow, { label: "Radius", value: node.style.cornerRadius == null ? "0" : String(node.style.cornerRadius) }), /* @__PURE__ */ k(InspectorRow, { label: "Opacity", value: node.style.opacity == null ? "100%" : `${Math.round(node.style.opacity * 100)}%` })))), /* @__PURE__ */ k("footer", { class: "shrink-0 border-t border-[#e5e7eb] p-3" }, /* @__PURE__ */ k(
      "button",
      {
        type: "button",
        onClick: () => onSelect(node.id),
        class: "h-9 w-full rounded-lg border border-[#0f766e] bg-[#ecfdf5] text-xs font-bold text-[#0f766e] transition hover:bg-[#ccfbf1]"
      },
      "Select in layers"
    )));
  }
  function InspectorSection({
    title,
    children
  }) {
    return /* @__PURE__ */ k("section", { class: "mb-3" }, /* @__PURE__ */ k("h4", { class: "mb-2 text-[10px] font-bold uppercase tracking-wide text-gray-400" }, title), children);
  }
  function InspectorMetric({
    label,
    value
  }) {
    return /* @__PURE__ */ k("div", { class: "rounded-lg border border-[#e5e7eb] bg-gray-50 px-2 py-2" }, /* @__PURE__ */ k("p", { class: "text-[9px] font-bold uppercase tracking-wide text-gray-400" }, label), /* @__PURE__ */ k("p", { class: "mt-1 truncate text-xs font-bold text-gray-900" }, value));
  }
  function InspectorRow({
    label,
    value
  }) {
    return /* @__PURE__ */ k("div", { class: "flex items-center justify-between gap-3 rounded-lg border border-[#e5e7eb] bg-white px-2 py-1.5" }, /* @__PURE__ */ k("span", { class: "text-[11px] font-semibold text-gray-500" }, label), /* @__PURE__ */ k("span", { class: "min-w-0 truncate text-right text-[11px] font-bold text-gray-900" }, value));
  }
  function countCustomRules(node) {
    var _a, _b;
    const count = (((_b = (_a = node.responsive) == null ? void 0 : _a.nodeRule) == null ? void 0 : _b.enabled) === true ? 1 : 0) + node.children.reduce((total, child) => {
      return total + countCustomRules(child);
    }, 0);
    return count;
  }
  function formatConversionDirection(direction) {
    return direction === "row-to-column" ? "Row > Column" : "Column > Row";
  }
  function materializeReplacementNode(node, reviewWidth) {
    var _a;
    const rule = (_a = node.responsive) == null ? void 0 : _a.replacement;
    if (rule == null || !isReplacementActive(rule, reviewWidth)) {
      return null;
    }
    const { width, height } = getReplacementDimensions(node, rule);
    const lineWidth = Math.max(12, Math.min(width - 12, Math.round(width * 0.5)));
    const lineHeight = Math.max(2, Math.min(4, Math.round(height * 0.08)));
    const gap = Math.max(4, Math.round(height * 0.12));
    const totalLineHeight = lineHeight * 3 + gap * 2;
    const startX = Math.max(0, (width - lineWidth) / 2);
    const startY = Math.max(0, (height - totalLineHeight) / 2);
    return __spreadProps(__spreadValues({}, node), {
      name: `${node.name} / hamburger`,
      geometry: resizePreviewGeometry(node, width, height),
      layout: __spreadProps(__spreadValues({}, node.layout), {
        isAutoLayout: false,
        layoutMode: "NONE",
        autoLayoutDirection: "NONE",
        layoutGrow: 0,
        layoutAlign: "INHERIT",
        layoutSizingHorizontal: "FIXED",
        layoutSizingVertical: "FIXED",
        primaryAxisSizingMode: "FIXED",
        counterAxisSizingMode: "FIXED"
      }),
      style: __spreadProps(__spreadValues({}, node.style), {
        fills: [solidPaint(1, 1, 1)],
        strokes: [solidPaint(0.15, 0.17, 0.2)],
        strokeWeight: 1,
        cornerRadius: 8
      }),
      text: void 0,
      children: [0, 1, 2].map((index) => ({
        id: `${node.id}-hamburger-line-${index}`,
        name: `Hamburger line ${index + 1}`,
        type: "RECTANGLE",
        visible: true,
        locked: false,
        geometry: createPreviewGeometry(
          startX,
          startY + index * (lineHeight + gap),
          lineWidth,
          lineHeight
        ),
        layout: {
          isAutoLayout: false,
          layoutMode: "NONE",
          layoutSizingHorizontal: "FIXED",
          layoutSizingVertical: "FIXED"
        },
        style: {
          fills: [solidPaint(0.1, 0.12, 0.16)],
          cornerRadius: 999
        },
        children: []
      }))
    });
  }
  function isReplacementActive(rule, reviewWidth) {
    if (rule == null || rule.enabled !== true || rule.preset !== "hamburger") {
      return false;
    }
    if (rule.trigger === "always") {
      return true;
    }
    if (rule.trigger === "never") {
      return false;
    }
    return reviewWidth <= rule.breakpoint;
  }
  function resizePreviewGeometry(node, width, height) {
    return createPreviewGeometry(node.geometry.x, node.geometry.y, width, height, node.geometry);
  }
  function createPreviewGeometry(x2, y3, width, height, existing) {
    var _a, _b, _c;
    const bounds = {
      x: x2,
      y: y3,
      width,
      height,
      right: x2 + width,
      bottom: y3 + height,
      centerX: x2 + width / 2,
      centerY: y3 + height / 2
    };
    return {
      x: x2,
      y: y3,
      width,
      height,
      rotation: (_a = existing == null ? void 0 : existing.rotation) != null ? _a : 0,
      absoluteBounds: bounds,
      parentRelativeBounds: bounds,
      rootRelativeBounds: bounds,
      percentOfParent: existing == null ? void 0 : existing.percentOfParent,
      percentOfRoot: (_b = existing == null ? void 0 : existing.percentOfRoot) != null ? _b : {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        right: 0,
        bottom: 0
      },
      hierarchy: (_c = existing == null ? void 0 : existing.hierarchy) != null ? _c : {
        parentId: null,
        depth: 0,
        siblingIndex: 0,
        siblingCount: 1
      }
    };
  }
  function solidPaint(r3, g2, b2) {
    return {
      type: "SOLID",
      visible: true,
      opacity: 1,
      color: {
        r: r3,
        g: g2,
        b: b2
      }
    };
  }
  function clampReplacementDimension(value) {
    return Math.min(1e4, Math.max(16, Math.round(value)));
  }
  function getReplacementDimensions(node, rule) {
    var _a, _b;
    const sizeSource = (_a = rule == null ? void 0 : rule.sizeSource) != null ? _a : "custom";
    const size = sizeSource === "width" ? node.geometry.width : sizeSource === "height" ? node.geometry.height : (_b = rule == null ? void 0 : rule.width) != null ? _b : node.geometry.height;
    const squareSize = clampReplacementDimension(size);
    return {
      width: squareSize,
      height: squareSize
    };
  }
  function getResponsiveNodeHeight(node, layoutRules, reviewWidth) {
    var _a;
    const replacementNode = materializeReplacementNode(node, reviewWidth);
    if (replacementNode != null) {
      return replacementNode.geometry.height;
    }
    if (node.children.length === 0) {
      return node.geometry.height;
    }
    const arrangedChildren = arrangeResponsiveChildren(node, layoutRules, reviewWidth);
    const childrenBottom = arrangedChildren.reduce((bottom, child) => {
      return Math.max(
        bottom,
        child.node.geometry.y + getResponsiveNodeHeight(child.node, layoutRules, reviewWidth)
      );
    }, 0);
    const padding = (_a = node.layout.padding) != null ? _a : {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    };
    if (getNodeAxisSizing2(node, "vertical", getNativeLayoutMode(node)) === "HUG") {
      return Math.max(1, childrenBottom + padding.bottom);
    }
    return Math.max(node.geometry.height, childrenBottom);
  }
  function createExportReviewGroups(frame, reviewWidth, layoutRules) {
    const outerPadding = layoutRules.outputPadding;
    const rootReplacement = materializeReplacementNode(frame, reviewWidth);
    if (rootReplacement != null) {
      return [{
        node: rootReplacement,
        x: outerPadding,
        y: outerPadding,
        width: rootReplacement.geometry.width,
        height: rootReplacement.geometry.height,
        sourceBounds: rootReplacement.geometry,
        scale: 1
      }];
    }
    const contentWidth = Math.max(1, reviewWidth - outerPadding * 2);
    const visibleChildren = frame.children.filter((child) => child.visible).map((child) => {
      var _a;
      return (_a = materializeReplacementNode(child, reviewWidth)) != null ? _a : child;
    }).sort((first, second) => first.geometry.y - second.geometry.y || first.geometry.x - second.geometry.x);
    let nextY = outerPadding;
    return visibleChildren.map((child) => {
      const sourceBounds = child.geometry;
      const scale = contentWidth / Math.max(sourceBounds.width, 1);
      const height = Math.max(1, getResponsiveNodeHeight(child, layoutRules, reviewWidth) * scale);
      const group = {
        node: child,
        x: outerPadding,
        y: nextY,
        width: contentWidth,
        height,
        sourceBounds,
        scale
      };
      nextY += height + layoutRules.stackGap;
      return group;
    });
  }
  function arrangeResponsiveChildren(node, layoutRules, reviewWidth) {
    var _a;
    const layoutNode = __spreadProps(__spreadValues({}, node), {
      children: node.children.map((child) => {
        var _a2;
        return (_a2 = materializeReplacementNode(child, reviewWidth)) != null ? _a2 : child;
      })
    });
    const effectiveRules = getEffectiveLayoutRules(layoutNode, layoutRules);
    const convertedLayoutMode = getConvertedLayoutMode(layoutNode, effectiveRules, reviewWidth);
    const activeLayoutMode = convertedLayoutMode != null ? convertedLayoutMode : getNativeLayoutMode(layoutNode);
    const sourceParentLayoutMode = (_a = getNativeLayoutMode(layoutNode)) != null ? _a : activeLayoutMode;
    const activeRules = convertedLayoutMode == null ? getNativeLayoutRules(layoutNode, effectiveRules) : effectiveRules;
    if (activeLayoutMode == null) {
      return layoutNode.children.map((child) => ({ node: child }));
    }
    if (activeLayoutMode === "HORIZONTAL") {
      return arrangeChildrenHorizontally(layoutNode, layoutRules, activeRules, reviewWidth, sourceParentLayoutMode);
    }
    return arrangeChildrenVertically(layoutNode, layoutRules, activeRules, reviewWidth, sourceParentLayoutMode);
  }
  function arrangeChildrenVertically(node, layoutRules, effectiveRules, reviewWidth, sourceParentLayoutMode) {
    var _a;
    const padding = (_a = node.layout.padding) != null ? _a : {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    };
    const contentWidth = Math.max(0, node.geometry.width - padding.left - padding.right);
    const contentHeight = Math.max(0, node.geometry.height - padding.top - padding.bottom);
    const childLayouts = node.children.map((child) => {
      const childWidth = shouldFillAxis(
        child,
        "horizontal",
        effectiveRules.stackAlignment === "stretch" || child.layout.layoutAlign === "STRETCH",
        "VERTICAL",
        sourceParentLayoutMode
      ) ? contentWidth : Math.min(child.geometry.width, contentWidth);
      const childForWidth = __spreadProps(__spreadValues({}, child), {
        geometry: __spreadProps(__spreadValues({}, child.geometry), {
          width: childWidth
        })
      });
      return {
        child,
        childWidth,
        baseHeight: getResponsiveNodeHeight(childForWidth, layoutRules, reviewWidth),
        fillsHeight: shouldFillAxis(child, "vertical", false, "VERTICAL", sourceParentLayoutMode)
      };
    });
    const justify = getMainAxisAlign(node);
    const align = getCrossAxisAlign(node, effectiveRules);
    const baseGap = effectiveRules.stackGap;
    const baseGapTotal = baseGap * Math.max(0, childLayouts.length - 1);
    const fillHeightCount = childLayouts.filter((child) => child.fillsHeight).length;
    const fixedHeightTotal = childLayouts.reduce((total, child) => {
      return child.fillsHeight ? total : total + child.baseHeight;
    }, 0);
    const fillHeight = fillHeightCount === 0 ? 0 : Math.max(1, (contentHeight - baseGapTotal - fixedHeightTotal) / fillHeightCount);
    const totalChildrenHeight = childLayouts.reduce((total, child) => {
      return total + (child.fillsHeight ? fillHeight : child.baseHeight);
    }, 0);
    const mainUsed = totalChildrenHeight + baseGapTotal;
    const dynamicGap = getDynamicMainAxisGap(justify, baseGap, contentHeight, totalChildrenHeight, childLayouts.length);
    let nextY = padding.top + getMainAxisOffset(justify, contentHeight, mainUsed);
    return childLayouts.map((childLayout) => {
      const child = childLayout.child;
      const childWidth = childLayout.childWidth;
      const childHeight = childLayout.fillsHeight ? fillHeight : childLayout.baseHeight;
      const childX = padding.left + getCrossAxisOffset(align, contentWidth, childWidth);
      const nextChild = __spreadProps(__spreadValues({}, child), {
        geometry: __spreadProps(__spreadValues({}, child.geometry), {
          x: childX,
          y: nextY,
          width: childWidth,
          height: childHeight
        })
      });
      nextY += childHeight + dynamicGap;
      return {
        node: nextChild
      };
    });
  }
  function arrangeChildrenHorizontally(node, layoutRules, effectiveRules, reviewWidth, sourceParentLayoutMode) {
    var _a;
    const padding = (_a = node.layout.padding) != null ? _a : {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    };
    const contentWidth = Math.max(0, node.geometry.width - padding.left - padding.right);
    const contentHeight = Math.max(0, node.geometry.height - padding.top - padding.bottom);
    const childLayouts = node.children.map((child) => ({
      child,
      fillsWidth: shouldFillAxis(child, "horizontal", false, "HORIZONTAL", sourceParentLayoutMode),
      childHeight: shouldFillAxis(
        child,
        "vertical",
        effectiveRules.stackAlignment === "stretch" || child.layout.layoutAlign === "STRETCH",
        "HORIZONTAL",
        sourceParentLayoutMode
      ) ? contentHeight : child.geometry.height
    }));
    const justify = getMainAxisAlign(node);
    const align = getCrossAxisAlign(node, effectiveRules);
    const baseGap = effectiveRules.stackGap;
    const baseGapTotal = baseGap * Math.max(0, childLayouts.length - 1);
    const fillWidthCount = childLayouts.filter((child) => child.fillsWidth).length;
    const fixedWidthTotal = childLayouts.reduce((total, child) => {
      return child.fillsWidth ? total : total + child.child.geometry.width;
    }, 0);
    const fillChildWidth = fillWidthCount === 0 ? 0 : Math.max(1, (contentWidth - baseGapTotal - fixedWidthTotal) / fillWidthCount);
    const totalChildrenWidth = childLayouts.reduce((total, child) => {
      return total + (child.fillsWidth ? fillChildWidth : child.child.geometry.width);
    }, 0);
    const mainUsed = totalChildrenWidth + baseGapTotal;
    const dynamicGap = getDynamicMainAxisGap(justify, baseGap, contentWidth, totalChildrenWidth, childLayouts.length);
    let nextX = padding.left + getMainAxisOffset(justify, contentWidth, mainUsed);
    return childLayouts.map((childLayout) => {
      const child = childLayout.child;
      const childWidth = childLayout.fillsWidth ? fillChildWidth : child.geometry.width;
      const childHeight = childLayout.childHeight;
      const childY = padding.top + getCrossAxisOffset(align, contentHeight, childHeight);
      const nextChild = __spreadProps(__spreadValues({}, child), {
        geometry: __spreadProps(__spreadValues({}, child.geometry), {
          x: nextX,
          y: childY,
          width: childWidth,
          height: childHeight
        })
      });
      nextX += childWidth + dynamicGap;
      return {
        node: nextChild
      };
    });
  }
  function getMainAxisAlign(node) {
    return typeof node.layout.primaryAxisAlignItems === "string" ? node.layout.primaryAxisAlignItems : "MIN";
  }
  function getCrossAxisAlign(node, layoutRules) {
    if (typeof node.layout.counterAxisAlignItems === "string") {
      return node.layout.counterAxisAlignItems;
    }
    if (layoutRules.stackAlignment === "center") {
      return "CENTER";
    }
    return "MIN";
  }
  function getDynamicMainAxisGap(justify, baseGap, mainSize, totalChildrenMainSize, childCount) {
    return justify === "SPACE_BETWEEN" && childCount > 1 ? Math.max(baseGap, (mainSize - totalChildrenMainSize) / (childCount - 1)) : baseGap;
  }
  function getMainAxisOffset(justify, mainSize, mainUsed) {
    const remaining = Math.max(0, mainSize - mainUsed);
    if (justify === "CENTER") {
      return remaining / 2;
    }
    if (justify === "MAX") {
      return remaining;
    }
    return 0;
  }
  function getCrossAxisOffset(align, crossSize, childCrossSize) {
    const remaining = Math.max(0, crossSize - childCrossSize);
    if (align === "CENTER" || align === "BASELINE") {
      return remaining / 2;
    }
    if (align === "MAX") {
      return remaining;
    }
    return 0;
  }
  function getConvertedLayoutMode(node, layoutRules, reviewWidth) {
    if (node.children.length < 2) {
      return null;
    }
    if (layoutRules.rowToColumnMode === "always") {
      return getTargetLayoutMode(node, layoutRules);
    }
    if (layoutRules.rowToColumnMode === "never") {
      return null;
    }
    const shouldConvert = layoutRules.conversionDirection === "row-to-column" ? reviewWidth <= layoutRules.rowToColumnBreakpoint : reviewWidth >= layoutRules.rowToColumnBreakpoint;
    return shouldConvert ? getTargetLayoutMode(node, layoutRules) : null;
  }
  function getTargetLayoutMode(node, layoutRules) {
    if (layoutRules.conversionDirection === "row-to-column") {
      return node.layout.layoutMode === "HORIZONTAL" ? "VERTICAL" : null;
    }
    return node.layout.layoutMode === "VERTICAL" ? "HORIZONTAL" : null;
  }
  function getNativeLayoutMode(node) {
    if (node.layout.layoutMode === "HORIZONTAL" || node.layout.layoutMode === "VERTICAL") {
      return node.layout.layoutMode;
    }
    return null;
  }
  function getNativeLayoutRules(node, fallbackRules) {
    var _a;
    return __spreadProps(__spreadValues({}, fallbackRules), {
      stackGap: (_a = node.layout.itemSpacing) != null ? _a : fallbackRules.stackGap,
      stackAlignment: getNativeStackAlignment(node)
    });
  }
  function getNativeStackAlignment(node) {
    if (node.layout.counterAxisAlignItems === "CENTER" || node.layout.counterAxisAlignItems === "BASELINE") {
      return "center";
    }
    return "start";
  }
  function shouldFillAxis(node, axis, defaultFill, parentLayoutMode = null, sourceParentLayoutMode = parentLayoutMode) {
    const sizingMode = getNodeAxisSizingForParent(node, axis, parentLayoutMode, sourceParentLayoutMode);
    return sizingMode === "FILL" || sizingMode == null && defaultFill;
  }
  function getNodeAxisSizingForParent(node, axis, parentLayoutMode, sourceParentLayoutMode) {
    return getNodeAxisSizing2(
      node,
      getSourceAxisForTargetAxis(axis, parentLayoutMode, sourceParentLayoutMode),
      sourceParentLayoutMode
    );
  }
  function getNodeAxisSizing2(node, axis, parentLayoutMode = null) {
    const layoutSizing = axis === "horizontal" ? node.layout.layoutSizingHorizontal : node.layout.layoutSizingVertical;
    if (layoutSizing === "FILL" || layoutSizing === "HUG" || layoutSizing === "FIXED") {
      return layoutSizing;
    }
    const axisSizing = axisMatchesPrimaryAxis2(node, axis) ? node.layout.primaryAxisSizingMode : node.layout.counterAxisSizingMode;
    if (axisSizing === "AUTO") {
      return "HUG";
    }
    if (axisSizing === "FIXED") {
      return "FIXED";
    }
    if (parentLayoutMode != null && node.layout.layoutAlign === "STRETCH" && axisMatchesCrossAxis2(parentLayoutMode, axis)) {
      return "FILL";
    }
    if (parentLayoutMode != null && typeof node.layout.layoutGrow === "number" && node.layout.layoutGrow > 0 && axisMatchesPrimaryParentAxis2(parentLayoutMode, axis)) {
      return "FILL";
    }
    return null;
  }
  function getSourceAxisForTargetAxis(axis, parentLayoutMode, sourceParentLayoutMode) {
    if (parentLayoutMode == null || sourceParentLayoutMode == null || parentLayoutMode === sourceParentLayoutMode) {
      return axis;
    }
    return axisMatchesPrimaryParentAxis2(parentLayoutMode, axis) ? getParentAxis(sourceParentLayoutMode, "primary") : getParentAxis(sourceParentLayoutMode, "cross");
  }
  function getParentAxis(parentLayoutMode, role) {
    if (role === "primary") {
      return parentLayoutMode === "HORIZONTAL" ? "horizontal" : "vertical";
    }
    return parentLayoutMode === "HORIZONTAL" ? "vertical" : "horizontal";
  }
  function axisMatchesPrimaryAxis2(node, axis) {
    return axis === "horizontal" ? node.layout.layoutMode === "HORIZONTAL" : node.layout.layoutMode === "VERTICAL";
  }
  function axisMatchesPrimaryParentAxis2(parentLayoutMode, axis) {
    return axis === "horizontal" ? parentLayoutMode === "HORIZONTAL" : parentLayoutMode === "VERTICAL";
  }
  function axisMatchesCrossAxis2(parentLayoutMode, axis) {
    return axis === "horizontal" ? parentLayoutMode === "VERTICAL" : parentLayoutMode === "HORIZONTAL";
  }
  function getEffectiveLayoutRules(node, layoutRules) {
    var _a;
    const nodeRule = (_a = node.responsive) == null ? void 0 : _a.nodeRule;
    if ((nodeRule == null ? void 0 : nodeRule.enabled) === true) {
      return {
        conversionDirection: nodeRule.conversionDirection,
        rowToColumnMode: nodeRule.rowToColumnMode,
        rowToColumnBreakpoint: nodeRule.rowToColumnBreakpoint,
        stackGap: nodeRule.stackGap,
        stackAlignment: nodeRule.stackAlignment
      };
    }
    return {
      conversionDirection: layoutRules.conversionDirection,
      rowToColumnMode: layoutRules.rowToColumnMode,
      rowToColumnBreakpoint: layoutRules.rowToColumnBreakpoint,
      stackGap: layoutRules.stackGap,
      stackAlignment: layoutRules.stackAlignment
    };
  }
  function getResponsiveFontSize(fontSize, scale, layoutRules) {
    const scaledSize = fontSize * scale;
    if (layoutRules.textScaleMode === "preserve") {
      return Math.max(8, scaledSize);
    }
    if (layoutRules.textScaleMode === "scale") {
      return Math.max(layoutRules.minimumTextSize, scaledSize);
    }
    return Math.max(layoutRules.minimumTextSize, Math.min(fontSize, scaledSize));
  }
  function getDeviceLabel(targetDevice) {
    if (targetDevice === "mobile") {
      return "Mobile";
    }
    if (targetDevice === "tablet") {
      return "Tablet";
    }
    if (targetDevice === "desktop") {
      return "Desktop";
    }
    return "Custom";
  }
  var init_ExportPreviewDrawer = __esm({
    "src/components/ExportPreviewDrawer.tsx"() {
      "use strict";
      init_preact_module();
      init_hooks_module();
      init_editorModel();
    }
  });

  // src/components/FramePreview.tsx
  function FramePreview({
    frame,
    selectedNodeId,
    onSelect
  }) {
    var _a;
    const containerRef = A2(null);
    const [viewportSize, setViewportSize] = d2({
      width: 720,
      height: 560
    });
    const backgroundColor = (_a = getSolidFillColor(frame.style.fills)) != null ? _a : "#ffffff";
    const isSelected = selectedNodeId === frame.id;
    const fitPadding = 48;
    const reservedRightRail = 56;
    const reservedBottomRail = 56;
    const availableWidth = Math.max(120, viewportSize.width - fitPadding - reservedRightRail);
    const availableHeight = Math.max(120, viewportSize.height - fitPadding - reservedBottomRail);
    const scale = Math.min(
      1,
      availableWidth / Math.max(frame.geometry.width, 1),
      availableHeight / Math.max(frame.geometry.height, 1)
    );
    const previewWidth = Math.max(1, frame.geometry.width * scale);
    const previewHeight = Math.max(1, frame.geometry.height * scale);
    y2(() => {
      const container = containerRef.current;
      if (container == null) {
        return;
      }
      function updateViewportSize() {
        const currentContainer = containerRef.current;
        if (currentContainer == null) {
          return;
        }
        const rect = currentContainer.getBoundingClientRect();
        setViewportSize({
          width: rect.width,
          height: rect.height
        });
      }
      updateViewportSize();
      if (typeof ResizeObserver === "undefined") {
        window.addEventListener("resize", updateViewportSize);
        return () => window.removeEventListener("resize", updateViewportSize);
      }
      const observer = new ResizeObserver(updateViewportSize);
      observer.observe(container);
      return () => observer.disconnect();
    }, []);
    return /* @__PURE__ */ k("div", { ref: containerRef, class: "h-full min-h-[240px] overflow-hidden p-6" }, /* @__PURE__ */ k(
      "div",
      {
        class: "flex h-full items-center justify-center",
        style: {
          width: `${availableWidth}px`,
          height: `${availableHeight}px`
        }
      },
      /* @__PURE__ */ k(
        "div",
        {
          class: "relative overflow-hidden rounded border border-[#d1d5db] shadow-sm",
          onClick: () => onSelect(frame.id),
          style: {
            width: `${previewWidth}px`,
            height: `${previewHeight}px`,
            backgroundColor,
            outline: isSelected ? "2px solid #0f766e" : void 0,
            outlineOffset: isSelected ? "-2px" : void 0
          }
        },
        frame.children.map((child) => /* @__PURE__ */ k(
          PreviewNode,
          {
            key: child.id,
            node: child,
            scale,
            selectedNodeId,
            onSelect
          }
        ))
      )
    ));
  }
  function PreviewNode({
    node,
    scale,
    selectedNodeId,
    onSelect
  }) {
    var _a, _b, _c;
    if (!node.visible) {
      return null;
    }
    if (isVirtualGroup(node)) {
      const isSelected2 = selectedNodeId === node.id;
      const box = getChildrenBounds(node.children);
      const width = Math.max(node.geometry.width, (_a = box == null ? void 0 : box.width) != null ? _a : 0);
      const height = Math.max(node.geometry.height, (_b = box == null ? void 0 : box.height) != null ? _b : 0);
      return /* @__PURE__ */ k(
        "div",
        {
          class: "absolute cursor-pointer overflow-visible",
          title: node.name,
          onClick: (event) => {
            event.stopPropagation();
            onSelect(node.id);
          },
          style: {
            left: `${node.geometry.x * scale}px`,
            top: `${node.geometry.y * scale}px`,
            width: `${Math.max(1, width * scale)}px`,
            height: `${Math.max(1, height * scale)}px`,
            outline: isSelected2 ? "2px solid #0f766e" : "1px dashed rgba(15, 118, 110, 0.5)",
            outlineOffset: isSelected2 ? "-2px" : "-1px"
          }
        },
        node.children.map((child) => /* @__PURE__ */ k(
          PreviewNode,
          {
            key: child.id,
            node: child,
            scale,
            selectedNodeId,
            onSelect
          }
        ))
      );
    }
    const fillColor = getSolidFillColor(node.style.fills);
    const isTextNode = node.text != null;
    const backgroundColor = isTextNode ? void 0 : fillColor;
    const textColor = isTextNode ? fillColor : void 0;
    const borderColor = getSolidFillColor(node.style.strokes);
    const borderWidth = borderColor == null ? 0 : Math.max(1, ((_c = node.style.strokeWeight) != null ? _c : 1) * scale);
    const isSelected = selectedNodeId === node.id;
    return /* @__PURE__ */ k(
      "div",
      {
        class: "absolute cursor-pointer overflow-hidden",
        title: node.name,
        onClick: (event) => {
          event.stopPropagation();
          onSelect(node.id);
        },
        style: {
          left: `${node.geometry.x * scale}px`,
          top: `${node.geometry.y * scale}px`,
          width: `${node.geometry.width * scale}px`,
          height: `${node.geometry.height * scale}px`,
          opacity: node.style.opacity,
          backgroundColor,
          borderColor,
          borderStyle: borderColor == null ? void 0 : "solid",
          borderWidth: `${borderWidth}px`,
          borderRadius: getCornerRadius(node.style.cornerRadius, scale),
          outline: isSelected ? "2px solid #0f766e" : void 0,
          outlineOffset: isSelected ? "-2px" : void 0
        }
      },
      node.text != null && /* @__PURE__ */ k(
        "div",
        {
          class: "h-full w-full overflow-hidden",
          style: {
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            justifyContent: getTextVerticalJustify(node),
            fontSize: typeof node.text.fontSize === "number" ? `${node.text.fontSize * scale}px` : void 0,
            fontFamily: getTextFontFamily(node),
            fontWeight: getTextFontWeight(node),
            lineHeight: getTextLineHeight(node, scale),
            color: textColor != null ? textColor : "#1f2937",
            textAlign: getTextHorizontalAlign(node),
            whiteSpace: "pre-wrap",
            wordBreak: "break-word"
          }
        },
        node.text.characters
      ),
      node.children.map((child) => /* @__PURE__ */ k(
        PreviewNode,
        {
          key: child.id,
          node: child,
          scale,
          selectedNodeId,
          onSelect
        }
      ))
    );
  }
  var init_FramePreview = __esm({
    "src/components/FramePreview.tsx"() {
      "use strict";
      init_preact_module();
      init_hooks_module();
      init_editorModel();
    }
  });

  // src/components/FlexLayoutPanel.tsx
  function FlexLayoutPanel({
    node,
    parentLayoutMode,
    onChange
  }) {
    var _a, _b, _c, _d, _e, _f;
    const layout = node.layout;
    const isContainer = node.children.length > 0 || isFrameLikeNode(node);
    const padding = (_a = layout.padding) != null ? _a : {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    };
    const margin = (_b = layout.margin) != null ? _b : {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    };
    const widthSizing = getCurrentWidthSizing();
    const heightSizing = getCurrentHeightSizing();
    const sizingOptions = getSizingOptions(parentLayoutMode != null);
    function updateLayout(nextLayout, options = {}) {
      onChange(__spreadProps(__spreadValues({}, node), {
        layout: __spreadValues(__spreadProps(__spreadValues({}, layout), {
          isAutoLayout: options.forceAutoLayout === true || layout.isAutoLayout || isContainer
        }), nextLayout)
      }));
    }
    function updateWidthSizing(sizingMode) {
      const safeSizingMode = normalizeSelectableSizingMode(sizingMode, parentLayoutMode);
      updateLayout(normalizeChildSizingForParent({
        widthSizing: safeSizingMode,
        heightSizing
      }, {
        parentLayoutMode
      }, __spreadValues(__spreadValues({
        layoutSizingHorizontal: safeSizingMode
      }, isContainer && layout.layoutMode === "HORIZONTAL" ? { primaryAxisSizingMode: toAxisSizingMode(safeSizingMode) } : {}), isContainer && layout.layoutMode !== "HORIZONTAL" ? { counterAxisSizingMode: toAxisSizingMode(safeSizingMode) } : {})));
    }
    function updateHeightSizing(sizingMode) {
      const safeSizingMode = normalizeSelectableSizingMode(sizingMode, parentLayoutMode);
      updateLayout(normalizeChildSizingForParent({
        widthSizing,
        heightSizing: safeSizingMode
      }, {
        parentLayoutMode
      }, __spreadValues(__spreadValues({
        layoutSizingVertical: safeSizingMode
      }, isContainer && layout.layoutMode === "VERTICAL" ? { primaryAxisSizingMode: toAxisSizingMode(safeSizingMode) } : {}), isContainer && layout.layoutMode !== "VERTICAL" ? { counterAxisSizingMode: toAxisSizingMode(safeSizingMode) } : {})));
    }
    function stretchToParent() {
      updateWidthSizing("FILL");
    }
    function updateDirection(layoutMode) {
      var _a2;
      const currentLayoutMode = layout.layoutMode === "HORIZONTAL" ? "HORIZONTAL" : "VERTICAL";
      if (currentLayoutMode === layoutMode) {
        return;
      }
      const nextChildren = node.children.map(
        (child) => normalizeChildForParentDirection(child, currentLayoutMode, layoutMode)
      );
      const nextItemSpacing = Math.min((_a2 = layout.itemSpacing) != null ? _a2 : 0, 48);
      onChange(__spreadProps(__spreadValues({}, node), {
        children: nextChildren,
        layout: __spreadValues(__spreadProps(__spreadValues({}, layout), {
          isAutoLayout: true,
          autoLayoutDirection: layoutMode,
          layoutMode,
          itemSpacing: nextItemSpacing,
          // Keep the container wrapped around its children on the new main axis.
          primaryAxisSizingMode: "AUTO"
        }), layoutMode === "VERTICAL" ? { layoutSizingVertical: "HUG" } : { layoutSizingHorizontal: "HUG" })
      }));
    }
    function updateWidthValue(width) {
      const nextWidth = clampDimension(width);
      updateLayoutAndGeometry(
        normalizeChildSizingForParent({
          widthSizing: "FIXED",
          heightSizing
        }, {
          parentLayoutMode
        }, __spreadValues(__spreadValues({
          layoutSizingHorizontal: "FIXED"
        }, isContainer && layout.layoutMode === "HORIZONTAL" ? { primaryAxisSizingMode: "FIXED" } : {}), isContainer && layout.layoutMode !== "HORIZONTAL" ? { counterAxisSizingMode: "FIXED" } : {})),
        nextWidth,
        node.geometry.height
      );
    }
    function updateHeightValue(height) {
      const nextHeight = clampDimension(height);
      updateLayoutAndGeometry(
        normalizeChildSizingForParent({
          widthSizing,
          heightSizing: "FIXED"
        }, {
          parentLayoutMode
        }, __spreadValues(__spreadValues({
          layoutSizingVertical: "FIXED"
        }, isContainer && layout.layoutMode === "VERTICAL" ? { primaryAxisSizingMode: "FIXED" } : {}), isContainer && layout.layoutMode !== "VERTICAL" ? { counterAxisSizingMode: "FIXED" } : {})),
        node.geometry.width,
        nextHeight
      );
    }
    function updateLayoutAndGeometry(nextLayout, width, height) {
      onChange(__spreadProps(__spreadValues({}, node), {
        geometry: createEditorGeometry(
          node.geometry.x,
          node.geometry.y,
          width,
          height,
          node.geometry
        ),
        layout: __spreadValues(__spreadProps(__spreadValues({}, layout), {
          isAutoLayout: layout.isAutoLayout || isContainer
        }), nextLayout)
      }));
    }
    function getCurrentWidthSizing() {
      return getSizingMode(
        layout.layoutSizingHorizontal,
        layout.layoutMode === "HORIZONTAL" ? layout.primaryAxisSizingMode : layout.counterAxisSizingMode,
        parentLayoutMode != null
      );
    }
    function getCurrentHeightSizing() {
      return getSizingMode(
        layout.layoutSizingVertical,
        layout.layoutMode === "VERTICAL" ? layout.primaryAxisSizingMode : layout.counterAxisSizingMode,
        parentLayoutMode != null
      );
    }
    return /* @__PURE__ */ k("section", { class: "bg-white p-3" }, /* @__PURE__ */ k("div", { class: "space-y-3" }, isContainer && /* @__PURE__ */ k(ControlGroup2, { label: "Direction" }, /* @__PURE__ */ k(
      SegmentedControl2,
      {
        value: layout.layoutMode === "HORIZONTAL" ? "HORIZONTAL" : "VERTICAL",
        options: [
          { value: "HORIZONTAL", label: "Row" },
          { value: "VERTICAL", label: "Column" }
        ],
        onChange: updateDirection
      }
    )), isContainer && /* @__PURE__ */ k("div", { class: "grid grid-cols-2 gap-2" }, /* @__PURE__ */ k(
      NumberField2,
      {
        label: "Gap",
        value: (_c = layout.itemSpacing) != null ? _c : 0,
        min: 0,
        max: 240,
        onChange: (itemSpacing) => updateLayout({ itemSpacing }, { forceAutoLayout: true })
      }
    ), /* @__PURE__ */ k(
      NumberField2,
      {
        label: "Wrap gap",
        value: (_d = layout.counterAxisSpacing) != null ? _d : 0,
        min: 0,
        max: 240,
        onChange: (counterAxisSpacing) => updateLayout({ counterAxisSpacing }, { forceAutoLayout: true })
      }
    )), isContainer && /* @__PURE__ */ k("div", { class: "grid grid-cols-2 gap-2" }, /* @__PURE__ */ k(
      SelectField,
      {
        label: "Justify items",
        value: (_e = layout.primaryAxisAlignItems) != null ? _e : "MIN",
        options: [
          { value: "MIN", label: "Start" },
          { value: "CENTER", label: "Center" },
          { value: "MAX", label: "End" },
          { value: "SPACE_BETWEEN", label: "Between" }
        ],
        onChange: (primaryAxisAlignItems) => updateLayout({ primaryAxisAlignItems }, { forceAutoLayout: true })
      }
    ), /* @__PURE__ */ k(
      SelectField,
      {
        label: "Align items",
        value: (_f = layout.counterAxisAlignItems) != null ? _f : "MIN",
        options: [
          { value: "MIN", label: "Start" },
          { value: "CENTER", label: "Center" },
          { value: "MAX", label: "End" },
          { value: "BASELINE", label: "Baseline" }
        ],
        onChange: (counterAxisAlignItems) => updateLayout({ counterAxisAlignItems }, { forceAutoLayout: true })
      }
    )), /* @__PURE__ */ k("div", { class: "grid grid-cols-2 gap-2" }, /* @__PURE__ */ k(
      SelectField,
      {
        label: "Width",
        value: widthSizing,
        options: sizingOptions,
        onChange: updateWidthSizing
      }
    ), /* @__PURE__ */ k(
      SelectField,
      {
        label: "Height",
        value: heightSizing,
        options: sizingOptions,
        onChange: updateHeightSizing
      }
    )), /* @__PURE__ */ k("div", { class: "grid grid-cols-2 gap-2" }, /* @__PURE__ */ k(
      NumberField2,
      {
        label: "W",
        value: Math.round(node.geometry.width),
        min: 1,
        max: 1e4,
        onChange: updateWidthValue
      }
    ), /* @__PURE__ */ k(
      NumberField2,
      {
        label: "H",
        value: Math.round(node.geometry.height),
        min: 1,
        max: 1e4,
        onChange: updateHeightValue
      }
    )), !isContainer && parentLayoutMode != null && /* @__PURE__ */ k(
      "button",
      {
        type: "button",
        onClick: stretchToParent,
        class: "h-11 w-full rounded-xl border border-[#0f766e] bg-[#ecfdf5] px-4 text-sm font-bold text-[#0f766e] transition hover:bg-[#ccfbf1]"
      },
      "Stretch width to parent"
    ), isContainer && /* @__PURE__ */ k(
      "button",
      {
        type: "button",
        onClick: () => updateLayout({
          layoutWrap: layout.layoutWrap === "WRAP" ? "NO_WRAP" : "WRAP"
        }, { forceAutoLayout: true }),
        class: `h-11 w-full rounded-xl border px-4 text-sm font-semibold transition ${layout.layoutWrap === "WRAP" ? "border-[#d97706] bg-[#fbbf24] text-[#111827] shadow-sm" : "border-[#cbd5e1] bg-[#f8fafc] text-gray-600 hover:border-gray-300 hover:bg-white"}`
      },
      "Wrap children"
    ), isContainer && /* @__PURE__ */ k(
      BoxModelVisualizer,
      {
        margin,
        padding,
        onMarginChange: (nextMargin) => updateLayout({ margin: nextMargin }, { forceAutoLayout: true }),
        onPaddingChange: (nextPadding) => updateLayout({ padding: nextPadding }, { forceAutoLayout: true })
      }
    )));
  }
  function isFrameLikeNode(node) {
    return node.type === "FRAME" || node.type === "COMPONENT" || node.type === "INSTANCE";
  }
  function getSizingMode(layoutSizing, axisSizing, canFillParent) {
    if (canFillParent && layoutSizing === "FILL") {
      return "FILL";
    }
    if (layoutSizing === "FILL" || layoutSizing === "HUG" || layoutSizing === "FIXED") {
      return layoutSizing === "FILL" ? "FIXED" : layoutSizing;
    }
    if (axisSizing === "AUTO") {
      return "HUG";
    }
    return "FIXED";
  }
  function getSizingOptions(canFillParent) {
    const options = [
      { value: "HUG", label: "Hug" },
      { value: "FIXED", label: "Fixed" }
    ];
    return canFillParent ? [{ value: "FILL", label: "Fill" }, ...options] : options;
  }
  function normalizeSelectableSizingMode(sizingMode, parentLayoutMode) {
    return sizingMode === "FILL" && parentLayoutMode == null ? "FIXED" : sizingMode;
  }
  function normalizeChildForParentDirection(child, currentParentLayoutMode, nextParentLayoutMode) {
    const widthSizing = getChildAxisSizingForParent(
      child,
      getSourceAxisForTargetAxis2("horizontal", nextParentLayoutMode, currentParentLayoutMode),
      currentParentLayoutMode
    );
    const heightSizing = getChildAxisSizingForParent(
      child,
      getSourceAxisForTargetAxis2("vertical", nextParentLayoutMode, currentParentLayoutMode),
      currentParentLayoutMode
    );
    return __spreadProps(__spreadValues({}, child), {
      layout: __spreadValues(__spreadValues({}, child.layout), normalizeChildSizingForParent({
        widthSizing,
        heightSizing
      }, {
        parentLayoutMode: nextParentLayoutMode
      }, {
        layoutSizingHorizontal: widthSizing,
        layoutSizingVertical: heightSizing
      }))
    });
  }
  function getChildAxisSizingForParent(child, axis, parentLayoutMode) {
    const layoutSizing = axis === "horizontal" ? child.layout.layoutSizingHorizontal : child.layout.layoutSizingVertical;
    if (layoutSizing === "FILL" || layoutSizing === "HUG" || layoutSizing === "FIXED") {
      return layoutSizing;
    }
    const axisSizing = axisMatchesPrimaryAxis3(child, axis) ? child.layout.primaryAxisSizingMode : child.layout.counterAxisSizingMode;
    if (axisSizing === "AUTO") {
      return "HUG";
    }
    if (axisSizing === "FIXED") {
      return "FIXED";
    }
    if (child.layout.layoutAlign === "STRETCH" && axisMatchesCrossAxis3(parentLayoutMode, axis)) {
      return "FILL";
    }
    if (typeof child.layout.layoutGrow === "number" && child.layout.layoutGrow > 0 && axisMatchesPrimaryParentAxis3(parentLayoutMode, axis)) {
      return "FILL";
    }
    return "FIXED";
  }
  function axisMatchesPrimaryAxis3(child, axis) {
    return axis === "horizontal" ? child.layout.layoutMode === "HORIZONTAL" : child.layout.layoutMode === "VERTICAL";
  }
  function axisMatchesPrimaryParentAxis3(parentLayoutMode, axis) {
    return axis === "horizontal" ? parentLayoutMode === "HORIZONTAL" : parentLayoutMode === "VERTICAL";
  }
  function axisMatchesCrossAxis3(parentLayoutMode, axis) {
    return axis === "horizontal" ? parentLayoutMode === "VERTICAL" : parentLayoutMode === "HORIZONTAL";
  }
  function getSourceAxisForTargetAxis2(axis, targetParentLayoutMode, sourceParentLayoutMode) {
    if (targetParentLayoutMode === sourceParentLayoutMode) {
      return axis;
    }
    return axisMatchesPrimaryParentAxis3(targetParentLayoutMode, axis) ? getParentAxis2(sourceParentLayoutMode, "primary") : getParentAxis2(sourceParentLayoutMode, "cross");
  }
  function getParentAxis2(parentLayoutMode, role) {
    if (role === "primary") {
      return parentLayoutMode === "HORIZONTAL" ? "horizontal" : "vertical";
    }
    return parentLayoutMode === "HORIZONTAL" ? "vertical" : "horizontal";
  }
  function clampDimension(value) {
    return Math.min(1e4, Math.max(1, Math.round(value)));
  }
  function toAxisSizingMode(sizingMode) {
    return sizingMode === "HUG" ? "AUTO" : "FIXED";
  }
  function normalizeChildSizingForParent(sizing, context, nextLayout) {
    if (context.parentLayoutMode === "HORIZONTAL") {
      return __spreadProps(__spreadValues({}, nextLayout), {
        layoutGrow: sizing.widthSizing === "FILL" ? 1 : 0,
        layoutAlign: sizing.heightSizing === "FILL" ? "STRETCH" : "INHERIT"
      });
    }
    if (context.parentLayoutMode === "VERTICAL") {
      return __spreadProps(__spreadValues({}, nextLayout), {
        layoutGrow: sizing.heightSizing === "FILL" ? 1 : 0,
        layoutAlign: sizing.widthSizing === "FILL" ? "STRETCH" : "INHERIT"
      });
    }
    return __spreadProps(__spreadValues({}, nextLayout), {
      layoutGrow: 0,
      layoutAlign: "INHERIT"
    });
  }
  function ControlGroup2({
    label,
    children
  }) {
    return /* @__PURE__ */ k("label", { class: "block" }, /* @__PURE__ */ k("span", { class: "mb-1 block text-[11px] font-semibold text-gray-600" }, label), children);
  }
  function SegmentedControl2({
    value,
    options,
    onChange
  }) {
    return /* @__PURE__ */ k("div", { class: "grid grid-cols-2 gap-1.5 rounded-2xl border border-[#cbd5e1] bg-[#e2e8f0] p-1.5" }, options.map((option) => {
      const isSelected = value === option.value;
      return /* @__PURE__ */ k(
        "button",
        {
          key: option.value,
          type: "button",
          onClick: () => onChange(option.value),
          class: `min-h-9 rounded-xl px-4 py-2 text-sm font-semibold transition ${isSelected ? "bg-[#fbbf24] text-[#111827] shadow-sm" : "text-gray-600 hover:bg-white/70 hover:text-gray-900"}`
        },
        option.label
      );
    }));
  }
  function NumberField2({
    label,
    value,
    min,
    max,
    onChange
  }) {
    return /* @__PURE__ */ k("label", { class: "block" }, /* @__PURE__ */ k("span", { class: "mb-1 block text-[11px] font-semibold text-gray-600" }, label), /* @__PURE__ */ k(
      "input",
      {
        type: "number",
        value: String(value),
        min,
        max,
        onInput: (event) => {
          const nextValue = Number(event.currentTarget.value);
          if (Number.isFinite(nextValue)) {
            onChange(Math.min(max, Math.max(min, nextValue)));
          }
        },
        class: "h-11 w-full rounded-xl border border-[#e5e7eb] bg-white px-4 text-sm font-semibold text-gray-900 outline-none transition focus:border-[#0f766e] focus:ring-2 focus:ring-[#0f766e]/10"
      }
    ));
  }
  function SelectField({
    label,
    value,
    options,
    onChange
  }) {
    return /* @__PURE__ */ k("label", { class: "block" }, /* @__PURE__ */ k("span", { class: "mb-1 block text-[11px] font-semibold text-gray-600" }, label), /* @__PURE__ */ k(
      "select",
      {
        value,
        onInput: (event) => onChange(event.currentTarget.value),
        class: "h-11 w-full rounded-xl border border-[#e5e7eb] bg-white px-4 text-sm font-semibold text-gray-900 outline-none transition focus:border-[#0f766e] focus:ring-2 focus:ring-[#0f766e]/10"
      },
      options.map((option) => /* @__PURE__ */ k("option", { key: option.value, value: option.value }, option.label))
    ));
  }
  function BoxModelVisualizer({
    margin,
    padding,
    onMarginChange,
    onPaddingChange
  }) {
    function updateMargin(side, nextValue) {
      onMarginChange(__spreadProps(__spreadValues({}, margin), {
        [side]: nextValue
      }));
    }
    function updatePadding(side, nextValue) {
      onPaddingChange(__spreadProps(__spreadValues({}, padding), {
        [side]: nextValue
      }));
    }
    return /* @__PURE__ */ k("div", null, /* @__PURE__ */ k("p", { class: "mb-2 text-[11px] font-bold uppercase tracking-wide text-gray-500" }, "Box model"), /* @__PURE__ */ k("div", { class: "rounded-lg border border-[#d1d5db] bg-[#f8fafc] p-2" }, /* @__PURE__ */ k("div", { class: "grid grid-cols-[48px_minmax(0,1fr)_48px] grid-rows-[40px_1fr_40px] gap-1 rounded-md border border-dashed border-[#f59e0b] bg-[#fffbeb] p-2" }, /* @__PURE__ */ k(BoxModelLabel, { text: "Margin", tone: "margin" }), /* @__PURE__ */ k(
      BoxModelInput,
      {
        label: "Margin top",
        value: margin.top,
        onChange: (nextValue) => updateMargin("top", nextValue)
      }
    ), /* @__PURE__ */ k("div", null), /* @__PURE__ */ k(
      BoxModelInput,
      {
        label: "Margin left",
        value: margin.left,
        onChange: (nextValue) => updateMargin("left", nextValue)
      }
    ), /* @__PURE__ */ k("div", { class: "grid grid-cols-[44px_minmax(0,1fr)_44px] grid-rows-[36px_1fr_36px] gap-1 rounded-md border border-dashed border-[#0f766e] bg-[#ecfdf5] p-2" }, /* @__PURE__ */ k(BoxModelLabel, { text: "Padding", tone: "padding" }), /* @__PURE__ */ k(
      BoxModelInput,
      {
        label: "Padding top",
        value: padding.top,
        onChange: (nextValue) => updatePadding("top", nextValue)
      }
    ), /* @__PURE__ */ k("div", null), /* @__PURE__ */ k(
      BoxModelInput,
      {
        label: "Padding left",
        value: padding.left,
        onChange: (nextValue) => updatePadding("left", nextValue)
      }
    ), /* @__PURE__ */ k("div", { class: "flex min-h-12 items-center justify-center rounded border border-[#cbd5e1] bg-white px-2" }, /* @__PURE__ */ k("span", { class: "truncate text-[10px] font-bold uppercase tracking-wide text-gray-400" }, "Content")), /* @__PURE__ */ k(
      BoxModelInput,
      {
        label: "Padding right",
        value: padding.right,
        onChange: (nextValue) => updatePadding("right", nextValue)
      }
    ), /* @__PURE__ */ k("div", null), /* @__PURE__ */ k(
      BoxModelInput,
      {
        label: "Padding bottom",
        value: padding.bottom,
        onChange: (nextValue) => updatePadding("bottom", nextValue)
      }
    ), /* @__PURE__ */ k("div", null)), /* @__PURE__ */ k(
      BoxModelInput,
      {
        label: "Margin right",
        value: margin.right,
        onChange: (nextValue) => updateMargin("right", nextValue)
      }
    ), /* @__PURE__ */ k("div", null), /* @__PURE__ */ k(
      BoxModelInput,
      {
        label: "Margin bottom",
        value: margin.bottom,
        onChange: (nextValue) => updateMargin("bottom", nextValue)
      }
    ), /* @__PURE__ */ k("div", null))));
  }
  function BoxModelLabel({
    text,
    tone
  }) {
    return /* @__PURE__ */ k(
      "div",
      {
        class: `flex items-center text-[10px] font-bold uppercase tracking-wide ${tone === "margin" ? "text-[#b45309]" : "text-[#0f766e]"}`
      },
      text
    );
  }
  function BoxModelInput({
    label,
    value,
    onChange
  }) {
    return /* @__PURE__ */ k("label", { class: "block min-w-0", title: label }, /* @__PURE__ */ k("span", { class: "sr-only" }, label), /* @__PURE__ */ k(
      "input",
      {
        type: "number",
        value: String(value),
        min: 0,
        max: 240,
        "aria-label": label,
        onInput: (event) => {
          const nextValue = Number(event.currentTarget.value);
          if (Number.isFinite(nextValue)) {
            onChange(Math.min(240, Math.max(0, nextValue)));
          }
        },
        class: "h-full min-h-8 w-full rounded border border-white/80 bg-white/90 px-1 text-center text-xs font-bold text-gray-900 outline-none transition focus:border-[#0f766e] focus:ring-2 focus:ring-[#0f766e]/10"
      }
    ));
  }
  var init_FlexLayoutPanel = __esm({
    "src/components/FlexLayoutPanel.tsx"() {
      "use strict";
      init_preact_module();
      init_editorModel();
    }
  });

  // src/components/LayerPanel.tsx
  function LayerPanel({
    frame,
    selectedNodeId,
    layoutRules,
    onSelect,
    onFrameChange
  }) {
    const [draggedNodeId, setDraggedNodeId] = d2(null);
    const [isLayoutPanelOpen, setIsLayoutPanelOpen] = d2(true);
    const [contextMenu, setContextMenu] = d2(null);
    const [selectedLayerIds, setSelectedLayerIds] = d2(
      selectedNodeId == null ? [] : [selectedNodeId]
    );
    const [lastSelectedLayerId, setLastSelectedLayerId] = d2(selectedNodeId);
    const selectedNode = selectedNodeId == null ? null : findNode(frame, selectedNodeId);
    const selectedParentNode = selectedNodeId == null ? null : findParentNode(frame, selectedNodeId);
    const selectedParentLayoutMode = getLayoutMode(selectedParentNode);
    const visibleLayerIds = getVisibleLayerIds(frame);
    y2(() => {
      if (selectedNodeId != null) {
        setIsLayoutPanelOpen(true);
      }
    }, [selectedNodeId]);
    y2(() => {
      setSelectedLayerIds((currentIds) => {
        if (selectedNodeId == null) {
          return [];
        }
        if (currentIds.includes(selectedNodeId)) {
          return currentIds;
        }
        return [selectedNodeId];
      });
      setLastSelectedLayerId(selectedNodeId);
    }, [selectedNodeId]);
    y2(() => {
      if (contextMenu == null) {
        return;
      }
      function closeContextMenu() {
        setContextMenu(null);
      }
      function closeContextMenuOnEscape(event) {
        if (event.key === "Escape") {
          setContextMenu(null);
        }
      }
      window.addEventListener("click", closeContextMenu);
      window.addEventListener("keydown", closeContextMenuOnEscape);
      return () => {
        window.removeEventListener("click", closeContextMenu);
        window.removeEventListener("keydown", closeContextMenuOnEscape);
      };
    }, [contextMenu]);
    function moveLayerToGroup(nodeId, groupId) {
      var _a;
      if (nodeId === frame.id || nodeId === groupId) {
        return;
      }
      const target = findNode(frame, groupId);
      if (target == null || !canAcceptDrop(target) || containsNode((_a = findNode(frame, nodeId)) != null ? _a : target, groupId)) {
        return;
      }
      const movedFrame = moveNodeIntoGroup(frame, nodeId, groupId);
      if (movedFrame != null) {
        onFrameChange(normalizeVirtualGroupGeometry(movedFrame));
        onSelect(nodeId);
      }
    }
    function selectLayer(nodeId, event) {
      const isRangeSelection = (event == null ? void 0 : event.shiftKey) === true && lastSelectedLayerId != null;
      const isToggleSelection = (event == null ? void 0 : event.metaKey) === true || (event == null ? void 0 : event.ctrlKey) === true;
      if (isRangeSelection) {
        const rangeIds = getLayerRange(visibleLayerIds, lastSelectedLayerId, nodeId);
        const nextIds = isToggleSelection ? mergeUniqueIds(selectedLayerIds, rangeIds) : rangeIds;
        setSelectedLayerIds(nextIds);
        onSelect(nodeId);
        return;
      }
      if (isToggleSelection) {
        const nextIds = selectedLayerIds.includes(nodeId) ? selectedLayerIds.filter((id) => id !== nodeId) : [...selectedLayerIds, nodeId];
        const normalizedIds = nextIds.length === 0 ? [nodeId] : nextIds;
        setSelectedLayerIds(normalizedIds);
        setLastSelectedLayerId(nodeId);
        onSelect(nodeId);
        return;
      }
      setSelectedLayerIds([nodeId]);
      setLastSelectedLayerId(nodeId);
      onSelect(nodeId);
    }
    function selectAllLayers() {
      const selectableIds = visibleLayerIds.filter((id) => id !== frame.id);
      if (selectableIds.length === 0) {
        return;
      }
      setSelectedLayerIds(selectableIds);
      setLastSelectedLayerId(selectableIds[selectableIds.length - 1]);
      onSelect(selectableIds[selectableIds.length - 1]);
    }
    function collapseSelection() {
      if (selectedNodeId != null) {
        setSelectedLayerIds([selectedNodeId]);
        setLastSelectedLayerId(selectedNodeId);
      }
    }
    function handleLayerPanelKeyDown(event) {
      const target = event.target;
      const isTextInput = target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement;
      if (isTextInput) {
        return;
      }
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "a") {
        event.preventDefault();
        selectAllLayers();
        return;
      }
      if (event.key === "Escape" && selectedNodeId != null && selectedLayerIds.length > 1) {
        event.preventDefault();
        collapseSelection();
        return;
      }
      if ((event.key === "Backspace" || event.key === "Delete") && selectedLayerIds.some((id) => id !== frame.id)) {
        event.preventDefault();
        deleteLayers(selectedLayerIds);
      }
    }
    function addGroupInside(nodeId) {
      const target = findNode(frame, nodeId);
      if (target == null || !canAcceptDrop(target)) {
        return;
      }
      const group = createVirtualGroup();
      onFrameChange(
        normalizeVirtualGroupGeometry(
          updateNode(frame, nodeId, (node) => __spreadProps(__spreadValues({}, node), {
            children: [...node.children, group]
          }))
        )
      );
      onSelect(group.id);
    }
    function wrapLayer(nodeId) {
      var _a, _b;
      const wrappedFrame = wrapNodeInGroup(frame, nodeId);
      if (wrappedFrame != null) {
        onFrameChange(normalizeVirtualGroupGeometry(wrappedFrame));
        onSelect((_b = (_a = findParentNode(wrappedFrame, nodeId)) == null ? void 0 : _a.id) != null ? _b : nodeId);
      }
    }
    function deleteLayer(nodeId) {
      deleteLayers([nodeId]);
    }
    function deleteLayers(nodeIds) {
      var _a, _b;
      const actionIds = getTopLevelSelectedIds(frame, nodeIds).filter((id) => id !== frame.id);
      if (actionIds.length === 0) {
        return;
      }
      const firstParent = findParentNode(frame, actionIds[0]);
      const nextFrame = actionIds.reduce((currentFrame, nodeId) => {
        if (currentFrame == null) {
          return null;
        }
        return deleteNodeFromFrame(currentFrame, nodeId);
      }, frame);
      if (nextFrame != null) {
        onFrameChange(normalizeVirtualGroupGeometry(nextFrame));
        setSelectedLayerIds([(_a = firstParent == null ? void 0 : firstParent.id) != null ? _a : frame.id]);
        onSelect((_b = firstParent == null ? void 0 : firstParent.id) != null ? _b : frame.id);
      }
    }
    function changeResponsiveRule(nodeId, nextRule) {
      onFrameChange(
        updateNode(frame, nodeId, (node) => {
          const responsive = __spreadValues({}, node.responsive);
          if (nextRule == null) {
            delete responsive.nodeRule;
          } else {
            responsive.nodeRule = nextRule;
          }
          return __spreadProps(__spreadValues({}, node), {
            responsive
          });
        })
      );
    }
    function changeResponsiveReplacement(nodeId, nextReplacement) {
      onFrameChange(
        updateNode(frame, nodeId, (node) => {
          const responsive = __spreadValues({}, node.responsive);
          if (nextReplacement == null) {
            delete responsive.replacement;
          } else {
            responsive.replacement = nextReplacement;
          }
          return __spreadProps(__spreadValues({}, node), {
            responsive
          });
        })
      );
    }
    function openContextMenu(event, nodeId) {
      event.preventDefault();
      event.stopPropagation();
      if (!selectedLayerIds.includes(nodeId)) {
        selectLayer(nodeId);
      }
      setContextMenu({
        nodeId,
        x: event.clientX,
        y: event.clientY
      });
    }
    return /* @__PURE__ */ k(
      "aside",
      {
        class: "relative flex h-full min-h-0 flex-col overflow-hidden border-l border-[#e5e7eb] bg-white",
        tabIndex: 0,
        onKeyDown: handleLayerPanelKeyDown
      },
      /* @__PURE__ */ k("div", { class: "border-b border-[#e5e7eb] px-4 py-3" }, /* @__PURE__ */ k("h3", { class: "text-xs font-bold uppercase tracking-wide text-gray-500" }, "Layers")),
      /* @__PURE__ */ k(
        LayerTools,
        {
          frame,
          selectedNodeId,
          onSelect,
          onFrameChange
        }
      ),
      /* @__PURE__ */ k("div", { class: `shrink-0 overflow-auto p-3 ${selectedNode == null ? "min-h-0 flex-1" : "max-h-[30%] min-h-28"}` }, /* @__PURE__ */ k(
        LayerNode,
        {
          node: frame,
          depth: 0,
          selectedNodeId,
          selectedLayerIds,
          draggedNodeId,
          onSelect: selectLayer,
          onDragStart: setDraggedNodeId,
          onDragEnd: () => setDraggedNodeId(null),
          onMove: moveLayerToGroup,
          onOpenMenu: openContextMenu
        }
      )),
      contextMenu != null && /* @__PURE__ */ k(
        LayerContextMenu,
        {
          frame,
          state: contextMenu,
          selectedLayerIds,
          onClose: () => setContextMenu(null),
          onAddGroupInside: addGroupInside,
          onWrapLayer: wrapLayer,
          onDeleteLayers: deleteLayers
        }
      ),
      selectedNode != null && /* @__PURE__ */ k("div", { class: "flex min-h-0 flex-1 flex-col overflow-hidden border-t border-[#e5e7eb] bg-white" }, /* @__PURE__ */ k(
        "button",
        {
          type: "button",
          onClick: () => setIsLayoutPanelOpen((current) => !current),
          class: "flex h-11 w-full items-center justify-between px-3 text-left transition hover:bg-gray-50"
        },
        /* @__PURE__ */ k("div", { class: "min-w-0" }, /* @__PURE__ */ k("p", { class: "text-xs font-bold uppercase tracking-wide text-gray-500" }, "Layout"), /* @__PURE__ */ k("p", { class: "truncate text-[11px] font-semibold text-gray-900" }, selectedNode.name)),
        /* @__PURE__ */ k("span", { class: "shrink-0 text-xs font-semibold text-[#0f766e]" }, isLayoutPanelOpen ? "Hide" : "Edit")
      ), isLayoutPanelOpen && /* @__PURE__ */ k("div", { class: "min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-contain pb-8" }, /* @__PURE__ */ k(
        FlexLayoutPanel,
        {
          node: selectedNode,
          parentLayoutMode: selectedParentLayoutMode,
          onChange: (nextNode) => {
            const directionChanged = didLayoutDirectionChange(selectedNode, nextNode);
            const editableNode = directionChanged ? pinGeneratedLayoutDirection(nextNode, layoutRules) : nextNode;
            const laidOutNode = applyFlexLayoutToNode(editableNode);
            const frameWithUpdatedNode = updateNode(frame, laidOutNode.id, () => laidOutNode);
            const parentNode = findParentNode(frameWithUpdatedNode, laidOutNode.id);
            const frameWithParentLayout = parentNode == null ? frameWithUpdatedNode : updateNode(frameWithUpdatedNode, parentNode.id, (node) => applyFlexLayoutToNode(node));
            onFrameChange(
              normalizeVirtualGroupGeometry(
                frameWithParentLayout
              )
            );
          }
        }
      ), /* @__PURE__ */ k(
        ResponsiveBehaviorPanel,
        {
          node: selectedNode,
          globalRules: layoutRules,
          onChange: (nextRule) => changeResponsiveRule(selectedNode.id, nextRule),
          onReplacementChange: (nextReplacement) => changeResponsiveReplacement(selectedNode.id, nextReplacement)
        }
      )))
    );
  }
  function getLayoutMode(node) {
    if ((node == null ? void 0 : node.layout.layoutMode) === "HORIZONTAL" || (node == null ? void 0 : node.layout.layoutMode) === "VERTICAL") {
      return node.layout.layoutMode;
    }
    return null;
  }
  function didLayoutDirectionChange(previousNode, nextNode) {
    return getLayoutMode(previousNode) !== getLayoutMode(nextNode) && getLayoutMode(nextNode) != null;
  }
  function pinGeneratedLayoutDirection(node, globalRules) {
    var _a;
    return __spreadProps(__spreadValues({}, node), {
      responsive: __spreadProps(__spreadValues({}, node.responsive), {
        nodeRule: __spreadProps(__spreadValues(__spreadValues({}, createResponsiveNodeRule(globalRules)), (_a = node.responsive) == null ? void 0 : _a.nodeRule), {
          enabled: true,
          rowToColumnMode: "never"
        })
      })
    });
  }
  function LayerTools({
    frame,
    selectedNodeId,
    onSelect,
    onFrameChange
  }) {
    const selectedNode = selectedNodeId == null ? null : findNode(frame, selectedNodeId);
    const autoLayoutNodes = countAutoLayoutNodes(frame);
    function addGroup() {
      const group = createVirtualGroup();
      const parentId = selectedNode != null && isVirtualGroup(selectedNode) ? selectedNode.id : frame.id;
      onFrameChange(
        normalizeVirtualGroupGeometry(
          updateNode(frame, parentId, (node) => __spreadProps(__spreadValues({}, node), {
            children: [...node.children, group]
          }))
        )
      );
      onSelect(group.id);
    }
    return /* @__PURE__ */ k("div", { class: "border-b border-[#e5e7eb] p-3" }, /* @__PURE__ */ k("div", { class: "rounded-lg border border-[#e5e7eb] bg-gray-50 px-3 py-2" }, /* @__PURE__ */ k("p", { class: "text-xs font-semibold text-gray-700" }, "Auto Layout ready"), /* @__PURE__ */ k("p", { class: "mt-0.5 text-xs text-gray-500" }, autoLayoutNodes, " layout containers in this import")), /* @__PURE__ */ k("div", { class: "mt-3" }, /* @__PURE__ */ k(
      "button",
      {
        type: "button",
        onClick: addGroup,
        class: "w-full rounded-lg border border-[#e5e7eb] bg-white px-2 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-50"
      },
      "Add responsive group"
    )));
  }
  function LayerNode({
    node,
    depth,
    selectedNodeId,
    selectedLayerIds,
    draggedNodeId,
    onSelect,
    onDragStart,
    onDragEnd,
    onMove,
    onOpenMenu
  }) {
    var _a, _b;
    const isPrimarySelected = selectedNodeId === node.id;
    const isSelected = selectedLayerIds.includes(node.id);
    const isDragging = draggedNodeId === node.id;
    const acceptsDrop = draggedNodeId != null && draggedNodeId !== node.id && canAcceptDrop(node) && !containsNode(node, draggedNodeId);
    const kind = getLayerKind(node);
    return /* @__PURE__ */ k("div", null, /* @__PURE__ */ k(
      "button",
      {
        type: "button",
        draggable: depth > 0,
        onClick: (event) => onSelect(node.id, event),
        onContextMenu: (event) => onOpenMenu(event, node.id),
        onDragStart: (event) => {
          var _a2;
          (_a2 = event.dataTransfer) == null ? void 0 : _a2.setData("text/plain", node.id);
          onDragStart(node.id);
        },
        onDragEnd,
        onDragOver: (event) => {
          if (acceptsDrop) {
            event.preventDefault();
          }
        },
        onDrop: (event) => {
          var _a2;
          const droppedNodeId = ((_a2 = event.dataTransfer) == null ? void 0 : _a2.getData("text/plain")) || draggedNodeId;
          if (droppedNodeId != null && acceptsDrop) {
            event.preventDefault();
            onMove(droppedNodeId, node.id);
          }
        },
        class: `flex w-full items-center gap-2 rounded py-1.5 pr-2 pl-[var(--layer-indent)] text-left text-xs transition ${isPrimarySelected ? "bg-[#fbbf24] text-[#111827]" : isSelected ? "bg-[#fef3c7] text-[#111827] outline outline-1 outline-[#f59e0b]/40" : acceptsDrop ? "bg-green-50 text-gray-800 outline outline-1 outline-green-200" : isDragging ? "opacity-50" : "text-gray-800 hover:bg-gray-50"}`,
        style: { "--layer-indent": `${8 + depth * 18}px` }
      },
      /* @__PURE__ */ k(
        "span",
        {
          class: `h-1.5 w-1.5 shrink-0 rounded-full ${isPrimarySelected ? "bg-[#111827]" : isSelected ? "bg-[#d97706]" : canAcceptDrop(node) ? "bg-green-500" : "bg-gray-300"}`
        }
      ),
      /* @__PURE__ */ k("span", { class: "min-w-0 flex-1 truncate font-semibold" }, node.name),
      /* @__PURE__ */ k(
        "span",
        {
          class: `shrink-0 text-[10px] font-semibold ${isSelected ? "text-[#111827]" : "text-gray-400"}`
        },
        kind
      ),
      ((_b = (_a = node.responsive) == null ? void 0 : _a.nodeRule) == null ? void 0 : _b.enabled) === true && /* @__PURE__ */ k(
        "span",
        {
          class: `shrink-0 rounded border px-1 text-[9px] font-bold ${isSelected ? "border-[#111827]/20 text-[#111827]" : "border-[#0f766e]/20 bg-[#ecfdf5] text-[#0f766e]"}`
        },
        "RULE"
      )
    ), node.children.map((child) => /* @__PURE__ */ k(
      LayerNode,
      {
        key: child.id,
        node: child,
        depth: depth + 1,
        selectedNodeId,
        selectedLayerIds,
        draggedNodeId,
        onSelect,
        onDragStart,
        onDragEnd,
        onMove,
        onOpenMenu
      }
    )));
  }
  function ResponsiveBehaviorPanel({
    node,
    globalRules,
    onChange,
    onReplacementChange
  }) {
    var _a, _b;
    const isContainer = node.children.length > 0;
    const currentRule = (_a = node.responsive) == null ? void 0 : _a.nodeRule;
    const currentReplacement = (_b = node.responsive) == null ? void 0 : _b.replacement;
    const isCustom = (currentRule == null ? void 0 : currentRule.enabled) === true;
    const isReplacementEnabled = (currentReplacement == null ? void 0 : currentReplacement.enabled) === true;
    const rule = currentRule != null ? currentRule : createResponsiveNodeRule(globalRules);
    const replacement = currentReplacement != null ? currentReplacement : createResponsiveReplacementRule(globalRules);
    function updateRule(nextRule) {
      onChange(__spreadValues(__spreadProps(__spreadValues({}, rule), {
        enabled: true
      }), nextRule));
    }
    function updateReplacement(nextRule) {
      onReplacementChange(__spreadValues(__spreadProps(__spreadValues({}, replacement), {
        enabled: true
      }), nextRule));
    }
    return /* @__PURE__ */ k("section", { class: "border-t border-[#e5e7eb] bg-white p-3" }, /* @__PURE__ */ k("div", { class: "mb-2 flex items-center justify-between gap-2" }, /* @__PURE__ */ k("div", { class: "min-w-0" }, /* @__PURE__ */ k("p", { class: "text-xs font-bold uppercase tracking-wide text-gray-500" }, "Responsive"), /* @__PURE__ */ k("p", { class: "truncate text-[11px] font-semibold text-gray-900" }, node.name)), isCustom && /* @__PURE__ */ k("span", { class: "shrink-0 rounded border border-[#0f766e]/20 bg-[#ecfdf5] px-1.5 py-0.5 text-[9px] font-bold text-[#0f766e]" }, "CUSTOM")), !isContainer ? /* @__PURE__ */ k("div", { class: "space-y-2" }, /* @__PURE__ */ k("div", { class: "rounded-lg border border-[#e5e7eb] bg-gray-50 px-3 py-2 text-[11px] font-semibold text-gray-400" }, "Select a container layer for layout conversion rules."), /* @__PURE__ */ k(
      ReplacementControl,
      {
        node,
        replacement,
        isEnabled: isReplacementEnabled,
        onChange: onReplacementChange,
        onUpdate: updateReplacement
      }
    )) : /* @__PURE__ */ k("div", { class: "space-y-2" }, /* @__PURE__ */ k(
      LayerSegmentedControl,
      {
        value: isCustom ? "custom" : "inherit",
        options: [
          { value: "inherit", label: "Inherit" },
          { value: "custom", label: "Custom" }
        ],
        onChange: (value) => {
          if (value === "inherit") {
            onChange(void 0);
            return;
          }
          onChange(__spreadProps(__spreadValues({}, createResponsiveNodeRule(globalRules)), {
            enabled: true
          }));
        }
      }
    ), isCustom && /* @__PURE__ */ k("div", { class: "space-y-2" }, /* @__PURE__ */ k(
      ReplacementControl,
      {
        node,
        replacement,
        isEnabled: isReplacementEnabled,
        onChange: onReplacementChange,
        onUpdate: updateReplacement
      }
    ), /* @__PURE__ */ k(
      LayerSegmentedControl,
      {
        value: rule.conversionDirection,
        options: [
          { value: "row-to-column", label: "Row > Col" },
          { value: "column-to-row", label: "Col > Row" }
        ],
        onChange: (conversionDirection) => updateRule({ conversionDirection })
      }
    ), /* @__PURE__ */ k(
      LayerSegmentedControl,
      {
        value: rule.rowToColumnMode,
        options: [
          { value: "auto", label: "Auto" },
          { value: "always", label: "Always" },
          { value: "never", label: "Never" }
        ],
        onChange: (rowToColumnMode) => updateRule({ rowToColumnMode })
      }
    ), /* @__PURE__ */ k("div", { class: "grid grid-cols-2 gap-2" }, /* @__PURE__ */ k(
      LayerNumberField,
      {
        label: rule.conversionDirection === "row-to-column" ? "Max width" : "Min width",
        value: rule.rowToColumnBreakpoint,
        min: 240,
        max: 1600,
        onChange: (rowToColumnBreakpoint) => updateRule({ rowToColumnBreakpoint })
      }
    ), /* @__PURE__ */ k(
      LayerNumberField,
      {
        label: "Gap",
        value: rule.stackGap,
        min: 0,
        max: 120,
        onChange: (stackGap) => updateRule({ stackGap })
      }
    )), /* @__PURE__ */ k(
      LayerSegmentedControl,
      {
        value: rule.stackAlignment,
        options: [
          { value: "start", label: "Start" },
          { value: "center", label: "Center" },
          { value: "stretch", label: "Fill" }
        ],
        onChange: (stackAlignment) => updateRule({ stackAlignment })
      }
    )), !isCustom && /* @__PURE__ */ k(
      ReplacementControl,
      {
        node,
        replacement,
        isEnabled: isReplacementEnabled,
        onChange: onReplacementChange,
        onUpdate: updateReplacement
      }
    )));
  }
  function ReplacementControl({
    node,
    replacement,
    isEnabled,
    onChange,
    onUpdate
  }) {
    var _a;
    const sizeSource = (_a = replacement.sizeSource) != null ? _a : "custom";
    const customSize = Math.round(replacement.width);
    const resolvedSize = sizeSource === "width" ? Math.round(node.geometry.width) : sizeSource === "height" ? Math.round(node.geometry.height) : customSize;
    function updateSquareSize(size) {
      onUpdate({
        sizeSource: "custom",
        width: size,
        height: size
      });
    }
    return /* @__PURE__ */ k("div", { class: "rounded-lg border border-[#e5e7eb] bg-gray-50 p-2" }, /* @__PURE__ */ k("p", { class: "mb-2 text-[11px] font-bold uppercase tracking-wide text-gray-500" }, "Replacement"), /* @__PURE__ */ k(
      LayerSegmentedControl,
      {
        value: isEnabled ? "hamburger" : "off",
        options: [
          { value: "off", label: "Off" },
          { value: "hamburger", label: "Hamburger" }
        ],
        onChange: (value) => {
          var _a2;
          if (value === "off") {
            onChange(void 0);
            return;
          }
          onChange(__spreadProps(__spreadValues({}, replacement), {
            enabled: true,
            preset: "hamburger",
            sizeSource: (_a2 = replacement.sizeSource) != null ? _a2 : "height"
          }));
        }
      }
    ), isEnabled && /* @__PURE__ */ k("div", { class: "mt-2 space-y-2" }, /* @__PURE__ */ k(
      LayerSegmentedControl,
      {
        value: replacement.trigger,
        options: [
          { value: "auto", label: "Auto" },
          { value: "always", label: "Always" },
          { value: "never", label: "Never" }
        ],
        onChange: (trigger) => onUpdate({ trigger })
      }
    ), /* @__PURE__ */ k(
      LayerSegmentedControl,
      {
        value: sizeSource,
        options: [
          { value: "height", label: "Height" },
          { value: "width", label: "Width" },
          { value: "custom", label: "Custom" }
        ],
        onChange: (nextSizeSource) => {
          if (nextSizeSource === "custom") {
            updateSquareSize(customSize);
            return;
          }
          onUpdate({ sizeSource: nextSizeSource });
        }
      }
    ), /* @__PURE__ */ k("div", { class: "grid grid-cols-2 gap-2" }, /* @__PURE__ */ k(
      LayerNumberField,
      {
        label: "Max width",
        value: replacement.breakpoint,
        min: 240,
        max: 1600,
        onChange: (breakpoint) => onUpdate({ breakpoint })
      }
    ), /* @__PURE__ */ k(
      LayerNumberField,
      {
        label: "Size",
        value: resolvedSize,
        min: 16,
        max: 1e4,
        disabled: sizeSource !== "custom",
        onChange: updateSquareSize
      }
    ))));
  }
  function createResponsiveNodeRule(globalRules) {
    return {
      enabled: true,
      conversionDirection: globalRules.conversionDirection,
      rowToColumnMode: globalRules.rowToColumnMode,
      rowToColumnBreakpoint: globalRules.rowToColumnBreakpoint,
      stackGap: globalRules.stackGap,
      stackAlignment: globalRules.stackAlignment
    };
  }
  function createResponsiveReplacementRule(globalRules) {
    return {
      enabled: true,
      preset: "hamburger",
      trigger: "auto",
      breakpoint: globalRules.rowToColumnBreakpoint,
      sizeSource: "height",
      width: 44,
      height: 44
    };
  }
  function LayerSegmentedControl({
    value,
    options,
    onChange
  }) {
    return /* @__PURE__ */ k("div", { class: `grid gap-1 rounded-lg border border-[#cbd5e1] bg-[#e2e8f0] p-1 ${options.length === 2 ? "grid-cols-2" : "grid-cols-3"}` }, options.map((option) => {
      const isSelected = option.value === value;
      return /* @__PURE__ */ k(
        "button",
        {
          key: option.value,
          type: "button",
          onClick: () => onChange(option.value),
          class: `min-h-8 rounded-md px-2 text-[11px] font-bold transition ${isSelected ? "bg-[#fbbf24] text-[#111827] shadow-sm" : "text-gray-600 hover:bg-white/70 hover:text-gray-900"}`
        },
        option.label
      );
    }));
  }
  function LayerNumberField({
    label,
    value,
    min,
    max,
    disabled = false,
    onChange
  }) {
    return /* @__PURE__ */ k("label", { class: "block" }, /* @__PURE__ */ k("span", { class: "mb-1 block text-[10px] font-bold uppercase text-gray-400" }, label), /* @__PURE__ */ k(
      "input",
      {
        type: "number",
        value: String(value),
        min,
        max,
        disabled,
        onInput: (event) => {
          const nextValue = Number(event.currentTarget.value);
          if (Number.isFinite(nextValue)) {
            onChange(Math.min(max, Math.max(min, nextValue)));
          }
        },
        class: `h-9 w-full rounded-lg border border-[#e5e7eb] px-2 text-xs font-bold outline-none transition focus:border-[#0f766e] focus:ring-2 focus:ring-[#0f766e]/10 ${disabled ? "bg-gray-100 text-gray-500" : "bg-white text-gray-900"}`
      }
    ));
  }
  function LayerContextMenu({
    frame,
    state,
    selectedLayerIds,
    onClose,
    onAddGroupInside,
    onWrapLayer,
    onDeleteLayers
  }) {
    const node = findNode(frame, state.nodeId);
    if (node == null) {
      return null;
    }
    const isRoot = node.id === frame.id;
    const canAddChildGroup = canAcceptDrop(node);
    const actionLayerIds = selectedLayerIds.includes(node.id) ? selectedLayerIds : [node.id];
    const deletableLayerCount = actionLayerIds.filter((id) => id !== frame.id).length;
    function run(action) {
      action();
      onClose();
    }
    return /* @__PURE__ */ k(
      "div",
      {
        class: "fixed z-50 w-52 overflow-hidden rounded-lg border border-[#d1d5db] bg-white py-1 text-xs shadow-xl",
        style: {
          left: `${Math.min(state.x, window.innerWidth - 220)}px`,
          top: `${Math.min(state.y, window.innerHeight - 180)}px`
        },
        onClick: (event) => event.stopPropagation(),
        onContextMenu: (event) => event.preventDefault()
      },
      /* @__PURE__ */ k("div", { class: "border-b border-[#eef2f7] px-3 py-2" }, /* @__PURE__ */ k("p", { class: "truncate font-bold text-gray-900" }, node.name), /* @__PURE__ */ k("p", { class: "mt-0.5 text-[10px] font-semibold uppercase text-gray-400" }, getLayerKind(node))),
      /* @__PURE__ */ k(ContextMenuButton, { onClick: () => run(() => onAddGroupInside(node.id)), disabled: !canAddChildGroup }, "Add group inside"),
      /* @__PURE__ */ k(ContextMenuButton, { onClick: () => run(() => onWrapLayer(node.id)), disabled: isRoot }, "Wrap in group"),
      /* @__PURE__ */ k(ContextMenuButton, { onClick: () => run(() => onDeleteLayers(actionLayerIds)), disabled: deletableLayerCount === 0, danger: true }, deletableLayerCount > 1 ? `Delete ${deletableLayerCount} layers` : "Delete layer")
    );
  }
  function ContextMenuButton({
    children,
    disabled = false,
    danger = false,
    onClick
  }) {
    return /* @__PURE__ */ k(
      "button",
      {
        type: "button",
        disabled,
        onClick,
        class: `block w-full px-3 py-2 text-left font-semibold transition ${disabled ? "cursor-not-allowed text-gray-300" : danger ? "text-red-600 hover:bg-red-50" : "text-gray-700 hover:bg-gray-50"}`
      },
      children
    );
  }
  function getVisibleLayerIds(node) {
    return [
      node.id,
      ...node.children.flatMap((child) => getVisibleLayerIds(child))
    ];
  }
  function getLayerRange(layerIds, firstId, lastId) {
    const firstIndex = layerIds.indexOf(firstId);
    const lastIndex = layerIds.indexOf(lastId);
    if (firstIndex === -1 || lastIndex === -1) {
      return [lastId];
    }
    const start = Math.min(firstIndex, lastIndex);
    const end = Math.max(firstIndex, lastIndex);
    return layerIds.slice(start, end + 1);
  }
  function mergeUniqueIds(firstIds, secondIds) {
    return Array.from(/* @__PURE__ */ new Set([...firstIds, ...secondIds]));
  }
  function getTopLevelSelectedIds(frame, nodeIds) {
    const selectedIds = nodeIds.filter((id) => id !== frame.id);
    return selectedIds.filter((nodeId) => {
      return !selectedIds.some((candidateId) => {
        if (candidateId === nodeId) {
          return false;
        }
        const candidate = findNode(frame, candidateId);
        return candidate != null && containsNode(candidate, nodeId);
      });
    });
  }
  var init_LayerPanel = __esm({
    "src/components/LayerPanel.tsx"() {
      "use strict";
      init_preact_module();
      init_hooks_module();
      init_FlexLayoutPanel();
      init_editorModel();
    }
  });

  // src/components/Editor.tsx
  function Editor({
    sourceFrame,
    frame,
    targetDevice,
    screenWidth,
    layoutRules,
    canUndo,
    canRedo,
    onUndo,
    onRedo,
    onFrameChange
  }) {
    var _a;
    const [selectedNodeId, setSelectedNodeId] = d2((_a = frame == null ? void 0 : frame.id) != null ? _a : null);
    const [isExportPreviewExpanded, setIsExportPreviewExpanded] = d2(true);
    const previewFrame = sourceFrame != null ? sourceFrame : frame;
    y2(() => {
      setSelectedNodeId((currentNodeId) => {
        if (frame == null) {
          return null;
        }
        return currentNodeId != null && findNode2(frame, currentNodeId) != null ? currentNodeId : frame.id;
      });
    }, [frame]);
    if (frame == null || previewFrame == null) {
      return /* @__PURE__ */ k("section", { class: "flex min-w-0 flex-1 items-center justify-center bg-[#f6f7fb] px-6 text-center" }, /* @__PURE__ */ k("div", { class: "max-w-sm" }, /* @__PURE__ */ k("p", { class: "text-sm font-bold text-gray-900" }, "Select a frame to begin"), /* @__PURE__ */ k("p", { class: "mt-2 text-sm leading-6 text-gray-500" }, "Import a Figma frame to inspect and convert its responsive layout.")));
    }
    return /* @__PURE__ */ k("section", { class: "flex min-w-0 flex-1 flex-col bg-[#f6f7fb]" }, /* @__PURE__ */ k("header", { class: "flex h-20 shrink-0 items-center justify-between border-b border-[#e5e7eb] bg-white px-6" }, /* @__PURE__ */ k("div", { class: "min-w-0" }, /* @__PURE__ */ k("h2", { class: "truncate text-lg font-bold text-gray-900" }, previewFrame.name), /* @__PURE__ */ k("p", { class: "mt-1 text-sm text-gray-500" }, "FRAME - ", Math.round(previewFrame.geometry.width), " x ", Math.round(previewFrame.geometry.height), " px - schema v1")), /* @__PURE__ */ k("div", { class: "flex items-center gap-2" }, /* @__PURE__ */ k(
      "button",
      {
        type: "button",
        disabled: !canUndo,
        onClick: onUndo,
        class: "rounded-lg border border-[#cbd5e1] px-4 py-2 text-sm font-semibold text-gray-700 transition enabled:hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
      },
      "Undo"
    ), /* @__PURE__ */ k(
      "button",
      {
        type: "button",
        disabled: !canRedo,
        onClick: onRedo,
        class: "rounded-lg border border-[#cbd5e1] px-4 py-2 text-sm font-semibold text-gray-700 transition enabled:hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
      },
      "Redo"
    ))), /* @__PURE__ */ k("div", { class: "flex min-h-0 flex-1 overflow-hidden" }, /* @__PURE__ */ k("div", { class: "relative min-h-0 min-w-0 flex-1" }, /* @__PURE__ */ k(
      FramePreview,
      {
        frame: previewFrame,
        selectedNodeId,
        onSelect: setSelectedNodeId
      }
    ), /* @__PURE__ */ k(
      ExportPreviewDrawer,
      {
        frame,
        selectedNodeId,
        onSelect: setSelectedNodeId,
        targetDevice,
        screenWidth,
        layoutRules,
        isExpanded: isExportPreviewExpanded,
        onToggle: () => setIsExportPreviewExpanded((current) => !current)
      }
    )), /* @__PURE__ */ k("div", { class: "min-h-0 w-80 shrink-0" }, /* @__PURE__ */ k(
      LayerPanel,
      {
        frame,
        selectedNodeId,
        layoutRules,
        onSelect: setSelectedNodeId,
        onFrameChange
      }
    ))));
  }
  function findNode2(node, nodeId) {
    if (node.id === nodeId) {
      return node;
    }
    for (const child of node.children) {
      const match = findNode2(child, nodeId);
      if (match != null) {
        return match;
      }
    }
    return null;
  }
  var init_Editor = __esm({
    "src/components/Editor.tsx"() {
      "use strict";
      init_preact_module();
      init_hooks_module();
      init_ExportPreviewDrawer();
      init_FramePreview();
      init_LayerPanel();
    }
  });

  // src/normalizedFrameSchema.ts
  function denormalizeFigmaJson(input) {
    const document2 = isNormalizedDocumentShape(input) ? input : {
      schemaVersion: 2,
      root: input
    };
    const rootGeometry = restoreGeometryDefaults(document2.root.geometry);
    const rootBounds = createBounds(
      rootGeometry.x,
      rootGeometry.y,
      rootGeometry.width,
      rootGeometry.height
    );
    return __spreadProps(__spreadValues({}, denormalizeNode(document2.root, {
      rootBounds,
      parentBounds: null,
      parentId: null,
      parentLayoutMode: null,
      depth: 0,
      siblingIndex: 0,
      siblingCount: 1,
      styles: document2.styles
    })), {
      type: document2.root.type,
      schemaVersion: 1,
      importedAt: (/* @__PURE__ */ new Date()).toISOString()
    });
  }
  function validateNormalizedJson(input) {
    const warnings = [];
    const issues = [];
    const document2 = readNormalizedDocument(input, "$", issues, warnings);
    if (document2 == null || issues.length > 0) {
      return {
        ok: false,
        errors: issues.length > 0 ? issues : [{
          path: "$",
          message: "JSON must be a normalized schemaVersion 2 document."
        }],
        warnings
      };
    }
    return {
      ok: true,
      value: restoreNormalizedDocumentDefaults(document2),
      warnings
    };
  }
  function migrateV1ToV2(input) {
    const warnings = [];
    if (!isFigmaSerializedFrameV1(input)) {
      return {
        ok: false,
        errors: [{
          path: "$",
          message: "Expected a schemaVersion 1 serialized frame."
        }],
        warnings
      };
    }
    const document2 = normalizeSerializedFrame(input, {
      warnings
    });
    return {
      ok: true,
      value: document2,
      warnings
    };
  }
  function deserializeNormalizedJson(input) {
    const parsed = typeof input === "string" ? parseJson(input) : {
      ok: true,
      value: input
    };
    if (!parsed.ok) {
      return {
        ok: false,
        errors: [{
          path: "$",
          message: parsed.error
        }],
        warnings: []
      };
    }
    const directNormalized = validateNormalizedJson(parsed.value);
    if (directNormalized.ok) {
      return directNormalized;
    }
    const directV1 = migrateV1ToV2(parsed.value);
    if (directV1.ok) {
      return directV1;
    }
    const wrapper = asRecord(parsed.value);
    if (wrapper != null) {
      const frameValue = wrapper.frame;
      const rootValue = wrapper.root;
      const frameNormalized = validateNormalizedJson(frameValue);
      if (frameNormalized.ok) {
        return frameNormalized;
      }
      const frameV1 = migrateV1ToV2(frameValue);
      if (frameV1.ok) {
        return frameV1;
      }
      if (wrapper.schemaVersion === 2 && rootValue != null) {
        return validateNormalizedJson({
          schemaVersion: 2,
          root: rootValue
        });
      }
    }
    return {
      ok: false,
      errors: directNormalized.ok ? [] : directNormalized.errors,
      warnings: directNormalized.warnings
    };
  }
  function normalizeSerializedFrame(frame, context) {
    const root = normalizeSerializedNode(frame, "$.root", true, context);
    return {
      schemaVersion: 2,
      root: __spreadProps(__spreadValues({}, root), {
        type: frame.type
      })
    };
  }
  function normalizeSerializedNode(node, path, isRoot, context) {
    const normalized = {
      id: node.id,
      name: node.name,
      type: node.type,
      geometry: normalizeGeometry(node.geometry),
      children: normalizeChildren(node.children, `${path}.children`, context)
    };
    const layout = normalizeLayout(node.layout);
    const style = normalizeStyle(node.style);
    const responsive = normalizeResponsive(node, isRoot);
    if (node.originalFigmaId != null) {
      normalized.originalFigmaId = node.originalFigmaId;
    }
    if (node.visible === false) {
      normalized.visible = false;
    }
    if (node.locked === true) {
      normalized.locked = true;
    }
    if (!isEmptyRecord(layout)) {
      normalized.layout = layout;
    }
    if (!isEmptyRecord(style)) {
      normalized.style = style;
    }
    if (node.text != null) {
      normalized.text = cloneJsonObject(node.text);
    }
    if (responsive != null) {
      normalized.responsive = responsive;
    }
    if (node.component != null) {
      normalized.component = cloneJsonValue(node.component);
    }
    if (node.instance != null) {
      normalized.instance = cloneJsonValue(node.instance);
    }
    if (node.metadata != null) {
      normalized.metadata = cloneJsonObject(node.metadata);
    }
    return normalized;
  }
  function normalizeGeometry(geometry) {
    const normalized = {
      x: roundLayoutNumber(geometry.x),
      y: roundLayoutNumber(geometry.y),
      width: roundLayoutNumber(geometry.width),
      height: roundLayoutNumber(geometry.height)
    };
    if (geometry.rotation !== 0) {
      normalized.rotation = roundLayoutNumber(geometry.rotation);
    }
    return normalized;
  }
  function normalizeLayout(layout) {
    var _a, _b;
    const normalized = {};
    const mode = (_b = readLayoutMode((_a = layout.layoutMode) != null ? _a : layout.autoLayoutDirection)) != null ? _b : "NONE";
    if (mode !== "NONE") {
      normalized.mode = mode;
    }
    if (layout.constraints != null && !isDefaultMinConstraints(layout.constraints)) {
      normalized.constraints = cloneJsonValue(layout.constraints);
    }
    if (layout.layoutSizingHorizontal != null && layout.layoutSizingHorizontal !== "FIXED") {
      normalized.horizontalSizing = layout.layoutSizingHorizontal;
    }
    if (layout.layoutSizingVertical != null && layout.layoutSizingVertical !== "FIXED") {
      normalized.verticalSizing = layout.layoutSizingVertical;
    }
    if (typeof layout.layoutGrow === "number" && layout.layoutGrow !== 0) {
      normalized.grow = layout.layoutGrow;
    }
    if (layout.layoutAlign != null && layout.layoutAlign !== "INHERIT") {
      normalized.align = layout.layoutAlign;
    }
    if (typeof layout.itemSpacing === "number" && layout.itemSpacing !== 0) {
      normalized.gap = layout.itemSpacing;
    }
    if (typeof layout.counterAxisSpacing === "number" && layout.counterAxisSpacing !== 0) {
      normalized.counterGap = layout.counterAxisSpacing;
    }
    if (layout.primaryAxisAlignItems != null && layout.primaryAxisAlignItems !== "MIN") {
      normalized.primaryAlign = layout.primaryAxisAlignItems;
    }
    if (layout.counterAxisAlignItems != null && layout.counterAxisAlignItems !== "MIN") {
      normalized.counterAlign = layout.counterAxisAlignItems;
    }
    if (layout.layoutWrap === "WRAP") {
      normalized.wrap = true;
    }
    if (layout.padding != null && !isDefaultSpacing(layout.padding)) {
      normalized.padding = cloneSpacing(layout.padding);
    }
    if (layout.margin != null && !isDefaultSpacing(layout.margin)) {
      normalized.margin = cloneSpacing(layout.margin);
    }
    addAxisSizingIfNeeded(normalized, layout, mode);
    return normalized;
  }
  function addAxisSizingIfNeeded(normalized, layout, mode) {
    const inferredPrimary = inferPrimaryAxisSizing(layout, mode);
    const inferredCounter = inferCounterAxisSizing(layout, mode);
    if (layout.primaryAxisSizingMode != null && layout.primaryAxisSizingMode !== inferredPrimary) {
      normalized.primarySizing = layout.primaryAxisSizingMode;
    }
    if (layout.counterAxisSizingMode != null && layout.counterAxisSizingMode !== inferredCounter) {
      normalized.counterSizing = layout.counterAxisSizingMode;
    }
  }
  function normalizeStyle(style) {
    const normalized = {};
    if (typeof style.opacity === "number" && style.opacity !== 1) {
      normalized.opacity = style.opacity;
    }
    if (style.blendMode != null && style.blendMode !== "PASS_THROUGH") {
      normalized.blendMode = style.blendMode;
    }
    if (style.fills != null && !isEmptyJsonArray(style.fills)) {
      normalized.fills = compactPaintArray(style.fills);
    }
    if (style.strokes != null && !isEmptyJsonArray(style.strokes)) {
      normalized.strokes = compactPaintArray(style.strokes);
    }
    if (typeof style.strokeWeight === "number" && style.strokeWeight !== 1) {
      normalized.strokeWeight = style.strokeWeight;
    }
    if (style.cornerRadius != null && style.cornerRadius !== 0) {
      normalized.cornerRadius = style.cornerRadius;
    }
    if (style.effects != null && !isEmptyJsonArray(style.effects)) {
      normalized.effects = cloneJsonValue(style.effects);
    }
    return normalized;
  }
  function normalizeResponsive(node, isRoot) {
    const source = node.responsive;
    if (source == null) {
      return void 0;
    }
    const responsive = __spreadValues({}, source);
    const inferredConversionRole = inferResponsiveConversionRole(node);
    const inferredAcceptsChildren = inferAcceptsChildren(node);
    if (isRoot && responsive.groupRole === "root") {
      delete responsive.groupRole;
    }
    if (responsive.conversionRole === inferredConversionRole) {
      delete responsive.conversionRole;
    }
    if (responsive.acceptsChildren === inferredAcceptsChildren) {
      delete responsive.acceptsChildren;
    }
    return isEmptyRecord(responsive) ? void 0 : cloneJsonObject(responsive);
  }
  function normalizeChildren(children, path, context) {
    const normalizedChildren = [];
    const firstIndexesById = /* @__PURE__ */ new Map();
    children.forEach((child, index) => {
      const childPath = `${path}[${index}]`;
      const normalizedChild = normalizeSerializedNode(child, childPath, false, context);
      const existingIndex = firstIndexesById.get(normalizedChild.id);
      if (existingIndex == null) {
        firstIndexesById.set(normalizedChild.id, normalizedChildren.length);
        normalizedChildren.push(normalizedChild);
        return;
      }
      const warning = `Duplicate node id "${normalizedChild.id}" at ${childPath}; keeping first occurrence.`;
      context.warnings.push(warning);
      console.warn(warning);
      normalizedChildren[existingIndex] = mergeDuplicateNode(
        normalizedChildren[existingIndex],
        normalizedChild,
        `${path}[${existingIndex}]`,
        context
      );
    });
    return normalizedChildren;
  }
  function mergeDuplicateNode(first, later, path, context) {
    return mergeRecordValues(first, later, path, context);
  }
  function mergeRecordValues(first, later, path, context) {
    const merged = __spreadValues({}, first);
    for (const [key, laterValue] of Object.entries(later)) {
      const nextPath = `${path}.${key}`;
      const firstValue = merged[key];
      if (firstValue == null) {
        merged[key] = laterValue;
        continue;
      }
      if (valuesAreEqual(firstValue, laterValue)) {
        continue;
      }
      if (isMergeableObject(firstValue) && isMergeableObject(laterValue)) {
        merged[key] = mergeRecordValues(firstValue, laterValue, nextPath, context);
        continue;
      }
      const warning = `Duplicate node id conflict at ${nextPath}; kept first value.`;
      context.warnings.push(warning);
      console.warn(warning);
    }
    return merged;
  }
  function denormalizeNode(node, context) {
    var _a, _b;
    const geometry = restoreGeometryDefaults(node.geometry);
    const absoluteBounds = context.parentBounds == null ? createBounds(geometry.x, geometry.y, geometry.width, geometry.height) : createBounds(
      context.parentBounds.x + geometry.x,
      context.parentBounds.y + geometry.y,
      geometry.width,
      geometry.height
    );
    const parentRelativeBounds = context.parentBounds == null ? createBounds(0, 0, geometry.width, geometry.height) : createBounds(geometry.x, geometry.y, geometry.width, geometry.height);
    const rootRelativeBounds = createBounds(
      absoluteBounds.x - context.rootBounds.x,
      absoluteBounds.y - context.rootBounds.y,
      geometry.width,
      geometry.height
    );
    const nodeChildren = getNodeChildren(node);
    const layout = denormalizeLayout(node.layout, context.parentLayoutMode);
    const children = nodeChildren.map((child, index) => denormalizeNode(child, __spreadProps(__spreadValues({}, context), {
      parentBounds: absoluteBounds,
      parentId: node.id,
      parentLayoutMode: layout.layoutMode === "GRID" || layout.layoutMode === "HORIZONTAL" || layout.layoutMode === "VERTICAL" ? layout.layoutMode : null,
      depth: context.depth + 1,
      siblingIndex: index,
      siblingCount: nodeChildren.length
    })));
    return {
      id: node.id,
      originalFigmaId: node.originalFigmaId,
      name: node.name,
      type: node.type,
      responsive: denormalizeResponsive(node, context.depth === 0),
      visible: (_a = node.visible) != null ? _a : true,
      locked: (_b = node.locked) != null ? _b : false,
      geometry: {
        x: geometry.x,
        y: geometry.y,
        width: geometry.width,
        height: geometry.height,
        rotation: geometry.rotation,
        absoluteBounds,
        parentRelativeBounds,
        rootRelativeBounds,
        percentOfParent: context.parentBounds == null ? void 0 : getPercentBounds(parentRelativeBounds, context.parentBounds),
        percentOfRoot: getPercentBounds(rootRelativeBounds, context.rootBounds),
        hierarchy: {
          parentId: context.parentId,
          depth: context.depth,
          siblingIndex: context.siblingIndex,
          siblingCount: context.siblingCount
        }
      },
      layout,
      style: denormalizeStyle(node, context.styles),
      text: node.text == null ? void 0 : cloneJsonObject(node.text),
      component: node.component == null ? void 0 : cloneJsonValue(node.component),
      instance: node.instance == null ? void 0 : cloneJsonValue(node.instance),
      metadata: node.metadata == null ? void 0 : cloneJsonObject(node.metadata),
      children
    };
  }
  function denormalizeLayout(layout, parentLayoutMode) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
    const mode = getStoredLayoutMode(layout);
    const horizontalSizing = (_a = layout == null ? void 0 : layout.horizontalSizing) != null ? _a : inferNodeAxisLayoutSizing(layout, mode, "horizontal", parentLayoutMode);
    const verticalSizing = (_b = layout == null ? void 0 : layout.verticalSizing) != null ? _b : inferNodeAxisLayoutSizing(layout, mode, "vertical", parentLayoutMode);
    const primarySizing = (_c = layout == null ? void 0 : layout.primarySizing) != null ? _c : inferPrimaryAxisSizingFromLayoutSizing(mode, horizontalSizing, verticalSizing);
    const counterSizing = (_d = layout == null ? void 0 : layout.counterSizing) != null ? _d : inferCounterAxisSizingFromLayoutSizing(mode, horizontalSizing, verticalSizing);
    return {
      isAutoLayout: (_e = layout == null ? void 0 : layout.isAutoLayout) != null ? _e : isLayoutModeActive(mode),
      autoLayoutDirection: mode,
      constraints: (layout == null ? void 0 : layout.constraints) == null ? void 0 : cloneJsonValue(layout.constraints),
      layoutMode: mode,
      layoutAlign: (_f = layout == null ? void 0 : layout.align) != null ? _f : "INHERIT",
      layoutGrow: (_g = layout == null ? void 0 : layout.grow) != null ? _g : 0,
      layoutSizingHorizontal: horizontalSizing,
      layoutSizingVertical: verticalSizing,
      itemSpacing: (_h = layout == null ? void 0 : layout.gap) != null ? _h : 0,
      counterAxisSpacing: layout == null ? void 0 : layout.counterGap,
      primaryAxisAlignItems: (_i = layout == null ? void 0 : layout.primaryAlign) != null ? _i : "MIN",
      counterAxisAlignItems: (_j = layout == null ? void 0 : layout.counterAlign) != null ? _j : "MIN",
      layoutWrap: (layout == null ? void 0 : layout.wrap) === true ? "WRAP" : "NO_WRAP",
      padding: (layout == null ? void 0 : layout.padding) == null ? cloneSpacing(defaultSpacing) : cloneSpacing(layout.padding),
      margin: layout == null ? void 0 : layout.margin,
      primaryAxisSizingMode: primarySizing,
      counterAxisSizingMode: counterSizing
    };
  }
  function denormalizeStyle(node, styles) {
    var _a, _b, _c, _d;
    const styleFromRegistry = node.styleRef == null ? void 0 : styles == null ? void 0 : styles[node.styleRef];
    const style = __spreadValues(__spreadValues({}, styleFromRegistry), node.style);
    return {
      opacity: (_a = style.opacity) != null ? _a : 1,
      blendMode: (_b = style.blendMode) != null ? _b : "PASS_THROUGH",
      fills: style.fills == null ? void 0 : restorePaintArray(style.fills),
      strokes: style.strokes == null ? void 0 : restorePaintArray(style.strokes),
      strokeWeight: (_c = style.strokeWeight) != null ? _c : 1,
      cornerRadius: (_d = style.cornerRadius) != null ? _d : 0,
      effects: style.effects == null ? void 0 : cloneJsonValue(style.effects)
    };
  }
  function denormalizeResponsive(node, isRoot) {
    const responsive = __spreadValues({}, node.responsive);
    if (isRoot && responsive.groupRole == null) {
      responsive.groupRole = "root";
    }
    if (responsive.conversionRole == null) {
      responsive.conversionRole = inferResponsiveConversionRole({
        type: node.type,
        responsive: node.responsive,
        children: getNodeChildren(node),
        layout: denormalizeLayout(node.layout, null)
      });
    }
    if (responsive.acceptsChildren == null) {
      responsive.acceptsChildren = inferAcceptsChildren(node);
    }
    return responsive;
  }
  function readNormalizedDocument(input, path, issues, warnings) {
    const record = asRecord(input);
    if (record == null) {
      issues.push({
        path,
        message: "Expected an object."
      });
      return null;
    }
    if (record.schemaVersion !== 2) {
      issues.push({
        path: `${path}.schemaVersion`,
        message: "Expected schemaVersion 2."
      });
    }
    const root = readNormalizedNode(record.root, `${path}.root`, issues, warnings, true);
    const styles = readStyles(record.styles, `${path}.styles`, issues);
    if (root == null) {
      return null;
    }
    if (root.type !== "FRAME" && root.type !== "COMPONENT" && root.type !== "INSTANCE") {
      issues.push({
        path: `${path}.root.type`,
        message: "Root node type must be FRAME, COMPONENT, or INSTANCE."
      });
    }
    return styles == null ? {
      schemaVersion: 2,
      root
    } : {
      schemaVersion: 2,
      root,
      styles
    };
  }
  function readNormalizedNode(input, path, issues, warnings, _isRoot = false) {
    const record = asRecord(input);
    if (record == null) {
      issues.push({
        path,
        message: "Expected a node object."
      });
      return null;
    }
    const id = readRequiredString(record.id, `${path}.id`, issues);
    const name = readRequiredString(record.name, `${path}.name`, issues);
    const type = readRequiredString(record.type, `${path}.type`, issues);
    const geometry = readGeometry(record.geometry, `${path}.geometry`, issues);
    const children = readChildren(record.children, `${path}.children`, issues, warnings);
    if (id == null || name == null || type == null || geometry == null || children == null) {
      return null;
    }
    const node = {
      id,
      name,
      type,
      geometry,
      children
    };
    const originalFigmaId = readOptionalString(record.originalFigmaId, `${path}.originalFigmaId`, issues);
    const visible = readOptionalBoolean(record.visible, `${path}.visible`, issues);
    const locked = readOptionalBoolean(record.locked, `${path}.locked`, issues);
    const layout = readLayout(record.layout, `${path}.layout`, issues);
    const style = readStyle(record.style, `${path}.style`, issues);
    const styleRef = readOptionalString(record.styleRef, `${path}.styleRef`, issues);
    const text = readText(record.text, `${path}.text`, issues);
    const responsive = readResponsive(record.responsive, `${path}.responsive`, issues);
    const component = readOptionalJsonValue(record.component, `${path}.component`, issues);
    const instance = readOptionalJsonValue(record.instance, `${path}.instance`, issues);
    const metadata = readMetadata(record.metadata, `${path}.metadata`, issues);
    if (originalFigmaId != null) {
      node.originalFigmaId = originalFigmaId;
    }
    if (visible != null) {
      node.visible = visible;
    }
    if (locked != null) {
      node.locked = locked;
    }
    if (layout != null) {
      node.layout = layout;
    }
    if (style != null) {
      node.style = style;
    }
    if (styleRef != null) {
      node.styleRef = styleRef;
    }
    if (text !== missingValue) {
      node.text = text;
    }
    if (responsive != null) {
      node.responsive = responsive;
    }
    if (component != null) {
      node.component = component;
    }
    if (instance != null) {
      node.instance = instance;
    }
    if (metadata != null) {
      node.metadata = metadata;
    }
    return node;
  }
  function readGeometry(input, path, issues) {
    const record = asRecord(input);
    if (record == null) {
      issues.push({
        path,
        message: "Expected geometry object."
      });
      return null;
    }
    const x2 = readRequiredNumber(record.x, `${path}.x`, issues);
    const y3 = readRequiredNumber(record.y, `${path}.y`, issues);
    const width = readRequiredNumber(record.width, `${path}.width`, issues);
    const height = readRequiredNumber(record.height, `${path}.height`, issues);
    const rotation = readOptionalNumber(record.rotation, `${path}.rotation`, issues);
    if (x2 == null || y3 == null || width == null || height == null) {
      return null;
    }
    return rotation == null ? {
      x: x2,
      y: y3,
      width,
      height
    } : {
      x: x2,
      y: y3,
      width,
      height,
      rotation
    };
  }
  function readChildren(input, path, issues, warnings) {
    if (input == null) {
      return [];
    }
    if (!Array.isArray(input)) {
      issues.push({
        path,
        message: "Expected children array."
      });
      return null;
    }
    const children = [];
    input.forEach((child, index) => {
      const node = readNormalizedNode(child, `${path}[${index}]`, issues, warnings);
      if (node != null) {
        children.push(node);
      }
    });
    return children;
  }
  function readLayout(input, path, issues) {
    var _a, _b, _c;
    if (input == null) {
      return void 0;
    }
    const record = asRecord(input);
    if (record == null) {
      issues.push({
        path,
        message: "Expected layout object."
      });
      return void 0;
    }
    const layout = {};
    const mode = readOptionalLayoutMode(record.mode, `${path}.mode`, issues);
    const isAutoLayout = readOptionalBoolean(record.isAutoLayout, `${path}.isAutoLayout`, issues);
    const constraints = readOptionalJsonValue(record.constraints, `${path}.constraints`, issues);
    const horizontalSizing = readOptionalString(record.horizontalSizing, `${path}.horizontalSizing`, issues);
    const verticalSizing = readOptionalString(record.verticalSizing, `${path}.verticalSizing`, issues);
    const grow = readOptionalNumber(record.grow, `${path}.grow`, issues);
    const align = readOptionalString(record.align, `${path}.align`, issues);
    const gap = readOptionalNumber(record.gap, `${path}.gap`, issues);
    const counterGap = readOptionalNumber((_a = record.counterGap) != null ? _a : record.counterAxisSpacing, `${path}.counterGap`, issues);
    const primaryAlign = readOptionalString(record.primaryAlign, `${path}.primaryAlign`, issues);
    const counterAlign = readOptionalString(record.counterAlign, `${path}.counterAlign`, issues);
    const wrap = readOptionalBoolean(record.wrap, `${path}.wrap`, issues);
    const padding = readSpacing(record.padding, `${path}.padding`, issues);
    const margin = readSpacing(record.margin, `${path}.margin`, issues);
    const primarySizing = readOptionalString((_b = record.primarySizing) != null ? _b : record.primaryAxisSizingMode, `${path}.primarySizing`, issues);
    const counterSizing = readOptionalString((_c = record.counterSizing) != null ? _c : record.counterAxisSizingMode, `${path}.counterSizing`, issues);
    if (mode != null) {
      layout.mode = mode;
    }
    if (isAutoLayout != null) {
      layout.isAutoLayout = isAutoLayout;
    }
    if (constraints != null) {
      layout.constraints = constraints;
    }
    if (horizontalSizing != null) {
      layout.horizontalSizing = horizontalSizing;
    }
    if (verticalSizing != null) {
      layout.verticalSizing = verticalSizing;
    }
    if (grow != null) {
      layout.grow = grow;
    }
    if (align != null) {
      layout.align = align;
    }
    if (gap != null) {
      layout.gap = gap;
    }
    if (counterGap != null) {
      layout.counterGap = counterGap;
    }
    if (primaryAlign != null) {
      layout.primaryAlign = primaryAlign;
    }
    if (counterAlign != null) {
      layout.counterAlign = counterAlign;
    }
    if (wrap != null) {
      layout.wrap = wrap;
    }
    if (padding != null) {
      layout.padding = padding;
    }
    if (margin != null) {
      layout.margin = margin;
    }
    if (primarySizing != null) {
      layout.primarySizing = primarySizing;
    }
    if (counterSizing != null) {
      layout.counterSizing = counterSizing;
    }
    return layout;
  }
  function readStyle(input, path, issues) {
    if (input == null) {
      return void 0;
    }
    const record = asRecord(input);
    if (record == null) {
      issues.push({
        path,
        message: "Expected style object."
      });
      return void 0;
    }
    const style = {};
    const opacity = readOptionalNumber(record.opacity, `${path}.opacity`, issues);
    const blendMode = readOptionalString(record.blendMode, `${path}.blendMode`, issues);
    const fills = readOptionalJsonValue(record.fills, `${path}.fills`, issues);
    const strokes = readOptionalJsonValue(record.strokes, `${path}.strokes`, issues);
    const strokeWeight = readOptionalNumber(record.strokeWeight, `${path}.strokeWeight`, issues);
    const cornerRadius = readOptionalNumberOrString(record.cornerRadius, `${path}.cornerRadius`, issues);
    const effects = readOptionalJsonValue(record.effects, `${path}.effects`, issues);
    if (opacity != null) {
      style.opacity = opacity;
    }
    if (blendMode != null) {
      style.blendMode = blendMode;
    }
    if (fills != null) {
      style.fills = fills;
    }
    if (strokes != null) {
      style.strokes = strokes;
    }
    if (strokeWeight != null) {
      style.strokeWeight = strokeWeight;
    }
    if (cornerRadius != null) {
      style.cornerRadius = cornerRadius;
    }
    if (effects != null) {
      style.effects = effects;
    }
    return style;
  }
  function readText(input, path, issues) {
    if (input === void 0) {
      return missingValue;
    }
    if (input === null) {
      return null;
    }
    const record = asRecord(input);
    if (record == null) {
      issues.push({
        path,
        message: "Expected text object or null."
      });
      return missingValue;
    }
    const characters = readRequiredString(record.characters, `${path}.characters`, issues);
    const fontSize = readOptionalNumberOrString(record.fontSize, `${path}.fontSize`, issues);
    const fontName = readOptionalJsonValue(record.fontName, `${path}.fontName`, issues);
    const fontWeight = readOptionalNumber(record.fontWeight, `${path}.fontWeight`, issues);
    const textAlignHorizontal = readOptionalString(record.textAlignHorizontal, `${path}.textAlignHorizontal`, issues);
    const textAlignVertical = readOptionalString(record.textAlignVertical, `${path}.textAlignVertical`, issues);
    const lineHeight = readOptionalJsonValue(record.lineHeight, `${path}.lineHeight`, issues);
    const letterSpacing = readOptionalJsonValue(record.letterSpacing, `${path}.letterSpacing`, issues);
    if (characters == null) {
      return missingValue;
    }
    return {
      characters,
      fontSize,
      fontName,
      fontWeight,
      textAlignHorizontal,
      textAlignVertical,
      lineHeight,
      letterSpacing
    };
  }
  function readResponsive(input, path, issues) {
    if (input == null) {
      return void 0;
    }
    const record = asRecord(input);
    if (record == null) {
      issues.push({
        path,
        message: "Expected responsive object."
      });
      return void 0;
    }
    const responsive = {};
    const isVirtualGroup2 = readOptionalBoolean(record.isVirtualGroup, `${path}.isVirtualGroup`, issues);
    const groupRole = readOptionalResponsiveGroupRole(record.groupRole, `${path}.groupRole`, issues);
    const conversionRole = readOptionalResponsiveConversionRole(record.conversionRole, `${path}.conversionRole`, issues);
    const acceptsChildren = readOptionalBoolean(record.acceptsChildren, `${path}.acceptsChildren`, issues);
    const createdByUser = readOptionalBoolean(record.createdByUser, `${path}.createdByUser`, issues);
    const nodeRule = readResponsiveNodeRule(record.nodeRule, `${path}.nodeRule`, issues);
    const replacement = readResponsiveReplacementRule(record.replacement, `${path}.replacement`, issues);
    if (isVirtualGroup2 != null) {
      responsive.isVirtualGroup = isVirtualGroup2;
    }
    if (groupRole != null) {
      responsive.groupRole = groupRole;
    }
    if (conversionRole != null) {
      responsive.conversionRole = conversionRole;
    }
    if (acceptsChildren != null) {
      responsive.acceptsChildren = acceptsChildren;
    }
    if (createdByUser != null) {
      responsive.createdByUser = createdByUser;
    }
    if (nodeRule != null) {
      responsive.nodeRule = nodeRule;
    }
    if (replacement != null) {
      responsive.replacement = replacement;
    }
    return responsive;
  }
  function readResponsiveNodeRule(input, path, issues) {
    if (input == null) {
      return void 0;
    }
    const record = asRecord(input);
    if (record == null) {
      issues.push({
        path,
        message: "Expected responsive node rule object."
      });
      return void 0;
    }
    const enabled = readRequiredBoolean(record.enabled, `${path}.enabled`, issues);
    const conversionDirection = record.conversionDirection === "column-to-row" ? "column-to-row" : record.conversionDirection === "row-to-column" ? "row-to-column" : null;
    const rowToColumnMode = record.rowToColumnMode === "always" || record.rowToColumnMode === "never" || record.rowToColumnMode === "auto" ? record.rowToColumnMode : null;
    const rowToColumnBreakpoint = readRequiredNumber(record.rowToColumnBreakpoint, `${path}.rowToColumnBreakpoint`, issues);
    const stackGap = readRequiredNumber(record.stackGap, `${path}.stackGap`, issues);
    const stackAlignment = record.stackAlignment === "center" || record.stackAlignment === "stretch" || record.stackAlignment === "start" ? record.stackAlignment : null;
    if (conversionDirection == null) {
      issues.push({
        path: `${path}.conversionDirection`,
        message: "Expected row-to-column or column-to-row."
      });
    }
    if (rowToColumnMode == null) {
      issues.push({
        path: `${path}.rowToColumnMode`,
        message: "Expected auto, always, or never."
      });
    }
    if (stackAlignment == null) {
      issues.push({
        path: `${path}.stackAlignment`,
        message: "Expected start, center, or stretch."
      });
    }
    if (enabled == null || conversionDirection == null || rowToColumnMode == null || rowToColumnBreakpoint == null || stackGap == null || stackAlignment == null) {
      return void 0;
    }
    return {
      enabled,
      conversionDirection,
      rowToColumnMode,
      rowToColumnBreakpoint,
      stackGap,
      stackAlignment
    };
  }
  function readResponsiveReplacementRule(input, path, issues) {
    if (input == null) {
      return void 0;
    }
    const record = asRecord(input);
    if (record == null) {
      issues.push({
        path,
        message: "Expected responsive replacement object."
      });
      return void 0;
    }
    const enabled = readRequiredBoolean(record.enabled, `${path}.enabled`, issues);
    const preset = record.preset === "hamburger" ? "hamburger" : null;
    const trigger = record.trigger === "always" || record.trigger === "never" || record.trigger === "auto" ? record.trigger : null;
    const sizeSource = record.sizeSource === "width" || record.sizeSource === "height" || record.sizeSource === "custom" ? record.sizeSource : void 0;
    const breakpoint = readRequiredNumber(record.breakpoint, `${path}.breakpoint`, issues);
    const width = readRequiredNumber(record.width, `${path}.width`, issues);
    const height = readRequiredNumber(record.height, `${path}.height`, issues);
    if (preset == null) {
      issues.push({
        path: `${path}.preset`,
        message: "Expected hamburger."
      });
    }
    if (trigger == null) {
      issues.push({
        path: `${path}.trigger`,
        message: "Expected auto, always, or never."
      });
    }
    if (enabled == null || preset == null || trigger == null || breakpoint == null || width == null || height == null) {
      return void 0;
    }
    return {
      enabled,
      preset,
      trigger,
      breakpoint,
      sizeSource,
      width,
      height
    };
  }
  function readStyles(input, path, issues) {
    var _a;
    if (input == null) {
      return void 0;
    }
    const record = asRecord(input);
    if (record == null) {
      issues.push({
        path,
        message: "Expected styles object."
      });
      return void 0;
    }
    const styles = {};
    for (const [key, value] of Object.entries(record)) {
      styles[key] = (_a = readStyle(value, `${path}.${key}`, issues)) != null ? _a : {};
    }
    return styles;
  }
  function readSpacing(input, path, issues) {
    if (input == null) {
      return void 0;
    }
    const record = asRecord(input);
    if (record == null) {
      issues.push({
        path,
        message: "Expected spacing object."
      });
      return void 0;
    }
    const top = readRequiredNumber(record.top, `${path}.top`, issues);
    const right = readRequiredNumber(record.right, `${path}.right`, issues);
    const bottom = readRequiredNumber(record.bottom, `${path}.bottom`, issues);
    const left = readRequiredNumber(record.left, `${path}.left`, issues);
    if (top == null || right == null || bottom == null || left == null) {
      return void 0;
    }
    return {
      top,
      right,
      bottom,
      left
    };
  }
  function readMetadata(input, path, issues) {
    if (input == null) {
      return void 0;
    }
    const record = asRecord(input);
    if (record == null) {
      issues.push({
        path,
        message: "Expected metadata object."
      });
      return void 0;
    }
    const metadata = {};
    for (const [key, value] of Object.entries(record)) {
      if (isFigmaJsonValue(value)) {
        metadata[key] = cloneJsonValue(value);
        continue;
      }
      issues.push({
        path: `${path}.${key}`,
        message: "Expected JSON-compatible metadata value."
      });
    }
    return metadata;
  }
  function restoreNormalizedDocumentDefaults(document2) {
    return __spreadProps(__spreadValues({}, document2), {
      root: restoreNormalizedNodeDefaults(document2.root)
    });
  }
  function restoreNormalizedNodeDefaults(node, parentLayoutMode = null) {
    var _a, _b, _c, _d, _e;
    const layout = restoreLayoutDefaults(node.layout, parentLayoutMode);
    const nextParentLayoutMode = isLayoutModeActive((_a = layout.mode) != null ? _a : "NONE") ? (_b = layout.mode) != null ? _b : "NONE" : null;
    return __spreadProps(__spreadValues({}, node), {
      visible: (_c = node.visible) != null ? _c : true,
      locked: (_d = node.locked) != null ? _d : false,
      geometry: restoreGeometryDefaults(node.geometry),
      layout,
      style: restoreStyleDefaults(node.style),
      text: (_e = node.text) != null ? _e : null,
      children: getNodeChildren(node).map((child) => restoreNormalizedNodeDefaults(child, nextParentLayoutMode))
    });
  }
  function restoreGeometryDefaults(geometry) {
    var _a;
    return {
      x: geometry.x,
      y: geometry.y,
      width: geometry.width,
      height: geometry.height,
      rotation: (_a = geometry.rotation) != null ? _a : 0
    };
  }
  function restoreLayoutDefaults(layout, parentLayoutMode) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
    const mode = getStoredLayoutMode(layout);
    const horizontalSizing = (_a = layout == null ? void 0 : layout.horizontalSizing) != null ? _a : inferNodeAxisLayoutSizing(layout, mode, "horizontal", parentLayoutMode);
    const verticalSizing = (_b = layout == null ? void 0 : layout.verticalSizing) != null ? _b : inferNodeAxisLayoutSizing(layout, mode, "vertical", parentLayoutMode);
    return {
      isAutoLayout: (_c = layout == null ? void 0 : layout.isAutoLayout) != null ? _c : isLayoutModeActive(mode),
      mode,
      constraints: layout == null ? void 0 : layout.constraints,
      horizontalSizing,
      verticalSizing,
      grow: (_d = layout == null ? void 0 : layout.grow) != null ? _d : 0,
      align: (_e = layout == null ? void 0 : layout.align) != null ? _e : "INHERIT",
      gap: (_f = layout == null ? void 0 : layout.gap) != null ? _f : 0,
      counterGap: layout == null ? void 0 : layout.counterGap,
      primaryAlign: (_g = layout == null ? void 0 : layout.primaryAlign) != null ? _g : "MIN",
      counterAlign: (_h = layout == null ? void 0 : layout.counterAlign) != null ? _h : "MIN",
      wrap: (_i = layout == null ? void 0 : layout.wrap) != null ? _i : false,
      padding: (layout == null ? void 0 : layout.padding) == null ? cloneSpacing(defaultSpacing) : cloneSpacing(layout.padding),
      margin: layout == null ? void 0 : layout.margin,
      primarySizing: (_j = layout == null ? void 0 : layout.primarySizing) != null ? _j : inferPrimaryAxisSizingFromLayoutSizing(mode, horizontalSizing, verticalSizing),
      counterSizing: (_k = layout == null ? void 0 : layout.counterSizing) != null ? _k : inferCounterAxisSizingFromLayoutSizing(mode, horizontalSizing, verticalSizing)
    };
  }
  function restoreStyleDefaults(style) {
    var _a, _b, _c, _d;
    return {
      opacity: (_a = style == null ? void 0 : style.opacity) != null ? _a : 1,
      blendMode: (_b = style == null ? void 0 : style.blendMode) != null ? _b : "PASS_THROUGH",
      fills: style == null ? void 0 : style.fills,
      strokes: style == null ? void 0 : style.strokes,
      strokeWeight: (_c = style == null ? void 0 : style.strokeWeight) != null ? _c : 1,
      cornerRadius: (_d = style == null ? void 0 : style.cornerRadius) != null ? _d : 0,
      effects: style == null ? void 0 : style.effects
    };
  }
  function inferPrimaryAxisSizing(layout, mode) {
    var _a, _b;
    return inferPrimaryAxisSizingFromLayoutSizing(
      mode,
      (_a = layout.layoutSizingHorizontal) != null ? _a : "FIXED",
      (_b = layout.layoutSizingVertical) != null ? _b : "FIXED"
    );
  }
  function inferCounterAxisSizing(layout, mode) {
    var _a, _b;
    return inferCounterAxisSizingFromLayoutSizing(
      mode,
      (_a = layout.layoutSizingHorizontal) != null ? _a : "FIXED",
      (_b = layout.layoutSizingVertical) != null ? _b : "FIXED"
    );
  }
  function inferNodeAxisLayoutSizing(layout, mode, axis, parentLayoutMode) {
    const ownAxisSizing = axisMatchesPrimaryAxis4(mode, axis) ? layout == null ? void 0 : layout.primarySizing : layout == null ? void 0 : layout.counterSizing;
    if (ownAxisSizing === "AUTO") {
      return "HUG";
    }
    if (parentLayoutMode != null && (layout == null ? void 0 : layout.align) === "STRETCH" && axisMatchesCrossAxis4(parentLayoutMode, axis)) {
      return "FILL";
    }
    if (parentLayoutMode != null && typeof (layout == null ? void 0 : layout.grow) === "number" && layout.grow > 0 && axisMatchesPrimaryParentAxis4(parentLayoutMode, axis)) {
      return "FILL";
    }
    return "FIXED";
  }
  function inferPrimaryAxisSizingFromLayoutSizing(mode, horizontalSizing, verticalSizing) {
    const sizing = mode === "HORIZONTAL" || mode === "GRID" ? horizontalSizing : verticalSizing;
    return sizing === "HUG" ? "AUTO" : "FIXED";
  }
  function inferCounterAxisSizingFromLayoutSizing(mode, horizontalSizing, verticalSizing) {
    const sizing = mode === "HORIZONTAL" || mode === "GRID" ? verticalSizing : horizontalSizing;
    return sizing === "HUG" ? "AUTO" : "FIXED";
  }
  function getStoredLayoutMode(layout) {
    var _a;
    return (_a = layout == null ? void 0 : layout.mode) != null ? _a : "NONE";
  }
  function isLayoutModeActive(mode) {
    return mode !== "NONE";
  }
  function axisMatchesPrimaryAxis4(mode, axis) {
    if (mode === "GRID") {
      return axis === "horizontal";
    }
    return axis === "horizontal" ? mode === "HORIZONTAL" : mode === "VERTICAL";
  }
  function axisMatchesPrimaryParentAxis4(parentLayoutMode, axis) {
    if (parentLayoutMode === "GRID") {
      return axis === "horizontal";
    }
    return axis === "horizontal" ? parentLayoutMode === "HORIZONTAL" : parentLayoutMode === "VERTICAL";
  }
  function axisMatchesCrossAxis4(parentLayoutMode, axis) {
    if (parentLayoutMode === "GRID") {
      return axis === "vertical";
    }
    return axis === "horizontal" ? parentLayoutMode === "VERTICAL" : parentLayoutMode === "HORIZONTAL";
  }
  function inferResponsiveConversionRole(node) {
    var _a;
    if (((_a = node.responsive) == null ? void 0 : _a.isVirtualGroup) === true || node.type === "RESPONSIVE_GROUP") {
      return "responsive-group";
    }
    return node.layout.isAutoLayout ? "auto-layout-container" : "manual-layer";
  }
  function inferAcceptsChildren(node) {
    var _a;
    return node.type === "FRAME" || node.type === "COMPONENT" || node.type === "INSTANCE" || node.type === "RESPONSIVE_GROUP" || ((_a = node.responsive) == null ? void 0 : _a.isVirtualGroup) === true || getNodeChildren(node).length > 0;
  }
  function readLayoutMode(value) {
    return value === "NONE" || value === "HORIZONTAL" || value === "VERTICAL" || value === "GRID" ? value : null;
  }
  function readOptionalLayoutMode(value, path, issues) {
    if (value == null) {
      return void 0;
    }
    if (value === "NONE" || value === "HORIZONTAL" || value === "VERTICAL" || value === "GRID") {
      return value;
    }
    issues.push({
      path,
      message: "Expected NONE, HORIZONTAL, VERTICAL, or GRID."
    });
    return void 0;
  }
  function readOptionalResponsiveGroupRole(value, path, issues) {
    if (value == null) {
      return void 0;
    }
    if (value === "root" || value === "group") {
      return value;
    }
    issues.push({
      path,
      message: "Expected root or group."
    });
    return void 0;
  }
  function readOptionalResponsiveConversionRole(value, path, issues) {
    if (value == null) {
      return void 0;
    }
    if (value === "auto-layout-container" || value === "manual-layer" || value === "responsive-group") {
      return value;
    }
    issues.push({
      path,
      message: "Expected auto-layout-container, manual-layer, or responsive-group."
    });
    return void 0;
  }
  function readRequiredString(value, path, issues) {
    if (typeof value === "string") {
      return value;
    }
    issues.push({
      path,
      message: "Expected string."
    });
    return null;
  }
  function readOptionalString(value, path, issues) {
    if (value == null) {
      return void 0;
    }
    if (typeof value === "string") {
      return value;
    }
    issues.push({
      path,
      message: "Expected string."
    });
    return void 0;
  }
  function readRequiredNumber(value, path, issues) {
    if (typeof value === "number" && Number.isFinite(value)) {
      return value;
    }
    issues.push({
      path,
      message: "Expected finite number."
    });
    return null;
  }
  function readOptionalNumber(value, path, issues) {
    if (value == null) {
      return void 0;
    }
    if (typeof value === "number" && Number.isFinite(value)) {
      return value;
    }
    issues.push({
      path,
      message: "Expected finite number."
    });
    return void 0;
  }
  function readOptionalNumberOrString(value, path, issues) {
    if (value == null) {
      return void 0;
    }
    if (typeof value === "number" && Number.isFinite(value) || typeof value === "string") {
      return value;
    }
    issues.push({
      path,
      message: "Expected finite number or string."
    });
    return void 0;
  }
  function readRequiredBoolean(value, path, issues) {
    if (typeof value === "boolean") {
      return value;
    }
    issues.push({
      path,
      message: "Expected boolean."
    });
    return null;
  }
  function readOptionalBoolean(value, path, issues) {
    if (value == null) {
      return void 0;
    }
    if (typeof value === "boolean") {
      return value;
    }
    issues.push({
      path,
      message: "Expected boolean."
    });
    return void 0;
  }
  function readOptionalJsonValue(value, path, issues) {
    if (value == null) {
      return void 0;
    }
    if (isFigmaJsonValue(value)) {
      return cloneJsonValue(value);
    }
    issues.push({
      path,
      message: "Expected JSON-compatible value."
    });
    return void 0;
  }
  function isFigmaSerializedFrameV1(value) {
    const record = asRecord(value);
    return record != null && record.schemaVersion === 1 && typeof record.importedAt === "string" && (record.type === "FRAME" || record.type === "COMPONENT" || record.type === "INSTANCE") && isFigmaSerializedNodeV1(record);
  }
  function isFigmaSerializedNodeV1(value) {
    const record = asRecord(value);
    const geometry = asRecord(record == null ? void 0 : record.geometry);
    return record != null && typeof record.id === "string" && typeof record.name === "string" && typeof record.type === "string" && typeof record.visible === "boolean" && typeof record.locked === "boolean" && geometry != null && typeof geometry.x === "number" && typeof geometry.y === "number" && typeof geometry.width === "number" && typeof geometry.height === "number" && asRecord(record.layout) != null && asRecord(record.style) != null && Array.isArray(record.children) && record.children.every((child) => isFigmaSerializedNodeV1(child));
  }
  function isNormalizedDocumentShape(value) {
    const record = asRecord(value);
    return (record == null ? void 0 : record.schemaVersion) === 2 && record.root != null;
  }
  function isFigmaJsonValue(value) {
    if (value == null || typeof value === "string" || typeof value === "number" && Number.isFinite(value) || typeof value === "boolean") {
      return true;
    }
    if (Array.isArray(value)) {
      return value.every((entry) => isFigmaJsonValue(entry));
    }
    const record = asRecord(value);
    return record != null && Object.values(record).every((entry) => isFigmaJsonValue(entry));
  }
  function asRecord(value) {
    return value != null && typeof value === "object" && !Array.isArray(value) ? value : null;
  }
  function getNodeChildren(node) {
    var _a;
    return (_a = node.children) != null ? _a : [];
  }
  function cloneSpacing(spacing) {
    return {
      top: spacing.top,
      right: spacing.right,
      bottom: spacing.bottom,
      left: spacing.left
    };
  }
  function cloneJsonValue(value) {
    return JSON.parse(JSON.stringify(value));
  }
  function cloneJsonObject(value) {
    return JSON.parse(JSON.stringify(value));
  }
  function isDefaultSpacing(spacing) {
    return spacing.top === 0 && spacing.right === 0 && spacing.bottom === 0 && spacing.left === 0;
  }
  function isDefaultMinConstraints(value) {
    const constraints = asRecord(value);
    return constraints != null && constraints.horizontal === "MIN" && constraints.vertical === "MIN" && Object.keys(constraints).every((key) => key === "horizontal" || key === "vertical");
  }
  function isEmptyRecord(value) {
    return Object.keys(value).length === 0;
  }
  function isEmptyJsonArray(value) {
    return Array.isArray(value) && value.length === 0;
  }
  function compactPaintArray(value) {
    if (!Array.isArray(value)) {
      return cloneJsonValue(value);
    }
    return value.map((paint) => compactPaint(paint));
  }
  function compactPaint(value) {
    const paint = asRecord(value);
    if (paint == null) {
      return cloneJsonValue(value);
    }
    const compact = {};
    for (const [key, entry] of Object.entries(paint)) {
      if (key === "visible" && entry === true) {
        continue;
      }
      if (key === "opacity" && entry === 1) {
        continue;
      }
      if (isFigmaJsonValue(entry)) {
        compact[key] = cloneJsonValue(entry);
      }
    }
    return compact;
  }
  function restorePaintArray(value) {
    if (!Array.isArray(value)) {
      return cloneJsonValue(value);
    }
    return value.map((paint) => restorePaint(paint));
  }
  function restorePaint(value) {
    const paint = asRecord(value);
    if (paint == null) {
      return cloneJsonValue(value);
    }
    const restored = {};
    for (const [key, entry] of Object.entries(paint)) {
      if (isFigmaJsonValue(entry)) {
        restored[key] = cloneJsonValue(entry);
      }
    }
    if (typeof restored.type === "string") {
      if (restored.visible == null) {
        restored.visible = true;
      }
      if (restored.opacity == null) {
        restored.opacity = 1;
      }
    }
    return restored;
  }
  function isMergeableObject(value) {
    return asRecord(value) != null;
  }
  function valuesAreEqual(first, second) {
    return JSON.stringify(first) === JSON.stringify(second);
  }
  function parseJson(value) {
    try {
      return {
        ok: true,
        value: JSON.parse(value)
      };
    } catch (_error) {
      return {
        ok: false,
        error: "Paste valid JSON."
      };
    }
  }
  function createBounds(x2, y3, width, height) {
    const roundedX = roundLayoutNumber(x2);
    const roundedY = roundLayoutNumber(y3);
    const roundedWidth = roundLayoutNumber(width);
    const roundedHeight = roundLayoutNumber(height);
    return {
      x: roundedX,
      y: roundedY,
      width: roundedWidth,
      height: roundedHeight,
      right: roundLayoutNumber(roundedX + roundedWidth),
      bottom: roundLayoutNumber(roundedY + roundedHeight),
      centerX: roundLayoutNumber(roundedX + roundedWidth / 2),
      centerY: roundLayoutNumber(roundedY + roundedHeight / 2)
    };
  }
  function getPercentBounds(bounds, container) {
    return {
      x: toPercent(bounds.x, container.width),
      y: toPercent(bounds.y, container.height),
      width: toPercent(bounds.width, container.width),
      height: toPercent(bounds.height, container.height),
      right: toPercent(bounds.right, container.width),
      bottom: toPercent(bounds.bottom, container.height)
    };
  }
  function toPercent(value, total) {
    return total === 0 ? 0 : roundLayoutNumber(value / total * 100);
  }
  function roundLayoutNumber(value) {
    return Math.round(value * 1e3) / 1e3;
  }
  var defaultSpacing, missingValue;
  var init_normalizedFrameSchema = __esm({
    "src/normalizedFrameSchema.ts"() {
      "use strict";
      defaultSpacing = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      };
      missingValue = Symbol("missing");
    }
  });

  // src/ui.tsx
  var ui_exports = {};
  __export(ui_exports, {
    default: () => ui_default
  });
  function Plugin() {
    const [importedFrame, setImportedFrame] = d2(null);
    const [workingFrame, setWorkingFrame] = d2(null);
    const [frameSource, setFrameSource] = d2(null);
    const [importError, setImportError] = d2("");
    const [targetDevice, setTargetDevice] = d2("mobile");
    const [layoutRules, setLayoutRules] = d2(defaultLayoutRules);
    const [exportSnapshot, setExportSnapshot] = d2(null);
    const [isExportPanelOpen, setIsExportPanelOpen] = d2(false);
    const [jsonImportError, setJsonImportError] = d2("");
    const [undoStack, setUndoStack] = d2([]);
    const [redoStack, setRedoStack] = d2([]);
    function clearImportedFrame() {
      setImportedFrame(null);
      setWorkingFrame(null);
      setFrameSource(null);
      setImportError("");
      setJsonImportError("");
      setUndoStack([]);
      setRedoStack([]);
      setExportSnapshot(null);
      setIsExportPanelOpen(false);
    }
    function changeWorkingFrame(nextFrame) {
      if (workingFrame != null) {
        setUndoStack((currentStack) => trimHistory([...currentStack, cloneFrame(workingFrame)]));
      }
      setRedoStack([]);
      setWorkingFrame(nextFrame);
      syncExportSnapshotFrame(nextFrame);
    }
    function undoFrameChange() {
      if (workingFrame == null || undoStack.length === 0) {
        return;
      }
      const previousFrame = undoStack[undoStack.length - 1];
      setUndoStack((currentStack) => currentStack.slice(0, -1));
      setRedoStack((currentStack) => trimHistory([...currentStack, cloneFrame(workingFrame)]));
      setWorkingFrame(cloneFrame(previousFrame));
      syncExportSnapshotFrame(previousFrame);
    }
    function redoFrameChange() {
      if (redoStack.length === 0) {
        return;
      }
      const nextFrame = redoStack[redoStack.length - 1];
      setRedoStack((currentStack) => currentStack.slice(0, -1));
      if (workingFrame != null) {
        setUndoStack((currentStack) => trimHistory([...currentStack, cloneFrame(workingFrame)]));
      }
      setWorkingFrame(cloneFrame(nextFrame));
      syncExportSnapshotFrame(nextFrame);
    }
    function syncExportSnapshotFrame(nextFrame) {
      const importedWidth = getImportedFrameWidth(nextFrame);
      setExportSnapshot((currentSnapshot) => currentSnapshot == null ? null : __spreadProps(__spreadValues({}, currentSnapshot), {
        settings: __spreadProps(__spreadValues({}, currentSnapshot.settings), {
          sourceWidth: importedWidth,
          screenWidth: getTargetDeviceWidth(currentSnapshot.settings.targetDevice, importedWidth)
        }),
        frame: cloneFrame(nextFrame)
      }));
    }
    function handleGenerate(settings) {
      setTargetDevice(settings.targetDevice);
      setLayoutRules(settings.layoutRules);
      if (workingFrame == null) {
        return;
      }
      setExportSnapshot({
        id: `export-${Date.now()}`,
        appliedAt: (/* @__PURE__ */ new Date()).toISOString(),
        settings,
        frame: cloneFrame(workingFrame)
      });
      setIsExportPanelOpen(true);
    }
    function importJson(value) {
      var _a, _b, _c, _d;
      const result = parseJsonImport(value);
      if ("error" in result) {
        setJsonImportError(result.error);
        return false;
      }
      const nextTargetDevice = (_a = result.targetDevice) != null ? _a : targetDevice;
      const importedWidth = getImportedFrameWidth(result.frame);
      const referenceWidth = getTargetDeviceWidth(nextTargetDevice, importedWidth);
      const nextLayoutRules = (_b = result.layoutRules) != null ? _b : layoutRules;
      const nextOptions = (_c = result.options) != null ? _c : createDefaultConversionOptions();
      const settings = {
        targetDevice: nextTargetDevice,
        sourceWidth: importedWidth,
        screenWidth: referenceWidth,
        sourceFrame: null,
        layoutRules: nextLayoutRules,
        options: nextOptions
      };
      setImportedFrame(cloneFrame(result.frame));
      setWorkingFrame(cloneFrame(result.frame));
      setFrameSource("json");
      setImportError("");
      setJsonImportError("");
      setUndoStack([]);
      setRedoStack([]);
      setTargetDevice(nextTargetDevice);
      setLayoutRules(nextLayoutRules);
      setExportSnapshot({
        id: `json-import-${Date.now()}`,
        appliedAt: (_d = result.appliedAt) != null ? _d : (/* @__PURE__ */ new Date()).toISOString(),
        settings,
        frame: cloneFrame(result.frame)
      });
      setIsExportPanelOpen(true);
      createExportFrameFromJson(result.frame, settings);
      return true;
    }
    y2(() => {
      function handleMessage(event) {
        const message = event.data.pluginMessage;
        if (message == null) {
          return;
        }
        if (message.type === "frame-imported") {
          setImportedFrame(cloneFrame(message.payload));
          setWorkingFrame(cloneFrame(message.payload));
          setFrameSource("figma");
          setImportError("");
          setJsonImportError("");
          setUndoStack([]);
          setRedoStack([]);
          setExportSnapshot(null);
          return;
        }
        if (message.type === "import-error") {
          setImportError(message.message);
        }
      }
      window.addEventListener("message", handleMessage);
      return () => {
        window.removeEventListener("message", handleMessage);
      };
    }, []);
    return /* @__PURE__ */ k("main", { class: "h-screen w-screen overflow-hidden bg-[#f6f7fb] text-[#111827] flex" }, /* @__PURE__ */ k(
      ResponsiveSidebar,
      {
        importedFrame,
        workingFrame,
        importError,
        jsonImportError,
        isJsonImportedFrame: frameSource === "json",
        targetDevice,
        layoutRules,
        onTargetDeviceChange: setTargetDevice,
        onLayoutRulesChange: setLayoutRules,
        onClearFrame: clearImportedFrame,
        onImportJson: importJson,
        onGenerate: handleGenerate
      }
    ), /* @__PURE__ */ k(
      Editor,
      {
        sourceFrame: importedFrame,
        frame: workingFrame,
        targetDevice,
        screenWidth: getTargetDeviceWidth(targetDevice, getImportedFrameWidth(importedFrame)),
        layoutRules,
        canUndo: undoStack.length > 0,
        canRedo: redoStack.length > 0,
        onUndo: undoFrameChange,
        onRedo: redoFrameChange,
        onFrameChange: changeWorkingFrame
      }
    ), /* @__PURE__ */ k(
      ExportFramePanel,
      {
        snapshot: exportSnapshot,
        isOpen: isExportPanelOpen,
        onClose: () => setIsExportPanelOpen(false)
      }
    ));
  }
  function parseJsonImport(value) {
    var _a, _b;
    let parsed;
    try {
      parsed = JSON.parse(value);
    } catch (_error) {
      return {
        error: "Paste valid JSON."
      };
    }
    const root = asRecord2(parsed);
    if (root == null) {
      return {
        error: "JSON must be an object."
      };
    }
    const frameResult = deserializeNormalizedJson(parsed);
    if (!frameResult.ok) {
      return {
        error: frameResult.errors.length === 0 ? "JSON must include a serialized frame." : `JSON frame is invalid: ${frameResult.errors[0].path} ${frameResult.errors[0].message}`
      };
    }
    const settings = asRecord2(root.settings);
    const target = asRecord2(root.target);
    return {
      frame: denormalizeFigmaJson(frameResult.value),
      appliedAt: readString(root.appliedAt),
      targetDevice: readTargetDevice((_a = settings == null ? void 0 : settings.targetDevice) != null ? _a : target == null ? void 0 : target.device),
      layoutRules: readLayoutRules(settings == null ? void 0 : settings.layoutRules),
      options: readConversionOptions((_b = settings == null ? void 0 : settings.options) != null ? _b : root.appliedOptions)
    };
  }
  function cloneFrame(frame) {
    return JSON.parse(JSON.stringify(frame));
  }
  function trimHistory(stack) {
    return stack.length > historyLimit ? stack.slice(stack.length - historyLimit) : stack;
  }
  function getImportedFrameWidth(frame) {
    if (frame == null) {
      return 1;
    }
    return Math.max(1, Math.round(frame.geometry.width));
  }
  function createExportFrameFromJson(frame, settings) {
    parent.postMessage(
      {
        pluginMessage: {
          type: "create-export-frame-from-json",
          payload: {
            frame,
            screenWidth: settings.screenWidth,
            layoutRules: settings.layoutRules
          }
        }
      },
      "*"
    );
  }
  function readTargetDevice(value) {
    if (value === "mobile" || value === "tablet" || value === "desktop" || value === "custom") {
      return value;
    }
    return void 0;
  }
  function readLayoutRules(value) {
    const record = asRecord2(value);
    if (record == null) {
      return void 0;
    }
    return {
      conversionDirection: record.conversionDirection === "column-to-row" ? "column-to-row" : "row-to-column",
      rowToColumnMode: readMode(record.rowToColumnMode),
      rowToColumnBreakpoint: readBoundedNumber(record.rowToColumnBreakpoint, defaultLayoutRules.rowToColumnBreakpoint, 1, 1e4),
      stackGap: readBoundedNumber(record.stackGap, defaultLayoutRules.stackGap, 0, 1e3),
      outputPadding: readBoundedNumber(record.outputPadding, defaultLayoutRules.outputPadding, 0, 1e3),
      stackAlignment: readStackAlignment(record.stackAlignment),
      textScaleMode: readTextScaleMode(record.textScaleMode),
      minimumTextSize: readBoundedNumber(record.minimumTextSize, defaultLayoutRules.minimumTextSize, 1, 200),
      tightenLineHeight: typeof record.tightenLineHeight === "boolean" ? record.tightenLineHeight : defaultLayoutRules.tightenLineHeight
    };
  }
  function readConversionOptions(value) {
    if (!Array.isArray(value)) {
      return void 0;
    }
    const options = value.flatMap((option) => {
      const record = asRecord2(option);
      if (record == null || typeof record.id !== "string" || typeof record.label !== "string" || typeof record.description !== "string") {
        return [];
      }
      return [{
        id: record.id,
        label: record.label,
        description: record.description,
        enabled: typeof record.enabled === "boolean" ? record.enabled : true
      }];
    });
    return options.length === 0 ? void 0 : options;
  }
  function readMode(value) {
    if (value === "always" || value === "never") {
      return value;
    }
    return "auto";
  }
  function readStackAlignment(value) {
    if (value === "start" || value === "center" || value === "stretch") {
      return value;
    }
    return defaultLayoutRules.stackAlignment;
  }
  function readTextScaleMode(value) {
    if (value === "preserve" || value === "scale" || value === "clamp") {
      return value;
    }
    return defaultLayoutRules.textScaleMode;
  }
  function readBoundedNumber(value, fallback, min, max) {
    return typeof value === "number" && Number.isFinite(value) ? Math.min(max, Math.max(min, value)) : fallback;
  }
  function readString(value) {
    return typeof value === "string" ? value : void 0;
  }
  function asRecord2(value) {
    return value != null && typeof value === "object" && !Array.isArray(value) ? value : null;
  }
  var historyLimit, ui_default;
  var init_ui = __esm({
    "src/ui.tsx"() {
      "use strict";
      init_lib();
      init_preact_module();
      init_hooks_module();
      init_output();
      init_ExportFramePanel();
      init_LayoutRules();
      init_ResponsiveSidebar();
      init_Editor();
      init_normalizedFrameSchema();
      historyLimit = 40;
      ui_default = render(Plugin);
    }
  });

  // <stdin>
  var rootNode = document.getElementById("create-figma-plugin");
  var modules = { "src/main.ts--default": (init_ui(), __toCommonJS(ui_exports))["default"] };
  var commandId = __FIGMA_COMMAND__ === "" ? "src/main.ts--default" : __FIGMA_COMMAND__;
  if (typeof modules[commandId] === "undefined") {
    throw new Error(
      "No UI defined for command `" + commandId + "`"
    );
  }
  modules[commandId](rootNode, __SHOW_UI_DATA__);
})();
