"use client"

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Form , FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { actionSignUpUser } from '@/lib/supabase/auth/auth-action'
import { FormSchema, SignUpFormSchema } from '@/lib/types'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { Loader, MailCheck } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'

const SignUpPage = () => {
  const route = useRouter()
  const searchParams = useSearchParams()
  const [submitError, setSubmitError] = useState<string | null>('')
  const [confirmation, setConfirmation] = useState<boolean>(false)

  const codeExchangeError = useMemo(() => {
    if(!searchParams) return ''
    return searchParams.get('error_description')
  }, [searchParams])

  const confirmationAndErrorStyle = useMemo(() => {
      return clsx('bg-primary-blue-500', {
        'bg-red-500/10': codeExchangeError,
        'border-red-500/50': codeExchangeError,
        'text-red-500': codeExchangeError,
      })
  }, [codeExchangeError])

  const form = useForm<z.infer<typeof SignUpFormSchema>>({
    mode: 'onChange',
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    }
  })

  const isLoading = form.formState.isSubmitting

  const onSubmit = async ({ email, password }: z.infer<typeof FormSchema>) => {
      const response = await actionSignUpUser({ email, password });
      if (response.error) {
        setSubmitError(response.error.message);
        form.reset();
        return;
      }
      setConfirmation(true);
  };

  const signUpHandler = () => {}
    
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} onChange={() => { if (submitError) setSubmitError('') }} className='flex flex-col gap-y-4 w-full sm:justify-center sm:w-[400px]' >
                <Link href={'/'} className='w-full flex justify-center items-center' >
                    <Image src='/tempLogo.svg' alt='Mitarbeit Logo' width={50} height={50} />
                    <span className='font-semibold dark:text-white text-4xl first-letter:ml-2' >Mitarbeit</span>
                </Link>
                <FormDescription className='text-foreground/60' >
                    An all-in-one Collaboration and Productivity Platform
                </FormDescription>
                {!confirmation && !codeExchangeError && (
                  <>
                  <FormField name='email' render={({field}) => (
                    <FormItem>
                        <FormControl>
                            <Input type='email' placeholder='Email' {...field} disabled={isLoading} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                  )} />

                  <FormField name='password' render={({field}) => (
                    <FormItem>
                        <FormControl>
                            <Input type='password' placeholder='Password' {...field} disabled={isLoading} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                  )} />
                  <FormField name='confirmPassword' render={({field}) => (
                    <FormItem>
                        <FormControl>
                            <Input type='password' placeholder='Confirm Password' {...field} disabled={isLoading} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                  )} />
                   <Button className='w-full p-6' type='submit' disabled={isLoading} >
                    {isLoading ? <Loader className='animation-spin-2' /> : 'Create Account'}
                   </Button>
                  </>
                )}
                {submitError && <FormMessage className='text-red-500' >{submitError}</FormMessage>} 
                <span className='text-center' >
                    Already have an account?
                    <Link href='/login' className=' text-brand-primary-blue hover:text-brand-primary-blue/80 ml-1' >
                        Login
                    </Link>
                </span>
                {
                  (confirmation || codeExchangeError) && (
                    <>
                      <Alert className={confirmationAndErrorStyle} >
                        {!codeExchangeError && <MailCheck className='w-4 h-4' />}
                        <AlertTitle>
                          {codeExchangeError ? 'Inavlid Link' : 'Check your email.'}
                        </AlertTitle>
                        <AlertDescription>
                          {codeExchangeError ? 'The link you used is invalid or has expired.' : 'We sent you an email with a link to confirm your account.'}
                        </AlertDescription>
                      </Alert>
                    </>
                  )
                }
        </form >
    </Form>
  )
}

export default SignUpPage