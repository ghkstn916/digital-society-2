import { useState } from 'react'
import ChoiceQuiz from '../../components/interactive/ChoiceQuiz'
import FlipReveal from '../../components/interactive/FlipReveal'

const COLOR = '#4f7c5a'

const jobs = [
  {
    name: '빅데이터 분석가',
    tech: '빅데이터·클라우드',
    icon: '📊',
    type: 'new',
    desc: '데이터를 수집·저장·분석하고 시각화하여 의미 있는 분석 결과를 도출합니다. 빅데이터 분석 과정에서 클라우드를 활용할 수 있어요.',
    skill: '통계, 데이터 시각화, 파이썬/R 프로그래밍',
  },
  {
    name: '동영상 크리에이터',
    tech: 'OTT·동영상 플랫폼',
    icon: '🎬',
    type: 'new',
    desc: '유튜브 등 동영상 플랫폼이 활성화되면서 생겨난 직업이에요. 콘텐츠 기획·촬영·편집·업로드 전 과정을 담당합니다.',
    skill: '영상 편집, 기획력, 커뮤니케이션',
  },
  {
    name: '환경 빅데이터 전문가',
    tech: '빅데이터',
    icon: '🌿',
    type: 'new',
    desc: '환경에 대한 기본 지식을 바탕으로 데이터를 분석해 환경 정책과 업무에 활용합니다.',
    skill: '환경 과학, 데이터 분석, 정책 이해',
  },
  {
    name: '스포츠 트레이너',
    tech: 'IoT·사물 인터넷',
    icon: '🏃',
    type: 'changed',
    desc: '운동선수의 신체·건강 상태를 진단해 최상의 컨디션을 유지하도록 지도합니다. 사물 인터넷 기술로 선수의 건강 데이터를 수집·분석해 더 과학적인 관리가 가능해졌어요.',
    skill: '운동 생리학 + IoT 기기 활용 능력',
  },
  {
    name: '요리 연구가',
    tech: '생성형 AI',
    icon: '👨‍🍳',
    type: 'changed',
    desc: '다양한 식재료를 연구하고 새로운 조리법을 개발합니다. 식재료를 입력하면 AI가 개인 음식 취향을 분석하고 맞춤형 조리법을 제안해 더 다양한 연구가 가능해졌어요.',
    skill: '요리 기술 + AI 프롬프트 활용',
  },
  {
    name: '과수 작물 재배자',
    tech: 'IoT',
    icon: '🍎',
    type: 'changed',
    desc: '각종 과수 작물을 심고 경작해 수확·포장합니다. 사물 인터넷으로 농작물 생장 상태, 토양 조건, 날씨를 모니터링하며 관리할 수 있게 됐어요.',
    skill: '농업 지식 + IoT 센서 운영 능력',
  },
  {
    name: '작가',
    tech: '생성형 AI',
    icon: '✍️',
    type: 'changed',
    desc: '소설, 시, 수필, 시나리오 등을 창작합니다. 등장인물·배경 설정이나 초안 작성에 생성형 AI를 활용하고 있어요.',
    skill: '창의력, 문장력 + AI 협업 능력',
  },
  {
    name: '변호사',
    tech: '생성형 AI',
    icon: '⚖️',
    type: 'changed',
    desc: '개인·단체를 대신해 소송을 제기하거나 재판에서 변호합니다. 법 조항 검색·서류 작업은 AI에게 맡기고, 변호사는 의뢰인을 위한 일에 더 집중하게 됩니다.',
    skill: '법률 지식 + AI 검색 도구 활용',
  },
  {
    name: '의사',
    tech: '인공지능',
    icon: '🏥',
    type: 'changed',
    desc: '인간의 질병·장애·상해를 진단하고 치료합니다. AI 기술로 분석한 의료 데이터를 바탕으로 더 정확한 진단을 내릴 수 있어요.',
    skill: '의학 지식 + AI 의료 기기 활용',
  },
  {
    name: '계산원',
    tech: '키오스크·온라인 쇼핑',
    icon: '🛒',
    type: 'reduced',
    desc: '온라인 쇼핑과 키오스크가 보편화되면서 역할이 줄거나, 계산하는 역할에서 키오스크 사용을 어려워하는 사람들을 도와주는 역할로 바뀌고 있어요.',
    skill: '대면 서비스 + 디지털 기기 안내 능력',
  },
  {
    name: '경비원',
    tech: '무인 경비 시스템',
    icon: '🔒',
    type: 'reduced',
    desc: '무인 경비 시스템과 CCTV·AI 영상 분석이 도입되면서 경비원의 역할이 줄어들고 있어요. 단, 시스템 관리·이상 상황 대응 역할은 여전히 필요합니다.',
    skill: '상황 판단력 + 보안 시스템 이해',
  },
  {
    name: '텔레마케터',
    tech: 'AI 음성인식·챗봇',
    icon: '📞',
    type: 'reduced',
    desc: 'AI 음성 인식 기술과 챗봇이 발전하면서 전화 상담 업무의 상당 부분이 자동화돼 텔레마케터의 역할이 줄어들고 있어요.',
    skill: '복잡한 민원 해결, 감성 소통 능력',
  },
]

