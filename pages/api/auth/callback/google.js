// The client you created from the Server-Side Auth instructions
import createClient from '@/lib/supabase/api'

export default async function handler(req, res) {
  const code = req.query.code
  const next = req.query.next ?? "/dashboard"
  if (code) {
    const supabase = createClient(req, res)
    await supabase.auth.exchangeCodeForSession(code)
  }
  res.redirect(303, `/${next.slice(1)}`)
}