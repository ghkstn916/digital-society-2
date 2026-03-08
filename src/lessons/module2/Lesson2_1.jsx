import { useState } from 'react'
import ChoiceQuiz from '../../components/interactive/ChoiceQuiz'
import FlipReveal from '../../components/interactive/FlipReveal'

const COLOR = '#4a72a8'

const personalInfoCategories = [
  {
    name: '신체 정보',
    icon: '🧬',
    examples: ['지문', '얼굴 사진', '홍채', 'DNA', '신장·체중'],
    desc: '신체를 통해 개인을 식별할 수 있는 정보',
  },
  {
    name: '정신 정보',
    icon: '🧠',
    examples: ['심리 검사 결과', '진단 기록', '상담 이력'],
    desc: '정신·심리 상태에 관한 정보',
  },
  {
    name: '신분 정보',
    icon: '🪪',
    examples: ['이름', '주민등록번호', '여권 번호', '운전면허 번호'],
    desc: '신분을 증명하는 법적 정보',
  },
  {
    name: '사회 정보',
    icon: '👥',
    examples: ['학교', '직장', '전화번호', '이메일', 'SNS 계정'],
    desc: '사회생활과 관련된 정보',
  },
  {
    name: '재산 정보',
    icon: '💳',
    examples: ['계좌번호', '카드번호', '신용등급', '재산 규모'],
    desc: '금융·재산과 관련된 정보',
  },
]

