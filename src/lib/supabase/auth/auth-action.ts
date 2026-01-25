'use server'

import { z } from 'zod'
import { FormSchema } from '../../types'
import { createSupabaseServerClient } from '@/lib/supabase/auth/server'

export async function actionLoginUser({
  email,
  password,
}: z.infer<typeof FormSchema>) {
  const supabase = await createSupabaseServerClient()

  const response = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  return response
}
