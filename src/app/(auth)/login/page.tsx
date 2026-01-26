"use client"

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormSchema } from '@/lib/types'
import Link from 'next/link'
import Image from 'next/image'
import tempLogo from '../../../../public/tempLogo.svg'
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader } from 'lucide-react'
import { actionLoginUser } from '@/lib/supabase/auth/auth-action'

const LoginPage = () => {
    const route = useRouter()
    const [submitError, setSubmitError] = useState<string | null>('')

    const form = useForm<z.infer<typeof FormSchema>>({
        mode: 'onChange',
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: '',
            password: '',
        }
    })

    const isLoading = form.formState.isSubmitting

    const onSubmit: SubmitHandler<z.infer<typeof FormSchema>> = async (formData) => { 
        const { error } = await actionLoginUser(formData);
        if (error) {
            form.reset();
            setSubmitError(error.message);
            return
        }
        route.replace('/dashboard');
    }

    return (
        <Form
            {...form}
        >
            <form onSubmit={form.handleSubmit(onSubmit)} onChange={() => { if (submitError) setSubmitError('') }} className='flex flex-col gap-y-4 w-full sm:justify-center sm:w-[400px]' >
                <Link href={'/'} className='w-full flex justify-center items-center' >
                    <Image src={tempLogo} alt='Mitarbeit Logo' width={50} height={50} />
                    <span className='font-semibold dark:text-white text-4xl first-letter:ml-2' >Mitarbeit</span>
                </Link>
                <FormDescription className='text-foreground/60' >
                    An all-in-one Collaboration and Productivity Platform
                </FormDescription>
                <FormField name='email' render={({field}) => (
                    <FormItem>
                        <FormControl>
                            <Input type='email' placeholder='Email' {...field}  disabled={isLoading} />
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
                {submitError && <FormMessage className='text-red-500' >{submitError}</FormMessage>}
                <Button className='w-full p-6 bg-linear-to-t dark:from-brand-primary-purple/80 dark:to-brand-primary-blue/75 hover:bg-brand-primary-purple/75' disabled={isLoading} type='submit' size='lg' >
                    {isLoading ? <Loader className='animation-spin-2' /> : 'Login'}
                </Button>
                <span className='text-center' >
                    Don't have an account?
                    <Link href='/signup' className=' text-brand-primary-blue hover:text-brand-primary-blue/80 ml-1' >
                        Sign Up
                    </Link>
                </span>
            </form >
        </Form >
    )
}

export default LoginPage    