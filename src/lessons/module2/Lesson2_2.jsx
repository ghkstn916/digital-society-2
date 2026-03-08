import { useState } from 'react'
import ChoiceQuiz from '../../components/interactive/ChoiceQuiz'
import SortCards from '../../components/interactive/SortCards'
import FlipReveal from '../../components/interactive/FlipReveal'

const COLOR = '#4a72a8'

const infoCards = [
  { label: '군사 기밀 정보', group: 'A' },
  { label: '기업의 첨단 기술 개발 정보', group: 'A' },
  { label: '개인 의료 기록 (처방전, 수술 이력, 진료 기록)', group: 'A' },
  { label: '개인 정보 (이름, 주민번호, 카드번호)', group: 'A' },
  { label: '날씨 데이터', group: 'B' },
  { label: '재난·재해 정보 (지진, 태풍)', group: 'B' },
  { label: '진로·진학 정보', group: 'B' },
  { label: '각종 공공 데이터', group: 'B' },
]

const softwareLicenses = [
  {
    name: '상용 소프트웨어',
    icon: '💰',
    desc: '비용을 지불하고 사용하는 소프트웨어예요.',
    example: 'Microsoft Office, Adobe Photoshop 등',
    color: 'bg-red-50 border-red-200',
  },
  {
    name: '쉐어웨어',
    icon: '⏱️',
    desc: '일정 기간 무료로 사용해보고, 계속 사용하려면 비용을 지불해야 해요.',
    example: '30일 무료 체험 후 구매 필요한 프로그램들',
    color: 'bg-orange-50 border-orange-200',
  },
  {
    name: '프리웨어',
    icon: '🆓',
    desc: '개인은 무료로 사용하며, 기업은 비용을 지불하고 사용할 수도 있어요.',
    example: 'VLC 미디어 플레이어, 카카오톡 등',
    color: 'bg-blue-50 border-blue-200',
  },
  {
    name: '오픈 소스 소프트웨어',
    icon: '🔓',
    desc: '소스 코드를 공개하여 사용자가 코드를 수정하고 재배포할 수 있어요.',
    example: 'Linux, Firefox, Python 등',
    color: 'bg-green-50 border-green-200',
  },
]

const cclItems = [
  { icon: '👤', name: '저작자 표시 (BY)', desc: '저작자 이름을 반드시 표시해야 사용 가능' },
  { icon: '🚫💰', name: '비영리 (NC)', desc: '비영리 목적으로만 사용 가능' },
  { icon: '✏️🚫', name: '변경 금지 (ND)', desc: '원본 그대로만 사용 가능, 수정 불가' },
  { icon: '🔄', name: '동일 조건 변경 허락 (SA)', desc: '수정 가능하지만 같은 조건으로만 배포 가능' },
]

