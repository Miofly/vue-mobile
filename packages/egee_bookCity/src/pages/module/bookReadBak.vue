<template>
    <view>
        <view v-for="(item, index) in adDetail" :key="index" :class="['ad' + (index+1)]">
            <view>{{ item.title }}</view>
            <view v-for="(subItem, index) in item.srcUrls" :key="index">
                <image :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][3]"
                       :src="subItem" style="width: 120rpx"></image>
            </view>
            <view></view>
        </view>
        <view id="test" class="bg-white" style="position: fixed;bottom: 0;left: 0;width: 100%;">
            <view class="flex text-center flex-wrap align-center">
                <view v-for="(item, index) in lists" :key="index" :style="{width: '20%'}" style=""
                      @tap="novelSetting(item.name)">
                    <image :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][2]"
                           :src="item.img" class="border-radius-sm margin-top-xxl"
                           style="width: 60rpx;height: 60rpx"></image>
                    <view v-if="false" :class="['fa-' + item.icon]" :style="{color: item.color}" class="fa"
                          style="font-size: 20px"></view>
                    <view class="margin-top-xxl">{{ item.name }}</view>
                </view>
            </view>
        </view>

        <view :style="{fontSize: book.textSize + 'px'}" class="padding">
            <p>“兰子，我实在太想了，要不先让我进去吧！”......</p>
            <p><br></p>
            <p>坐落在大山深处的安家寨，四面环山，寨子里的人们将自家的吊脚楼都建在山腰之上，环绕着整个安家寨，形成了一道独特的风景。</p>
            <p><br></p>
            <p>清澈的秀江水养育了一代代安家寨的人们，让这里的汉子壮实粗犷，女人柔情似水。</p>
            <p><br></p>
            <p>可是到了晚上....嫂子地里刨萝卜...寨主老婆玉米地…寨子里晚上乱的很。</p>
            <p><br></p>
            <p>&nbsp; &nbsp;
                此时，正值盛夏，炽烈的阳光肆意地烧烤着大地，割完草的安壮壮将背篓子搁在安家寨东头的一棵千年槐树下，他身上早已被汗水浸透，浑身燥惹难耐，这几把鬼天气，老天爷爷，这么多天你他娘的也不下点雨，想热死壮大爷么？</p>
            <p><br></p>
            <p>&nbsp; &nbsp;
                安壮壮是安家寨里最特殊的一个，二十来岁了还是光棍一条，没事自称壮大爷，他这年纪在安家寨以及附近村寨绝对属于大龄未婚男青年，现如今的大山深处的各村寨的少男少女们，大都初中毕业，甚至还没有毕业就被父母催着说媳妇找婆家了，下手慢了只能将目标锁定在更远的村寨甚至不得不找外地媳妇，否则，在这个狼多羊少的年代，注定光棍！</p>
            <p><br></p>
            <p>而安壮壮，还是个孤儿，从小被安家寨里的神婆七婆养大，自然，也让他从小就接触那些被七婆翻烂了的易学，玄学，算命啥的书籍，耳闻目染之下，练就了一番口吐莲花，忽悠天地的三寸不烂之舌。</p>
            <p><br></p>
            <p>
                尤其喜欢钻到娘儿们堆里吹牛放屁瞎忽悠，跟这个姑娘说，秀儿，来！把你的小手手伸出来，让壮壮哥给你算一卦，看看你未来的男人在哪里？长啥样？你这小肚子以后能生几个娃？于是，借此机会就会捏着人家小姑娘粉嫩的玉手舍不得放，甚至再借机亲一口，逗得姑娘粉面通红就是他最开心的时候。</p>
            <p><br></p>
            <p>&nbsp; &nbsp;
                如果遇到的对手是寨子里的小媳妇，那就换一种手段了，他会突然指着人家说，香草嫂子，等下，别走！感觉你这两天印堂晦暗，壮大爷掐指一算，你家里肯定要出大事，要不要壮大爷给你好好算一卦？一般这种情况壮大爷都是提前知道了人家家里发生了啥事，因为壮大爷有半夜爬墙根的好习惯，他是光棍啊！夜深人静，长夜漫漫浑身憋得慌，家里也没电视啥的休闲娱乐，别的男人可以跟媳妇躲在被窝里捣鼓一番，制造人类尽情玩耍，他只有自己的五指姑娘相依相伴，咆哮中释放出多余的精力。</p>
            <p><br></p>
            <p>&nbsp; &nbsp;
                基本上人家被他这么一吓，自然会让他算一卦，大山里的娘儿们都没啥文化，经不起他这种假半仙的恐吓，这家伙就会借机摸一把对方丰满而透着肉香的身体，这些身子早已被自己男人揉透的娘儿们大都不介意，都知道壮大爷二十几岁没有过女人憋得难受，又是孤儿，就可怜他，让他揩揩油过过干瘾，但也会佯作生气地样子骂他，壮壮你个驴粪蛋子，想女人赶紧找媳妇去，再摸一下老娘的妹儿让我家安颜剁了你的爪子。</p>
            <p><br></p>
            <p>&nbsp; &nbsp;
                这个时候壮大爷并不会见好就收，而是得了便宜还卖乖，挑衅地作出一副要拉开裤子拉链的架势，“香草嫂子你吓唬谁呢？敢不敢接受挑战，看看壮大爷比你家安颜谁更厉害，谁更迟久？壮大爷驴粪蛋子的美名并非浪得虚名，不信的话先验货？”</p>
            <p><br></p>
            <p>&nbsp; &nbsp;
                一般到了这个时候，这些娘儿们都会笑得花枝乱颤，羞得俏脸通红，用粉拳用力地捶一下壮大爷健硕的胸肌，甩一句，你个驴粪蛋子！不要脸，不理你了！完了赶紧扭着活色鲜香的翘屯回家，不理他这个是非人。</p>
            <p><br></p>
            <p>&nbsp; &nbsp; 在安家寨，光棍和寡福属于一个级别的，同属是非人。</p>
            <p><br></p>
            <p>&nbsp; &nbsp;
                壮大爷会意犹未尽地望着这些带着质感的娘儿们落荒而逃，并由衷地发出自豪的感叹，跟壮大爷跑火车，谁怕谁呀？放眼安家寨的汉子，壮大爷的最壮最长，都是秀江里洗过澡的爷们，谁没看过谁呀？</p>
            <p><br></p>
            <p>&nbsp; &nbsp;
                但壮大爷并不是每个娘儿们都敢惹，寨子里采茶剧团的团长兰子是个例外。兰子除了是远近闻名的戏剧名伶，剧团里台柱子之外，还是安壮壮的堂嫂，安家寨安壮壮家这一支，总共有两家，他和堂哥安龙，但两家以前关系不好，具体什么原因安壮壮并不清楚，反正他懂事后才知道寨子里的村医安龙是他堂哥，是安龙的父母将他送给七婆收养的，由此，他对安龙一家好一阵子的恨意。</p>
            <p><br></p>
            <p>&nbsp; &nbsp;
                不过，今年年初，安龙上神秘莫测的幽情谷采草药时被不知道从哪里掉下来的石头砸死了，死得挺蹊跷，兰子也就成了寡福。而且，两人结婚多年并没有一男半女，兰子的肚子一直都是空瘪着，浪费了一方好水土，这让安龙这位远近闻名的村医很是没有面子。但他却对自己的身体无可奈何，到死都没闭眼，因为安家在他这一支算是绝种了！</p>
            <p><br></p>
            <p>&nbsp; &nbsp;
                其实，安壮壮是知道堂哥安龙是个没用的男人，且有种幸灾乐祸的快敢。有一回夜深人静，安壮壮想女人想的不行，鬼使神差地潜入了安龙家，爬他们家墙根，听到了安龙房间里堂嫂兰子那令人造热的喘洗声和安龙无奈的叹息声，意外地听到安龙建议自己貌美如花的媳妇先向堂弟安壮壮借点种子先传宗接代再说，说反正安壮壮是他亲堂弟，不算外人，结果被媳妇兰子啪啪打了几个耳光，说安龙不是个男人，说她就是一辈子不当娘，也不干这事。</p>
            <p><br></p>
            <p>&nbsp; &nbsp;
                从那天起，壮大爷对安龙夫妻俩的印象好了很多，并下定决心，这辈子一定要娶一个像堂嫂兰子这样贤惠的女人，美如天仙，艳压群芳，声似黄鹂，人淡如菊，在安家寨，她从不跟老公安龙之外的男人开一句出格的玩笑，她是个只会在戏里玩风情的女人，卸下妆，她永远都是那位高冷高傲高贵的‘三高’女神，永远让你敬而远之，不敢靠近。</p>
            <p><br></p>
            <p>
                安龙死后，安壮壮的心思开始发生了转变，非但不再恨安龙家，还想娶了堂嫂兰子，他喜欢兰子身上那股子让人心动的冷艳与高贵，寡福配光棍，不是绝配么？但他心里也清楚，兰子就算是寡福，也瞧不上他。想到这，躺在槐树下的壮大爷有点烦躁，加上天气闷热，他想去秀江里洗个澡，去去身体里的那股邪火。</p>
            <p><br></p>
            <p>
                夏天，安家寨的人平日里洗澡都会在秀江里，男人在秀江里畅游比赛，顺便暗自比试一下谁的下面最雄壮和伟岸，当然，这方面，壮大爷是安家寨男人默认和公认的一哥，无愧于壮壮这个名字，只是因为尚未婚配，没有女人，他还没有机会施展他的抱负而已。女人则躲在与秀江相隔一片小树林的秀江支流袁河中戏耍，沐浴，秀秀自己凹凸有致的身材，男女间两条河中沐浴，互不干涉，互不侵犯。</p>
            <p><br></p>
            <p>&nbsp; &nbsp; 安壮壮将背篓子就放在了槐树下，将背心脱了下来，露出了健硕有力的胸肌和几块鼓起的腹肌，他将背心掸在肩上，大步向秀江方向走去。</p>
            <p><br></p>
            <p>&nbsp; &nbsp;
                此地距离秀江三四里地，要路过一片密集的茶树林。此时，接近中午，茶树林里很闷热，安壮壮一边走一边寻思着要如何才能让堂嫂兰子接受他，他知道，跟兰子打交道，靠吹牛忽悠放屁是一条没有希望的死路，兰子不是个花瓶，更不是那种没有内涵的女人，要得到她的人先要得到她的心，而要得到她的心必须使用非常手段。但具体用什么方式，壮大爷还没想好，可他也知道，留给他的时间并不多，像兰子这样的女人，就算是个克夫的寡福，也是男人们争抢的目标，正所谓男人花下死，做鬼也风流，死在兰子如此艳丽的牡丹花下，值！</p>
            <p><br></p>
            <p>&nbsp; &nbsp; 何况兰子年纪也并不大，不到三十岁，正是女人熟透了，最有魅力的年龄。她不可能真的为安龙守一辈子的寡，她同意，她娘家人也不会干的。</p>
            <p><br></p>
            <p>&nbsp; &nbsp; 壮大爷已经知道了有不少外面的有钱男人委托杨家寨的媒婆凤姑到安家寨来给她说媒，好在都被兰子毫不犹豫地拒绝了，这让安壮壮更加钦佩和仰慕她。</p>
            <p><br></p>
            <p>&nbsp; &nbsp;
                就这样脑子里想着兰子的时候，安壮壮已经走到茶树林的深处，突然，附近传来了女人如歌似涕的叫声，嗯嗯啊啊，壮大爷尽管没做过男人，可经常爬人家墙根，又听老光棍安德财给他灌输了不少男女间的那种知识，知道女人和男人办事时，女人太爽了就会哭，不是真哭，这是爽到了极点时扛不住的表现。</p>
            <p><br></p>
            <p>&nbsp; &nbsp;
                所以他立刻就明白这茶树林里此时此刻正在发生什么故事，“妈妈的，这是哪对野鸳鸯啊？不嫌热么？大热天这么不辞辛苦地跑到茶树林里捣鼓，不怕把自己熬干？不管了，壮大爷这次捞着了，可以看看现场直播，咱也学习学习资深男人们的先进技术！”想到这，壮大爷悄悄地接近发出要命声音的地方，必须得瞧瞧到底是哪对野鸳鸯有此雅兴？</p>
            <p><br></p>
            <p>&nbsp; &nbsp;
                “大彪，慢点，受不了啊！......”安壮壮还没有接近目标就听到了女人喊出了男人的名字，而且，他也听出来了女人是谁，不是别人，正是安家寨的会计安民的媳妇秋梅，虽然不是那么肆无忌惮地嚎叫，可还是能辨别出是谁的胸腔里发出的声音，不过能感觉到秋梅的喊叫是极力控制着，忍受着，所以声音是闷闷的，听得壮大爷差点没扛住。</p>
            <p><br></p>
            <p>&nbsp; &nbsp; 而男人的身份更让壮大爷惊讶不已，居然是村长安大彪，驴日的安大彪，把人家安民的媳妇给办了，安民可是他的得力助手，所谓朋友妻，可以骑就这么来的么？缺德不缺德！</p>
            <p><br></p>
            <p>&nbsp; &nbsp;
                很快，树丛中一声怒吼之后陷入了短暂的喘吸声，再然后就听到男人瓮声瓮气地笑道：“秋梅，还是你搔蹄子更带劲，比秀儿她娘紧实多了，今天时间有点短，下回进城开个房间我们好好玩玩。这里也太热了，地上的草搁得老子膝盖疼，我们刚才应该到幽情谷边上的小溪里去搞，那个地方鬼都不去，一般情况是没人的，可以放心大胆地日，咱玩一出现实版的鸳鸯戏水！”安大彪坏笑道。</p>
            <p><br></p>
            <p>&nbsp; &nbsp;
                “坏蛋！你们男人就知道换着花样玩我们女人，大彪，要不我们现在去幽情谷，我还想要，刚才没过瘾，反正安民去镇里开会没个半天一天回不来，或者我们先回家给你整俩小菜，吃完饭我们再去幽情谷，秀儿她娘不是也上镇上去了么？今天机会难得！”</p>
            <p><br></p>
            <p>&nbsp; &nbsp;
                “不行，秀儿在家呢！我跟她说了中午在家吃饭，下次找机会吧！放心，老子就喜欢你这股子骚进，后天我也要去镇里开会，要不到时候你就跟安民说，你去镇上置办点东西，或者说是去看看安晴和安雨，完了我们去开个房间，怎么样？”</p>
            <p><br></p>
            <p>&nbsp; &nbsp; “晴儿和小雨今天就放假回家了，就说去镇上买东西，那你不许放老娘的鸽子。”</p>
            <p><br></p>
            <p>&nbsp; &nbsp; “放心吧！老子还怕你不去呢！不得想死我呀？那我们走了，你回家也洗洗吧！别让安民兄弟回来后看出来你被老子用过，那他不得跟老子急眼，嘿嘿、、”</p>
            <p><br></p>
            <p>&nbsp; &nbsp; “他现在一个月都不用两三次，没事的，他就是真知道了我们俩的事，最多让秀儿她娘陪他几次呗！这下两不相欠了，他心里也就平衡了。”</p>
            <p><br></p>
            <p>&nbsp; &nbsp; “哈哈、、你个骚娘儿们挺大方啊！但老子没那么大方，我用他媳妇行，他不可以碰我媳妇，我安大彪的女人，不换！哈哈、、”说完，就听到脚步声往安壮壮这边传来。</p>
            <p><br></p>
            <p>&nbsp; &nbsp;
                安壮壮连忙躲到了一茶树下面，果然是村长安大彪搂着安民的媳妇秋梅大摇大摆地从茶树林里出来，这对野鸳鸯做梦也没想到他们俩的事情已经被壮大爷给撞见了。望着秋梅扭着紧实的翘屯跟安大彪离开了茶树林，看得壮大爷直流哈喇子。</p>
            <p><br></p>
            <p>&nbsp; &nbsp;
                妈妈的傻蛋安民，村长让你去镇里开会就是把你支开好跟你婆娘玩呢！你这一出寨子，你婆娘又被村长给日过了，难怪安德财说你跟你婆娘一个月没两三次，原来是真的啊！原来你婆娘一直被村长用呢！还这么骚，一次不够要几次，遗憾的是刚才壮大爷没看到安大彪到底是怎么日你媳妇的，技术没学到也没法跟你细说！</p>
            <p><br></p>
            <p>&nbsp; &nbsp;
                可以说，今天这事让壮大爷刷新了对女人的认知，在他印象中，安民的媳妇秋梅是个特别正经的女人，跟老公安民的关系一直很好，夫妻俩在外人面前表现得非常恩爱，而且，他们还有一对双胞胎女儿，安晴和安雨，都是安家寨绝无仅有的美女加才女，安家寨美女不少，绝大部分都肤白人美，但若是论才，只有安民家的闺女，姐妹俩双双考上了高中，非常厉害。</p>
            <p><br></p>
            <p>&nbsp; &nbsp; 这安晴和安雨两大才女要是知道她们老娘这么骚，经常被村长安大彪日她们会是什么样的表情？还有，这安大彪跟秋梅有一腿，那安晴和安雨到底是谁的闺女呀？不会也是安大彪的吧？</p>
            <p><br></p>
            <p>想到这，壮大爷突然产生了一种我村好乱的感觉。</p>
            <p><br></p>
            <p>&nbsp; &nbsp;
                而且，这说明女人到底正经不正经，不是看她平时呈现给寨子里的老百姓面前是什么样的女人，而只有跟男人在一起时才会表现出她们最真实的样子，那如果这么理解，兰子嫂子呢？她真的是那么高冷高傲的女人吗？</p>
            <p><br></p>
            <p>还是只在外人面前表现得这个样子？</p>
            <p><br></p>
            <p>&nbsp; &nbsp; 壮大爷想去试试。</p>
            <p><br style="color: rgb(0, 0, 0); white-space: normal;"></p>
            <p><br></p>
            <p style="padding: 7px; margin-top: 0px; margin-bottom: 4px; background-image: initial; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial; text-indent: 2em; font-size: 1.3em; line-height: 2; color: rgb(0, 0, 0); font-family: &quot;Microsoft YaHei&quot;, ����, &quot;Arial Narrow&quot;; white-space: normal;">
                <br></p>
        </view>

        <m-popup v-model="show" :close-icon-pos="['top-left', 'top-right', 'bottom-left', 'bottom-right'][1]"
                 :closeable="true"
                 :mask="true" :mode="mode"
                 border-radius="10"
                 length="50%">
            <view v-if="mode == 'center'" style="height: 400rpx">
                <view class="close-btn">
                    <m-button size="medium" @click="show = false">关闭弹窗中间</m-button>
                </view>
            </view>
            <view v-if="mode != 'center'" class="close-btn">
                <view>
                    <text>字号</text>
                    <text style="width: 100rpx;height: 30px;background: chocolate;display: inline-block"
                          @tap="addTextSize">+
                    </text>
                    <text style="width: 100rpx;height: 30px;background: red;display: inline-block" @tap="minusTextSize">
                        -
                    </text>
                </view>
            </view>
        </m-popup>
    </view>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { commonGet } from '@/api'
