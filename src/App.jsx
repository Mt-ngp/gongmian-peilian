import React, { useState, useEffect, useRef } from "react";
import {
  Home, Users, GraduationCap, User, Mic, Sparkles, Star,
  ChevronRight, ArrowLeft, Clock, Award, MessageSquare,
  CheckCircle2, AlertCircle, BookOpen, Loader2, Send,
  Flame, Calendar, TrendingUp, Bookmark, MapPin, SlidersHorizontal, X,
  Repeat, Wallet, CheckCircle, Briefcase, Settings, ShieldCheck, Power, LogOut, KeyRound, Plus,
  Headphones, Phone, Mail, Search
} from "lucide-react";

// ——— Mock data ———
const TEACHERS = [
  { id: 1, name: "王立群", title: "前国考面试考官", years: 12, region: "北京", examType: ["国考", "省考"], specialty: "结构化", tags: ["押题命中率高", "结构化"], rating: 4.9, students: 2840, price: 680, avatar: "王" },
  { id: 2, name: "陈思齐", title: "省考90+学员导师", years: 8, region: "广东", examType: ["省考", "选调生"], specialty: "综合分析", tags: ["综合分析", "高分突破"], rating: 4.8, students: 1920, price: 480, avatar: "陈" },
  { id: 3, name: "李慕白", title: "应急应变专项导师", years: 6, region: "上海", examType: ["国考"], specialty: "应急应变", tags: ["应急应变", "实战派"], rating: 4.7, students: 1340, price: 380, avatar: "李" },
  { id: 4, name: "张文清", title: "综合分析题专家", years: 10, region: "江苏", examType: ["省考", "事业单位"], specialty: "综合分析", tags: ["综合分析", "热点解读"], rating: 4.9, students: 2210, price: 520, avatar: "张" },
  { id: 5, name: "赵雪松", title: "选调生面试金牌导师", years: 9, region: "山东", examType: ["选调生", "省考"], specialty: "结构化", tags: ["选调专项", "高分稳定"], rating: 4.9, students: 1680, price: 580, avatar: "赵" },
  { id: 6, name: "钱书云", title: "事业单位面试专家", years: 7, region: "浙江", examType: ["事业单位", "省考"], specialty: "组织管理", tags: ["事业单位", "组织管理"], rating: 4.6, students: 980, price: 320, avatar: "钱" },
  { id: 7, name: "孙立诚", title: "前省考考官", years: 15, region: "四川", examType: ["省考"], specialty: "人际关系", tags: ["资深考官", "人际关系"], rating: 4.8, students: 2050, price: 620, avatar: "孙" },
  { id: 8, name: "周之瑜", title: "国考押题型导师", years: 5, region: "北京", examType: ["国考"], specialty: "综合分析", tags: ["押题强", "性价比高"], rating: 4.5, students: 760, price: 280, avatar: "周" },
];

const PARTNERS = [
  { id: 1, name: "林书函", title: "2024国考85.6分上岸", score: 85.6, exam: "国考", region: "北京", tags: ["税务岗", "经验丰富"], rating: 4.9, sessions: 186, price: 120, avatar: "林" },
  { id: 2, name: "周明远", title: "省考面试82.4分", score: 82.4, exam: "省考", region: "广东", tags: ["综合岗", "结构化"], rating: 4.8, sessions: 142, price: 100, avatar: "周" },
  { id: 3, name: "苏婉清", title: "选调生面试88分", score: 88.0, exam: "选调生", region: "江苏", tags: ["选调", "高分实战"], rating: 4.9, sessions: 218, price: 150, avatar: "苏" },
  { id: 4, name: "高志远", title: "三战上岸 心态稳", score: 81.2, exam: "省考", region: "山东", tags: ["陪练老手", "鼓励型"], rating: 4.7, sessions: 96, price: 80, avatar: "高" },
  { id: 5, name: "吴清越", title: "2024国考90.2分上岸", score: 90.2, exam: "国考", region: "上海", tags: ["顶分实战", "海关岗"], rating: 4.9, sessions: 145, price: 200, avatar: "吴" },
  { id: 6, name: "郑思贤", title: "事业单位面试84分", score: 84.0, exam: "事业单位", region: "浙江", tags: ["事业编", "性价比"], rating: 4.6, sessions: 78, price: 70, avatar: "郑" },
  { id: 7, name: "陆云开", title: "选调生87.5分上岸", score: 87.5, exam: "选调生", region: "四川", tags: ["定向选调", "押题准"], rating: 4.8, sessions: 163, price: 130, avatar: "陆" },
  { id: 8, name: "黎晓夏", title: "省考88.8分面试逆袭", score: 88.8, exam: "省考", region: "广东", tags: ["逆袭型", "答题稳"], rating: 4.9, sessions: 102, price: 140, avatar: "黎" },
];

const ROOMS = [
  { id: 1, title: "国考结构化 3v1 模拟", type: "结构化", current: 3, total: 4, status: "进行中", host: "王立群" },
  { id: 2, title: "综合分析题专项突破", type: "综合分析", current: 5, total: 8, status: "即将开始", host: "陈思齐" },
  { id: 3, title: "无领导小组讨论模拟", type: "无领导", current: 4, total: 6, status: "等待中", host: "学员自组" },
  { id: 4, title: "应急应变实战训练", type: "应急应变", current: 2, total: 4, status: "等待中", host: "李慕白" },
];

const QUESTION_TYPES = [
  { id: "zonghe", label: "综合分析", desc: "社会现象/政策类题目", icon: "綜" },
  { id: "renji", label: "人际关系", desc: "人际沟通与协调", icon: "人" },
  { id: "yingji", label: "应急应变", desc: "突发情况处理", icon: "急" },
  { id: "zuzhi", label: "组织管理", desc: "活动组织与统筹", icon: "组" },
];

const QUESTIONS = {
  zonghe: { type: "综合分析题", text: "近年来,\"内卷\"和\"躺平\"成为社会热词,引发广泛讨论。请谈谈你对这两种现象的看法。" },
  renji: { type: "人际关系题", text: "你刚到新单位工作,发现同事们对你都比较冷淡,领导对你的要求也很严格。你会怎么处理?" },
  yingji: { type: "应急应变题", text: "你是单位办公室工作人员,正在准备一场重要的接待会议,临开会前半小时,突然接到通知主要领导无法出席。你会怎么办?" },
  zuzhi: { type: "组织管理题", text: "单位准备组织一次面向新员工的业务技能培训,领导让你负责此项工作。你会怎么开展?" },
};

