/**
 * 레슨별 퀴즈 정답 키 매핑
 * - quizzes: ChoiceQuiz 정답 인덱스 (0부터)
 * - formativeKey / formativeAnswers: 형성평가 정답 배열
 */
export const lessonQuizInfo = {
  'module1/lesson1': {
    quizzes: [
      { key: 'dc-m1l1-quiz-0', correctIndex: 2 },
      { key: 'dc-m1l1-quiz-1', correctIndex: 1 },
      { key: 'dc-m1l1-quiz-2', correctIndex: 1 },
    ],
  },
  'module1/lesson2': {
    quizzes: [
      { key: 'dc-m1l2-quiz-0', correctIndex: 1 },
      { key: 'dc-m1l2-quiz-1', correctIndex: 2 },
    ],
  },
  'module1/lesson3': {
    quizzes: [
      { key: 'dc-m1l3-quiz-0', correctIndex: 2 },
      { key: 'dc-m1l3-quiz-1', correctIndex: 1 },
    ],
  },
  'module1/quiz': {
    quizzes: [],
    formativeKey: 'dc-quiz1-form',
    formativeAnswers: [1, 3, 2, 2, 1],
  },
  'module2/lesson1': {
    quizzes: [
      { key: 'dc-m2l1-quiz-0', correctIndex: 1 },
      { key: 'dc-m2l1-quiz-1', correctIndex: 2 },
    ],
  },
  'module2/lesson2': {
    quizzes: [
      { key: 'dc-m2l2-quiz-0', correctIndex: 1 },
      { key: 'dc-m2l2-quiz-1', correctIndex: 3 },
    ],
  },
  'module2/lesson3': {
    quizzes: [
      { key: 'dc-m2l3-quiz-0', correctIndex: 1 },
    ],
  },
  'module2/quiz': {
    quizzes: [],
    formativeKey: 'dc-quiz2-form',
    formativeAnswers: [1, 2, 2, 2, 2],
  },
  'module3/lesson1': {
    quizzes: [
      { key: 'dc-m3l1-quiz-0', correctIndex: 2 },
      { key: 'dc-m3l1-quiz-1', correctIndex: 2 },
    ],
  },
  'module3/lesson2': {
    quizzes: [
      { key: 'dc-m3l2-quiz-0', correctIndex: 2 },
      { key: 'dc-m3l2-quiz-1', correctIndex: 0 },
    ],
  },
  'module3/lesson3': {
    quizzes: [
      { key: 'dc-m3l3-quiz-0', correctIndex: 2 },
      { key: 'dc-m3l3-quiz-1', correctIndex: 1 },
    ],
  },
  'module3/quiz': {
    quizzes: [],
    formativeKey: 'dc-quiz3-form',
    formativeAnswers: [0, 2, 2, 2, 2],
  },
}

/** localStorage에서 해당 레슨의 퀴즈 결과를 수집해 제출 객체를 만든다 */
export function collectSubmission(moduleId, lessonId, studentName, lessonInfo) {
  const mapKey = `${moduleId}/${lessonId}`
  const info = lessonQuizInfo[mapKey] || {}

  const quizScores = (info.quizzes || []).map(q => {
    const selected = (() => {
      try { return JSON.parse(localStorage.getItem(q.key)) } catch { return null }
    })()
    return {
      key: q.key,
      selected,
      correctIndex: q.correctIndex,
      isCorrect: selected !== null && selected === q.correctIndex,
    }
  })

  let formativeData = null
  if (info.formativeKey) {
    try {
      const answers = JSON.parse(localStorage.getItem(info.formativeKey))
      const submitted = JSON.parse(localStorage.getItem(info.formativeKey + '-s'))
      if (answers && submitted) {
        const score = info.formativeAnswers.filter((ans, i) => answers[i] === ans).length
        formativeData = { score, total: info.formativeAnswers.length, answers }
      }
    } catch {}
  }

  return {
    id: Date.now(),
    studentName,
    moduleId,
    lessonId,
    moduleTitle: lessonInfo?.module?.title || '',
    lessonTitle: lessonInfo?.lesson?.title || '',
    completedAt: new Date().toISOString(),
    quizScores,
    formativeData,
  }
}

const SUBMISSIONS_KEY = 'dc-submissions'

export function loadSubmissions() {
  try {
    return JSON.parse(localStorage.getItem(SUBMISSIONS_KEY)) || []
  } catch { return [] }
}

export function saveSubmission(submission) {
  const list = loadSubmissions()
  list.push(submission)
  try { localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(list)) } catch {}
}

export function clearSubmissions() {
  localStorage.removeItem(SUBMISSIONS_KEY)
}

export function deleteSubmission(id) {
  const list = loadSubmissions().filter(s => s.id !== id)
  try { localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(list)) } catch {}
}