export default function Lesson2_2() {
  const [openSw, setOpenSw] = useState(null)
  const [openCcl, setOpenCcl] = useState(null)

  return (
    <article className="prose">
      <h1 className="text-2xl font-black mb-1" style={{ color: COLOR }}>보호할 정보 vs 공유할 정보</h1>
      <p className="text-sm text-gray-400 mb-8">Module 2 · Lesson 2 · 15분</p>

      <div className="rounded-xl p-4 mb-6 text-sm not-prose" style={{ backgroundColor: COLOR + '15' }}>
        <p className="font-bold mb-2" style={{ color: COLOR }}>이 레슨에서 배우는 것</p>
        <ul className="space-y-1 text-gray-700">
          <li>보호할 정보와 공유할 정보를 사례로 구분한다.</li>
          <li>저작권·CCL·소프트웨어 저작권의 개념을 이해한다.</li>
          <li>초상권의 개념을 알고 실제 사례에 적용한다.</li>
        </ul>
      </div>

      <h2>어떤 정보를 보호해야 할까?</h2>
      <p>
        국가와 기업의 안보, 개인의 안전을 보장하기 위한 정보는 반드시 보호해야 해요.
        특히 개인 정보는 유출되면 심각한 정신적·경제적 피해를 줄 수 있어요.
      </p>
      <h2>어떤 정보를 공유해야 할까?</h2>
      <p>
        정보를 공유하면 양질의 지식을 생산·활용하고, 더 활발한 소통과 협업이 가능해요.
        또한 공공의 이익과 국민의 <strong>알 권리</strong>를 보장하기 위해 공개해야 하는 정보도 있습니다.
      </p>

      {/* 분류 활동 */}
      <h2>활동: 정보 분류하기</h2>
      <p className="text-sm text-gray-500 not-prose mb-3">각 정보가 보호(A)인지 공유(B)인지 선택해보세요.</p>
      <SortCards
        cards={infoCards}
        groupA={{ label: '보호할 정보', color: '#e05c5c' }}
        groupB={{ label: '공유할 정보', color: '#4a72a8' }}
      />

      {/* 초상권 */}
      <h2>초상권이란?</h2>
      <p>
        자신의 얼굴이나 신체가 무단으로 촬영·공개되지 않을 권리를 <strong>초상권</strong>이라 해요.
        초상권은 연예인만의 권리가 아니라 <strong>모든 사람에게 인정되는 기본권</strong>입니다.
      </p>

      <FlipReveal
        color={COLOR}
        prompt="크리에이터 A씨가 식당에서 촬영 중, 손님 B씨가 '영상 지워달라'고 했어요. A씨는 '공개된 장소고 연예인도 아닌데 초상권이 있냐'고 했습니다. A씨의 주장이 맞을까요?"
        reveal="틀렸어요! ① 공개된 장소라도 사전 동의 없이 타인을 촬영하는 것은 불법이에요. ② 초상권은 모든 사람의 기본권입니다. ③ 오히려 공인(연예인 등)은 일반인보다 초상권이 좁게 인정돼요. 촬영 동의와 공개 동의는 별개로 받아야 합니다."
      />

      {/* 저작권 */}
      <h2>저작권(Copyright)이란?</h2>
      <p>
        <strong>저작권</strong>은 문학 작품·미술·음악·글 등 저작물에 대해 저작자가 가지는 권리예요.
        내가 만든 창작물에 대해 인정받는 권리로, 허락 없이 사용하면 법적 책임이 생깁니다.
      </p>

      {/* CCL */}
      <h2>저작물 이용 허락 표시 (CCL)</h2>
      <p>
        저작자가 자신의 저작물 사용 조건을 미리 밝혀두는 표시예요.
        CCL 표시가 있으면 그 조건 안에서 자유롭게 이용할 수 있습니다.
      </p>
      <div className="not-prose grid grid-cols-2 gap-2 my-4">
        {cclItems.map((item, idx) => (
          <button
            key={idx}
            onClick={() => setOpenCcl(openCcl === idx ? null : idx)}
            className={`rounded-xl border-2 p-3 text-left transition-all ${
              openCcl === idx ? 'border-[#4a72a8] bg-blue-50' : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div className="text-xl mb-1">{item.icon}</div>
            <p className="font-bold text-sm text-gray-800">{item.name}</p>
            {openCcl === idx && (
              <p className="text-xs text-gray-600 mt-1">{item.desc}</p>
            )}
          </button>
        ))}
      </div>

      {/* 소프트웨어 저작권 */}
      <h2>소프트웨어 저작권의 종류</h2>
      <p className="text-sm text-gray-500 not-prose mb-3">소프트웨어도 저작권이 있어요. 종류별로 사용 조건이 달라요.</p>
      <div className="not-prose flex flex-col gap-3 mb-6">
        {softwareLicenses.map((sw, idx) => (
          <div key={sw.name}>
            <button
              onClick={() => setOpenSw(openSw === idx ? null : idx)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left transition-all ${
                openSw === idx ? 'border-[#4a72a8] bg-blue-50' : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <span className="text-2xl">{sw.icon}</span>
              <span className="font-bold text-sm text-gray-800">{sw.name}</span>
              <span className="ml-auto text-gray-400 text-sm">{openSw === idx ? '▲' : '▼'}</span>
            </button>
            {openSw === idx && (
              <div className={`border-2 border-t-0 border-[#4a72a8] rounded-b-xl px-4 py-3 ${sw.color}`}>
                <p className="text-sm text-gray-700 mb-1">{sw.desc}</p>
                <p className="text-xs text-gray-500">예시: {sw.example}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <ChoiceQuiz
        color={COLOR}
        question="보호해야 할 정보와 공유해야 할 정보를 순서대로 바르게 연결한 것은?"
        choices={[
          { label: '날씨 데이터 / 재난 정보', correct: false, explanation: '두 가지 모두 공유해야 할 정보예요.' },
          { label: '군사 기밀 / 진로 진학 정보', correct: true, explanation: '군사 기밀은 보호, 진로 진학 정보는 공유해야 할 정보입니다!' },
          { label: '개인 의료 기록 / 기업 첨단 기술', correct: false, explanation: '두 가지 모두 보호해야 할 정보예요.' },
          { label: '공공 데이터 / 날씨 데이터', correct: false, explanation: '두 가지 모두 공유해야 할 정보예요.' },
        ]}
      />
      <ChoiceQuiz
        color={COLOR}
        question="소프트웨어 저작권의 종류 중 '소스 코드를 공개해 사용자가 수정·재배포할 수 있는' 것은?"
        choices={[
          { label: '상용 소프트웨어', correct: false, explanation: '상용 소프트웨어는 비용을 지불해야 사용할 수 있어요.' },
          { label: '쉐어웨어', correct: false, explanation: '쉐어웨어는 일정 기간 무료 사용 후 구매가 필요한 소프트웨어예요.' },
          { label: '프리웨어', correct: false, explanation: '프리웨어는 무료로 사용할 수 있지만 소스 코드를 공개하지 않아도 됩니다.' },
          { label: '오픈 소스 소프트웨어', correct: true, explanation: '맞아요! 오픈 소스는 소스 코드를 공개해 누구나 수정·재배포할 수 있어요. Linux, Firefox가 대표적이에요.' },
        ]}
      />

      <div className="rounded-xl p-4 mt-8 text-sm not-prose" style={{ backgroundColor: COLOR + '15' }}>
        <p className="font-bold mb-2" style={{ color: COLOR }}>이번 레슨에서 배운 것</p>
        <ul className="space-y-1.5 text-gray-700">
          <li>✅ 보호할 정보: 군사기밀, 개인정보, 기업 기술, 의료 기록</li>
          <li>✅ 공유할 정보: 날씨, 재난, 진로, 공공 데이터</li>
          <li>✅ 초상권 = 모든 사람의 기본권, 공개 장소에서도 동의 필요</li>
          <li>✅ CCL = 저작물 이용 허락 조건을 표시하는 체계</li>
          <li>✅ 소프트웨어 종류: 상용 → 쉐어웨어 → 프리웨어 → 오픈소스</li>
        </ul>
      </div>
    </article>
  )
}
