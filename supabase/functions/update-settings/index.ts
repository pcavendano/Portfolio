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

    const updates = await req.json()

    // Whitelist allowed fields
    const allowed = [
      'price_cents', 'currency', 'session_duration_min', 'description',
      'available_days', 'available_start_hour', 'available_end_hour',
      'timezone', 'booking_enabled',
    ]
    const sanitized: Record<string, unknown> = {}
    for (const key of allowed) {
      if (key in updates) sanitized[key] = updates[key]
    }

    if (Object.keys(sanitized).length === 0) {
      return errorResponse('No valid fields to update')
    }

    // Validate price if present
    if ('price_cents' in sanitized && (typeof sanitized.price_cents !== 'number' || sanitized.price_cents < 0)) {
      return errorResponse('price_cents must be a non-negative number')
    }

    const { data, error } = await supabase
      .from('consulting_settings')
      .update(sanitized)
      .eq('id', 1)
      .select()
      .single()

    if (error) return errorResponse('Failed to update settings', 500)

    return jsonResponse(data)
  } catch (err) {
    console.error('Unexpected error:', err)
    return errorResponse('Internal server error', 500)
  }
})
