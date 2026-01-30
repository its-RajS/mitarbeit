'use server'
import db from "./db"
import { Subscription, Workspace } from "./supabase.types"
import { eq } from "drizzle-orm"
import { validate } from "uuid"
import { files, workspaces } from "./migration/schema"

export const getUserSubscription = async (userId: string | undefined) => {
    if(!userId) return {data: null, error: 'User not found'}

    try {
        const subscription = await db.query.subscriptions.findFirst({
            where: (sub, {eq}) => eq(sub.userId, userId)
        })

        if(subscription) return {data: subscription as Subscription, error: null}
        return {data: null, error: null}
        
    } catch (error) {
        console.log(error)
        return { data : null, error : `Error ${error}`}
    }
}

export const getUserWorkspace = async (userId: string | undefined) => {
    if(!userId) return {data: null, error: 'User not found'}

    try {
        const workspace = await db.query.workspaces.findFirst({
            where: (ws, {eq}) => eq(ws.workspaceOwner, userId)
        })

        if(workspace) return {data: workspace as Workspace, error: null}
        return {data: null, error: null}
        
    } catch (error) {
        console.log(error)
        return { data : null, error : `Error ${error}`}
    }
}

export const createWorkspace = async (workspace: Workspace) => {
    try {
      const response = await db.insert(workspaces).values(workspace);
      return { data: null, error: null };
    } catch (error) {
      console.log(error);
      return { data: null, error: 'Error' };
    }
  };
  
  export const deleteWorkspace = async (workspaceId: string) => {
    if (!workspaceId) return;
    await db.delete(workspaces).where(eq(workspaces.id, workspaceId));
};

export const getFiles = async (folderId: string) => {
    const isValid = validate(folderId);
    if (!isValid) return { data: null, error: 'Error' };
    try {
      const results = (await db
        .select()
        .from(files)
        .orderBy(files.createdAt)
        .where(eq(files.folderId, folderId))) as File[] | [];
      return { data: results, error: null };
    } catch (error) {
      console.log(error);
      return { data: null, error: 'Error' };
    }
  };