const typeConfig = {
  new: { label: '새로 생긴 직업', color: 'bg-green-100 text-green-700', border: 'border-green-300' },
  changed: { label: '방식이 바뀐 직업', color: 'bg-blue-100 text-blue-700', border: 'border-blue-300' },
  reduced: { label: '역할이 줄어드는 직업', color: 'bg-red-100 text-red-700', border: 'border-red-300' },
}

const digitalCompetencies = [
  { icon: '📈', name: '데이터 문해력', desc: '데이터를 수집·분석·시각화하고 의미를 해석하는 능력' },
  { icon: '🤖', name: 'AI·자동화 도구 활용', desc: 'ChatGPT, 코파일럿 등 AI 도구를 업무에 활용하는 능력' },
  { icon: '💬', name: '디지털 협업·소통', desc: '온라인 회의, 협업 플랫폼에서 효과적으로 소통하는 능력' },
  { icon: '🔐', name: '정보 보안·윤리 의식', desc: '개인 정보를 보호하고 디지털 환경에서 올바르게 판단하는 능력' },
  { icon: '💡', name: '창의적 문제 해결', desc: '디지털 도구를 활용해 새로운 방식으로 문제를 해결하는 능력' },
]

export default function Lesson1_3() {
  const [filter, setFilter] = useState('all')
  const [selected, setSelected] = useState(null)
  const [myJob, setMyJob] = useState('')
  const [myDigital, setMyDigital] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [openComp, setOpenComp] = useState(null)

  const filtered = filter === 'all' ? jobs : jobs.filter(j => j.type === filter)

  return (
    <article className="prose">
      <h1 className="text-2xl font-black text-[#4f7c5a] mb-1">직업의 미래와 나의 진로</h1>
      <p className="text-sm text-gray-400 mb-8">Module 1 · Lesson 3 · 15분</p>

      <div className="bg-[#4f7c5a]/10 rounded-xl p-4 mb-6 text-sm not-prose">
        <p className="font-bold text-[#4f7c5a] mb-2">이 레슨에서 배우는 것</p>
        <ul className="space-y-1 text-gray-700">
          <li>디지털 기술로 새로 생긴 직업, 방식이 바뀐 직업, 역할이 줄어드는 직업을 구분한다.</li>
          <li>각 직업에서 디지털 기술이 어떻게 활용되는지 설명한다.</li>
          <li>미래에 필요한 디지털 역량 5가지를 이해한다.</li>
          <li>나의 관심 진로에서 필요한 디지털 역량을 탐색한다.</li>
        </ul>
      </div>

      <FlipReveal
        color={COLOR}
        prompt="AI가 발전하면 사람의 일자리가 모두 사라질까? 어떤 일은 AI가 대신할 수 있고, 어떤 일은 사람만 할 수 있을까?"
        reveal="AI는 데이터 분석, 반복 작업, 패턴 인식을 잘해요. 하지만 공감·창의력·윤리적 판단·대인 관계처럼 '사람다운 능력'은 여전히 사람이 더 잘합니다. 미래 직업은 AI와 경쟁이 아닌 AI와 협력하는 방향으로 바뀔 거예요."
      />

      <h2>직업 세계가 변하고 있다</h2>
      <p>
        디지털 기술과 인공지능의 발달로 직업 세계에 큰 변화가 나타났어요.
        기존 직업의 업무 방식이 바뀌어 필요한 능력이 달라지거나, 아예 새로운 직업이 생겨나기도 하고,
        반대로 자동화로 인해 역할이 줄어드는 직업도 있습니다.
      </p>
      <p>
        중요한 점은 단순히 자동화되기 쉬운 일(반복적·규칙적 업무)은 줄어들고,
        <strong>창의력·공감·복잡한 판단이 필요한 일</strong>은 오히려 더 중요해진다는 거예요.
      </p>

      <div className="not-prose grid grid-cols-3 gap-3 my-4">
        {[
          { type: 'new', icon: '✨', title: '새로 생긴 직업', desc: '디지털 기술 덕에 없던 직업이 생겨남', ex: '빅데이터 분석가, 크리에이터' },
          { type: 'changed', icon: '🔄', title: '방식이 바뀐 직업', desc: '기존 직업이 디지털 기술을 활용하며 방식이 달라짐', ex: '의사, 변호사, 농부' },
          { type: 'reduced', icon: '📉', title: '역할이 줄어드는 직업', desc: '자동화로 사람의 역할이 줄어드는 직업', ex: '계산원, 텔레마케터' },
        ].map(c => (
          <div key={c.type} className={`rounded-xl border-2 p-3 text-center ${typeConfig[c.type].border} bg-white`}>
            <div className="text-2xl mb-1">{c.icon}</div>
            <div className={`text-xs font-bold px-2 py-0.5 rounded inline-block mb-1 ${typeConfig[c.type].color}`}>
              {c.title}
            </div>
            <p className="text-xs text-gray-500 leading-relaxed mb-1">{c.desc}</p>
            <p className="text-xs text-gray-400 italic">{c.ex}</p>
          </div>
        ))}
      </div>

      {/* 직업 탐색 카드 */}
      <h2>직업 탐색 카드</h2>
      <p className="text-sm text-gray-500 not-prose mb-2">카드를 클릭해 직업 설명과 필요한 역량을 확인해보세요.</p>
      <div className="not-prose flex gap-2 mb-3 flex-wrap">
        {[
          { key: 'all', label: '전체' },
          { key: 'new', label: '새로 생긴' },
          { key: 'changed', label: '방식이 바뀐' },
          { key: 'reduced', label: '역할이 줄어드는' },
        ].map(f => (
          <button
            key={f.key}
            onClick={() => { setFilter(f.key); setSelected(null) }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
              filter === f.key ? 'bg-[#4f7c5a] text-white border-[#4f7c5a]' : 'border-gray-300 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="not-prose grid grid-cols-2 sm:grid-cols-3 gap-3 mb-3">
        {filtered.map((job) => (
          <button
            key={job.name}
            onClick={() => setSelected(selected === job.name ? null : job.name)}
            className={`text-left rounded-xl border-2 p-3 transition-all ${
              selected === job.name ? `${typeConfig[job.type].border} bg-gray-50` : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div className="text-2xl mb-1">{job.icon}</div>
            <div className="font-bold text-sm text-gray-800 mb-0.5">{job.name}</div>
            <span className={`text-xs px-1.5 py-0.5 rounded inline-block ${typeConfig[job.type].color}`}>
              {typeConfig[job.type].label}
            </span>
          </button>
        ))}
      </div>

      {selected && (() => {
        const job = jobs.find(j => j.name === selected)
        if (!job) return null
        return (
          <div className={`not-prose bg-white rounded-xl border-2 ${typeConfig[job.type].border} p-4 mb-6 shadow-sm`}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{job.icon}</span>
              <span className="font-bold text-gray-800">{job.name}</span>
              <span className={`text-xs px-2 py-0.5 rounded ${typeConfig[job.type].color}`}>
                {typeConfig[job.type].label}
              </span>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed mb-2">{job.desc}</p>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="text-gray-400">활용 기술: <span className="font-medium text-gray-600">{job.tech}</span></span>
              <span className="text-gray-400">필요 역량: <span className="font-medium text-gray-600">{job.skill}</span></span>
            </div>
          </div>
        )
      })()}

      {/* 디지털 역량 */}
      <h2>미래에 필요한 디지털 역량</h2>
      <p>
        디지털 사회를 살아가는 우리는 전공 지식뿐만 아니라 <strong>디지털 역량</strong>도 함께 키워야 해요.
        각 역량을 클릭해 확인해보세요.
      </p>
      <div className="not-prose flex flex-col gap-2 mb-6">
        {digitalCompetencies.map((c, idx) => (
          <button
            key={c.name}
            onClick={() => setOpenComp(openComp === idx ? null : idx)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left transition-all ${
              openComp === idx ? 'border-[#4f7c5a] bg-[#4f7c5a]/5' : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <span className="text-2xl">{c.icon}</span>
            <div className="flex-1">
              <span className="font-bold text-sm text-gray-800">{c.name}</span>
              {openComp === idx && <p className="text-xs text-gray-600 mt-1">{c.desc}</p>}
            </div>
            <span className="text-gray-400 text-sm">{openComp === idx ? '▲' : '▼'}</span>
          </button>
        ))}
      </div>

      <div className="not-prose bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 text-sm">
        <p className="font-bold text-blue-800 mb-2">💡 AI가 대체하기 어려운 역량은?</p>
        <div className="grid grid-cols-2 gap-2 text-blue-900">
          {[
            { icon: '❤️', label: '공감 능력', desc: '사람의 감정을 이해하고 위로' },
            { icon: '🎨', label: '창의적 발상', desc: '완전히 새로운 아이디어 생성' },
            { icon: '⚖️', label: '윤리적 판단', desc: '상황에 따른 복잡한 도덕 판단' },
            { icon: '🤝', label: '리더십·관계', desc: '신뢰·설득·팀워크 구축' },
          ].map(r => (
            <div key={r.label} className="flex gap-2 items-start">
              <span>{r.icon}</span>
              <div>
                <p className="font-bold text-xs">{r.label}</p>
                <p className="text-xs opacity-80">{r.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 나의 진로 */}
      <h2>나의 진로 탐색하기</h2>
      <div className="not-prose bg-white rounded-xl border border-gray-100 shadow-sm p-5 mb-4">
        <p className="text-sm font-medium text-gray-700 mb-2">내가 관심 있는 직업은?</p>
        <input
          type="text"
          value={myJob}
          onChange={e => setMyJob(e.target.value)}
          placeholder="예) 수의사, 게임 디자이너, 유튜버, 교사..."
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#4f7c5a] mb-3"
          disabled={submitted}
        />
        <p className="text-sm font-medium text-gray-700 mb-2">
          그 직업에서 디지털 기술(AI, IoT, 빅데이터 등)이 어떻게 활용될 수 있을까?
        </p>
        <textarea
          value={myDigital}
          onChange={e => setMyDigital(e.target.value)}
          placeholder="예) 수의사는 IoT 웨어러블로 동물 건강 데이터를 실시간 모니터링하고, AI로 질병을 빠르게 진단할 수 있다."
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm h-24 resize-none focus:outline-none focus:border-[#4f7c5a]"
          disabled={submitted}
        />
        {!submitted ? (
          <button
            onClick={() => setSubmitted(true)}
            disabled={!myJob || !myDigital}
            className={`mt-3 px-5 py-2 rounded-lg text-sm font-semibold ${
              myJob && myDigital ? 'bg-[#4f7c5a] text-white hover:bg-[#3a5e43]' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            작성 완료
          </button>
        ) : (
          <div className="mt-3 bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-green-800">
            ✅ 좋아요! 관심 직업에 디지털 역량을 연결해 생각해봤어요. 미래에는 어떤 직업이든 디지털 기술이 함께하게 됩니다.
          </div>
        )}
      </div>

      <ChoiceQuiz
        color={COLOR}
        question="디지털 기술 발전과 직업 변화에 대한 설명으로 옳지 않은 것은?"
        choices={[
          { label: '동영상 크리에이터, 빅데이터 분석가 같은 새 직업이 생겨났다', correct: false, explanation: '맞아요. 플랫폼 활성화로 새 직업들이 생겼습니다.' },
          { label: '계산원은 키오스크 보급으로 역할이 줄거나 변화하고 있다', correct: false, explanation: '맞아요. 자동화로 일부 직업의 역할이 축소되고 있어요.' },
          { label: 'AI가 발전하면 사람만 할 수 있는 공감·창의력도 완전히 대체된다', correct: true, explanation: '틀렸어요! 공감, 창의적 발상, 윤리적 판단, 리더십은 현재 AI가 대체하기 매우 어려운 역량이에요.' },
          { label: '미래를 위해 기존 능력 외에 디지털 역량도 개발해야 한다', correct: false, explanation: '맞아요. 디지털 역량 개발이 미래 진로 준비의 핵심이에요.' },
        ]}
      />
      <ChoiceQuiz
        color={COLOR}
        question="의사·변호사·요리 연구가·스포츠 트레이너 모두에게 해당하는 직업 변화 유형은?"
        choices={[
          { label: '새로 생긴 직업', correct: false, explanation: '이 직업들은 오래전부터 있었던 직업들이에요.' },
          { label: '방식이 바뀐 직업', correct: true, explanation: '맞아요! 이 직업들은 AI·IoT 등 디지털 기술을 활용해 업무 방식이 바뀌었지만, 직업 자체는 여전히 존재해요.' },
          { label: '역할이 줄어드는 직업', correct: false, explanation: '이 직업들은 오히려 디지털 기술 덕분에 더 정교해지고 있어요.' },
          { label: '이미 사라진 직업', correct: false, explanation: '이 직업들은 아직 활발히 존재하고 있어요.' },
        ]}
      />

      <div className="bg-[#4f7c5a]/10 rounded-xl p-4 mt-8 text-sm not-prose">
        <p className="font-bold text-[#4f7c5a] mb-2">이번 레슨에서 배운 것</p>
        <ul className="space-y-1.5 text-gray-700">
          <li>✅ 새로 생긴 직업: 빅데이터 분석가, 동영상 크리에이터, 환경 빅데이터 전문가 등</li>
          <li>✅ 방식이 바뀐 직업: 의사, 변호사, 스포츠 트레이너, 작가, 요리 연구가 등</li>
          <li>✅ 역할이 줄어드는 직업: 계산원, 경비원, 텔레마케터 등</li>
          <li>✅ AI가 대체하기 어려운 것: 공감, 창의력, 윤리 판단, 리더십</li>
          <li>✅ 진로 준비 = 핵심 능력 + 디지털 역량 5가지 함께 개발</li>
        </ul>
      </div>
    </article>
  )
}
