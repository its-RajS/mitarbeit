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


export async function actionSignUpUser({
  email,
  password,
}: z.infer<typeof FormSchema>) {
  const supabase = await createSupabaseServerClient()

  const { data: existingUser } = await supabase
    .from('profiles')
    .select('id')
    .eq('email', email)
    .single()

  if (existingUser) {
    throw new Error('User already exists')
  }

  const response = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/callback`,
    },
  })

  return response
}