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

  // ../../../../../../private/var/folders/ky/rsp5401s0j5dhj7vxmrd2gdr0000gn/T/54106c50-4a54-4f0b-b229-3d386c2fc276/base.js
  var init_base = __esm({
    "../../../../../../private/var/folders/ky/rsp5401s0j5dhj7vxmrd2gdr0000gn/T/54106c50-4a54-4f0b-b229-3d386c2fc276/base.js"() {
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

  // ../../../../../../private/var/folders/ky/rsp5401s0j5dhj7vxmrd2gdr0000gn/T/16a79b2b-6e1b-4567-9694-662e0ed8c248/output.js
  var init_output = __esm({
    "../../../../../../private/var/folders/ky/rsp5401s0j5dhj7vxmrd2gdr0000gn/T/16a79b2b-6e1b-4567-9694-662e0ed8c248/output.js"() {
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
    --color-red-600: oklch(57.7% 0.245 27.325);
    --color-red-700: oklch(50.5% 0.213 27.518);
    --color-orange-200: oklch(90.1% 0.076 70.697);
    --color-green-50: oklch(98.2% 0.018 155.826);
    --color-green-200: oklch(92.5% 0.084 155.995);
    --color-green-500: oklch(72.3% 0.219 149.579);
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
  .max-h-\\[45vh\\] {
    max-height: 45vh !important;
  }
  .max-h-\\[520px\\] {
    max-height: 520px !important;
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
  .text-red-600 {
    color: var(--color-red-600) !important;
  }
  .text-red-700 {
    color: var(--color-red-700) !important;
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
    const exportPayload = snapshot == null ? null : {
      exportType: "responsive-frame-plan",
      appliedAt: snapshot.appliedAt,
      target: {
        device: snapshot.settings.targetDevice,
        referenceWidth: snapshot.settings.screenWidth
      },
      source: {
        importedWidth: snapshot.settings.sourceWidth
      },
      appliedOptions: snapshot.settings.options.filter((option) => option.enabled),
      frame: snapshot.frame
    };
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
      snapshot == null || exportPayload == null ? /* @__PURE__ */ k("div", { class: "flex min-h-0 flex-1 items-center justify-center px-8 text-center" }, /* @__PURE__ */ k("div", null, /* @__PURE__ */ k("h3", { class: "text-sm font-bold text-gray-900" }, "No export yet"), /* @__PURE__ */ k("p", { class: "mt-2 text-sm leading-6 text-gray-500" }, "Generate a responsive frame to see the applied output here."))) : /* @__PURE__ */ k("div", { class: "min-h-0 flex-1 overflow-auto" }, /* @__PURE__ */ k("section", { class: "border-b border-[#e5e7eb] p-5" }, /* @__PURE__ */ k("div", { class: "grid grid-cols-2 gap-3" }, /* @__PURE__ */ k(SummaryItem, { label: "Target", value: snapshot.settings.targetDevice }), /* @__PURE__ */ k(SummaryItem, { label: "Reference", value: `${snapshot.settings.screenWidth}px` }), /* @__PURE__ */ k(SummaryItem, { label: "Imported", value: `${snapshot.settings.sourceWidth}px` }), /* @__PURE__ */ k(SummaryItem, { label: "Source", value: snapshot.frame.name }), /* @__PURE__ */ k(SummaryItem, { label: "Children", value: String(snapshot.frame.children.length) }))), /* @__PURE__ */ k("section", { class: "border-b border-[#e5e7eb] p-5" }, /* @__PURE__ */ k("h3", { class: "text-xs font-bold uppercase tracking-wide text-gray-500" }, "Applied Changes"), /* @__PURE__ */ k("div", { class: "mt-3 space-y-2" }, snapshot.settings.options.filter((option) => option.enabled).map((option) => /* @__PURE__ */ k(
        "div",
        {
          key: option.id,
          class: "rounded-lg border border-[#e5e7eb] bg-gray-50 px-3 py-2"
        },
        /* @__PURE__ */ k("p", { class: "text-xs font-semibold text-gray-900" }, option.label),
        /* @__PURE__ */ k("p", { class: "mt-0.5 text-xs text-gray-500" }, option.description)
      )))), /* @__PURE__ */ k("section", { class: "bg-[#111827]" }, /* @__PURE__ */ k("div", { class: "flex h-10 items-center justify-between border-b border-white/10 px-4" }, /* @__PURE__ */ k("h3", { class: "text-xs font-bold uppercase tracking-wide text-gray-300" }, "Export JSON"), /* @__PURE__ */ k("span", { class: "text-xs text-gray-400" }, "snapshot")), /* @__PURE__ */ k("pre", { class: "max-h-[520px] overflow-auto p-4 text-xs leading-5 text-gray-100" }, JSON.stringify(exportPayload, null, 2))))
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
  function ResponsiveSidebar({
    importedFrame,
    importError,
    jsonImportError,
    isJsonImportedFrame,
    targetDevice,
    sourceWidth,
    screenWidth,
    layoutRules,
    onTargetDeviceChange,
    onSourceWidthChange,
    onScreenWidthChange,
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
      const payload = {
        targetDevice,
        sourceWidth: Number(sourceWidth),
        screenWidth: Number(screenWidth),
        sourceFrame: isJsonImportedFrame ? null : importedFrame,
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
      } else if (importedFrame != null) {
        parent.postMessage(
          {
            pluginMessage: {
              type: "create-export-frame-from-json",
              payload: {
                frame: importedFrame,
                screenWidth: Number(screenWidth),
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
        onToggleJsonImport: () => setIsJsonImportOpen((current) => !current),
        onClear: onClearFrame
      }
    ), isJsonImportOpen && /* @__PURE__ */ k(
      JsonImportCard,
      {
        value: jsonImportValue,
        error: jsonImportError,
        onChange: setJsonImportValue,
        onImport: () => {
          if (onImportJson(jsonImportValue)) {
            setJsonImportValue("");
            setIsJsonImportOpen(false);
          }
        }
      }
    ), /* @__PURE__ */ k(
      WidthInput,
      {
        className: "mt-4",
        label: "Imported Width",
        value: sourceWidth,
        onChange: onSourceWidthChange,
        disabled: importedFrame == null
      }
    ), /* @__PURE__ */ k(StepTitle, { index: 2, title: "Target Device", className: "mt-7" }), /* @__PURE__ */ k(
      DeviceSelector,
      {
        value: targetDevice,
        onChange: onTargetDeviceChange
      }
    ), /* @__PURE__ */ k(
      WidthInput,
      {
        label: "Reference Width",
        value: screenWidth,
        onChange: onScreenWidthChange
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
        disabled: importedFrame == null || !isValidWidth(sourceWidth) || !isValidWidth(screenWidth),
        class: `flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold shadow-sm transition ${importedFrame == null || !isValidWidth(sourceWidth) || !isValidWidth(screenWidth) ? "cursor-not-allowed bg-gray-200 text-gray-400" : "bg-[#0f766e] text-white hover:bg-[#115e59]"}`
      },
      /* @__PURE__ */ k("span", null, "\u2726"),
      isJsonImportedFrame ? "Update Export Wireframe" : "Generate Responsive Frame"
    ), /* @__PURE__ */ k("p", { class: "mt-3 text-center text-xs leading-relaxed text-gray-500" }, isJsonImportedFrame ? "The pasted JSON is the editable export wireframe." : "A new editable frame will be created next to your selected frame.")));
  }
  function SidebarHeader() {
    return /* @__PURE__ */ k("header", { class: "flex h-16 items-center justify-between border-b border-[#e5e7eb] px-5" }, /* @__PURE__ */ k("div", { class: "flex items-center gap-3" }, /* @__PURE__ */ k("div", { class: "flex h-9 w-9 items-center justify-center rounded-xl bg-[#0f766e] text-sm font-bold text-white" }, "R"), /* @__PURE__ */ k("div", null, /* @__PURE__ */ k("h1", { class: "text-sm font-bold text-gray-900" }, "Responsive Studio"), /* @__PURE__ */ k("p", { class: "text-xs text-gray-500" }, "Wireframe layout converter"))), /* @__PURE__ */ k(
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
    onToggleJsonImport,
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
    )), /* @__PURE__ */ k(
      "button",
      {
        type: "button",
        onClick: onToggleJsonImport,
        class: "mt-2 w-full rounded-xl border border-[#cbd5e1] bg-[#f8fafc] px-3 py-2 text-xs font-bold text-gray-600 transition hover:border-gray-300 hover:bg-white hover:text-gray-900"
      },
      "Import JSON",
      /* @__PURE__ */ k("span", { class: "bg-red-600 text-white mx-2" }, '"TEST DEV"')
    ));
  }
  function JsonImportCard({
    value,
    error,
    onChange,
    onImport
  }) {
    return /* @__PURE__ */ k("div", { class: "mt-3 rounded-xl border border-[#e5e7eb] bg-gray-50 p-3" }, /* @__PURE__ */ k("label", { class: "mb-2 block text-xs font-bold text-gray-700" }, "JSON Import"), /* @__PURE__ */ k(
      "textarea",
      {
        value,
        onInput: (event) => onChange(event.currentTarget.value),
        class: "h-32 w-full resize-none rounded-lg border border-[#d1d5db] bg-white p-3 font-mono text-[11px] leading-4 text-gray-900 outline-none transition focus:border-[#0f766e] focus:ring-2 focus:ring-[#0f766e]/10"
      }
    ), error !== "" && /* @__PURE__ */ k("p", { class: "mt-2 rounded-lg bg-red-50 px-3 py-2 text-[11px] font-semibold text-red-700" }, error), /* @__PURE__ */ k(
      "button",
      {
        type: "button",
        onClick: onImport,
        disabled: value.trim() === "",
        class: `mt-2 h-9 w-full rounded-lg text-xs font-bold transition ${value.trim() === "" ? "cursor-not-allowed bg-gray-200 text-gray-400" : "bg-[#0f766e] text-white hover:bg-[#115e59]"}`
      },
      "Import JSON"
    ));
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
  function WidthInput({
    label,
    value,
    onChange,
    disabled = false,
    className = "mt-4"
  }) {
    return /* @__PURE__ */ k("div", { class: className }, /* @__PURE__ */ k("label", { class: "mb-2 block text-xs font-semibold text-gray-700" }, label), /* @__PURE__ */ k("div", { class: "flex gap-2" }, /* @__PURE__ */ k(
      "input",
      {
        type: "number",
        min: "1",
        value,
        disabled,
        onInput: (event) => onChange(event.currentTarget.value),
        class: "h-10 min-w-0 flex-1 rounded-xl border border-[#e5e7eb] bg-white px-3 text-sm text-gray-900 outline-none transition focus:border-[#0f766e] focus:ring-2 focus:ring-[#0f766e]/10 disabled:bg-gray-50 disabled:text-gray-400"
      }
    ), /* @__PURE__ */ k("div", { class: "flex h-10 w-14 items-center justify-center rounded-xl border border-[#e5e7eb] bg-gray-50 text-xs font-semibold text-gray-500" }, "px")));
  }
  function isValidWidth(value) {
    const numberValue = Number(value);
    return Number.isFinite(numberValue) && numberValue > 0;
  }
  var init_ResponsiveSidebar = __esm({
    "src/components/ResponsiveSidebar.tsx"() {
      "use strict";
      init_hooks_module();
      init_preact_module();
      init_LayoutRules();
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
        isExpanded ? /* @__PURE__ */ k("div", null, /* @__PURE__ */ k("h3", { class: "text-xs font-bold uppercase tracking-wide text-gray-500" }, "Export Preview"), /* @__PURE__ */ k("p", { class: "mt-0.5 text-[11px] text-gray-500" }, getDeviceLabel(targetDevice), " \xB7 ", Math.round(screenWidth), "px ref")) : /* @__PURE__ */ k("span", { class: "[writing-mode:vertical-rl] text-xs font-bold uppercase tracking-wide text-gray-500" }, "Export Preview"),
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
    const [viewportWidth, setViewportWidth] = d2(720);
    const reviewWidth = Number.isFinite(screenWidth) && screenWidth > 0 ? screenWidth : frame.geometry.width;
    const backgroundColor = (_a = getSolidFillColor(frame.style.fills)) != null ? _a : "#ffffff";
    const exportGroups = createExportReviewGroups(frame, reviewWidth, layoutRules);
    const reviewHeight = Math.max(
      Math.min(frame.geometry.height, 760),
      exportGroups.reduce((bottom, group) => Math.max(bottom, group.y + group.height), 0) + 24
    );
    const availableWidth = Math.max(240, viewportWidth - 48);
    const fitScale = availableWidth / Math.max(reviewWidth, 1);
    const minimumReadableScale = targetDevice === "desktop" ? 0.45 : targetDevice === "tablet" ? 0.6 : 0.85;
    const canvasScale = Math.min(1, Math.max(minimumReadableScale, fitScale));
    const canvasWidth = Math.max(1, reviewWidth * canvasScale);
    const canvasHeight = Math.max(1, reviewHeight * canvasScale);
    const isFrameSelected = selectedNodeId === frame.id;
    y2(() => {
      const scrollArea = scrollAreaRef.current;
      if (scrollArea == null) {
        return;
      }
      function updateViewportWidth() {
        const currentScrollArea = scrollAreaRef.current;
        if (currentScrollArea == null) {
          return;
        }
        setViewportWidth(currentScrollArea.getBoundingClientRect().width);
      }
      updateViewportWidth();
      if (typeof ResizeObserver === "undefined") {
        window.addEventListener("resize", updateViewportWidth);
        return () => window.removeEventListener("resize", updateViewportWidth);
      }
      const observer = new ResizeObserver(updateViewportWidth);
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
        class: "min-h-full",
        style: {
          minWidth: `${canvasWidth + 40}px`
        }
      },
      /* @__PURE__ */ k("div", { class: "mx-auto w-fit" }, /* @__PURE__ */ k("div", { class: "mb-3 flex items-center justify-between gap-4 text-xs" }, /* @__PURE__ */ k("div", { class: "flex items-center gap-2" }, /* @__PURE__ */ k("span", { class: "font-bold text-gray-900" }, "Generated"), /* @__PURE__ */ k("span", { class: "text-gray-300" }, "\xB7"), /* @__PURE__ */ k("span", { class: "font-semibold text-gray-500" }, getDeviceLabel(targetDevice)), /* @__PURE__ */ k("span", { class: "text-gray-300" }, "\xB7"), /* @__PURE__ */ k("span", { class: "font-semibold text-gray-500" }, Math.round(reviewWidth), "px ref")), /* @__PURE__ */ k("div", { class: "flex shrink-0 items-center gap-2" }, selectedNodeId != null && /* @__PURE__ */ k(
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
    var _a;
    if (!node.visible) {
      return null;
    }
    const isSelected = selectedNodeId === node.id;
    if (isVirtualGroup(node)) {
      const arrangedChildren2 = arrangeResponsiveChildren(node, layoutRules, reviewWidth);
      const renderedHeight2 = getResponsiveNodeHeight(node, layoutRules, reviewWidth);
      return /* @__PURE__ */ k(
        "div",
        {
          class: "absolute cursor-pointer overflow-visible",
          title: node.name,
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
            left: `${(node.geometry.x - origin.x) * scale}px`,
            top: `${(node.geometry.y - origin.y) * scale}px`,
            width: `${node.geometry.width * scale}px`,
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
    const fillColor = getSolidFillColor(node.style.fills);
    const isTextNode = node.text != null;
    const backgroundColor = isTextNode ? void 0 : fillColor;
    const textColor = isTextNode ? fillColor : void 0;
    const borderColor = getSolidFillColor(node.style.strokes);
    const borderWidth = borderColor == null ? 0 : Math.max(1, ((_a = node.style.strokeWeight) != null ? _a : 1) * scale);
    const arrangedChildren = arrangeResponsiveChildren(node, layoutRules, reviewWidth);
    const renderedHeight = getResponsiveNodeHeight(node, layoutRules, reviewWidth);
    return /* @__PURE__ */ k(
      "div",
      {
        class: "absolute cursor-pointer overflow-hidden",
        title: node.name,
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
          left: `${(node.geometry.x - origin.x) * scale}px`,
          top: `${(node.geometry.y - origin.y) * scale}px`,
          width: `${node.geometry.width * scale}px`,
          height: `${renderedHeight * scale}px`,
          opacity: node.style.opacity,
          backgroundColor,
          borderColor,
          borderStyle: borderColor == null ? void 0 : "solid",
          borderWidth: `${borderWidth}px`,
          borderRadius: getCornerRadius(node.style.cornerRadius, scale),
          outline: isSelected ? "2px solid #0f766e" : void 0,
          outlineOffset: isSelected ? "-2px" : void 0,
          boxShadow: isSelected ? "0 0 0 3px rgba(15, 118, 110, 0.14)" : void 0
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
            fontSize: typeof node.text.fontSize === "number" ? `${getResponsiveFontSize(node.text.fontSize, scale, layoutRules)}px` : void 0,
            fontFamily: getTextFontFamily(node),
            fontWeight: getTextFontWeight(node),
            lineHeight: layoutRules.tightenLineHeight ? 1.15 : getTextLineHeight(node, scale),
            color: textColor != null ? textColor : "#1f2937",
            textAlign: getTextHorizontalAlign(node),
            whiteSpace: "pre-wrap",
            wordBreak: "break-word"
          }
        },
        node.text.characters
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
    )), /* @__PURE__ */ k("div", { class: "min-h-0 flex-1 overflow-auto p-3" }, /* @__PURE__ */ k(InspectorSection, { title: isFrame ? "Canvas" : "Export Box" }, /* @__PURE__ */ k("div", { class: "grid grid-cols-2 gap-2" }, /* @__PURE__ */ k(InspectorMetric, { label: isFrame ? "Reference" : "Width", value: `${Math.round(isFrame ? reviewWidth : node.geometry.width)}px` }), /* @__PURE__ */ k(InspectorMetric, { label: "Height", value: `${Math.round(renderedHeight)}px` }), /* @__PURE__ */ k(InspectorMetric, { label: "X", value: `${Math.round(node.geometry.x)}px` }), /* @__PURE__ */ k(InspectorMetric, { label: "Y", value: `${Math.round(node.geometry.y)}px` }))), isFrame && /* @__PURE__ */ k(InspectorSection, { title: "Frame Settings" }, /* @__PURE__ */ k("div", { class: "grid grid-cols-2 gap-2" }, /* @__PURE__ */ k(InspectorMetric, { label: "Device", value: getDeviceLabel(targetDevice) }), /* @__PURE__ */ k(InspectorMetric, { label: "Children", value: String(frame.children.length) }), /* @__PURE__ */ k(InspectorMetric, { label: "Padding", value: `${layoutRules.outputPadding}px` }), /* @__PURE__ */ k(InspectorMetric, { label: "Rules", value: String(countCustomRules(frame)) }))), isContainer && /* @__PURE__ */ k(InspectorSection, { title: "Container Behavior" }, /* @__PURE__ */ k("div", { class: "space-y-2" }, /* @__PURE__ */ k(InspectorRow, { label: "Current layout", value: String((_a = node.layout.layoutMode) != null ? _a : "None") }), /* @__PURE__ */ k(InspectorRow, { label: "Generated layout", value: convertedLayoutMode != null ? convertedLayoutMode : "Keep" }), /* @__PURE__ */ k(InspectorRow, { label: "Rule source", value: ((_c = (_b = node.responsive) == null ? void 0 : _b.nodeRule) == null ? void 0 : _c.enabled) === true ? "Custom" : "Inherited" }), /* @__PURE__ */ k(InspectorRow, { label: "Direction", value: formatConversionDirection(effectiveRules.conversionDirection) }), /* @__PURE__ */ k(InspectorRow, { label: "Trigger", value: effectiveRules.rowToColumnMode }), /* @__PURE__ */ k(InspectorRow, { label: "Breakpoint", value: `${effectiveRules.rowToColumnBreakpoint}px` }), /* @__PURE__ */ k(InspectorRow, { label: "Gap", value: `${effectiveRules.stackGap}px` }), /* @__PURE__ */ k(InspectorRow, { label: "Align", value: effectiveRules.stackAlignment }), /* @__PURE__ */ k(InspectorRow, { label: "Children", value: String(node.children.length) }))), isText && /* @__PURE__ */ k(InspectorSection, { title: "Text" }, /* @__PURE__ */ k("div", { class: "space-y-2" }, /* @__PURE__ */ k(InspectorRow, { label: "Size", value: typeof ((_d = node.text) == null ? void 0 : _d.fontSize) === "number" ? `${node.text.fontSize}px` : "Mixed" }), /* @__PURE__ */ k(InspectorRow, { label: "Weight", value: String((_e = getTextFontWeight(node)) != null ? _e : "Default") }), /* @__PURE__ */ k(InspectorRow, { label: "Align", value: getTextHorizontalAlign(node) }), /* @__PURE__ */ k("div", { class: "rounded-lg border border-[#e5e7eb] bg-gray-50 p-2 text-xs leading-5 text-gray-700" }, (_f = node.text) == null ? void 0 : _f.characters))), !isFrame && !isText && /* @__PURE__ */ k(InspectorSection, { title: "Visual Style" }, /* @__PURE__ */ k("div", { class: "space-y-2" }, /* @__PURE__ */ k(InspectorRow, { label: "Fill", value: (_g = getSolidFillColor(node.style.fills)) != null ? _g : "None" }), /* @__PURE__ */ k(InspectorRow, { label: "Stroke", value: (_h = getSolidFillColor(node.style.strokes)) != null ? _h : "None" }), /* @__PURE__ */ k(InspectorRow, { label: "Radius", value: node.style.cornerRadius == null ? "0" : String(node.style.cornerRadius) }), /* @__PURE__ */ k(InspectorRow, { label: "Opacity", value: node.style.opacity == null ? "100%" : `${Math.round(node.style.opacity * 100)}%` })))), /* @__PURE__ */ k("footer", { class: "shrink-0 border-t border-[#e5e7eb] p-3" }, /* @__PURE__ */ k(
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
  function getResponsiveNodeHeight(node, layoutRules, reviewWidth) {
    var _a;
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
    if (getNodeAxisSizing2(node, "vertical") === "HUG") {
      return Math.max(1, childrenBottom + padding.bottom);
    }
    return Math.max(node.geometry.height, childrenBottom);
  }
  function createExportReviewGroups(frame, reviewWidth, layoutRules) {
    const outerPadding = layoutRules.outputPadding;
    const contentWidth = Math.max(1, reviewWidth - outerPadding * 2);
    const visibleChildren = frame.children.filter((child) => child.visible).sort((first, second) => first.geometry.y - second.geometry.y || first.geometry.x - second.geometry.x);
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
    const effectiveRules = getEffectiveLayoutRules(node, layoutRules);
    const convertedLayoutMode = getConvertedLayoutMode(node, effectiveRules, reviewWidth);
    const activeLayoutMode = convertedLayoutMode != null ? convertedLayoutMode : getNativeLayoutMode(node);
    const activeRules = convertedLayoutMode == null ? getNativeLayoutRules(node, effectiveRules) : effectiveRules;
    if (activeLayoutMode == null) {
      return node.children.map((child) => ({ node: child }));
    }
    if (activeLayoutMode === "HORIZONTAL") {
      return arrangeChildrenHorizontally(node, layoutRules, activeRules, reviewWidth);
    }
    return arrangeChildrenVertically(node, layoutRules, activeRules, reviewWidth);
  }
  function arrangeChildrenVertically(node, layoutRules, effectiveRules, reviewWidth) {
    var _a;
    const padding = (_a = node.layout.padding) != null ? _a : {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    };
    let nextY = padding.top;
    const contentWidth = Math.max(0, node.geometry.width - padding.left - padding.right);
    const contentHeight = Math.max(0, node.geometry.height - padding.top - padding.bottom);
    const totalGap = effectiveRules.stackGap * Math.max(0, node.children.length - 1);
    const childLayouts = node.children.map((child) => {
      const childWidth = shouldFillAxis(
        child,
        "horizontal",
        effectiveRules.stackAlignment === "stretch" || child.layout.layoutAlign === "STRETCH",
        "VERTICAL"
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
        fillsHeight: shouldFillAxis(child, "vertical", false, "VERTICAL")
      };
    });
    const fillHeightCount = childLayouts.filter((child) => child.fillsHeight).length;
    const fixedHeightTotal = childLayouts.reduce((total, child) => {
      return child.fillsHeight ? total : total + child.baseHeight;
    }, 0);
    const fillHeight = fillHeightCount === 0 ? 0 : Math.max(1, (contentHeight - totalGap - fixedHeightTotal) / fillHeightCount);
    return childLayouts.map((childLayout) => {
      const child = childLayout.child;
      const childWidth = childLayout.childWidth;
      const childHeight = childLayout.fillsHeight ? fillHeight : childLayout.baseHeight;
      const childX = getStackedChildX(
        effectiveRules.stackAlignment,
        padding.left,
        contentWidth,
        childWidth
      );
      const nextChild = __spreadProps(__spreadValues({}, child), {
        geometry: __spreadProps(__spreadValues({}, child.geometry), {
          x: childX,
          y: nextY,
          width: childWidth,
          height: childHeight
        })
      });
      nextY += childHeight + effectiveRules.stackGap;
      return {
        node: nextChild
      };
    });
  }
  function arrangeChildrenHorizontally(node, layoutRules, effectiveRules, reviewWidth) {
    var _a;
    const padding = (_a = node.layout.padding) != null ? _a : {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    };
    let nextX = padding.left;
    const contentWidth = Math.max(0, node.geometry.width - padding.left - padding.right);
    const contentHeight = Math.max(0, node.geometry.height - padding.top - padding.bottom);
    const totalGap = effectiveRules.stackGap * Math.max(0, node.children.length - 1);
    const childLayouts = node.children.map((child) => ({
      child,
      fillsWidth: shouldFillAxis(child, "horizontal", false, "HORIZONTAL"),
      childHeight: shouldFillAxis(
        child,
        "vertical",
        effectiveRules.stackAlignment === "stretch" || child.layout.layoutAlign === "STRETCH",
        "HORIZONTAL"
      ) ? contentHeight : child.geometry.height
    }));
    const fillWidthCount = childLayouts.filter((child) => child.fillsWidth).length;
    const fixedWidthTotal = childLayouts.reduce((total, child) => {
      return child.fillsWidth ? total : total + child.child.geometry.width;
    }, 0);
    const fillChildWidth = fillWidthCount === 0 ? 0 : Math.max(1, (contentWidth - totalGap - fixedWidthTotal) / fillWidthCount);
    return childLayouts.map((childLayout) => {
      const child = childLayout.child;
      const childWidth = childLayout.fillsWidth ? fillChildWidth : child.geometry.width;
      const childHeight = childLayout.childHeight;
      const childY = getInlineChildY(
        effectiveRules.stackAlignment,
        padding.top,
        contentHeight,
        childHeight
      );
      const nextChild = __spreadProps(__spreadValues({}, child), {
        geometry: __spreadProps(__spreadValues({}, child.geometry), {
          x: nextX,
          y: childY,
          width: childWidth,
          height: childHeight
        })
      });
      nextX += childWidth + effectiveRules.stackGap;
      return {
        node: nextChild
      };
    });
  }
  function getStackedChildX(stackAlignment, paddingLeft, contentWidth, childWidth) {
    if (stackAlignment === "center") {
      return paddingLeft + Math.max(0, (contentWidth - childWidth) / 2);
    }
    return paddingLeft;
  }
  function getInlineChildY(stackAlignment, paddingTop, contentHeight, childHeight) {
    if (stackAlignment === "center") {
      return paddingTop + Math.max(0, (contentHeight - childHeight) / 2);
    }
    return paddingTop;
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
  function shouldFillAxis(node, axis, defaultFill, parentLayoutMode = null) {
    const sizingMode = getNodeAxisSizing2(node, axis, parentLayoutMode);
    return sizingMode === "FILL" || sizingMode == null && defaultFill;
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

  // src/components/JsonViewer.tsx
  function JsonViewerSlider({
    frame,
    isExpanded,
    onToggle
  }) {
    return /* @__PURE__ */ k("section", { class: "absolute bottom-0 left-0 right-12 z-30 h-12 border-t border-[#e5e7eb] bg-[#111827]" }, /* @__PURE__ */ k(
      "button",
      {
        type: "button",
        onClick: onToggle,
        class: "flex h-12 w-full items-center justify-between px-6 text-left transition hover:bg-white/5"
      },
      /* @__PURE__ */ k("div", null, /* @__PURE__ */ k("h3", { class: "text-xs font-bold uppercase tracking-wide text-gray-300" }, "JSON Viewer"), /* @__PURE__ */ k("p", { class: "mt-0.5 text-[11px] text-gray-400" }, frame.children.length, " root children")),
      /* @__PURE__ */ k("span", { class: "text-xs font-semibold text-[#5eead4]" }, isExpanded ? "Collapse" : "Expand")
    ));
  }
  function JsonViewerOverlay({
    frame,
    onClose
  }) {
    const [copyStatus, setCopyStatus] = d2("idle");
    const json = JSON.stringify(frame, null, 2);
    async function copyJson() {
      const didCopy = await copyText(json);
      if (didCopy) {
        setCopyStatus("copied");
        window.setTimeout(() => setCopyStatus("idle"), 1600);
        return;
      }
      setCopyStatus("error");
      window.setTimeout(() => setCopyStatus("idle"), 1600);
    }
    return /* @__PURE__ */ k("section", { class: "fixed inset-0 z-50 flex min-h-0 flex-col bg-[#111827] shadow-2xl" }, /* @__PURE__ */ k("header", { class: "flex h-12 shrink-0 items-center justify-between border-b border-white/10 px-6" }, /* @__PURE__ */ k("div", null, /* @__PURE__ */ k("h3", { class: "text-xs font-bold uppercase tracking-wide text-gray-300" }, "JSON Viewer"), /* @__PURE__ */ k("p", { class: "mt-0.5 text-[11px] text-gray-400" }, frame.children.length, " root children")), /* @__PURE__ */ k("div", { class: "flex items-center gap-2" }, /* @__PURE__ */ k(
      "button",
      {
        type: "button",
        onClick: copyJson,
        class: "rounded-lg border border-white/10 px-3 py-1.5 text-xs font-semibold text-[#5eead4] transition hover:bg-white/5"
      },
      copyStatus === "copied" ? "Copied" : copyStatus === "error" ? "Copy failed" : "Copy JSON"
    ), /* @__PURE__ */ k(
      "button",
      {
        type: "button",
        onClick: onClose,
        class: "rounded-lg px-2 py-1 text-xs font-semibold text-[#5eead4] transition hover:bg-white/5"
      },
      "Collapse"
    ))), /* @__PURE__ */ k(JsonPreviewPanel, { json }));
  }
  function JsonPreviewPanel({ json }) {
    return /* @__PURE__ */ k("section", { class: "flex min-h-0 flex-1 flex-col bg-[#111827]" }, /* @__PURE__ */ k("pre", { class: "min-h-0 flex-1 overflow-auto p-4 text-xs leading-5 text-gray-100" }, json));
  }
  async function copyText(value) {
    var _a;
    try {
      if (((_a = navigator.clipboard) == null ? void 0 : _a.writeText) != null) {
        await navigator.clipboard.writeText(value);
        return true;
      }
    } catch (_error) {
    }
    const textarea = document.createElement("textarea");
    textarea.value = value;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    textarea.style.top = "0";
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    try {
      return document.execCommand("copy");
    } catch (_error) {
      return false;
    } finally {
      document.body.removeChild(textarea);
    }
  }
  var init_JsonViewer = __esm({
    "src/components/JsonViewer.tsx"() {
      "use strict";
      init_preact_module();
      init_hooks_module();
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
    function updateLayout(nextLayout, options = {}) {
      onChange(__spreadProps(__spreadValues({}, node), {
        layout: __spreadValues(__spreadProps(__spreadValues({}, layout), {
          isAutoLayout: options.forceAutoLayout === true || layout.isAutoLayout || isContainer
        }), nextLayout)
      }));
    }
    function updateWidthSizing(sizingMode) {
      updateLayout(normalizeChildSizingForParent({
        widthSizing: sizingMode,
        heightSizing: getCurrentHeightSizing()
      }, {
        parentLayoutMode
      }, __spreadValues(__spreadValues({
        layoutSizingHorizontal: sizingMode
      }, isContainer && layout.layoutMode === "HORIZONTAL" ? { primaryAxisSizingMode: toAxisSizingMode(sizingMode) } : {}), isContainer && layout.layoutMode !== "HORIZONTAL" ? { counterAxisSizingMode: toAxisSizingMode(sizingMode) } : {})));
    }
    function updateHeightSizing(sizingMode) {
      updateLayout(normalizeChildSizingForParent({
        widthSizing: getCurrentWidthSizing(),
        heightSizing: sizingMode
      }, {
        parentLayoutMode
      }, __spreadValues(__spreadValues({
        layoutSizingVertical: sizingMode
      }, isContainer && layout.layoutMode === "VERTICAL" ? { primaryAxisSizingMode: toAxisSizingMode(sizingMode) } : {}), isContainer && layout.layoutMode !== "VERTICAL" ? { counterAxisSizingMode: toAxisSizingMode(sizingMode) } : {})));
    }
    function stretchToParent() {
      updateWidthSizing("FILL");
    }
    function getCurrentWidthSizing() {
      return getSizingMode(
        layout.layoutSizingHorizontal,
        layout.layoutMode === "HORIZONTAL" ? layout.primaryAxisSizingMode : layout.counterAxisSizingMode
      );
    }
    function getCurrentHeightSizing() {
      return getSizingMode(
        layout.layoutSizingVertical,
        layout.layoutMode === "VERTICAL" ? layout.primaryAxisSizingMode : layout.counterAxisSizingMode
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
        onChange: (layoutMode) => updateLayout({
          autoLayoutDirection: layoutMode,
          layoutMode
        }, { forceAutoLayout: true })
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
        value: getCurrentWidthSizing(),
        options: [
          { value: "FILL", label: "Fill" },
          { value: "HUG", label: "Hug" },
          { value: "FIXED", label: "Fixed" }
        ],
        onChange: updateWidthSizing
      }
    ), /* @__PURE__ */ k(
      SelectField,
      {
        label: "Height",
        value: getCurrentHeightSizing(),
        options: [
          { value: "FILL", label: "Fill" },
          { value: "HUG", label: "Hug" },
          { value: "FIXED", label: "Fixed" }
        ],
        onChange: updateHeightSizing
      }
    )), !isContainer && /* @__PURE__ */ k(
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
  function getSizingMode(layoutSizing, axisSizing) {
    if (layoutSizing === "FILL" || layoutSizing === "HUG" || layoutSizing === "FIXED") {
      return layoutSizing;
    }
    if (axisSizing === "AUTO") {
      return "HUG";
    }
    return "FIXED";
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
    return nextLayout;
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
        class: "relative flex min-h-0 flex-col border-l border-[#e5e7eb] bg-white",
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
      /* @__PURE__ */ k("div", { class: "min-h-0 flex-1 overflow-auto p-3" }, /* @__PURE__ */ k(
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
      selectedNode != null && /* @__PURE__ */ k("div", { class: "shrink-0 border-t border-[#e5e7eb] bg-white" }, /* @__PURE__ */ k(
        "button",
        {
          type: "button",
          onClick: () => setIsLayoutPanelOpen((current) => !current),
          class: "flex h-11 w-full items-center justify-between px-3 text-left transition hover:bg-gray-50"
        },
        /* @__PURE__ */ k("div", { class: "min-w-0" }, /* @__PURE__ */ k("p", { class: "text-xs font-bold uppercase tracking-wide text-gray-500" }, "Layout"), /* @__PURE__ */ k("p", { class: "truncate text-[11px] font-semibold text-gray-900" }, selectedNode.name)),
        /* @__PURE__ */ k("span", { class: "shrink-0 text-xs font-semibold text-[#0f766e]" }, isLayoutPanelOpen ? "Hide" : "Edit")
      ), isLayoutPanelOpen && /* @__PURE__ */ k("div", { class: "max-h-[45vh] overflow-auto" }, /* @__PURE__ */ k(
        FlexLayoutPanel,
        {
          node: selectedNode,
          parentLayoutMode: selectedParentLayoutMode,
          onChange: (nextNode) => {
            const laidOutNode = applyFlexLayoutToNode(nextNode);
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
          onChange: (nextRule) => changeResponsiveRule(selectedNode.id, nextRule)
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
    onChange
  }) {
    var _a;
    const isContainer = node.children.length > 0;
    const currentRule = (_a = node.responsive) == null ? void 0 : _a.nodeRule;
    const isCustom = (currentRule == null ? void 0 : currentRule.enabled) === true;
    const rule = currentRule != null ? currentRule : createResponsiveNodeRule(globalRules);
    function updateRule(nextRule) {
      onChange(__spreadValues(__spreadProps(__spreadValues({}, rule), {
        enabled: true
      }), nextRule));
    }
    return /* @__PURE__ */ k("section", { class: "border-t border-[#e5e7eb] bg-white p-3" }, /* @__PURE__ */ k("div", { class: "mb-2 flex items-center justify-between gap-2" }, /* @__PURE__ */ k("div", { class: "min-w-0" }, /* @__PURE__ */ k("p", { class: "text-xs font-bold uppercase tracking-wide text-gray-500" }, "Responsive"), /* @__PURE__ */ k("p", { class: "truncate text-[11px] font-semibold text-gray-900" }, node.name)), isCustom && /* @__PURE__ */ k("span", { class: "shrink-0 rounded border border-[#0f766e]/20 bg-[#ecfdf5] px-1.5 py-0.5 text-[9px] font-bold text-[#0f766e]" }, "CUSTOM")), !isContainer ? /* @__PURE__ */ k("div", { class: "rounded-lg border border-[#e5e7eb] bg-gray-50 px-3 py-2 text-[11px] font-semibold text-gray-400" }, "Select a container layer") : /* @__PURE__ */ k("div", { class: "space-y-2" }, /* @__PURE__ */ k(
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
    onChange
  }) {
    return /* @__PURE__ */ k("label", { class: "block" }, /* @__PURE__ */ k("span", { class: "mb-1 block text-[10px] font-bold uppercase text-gray-400" }, label), /* @__PURE__ */ k(
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
        class: "h-9 w-full rounded-lg border border-[#e5e7eb] bg-white px-2 text-xs font-bold text-gray-900 outline-none transition focus:border-[#0f766e] focus:ring-2 focus:ring-[#0f766e]/10"
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
    const [selectedNodeId, setSelectedNodeId] = d2(null);
    const [isExportPreviewExpanded, setIsExportPreviewExpanded] = d2(false);
    const [isJsonViewerExpanded, setIsJsonViewerExpanded] = d2(false);
    y2(() => {
      var _a;
      setSelectedNodeId((_a = frame == null ? void 0 : frame.id) != null ? _a : null);
    }, [frame == null ? void 0 : frame.id]);
    y2(() => {
      if (frame == null || selectedNodeId == null) {
        return;
      }
      if (findNode(frame, selectedNodeId) == null) {
        setSelectedNodeId(frame.id);
      }
    }, [frame, selectedNodeId]);
    if (frame == null) {
      return /* @__PURE__ */ k(EmptyEditorState, null);
    }
    return /* @__PURE__ */ k("section", { class: "relative grid min-w-0 flex-1 grid-cols-[minmax(0,1fr)_320px] bg-[#f6f7fb]" }, /* @__PURE__ */ k("div", { class: "relative flex min-w-0 flex-col" }, /* @__PURE__ */ k(
      EditorHeader,
      {
        frame,
        canUndo,
        canRedo,
        onUndo,
        onRedo
      }
    ), /* @__PURE__ */ k("div", { class: "relative min-h-0 flex-1 overflow-hidden" }, /* @__PURE__ */ k("section", { class: "relative h-full min-h-0 overflow-hidden pb-12" }, /* @__PURE__ */ k("div", { class: "h-full overflow-hidden" }, !isExportPreviewExpanded && /* @__PURE__ */ k(
      FramePreview,
      {
        frame,
        selectedNodeId,
        onSelect: setSelectedNodeId
      }
    )), /* @__PURE__ */ k(
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
    )), /* @__PURE__ */ k(
      JsonViewerSlider,
      {
        frame,
        isExpanded: isJsonViewerExpanded,
        onToggle: () => setIsJsonViewerExpanded((current) => !current)
      }
    ))), /* @__PURE__ */ k(
      LayerPanel,
      {
        frame,
        selectedNodeId,
        layoutRules,
        onSelect: setSelectedNodeId,
        onFrameChange
      }
    ), isJsonViewerExpanded && /* @__PURE__ */ k(
      JsonViewerOverlay,
      {
        frame,
        onClose: () => setIsJsonViewerExpanded(false)
      }
    ));
  }
  function EmptyEditorState() {
    return /* @__PURE__ */ k("section", { class: "flex min-w-0 flex-1 items-center justify-center bg-[#f6f7fb] px-8" }, /* @__PURE__ */ k("div", { class: "max-w-sm text-center" }, /* @__PURE__ */ k("div", { class: "mx-auto flex h-14 w-14 items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white text-xl text-gray-400" }, "\u25AD"), /* @__PURE__ */ k("h2", { class: "mt-4 text-sm font-bold text-gray-900" }, "No frame imported"), /* @__PURE__ */ k("p", { class: "mt-2 text-sm leading-6 text-gray-500" }, "Import a selected Figma frame to inspect its serialized layout, styles, text, and layer tree.")));
  }
  function EditorHeader({
    frame,
    canUndo,
    canRedo,
    onUndo,
    onRedo
  }) {
    return /* @__PURE__ */ k("header", { class: "flex h-16 shrink-0 items-center justify-between border-b border-[#e5e7eb] bg-white px-6" }, /* @__PURE__ */ k("div", { class: "min-w-0" }, /* @__PURE__ */ k("h2", { class: "truncate text-sm font-bold text-gray-900" }, frame.name), /* @__PURE__ */ k("p", { class: "mt-0.5 text-xs text-gray-500" }, frame.type, " \xB7 ", Math.round(frame.geometry.width), " x ", Math.round(frame.geometry.height), " px \xB7 schema v", frame.schemaVersion)), /* @__PURE__ */ k("div", { class: "flex shrink-0 items-center gap-2" }, /* @__PURE__ */ k(
      HistoryButton,
      {
        label: "Undo",
        disabled: !canUndo,
        onClick: onUndo
      }
    ), /* @__PURE__ */ k(
      HistoryButton,
      {
        label: "Redo",
        disabled: !canRedo,
        onClick: onRedo
      }
    )));
  }
  function HistoryButton({
    label,
    disabled,
    onClick
  }) {
    return /* @__PURE__ */ k(
      "button",
      {
        type: "button",
        disabled,
        onClick,
        class: `h-8 rounded-lg border px-3 text-xs font-bold transition ${disabled ? "cursor-not-allowed border-[#e5e7eb] bg-gray-50 text-gray-300" : "border-[#cbd5e1] bg-white text-gray-700 hover:border-[#0f766e] hover:text-[#0f766e]"}`
      },
      label
    );
  }
  var init_Editor = __esm({
    "src/components/Editor.tsx"() {
      "use strict";
      init_preact_module();
      init_hooks_module();
      init_ExportPreviewDrawer();
      init_FramePreview();
      init_JsonViewer();
      init_LayerPanel();
      init_editorModel();
    }
  });

  // src/ui.tsx
  var ui_exports = {};
  __export(ui_exports, {
    default: () => ui_default
  });
  function Plugin() {
    const [importedFrame, setImportedFrame] = d2(null);
    const [frameSource, setFrameSource] = d2(null);
    const [importError, setImportError] = d2("");
    const [targetDevice, setTargetDevice] = d2("mobile");
    const [sourceWidth, setSourceWidth] = d2("");
    const [screenWidth, setScreenWidth] = d2("");
    const [layoutRules, setLayoutRules] = d2(defaultLayoutRules);
    const [exportSnapshot, setExportSnapshot] = d2(null);
    const [isExportPanelOpen, setIsExportPanelOpen] = d2(false);
    const [jsonImportError, setJsonImportError] = d2("");
    const [undoStack, setUndoStack] = d2([]);
    const [redoStack, setRedoStack] = d2([]);
    function clearImportedFrame() {
      setImportedFrame(null);
      setFrameSource(null);
      setSourceWidth("");
      setScreenWidth("");
      setImportError("");
      setJsonImportError("");
      setUndoStack([]);
      setRedoStack([]);
      setExportSnapshot(null);
      setIsExportPanelOpen(false);
    }
    function changeImportedFrame(nextFrame) {
      if (importedFrame != null) {
        setUndoStack((currentStack) => trimHistory([...currentStack, cloneFrame(importedFrame)]));
      }
      setRedoStack([]);
      setImportedFrame(nextFrame);
      syncExportSnapshotFrame(nextFrame);
    }
    function undoFrameChange() {
      if (importedFrame == null || undoStack.length === 0) {
        return;
      }
      const previousFrame = undoStack[undoStack.length - 1];
      setUndoStack((currentStack) => currentStack.slice(0, -1));
      setRedoStack((currentStack) => trimHistory([...currentStack, cloneFrame(importedFrame)]));
      setImportedFrame(cloneFrame(previousFrame));
      syncExportSnapshotFrame(previousFrame);
    }
    function redoFrameChange() {
      if (redoStack.length === 0) {
        return;
      }
      const nextFrame = redoStack[redoStack.length - 1];
      setRedoStack((currentStack) => currentStack.slice(0, -1));
      if (importedFrame != null) {
        setUndoStack((currentStack) => trimHistory([...currentStack, cloneFrame(importedFrame)]));
      }
      setImportedFrame(cloneFrame(nextFrame));
      syncExportSnapshotFrame(nextFrame);
    }
    function syncExportSnapshotFrame(nextFrame) {
      setExportSnapshot((currentSnapshot) => currentSnapshot == null ? null : __spreadProps(__spreadValues({}, currentSnapshot), {
        frame: cloneFrame(nextFrame)
      }));
    }
    function handleGenerate(settings) {
      setTargetDevice(settings.targetDevice);
      setSourceWidth(String(settings.sourceWidth));
      setScreenWidth(String(settings.screenWidth));
      setLayoutRules(settings.layoutRules);
      if (importedFrame == null) {
        return;
      }
      setExportSnapshot({
        id: `export-${Date.now()}`,
        appliedAt: (/* @__PURE__ */ new Date()).toISOString(),
        settings,
        frame: JSON.parse(JSON.stringify(importedFrame))
      });
      setIsExportPanelOpen(true);
    }
    function importJson(value) {
      var _a, _b, _c, _d, _e, _f;
      const result = parseJsonImport(value);
      if ("error" in result) {
        setJsonImportError(result.error);
        return false;
      }
      const importedWidth = (_a = result.sourceWidth) != null ? _a : Math.round(result.frame.geometry.width);
      const referenceWidth = (_b = result.screenWidth) != null ? _b : importedWidth;
      const nextTargetDevice = (_c = result.targetDevice) != null ? _c : targetDevice;
      const nextLayoutRules = (_d = result.layoutRules) != null ? _d : layoutRules;
      const nextOptions = (_e = result.options) != null ? _e : createDefaultConversionOptions();
      const settings = {
        targetDevice: nextTargetDevice,
        sourceWidth: importedWidth,
        screenWidth: referenceWidth,
        sourceFrame: null,
        layoutRules: nextLayoutRules,
        options: nextOptions
      };
      setImportedFrame(result.frame);
      setFrameSource("json");
      setImportError("");
      setJsonImportError("");
      setUndoStack([]);
      setRedoStack([]);
      setTargetDevice(nextTargetDevice);
      setSourceWidth(String(importedWidth));
      setScreenWidth(String(referenceWidth));
      setLayoutRules(nextLayoutRules);
      setExportSnapshot({
        id: `json-import-${Date.now()}`,
        appliedAt: (_f = result.appliedAt) != null ? _f : (/* @__PURE__ */ new Date()).toISOString(),
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
          const importedWidth = String(Math.round(message.payload.geometry.width));
          setImportedFrame(message.payload);
          setFrameSource("figma");
          setSourceWidth(importedWidth);
          setScreenWidth(importedWidth);
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
        importError,
        jsonImportError,
        isJsonImportedFrame: frameSource === "json",
        targetDevice,
        sourceWidth,
        screenWidth,
        layoutRules,
        onTargetDeviceChange: setTargetDevice,
        onSourceWidthChange: setSourceWidth,
        onScreenWidthChange: setScreenWidth,
        onLayoutRulesChange: setLayoutRules,
        onClearFrame: clearImportedFrame,
        onImportJson: importJson,
        onGenerate: handleGenerate
      }
    ), /* @__PURE__ */ k(
      Editor,
      {
        frame: importedFrame,
        targetDevice,
        screenWidth: Number(screenWidth),
        layoutRules,
        canUndo: undoStack.length > 0,
        canRedo: redoStack.length > 0,
        onUndo: undoFrameChange,
        onRedo: redoFrameChange,
        onFrameChange: changeImportedFrame
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
    var _a, _b, _c, _d, _e;
    let parsed;
    try {
      parsed = JSON.parse(value);
    } catch (_error) {
      return {
        error: "Paste valid JSON."
      };
    }
    const root = asRecord(parsed);
    if (root == null) {
      return {
        error: "JSON must be an object."
      };
    }
    const frameCandidate = isFigmaSerializedFrame(parsed) ? parsed : isFigmaSerializedFrame(root.frame) ? root.frame : null;
    if (frameCandidate == null) {
      return {
        error: "JSON must include a serialized frame."
      };
    }
    const settings = asRecord(root.settings);
    const target = asRecord(root.target);
    const source = asRecord(root.source);
    return {
      frame: cloneFrame(frameCandidate),
      appliedAt: readString(root.appliedAt),
      targetDevice: readTargetDevice((_a = settings == null ? void 0 : settings.targetDevice) != null ? _a : target == null ? void 0 : target.device),
      sourceWidth: readPositiveNumber((_b = settings == null ? void 0 : settings.sourceWidth) != null ? _b : source == null ? void 0 : source.importedWidth),
      screenWidth: readPositiveNumber((_d = (_c = settings == null ? void 0 : settings.screenWidth) != null ? _c : target == null ? void 0 : target.referenceWidth) != null ? _d : target == null ? void 0 : target.width),
      layoutRules: readLayoutRules(settings == null ? void 0 : settings.layoutRules),
      options: readConversionOptions((_e = settings == null ? void 0 : settings.options) != null ? _e : root.appliedOptions)
    };
  }
  function cloneFrame(frame) {
    return JSON.parse(JSON.stringify(frame));
  }
  function trimHistory(stack) {
    return stack.length > historyLimit ? stack.slice(stack.length - historyLimit) : stack;
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
  function isFigmaSerializedFrame(value) {
    const record = asRecord(value);
    return record != null && (record.type === "FRAME" || record.type === "COMPONENT" || record.type === "INSTANCE") && record.schemaVersion === 1 && typeof record.importedAt === "string" && isFigmaSerializedNode(record);
  }
  function isFigmaSerializedNode(value) {
    const record = asRecord(value);
    const geometry = asRecord(record == null ? void 0 : record.geometry);
    return record != null && typeof record.id === "string" && typeof record.name === "string" && typeof record.type === "string" && typeof record.visible === "boolean" && typeof record.locked === "boolean" && geometry != null && typeof geometry.width === "number" && typeof geometry.height === "number" && asRecord(record.layout) != null && asRecord(record.style) != null && Array.isArray(record.children) && record.children.every((child) => isFigmaSerializedNode(child));
  }
  function readTargetDevice(value) {
    if (value === "mobile" || value === "tablet" || value === "desktop" || value === "custom") {
      return value;
    }
    return void 0;
  }
  function readLayoutRules(value) {
    const record = asRecord(value);
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
      const record = asRecord(option);
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
  function readPositiveNumber(value) {
    return typeof value === "number" && Number.isFinite(value) && value > 0 ? value : void 0;
  }
  function readString(value) {
    return typeof value === "string" ? value : void 0;
  }
  function asRecord(value) {
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
