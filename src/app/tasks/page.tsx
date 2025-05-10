import { redirect } from 'next/navigation';
import { createServerActionClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { getHydrationHelpers } from '~/trpc/server';
import TasksClient from './TaskClient';

export default async function TasksPage() {
  const supabase = createServerActionClient({ cookies: () => cookies() });

  console.log(typeof cookies);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/login');
  }

  const { HydrateClient, trpc } = await getHydrationHelpers();
  const tasks = await trpc.task.getAll();

  return (
    <HydrateClient>
      <TasksClient initialTasks={tasks} />
    </HydrateClient>
  );
}