import $ from 'jquery'

@Component({})
export default class home extends Vue {
    book: any = {
        textSize: 12
    }

    adList: any = []
    adDetail: any = []
    deny_cids: any = []
    adListIndex: number = 0

    show: boolean = false
    mode: string = ['center', 'top', 'bottom', 'left', 'right'][2]

    lists: any = [
        {
            img: 'https://6d69-miofly-k1xjk-1303051262.tcb.qcloud.la/images/glnz/1.jpg',
            icon: 'weixin',
            color: 'red',
            badge: 120,
            name: '目录'
        },
        {
            img: 'https://6d69-miofly-k1xjk-1303051262.tcb.qcloud.la/images/glnz/2.jpg',
            icon: 'close',
            color: 'orange',
            badge: 1,
            name: '夜间'
        },
        {
            img: 'https://6d69-miofly-k1xjk-1303051262.tcb.qcloud.la/images/glnz/3.jpg',
            icon: 'weixin',
            color: 'yellow',
            badge: 0,
            name: '设置'
        },
        {
            img: 'https://6d69-miofly-k1xjk-1303051262.tcb.qcloud.la/images/glnz/4.jpg',
            icon: 'weixin',
            color: 'olive',
            badge: 22,
            name: '免费小说'
        },
        {
            img: 'https://6d69-miofly-k1xjk-1303051262.tcb.qcloud.la/images/glnz/4.jpg',
            icon: 'weixin',
            color: 'olive',
            badge: 22,
            name: '窗口'
        },
    ]