export default function Lesson2_1() {
  const [openCat, setOpenCat] = useState(null)

  return (
    <article className="prose">
      <h1 className="text-2xl font-black mb-1" style={{ color: COLOR }}>정보 보호와 공유의 개념</h1>
      <p className="text-sm text-gray-400 mb-8">Module 2 · Lesson 1 · 15분</p>

      <div className="rounded-xl p-4 mb-6 text-sm not-prose" style={{ backgroundColor: COLOR + '15' }}>
        <p className="font-bold mb-2" style={{ color: COLOR }}>이 레슨에서 배우는 것</p>
        <ul className="space-y-1 text-gray-700">
          <li>정보 보호와 정보 공유의 개념을 정의할 수 있다.</li>
          <li>개인 정보의 종류(신체·정신·신분·사회·재산)를 이해한다.</li>
          <li>같은 비밀번호 사용의 위험성을 설명할 수 있다.</li>
        </ul>
      </div>

      <FlipReveal
        color={COLOR}
        prompt="모든 포털 사이트에서 똑같은 아이디와 비밀번호를 쓰면 어떤 일이 생길까?"
        reveal="A 사이트가 해킹되어 아이디·비밀번호가 유출되면, 같은 정보를 쓰는 B·C 사이트도 모두 뚫릴 수 있어요. 이를 크리덴셜 스터핑(Credential Stuffing) 공격이라고 해요. 사이트마다 다른 비밀번호를 써야 하는 이유입니다."
      />

      {/* 디지털 사회와 정보 */}
      <h2>디지털 사회에서 정보 관리가 중요한 이유</h2>
      <p>
        디지털 사회에서는 디지털 기기와 인터넷을 활용해 정보를 얻고 처리하며 공유해요.
        이를 통해 가치 있는 정보를 생산하고 활용할 수 있지만,
        민감하고 중요한 정보가 수집·저장·전송되면서
        <strong>개인 정보 유출</strong>, <strong>저작권 침해</strong> 등의 문제도 생겨났어요.
      </p>
      <p>
        따라서 개인의 안전과 국가 안보를 위해
        <strong>보호해야 하는 정보</strong>와 <strong>공유해야 하는 정보</strong>를
        구분해 활용하는 것이 중요한 과제가 됐습니다.
      </p>

      {/* 정의 카드 */}
      <div className="not-prose grid grid-cols-2 gap-3 my-5">
        <div className="rounded-xl border-2 p-4" style={{ borderColor: COLOR, backgroundColor: COLOR + '08' }}>
          <div className="text-2xl mb-2">🔒</div>
          <p className="font-bold mb-1" style={{ color: COLOR }}>정보 보호</p>
          <p className="text-sm text-gray-700 leading-relaxed">
            컴퓨터나 네트워크상의 여러 가지 외부 위협으로부터
            정보를 보호하는 것
          </p>
          <div className="mt-2 pt-2 border-t border-gray-200 text-xs text-gray-500">
            <p className="font-medium mb-1">순기능</p>
            <p>개인·기업·국가 안전 보장, 사이버 범죄 예방</p>
          </div>
        </div>
        <div className="rounded-xl border-2 p-4 border-green-300 bg-green-50">
          <div className="text-2xl mb-2">📤</div>
          <p className="font-bold text-green-700 mb-1">정보 공유</p>
          <p className="text-sm text-gray-700 leading-relaxed">
            자신이 알고 있는 정보를 다른 사람에게
            알리거나 나누는 것
          </p>
          <div className="mt-2 pt-2 border-t border-green-200 text-xs text-gray-600">
            <p className="font-medium mb-1">순기능</p>
            <p>지식 확산, 협력 강화, 문제 해결 효율성 증대, 혁신 촉진</p>
          </div>
        </div>
      </div>

      {/* 개인 정보 */}
      <h2>개인 정보란?</h2>
      <p>
        <strong>개인 정보</strong>는 살아 있는 개인에 관한 정보로,
        해당 정보만으로는 특정 개인을 알아볼 수 없더라도
        다른 정보와 쉽게 결합해 알아볼 수 있는 정보를 모두 포함해요.
      </p>
      <div className="not-prose bg-amber-50 border border-amber-200 rounded-xl p-3 mb-4 text-sm text-amber-900">
        💡 예시: 이름 혼자는 누군지 모르지만, "이름 + 학교 + 생년월일"을 합치면 특정 개인을 알아볼 수 있어요. 이때 이름·학교·생년월일 모두 개인 정보입니다.
      </div>

      <p className="text-sm text-gray-500 not-prose mb-3">개인 정보는 크게 5가지로 분류돼요. 각 항목을 클릭해보세요.</p>
      <div className="not-prose flex flex-col gap-2 mb-6">
        {personalInfoCategories.map((cat, idx) => (
          <div key={cat.name}>
            <button
              onClick={() => setOpenCat(openCat === idx ? null : idx)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left transition-all ${
                openCat === idx ? 'bg-blue-50' : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
              style={openCat === idx ? { borderColor: COLOR } : {}}
            >
              <span className="text-xl">{cat.icon}</span>
              <div className="flex-1">
                <span className="font-bold text-sm text-gray-800">{cat.name}</span>
                <span className="text-xs text-gray-500 ml-2">{cat.desc}</span>
              </div>
              <span className="text-gray-400 text-sm">{openCat === idx ? '▲' : '▼'}</span>
            </button>
            {openCat === idx && (
              <div className="border-2 border-t-0 rounded-b-xl bg-white px-4 py-3 flex flex-wrap gap-2"
                style={{ borderColor: COLOR }}>
                {cat.examples.map(ex => (
                  <span key={ex} className="px-2.5 py-1 rounded-full text-xs font-medium border"
                    style={{ borderColor: COLOR, color: COLOR, backgroundColor: COLOR + '10' }}>
                    {ex}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 왜 보호해야 하나 */}
      <h2>개인 정보를 보호해야 하는 이유</h2>
      <p>
        개인 정보는 본인 인증, 고객 관리, 금융 거래 등에 활용되는 필수 요소예요.
        유출되면 개인에게 심각한 <strong>정신적·경제적 피해</strong>를 줄 수 있기 때문에
        보호하는 것이 매우 중요합니다.
      </p>
      <div className="not-prose bg-red-50 border border-red-200 rounded-xl p-4 mb-4 text-sm">
        <p className="font-bold text-red-700 mb-2">개인 정보 유출 시 발생하는 피해</p>
        <ul className="text-red-900 space-y-1">
          <li>💸 금융 사기·불법 대출 (재산 피해)</li>
          <li>😰 스팸 전화·문자 폭탄 (생활 침해)</li>
          <li>🎭 명의 도용 (신분 침해)</li>
          <li>😔 사생활 노출 (정신적 피해)</li>
        </ul>
      </div>

      {/* 한번 공유된 정보 */}
      <div className="not-prose bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4 text-sm text-amber-900">
        ⚠️ <strong>중요!</strong> 한번 공유된 정보는 공유되기 전 상태로 돌이키기 어렵습니다.
        정보를 공유할 때는 반드시 적절한 보호 조치가 필요해요.
      </div>

      <ChoiceQuiz
        color={COLOR}
        question="개인 정보에 해당하지 않는 것은?"
        choices={[
          { label: '주민등록번호', correct: false, explanation: '주민등록번호는 가장 대표적인 신분 정보입니다.' },
          { label: '오늘 전국 날씨 예보', correct: true, explanation: '날씨 예보는 특정 개인을 식별할 수 없는 공공 정보예요!' },
          { label: '지문 정보', correct: false, explanation: '지문은 신체 정보에 해당하는 개인 정보입니다.' },
          { label: '카드번호와 계좌번호', correct: false, explanation: '금융 정보는 재산 정보에 해당하는 중요한 개인 정보예요.' },
        ]}
      />
      <ChoiceQuiz
        color={COLOR}
        question="정보 보호와 정보 공유에 대한 설명으로 옳지 않은 것은?"
        choices={[
          { label: '정보 보호는 사이버 범죄를 예방하는 기능이 있다', correct: false, explanation: '맞아요. 정보 보호의 중요한 순기능 중 하나입니다.' },
          { label: '정보 공유는 지식 확산과 혁신을 촉진하는 효과가 있다', correct: false, explanation: '맞아요. 정보 공유의 순기능입니다.' },
          { label: '한번 공유된 정보는 쉽게 되돌릴 수 있다', correct: true, explanation: '틀렸어요! 한번 공유된 정보는 되돌리기 매우 어렵기 때문에 공유 전에 신중해야 합니다.' },
          { label: '개인 정보 유출은 정신적·경제적 피해를 줄 수 있다', correct: false, explanation: '맞아요. 개인 정보 유출의 심각성을 잘 설명한 내용이에요.' },
        ]}
      />

      <div className="rounded-xl p-4 mt-8 text-sm not-prose" style={{ backgroundColor: COLOR + '15' }}>
        <p className="font-bold mb-2" style={{ color: COLOR }}>이번 레슨에서 배운 것</p>
        <ul className="space-y-1.5 text-gray-700">
          <li>✅ 정보 보호 = 외부 위협으로부터 정보를 지키는 것</li>
          <li>✅ 정보 공유 = 정보를 나눠 협력·혁신을 이끄는 것</li>
          <li>✅ 개인 정보 5종류: 신체·정신·신분·사회·재산 정보</li>
          <li>✅ 공유된 정보는 되돌리기 어려워 공유 전 신중해야 함</li>
        </ul>
      </div>
    </article>
  )
}
