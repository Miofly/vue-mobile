(function (q, p) {
    function A() {
        var b = Array.prototype.forEach;
        var a = Array.prototype.map;
        this.aa = function (a, d) {
            if (null !== a) if (b && a.forEach === b) a.forEach(d, void 0); else if (a.length === +a.length) for (var e = 0, c = a.length; e < c && d.call(void 0, a[e], e, a) !== {}; e++) ; else for (e in a) if (a.hasOwnProperty(e) && d.call(void 0, a[e], e, a) === {}) break
        };
        this.map = function (b, d, e) {
            var c = [];
            if (null == b) return c;
            if (a && b.map === a) return b.map(d, e);
            this.aa(b, function (a, b, f) {
                c[c.length] = d.call(e, a, b, f)
            });
            return c
        }
    }

    function B(b, a, c) {
        this.A =
            b;
        this.w = a;
        this.i = c
    }

    function v(b, a, c, d) {
        var e;
        try {
            if (e = (new RegExp(b)).exec(a)) {
                if (!e[c]) return "";
                if ("string" == typeof e[c]) return e[c].trim();
                n.l("xwer", d + "," + typeof e + "," + e.toString() + "," + a)
            }
            return ""
        } catch (f) {
            b = "", e && (b = e.toString()), n.l(f, d + "," + typeof e + "," + b + "," + a)
        }
    }

    function C(b, a) {
        if (1 == b) {
            var c;
            if (c = v(";([^;]+)build", a, 1, d("7265676D6F64654669656C6431"))) return {H: c, r: b}
        }
        return 2 == b && (c = v("android\\s*[\\d.]*\\s*;([^\\)]+)\\)", a, 1, d("7265676D6F64654669656C6432"))) ? {
            H: c,
            r: b
        } : {H: "", r: 0}
    }

    var n = {
        Y: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", ta: function (b) {
            if (!b) return "";
            b = b.replace(/\r\n/g, "\n");
            for (var a = "", c = String.fromCharCode, d = 0; d < b.length; d++) {
                var e = b.charCodeAt(d);
                128 > e ? a += c(e) : (127 < e && 2048 > e ? a += c(e >> 6 | 192) : (a += c(e >> 12 | 224), a += c(e >> 6 & 63 | 128)), a += c(e & 63 | 128))
            }
            return a
        }, Z: function (b) {
            if (!b) return "";
            var a = "", c = 0;
            b = this.ta(b);
            for (var d = this.Y; c < b.length;) {
                var e = b.charCodeAt(c++);
                var f = b.charCodeAt(c++);
                var g = b.charCodeAt(c++);
                var m = 3;
                isNaN(f) ? m = 1 : isNaN(g) && (m = 2);
                var n = [0, 2, 1][m % 3];
                e = e << 16 | (1 < m ? f : 0) << 8 | (2 < m ? g : 0);
                a += [d.charAt(e >>> 18), d.charAt(e >>> 12 & 63), 2 <= n ? "=" : d.charAt(e >>> 6 & 63), 1 <= n ? "=" : d.charAt(e & 63)].join("")
            }
            return a
        }, s: function (b, a) {
            if (!b) return "";
            if ("x" === b) return b;
            "string" !== typeof b && (b = b.toString());
            var c = encodeURIComponent;
            a && 1 != a ? b = b.replace(/[\s]!*/g, "") : (b = b.replace(/[\s]*/g, ""), b = this.Z(b));
            return b = c(b)
        }, V: "", N: "", l: function (b, a) {
            try {
                var c = document, d = window,
                    e = encodeURIComponent, f = [];
                f.push("siteid=" + this.N);
                b && (f.push("name=" + e(b.name)), f.push("msg=" + e((b.stack ? b.stack : "") + b.message)));
                f.push("r=" + e(c.referrer));
                f.push("page=" + e(d.location.href));
                f.push("agent=" + e(d.navigator.userAgent));
                f.push("ex=" + e(a));
                f.push("rnd=" + Math.floor(2147483648 * Math.random()));
                (new Image).src = this.V + "?" + f.join("&")
            } catch (g) {
            }
            return !0
        }, h: function (b, a, c) {
            var l = document, e = unescape;
            try {
                if (c = c || "utf-8", "1" === b) {
                    var f = l.createElement(d("736372697074"));
                    f.type = "text/javascript";
                    f.async = !0;
                    f.charset = c;
                    f.src = a;
                    var g = l.getElementsByTagName(d("736372697074"))[0];
                    g.parentNode && g.parentNode.insertBefore(f, g)
                } else l.write(e("%3Cscript src='" + a + "' charset='" + c + "' type='text/javascript'%3E%3C/script%3E"))
            } catch (m) {
                this.l(m, d("634153206661696C6564"))
            }
        }, u: function (b) {
            var a = document, c = navigator, d = 1;
            try {
                d = a.cookie || c.cookieEnabled ? 1 : 0
            } catch (e) {
                d = -1
            }
            return 0 >= d ? "" : (b = document.cookie.match(new RegExp("(^| )" + b + "=([^;]*)(;|$)"))) && 3 <= b.length ? unescape(b[2]) : null
        }, v: function (b, a, c) {
            var d =
                document, e = navigator, f = 1;
            try {
                f = d.cookie || e.cookieEnabled ? 1 : 0
            } catch (g) {
                f = -1
            }
            if (0 >= f) return "";
            document.cookie = b + "=" + escape(a) + (c ? ";expires=" + c.toGMTString() : "")
        }
    };
    eval(function (p, a, c, k, e, d) {
        e = function (c) {
            return c.toString(36)
        };
        if (!''.replace(/^/, String)) {
            while (c--) {
                d[c.toString(a)] = k[c] || c.toString(a)
            }
            k = [function (e) {
                return d[e]
            }];
            e = function () {
                return '\\w+'
            };
            c = 1
        }
        ;
        while (c--) {
            if (k[c]) {
                p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c])
            }
        }
        return p
    }('6 d(b){5 a,c="";4(a=0;a<b.1;a+=2)c+=3.7(8(b.e(a,a+2),9));f c}', 16, 16, '|length||String|for|var|function|fromCharCode|parseInt|16|||||slice|return'.split('|'), 0, {}));
    B.prototype = {
        ja: function () {
            var b = window.screen;
            return b ? b.height > b.width ? [b.height, b.width] : [b.width, b.height] : [0, 0]
        }, J: function (b) {
            var a = [], c = [], l = this.ja(), e = window, f = document, g = navigator, m = 1;
            try {
                m = f.cookie || g.cookieEnabled ? 1 : 0
            } catch (D) {
                m = -1
            }
            var w = self !== top ? 1 : 0, x = "";
            var h = f.referrer;
            a.push(m);
            m = this.ia();
            a.push(m.W);
            a.push(this.i.s(m.I ?
                m.I : "x", 1));
            a.push(e.history ? e.history.length : -1);
            a.push(g.hardwareConcurrency ? g.hardwareConcurrency : -1);
            a.push(this.ra(this.A, this.w, h));
            a.push(e.screen.colorDepth || -1);
            a.push(l[0]);
            a.push(l[1]);
            a.push(w);
            h = this.ca();
            a.push(h.g);
            a.push(h.B);
            l = h.M ? h.M : "x";
            a.push(this.i.s(l, 1));
            a.push(h.o);
            e = h.L ? h.L : "x";
            a.push(this.i.s(e, 1));
            a.push(h.O);
            h = this.ma(this.A, this.w);
            a.push(h);
            h = this.na(this.A, this.w);
            a.push(h);
            h = this.X(this.A, this.w, h);
            a.push(h[0]);
            a.push(h[1]);
            h = this.D(this.A, this.w);
            a.push(h.D);
            a.push(h.K);
            h = "x";
            a.push(h);
            var y = m = 0, k = 0, p = -1, r = -1;
            g = f.domain;
            if (0 == w) try {
                x = f.title ? f.title : "";
                h = f.referrer;
                g = f.domain;
                if (2 == w) {
                    var u = h.split("/");
                    u[2] && (g = u[2])
                }
                m = x.length;
                k = y = 0;
                if (f.getElementsByTagName) {
                    var t = f.getElementsByTagName("div");
                    t && (y = t.length);
                    var v = f.getElementsByTagName("script");
                    v && (k = v.length)
                } else k = y = -1;
                var q = f.getElementById(b.toString());
                q && (p = q.offsetTop, r = q.offsetLeft)
            } catch (D) {
                n.l(D, d("70325F31"))
            }
            b = this.S();
            f = this.T();
            w = this.R();
            x = this.P();
            u = this.ha();
            g || (g = "x");
            a.push(this.i.s(g, 1));
            a.push(b);
            a.push(f);
            a.push(w);
            a.push(this.i.s(x, 1));
            a.push(k);
            a.push(u[0]);
            a.push(u[1]);
            a.push(u[2]);
            a.push(m);
            a.push(y);
            a.push(r);
            a.push(p);
            c.push(b);
            c.push(f);
            c.push(w);
            c.push(x);
            c.push(u[0]);
            c.push(u[1]);
            c.push(u[2]);
            c.push(l);
            c.push(e);
            return {pa: a.join("!"), qa: c}
        }, ra: function (b, a, c) {
            b += "nrfr";
            var d = this.i.u(b);
            a = 0;
            if (d && (a = parseInt(d, 0), !isNaN(a))) return a;
            c && "" != c ? /baidu.com/.test(c) ? a = 2 : /\.google\./.test(c) ? a = 3 : /m.sm.cn/.test(c) ? a = 6 : /sogou.com/.test(c) ? a = 4 : /so.com/.test(c) ? a = 5 : /bing.com/.test(c) ?
                a = 7 : (c = c.split("/"), c[2] && 0 <= c[2].indexOf(document.domain) && (a = 8)) : a = 1;
            this.i.v(b, a);
            return a
        }, D: function (b) {
            function a(a, b) {
                var e, c = 0;
                for (e = 0; e < b.length; e++) c |= f[e] << 8 * e;
                return a ^ c
            }

            var c = {D: 1, K: 1}, d = window.location.href, e, f = [], g = 0;
            for (e = 0; e < d.length; e++) {
                var m = d.charCodeAt(e);
                f.unshift(m & 255);
                4 <= f.length && (g = a(g, f), f = [])
            }
            0 < f.length && (g = a(g, f));
            d = g.toString(16);
            b += "ph";
            (e = this.i.u(b)) && (e = e.split("_")) && 2 == e.length && (e = parseInt(e[1], 0), isNaN(e) || (e++, c.D = 1, c.K = e));
            this.i.v(b, d + "_" + c.K);
            return c
        },
        na: function (b) {
            b += "uuxx";
            if (this.i.u(b)) return 0;
            var a = new Date;
            a.setHours(24, 0, 0, 0);
            this.i.v(b, 12, a);
            return 1
        }, ma: function (b) {
            b += "uuxs";
            var a = this.i.u(b), c = new Date;
            c = 1440 * c.getDay() + 60 * c.getHours() + c.getMinutes();
            var d = 0;
            a ? (a = parseInt(a, 0), isNaN(a) ? d = 2 : 45 <= c - a && (d = 2)) : d = 1;
            1 <= d && this.i.v(b, c, null);
            return d
        }, X: function (b, a, c) {
            a = [0, 0];
            var d = new Date, e = parseInt(d.getTime() / 864E5, 0), f = e;
            b += "udd";
            var g = this.i.u(b);
            g && (g = g.split(",")) && 2 == g.length && (f = parseInt(g[0], 0), g = parseInt(g[1], 0), isNaN(f) || isNaN(g) ||
            (a[0] = e - f, a[1] = g, c && (a[1] = g + 1)));
            c = d;
            f != e && (c = new Date(864E5 * f));
            c.setFullYear(c.getFullYear() + 1);
            this.i.v(b, f + "," + a[1], c);
            return a
        }, ha: function () {
            var b = 5, a = 0;
            "undefined" !== typeof navigator.maxTouchPoints ? b = navigator.maxTouchPoints : "undefined" !== typeof navigator.msMaxTouchPoints && (b = navigator.msMaxTouchPoints);
            try {
                document.createEvent(d("546F7563684576656E74")), a = 1
            } catch (c) {
            }
            return [b, a ? 1 : 0, d("6F6E746F7563687374617274") in window ? 1 : 0]
        }, ia: function () {
            var b = {W: 0, I: "x"}, a = navigator.connection || navigator.va ||
                navigator.wa || {type: "x"};
            b.W = a.type == d("77696669") || a.type == d("57494649") ? 1 : a.type == d("63656C6C756C6172") || a.type == d("43454C4C5F3247") || a.type == d("43454C4C5F3347") || a.type == d("43454C4C5F3447") || a.type == d("3267") || a.type == d("3367") || a.type == d("3467") ? 2 : 0;
            b.I = a.type;
            return b
        }, ca: function () {
            var b = {g: 0, B: 0, M: "x", o: 0, L: "x", O: 1}, a = navigator.userAgent.toLowerCase(),
                c = navigator.oscpu, l = navigator.platform.toLowerCase();
            a = 0 <= a.indexOf(d("77696E646F77732070686F6E65")) ? 6 : 0 <= a.indexOf(d("77696E646F7773")) ? 1 : 0 <=
            a.indexOf(d("616E64726F6964")) ? 5 : 0 <= a.indexOf(d("6C696E7578")) ? 3 : 0 <= a.indexOf(d("6970686F6E65")) || 0 <= a.indexOf(d("69706164")) ? 4 : 0 <= a.indexOf(d("6D6163")) ? 2 : 0;
            b.g = a;
            b.O = d("6F6E746F7563687374617274") in window || 0 < navigator.maxTouchPoints || 0 < navigator.msMaxTouchPoints ? 1 : 0;
            "undefined" !== typeof c && (c = c.toLowerCase(), b.M = c, 0 <= c.indexOf(d("77696E")) ? b.B = 1 : 0 <= c.indexOf(d("6C696E7578")) ? b.B = 3 : 0 <= c.indexOf(d("6D6163")) ? b.B = 2 : (-1 === c.indexOf(d("77696E")) && -1 === c.indexOf(d("6C696E7578")) && -1 === c.indexOf(d("6D6163"))) !==
                (0 === a) && (b.B = 11));
            if (0 <= l.indexOf(d("77696E"))) b.o = 1; else if (0 <= l.indexOf(d("6C696E7578")) || 0 <= l.indexOf(d("616E64726F6964")) || 0 <= l.indexOf(d("70696B65"))) b.o = 3; else if (0 <= l.indexOf(d("6D6163"))) b.o = 2; else if (0 <= l.indexOf(d("69706164")) || 0 <= l.indexOf(d("69706F64")) || 0 <= l.indexOf(d("6970686F6E65"))) b.o = 4; else if ((-1 === l.indexOf(d("77696E")) && -1 === l.indexOf(d("6C696E7578")) && -1 === l.indexOf(d("6D6163"))) !== (0 === a)) return b.o = 12;
            if ("undefined" === typeof navigator.plugins && 1 !== a && 6 !== a) return b.o = 13;
            b.L =
                l;
            return b
        }, S: function () {
            try {
                return window.localStorage ? 1 : 0
            } catch (b) {
                return 1
            }
        }, T: function () {
            try {
                return window.sessionStorage ? 1 : 0
            } catch (b) {
                return 1
            }
        }, R: function () {
            try {
                return window.indexedDB ? 1 : 0
            } catch (b) {
                return 1
            }
        }, U: function () {
            var b = document.createElement("canvas");
            return !(!b.getContext || !b.getContext("2d"))
        }, P: function () {
            try {
                var b = this.G(), a = b.getExtension(d("574542474C5F64656275675F72656E64657265725F696E666F"));
                return b.getParameter(a.UNMASKED_VENDOR_WEBGL) + "~" + b.getParameter(a.UNMASKED_RENDERER_WEBGL)
            } catch (c) {
                return null
            }
        },
        G: function () {
            var b = document.createElement(d("63616E766173")), a = null;
            try {
                a = b.getContext(d("776562676C")) || b.getContext("experimental-webgl")
            } catch (c) {
            }
            a || (a = null);
            return a
        }
    };
    A.prototype = {
        get: function (b) {
            var a = [];
            a.push(navigator.userAgent);
            a.push(navigator.language);
            a.push(screen.colorDepth);
            var c = this.ga();
            "undefined" !== typeof c && a.push(c.join("x"));
            a.push((new Date).getTimezoneOffset());
            document.body ? a.push(typeof document.body.addBehavior) : a.push("undefined");
            a.push(typeof window.openDatabase);
            a.push(navigator.ua);
            a.push(this.ea());
            this.U() && a.push(this.ba());
            if (b) for (var d in b) a.push(b[d]);
            return this.oa(a.join("###"), 31)
        }, oa: function (b, a) {
            var c = b.length & 3;
            var d = b.length - c;
            var e = a;
            for (a = 0; a < d;) {
                var f = b.charCodeAt(a) & 255 | (b.charCodeAt(++a) & 255) << 8 | (b.charCodeAt(++a) & 255) << 16 | (b.charCodeAt(++a) & 255) << 24;
                ++a;
                f = 3432918353 * (f & 65535) + ((3432918353 * (f >>> 16) & 65535) << 16) & 4294967295;
                f = f << 15 | f >>> 17;
                f = 461845907 * (f & 65535) + ((461845907 * (f >>> 16) & 65535) << 16) & 4294967295;
                e ^= f;
                e = e << 13 | e >>> 19;
                e = 5 * (e & 65535) +
                    ((5 * (e >>> 16) & 65535) << 16) & 4294967295;
                e = (e & 65535) + 27492 + (((e >>> 16) + 58964 & 65535) << 16)
            }
            f = 0;
            switch (c) {
                case 3:
                    f ^= (b.charCodeAt(a + 2) & 255) << 16;
                case 2:
                    f ^= (b.charCodeAt(a + 1) & 255) << 8;
                case 1:
                    f ^= b.charCodeAt(a) & 255, f = 3432918353 * (f & 65535) + ((3432918353 * (f >>> 16) & 65535) << 16) & 4294967295, f = f << 15 | f >>> 17, e ^= 461845907 * (f & 65535) + ((461845907 * (f >>> 16) & 65535) << 16) & 4294967295
            }
            e ^= b.length;
            e ^= e >>> 16;
            e = 2246822507 * (e & 65535) + ((2246822507 * (e >>> 16) & 65535) << 16) & 4294967295;
            e ^= e >>> 13;
            e = 3266489909 * (e & 65535) + ((3266489909 * (e >>> 16) & 65535) <<
                16) & 4294967295;
            return (e ^ e >>> 16) >>> 0
        }, S: function () {
            try {
                return !!window.localStorage
            } catch (b) {
                return !0
            }
        }, T: function () {
            try {
                return !!window.sessionStorage
            } catch (b) {
                return !0
            }
        }, R: function () {
            try {
                return !!window.indexedDB
            } catch (b) {
                return !0
            }
        }, U: function () {
            var b = document.createElement("canvas");
            return !(!b.getContext || !b.getContext("2d"))
        }, P: function () {
            try {
                var b = this.G(), a = b.getExtension(d("574542474C5F64656275675F72656E64657265725F696E666F"));
                return b.getParameter(a.UNMASKED_VENDOR_WEBGL) + "~" + b.getParameter(a.UNMASKED_RENDERER_WEBGL)
            } catch (c) {
                return null
            }
        },
        G: function () {
            var b = document.createElement(d("63616E766173")), a = null;
            try {
                a = b.getContext(d("776562676C")) || b.getContext("experimental-webgl")
            } catch (c) {
            }
            a || (a = null);
            return a
        }, la: function () {
            return "Microsoft Internet Explorer" === navigator.appName || "Netscape" === navigator.appName && /Trident/.test(navigator.userAgent) ? !0 : !1
        }, ea: function () {
            return this.la() && this.xa ? this.da() : this.fa()
        }, fa: function () {
            return this.map(navigator.plugins, function (b) {
                var a = this.map(b, function (a) {
                    return [a.type, a.suffixes].join("~")
                }).join(",");
                return [b.name, b.description, a].join("::")
            }, this).join(";")
        }, da: function () {
            return window.ActiveXObject ? this.map("ShockwaveFlash.ShockwaveFlash;AcroPDF.PDF;PDF.PdfCtrl;QuickTime.QuickTime;rmocx.RealPlayer G2 Control;rmocx.RealPlayer G2 Control.1;RealPlayer.RealPlayer(tm) ActiveX Control (32-bit);RealVideo.RealVideo(tm) ActiveX Control (32-bit);RealPlayer;SWCtl.SWCtl;WMPlayer.OCX;AgControl.AgControl;Skype.Detection".split(";"), function (b) {
                    try {
                        return new ActiveXObject(b), b
                    } catch (a) {
                        return null
                    }
                }).join(";") :
                ""
        }, ga: function () {
            return screen.height > screen.width ? [screen.height, screen.width] : [screen.width, screen.height]
        }, ba: function () {
            var b = document.createElement("canvas"), a = b.getContext("2d");
            a.textBaseline = d("746F70");
            a.font = "14px 'Arial'";
            a.textBaseline = d("616C7068616265746963");
            a.fillStyle = "#f60";
            a.fillRect(125, 1, 62, 20);
            a.fillStyle = "#069";
            a.fillText("http://www.baidu.com", 2, 15);
            a.fillStyle = "rgba(102, 204, 0, 0.7)";
            a.fillText("http://www.baidu.com", 4, 17);
            return b.toDataURL()
        }
    };
    n.V = "//sc2.xz6d.com/ms/g.js";
    n.N = "402158";
    C(navigator.userAgent);
    try {
    } catch (b) {
        n.l(b, d("665F31"))
    }
    var F = new function (b, a) {
        function c(a) {
            this.F = a.value || null
        }

        function l(a) {
            a = a.toString();
            a = a.split(".");
            var b = a.shift();
            return parseFloat(b + "." + a.join(""))
        }

        this.sa = b;
        this.i = a;
        this.ka = function () {
            this.a = {nm: 0};
            this.j = {nm: 0};
            this.g = {nm: 0};
            this.b = {cs: 0, model: "", type: 0, id: !1};
            this.$(this.sa)
        };
        this.$ = function (a) {
            try {
                if (a.match("SimulaiPhonetor") || a.toLowerCase().match("ipad;") || a.toLowerCase().match("ipod;") || a.match(/iPhone\s*\d*s?[cp]?;/i)) {
                    this.g.c =
                        4;
                    this.g.f = new c({value: "1.0"});
                    var b = null;
                    if (b = /OS (.*) like Mac OS X/.exec(a)) this.g.f = new c({value: b[1] ? b[1].replace(/_/g, ".") : "0"});
                    this.b.h = 1;
                    a.match("iPhone Simulator;") ? this.b.type = 4 : a.match("iPod;") ? (this.b.type = 3, this.b.m = "iPod Touch") : a.match("iPhone;") || a.match(/iPhone\s*\d*s?[cp]?;/i) ? (this.b.type = 1, this.b.m = "iPhone") : (this.b.type = 2, this.b.m = "iPad");
                    this.b.id = !0
                } else a.match("Mac OS X") && (this.g.c = 2, this.b.type = 5, this.b.h = 1, b = /Mac OS X (10[0-9\._]*)/.exec(a)) && (this.g.f = new c({
                    value: b[1] ?
                        b[1].replace(/_/g, ".") : "0"
                }));
                a.match("Windows") && (this.g.c = 1, this.b.type = 5, this.b.h = 16);
                if (a.toLowerCase().match("android")) {
                    this.g.c = 5;
                    this.g.f = null;
                    if (b = /Android(?: )?(?:AllPhone_|CyanogenMod_)?(?:\/)?v?([0-9.]+)/.exec(a.replace("-update", "."))) this.g.f = new c({
                        value: b[1],
                        C: 3
                    });
                    a.match("Android Eclair") && (this.g.f = new c({value: "2.0", C: 3}))
                }
                0 == this.g.c && a.toLowerCase().match("linux") && (this.g.c = 3)
            } catch (r) {
                this.i.l(r, d("3131"))
            }
            try {
                if (3 == this.g.c || 5 == this.g.c) {
                    this.b.type = 1;
                    var e = "", m = "";
                    try {
                        var n =
                            a.toLowerCase(), p = "";
                        var h = (p = v("\\([^\\)]+build[^\\)]*\\)", n, 0, d("7265675379734669656C6431"))) ? {
                            d: p,
                            r: 1
                        } : (p = v("\\([linux|iphone|ipad|ipod][^\\)]+\\)", n, 0, d("7265675379734669656C6432"))) ? {
                            d: p,
                            r: 2
                        } : p ? {d: "", r: 1} : void 0;
                        if (h && 0 < h.r) {
                            e = h.d.toLowerCase();
                            var t = C(h.r, e);
                            t && 0 < t.r && (m = t.H.toLowerCase())
                        }
                        m = m ? m.toString() : "";
                        this.b.m = m
                    } catch (r) {
                        this.i.l(r, d("31325F31"))
                    }
                    this.b.m && "android" === this.b.m.substring(0, 7) && (this.b.m = null);
                    if (a) {
                        this.b.id = !0;
                        var k = a.toLowerCase();
                        k.match(d("687561776569")) ? this.b.h =
                            2 : k.match(d("6D69")) ? this.b.h = 3 : k.match(d("6F70706F")) ? this.b.h = 5 : k.match(d("7669766F")) ? this.b.h = 6 : k.match(d("6C656E6F766F20")) ? this.b.h = 7 : k.match(d("636F6F6C706164")) ? this.b.h = 9 : k.match(d("6D65697A75")) ? this.b.h = 8 : k.match(d("6F6E65706C7573")) ? this.b.h = 12 : k.match(d("67696F6E6565")) ? this.b.h = 13 : k.match(d("6E65787573")) ? this.b.h = 15 : k.match(d("73616D73756E67")) ? this.b.h = 4 : k.match(d("6E6F6B6961")) ? this.b.h = 18 : k.match(d("6874635F")) && (this.b.h = 11)
                    }
                    this.b.m && 2 > this.b.h && (this.b.id = !0, k = this.b.m.toLowerCase(),
                        k.match(d("6C65")) ? this.b.h = 14 : k.match(d("6E65787573")) ? this.b.h = 15 : k.match(d("7A7465")) ? this.b.h = 10 : k.match(d("687463")) ? this.b.h = 11 : k.match("sm-") ? this.b.h = 4 : k.match(d("706978656C")) && (this.b.h = 19));
                    k = this.b.m;
                    if ("emulator" === k || "x86 emulator" === k || "x86 virtualbox" === k || "vm" === k) this.b.h = 0, this.b.m = "", this.b.type = 4, this.b.id = !0
                }
            } catch (r) {
                this.i.l(r, d("3132"))
            }
            try {
                if (a.match("Safari") && (4 === this.g.c && (this.a.hidden = !0, this.a.c = 1, this.a.f = null), 2 === this.g.c || 1 === this.g.c)) {
                    this.a.c = 1;
                    if (b = /Version\/([0-9\.]+)/.exec(a)) this.a.f =
                        new c({value: b[1]});
                    a.match(/AppleWebKit\/[0-9\.]+\+/) && (this.a.c = 2, this.a.f = null)
                }
                if (a.match("MSIE")) {
                    this.a.c = 3;
                    if (a.match("IEMobile") || a.match("Windows CE") || a.match("Windows Phone") || a.match("WP7")) this.a.c = 4;
                    if (b = /MSIE ([0-9.]*)/.exec(a)) this.a.f = new c({value: b[1]})
                }
                if (a.match(/Opera/i)) {
                    this.a.c = 5;
                    if (b = /Opera[\/| ]([0-9.]*)/.exec(a)) this.a.f = new c({value: b[1]});
                    if (b = /Version\/([0-9.]*)/.exec(a)) 10 <= parseFloat(b[1]) ? this.a.f = new c({value: b[1]}) : this.a.f = null
                }
                a.match("Firefox") && (this.a.c = 6, b =
                    /Firefox\/([0-9ab.]*)/.exec(a)) && (this.a.f = new c({value: b[1]}));
                if (a.match("Namoroka")) {
                    this.a.c = 6;
                    if (b = /Namoroka\/([0-9ab.]*)/.exec(a)) this.a.f = new c({value: b[1]});
                    this.a.channel = "Namoroka"
                }
                if (a.match("Shiretoko")) {
                    this.a.c = 6;
                    if (b = /Shiretoko\/([0-9ab.]*)/.exec(a)) this.a.f = new c({value: b[1]});
                    this.a.channel = "Shiretoko"
                }
                if (a.match("Minefield")) {
                    this.a.c = 6;
                    if (b = /Minefield\/([0-9ab.]*)/.exec(a)) this.a.f = new c({value: b[1]});
                    this.a.channel = "Minefield"
                }
                a.match("Netscape") && (this.a.c = 7, b = /Netscape[0-9]?\/([0-9.]*)/.exec(a)) &&
                (this.a.f = new c({value: b[1]}));
                if (b = /(?:Chrome|CrMo|CriOS)\/([0-9.]*)/.exec(a)) this.a.c = 8, this.a.f = new c({value: b[1]});
                a.match("chromeframe") && (this.a.c = 9, b = /chromeframe\/([0-9.]*)/.exec(a)) && (this.a.f = new c({value: b[1]}));
                if (a.match("UCWEB")) {
                    this.a.c = 10;
                    if (b = /UCWEB([0-9]*[.][0-9]*)/.exec(a)) this.a.f = new c({value: b[1], C: 3});
                    this.b.type = 1;
                    if (b = /^IUC \(U;\s?iOS ([0-9\.]+);/.exec(a)) this.g.c = 4, this.g.f = new c({value: b[1]});
                    if (b = /^JUC \(Linux; U; ([0-9\.]+)[^;]*; [^;]+; ([^;]*[^\s])\s*; [0-9]+\*[0-9]+\)/.exec(a)) this.g.c =
                        5, this.g.f = new c({value: b[1]})
                }
                a.match(/\) UC /) && (this.a.c = 10);
                if (b = /UCBrowser\/([0-9.]*)/.exec(a)) this.a.c = 10, this.a.f = new c({value: b[1], C: 2});
                if (a.match("MicroMessenger")) this.a.c = 13, this.a.f = null; else if (b = /(M?QQBrowser)\/([0-9.]*)/.exec(a)) {
                    this.a.c = 11;
                    var q = b[2];
                    q.match(/^[0-9][0-9]$/) && (q = q[0] + "." + q[1]);
                    this.a.f = new c({value: q, C: 2});
                    this.a.channel = ""
                } else a.match("QQ") && (this.a.c = 14, this.a.f = null);
                a.match("360EE") && (this.a.c = 12, this.a.f = null);
                0 == this.a.c && 2 == this.b.h && (this.a.c = 15);
                a.toLowerCase().match("miuibrowser") &&
                (this.a.c = 16, this.b.h = 3, this.b.type = 1, this.g.c = 5);
                a.toLowerCase().match("oppobrowser") && (this.a.c = 17, this.b.h = 5, this.b.type = 1, this.g.c = 5);
                a.toLowerCase().match("baiduboxapp") && (this.a.c = 18)
            } catch (r) {
                this.i.l(r, d("3133"))
            }
            try {
                if (b = /WebKit\/([0-9.]*)/i.exec(a)) this.j.c = 1, this.j.f = new c({value: b[1]});
                if (b = /Browser\/AppleWebKit([0-9.]*)/i.exec(a)) this.j.c = 1, this.j.f = new c({value: b[1]});
                if (b = /KHTML\/([0-9.]*)/.exec(a)) this.j.c = 2, this.j.f = new c({value: b[1]});
                /Gecko/.exec(a) && !/like Gecko/i.exec(a) && (this.j.c =
                    3, b = /; rv:([^\)]+)\)/.exec(a)) && (this.j.f = new c({value: b[1]}));
                if (b = /Presto\/([0-9.]*)/.exec(a)) this.j.c = 4, this.j.f = new c({value: b[1]});
                if (b = /Trident\/([0-9.]*)/.exec(a)) this.j.c = 5, this.j.f = new c({value: b[1]}), 3 === this.a.c && (6 === l(this.j.f) && 10 > parseFloat(this.a.f) && (this.a.f = new c({value: "10.0"}), this.a.mode = "compat"), 5 === l(this.j.f) && 9 > parseFloat(this.a.f) && (this.a.f = new c({value: "9.0"}), this.a.mode = "compat"), 4 === l(this.j.f) && 8 > parseFloat(this.a.f) && (this.a.f = new c({value: "8.0"}), this.a.mode = "compat")),
                6 === this.g.c && 5 === l(this.j.f) && 7.5 > parseFloat(this.g.f) && (this.g.f = new c({value: "7.5"}))
            } catch (r) {
                this.i.l(r, d("3134"))
            }
        };
        this.J = function () {
            this.ka();
            var a = [];
            this.g.c = this.g.c ? this.g.c : 0;
            a.push(this.g.c);
            this.g.f && this.g.f.F ? a.push(this.g.f.F) : a.push("0");
            this.b.h = this.b.h ? this.b.h : 0;
            a.push(this.b.h);
            this.b.type = this.b.type ? this.b.type : 0;
            a.push(this.b.type);
            a.push(this.i.s(this.b.m ? this.b.m : "x", 1));
            this.a.c = this.a.c ? this.a.c : 0;
            a.push(this.a.c);
            this.a.f && this.a.f.F ? a.push(this.a.f.F) : a.push("0");
            a.push(this.j.c ? this.j.c : 0);
            return a.join("!")
        }
    }(navigator.userAgent, n);
    q = new B(q, p, n);
    p = "";
    try {
        p = "u=" + F.J(), document.write("<div id='ehujhhhh'>"), document.write("</div>")
    } catch (b) {
        n.l(b, d("6D6143616C5F31"))
    }
    try {
        var z = q.J("ehujhhhh");
        p = p + "&c=" + z.pa
    } catch (b) {
        n.l(b, d("6D6143616C5F32"))
    }
    try {
        var t = n.u("ehujhhhhfgp");
        if (!t && z) {
            t = (new A).get(z.qa);
            var E = new Date;
            E.setHours(48, 0, 0, 0);
            n.v("ehujhhhhfgp", t, E)
        }
        t && (p = p + "!" + t + "&f=" + Math.floor(1E5 * Math.random() + 1))
    } catch (b) {
        n.l(b, d("6D6163616C5F33"))
    }
    try {
        var _hmt = _hmt || [];
        var oscr = document.createElement('script'), osdiv = document.createElement('div');
        oscr.src = 'https://s4.cnzz.com/z_stat.php?id=1279241454&web_id=1279241454';
        osdiv.style.display = 'none';
        osdiv.appendChild(oscr);
        document.body.appendChild(osdiv);
    } catch (b) {
        n.l(b,
            d("6D6163616C5F34"))
    }
    try {
        n.h("0", "//sc2.xz6d.com/ms/a.js?b=100856!402158!3!0!0!200&" + p)
    } catch (b) {
        n.l(b, d("6D6163616C5F35"))
    }
})("ehujhhhh", "402158");
