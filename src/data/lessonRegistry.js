export const modules = [
  {
    id: 'module1',
    title: '디지털 사회와 진로',
    description: '디지털 기술이 사회와 직업에 미치는 영향을 분석하고, 나의 진로를 설계한다.',
    color: '#4f7c5a',
    lessons: [
      {
        id: 'lesson1',
        title: '디지털 사회란 무엇인가?',
        duration: '15분',
        description: '디지털 기술의 개념과 디지털 사회의 특성을 이해한다.',
      },
      {
        id: 'lesson2',
        title: '디지털 기술의 두 얼굴',
        duration: '15분',
        description: '디지털 기술의 긍정적·부정적 영향을 사례로 살펴본다.',
      },
      {
        id: 'lesson3',
        title: '직업의 미래와 나의 진로',
        duration: '15분',
        description: '디지털 사회에서 직업 변화를 분석하고 진로를 설계한다.',
      },
      {
        id: 'quiz',
        title: '형성평가',
        duration: '10분',
        description: '1차시 핵심 내용을 문제로 점검한다.',
        isQuiz: true,
      },
    ],
  },
  {
    id: 'module2',
    title: '정보 보호와 정보 공유',
    description: '보호해야 할 정보와 공유해야 할 정보를 구분하고, 올바른 보호 방법을 실천한다.',
    color: '#4a72a8',
    lessons: [
      {
        id: 'lesson1',
        title: '정보 보호와 공유의 개념',
        duration: '15분',
        description: '정보 보호와 정보 공유가 무엇인지, 왜 중요한지 이해한다.',
      },
      {
        id: 'lesson2',
        title: '보호할 정보 vs 공유할 정보',
        duration: '15분',
        description: '어떤 정보를 보호하고 어떤 정보를 공유해야 하는지 판단한다.',
      },
      {
        id: 'lesson3',
        title: '올바른 정보 보호 방법 실천',
        duration: '15분',
        description: '스팸·피싱·해킹을 이해하고 정보 보호 방법을 실천한다.',
      },
      {
        id: 'quiz',
        title: '형성평가',
        duration: '10분',
        description: '2차시 핵심 내용을 문제로 점검한다.',
        isQuiz: true,
      },
    ],
  },
  {
    id: 'module3',
    title: '정보 보안',
    description: '정보 보안의 3대 요소를 이해하고, 디지털 윤리를 실천하는 능력을 기른다.',
    color: '#8a5ca8',
    lessons: [
      {
        id: 'lesson1',
        title: '정보 보안의 3대 요소',
        duration: '15분',
        description: '기밀성·무결성·가용성의 개념을 이해하고 구분한다.',
      },
      {
        id: 'lesson2',
        title: '정보 보안 위협과 대응',
        duration: '15분',
        description: '피싱 사례를 분석하고 실제 보안 방법을 적용한다.',
      },
      {
        id: 'lesson3',
        title: '디지털 윤리 실천',
        duration: '15분',
        description: '디지털 사회의 윤리 문제를 인식하고 규칙을 만든다.',
      },
      {
        id: 'quiz',
        title: '형성평가',
        duration: '10분',
        description: '3차시 핵심 내용을 문제로 점검한다.',
        isQuiz: true,
      },
    ],
  },
]

export function getLesson(moduleId, lessonId) {
  const mod = modules.find(m => m.id === moduleId)
  if (!mod) return null
  const lesson = mod.lessons.find(l => l.id === lessonId)
  if (!lesson) return null
  return { module: mod, lesson }
}

export function getAdjacentLessons(moduleId, lessonId) {
  const allLessons = []
  modules.forEach(mod => {
    mod.lessons.forEach(lesson => {
      allLessons.push({ moduleId: mod.id, lessonId: lesson.id })
    })
  })
  const idx = allLessons.findIndex(l => l.moduleId === moduleId && l.lessonId === lessonId)
  return {
    prev: idx > 0 ? allLessons[idx - 1] : null,
    next: idx < allLessons.length - 1 ? allLessons[idx + 1] : null,
  }
}
