function utf16to8(str) {
    var out, i, len, c
    out = ''
    len = str.length
    for (i = 0; i < len; i++) {
        c = str.charCodeAt(i)
        if ((c >= 0x0001) && (c <= 0x007F)) {
            out += str.charAt(i)
        } else if (c > 0x07FF) {
            out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F))
            out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F))
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F))
        } else {
            out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F))
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F))
        }
    }
    return out
}

(function (r) {

    r.fn.qrcode = function (h) {
        var s

        function u(a) {
            this.mode = s
            this.data = a
        }

        function o(a, c) {
            this.typeNumber = a
            this.errorCorrectLevel = c
            this.modules = null
            this.moduleCount = 0
            this.dataCache = null
            this.dataList = []
        }

        function q(a, c) {
            if (void 0 == a.length) throw Error(a.length + '/' + c)
            for (var d = 0; d < a.length && a[d] == 0;) d++
            this.num = Array(a.length - d + c)
            for (var b = 0; b < a.length - d; b++) this.num[b] = a[b + d]
        }

        function p(a, c) {
            this.totalCount = a
            this.dataCount = c
        }

        function t() {
            this.buffer = []
            this.length = 0
        }

        u.prototype = {
            getLength: function () {
                return this.data.length
            },
            write: function (a) {
                for (var c = 0; c < this.data.length; c++) a.put(this.data.charCodeAt(c), 8)
            }
        }
        o.prototype = {
            addData: function (a) {
                this.dataList.push(new u(a))
                this.dataCache = null
            },
            isDark: function (a, c) {
                if (a < 0 || this.moduleCount <= a || c < 0 || this.moduleCount <= c) throw Error(a + ',' + c)
                return this.modules[a][c]
            },
            getModuleCount: function () {
                return this.moduleCount
            },
            make: function () {
                if (this.typeNumber < 1) {
                    for (var a = 1,
                             a = 1; a < 40; a++) {
                        for (var c = p.getRSBlocks(a, this.errorCorrectLevel), d = new t(), b = 0, e = 0; e < c.length; e++) b += c[e].dataCount
                        for (e = 0; e < this.dataList.length; e++) {
                            c = this.dataList[e],
                                d.put(c.mode, 4),
                                d.put(c.getLength(), j.getLengthInBits(c.mode, a)),
                                c.write(d)
                        }
                        if (d.getLengthInBits() <= 8 * b) break
                    }
                    this.typeNumber = a
                }
                this.makeImpl(!1, this.getBestMaskPattern())
            },
            makeImpl: function (a, c) {
                this.moduleCount = 4 * this.typeNumber + 17
                this.modules = Array(this.moduleCount)
                for (var d = 0; d < this.moduleCount; d++) {
                    this.modules[d] = Array(this.moduleCount)
                    for (var b = 0; b < this.moduleCount; b++) this.modules[d][b] = null
                }
                this.setupPositionProbePattern(0, 0)
                this.setupPositionProbePattern(this.moduleCount - 7, 0)
                this.setupPositionProbePattern(0, this.moduleCount - 7)
                this.setupPositionAdjustPattern()
                this.setupTimingPattern()
                this.setupTypeInfo(a, c)
                this.typeNumber >= 7 && this.setupTypeNumber(a)
                this.dataCache == null && (this.dataCache = o.createData(this.typeNumber, this.errorCorrectLevel, this.dataList))
                this.mapData(this.dataCache, c)
            },
            setupPositionProbePattern: function (a, c) {
                for (var d = -1; d <= 7; d++) {
                    if (!(a + d <= -1 || this.moduleCount <= a + d)) {
                        for (var b = -1; b <= 7; b++) c + b <= -1 || this.moduleCount <= c + b || (this.modules[a + d][c + b] = d >= 0 && d <= 6 && (b == 0 || b == 6) || b >= 0 && b <= 6 && (d == 0 || d == 6) || d >= 2 && d <= 4 && b >= 2 && b <= 4 ? !0 : !1)
                    }
                }
            },
            getBestMaskPattern: function () {
                for (var a = 0,
                         c = 0,
                         d = 0; d < 8; d++) {
                    this.makeImpl(!0, d)
                    var b = j.getLostPoint(this)
                    if (d == 0 || a > b) {
                        a = b,
                            c = d
                    }
                }
                return c
            },
            createMovieClip: function (a, c, d) {
                a = a.createEmptyMovieClip(c, d)
                this.make()
                for (c = 0; c < this.modules.length; c++) {
                    for (var d = 1 * c,
                             b = 0; b < this.modules[c].length; b++) {
                        var e = 1 * b
                        this.modules[c][b] && (a.beginFill(0, 100), a.moveTo(e, d), a.lineTo(e + 1, d), a.lineTo(e + 1, d + 1), a.lineTo(e, d + 1), a.endFill())
                    }
                }
                return a
            },
            setupTimingPattern: function () {
                for (var a = 8; a < this.moduleCount - 8; a++) this.modules[a][6] == null && (this.modules[a][6] = a % 2 == 0)
                for (a = 8; a < this.moduleCount - 8; a++) this.modules[6][a] == null && (this.modules[6][a] = a % 2 == 0)
            },
            setupPositionAdjustPattern: function () {
                for (var a = j.getPatternPosition(this.typeNumber), c = 0; c < a.length; c++) {
                    for (var d = 0; d < a.length; d++) {
                        var b = a[c]
                        var e = a[d]
                        if (this.modules[b][e] == null) {
                            for (var f = -2; f <= 2; f++) {
                                for (var i = -2; i <= 2; i++) this.modules[b + f][e + i] = f == -2 || f == 2 || i == -2 || i == 2 || f == 0 && i == 0 ? !0 : !1
                            }
                        }
                    }
                }
            },
            setupTypeNumber: function (a) {
                for (var c = j.getBCHTypeNumber(this.typeNumber), d = 0; d < 18; d++) {
                    var b = !a && (c >> d & 1) == 1
                    this.modules[Math.floor(d / 3)][d % 3 + this.moduleCount - 8 - 3] = b
                }
                for (d = 0; d < 18; d++) {
                    b = !a && (c >> d & 1) == 1,
                        this.modules[d % 3 + this.moduleCount - 8 - 3][Math.floor(d / 3)] = b
                }
            },
            setupTypeInfo: function (a, c) {
                for (var d = j.getBCHTypeInfo(this.errorCorrectLevel << 3 | c), b = 0; b < 15; b++) {
                    var e = !a && (d >> b & 1) == 1
                    b < 6 ? this.modules[b][8] = e : b < 8 ? this.modules[b + 1][8] = e : this.modules[this.moduleCount - 15 + b][8] = e
                }
                for (b = 0; b < 15; b++) {
                    e = !a && (d >> b & 1) == 1,
                        b < 8 ? this.modules[8][this.moduleCount - b - 1] = e : b < 9 ? this.modules[8][15 - b - 1 + 1] = e : this.modules[8][15 - b - 1] = e
                }
                this.modules[this.moduleCount - 8][8] = !a
            },
            mapData: function (a, c) {
                for (var d = -1,
                         b = this.moduleCount - 1,
                         e = 7,
                         f = 0,
                         i = this.moduleCount - 1; i > 0; i -= 2) {
                    for (i == 6 && i--; ;) {
                        for (var g = 0; g < 2; g++) {
                            if (this.modules[b][i - g] == null) {
                                var n = !1
                                f < a.length && (n = (a[f] >>> e & 1) == 1)
                                j.getMask(c, b, i - g) && (n = !n)
                                this.modules[b][i - g] = n
                                e--;
                                e == -1 && (f++, e = 7)
                            }
                        }
                        b += d
                        if (b < 0 || this.moduleCount <= b) {
                            b -= d
                            d = -d
                            break
                        }
                    }
                }
            }
        }
        o.PAD0 = 236
        o.PAD1 = 17
        o.createData = function (a, c, d) {
            for (var c = p.getRSBlocks(a, c), b = new t(), e = 0; e < d.length; e++) {
                var f = d[e]
                b.put(f.mode, 4)
                b.put(f.getLength(), j.getLengthInBits(f.mode, a))
                f.write(b)
            }
            for (e = a = 0; e < c.length; e++) a += c[e].dataCount
            if (b.getLengthInBits() > 8 * a) throw Error('code length overflow. (' + b.getLengthInBits() + '>' + 8 * a + ')')
            for (b.getLengthInBits() + 4 <= 8 * a && b.put(0, 4); b.getLengthInBits() % 8 != 0;) b.putBit(!1)
            for (; !(b.getLengthInBits() >= 8 * a);) {
                b.put(o.PAD0, 8)
                if (b.getLengthInBits() >= 8 * a) break
                b.put(o.PAD1, 8)
            }
            return o.createBytes(b, c)
        }
        o.createBytes = function (a, c) {
            for (var d = 0,
                     b = 0,
                     e = 0,
                     f = Array(c.length), i = Array(c.length), g = 0; g < c.length; g++) {
                var n = c[g].dataCount
                var h = c[g].totalCount - n
                var b = Math.max(b, n)
                var e = Math.max(e, h)
                f[g] = Array(n)
                for (var k = 0; k < f[g].length; k++) f[g][k] = 255 & a.buffer[k + d]
                d += n
                k = j.getErrorCorrectPolynomial(h)
                n = (new q(f[g], k.getLength() - 1)).mod(k)
                i[g] = Array(k.getLength() - 1)
                for (k = 0; k < i[g].length; k++) {
                    h = k + n.getLength() - i[g].length,
                        i[g][k] = h >= 0 ? n.get(h) : 0
                }
            }
            for (k = g = 0; k < c.length; k++) g += c[k].totalCount
            d = Array(g)
            for (k = n = 0; k < b; k++) {
                for (g = 0; g < c.length; g++) k < f[g].length && (d[n++] = f[g][k])
            }
            for (k = 0; k < e; k++) {
                for (g = 0; g < c.length; g++) k < i[g].length && (d[n++] = i[g][k])
            }
            return d
        }
        s = 4
        for (var j = {
                PATTERN_POSITION_TABLE: [
                    [],
                    [6, 18],
                    [6, 22],
                    [6, 26],
                    [6, 30],
                    [6, 34],
                    [6, 22, 38],
                    [6, 24, 42],
                    [6, 26, 46],
                    [6, 28, 50],
                    [6, 30, 54],
                    [6, 32, 58],
                    [6, 34, 62],
                    [6, 26, 46, 66],
                    [6, 26, 48, 70],
                    [6, 26, 50, 74],
                    [6, 30, 54, 78],
                    [6, 30, 56, 82],
                    [6, 30, 58, 86],
                    [6, 34, 62, 90],
                    [6, 28, 50, 72, 94],
                    [6, 26, 50, 74, 98],
                    [6, 30, 54, 78, 102],
                    [6, 28, 54, 80, 106],
                    [6, 32, 58, 84, 110],
                    [6, 30, 58, 86, 114],
                    [6, 34, 62, 90, 118],
                    [6, 26, 50, 74, 98, 122],
                    [6, 30, 54, 78, 102, 126],
                    [6, 26, 52, 78, 104, 130],
                    [6, 30, 56, 82, 108, 134],
                    [6, 34, 60, 86, 112, 138],
                    [6, 30, 58, 86, 114, 142],
                    [6, 34, 62, 90, 118, 146],
                    [6, 30, 54, 78, 102, 126, 150],
                    [6, 24, 50, 76, 102, 128, 154],
                    [6, 28, 54, 80, 106, 132, 158],
                    [6, 32, 58, 84, 110, 136, 162],
                    [6, 26, 54, 82, 110, 138, 166],
                    [6, 30, 58, 86, 114, 142, 170]
                ],
                G15: 1335,
                G18: 7973,
                G15_MASK: 21522,
                getBCHTypeInfo: function (a) {
                    for (var c = a << 10; j.getBCHDigit(c) - j.getBCHDigit(j.G15) >= 0;) c ^= j.G15 << j.getBCHDigit(c) - j.getBCHDigit(j.G15)
                    return (a << 10 | c) ^ j.G15_MASK
                },
                getBCHTypeNumber: function (a) {
                    for (var c = a << 12; j.getBCHDigit(c) - j.getBCHDigit(j.G18) >= 0;) c ^= j.G18 << j.getBCHDigit(c) - j.getBCHDigit(j.G18)
                    return a << 12 | c
                },
                getBCHDigit: function (a) {
                    for (var c = 0; a != 0;) {
                        c++,
                            a >>>= 1
                    }
                    return c
                },
                getPatternPosition: function (a) {
                    return j.PATTERN_POSITION_TABLE[a - 1]
                },
                getMask: function (a, c, d) {
                    switch (a) {
                        case 0:
                            return (c + d) % 2 == 0
                        case 1:
                            return c % 2 == 0
                        case 2:
                            return d % 3 == 0
                        case 3:
                            return (c + d) % 3 == 0
                        case 4:
                            return (Math.floor(c / 2) + Math.floor(d / 3)) % 2 == 0
                        case 5:
                            return c * d % 2 + c * d % 3 == 0
                        case 6:
                            return (c * d % 2 + c * d % 3) % 2 == 0
                        case 7:
                            return (c * d % 3 + (c + d) % 2) % 2 == 0
                        default:
                            throw Error('bad maskPattern:' + a)
                    }
                },
                getErrorCorrectPolynomial: function (a) {
                    for (var c = new q([1], 0), d = 0; d < a; d++) c = c.multiply(new q([1, l.gexp(d)], 0))
                    return c
                },
                getLengthInBits: function (a, c) {
                    if (c >= 1 && c < 10) {
                        switch (a) {
                            case 1:
                                return 10
                            case 2:
                                return 9
                            case s:
                                return 8
                            case 8:
                                return 8
                            default:
                                throw Error('mode:' + a)
                        }
                    } else if (c < 27) {
                        switch (a) {
                            case 1:
                                return 12
                            case 2:
                                return 11
                            case s:
                                return 16
                            case 8:
                                return 10
                            default:
                                throw Error('mode:' + a)
                        }
                    } else if (c < 41) {
                        switch (a) {
                            case 1:
                                return 14
                            case 2:
                                return 13
                            case s:
                                return 16
                            case 8:
                                return 12
                            default:
                                throw Error('mode:' + a)
                        }
                    } else throw Error('type:' + c)
                },
                getLostPoint: function (a) {
                    for (var c = a.getModuleCount(), d = 0, b = 0; b < c; b++) {
                        for (var e = 0; e < c; e++) {
                            for (var f = 0,
                                     i = a.isDark(b, e), g = -1; g <= 1; g++) {
                                if (!(b + g < 0 || c <= b + g)) {
                                    for (var h = -1; h <= 1; h++) e + h < 0 || c <= e + h || g == 0 && h == 0 || i == a.isDark(b + g, e + h) && f++
                                }
                            }
                            f > 5 && (d += 3 + f - 5)
                        }
                    }
                    for (b = 0; b < c - 1; b++) {
                        for (e = 0; e < c - 1; e++) {
                            if (f = 0, a.isDark(b, e) && f++, a.isDark(b + 1, e) && f++, a.isDark(b, e + 1) && f++, a.isDark(b + 1, e + 1) && f++, f == 0 || f == 4) d += 3
                        }
                    }
                    for (b = 0; b < c; b++) {
                        for (e = 0; e < c - 6; e++) a.isDark(b, e) && !a.isDark(b, e + 1) && a.isDark(b, e + 2) && a.isDark(b, e + 3) && a.isDark(b, e + 4) && !a.isDark(b, e + 5) && a.isDark(b, e + 6) && (d += 40)
                    }
                    for (e = 0; e < c; e++) {
                        for (b = 0; b < c - 6; b++) a.isDark(b, e) && !a.isDark(b + 1, e) && a.isDark(b + 2, e) && a.isDark(b + 3, e) && a.isDark(b + 4, e) && !a.isDark(b + 5, e) && a.isDark(b + 6, e) && (d += 40)
                    }
                    for (e = f = 0; e < c; e++) {
                        for (b = 0; b < c; b++) a.isDark(b, e) && f++
                    }
                    a = Math.abs(100 * f / c / c - 50) / 5
                    return d + 10 * a
                }
            },
                 l = {
                     glog: function (a) {
                         if (a < 1) throw Error('glog(' + a + ')')
                         return l.LOG_TABLE[a]
                     },
                     gexp: function (a) {
                         for (; a < 0;) a += 255
                         for (; a >= 256;) a -= 255
                         return l.EXP_TABLE[a]
                     },
                     EXP_TABLE: Array(256),
                     LOG_TABLE: Array(256)
                 },
                 m = 0; m < 8; m++) l.EXP_TABLE[m] = 1 << m
        for (m = 8; m < 256; m++) l.EXP_TABLE[m] = l.EXP_TABLE[m - 4] ^ l.EXP_TABLE[m - 5] ^ l.EXP_TABLE[m - 6] ^ l.EXP_TABLE[m - 8]
        for (m = 0; m < 255; m++) l.LOG_TABLE[l.EXP_TABLE[m]] = m
        q.prototype = {
            get: function (a) {
                return this.num[a]
            },
            getLength: function () {
                return this.num.length
            },
            multiply: function (a) {
                for (var c = Array(this.getLength() + a.getLength() - 1), d = 0; d < this.getLength(); d++) {
                    for (var b = 0; b < a.getLength(); b++) c[d + b] ^= l.gexp(l.glog(this.get(d)) + l.glog(a.get(b)))
                }
                return new q(c, 0)
            },
            mod: function (a) {
                if (this.getLength() - a.getLength() < 0) return this
                for (var c = l.glog(this.get(0)) - l.glog(a.get(0)), d = Array(this.getLength()), b = 0; b < this.getLength(); b++) d[b] = this.get(b)
                for (b = 0; b < a.getLength(); b++) d[b] ^= l.gexp(l.glog(a.get(b)) + c)
                return (new q(d, 0)).mod(a)
            }
        }
        p.RS_BLOCK_TABLE = [
            [1, 26, 19],
            [1, 26, 16],
            [1, 26, 13],
            [1, 26, 9],
            [1, 44, 34],
            [1, 44, 28],
            [1, 44, 22],
            [1, 44, 16],
            [1, 70, 55],
            [1, 70, 44],
            [2, 35, 17],
            [2, 35, 13],
            [1, 100, 80],
            [2, 50, 32],
            [2, 50, 24],
            [4, 25, 9],
            [1, 134, 108],
            [2, 67, 43],
            [2, 33, 15, 2, 34, 16],
            [2, 33, 11, 2, 34, 12],
            [2, 86, 68],
            [4, 43, 27],
            [4, 43, 19],
            [4, 43, 15],
            [2, 98, 78],
            [4, 49, 31],
            [2, 32, 14, 4, 33, 15],
            [4, 39, 13, 1, 40, 14],
            [2, 121, 97],
            [2, 60, 38, 2, 61, 39],
            [4, 40, 18, 2, 41, 19],
            [4, 40, 14, 2, 41, 15],
            [2, 146, 116],
            [3, 58, 36, 2, 59, 37],
            [4, 36, 16, 4, 37, 17],
            [4, 36, 12, 4, 37, 13],
            [2, 86, 68, 2, 87, 69],
            [4, 69, 43, 1, 70, 44],
            [6, 43, 19, 2, 44, 20],
            [6, 43, 15, 2, 44, 16],
            [4, 101, 81],
            [1, 80, 50, 4, 81, 51],
            [4, 50, 22, 4, 51, 23],
            [3, 36, 12, 8, 37, 13],
            [2, 116, 92, 2, 117, 93],
            [6, 58, 36, 2, 59, 37],
            [4, 46, 20, 6, 47, 21],
            [7, 42, 14, 4, 43, 15],
            [4, 133, 107],
            [8, 59, 37, 1, 60, 38],
            [8, 44, 20, 4, 45, 21],
            [12, 33, 11, 4, 34, 12],
            [3, 145, 115, 1, 146, 116],
            [4, 64, 40, 5, 65, 41],
            [11, 36, 16, 5, 37, 17],
            [11, 36, 12, 5, 37, 13],
            [5, 109, 87, 1, 110, 88],
            [5, 65, 41, 5, 66, 42],
            [5, 54, 24, 7, 55, 25],
            [11, 36, 12],
            [5, 122, 98, 1, 123, 99],
            [7, 73, 45, 3, 74, 46],
            [15, 43, 19, 2, 44, 20],
            [3, 45, 15, 13, 46, 16],
            [1, 135, 107, 5, 136, 108],
            [10, 74, 46, 1, 75, 47],
            [1, 50, 22, 15, 51, 23],
            [2, 42, 14, 17, 43, 15],
            [5, 150, 120, 1, 151, 121],
            [9, 69, 43, 4, 70, 44],
            [17, 50, 22, 1, 51, 23],
            [2, 42, 14, 19, 43, 15],
            [3, 141, 113, 4, 142, 114],
            [3, 70, 44, 11, 71, 45],
            [17, 47, 21, 4, 48, 22],
            [9, 39, 13, 16, 40, 14],
            [3, 135, 107, 5, 136, 108],
            [3, 67, 41, 13, 68, 42],
            [15, 54, 24, 5, 55, 25],
            [15, 43, 15, 10, 44, 16],
            [4, 144, 116, 4, 145, 117],
            [17, 68, 42],
            [17, 50, 22, 6, 51, 23],
            [19, 46, 16, 6, 47, 17],
            [2, 139, 111, 7, 140, 112],
            [17, 74, 46],
            [7, 54, 24, 16, 55, 25],
            [34, 37, 13],
            [4, 151, 121, 5, 152, 122],
            [4, 75, 47, 14, 76, 48],
            [11, 54, 24, 14, 55, 25],
            [16, 45, 15, 14, 46, 16],
            [6, 147, 117, 4, 148, 118],
            [6, 73, 45, 14, 74, 46],
            [11, 54, 24, 16, 55, 25],
            [30, 46, 16, 2, 47, 17],
            [8, 132, 106, 4, 133, 107],
            [8, 75, 47, 13, 76, 48],
            [7, 54, 24, 22, 55, 25],
            [22, 45, 15, 13, 46, 16],
            [10, 142, 114, 2, 143, 115],
            [19, 74, 46, 4, 75, 47],
            [28, 50, 22, 6, 51, 23],
            [33, 46, 16, 4, 47, 17],
            [8, 152, 122, 4, 153, 123],
            [22, 73, 45, 3, 74, 46],
            [8, 53, 23, 26, 54, 24],
            [12, 45, 15, 28, 46, 16],
            [3, 147, 117, 10, 148, 118],
            [3, 73, 45, 23, 74, 46],
            [4, 54, 24, 31, 55, 25],
            [11, 45, 15, 31, 46, 16],
            [7, 146, 116, 7, 147, 117],
            [21, 73, 45, 7, 74, 46],
            [1, 53, 23, 37, 54, 24],
            [19, 45, 15, 26, 46, 16],
            [5, 145, 115, 10, 146, 116],
            [19, 75, 47, 10, 76, 48],
            [15, 54, 24, 25, 55, 25],
            [23, 45, 15, 25, 46, 16],
            [13, 145, 115, 3, 146, 116],
            [2, 74, 46, 29, 75, 47],
            [42, 54, 24, 1, 55, 25],
            [23, 45, 15, 28, 46, 16],
            [17, 145, 115],
            [10, 74, 46, 23, 75, 47],
            [10, 54, 24, 35, 55, 25],
            [19, 45, 15, 35, 46, 16],
            [17, 145, 115, 1, 146, 116],
            [14, 74, 46, 21, 75, 47],
            [29, 54, 24, 19, 55, 25],
            [11, 45, 15, 46, 46, 16],
            [13, 145, 115, 6, 146, 116],
            [14, 74, 46, 23, 75, 47],
            [44, 54, 24, 7, 55, 25],
            [59, 46, 16, 1, 47, 17],
            [12, 151, 121, 7, 152, 122],
            [12, 75, 47, 26, 76, 48],
            [39, 54, 24, 14, 55, 25],
            [22, 45, 15, 41, 46, 16],
            [6, 151, 121, 14, 152, 122],
            [6, 75, 47, 34, 76, 48],
            [46, 54, 24, 10, 55, 25],
            [2, 45, 15, 64, 46, 16],
            [17, 152, 122, 4, 153, 123],
            [29, 74, 46, 14, 75, 47],
            [49, 54, 24, 10, 55, 25],
            [24, 45, 15, 46, 46, 16],
            [4, 152, 122, 18, 153, 123],
            [13, 74, 46, 32, 75, 47],
            [48, 54, 24, 14, 55, 25],
            [42, 45, 15, 32, 46, 16],
            [20, 147, 117, 4, 148, 118],
            [40, 75, 47, 7, 76, 48],
            [43, 54, 24, 22, 55, 25],
            [10, 45, 15, 67, 46, 16],
            [19, 148, 118, 6, 149, 119],
            [18, 75, 47, 31, 76, 48],
            [34, 54, 24, 34, 55, 25],
            [20, 45, 15, 61, 46, 16]
        ]
        p.getRSBlocks = function (a, c) {
            var d = p.getRsBlockTable(a, c)
            if (void 0 == d) throw Error('bad rs block @ typeNumber:' + a + '/errorCorrectLevel:' + c)
            for (var b = d.length / 3,
                     e = [], f = 0; f < b; f++) {
                for (var h = d[3 * f + 0], g = d[3 * f + 1], j = d[3 * f + 2], l = 0; l < h; l++) e.push(new p(g, j))
            }
            return e
        }
        p.getRsBlockTable = function (a, c) {
            switch (c) {
                case 1:
                    return p.RS_BLOCK_TABLE[4 * (a - 1) + 0]
                case 0:
                    return p.RS_BLOCK_TABLE[4 * (a - 1) + 1]
                case 3:
                    return p.RS_BLOCK_TABLE[4 * (a - 1) + 2]
                case 2:
                    return p.RS_BLOCK_TABLE[4 * (a - 1) + 3]
            }
        }
        t.prototype = {
            get: function (a) {
                return (this.buffer[Math.floor(a / 8)] >>> 7 - a % 8 & 1) == 1
            },
            put: function (a, c) {
                for (var d = 0; d < c; d++) this.putBit((a >>> c - d - 1 & 1) == 1)
            },
            getLengthInBits: function () {
                return this.length
            },
            putBit: function (a) {
                var c = Math.floor(this.length / 8)
                this.buffer.length <= c && this.buffer.push(0)
                a && (this.buffer[c] |= 128 >>> this.length % 8)
                this.length++
            }
        }
        typeof h === 'string' && (h = {
            text: h
        })
        h = r.extend({}, {
                render: 'canvas',
                width: 256,
                height: 256,
                typeNumber: -1,
                correctLevel: 2,
                background: '#ffffff',
                foreground: '#000000'
            },
            h)
        return this.each(function () {
            var a
            if (h.render == 'canvas') {
                a = new o(h.typeNumber, h.correctLevel)
                a.addData(h.text)
                a.make()
                var c = document.createElement('canvas')
                c.id = 'canvasId'
                c.width = h.width
                c.height = h.height
                for (var d = c.getContext('2d'), b = h.width / a.getModuleCount(), e = h.height / a.getModuleCount(), f = 0; f < a.getModuleCount(); f++) {
                    for (var i = 0; i < a.getModuleCount(); i++) {
                        d.fillStyle = a.isDark(f, i) ? h.foreground : h.background
                        var g = Math.ceil((i + 1) * b) - Math.floor(i * b)
                        var j = Math.ceil((f + 1) * b) - Math.floor(f * b)
                        d.fillRect(Math.round(i * b), Math.round(f * e), g, j)
                    }
                }
            } else {
                a = new o(h.typeNumber, h.correctLevel)
                a.addData(h.text)
                a.make()
                c = r('<table></table>').css('width', h.width + 'px').css('height', h.height + 'px').css('border', '0px').css('border-collapse', 'collapse').css('background-color', h.background)
                d = h.width / a.getModuleCount()
                b = h.height / a.getModuleCount()
                for (e = 0; e < a.getModuleCount(); e++) {
                    f = r('<tr></tr>').css('height', b + 'px').appendTo(c)
                    for (i = 0; i < a.getModuleCount(); i++) r('<td></td>').css('width', d + 'px').css('background-color', a.isDark(e, i) ? h.foreground : h.background).appendTo(f)
                }
            }
            a = c
            jQuery(a).appendTo(this)
        })
    }
})(jQuery)

