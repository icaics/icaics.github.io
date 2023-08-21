# icaics.github.io

### [少女前线主线剧情时间轴 - Girls' Frontline Story Timeline](https://icaics.github.io/gf_timeline/)

#### 说明

- 本时间轴因个人兴趣及练习网页开发所制作，灵感来自于以前看到过的「白箱时间轴」，旨在向更多的朋友介绍「[少女前线](http://gf.ppgame.com/web/pc/index.html)」游戏主线剧情的魅力。

- 文本在游戏原有剧情上结合了整体背景故事设定，配以部分设定说明，资料参考了部分网络上公开的设定、剧情文本合集与剧情截图。

- 使用游戏素材版权归游戏制作组所有，个人能力有限，如有疏漏及错误还请指正，最终剧情请以游戏本体展示为准。

#### 参考资料

- [萌娘百科 - 少女前线:世界观](https://zh.moegirl.org/少女前线:世界观)
- [NGA 少女前线-16LAB 研究院 少女前线主线剧情文本阅读](https://bbs.ngacn.cc/read.php?tid=12213204)
- [德拉贡诺夫废人养成 bilibili 专栏](https://space.bilibili.com/218683#/article)
- [台历上的少前大事件时间线](https://tieba.baidu.com/p/4926626022)
- [少女前线背景设定时间线总结整理【更新改进版】](https://tieba.baidu.com/p/4685237079)
- [2018 年冬日活动“坍缩点”](https://weibo.com/ttarticle/p/show?id=2309404213543208629472)
- [少女前线 2018 冬活“塌缩点”全剧情对话整理](https://weibo.com/ttarticle/p/show?id=2309404205309404030707)

#### 项目说明

- 项目采用数据分离形式，内容文本数据在 [data](https://github.com/icaics/icaics.github.io/tree/master/gf_timeline/data) 文件夹下，图片资源在 [image](https://github.com/icaics/icaics.github.io/tree/master/gf_timeline/image) 文件夹下，分不同语言存储

- 数据结构说明

  - [info.json](https://github.com/icaics/icaics.github.io/blob/master/gf_timeline/data/ZH_CN/info.json) 为项目说明，请忽略

  - [catalog.json](https://github.com/icaics/icaics.github.io/blob/master/gf_timeline/data/ZH_CN/catalog.json) 为目录对应数据

  ```
  {
  	"title": "目录",
  	"close": "返回",
  	"index": [
  		{
  			"title": "写在前面",
  			"index": 0 // 该数字可以直接通过 data.json 对应目标点所在行数 - 2) / 10 得到
  		},
  	]
  }
  ```

  - [header.json](https://github.com/icaics/icaics.github.io/blob/master/gf_timeline/data/ZH_CN/header.json) 为时间轴顶部 Tab 对应数据

  ```
  [
  	{
  		"title": "写在前面",
  		"position_x": 0 // 需要与 data.json 中的 x 坐标位置数据对应
  	},
  ]
  ```

  - [data.json](https://github.com/icaics/icaics.github.io/blob/master/gf_timeline/data/ZH_CN/data.json) 为时间轴主数据

  ```
  [
  	{
  		"title": "说明",
  		"subtitle": "少女前线主线剧情时间轴",
  		"content": "内容，使用 <br> 换行，注意字数限制，尽量适配移动端浏览器",
  		"image": "common_title.png", // image 文件夹中对应的图片名
  		"position_y": 0, // 时间轴纵向位置，0-2
  		"position_x": 0, // 时间轴横向位置，目前需要手动计算
  		"position_width": 200 // 时间轴项目宽度，默认为 300，非特殊需要不建议修改
  	},
  	// 注意这里的空行，为方便 catalog.json 快速找到对应位置链接
  	{
  		...
  	},
  ]
  ```

- 图片命名规范

  - 图片全部使用小写文件名，`.png` 格式的图片，尺寸为 `600 x 336` 大小的横向长方形图片，可以依情况略微缩小，但不能超过该尺寸
  - 图片保存时需要使用 `Web 格式保存 + PNG-8 128 仿色` 方式保存以减小图片体积
  - `common_` 开头的文件为通用图片
  - `intro_` 开头的文件为背景介绍章节图片
  - `x-y_` 开头的文件为普通章节图片
  - `x-e-y_` 开头的文件为紧急章节图片
  - `spx-y-z` 开头的文件为活动章节图片，`x` 为第 x 次活动，`y-z` 为活动地图代号

#### 期待您的参与

- 阅读大量剧情文本，同时不遗漏一些重要的信息，还要保证剧情的连贯和有趣，是件比较麻烦的工作。如果您有兴趣，欢迎参与进来。

- 如果不方便直接提交 PR，可以通过 Excel 或 txt 文本等任何形式，按之前已有的文案风格，总结某一章节的对应剧情（哪怕没有图片）。

- 再次感谢您的浏览与支持！
