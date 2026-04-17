import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey, { db: { schema: 'lessons' } })

/** 레슨 완료 기록을 Supabase에 저장 (같은 학생+레슨이면 upsert) */
export async function submitProgress(submission) {
  const { error } = await supabase
    .from('progress')
    .upsert(
      {
        student_id: submission.studentName,
        student_name: submission.studentName,
        module_id: submission.moduleId,
        lesson_id: submission.lessonId,
        module_title: submission.moduleTitle,
        lesson_title: submission.lessonTitle,
        completed_at: submission.completedAt,
        quiz_scores: submission.quizScores,
        formative_data: submission.formativeData,
      },
      { onConflict: 'student_id,module_id,lesson_id' }
    )
  if (error) console.error('Supabase submitProgress error:', error)
}

/** 전체 학생 완료 기록 조회 */
export async function fetchAllProgress() {
  const { data, error } = await supabase
    .from('progress')
    .select('*')
    .order('completed_at', { ascending: false })
  if (error) {
    console.error('Supabase fetchAllProgress error:', error)
    return []
  }
  return data || []
}
