.markdown-body{word-break:break-word;line-height:1.75;font-weight:400;font-size:15px;overflow-x:hidden;color:#333}.markdown-body h1,.markdown-body h2,.markdown-body h3,.markdown-body h4,.markdown-body h5,.markdown-body h6{line-height:1.5;margin-top:35px;margin-bottom:10px;padding-bottom:5px}.markdown-body h1{font-size:30px;margin-bottom:5px}.markdown-body h2{padding-bottom:12px;font-size:24px;border-bottom:1px solid #ececec}.markdown-body h3{font-size:18px;padding-bottom:0}.markdown-body h4{font-size:16px}.markdown-body h5{font-size:15px}.markdown-body h6{margin-top:5px}.markdown-body p{line-height:inherit;margin-top:22px;margin-bottom:22px}.markdown-body img{max-width:100%}.markdown-body hr{border:none;border-top:1px solid #ddd;margin-top:32px;margin-bottom:32px}.markdown-body code{word-break:break-word;border-radius:2px;overflow-x:auto;background-color:#fff5f5;color:#ff502c;font-size:.87em;padding:.065em .4em}.markdown-body code,.markdown-body pre{font-family:Menlo,Monaco,Consolas,Courier New,monospace}.markdown-body pre{overflow:auto;position:relative;line-height:1.75}.markdown-body pre>code{font-size:12px;padding:15px 12px;margin:0;word-break:normal;display:block;overflow-x:auto;color:#333;background:#f8f8f8}.markdown-body a{text-decoration:none;color:#0269c8;border-bottom:1px solid #d1e9ff}.markdown-body a:active,.markdown-body a:hover{color:#275b8c}.markdown-body table{display:inline-block!important;font-size:12px;width:auto;max-width:100%;overflow:auto;border:1px solid #f6f6f6}.markdown-body thead{background:#f6f6f6;color:#000;text-align:left}.markdown-body tr:nth-child(2n){background-color:#fcfcfc}.markdown-body td,.markdown-body th{padding:12px 7px;line-height:24px}.markdown-body td{min-width:120px}.markdown-body blockquote{color:#666;padding:1px 23px;margin:22px 0;border-left:4px solid #cbcbcb;background-color:#f8f8f8}.markdown-body blockquote:after{display:block;content:""}.markdown-body blockquote>p{margin:10px 0}.markdown-body ol,.markdown-body ul{padding-left:28px}.markdown-body ol li,.markdown-body ul li{margin-bottom:0;list-style:inherit}.markdown-body ol li .task-list-item,.markdown-body ul li .task-list-item{list-style:none}.markdown-body ol li .task-list-item ol,.markdown-body ol li .task-list-item ul,.markdown-body ul li .task-list-item ol,.markdown-body ul li .task-list-item ul{margin-top:0}.markdown-body ol ol,.markdown-body ol ul,.markdown-body ul ol,.markdown-body ul ul{margin-top:3px}.markdown-body ol li{padding-left:6px}@media (max-width:720px){.markdown-body h1{font-size:24px}.markdown-body h2{font-size:20px}.markdown-body h3{font-size:18px}}

JavaScript 数据类型
---------------

  

### 基本数据类型七种

*   字符串（string）
*   数字（number）
*   布尔值（ boolean）
*   空值（null）
*   未定义（undefined）
*   BigInt（bigInt）
*   符号（symbol，ES6 中新增）

### 引用数据类型

object（在JS中除了基本数据类型以外的都是对象。普通对象-Object，数组对象-Array，正则对象-RegExp，日期对象-Date，数学函数-Math，函数对象-Function）  

typeof 类型判断
-----------

`typeof` 可能的返回值  

类型

结果

Undefined

undefined

Null

object

Boolean

boolean

Number

number

BigInt

bigint

String

string

Symbol

symbol

Function

function

其他任何对象

object

`number`

    typeof(42) === 'number';
    typeof Math.LN2 === 'number';
    typeof Infinity === 'number';
    typeof NaN === 'number'; // 尽管它是 "Not-A-Number" (非数值) 的缩写
    typeof Number(1) === 'number'; // Number 会尝试把参数解析成数值复制代码

`bigint`

    typeof 42n === 'bigint';复制代码

`string`

    typeof '' === 'string';
    typeof `template literal` === 'string';
    typeof '1' === 'string'; // 注意内容为数字的字符串仍是字符串
    typeof (typeof 1) === 'string'; // typeof 总是返回一个字符串
    typeof String(1) === 'string'; // String 将任意值转换为字符串，比 toString 更安全复制代码

`bollean`

    typeof true === 'boolean';
    typeof false === 'boolean';
    typeof Boolean(1) === 'boolean'; // Boolean() 会基于参数是真值还是虚值进行转换
    typeof !!(1) === 'boolean'; // 两次调用 ! (逻辑非) 操作符相当于 Boolean()复制代码

`symbol`

    typeof Symbol() === 'symbol';
    typeof Symbol('foo') === 'symbol';
    typeof Symbol.iterator === 'symbol';复制代码

`undefined`

    typeof undefined === 'undefined';
    typeof undeclaredVariable === 'undefined'; 复制代码

`object`

    typeof {a: 1} === 'object';
    typeof [1, 2, 4] === 'object';
    typeof new Date() === 'object';
    typeof /regex/ === 'object';
    typeof new Boolean(true) === 'object';
    typeof new Number(1) === 'object';
    typeof new String('abc') === 'object';复制代码

`function`

    typeof function() {} === 'function';
    typeof class C {} === 'function'
    typeof Math.sin === 'function';
    typeof console.log // 'function'
    复制代码

![](data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="800" height="600"></svg> "点击并拖拽以移动")`null`

    typeof null === 'object';复制代码

![](https://juejin.cn/post/data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="800" height="600"></svg> "点击并拖拽以移动")除 `Function` 外的所有构造函数的类型都是 'object'

    var str = new String('String');
    var num = new Number(100);
    
    typeof str; // 返回 'object'
    typeof num; // 返回 'object'
    
    var func = new Function();
    
    typeof func; // 返回 'function'复制代码

![](https://juejin.cn/post/data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="800" height="600"></svg> "点击并拖拽以移动")语法中的括号

    // 括号有无将决定表达式的类型。
    var iData = 99;
    
    typeof iData + ' Wisen'; // 'number Wisen'
    typeof (iData + ' Wisen'); // 'string'复制代码

![](https://juejin.cn/post/data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="800" height="600"></svg> "点击并拖拽以移动")`es6`之前`typeof` 总能保证对任何所给的操作数返回一个字符串。即便是没有声明的标识符，`typeof` 也能返回 `'undefined'`。

`es6`加入了块级作用域的 `let`和 `const`之后，在其被声明之前对块中的 `let`和 `const`变量使用 `typeof`会抛出一个 `ReferenceError`。

    typeof newConstVariable; // ReferenceError
    const newConstVariable = 'hello';
    复制代码

instanceof
----------

`instanceof` 运算符用于检测构造函数的 `prototype` 属性是否出现在某个实例对象的原型链上。

语法：

> `object instanceof constructor`
> 
> `object`：某个实例对象 `constructor`：某个构造函数
> 
> 用来检测 `constructor.prototype` 是否存在于参数 `object` 的原型链上。

举例

    // 定义构造函数
    function C () {}
    function D () {}
    var o = new C()
    console.log(o instanceof C, o.__proto__ === C.prototype) // true，true C.prototype 在 o 的原型链上
    console.log(o instanceof D, o.__proto__ === D.prototype) // false，false D.prototype 不在 o 的原型链上
    console.log(o instanceof Object, o.__proto__.__proto__ === Object.prototype) // true true
    C.prototype = {}
    var o2 = new C()
    console.log(o2 instanceof C) // true
    console.log(o instanceof C) // false，C.prototype 指向了一个空对象,这个空对象不在 o 的原型链上.
    D.prototype = new C() // 继承
    var o3 = new D()
    console.log(o3 instanceof D) // true
    console.log(o3 instanceof C) // true 因为 C.prototype 现在在 o3 的原型链上复制代码

### 一些容易出错的点

    var simpleStr = "This is a simple string"; 
    var myString  = new String();
    var newStr    = new String("String created with constructor");
    var myDate    = new Date();
    var myObj     = {};
    var myNonObj  = Object.create(null);
    
    simpleStr instanceof String; // 返回 false, simpleStr并不是对象
    myString  instanceof String; // 返回 true
    newStr    instanceof String; // 返回 true
    myString  instanceof Object; // 返回 true
    
    myObj instanceof Object;    // 返回 true, 尽管原型没有定义
    ({})  instanceof Object;    // 返回 true, 同上
    myNonObj instanceof Object; // 返回 false, 一种创建非 Object 实例的对象的方法
    
    myString instanceof Date; // 返回 false
    
    myDate instanceof Date;     // 返回 true
    myDate instanceof Object;   // 返回 true
    myDate instanceof String;   // 返回 false复制代码

### instanceof判断基本数据类型的实现

    class PrimitiveNumber {
      static [Symbol.hasInstance](x) {
        return typeof x === 'number'
      }
    }
    console.log(111 instanceof PrimitiveNumber) // true复制代码

![](https://juejin.cn/post/data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="800" height="600"></svg> "点击并拖拽以移动")其实就是自定义`instanceof`行为的一种方式，这里将原有的`instanceof`方法重定义，换成了`typeof`，因此能够判断基本数据类型。

### 手动实现instanceof的功能

核心: 原型链的向上查找。

    function myInstanceof (left, right) {
        // 基本数据类型直接返回false
        if (typeof left !== 'object' || left === null) return false
        // getProtypeOf是Object对象自带的一个方法，能够拿到参数的原型对象
        let proto = Object.getPrototypeOf(left)
        while (true) {
            // 查找到尽头，还没找到
            if (proto == null) return false
            // 找到相同的原型对象
            if (proto == right.prototype) return true
            proto = Object.getPrototypeOf(proto)
        }
    }复制代码

![](https://juejin.cn/post/data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="800" height="600"></svg> "点击并拖拽以移动")测试:

    console.log(myInstanceof("111", String)); // false
    console.log(myInstanceof(new String("111"), String)); // true复制代码

JS判断数据类型方法总结
------------

*   可以通过 `Object.prototype.toString.call(xx)`。这样我们就可以获得类似 `[object Type]` 的字符串。
*   `instanceof` 可以正确的判断对象的类型，因为内部机制是通过判断对象的原型链中是不是能找到类型的 `prototype`。

### 数据类型判断函数封装

    judgeType (obj) {
        let class2type = {};
        'Array Date RegExp Object Error'.split(' ').forEach(e =>
            class2type['[object ' + e + ']'] = e.toLowerCase()
        )
        if (obj == null) return String(obj)
        return typeof obj === 'object' ? class2type[Object.prototype.toString.call(obj)] || 'object' : typeof obj
    }复制代码

字符串（string）详解
-------------

**基本字符串**

通过单引号或双引号和直接调用 `String` 方法(没有通过 `new` 生成字符串对象实例)的字符串。  

**字符串对象**

通过 `new` 生成的字符串。  

*   `JavaScript`会自动将基本字符串转换为字符串对象，只有将基本字符串转化为字符串对象之后才可以使用字符串对象的方法。
*   当基本字符串需要调用一个字符串对象才有的方法或者查询值的时候(基本字符串是没有这些方法的)，`JavaScript` 会自动将基本字符串转化为字符串对象并且调用相应的方法或者执行查询  
    

    let zxx = 'Zxx is a great girl' // 基本字符串
    let zxx1 = new String('Zxx is a great girl') // 字符串对象
     
    console.log(typeof zxx) // string
    console.log(typeof zxx1) // object复制代码

**字符串的长度**

    console.log(zxx.length) // 19 复制代码

**String.fromCharCode(num1, ..., numN)**

返回由指定的 UTF-16 代码单元序列创建的字符串

    console.log(String.fromCharCode(65, 66, 67)) // ABC
    console.log(String.fromCharCode(0x2014)) // —复制代码

**charCodeAt()**

返回0到65535之间的整数 表示给定索引处的 UTF-16 代码单元

    console.log(zxx.charCodeAt(0)) // 122(z)
    console.log(zxx.charCodeAt(1)) // 120(x)
    console.log(zxx.charCodeAt(1)) // 120(x)复制代码

**charAt()**

从一个字符串中返回指定的字符。

    console.log(zxx.charAt(0)) // Z
    console.log(zxx.charAt(zxx.length-1)) // l复制代码

**concat()**

将一个或多个字符串与原字符串连接合并，形成一个新的字符串并返回。

    console.log(zxx.concat(' ', 'yes', '。')) // zxx is a great girl yes。复制代码

**endsWith(val, length)**

用来判断当前字符串是否是以另外一个给定的子字符串结尾的，根据判断结果返回 `true` 或 `false`。length 可选参数(作为 str 的长度)

    console.log(zxx.endsWith('girl')) // true
    console.log(zxx.endsWith('girl', 10)) // false
    console.log(zxx.endsWith('g', 10)) // true复制代码

**startsWith(searchString, position)**

方法用来判断当前字符串是否以另外一个给定的子字符串开头，并根据判断结果返回 `true` 或 `false`。这个方法区分大小写。  
`searchString`：要搜索的子字符串。  
`position` 可选：在 `str` 中搜索 `searchString` 的开始位置，默认值为 0，也就是真正的字符串开头处。

    console.log(zxx.startsWith('Zxx')) // true
    console.log(zxx.startsWith('Zxx', 1)) // false
    console.log(zxx.startsWith('xx', 1)) // true复制代码

**includes(val, position)**

用于判断一个字符串是否包含在另一个字符串中，根据情况返回 true 或 false。区分大小写，val 要在此字符串中搜索的字符串。position 可选。从当前字符串的哪个索引位置开始搜寻子字符串，默认值为0。

    console.log(zxx.includes('zxx')) // false
    console.log(zxx.includes('Zxx')) // true
    console.log(zxx.endsWith('Zxx', 10)) // false复制代码

**indexOf(val, fromIndex)**

返回调用它的 String 对象中第一次出现的指定值的索引，从 fromIndex 处进行搜索。如果未找到该值，则返回 -1。表示开始查找的位置。可以是任意整数，默认值为 0。如果 fromIndex 小于 0，则查找整个字符串（等价于传入了 0）。如果 fromIndex 大于等于 str.length，则必返回 -1。

    console.log(zxx.indexOf('zxx')) // -1
    console.log(zxx.indexOf('is')) // 4
    console.log(zxx.indexOf('')) // 0
    console.log(zxx.indexOf(''， -1)) // 0
    console.log(zxx.indexOf(''， 10)) // 10
    console.log(zxx.indexOf(''， 30)) // 19
    console.log(zxx.indexOf('is', -1)) // 4
    console.log(zxx.indexOf('is', 3)) // 4
    console.log(zxx.indexOf('is', 10)) // -1
    console.log(zxx.indexOf('is', 30)) // -1复制代码

**lastIndexOf(val, fromIndex)**

返回调用String 对象的指定值最后一次出现的索引，在一个字符串中的指定位置 fromIndex处从后向前搜索。如果没找到这个特定值则返回-1 。从 str的第fromIndex位开始向左回向查找。fromIndex默认值是 +Infinity。如果 fromIndex >= str.length ，则会搜索整个字符串。如果 fromIndex < 0 ，则等同于 fromIndex == 0。

    'canal'.lastIndexOf('a');     // returns 3 （没有指明fromIndex则从末尾l处开始反向检索到的第一个a出现在l的后面，即index为3的位置）
    'canal'.lastIndexOf('a', 2);  // returns 1（指明fromIndex为2则从n处反向向回检索到其后面就是a，即index为1的位置）
    'canal'.lastIndexOf('a', 0);  // returns -1(指明fromIndex为0则从c处向左回向检索a发现没有，故返回-1)
    'canal'.lastIndexOf('x');     // returns -1
    'canal'.lastIndexOf('c', -5); // returns 0（指明fromIndex为-5则视同0，从c处向左回向查找发现自己就是，故返回0）
    'canal'.lastIndexOf('c', 0);  // returns 0（指明fromIndex为0则从c处向左回向查找c发现自己就是，故返回自己的索引0）
    'canal'.lastIndexOf('');      // returns 5
    'canal'.lastIndexOf('', 2);   // returns 2
    'abab'.lastIndexOf('ab', 2) 将返回 2 而不是 0, 因为fromIndex只限制待匹配字符串的开头。复制代码

**repeat(count)**

构造并返回一个新字符串，该字符串包含被连接在一起的指定数量的字符串的副本。  
参数（count）：介于0和正无穷大之间的整数 : \[0, +∞) 。表示在新构造的字符串中重复了多少遍原字符串。

    console.log(zxx.repeat(0)) // ""
    console.log(zxx.repeat(1)) // Zxx is a great girl
    console.log(zxx.repeat(2)) // Zxx is a great girlZxx is a great girl
    console.log(zxx.repeat(2.2)) // Zxx is a great girlZxx is a great girl
    console.log(zxx.repeat(3.8)) // Zxx is a great girlZxx is a great girlZxx is a great girl
    console.log(zxx.repeat(-1)) // Invalid count value复制代码

**slice(beginIndex, endIndex)**

*   提取某个字符串的一部分，并返回一个新的字符串，且不会改动原字符串。
*   `beginIndex`:从该索引（以 0 为基数）处开始提取原字符串中的字符。如果值为负数，会被当做 `strLength + beginIndex` 看待，这里的`strLength` 是字符串的长度（例如， 如果 `beginIndex` 是 -3 则看作是：`strLength - 3`）
*   `endIndex`:可选。在该索引（以 0 为基数）处结束提取字符串,不包含此位置。如果省略该参数，`slice()` 会一直提取到字符串末尾。如果该参数为负数，则被看作是 strLength + endIndex，这里的 strLength 就是字符串的长度(例如，如果 endIndex 是 -3，则是, strLength - 3)。

    console.log(zxx.slice(0)) // Zxx is a great girl
    console.log(zxx.slice(2)) // x is a great girl
    console.log(zxx.slice(2, 3)) // x
    console.log(zxx.slice(2, 5)) // x i
    console.log(zxx.slice(-1)) // l
    console.log(zxx.slice(-19)) // Zxx is a great girl
    console.log(zxx.slice(-19, -1)) // Zxx is a great gir复制代码

**substring(indexStart, indexEnd)**

*   返回一个字符串在开始索引到结束索引之间的一个子集, 或从开始索引直到字符串的末尾的一个子集。
*   indexStart：需要截取的第一个字符的索引，该字符作为返回的字符串的首字母。
*   indexEnd：可选。一个 0 到字符串长度之间的整数，以该数字为索引的字符不包含在截取的字符串内。
*   如果 `indexStart` 等于 `indexEnd`，`substring` 返回一个空字符串。
*   如果省略 `indexEnd`，`substring` 提取字符一直到字符串末尾。
*   如果任一参数小于 0 或为 NaN，则被当作 0。
*   如果任一参数大于 `stringName.length`，则被当作 `stringName.length`。
*   如果 `indexStart` 大于 `indexEnd`，则 `substring` 的执行效果就像两个参数调换了

    console.log(zxx.substring(0)) // Zxx is a great girl
    console.log(zxx.substring(0, 2)) // Zx
    console.log(zxx.substring(0, -1)) // ""
    console.log(zxx.substring(2, -10)) // Zx
    console.log(zxx.substring(-1, -10)) // ""
    console.log(zxx.substring(1, 200)) // xx is a great girl
    console.log(zxx.substring(2, NaN)) // Zx
    console.log(zxx.substring(2, 2)) // ""复制代码

**split(separator, limit)**

*   使用指定的分隔符字符串将一个`String`对象分割成字符串数组，以将字符串分隔为子字符串，以确定每个拆分的位置。
*   `**separator:**`指定表示每个拆分应发生的点的字符串。`separator` 可以是一个字符串或正则表达式。 如果纯文本分隔符包含多个字符，则必须找到整个字符串来表示分割点。如果在`str`中省略或不出现分隔符，则返回的数组包含一个由整个字符串组成的元素。如果分隔符为空字符串，则将`str`原字符串中每个字符的数组形式返回。
*   `**limit:**`一个整数，限定返回的分割片段数量。当提供此参数时，`split` 方法会在指定分隔符的每次出现时分割该字符串，但在限制条目已放入数组时停止。如果在达到指定限制之前达到字符串的末尾，它可能仍然包含少于限制的条目。新数组中不返回剩下的文本。

**返回值**：返回源字符串以分隔符出现位置分隔而成的一个`Array`

    var myString = "Hello World. How are you doing?";
    
    console.log(myString.split(" ", 3)) // ["Hello", "World.", "How"]
    console.log(myString.split("")) // ["H", "e", "l", "l", "o", " ", "W", "o", "r", "l", "d", ".", " ", "H", "o", "w", " ", "a", "r", "e", " ", "y", "o", "u", " ", "d", "o", "i", "n", "g", "?"]
    console.log(myString.split()) // ["Hello World. How are you doing?"]复制代码

**match(regexp)**

*   regexp 一个正则表达式对象。如果传入一个非正则表达式对象，则会隐式地使用 new RegExp(obj) 将其转换为一个 RegExp 。如果你没有给出任何参数并直接使用match() 方法 ，你将会得到一 个包含空字符串的 Array ：\[""\] 。
*   如果使用g标志，则将返回与完整正则表达式匹配的所有结果，但不会返回捕获组。如果未使用g标志，则仅返回第一个完整匹配及其相关的捕获组（Array）。 在这种情况下，返回的项目将具有如下所述的其他属性。
*   返回一个[`Array`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Array "REDIRECT Array")，其内容取决于global（`g`）标志的存在与否，如果未找到匹配则为[`null`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/null "值 null 特指对象的值未设置。它是 JavaScript 基本类型 之一。")。
    

    var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var regexp = /[A-E]/gi;
    var matches_array = str.match(regexp);
    
    console.log(matches_array);
    // ['A', 'B', 'C', 'D', 'E', 'a', 'b', 'c', 'd', 'e']
    
    var str = "Nothing will come of nothing."; 
    str.match(); // returns [""]
    复制代码

**search(regexp)**

`search()` 返回正则表达式在字符串中首次匹配项的索引;否则，返回 -1。

    var str = "hey JudE";
    var re = /[A-Z]/g;
    var re2 = /[.]/g;
    console.log(str.search(re)); // 4
    console.log(str.search(re2)); // -1复制代码

**replace(regexp)**

返回一个部分或全部匹配由替代模式所取代的新的字符串。

    var str = 'Twas the night before Xmas...';
    var newstr = str.replace(/xmas/i, 'Christmas');
    console.log(newstr);  // Twas the night before Christmas...
    复制代码

**padStart()**

*   用另一个字符串填充当前字符串(重复，如果需要的话)，以便产生的字符串达到给定的长度。填充从当前字符串的开始(左侧)应用的。
*   targetLength：当前字符串需要填充到的目标长度。如果这个数值小于当前字符串的长度，则返回当前字符串本身。
*   padString：可选，填充字符串。如果字符串太长，使填充后的字符串长度超过了目标长度，则只保留最左侧的部分，其他部分会被截断。此参数的缺省值为 " "（U+0020）。
*   返回值：在原字符串开头填充指定的填充字符串直到目标长度所形成的新字符串。

    'abc'.padStart(10);         // "       abc"
    'abc'.padStart(10, "foo");  // "foofoofabc"
    'abc'.padStart(6,"123465"); // "123abc"
    'abc'.padStart(8, "0");     // "00000abc"
    'abc'.padStart(1);          // "abc"复制代码

**padEnd()**

*   用一个字符串填充当前字符串（如果需要的话则重复填充），返回填充后达到指定长度的字符串。从当前字符串的末尾（右侧）开始填充。
*   targetLength：当前字符串需要填充到的目标长度。如果这个数值小于当前字符串的长度，则返回当前字符串本身。
*   padString：可选，填充字符串。如果字符串太长，使填充后的字符串长度超过了目标长度，则只保留最左侧的部分，其他部分会被截断。此参数的缺省值为 " "（U+0020）。
*   返回值：在原字符串末尾填充指定的填充字符串直到目标长度所形成的新字符串。

    'abc'.padEnd(10);          // "abc       "
    'abc'.padEnd(10, "foo");   // "abcfoofoof"
    'abc'.padEnd(6, "123456"); // "abc123"
    'abc'.padEnd(1);           // "abc"复制代码

**toString()**

返回指定对象的字符串形式。

String 对象覆盖了Object 对象的 toString 方法；并没有继承 Object.toString()。对于 String 对象，toString 方法返回该对象的字符串形式，和 String.prototype.valueOf() 方法返回值一样。

    var x = new String("Hello world");
    alert(x.toString()) // 输出 "Hello world复制代码

**trim()**

会从一个字符串的两端删除空白字符。在这个上下文中的空白字符是所有的空白字符 (space, tab, no-break space 等) 以及所有行终止符字符（如 LF，CR）。

    var orig = '   foo  '
    console.log(orig.trim()) // 'foo'
    // 另一个.trim()例子，只从一边删除
    var orig = 'foo    '
    console.log(orig.trim()) // 'foo'复制代码

`**trimRight()**:`方法从一个字符串的右端移除空白字符。

**`trimStart()`**`:`方法从字符串的开头删除空格。`trimLeft()`是此方法的别名。

**`toLocaleLowerCase()`**`:`方法根据任何特定于语言环境的案例映射，返回调用字符串值转换为小写的值。

**`toLocaleUpperCase()`**`:` 使用本地化（locale-specific）的大小写映射规则将输入的字符串转化成大写形式并返回结果字符串。

`**toLowerCase()**:`会将调用该方法的字符串值转为小写形式，并返回。

`**toUpperCase()**:` 将调用该方法的字符串值转换为大写形式，并返回。

*   `toLocaleLowerCase()/toLocaleUpperCase()` 方法返回调用该方法的字符串被转换成小写之后的值，转换规则根据任何本地化特定的大小写映射。
*   `toLocaleLowerCase()/toLocaleUpperCase()` 并不会影响字符串自身的值。在大多数情况下，该方法产生的结果和调用 `toLowerCase()/toUpperCase()` 的结果相同，但是在某些本地环境中，比如土耳其语，它的大小写映射并不遵循在Unicode中的默认的大小写映射，因此会有一个不同的结果。

数字（Number）详解
------------

JavaScript 的 `Number` 对象是经过封装的能让你处理数字值的对象。`Number` 对象由 Number() 构造器创建。

**语法**

    new Number(value); 
    var a = new Number('123'); // a === 123 is false
    var b = Number('123'); // b === 123 is true
    a instanceof Number; // is true
    b instanceof Number; // is false复制代码

![](https://juejin.cn/post/data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="800" height="600"></svg> "点击并拖拽以移动")**Number 对象主要用于：**

*   如果参数无法被转换为数字，则返回NaN。
*   在非构造器上下文中 (如：没有new操作符)，`Number` 能被用来执行类型转换。

**整数类型的范围**

`-2^53`到`2^53`之间（不含两个端点），超过这个范围，无法精确表示这个整数。

### Number的一些属性

*   `Number.MAX_VALUE`属性表示在 `JavaScript` 里所能表示的最大数值。值接近于1.79E+308。大于`MAX_VALUE`的值代表 "Infinity"。
*   `Number.MIN_VALUE`属性表示在 `JavaScript` 中所能表示的最小的正值。是 `JavaScript` 里最接近 0 的正值，而不是最小的负值。约为 5e-324。小于`MIN_VALUE`的值将会转换为 0。
*   `Number.NEGATIVE_INFINITY`属性表示负无穷大。Number.NEGATIVE\_INFINITY 的值和全局对象的 Infinity 属性的负值相同  
    **该值的行为同数学上的无穷大（infinity）有一点儿不同：**  
    1、任何正值，包括POSITIVE\_INFINITY，乘以NEGATIVE\_INFINITY为NEGATIVE\_INFINITY。  
    2、任何负值，包括NEGATIVE\_INFINITY，乘以NEGATIVE\_INFINITY为POSITIVE\_INFINITY。  
    3、0 乘以NEGATIVE\_INFINITY为NaN.  
    4、NaN 乘以NEGATIVE\_INFINITY为NaN.  
    5、NEGATIVE\_INFINITY除以任何负值（除了NEGATIVE\_INFINITY）为POSITIVE\_INFINITY。  
    6、NEGATIVE\_INFINITY除以任何正值（除了POSITIVE\_INFINITY）为NEGATIVE\_INFINITY。  
    7、NEGATIVE\_INFINITY除以NEGATIVE\_INFINITY或POSITIVE\_INFINITY是NaN。  
    8、任何数除以NEGATIVE\_INFINITY为 0。
*   `Number.POSITIVE_INFINITY` 属性表示正无穷大。Number.POSITIVE\_INFINITY 的值同全局对象 Infinity 属性的值相同。  
    **该值的表现同数学上的无穷大有点儿不同：**  
    1、任何正值，包括 POSITIVE\_INFINITY，乘以 POSITIVE\_INFINITY 为 POSITIVE\_INFINITY。  
    2、任何负值，包括 NEGATIVE\_INFINITY，乘以 POSITIVE\_INFINITY 为 NEGATIVE\_INFINITY。  
    3、0 乘以 POSITIVE\_INFINITY 为 NaN。  
    4、NaN 乘以 POSITIVE\_INFINITY 为 NaN。  
    5、POSITIVE\_INFINITY 除以 NEGATIVE\_INFINITY 以外的任何负值为 NEGATIVE\_INFINITY。  
    6、POSITIVE\_INFINITY 除以 POSITIVE\_INFINITY 以外的任何正值为 POSITIVE\_INFINITY。  
    7、POSITIVE\_INFINITY 除以 NEGATIVE\_INFINITY 或 POSITIVE\_INFINITY 为 NaN。  
    8、任何数除以 POSITIVE\_INFINITY 为 0。
*   `Number.NaN` 表示“非数字”（Not-A-Number）。和 `NaN` 相同。

    console.log(Number.NEGATIVE_INFINITY) // -Infinity
    console.log(-Number.NEGATIVE_INFINITY) // Infinity
    console.log(Number.NEGATIVE_INFINITY + 100) // -Infinity
    console.log(typeof Number.NEGATIVE_INFINITY) // number
    console.log(Number.POSITIVE_INFINITY * Number.NEGATIVE_INFINITY) // -Infinity
    console.log(Number.NEGATIVE_INFINITY * Number.NEGATIVE_INFINITY) // Infinity
    console.log(0 * Number.NEGATIVE_INFINITY) // NaN
    console.log(0 / Number.NEGATIVE_INFINITY) // -0
    console.log(0 - Number.NEGATIVE_INFINITY) // Infinity
    console.log(-1 - Number.NEGATIVE_INFINITY) // Infinity
    console.log(Number.NaN / Number.NEGATIVE_INFINITY) // NaN
    console.log(Number.NaN * Number.NEGATIVE_INFINITY) // NaN
    console.log(Number.NaN + Number.NEGATIVE_INFINITY) // NaN
    console.log(Number.NEGATIVE_INFINITY / Number.NaN) // NaN
    console.log(Number.NEGATIVE_INFINITY * Number.NaN) // NaN
    console.log(Number.NEGATIVE_INFINITY + Number.NaN) // NaN
    console.log(Number.NEGATIVE_INFINITY / Number.NEGATIVE_INFINITY) // NaN
    console.log(Number.NEGATIVE_INFINITY * Number.NEGATIVE_INFINITY) // Infinity
    console.log(Number.NEGATIVE_INFINITY / -100) // Infinity
    console.log(Number.NEGATIVE_INFINITY / Number.POSITIVE_INFINITY) // NaN
    console.log(Number.NEGATIVE_INFINITY * Number.POSITIVE_INFINITY) // -Infinity
    console.log(Number.NEGATIVE_INFINITY / 100) // -Infinity
    console.log(1 / Number.NEGATIVE_INFINITY) // -0复制代码

### Number的一些方法

*   `Number.isFinite()`方法用来检测传入的参数是否是一个有穷数。  
    返回值：一个布尔值，表示给定的值是否是一个有穷数。  
    和全局的`isFinite()`函数相比，这个方法不会强制将一个非数值的参数转换成数值，这就意味着，只有数值类型的值，且是有穷的（finite），才返回`true`。
    
        Number.isFinite(Infinity);  // false
        Number.isFinite(NaN);       // false
        Number.isFinite(-Infinity); // false
        Number.isFinite(0);         // true
        Number.isFinite(2e64);      // true
        Number.isFinite('0');       // false, 全局函数 isFinite('0') 会返回 true
        Number.isFinite(null)       // false
        
        ====
        
        // 全局的
        isFinite(Infinity);  // false
        isFinite(NaN);       // false
        isFinite(-Infinity); // false
        isFinite(0);         // true
        isFinite(2e64);      // true
        isFinite("0");       // true, 在更强壮的Number.isFinite('0')中将会得到false
        isFinite(null)       // true Number(null) == 0 返回的是true
        isFinite(false)      // true复制代码
    
*   `Number.isInteger()` 方法用来判断给定的参数是否为整数。  
    如果被检测的值是整数，则返回 `true`，否则返回 `false`。注意 `NaN` 和正负 `Infinity` 不是整数.
    
        Number.isInteger(-100000);   // true
        Number.isInteger(0.1);       // false
        Number.isInteger(Math.PI);   // false
        Number.isInteger(Infinity);  // false
        Number.isInteger("10");      // false
        Number.isInteger(false);     // false
        Number.isInteger([1]);       // false复制代码
    
*   `Number.isNaN()` 方法确定传递的值是否为 NaN和其类型是 Number。它是原始的全局`isNaN()`的更强大的版本。  
    和全局函数`isNaN()` 相比，该方法不会强制将参数转换成数字，只有在参数是真正的数字类型，且值为 `NaN` 的时候才会返回 true。
    
        Number.isNaN(NaN);        // true
        Number.isNaN(Number.NaN); // true
        Number.isNaN(0 / 0)       // true
        
        // 下面这几个如果使用全局的 isNaN() 时，会返回 true。
        Number.isNaN("NaN");      // false，字符串 "NaN" 不会被隐式转换成数字 NaN。
        Number.isNaN(undefined);  // false
        Number.isNaN({});         // false
        Number.isNaN("blabla");   // false
        
        // 下面的都返回 false
        Number.isNaN(true);
        Number.isNaN(null);
        Number.isNaN(37);
        Number.isNaN("37");
        Number.isNaN("37.37");
        Number.isNaN("");
        Number.isNaN(" ");复制代码
    
*   `Number.isSafeInteger()` 方法用来判断传入的参数值是否是一个“安全整数”  
    安全整数范围为 `-(253 - 1)到` `253 - 1` 之间的整数，包含 `-(253 - 1)和` `253 - 1`。
    
        Number.isSafeInteger(3);                    // true
        Number.isSafeInteger(Math.pow(2, 53))       // false
        Number.isSafeInteger(Math.pow(2, 53) - 1)   // true
        Number.isSafeInteger(NaN);                  // false
        Number.isSafeInteger(Infinity);             // false
        Number.isSafeInteger("3");                  // false
        Number.isSafeInteger(3.1);                  // false
        Number.isSafeInteger(3.0);                  // true复制代码
    
*   `Number.prototype.toExponential(fractionDigits)`以指数表示法返回该数值字符串表示形式。  
    1、`fractionDigits`：一个整数，用来指定小数点后有几位数字。默认情况下用尽可能多的位数来显示数字。  
    2、对数值字面量使用 `toExponential()` 方法，且该数值没有小数点和指数时，应该在该数值与该方法之间隔开一个空格，以避免点号被解释为一个小数点。也可以使用两个点号调用该方法。  
    3、如果一个数值的小数位数多余 `fractionDigits` 参数所提供的，则该数值将会在 `fractionDigits` 指定的小数位数处四舍五入。  
    4、如果 `fractionDigits` 太小或太大将会抛出该错误。介于 0 和 20（包括20）之间的值不会引起 `RangeError` 。 执行环境也可以支持更大或更小范围。
    
        var numObj = 77.1234;
        console.log("numObj.toExponential() is " + numObj.toExponential()); // 输出 7.71234e+1
        console.log("numObj.toExponential(4) is " + numObj.toExponential(4)); // 输出 7.7123e+1
        console.log("numObj.toExponential(2) is " + numObj.toExponential(2)); // 输出 7.71e+1
        console.log("77.1234.toExponential() is " + 77.1234.toExponential()); // 输出 7.71234e+1
        console.log("77 .toExponential() is " + 77 .toExponential()); // 输出 7.7e+1复制代码
    
*   `Number.prototype.toFixed(digits)`使用定点表示法来格式化一个数值。该数值在必要时进行四舍五入，另外在必要时会用 0 来填充小数部分，以便小数部分有指定的位数。  
    1、`digits`：小数点后数字的个数；介于 0 到 20 （包括）之间，实现环境可能支持更大范围。如果忽略该参数，则默认为 0。  
    2、如果`digits`参数太小或太大。0 到 20（包括）之间的值不会引起`RangeError`。  
    3、返回值：使用定点表示法表示给定数字的字符串。  
    4、 如果数值大于 1e+21，该方法会简单调用 Number.prototype.toString()并返回一个指数记数法格式的字符串。
    
        var numObj = 12345.6789
        numObj.toFixed()         // 返回 "12346"：进行四舍五入，不包括小数部分
        numObj.toFixed(1)        // 返回 "12345.7"：进行四舍五入
        numObj.toFixed(6);        // 返回 "12345.678900"：用0填充
        (1.23e+20).toFixed(2);    // 返回 "123000000000000000000.00"
        (1.23e-10).toFixed(2)    // 返回 "0.00"
        2.34.toFixed(1);          // 返回 "2.3"
        -2.34.toFixed(1);         // 返回 -2.3 （由于操作符优先级，负数不会返回字符串）
        (-2.34).toFixed(1)       // 返回 "-2.3" （若用括号提高优先级，则返回字符串）复制代码
    
*   `Number.prototype.toPrecision(precision)`以指定的精度返回该数值对象的字符串表示。  
    1、`precision`：可选。一个用来指定有效数个数的整数。  
    2、以定点表示法或指数表示法表示的一个数值对象的字符串表示，四舍五入到 `precision` 参数指定的显示数字位数。  
    3、如果忽略 `precision` 参数，则该方法表现类似于 Number.prototype.toString()。如果该参数是一个非整数值，将会向下舍入到最接近的整数。  
    4、如果 `precison` 参数不在 1 和 100 （包括）之间，将会抛出一个 `RangeError` 。执行环境也可以支持更大或更小的范围。ECMA-262 只需要最多 21 位显示数字。
    
        var numObj = 5.123456;
        console.log("numObj.toPrecision()  is " + numObj.toPrecision());  //输出 5.123456
        console.log("numObj.toPrecision(5) is " + numObj.toPrecision(5)); //输出 5.1235
        console.log("numObj.toPrecision(2) is " + numObj.toPrecision(2)); //输出 5.1
        console.log("numObj.toPrecision(1) is " + numObj.toPrecision(1)); //输出 5
        
        // 注意：在某些情况下会以指数表示法返回
        console.log((1234.5).toPrecision(2)); // "1.2e+3"复制代码
    
*   `Number.prototype.toString(radix)`返回指定 Number 对象的字符串表示形式。  
    1、radix: 指定要用于数字到字符串的转换的基数(从2到36)。如果未指定 radix 参数，则默认值为 10。  
    2、如果 toString() 的 radix 参数不在 2 到 36 之间，将会抛出一个 RangeError。  
    3、`Number` 对象覆盖了 Object 对象上的 toString() 方法，它不是继承的 Object.prototype.toString()。对于 Number 对象，toString() 方法以指定的基数返回该对象的字符串表示。
    
        var count = 10;
        
        console.log(count.toString());    // 输出 '10'
        console.log((17).toString());     // 输出 '17'
        console.log((17.2).toString());   // 输出 '17.2'
        
        var x = 6;
        
        console.log(x.toString(2));       // 输出 '110'
        console.log((254).toString(16));  // 输出 'fe'
        
        console.log((-10).toString(2));   // 输出 '-1010'
        console.log((-0xff).toString(2)); // 输出 '-11111111'复制代码
    

布尔值（Boolean）详解
--------------

*   语法：new Boolean(\[value\])
*   如果第一个参数不是布尔值，则会将其转换为布尔值。
*   如果省略该参数，或者其值为 0、-0、null、false、NaN、undefined、或者空字符串（""），则生成的 `Boolean` 对象的值为 `false`。
*   任何其他的值，包括值为 `"false"` 的字符串和任何对象，都会创建一个值为 `true` 的 `Boolean` 对象。
*   注意不要将基本类型中的布尔值 `true` 和 `false` 与值为 `true` 和 `false` 的 `Boolean` 对象弄混了。

任何不是 undefined 和 null 的对象，包括值为 false 的 Boolean 对象，直接用于条件语句时都会被当做 true 来对待。例如，下面 if 语句中的条件为真:

    var x = new Boolean(null)
    if (x) {
        // 这里的代码会被执行
        console.log('可以执行')
    }
    
    ===
    
    var x = null
    if (x) {
        // 这里的代码不会被执行
        console.log('可以执行') // 不会输出
    }
    
    ===
    
    var x = false;
    if (x) {
      // 这里的代码不会执行
    }复制代码

![](https://juejin.cn/post/data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="800" height="600"></svg> "点击并拖拽以移动")对于任何对象，即使是值为 `false` 的 `Boolean` 对象，当将其传给 `Boolean`函数时，生成的 `Boolean` 对象的值都是 `true`。

    var myFalse = new Boolean(false);   // false
    var g = new Boolean(myFalse);       // true
    var myString = new String("Hello");
    var s = new Boolean(myString);      // true复制代码

![](https://juejin.cn/post/data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="800" height="600"></svg> "点击并拖拽以移动")创建值为 `false` 的 `Boolean` 对象

    var bNoParam = new Boolean();
    var bZero = new Boolean(0);
    var bNull = new Boolean(null);
    var bEmptyString = new Boolean('');
    var bfalse = new Boolean(false);
    复制代码

![](https://juejin.cn/post/data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="800" height="600"></svg> "点击并拖拽以移动")创建值为 `true` 的 `Boolean` 对象

    var btrue = new Boolean(true);
    var btrueString = new Boolean('true');
    var bfalseString = new Boolean('false');
    var bSuLin = new Boolean('Su Lin');
    var bArrayProto = new Boolean([]);
    var bObjProto = new Boolean({});复制代码

null 与 undefined
----------------

### null

代表空值，代表一个空对象指针，虽然`typeof null` 会输出 `object`，但是这只是 JS 存在的一个悠久 Bug。在 JS 的最初版本中使用的是 32 位系统，为了性能考虑使用低位存储变量的类型信息，000 开头代表是对象然而 null 表示为全零，所以将它错误的判断为 `object` 。  

*   作为函数的参数，表示该函数的参数不是对象。
*   作为对象原型链的终点。
*   当使用完一个比较大的对象时，需要对其进行释放内存时，设置为 `null`
*   主动释放一个变量引用的对象，表示一个变量不再指向任何对象地址
*   在基础数学运算中，`null`值将被转换为0。

### undefined

是所有未赋值变量默认值。  

*   变量被声明了，但没有赋值时，就等于 `undefined`。
*   调用函数时，应该提供的参数没有提供，该参数等于 `undefined`。
*   对象没有赋值的属性，该属性的值为 `undefined`。
*   函数没有返回值时，默认返回 `undefined`。

    typeof null        // "object" 
    typeof undefined   // "undefined"
    null === undefined // false
    null == undefined // true
    Number(null) === 0
    isNaN(Number(undefined)) // true
    !null // true复制代码

BigInt详解
--------

### 什么是BigInt?

**`BigInt`** 是一种内置对象，它提供了一种方法来表示大于 2的53次方 - 1 的整数。这原本是 `Javascript` 中可以用 `Number` 表示的最大数字。BigInt 可以表示任意大的整数。

### 为什么需要BigInt?

在JS中，所有的数字都以双精度64位浮点格式表示，那这会带来什么问题呢？

这导致JS中的`Number`无法精确表示非常大的整数，它会将非常大的整数四舍五入，确切地说，JS中的`Number`类型只能安全地表示-9007199254740991(-(2^53-1))和9007199254740991（(2^53-1)），任何超出此范围的整数值都可能失去精度。

![](data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="214" height="37"></svg>)![](data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="800" height="600"></svg> "点击并拖拽以移动")​

同时也会有一定的安全性问题:

![](data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="258" height="95"></svg>)![](data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="800" height="600"></svg> "点击并拖拽以移动")​

### 如何创建并使用BigInt？

要创建BigInt，只需要在数字末尾追加n即可。

![](data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="233" height="101"></svg>)![](data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="800" height="600"></svg> "点击并拖拽以移动")​

另一种创建BigInt的方法是用BigInt()构造函数

![](data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="199" height="35"></svg>)![](https://juejin.cn/post/data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="800" height="600"></svg> "点击并拖拽以移动")​

**简单使用如下:**

    10n + 20n;    // → 30n	
    10n - 20n;    // → -10n	
    +10n;         // → TypeError: Cannot convert a BigInt value to a number	
    // BigInt不支持一元加号运算符, 这可能是某些程序可能依赖于 + 始终生成 Number 的不变量，或者抛出异常。
    -10n;         // → -10n	
    10n * 20n;    // → 200n	
    20n / 10n;    // → 2n	
    23n % 10n;    // → 3n	
    10n ** 3n;    // → 1000n	
    
    const x = 10n;	
    ++x;          // → 11n	
    --x;          // → 9n
    console.log(typeof x);   //"bigint"复制代码

![](https://juejin.cn/post/data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="800" height="600"></svg> "点击并拖拽以移动")它在某些方面类似于 `Number` ，但是也有几个关键的不同点：不能用与 `Math` 对象中的方法

    Math.floor(1.1) // 1
    Math.floor(1.1n) // Uncaught SyntaxError: Invalid or unexpected token复制代码

![](https://juejin.cn/post/data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="800" height="600"></svg> "点击并拖拽以移动")不能和任何 `Number` 实例（隐式类型转换可能丢失信息）混合运算，两者必须转换成同一种类型。在两种类型来回转换时要小心，因为 BigInt 变量在转换成 Number 变量时可能会丢失精度。

    1 + 2n // Uncaught TypeError: Cannot mix BigInt and other types, use explicit conversions
    1n + 2n = 3n
    1 + Number(2n) = 3复制代码

![](https://juejin.cn/post/data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="800" height="600"></svg> "点击并拖拽以移动")当使用 `BigInt` 时，带小数的运算会被取整。

    const rounded = 5n / 2n;
    // ↪ 2n, not 2.5n复制代码

![](https://juejin.cn/post/data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="800" height="600"></svg> "点击并拖拽以移动")使用 `typeof` 测试时， `BigInt` 对象返回 "bigint" ：

    typeof 1n === 'bigint'; // true
    typeof BigInt('1') === 'bigint'; // true
    复制代码

![](https://juejin.cn/post/data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="800" height="600"></svg> "点击并拖拽以移动")使用 `Object` 包装后， `BigInt` 被认为时一个普通 "object" ：

    typeof Object(1n) === 'object'; // true
    复制代码

`BigInt` 和 `Number` 不是严格相等的，但是宽松相等的。  

    0n === 0 // false
    0n == 0 // true复制代码

![](https://juejin.cn/post/data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="800" height="600"></svg> "点击并拖拽以移动")`Number` 和 `BigInt` 可以进行比较。

    1n < 2 // true
    2n > 1 // true
    2 > 2 // false
    2n > 2 // false
    2n >= 2 // true复制代码

两者也可以混在一个数组内并排序。

    const mixed = [4n, 6, -12n, 10, 4, 0, 0n];
    // [4n, 6, -12n, 10, 4, 0, 0n]
    mixed.sort();
    // [-12n, 0, 0n, 10, 4n, 4, 6]复制代码

![](https://juejin.cn/post/data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="800" height="600"></svg> "点击并拖拽以移动")当 `Boolean` 类型与 `BigInt` 类型相遇时，`BigInt`的处理方式与`Number`类似，换句话说，只要不是0n，`BigInt`就被视为`true`。

    if(0n){ // 条件判断为false
    	console.log('false')
    }
    if(3n){ // 条件为true
    	console.log('true')
    }
    // 输出true复制代码

数组（Array）详解
-----------

### 什么是数组

*   数组是值得有序集合，每个值叫做一个元素，而每个元素在数组中有一个位置，以数字表示，称为索引。
*   js的数组是无类型的，数组元素可以是任意类型，同一个数组中的不同元素可能是对象或数组。
*   数组元素的索引不一定要连续，元素之间可以有空隙，叫做稀疏数组 。
*   每个数组都具有一个`length`属性。
*   针对非稀疏数组，`length`属性就是数组元素的个数，针对稀疏数组，元素的length属性比所有元素的索引要大。

### 数组的方法详解

使用数组直接量创建数组，推荐使用这种方式，性能更高  

    var arr1 = [] 
    var arr2 = [1, 3, 45]
    var arr3 = [1, 'aa', true,] // 有三个不同数据类型的数组，最后一个逗号为结尾的逗号
    复制代码

调用构造函数Array()创建数组 不推荐使用这种方式  

    var a = new Array() // [] 调用时没有参数
    var b = new Array(10) // 调用时有一个数值参数，它指定长度
    var c = new Array(1, 2, 3) // [1, 2, 3] 显式指定两个或多个数组元素或者数组的一个非数值元素
    var d = new Array('22') // ['22'] 如果传入一个非数值的参数或者参数个数大于1，则表示创建一个包含指定元素的数组
    复制代码

**数组元素的读和写**  

使用\[\]操作符来访问数组中的一个元素

    var c = [0, , 2]
    console.log(c[0]) // 0 
    console.log(c[1]) // undefined 
    console.log(c[2]) // 2 
    console.log(c[3]) // undefined
    c[1] = 3
    console.log(c) // [0, 3, 2]
    c[5] = 6
    console.log(c) // [0, 3, 2, empty × 2, 6]复制代码

![](https://juejin.cn/post/data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="800" height="600"></svg> "点击并拖拽以移动")**数组的长度**

每个数组都有一个 length 属性，针对非稀疏数组，length 属性值代表数组中元素的个数，其值比数组中最大的索引大一。当数组是稀疏时，length 属性值会大于元素个数。数组的长度会大于每一个元素的索引值。

    var c = [0, , 2]
    c.length // =>3 稀疏数组，最大索引值为2，数组长度为3复制代码

![](data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="800" height="600"></svg> "点击并拖拽以移动")设置 length 属性为一个小于当前数组长度的非负整数 n 时，当前数组中的那些索引值大于等于 n 的元素将从数组中删除。同时可以将 length 属性设置为大于当前长度的值，实际不会像数组中添加元素，它只是在数组尾部创建一个空的区域。

![](data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="212" height="241"></svg>)![](https://juejin.cn/post/data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="800" height="600"></svg> "点击并拖拽以移动")​

**数组也是对象**

数组通过数字进行索引，但有趣的是它们也是对象，所以也可以包含字符串键值和属性 （但这些并不计算在数组长度内）

    var a = []
    a[0] = 1
    a['foobar'] = 2
    console.log(a) // [1, foobar: 2]
    console.log(a.length) // 1
    console.log(a['foobar']) // 2
    console.log(a[0]) // 1
    console.log(a[1]) // undefined复制代码

![](https://juejin.cn/post/data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="800" height="600"></svg> "点击并拖拽以移动")这里有个问题需要特别注意，如果字符串键值能够被强制类型转换为十进制数字的话，它就会被当作数字索引来处理。

    var a = []
    a['13'] = 42
    a.length // 14复制代码

![](https://juejin.cn/post/data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="800" height="600"></svg> "点击并拖拽以移动")**shift**

删除原数组第一项，并返回删除元素的值；如果数组为空则返回undefined

    var a = [1, 2, 3, 4, 5];
    var b = a.shift(); 
    // a:[2, 3, 4, 5]  b:1复制代码

![](https://juejin.cn/post/data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="800" height="600"></svg> "点击并拖拽以移动")**unshift**

将参数添加到原数组开头，并返回数组的长度

    var a = [1, 2, 3, 4, 5];
    var b = a.unshift(-2, -1); 
    //a:[-2, -1, 1, 2, 3, 4, 5] b:7复制代码

![](https://juejin.cn/post/data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="800" height="600"></svg> "点击并拖拽以移动")**pop**

删除原数组最后一项，并返回删除元素的值；如果数组为空则返回undefined

    var a = [1, 2, 3, 4, 5];
    var b = a.pop();
    // a:[1, 2, 3, 4] b:5复制代码

![](https://juejin.cn/post/data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="800" height="600"></svg> "点击并拖拽以移动")**push**

将参数添加到原数组末尾，并返回数组的长度

    var a = [1, 2, 3, 4, 5];
    var b = a.push(6, 7);
    // a:[1, 2, 3, 4, 5, 6, 7] b:7复制代码

![](https://juejin.cn/post/data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="800" height="600"></svg> "点击并拖拽以移动")**concat**

将多个数组拼接成一个数组 拼接后数组的元素将按照传入参数的顺序排序 ，不改变原数组，返回拼接后的数组

    var array = [1, 2];
    var newArray = array.concat([3, 4], "a", true);
    console.log(array); // [1, 2]
    console.log(newArray); // [1, 2, 3, 4, "a", true]复制代码

![](https://juejin.cn/post/data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="800" height="600"></svg> "点击并拖拽以移动")**splice(start, deleteCount, val1, val2, ...)**

从start位置开始删除deleteCount项，并从该位置起插入val1, val2,...  
splice()方法始终都会返回一个数组，该数组中包含从原始数组中删除的项，如果没有删除任何项，则返回一个空数组

    var a = [1, 2, 3, 4, 5];
    var b = a.splice(2, 2, 7, 8, 9); //a:[1, 2, 7, 8, 9, 5] b:[3, 4]
    var b = a.splice(0, 1); // 同shift
    a.splice(0, 0, -2, -1); var b = a.length; // 同unshift
    var b = a.splice(a.length-1, 1); // 同pop
    a.splice(a.length, 0, 6, 7); var b = a.length; // 同push复制代码

![](https://juejin.cn/post/data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="800" height="600"></svg> "点击并拖拽以移动")**reverse**

将数组反序

    var a = [1, 2, 3, 4, 5];
    var b = a.reverse();
    // a:[5, 4, 3, 2, 1] b:[5, 4, 3, 2, 1]复制代码

![](https://juejin.cn/post/data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="800" height="600"></svg> "点击并拖拽以移动")**slice(start,end)**

返回从原数组中指定开始下标到结束下标之间的项组成的新数组。在只有一个参数的情况下， slice()方法返回从该参数指定位置开始到当前数组末尾的所有项。如果有两个参数，该方法返回起始和结束位置之间的项——但不包括结束位置的项。当出现负数时，将负数加上数组长度的值来替换该位置的数（原数组中的倒数第几个元素开始提取），`slice(-2)` 表示提取原数组中的倒数第二个元素到最后一个元素（包含最后一个元素）。

    var a = [1, 2, 3, 4, 5];    
    var b = a.slice(2, 5); 
    // a:[1, 2, 3, 4, 5];  b:[3, 4, 5]
    复制代码

![](https://juejin.cn/post/data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="800" height="600"></svg> "点击并拖拽以移动")slice 方法可以用来将一个类数组（Array-like）对象/集合转换成一个新数组。你只需将该方法绑定到这个对象上。 一个函数中的arguments就是一个类数组对象的例子

    function zxxFn () {
        return Array.prototype.slice.call(arguments);
    }
    var zxx = zxxFn(1, 2, 3); 
    console.log(zxx) // [1, 2, 3]复制代码

![](https://juejin.cn/post/data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="800" height="600"></svg> "点击并拖拽以移动")除了使用 `Array.prototype.slice.call(``arguments``)`，你也可以简单的使用 `[].slice.call(arguments)` 来代替。另外，你可以使用 `bind` 来简化该过程。

    var unboundSlice = Array.prototype.slice;
    var slice = Function.prototype.call.bind(unboundSlice);
    function zxxFn() {
        return slice(arguments);
    }
    var zxx = zxxFn(1, 2, 3); 
    console.log(zxx) // [1, 2, 3]复制代码

![](https://juejin.cn/post/data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="800" height="600"></svg> "点击并拖拽以移动")**join(separator)**

将数组的元素组起一个字符串，以separator为分隔符，省略的话则用默认用逗号为分隔符

    var a = [1, 2, 3, 4, 5];
    var b = a.join("|");
    // a:[1, 2, 3, 4, 5] b:"1|2|3|4|5"复制代码

![](https://juejin.cn/post/data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="800" height="600"></svg> "点击并拖拽以移动")**sort()**

按升序排列数组项——即最小的值位于最前面，最大的值排在最后面

在排序时，sort()方法会调用每个数组项的 toString()转型方法，然后比较得到的字符串，以确定如何排序。即使数组中的每一项都是数值， sort()方法比较的也是字符串，因此会出现以下的这种情况

    var arr1 = ["a", "d", "c", "b"];
    console.log(arr1.sort()); // ["a", "b", "c", "d"]
    arr2 = [13, 24, 51, 3];
    console.log(arr2.sort()); // [13, 24, 3, 51]
    console.log(arr2); // [13, 24, 3, 51](元数组被改变)
    复制代码

![](https://juejin.cn/post/data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="800" height="600"></svg> "点击并拖拽以移动")为了解决上述问题，sort()方法可以接收一个比较函数作为参数，以便我们指定哪个值位于哪个值的前面。比较函数接收两个参数，如果第一个参数应该位于第二个之前则返回一个负数，如果两个参数相等则返回 0，如果第一个参数应该位于第二个之后则返回一个正数。以下就是一个简单的比较函数：

    function compare(value1, value2) {
        if (value1 < value2) {
            return -1;
        } else if (value1 > value2) {
            return 1;
        } else {
            return 0;
        }
    }
    arr2 = [13, 24, 51, 3];
    console.log(arr2.sort(compare)); // [3, 13, 24, 51]
    复制代码

![](https://juejin.cn/post/data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="800" height="600"></svg> "点击并拖拽以移动")如果需要通过比较函数产生降序排序的结果，只要交换比较函数返回的值即可：

    function compare(value1, value2) {
        if (value1 < value2) {
            return 1;
        } else if (value1 > value2) {
            return -1;
        } else {
            return 0;
        }
    }
    arr2 = [13, 24, 51, 3];
    console.log(arr2.sort(compare)); // [51, 24, 13, 3]
    复制代码

![](https://juejin.cn/post/data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="800" height="600"></svg> "点击并拖拽以移动")**indexOf()**

接收两个参数：要查找的项和（可选的）表示查找起点位置的索引。其中， 从数组的开头（位置 0）开始向后查找。

**lastIndexOf**

接收两个参数：要查找的项和（可选的）表示查找起点位置的索引。其中， 从数组的末尾开始向前查找。

这两个方法都返回要查找的项在数组中的位置，或者在没找到的情况下返回-1。在比较第一个参数与数组中的每一项时，会使用全等操作符。

    var array = [1, 2, 3, 4, 5];
    var ret = array.indexOf(4);
    console.log(array); // [1, 2, 3, 4, 5]
    console.log(ret); // 3
    console.log(array.indexOf(6)); // -1
    console.log(array.lastIndexOf(8)); // -1
    console.log(array.lastIndexOf(5)); // 4复制代码

![](https://juejin.cn/post/data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="800" height="600"></svg> "点击并拖拽以移动")**copyWithin（target，staart, end）**

浅复制数组的一部分到同一数组中的另一个位置，并返回它，不会改变原数组的长度。

*   `target`：0 为基底的索引，复制序列到该位置。如果是负数，`target` 将从末尾开始计算。  
    如果 `target` 大于等于 `arr.length`，将会不发生拷贝。如果 `target` 在 `start` 之后，复制的序列将被修改以符合 `arr.length`。
*   `start`：0 为基底的索引，开始复制元素的起始位置。  
    如果 `start` 被忽略，`copyWithin` 将会从0开始复制。
*   `end`：0 为基底的索引，开始复制元素的结束位置。`copyWithin` 将会拷贝到该位置，但不包括 `end` 这个位置的元素。  
    如果 `end` 被忽略，`copyWithin` 方法将会一直复制至数组结尾（默认为 `arr.length`）。
*   如果 start 为负，则其指定的索引位置等同于 length+start，length 为数组的长度。end 也是如此。

    let numbers = [1, 2, 3, 4, 5];
    
    numbers.copyWithin(-2);
    // [1, 2, 3, 1, 2]
    
    numbers.copyWithin(0, 3);
    // [4, 5, 3, 4, 5]
    
    numbers.copyWithin(0, 3, 4);
    // [4, 2, 3, 4, 5]
    
    numbers.copyWithin(-2, -3, -1);
    // [1, 2, 3, 3, 4]
    
    [].copyWithin.call({length: 5, 3: 1}, 0, 3);
    // {0: 1, 3: 1, length: 5}
    
    // ES2015 Typed Arrays are subclasses of Array
    var i32a = new Int32Array([1, 2, 3, 4, 5]);
    
    i32a.copyWithin(0, 2);
    // Int32Array [3, 4, 5, 4, 5]
    
    // On platforms that are not yet ES2015 compliant: 
    [].copyWithin.call(new Int32Array([1, 2, 3, 4, 5]), 0, 3, 4);
    // Int32Array [4, 2, 3, 4, 5]复制代码

![](https://juejin.cn/post/data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="800" height="600"></svg> "点击并拖拽以移动")**fill(value,start,end)**

*   用一个固定值填充一个数组中从起始索引到终止索引内的全部元素。不包括终止索引。
*   `value：`用来填充数组元素的值。
*   `start` ：可选，起始索引，默认值为0。
*   `end` ：可选，终止索引，默认值为 `this.length`。
*   返回值：修改后的数组
*   如果 `start` 是个负数, 则开始索引会被自动计算成为 `length+start`, 其中 `length` 是 `this` 对象的 `length` 属性值。如果 `end` 是个负数, 则结束索引会被自动计算成为 `length+end`。

    [1, 2, 3].fill(4);               // [4, 4, 4]
    [1, 2, 3].fill(4, 1);            // [1, 4, 4]
    [1, 2, 3].fill(4, 1, 2);         // [1, 4, 3]
    [1, 2, 3].fill(4, 1, 1);         // [1, 2, 3]
    [1, 2, 3].fill(4, 3, 3);         // [1, 2, 3]
    [1, 2, 3].fill(4, -3, -2);       // [4, 2, 3]
    [1, 2, 3].fill(4, NaN, NaN);     // [1, 2, 3]
    [1, 2, 3].fill(4, 3, 5);         // [1, 2, 3]
    Array(3).fill(4);                // [4, 4, 4]
    [].fill.call({ length: 3 }, 4);  // {0: 4, 1: 4, 2: 4, length: 3}
    
    // Objects by reference.
    var arr = Array(3).fill({}) // [{}, {}, {}];
    // 需要注意如果fill的参数为引用类型，会导致都执行都一个引用类型
    // 如 arr[0] === arr[1] 为true
    arr[0].hi = "hi"; // [{ hi: "hi" }, { hi: "hi" }, { hi: "hi" }]复制代码

![](https://juejin.cn/post/data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="800" height="600"></svg> "点击并拖拽以移动")**includes(valueToFind，fromIndex)**

*   判断一个数组是否包含一个指定的值，根据情况，如果包含则返回 true，否则返回false。
*   `valueToFind`：需要查找的元素值。
*   `fromIndex`：可选，从`fromIndex` 索引处开始查找 `valueToFind`。如果为负值，则按升序从 `array.length + fromIndex` 的索引开始搜 （即使从末尾开始往前跳 `fromIndex` 的绝对值个索引，然后往后搜寻）。默认为 0。
*   如果 fromIndex 为负值，计算出的索引将作为开始搜索searchElement的位置。如果计算出的索引小于 0，则整个数组都会被搜索。

    [1, 2, 3].includes(3, 3);  // false
    [1, 2, 3].includes(3, -1); // true
    [1, 2, NaN].includes(NaN); // true
    
    var arr = ['a', 'b', 'c'];
    
    arr.includes('a', -100); // true
    arr.includes('b', -100); // true
    arr.includes('c', -100); // true
    arr.includes('a', -2); // false复制代码

![](https://juejin.cn/post/data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="800" height="600"></svg> "点击并拖拽以移动")作为通用方法的 includes()

    (function() {
      console.log([].includes.call(arguments, 'a')); // true
      console.log([].includes.call(arguments, 'd')); // false
    })('a','b','c');复制代码

![](https://juejin.cn/post/data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="800" height="600"></svg> "点击并拖拽以移动")**keys()**

返回一个包含数组中每个索引键的Array Iterator对象。

索引迭代器会包含那些没有对应元素的索引

    var arr = ["a", , "c"];
    var sparseKeys = Object.keys(arr);
    var denseKeys = [...arr.keys()];
    console.log(sparseKeys); // ['0', '2']
    console.log(denseKeys);  // [0, 1, 2]复制代码

![](https://juejin.cn/post/data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="800" height="600"></svg> "点击并拖拽以移动")**filter()**

*   创建一个新数组, 其包含通过所提供函数实现的测试的所有元素。
*   返回值：一个新的、由通过测试的元素组成的数组，如果没有任何数组元素通过测试，则返回空数组。

    var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    var arr2 = arr.filter(function(x, index) {
        return index % 3 === 0 || x >= 8;
    }); 
    console.log(arr2); //[1, 4, 7, 8, 9, 10]复制代码

    var arr = [1 , 3, 4, 7, 12]
    var arrTest = arr.filter((item, index, array) => {
        console.log('当前值:' + item, '当前值的索引' + index, '当前数组' + array)
        return item >= 4
    })
    console.log(arrTest)复制代码

![](data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="326" height="119"></svg>)![](https://juejin.cn/post/data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="800" height="600"></svg> "点击并拖拽以移动")​

**every()**

判断数组中每一项都是否满足条件，只有所有项都满足条件，才会返回true。

    var arr = [1, 2, 3, 4, 5];
    var arr2 = arr.every(function(x) {
        return x < 10;
    }); 
    console.log(arr2); //true
    var arr3 = arr.every(function(x) {
        return x < 3;
    }); 
    console.log(arr3); // false复制代码

    var arr = [1 , 3, 4, 7, 12]
    var arrTest = arr.every((item, index, array) => {
        console.log('当前值:' + item, '当前值的索引' + index, '当前数组' + array)
        return item > 0
    })
    console.log(arrTest)复制代码

![](data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="325" height="121"></svg>)![](https://juejin.cn/post/data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="800" height="600"></svg> "点击并拖拽以移动")​

**some()**

判断数组中是否存在满足条件的项，只要有一项满足条件，就会返回true。

    var arr = [1, 2, 3, 4, 5];
    var arr2 = arr.some(function(x) {
        return x < 3;
    }); 
    console.log(arr2); //true
    var arr3 = arr.some(function(x) {
        return x < 1;
    }); 
    console.log(arr3); // false复制代码

**Array.from()**

将伪数组对象（拥有一个 `length` 属性和若干索引属性的任意对象）或迭代对象（可以获取对象中的元素,如 Map和 Set 等）转化成真数组，返回值：一个新的数组

    Array.from(arrayLike, mapFn, thisArg)复制代码

*   `arrayLike` 想要转换成数组的伪数组对象或可迭代对象。
*   `mapFn (可选参数)` 如果指定了该参数，新数组中的每个元素会执行该回调函数。
*   `thisArg (可选参数)` 可选参数，执行回调函数 `mapFn` 时 `this` 对象。
*   Array.from()方法有一个可选参数mapFn，让你可以在最后生成的数组上再执行一次map方法后再返回。
*   也就是说Array.from(obj, mapFn, thisArg)就相当于Array.from(obj).map(mapFn, thisArg),除非创建的不是可用的中间数组。
*   这对一些数组的子类,如typed arrays来说很重要,因为中间数组的值在调用 map() 时需要是适当的类型。

    Array.from('foo'); 
    // ["f", "o", "o"]
    
    =====
    
    let s = new Set(['foo', window]); 
    Array.from(s); 
    // ["foo", window]
    
    =====
    
    let m = new Map([[1, 2], [2, 4], [4, 8]]);
    Array.from(m); 
    // [[1, 2], [2, 4], [4, 8]]
    
    const mapper = new Map([['1', 'a'], ['2', 'b']]);
    Array.from(mapper.values());
    // ['a', 'b'];
    
    Array.from(mapper.keys());
    // ['1', '2'];
    
    =====
    
    function f() {
      return Array.from(arguments);
    }
    
    f(1, 2, 3); // [1, 2, 3]
    
    =====
    
    Array.from([1, 2, 3], x => x + x);  
    // x => x + x代表这是一个函数，只是省略了其他的定义，这是一种Lambda表达式的写法
    // 箭头的意思表示从当前数组中取出一个值，然后自加，并将返回的结果添加到新数组中    
    // [2, 4, 6]
    Array.from({length: 5}, (v, i) => i);
    // [0, 1, 2, 3, 4]复制代码

**数组去重合并**

    function combine(){ 
        let arr = [].concat.apply([], arguments);  //没有去重复的新数组 
        return Array.from(new Set(arr));
    } 
    
    var m = [1, 2, 2], n = [2,3,3]; 
    console.log(combine(m,n));                     // [1, 2, 3]复制代码

**Array.of()**

*   创建一个具有可变数量参数的新数组实例，而不考虑参数的数量或类型
*   `Array.of()` 和 `Array` 构造函数之间的区别在于处理整数参数：`Array.of(7)` 创建一个具有单个元素 7 的数组，而 `Array(7)` 创建一个长度为7的空数组（注意：这是指一个有7个空位(empty)的数组，而不是由7个`undefined`组成的数组）

    Array.of(7);       // [7] 
    Array.of(1, 2, 3); // [1, 2, 3]
    Array.of(undefined); // [undefined]
    Array(7);          // [ , , , , , , ]
    Array(1, 2, 3);    // [1, 2, 3]复制代码

**Array.isArray()**

用于确定传递的值是否是一个 Array。

    // 下面的函数调用都返回 true
    Array.isArray([]);
    Array.isArray([1]);
    Array.isArray(new Array());
    Array.isArray(new Array('a', 'b', 'c', 'd'))
    // 鲜为人知的事实：其实 Array.prototype 也是一个数组。
    Array.isArray(Array.prototype); 
    
    // 下面的函数调用都返回 false
    Array.isArray();
    Array.isArray({});
    Array.isArray(null);
    Array.isArray(undefined);
    Array.isArray(17);
    Array.isArray('Array');
    Array.isArray(true);
    Array.isArray(false);
    Array.isArray(new Uint8Array(32))
    Array.isArray({ __proto__: Array.prototype });复制代码

当检测Array实例时, Array.isArray 优于 instanceof,因为Array.isArray能检测iframes.

    var iframe = document.createElement('iframe');
    document.body.appendChild(iframe);
    xArray = window.frames[window.frames.length-1].Array;
    var arr = new xArray(1,2,3); // [1,2,3]
    
    // Correctly checking for Array
    Array.isArray(arr);  // true
    // Considered harmful, because doesn't work though iframes
    arr instanceof Array; // false复制代码

![](https://juejin.cn/post/data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="800" height="600"></svg> "点击并拖拽以移动")**reduce()**

对数组中的每个元素执行一个由您提供的 reducer 函数(升序执行)，将其结果汇总为单个返回值。

reducer 函数接收4个参数:

1.  Accumulator (acc) (累计器)
2.  Current Value (cur) (当前值)
3.  Current Index (idx) (当前索引)
4.  Source Array (src) (源数组)

您的 reducer 函数的返回值分配给累计器，该返回值在数组的每个迭代中被记住，并最后成为最终的单个结果值。

回调函数第一次执行时，`accumulator` 和`currentValue`的取值有两种情况：  

*   如果调用`reduce()`时提供了`initialValue`，`accumulator`取值为`initialValue`，`currentValue`取数组中的第一个值；
*   如果没有提供 `initialValue`，那么`accumulator`取数组中的第一个值，`currentValue`取数组中的第二个值。
*   如果没有提供`initialValue`，reduce 会从索引1的地方开始执行 callback 方法，跳过第一个索引。如果提供`initialValue`，从索引0开始。
*   如果数组为空且没有提供initialValue，会抛出TypeError
*   如果数组仅有一个元素（无论位置如何）并且没有提供initialValue， 或者有提供initialValue但是数组为空，那么此唯一值将被返回并且callback不会被执行。

    var maxCallback = (acc, cur) => Math.max(acc.x, cur.x)
    var maxCallback2 = (max, cur) => Math.max(max, cur);
    // reduce() 没有初始值
    [{x: 22}, {x: 42}].reduce(maxCallback); // 42
    [{x: 22}].reduce(maxCallback); // { x: 22 }
    [].reduce(maxCallback); // TypeError
    // map/reduce; 这是更好的方案，即使传入空数组或更大数组也可正常执行
    [{x: 22}, {x: 42}].map(el => el.x)
        .reduce(maxCallback2, -Infinity)复制代码

![](https://juejin.cn/post/data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="800" height="600"></svg> "点击并拖拽以移动")**reduce() 如何运行**

假如运行下段`reduce()`代码：

    [0, 1, 2, 3, 4].reduce(function(accumulator, currentValue, currentIndex, array){
      return accumulator + currentValue;
    });
    
    ===
    
    [0, 1, 2, 3, 4].reduce((prev, curr) => prev + curr );
    复制代码

![](https://juejin.cn/post/data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="800" height="600"></svg> "点击并拖拽以移动")callback 被调用四次，每次调用的参数和返回值如下表：

`callback`

`accumulator`

`currentValue`

`currentIndex`

`array`

return value

first call

`0`

`1`

`1`

`[0, 1, 2, 3, 4]`

`1`

second call

`1`

`2`

`2`

`[0, 1, 2, 3, 4]`

`3`

third call

`3`

`3`

`3`

`[0, 1, 2, 3, 4]`

`6`

fourth call

`6`

`4`

`4`

`[0, 1, 2, 3, 4]`

`10`

提供一个初始值作为`reduce()`方法的第二个参数，以下是运行过程及结果：

    [0, 1, 2, 3, 4].reduce((accumulator, currentValue, currentIndex, array) => {
        return accumulator + currentValue
    }, 10)复制代码

![](https://juejin.cn/post/data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="800" height="600"></svg> "点击并拖拽以移动")

`callback`

`accumulator`

`currentValue`

`currentIndex`

`array`

return value

first call

`10`

`0`

`0`

`[0, 1, 2, 3, 4]`

`10`

second call

`10`

`1`

`1`

`[0, 1, 2, 3, 4]`

`11`

third call

`11`

`2`

`2`

`[0, 1, 2, 3, 4]`

`13`

fourth call

`13`

`3`

`3`

`[0, 1, 2, 3, 4]`

`16`

fifth call

`16`

`4`

`4`

`[0, 1, 2, 3, 4]`

`20`

数组里所有值的和

    var total = [0, 1, 2, 3].reduce(
        (acc, cur) => acc + cur, 0
    )复制代码

![](https://juejin.cn/post/data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="800" height="600"></svg> "点击并拖拽以移动")**累加对象数组里的值**

要累加对象数组中包含的值，必须提供初始值，以便各个item正确通过你的函数。

    var sum = [{x: 1}, {x: 2}, {x: 3}].reduce(
        (accumulator, currentValue) => accumulator + currentValue.x, 0
    )
    console.log(sum) // logs 6复制代码

![](https://juejin.cn/post/data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="800" height="600"></svg> "点击并拖拽以移动")**将二维数组转化为一维**

    var flattened = [[0, 1], [2, 3], [4, 5]].reduce(
        (acc, cur) => acc.concat(cur), []
    )
    
    // [0, 1, 2, 3, 4, 5]复制代码

![](https://juejin.cn/post/data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="800" height="600"></svg> "点击并拖拽以移动")**计算数组中每个元素出现的次数**

    var names = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice']
    var countedNames = names.reduce(function (allNames, name) {
        if (name in allNames) {
            allNames[name]++
        } else {
            allNames[name] = 1
        }
        return allNames
    }, {})
    // countedNames is:
    // { 'Alice': 2, 'Bob': 1, 'Tiff': 1, 'Bruce': 1 }复制代码

![](https://juejin.cn/post/data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="800" height="600"></svg> "点击并拖拽以移动")**按属性对object分类**

    var people = [
        {name: 'Alice', age: 21},
        {name: 'Max', age: 20},
        {name: 'Jane', age: 20}
    ]
    function groupBy (objectArray, property) {
        return objectArray.reduce(function (acc, obj) {
            var key = obj[property]
            if (!acc[key]) {
                acc[key] = []
            }
            acc[key].push(obj)
            return acc
        }, {})
    }
    var groupedPeople = groupBy(people, 'age')
    // groupedPeople is:
    // { 
    //   20: [
    //     { name: 'Max', age: 20 }, 
    //     { name: 'Jane', age: 20 }
    //   ], 
    //   21: [{ name: 'Alice', age: 21 }] 
    // }复制代码

![](https://juejin.cn/post/data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="800" height="600"></svg> "点击并拖拽以移动")**使用扩展运算符和initialValue绑定包含在对象数组中的数组**

    // friends - 对象数组
    // where object field "books" - list of favorite books 
    var friends = [{
      name: 'Anna',
      books: ['Bible', 'Harry Potter'],
      age: 21
    }, {
      name: 'Bob',
      books: ['War and peace', 'Romeo and Juliet'],
      age: 26
    }, {
      name: 'Alice',
      books: ['The Lord of the Rings', 'The Shining'],
      age: 18
    }];
    
    // allbooks - list which will contain all friends' books +  
    // additional list contained in initialValue
    var allbooks = friends.reduce(function(prev, curr) {
      return [...prev, ...curr.books];
    }, ['Alphabet']);
    
    // allbooks = [
    //   'Alphabet', 'Bible', 'Harry Potter', 'War and peace', 
    //   'Romeo and Juliet', 'The Lord of the Rings',
    //   'The Shining'
    // ]复制代码

![](https://juejin.cn/post/data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="800" height="600"></svg> "点击并拖拽以移动")**数组去重**

    var myArray = ['a', 'b', 'a', 'b', 'c', 'e', 'e', 'c', 'd', 'd', 'd', 'd'];
    var myOrderedArray = myArray.reduce(function (accumulator, currentValue) {
      if (accumulator.indexOf(currentValue) === -1) {
        accumulator.push(currentValue);
      }
      return accumulator
    }, [])
    
    console.log(myOrderedArray);复制代码

    let arr = [1,2,1,2,3,5,4,5,3,4,4,4,4];
    let result = arr.sort().reduce((init, current) => {
        if(init.length === 0 || init[init.length-1] !== current) {
            init.push(current);
        }
        return init;
    }, []);
    console.log(result); //[1,2,3,4,5]复制代码

![](https://juejin.cn/post/data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="800" height="600"></svg> "点击并拖拽以移动")**使用 reduce实现map**

    if (!Array.prototype.mapUsingReduce) {
      Array.prototype.mapUsingReduce = function(callback, thisArg) {
        return this.reduce(function(mappedArray, currentValue, index, array) {
          mappedArray[index] = callback.call(thisArg, currentValue, index, array);
          return mappedArray;
        }, []);
      };
    }
    
    [1, 2, , 3].mapUsingReduce(
      (currentValue, index, array) => currentValue + index + array.length
    ); // [5, 7, , 10]复制代码

![](https://juejin.cn/post/data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="800" height="600"></svg> "点击并拖拽以移动")**reduceRight()**

*   接受一个函数作为累加器（accumulator）和数组的每个值（从右到左）将其减少为单个值。
*   如果调用 `reduceRight` 时提供了 `initialValue` 参数，则 `accumulator`等于 `initialValue`，`currentValue` 等于数组中的最后一个值。
*   如果没有提供 `initialValue` 参数，则 `accumulator` 等于数组最后一个值， `currentValue` 等于数组中倒数第二个值。
*   如果数组为空，且没有提供 `initialValue` 参数，将会抛出一个 `TypeError 错误。`
*   `如果数组只有一个元素且没有提供` `initialValue` 参数，或者提供了 `initialValue` 参数，但是数组为空将会直接返回数组中的那一个元素或 `initialValue` 参数，而不会调用 `callback`。

    [0, 1, 2, 3, 4].reduceRight(function(previousValue, currentValue, index, array) {
        return previousValue + currentValue;
    });复制代码

![](https://juejin.cn/post/data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="800" height="600"></svg> "点击并拖拽以移动")回调将会被调用四次，每次调用的参数及返回值如下：

  

`previousValue`

`currentValue`

`index`

`array`

return value

first call

4

3

3

`[0,1,2,3,4]`

7

second call

7

`2`

`2`

`[0,1,2,3,4]`

9

third call

9

1

1

`[0,1,2,3,4]`

10

fourth call

10

0

0

`[0,1,2,3,4]`

`10`

`reduceRight` 返回值是最后一次调用回调的返回值（`10）。`

如果提供了一个 `initialValue` 参数，则结果如下：

    [0, 1, 2, 3, 4].reduceRight(function(previousValue, currentValue, index, array) {
        return previousValue + currentValue;
    }, 10);复制代码

![](https://juejin.cn/post/data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="800" height="600"></svg> "点击并拖拽以移动")

  

`previousValue`

`currentValue`

`index`

`array`

return value

first call

`10`

4

4

`[0,1,2,3,4]`

`14`

second call

14

3

3

`[0,1,2,3,4]`

`17`

third call

17

`2`

`2`

`[0,1,2,3,4]`

`19`

fourth call

19

1

1

`[0,1,2,3,4]`

20

fifth call

20

0

0

`[0,1,2,3,4]`

`20`

`reduceRight` 返回值为 20。

**map()**

*   创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果。
*   map 方法会给原数组中的每个元素都按顺序调用一次 callback 函数。callback 每次执行后的返回值（包括 undefined）组合起来形成一个新数组。 callback 函数只会在有值的索引上被调用；那些从来没被赋过值或者使用 delete 删除的索引则不会被调用。
*   callback 函数会被自动传入三个参数：数组元素，元素索引，原数组本身。
*   如果 thisArg 参数提供给map，则会被用作回调函数的this值。否则undefined会被用作回调函数的this值。this的值最终相对于callback函数的可观察性是依据the usual rules for determining the this seen by a function决定的
*   map 不修改调用它的原数组本身（当然可以在 callback 执行时改变原数组）

**求数组中每个元素的平方根**

    var numbers = [1, 4, 9]
    var roots = numbers.map(item => {
        return Math.sqrt(item)
    })
    // roots的值为[1, 2, 3], numbers的值仍为[1, 4, 9]复制代码

![](https://juejin.cn/post/data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="800" height="600"></svg> "点击并拖拽以移动")因为Math.sqrt只有一个参数，所以可简写为

    var numbers = [1, 4, 9]
    var roots = numbers.map(Math.sqrt)
    // roots的值为[1, 2, 3], numbers的值仍为[1, 4, 9]复制代码

![](data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="800" height="600"></svg> "点击并拖拽以移动")需要注意 parseInt 方法是有两个参数的

    ["1", "2", "3"].map(parseInt); // 期望输出 [1, 2, 3], 而实际结果是 [1, NaN, NaN].复制代码

![](https://juejin.cn/post/data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="800" height="600"></svg> "点击并拖拽以移动")解决方法

    function returnInt(element) {
      return parseInt(element, 10);
    }
    
    ['1', '2', '3'].map(returnInt); // [1, 2, 3]复制代码

![](https://juejin.cn/post/data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="800" height="600"></svg> "点击并拖拽以移动")**使用 map 重新格式化数组中的对象**

    var kvArray = [{key: 1, value: 10}, 
                   {key: 2, value: 20}, 
                   {key: 3, value: 30}];
    
    var reformattedArray = kvArray.map(function(obj) { 
       var rObj = {};
       rObj[obj.key] = obj.value;
       return rObj;
    });
    
    // reformattedArray 数组为： [{1: 10}, {2: 20}, {3: 30}], 
    
    // kvArray 数组未被修改: 
    // [{key: 1, value: 10}, 
    //  {key: 2, value: 20}, 
    //  {key: 3, value: 30}]复制代码

![](https://juejin.cn/post/data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="800" height="600"></svg> "点击并拖拽以移动")**Mapping 含 undefined的数组**

当返回undefined 或没有返回任何内容时:

    var numbers = [1, 2, 3, 4];
    var filteredNumbers = numbers.map(function(num, index) {
      if(index < 3) {
         return num;
      }
    });
    //index goes from 0,so the filterNumbers are 1,2,3 and undefined.
    // filteredNumbers is [1, 2, 3, undefined]
    // numbers is still [1, 2, 3, 4]复制代码

**find()**

*   返回数组中满足提供的测试函数的第一个元素的值。否则返回 undefined。
*   `find`方法对数组中的每一项元素执行一次 `callback` 函数，直至有一个 callback 返回 `true`。当找到了这样一个元素后，该方法会立即返回这个元素的值，否则返回 undefined。
*   注意 `callback` 函数会为数组中的每个索引调用即从 `0` 到 `length - 1`，而不仅仅是那些被赋值的索引，这意味着对于稀疏数组来说，该方法的效率要低于那些只遍历有值的索引的方法。
*   `callback`函数带有3个参数：当前元素的值、当前元素的索引，以及数组本身。
*   如果提供了 `thisArg`参数，那么它将作为每次 `callback`函数执行时的`this` ，如果未提供，则使用 undefined。
*   `find`方法不会改变数组。

    var inventory = [
        {name: 'apples', quantity: 2},
        {name: 'bananas', quantity: 0},
        {name: 'cherries', quantity: 5}
    ];
    
    function findCherries(fruit) { 
        return fruit.name === 'cherries';
    }
    
    console.log(inventory.find(findCherries)); // { name: 'cherries', quantity: 5 }复制代码

    var arr = [
        {name: 'zxx', age: 18},
        {name: 'wfd', age: 19},
    ]
    var arrTest = arr.find((item, index, array) => {
        console.log('当前值:' + JSON.stringify(item), '当前值的索引' + index, '当前数组' + array)
        return item.age >= 18
    })
    console.log(arrTest)复制代码

![](data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="435" height="61"></svg>)![](https://juejin.cn/post/data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="800" height="600"></svg> "点击并拖拽以移动")​

    var arr = [
        {name: 'zxx', age: 18},
        {name: 'wfd', age: 19},
    ]
    var arrTest = arr.find((item, index, array) => {
        console.log('当前值:' + JSON.stringify(item), '当前值的索引' + index, '当前数组' + array)
        return item.name === 'wfd'
    })
    console.log(arrTest)复制代码

![](data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="427" height="90"></svg>)![](https://juejin.cn/post/data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="800" height="600"></svg> "点击并拖拽以移动")​

下面的例子展示了如何从一个数组中寻找质数（如果找不到质数则返回 undefined）

    function isPrime(element, index, array) {
      var start = 2;
      while (start <= Math.sqrt(element)) {
        if (element % start++ < 1) {
          return false;
        }
      }
      return element > 1;
    }
    
    console.log([4, 6, 8, 12].find(isPrime)); // undefined, not found
    console.log([4, 5, 8, 12].find(isPrime)); // 5复制代码

当在回调中删除数组中的一个值时，当访问到这个位置时，其传入的值是 undefined：

**findIndex()**

*   返回数组中满足提供的测试函数的第一个元素的索引。否则返回-1。
*   `findIndex`方法对数组中的每个数组索引`0..length-1`（包括）执行一次`callback`函数，直到找到一个`callback`函数返回真实值（强制为`true`）的值。
*   如果找到这样的元素，`findIndex`会立即返回该元素的索引。
*   如果回调从不返回真值，或者数组的`length`为0，则`findIndex`返回-1。
*   与某些其他数组方法（如Array#some）不同，在稀疏数组中，即使对于数组中不存在的条目的索引也会调用回调函数。
*   回调函数调用时有三个参数：元素的值，元素的索引，以及被遍历的数组。
*   如果一个 `thisArg` 参数被提供给 `findIndex`, 它将会被当作`this`使用在每次回调函数被调用的时候。如果没有被提供，将会使用 undefined。`findIndex`不会修改所调用的数组。

以下示例查找数组中素数的元素的索引（如果不存在素数，则返回-1）。

    function isPrime(element, index, array) {
      var start = 2;
      while (start <= Math.sqrt(element)) {
        if (element % start++ < 1) {
          return false;
        }
      }
      return element > 1;
    }
    
    console.log([4, 6, 8, 12].findIndex(isPrime)); // -1, not found
    console.log([4, 6, 7, 12].findIndex(isPrime)); // 2复制代码

    var arr = [
        {name: 'zxx', age: 18},
        {name: 'wfd', age: 19},
    ]
    var arrTest = arr.findIndex((item, index, array) => {
        console.log('当前值:' + JSON.stringify(item), '当前值的索引' + index, '当前数组' + array)
        return item.name === 'wfd'
    })
    console.log(arrTest)复制代码

![](data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="403" height="83"></svg>)![](https://juejin.cn/post/data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="800" height="600"></svg> "点击并拖拽以移动")​

### 将多层级数组转化为一级数组

提取嵌套数组元素最终合并为一个数组

    let ary = [1, [2, [3, [4, 5]]], 6];// -> [1, 2, 3, 4, 5, 6]复制代码

1\. 调用ES6中的flat方法

    ary = ary.flat(Infinity);复制代码

`flat()` 方法会移除数组中的空项:

    var arr4 = [1, 2, , 4, 5];
    arr4.flat();
    // [1, 2, 4, 5]复制代码

![](data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="800" height="600"></svg> "点击并拖拽以移动")2\. replace + split

    ary = str.replace(/(\[|\])/g, '').split(',')复制代码

![](https://juejin.cn/post/data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="800" height="600"></svg> "点击并拖拽以移动")3\. replace + JSON.parse

    str = str.replace(/(\[|\])/g, '');
    str = '[' + str + ']';
    ary = JSON.parse(str);复制代码

![](https://juejin.cn/post/data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="800" height="600"></svg> "点击并拖拽以移动")4\. 普通递归

    let result = [];
    let fn = function(ary) {
      for(let i = 0; i < ary.length; i++) {
        let item = ary[i];
        if (Array.isArray(ary[i])){
          fn(item);
        } else {
          result.push(item);
        }
      }
    }复制代码

![](https://juejin.cn/post/data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="800" height="600"></svg> "点击并拖拽以移动")5\. 利用reduce函数迭代

    function flatten(ary) {
        return ary.reduce((pre, cur) => {
            return pre.concat(Array.isArray(cur) ? flatten(cur) : cur);
        }, []);
    }
    let ary = [1, 2, [3, 4], [5, [6, 7]]]
    console.log(flatten(ary))复制代码

![](https://juejin.cn/post/data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="800" height="600"></svg> "点击并拖拽以移动")6\. 扩展运算符

    //只要有一个元素有数组，那么循环继续
    while (ary.some(Array.isArray)) {
      ary = [].concat(...ary);
    }复制代码

### ![](https://juejin.cn/post/data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="800" height="600"></svg> "点击并拖拽以移动")判断数组中是否包含某个值

方法一：array.indexOf

> 此方法判断数组中是否存在某个值，如果存在，则返回数组元素的下标，否则返回-1。

    var arr = [1, 2, 3, 4]
    var index = arr.indexOf(3)
    console.log(index)复制代码

![](https://juejin.cn/post/data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="800" height="600"></svg> "点击并拖拽以移动")方法二：array.includes(searcElement\[,fromIndex\])

> 此方法判断数组中是否存在某个值，如果存在返回true，否则返回false

    var arr = [1, 2, 3, 4]
    if (arr.includes(3)) {
        console.log('存在')
    } else {
        console.log('不存在')
    }复制代码

![](https://juejin.cn/post/data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="800" height="600"></svg> "点击并拖拽以移动")方法三：array.find(callback\[,thisArg\])

> 返回数组中满足条件的**第一个元素的值**，如果没有，返回undefined

    var arr = [1, 2, 3, 4]
    var result = arr.find(item => {
        return item > 3
    })
    console.log(result)复制代码

![](https://juejin.cn/post/data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="800" height="600"></svg> "点击并拖拽以移动")方法四：array.findeIndex(callback\[,thisArg\])

> 返回数组中满足条件的第一个元素的下标，如果没有找到，返回`-1`\]

    var arr = [1, 2, 3, 4]
    var result = arr.findIndex(item => {
        return item > 3
    })
    console.log(result)复制代码

arguments详解，类数组转数组方法
--------------------

### arguments为什么不是数组

因为arguments本身并不能调用数组方法，它是一个另外一种对象类型，只不过属性从0开始排，依次为0，1，2...最后还有callee和length属性。我们也把这样的对象称为类数组。

    function test () {
        console.log(arguments)
        console.log(arguments.push(1))
    }
    test(1, 'zxx', {a: 3}, ['a', 2, {name: 'zxx', age: 18}])复制代码

![](data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="430" height="219"></svg>)![](https://juejin.cn/post/data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="800" height="600"></svg> "点击并拖拽以移动")​

常见的类数组还有：

*   用getElementsByTagName/ClassName()获得的HTMLCollection
*   用querySelector获得的nodeList

### 伪数组转数组的方法

**方法一：Array.prototype.slice.call()**

    function test () {
        let args = Array.prototype.slice.call(arguments)
        console.log(args)
        args.unshift(3)
        console.log(args)
    }
    test(1, 'zxx', {a: 3}, ['a', 2, {name: 'zxx', age: 18}])复制代码

![](https://juejin.cn/post/data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="800" height="600"></svg> "点击并拖拽以移动")**方法二：Array.from()**

    function test () {
        let args = Array.from(arguments)
        console.log(args)
        args.unshift(3)
        console.log(args)
    }
    test(1, 'zxx', {a: 3}, ['a', 2, {name: 'zxx', age: 18}])复制代码

![](https://juejin.cn/post/data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="800" height="600"></svg> "点击并拖拽以移动")**方法三：ES的扩展运算符...**

    function test () {
        let args = [...arguments]
        console.log(args)
        args.unshift(3)
        console.log(args)
    }
    test(1, 'zxx', {a: 3}, ['a', 2, {name: 'zxx', age: 18}])复制代码

![](https://juejin.cn/post/data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="800" height="600"></svg> "点击并拖拽以移动")**方法四：利用concat+apply**

    function test () {
        let args = Array.prototype.concat.apply([], arguments)
        console.log(args)
        args.unshift(3)
        console.log(args)
    }
    test(1, 'zxx', {a: 3}, ['a', 2, {name: 'zxx', age: 18}])复制代码

![](data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="236" height="276"></svg>)![](data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="800" height="600"></svg> "点击并拖拽以移动")​

###   

![](https://juejin.cn/post/data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="800" height="600"></svg> "点击并拖拽以移动")

  

.markdown-body pre,.markdown-body pre>code.hljs{color:#333;background:#f8f8f8}.hljs-comment,.hljs-quote{color:#998;font-style:italic}.hljs-keyword,.hljs-selector-tag,.hljs-subst{color:#333;font-weight:700}.hljs-literal,.hljs-number,.hljs-tag .hljs-attr,.hljs-template-variable,.hljs-variable{color:teal}.hljs-doctag,.hljs-string{color:#d14}.hljs-section,.hljs-selector-id,.hljs-title{color:#900;font-weight:700}.hljs-subst{font-weight:400}.hljs-class .hljs-title,.hljs-type{color:#458;font-weight:700}.hljs-attribute,.hljs-name,.hljs-tag{color:navy;font-weight:400}.hljs-link,.hljs-regexp{color:#009926}.hljs-bullet,.hljs-symbol{color:#990073}.hljs-built\_in,.hljs-builtin-name{color:#0086b3}.hljs-meta{color:#999;font-weight:700}.hljs-deletion{background:#fdd}.hljs-addition{background:#dfd}.hljs-emphasis{font-style:italic}.hljs-strong{font-weight:700}