// ——— Main App ———
export default function App() {
  const [tab, setTab] = useState("home");
  const [stack, setStack] = useState([]); // navigation stack
  const [topic, setTopic] = useState(null);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("student"); // 'student' | 'teacher' | 'partner'
  const [loggedOut, setLoggedOut] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);

  const openPersonDetail = (person, type) => {
    setSelectedPerson({ ...person, _type: type });
    setStack((s) => [...s, "person-detail"]);
  };
  const openSchedule = () => setStack((s) => [...s, "schedule"]);
  const openAvailability = () => setStack((s) => [...s, "availability"]);
  const openSupport = () => setStack((s) => [...s, "support"]);
  const openCreateRoom = () => setStack((s) => [...s, "create-room"]);
  const handleLogout = () => {
    setLoggedOut(true);
    setStack([]);
    setTab("me");
  };
  const handleLogin = (r) => {
    setRole(r);
    setLoggedOut(false);
    setStack([]);
    setTab("me");
  };

  const push = (screen) => setStack([...stack, screen]);
  const pop = () => setStack(stack.slice(0, -1));
  const reset = () => { setStack([]); setTopic(null); setAnswer(""); setFeedback(null); };

  const current = stack[stack.length - 1];

  const requestFeedback = async () => {
    if (!answer.trim() || answer.trim().length < 30) {
      alert("作答内容太短,请至少作答 30 字以上以便获得有效点评");
      return;
    }
    setLoading(true);
    const prompt = `你是一位资深的中国公务员面试评分专家,熟悉国考、省考、选调生面试评分标准。请对下面这位考生的作答进行专业点评。

【题型】${topic.type}
【题目】${topic.text}
【考生作答】${answer}

请严格按照以下 JSON 格式输出评分,不要输出任何其他文字、不要使用 markdown 代码块包裹:
{
  "totalScore": 一个 60 到 95 之间的整数,
  "level": "优秀/良好/中等/待提升 中的一个",
  "scores": {
    "content": 内容深度的评分 (60-95 整数),
    "expression": 表达流畅度的评分 (60-95 整数),
    "structure": 答题结构的评分 (60-95 整数)
  },
  "strengths": ["优点1(30字内)", "优点2(30字内)", "优点3(30字内)"],
  "improvements": ["待改进1(40字内具体可操作)", "待改进2(40字内)", "待改进3(40字内)"],
  "sample": "针对本题,给出一段 60 到 100 字的高分参考话术示例,要求结构清晰、有理有据"
}`;

    try {
      const response = await fetch("/api/claude", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1200,
          messages: [{ role: "user", content: prompt }],
        }),
      });
      const data = await response.json();
      const text = data.content.map((i) => i.text || "").join("");
      const clean = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      setFeedback(parsed);
      push("feedback");
    } catch (e) {
      alert("点评生成失败,请重试。错误:" + e.message);
    }
    setLoading(false);
  };

  return (
    <div className="w-full" style={{
      height: "100vh",
      overflow: "hidden",
      background: "radial-gradient(ellipse at top, #2a3447 0%, #14161e 60%, #0a0c12 100%)",
      fontFamily: "'Noto Sans SC', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&family=Noto+Serif+SC:wght@500;700;900&display=swap');
        html, body { overscroll-behavior: none; margin: 0; }
        .font-serif-cn { font-family: 'Noto Serif SC', 'STSong', 'SimSun', serif; }
        .scroll-x::-webkit-scrollbar { display: none; }
        .scroll-x { scrollbar-width: none; }
        .stamp { font-family: 'Noto Serif SC', serif; }
        @keyframes pulse-dot { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
        .live-dot { animation: pulse-dot 1.5s ease-in-out infinite; }

        .phone-shell {
          background: #FAF6EE;
          overflow: hidden;
          width: 100%;
          height: 100%;
        }
        @media (min-width: 500px) and (min-height: 700px) {
          .phone-shell {
            border-radius: 36px;
            border: 8px solid #1a1a1a;
            box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);
          }
        }
      `}</style>

      {/* Phone frame */}
      <div className="relative" style={{
        width: "min(390px, 100vw)",
        height: "min(800px, 100vh)"
      }}>
        <div className="phone-shell absolute inset-0">
          {/* Status bar */}
          <div className="h-11 px-7 flex items-center justify-between text-xs font-semibold" style={{ color: "#1a2332" }}>
            <span>9:41</span>
            <div className="flex gap-1 items-center">
              <span>·●●●</span>
              <span>5G</span>
              <span>▮</span>
            </div>
          </div>

          {/* Screen content */}
          <div className="h-[calc(100%-44px-72px)] overflow-y-auto">
            {loggedOut ? (
              <AuthFlow onLogin={handleLogin} />
            ) : (
              <>
            {!current && tab === "home" && <HomeScreen onNav={(s) => push(s)} setTab={setTab} />}
            {!current && tab === "train" && <TrainHubScreen onNav={(s) => push(s)} />}
            {!current && tab === "people" && <PeopleScreen onSelectPerson={openPersonDetail} />}
            {!current && tab === "me" && <MeScreen role={role} onLogout={handleLogout} onOpenSchedule={openSchedule} onOpenAvailability={openAvailability} onOpenSupport={openSupport} />}

            {current === "rooms" && <RoomsScreen onBack={pop} onCreate={openCreateRoom} />}
            {current === "solo" && <SoloPickType onBack={pop} onPick={(t) => { setTopic(QUESTIONS[t.id]); push("solo-answer"); }} />}
            {current === "solo-answer" && topic && <SoloAnswerScreen topic={topic} answer={answer} setAnswer={setAnswer} onBack={pop} onSubmit={requestFeedback} loading={loading} />}
            {current === "feedback" && feedback && <FeedbackScreen feedback={feedback} onDone={() => { reset(); setTab("home"); }} />}
            {current === "teachers" && <TeachersScreen onBack={pop} onSelectPerson={openPersonDetail} />}
            {current === "partners" && <PartnersScreen onBack={pop} onSelectPerson={openPersonDetail} />}
            {current === "person-detail" && selectedPerson && <PersonDetailScreen person={selectedPerson} onBack={pop} />}
            {current === "schedule" && <ScheduleScreen onBack={pop} />}
            {current === "availability" && <AvailabilityScreen onBack={pop} />}
            {current === "support" && <CustomerServiceScreen onBack={pop} onOpenChat={() => push("ai-chat")} />}
            {current === "ai-chat" && <AIChatScreen onBack={pop} />}
            {current === "create-room" && <CreateRoomScreen onBack={pop} />}
              </>
            )}
          </div>

          {/* Bottom Tab Bar */}
          {!current && !loggedOut && (
            <div className="absolute bottom-0 left-0 right-0 border-t bg-white/95 backdrop-blur" style={{ borderColor: "#E8DFCC" }}>
              <div className="flex justify-around pt-2 pb-6">
                {[
                  { id: "home", icon: Home, label: "首页" },
                  { id: "train", icon: Mic, label: "训练" },
                  { id: "people", icon: Users, label: "师资" },
                  { id: "me", icon: User, label: "我的" },
                ].map((t) => {
                  const Icon = t.icon;
                  const active = tab === t.id;
                  return (
                    <button key={t.id} onClick={() => setTab(t.id)} className="flex flex-col items-center gap-1 px-3">
                      <Icon size={22} strokeWidth={active ? 2.4 : 1.8} style={{ color: active ? "#C7472D" : "#7A6B52" }} />
                      <span className="text-[10px] font-medium" style={{ color: active ? "#C7472D" : "#7A6B52" }}>{t.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Home indicator */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 rounded-full" style={{ background: "#1a2332", opacity: 0.3 }} />
        </div>
      </div>
    </div>
  );
}

// ——— Screens ———

function HomeScreen({ onNav, setTab }) {
  return (
    <div className="px-5 pt-2 pb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <div className="text-[11px] tracking-widest" style={{ color: "#9A8866" }}>GONG MIAN PEI LIAN</div>
          <div className="font-serif-cn text-2xl font-bold" style={{ color: "#1a2332" }}>公面陪练</div>
        </div>
        <div className="w-10 h-10 rounded-full flex items-center justify-center stamp text-white" style={{ background: "#C7472D" }}>
          印
        </div>
      </div>

      {/* Hero countdown */}
      <div className="rounded-2xl p-5 mb-5 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #1a2332 0%, #2a3447 100%)" }}>
        <div className="absolute -right-6 -top-6 w-32 h-32 rounded-full opacity-10" style={{ background: "#C7472D" }} />
        <div className="relative">
          <div className="text-xs tracking-widest mb-1" style={{ color: "#B8956A" }}>距 2026 国考面试</div>
          <div className="flex items-baseline gap-2 mb-3">
            <span className="font-serif-cn text-5xl font-black text-white">28</span>
            <span className="text-white/70 text-sm">天</span>
          </div>
          <div className="text-white/80 text-xs leading-relaxed">同学,今天是你练习的第 14 天,已累计 23 次模拟。</div>
          <button onClick={() => { setTab("train"); onNav("solo"); }} className="mt-4 px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-1" style={{ background: "#C7472D", color: "#fff" }}>
            <Sparkles size={13} /> 立即开练
          </button>
        </div>
      </div>

      {/* Quick entries */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <button onClick={() => onNav("rooms")} className="rounded-xl p-4 text-left relative overflow-hidden" style={{ background: "#fff", border: "1px solid #E8DFCC" }}>
          <Users size={20} style={{ color: "#C7472D" }} />
          <div className="font-bold text-sm mt-2" style={{ color: "#1a2332" }}>真人对练房间</div>
          <div className="text-[11px] mt-1" style={{ color: "#7A6B52" }}>进行中 12 间</div>
          <div className="absolute top-3 right-3 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full live-dot" style={{ background: "#C7472D" }} />
            <span className="text-[9px]" style={{ color: "#C7472D" }}>LIVE</span>
          </div>
        </button>
        <button onClick={() => onNav("solo")} className="rounded-xl p-4 text-left relative overflow-hidden" style={{ background: "#1a2332" }}>
          <Sparkles size={20} style={{ color: "#B8956A" }} />
          <div className="font-bold text-sm mt-2 text-white">AI 智能单练</div>
          <div className="text-[11px] mt-1 text-white/60">即时点评 · 24 小时</div>
        </button>
      </div>

      {/* Section: rooms */}
      <SectionHeader title="今日热门房间" subtitle="正在进行" onMore={() => onNav("rooms")} />
      <div className="flex gap-3 overflow-x-auto scroll-x -mx-5 px-5 pb-1 mb-6">
        {ROOMS.slice(0, 3).map((r) => (
          <div key={r.id} className="rounded-xl p-4 shrink-0 w-60" style={{ background: "#fff", border: "1px solid #E8DFCC" }}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] px-2 py-0.5 rounded" style={{ background: "#FAF0E0", color: "#9A6A2A" }}>{r.type}</span>
              <span className="text-[10px] flex items-center gap-1" style={{ color: r.status === "进行中" ? "#C7472D" : "#7A6B52" }}>
                {r.status === "进行中" && <span className="w-1 h-1 rounded-full live-dot" style={{ background: "#C7472D" }} />}
                {r.status}
              </span>
            </div>
            <div className="font-bold text-sm leading-snug mb-3" style={{ color: "#1a2332" }}>{r.title}</div>
            <div className="flex items-center justify-between">
              <div className="text-[11px]" style={{ color: "#7A6B52" }}>主持:{r.host}</div>
              <div className="text-[11px] font-semibold" style={{ color: "#1a2332" }}>{r.current}/{r.total}人</div>
            </div>
          </div>
        ))}
      </div>

      {/* Section: teachers */}
      <SectionHeader title="金牌导师" subtitle="实战派" onMore={() => onNav("teachers")} />
      <div className="flex gap-3 overflow-x-auto scroll-x -mx-5 px-5 pb-1 mb-6">
        {TEACHERS.slice(0, 4).map((t) => (
          <div key={t.id} className="shrink-0 w-32 text-center">
            <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center font-serif-cn text-3xl text-white mb-2" style={{ background: "linear-gradient(135deg, #1a2332, #2a3447)" }}>
              {t.avatar}
            </div>
            <div className="font-bold text-sm" style={{ color: "#1a2332" }}>{t.name}</div>
            <div className="text-[10px] mt-0.5 leading-tight" style={{ color: "#7A6B52" }}>{t.title}</div>
            <div className="flex items-center justify-center gap-0.5 mt-1">
              <Star size={10} fill="#B8956A" stroke="#B8956A" />
              <span className="text-[10px] font-semibold" style={{ color: "#9A6A2A" }}>{t.rating}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Section: partners */}
      <SectionHeader title="高分陪练" subtitle="真实上岸" onMore={() => onNav("partners")} />
      <div className="space-y-2">
        {PARTNERS.slice(0, 2).map((p) => (
          <div key={p.id} className="rounded-xl p-3 flex items-center gap-3" style={{ background: "#fff", border: "1px solid #E8DFCC" }}>
            <div className="w-12 h-12 rounded-full flex items-center justify-center font-serif-cn text-xl shrink-0" style={{ background: "#FAF0E0", color: "#9A6A2A" }}>{p.avatar}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm" style={{ color: "#1a2332" }}>{p.name}</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded" style={{ background: "#1a2332", color: "#B8956A" }}>{p.title.split(" ")[0]}</span>
              </div>
              <div className="text-[11px] mt-0.5" style={{ color: "#7A6B52" }}>{p.title}</div>
              <div className="flex items-center gap-2 mt-1">
                <span className="flex items-center gap-0.5 text-[10px]" style={{ color: "#9A6A2A" }}><Star size={9} fill="#B8956A" stroke="#B8956A" />{p.rating}</span>
                <span className="text-[10px]" style={{ color: "#7A6B52" }}>· 已陪练 {p.sessions} 次</span>
              </div>
            </div>
            <button className="px-3 py-1.5 rounded-full text-[11px] font-semibold shrink-0" style={{ background: "#1a2332", color: "#fff" }}>预约</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionHeader({ title, subtitle, onMore }) {
  return (
    <div className="flex items-end justify-between mb-3">
      <div className="flex items-baseline gap-2">
        <h2 className="font-serif-cn text-lg font-bold" style={{ color: "#1a2332" }}>{title}</h2>
        <span className="text-[10px] tracking-widest" style={{ color: "#9A8866" }}>{subtitle}</span>
      </div>
      <button onClick={onMore} className="text-[11px] flex items-center" style={{ color: "#7A6B52" }}>更多 <ChevronRight size={12} /></button>
    </div>
  );
}

function TrainHubScreen({ onNav }) {
  return (
    <div className="px-5 pt-2 pb-6">
      <div className="font-serif-cn text-2xl font-bold mb-1" style={{ color: "#1a2332" }}>训练中心</div>
      <div className="text-xs mb-5" style={{ color: "#7A6B52" }}>选择一种训练方式开始</div>

      <button onClick={() => onNav("rooms")} className="w-full rounded-2xl p-5 mb-3 text-left relative overflow-hidden" style={{ background: "#fff", border: "1px solid #E8DFCC" }}>
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "#FAF0E0" }}>
            <Users size={22} style={{ color: "#C7472D" }} />
          </div>
          <div className="flex-1">
            <div className="font-bold text-base mb-1" style={{ color: "#1a2332" }}>真人陪练房间</div>
            <div className="text-xs leading-relaxed" style={{ color: "#7A6B52" }}>加入正在进行的模拟房间,或与导师/陪练 1v1 对练。3v1 结构化、无领导讨论全场景覆盖。</div>
            <div className="flex items-center gap-1 mt-2">
              <span className="w-1.5 h-1.5 rounded-full live-dot" style={{ background: "#C7472D" }} />
              <span className="text-[10px] font-semibold" style={{ color: "#C7472D" }}>当前 12 间在线</span>
            </div>
          </div>
          <ChevronRight size={18} style={{ color: "#9A8866" }} />
        </div>
      </button>

      <button onClick={() => onNav("solo")} className="w-full rounded-2xl p-5 text-left relative overflow-hidden" style={{ background: "linear-gradient(135deg, #1a2332 0%, #2a3447 100%)" }}>
        <div className="absolute -right-4 -bottom-4 w-24 h-24 rounded-full opacity-10" style={{ background: "#B8956A" }} />
        <div className="relative flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "rgba(184,149,106,0.2)" }}>
            <Sparkles size={22} style={{ color: "#B8956A" }} />
          </div>
          <div className="flex-1">
            <div className="font-bold text-base mb-1 text-white">AI 智能单练</div>
            <div className="text-xs leading-relaxed text-white/70">独自练习,AI 即时给出多维度评分与高分参考话术。24 小时全天候,无需预约。</div>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-[10px] font-semibold text-white/90 px-2 py-0.5 rounded" style={{ background: "rgba(184,149,106,0.3)" }}>实时点评</span>
              <span className="text-[10px] font-semibold text-white/90 px-2 py-0.5 rounded" style={{ background: "rgba(184,149,106,0.3)" }}>免费体验</span>
            </div>
          </div>
          <ChevronRight size={18} className="text-white/60" />
        </div>
      </button>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-3 gap-3">
        {[
          { label: "本周已练", value: "5", unit: "次" },
          { label: "累计时长", value: "8.2", unit: "小时" },
          { label: "平均得分", value: "82", unit: "分" },
        ].map((s, i) => (
          <div key={i} className="rounded-xl p-3 text-center" style={{ background: "#fff", border: "1px solid #E8DFCC" }}>
            <div className="font-serif-cn text-2xl font-bold" style={{ color: "#1a2332" }}>{s.value}<span className="text-xs font-normal ml-0.5" style={{ color: "#7A6B52" }}>{s.unit}</span></div>
            <div className="text-[10px] mt-0.5" style={{ color: "#7A6B52" }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RoomsScreen({ onBack, onCreate }) {
  return (
    <div>
      <ScreenHeader title="真人对练房间" onBack={onBack} />
      <div className="px-5 pt-1 pb-6">
        <div className="flex gap-2 mb-4 overflow-x-auto scroll-x -mx-5 px-5">
          {["全部", "结构化", "无领导", "综合分析", "应急应变"].map((t, i) => (
            <button key={t} className="px-3 py-1 rounded-full text-xs font-semibold shrink-0" style={{ background: i === 0 ? "#1a2332" : "#fff", color: i === 0 ? "#fff" : "#7A6B52", border: "1px solid #E8DFCC" }}>{t}</button>
          ))}
        </div>
        <div className="space-y-3">
          {ROOMS.map((r) => (
            <div key={r.id} className="rounded-xl p-4" style={{ background: "#fff", border: "1px solid #E8DFCC" }}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] px-2 py-0.5 rounded font-semibold" style={{ background: "#FAF0E0", color: "#9A6A2A" }}>{r.type}</span>
                <span className="text-[10px] flex items-center gap-1" style={{ color: r.status === "进行中" ? "#C7472D" : "#7A6B52" }}>
                  {r.status === "进行中" && <span className="w-1 h-1 rounded-full live-dot" style={{ background: "#C7472D" }} />}
                  {r.status}
                </span>
              </div>
              <div className="font-bold text-base mb-2" style={{ color: "#1a2332" }}>{r.title}</div>
              <div className="flex items-center justify-between">
                <div className="text-xs" style={{ color: "#7A6B52" }}>主持:<span className="font-semibold" style={{ color: "#1a2332" }}>{r.host}</span> · {r.current}/{r.total}人</div>
                <button className="px-4 py-1.5 rounded-full text-xs font-semibold" style={{ background: "#C7472D", color: "#fff" }}>加入</button>
              </div>
            </div>
          ))}
        </div>
        <button onClick={onCreate} className="w-full mt-4 rounded-xl py-3 font-semibold text-sm flex items-center justify-center gap-1.5" style={{ background: "#1a2332", color: "#fff" }}>
          <Plus size={14} /> 创建我的房间
        </button>
      </div>
    </div>
  );
}

function SoloPickType({ onBack, onPick }) {
  return (
    <div>
      <ScreenHeader title="AI 智能单练" onBack={onBack} />
      <div className="px-5 pt-1 pb-6">
        <div className="rounded-xl p-4 mb-5" style={{ background: "#FAF0E0", border: "1px solid #E8D5A8" }}>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles size={14} style={{ color: "#9A6A2A" }} />
            <span className="text-xs font-semibold" style={{ color: "#9A6A2A" }}>使用说明</span>
          </div>
          <div className="text-[11px] leading-relaxed" style={{ color: "#7A6B52" }}>
            选择题型 → 抽取题目 → 录音/打字作答 → AI 即时打分点评。点评包含分项评分、优点、待改进、范例话术。
          </div>
        </div>
        <div className="text-xs font-semibold mb-3" style={{ color: "#7A6B52" }}>选择题型</div>
        <div className="grid grid-cols-2 gap-3">
          {QUESTION_TYPES.map((t) => (
            <button key={t.id} onClick={() => onPick(t)} className="rounded-xl p-4 text-left" style={{ background: "#fff", border: "1px solid #E8DFCC" }}>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center font-serif-cn text-lg font-bold mb-2" style={{ background: "#1a2332", color: "#B8956A" }}>{t.icon}</div>
              <div className="font-bold text-sm" style={{ color: "#1a2332" }}>{t.label}</div>
              <div className="text-[10px] mt-0.5" style={{ color: "#7A6B52" }}>{t.desc}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function SoloAnswerScreen({ topic, answer, setAnswer, onBack, onSubmit, loading }) {
  return (
    <div>
      <ScreenHeader title={topic.type} onBack={onBack} />
      <div className="px-5 pt-1 pb-6">
        {/* Question card */}
        <div className="rounded-xl p-5 mb-4 relative" style={{ background: "#1a2332" }}>
          <div className="absolute top-3 right-3 stamp text-xs px-2 py-0.5 rounded" style={{ background: "#C7472D", color: "#fff" }}>题</div>
          <div className="text-[10px] tracking-widest mb-2" style={{ color: "#B8956A" }}>QUESTION</div>
          <div className="font-serif-cn text-base leading-relaxed text-white">{topic.text}</div>
        </div>

        {/* Answer area */}
        <div className="text-xs font-semibold mb-2 flex items-center justify-between" style={{ color: "#7A6B52" }}>
          <span>你的作答</span>
          <span className="text-[10px]">{answer.length} 字</span>
        </div>
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="此处可文字作答(实际产品中会支持语音录入与转写)。建议作答 200~400 字,体现观点、论证和总结..."
          className="w-full h-44 rounded-xl p-3 text-sm leading-relaxed resize-none outline-none"
          style={{ background: "#fff", border: "1px solid #E8DFCC", color: "#1a2332" }}
        />

        {/* Sample button */}
        <button
          onClick={() => setAnswer(`这道题反映了当代青年面临的双重困境。我认为应当辩证看待。\n\n第一,内卷的本质是资源有限下的过度竞争,而躺平则是对这种竞争的消极回避。两者看似对立,实则都源于社会发展中的阶段性矛盾。\n\n第二,我们既要警惕内卷对个体的消耗，也要避免躺平带来的活力流失。作为青年公务员,应当树立正确的价值观,把个人发展融入国家需要,在踏实奋斗中找到意义。\n\n第三,从政策层面看,需要持续优化就业环境、完善社会保障，让奋斗者有奔头、让躺平者有方向。`)}
          className="text-[11px] mt-2 underline"
          style={{ color: "#9A6A2A" }}
        >
          📝 一键填入示例作答(用于演示 AI 点评)
        </button>

        {/* Submit */}
        <button
          onClick={onSubmit}
          disabled={loading}
          className="w-full mt-5 py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2"
          style={{ background: loading ? "#9A8866" : "#C7472D", color: "#fff" }}
        >
          {loading ? (<><Loader2 size={16} className="animate-spin" /> AI 正在点评中...</>) : (<><Sparkles size={16} /> 结束并获取 AI 点评</>)}
        </button>
        <div className="text-[10px] text-center mt-2" style={{ color: "#9A8866" }}>由 Claude 提供 AI 点评能力</div>
      </div>
    </div>
  );
}

function FeedbackScreen({ feedback, onDone }) {
  const levelColor = { "优秀": "#C7472D", "良好": "#9A6A2A", "中等": "#7A6B52", "待提升": "#7A6B52" };
  return (
    <div>
      <ScreenHeader title="AI 点评报告" onBack={onDone} />
      <div className="px-5 pt-1 pb-6">
        {/* Total score */}
        <div className="rounded-2xl p-6 mb-4 text-center relative overflow-hidden" style={{ background: "linear-gradient(135deg, #1a2332 0%, #2a3447 100%)" }}>
          <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full opacity-10" style={{ background: "#C7472D" }} />
          <div className="relative">
            <div className="text-[10px] tracking-widest mb-2" style={{ color: "#B8956A" }}>TOTAL SCORE</div>
            <div className="font-serif-cn font-black text-white" style={{ fontSize: 64, lineHeight: 1 }}>{feedback.totalScore}</div>
            <div className="text-xs mt-2" style={{ color: levelColor[feedback.level] || "#B8956A" }}>
              <span className="px-3 py-0.5 rounded-full font-semibold" style={{ background: "rgba(199,71,45,0.2)", color: "#fff" }}>{feedback.level}</span>
            </div>
          </div>
        </div>

        {/* Sub-scores */}
        <div className="rounded-xl p-4 mb-4" style={{ background: "#fff", border: "1px solid #E8DFCC" }}>
          <div className="text-xs font-semibold mb-3" style={{ color: "#1a2332" }}>分项评分</div>
          {[
            { label: "内容深度", value: feedback.scores.content },
            { label: "表达流畅", value: feedback.scores.expression },
            { label: "结构清晰", value: feedback.scores.structure },
          ].map((s) => (
            <div key={s.label} className="mb-2.5 last:mb-0">
              <div className="flex justify-between text-[11px] mb-1">
                <span style={{ color: "#7A6B52" }}>{s.label}</span>
                <span className="font-bold" style={{ color: "#1a2332" }}>{s.value}</span>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "#F0E8D4" }}>
                <div className="h-full rounded-full" style={{ width: `${s.value}%`, background: "linear-gradient(90deg, #B8956A, #C7472D)" }} />
              </div>
            </div>
          ))}
        </div>

        {/* Strengths */}
        <div className="rounded-xl p-4 mb-3" style={{ background: "#fff", border: "1px solid #E8DFCC" }}>
          <div className="text-xs font-semibold mb-2 flex items-center gap-1.5" style={{ color: "#1a2332" }}>
            <CheckCircle2 size={14} style={{ color: "#5C8A52" }} /> 答题优点
          </div>
          {feedback.strengths.map((s, i) => (
            <div key={i} className="text-xs leading-relaxed mb-1.5 last:mb-0 flex gap-2" style={{ color: "#1a2332" }}>
              <span style={{ color: "#5C8A52" }}>·</span>
              <span>{s}</span>
            </div>
          ))}
        </div>

        {/* Improvements */}
        <div className="rounded-xl p-4 mb-3" style={{ background: "#fff", border: "1px solid #E8DFCC" }}>
          <div className="text-xs font-semibold mb-2 flex items-center gap-1.5" style={{ color: "#1a2332" }}>
            <AlertCircle size={14} style={{ color: "#C7472D" }} /> 待改进
          </div>
          {feedback.improvements.map((s, i) => (
            <div key={i} className="text-xs leading-relaxed mb-1.5 last:mb-0 flex gap-2" style={{ color: "#1a2332" }}>
              <span style={{ color: "#C7472D" }}>·</span>
              <span>{s}</span>
            </div>
          ))}
        </div>

        {/* Sample */}
        <div className="rounded-xl p-4 mb-4" style={{ background: "#FAF0E0", border: "1px solid #E8D5A8" }}>
          <div className="text-xs font-semibold mb-2 flex items-center gap-1.5" style={{ color: "#9A6A2A" }}>
            <BookOpen size={14} /> 高分参考话术
          </div>
          <div className="font-serif-cn text-xs leading-relaxed" style={{ color: "#1a2332" }}>{feedback.sample}</div>
        </div>

        <button onClick={onDone} className="w-full py-3 rounded-xl font-bold text-sm" style={{ background: "#1a2332", color: "#fff" }}>完成,返回首页</button>
      </div>
    </div>
  );
}

function PeopleScreen({ onSelectPerson }) {
  const [tab, setTab] = useState("teachers");
  return (
    <div className="px-5 pt-2 pb-6">
      <div className="font-serif-cn text-2xl font-bold mb-3" style={{ color: "#1a2332" }}>师资</div>
      <div className="flex p-1 rounded-xl mb-5" style={{ background: "#F0E8D4" }}>
        {[{ id: "teachers", label: "面试老师" }, { id: "partners", label: "高分陪练" }].map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)} className="flex-1 py-2 rounded-lg text-sm font-semibold" style={{ background: tab === t.id ? "#1a2332" : "transparent", color: tab === t.id ? "#fff" : "#7A6B52" }}>
            {t.label}
          </button>
        ))}
      </div>
      {tab === "teachers"
        ? <TeacherList onSelect={(t) => onSelectPerson(t, "teacher")} />
        : <PartnerList onSelect={(p) => onSelectPerson(p, "partner")} />}
    </div>
  );
}

function TeacherList({ onSelect = () => {} }) {
  const [region, setRegion] = useState("全部");
  const [exam, setExam] = useState("全部");
  const [price, setPrice] = useState("全部");
  const [rating, setRating] = useState("全部");
  const [specialty, setSpecialty] = useState("全部");
  const [sort, setSort] = useState("default");
  const [open, setOpen] = useState(null);

  const REGIONS = ["全部", "北京", "上海", "广东", "江苏", "浙江", "山东", "四川"];
  const EXAMS = ["全部", "国考", "省考", "选调生", "事业单位"];
  const PRICES = [
    { label: "全部", min: 0, max: Infinity },
    { label: "300以下", min: 0, max: 300 },
    { label: "300-500", min: 300, max: 500 },
    { label: "500-800", min: 500, max: 800 },
    { label: "800以上", min: 800, max: Infinity },
  ];
  const RATINGS = [
    { label: "全部", min: 0 },
    { label: "4.5+", min: 4.5 },
    { label: "4.7+", min: 4.7 },
    { label: "4.9+", min: 4.9 },
  ];
  const SPECS = ["全部", "结构化", "综合分析", "人际关系", "应急应变", "组织管理"];
  const SORTS = [
    { id: "default", label: "综合排序" },
    { id: "price-asc", label: "价格 ↑" },
    { id: "price-desc", label: "价格 ↓" },
    { id: "rating", label: "好评优先" },
    { id: "students", label: "学员最多" },
  ];

  const priceRange = PRICES.find((p) => p.label === price);
  const ratingMin = RATINGS.find((r) => r.label === rating).min;

  let filtered = TEACHERS.filter((t) => {
    if (region !== "全部" && t.region !== region) return false;
    if (exam !== "全部" && !t.examType.includes(exam)) return false;
    if (t.price < priceRange.min || t.price >= priceRange.max) return false;
    if (t.rating < ratingMin) return false;
    if (specialty !== "全部" && t.specialty !== specialty) return false;
    return true;
  });

  if (sort === "price-asc") filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sort === "price-desc") filtered = [...filtered].sort((a, b) => b.price - a.price);
  if (sort === "rating") filtered = [...filtered].sort((a, b) => b.rating - a.rating);
  if (sort === "students") filtered = [...filtered].sort((a, b) => b.students - a.students);

  const chips = [
    { id: "region", label: "地区", value: region, setter: setRegion, options: REGIONS },
    { id: "exam", label: "考试", value: exam, setter: setExam, options: EXAMS },
    { id: "price", label: "价格", value: price, setter: setPrice, options: PRICES.map((p) => p.label) },
    { id: "rating", label: "评分", value: rating, setter: setRating, options: RATINGS.map((r) => r.label) },
    { id: "specialty", label: "专长", value: specialty, setter: setSpecialty, options: SPECS },
  ];

  const reset = () => { setRegion("全部"); setExam("全部"); setPrice("全部"); setRating("全部"); setSpecialty("全部"); setSort("default"); setOpen(null); };
  const hasFilters = region !== "全部" || exam !== "全部" || price !== "全部" || rating !== "全部" || specialty !== "全部" || sort !== "default";

  const activeChip = chips.find((c) => c.id === open);

  return (
    <div>
      {/* Filter chips */}
      <div className="flex gap-2 overflow-x-auto scroll-x -mx-5 px-5 pb-2">
        {chips.map((f) => {
          const active = f.value !== "全部";
          const isOpen = open === f.id;
          return (
            <button
              key={f.id}
              onClick={() => setOpen(isOpen ? null : f.id)}
              className="px-3 py-1.5 rounded-full text-[11px] font-semibold flex items-center gap-1 shrink-0"
              style={{
                background: active ? "#1a2332" : isOpen ? "#FAF0E0" : "#fff",
                color: active ? "#fff" : isOpen ? "#9A6A2A" : "#7A6B52",
                border: `1px solid ${active ? "#1a2332" : "#E8DFCC"}`,
              }}
            >
              {active ? f.value : f.label}
              <span style={{ fontSize: 8, opacity: 0.6 }}>{isOpen ? "▲" : "▼"}</span>
            </button>
          );
        })}
        <button
          onClick={() => setOpen(open === "sort" ? null : "sort")}
          className="px-3 py-1.5 rounded-full text-[11px] font-semibold flex items-center gap-1 shrink-0"
          style={{
            background: sort !== "default" ? "#C7472D" : open === "sort" ? "#FAF0E0" : "#fff",
            color: sort !== "default" ? "#fff" : open === "sort" ? "#9A6A2A" : "#7A6B52",
            border: `1px solid ${sort !== "default" ? "#C7472D" : "#E8DFCC"}`,
          }}
        >
          <SlidersHorizontal size={11} />
          {SORTS.find((s) => s.id === sort).label}
        </button>
      </div>

      {/* Filter options panel */}
      {open && (
        <div className="rounded-xl p-3 mb-3 mt-1" style={{ background: "#fff", border: "1px solid #E8DFCC" }}>
          <div className="flex flex-wrap gap-2">
            {(open === "sort" ? SORTS.map((s) => s.label) : activeChip.options).map((opt, i) => {
              const isSort = open === "sort";
              const sortItem = isSort ? SORTS[i] : null;
              const active = isSort ? sort === sortItem.id : activeChip.value === opt;
              return (
                <button
                  key={opt}
                  onClick={() => {
                    if (isSort) setSort(sortItem.id);
                    else activeChip.setter(opt);
                    setOpen(null);
                  }}
                  className="px-3 py-1.5 rounded-full text-[11px]"
                  style={{
                    background: active ? "#FAF0E0" : "transparent",
                    color: active ? "#9A6A2A" : "#7A6B52",
                    border: `1px solid ${active ? "#E8D5A8" : "#E8DFCC"}`,
                    fontWeight: active ? 700 : 400,
                  }}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Result count + reset */}
      <div className="flex items-center justify-between text-[11px] mb-3 mt-1">
        <span style={{ color: "#7A6B52" }}>
          为你筛选到 <span className="font-bold" style={{ color: "#1a2332" }}>{filtered.length}</span> 位老师
        </span>
        {hasFilters && (
          <button onClick={reset} className="flex items-center gap-0.5 font-semibold" style={{ color: "#C7472D" }}>
            <X size={11} /> 清空筛选
          </button>
        )}
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 rounded-xl" style={{ background: "#fff", border: "1px solid #E8DFCC" }}>
          <div className="font-serif-cn text-3xl mb-2" style={{ color: "#9A8866" }}>无</div>
          <div className="text-xs mb-3" style={{ color: "#7A6B52" }}>暂无符合条件的老师</div>
          <button onClick={reset} className="px-4 py-1.5 rounded-full text-xs font-semibold" style={{ background: "#1a2332", color: "#fff" }}>
            清空筛选条件
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((t) => (
            <div key={t.id} onClick={() => onSelect(t)} className="rounded-xl p-4 flex gap-3 cursor-pointer active:scale-[0.99] transition-transform" style={{ background: "#fff", border: "1px solid #E8DFCC" }}>
              <div className="w-14 h-14 rounded-full flex items-center justify-center font-serif-cn text-2xl text-white shrink-0" style={{ background: "linear-gradient(135deg, #1a2332, #2a3447)" }}>
                {t.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="font-bold text-sm" style={{ color: "#1a2332" }}>{t.name}</span>
                  <Award size={12} style={{ color: "#C7472D" }} />
                  <span className="ml-auto flex items-center gap-0.5 text-[10px] px-1.5 py-0.5 rounded" style={{ background: "#F0E8D4", color: "#7A6B52" }}>
                    <MapPin size={9} /> {t.region}
                  </span>
                </div>
                <div className="text-[11px] mb-1.5" style={{ color: "#7A6B52" }}>{t.title} · {t.years}年</div>
                <div className="flex flex-wrap gap-1 mb-1">
                  {t.examType.map((e) => (
                    <span key={e} className="text-[9px] px-1.5 py-0.5 rounded font-semibold" style={{ background: "#1a2332", color: "#B8956A" }}>{e}</span>
                  ))}
                  {t.tags.map((tag) => (
                    <span key={tag} className="text-[9px] px-1.5 py-0.5 rounded" style={{ background: "#FAF0E0", color: "#9A6A2A" }}>{tag}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-2 text-[10px]" style={{ color: "#7A6B52" }}>
                    <span className="flex items-center gap-0.5"><Star size={9} fill="#B8956A" stroke="#B8956A" />{t.rating}</span>
                    <span>· {t.students} 学员</span>
                  </div>
                  <div className="font-serif-cn font-bold text-sm" style={{ color: "#C7472D" }}>
                    ¥{t.price}<span className="text-[10px] font-normal" style={{ color: "#7A6B52" }}>/小时</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function PartnerList({ onSelect = () => {} }) {
  const [region, setRegion] = useState("全部");
  const [exam, setExam] = useState("全部");
  const [price, setPrice] = useState("全部");
  const [rating, setRating] = useState("全部");
  const [scoreFilter, setScoreFilter] = useState("全部");
  const [sort, setSort] = useState("default");
  const [open, setOpen] = useState(null);

  const REGIONS = ["全部", "北京", "上海", "广东", "江苏", "浙江", "山东", "四川"];
  const EXAMS = ["全部", "国考", "省考", "选调生", "事业单位"];
  const PRICES = [
    { label: "全部", min: 0, max: Infinity },
    { label: "100以下", min: 0, max: 100 },
    { label: "100-150", min: 100, max: 150 },
    { label: "150-200", min: 150, max: 200 },
    { label: "200以上", min: 200, max: Infinity },
  ];
  const RATINGS = [
    { label: "全部", min: 0 },
    { label: "4.5+", min: 4.5 },
    { label: "4.7+", min: 4.7 },
    { label: "4.9+", min: 4.9 },
  ];
  const SCORES = [
    { label: "全部", min: 0 },
    { label: "80+", min: 80 },
    { label: "85+", min: 85 },
    { label: "88+", min: 88 },
  ];
  const SORTS = [
    { id: "default", label: "综合排序" },
    { id: "price-asc", label: "价格 ↑" },
    { id: "price-desc", label: "价格 ↓" },
    { id: "rating", label: "好评优先" },
    { id: "score", label: "上岸分高" },
    { id: "sessions", label: "陪练次数多" },
  ];

  const priceRange = PRICES.find((p) => p.label === price);
  const ratingMin = RATINGS.find((r) => r.label === rating).min;
  const scoreMin = SCORES.find((s) => s.label === scoreFilter).min;

  let filtered = PARTNERS.filter((p) => {
    if (region !== "全部" && p.region !== region) return false;
    if (exam !== "全部" && p.exam !== exam) return false;
    if (p.price < priceRange.min || p.price >= priceRange.max) return false;
    if (p.rating < ratingMin) return false;
    if (p.score < scoreMin) return false;
    return true;
  });

  if (sort === "price-asc") filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sort === "price-desc") filtered = [...filtered].sort((a, b) => b.price - a.price);
  if (sort === "rating") filtered = [...filtered].sort((a, b) => b.rating - a.rating);
  if (sort === "score") filtered = [...filtered].sort((a, b) => b.score - a.score);
  if (sort === "sessions") filtered = [...filtered].sort((a, b) => b.sessions - a.sessions);

  const chips = [
    { id: "region", label: "地区", value: region, setter: setRegion, options: REGIONS },
    { id: "exam", label: "考试", value: exam, setter: setExam, options: EXAMS },
    { id: "price", label: "价格", value: price, setter: setPrice, options: PRICES.map((p) => p.label) },
    { id: "rating", label: "评分", value: rating, setter: setRating, options: RATINGS.map((r) => r.label) },
    { id: "scoreFilter", label: "上岸分数", value: scoreFilter, setter: setScoreFilter, options: SCORES.map((s) => s.label) },
  ];

  const reset = () => { setRegion("全部"); setExam("全部"); setPrice("全部"); setRating("全部"); setScoreFilter("全部"); setSort("default"); setOpen(null); };
  const hasFilters = region !== "全部" || exam !== "全部" || price !== "全部" || rating !== "全部" || scoreFilter !== "全部" || sort !== "default";

  const activeChip = chips.find((c) => c.id === open);

  return (
    <div>
      {/* Filter chips */}
      <div className="flex gap-2 overflow-x-auto scroll-x -mx-5 px-5 pb-2">
        {chips.map((f) => {
          const active = f.value !== "全部";
          const isOpen = open === f.id;
          return (
            <button
              key={f.id}
              onClick={() => setOpen(isOpen ? null : f.id)}
              className="px-3 py-1.5 rounded-full text-[11px] font-semibold flex items-center gap-1 shrink-0"
              style={{
                background: active ? "#1a2332" : isOpen ? "#FAF0E0" : "#fff",
                color: active ? "#fff" : isOpen ? "#9A6A2A" : "#7A6B52",
                border: `1px solid ${active ? "#1a2332" : "#E8DFCC"}`,
              }}
            >
              {active ? f.value : f.label}
              <span style={{ fontSize: 8, opacity: 0.6 }}>{isOpen ? "▲" : "▼"}</span>
            </button>
          );
        })}
        <button
          onClick={() => setOpen(open === "sort" ? null : "sort")}
          className="px-3 py-1.5 rounded-full text-[11px] font-semibold flex items-center gap-1 shrink-0"
          style={{
            background: sort !== "default" ? "#C7472D" : open === "sort" ? "#FAF0E0" : "#fff",
            color: sort !== "default" ? "#fff" : open === "sort" ? "#9A6A2A" : "#7A6B52",
            border: `1px solid ${sort !== "default" ? "#C7472D" : "#E8DFCC"}`,
          }}
        >
          <SlidersHorizontal size={11} />
          {SORTS.find((s) => s.id === sort).label}
        </button>
      </div>

      {/* Filter options panel */}
      {open && (
        <div className="rounded-xl p-3 mb-3 mt-1" style={{ background: "#fff", border: "1px solid #E8DFCC" }}>
          <div className="flex flex-wrap gap-2">
            {(open === "sort" ? SORTS.map((s) => s.label) : activeChip.options).map((opt, i) => {
              const isSort = open === "sort";
              const sortItem = isSort ? SORTS[i] : null;
              const active = isSort ? sort === sortItem.id : activeChip.value === opt;
              return (
                <button
                  key={opt}
                  onClick={() => {
                    if (isSort) setSort(sortItem.id);
                    else activeChip.setter(opt);
                    setOpen(null);
                  }}
                  className="px-3 py-1.5 rounded-full text-[11px]"
                  style={{
                    background: active ? "#FAF0E0" : "transparent",
                    color: active ? "#9A6A2A" : "#7A6B52",
                    border: `1px solid ${active ? "#E8D5A8" : "#E8DFCC"}`,
                    fontWeight: active ? 700 : 400,
                  }}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Result count + reset */}
      <div className="flex items-center justify-between text-[11px] mb-3 mt-1">
        <span style={{ color: "#7A6B52" }}>
          为你筛选到 <span className="font-bold" style={{ color: "#1a2332" }}>{filtered.length}</span> 位陪练
        </span>
        {hasFilters && (
          <button onClick={reset} className="flex items-center gap-0.5 font-semibold" style={{ color: "#C7472D" }}>
            <X size={11} /> 清空筛选
          </button>
        )}
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 rounded-xl" style={{ background: "#fff", border: "1px solid #E8DFCC" }}>
          <div className="font-serif-cn text-3xl mb-2" style={{ color: "#9A8866" }}>无</div>
          <div className="text-xs mb-3" style={{ color: "#7A6B52" }}>暂无符合条件的陪练</div>
          <button onClick={reset} className="px-4 py-1.5 rounded-full text-xs font-semibold" style={{ background: "#1a2332", color: "#fff" }}>
            清空筛选条件
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((p) => (
            <div key={p.id} onClick={() => onSelect(p)} className="rounded-xl p-4 flex gap-3 cursor-pointer active:scale-[0.99] transition-transform" style={{ background: "#fff", border: "1px solid #E8DFCC" }}>
              <div className="w-14 h-14 rounded-full flex items-center justify-center font-serif-cn text-2xl shrink-0 relative" style={{ background: "#FAF0E0", color: "#9A6A2A" }}>
                {p.avatar}
                <div className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded text-[9px] font-bold stamp" style={{ background: "#C7472D", color: "#fff" }}>{p.score}</div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="font-bold text-sm" style={{ color: "#1a2332" }}>{p.name}</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded" style={{ background: "#1a2332", color: "#B8956A" }}>已上岸</span>
                  <span className="ml-auto flex items-center gap-0.5 text-[10px] px-1.5 py-0.5 rounded" style={{ background: "#F0E8D4", color: "#7A6B52" }}>
                    <MapPin size={9} /> {p.region}
                  </span>
                </div>
                <div className="text-[11px] mb-1.5" style={{ color: "#7A6B52" }}>{p.title}</div>
                <div className="flex flex-wrap gap-1 mb-1">
                  <span className="text-[9px] px-1.5 py-0.5 rounded font-semibold" style={{ background: "#1a2332", color: "#B8956A" }}>{p.exam}</span>
                  {p.tags.map((tag) => (
                    <span key={tag} className="text-[9px] px-1.5 py-0.5 rounded" style={{ background: "#F0E8D4", color: "#7A6B52" }}>{tag}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-2 text-[10px]" style={{ color: "#7A6B52" }}>
                    <span className="flex items-center gap-0.5"><Star size={9} fill="#B8956A" stroke="#B8956A" />{p.rating}</span>
                    <span>· 陪练 {p.sessions} 次</span>
                  </div>
                  <div className="font-serif-cn font-bold text-sm" style={{ color: "#C7472D" }}>
                    ¥{p.price}<span className="text-[10px] font-normal" style={{ color: "#7A6B52" }}>/小时</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function TeachersScreen({ onBack, onSelectPerson }) {
  return (
    <div>
      <ScreenHeader title="面试老师" onBack={onBack} />
      <div className="px-5 pt-1 pb-6"><TeacherList onSelect={(t) => onSelectPerson(t, "teacher")} /></div>
    </div>
  );
}

function PartnersScreen({ onBack, onSelectPerson }) {
  return (
    <div>
      <ScreenHeader title="高分陪练" onBack={onBack} />
      <div className="px-5 pt-1 pb-6"><PartnerList onSelect={(p) => onSelectPerson(p, "partner")} /></div>
    </div>
  );
}

function MeScreen({ role, onLogout, onOpenSchedule, onOpenAvailability, onOpenSupport }) {
  const ROLE_INFO = {
    student: { label: "学员", icon: BookOpen },
    teacher: { label: "面试老师", icon: GraduationCap },
    partner: { label: "高分陪练", icon: Award },
  };
  const Info = ROLE_INFO[role];
  const RoleIcon = Info.icon;

  return (
    <div className="px-5 pt-2 pb-6">
      {/* Role badge + logout */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full" style={{ background: "#FAF0E0", border: "1px solid #E8D5A8" }}>
          <RoleIcon size={11} style={{ color: "#9A6A2A" }} />
          <span className="text-[11px] font-bold" style={{ color: "#9A6A2A" }}>{Info.label}身份</span>
        </div>
        <button onClick={onLogout} className="flex items-center gap-1 text-[11px] font-semibold px-3 py-1 rounded-full" style={{ color: "#7A6B52", background: "#fff", border: "1px solid #E8DFCC" }}>
          <LogOut size={11} /> 退出登录
        </button>
      </div>

      {role === "student" && <StudentMeView onOpenSupport={onOpenSupport} />}
      {role === "teacher" && <TeacherMeView onOpenSchedule={onOpenSchedule} onOpenSupport={onOpenSupport} />}
      {role === "partner" && <PartnerMeView onOpenAvailability={onOpenAvailability} onOpenSupport={onOpenSupport} />}
    </div>
  );
}

function StudentMeView({ onOpenSupport }) {
  return (
    <>
      <div className="rounded-2xl p-5 mb-4 text-center" style={{ background: "linear-gradient(135deg, #1a2332 0%, #2a3447 100%)" }}>
        <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center font-serif-cn text-3xl text-white mb-3" style={{ background: "rgba(184,149,106,0.3)", border: "2px solid #B8956A" }}>同</div>
        <div className="font-bold text-white text-lg">同学小李</div>
        <div className="text-[11px] mt-1" style={{ color: "#B8956A" }}>2026 国考备考 · 第 14 天</div>
      </div>
      <div className="grid grid-cols-3 gap-3 mb-4">
        {[
          { icon: Flame, label: "连续打卡", value: "14 天" },
          { icon: TrendingUp, label: "进步幅度", value: "+12 分" },
          { icon: Calendar, label: "总练习", value: "23 次" },
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="rounded-xl p-3 text-center" style={{ background: "#fff", border: "1px solid #E8DFCC" }}>
              <Icon size={16} className="mx-auto mb-1" style={{ color: "#C7472D" }} />
              <div className="font-bold text-sm" style={{ color: "#1a2332" }}>{s.value}</div>
              <div className="text-[10px] mt-0.5" style={{ color: "#7A6B52" }}>{s.label}</div>
            </div>
          );
        })}
      </div>
      <MenuList items={[
        { icon: Bookmark, label: "我的收藏" },
        { icon: MessageSquare, label: "练习记录" },
        { icon: Award, label: "成就徽章" },
        { icon: Clock, label: "课程订单" },
        { icon: Headphones, label: "客服中心", value: "在线", onClick: onOpenSupport },
      ]} />
    </>
  );
}

function TeacherMeView({ onOpenSchedule, onOpenSupport }) {
  return (
    <>
      <div className="rounded-2xl p-5 mb-4 text-center relative overflow-hidden" style={{ background: "linear-gradient(135deg, #1a2332 0%, #2a3447 100%)" }}>
        <div className="absolute -right-6 -top-6 w-32 h-32 rounded-full opacity-10" style={{ background: "#B8956A" }} />
        <div className="relative">
          <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center font-serif-cn text-3xl text-white mb-3" style={{ background: "rgba(199,71,45,0.3)", border: "2px solid #C7472D" }}>王</div>
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <span className="font-bold text-white text-lg">王立群 老师</span>
            <ShieldCheck size={14} style={{ color: "#B8956A" }} />
          </div>
          <div className="text-[11px]" style={{ color: "#B8956A" }}>金牌认证 · 前国考面试考官</div>
        </div>
      </div>

      {/* Income highlight */}
      <div className="rounded-xl p-4 mb-3 flex items-center gap-3" style={{ background: "#FAF0E0", border: "1px solid #E8D5A8" }}>
        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "#fff" }}>
          <Wallet size={18} style={{ color: "#C7472D" }} />
        </div>
        <div className="flex-1">
          <div className="text-[10px]" style={{ color: "#9A6A2A" }}>本月收入</div>
          <div className="font-serif-cn font-black text-xl" style={{ color: "#1a2332" }}>¥ 12,480<span className="text-[10px] font-normal ml-1" style={{ color: "#7A6B52" }}>较上月 +18%</span></div>
        </div>
        <ChevronRight size={14} style={{ color: "#9A8866" }} />
      </div>

      <div className="grid grid-cols-3 gap-3 mb-4">
        {[
          { icon: Briefcase, label: "本月课时", value: "28 节" },
          { icon: Users, label: "活跃学员", value: "42 人" },
          { icon: Star, label: "学员评分", value: "4.9" },
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="rounded-xl p-3 text-center" style={{ background: "#fff", border: "1px solid #E8DFCC" }}>
              <Icon size={16} className="mx-auto mb-1" style={{ color: "#C7472D" }} />
              <div className="font-bold text-sm" style={{ color: "#1a2332" }}>{s.value}</div>
              <div className="text-[10px] mt-0.5" style={{ color: "#7A6B52" }}>{s.label}</div>
            </div>
          );
        })}
      </div>

      {/* Pending bookings card */}
      <div className="rounded-xl p-4 mb-3 flex items-center gap-3" style={{ background: "#1a2332" }}>
        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "rgba(199,71,45,0.2)" }}>
          <AlertCircle size={18} style={{ color: "#C7472D" }} />
        </div>
        <div className="flex-1">
          <div className="text-[10px]" style={{ color: "#B8956A" }}>有 3 个新预约等待确认</div>
          <div className="text-xs text-white/70 mt-0.5">最早一节:今天 19:30 — 张同学</div>
        </div>
        <button className="px-3 py-1 rounded-full text-[10px] font-bold" style={{ background: "#C7472D", color: "#fff" }}>查看</button>
      </div>

      <MenuList items={[
        { icon: Calendar, label: "我的课表", badge: "今日 3 节", onClick: onOpenSchedule },
        { icon: Users, label: "学员管理" },
        { icon: Wallet, label: "收入明细" },
        { icon: MessageSquare, label: "学员评价" },
        { icon: ShieldCheck, label: "资质认证", value: "已通过" },
        { icon: Headphones, label: "客服中心", value: "在线", onClick: onOpenSupport },
        { icon: Settings, label: "教学设置" },
      ]} />
    </>
  );
}

function PartnerMeView({ onOpenAvailability, onOpenSupport }) {
  const [online, setOnline] = useState(true);

  return (
    <>
      <div className="rounded-2xl p-5 mb-4 text-center relative overflow-hidden" style={{ background: "linear-gradient(135deg, #1a2332 0%, #2a3447 100%)" }}>
        <div className="relative">
          <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center font-serif-cn text-3xl mb-3 relative" style={{ background: "rgba(184,149,106,0.2)", border: "2px solid #B8956A", color: "#B8956A" }}>
            苏
            <div className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded text-[9px] font-bold stamp" style={{ background: "#C7472D", color: "#fff" }}>88.0</div>
          </div>
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <span className="font-bold text-white text-lg">苏婉清</span>
            <span className="text-[9px] px-1.5 py-0.5 rounded font-bold" style={{ background: "rgba(184,149,106,0.3)", color: "#B8956A" }}>已上岸</span>
          </div>
          <div className="text-[11px]" style={{ color: "#B8956A" }}>选调生 88 分 · 已陪练 218 次</div>
        </div>
      </div>

      {/* Online toggle — 陪练独有 */}
      <div className="rounded-xl p-4 mb-3 flex items-center gap-3" style={{ background: online ? "#fff" : "#F0E8D4", border: `1px solid ${online ? "#5C8A52" : "#E8DFCC"}` }}>
        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: online ? "rgba(92,138,82,0.15)" : "#fff" }}>
          <Power size={18} style={{ color: online ? "#5C8A52" : "#9A8866" }} />
        </div>
        <div className="flex-1">
          <div className="font-bold text-sm" style={{ color: "#1a2332" }}>{online ? "在线接单中" : "已休息"}</div>
          <div className="text-[10.5px] mt-0.5" style={{ color: "#7A6B52" }}>{online ? "正在向匹配的学员推荐你" : "学员将无法预约你的时段"}</div>
        </div>
        <button onClick={() => setOnline(!online)} className="relative w-11 h-6 rounded-full transition-colors" style={{ background: online ? "#5C8A52" : "#9A8866" }}>
          <div className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all" style={{ left: online ? "22px" : "2px" }} />
        </button>
      </div>

      {/* Income highlight */}
      <div className="rounded-xl p-4 mb-3 flex items-center gap-3" style={{ background: "#FAF0E0", border: "1px solid #E8D5A8" }}>
        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "#fff" }}>
          <Wallet size={18} style={{ color: "#C7472D" }} />
        </div>
        <div className="flex-1">
          <div className="text-[10px]" style={{ color: "#9A6A2A" }}>本月收入(可提现)</div>
          <div className="font-serif-cn font-black text-xl" style={{ color: "#1a2332" }}>¥ 2,160</div>
        </div>
        <button className="px-3 py-1.5 rounded-full text-[11px] font-bold" style={{ background: "#1a2332", color: "#fff" }}>提现</button>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-4">
        {[
          { icon: MessageSquare, label: "本月陪练", value: "18 次" },
          { icon: TrendingUp, label: "接单率", value: "92%" },
          { icon: Star, label: "学员评分", value: "4.9" },
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="rounded-xl p-3 text-center" style={{ background: "#fff", border: "1px solid #E8DFCC" }}>
              <Icon size={16} className="mx-auto mb-1" style={{ color: "#C7472D" }} />
              <div className="font-bold text-sm" style={{ color: "#1a2332" }}>{s.value}</div>
              <div className="text-[10px] mt-0.5" style={{ color: "#7A6B52" }}>{s.label}</div>
            </div>
          );
        })}
      </div>

      {/* New requests card */}
      <div className="rounded-xl p-4 mb-3 flex items-center gap-3" style={{ background: "#1a2332" }}>
        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "rgba(199,71,45,0.2)" }}>
          <AlertCircle size={18} style={{ color: "#C7472D" }} />
        </div>
        <div className="flex-1">
          <div className="text-[10px]" style={{ color: "#B8956A" }}>2 个新预约等待接单</div>
          <div className="text-xs text-white/70 mt-0.5">最早一节:明天 20:00 — 综合分析专项</div>
        </div>
        <button className="px-3 py-1 rounded-full text-[10px] font-bold" style={{ background: "#C7472D", color: "#fff" }}>查看</button>
      </div>

      <MenuList items={[
        { icon: Calendar, label: "接单时段设置", onClick: onOpenAvailability },
        { icon: MessageSquare, label: "我的评价" },
        { icon: Wallet, label: "收入与提现" },
        { icon: ShieldCheck, label: "上岸认证", value: "已认证" },
        { icon: Headphones, label: "客服中心", value: "在线", onClick: onOpenSupport },
        { icon: Settings, label: "陪练设置" },
      ]} />
    </>
  );
}

function MenuList({ items }) {
  return (
    <div className="rounded-xl divide-y" style={{ background: "#fff", border: "1px solid #E8DFCC", borderColor: "#E8DFCC" }}>
      {items.map((m) => {
        const Icon = m.icon;
        return (
          <div key={m.label} onClick={m.onClick} className={`flex items-center px-4 py-3.5 ${m.onClick ? "cursor-pointer active:bg-amber-50" : ""}`}>
            <Icon size={16} style={{ color: "#7A6B52" }} className="mr-3" />
            <span className="flex-1 text-sm" style={{ color: "#1a2332" }}>{m.label}</span>
            {m.badge && <span className="text-[10px] mr-2 px-1.5 py-0.5 rounded font-semibold" style={{ background: "#FAF0E0", color: "#9A6A2A" }}>{m.badge}</span>}
            {m.value && <span className="text-[11px] mr-2" style={{ color: "#5C8A52" }}>{m.value}</span>}
            <ChevronRight size={14} style={{ color: "#9A8866" }} />
          </div>
        );
      })}
    </div>
  );
}

// ——— Auth Flow (登录 / 入驻) ———

function AuthFlow({ onLogin }) {
  const [view, setView] = useState("login");
  const [target, setTarget] = useState(null);

  if (view === "onboard") {
    return (
      <OnboardingScreen
        target={target}
        onBack={() => setView("login")}
        onComplete={(r) => onLogin(r)}
      />
    );
  }

  return (
    <LoginScreen
      onLogin={onLogin}
      onOnboard={(t) => { setTarget(t); setView("onboard"); }}
    />
  );
}

function LoginScreen({ onLogin, onOnboard }) {
  const ACCOUNTS = [
    { id: "student", name: "同学小李", desc: "2026 国考备考 · 第 14 天", icon: BookOpen, role: "学员", lastLogin: "刚刚" },
    { id: "teacher", name: "王立群 老师", desc: "金牌认证导师 · 12 年教龄", icon: GraduationCap, role: "面试老师", lastLogin: "今天 09:23" },
    { id: "partner", name: "苏婉清", desc: "选调生 88 分上岸 · 已陪练 218 次", icon: Award, role: "高分陪练", lastLogin: "昨天" },
  ];

  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");

  return (
    <div className="min-h-full flex flex-col" style={{ background: "#FAF6EE" }}>
      {/* Top brand area */}
      <div className="px-6 pt-10 pb-6 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full opacity-[0.04]" style={{ background: "#1a2332" }} />
        <div className="relative">
          <div className="w-14 h-14 mx-auto rounded-2xl flex items-center justify-center stamp text-white text-xl font-bold mb-3" style={{ background: "#C7472D" }}>印</div>
          <div className="text-[10px] tracking-[0.4em] mb-1" style={{ color: "#9A8866" }}>GONG MIAN PEI LIAN</div>
          <div className="font-serif-cn text-2xl font-bold" style={{ color: "#1a2332" }}>公面陪练</div>
          <div className="text-[11px] mt-1" style={{ color: "#7A6B52" }}>备考路上,有人陪你</div>
        </div>
      </div>

      <div className="px-5 flex-1 pb-6">
        {/* Saved accounts */}
        <div className="mb-1.5 flex items-center gap-2">
          <div className="text-[11px] font-bold" style={{ color: "#1a2332" }}>本机已登录账号</div>
          <div className="flex-1 h-px" style={{ background: "#E8DFCC" }} />
          <div className="text-[10px]" style={{ color: "#9A8866" }}>点击直接进入</div>
        </div>

        <div className="space-y-2 mb-5">
          {ACCOUNTS.map((a) => {
            const Icon = a.icon;
            return (
              <button
                key={a.id}
                onClick={() => onLogin(a.id)}
                className="w-full rounded-xl p-3.5 flex items-center gap-3 text-left active:scale-[0.99] transition-transform"
                style={{ background: "#fff", border: "1px solid #E8DFCC" }}
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: "#FAF0E0" }}>
                  <Icon size={20} style={{ color: "#9A6A2A" }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-sm" style={{ color: "#1a2332" }}>{a.name}</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded font-bold" style={{ background: "#1a2332", color: "#B8956A" }}>{a.role}</span>
                  </div>
                  <div className="text-[10.5px] mt-0.5" style={{ color: "#7A6B52" }}>{a.desc}</div>
                  <div className="text-[10px] mt-0.5" style={{ color: "#9A8866" }}>上次登录:{a.lastLogin}</div>
                </div>
                <ChevronRight size={16} style={{ color: "#9A8866" }} />
              </button>
            );
          })}
        </div>

        {/* Other login methods */}
        <div className="mb-1.5 flex items-center gap-2">
          <div className="text-[11px] font-bold" style={{ color: "#1a2332" }}>其他登录方式</div>
          <div className="flex-1 h-px" style={{ background: "#E8DFCC" }} />
        </div>

        <div className="rounded-xl p-4 mb-3" style={{ background: "#fff", border: "1px solid #E8DFCC" }}>
          <div className="text-[11px] font-semibold mb-2" style={{ color: "#7A6B52" }}>手机号登录</div>
          <div className="flex items-center gap-2 mb-2 px-3 py-2 rounded-lg" style={{ background: "#FAF6EE", border: "1px solid #E8DFCC" }}>
            <span className="text-xs font-semibold" style={{ color: "#1a2332" }}>+86</span>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="请输入手机号" className="flex-1 bg-transparent outline-none text-sm" style={{ color: "#1a2332" }} />
          </div>
          <div className="flex items-center gap-2 mb-3 px-3 py-2 rounded-lg" style={{ background: "#FAF6EE", border: "1px solid #E8DFCC" }}>
            <KeyRound size={13} style={{ color: "#9A8866" }} />
            <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="6 位验证码" className="flex-1 bg-transparent outline-none text-sm" style={{ color: "#1a2332" }} />
            <button className="text-[11px] font-semibold" style={{ color: "#C7472D" }}>获取</button>
          </div>
          <button onClick={() => alert("演示版:请使用上方已登录账号")} className="w-full py-2.5 rounded-lg text-sm font-bold" style={{ background: "#1a2332", color: "#fff" }}>
            登录
          </button>
        </div>

        {/* Onboarding entries */}
        <div className="rounded-xl p-4" style={{ background: "#FAF0E0", border: "1px solid #E8D5A8" }}>
          <div className="text-xs font-bold mb-1" style={{ color: "#9A6A2A" }}>申请入驻</div>
          <div className="text-[10.5px] leading-relaxed mb-3" style={{ color: "#7A6B52" }}>每个身份对应一个独立账号 · 老师与陪练需要审核认证</div>
          <div className="grid grid-cols-2 gap-2">
            <button onClick={() => onOnboard("teacher")} className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-[11px] font-bold" style={{ background: "#fff", border: "1px solid #B8956A", color: "#9A6A2A" }}>
              <GraduationCap size={13} /> 我要当老师
            </button>
            <button onClick={() => onOnboard("partner")} className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-[11px] font-bold" style={{ background: "#fff", border: "1px solid #B8956A", color: "#9A6A2A" }}>
              <Award size={13} /> 我要当陪练
            </button>
          </div>
        </div>

        <div className="text-center text-[10px] mt-6" style={{ color: "#9A8866" }}>
          登录即代表你同意 <span className="underline">用户协议</span> 与 <span className="underline">隐私政策</span>
        </div>
      </div>
    </div>
  );
}

// ——— Person Detail Page (老师/陪练详情) ———

function PersonDetailScreen({ person, onBack }) {
  const isTeacher = person._type === "teacher";
  const [bookmarked, setBookmarked] = useState(false);

  // Mock content
  const bio = isTeacher
    ? `${person.name}老师,${person.years}年面试教研经验,${person.title}。曾担任面试评分组成员,主导研发结构化面试评分体系。累计带出 ${person.students}+ 名学员,押题命中率长期保持在行业前列。`
    : `${person.name},${person.title},现就职于体制内单位。备考期间累计模拟练习超 200 次,深知考生痛点。陪练风格:节奏紧凑,直击得分点,擅长帮助考生在有限时间内突破表达瓶颈。`;

  const features = isTeacher ? [
    { icon: CheckCircle2, text: "前考官视角,精准把握评分标准" },
    { icon: CheckCircle2, text: "独家热点资料库,每周更新" },
    { icon: CheckCircle2, text: "课后 24 小时答疑,作业逐字批改" },
  ] : [
    { icon: CheckCircle2, text: `${person.score}分上岸,真实考场经验` },
    { icon: CheckCircle2, text: "1v1 高强度模拟,即时反馈" },
    { icon: CheckCircle2, text: "免费送 1 次试陪练,不满意全额退" },
  ];

  const reviews = [
    { name: "刘**", date: "3 天前", rating: 5, text: isTeacher ? "押题真的太准了,面试现场遇到了类似的题型,直接拿了 87 分上岸!" : "陪练时给我的建议非常实用,特别是关于应急应变题的破题思路,直接帮我提了 5 分。" },
    { name: "陈**", date: "1 周前", rating: 5, text: isTeacher ? "老师人特别耐心,每一个细节都会指出来,值这个价。" : "节奏特别好,从不让我冷场,一晚上对练 4 道题,效率拉满。" },
    { name: "周**", date: "2 周前", rating: 4, text: isTeacher ? "课程内容扎实,但建议增加一些模拟实战的环节。" : "性价比很高,适合刚开始练面试的同学。" },
  ];

  const slots = [
    { day: "今天", date: "4月29日 周三", times: ["19:30 - 20:30", "21:00 - 22:00"] },
    { day: "明天", date: "4月30日 周四", times: ["10:00 - 11:00", "14:30 - 15:30", "20:00 - 21:00"] },
    { day: "周五", date: "5月1日", times: ["满"] },
    { day: "周六", date: "5月2日", times: ["09:00 - 10:00", "11:00 - 12:00", "16:00 - 17:00"] },
  ];

  return (
    <div className="h-full flex flex-col">
      <ScreenHeader title={isTeacher ? "导师详情" : "陪练详情"} onBack={onBack} />

      <div className="flex-1 overflow-y-auto">
      {/* Hero */}
      <div className="px-5 pt-4 pb-5 relative" style={{ background: "linear-gradient(180deg, #1a2332 0%, #2a3447 80%, #FAF6EE 100%)" }}>
        <div className="absolute -right-6 top-0 w-32 h-32 rounded-full opacity-10" style={{ background: isTeacher ? "#C7472D" : "#B8956A" }} />
        <div className="relative flex gap-3">
          <div className="w-20 h-20 rounded-full flex items-center justify-center font-serif-cn text-3xl shrink-0 relative" style={{
            background: isTeacher ? "linear-gradient(135deg, #fff, #FAF0E0)" : "rgba(184,149,106,0.25)",
            color: isTeacher ? "#1a2332" : "#B8956A",
            border: `2px solid ${isTeacher ? "#B8956A" : "#B8956A"}`,
          }}>
            {person.avatar}
            {!isTeacher && (
              <div className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded text-[9px] font-bold stamp" style={{ background: "#C7472D", color: "#fff" }}>{person.score}</div>
            )}
          </div>
          <div className="flex-1 min-w-0 pt-1">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="font-bold text-white text-lg">{person.name}{isTeacher ? " 老师" : ""}</span>
              {isTeacher && <ShieldCheck size={14} style={{ color: "#B8956A" }} />}
              {!isTeacher && <span className="text-[9px] px-1.5 py-0.5 rounded font-bold" style={{ background: "rgba(184,149,106,0.3)", color: "#B8956A" }}>已上岸</span>}
            </div>
            <div className="text-[11px] mb-2" style={{ color: "rgba(255,255,255,0.7)" }}>{person.title}</div>
            <div className="flex flex-wrap gap-1">
              {(isTeacher ? person.examType : [person.exam]).map((e) => (
                <span key={e} className="text-[9px] px-1.5 py-0.5 rounded font-bold" style={{ background: "rgba(184,149,106,0.25)", color: "#B8956A" }}>{e}</span>
              ))}
              <span className="text-[9px] px-1.5 py-0.5 rounded flex items-center gap-0.5" style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.8)" }}>
                <MapPin size={8} /> {person.region}
              </span>
            </div>
          </div>
        </div>

        {/* Inline stats */}
        <div className="mt-4 grid grid-cols-3 gap-2 rounded-xl p-3" style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(8px)" }}>
          <div className="text-center">
            <div className="font-serif-cn font-bold text-white text-lg flex items-center justify-center gap-0.5">
              <Star size={11} fill="#B8956A" stroke="#B8956A" />{person.rating}
            </div>
            <div className="text-[9px]" style={{ color: "rgba(255,255,255,0.6)" }}>评分</div>
          </div>
          <div className="text-center border-l border-r" style={{ borderColor: "rgba(255,255,255,0.15)" }}>
            <div className="font-serif-cn font-bold text-white text-lg">{isTeacher ? person.students : person.sessions}</div>
            <div className="text-[9px]" style={{ color: "rgba(255,255,255,0.6)" }}>{isTeacher ? "学员人数" : "陪练场次"}</div>
          </div>
          <div className="text-center">
            <div className="font-serif-cn font-bold text-lg" style={{ color: "#B8956A" }}>¥{person.price}</div>
            <div className="text-[9px]" style={{ color: "rgba(255,255,255,0.6)" }}>每小时</div>
          </div>
        </div>
      </div>

      <div className="px-5 pb-6">
        {/* Bio */}
        <Section title="个人介绍">
          <div className="rounded-xl p-4 text-[12px] leading-relaxed" style={{ background: "#fff", border: "1px solid #E8DFCC", color: "#1a2332" }}>
            {bio}
          </div>
        </Section>

        {/* Features */}
        <Section title={isTeacher ? "教学特色" : "陪练特色"}>
          <div className="rounded-xl p-4 space-y-2" style={{ background: "#fff", border: "1px solid #E8DFCC" }}>
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} className="flex items-start gap-2">
                  <Icon size={14} style={{ color: "#5C8A52", marginTop: 2 }} className="shrink-0" />
                  <div className="text-[12px] leading-relaxed" style={{ color: "#1a2332" }}>{f.text}</div>
                </div>
              );
            })}
          </div>
        </Section>

        {/* Available slots */}
        <Section title="可约时段" subtitle="点击预约">
          <div className="rounded-xl p-3" style={{ background: "#fff", border: "1px solid #E8DFCC" }}>
            {slots.map((s, i) => (
              <div key={i} className={`py-2.5 ${i < slots.length - 1 ? "border-b" : ""}`} style={{ borderColor: "#F0E8D4" }}>
                <div className="flex items-baseline gap-2 mb-1.5">
                  <span className="font-bold text-xs" style={{ color: "#1a2332" }}>{s.day}</span>
                  <span className="text-[10px]" style={{ color: "#9A8866" }}>{s.date}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {s.times[0] === "满" ? (
                    <span className="text-[10px] px-2 py-1 rounded" style={{ background: "#F0E8D4", color: "#9A8866" }}>已约满</span>
                  ) : (
                    s.times.map((t) => (
                      <span key={t} className="text-[10px] px-2 py-1 rounded font-semibold" style={{ background: "#FAF0E0", color: "#9A6A2A", border: "1px solid #E8D5A8" }}>{t}</span>
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Reviews */}
        <Section title="学员评价" subtitle={`共 ${reviews.length * 30}+ 条`}>
          <div className="space-y-2.5">
            {reviews.map((r, i) => (
              <div key={i} className="rounded-xl p-3.5" style={{ background: "#fff", border: "1px solid #E8DFCC" }}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center font-serif-cn text-xs" style={{ background: "#FAF0E0", color: "#9A6A2A" }}>{r.name[0]}</div>
                    <span className="text-xs font-semibold" style={{ color: "#1a2332" }}>{r.name}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} size={9} fill={j < r.rating ? "#B8956A" : "transparent"} stroke="#B8956A" />
                      ))}
                    </div>
                  </div>
                  <span className="text-[10px]" style={{ color: "#9A8866" }}>{r.date}</span>
                </div>
                <div className="text-[11.5px] leading-relaxed" style={{ color: "#1a2332" }}>{r.text}</div>
              </div>
            ))}
          </div>
        </Section>

        <div className="mt-4 rounded-xl p-3 flex items-start gap-2" style={{ background: "#FAF0E0", border: "1px solid #E8D5A8" }}>
          <ShieldCheck size={14} style={{ color: "#9A6A2A", marginTop: 2 }} className="shrink-0" />
          <div className="text-[10.5px] leading-relaxed" style={{ color: "#7A6B52" }}>
            <span className="font-bold" style={{ color: "#9A6A2A" }}>放心保障</span> · 全程录像回放 · 不满意 24 小时内可申请全额退款 · 平台担保资金安全
          </div>
        </div>
      </div>

      {/* Sticky bottom action bar */}
      </div>
      <div className="shrink-0 px-5 py-3 flex items-center gap-3" style={{ background: "rgba(250,246,238,0.95)", backdropFilter: "blur(8px)", borderTop: "1px solid #E8DFCC" }}>
        <button onClick={() => setBookmarked(!bookmarked)} className="flex flex-col items-center gap-0.5 px-2">
          <Bookmark size={18} fill={bookmarked ? "#C7472D" : "transparent"} stroke={bookmarked ? "#C7472D" : "#7A6B52"} />
          <span className="text-[9px]" style={{ color: bookmarked ? "#C7472D" : "#7A6B52" }}>{bookmarked ? "已收藏" : "收藏"}</span>
        </button>
        <button className="flex-1 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-1.5" style={{ background: "#1a2332", color: "#fff" }}>
          <MessageSquare size={14} /> 咨询
        </button>
        <button className="flex-1 py-3 rounded-xl font-bold text-sm" style={{ background: "#C7472D", color: "#fff" }}>
          立即预约 ¥{person.price}
        </button>
      </div>
    </div>
  );
}

function Section({ title, subtitle, children }) {
  return (
    <div className="mt-5">
      <div className="flex items-baseline gap-2 mb-2">
        <h3 className="font-serif-cn font-bold text-sm" style={{ color: "#1a2332" }}>{title}</h3>
        {subtitle && <span className="text-[10px]" style={{ color: "#9A8866" }}>{subtitle}</span>}
      </div>
      {children}
    </div>
  );
}

// ——— Schedule Screen (老师课表) ———

function ScheduleScreen({ onBack }) {
  const days = [
    {
      label: "今天",
      date: "4月29日 周三",
      isToday: true,
      sessions: [
        { time: "14:00 - 15:00", student: "张同学", topic: "综合分析专项", type: "1v1", status: "confirmed" },
        { time: "16:30 - 17:30", student: "李同学", topic: "无领导讨论模拟", type: "小班", status: "confirmed" },
        { time: "19:30 - 20:30", student: "王同学", topic: "应急应变实战", type: "1v1", status: "pending" },
      ],
    },
    {
      label: "明天",
      date: "4月30日 周四",
      sessions: [
        { time: "10:00 - 11:00", student: "陈同学", topic: "试听课", type: "试听", status: "confirmed" },
        { time: "19:00 - 20:00", student: "3v1 模拟房间", topic: "结构化全真模拟", type: "房间", status: "confirmed" },
      ],
    },
    {
      label: "周五",
      date: "5月1日",
      sessions: [],
    },
    {
      label: "周六",
      date: "5月2日",
      sessions: [
        { time: "10:00 - 12:00", student: "周同学", topic: "面试集训(2 小时)", type: "1v1", status: "confirmed" },
      ],
    },
  ];

  const StatusBadge = ({ status }) => {
    const map = {
      confirmed: { label: "已确认", bg: "rgba(92,138,82,0.15)", color: "#5C8A52" },
      pending: { label: "待确认", bg: "rgba(199,71,45,0.15)", color: "#C7472D" },
    };
    const s = map[status];
    return <span className="text-[9px] px-1.5 py-0.5 rounded font-bold" style={{ background: s.bg, color: s.color }}>{s.label}</span>;
  };

  return (
    <div>
      <ScreenHeader title="我的课表" onBack={onBack} />

      {/* Summary */}
      <div className="mx-5 mt-4 rounded-xl p-4 flex items-center gap-3" style={{ background: "linear-gradient(135deg, #1a2332, #2a3447)" }}>
        <Calendar size={28} style={{ color: "#B8956A" }} />
        <div className="flex-1">
          <div className="text-[10px]" style={{ color: "#B8956A" }}>本周课时</div>
          <div className="font-serif-cn font-black text-white text-xl">6 节 · 共 8 小时</div>
        </div>
        <button className="px-3 py-1.5 rounded-full text-[11px] font-semibold" style={{ background: "rgba(184,149,106,0.2)", color: "#B8956A" }}>查看月历</button>
      </div>

      <div className="px-5 pt-4 pb-6 space-y-4">
        {days.map((d, i) => (
          <div key={i}>
            <div className="flex items-baseline gap-2 mb-2">
              <span className={`font-serif-cn font-bold text-base ${d.isToday ? "" : ""}`} style={{ color: d.isToday ? "#C7472D" : "#1a2332" }}>{d.label}</span>
              <span className="text-[10px]" style={{ color: "#9A8866" }}>{d.date}</span>
              {d.isToday && <span className="text-[9px] px-1.5 py-0.5 rounded font-bold" style={{ background: "#C7472D", color: "#fff" }}>TODAY</span>}
            </div>

            {d.sessions.length === 0 ? (
              <div className="rounded-xl py-4 text-center" style={{ background: "#fff", border: "1px dashed #E8DFCC" }}>
                <div className="text-[11px]" style={{ color: "#9A8866" }}>暂无安排 · 可设为休息日</div>
              </div>
            ) : (
              <div className="space-y-2">
                {d.sessions.map((s, j) => (
                  <div key={j} className="rounded-xl p-3.5 flex gap-3 items-center" style={{ background: "#fff", border: "1px solid #E8DFCC" }}>
                    <div className="flex flex-col items-center justify-center px-2.5 py-2 rounded-lg shrink-0" style={{ background: d.isToday ? "#FAF0E0" : "#F0E8D4", minWidth: 64 }}>
                      <div className="font-serif-cn font-bold text-xs" style={{ color: "#1a2332" }}>{s.time.split(" - ")[0]}</div>
                      <div className="text-[8px]" style={{ color: "#7A6B52" }}>开始</div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="font-bold text-xs" style={{ color: "#1a2332" }}>{s.topic}</span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded" style={{ background: "#F0E8D4", color: "#7A6B52" }}>{s.type}</span>
                      </div>
                      <div className="text-[10.5px] mb-1" style={{ color: "#7A6B52" }}>学员:{s.student}</div>
                      <div className="flex items-center gap-2">
                        <StatusBadge status={s.status} />
                        <span className="text-[9px]" style={{ color: "#9A8866" }}>{s.time}</span>
                      </div>
                    </div>
                    {d.isToday && s.status === "confirmed" ? (
                      <button className="px-3 py-1.5 rounded-full text-[10px] font-bold shrink-0" style={{ background: "#C7472D", color: "#fff" }}>开始上课</button>
                    ) : s.status === "pending" ? (
                      <button className="px-3 py-1.5 rounded-full text-[10px] font-bold shrink-0" style={{ background: "#1a2332", color: "#fff" }}>确认</button>
                    ) : (
                      <ChevronRight size={14} style={{ color: "#9A8866" }} />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ——— Onboarding Screen (入驻流程) ———

function OnboardingScreen({ target, onBack, onComplete }) {
  const [step, setStep] = useState(target ? 2 : 1);
  const [chosenRole, setChosenRole] = useState(target);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    region: "",
    examType: "",
    yearsOrScore: "",
    extra: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const isTeacher = chosenRole === "teacher";
  const totalSteps = 3;

  const next = () => {
    if (step < totalSteps) setStep(step + 1);
    else {
      setSubmitted(true);
      // Simulate review delay
      setTimeout(() => onComplete(chosenRole), 2200);
    }
  };

  const canNext = () => {
    if (step === 1) return !!chosenRole;
    if (step === 2) return form.name && form.phone && form.region && form.examType && form.yearsOrScore;
    if (step === 3) return true; // Credentials are simulated
    return false;
  };

  if (submitted) {
    return (
      <div className="h-full flex flex-col items-center justify-center px-8 pb-20" style={{ background: "#FAF6EE" }}>
        <div className="w-20 h-20 rounded-full flex items-center justify-center mb-4" style={{ background: "#1a2332" }}>
          <Loader2 size={32} className="animate-spin" style={{ color: "#B8956A" }} />
        </div>
        <div className="font-serif-cn font-bold text-lg mb-2" style={{ color: "#1a2332" }}>申请已提交</div>
        <div className="text-xs text-center leading-relaxed mb-6" style={{ color: "#7A6B52" }}>
          材料正在审核中,通常 1-3 个工作日内给出结果。审核通过后,你的{isTeacher ? "老师" : "陪练"}身份将自动开通。
        </div>
        <div className="text-[11px] tracking-widest" style={{ color: "#9A8866" }}>UNDER REVIEW</div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <ScreenHeader title="申请入驻" onBack={onBack} />

      {/* Progress */}
      <div className="px-5 pt-4 pb-2 shrink-0">
        <div className="flex items-center gap-2 mb-2">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex-1 h-1 rounded-full" style={{ background: step >= s ? "#C7472D" : "#E8DFCC" }} />
          ))}
        </div>
        <div className="text-[11px]" style={{ color: "#7A6B52" }}>
          第 <span className="font-bold" style={{ color: "#1a2332" }}>{step}</span> / {totalSteps} 步 ·{" "}
          {step === 1 ? "选择身份" : step === 2 ? "基本信息" : "资质认证"}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pt-4 pb-6">
        {step === 1 && (
          <>
            <div className="font-serif-cn font-bold text-lg mb-1" style={{ color: "#1a2332" }}>你想成为?</div>
            <div className="text-[11px] mb-4" style={{ color: "#7A6B52" }}>选择你要申请的身份</div>

            <button onClick={() => setChosenRole("teacher")} className="w-full rounded-xl p-4 text-left mb-3 flex items-start gap-3" style={{ background: "#fff", border: `2px solid ${chosenRole === "teacher" ? "#C7472D" : "#E8DFCC"}` }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: "#FAF0E0" }}>
                <GraduationCap size={22} style={{ color: "#9A6A2A" }} />
              </div>
              <div className="flex-1">
                <div className="font-bold text-sm mb-1" style={{ color: "#1a2332" }}>面试老师</div>
                <div className="text-[11px] leading-relaxed" style={{ color: "#7A6B52" }}>专业教学,自主定价 ¥300-1000/小时,平台仅抽 8%</div>
                <div className="text-[10px] mt-2 font-semibold" style={{ color: "#9A6A2A" }}>需:3 年以上面试教学经验 + 资质证明</div>
              </div>
              {chosenRole === "teacher" && <CheckCircle size={18} style={{ color: "#C7472D" }} />}
            </button>

            <button onClick={() => setChosenRole("partner")} className="w-full rounded-xl p-4 text-left flex items-start gap-3" style={{ background: "#fff", border: `2px solid ${chosenRole === "partner" ? "#C7472D" : "#E8DFCC"}` }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: "#FAF0E0" }}>
                <Award size={22} style={{ color: "#9A6A2A" }} />
              </div>
              <div className="flex-1">
                <div className="font-bold text-sm mb-1" style={{ color: "#1a2332" }}>高分陪练</div>
                <div className="text-[11px] leading-relaxed" style={{ color: "#7A6B52" }}>把上岸经验变成收入,灵活接单 ¥80-200/小时,平台仅抽 5%</div>
                <div className="text-[10px] mt-2 font-semibold" style={{ color: "#9A6A2A" }}>需:面试 80 分以上上岸 + 录用证明</div>
              </div>
              {chosenRole === "partner" && <CheckCircle size={18} style={{ color: "#C7472D" }} />}
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <div className="font-serif-cn font-bold text-lg mb-1" style={{ color: "#1a2332" }}>填写基本信息</div>
            <div className="text-[11px] mb-4" style={{ color: "#7A6B52" }}>真实信息,审核更快通过</div>

            <Field label="真实姓名">
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="请输入身份证上的姓名" className="w-full px-3 py-2.5 rounded-lg text-sm outline-none" style={{ background: "#fff", border: "1px solid #E8DFCC", color: "#1a2332" }} />
            </Field>
            <Field label="手机号">
              <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="11 位手机号" className="w-full px-3 py-2.5 rounded-lg text-sm outline-none" style={{ background: "#fff", border: "1px solid #E8DFCC", color: "#1a2332" }} />
            </Field>
            <Field label="所在地区">
              <SelectChips value={form.region} onChange={(v) => setForm({ ...form, region: v })} options={["北京", "上海", "广东", "江苏", "浙江", "山东", "四川"]} />
            </Field>
            <Field label="主要考试方向">
              <SelectChips value={form.examType} onChange={(v) => setForm({ ...form, examType: v })} options={["国考", "省考", "选调生", "事业单位"]} />
            </Field>
            <Field label={isTeacher ? "教学经验(年)" : "上岸面试分数"}>
              <input value={form.yearsOrScore} onChange={(e) => setForm({ ...form, yearsOrScore: e.target.value })} placeholder={isTeacher ? "如:5" : "如:85.6"} className="w-full px-3 py-2.5 rounded-lg text-sm outline-none" style={{ background: "#fff", border: "1px solid #E8DFCC", color: "#1a2332" }} />
            </Field>
            {!isTeacher && (
              <Field label="上岸岗位 / 单位">
                <input value={form.extra} onChange={(e) => setForm({ ...form, extra: e.target.value })} placeholder="如:税务局综合岗" className="w-full px-3 py-2.5 rounded-lg text-sm outline-none" style={{ background: "#fff", border: "1px solid #E8DFCC", color: "#1a2332" }} />
              </Field>
            )}
          </>
        )}

        {step === 3 && (
          <>
            <div className="font-serif-cn font-bold text-lg mb-1" style={{ color: "#1a2332" }}>上传资质材料</div>
            <div className="text-[11px] mb-4" style={{ color: "#7A6B52" }}>所有材料仅用于审核,不会公开展示</div>

            <UploadBox label="身份证(人像面)" required />
            <UploadBox label="身份证(国徽面)" required />
            {isTeacher ? (
              <>
                <UploadBox label="教学经验证明" hint="可上传:培训机构合同、课程截图、学员评价等" required />
                <UploadBox label="相关资质证书" hint="选填:教师资格证、培训师证书等" />
              </>
            ) : (
              <>
                <UploadBox label="录用通知书 / 上岸证明" hint="必传:体检通知、政审材料、录用通知任一即可" required />
                <UploadBox label="面试成绩单" hint="选填:可证明面试分数的官方截图" />
              </>
            )}

            <div className="mt-3 rounded-xl p-3 flex items-start gap-2" style={{ background: "#FAF0E0", border: "1px solid #E8D5A8" }}>
              <ShieldCheck size={14} style={{ color: "#9A6A2A", marginTop: 2 }} className="shrink-0" />
              <div className="text-[10.5px] leading-relaxed" style={{ color: "#7A6B52" }}>
                所有上传材料均加密存储,仅审核团队可查看。开通身份后,平台会签订正式服务协议。
              </div>
            </div>
          </>
        )}
      </div>

      {/* Bottom action */}
      <div className="shrink-0 px-5 py-3 flex gap-3" style={{ background: "rgba(250,246,238,0.95)", backdropFilter: "blur(8px)", borderTop: "1px solid #E8DFCC" }}>
        {step > 1 && (
          <button onClick={() => setStep(step - 1)} className="px-5 py-3 rounded-xl font-bold text-sm" style={{ background: "#fff", border: "1px solid #E8DFCC", color: "#7A6B52" }}>
            上一步
          </button>
        )}
        <button
          onClick={next}
          disabled={!canNext()}
          className="flex-1 py-3 rounded-xl font-bold text-sm"
          style={{ background: canNext() ? "#C7472D" : "#D4C7A8", color: "#fff" }}
        >
          {step === totalSteps ? "提交审核" : "下一步"}
        </button>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div className="mb-3">
      <div className="text-[11px] font-semibold mb-1.5" style={{ color: "#7A6B52" }}>{label}</div>
      {children}
    </div>
  );
}

function SelectChips({ value, onChange, options }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button key={o} onClick={() => onChange(o)} className="px-3 py-1.5 rounded-full text-[11px] font-semibold" style={{
          background: value === o ? "#1a2332" : "#fff",
          color: value === o ? "#fff" : "#7A6B52",
          border: `1px solid ${value === o ? "#1a2332" : "#E8DFCC"}`,
        }}>{o}</button>
      ))}
    </div>
  );
}

function UploadBox({ label, hint, required }) {
  const [uploaded, setUploaded] = useState(false);
  return (
    <div className="mb-3">
      <div className="text-[11px] font-semibold mb-1.5 flex items-center gap-1" style={{ color: "#7A6B52" }}>
        {label}
        {required && <span style={{ color: "#C7472D" }}>*</span>}
      </div>
      <button
        onClick={() => setUploaded(!uploaded)}
        className="w-full rounded-xl py-5 flex flex-col items-center justify-center gap-1"
        style={{ background: uploaded ? "rgba(92,138,82,0.08)" : "#fff", border: `1px dashed ${uploaded ? "#5C8A52" : "#D4C7A8"}` }}
      >
        {uploaded ? (
          <>
            <CheckCircle size={20} style={{ color: "#5C8A52" }} />
            <span className="text-[11px] font-semibold" style={{ color: "#5C8A52" }}>已上传 · 点击重新选择</span>
          </>
        ) : (
          <>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#FAF0E0" }}>
              <span className="font-serif-cn text-base" style={{ color: "#9A6A2A" }}>+</span>
            </div>
            <span className="text-[11px]" style={{ color: "#9A8866" }}>点击上传图片</span>
          </>
        )}
      </button>
      {hint && <div className="text-[10px] mt-1" style={{ color: "#9A8866" }}>{hint}</div>}
    </div>
  );
}

// ——— Availability / 接单时段设置 ———

function AvailabilityScreen({ onBack }) {
  const DAYS = [
    { id: "mon", label: "周一" },
    { id: "tue", label: "周二" },
    { id: "wed", label: "周三" },
    { id: "thu", label: "周四" },
    { id: "fri", label: "周五" },
    { id: "sat", label: "周六" },
    { id: "sun", label: "周日" },
  ];

  const PRESETS = [
    { label: "上午", start: "09:00", end: "12:00", startH: 9, endH: 12, hours: 3 },
    { label: "下午", start: "14:00", end: "18:00", startH: 14, endH: 18, hours: 4 },
    { label: "晚上", start: "19:00", end: "22:00", startH: 19, endH: 22, hours: 3 },
    { label: "全天", start: "09:00", end: "22:00", startH: 9, endH: 22, hours: 13 },
  ];

  const [days, setDays] = useState({
    mon: { enabled: true, preset: 2 },
    tue: { enabled: true, preset: 2 },
    wed: { enabled: false, preset: 2 },
    thu: { enabled: true, preset: 2 },
    fri: { enabled: true, preset: 2 },
    sat: { enabled: true, preset: 3 },
    sun: { enabled: true, preset: 3 },
  });
  const [duration, setDuration] = useState(60);
  const [bufferMin, setBufferMin] = useState(15);
  const [autoAccept, setAutoAccept] = useState(false);
  const [saved, setSaved] = useState(false);
  const [blockedDates, setBlockedDates] = useState([
    { id: 1, date: "5月1日 - 5月3日", label: "劳动节假期" },
    { id: 2, date: "5月20日", label: "单位团建" },
  ]);

  const totalHours = DAYS.reduce((sum, d) => {
    const day = days[d.id];
    return day.enabled ? sum + PRESETS[day.preset].hours : sum;
  }, 0);
  const enabledDayCount = DAYS.filter((d) => days[d.id].enabled).length;

  const setAll = (config) => {
    setDays(Object.fromEntries(DAYS.map((d) => [d.id, config(d.id)])));
  };

  const PRESET_BUTTONS = [
    { label: "工作日晚上", apply: () => setAll((id) => ["sat", "sun"].includes(id) ? { enabled: false, preset: 2 } : { enabled: true, preset: 2 }) },
    { label: "周末全天", apply: () => setAll((id) => ["sat", "sun"].includes(id) ? { enabled: true, preset: 3 } : { enabled: false, preset: 3 }) },
    { label: "每天晚上", apply: () => setAll(() => ({ enabled: true, preset: 2 })) },
    { label: "全部清空", apply: () => setAll(() => ({ enabled: false, preset: 2 })) },
  ];

  const cyclePreset = (id) => {
    setDays({ ...days, [id]: { ...days[id], preset: (days[id].preset + 1) % PRESETS.length } });
  };
  const toggleDay = (id) => {
    setDays({ ...days, [id]: { ...days[id], enabled: !days[id].enabled } });
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(onBack, 900);
  };

  return (
    <div className="h-full flex flex-col">
      <ScreenHeader title="接单时段设置" onBack={onBack} />

      <div className="flex-1 overflow-y-auto">
      {/* Top stat */}
      <div className="mx-5 mt-4 rounded-xl p-4 flex items-center gap-3 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #1a2332, #2a3447)" }}>
        <div className="absolute -right-4 -bottom-4 w-24 h-24 rounded-full opacity-10" style={{ background: "#B8956A" }} />
        <div className="relative w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "rgba(184,149,106,0.2)" }}>
          <Clock size={20} style={{ color: "#B8956A" }} />
        </div>
        <div className="relative flex-1">
          <div className="text-[10px]" style={{ color: "#B8956A" }}>本周可接单</div>
          <div className="font-serif-cn font-black text-white text-xl">{totalHours}<span className="text-xs font-normal ml-1">小时</span></div>
        </div>
        <div className="relative text-right">
          <div className="text-[10px]" style={{ color: "rgba(255,255,255,0.5)" }}>开放天数</div>
          <div className="font-bold text-white text-base">{enabledDayCount} / 7</div>
        </div>
      </div>

      <div className="px-5 pt-5 pb-6">
        {/* Quick presets */}
        <div className="text-[11px] font-bold mb-2" style={{ color: "#7A6B52" }}>快速套用</div>
        <div className="flex flex-wrap gap-2 mb-5">
          {PRESET_BUTTONS.map((p) => (
            <button key={p.label} onClick={p.apply} className="px-3 py-1.5 rounded-full text-[11px] font-semibold" style={{ background: "#fff", border: "1px solid #E8DFCC", color: "#1a2332" }}>
              {p.label}
            </button>
          ))}
        </div>

        {/* Weekly schedule */}
        <SectionLabel title="每周固定时段" hint="点时间段切换 上午/下午/晚上/全天" />
        <div className="rounded-xl divide-y mb-1" style={{ background: "#fff", border: "1px solid #E8DFCC", borderColor: "#F0E8D4" }}>
          {DAYS.map((d) => {
            const day = days[d.id];
            const preset = PRESETS[day.preset];
            return (
              <div key={d.id} className="px-4 py-3 flex items-center gap-3">
                <span className="font-serif-cn font-bold text-sm w-9 shrink-0" style={{ color: day.enabled ? "#1a2332" : "#9A8866" }}>{d.label}</span>

                <div className="flex-1 min-w-0">
                  {day.enabled ? (
                    <>
                      <button onClick={() => cyclePreset(d.id)} className="text-[10.5px] px-2 py-0.5 rounded font-semibold mb-1.5 inline-flex items-center gap-1" style={{ background: "#FAF0E0", color: "#9A6A2A", border: "1px solid #E8D5A8" }}>
                        <span className="font-bold">{preset.label}</span>
                        <span style={{ opacity: 0.7 }}>·</span>
                        <span>{preset.start}-{preset.end}</span>
                        <span style={{ opacity: 0.7 }}>·</span>
                        <span>{preset.hours}h</span>
                      </button>
                      <TimeBar preset={preset} />
                    </>
                  ) : (
                    <span className="text-[11px]" style={{ color: "#9A8866" }}>休息日 · 不接单</span>
                  )}
                </div>

                <SmallToggle value={day.enabled} onChange={() => toggleDay(d.id)} />
              </div>
            );
          })}
        </div>
        <div className="text-[10px] mb-5" style={{ color: "#9A8866" }}>· 时间段以本人所在时区为准 · 学员看到的是当地时间</div>

        {/* Session duration */}
        <SectionLabel title="单次陪练时长" />
        <div className="grid grid-cols-4 gap-2 mb-5">
          {[30, 60, 90, 120].map((d) => {
            const active = duration === d;
            return (
              <button key={d} onClick={() => setDuration(d)} className="py-2.5 rounded-lg text-xs font-bold" style={{
                background: active ? "#1a2332" : "#fff",
                color: active ? "#fff" : "#7A6B52",
                border: `1px solid ${active ? "#1a2332" : "#E8DFCC"}`,
              }}>
                {d}<span className="text-[9px] font-normal ml-0.5">分钟</span>
              </button>
            );
          })}
        </div>

        {/* Buffer */}
        <SectionLabel title="两单之间间隔" hint="给自己留点喘息时间" />
        <div className="grid grid-cols-4 gap-2 mb-5">
          {[0, 15, 30, 60].map((b) => {
            const active = bufferMin === b;
            return (
              <button key={b} onClick={() => setBufferMin(b)} className="py-2.5 rounded-lg text-xs font-bold" style={{
                background: active ? "#1a2332" : "#fff",
                color: active ? "#fff" : "#7A6B52",
                border: `1px solid ${active ? "#1a2332" : "#E8DFCC"}`,
              }}>
                {b === 0 ? "不需要" : `${b} 分钟`}
              </button>
            );
          })}
        </div>

        {/* Auto accept */}
        <div className="rounded-xl p-4 mb-5 flex items-center gap-3" style={{ background: "#fff", border: "1px solid #E8DFCC" }}>
          <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: autoAccept ? "rgba(92,138,82,0.15)" : "#F0E8D4" }}>
            <CheckCircle size={18} style={{ color: autoAccept ? "#5C8A52" : "#9A8866" }} />
          </div>
          <div className="flex-1">
            <div className="font-bold text-sm" style={{ color: "#1a2332" }}>自动接受预约</div>
            <div className="text-[10.5px] mt-0.5 leading-relaxed" style={{ color: "#7A6B52" }}>
              {autoAccept ? "符合时段的预约会自动通过 · 学员体验更好" : "每个预约需要你手动确认 · 灵活控制"}
            </div>
          </div>
          <SmallToggle value={autoAccept} onChange={setAutoAccept} />
        </div>

        {/* Blocked dates */}
        <SectionLabel title="特殊日期" hint="例如假期、临时有事的日子" />
        <div className="space-y-2 mb-3">
          {blockedDates.map((d) => (
            <div key={d.id} className="rounded-xl p-3 flex items-center gap-3" style={{ background: "#fff", border: "1px solid #E8DFCC" }}>
              <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: "#F0E8D4" }}>
                <Calendar size={15} style={{ color: "#9A6A2A" }} />
              </div>
              <div className="flex-1">
                <div className="font-bold text-xs" style={{ color: "#1a2332" }}>{d.date}</div>
                <div className="text-[10.5px] mt-0.5" style={{ color: "#7A6B52" }}>{d.label}</div>
              </div>
              <button onClick={() => setBlockedDates(blockedDates.filter((x) => x.id !== d.id))} className="p-1">
                <X size={14} style={{ color: "#9A8866" }} />
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={() => setBlockedDates([...blockedDates, { id: Date.now(), date: "请选择日期", label: "添加备注" }])}
          className="w-full rounded-xl py-3 flex items-center justify-center gap-1.5 text-xs font-semibold"
          style={{ background: "transparent", border: "1px dashed #D4C7A8", color: "#9A6A2A" }}
        >
          <Plus size={13} /> 添加休息日
        </button>
      </div>

      {/* Bottom save */}
      </div>
      <div className="shrink-0 px-5 py-3" style={{ background: "rgba(250,246,238,0.95)", backdropFilter: "blur(8px)", borderTop: "1px solid #E8DFCC" }}>
        <button
          onClick={handleSave}
          disabled={saved}
          className="w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-1.5"
          style={{ background: saved ? "#5C8A52" : "#C7472D", color: "#fff" }}
        >
          {saved ? <><CheckCircle size={15} /> 已保存,正在返回</> : "保存设置"}
        </button>
      </div>
    </div>
  );
}

function SectionLabel({ title, hint }) {
  return (
    <div className="flex items-baseline gap-2 mb-2">
      <h3 className="font-serif-cn font-bold text-sm" style={{ color: "#1a2332" }}>{title}</h3>
      {hint && <span className="text-[10px]" style={{ color: "#9A8866" }}>{hint}</span>}
    </div>
  );
}

function TimeBar({ preset }) {
  const left = (preset.startH / 24) * 100;
  const width = ((preset.endH - preset.startH) / 24) * 100;
  return (
    <div>
      <div className="relative h-1.5 rounded-full overflow-hidden" style={{ background: "#F0E8D4" }}>
        <div className="absolute top-0 bottom-0 rounded-full" style={{
          left: `${left}%`, width: `${width}%`,
          background: "linear-gradient(90deg, #B8956A, #C7472D)",
        }} />
      </div>
      <div className="flex justify-between text-[8px] mt-0.5" style={{ color: "#9A8866" }}>
        <span>0</span><span>6</span><span>12</span><span>18</span><span>24</span>
      </div>
    </div>
  );
}

function SmallToggle({ value, onChange, color = "#5C8A52" }) {
  return (
    <button onClick={() => onChange(!value)} className="relative rounded-full transition-colors shrink-0" style={{ background: value ? color : "#9A8866", width: 38, height: 22 }}>
      <div className="absolute top-0.5 rounded-full bg-white shadow transition-all" style={{ width: 18, height: 18, left: value ? 18 : 2 }} />
    </button>
  );
}

// ——— Customer Service / 客服中心 ———

function CustomerServiceScreen({ onBack, onOpenChat }) {
  const [openFaq, setOpenFaq] = useState(null);

  const CATEGORIES = [
    { icon: Calendar, label: "预约问题", color: "#C7472D" },
    { icon: Wallet, label: "退款相关", color: "#9A6A2A" },
    { icon: ShieldCheck, label: "账号认证", color: "#1a2332" },
    { icon: TrendingUp, label: "收入提现", color: "#5C8A52" },
  ];

  const FAQS = [
    { q: "如何取消已经预约的课程?", a: "在「我的预约」找到对应订单,点击「取消预约」。开始前 24 小时取消免费,12-24 小时内扣 30% 服务费,不足 12 小时扣 50%。" },
    { q: "老师或陪练没出现怎么办?", a: "约定时间过后 10 分钟对方仍未上线,你可以点击「申请赔付」。平台会自动核实,全额退款 + 赠送等额优惠券作为补偿。" },
    { q: "退款多久能到账?", a: "原路退回:微信/支付宝 1-3 个工作日,银行卡 3-5 个工作日。可在订单详情中查看退款进度。" },
    { q: "怎么成为认证老师 / 陪练?", a: "在登录页选择「我要当老师」或「我要当陪练」,提交身份证 + 资质材料(老师为教学经验证明,陪练为上岸证明)。审核 1-3 个工作日。" },
    { q: "上岸证明可以上传哪些?", a: "录用通知书、政审材料、体检通知、面试成绩单 任一即可。所有材料加密存储,仅审核团队可查看,绝不外泄。" },
    { q: "AI 智能点评准确吗?", a: "AI 点评基于资深面试官的评分模型,可以指出答题结构和表达问题。建议作为参考,正式考前仍推荐找真人导师做模拟。" },
  ];

  return (
    <div>
      <ScreenHeader title="客服中心" onBack={onBack} />

      {/* Hero */}
      <div className="px-5 pt-5 pb-5 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #1a2332, #2a3447)" }}>
        <div className="absolute -right-6 -top-6 w-32 h-32 rounded-full opacity-10" style={{ background: "#C7472D" }} />
        <div className="relative">
          <div className="font-serif-cn text-xl font-bold text-white mb-1">您好!有什么能帮您?</div>
          <div className="text-[11px]" style={{ color: "rgba(255,255,255,0.6)" }}>预约 · 退款 · 认证 · 提现 · 投诉,我们都能处理</div>
          <div className="mt-3 px-3 py-2.5 rounded-lg flex items-center gap-2" style={{ background: "rgba(255,255,255,0.1)" }}>
            <Search size={13} style={{ color: "rgba(255,255,255,0.5)" }} />
            <span className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>搜索问题或关键词</span>
          </div>
        </div>
      </div>

      <div className="px-5 pt-4 pb-6">
        {/* AI customer service - prominent */}
        <button onClick={onOpenChat} className="w-full rounded-2xl p-4 mb-4 text-left flex items-center gap-3 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #fff, #FAF0E0)", border: "1px solid #E8D5A8" }}>
          <div className="absolute -right-2 -top-2 w-20 h-20 rounded-full opacity-20" style={{ background: "#C7472D" }} />
          <div className="relative w-12 h-12 rounded-xl flex items-center justify-center stamp text-white font-bold text-base" style={{ background: "#C7472D" }}>公</div>
          <div className="relative flex-1">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="font-bold text-sm" style={{ color: "#1a2332" }}>AI 客服 · 小公</span>
              <span className="w-1.5 h-1.5 rounded-full live-dot" style={{ background: "#5C8A52" }} />
              <span className="text-[10px] font-semibold" style={{ color: "#5C8A52" }}>在线</span>
            </div>
            <div className="text-[10.5px]" style={{ color: "#7A6B52" }}>24 小时随问随答 · 解答 80% 常见问题</div>
            <div className="text-[10px] mt-1" style={{ color: "#9A6A2A" }}>由 Claude AI 提供能力</div>
          </div>
          <ChevronRight size={16} style={{ color: "#C7472D" }} className="relative" />
        </button>

        {/* Categories */}
        <SectionLabel title="问题分类" />
        <div className="grid grid-cols-4 gap-2 mb-5">
          {CATEGORIES.map((c) => {
            const Icon = c.icon;
            return (
              <button key={c.label} className="rounded-xl py-3 px-1.5 text-center" style={{ background: "#fff", border: "1px solid #E8DFCC" }}>
                <div className="w-9 h-9 mx-auto rounded-lg flex items-center justify-center mb-1.5" style={{ background: "#FAF0E0" }}>
                  <Icon size={16} style={{ color: c.color }} />
                </div>
                <div className="text-[10px] font-semibold" style={{ color: "#1a2332" }}>{c.label}</div>
              </button>
            );
          })}
        </div>

        {/* FAQ */}
        <SectionLabel title="常见问题" hint="点击查看答案" />
        <div className="rounded-xl divide-y mb-5" style={{ background: "#fff", border: "1px solid #E8DFCC", borderColor: "#F0E8D4" }}>
          {FAQS.map((f, i) => {
            const isOpen = openFaq === i;
            return (
              <div key={i}>
                <button onClick={() => setOpenFaq(isOpen ? null : i)} className="w-full px-4 py-3.5 flex items-center text-left">
                  <span className="flex-1 text-xs font-semibold pr-2" style={{ color: "#1a2332" }}>{f.q}</span>
                  <span style={{ color: "#9A8866", fontSize: 9, opacity: 0.7 }}>{isOpen ? "▲" : "▼"}</span>
                </button>
                {isOpen && (
                  <div className="px-4 pb-3.5 text-[11px] leading-relaxed" style={{ color: "#7A6B52" }}>
                    {f.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Other contacts */}
        <SectionLabel title="其他联系方式" />
        <div className="space-y-2">
          <ContactRow icon={Phone} label="电话客服" value="400-880-XXXX" hint="9:00 - 22:00" />
          <ContactRow icon={Mail} label="邮箱客服" value="support@gongmianpeilian.com" hint="48h 回复" />
          <ContactRow icon={MessageSquare} label="意见反馈" value="对产品有建议?" hint="" />
          <ContactRow icon={AlertCircle} label="投诉与举报" value="举报不当行为或欺诈" hint="24h 介入" alert />
        </div>
      </div>
    </div>
  );
}

function ContactRow({ icon: Icon, label, value, hint, alert }) {
  return (
    <div className="rounded-xl p-3.5 flex items-center gap-3" style={{ background: "#fff", border: "1px solid #E8DFCC" }}>
      <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: alert ? "rgba(199,71,45,0.1)" : "#FAF0E0" }}>
        <Icon size={15} style={{ color: alert ? "#C7472D" : "#9A6A2A" }} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[10.5px]" style={{ color: "#7A6B52" }}>{label}</div>
        <div className="font-bold text-xs truncate" style={{ color: "#1a2332" }}>{value}</div>
      </div>
      {hint && <span className="text-[10px] mr-1" style={{ color: "#9A8866" }}>{hint}</span>}
      <ChevronRight size={14} style={{ color: "#9A8866" }} />
    </div>
  );
}

// ——— AI Chat (智能客服对话) ———

function AIChatScreen({ onBack }) {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "您好同学!我是「公面陪练」的 AI 客服小公 🌾\n\n可以帮你解答关于预约、退款、认证、提现等问题。如果遇到我搞不定的复杂情况,我会立刻帮你转人工。\n\n请问有什么可以帮您?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const QUICK_REPLIES = [
    "怎么取消预约?",
    "退款多久到账?",
    "怎么成为陪练?",
    "陪练没出现怎么办?",
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, loading]);

  const send = async (text) => {
    const t = text.trim();
    if (!t || loading) return;
    const newMessages = [...messages, { role: "user", content: t }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    const systemPrompt = `你是「公面陪练」App 的智能客服小助手,昵称叫"小公"。这是一个面向中国公务员考试面试的陪练平台。

平台主要功能:
- 学员可预约「面试老师」(认证导师 ¥300-1000/小时,平台抽 8%)或「高分陪练」(已上岸的人 ¥80-200/小时,平台抽 5%)进行 1v1 模拟、3v1 结构化、无领导小组讨论
- AI 智能单练:学员答题后由 AI 即时给出多维度评分与高分参考话术
- 真人陪练房间:多人模拟面试场景

平台政策(用于回答):
- 取消/退款:开始前 24h 取消免费,12-24h 扣 30% 服务费,不足 12h 扣 50%。原路退款 1-5 个工作日到账
- 老师/陪练未出现:对方迟到 10 分钟以上,学员可申请赔付,全额退款 + 等额优惠券补偿
- 老师入驻:需要 3 年以上面试教学经验 + 资质证明,审核 1-3 工作日
- 陪练入驻:面试 80 分以上上岸 + 录用通知,审核 1-3 工作日
- 提现:T+1 到账,每天 1 次,最低 100 元起,平台担保资金安全
- 投诉:订单页提交,客服 24h 内介入

回答规则:
- 回答简短(2-4 句话)、友善、专业
- 用中文,称呼用户为"同学"或"老师"
- 复杂纠纷或技术问题,建议用户转人工:"这种情况建议转人工客服处理,你点客服中心的电话或邮箱可以联系到。"
- 不要瞎编规则,不知道的就承认并建议转人工
- 不要使用 markdown 格式`;

    try {
      const response = await fetch("/api/claude", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 500,
          system: systemPrompt,
          messages: newMessages,
        }),
      });
      const data = await response.json();
      const reply = data.content.map((i) => i.text || "").join("");
      setMessages([...newMessages, { role: "assistant", content: reply }]);
    } catch (e) {
      setMessages([...newMessages, { role: "assistant", content: "抱歉,客服暂时无法连接。你可以稍后再试,或者直接拨打电话客服 400-880-XXXX(9:00-22:00)。" }]);
    }
    setLoading(false);
  };

  return (
    <div className="h-full flex flex-col" style={{ background: "#FAF6EE" }}>
      {/* Custom header for chat */}
      <div className="flex items-center px-5 py-3 border-b shrink-0" style={{ borderColor: "#E8DFCC", background: "#fff" }}>
        <button onClick={onBack} className="p-1 -ml-1"><ArrowLeft size={20} style={{ color: "#1a2332" }} /></button>
        <div className="flex-1 flex items-center justify-center gap-2">
          <div className="w-7 h-7 rounded-full flex items-center justify-center stamp text-white text-[11px] font-bold" style={{ background: "#C7472D" }}>公</div>
          <div className="text-center">
            <div className="font-serif-cn font-bold text-sm" style={{ color: "#1a2332" }}>AI 客服 · 小公</div>
            <div className="text-[9px] flex items-center justify-center gap-1" style={{ color: "#5C8A52" }}>
              <span className="w-1 h-1 rounded-full live-dot" style={{ background: "#5C8A52" }} />
              在线
            </div>
          </div>
        </div>
        <div className="w-7" />
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.map((m, i) => (
          <ChatMessage key={i} role={m.role} content={m.content} />
        ))}
        {loading && (
          <div className="flex gap-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center stamp text-white text-[11px] font-bold shrink-0" style={{ background: "#C7472D" }}>公</div>
            <div className="rounded-2xl px-3.5 py-3" style={{ background: "#fff", border: "1px solid #E8DFCC", borderTopLeftRadius: 4 }}>
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full live-dot" style={{ background: "#9A8866" }} />
                <span className="w-1.5 h-1.5 rounded-full live-dot" style={{ background: "#9A8866", animationDelay: "0.2s" }} />
                <span className="w-1.5 h-1.5 rounded-full live-dot" style={{ background: "#9A8866", animationDelay: "0.4s" }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick replies (only show before user has sent any message) */}
      {messages.length === 1 && !loading && (
        <div className="px-4 pb-2 flex flex-wrap gap-2 shrink-0">
          {QUICK_REPLIES.map((q) => (
            <button key={q} onClick={() => send(q)} className="text-[11px] px-3 py-1.5 rounded-full font-semibold" style={{ background: "#fff", border: "1px solid #E8DFCC", color: "#1a2332" }}>
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input bar */}
      <div className="px-3 py-2.5 flex items-center gap-2 border-t shrink-0" style={{ borderColor: "#E8DFCC", background: "#fff" }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") send(input); }}
          placeholder="请输入您的问题..."
          className="flex-1 px-4 py-2.5 rounded-full text-sm outline-none"
          style={{ background: "#FAF6EE", border: "1px solid #E8DFCC", color: "#1a2332" }}
        />
        <button
          onClick={() => send(input)}
          disabled={!input.trim() || loading}
          className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
          style={{ background: input.trim() && !loading ? "#C7472D" : "#D4C7A8" }}
        >
          <Send size={15} color="#fff" />
        </button>
      </div>
    </div>
  );
}

function ChatMessage({ role, content }) {
  const isUser = role === "user";
  return (
    <div className={`flex gap-2 ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full flex items-center justify-center stamp text-white text-[11px] font-bold shrink-0" style={{ background: "#C7472D" }}>公</div>
      )}
      <div
        className="max-w-[78%] rounded-2xl px-3.5 py-2.5 text-[12.5px] leading-relaxed whitespace-pre-wrap"
        style={{
          background: isUser ? "#1a2332" : "#fff",
          color: isUser ? "#fff" : "#1a2332",
          border: isUser ? "none" : "1px solid #E8DFCC",
          borderTopLeftRadius: !isUser ? 4 : undefined,
          borderTopRightRadius: isUser ? 4 : undefined,
        }}
      >
        {content}
      </div>
      {isUser && (
        <div className="w-8 h-8 rounded-full flex items-center justify-center font-serif-cn text-xs font-bold shrink-0" style={{ background: "#FAF0E0", color: "#9A6A2A" }}>同</div>
      )}
    </div>
  );
}

