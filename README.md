# OpenAINotOpenPocket.

一家反商业情绪杂货铺。贩卖宁静，不动钱包。

掏空钱包这件事，别人家已经做得足够好了。这里不制造焦虑，不兜售欲望。所有体验，一律 **$0.00**。

## 商品

| # | 商品 | 说明 |
|---|------|------|
| 01 | 深夜11点的10分钟绝对安静 | 隔绝现实的喧嚣与工作群的弹窗。此刻世界属于你。 |
| 02 | 小怪兽熟睡后的天使滤镜 | 提取最柔软的记忆。原谅今天所有的兵荒马乱。 |
| 03 | 毫无逻辑的偏爱与肯定 | 你今天已经做得很好了，无需向任何人证明什么。 |

## 技术栈

- [React 18](https://react.dev/)
- [Vite 5](https://vitejs.dev/)
- [Tailwind CSS 3](https://tailwindcss.com/)
- Web Audio API（收银铃「叮」与打印机「沙沙」声，现场合成，零音频文件）

## 本地开发

```bash
npm install
npm run dev        # 开发服务器，默认 http://localhost:5173
```

## 打包

```bash
npm run build      # 产物输出到 dist/
npm run preview    # 本地预览打包结果
```

## 部署到 Vercel

1. 把仓库推到 GitHub
2. 打开 [vercel.com](https://vercel.com) → **Add New Project** → 导入该仓库
3. Vercel 自动识别 Vite 项目，无需任何配置，直接 **Deploy**
4. 部署完成后会得到一个 `*.vercel.app` 域名

或者用 CLI：

```bash
npm i -g vercel
vercel             # 首次部署
vercel --prod      # 生产部署
```

## 玩法

加入购物车 → 去结算 → 静待一段宁静的过渡 → 收到一张 $0.00 的小票。

> 世界很喧嚣，但此刻你是宁静的。
> 您的钱包依然满载，一如您的灵魂。
