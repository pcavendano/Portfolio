import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { validateAdmin, corsHeaders, jsonResponse, errorResponse } from '../_shared/auth.ts'

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders() })
  }

  if (!await validateAdmin(req)) {
    return errorResponse('Unauthorized', 401)
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    )

    const url = new URL(req.url)
    const status = url.searchParams.get('status')

    let query = supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false })

    if (status) {
      query = query.eq('status', status)
    }

    const { data, error } = await query

    if (error) return errorResponse('Failed to fetch bookings', 500)

    return jsonResponse(data)
  } catch (err) {
    console.error('Unexpected error:', err)
    return errorResponse('Internal server error', 500)
  }
})