    created () {
        this.getAdRes()
    }

    addTextSize () {
        if (this.book.textSize < 30) {
            this.book.textSize += 2
        }
    }

    minusTextSize () {
        if (this.book.textSize > 12) {
            this.book.textSize -= 2
        }
    }

    novelSetting (name) {
        if (name == '设置') {
            this.show = true
        }
    }

    async getAdRes () {
        const { data } = await commonGet('http://api.lc918.cn/h5/adverts?page_type=2&page=1&per_page=3')
        this.adList = data
        this.fetchAd(this.adList[this.adListIndex].pid)
    }

    fetchAd (pid) {
        const that = this
        const ua = navigator.userAgent
        $.ajax({
            type: 'get',
            headers: {
                'User-Agent': ua
            },
            url: 'http://ssp.1rtb.com/client/req_ad',
            data: {
                device_ua: ua,
                type: 'api',
                pid,
                deny_cids: this.deny_cids.join(','),
                app_id: '103019',
            },
            dataType: 'jsonp', // jsonp格式访问
            success (res) {
                if (res != undefined && res != '') {
                    that.adDetail.push(res)
                    if (res && that.deny_cids.indexOf(res.cid) == -1) { // 当前广告请求完毕后 将广告的cid(创意id)插入 deny_cids 用于防止广告重复
                        that.deny_cids.push(res.cid) // 插入创意id 用于广告位被重复广告占用
                    }
                    that.$nextTick(() => {
                        that.isElementInViewport(`.ad${that.adDetail.length}`, res.monitorUrl)
                    })
                    if (that.adListIndex === that.adList.length - 1) return
                }
                that.adListIndex++
                that.fetchAd(that.adList[that.adListIndex].pid)
            },
            error (err) {
                console.log(err)
                if (that.adListIndex === that.adList.length - 1) return
                that.adListIndex++
                that.fetchAd(that.adList[that.adListIndex].pid)
                // callback && callback(err)
            },
            complete () {
                // complete && complete()
            }
        })

        // this.$jsonp('http://ssp.1rtb.com/client/req_ad', {
        //     device_ua: ua,
        //     type: 'api',
        //     pid,
        //     deny_cids: this.deny_cids.join(','),
        //     app_id: '103019',
        // }, 0).then((res) => {
        //     if (res != undefined && res != '') {
        //         this.adDetail.push(res)
        //         this.$forceUpdate()
        //         if (res && this.deny_cids.indexOf(res.cid) == -1) { // 当前广告请求完毕后 将广告的cid(创意id)插入 deny_cids 用于防止广告重复
        //             this.deny_cids.push(res.cid) // 插入创意id 用于广告位被重复广告占用
        //         }
        //         if (this.adListIndex === this.adList.length - 1) return
        //     }
        //     this.adListIndex++
        //     this.fetchAd(this.adList[this.adListIndex].pid)
        //     this.$nextTick(() => {
        //         this.isElementInViewport(`.ad${this.adDetail.length}`, res.monitorUrl)
        //     })
        // }).catch((err) => {
        //     if (this.adListIndex === this.adList.length - 1) return
        //     this.adListIndex++
        //     this.fetchAd(this.adList[this.adListIndex].pid)
        //     throw err
        // })
    }

