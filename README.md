# 🏓 aipingpong · 乒乓球传奇档案库

> 见证每一位冠军的传奇之路

一个基于 Vue 3 的纯前端单页应用，收录 25 位奥运乒乓球运动员的职业生涯成就时间线与 9 大赛事历史成绩，支持中文、英文、韩语、日语四种语言切换及深色/浅色模式。

## ✨ 功能特性

### 运动员档案
- 25 位中国乒乓球运动员的完整职业生涯档案
- 全屏 Hero 展示区 + 图片轮播
- 数字计数动画展示核心统计数据（奥运金牌、世乒赛冠军、世界杯冠军等）
- 按年份展开的职业生涯时间线，支持滚动渐入动画
- 精选成就展示卡片

### 九大赛事成绩
- 奥运会、世锦赛、世界杯、全运会、全锦赛、ITTF/WTT 总决赛、亚运会、亚锦赛、亚洲杯
- 按年份折叠/展开的赛事成绩表
- 金/银/铜牌完整记录
- 运动员名字可点击跳转至对应档案页

### 多语言支持
- 中文（默认）、English、한국어、日本語
- 导航栏下拉菜单切换，偏好持久化至 localStorage
- 韩语/日语 UI 完全本地化，数据回退至英文

### 深色模式
- 一键切换深色/浅色主题
- 基于 CSS 变量的全局主题系统
- 偏好持久化至 localStorage

## 🛠 技术栈

| 技术 | 说明 |
|------|------|
| Vue 3 | CDN 引入，无需构建步骤 |
| Vue Router | Hash 路由（自研轻量实现） |
| CSS3 | CSS 变量 + 动画 + 响应式布局 |
| JSON | 纯文件数据源，无后端依赖 |
| IntersectionObserver | 滚动触发动画 |

## 📁 项目结构

```
aipingpong/
├── index.html                    # 入口页面
├── css/
│   └── style.css                 # 全局样式（含深色模式变量）
├── js/
│   ├── app.js                    # 主应用（路由 + 数据加载）
│   ├── i18n.js                   # 国际化模块（4语言翻译表）
│   └── components/
│       ├── navbar.js             # 导航栏（语言下拉 + 主题切换）
│       ├── athlete-list.js       # 首页运动员卡片网格
│       ├── athlete-detail.js     # 运动员详情页
│       └── tournament.js         # 赛事成绩页
├── data/                         # 中文数据（默认）
│   ├── athletes-index.json       # 运动员索引
│   ├── fanzhendong.json          # 25 个运动员详情文件
│   ├── ...
│   ├── olympics.json             # 9 个赛事成绩文件
│   └── ...
├── data/en/                      # 英文数据（完整翻译）
├── data/ko/                      # 韩语数据（索引已翻译，数据回退至 en）
├── data/ja/                      # 日语数据（索引已翻译，数据回退至 en）
├── images/athletes/              # 25 位运动员 Hero 图片
├── PRDS/                         # 产品需求文档
├── LICENSE                       # MIT 许可证
└── README.md
```

## 🚀 快速开始

无需安装任何依赖，直接启动静态服务器即可：

```bash
# 方式一：Python
python -m http.server 8080

# 方式二：Node.js (http-server)
npx http-server -p 8080

# 方式三：VS Code Live Server 插件
# 右键 index.html → Open with Live Server
```

浏览器访问 `http://localhost:8080` 即可。

## 📊 数据结构

### 运动员索引 (`athletes-index.json`)

```json
{
  "athletes": [
    {
      "id": "fanzhendong",
      "name": "樊振东",
      "nameEn": "FAN ZHENDONG · 乒乓传奇 · 超级全满贯",
      "country": "中国",
      "flag": "🇨🇳",
      "team": "中国国家乒乓球队",
      "birthDate": "1997-01-22",
      "photo": "images/athletes/fanzhendong/hero.jpg",
      "keyStats": "🏆 3枚奥运金牌 · 超级全满贯",
      "dataFile": "data/fanzhendong.json"
    }
  ]
}
```

### 运动员详情 (`{id}.json`)

包含 `heroImages`、`tags`、`stats`、`timeline`（按年份的职业成就）、`achievements`（精选成就卡片）等字段。

### 赛事数据 (`{tournament}.json`)

```json
{
  "id": "olympics",
  "name": "奥运会",
  "years": [
    {
      "year": "2024",
      "location": "巴黎",
      "events": {
        "mensSingles": {"gold": "樊振东", "silver": "莫雷加德", "bronze": ["勒布伦", "雨果"]},
        "womensSingles": {"gold": "陈梦", "silver": "孙颖莎", "bronze": ["早田希娜", "申裕斌"]}
      }
    }
  ]
}
```

## 🌐 路由说明

| 路径 | 页面 | 说明 |
|------|------|------|
| `#/` | 首页 | 运动员卡片网格 + 搜索 |
| `#/athlete/fanzhendong` | 运动员详情 | Hero + 统计 + 时间线 + 成就 |
| `#/tournaments` | 赛事成绩 | 九大赛切换 + 按年份展开 |
| `#/tournaments/olympics` | 指定赛事 | 直接定位到指定赛事 |

## 🌍 国际化

- UI 文本翻译存储在 `js/i18n.js` 的 `messages` 对象中
- 数据文件按语言分目录：`data/`（中文）、`data/en/`（英文）、`data/ko/`（韩语）、`data/ja/`（日语）
- 韩语和日语的运动员/赛事数据回退至英文版本
- 语言偏好通过 `localStorage` 持久化

### 新增语言步骤

1. 在 `i18n.js` 的 `messages` 中添加新语言翻译表
2. 在 `toggle()` 的 `langs` 数组和 `init()` 的验证列表中添加语言代码
3. 在 `getLangLabel()` 和 `getAllLanguages()` 中添加语言标签
4. 在 `dataPath()` 中配置数据路径映射
5. 创建 `data/{locale}/` 目录及对应数据文件

## 📱 响应式设计

- 桌面端：多列网格布局
- 平板：自适应列数调整
- 移动端：单列布局，导航栏适配

## 📄 许可证

[MIT License](LICENSE) © 2026 changqing

## 🙏 数据声明

数据整理自公开报道，仅供展示参考。
# aipingpong