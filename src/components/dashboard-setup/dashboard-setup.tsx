"use client"
import {AuthUser} from '@supabase/supabase-js'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Subscription, Workspace } from '@/lib/supabase/supabase.types'
import EmojiPicker from '../global/emoji-picker'
import { useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { DashboardSetupFormSchema } from '@/lib/types'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { v4 } from 'uuid'
import { toast } from 'sonner'
import { Button } from '../ui/button'
import { Loader } from 'lucide-react'
import { supabase } from '@/lib/supabase/auth/client'
import { createWorkspace } from '@/lib/supabase/queries'

interface DashboardSetupProps {
  user: AuthUser, 
  subscription: Subscription | null,
}

const DashboardSetup = ({ user, subscription }: DashboardSetupProps) => {
    const router = useRouter();
    // const { dispatch } = useAppState();



    const [selectedEmoji, setSelectedEmoji] = useState<string>('💼')
    const {register, handleSubmit, reset, formState:{isSubmitting: isLoading, errors: formErrors}} = useForm<z.infer<typeof DashboardSetupFormSchema>>({
        mode: 'onChange',
        resolver: zodResolver(DashboardSetupFormSchema),
        defaultValues: {
            logo: '',
            workspaceName: '',
        }
    }) 

    const onSubmit: SubmitHandler<
    z.infer<typeof DashboardSetupFormSchema>
  > = async (value) => {
    const file = value.logo?.[0];
    let logoUrl: string | null = null;
    const workspaceUUID = v4();

    if (file) {
      try {
        const fileExtension = file.name.split('.').pop();
        const fileName = `workspaceLogo-${workspaceUUID}${fileExtension ? `.${fileExtension}` : ''}`;
        const filePath = `workspaces/${fileName}`;
        const { error } = await supabase.storage
          .from('workspace-logos')
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: true,
          });
        if (error) throw error;
        const { data: publicUrlData } = supabase.storage
          .from('workspace-logos')
          .getPublicUrl(filePath);
        logoUrl = publicUrlData.publicUrl;
      } catch (error) {
        console.log('Error', error);
        toast.error('Error! Could not upload your workspace logo');
        return;
      }
    }
    try {
      const newWorkspace: Workspace = {
        data: null,
        createdAt: new Date().toISOString(),
        iconId: selectedEmoji,
        id: workspaceUUID,
        inTrash: '',
        title: value.workspaceName,
        workspaceOwner: user.id,
        logo: logoUrl,
        bannerUrl: '',
      };
      const { data, error: createError } = await createWorkspace(newWorkspace);
      if (createError || !data) {
        throw new Error(createError ?? 'Could not create workspace');
      }
    //   dispatch({
    //     type: 'ADD_WORKSPACE',
    //     payload: { ...newWorkspace, folders: [] },
    //   });

      toast.success('Workspace Created', {
        description: `${newWorkspace.title} has been created successfully.`,
      });

      router.replace(`/dashboard/${newWorkspace.id}`);
    } catch (error) {
      console.log(error, 'Error');
      toast.error('Could not create your workspace', {
        description:
          "Oops! Something went wrong, and we couldn't create your workspace. Try again or come back later.",
      });
    } finally {
      reset();
    }
  };

  return (
    <Card className='w-[800px] h-screen sm:h-auto ' >
        <CardHeader>
            <CardTitle>
                Create a workspace
            </CardTitle>
            <CardDescription>
                Lets creates a workspace to get you started. You can later add the collaborators later from the workspace settings tab.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                        <div className="text-5xl">
                            <EmojiPicker getValue={(emoji)=>setSelectedEmoji(emoji)} >
                                {selectedEmoji}
                            </EmojiPicker>
                        </div>
                        <div className="w-full gap-y-2 flex flex-col">
                            <Label htmlFor="workspaceName" className='text-sm text-muted-foreground'>Name</Label>
                            <Input
                                id='workspaceName'
                                placeholder='Workspace Name'
                                type='text'
                                disabled={isLoading}
                                {...register('workspaceName', { required: 'Workspace name is required' })}
                            />
                            <small className='text-red-500'>
                                {formErrors.workspaceName?.message?.toString()}
                            </small>
                        </div>
                    </div>
                    <div className="w-full gap-y-2 flex flex-col">
                            <Label htmlFor="logo" className='text-sm text-muted-foreground'>Logo</Label>
                            <Input
                                id='logo'
                                placeholder='Workspace Logo'
                                type='file'
                                accept='image/*'
                                disabled={isLoading || subscription?.status !== 'active'}
                                {...register('logo', { required: 'Workspace logo is required' })}
                            />
                            <small className='text-red-500'>
                                {formErrors.logo?.message?.toString()}
                            </small>
                            {subscription?.status !== 'active' && <small className='text-muted-foreground block'>To customize your workspace, you need to be on a Pro Plan</small>}
                     </div>
                    <div className="self-end">
                        <Button
                            disabled={isLoading}
                            type="submit"
                        >
                            {!isLoading ? 'Create Workspace' : <Loader />}
                        </Button>
                    </div>
                </div>
            </form>
        </CardContent>
    </Card>
  )
}

export default DashboardSetup 