    isElementInViewport (el: any, monitorUrl) {
        this.$nextTick(() => {
            // eslint-disable-next-line no-unused-expressions
            uni.createSelectorQuery().select(el).boundingClientRect(rect => {
                const isInViewport = rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth)
                console.log(el, isInViewport)
                if (isInViewport) {
                    monitorUrl.forEach((url) => {
                        this.send(url)
                    })
                }
            }).exec()
        })
    }

    send (url) {
        const img = document.createElement('img')
        img.src = url
        img.style.display = 'none'
        document.body.appendChild(img)
    }


    checkMonitor (div, monitorUrl) {
        const isInViewport = this.isElementInViewport(div)
        if (isInViewport) {
            monitorUrl.forEach((url) => {
                this.send(url)
            })
            return
        }

        var checkFun = this.throttle(() => {
            if (this.isElementInViewport(div)) {
                window.removeEventListener('scroll', checkFun, true)
                monitorUrl.forEach((url) => {
                    this.send(url)
                })
            }
        }, 200)

        window.addEventListener('scroll', checkFun, true)
    }

    throttle (func, wait, options) {
        let args, context, result
        let timeout = null
        let previous = 0
        if (!options) options = {}
        const later = function () {
            previous = options.leading === false ? 0 : new Date().getTime()
            timeout = null
            result = func.apply(context, args)
            if (!timeout) context = args = null
        }
        return function () {
            const now = new Date().getTime()
            if (!previous && options.leading === false) previous = now
            // 计算剩余时间
            const remaining = wait - (now - previous)
            context = this
            args = arguments
            if (remaining <= 0 || remaining > wait) {
                if (timeout) {
                    clearTimeout(timeout)
                    timeout = null
                }
                previous = now
                result = func.apply(context, args)
                if (!timeout) context = args = null
            } else if (!timeout && options.trailing !== false) {
                // options.trailing=true时，延时执行func函数
                timeout = setTimeout(later, remaining)
            }
            return result
        }
    }
}
</script>

<style>

</style>
