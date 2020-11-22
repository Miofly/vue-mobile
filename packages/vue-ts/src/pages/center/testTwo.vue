<template>
	<view class="wrap">
		<!--<u-waterfall v-model="flowList" ref="uWaterfall">-->
			<!--<template v-slot:left="{ leftList }">-->
				<!--<view class="demo-warter" v-for="(item, index) in leftList" :key="index">-->
					<!--<view class="demo-img-wrap"><image class="demo-image" :src="item.image" mode="widthFix"></image></view>-->
					<!--<view class="demo-title">{{ item.title }}</view>-->
					<!--<view class="demo-price">{{ item.price }}元</view>-->
				<!--</view>-->
			<!--</template>-->
			<!--<template v-slot:right="{ rightList }">-->
				<!--<view class="demo-warter" v-for="(item, index) in rightList" :key="index">-->
					<!--<view class="demo-img-wrap"><image class="demo-image" :src="item.image" mode="widthFix"></image></view>-->
					<!--<view class="demo-title">{{ item.title }}</view>-->
					<!--<view class="demo-price">{{ item.price }}元</view>-->
				<!--</view>-->
			<!--</template>-->
		<!--</u-waterfall>-->
	</view>
</template>

<script>
	/* eslint-disable */
    function random(min, max) {
        if (min >= 0 && max > 0 && max >= min) {
            let gab = max - min + 1;
            return Math.floor(Math.random() * gab + min);
        } else {
            return 0;
        }
    }
    /**
     * 本算法来源于简书开源代码，详见：https://www.jianshu.com/p/fdbf293d0a85
     * 全局唯一标识符（uuid，Globally Unique Identifier）,也称作 uuid(Universally Unique IDentifier)
     * 一般用于多个组件之间,给它一个唯一的标识符,或者v-for循环的时候,如果使用数组的index可能会导致更新列表出现问题
     * 最可能的情况是左滑删除item或者对某条信息流"不喜欢"并去掉它的时候,会导致组件内的数据可能出现错乱
     * v-for的时候,推荐使用后端返回的id而不是循环的index
     * @param {Number} len uuid的长度
     * @param {Boolean} firstU 将返回的首字母置为"u"
     * @param {Nubmer} radix 生成uuid的基数(意味着返回的字符串都是这个基数),2-二进制,8-八进制,10-十进制,16-十六进制
     */
    function guid(len = 32, firstU = true, radix = null) {
        let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
        let uuid = [];
        radix = radix || chars.length;

        if (len) {
            // 如果指定uuid长度,只是取随机的字符,0|x为位运算,能去掉x的小数位,返回整数位
            for (let i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
        } else {
            let r;
            // rfc4122标准要求返回的uuid中,某些位为固定的字符
            uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
            uuid[14] = '4';

            for (let i = 0; i < 36; i++) {
                if (!uuid[i]) {
                    r = 0 | Math.random() * 16;
                    uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                }
            }
        }
        // 移除第一个字符,并用u替代,因为第一个字符为数值时,该guuid不能用作id或者class
        if (firstU) {
            uuid.shift();
            return 'u' + uuid.join('');
        } else {
            return uuid.join('');
        }
    }
    export default {
        data() {
            return {
                flowList: [],
                list: [
                    {
                        price: 35,
                        title: '北国风光，千里冰封，万里雪飘',
                        shop: '李白杜甫白居易旗舰店',
                        image: 'http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23327_s.jpg'
                    },
                    {
                        price: 75,
                        title: '望长城内外，惟余莽莽',
                        shop: '李白杜甫白居易旗舰店',
                        image: 'http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23325_s.jpg'
                    },
                    {
                        price: 385,
                        title: '大河上下，顿失滔滔',
                        shop: '李白杜甫白居易旗舰店',
                        image: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg'
                    },
                    {
                        price: 784,
                        title: '欲与天公试比高',
                        shop: '李白杜甫白居易旗舰店',
                        image: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/zzpic23369_s.jpg'
                    },
                    {
                        price: 7891,
                        title: '须晴日，看红装素裹，分外妖娆',
                        shop: '李白杜甫白居易旗舰店',
                        image: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2130_s.jpg'
                    },
                    {
                        price: 2341,
                        shop: '李白杜甫白居易旗舰店',
                        title: '江山如此多娇，引无数英雄竞折腰',
                        image: 'http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23346_s.jpg'
                    },
                    {
                        price: 661,
                        shop: '李白杜甫白居易旗舰店',
                        title: '惜秦皇汉武，略输文采',
                        image: 'http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23344_s.jpg'
                    },
                    {
                        price: 1654,
                        title: '唐宗宋祖，稍逊风骚',
                        shop: '李白杜甫白居易旗舰店',
                        image: 'http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23343_s.jpg'
                    },
                    {
                        price: 1678,
                        title: '一代天骄，成吉思汗',
                        shop: '李白杜甫白居易旗舰店',
                        image: 'http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23343_s.jpg'
                    },
                    {
                        price: 924,
                        title: '只识弯弓射大雕',
                        shop: '李白杜甫白居易旗舰店',
                        image: 'http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23343_s.jpg'
                    },
                    {
                        price: 8243,
                        title: '俱往矣，数风流人物，还看今朝',
                        shop: '李白杜甫白居易旗舰店',
                        image: 'http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23343_s.jpg'
                    }
                ]
            };
        },
        onLoad() {
            this.addRandomData();
        },
        methods: {
            addRandomData() {
                for (let i = 0; i < 10; i++) {
                    let index = random(0, this.list.length - 1);
                    // 先转成字符串再转成对象，避免数组对象引用导致数据混乱
                    let item = JSON.parse(JSON.stringify(this.list[index]));
                    item.id = guid();
                    this.flowList.push(item);
                }
                console.log(this.flowList)
            },
        }
    };
</script>

<style lang="scss" scoped>
	.demo-warter {
		border-radius: 8px;
		margin: 5px;
		background-color: #ffffff;
		padding: 8px;
		position: relative;
	}

	.demo-image {
		width: 100%;
		border-radius: 4px;
	}

	.demo-title {
		font-size: 30rpx;
		margin-top: 5px;
		color: #303133;
	}

	.demo-price {
		font-size: 30rpx;
		color: #fa3534;
		margin-top: 5px;
	}


</style>
