var r = Object.defineProperty;
var m = Object.getOwnPropertyDescriptor;
var s = Object.getOwnPropertyNames;
var f = Object.prototype.hasOwnProperty;
var u = (o) => r(o, "__esModule", { value: !0 });
var y = (o, a) => {
    for (var t in a) r(o, t, { get: a[t], enumerable: !0 });
  },
  b = (o, a, t, n) => {
    if ((a && typeof a == "object") || typeof a == "function")
      for (let e of s(a))
        !f.call(o, e) &&
          (t || e !== "default") &&
          r(o, e, {
            get: () => a[e],
            enumerable: !(n = m(a, e)) || n.enumerable,
          });
    return o;
  };
var i = (
  (o) => (a, t) =>
    (o && o.get(a)) || ((t = b(u({}), a, 1)), o && o.set(a, t), t)
)(typeof WeakMap != "undefined" ? new WeakMap() : 0);
var A = {};
y(A, { default: () => d });
async function d(o, a) {
  return { statusCode: 200, body: JSON.stringify({ event: o, context: a }) };
}
module.exports = i(A);
0 && (module.exports = {});