// ——— Create Room (创建我的对练房间) ———

function CreateRoomScreen({ onBack }) {
  const [name, setName] = useState("");
  const [questionType, setQuestionType] = useState("综合分析");
  const [mode, setMode] = useState("3v1");
  const [maxPeople, setMaxPeople] = useState(4);
  const [startMode, setStartMode] = useState("now"); // 'now' | 'scheduled'
  const [scheduledTime, setScheduledTime] = useState("19:30");
  const [duration, setDuration] = useState(60);
  const [accessType, setAccessType] = useState("public"); // 'public' | 'password' | 'approval'
  const [password, setPassword] = useState("");
  const [allowJoinDuring, setAllowJoinDuring] = useState(false);
  const [recording, setRecording] = useState(true);
  const [description, setDescription] = useState("");
  const [step, setStep] = useState("form"); // 'form' | 'creating' | 'success'
  const [roomId] = useState(() => "gm-" + Math.random().toString(36).slice(2, 6) + "-" + Math.random().toString(36).slice(2, 4));

  const QUESTION_TYPES = ["综合分析", "人际关系", "应急应变", "组织管理", "无领导讨论"];
  const MODES = [
    { id: "1v1", label: "1v1 模拟", desc: "一问一答", icon: "壹" },
    { id: "3v1", label: "3v1 结构化", desc: "考官 + 2 考生", icon: "叁" },
    { id: "wld", label: "无领导小组", desc: "5-8 人讨论", icon: "众" },
    { id: "free", label: "自由练习", desc: "随机搭档", icon: "由" },
  ];
  const ACCESS_TYPES = [
    { id: "public", label: "公开加入", desc: "任何人都可以加入", icon: Users },
    { id: "password", label: "密码加入", desc: "只有知道密码的人能进", icon: KeyRound },
    { id: "approval", label: "需要审核", desc: "由你逐个批准", icon: ShieldCheck },
  ];

  const valid = name.trim().length > 0 && (accessType !== "password" || password.length >= 4);

  const handleCreate = () => {
    if (!valid) return;
    setStep("creating");
    setTimeout(() => setStep("success"), 1100);
  };

  // ——— Success view ———
  if (step === "success") {
    const modeLabel = MODES.find((m) => m.id === mode).label;
    return (
      <div className="h-full flex flex-col" style={{ background: "#FAF6EE" }}>
        <div className="flex-1 overflow-y-auto px-5 pt-8 pb-6">
          <div className="text-center mb-5">
            <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-3" style={{ background: "rgba(92,138,82,0.15)" }}>
              <CheckCircle size={32} style={{ color: "#5C8A52" }} />
            </div>
            <div className="font-serif-cn font-bold text-lg mb-1" style={{ color: "#1a2332" }}>房间已创建</div>
            <div className="text-[11px]" style={{ color: "#7A6B52" }}>等待小伙伴加入</div>
          </div>

          {/* Room card */}
          <div className="rounded-2xl p-4 mb-4 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #1a2332, #2a3447)" }}>
            <div className="absolute -right-6 -top-6 w-32 h-32 rounded-full opacity-10" style={{ background: "#C7472D" }} />
            <div className="relative">
              <div className="flex items-center gap-1.5 mb-2">
                <span className="text-[9px] px-1.5 py-0.5 rounded font-bold" style={{ background: "rgba(184,149,106,0.3)", color: "#B8956A" }}>{questionType}</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded font-bold" style={{ background: "rgba(184,149,106,0.3)", color: "#B8956A" }}>{modeLabel}</span>
                {recording && <span className="text-[9px] px-1.5 py-0.5 rounded font-bold" style={{ background: "rgba(199,71,45,0.3)", color: "#fff" }}>● 录制</span>}
              </div>
              <div className="font-serif-cn font-bold text-white text-base mb-3">{name}</div>

              <div className="space-y-2">
                <DetailRow icon={Users} label={`${maxPeople} 人房间`} value={`已 1 / ${maxPeople}`} />
                <DetailRow icon={Clock} label={startMode === "now" ? "立即开始" : `今晚 ${scheduledTime} 开始`} value={`${duration} 分钟`} />
                <DetailRow
                  icon={accessType === "public" ? Users : accessType === "password" ? KeyRound : ShieldCheck}
                  label={ACCESS_TYPES.find((a) => a.id === accessType).label}
                  value={accessType === "password" ? `密码 ${password}` : ""}
                />
              </div>
            </div>
          </div>

          {/* Share */}
          <div className="rounded-xl p-4 mb-4" style={{ background: "#fff", border: "1px solid #E8DFCC" }}>
            <div className="text-[10px] mb-2" style={{ color: "#7A6B52" }}>邀请朋友加入,把房间号发给他们</div>
            <div className="flex items-center gap-2">
              <div className="flex-1 px-3 py-2.5 rounded-lg font-mono text-sm font-bold tracking-wider" style={{ background: "#FAF0E0", color: "#1a2332", border: "1px solid #E8D5A8" }}>
                {roomId}
              </div>
              <button onClick={() => {
                navigator.clipboard?.writeText(roomId);
                alert("房间号已复制");
              }} className="px-4 py-2.5 rounded-lg text-xs font-bold shrink-0" style={{ background: "#1a2332", color: "#fff" }}>复制</button>
            </div>
            <div className="text-[10px] mt-2 flex items-center gap-1" style={{ color: "#9A8866" }}>
              <AlertCircle size={11} /> 30 分钟内无人加入,房间会自动关闭
            </div>
          </div>
        </div>

        <div className="px-5 py-3 flex gap-3 shrink-0" style={{ background: "rgba(250,246,238,0.95)", backdropFilter: "blur(8px)", borderTop: "1px solid #E8DFCC" }}>
          <button onClick={onBack} className="flex-1 py-3 rounded-xl font-bold text-sm" style={{ background: "#fff", border: "1px solid #E8DFCC", color: "#7A6B52" }}>返回列表</button>
          <button className="flex-1 py-3 rounded-xl font-bold text-sm" style={{ background: "#C7472D", color: "#fff" }}>进入房间等待</button>
        </div>
      </div>
    );
  }

  // ——— Creating loading ———
  if (step === "creating") {
    return (
      <div className="h-full flex flex-col items-center justify-center" style={{ background: "#FAF6EE" }}>
        <Loader2 size={32} className="animate-spin mb-3" style={{ color: "#C7472D" }} />
        <div className="font-serif-cn font-bold text-base" style={{ color: "#1a2332" }}>正在创建房间...</div>
      </div>
    );
  }

  // ——— Form view ———
  return (
    <div className="h-full flex flex-col">
      <ScreenHeader title="创建对练房间" onBack={onBack} />

      <div className="flex-1 overflow-y-auto px-5 pt-4 pb-6">
        {/* Section 1 - 房间基本 */}
        <SectionLabel title="房间基本信息" />

        <Field label="房间名称">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="如:国考综合分析 3v1 模拟"
            className="w-full px-3 py-2.5 rounded-lg text-sm outline-none"
            style={{ background: "#fff", border: "1px solid #E8DFCC", color: "#1a2332" }}
          />
        </Field>

        <Field label="题型方向">
          <SelectChips value={questionType} onChange={setQuestionType} options={QUESTION_TYPES} />
        </Field>

        <Field label="模拟形式">
          <div className="grid grid-cols-2 gap-2">
            {MODES.map((m) => {
              const active = mode === m.id;
              return (
                <button key={m.id} onClick={() => setMode(m.id)} className="rounded-xl p-3 text-left flex items-center gap-2.5" style={{
                  background: active ? "#1a2332" : "#fff",
                  border: `1px solid ${active ? "#1a2332" : "#E8DFCC"}`,
                }}>
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center font-serif-cn text-base font-bold shrink-0" style={{
                    background: active ? "rgba(184,149,106,0.2)" : "#FAF0E0",
                    color: active ? "#B8956A" : "#9A6A2A",
                  }}>{m.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-xs" style={{ color: active ? "#fff" : "#1a2332" }}>{m.label}</div>
                    <div className="text-[10px] mt-0.5" style={{ color: active ? "rgba(255,255,255,0.6)" : "#9A8866" }}>{m.desc}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </Field>

        {/* Section 2 - 人数与时间 */}
        <div className="mt-6">
          <SectionLabel title="人数与时间" />
        </div>

        <Field label="最多人数">
          <div className="grid grid-cols-4 gap-2">
            {[2, 4, 6, 8].map((n) => {
              const active = maxPeople === n;
              return (
                <button key={n} onClick={() => setMaxPeople(n)} className="py-2.5 rounded-lg text-sm font-bold" style={{
                  background: active ? "#1a2332" : "#fff",
                  color: active ? "#fff" : "#7A6B52",
                  border: `1px solid ${active ? "#1a2332" : "#E8DFCC"}`,
                }}>{n}<span className="text-[10px] font-normal ml-0.5">人</span></button>
              );
            })}
          </div>
        </Field>

        <Field label="开始方式">
          <div className="grid grid-cols-2 gap-2 mb-2">
            {[
              { id: "now", label: "立即开始" },
              { id: "scheduled", label: "预约时间" },
            ].map((s) => {
              const active = startMode === s.id;
              return (
                <button key={s.id} onClick={() => setStartMode(s.id)} className="py-2.5 rounded-lg text-sm font-bold" style={{
                  background: active ? "#1a2332" : "#fff",
                  color: active ? "#fff" : "#7A6B52",
                  border: `1px solid ${active ? "#1a2332" : "#E8DFCC"}`,
                }}>{s.label}</button>
              );
            })}
          </div>
          {startMode === "scheduled" && (
            <div className="rounded-lg p-3 flex items-center gap-2" style={{ background: "#FAF0E0", border: "1px solid #E8D5A8" }}>
              <Clock size={14} style={{ color: "#9A6A2A" }} />
              <span className="text-[11px] font-semibold" style={{ color: "#9A6A2A" }}>今天</span>
              <input
                type="time"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
                className="flex-1 bg-transparent outline-none text-sm font-bold"
                style={{ color: "#1a2332" }}
              />
            </div>
          )}
        </Field>

        <Field label="房间时长">
          <div className="grid grid-cols-4 gap-2">
            {[30, 60, 90, 120].map((d) => {
              const active = duration === d;
              return (
                <button key={d} onClick={() => setDuration(d)} className="py-2.5 rounded-lg text-xs font-bold" style={{
                  background: active ? "#1a2332" : "#fff",
                  color: active ? "#fff" : "#7A6B52",
                  border: `1px solid ${active ? "#1a2332" : "#E8DFCC"}`,
                }}>{d}<span className="text-[9px] font-normal ml-0.5">分钟</span></button>
              );
            })}
          </div>
        </Field>

        {/* Section 3 - 加入方式 */}
        <div className="mt-6">
          <SectionLabel title="加入方式" />
        </div>

        <div className="space-y-2 mb-3">
          {ACCESS_TYPES.map((a) => {
            const Icon = a.icon;
            const active = accessType === a.id;
            return (
              <button key={a.id} onClick={() => setAccessType(a.id)} className="w-full rounded-xl p-3 flex items-center gap-3 text-left" style={{
                background: active ? "#1a2332" : "#fff",
                border: `1px solid ${active ? "#1a2332" : "#E8DFCC"}`,
              }}>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{
                  background: active ? "rgba(184,149,106,0.2)" : "#FAF0E0",
                }}>
                  <Icon size={15} style={{ color: active ? "#B8956A" : "#9A6A2A" }} />
                </div>
                <div className="flex-1">
                  <div className="font-bold text-xs" style={{ color: active ? "#fff" : "#1a2332" }}>{a.label}</div>
                  <div className="text-[10px] mt-0.5" style={{ color: active ? "rgba(255,255,255,0.6)" : "#7A6B52" }}>{a.desc}</div>
                </div>
                {active && <CheckCircle size={16} style={{ color: "#B8956A" }} />}
              </button>
            );
          })}
        </div>

        {accessType === "password" && (
          <div className="mb-3">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value.replace(/[^0-9]/g, "").slice(0, 6))}
              placeholder="设置 4-6 位数字密码"
              inputMode="numeric"
              className="w-full px-3 py-2.5 rounded-lg text-sm outline-none font-mono tracking-wider"
              style={{ background: "#fff", border: "1px solid #E8DFCC", color: "#1a2332" }}
            />
            <div className="text-[10px] mt-1" style={{ color: "#9A8866" }}>朋友需要输入此密码才能加入房间</div>
          </div>
        )}

        {/* Section 4 - 高级设置 */}
        <div className="mt-6">
          <SectionLabel title="进阶设置" />
        </div>

        <ToggleRow
          icon={Users}
          title="答题中允许加入"
          desc={allowJoinDuring ? "练习开始后,新人仍可加入(可能打断节奏)" : "练习一旦开始,房间立即关闭加入入口"}
          value={allowJoinDuring}
          onChange={setAllowJoinDuring}
        />

        <ToggleRow
          icon={Mic}
          title="录制本次对练"
          desc={recording ? "结束后房主可下载完整回放,用于复盘" : "本次对练不留下任何录像"}
          value={recording}
          onChange={setRecording}
        />

        {/* Section 5 - 描述 */}
        <div className="mt-6">
          <SectionLabel title="房间描述" hint="可选 · 让加入的人了解你的诉求" />
        </div>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="例如:重点练综合分析,希望搭档帮忙记录答题时长和卡顿点..."
          className="w-full h-20 px-3 py-2.5 rounded-lg text-sm outline-none resize-none"
          style={{ background: "#fff", border: "1px solid #E8DFCC", color: "#1a2332" }}
        />
      </div>

      {/* Bottom action */}
      <div className="shrink-0 px-5 py-3" style={{ background: "rgba(250,246,238,0.95)", backdropFilter: "blur(8px)", borderTop: "1px solid #E8DFCC" }}>
        <button
          onClick={handleCreate}
          disabled={!valid}
          className="w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-1.5"
          style={{ background: valid ? "#C7472D" : "#D4C7A8", color: "#fff" }}
        >
          <Plus size={14} /> 创建并开始
        </button>
        {!valid && <div className="text-center text-[10px] mt-1.5" style={{ color: "#9A8866" }}>{!name.trim() ? "请填写房间名称" : "请输入至少 4 位密码"}</div>}
      </div>
    </div>
  );
}

