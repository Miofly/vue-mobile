/*! Txplayer - v3.0.0 - 2020-05-29 18:50:31
 * Copyright (c) 2020
 * Powered by Tencent-Video Web Front End Team
*/
!function (a) {
    function b(d) {
        if (c[d]) return c[d].exports;
        var e = c[d] = {exports: {}, id: d, loaded: !1};
        return a[d].call(e.exports, e, e.exports, b), e.loaded = !0, e.exports
    }

    var c = {};
    return b.m = a, b.c = c, b.p = "", b(0)
}([function (a, b, c) {
    c(1), a.exports = c(21)
}, function (a, b, c) {
    function d(a) {
        e.v4log("new Txplayer", a);
        var b = this, c = new i;
        c.__name = "playerMsg", c.setMaxListeners(100), this.userMsg = new i, this.userMsg.__name = "userMsg", this.userMsg.setMaxListeners(100);
        var g = f.filterXSS(e.extend({}, j));
        if (g = f.filterXSS(e.extend(g, a)), "1" === e.getUrlParam("debugAutoPlayInMute") && (g.autoPlayInMute = !0), g.imgRpt && (d.imgRpt = !0), g.autoplay && 0 != g.volume) if (e.browserDisableAutoPlay()) {
            e.v4log("browserDisableAutoPlay", "autoplay is blocked by browser.");
            var k = g.volume;
            if (!g.disableCacheVolume) try {
                var l = parseInt(e.getData(d.dataset.localStorageKey.volumeHistory));
                isNaN(l) || (k = l, 0 === k && e.v4log("browserDisableAutoPlay", "autoplay is blocked by browser, user's local volume is zero , so autoplay is ok."))
            } catch (n) {
            }
            0 === k || g.muted || (g.autoPlayInMute ? (g.volume = 0, g.muted = !0) : g.autoplay = !1, g.browserDisableAutoPlay = !0)
        } else g.browserDisableAutoPlay = !1, e.v4log("browserDisableAutoPlay", "autoplay is ok");
        var p = e.getData(d.dataset.localStorageKey.userSetting);
        if (p) {
            var r = /\"isSkipPrelude\"/.test(p), s = /\"isSkipPrelude\":1/.test(p);
            r && (g.skipPrelude = s)
        }
        e.preGetMacClientInfo();
        var t = g.pluginsMap || h;
        if (e.mobile || (g.version = "v4"), g.pluginsMap) {
            if (t = t[g.videoType], "v4" === g.version && !e.mobile) {
                var u = h.vod.v4.onlyV4 || [];
                for (var v in t) t.hasOwnProperty(v) && t[v] && e.isArray(t[v]) && (e.pluginNameToV4(t[v], u), t[v].indexOf("TxpCreativePlayer") == -1 && t[v].push("TxpCreativePlayer"), t[v].indexOf("HdAdAdapter") == -1 && t[v].push("HdAdAdapter"));
                var w = g.settings || {};
                for (var x in w) w.hasOwnProperty(x) && w[x].subPlugins && e.isArray(w[x].subPlugins) && e.pluginNameToV4(w[x].subPlugins, u)
            }
        } else t = t[g.videoType][g.version];
        "coolOpen" == g.playerType && (g.originalPlayerType = g.playerType);
        var y;
        "v4" === g.version && (y = f.useV4P2P(g) && !e.getUrlParam("debugnop2p") ? f.useV4P2PAdaptive(g) ? d.dataset.ver = "3.6.3" : d.dataset.ver = "3.5.57" : d.dataset.ver = "3.4.40");
        try {
            g.settings = e.extend({}, j.settings || {}, g.settings || {}, g.extendSettings || {}), g.extendPluginsMap[g.videoType] = a.extendPluginsMap ? e.extend({}, j.extendPluginsMap[g.videoType] || {}, g.extendPluginsMap[g.videoType] || {}) : g.extendPluginsMap[g.videoType]
        } catch (n) {
        }
        var z = {
            config: g,
            msg: c,
            userMsg: this.userMsg,
            dataset: {testVer: y, playerCreateStartTime: +new Date, disableShowHtml5Switch: !g.showHTML5Switch},
            userApi: this,
            privateApi: {}
        };
        z.dataset.platform = e.getPcPlatformId(z.config), z.dataset.sdtfrom = e.getStdfrom(z.dataset.platform, z.config), z.dataset.txplayerAuth = new q, z.dataset.txplayerAuth.setData(z.config.authData), g.businessId && (z.dataset.businessId = g.businessId, "200" == z.dataset.businessId && (z.dataset.businessId = "6"), "201" == z.dataset.businessId && (z.dataset.businessId = "11")), z.config.playerId = f.getPlayerId(g), z.dataset.playerId = z.config.playerId, !g.guid && e.browser.macqqlive ? f.getUserIdForMacClientAsync(function (a) {
            a && a.guid && (z.config.guid = a.guid, z.dataset.guid = z.config.guid)
        }) : (z.config.guid = f.getUserId(g), z.dataset.guid = z.config.guid), z.dataset.flowid = z.dataset.playerId + "_" + z.dataset.platform;
        var A = f.getUnid();
        A && (z.dataset.unid = A), this.getUserId = function () {
            return z.dataset.guid
        }, this.getPlayerId = function () {
            return z.dataset.playerId
        }, this.getPlatform = function () {
            return z.dataset.platform
        }, m.exportsReportApi(z), g.vid && (m.reportTxplayer(z, {
            playType: g.playerType,
            videoType: g.videoType
        }), d.dataset._instance[g.playerId] = this), z.msg.on("reportPluginLoadError", function (a) {
            if (a && a.name && e.inArray(["HdPlayer", "HdPlayerControl", "HtmlFrame", "v4HdPlayer", "v4HdPlayerControl"], a.name) != -1 && "4501" == a.bossid && "50" == a.step) {
                var b = z.dataset.$playermod || d.$ && d.$("#" + z.config.containerId);
                if (b && b.html) {
                    var c = "position:absolute;left:0;top:0;z-index:9999;background:#000;color:#fff;width:100%;height:100%;text-align:center;",
                        f = b.height();
                    c += "line-height:" + (f || g.height || "100%") + "px;";
                    var h = '<div style="' + c + '">\u5bf9\u4e0d\u8d77,\u53d1\u751f\u521d\u59cb\u5316\u9519\u8bef,\u60a8\u53ef\u4ee5<a href="javascript:;" style="color:red;" onclick="location.reload()">\u5237\u65b0</a>\u8bd5\u8bd5\u54e6</div>';
                    b.html(h)
                }
            }
        });
        var B = f.choosePlugins(g, t, z);
        d.dataset.H5PlayerStyleUrl[g.playerType] && d.$ && d.$.Deferred && e.loadCss(d.dataset.H5PlayerStyleUrl[g.bannerNewsUI ? "news" : g.playerType]), "flash" === g.playerType && (d.dataset.flashVersion = e.getFlashVersion()), g.autoplay && g.createOnClick && ["h5", "h5tiny"].indexOf(g.playerType) !== -1 && (z.dataset.emptyVideo = f.insertEmptyVideo(g));
        var C = "1" === e.getUrlParam("debugcombo");
        if (g.useComboService && !C ? f.comboService(b, B, z, g, c, o) : f.installPlugins(b, B, z, g, c, o), this.isApiExist = function (a) {
            return "function" == typeof b[a]
        }, this.on = function (a, c) {
            return "string" != typeof a ? (e.error("player.on(evtName, fn), evtName must be a String"), this) : "function" != typeof c ? (e.error("player.on(evtName, fn), fn must be a Function"), this) : (b.userMsg.on(a, function () {
                c.apply(b, arguments)
            }), this)
        }, this.trigger = function (a, c) {
            if ("string" != typeof a) return !1;
            var d = [a, c];
            return o.each(arguments, function (a, b) {
                a < 2 || d.push(b)
            }), b.userMsg.broadcast.apply(b.userMsg, d)
        }, this.off = function (a) {
            return "string" != typeof a ? (e.error('player.off("evtName"):evtName must be a string'), !1) : (b.userMsg.off(a), this)
        }, this.once = function (a, c) {
            return "string" != typeof a ? (e.error("player.once(evtName, fn), evtName must be a String"), this) : "function" != typeof c ? (e.error("player.once(evtName, fn), fn must be a Function"), this) : (b.userMsg.once(a, function () {
                c.apply(b, arguments)
            }), this)
        }, location.search && location.search.indexOf("testcase") > -1) {
            var D = document.createElement("script");
            // D.src = "//vm.gtimg.cn/tencentvideo/module/txp/tools/txplayerLogger.js", document.body.appendChild(D)
        }
        e.supportEmeAsync(g.disableEmeCheck)
    }

    c(2);
    var e = c(3), f = c(7), g = c(9), h = c(12), i = c(13), j = c(8), k = c(15), l = c(11), m = c(16), n = c(17),
        o = f.find$(), p = c(18), q = c(19);
    d.register = function (a, b) {
        return "string" != typeof a ? (e.error("player.register(pluginName, fn), pluginName must be a String"), this) : "function" != typeof b ? (e.error("player.register(pluginName, fn), fn must be a Function"), this) : void (d.plugins[a] = b)
    }, d.msg = new i, d.msg.setMaxListeners(500), d.dataset = g, d.dataset.debug = 1 == e.getUrlParam("debug"), d.defaultconfig = j, d.errcode = n, d.util = e, d.Events = i, d.plugins = {}, d.$ = o, d.define = {reportCode: k}, d.appVersion = p, o && (d.$.tmpl = l), window.Txplayer || (window.Txplayer = d), d.dataset.ts = "1590749431907"
}, function (a, b) {
    !function (a) {
        "use strict";

        function b(a) {
            if ("string" != typeof a && (a = String(a)), /[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(a)) throw new TypeError("Invalid character in header field name");
            return a.toLowerCase()
        }

        function c(a) {
            return "string" != typeof a && (a = String(a)), a
        }

        function d(a) {
            var b = {
                next: function () {
                    var b = a.shift();
                    return {done: void 0 === b, value: b}
                }
            };
            return r.iterable && (b[Symbol.iterator] = function () {
                return b
            }), b
        }

        function e(a) {
            this.map = {}, a instanceof e ? a.forEach(function (a, b) {
                this.append(b, a)
            }, this) : Array.isArray(a) ? a.forEach(function (a) {
                this.append(a[0], a[1])
            }, this) : a && Object.getOwnPropertyNames(a).forEach(function (b) {
                this.append(b, a[b])
            }, this)
        }

        function f(a) {
            return a.bodyUsed ? Promise.reject(new TypeError("Already read")) : void (a.bodyUsed = !0)
        }

        function g(a) {
            return new Promise(function (b, c) {
                a.onload = function () {
                    b(a.result)
                }, a.onerror = function () {
                    c(a.error)
                }
            })
        }

        function h(a) {
            var b = new FileReader, c = g(b);
            return b.readAsArrayBuffer(a), c
        }

        function i(a) {
            var b = new FileReader, c = g(b);
            return b.readAsText(a), c
        }

        function j(a) {
            for (var b = new Uint8Array(a), c = new Array(b.length), d = 0; d < b.length; d++) c[d] = String.fromCharCode(b[d]);
            return c.join("")
        }

        function k(a) {
            if (a.slice) return a.slice(0);
            var b = new Uint8Array(a.byteLength);
            return b.set(new Uint8Array(a)), b.buffer
        }

        function l() {
            return this.bodyUsed = !1, this._initBody = function (a) {
                if (this._bodyInit = a, a) if ("string" == typeof a) this._bodyText = a; else if (r.blob && Blob.prototype.isPrototypeOf(a)) this._bodyBlob = a; else if (r.formData && FormData.prototype.isPrototypeOf(a)) this._bodyFormData = a; else if (r.searchParams && URLSearchParams.prototype.isPrototypeOf(a)) this._bodyText = a.toString(); else if (r.arrayBuffer && r.blob && t(a)) this._bodyArrayBuffer = k(a.buffer), this._bodyInit = new Blob([this._bodyArrayBuffer]); else {
                    if (!r.arrayBuffer || !ArrayBuffer.prototype.isPrototypeOf(a) && !u(a)) throw new Error("unsupported BodyInit type");
                    this._bodyArrayBuffer = k(a)
                } else this._bodyText = "";
                this.headers.get("content-type") || ("string" == typeof a ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : r.searchParams && URLSearchParams.prototype.isPrototypeOf(a) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"))
            }, r.blob && (this.blob = function () {
                var a = f(this);
                if (a) return a;
                if (this._bodyBlob) return Promise.resolve(this._bodyBlob);
                if (this._bodyArrayBuffer) return Promise.resolve(new Blob([this._bodyArrayBuffer]));
                if (this._bodyFormData) throw new Error("could not read FormData body as blob");
                return Promise.resolve(new Blob([this._bodyText]))
            }, this.arrayBuffer = function () {
                return this._bodyArrayBuffer ? f(this) || Promise.resolve(this._bodyArrayBuffer) : this.blob().then(h)
            }), this.text = function () {
                var a = f(this);
                if (a) return a;
                if (this._bodyBlob) return i(this._bodyBlob);
                if (this._bodyArrayBuffer) return Promise.resolve(j(this._bodyArrayBuffer));
                if (this._bodyFormData) throw new Error("could not read FormData body as text");
                return Promise.resolve(this._bodyText)
            }, r.formData && (this.formData = function () {
                return this.text().then(o)
            }), this.json = function () {
                return this.text().then(JSON.parse)
            }, this
        }

        function m(a) {
            var b = a.toUpperCase();
            return v.indexOf(b) > -1 ? b : a
        }

        function n(a, b) {
            b = b || {};
            var c = b.body;
            if (a instanceof n) {
                if (a.bodyUsed) throw new TypeError("Already read");
                this.url = a.url, this.credentials = a.credentials, b.headers || (this.headers = new e(a.headers)), this.method = a.method, this.mode = a.mode, c || null == a._bodyInit || (c = a._bodyInit, a.bodyUsed = !0)
            } else this.url = String(a);
            if (this.credentials = b.credentials || this.credentials || "omit", !b.headers && this.headers || (this.headers = new e(b.headers)), this.method = m(b.method || this.method || "GET"), this.mode = b.mode || this.mode || null, this.referrer = null, ("GET" === this.method || "HEAD" === this.method) && c) throw new TypeError("Body not allowed for GET or HEAD requests");
            this._initBody(c)
        }

        function o(a) {
            var b = new FormData;
            return a.trim().split("&").forEach(function (a) {
                if (a) {
                    var c = a.split("="), d = c.shift().replace(/\+/g, " "), e = c.join("=").replace(/\+/g, " ");
                    b.append(decodeURIComponent(d), decodeURIComponent(e))
                }
            }), b
        }

        function p(a) {
            var b = new e, c = a.replace(/\r?\n[\t ]+/g, " ");
            return c.split(/\r?\n/).forEach(function (a) {
                var c = a.split(":"), d = c.shift().trim();
                if (d) {
                    var e = c.join(":").trim();
                    b.append(d, e)
                }
            }), b
        }

        function q(a, b) {
            b || (b = {}), this.type = "default", this.status = void 0 === b.status ? 200 : b.status, this.ok = this.status >= 200 && this.status < 300, this.statusText = "statusText" in b ? b.statusText : "OK", this.headers = new e(b.headers), this.url = b.url || "", this._initBody(a)
        }

        if (!a.fetch) {
            var r = {
                searchParams: "URLSearchParams" in a,
                iterable: "Symbol" in a && "iterator" in Symbol,
                blob: "FileReader" in a && "Blob" in a && function () {
                    try {
                        return new Blob, !0
                    } catch (a) {
                        return !1
                    }
                }(),
                formData: "FormData" in a,
                arrayBuffer: "ArrayBuffer" in a
            };
            if (r.arrayBuffer) var s = ["[object Int8Array]", "[object Uint8Array]", "[object Uint8ClampedArray]", "[object Int16Array]", "[object Uint16Array]", "[object Int32Array]", "[object Uint32Array]", "[object Float32Array]", "[object Float64Array]"],
                t = function (a) {
                    return a && DataView.prototype.isPrototypeOf(a)
                }, u = ArrayBuffer.isView || function (a) {
                    return a && s.indexOf(Object.prototype.toString.call(a)) > -1
                };
            e.prototype.append = function (a, d) {
                a = b(a), d = c(d);
                var e = this.map[a];
                this.map[a] = e ? e + "," + d : d
            }, e.prototype["delete"] = function (a) {
                delete this.map[b(a)]
            }, e.prototype.get = function (a) {
                return a = b(a), this.has(a) ? this.map[a] : null
            }, e.prototype.has = function (a) {
                return this.map.hasOwnProperty(b(a))
            }, e.prototype.set = function (a, d) {
                this.map[b(a)] = c(d)
            }, e.prototype.forEach = function (a, b) {
                for (var c in this.map) this.map.hasOwnProperty(c) && a.call(b, this.map[c], c, this)
            }, e.prototype.keys = function () {
                var a = [];
                return this.forEach(function (b, c) {
                    a.push(c)
                }), d(a)
            }, e.prototype.values = function () {
                var a = [];
                return this.forEach(function (b) {
                    a.push(b)
                }), d(a)
            }, e.prototype.entries = function () {
                var a = [];
                return this.forEach(function (b, c) {
                    a.push([c, b])
                }), d(a)
            }, r.iterable && (e.prototype[Symbol.iterator] = e.prototype.entries);
            var v = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
            n.prototype.clone = function () {
                return new n(this, {body: this._bodyInit})
            }, l.call(n.prototype), l.call(q.prototype), q.prototype.clone = function () {
                return new q(this._bodyInit, {
                    status: this.status,
                    statusText: this.statusText,
                    headers: new e(this.headers),
                    url: this.url
                })
            }, q.error = function () {
                var a = new q(null, {status: 0, statusText: ""});
                return a.type = "error", a
            };
            var w = [301, 302, 303, 307, 308];
            q.redirect = function (a, b) {
                if (w.indexOf(b) === -1) throw new RangeError("Invalid status code");
                return new q(null, {status: b, headers: {location: a}})
            }, a.Headers = e, a.Request = n, a.Response = q, a.fetch = function (a, b) {
                return new Promise(function (c, d) {
                    var e = new n(a, b), f = new XMLHttpRequest;
                    f.onload = function () {
                        var a = {
                            status: f.status,
                            statusText: f.statusText,
                            headers: p(f.getAllResponseHeaders() || "")
                        };
                        a.url = "responseURL" in f ? f.responseURL : a.headers.get("X-Request-URL");
                        var b = "response" in f ? f.response : f.responseText;
                        c(new q(b, a))
                    }, f.onerror = function () {
                        d(new TypeError("Network request failed"))
                    }, f.ontimeout = function () {
                        d(new TypeError("Network request failed"))
                    }, f.open(e.method, e.url, !0), "include" === e.credentials ? f.withCredentials = !0 : "omit" === e.credentials && (f.withCredentials = !1), "responseType" in f && r.blob && (f.responseType = "blob"), e.headers.forEach(function (a, b) {
                        f.setRequestHeader(b, a)
                    }), f.send("undefined" == typeof e._bodyInit ? null : e._bodyInit)
                })
            }, a.fetch.polyfill = !0
        }
    }("undefined" != typeof self ? self : this)
}, function (a, b, c) {
    var d = {
        getHlsAdOffsetTime: function (a, b, c) {
            var d = b.dataset.hlsAdTimeRanges, e = b.dataset.useHls;
            if (!e || !d || !d.length) return a;
            var f = this.isTimeInHlsAdRange(a, b);
            if (!c && f) return f;
            for (var g = 0, h = d.length; g < h; g++) {
                var i = d[g], j = i.start, k = i.end;
                if (!(j < a)) break;
                c ? a += k - j : a -= k - j
            }
            return a
        }, isTimeInHlsAdRange: function (a, b, c) {
            var d = b.dataset.hlsAdTimeRanges, e = b.dataset.useHls;
            if (!e || !d || !d.length) return !1;
            for (var f = 0; f < d.length; f++) {
                var g = d[f];
                if (g.start <= a && a <= g.end) return !!c || g.start
            }
            return !1
        }, error: function (a) {
            if (window.console && window.console.error) {
                var b = new Date;
                a = "[" + b.getHours() + ":" + b.getMinutes() + ":" + b.getSeconds() + "]" + a;
                try {
                    throw a
                } catch (c) {
                    window.console.error(a)
                }
            }
        }, v4log: function (a, b) {
            if (window.console && window.console.log && Txplayer && Txplayer.dataset && Txplayer.dataset.debug) {
                var c = "";
                try {
                    c = JSON.stringify(b)
                } catch (d) {
                }
                Txplayer && Txplayer.util && Txplayer.util.localLog(a, c);
                var e = this.dateFormat("hh:mm:ss:S");
                window.console.log.apply(window.console, ["[v4Txplayer]", "[" + e + "]"].concat(Array.prototype.slice.call(arguments)))
            }
        }, log: function () {
            if (window.console && window.console.log) try {
                Txplayer && Txplayer.dataset && Txplayer.dataset.debug && window.console.log.apply && window.console.log.apply(window.console, arguments)
            } catch (a) {
            }
        }, showInfo: function (a, b) {
            if (window.console && window.console.log) {
                var c = 0;
                if ("object" == typeof b && window.JSON && window.JSON.stringify) {
                    try {
                        b = JSON.stringify(b)
                    } catch (e) {
                        c = 1
                    }
                    if (c) return
                }
                var f = this.dateFormat("yyyy-MM-dd hh:mm:ss:S");
                Txplayer.dataset.logData.push({
                    time: f,
                    info: a,
                    data: b
                }), d.log("%c[Txplayer]%c[" + f + "]%c" + a + ": %c \t\t" + b, "color: #aaa", "background: #fff; color:#999;", "background: #000;color:#fff;", "color:green;");
                var g, h = 500;
                Txplayer.dataset.logData && (g = Txplayer.dataset.logData.length, g > h && (Txplayer.dataset.logData = Txplayer.dataset.logData.slice(g - h, g)))
            }
        }, showError: function (a, b) {
            window.console && window.console.log && d.log("%c" + a + ": %c " + b, "background: #ccc;color:#fff;", "color: red;")
        }, fiddlerLog: function (a) {
            Txplayer && Txplayer.dataset && !Txplayer.dataset.debug || ("string" != typeof a && "number" != typeof a || (a = {a: a}), (new Image).src = "http://test.m.v.qq.com/txplayer?" + Txplayer.$.param(a))
        }, cookie: {
            set: function (a, b, c, d, e) {
                if (e) {
                    var f = new Date, g = new Date;
                    g.setTime(f.getTime() + 36e5 * e)
                }
                return document.cookie = a + "=" + b + "; " + (e ? "expires=" + g.toGMTString() + "; " : "") + (d ? "path=" + d + "; " : "path=/; ") + (c ? "domain=" + c + ";" : "domain=" + window.location.host + ";"), !0
            }, get: function (a) {
                var b = new RegExp("(?:^|;+|\\s+)" + a + "=([^;]*)"), c = document.cookie.match(b);
                return c ? c[1] : ""
            }, del: function (a, b, c) {
                var d = new Date;
                d.setTime(d.getTime() - 1), document.cookie = a + "=; expires=" + d.toGMTString() + ";" + (c ? "path=" + c + "; " : "path=/; ") + (b ? "domain=" + b + ";" : "domain=" + window.location.host + ";")
            }
        }, object2string: function (a, b) {
            b = "undefined" != typeof b ? b : "&";
            var c = [];
            for (var d in a) c.push(d + "=" + a[d]);
            return c.join(b)
        }, appendParamsToUrl: function (a, b) {
            return a += a.indexOf("?") > -1 ? "&" + d.object2string(b) : "?" + d.object2string(b)
        }, removeUrlParams: function (a) {
            if ("string" == typeof a) {
                var b = document.createElement("a");
                return b.href = a, b.protocol + "//" + b.host + b.pathname
            }
        }, getRelativeUrl: function (a) {
            if ("string" == typeof a) {
                var b = document.createElement("a");
                b.href = a;
                var c;
                return c = b.pathname && "string" == typeof b.pathname ? b.pathname : "", "//" + b.host + ("/" !== c[0] ? "/" + c : c)
            }
        }, loadCss: function (a) {
            var b = Txplayer.$.Deferred(), c = 1, e = !1, f = function (a) {
                var e = document.createElement("link");
                e.rel = "stylesheet", e.type = "text/css", e.onload = function () {
                    b.resolve()
                }, e.onerror = function () {
                    if (c >= 3) return void b.reject();
                    c++, e.parentNode.removeChild(e);
                    var g = {};
                    g["__t" + c] = +new Date, f(d.appendParamsToUrl(a, g))
                }, e.href = a, Txplayer.$("head")[0].appendChild(e)
            }, g = d.getRelativeUrl(a);
            return Txplayer.$('link[rel="stylesheet"]').each(function (a, b) {
                var c = b.href;
                if (c && c.indexOf(g) > -1) return e = !0, !1
            }), e ? b.resolve() : (a = d.appendParamsToUrl(a, {_: window.Txplayer && Txplayer.dataset.ts || +new Date}), f(a)), b
        }, getDefaultPosterByVid: function (a) {
            var b = ["496_280"], c = "//shp.qpic.cn/qqvideo_ori/0/{vid}_{index}/0";
            return c.replace("{vid}", a).replace("{index}", b[0])
        }, getOriginURL: function (a) {
            return "string" != typeof a ? a : a.replace(/\?.+/g, "")
        }, loadScript: function (a) {
            a = a || {}, a.onsuccess = a.onsuccess || function () {
            };
            var b = document.createElement("script"), c = document.getElementsByTagName("head")[0],
                e = /^(?:loaded|complete|undefined)$/;
            if (a.url) {
                var f = d.getOriginURL(a.url), g = function (a) {
                    var b;
                    if (Txplayer.dataset.loadScriptDefer && Txplayer.dataset.loadScriptDefer[f] && Txplayer.dataset.loadScriptDefer[f].constructor === Array) for (; Txplayer.dataset.loadScriptDefer[f].length > 0;) b = Txplayer.dataset.loadScriptDefer[f].shift(), "function" == typeof b && b(a)
                };
                if (Txplayer.dataset.loadScriptDefer && Txplayer.dataset.loadScriptDefer[f] && Txplayer.dataset.loadScriptDefer[f].constructor === Array && Txplayer.dataset.loadScriptDefer[f].length) return void Txplayer.dataset.loadScriptDefer[f].push(a.onsuccess);
                Txplayer.dataset.loadScriptDefer[f] = [a.onsuccess], b.async = "async", b.src = a.url, b.charset = "utf-8", a.crossorigin && b.setAttribute("crossorigin", "anonymous"), b.onload = b.onerror = b.onreadystatechange = function () {
                    e.test(b.readyState) && (b.onload = b.onerror = b.onreadystatechange = null, b = null, g(!0))
                }, b.onerror = function () {
                    b.onload = b.onerror = b.onreadystatechange = null, b = null, g(!1)
                }, c.appendChild(b)
            }
        }, getFlashVersion: function () {
            var a = Txplayer.dataset.flashVersion;
            if ("0.0.0" != a) return a;
            var b = null, c = null, d = [], e = "Shockwave Flash", f = navigator, g = "application/x-shockwave-flash";
            if (Txplayer.util.browser.ie) try {
                b = new ActiveXObject("ShockwaveFlash.ShockwaveFlash"), b && (c = b.GetVariable("$version"), c && (c = c.split(" ")[1].split(","), d = [parseInt(c[0], 10), parseInt(c[1], 10), parseInt(c[2], 10)]))
            } catch (h) {
            } else "undefined" != typeof f.plugins && "object" == typeof f.plugins[e] && (c = f.plugins[e].description, !c || "undefined" == typeof f.mimeTypes && f.mimeTypes[g] && !f.mimeTypes[g].enabledPlugin || (c = c.replace(/^.*\s+(\S+\s+\S+$)/, "$1"), d[0] = parseInt(c.replace(/^(.*)\..*$/, "$1"), 10), d[1] = parseInt(c.replace(/^.*\.(.*)\s.*$/, "$1"), 10), d[2] = /[a-zA-Z]/.test(c) ? parseInt(c.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0));
            return a = d.join(".")
        }, compareVersion: function (a, b) {
            a = String(a).split("."), b = String(b).split(".");
            try {
                for (var c = 0, d = Math.max(a.length, b.length); c < d; c++) {
                    var e = isFinite(a[c]) && Number(a[c]) || 0, f = isFinite(b[c]) && Number(b[c]) || 0;
                    if (e < f) return -1;
                    if (e > f) return 1
                }
            } catch (g) {
                return -1
            }
            return 0
        }, isFlashFit: function () {
            return this.compareVersion(this.getFlashVersion(), "10.0") > -1
        }, getJsonpCallbackName: function (a) {
            return ["txplayerJsonpCallBack", a, parseInt(1e6 * Math.random())].join("_")
        }, getStdfrom: function (a, b) {
            if (b && b.platId && this.platformMap[b.platId]) return this.platformMap[b.platId].stdfrom;
            if (a && "70201" == a) return "v1104";
            if (a && "70901" == a) return "v1103";
            if (a && "3670201" == a) return "v1105";
            if (a && "4100201" == a) return "v1107";
            if (a && "570201" == a) return "v1005";
            if (a && "5230201" == a) return "v1008";
            if (a && "5410201" == a) return "v1012";
            var c = "view.inews.qq.com" === location.hostname, d = location.hostname.indexOf("caixin.com") > -1;
            return d ? "v1093" : Txplayer.util.mobile || "ke.qq.com" !== location.hostname ? Txplayer.util.os.iphone || Txplayer.util.os.ipod ? c ? "v3110" : "v3010" : Txplayer.util.os.ipad ? c ? "v4110" : "v4010" : Txplayer.util.os.android ? Txplayer.util.os.tablet ? "v6010" : c ? "v5110" : "v5010" : Txplayer.util.browser.IEMobile ? "v7010" : "v1010" : "v1101"
        }, getDeviceId: function () {
            var a = navigator.userAgent;
            return d.os.ipad ? 1 : d.os.windows ? /Touch/i.test(a) ? 8 : /Phone/i.test(a) ? 7 : 2 : d.os.android ? d.mobile ? 3 : 5 : d.os.iphone ? 4 : d.os.mac ? 9 : 10
        }, getBusinessId: function () {
            if (d.browser.wechat) return 6;
            if (d.browser.mqq) return 17;
            var a = "";
            if (/^http(s?):\/\/v\.qq\.com\/(iframe\/txp|txp\/iframe)/.test(location.href) && window != top) {
                var b = document.referrer;
                if ("" !== b) {
                    var c = document.createElement("a");
                    c.href = b, a = c.hostname, c = null
                }
            }
            "" === a && (a = document.location.hostname || document.location.host);
            var e = [{r: /(\w+\.)?weixin\.qq\.com$/i, v: 6}, {r: /^(v|film)\.qq\.com$/i, v: 1}, {
                r: /^news\.qq\.com$/i,
                v: 2
            }, {r: /(\w+\.)?qzone\.qq\.com$/i, v: 3}, {r: /(\w+\.)?t\.qq\.com$/i, v: 5}, {
                r: /^3g\.v\.qq\.com$/i,
                v: 8
            }, {r: /^m\.v\.qq\.com$/i, v: 10}, {r: /3g\.qq\.com$/i, v: 12}];
            a = a.toLowerCase();
            for (var f = 0, g = e.length; f < g; f++) {
                var h = e[f];
                if (h.r.test(a)) return h.v
            }
            return 7
        }, getPlatform: function () {
            var a = d.getBusinessId(), b = d.getDeviceId();
            return 1e4 * a + 100 * b + 1
        }, getDeviceCode: function () {
            var a = 0;
            return d.os.iphone ? a = 2 : d.os.ipad ? a = 3 : d.os.android && d.phone && (a = 1), a
        }, getPlatformCode: function () {
            var a = 0;
            return d.browser.wechat ? a = 1 : d.browser.mqq ? a = 2 : d.browser.mqqbrowser && (a = 3), a
        }, isQQBuLuoHost: function () {
            return !(!Txplayer.util.browser.MQQClient || "xiaoqu.qq.com" !== window.location.hostname && "buluo.qq.com" !== window.location.hostname)
        }, isSupportApp: function () {
            return !!(d.os.iphone || d.os.ipod || d.os.ipad) || !!d.os.android
        }, getMobileVideoPosterByVid: function (a, b) {
            b = void 0 !== b ? b : 2;
            var c = ["496_280", "360_204", "228_128"], d = "//shp.qpic.cn/qqvideo_ori/0/{vid}_{index}/0";
            return b >= c.length && (b = c.length - 1), d.replace("{vid}", a).replace("{index}", c[b])
        }, getPcVideoPosterByVid: function (a, b) {
            function c(a) {
                for (var b = 1e8, c = 0, d = 0; d < a.length; d++) c = (c << 5) + c + a.charCodeAt(d);
                return c % b
            }

            if (b = b || ".png", !a) return "";
            var d = "//vpic.video.qq.com/" + c(a) + "/" + a + b;
            return d
        }, getHostNameByUrl: function (a) {
            a = a || location.href;
            var b = document.createElement("a");
            return b.href = a, b.hostname
        }, getQQFromCookie: function () {
            var a = d.cookie.get("luin") || d.cookie.get("uin");
            return a && (a = a.replace(/\D/g, "").replace(/^0+/, "")), a
        }, createGUID: function (a) {
            a = a || 32;
            for (var b = "", c = 1; c <= a; c++) {
                var d = Math.floor(16 * Math.random()).toString(16);
                b += d
            }
            return b
        }, getSessionData: function (a) {
            try {
                if (window.sessionStorage) return window.sessionStorage[a]
            } catch (b) {
            }
        }, setSessionData: function (a, b) {
            try {
                window.sessionStorage && (window.sessionStorage[a] = b)
            } catch (c) {
            }
        }, delSessionData: function (a) {
            try {
                if (window.sessionStorage) return window.sessionStorage.removeItem(a)
            } catch (b) {
            }
        }, getData: function (a) {
            var b = "";
            try {
                window.localStorage && (b = window.localStorage[a])
            } catch (c) {
            }
            return b
        }, setData: function (a, b) {
            try {
                window.localStorage && (window.localStorage[a] = b)
            } catch (c) {
            }
        }, delData: function (a) {
            try {
                window.localStorage && window.localStorage.removeItem(a)
            } catch (b) {
            }
        }, isSupportM3u8: function () {
            var a = document.createElement("video"),
                b = ["application/x-mpegURL", "audio/mpegurl", "vnd.apple.mpegURL", "application/vnd.apple.mpegURL"],
                c = !1;
            if ("function" == typeof a.canPlayType) for (var d = 0, e = b.length; d < e; d++) if (a.canPlayType(b[d])) {
                c = !0;
                break
            }
            return a = null, c
        }, isSupportChromeHls: function (a) {
            if ("1" === this.getUrlParam("debugp2p")) return !0;
            var b = !1;
            a && (b = !!a.official);
            var c = ["10201", "70201", "3670201", "10901", "70901", "4100201"], d = a && this.inArray(c, "" + a) > -1;
            window.MediaSource = window.MediaSource || window.WebKitMediaSource;
            var e = window.SourceBuffer = window.SourceBuffer || window.WebKitSourceBuffer,
                f = !e || e.prototype && "function" == typeof e.prototype.appendBuffer && "function" == typeof e.prototype.remove,
                g = window.MediaSource && "function" == typeof window.MediaSource.isTypeSupported && window.MediaSource.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"');
            return (b || d) && g && f
        }, isSupportSafariHls: function (a) {
            var b = ["10201", "70201", "3670201", "10901", "70901", "4100201"];
            return a && this.inArray(b, "" + a) > -1 && d.os.mac && d.browser.safari && d.compareVersion(d.browser.safari.version, 7) >= 0
        }, isSupportMP4: function () {
            if (d.os.windows && d.browser.pcqqlive && d.browser.pcqqlive.version >= 50171110) return !0;
            var a = document.createElement("video");
            return "function" == typeof a.canPlayType && ("probably" == a.canPlayType('video/mp4; codecs="avc1.42E01E"') || "probably" == a.canPlayType('video/mp4; codecs="avc1.58A01E"') || "probably" == a.canPlayType('video/mp4; codecs="avc1.4D401E"') || "probably" == a.canPlayType('video/mp4; codecs="avc1.64001E"'))
        }, isSupportSVG: function () {
            return !(!document.implementation || !Txplayer.$.isFunction(document.implementation.hasFeature)) && document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1")
        }, isSupportMute: function () {
            return !Txplayer.util.ios && !Txplayer.util.mobile
        }, isUseH5Type: function () {
            return d.mobile && !d.os.ipad
        }, canUseTxplayerHTML5: function () {
            return !(!d.browser.ie || "edge" !== d.browser.ie.version) || !(d.browser.ie && d.compareVersion(d.browser.ie.version, "10.0") < 0) && !!d.isSupportMP4()
        }, getDomNodeOffsetInPage: function (a) {
            for (var b = a.offsetLeft, c = a.offsetTop, d = a.offsetParent; null !== d;) b += d.offsetLeft, c += d.offsetTop, d = d.offsetParent;
            return {x: b, y: c}
        }, whenWechatIsReady: function (a) {
            var b = Txplayer.$.Deferred(), c = a.timeout || 5e3;
            return Txplayer.util.browser.wechat && ("undefined" != typeof WeixinJSBridge && WeixinJSBridge.on ? b.resolve() : (document.addEventListener("WeixinJSBridgeReady", function () {
                b.resolve()
            }), setTimeout(function () {
                b.reject()
            }, c))), b
        }, getMainHostName: function () {
            var a = window.location.hostname || window.location.host, b = location.host.split(".");
            return b.length > 1 && (a = b.slice(b.length - 2).join(".")), a
        }, getUrlParam: function (a, b) {
            b = b || document.location.toString();
            var c = new RegExp("(^|&|\\\\?)" + a + "=([^&]*)(&|$|#)"), d = null;
            return d = b.match(c), d ? d[2] : ""
        }, getAdChannelId: function (a) {
            console.log(a, '21111111111')

            return null
        }, insert2Array: function (a, b, c) {
            if (b > c.length) return c;
            var d = c.slice(0, b), e = c.slice(b, c.length), f = [];
            return f = f.concat(d, a, e)
        }, formatPlayTime: function (a) {
            if ("string" == typeof a && (a = parseInt(a)), "number" == typeof a) {
                a = parseInt(a);
                var b, c, d, e = function (a) {
                    return a < 10 ? "0" + a : a
                };
                return b = parseInt(a / 3600), c = parseInt((a - 3600 * b) / 60), d = parseInt(a - 3600 * b - 60 * c), 0 === b ? [e(c), e(d)].join(":") : [b, e(c), e(d)].join(":")
            }
        }, dateFormat: function (a, b) {
            b = b || new Date, a = a || "yyyy-MM-dd hh:mm:ss";
            var c = {
                "M+": b.getMonth() + 1,
                "d+": b.getDate(),
                "h+": b.getHours(),
                "m+": b.getMinutes(),
                "s+": b.getSeconds(),
                "q+": Math.floor((b.getMonth() + 3) / 3),
                S: b.getMilliseconds()
            };
            /(y+)/.test(a) && (a = a.replace(RegExp.$1, (b.getFullYear() + "").substr(4 - RegExp.$1.length)));
            for (var d in c) new RegExp("(" + d + ")").test(a) && (a = a.replace(RegExp.$1, 1 == RegExp.$1.length ? c[d] : ("00" + c[d]).substr(("" + c[d]).length)));
            return a
        }, isTencentDomain: function (a) {
            if (a = a || document.domain, "qq.com" === a) return !0;
            var b = a.split(".");
            return !!(b && b.length > 2) && ("qq" === b[b.length - 2] && "com" === b[b.length - 1])
        }, isVqqOrFilmqq: function () {
            return "v.qq.com" === location.hostname || "film.qq.com" === location.hostname
        }, loadPlugins: function (a, b, c, e) {
            function f() {
                function a(c) {
                    var e = function () {
                        g(i), "TxpCreativePlayer" === i && (Txplayer.dataset.isReadyPlugins.push(i), b.msg && b.msg.broadcast && b.msg.broadcast("pluginReady", {name: i}), b.userMsg && b.userMsg.broadcast && b.userMsg.broadcast("pluginReady", {name: i}))
                    }, j = function () {
                        if (b && b.msg && b.msg.broadcast) {
                            if (b.msg.broadcast("reportPluginLoadError", {
                                name: i,
                                url: h,
                                requestStartTime: n
                            }), b.dataset && !b.dataset.errorCodeOfStep5 && d.inArray(["HdPlayer", "HdPlayerControl", "HtmlFrame", "v4HdPlayer", "v4HdPlayerControl", "H5HtmlFrame", "H5Player", "H5PlayerControl"], i) > -1) {
                                var a = "62";
                                Txplayer.util.os.windows && (a = "61"), "h5" !== b.config.playerType && "h5tiny" !== b.config.playerType || (a = "64"), b.dataset.errorCodeOfStep5 = a + "200.10002", b.msg.broadcast("reportPluginLoadError", {
                                    name: i,
                                    url: h,
                                    requestStartTime: n,
                                    step: 50,
                                    bossid: 4501,
                                    code: b.dataset.errorCodeOfStep5
                                })
                            }
                            Txplayer.util.localLog("PLUGINS_LOAD_ERROR", {name: i, url: h})
                        }
                    }, l = function () {
                        return k >= 1 ? (d.showError("plugin load failed", h), j(), void f()) : (k++, void a())
                    };
                    h && h.indexOf("_ts=") === -1 && (h += h.indexOf("?") > -1 ? "&_ts=" + Txplayer.dataset.ts || +new Date : "?_ts=" + Txplayer.dataset.ts || +new Date), d.loadScript({
                        url: h,
                        crossorigin: !!c,
                        onsuccess: function (a) {
                            a ? e() : l()
                        }
                    })
                }

                if (0 === j.length) return void e();
                var h, i = j.shift(), k = 0, l = b.config && b.config.loadPluginCrossOrigin,
                    m = i.toLowerCase() + ".js", n = +new Date;
                Txplayer && Txplayer.hashMaps && Txplayer.hashMaps[m] && (m = Txplayer.hashMaps[m]), c && c.hasOwnProperty(i) && c[i].url && (h = c[i].url, l = !1), h || (h = Txplayer.dataset.jsBasePath + "plugins/" + m), Txplayer.plugins.hasOwnProperty(i) ? g(i) : "TxpCreativePlayer" === i ? (h = "//vm.gtimg.cn/tencentvideo/txpv5/creative/plugins/txp-creative-player." + Txplayer.appVersion + ".js", "undefined" != typeof window.TxpCreativePlayer ? (g(i), Txplayer.dataset.isReadyPlugins.push(i), b.msg && b.msg.broadcast && b.msg.broadcast("pluginReady", {name: i}), b.userMsg && b.userMsg.broadcast && b.userMsg.broadcast("pluginReady", {name: i})) : a(l)) : a(l)
            }

            function g(a) {
                Txplayer.dataset.pluginsLoadTime = Txplayer.dataset.pluginsLoadTime || [], Txplayer.dataset.pluginsLoadTime.push(a + ":" + Txplayer.util.dateFormat("yyyy-M-d h:m:s:S")), i = h(a), i && i.done && i.fail ? i.done(function () {
                    f()
                }) : f()
            }

            function h(a) {
                var e;
                if (!Txplayer.plugins.hasOwnProperty(a)) return !1;
                c[a] ? b.pluginConfig = c[a] : b.pluginConfig = {};
                try {
                    k["_" + a] || (k["_" + a] = new Txplayer.plugins[a](b), Txplayer.dataset.isReadyPlugins.push(a), b.msg && b.msg.broadcast && b.msg.broadcast("pluginReady", {name: a}), b.userMsg && b.userMsg.broadcast && b.userMsg.broadcast("pluginReady", {name: a}))
                } catch (f) {
                    e = f.message, d.showError("JS\u6709\u5f02\u5e38:" + a, e), d.log(f.stack), b.msg.broadcast && b.msg.broadcast("reportError", {
                        msg: e,
                        code: Txplayer.define.reportCode.JS_ERROR,
                        stack: f.stack
                    })
                }
                return a.indexOf("HtmlFrame") == -1 && !function (a, b, c) {
                    a && (a.addDestroyToPlugin = function () {
                        var d = this.context.superMsg || this.context.msg;
                        d.on("destroyPlugin", function (e, f) {
                            e && e !== b || ("function" === Txplayer.$.type(a.remove) && a.remove(), a && a.dataset && (a.dataset.moduleApis || a.dataset.privateApis || a.dataset.eventsList) && (a.dataset.moduleApis && Txplayer.$.each(a.dataset.moduleApis, function (a, b) {
                                d.off(a)
                            }), a.dataset.privateApis && Txplayer.$.each(a.dataset.privateApis, function (a, b) {
                                d.off(a)
                            }), a.dataset.eventsList && Txplayer.$.each(a.dataset.eventsList, function (a, b) {
                                d.off(a)
                            })), a && a.dataset && Txplayer.$.each(a.dataset, function (a, b) {
                                /_TIMER/.test(a) && b && (clearInterval(b), clearTimeout(b))
                            }), Txplayer.$.each(a, function (a, b) {
                                b = null
                            }), c["_" + b] = null, delete c["_" + b])
                        })
                    }, a.addDestroyToPlugin())
                }(k["_" + a], a, k), k["_" + a]
            }

            if (c = c || {}, e = e || function () {
            }, !d.isArray(a)) return void d.showError("loadPlugins error", "plugins\u7684\u53c2\u6570\u5e94\u8be5\u662f\u6570\u7ec4");
            if (!b) return void d.showError("loadPlugins error", "context\u662f\u5fc5\u8981\u53c2\u6570");
            a = d.filterByArray(a, b && b.config && b.config.removePluginsList ? b.config.removePluginsList : []);
            var i, j = a.slice(0), k = this;
            f()
        }, getUniqueMsgKey: function (a) {
            return a + "." + d.createGUID()
        }, getTxVideoPageURLByVid: function (a, b, c) {
            // if (b = "0" != b ? "_" + b : "", !a) return "";
            // var d = "//v.qq.com/",
            //     e = d + "page/" + a.substr(0, 1) + "/" + a.substr(a.length - 2, 1) + "/" + a.substr(a.length - 1, 1) + "/" + a + b + ".html";
            // return c && (e += "?start=" + parseInt(c)), e
        }, getBrowserBrand: function () {
            var a = Txplayer.util.browser, b = "";
            return a.qqbrowser ? b = "qqbrowser" : a.chrome ? b = "chrome" : a.firefox ? b = "firefox" : a.safari ? b = "safari" : a.ie && (a.ie.version ? (a.ie.version += "", b = "ie" + a.ie.version.split(".").shift()) : b = "ie"), b
        }, xss: function (a) {
            return "string" != typeof a ? a : a.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;").replace(/\'/g, "&apos;")
        }, isInScreen: function (a) {
            if (d.mobile) return !1;
            var b = Txplayer.$(window), c = {top: b.scrollTop(), left: b.scrollLeft()};
            c.right = c.left + b.width(), c.bottom = c.top + b.height();
            var e, f, g = Txplayer.$(a), h = g.offset();
            return window.Zepto ? (e = g.width(), f = g.height()) : (e = g.outerWidth(), f = g.outerHeight()), h.right = h.left + e, h.bottom = h.top + f, !(c.right < h.left || c.left > h.right || c.bottom < h.top || c.top > h.bottom)
        }, getPageVisibilityAttribute: function () {
            var a = "hidden", b = "visibilitychange";
            return "undefined" != typeof document.hidden ? (a = "hidden", b = "visibilitychange") : "undefined" != typeof document.msHidden ? (a = "msHidden", b = "msvisibilitychange") : "undefined" != typeof document.webkitHidden && (a = "webkitHidden", b = "webkitvisibilitychange"), {
                hidden: a,
                visibilityChange: b
            }
        }, addPageVisibilityChangeEvent: function (a) {
            var b = this.getPageVisibilityAttribute();
            Txplayer.$(document).on(b.visibilityChange, function () {
                a && a(!!document[b.hidden])
            })
        }, isPageHidden: function () {
            var a = this.getPageVisibilityAttribute();
            return document[a.hidden]
        }, getPTAG: function () {
            // for (var a = this.getUrlParam, b = this.getDomainOfURL, c = Txplayer.$, d = this.cookie, e = document.location.toString().toLowerCase(), f = "", g = ["ptag", "adtag", "pgv_ref"], h = 0, i = g.length; h < i && !(f = a(g[h], e)); h++) ;
            // if (!f) try {
            //     f = sessionStorage.getItem("ptag")
            // } catch (j) {
            // }
            // if (!f) {
            //     var k = b(document.referrer);
            //     k && c.inArray(k, ["v.qq.com", "film.qq.com", "m.v.qq.com"]) === -1 && (f = k.replace(/\./g, "_"))
            // }
            // return f || (f = d.get("ptag")), f
        }, getDomainOfURL: function (a) {
            if ("undefined" == typeof a || null == a || "" == a) return "";
            var b = document.createElement("a");
            return b.href = a, b.hostname
        }, getProtocolOfURL: function (a) {
            a = a || location.href;
            var b = document.createElement("a");
            b.href = a;
            var c = b.protocol.replace(":", "");
            return b = null, c
        }, getTimeStampStr: function (a) {
            a = a || 10;
            var b = parseInt(+new Date) + "";
            if (b.length === a) return b;
            if (b.length > a) return b.substring(0, a);
            for (var c = a - b.length; c > 0;) b = "0" + b, c--;
            return b
        }, extend: function () {
            var a = arguments;
            if (!(a.length <= 1)) {
                if (2 === a.length) {
                    for (var b in a[1]) a[0][b] = a[1][b];
                    return a[0]
                }
                for (var c = a.length - 1, d = c, e = a.callee; d > 0; d--) a[d - 1] = e(a[d - 1], a[d]);
                return a[0]
            }
        }, inArray: function (a, b) {
            var c = -1;
            if ("object" == typeof a && a.constructor === Array && a.length) for (var d = 0, e = a.length; d < e; d++) if (a[d] === b) {
                c = d;
                break
            }
            return c
        }, isArray: function (a) {
            return "object" == typeof a && a.constructor === Array
        }, param: function (a) {
            var b = [];
            for (var c in a) b.push(c + "=" + a[c]);
            return b.join("&")
        }, getUin: function (a) {
            var b = this.cookie.get("skey"), c = (this.cookie.get("lskey"), ""), d = 0, e = !1;
            return e || "" != b ? (c = this.cookie.get("uin"), "" == c && a && (c = this.cookie.get("luin")), d = parseInt(c.replace(/^o0*/g, ""), 10), isNaN(d) || d <= 1e4 ? 0 : d) : 0
        }, getParams: function (a) {
            for (var b, c, d = a.indexOf("?"), e = a.substring(d + 1), f = /\w+=[^&]+/g, g = {}; null !== (b = f.exec(e));) c = b[0].split("="), c.length >= 2 && (g[c.shift()] = c.join("="));
            return g
        }, removeArrayItem: function (a, b, c) {
            return "undefined" == typeof c && (c = 1), "object" != typeof a || a.constructor !== Array ? a : b < 0 ? a : (a.splice(b, c), a)
        }, filterByArray: function (a, b) {
            if (!d.isArray(a) || !Txplayer.util.isArray(a)) return a;
            for (var c = [], e = 0, f = a.length; e < f; e++) d.inArray(b, a[e]) === -1 && c.push(a[e]);
            return c
        }, trigger: function (a, b) {
            if (window.jQuery && jQuery().trigger) return void jQuery(document).trigger("TxPlayerJSBrageReady");
            var c;
            return document.createEventObject ? (c = document.createEventObject(), a.fireEvent("on" + b, c)) : (c = document.createEvent("HTMLEvents"), c.initEvent(b, !0, !0), !a.dispatchEvent(c))
        }, getPlayerPageUrl: function () {
            var a = "";
            if (top !== window) try {
                a = top.location.href
            } catch (b) {
                a = document.referrer
            } else a = location.href;
            return a
        }, getTopFrameUrl: function () {
            var a = "";
            if (top !== window) try {
                a = top.location.href
            } catch (b) {
                a = document.referrer
            } else a = window.location.href;
            return a
        }, getReportUA: function () {
            var a = navigator.userAgent;
            return a && (a = a.replace(/\$/g, " ").replace(/\,/g, " ")), a
        }, getFormatUA: function () {
            var a = "other";
            return d.browser.qqlive && (d.os.iphone ? a = "iphone_qqlive" : d.os.android && (a = "aphone_qqlive")), a
        }, formatDownloadSpeed: function (a) {
            return "number" != typeof a ? a : (a < 0 && (a = 0), a > 1024 ? a = parseInt(10 * a / 1024) / 10 + "MB/s" : a += "KB/s", a)
        }, platformMap: {qzone_feed: {platform: "30201", stdfrom: "v1106"}}, getPcPlatformId: function (a) {
            if (d.mobile) return "11001";
            if (a.platId && this.platformMap[a.platId]) return this.platformMap[a.platId].platform;
            if (d.isNews()) return "20701";
            if (a && "coolOpen" == a.originalPlayerType) return "3670201";
            if (a.eduext || "260001" === a.authfrom) return d.mobile ? "261001" : "260201";
            if (d.inWhichDomain("sportscom")) return "4100201";
            if (d.inWhichDomain("kuaibao")) return "570201";
            if (d.inWhichDomain("wegame")) return "5230201";
            var b = !a.official;
            return d.os.windows ? b ? "70201" : "10201" : d.os.mac ? b ? "70901" : "10901" : b ? 70901 : 10901
        }, getUTCTime: function () {
            var a = new Date, b = 60 * a.getTimezoneOffset() * 1e3;
            return a.setTime(a.getTime() + b), a.getTime()
        }, localTimeStr2UTC: function (a) {
            if ("number" !== Txplayer.$.type(a)) return a;
            var b = new Date, c = 60 * b.getTimezoneOffset() * 1e3;
            return b.setTime(a + c), b.getTime()
        }, getLoginID: function () {
            var a = Txplayer.util.cookie.get("main_login");
            Txplayer.util.getQQFromCookie() && (Txplayer.util.cookie.get("skey") || Txplayer.util.cookie.get("lskey")) && (a = "qq");
            var b = "", c = "", d = {qq: 1, wx: 2};
            return "wx" == a ? (a = "wxid", b = Txplayer.util.cookie.get("openid"), c = Txplayer.util.getQQFromCookie()) : "qq" == a && (b = Txplayer.util.getQQFromCookie(), c = Txplayer.util.cookie.get("openid")), {
                mainLogin: a,
                logintype: d[a] || 0,
                loginId: b,
                loginIdEx: c
            }
        }, random: function (a, b) {
            return parseInt(Math.random() * (a - b) + b)
        }, realRandom: function (a, b) {
            return Math.floor(Math.random() * (b + 1 - a)) + a
        }, isNewsPlugin: function () {
            return "m.v.qq.com" == window.location.host && window.location.href.indexOf("/x/qqnews/") > -1
        }, isNews: function () {
            return "view.inews.qq.com" === window.location.hostname
        }, getChance: function (a) {
            var b = this.realRandom(1, 100) <= a;
            return b
        }, getP2pConfig: function (a) {
            var b = [];
            return Txplayer.$.each(a.dataset.filmVideoData[0].urlArray, function (a, c) {
                b.push(c.url || "")
            }), {
                playerVer: a.dataset.testVer,
                guid: a.dataset.guid,
                isCharge: a.dataset.isNeedPay,
                osVer: d.os,
                broVer: d.browser,
                platform: a.dataset.platform,
                qq: Txplayer.util.getQQFromCookie(),
                wx: Txplayer.util.cookie.get("openid"),
                fp2p: a.dataset.getinfoJSON.fp2p,
                linkVID: a.dataset.getinfoJSON.vl.vi[0].lnk,
                resolution: a.dataset.currentDefinitionFormat,
                urls: b
            }
        }, isChrome56WithBugOfMp4: function (a) {
            return !a.dataset.useHls && (a.dataset && a.dataset.filmVideoData && a.dataset.filmVideoData.length > 1 && d.browser.chrome && d.compareVersion(d.browser.chrome.version, "56.0.2924.10") > 0)
        }, tpl: function (a, b) {
            return a.replace(/\$\{(\w+)\}/g, function (a, c) {
                return b[c] || a
            })
        }, pluginNameToV4: function (a, b) {
            if (a = a || [], b = b || [], 0 != a.length && 0 != b.length) for (var c = 0, d = b.length; c < d; c++) {
                var e = a.indexOf(b[c].replace(/v4/, ""));
                e > -1 && (a[e] = b[c])
            }
        }, isInIframe: function () {
            try {
                return window.self !== window.top
            } catch (a) {
                return !0
            }
        }, inNewIframe: function () {
            return /http(s)?:\/\/v\.qq\.com\/txp\/iframe\/player\.html/.test(location.href)
        }, getHostname: function (a) {
            var b = document.createElement("a");
            return b.href = a, b.hostname
        }, inWhichDomain: function (a) {
            if (!a) return !1;
            var b = {
                kuaibao: ["kuaibao.qq.com", "m.gamefeeds.qq.com"],
                tencentcom: ["sports.qq.com", "ent.qq.com", "fashion.qq.com", "v.sports.qq.com", "kbs.sports.qq.com", "astro.fashion.qq.com", "vlike.qq.com", "news.qq.com", "society.qq.com", "v.ent.qq.com", "v.fashion.qq.com", "digi.tech.qq.com", "nbachina.qq.com", "view.news.qq.com", "edu.qq.com", "tech.qq.com", "auto.qq.com", "health.qq.com", "sport.qq.com", "finance.qq.com", "cd.qq.com", "new.qq.com", "sh.qq.com", "gd.qq.com"],
                qzone: ["cm.qzs.qq.com", "cn.qzs.qq.com", "cnc.qzs.qq.com", "ctc.qzs.qq.com", "os.qzs.qq.com", "qzs.qq.com", "shn.photo.qq.com", "qzone.qq.com", "user.qzone.qq.com", "h5.qzone.qq.com"],
                keqqcom: ["ke.qq.com"],
                yqqcom: ["y.qq.com"],
                wegame: ["www.wegame.com.cn", "www.wegamex.com.hk", "www.wegame.com", "plat.tgp.qq.com", "game.tgp.qq.com", "developer.wegame.com", "developer.wegame.com.cn"],
                gamecom: ["cf.qq.com", "lpl.qq.com", "lol.qq.com", "plat.tgp.qq.com"],
                sportscom: ["sports.qq.com", "v.sports.qq.com", "kbs.sports.qq.com"],
                qqcom: /\.qq\.com$/
            }, c = b[a];
            if (!c) return !1;
            var d = location.hostname;
            if (this.isInIframe()) try {
                d = window.top && window.top.location.hostname
            } catch (e) {
            }
            return "qqcom" === a ? b[a].test(d) : this.inArray(c, d) > -1
        }, safariDisableAutoPlay: function () {
            var a = location.hostname, b = ["v.qq.com", "ke.qq.com", "y.qq.com", "fudao.qq.com"];
            if (this.isInIframe()) try {
                a = window.top && window.top.location.hostname
            } catch (c) {
            }
            return this.os.mac && this.browser.safari && this.compareVersion(this.browser.safari.version, "11.0") >= 1 && this.inArray(b, a) === -1
        }, browserDisableAutoPlay: function () {
            var a = window.AudioContext || window.webkitAudioContext, b = Txplayer.util.browser,
                c = Txplayer.util.compareVersion;
            if (Txplayer.util.os.mac && b.safari) return Txplayer.util.safariDisableAutoPlay();
            if (!Txplayer.util.mobile && a && b.chrome && c(b.chrome.version, "66.0") >= 1) {
                var d = new a;
                if ("suspended" === d.state) return !0
            }
            return !1
        }, getVideoType: function () {
            var a = "";
            return "v.qq.com" === location.hostname && (window.COVER_INFO && window.COVER_INFO.typeid ? a = +window.COVER_INFO.typeid : window.VIDEO_INFO && window.VIDEO_INFO.type && (a = +window.VIDEO_INFO.type)), a
        }, validVid: function (a) {
            return !a.match(/\W/) && !a.match(/_/) && 11 == a.length
        }, isPageSupportStopAutoPlay: function () {
            var a = location.protocol + "//" + location.hostname + location.pathname,
                b = /^http(s?):\/\/v\.qq\.com\/error\.html/.test(a),
                c = /^http(s?):\/\/v\.qq\.com\/x?\/?(channel)?\/?(movie|sports|finance|news|tech)\/?$/.test(a),
                d = /^http(s?):\/\/film\.qq\.com\/$/.test(location.href);
            return c || d || b
        }, preGetMacClientInfo: function (a) {
            function b(a) {
                try {
                    window.TenvideoJSBridge.callHandler("getSystemInfo", {}, function (b) {
                        b && Txplayer.util.browser.macqqlive && (Txplayer.util.browser.macqqlive.version = b.clientVersion, Txplayer.util.browser.macqqlive.deviceUuid = b.deviceUuid, a && a({
                            version: b.clientVersion,
                            guid: b.deviceUuid
                        }))
                    })
                } catch (b) {
                }
            }

            if (Txplayer.util.os.mac && Txplayer.util.browser.macqqlive) try {
                window.TenvideoJSBridge && window.TenvideoJSBridge.callHandler ? b(a) : document.addEventListener("onTenvideoJSBridgeReady", function () {
                    window.TenvideoJSBridge && window.TenvideoJSBridge.callHandler && b(a)
                })
            } catch (c) {
            }
        }, getPcClientGuid: function () {
            try {
                if (Txplayer.util.os.windows && window.external && "function" == typeof window.external.GetGUID) return window.external.GetGUID() || "";
                if (Txplayer.util.os.mac && Txplayer.util.browser.macqqlive) return Txplayer.util.browser.macqqlive.deviceUuid || ""
            } catch (a) {
            }
        }, getPcPlatform: function () {
            return Txplayer.util.browser.pcqqlive ? "pc_client" : Txplayer.util.browser.macqqlive ? "mac_client" : "web"
        }, getQQLiveDeviceInfo: function (a) {
            function b(a) {
                window.TenvideoJSBridge.invoke("getDeviceInfo", null, function (b) {
                    if ("string" == typeof b) try {
                        b = JSON.parse(b)
                    } catch (c) {
                    }
                    var d = b.result;
                    if (d) {
                        var e = ["deviceId=" + (d.deviceId || ""), "idfa=" + (d.idfa || ""), "omgid=" + (d.omgid || ""), "imei=" + (d.imei || ""), "systemVersion=" + (d.systemVersion || "")];
                        a(e.join("&"))
                    } else a()
                })
            }

            Txplayer.util.mobile && Txplayer.util.browser.qqlive ? window.TenvideoJSBridge && TenvideoJSBridge.invoke ? b(a) : document.addEventListener("onTenvideoJSBridgeReady", function () {
                window.TenvideoJSBridge && TenvideoJSBridge.invoke && b(a)
            }) : a()
        }, imageReport: function (a) {
            var b = document.createElement("img");
            b.style.width = 0, b.style.height = 0, document.body.appendChild(b), b.src = a, document.body.removeChild(b)
        }, xhrReport: function (a) {
            var b = a.url || "";
            /^http(s)?:/.test(b) || (b = location.protocol + b), b.indexOf("_dc") === -1 && (b += "&_dc=" + Math.random());
            var c = new XMLHttpRequest;
            c.open(a.method || "POST", b), c.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), a.withCredentials && (c.withCredentials = !0), c.send(Txplayer.$.param(a.data))
        }, localLog: function (a, b) {
            if (window._txplayerlocalLogs && "function" == typeof window._txplayerlocalLogs.addLog) try {
                window._txplayerlocalLogs.addLog(a, b)
            } catch (c) {
            }
        }, getPayUrl: function (a, b, c, d) {
            if ("qc.vip.qq.com" == window.location.hostname || "cdn.vip.qq.com" == window.location.hostname) {
                var e = "//film.qq.com/weixin/upay.html?hlwactid=HLW_7354&aid=V0$$11:42";
                return "ad" == a ? e += "$4:1" : "1080" == a && (e += "$4:8"), e += b ? "$6:" + b : "", e += c ? "$5:" + c : "", e += "ios" == d ? "$2:8002" : "$2:8001"
            }
            return "ad" == a ? "//film.qq.com/weixin/upay.html?aid=V0$$4:1" : "1080" == a ? "//film.qq.com/weixin/upay.html?aid=V0$$4:8" : void 0
        }, isSupportEme: !1, supportEmeAsync: function (a) {
            var b = this;
            if (this.mobile || a) return void (b.isSupportEme = !1);
            var c = "txp-spteme",
                d = "undefined" != typeof window.navigator.requestMediaKeySystemAccess && ("undefined" != typeof window.MediaKeys || "undefined" != typeof window.WebKitMediaKeys || "undefined" != typeof window.MSMediaKeys);
            if (d) try {
                var e = [{
                    initDataTypes: ["cenc"],
                    audioCapabilities: [{robustness: "SW_SECURE_CRYPTO", contentType: 'audio/mp4;codecs="mp4a.40.2"'}],
                    videoCapabilities: [{robustness: "SW_SECURE_CRYPTO", contentType: 'video/mp4;codecs="avc1.42E01E"'}]
                }];
                navigator.requestMediaKeySystemAccess("com.widevine.alpha", e).then(function (a) {
                    b.isSupportEme = !0, b.setData(c, b.isSupportEme)
                })["catch"](function (a) {
                    b.isSupportEme = !1, b.setData(c, b.isSupportEme)
                })
            } catch (f) {
                b.isSupportEme = !1, b.setData(c, b.isSupportEme)
            } else b.isSupportEme = !1, b.setData(c, b.isSupportEme);
            d && window.Promise && b.supportHDCP()
        }, supportHDCP: function () {
            var a = this, b = "2.0", c = [{
                initDataTypes: ["cenc"],
                audioCapabilities: [{robustness: "SW_SECURE_CRYPTO", contentType: 'audio/mp4;codecs="mp4a.40.2"'}],
                videoCapabilities: [{robustness: "SW_SECURE_CRYPTO", contentType: 'video/mp4;codecs="avc1.42E01E"'}]
            }];
            a.v4log("Requesting Widevine system access..."), navigator.requestMediaKeySystemAccess("com.widevine.alpha", c).then(function (a) {
                return a.createMediaKeys()
            }).then(function (c) {
                return a.v4log("Getting HDCP status..."), "getStatusForPolicy" in c ? c.getStatusForPolicy({minHdcpVersion: b}) : window.Promise.reject("HDCP Policy Check API is not available.")
            }).then(function (c) {
                return "usable" !== c ? window.Promise.reject(c) : (a.isSupportHDCP = !0, void a.v4log("> HDCP is available for " + b))
            })["catch"](function (b) {
                a.isSupportHDCP = !1, a.v4log("Argh! " + b)
            })
        }, fetch: function (a) {
            var b = this, c = {method: "GET", mode: "cors"};
            return a.credentials && (c.credentials = a.credentials), window.fetch(a.url, c).then(function () {
            }, function () {
                throw new Error("ERROR!")
            })["catch"](function () {
                b.requestViaImage(a.url)
            })
        }, requestViaImage: function (a) {
            var b = document.createElement("img");
            b.onerror = b.onload = function () {
                b = null
            }, b.src = a
        }, xhrReport: function (a) {
            var b = a.url || "";
            /^http(s)?:/.test(b) || (b = location.protocol + b), b.indexOf("_dc") === -1 && (b += "&_dc=" + Math.random());
            var c = new XMLHttpRequest;
            c.open(a.method || "POST", b), c.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), a.withCredentials && (c.withCredentials = !0), c.send(Txplayer.$.param(a.data))
        }, strongReport: function (a) {
            this.xhrReport(a)
        }
    }, e = c(4), f = c(5), g = c(6);
    e.call(d), d.report = f, d.PAGE_VIDEO_TYPE = g, a.exports = d
}, function (a, b) {
    function c(a) {
        a = a || navigator.userAgent, a = a.toLowerCase(), this.browser = {}, this.os = {}, this.phone = {}, this.mobile = !1, a.indexOf("mobile") > -1 && (this.mobile = !0);
        var b, c, d = {
            android_1: /android[\s\/]([\d\.]+)/i,
            android_2: /android/i,
            android_3: /MIDP-/i,
            ipod_1: /iPod\stouch;\sCPU\siPhone\sos\s([\d_]+)/i,
            ipod_100: /iPod.*os\s?([\d_\.]+)/i,
            iphone: /iPhone;\sCPU\siPhone\sos\s([\d_]+)/i,
            iphone_100: /iPhone.*os\s?([\d_\.]+)/i,
            ipad_1: /ipad;\scpu\sos\s([\d_]+)/i,
            ipad_2: /ipad([\d]+)?/i,
            windows: /windows\snt\s([\d\.]+)/i,
            mac: /Macintosh.*mac\sos\sx\s([\d_\.]+)/i,
            linux: /Linux/i,
            nintendo: /Nintendo Switch/i
        };
        for (var e in d) if (b = d[e].exec(a)) {
            c = e.replace(/_\d+/, ""), this.os[c] = !0, this.os.name = c, b[1] && (this.os.version = b[1].replace(/_/g, "."));
            break
        }
        (this.os.iphone || this.os.ipad || this.os.ipod) && (this.os.ios = !0);
        var f, g, h = {
            toutiao: /TTWebView\/([\d\.]+)/i,
            wechat: /MicroMessenger\/([\d\.]+)/i,
            ipadqq: /IPadQQ\/([\d\.]+)/i,
            mqq: /qq\/([\d\.]+)/i,
            qzone: /QZONEJSSDK\/([\d\.]+)/i,
            mqqbrowser: /mqqbrowser\/([\d\.]+)/i,
            qqbrowser: /[^m]QQBrowser\/([\d\.]+)/i,
            x5: /tbs\/(\d+)/i,
            uc: /UCBrowser\/([\d\.]+)/i,
            safari_1: /Version\/(([\d\.]+))\sSafari\/[\d\.]+/i,
            safari_2: /Safari\/([\d\.]+)/i,
            firefox: /Firefox\/([\d\.]+)/i,
            opera: /OPR\/([\d\.]+)/i,
            ie_1: /MSIE\s([\d\.]+)/i,
            ie_2: /(trident\/\d\.\d)/i,
            ie_3: /(Edge)\/\d+\.\d+/i,
            weibo: /weibo__([\d\.]+)/i,
            qqnewsAd: /TADChid\/([\d\.]+)/i,
            qqnews: /qqnews\/([\d\.]+)/i,
            qqlive_1: /QQLiveBrowser\/([\d\.]+)/i,
            qqlive_2: /QQLiveHDBrowser\/([\d\.]+)/i,
            kuaibao: /qnreading\/([\d\.]+)/i,
            liebao: /LieBaoFast\/([\d\.]+)/i,
            douban: /com\.douban\.frodo\/([\d\.]+)/i,
            miuibrowser: /MiuiBrowser/i,
            baidu: /baiduboxapp/i,
            browser360: /360browser/i,
            oppobrowser: /OppoBrowser/i,
            chrome_1: /CriOS\/([\d\.]+)/i,
            chrome_2: /Chrome\/([\d\.]+)/i,
            qqdownloader: /qqdownloader\/([\d\.]+)/i,
            nintendo: /NintendoBrowser\/([\d\.]+)/i
        };
        for (var i in h) if (f = h[i].exec(a)) {
            if (g = i.replace(/_\d+/, ""), this.browser[g]) return;
            this.browser[g] = {version: f[1]}
        }
        if (/windows/i.test(a) && /qqlive/i.test(a) && window.external && window.external.GetProtocalVersion && "function" == typeof window.external.GetProtocalVersion) {
            var j = window.external.GetProtocalVersion();
            this.browser.pcqqlive = {version: j}
        }
        /mac\sos/i.test(a) && /qqlive_mac/i.test(a) && (this.browser.macqqlive = {}), this.os.android && this.browser.safari && delete this.browser.safari, this.browser.chrome && this.browser.safari && delete this.browser.safari, this.browser.ie && this.browser.ie.version && this.browser.ie.version.indexOf("trident") > -1 && (this.browser.ie.version.indexOf("6.0") > -1 ? this.browser.ie.version = "10" : this.browser.ie.version.indexOf("5.0") > -1 ? this.browser.ie.version = "9" : this.browser.ie.version.indexOf("4.0") > -1 ? this.browser.ie.version = "8" : this.browser.ie.version = "11");
        var k, l = {
            ipod: /iPod/i,
            ipad: /iPad/i,
            iphone: /iPhone/i,
            huawei_1: /HUAWEI([\w_-]+)/i,
            huawei_2: /(CHM-\w+)/i,
            huawei_3: /(HonorChe)/i,
            huawei_4: /HONORPLK/i,
            huawei_5: /(Che\d+-CL\d+)/i,
            huawei_6: /(H\d+-L\d+)/i,
            huawei_100: /HUAWEI/i,
            xiaomi_1: /(HM\sNOTE)/i,
            xiaomi_2: /(HM\s\w+)/i,
            xiaomi_3: /(MI\s\w+)/i,
            xiaomi_4: /(MI-ONE\sPlus)/i,
            xiaomi_5: /(M1)\sBuild/i,
            xiaomi_6: /(HM\d+)/i,
            xiaomi_7: /Xiaomi[\s_]?([\w_]+)/i,
            samsung_1: /(GT-\w+)/i,
            samsung_2: /(SCH-\w+)/i,
            samsung_3: /(SM-\w+)/i,
            vivo: /vivo\s(\w+)/i,
            oneplus: /ONEPLUS-([a-z0-9]+)/i,
            lenovo_1: /Lenovo[\s-]?([\w-]+)/i,
            lenovo_100: /Lenovo/i,
            zte_1: /ZTE\s?(\w+)?/i,
            zte_2: /ZTE/i,
            coolpad_1: /Coolpad\s(\w+)/i,
            coolpad_100: /Coolpad/i,
            oppo_1: /OPPO\s?(\w+)/i,
            oppo_2: /(R7Plus|R8007|R801|R831S|R8205)/i,
            oppo_100: /OPPO/i,
            meizu_1: /(MX\d+)/i,
            meizu_2: /(m\d+\snote)\sBuild/i,
            htc_1: /HTC\s?(\w+)/i,
            htc_100: /HTC/i,
            tcl: /TCL\s(\w+)/i,
            lephone: /lephone\s(\w+)/i,
            lg: /LG[\s-]?(\w+)/i,
            galaxy: /(galaxy\d+)/,
            hisense_1: /Hisense/i,
            hisense_2: /HS-(\w+)/i,
            philips: /Philips\s?(\w+)?/i,
            "\u91d1\u7acb": /(GN\w+)\sBuild/i,
            sonny: /sonny/i,
            "\u5929\u8bed": /K-Touch/i
        };
        for (var m in l) if (k = l[m].exec(a)) {
            this.phone.name = m.replace(/_\d+/, ""), k[1] && (this.phone.version = k[1].replace(/^[_-]/gi, ""));
            break
        }
        this.browser && this.browser.mqq && (this.os.ios || this.os.android) && (this.mobile = !0)
    }

    a.exports = c
}, function (a, b) {
    function c(a) {
        return Txplayer.dataset.ready ? g ? void h.push(a) : (g = setTimeout(function () {
            d()
        }, 1e3), Txplayer.util.mobile || Txplayer.imgRpt ? Txplayer.util.requestViaImage(a) : Txplayer.util.fetch({
            url: a,
            credentials: "include"
        })["catch"](function () {
            d()
        }), void e(a)) : (i || (i = !0, Txplayer.msg && Txplayer.msg.on("ready", function () {
            f()
        })), void h.push(a))
    }

    function d() {
        return 0 === h.length ? void (g = null) : (clearTimeout(g), g = null, void c(h.shift()))
    }

    function e(a) {
        if (a && Txplayer.util && Txplayer.util.getParams && Txplayer.dataset.showreport && window.console && "function" == typeof window.console.table) {
            var b = [], c = Txplayer.util.getParams(a);
            for (var d in c) b.push({key: d, value: decodeURIComponent(c[d])});
            c && c.BossId ? window.console.log("%c" + [c.BossId, c.step].join(" -- "), "color: green;") : window.console.log(a), window.console.table(b)
        }
    }

    function f() {
        Txplayer.dataset.ready && d()
    }

    var g, h = [], i = !1;
    a.exports = c
}, function (a, b) {
    a.exports = {
        MOVIE: 1,
        TV: 2,
        CARTOON: 3,
        SPORT: 4,
        ENT: 5,
        GAME: 6,
        RECORD: 9,
        VARIETY: 10,
        WORLD_CUP: 21,
        MUSIC: 22,
        NEWS: 23,
        FINANCE: 24,
        FASHION: 25,
        TRAVEL: 26,
        EDUCATION: 27,
        TECH: 28,
        CAR: 29,
        ESTATE: 30,
        LIFE: 31,
        MICROTEACHING: 37,
        AD: 40,
        SELFIE: 41,
        FUNNY: 43,
        CONF_AND_BUD: 45,
        MICROMOVIE: 46,
        COOPERATION: 50,
        CULTURE: 51,
        YOUTH: 52,
        MOTHER_AND_BABY: 60,
        ORIGINAL: 103,
        SHOOTER: 105,
        CHILDREN: 106
    }
}, function (a, b, c) {
    function d(a) {
        var b = ["title", "volume", "duration", "vid", "containerId"];
        for (var c in a) t.inArray(b, c) > -1 && (a[c] = t.xss(a[c]));
        return a
    }

    function e() {
        var a;
        return a = "function" == typeof window.Zepto ? window.Zepto : "function" == typeof window.jQuery ? window.jQuery : "function" == typeof window.jq ? window.jq : null
    }

    function f(a) {
        function b() {
            return t.os.mac ? t.browser.safari && (t.compareVersion(t.browser.safari.version, "9.0") < 0 || t.compareVersion(t.os.version, "10.10") < 0) && t.isFlashFit() ? "flash" : t.browser.firefox && t.compareVersion(t.browser.firefox.version, "48.0") < 0 ? "flash" : (t.isSupportMP4(), "html5hd") : t.os.windows ? q(a) && t.isSupportMP4() ? "html5hd" : "flash" : t.os.linux ? "html5hd" : t.os.ios ? t.os.ipad && "view.inews.qq.com" !== location.hostname ? "ipadh5" : "h5" : t.os.android ? t.isSupportMP4() ? "h5" : "mp4link" : t.os.nintendo ? "nintendo" : "html5hd"
        }

        function c() {
        }

        return "vod" === a.videoType ? b() : c()
    }

    function g(a) {
        var b = t.getData(u.localStorageKey.userSetting), c = {};
        if (b) {
            try {
                window.JSON && "function" == typeof JSON.parse ? c = JSON.parse(b) : "function" == typeof Txplayer.$.parseJSON && (c = Txplayer.$.parseJSON(b))
            } catch (d) {
                a.msg.broadcast("reportError", {
                    msg: d.message,
                    code: Txplayer.define.reportCode.JS_ERROR,
                    stack: d.stack
                })
            }
            return c && c.isUseFlash + "" == "1" ? "flash" : c && c.isUseFlash + "" == "0" ? "html5hd" : ""
        }
    }

    function h() {
        return "v.qq.com" == location.hostname && (/v.qq.com\/x\/cover|page\//.test(location.href) || /v.qq.com(\/*\w*)\/p\/topic\//.test(location.href))
    }

    function i(a, b, c) {
        var d, e, i = !!a.playerType;
        if (!t.mobile && !a.enForcePlayerType) {
            var j = !1;
            try {
                j = parent.window._TxpIframeInQzoneIfrme
            } catch (k) {
            }
            t.inNewIframe() && j || (/_fp=f/.test(location.href) || t.os.linux ? e = d = g(c) : h() || (e = d = g(c)))
        }
        if (/_fp=f/.test(location.href)) try {
            window.history.pushState({title: document.title}, "", location.href.replace(/\??&?_fp=f/, ""))
        } catch (k) {
        }
        t.browser.ie && "edge" !== t.browser.ie.version && (d = "flash", c.dataset.disableShowHtml5Switch = 1), d ? a.playerType = d : a.playerType || (a.playerType = f(a)), "html5hd" === a.playerType && (t.isSupportChromeHls(c.dataset.platform) ? a.playerType = "chromehls" : t.isSupportSafariHls(c.dataset.platform) ? a.playerType = "safarihls" : t.isSupportMP4() || (a.playerType = "flash", c.dataset.disableShowHtml5Switch = 1));
        var l = t.getUrlParam("forcestream");
        "0" !== l || "chromehls" !== a.playerType && "safarihls" !== a.playerType || (a.playerType = "html5hd"), !i && !d && "html5hd" == a.playerType && t.os.mac && t.browser.qqbrowser && (a.playerType = "flash"), ("h5" == a.playerType && t.os.android || ("h5tiny" == a.playerType || "h5" == a.playerType) && t.os.ios && t.os.version && t.compareVersion(t.os.version, "7") > 0) && t.browser.mqqbrowser && t.browser.mqqbrowser.version && t.compareVersion(t.browser.mqqbrowser.version, "7.3") >= 0 && location.host.indexOf("m.v.qq.com") !== -1 && !a.enableHevc && t.browser.chrome && (a.playerType = "h5qq"), !t.mobile || "flash" !== a.playerType && "html5hd" !== a.playerType && "chromehls" !== a.playerType && "safarihls" !== a.playerType || (a.playerType = "h5"), "chromehls" !== a.playerType && "safarihls" !== a.playType || (c.dataset.useHls = !0);
        var m = b[a.playerType];
        return a.extendPluginsMap && a.extendPluginsMap[a.videoType] && a.extendPluginsMap[a.videoType][a.playerType] && (m = m.concat(a.extendPluginsMap[a.videoType][a.playerType])), a.official || a.removePluginsList.push("UiFavorite", "UiOmSubscribe", "UiLanguage", "UiSettings", "UiBrowserFullScreen", "UiOnlyWatch", "EndRecommend", "UiNormalPoint", "UiBuyPlayPoint"), "nintendo" === a.playerType && a.removePluginsList.push("UiPlayNext", "UiBrowserFullScreen", "UiWindowFullScreen", "UiSpeed"), m = t.filterByArray(m, a.removePluginsList), "mp4link" !== a.playerType && "flash" !== a.playerType && "v4" != a.version && Array.prototype.indexOf && m.indexOf("H5PlayerAd") === -1 && m.push("H5PlayerAd"), "3.5.57" === c.dataset.testVer ? m.forEach(function (a, b) {
            if (/hlshelper/i.test(a)) return m[b] = "HlsHelperP2PEncrypt", c.dataset.useP2P = !0, !1
        }) : c.dataset.testVer === t.getUrlParam("debugusep2p") ? m.forEach(function (a, b) {
            if (/hlshelper/i.test(a)) return m[b] = "HlsHelperP2PDebug", c.dataset.useP2P = !0, !1
        }) : "3.6.3" === c.dataset.testVer && m.forEach(function (a, b) {
            if (/hlshelper/i.test(a)) return m[b] = "HlsHelperP2PAdaptive", c.dataset.useP2P = !0, !1
        }), m
    }

    function j(a) {
        t.browser.macqqlive && t.preGetMacClientInfo(function (b) {
            a && a(b)
        })
    }

    function k(a) {
        var b = a.pid || t.createGUID();
        return b
    }

    function l(a) {
        var b = a.guid || t.getData(u.localStorageKey.userId);
        return a.guid || !t.browser.pcqqlive && !t.browser.macqqlive || (b = t.getPcClientGuid(), b || (b = t.getData(u.localStorageKey.userId))), b || (b = t.createGUID(), t.setData(u.localStorageKey.userId, b)), b
    }

    function m() {
        var a = t.getData(u.localStorageKey.unid);
        return a
    }

    function n() {
        var a = "", b = location.host;
        return "v.qq.com" == b && (window.COVER_INFO && window.COVER_INFO.typeid ? a = +window.COVER_INFO.typeid : window.VIDEO_INFO && window.VIDEO_INFO.type && (a = +window.VIDEO_INFO.type)), a
    }

    function o(a) {
        if ("0" === t.getUrlParam("debugp2p")) return !1;
        if ("1" === t.getUrlParam("debugp2p")) return t.isSupportChromeHls({official: !0});
        var b = !t.inNewIframe() && ("v.qq.com" === location.hostname || "film.qq.com" === location.hostname);
        return b && t.isSupportChromeHls({official: !0})
    }

    function p(a) {
        var b = ["3q0jq9kvr9wvk2x", "639agzdh10yu2q2", "29ydp7xrml13rxk", "gakoshshys2i1c0", "70d6i1b6s0rtwpy", "lcpwn26degwm7t3", "0hrejqzlvdyr03k", "i8wue9gam2mewxf", "zmtpenihq5z8m75", "ym3zk2afta7lkuw", "0qd517viyiujrr4", "i200hs4ip5a6u7a", "aeuz5ypnru0wxqq", "wqoslotdl4dhza6", "5sxw7i4occhtkt8", "ha7r9z89i9d234y", "033i818h6hqga2i", "zgz8djmyrquyfh3", "70d6i1b6s0rtwpy", "9z88hz9qwugb8p1", "ceusrubximxm0g8", "yoz60y87rdgl1vp", "e7hi6lep1yc51ca", "3q0jq9kvr9wvk2x", "jvhuaf93hh858fs", "t3qd0fliz287tr7", "1wbx6hb4d3icse8", "0rok1fggj7zwsez", "gqvzz2ezmquha4p", "6ql0vqq1huc2kdb", "rpup19lfbuf2skc"];
        return t.inArray(b, a.cid) > -1
    }

    function q(a) {
        return !!(t.os.windows && t.browser.pcqqlive && t.browser.pcqqlive.version >= 50171110) || (!!(t.browser.firefox && t.compareVersion(t.browser.firefox.version, "48.0") >= 0) || (!!(t.browser.opera && t.compareVersion(t.browser.opera.version, "40.0") >= 0) || !!(t.browser.chrome && t.compareVersion(t.browser.chrome.version, "39.0") >= 0)))
    }

    function r(a) {
        var b = {
            isUsePlayinline: ['playsinline="isiPhoneShowPlaysinline" x5-video-player-type="h5-page" t7-video-player-type="inline" '],
            isUseWebkitPlayinline: ['webkit-playsinline="isiPhoneShowPlaysinline"'],
            isUseAirplay: "x-webkit-airplay",
            isUseControl: 'controls="controls"',
            isUsePreload: ['preload="auto"', 'preload="none"'],
            isUseCrossOrigin: 'crossOrigin="anonymous"',
            muted: "muted",
            isUseIgnore: 'x5-video-ignore-metadata="true"'
        }, c = [];
        for (var d in b) Txplayer.$.isArray(b[d]) ? a[d] === !0 ? c.push(b[d][0]) : c.push(b[d][1]) : a[d] === !0 && c.push(b[d]);
        return c
    }

    function s(a) {
        var b = document.createElement("video"), c = function (a) {
            if (a) {
                var c = a.split("="), d = c[0], e = c[1];
                void 0 === e && (e = !0), "string" == typeof e && (e = e.replace(/"/g, "")), b.setAttribute(d, e)
            }
        };
        b.setAttribute("data-role", "txp_video_tag");
        try {
            return r(a).forEach(function (a) {
                a.indexOf(!0) ? a.split(" ").forEach(c) : c(a)
            }), b.style.display = "none", document.body.appendChild(b), b.play()["catch"](function (a) {
                t.v4log("insertEmptyVideoCatch", a.message)
            }), b
        } catch (d) {
            t.v4log("insertEmptyVideoErr", d.message)
        }
    }

    var t = c(3), u = (c(8), c(9)), v = c(10);
    a.exports = {
        insertEmptyVideo: s,
        filterXSS: d,
        find$: e,
        choosePlugins: i,
        installPlugins: v.installPlugins,
        comboService: v.comboService,
        getPlayerId: k,
        getUserId: l,
        getUserIdForMacClientAsync: j,
        getUnid: m,
        useV4P2P: o,
        useV4P2PAdaptive: p,
        getVideoType: n
    }
}, function (a, b, c) {
    var d = c(3), e = {
        version: "v4",
        autoplay: !1,
        autoPlayInMute: !0,
        browserDisableAutoPlay: !1,
        usePreviewDomain: !1,
        enableStopButton: !1,
        playerType: "",
        enForcePlayerType: !1,
        videoType: "vod",
        vid: "",
        cid: "",
        columnId: "",
        containerId: "",
        channelId: "",
        width: "0",
        height: "0",
        showPoster: !0,
        isUsePlayinline: !0,
        isUseWebkitPlayinline: !0,
        isUseAirplay: !0,
        isUseCrossOrigin: !1,
        loadPluginCrossOrigin: !1,
        isUsePreload: function () {
            return !d.mobile
        }(),
        isUseControl: !1,
        isUseHtml5UI: !0,
        hideControlUI: !1,
        isShowDurationLimit: !0,
        isHtml5UseFakeFullScreen: !0,
        isContinuePlay: !1,
        pauseBanner: !1,
        downloadBanner: !1,
        recommendBanner: !1,
        followBanner: !1,
        extendPluginsMap: {
            vod: {
                chromehls: function () {
                    return "v.qq.com" === location.hostname ? ["Barrage"] : []
                }(), safarihls: function () {
                    return "v.qq.com" === location.hostname ? ["Barrage"] : []
                }()
            }
        },
        muted: !1,
        volume: 50,
        disableCacheVolume: !1,
        loop: !1,
        settings: {
            UiControl: {
                subPlugins: function () {
                    var a = [];
                    return a = d.mobile ? ["UiProgress", "UiControlPlay", "UiPlayNext", "UiShowTime", "UiWindowFullScreen", "UiLogo"] : ["UiProgress", "UiNormalPoint", "UiControlPlay", "UiPlayNext", "UiLoopPlay", "UiShowTime", "UiDuration", "UiBarrageBtn", "UiOnlyWatch", "EndRecommend", "UiDefinition", "UiSpeed", "UiLanguage", "UiVolume", "UiPreview", "UiPreviewList", "UiPreviewAd", "UiSettings", "UiBrowserFullScreen", "UiWindowFullScreen", "UiLogo", "UiBuyPlayPoint"]
                }()
            },
            H5UiControl: {
                subPlugins: function () {
                    var a = ["UiControlPlay", "UiShowTime", "H5UIProgress", "H5HdBanner", "H5Defn", "H5UiFullScreen"];
                    return d.os.ios && a.unshift("H5PlaybackRate"), a
                }()
            },
            UiSettings: {},
            HdPlayer: {subPlugins: ["UiShadow"]},
            v4HdPlayer: {subPlugins: ["UiShadow"]},
            H5Player: {subPlugins: ["UiShadow"]},
            HlsPlayer: {subPlugins: ["UiShadow"]},
            v4HlsPlayer: {subPlugins: ["UiShadow"]},
            H5PlayerAd: {
                url: function () {
                    // var a = d.getUrlParam("debugcreative");
                    // return a ? "//ca.gtimg.com/adplugin/js/adplayer.js" : ""
                }()
            },
            TxpCreativePlayer: {
                url: function () {
                    var a = d.getUrlParam("debugcreative");
                    return a ? "//vm.gtimg.cn/tencentvideo/txpv5/creative/plugins/txp-creative-player." + a + "js" : ""
                }()
            }
        },
        removePluginsList: [],
        isNeedPay: !1,
        playStartTime: 0,
        skipPrelude: !0,
        useConnectionPlay: !1,
        connectionPlayTime: 0,
        hideControlOnPlaying: !0,
        otherVideoLink: "http://v.qq.com/",
        useComboService: !0,
        showLogo: "v.qq.com" !== location.hostname && "www.beijing2022.cn" !== location.hostname,
        hideLoadingSlogan: "www.beijing2022.cn" === location.hostname,
        logoActionToVindex: !1,
        showTitle: !1,
        showToggleSideBar: !1,
        show1080p: !!d.isVqqOrFilmqq(),
        globalRetryTimes: 4,
        keyRetryTimes: 3,
        nextVid: !1,
        flashWmode: function () {
            return "opaque"
        }(),
        flashvar: {},
        flashplayerUrl: "",
        showBrowserFullScreen: function () {
            return top === window && "v.qq.com" == location.hostname
        }(),
        showSettings: !0,
        showShare: !0,
        showCloseLight: !1,
        showLoopPlay: !1,
        showSmallWindowButton: !1,
        showBullet: !1,
        bulletId: "",
        showImageBullet: !1,
        showBulletInput: !0,
        showFlashBulletInput: !1,
        openBulletDefault: !0,
        showRecommendOnEnd: !0,
        useFlashVIPLayer: -1,
        flashCallFn: function () {
        },
        showOpenVIPGuide: function () {
            return d.mobile ? function () {
            } : ""
        }(),
        chid: "",
        authfrom: "",
        authext: "",
        // adPage: "",
        // adauthext: "",
        createPlayerAfterCssLoaded: !1,
        showHTML5Switch: function () {
            var a = 1, b = d.getUrlParam("debug");
            return "1" != b && "true" != b || (a = 1), a = "v.qq.com" == location.hostname ? a : 0, d.os.mac && (a = 1), a
        }(),
        businessId: 0,
        platId: "",
        getHistoryReportParam: function () {
            return !1
        },
        getOuterReportData: function () {
            return this.outerReportData
        },
        outerReportData: "",
        clientReportInfo: {},
        reportRecomm: !0,
        official: function () {
            var a = !1, b = d.getUrlParam("official");
            return /^http(s?):\/\/v.qq.com\/x\/(cover|page)\//.test(location.href) && (a = !0), b && (a = !1, "1" != b && "true" != b || (a = !0)), a
        }(),
        useMiniSkin: !1,
        miniSkinAdaptive: !0
    };
    a.exports = e
}, function (a, b, c) {
    var d = c(3), e = "//vm.gtimg.cn/tencentvideo/txp/style/txp_desktop.css", f = {
        maxId: 0,
        deferGetPlayerScript: {},
        hideClass: "txp_none",
        showClass: "txp_show",
        btnHoverClass: "txp_hover",
        currentClass: "txp_current",
        jsBasePath: "//vm.gtimg.cn/tencentvideo/txp/js/",
        coreVersion: "v5",
        flashVersion: "0.0.0",
        flashLiveSwf: "//vm.gtimg.cn/minivideo_v1/vd/res/TencentPlayerLive.swf?max_age=86400",
        flashVodSwf: function () {
            return "v.qq.com" !== location.hostname || /^v\.qq\.com\/iframe\/txp\/player\.html/.test(location.href.replace(location.protocol + "//", "")) ? "//imgcache.qq.com/tencentvideo_v1/playerv3/TPout.swf?max_age=86400" : "//imgcache.qq.com/tencentvideo_v1/playerv3/TencentPlayer.swf?max_age=86400"
        }(),
        _instance: {},
        documentWebSite: "http://tvp.oa.com/",
        jsApiReady: "TxPlayerJSBrageReady",
        tabindex: 1,
        H5PlayerStyleUrl: {
            html5hd: e,
            nintendo: e,
            chromehls: e,
            safarihls: e,
            // ipadh5: "//vm.gtimg.cn/tencentvideo/txp/style/txp_pad.css",
            h5: "//vm.gtimg.cn/c/=/tencentvideo/txp/style/txp_mobile.css,txp_appbar.css",
            news: "//vm.gtimg.cn/c/=/tencentvideo/txp/style/txp_mobile.css,txp_appbar_simple.css",
            h5qq: "//vm.gtimg.cn/c/=/tencentvideo/txp/style/txp_mobile.css,txp_appbar.css",
            h5tiny: "//vm.gtimg.cn/c/=/tencentvideo/txp/style/txp_mobile.css,txp_appbar.css"
        },
        comboServiceRule: "//vm.gtimg.cn/c/=",
        clickEventName: function () {
            return "click"
        }(),
        loadScriptDefer: {},
        switchDefinitionTimeout: 0,
        logData: [],
        showreport: "1" === d.getUrlParam("_showreport_"),
        ready: !1,
        loadFlow: [],
        isReadyPlugins: [],
        lastFullScreenId: ""
    };
    f.localStorageKey = {
        userId: "txp-userid",
        userSetting: "txp-user-setting",
        playTime: "txp-playtime",
        // adRfid: "txp-ad-rfid",
        historyPlayTime: "txp-history-playtime",
        historyDefinition: "txp-history-definition",
        volumeHistory: "txp-history-volume",
        // adMuteHistory: "txp-ad-history-mute",/**/
        userPlayedTime: "txp-user-playedtime",
        loopPlaySetting: "txp-loop-play-setting",
        onlyWatch: "txp-only-watch",
        unid: "txp-unid",
        retryTimes: "txp-retrytimes",
        bufferTimes: "txp-buffertimes",
        openClientBubble: "txp-client-bubble"
    }, f.sessionStorageKey = {languageSwitch: "txp-language-switch"}, a.exports = f
}, function (a, b, c) {
    function d(a, b, c, d, e, g) {
        f.loadPlugins.call(a, b, c, d.settings, function () {
            c.dataset.isReady = !0, c.dataset.playerCreateEndTime = +new Date, "flash" !== d.playerType && (a.userMsg.broadcast("ready"), e.broadcast("ready"), Txplayer.dataset.ready ? setTimeout(function () {
                a.userMsg.broadcast("playerInit")
            }, 100) : (Txplayer.dataset.ready = !0, Txplayer.msg.broadcast("ready"), a.userMsg.broadcast("playerInit")))
        })
    }

    function e(a, b, c, e, h, i) {
        var j, k, l = [], m = [], n = [], o = 0, p = "/tencentvideo/txp/js/plugins/", q = !1, r = !1, s = !1,
            t = "/tencentvideo/txp/js/jquery.min.js";
        f.mobile && (t = "/tencentvideo/txp/js/zepto.min.js");
        var u = function (a) {
            m.push(a)
        }, v = f.isArray(e.removePluginsList), w = function (a) {
            v && f.inArray(e.removePluginsList, a) > -1 || f.inArray(e.removePluginsList, a.substr(2)) > -1 || l.push(a)
        }, x = function (a) {
            if ("string" == typeof a && (e.settings[a] ? e.settings.hasOwnProperty(a) && !e.settings[a].url && w(a) : w(a), e.settings[a] && f.isArray(e.settings[a].subPlugins))) for (var b = 0, c = e.settings[a].subPlugins.length; b < c; b++) x(e.settings[a].subPlugins[b])
        };
        for (o = 0, j = b.length; o < j; o++) x(b[o]);
        for (o = 0, j = l.length; o < j; o++) "TxpCreativePlayer" != l[o] ? (f.mobile || "v4" != c.config.version || f.inArray(["UiControlPlay", "UiVolume", "UiDefinition"], l[o]) != -1 && (l[o] = "v4" + l[o]), Txplayer.plugins[l[o]] || (k = l[o].toLowerCase() + ".js", u(Txplayer.hashMaps && Txplayer.hashMaps[k] && Txplayer.hashMaps[k].replace ? Txplayer.hashMaps[k] : k))) : s = !0;
        for (; m.length > 0;) i || q ? !r && s ? (r = !0, n.push(Txplayer.dataset.comboServiceRule + ["/tencentvideo/txpv5/creative/plugins/txp-creative-player." + Txplayer.appVersion + ".js", p + m.splice(0, 19).join(",")].join(","))) : n.push(Txplayer.dataset.comboServiceRule + p + m.splice(0, 20).join(",")) : (q = !0, n.push(Txplayer.dataset.comboServiceRule + [t, p + m.splice(0, 19).join(",")].join(",")));
        var y = function () {
            if (0 === n.length) {
                if (!e.vid) return;
                return void d(a, b, c, e, h)
            }
            var j = n.shift();
            j += "?max_age=604800&_ts=" + Txplayer.dataset.ts, f.loadScript({
                url: j,
                crossorigin: !!e.loadPluginCrossOrigin,
                onsuccess: function (a) {
                    i || (i = "function" == typeof window.Zepto ? window.Zepto : "function" == typeof window.jQuery ? window.jQuery : "function" == typeof window.jq ? window.jq : null, i && (Txplayer.$ = i, Txplayer.$.tmpl = g)), y()
                }
            })
        };
        y()
    }

    var f = c(3), g = c(11);
    a.exports = {comboService: e, installPlugins: d}
}, function (a, b) {
    var c = function (a, b) {
        return function (d, e) {
            var f = /\s/.test(d) ? function (a) {
                var c, d = [b], e = [[]];
                for (c in a) d.push(c), e.push(a[c]);
                return new Function(d, f.$).apply(a, e).join("")
            } : a[d] = a[d] || c(document.getElementById(d).innerHTML);
            return f.$ = f.$ || b + ".push('" + d.replace(/\\/g, "\\\\").replace(/[\r\t\n]/g, " ").split("<%").join("\t").replace(/((^|%>)[^\t]*)'/g, "$1\r").replace(/\t=(.*?)%>/g, "',$1,'").split("\t").join("');").split("%>").join(b + ".push('").split("\r").join("\\'") + "');return " + b, e ? f(e) : f
        }
    }({}, "$" + +new Date);
    a.exports = function (a, b) {
        return b && !b.svgPrefix && (b.svgPrefix = window.Txplayer && window.Txplayer.dataset && window.Txplayer.dataset.svgPrefix || ""), c(a, b)
    }
}, function (a, b) {
    var c = ["HtmlFrame", "v4HdPlayer", "HdAdAdapter", "TxpCreativePlayer", "UiPoster", "v4H5Report", "v4HdPlayerReport", "UiLoading", "UiLoadingWithAD", "HdPlayerHistory", "v4HdPlayerControl", "DownloadMonitor", "v4UiError", "UiTips", "UiControl", "VideoInteractive", "UiTitle", "HdHotKey", "UiScreenPercent", "UiTrBtnGroup", "UiOverlayPlay", "UiClock", "UiConsole", "UiWaterMark", "UiWaterMarkAction", "UiRightClickMenu", "UiOmSubscribe", "UiUnofficialEndTip", "UiOpenClientBubble", "H5UiSpeedy"],
        d = ["HtmlFrame", "v4HdPlayer", "HdAdAdapter", "TxpCreativePlayer", "UiPoster", "v4H5Report", "v4HdPlayerReport", "UiLoading", "UiLoadingWithAD", "HdPlayerHistory", "HlsHelper", "v4HdPlayerControl", "DownloadMonitor", "v4UiError", "UiTips", "UiControl", "VideoInteractive", "UiTitle", "HdHotKey", "UiScreenPercent", "UiTrBtnGroup", "UiPip", "UiOverlayPlay", "UiClock", "UiConsole", "UiWaterMark", "UiWaterMarkAction", "UiRightClickMenu", "UiOmSubscribe", "UiUnofficialEndTip", "UiOpenClientBubble", "H5UiSpeedy"],
        e = ["HtmlFrame", "UiTips", "UiControl", "UiLoading", "H5PlayerAd", "UiPlay", "UiIpadLimit", "HdPlayerReport", "HdPlayerHistory", "UiPoster", "UiError", "H5Player", "H5PlayerControl", "UiWaterMark", "UiWaterMarkAction", "H5UiSpeedy"],
        f = ["H5HtmlFrame", "H5Login", "H5UiLoading", "H5UiPlay", "H5UiPoster", "H5MReport", "H5UiLimit", "H5UiSpeedy", "H5UiErrorShow", "H5UILogo", "HdPlayerReport", "H5PlayerAd", "H5Player", "HDSupport", "H5UiControl", "H5PlayerControl", "UiContinuePlay", "H5DownloadBanner", "H5FollowBanner", "H5PauseBanner", "H5FullBanner", "H5TopBanner", "H5RcdBanner", "TinyRcdBanner", "H5LimitBanner", "H5InteractBanner", "H5PageBanner", "H5Downloader"],
        g = ["H5HtmlFrame", "H5Login", "UiPoster", "H5UiLoading", "H5UiErrorShow", "HdPlayerReport", "H5PlayerAd", "H5Player", "H5PlayerControl", "TinyUiPlay", "H5DownloadBanner", "H5FollowBanner", "TinyRcdBanner", "H5Downloader"],
        h = ["HtmlFrame", "v4HdPlayer", "HdAdAdapter", "TxpCreativePlayer", "UiPoster", "v4H5Report", "v4HdPlayerReport", "UiLoading", "UiLoadingWithAD", "HdPlayerHistory", "v4HdPlayerControl", "DownloadMonitor", "v4UiError", "UiTips", "UiControl", "VideoInteractive", "UiTitle", "UiScreenPercent", "UiTrBtnGroup", "UiOverlayPlay", "UiClock", "UiConsole", "UiWaterMark", "UiWaterMarkAction", "UiOmSubscribe", "UiUnofficialEndTip", "UiOpenClientBubble"],
        i = {
            vod: {
                v4: {
                    html5hd: c,
                    nintendo: h,
                    chromehls: d,
                    safarihls: c,
                    ipadh5: e,
                    h5: f,
                    h5qq: ["H5HtmlFrame", "H5QQPlayer"],
                    mp4link: ["H5UiMp4link", "H5PlayerControl"],
                    h5tiny: g,
                    flash: ["HtmlFrame", "FlashPlayer"],
                    // tizen: ["TizenLoadingAd", "TizenTV"],
                    miniplayer: [],
                    onlyV4: ["v4H5Report", "v4HdPlayerControl", "v4HdPlayerReport", "v4HdPlayer", "v4UiControlPlay", "v4UiDefinition", "v4UiError", "v4UiVolume"]
                }
            }, live: {}
        };
    a.exports = i
}, function (a, b, c) {
    var d = c(14), e = /debugevent=1/.test(location.href), f = {};
    d.prototype.on = function (a, b) {
        if (this.eventMap || (this.eventMap = f), !a || "string" != typeof a) return void (window.Txplayer && Txplayer.util.error("on error:evtName \u4e0d\u5408\u6cd5:" + a));
        if (!b || !b.call || b.constructor !== Function) return void (window.Txplayer && Txplayer.util.error("on error:listener must be a function" + a));
        var c = a.split(".");
        f[c[0]] || (f[c[0]] = []);
        var d = "undefined" != typeof c[1] ? c[1] : "_";
        if (f[c[0]].indexOf(d) === -1 && f[c[0]].push(d), this.addListener.call(this, a, b), e) try {
            var g = ["onAdOrderDataReady"];
            g.indexOf(a) > -1 && window.Txplayer && Txplayer.util.log(this.__name + "-on: " + a, arguments.callee.caller)
        } catch (h) {
        }
    }, d.prototype.off = function (a) {
        if (!a) return this;
        if (a.indexOf(".") > -1) return this.removeAllListeners.call(this, a), this;
        for (name in this._events) name !== a ? name && name.indexOf(".") === -1 || a === name.split(".")[0] && this.removeAllListeners.call(this, name) : this.removeAllListeners.call(this, a);
        return this
    }, d.prototype.broadcast = function (a, b) {
        if (!a) return void (window.Txplayer && Txplayer.util.error("broadcast error:evtName\u4e0d\u80fd\u4e3a\u7a7a:" + a));
        if ("string" != typeof a) return this;
        for (var c = [a], d = 0, f = arguments.length; d < f; d++) 0 !== d && c.push(arguments[d]);
        var g = c.slice(0);
        if (a.indexOf(".") > -1) return this.emit.apply(this, c), this;
        var h = this;
        if (this.eventMap && this.eventMap[a]) {
            var i = this.eventMap[a];
            i.length > 0 && i.forEach(function (b) {
                g[0] = a + (0 === b.indexOf("_") ? "" : "." + b), h.emit.apply(h, g)
            })
        }
        if (e) try {
            // var j = ["onAdOrderDataReady"];
            // j.indexOf(a) > -1 && window.Txplayer && Txplayer.util.log(this.__name + "_broadcast: " + a, b, "onAdOrderDataReady" === a ? arguments.callee.caller : "")
        } catch (k) {
        }
        return this
    }, d.prototype.setData = function (a, b) {
        return a ? b && b.call && b.constructor === Function ? void this.addListener.call(this, a, b) : void (window.Txplayer && Txplayer.util.error("on error:listener must be a function" + a)) : void (window.Txplayer && Txplayer.util.error("on error:evtName\u4e0d\u80fd\u4e3a\u7a7a:" + a))
    }, d.prototype.getData = function (a, b) {
        if ("string" != typeof a) return !1;
        for (var c = {
            data: null,
            async: !1
        }, d = [a, b, c], e = 0, f = arguments.length; e < f; e++) e < 2 || d.push(arguments[e]);
        return this.emit.apply(this, d), c.async ? c.async : c.data
    }, a.exports = d
}, function (a, b) {
    function c() {
        this._events = this._events || {}, this._maxListeners = this._maxListeners || void 0
    }

    function d(a) {
        return "function" == typeof a
    }

    function e(a) {
        return "number" == typeof a
    }

    function f(a) {
        return "object" == typeof a && null !== a
    }

    function g(a) {
        return void 0 === a
    }

    a.exports = c, c.EventEmitter = c, c.prototype._events = void 0, c.prototype._maxListeners = void 0, c.defaultMaxListeners = 10, c.prototype.setMaxListeners = function (a) {
        if (!e(a) || a < 0 || isNaN(a)) throw TypeError("n must be a positive number");
        return this._maxListeners = a, this
    }, c.prototype.emit = function (a) {
        var b, c, e, h, i, j;
        if (this._events || (this._events = {}), "error" === a && (!this._events.error || f(this._events.error) && !this._events.error.length)) {
            if (b = arguments[1], b instanceof Error) throw b;
            var k = new Error('Uncaught, unspecified "error" event. (' + b + ")");
            throw k.context = b, k
        }
        if (c = this._events[a], g(c)) return !1;
        if (d(c)) switch (arguments.length) {
            case 1:
                c.call(this);
                break;
            case 2:
                c.call(this, arguments[1]);
                break;
            case 3:
                c.call(this, arguments[1], arguments[2]);
                break;
            default:
                h = Array.prototype.slice.call(arguments, 1), c.apply(this, h)
        } else if (f(c)) for (h = Array.prototype.slice.call(arguments, 1), j = c.slice(), e = j.length, i = 0; i < e; i++) j[i].apply(this, h);
        return !0
    }, c.prototype.addListener = function (a, b) {
        var e;
        if (!d(b)) throw TypeError("listener must be a function");
        return this._events || (this._events = {}), this._events.newListener && this.emit("newListener", a, d(b.listener) ? b.listener : b), this._events[a] ? f(this._events[a]) ? this._events[a].push(b) : this._events[a] = [this._events[a], b] : this._events[a] = b, f(this._events[a]) && !this._events[a].warned && (e = g(this._maxListeners) ? c.defaultMaxListeners : this._maxListeners, e && e > 0 && this._events[a].length > e && (this._events[a].warned = !0, "function" == typeof console.trace)), this
    }, c.prototype.on = c.prototype.addListener, c.prototype.once = function (a, b) {
        function c() {
            this.removeListener(a, c), e || (e = !0, b.apply(this, arguments))
        }

        if (!d(b)) throw TypeError("listener must be a function");
        var e = !1;
        return c.listener = b, this.on(a, c), this
    }, c.prototype.removeListener = function (a, b) {
        var c, e, g, h;
        if (!d(b)) throw TypeError("listener must be a function");
        if (!this._events || !this._events[a]) return this;
        if (c = this._events[a], g = c.length, e = -1, c === b || d(c.listener) && c.listener === b) delete this._events[a], this._events.removeListener && this.emit("removeListener", a, b); else if (f(c)) {
            for (h = g; h-- > 0;) if (c[h] === b || c[h].listener && c[h].listener === b) {
                e = h;
                break
            }
            if (e < 0) return this;
            1 === c.length ? (c.length = 0, delete this._events[a]) : c.splice(e, 1), this._events.removeListener && this.emit("removeListener", a, b)
        }
        return this
    }, c.prototype.removeAllListeners = function (a) {
        var b, c;
        if (!this._events) return this;
        if (!this._events.removeListener) return 0 === arguments.length ? this._events = {} : this._events[a] && delete this._events[a], this;
        if (0 === arguments.length) {
            for (b in this._events) "removeListener" !== b && this.removeAllListeners(b);
            return this.removeAllListeners("removeListener"), this._events = {}, this
        }
        if (c = this._events[a], d(c)) this.removeListener(a, c); else if (c) for (; c.length;) this.removeListener(a, c[c.length - 1]);
        return delete this._events[a], this
    }, c.prototype.listeners = function (a) {
        var b;
        return b = this._events && this._events[a] ? d(this._events[a]) ? [this._events[a]] : this._events[a].slice() : []
    }, c.prototype.listenerCount = function (a) {
        if (this._events) {
            var b = this._events[a];
            if (d(b)) return 1;
            if (b) return b.length
        }
        return 0
    }, c.listenerCount = function (a, b) {
        return a.listenerCount(b)
    }
}, function (a, b) {
    var c = {
        JS_ERROR: "3000",
        FLASH_API_ERROR: "3001",
        CGI_ERROR: "3002",
        VIDEO_PLAY_FAIL: "3003",
        VIDEO_NET_LOADING: "3004",
        VIDEO_FENPIAN_ERR: "3005",
        SEEK_ERROR: "3006",
        JS_LOAD_ERR: "3007",
        AD_JS_LOAD_ERR: "3008"
    };
    a.exports = c
}, function (a, b) {
    function c(a, b) {
        var c = b.config.playerType, d = b.config.videoType, h = {
            version: Txplayer.dataset.ver,
            uid: b.dataset.guid,
            pid: b.dataset.playerId,
            vid: b.dataset.vid,
            player_type: c,
            video_type: "vod" === d ? 1 : 2,
            platform: b.dataset.platform,
            url: document.URL,
            filename: Txplayer.dataset.filename,
            sub_version: Txplayer.dataset.flashVersion,
            error_code: a.code || "",
            error_msg: encodeURIComponent(a.msg) || "",
            error_stack: a.stack || "",
            file_lastupdate: Txplayer.dataset.lastModify,
            qq_openid: e(),
            browser: Txplayer.util.getBrowserBrand(),
            osname: f(),
            osver: Txplayer.util.os.version,
            hc_uin: Txplayer.util.getQQFromCookie(),
            hc_main_login: Txplayer.util.cookie.get("main_login"),
            hc_vuserid: Txplayer.util.cookie.get("vuserid"),
            hc_openid: Txplayer.util.cookie.get("openid"),
            hc_appid: Txplayer.util.cookie.get("appid"),
            hc_ua: Txplayer.util.getReportUA(),
            hh_ref: Txplayer.util.getTopFrameUrl()
        };
        "flash" !== h.player_type && (h.sub_version = g(h.browser)), h.error_msg += "", h.error_stack += "", h.error_msg = h.error_msg.replace(/\$/g, ""), h.error_stack = h.error_stack.replace(/\$/g, ""), Txplayer.util.showInfo("\u9519\u8bef\u4e0a\u62a5", h);
        var i = "//btrace.video.qq.com/kvcollect?BossId=3720&Pwd=1814753491&";
        i += Txplayer.util.param(h), Txplayer.util.report(i)
    }

    function d(a) {
        function b() {
            var a;
            if (!(Txplayer && Txplayer.dataset && Txplayer.dataset._instance)) return a;
            for (var b in Txplayer.dataset._instance) {
                a = Txplayer.dataset._instance[b];
                break
            }
            return a
        }

        if (a && a.filename && a.message && a.filename.indexOf("//vm.gtimg.cn/tencentvideo/txp/js/") !== -1) {
            var c, d, f, g, h, i, j = b();
            try {
                j && j.constructor === Txplayer && (c = j.getUserId(), d = j.getPlayerId(), f = j.getVid(), g = j.getPlayerType(), h = j.getVideoType(), i = j.getPlatform())
            } catch (k) {
            }
            var l = ["line=" + a.lineno, "column=" + a.colno].join(" "), m = {
                version: Txplayer.dataset.ver,
                uid: c,
                pid: d,
                vid: f,
                // player_type: g,
                video_type: "vod" === h ? 1 : 2,
                platform: i,
                url: document.URL,
                filename: a.filename,
                sub_version: Txplayer.dataset.flashVersion,
                error_code: "3000",
                error_msg: a.message,
                error_stack: l,
                file_lastupdate: Txplayer.dataset.lastModify,
                qq_openid: e(),
                hc_uin: Txplayer.util.getQQFromCookie(),
                hc_main_login: Txplayer.util.cookie.get("main_login"),
                hc_vuserid: Txplayer.util.cookie.get("vuserid"),
                hc_openid: Txplayer.util.cookie.get("openid"),
                hc_appid: Txplayer.util.cookie.get("appid"),
                hc_ua: Txplayer.util.getReportUA()
            };
            Txplayer.util.showInfo("\u9519\u8bef\u4e0a\u62a5", m);
            var n = "//btrace.video.qq.com/kvcollect?BossId=3720&Pwd=1814753491&";
            n += Txplayer.util.param(m), Txplayer.util.report(n)
        }
    }

    function e() {
        var a = Txplayer.util.cookie.get("openid") || Txplayer.util.getQQFromCookie();
        return a
    }

    function f() {
        var a = Txplayer.util.os;
        return a.windows ? "windows" : a.mac ? "mac" : a.linux ? "linux" : a.ipad ? "ipad" : a.iphone ? "iphone" : a.android ? "android" : "-1"
    }

    function g(a) {
        var b = "";
        if (a && Txplayer.util.browser && Txplayer.util.browser[a] && Txplayer.util.browser[a].version) return Txplayer.util.browser[a].version;
        for (var c in Txplayer.util.browser) {
            if (b) break;
            Txplayer.util.browser[c].version && (b = Txplayer.util.browser[c].version)
        }
        return b
    }

    function h(a, b) {
        var c = {
            version: Txplayer.dataset.ver,
            uid: a.dataset.guid,
            pid: a.dataset.playerId,
            vid: a.dataset.vid || a.config.vid,
            player_type: b.playType,
            video_type: "vod" === b.videoType ? 1 : 2,
            platform: a.dataset.platform,
            url: document.URL,
            filename: Txplayer.dataset.filename,
            sub_version: Txplayer.dataset.flashVersion,
            _dc: Math.random(),
            browser: Txplayer.util.getBrowserBrand(),
            osname: f(),
            osver: Txplayer.util.os.version,
            hc_uin: Txplayer.util.getQQFromCookie(),
            hc_main_login: Txplayer.util.cookie.get("main_login"),
            hc_vuserid: Txplayer.util.cookie.get("vuserid"),
            hc_openid: Txplayer.util.cookie.get("openid"),
            hc_appid: Txplayer.util.cookie.get("appid"),
            hc_ua: Txplayer.util.getReportUA(),
            hh_ref: Txplayer.util.getTopFrameUrl()
        };
        "flash" !== c.player_type && (c.sub_version = g(c.browser));
        var d = "//btrace.video.qq.com/kvcollect?BossId=3721&Pwd=1636975887&";
        d += Txplayer.util.param(c), !Txplayer.util.isNewsPlugin && Txplayer.util.report(d)
    }

    function i(a, b) {
        var c = b.config.playerType, d = b.config.videoType, e = {
            version: Txplayer.dataset.ver,
            uid: b.dataset.guid,
            pid: b.dataset.playerId,
            vid: b.dataset.vid,
            player_type: c,
            video_type: "vod" === d ? 1 : 2,
            platform: b.dataset.platform,
            usr_action: a.usr_action || "",
            usr_action_detail: a.usr_action_detail || "",
            url: document.URL
        };
        Txplayer.util.showInfo("\u7528\u6237\u884c\u4e3a\u4e0a\u62a5", e);
        var f = "//btrace.video.qq.com/kvcollect?BossId=3717&Pwd=1055758521&";
        f += Txplayer.util.param(e), Txplayer.util.report(f)
    }

    function j(a, b) {
        var c = {
            gid: b.dataset.guid,
            plt: b.dataset.platform,
            uin: Txplayer.util.getQQFromCookie(),
            vid: b.dataset.vid,
            cts: +new Date,
            sdt: b.dataset.stdfrom,
            fne: a.filename,
            dip: a.cdnIp,
            cdn: a.cdnId,
            vky: a.vkey || ""
        }, d = "//btrace.video.qq.com/kvcollect?BossId=2594&Pwd=0&";
        d += Txplayer.util.param(c), !Txplayer.util.isNewsPlugin() && Txplayer.util.report(d)
    }

    function k(a, b) {
        var c = {
            url: encodeURIComponent(Txplayer.util.getTopFrameUrl()),
            ver: Txplayer.dataset.ver,
            ua: Txplayer.util.getReportUA(),
            iSta: "3537",
            val: 1,
            int1: Txplayer.util.getDeviceCode(),
            int2: Txplayer.util.getPlatformCode(),
            int3: 0,
            int4: 0,
            str1: "",
            str2: Txplayer.dataset.filename,
            str8: Txplayer.util.getUrlParam("mmuin"),
            __tm: Txplayer.util.dateFormat("yyyy-M-d h:m:s:S"),
            hc_openid: Txplayer.util.cookie.get("openid")
        };
        c.vid = a.vid, c.int6 = a.promotionId, c.str4 = a.appCase, c.int5 = a.reportStep, c.str5 = a.str5 || "", c.str6 = Txplayer.util.getUrlParam("openid", Txplayer.util.getTopFrameUrl()), c.str6 = c.str6 || "", c.str3 = a.reportFrom || "", c.str7 = a.guid || "", Txplayer.util.showInfo("AppBanner\u4e0a\u62a5", c);
        var d = "//btrace.video.qq.com/kvcollect?BossId=4046&Pwd=176231195&_dc=" + Math.random();
        d += "&" + Txplayer.util.param(c), Txplayer.util.isNewsPlugin() && location.href.indexOf("newsdebug=1") == -1 ? Txplayer.util.getChance(10) && Txplayer.util.report(d) : Txplayer.util.report(d)
    }

    function l(a, b) {
        a = a || {};
        var c = b.dataset.txplayerAuth.raw(), d = {
            version: Txplayer.dataset.ver,
            pid: b.dataset.guid,
            vid: b.dataset.vid,
            cid: b.dataset.cid,
            level: b.dataset.reportVideoLevel,
            val: b.dataset.userRealPlayedTime,
            bi: b.dataset.videoDuration,
            bt: b.dataset.duration,
            vt: b.dataset.reportCDNChannelId,
            step: 5,
            val1: a.isend ? 1 : 2,
            platform: 11,
            url: document.URL,
            cpay: b.dataset.isNeedPay ? 1 : 0,
            tpay: b.dataset.userPayStatus,
            ctime: Txplayer.util.dateFormat("yyyy-MM-dd hh:mm S"),
            ptime: b.dataset.currentTime,
            type: b.dataset.reportBusinessType,
            cmid: b.dataset.guid,
            ptag: Txplayer.util.getPTAG(),
            isvip: -1,
            tpid: b.dataset.videoCategoryId,
            login_type: c.main_login,
            uin: Txplayer.util.getQQFromCookie(),
            vuserid: c.vuserid || Txplayer.util.cookie.get("vuserid"),
            abi: b.dataset.userTotalPlayedTime
        };
        b.config && "function" === Txplayer.$.type(b.config.getUserType) && (d.isvip = 2 == b.config.getUserType() ? 1 : 0);
        var e = "//btrace.video.qq.com/kvcollect?BossId=3893&Pwd=1920472984&";
        e += Txplayer.util.param(d), Txplayer.util.showInfo("\u6210\u957f\u4f53\u7cfb\u65f6\u957f\u4e0a\u62a5", d), Txplayer.util.report(e)
    }

    function m(a, b) {
        a = a || {};
        var c = (Txplayer.util.getLoginID(), b.dataset.platform, {flowid: b.dataset.flowid}), d = {
            name: a.name || "",
            ptime: b.dataset.currentTime || 0,
            stime: a.requestStartTime,
            etime: +new Date,
            url: a.url || ""
        }, e = "4564";
        a.hasOwnProperty("bossid") && (e = a.bossid), "4501" == e && "50" == a.step && (d = {
            reason: "",
            code: a.code || "",
            etime: +new Date
        }), c = Txplayer.$.extend(c, {data: JSON.stringify(d)}), c.step = a.step, a.hasOwnProperty("step") || (c.step = 61);
        var f = "//btrace.video.qq.com/kvcollect?BossId=" + e + "&Pwd=213967996&";
        f += Txplayer.$.param(c), Txplayer.util.fetch({url: f, credentials: "include"})
    }

    function n() {
        var a = {name: "", ver: ""};
        if (Txplayer.util.browser) {
            var b = Txplayer.util.browser;
            for (var c in b) if (b.hasOwnProperty(c)) {
                var d = b[c];
                if (d) {
                    a.name = c, a.ver = d.version;
                    break
                }
            }
        }
        return a
    }

    function o() {
        var a = "", b = location.hostname || "", c = location.href;
        try {
            Txplayer.util.inNewIframe() ? a = "iframe" : (a = b.replace(/\./gi, "_"), /http(s?):\/\/v.qq.com\/x\/(cover|page|)/.test(c) && (a += "_play"))
        } catch (d) {
        }
        return a
    }

    function p(a, b) {
        // if ("LD" === a.adtype) {
        //     var c = a.ext_info || "";
        //     c += ";existblock:" + (TxpCreativePlayer && TxpCreativePlayer.adBlockEnabled ? 1 : 0);
        //     var d = "", e = a.step_code;
        //     if (a.src) try {
        //         if (0 == a.step_code) d = a.src; else {
        //             var f = "undefined" != typeof window.btoa ? btoa(a.src) : a.src;
        //             d = f
        //         }
        //         var g = Txplayer.util.getDomainOfURL(a.src);
        //         c += ";cdn:" + g
        //     } catch (h) {
        //     }
        //     if (!(a.step_duration < 0)) {
        //         var i = n(), j = {
        //             flowid: b.dataset.flowid,
        //             vid: b.dataset.vid,
        //             type: a.adtype || "",
        //             step: a.step || "",
        //             step_duration: a.step_duration || "",
        //             step_code: e,
        //             step_index: a.step_index,
        //             version: window.TxpCreativePlayer && window.TxpCreativePlayer.version || a.version,
        //             platform: 1,
        //             firstview_duration: a.firstview_duration,
        //             client_version: "",
        //             ext_info: c,
        //             req_from: o(),
        //             play_type: Txplayer.util.getVideoType(),
        //             page_first_load: b.dataset.hasCallSetVid ? 0 : 1,
        //             v_src: d,
        //             url: document.URL,
        //             step_dcode: a.step_dcode || 0,
        //             browser: i.name,
        //             browser_ver: i.ver
        //         }, k = "//btrace.video.qq.com/kvcollect?BossId=6072&Pwd=1133018508&";
        //         k += Txplayer.$.param(j), 1 == Txplayer.util.getUrlParam("debugadreport") ? window.console && window.console.log && window.console.log(j) : Txplayer.imgRpt ? Txplayer.util.requestViaImage(k) : Txplayer.util.fetch({
        //             url: k,
        //             credentials: "include"
        //         })
        //     }
        // }
    }

    function q(a) {
        a.msg.on("reportError", function (b) {
            c(b, a)
        }), a.msg.on("reportUsrAction", function (b) {
            i(b, a)
        }), a.msg.on("reportGetinfo", function (b) {
            j(b, a)
        }), a.msg.on("reportAppBanner", function (b) {
            k(b, a)
        }), a.msg.on("reportLoginUserPlayTime", function (b) {
            l(b, a)
        }), a.msg.on("reportPluginLoadError", function (b) {
            m(b, a)
        }), a.msg.on("reportAdInfo", function (b) {
            p(b, a)
        })
    }

    window.addEventListener ? window.addEventListener("error", d) : window.attachEvent && window.attachEvent("onerror", d), a.exports = {
        reportTxplayer: h,
        reportError: c,
        reportAppBanner: k,
        exportsReportApi: q
    }
}, function (a, b) {
    var c = {};
    c.defaultMsg = c[10001] = c[50] = c[68] = c[71] = c[73] = c[74] = c[76] = c[77] = c[445] = c[444] = "\u554a\u54e6\uff0c\u6ca1\u80fd\u627e\u5230\u4f60\u8981\u7684\u8282\u76ee\u4fe1\u606f~", c[51] = c[52] = c[64] = c[61] = c[62] = c[63] = c[65] = c[66] = c[69] = c[81] = c[82] = c[84] = c[86] = c["80.10"] = c[94] = "\u554a\u54e6\uff0c\u672c\u6765\u5728\u8fd9\u513f\u7684\u89c6\u9891\u4e0d\u89c1\u4e86~", c[80] = c[83] = "\u554a\u54e6\uff0c\u7248\u6743\u539f\u56e0\uff0c\u8be5\u89c6\u9891\u6682\u65f6\u65e0\u6cd5\u64ad\u653e~", c[97] = "\u8bf7\u4f7f\u7528\u817e\u8baf\u89c6\u9891\u624b\u673a\u7aef\u6700\u65b0\u7248\u672c\u89e3\u9501\u89c2\u770b\u672c\u5185\u5bb9", c.getPlatformErrorCode = function (a, b, c) {
        var d = "-", e = "-", f = "-";
        return c = c || "00", d = Txplayer.util.os.mac ? "62" : Txplayer.util.os.windows ? "61" : "64", "getinfo" === a ? e = "101" : "getkey" === a ? e = "102" : "ad" === a ? e = "215" : "player" === a && (e = "200"), "neterror" === b ? f = "140" : "cgiInnerError" === b ? (f = "13", c && (c = "" + c), 2 === c.length && (c = "0" + c)) : "h5video" === b ? f = "111" : "aderror" === b && (f = "150"), "aderror" !== b || Txplayer.util.os.windows || Txplayer.util.os.mac || (f = "151"), d + e + "." + f + c
    }, a.exports = c
}, function (a, b) {
    a.exports = "1.0.145"
}, function (a, b, c) {
    function d() {
        this.data = null
    }

    var e = c(20), f = "wx", g = "qq";
    d.prototype.setData = function (a) {
        // this.data = a
    }, d.prototype.getInfo = function (a) {
        // var b = "", c = this.raw();
        // if (a && !("qq" != c.main_login || c.access_token && c.vuserid)) return "";
        // try {
        //     b = JSON.stringify(c)
        // } catch (d) {
        // }
        // return b
    }, d.prototype.ad = function () {
        // for (var a = [["opid", "openid"], ["appid", "appid"], ["atkn", "access_token"], ["uid", "vuserid"], ["tkn", "vusession"]], b = this.raw(), c = {lt: b.main_login || ""}, d = 0, e = a.length; d < e; d++) {
        //     var f = a[d];
        //     c[f[0]] = b[f[1]] || ""
        // }
        return null
    }, d.prototype.adUrlString = function () {
        // var a = this.ad(), b = [];
        // for (var c in a) b.push(c + "=" + a[c]);
        return null
    }, d.prototype.raw = function () {
        if (this.data) return this.data;
        var a = {main_login: "", openid: "", appid: "", access_token: "", vuserid: "", vusession: ""};
        try {
            var b = e.get("main_login");
            if (b === f || b === g) {
                a.main_login = b;
                for (var c = ["openid", "appid", "access_token", "vuserid", "vusession"], d = 0, h = c.length; d < h; d++) {
                    var i = c[d];
                    b === g && (i = "vqq_" + i), a[c[d]] = e.get(i)
                }
            }
        } catch (j) {
        }
        return a
    }, a.exports = d
}, function (a, b) {
    a.exports = {
        set: function (a, b, c, d, e) {
            if (e) {
                var f = new Date, g = new Date;
                g.setTime(f.getTime() + 36e5 * e)
            }
            return document.cookie = a + "=" + b + "; " + (e ? "expires=" + g.toGMTString() + "; " : "") + (d ? "path=" + d + "; " : "path=/; ") + (c ? "domain=" + c + ";" : "domain=" + window.location.host + ";"), !0
        }, get: function (a) {
            var b = new RegExp("(?:^|;+|\\s+)" + a + "=([^;]*)"), c = document.cookie.match(b);
            return c ? c[1] : ""
        }, del: function (a, b, c) {
            var d = new Date;
            d.setTime(d.getTime() - 1), document.cookie = a + "=; expires=" + d.toGMTString() + ";" + (c ? "path=" + c + "; " : "path=/; ") + (b ? "domain=" + b + ";" : "domain=" + window.location.host + ";")
        }
    }
}, function (a, b) {
    Txplayer.hashMaps = {
        "barrage.js": "barrage.7289b6.js",
        "barragefloat.js": "barragefloat.9086cc.js",
        "downloadmonitor.js": "downloadmonitor.438f48.js",
        "endrecommend.js": "endrecommend.cb2ac1.js",
        "flashplayer.js": "flashplayer.615931.js",
        "h5defn.js": "h5defn.dcbbaa.js",
        "h5downloadbanner.js": "h5downloadbanner.f5f8a1.js",
        "h5downloader.js": "h5downloader.3e9c73.js",
        "h5followbanner.js": "h5followbanner.6dc36c.js",
        "h5fullbanner.js": "h5fullbanner.c93cc3.js",
        "h5hdbanner.js": "h5hdbanner.e4d02c.js",
        "h5htmlframe.js": "h5htmlframe.b2235d.js",
        "h5interactbanner.js": "h5interactbanner.a0db79.js",
        "h5limitbanner.js": "h5limitbanner.a1717f.js",
        "h5login.js": "h5login.abd929.js",
        "h5mreport.js": "h5mreport.8d6264.js",
        "h5pagebanner.js": "h5pagebanner.5981f7.js",
        "h5pausebanner.js": "h5pausebanner.c76a87.js",
        "h5playbackrate.js": "h5playbackrate.c40cff.js",
        "h5player.js": "h5player.a039b7.js",
        "h5playerad.js": "h5playerad.322ad9.js",
        "h5playercontrol.js": "h5playercontrol.d06c17.js",
        "h5qqplayer.js": "h5qqplayer.20aa19.js",
        "h5rcdbanner.js": "h5rcdbanner.c094a6.js",
        "h5report.js": "h5report.03edde.js",
        "h5topbanner.js": "h5topbanner.61a0eb.js",
        "h5uicontrol.js": "h5uicontrol.4a4272.js",
        "h5uidefnloading.js": "h5uidefnloading.6be277.js",
        "h5uierrorshow.js": "h5uierrorshow.2cf2af.js",
        "h5uifullscreen.js": "h5uifullscreen.7b4d39.js",
        "h5uilimit.js": "h5uilimit.1dec93.js",
        "h5uiloading.js": "h5uiloading.3f2eff.js",
        "h5uilogo.js": "h5uilogo.0aa88b.js",
        "h5uimp4link.js": "h5uimp4link.a9bf37.js",
        "h5uiplay.js": "h5uiplay.da3c70.js",
        "h5uiposter.js": "h5uiposter.41b8f0.js",
        "h5uiprogress.js": "h5uiprogress.3eb17c.js",
        "h5uispeedy.js": "h5uispeedy.d1d1fa.js",
        // "hdadadapter.js": "hdadadapter.4aacd6.js",
        "hdhotkey.js": "hdhotkey.a04403.js",
        "hdplayer.js": "hdplayer.8dd0c3.js",
        "hdplayercontrol.js": "hdplayercontrol.98aa16.js",
        "hdplayerhistory.js": "hdplayerhistory.7d5e73.js",
        "hdplayerreport.js": "hdplayerreport.29497c.js",
        "hdsupport.js": "hdsupport.ede52f.js",
        "hlshelper.js": "hlshelper.e0c1ea.js",
        "hlshelperp2p.js": "hlshelperp2p.aea7c7.js",
        "hlshelperp2padaptive.js": "hlshelperp2padaptive.cdf396.js",
        "hlshelperp2pdebug.js": "hlshelperp2pdebug.237066.js",
        "hlshelperp2pencrypt.js": "hlshelperp2pencrypt.3cbed1.js",
        "htmlframe.js": "htmlframe.610df7.js",
        "playerhistoryreport.js": "playerhistoryreport.18c24d.js",
        "tinyrcdbanner.js": "tinyrcdbanner.ccc1be.js",
        "tinyuiplay.js": "tinyuiplay.da030c.js",
        "uibarragebtn.js": "uibarragebtn.24121b.js",
        "uibrowserfullscreen.js": "uibrowserfullscreen.1ba321.js",
        "uibuyplaypoint.js": "uibuyplaypoint.0c0b75.js",
        "uiclock.js": "uiclock.298b67.js",
        "uiconsole.js": "uiconsole.4e11d3.js",
        "uicontinueplay.js": "uicontinueplay.90b6ea.js",
        "uicontrol.js": "uicontrol.9c3b60.js",
        "uicontrolplay.js": "uicontrolplay.cc6c3f.js",
        "uidefinition.js": "uidefinition.162f27.js",
        "uidialog.js": "uidialog.4e3b70.js",
        "uiduration.js": "uiduration.e2db37.js",
        "uierror.js": "uierror.13c45c.js",
        "uiipadlimit.js": "uiipadlimit.b409ed.js",
        "uilanguage.js": "uilanguage.e97c73.js",
        "uiloading.js": "uiloading.914c88.js",
        "uiloadingwithad.js": "uiloadingwithad.9b3274.js",
        "uilogo.js": "uilogo.2aa930.js",
        "uiloopplay.js": "uiloopplay.020286.js",
        "uinormalpoint.js": "uinormalpoint.dd890a.js",
        "uiomsubscribe.js": "uiomsubscribe.101685.js",
        "uionlywatch.js": "uionlywatch.0fec4c.js",
        "uiopenclientbubble.js": "uiopenclientbubble.b9df7a.js",
        "uioverlayplay.js": "uioverlayplay.c34923.js",
        "uipip.js": "uipip.8d278e.js",
        "uiplay.js": "uiplay.7dd075.js",
        "uiplaynext.js": "uiplaynext.7f8ea6.js",
        "uiposter.js": "uiposter.dbecc5.js",
        "uipreview.js": "uipreview.11be9c.js",
        // "uipreviewad.js": "uipreviewad.ef6ca5.js",
        "uipreviewlist.js": "uipreviewlist.90d065.js",
        "uiprogress.js": "uiprogress.1c8ba2.js",
        "uirightclickmenu.js": "uirightclickmenu.013419.js",
        "uiscreenpercent.js": "uiscreenpercent.8a3073.js",
        "uisettings.js": "uisettings.6897fd.js",
        "uisettingsII.js": "uisettingsII.51f49a.js",
        "uishadow.js": "uishadow.935018.js",
        "uishowtime.js": "uishowtime.0e569a.js",
        "uispeed.js": "uispeed.3ec799.js",
        "uitips.js": "uitips.5389af.js",
        "uititle.js": "uititle.da913e.js",
        "uitogglesidebar.js": "uitogglesidebar.97338d.js",
        "uitrbtngroup.js": "uitrbtngroup.3bc34b.js",
        "uiunofficialendtip.js": "uiunofficialendtip.4cf359.js",
        "uivolume.js": "uivolume.891efa.js",
        "uiwatermark.js": "uiwatermark.8cbfa8.js",
        "uiwatermarkaction.js": "uiwatermarkaction.be3814.js",
        "uiwindowfullscreen.js": "uiwindowfullscreen.1d5ffc.js",
        "v4h5report.js": "v4h5report.99a36e.js",
        "v4hdplayer.js": "v4hdplayer.95a573.js",
        "v4hdplayercontrol.js": "v4hdplayercontrol.df2643.js",
        "v4hdplayerreport.js": "v4hdplayerreport.2f151a.js",
        "v4uicontrolplay.js": "v4uicontrolplay.51c9c5.js",
        "v4uidefinition.js": "v4uidefinition.6a963a.js",
        "v4uierror.js": "v4uierror.1cae46.js",
        "v4uivolume.js": "v4uivolume.1d4a8c.js",
        "videointeractive.js": "videointeractive.f13254.js"
    }
}]), function () {
    if (window.Txplayer && Txplayer.dataset) {
        var a = {filename: "txplayer.js", lastModify: "2020-5-29 18:50:31", ts: "1590749431911", ver: "3.3.758"};
        for (var b in a) Txplayer.dataset[b] = a[b]
    }
}();