function qraa({
                  url, ewmSize, logo, background = '#ffffff', foreground = '#000000',
                  logoSize = 'default', isShow = true
              }) {
    var qrurl = url
    $('#qrAnonymous').remove()
    var qr1 = decodeURIComponent(qrurl)
    var qr2 = utf16to8(qr1)

    $('#showqr').qrcode({
        render: 'canvas',
        width: ewmSize,
        height: ewmSize,
        crossorigin: 'anonymous',
        background: background,
        foreground: foreground,
        text: qr2,
    })

    function convertCanvasToImage(ctx) {
        var image = new Image()
        image.crossOrigin = "Anonymous"
        image.id = 'qrAnonymous'
        image.src = canvas.toDataURL('image/png')
        return image
    }

    var canvas = document.getElementById('canvasId')
    var ctx = canvas.getContext('2d')

    var logimgheight = $('#logoimg').height()
    var thiswwwurl = document.domain.split('.').slice(-2).join('.')

    if (logimgheight && logo && logo.indexOf(thiswwwurl) >= 0) {
        if (logoSize == 'big') {
            ctx.drawImage(logoimg, ewmSize * 5 / 15, ewmSize * 5 / 15,
                ewmSize / 3, ewmSize / 3)
        }
        if (logoSize == 'default') {
            ctx.drawImage(logoimg, ewmSize * 5 / 14, ewmSize * 5 / 14,
                ewmSize / 3.5, ewmSize / 3.5)
        }
        if (logoSize == 'small') {
            ctx.drawImage(logoimg, ewmSize * 5 / 12, ewmSize * 5 / 12,
                ewmSize / 6, ewmSize / 6)
        }

    }
    var ctx = canvas.getContext('2d')
    var imgsrc = convertCanvasToImage(ctx)
    $('#canvasId').remove()
    $('#showqr').append(imgsrc)

    if (isShow) {
        $('#qrAnonymous').css('display', 'block')
    } else {
        $('#qrAnonymous').css('display', 'none')
    }
}