function ToggleRow({ icon: Icon, title, desc, value, onChange }) {
  return (
    <div className="rounded-xl p-3.5 mb-2 flex items-center gap-3" style={{ background: "#fff", border: "1px solid #E8DFCC" }}>
      <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: value ? "rgba(92,138,82,0.15)" : "#F0E8D4" }}>
        <Icon size={15} style={{ color: value ? "#5C8A52" : "#9A8866" }} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-bold text-xs" style={{ color: "#1a2332" }}>{title}</div>
        <div className="text-[10px] mt-0.5 leading-relaxed" style={{ color: "#7A6B52" }}>{desc}</div>
      </div>
      <SmallToggle value={value} onChange={onChange} />
    </div>
  );
}

function DetailRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-2 text-[11px]">
      <Icon size={12} style={{ color: "#B8956A" }} />
      <span style={{ color: "rgba(255,255,255,0.85)" }}>{label}</span>
      {value && <span className="ml-auto" style={{ color: "rgba(255,255,255,0.6)" }}>{value}</span>}
    </div>
  );
}

function ScreenHeader({ title, onBack }) {
  return (
    <div className="flex items-center px-5 py-3 border-b shrink-0" style={{ borderColor: "#E8DFCC" }}>
      <button onClick={onBack} className="p-1 -ml-1"><ArrowLeft size={20} style={{ color: "#1a2332" }} /></button>
      <div className="flex-1 text-center font-serif-cn font-bold text-base" style={{ color: "#1a2332" }}>{title}</div>
      <div className="w-7" />
    </div>
  );
}
