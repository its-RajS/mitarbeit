import DashboardSetup from '@/components/dashboard-setup/dashboard-setup'
import { createSupabaseServerClient } from '@/lib/supabase/auth/server'
import db from '@/lib/supabase/db'
import { getUserSubscription, getUserWorkspace } from '@/lib/supabase/queries'
import { Subscription } from '@/lib/supabase/supabase.types'
import { redirect } from 'next/navigation'
import React from 'react'

const DashboardPage = async () => {

  const supabase = await createSupabaseServerClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  } 

  const { data: subscription, error: subscriptionError } = await getUserSubscription(user.id)

  if(subscriptionError) console.log(subscriptionError)

  const { data: workspace, error: workspaceError } = await getUserWorkspace(user.id)

  if(!workspace) return (
    <div className="bg-background flex justify-center items-center h-screen w-screen ">
      <DashboardSetup user={user} subscription={subscription as Subscription}></DashboardSetup>
    </div>
  ) 
 
  redirect(`/dashboard/${workspace.id}`)

}

export default DashboardPage