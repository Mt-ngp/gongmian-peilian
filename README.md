# 公面陪练 · 样品

公务员面试陪练 App 原型项目。

---

## 🎯 你要做的事(15 分钟搞定)

部署成功后,你会得到一个像 `https://gongmian-xxx.vercel.app` 这样的链接,**任何人在任何手机上打开都能直接用**,不需要登录任何账号。

---

## 一、注册账号(各 2 分钟)

### 1.1 注册 GitHub
1. 打开 https://github.com
2. 右上角 **Sign up** → 输入邮箱、设密码、起用户名
3. 验证邮箱 → 完成

### 1.2 注册 Vercel
1. 打开 https://vercel.com
2. 点 **Sign Up** → 选 **Continue with GitHub** → 用刚注册的 GitHub 账号授权登录
3. 跳过中间几个 onboarding 问题(选 Hobby 免费版即可)

---

## 二、把代码上传到 GitHub(5 分钟)

### 2.1 创建一个新仓库
1. 登录 GitHub,点右上角 **+ → New repository**
2. **Repository name** 填 `gongmian-peilian`(随便起,但记住这个名字)
3. 选 **Public**(公开,不影响,Vercel 才能读)
4. **不要**勾任何"Add a README" / ".gitignore" / "license"(我们文件夹里都有了)
5. 点 **Create repository**

### 2.2 上传文件夹里所有文件
创建仓库后,你会看到一个绿色页面写着 "Quick setup"。

1. 点中间的 **"uploading an existing file"** 链接(蓝色字)
2. 把当前**文件夹里的所有文件**(包括 `package.json`, `index.html`, `src/`, `api/`, 等等)**全部拖进**网页里的灰色虚线框
3. ⚠️ 不要拖整个 `gongmian-peilian` 文件夹本身,要进入这个文件夹后,**全选里面的内容拖进去**
4. 等几秒钟,文件全部上传完后,滚到页面最下面
5. 点绿色按钮 **Commit changes**

---

## 三、用 Vercel 部署(2 分钟)

1. 回到 https://vercel.com
2. 点 **Add New → Project**
3. 在列表里找到刚创建的 `gongmian-peilian` 仓库,点旁边的 **Import**
4. 弹出的配置页面**什么都不用改**,直接点最下面的 **Deploy**
5. 等 1-2 分钟构建...

构建完成后,你会看到一个庆祝页面 🎉,中间有个 `xxx.vercel.app` 的链接 — **这就是你的公开链接**!点一下就能在浏览器打开,可以发给任何人。

---

## 四、(可选)开通 AI 功能

样品里有两个用到 AI 的功能:
- **AI 智能点评**(单练完成后自动评分)
- **AI 客服**(客服中心里的「小公」)

这两个需要 Anthropic API Key 才能在 Vercel 上工作。**没有 API Key 也不影响其他所有功能**(界面、详情页、入驻、客服中心 FAQ、所有切换都正常),只是这两个 AI 功能会提示错误。

如果你想让 AI 也能正常工作:

### 4.1 申请 API Key
1. 打开 https://console.anthropic.com
2. 注册账号(用邮箱),登录
3. 左侧菜单找 **API Keys**
4. 点 **Create Key**,起个名字(比如 "vercel-prototype"),点创建
5. **立刻把生成的 key 复制下来**,只显示这一次,关掉就再也看不到了
6. ⚠️ Anthropic 是按使用量付费的,但有免费额度,做样品演示几乎用不了多少钱

### 4.2 把 Key 填进 Vercel
1. 回到 Vercel,进入你的 `gongmian-peilian` 项目
2. 点项目顶部的 **Settings**
3. 左侧菜单选 **Environment Variables**
4. 在 **Key** 那一栏填:`ANTHROPIC_API_KEY`(必须一字不差)
5. **Value** 那一栏粘贴你刚才复制的 key
6. 点 **Save**

### 4.3 重新部署
1. 顶部菜单点 **Deployments**
2. 找最上面那条最新的部署,点右边的 ⋯ 三个点
3. 选 **Redeploy** → 确认
4. 等 1-2 分钟,完成后 AI 功能就能用了

---

## 五、以后改样品怎么办?

每次改完 App.jsx,**只需把改过的文件重新上传到 GitHub**,Vercel 会自动检测到变化,自动重新部署,公开链接的内容会自动更新。不需要再做任何操作。

---

## 文件结构说明

```
gongmian-peilian/
├── api/
│   └── claude.js          ← Vercel 服务器端代理(保护 API Key)
├── src/
│   ├── App.jsx            ← 主应用代码(就是样品本体)
│   ├── main.jsx           ← React 启动入口
│   └── index.css          ← 全局样式
├── index.html             ← HTML 入口
├── package.json           ← 项目依赖
├── tailwind.config.js     ← Tailwind 配置
├── postcss.config.js      ← CSS 处理配置
├── vite.config.js         ← Vite 构建配置
└── README.md              ← 本文件
```

---

## 遇到问题怎么办?

- **构建失败 (Build Failed)** —— 看 Vercel 的 build log,把红色错误信息复制出来发给 Claude
- **打开是空白页** —— 通常是 GitHub 里漏传了文件,检查一下 `src/App.jsx` 是否上传了
- **AI 功能不工作** —— 大概率是 API Key 没配置成功,回到第四步检查 Environment Variables
- **想改样品但不会写代码** —— 直接把需求告诉 Claude,让 Claude 改完 App.jsx 后,你把新文件传到 GitHub 替换旧的就行
