'use client';

import { api } from '~/trpc/react';
import TaskManager from '../_components/TaskManager';
import type { inferRouterOutputs } from '@trpc/server';
import type { AppRouter } from '~/server/api/root';

type RouterOutputs = inferRouterOutputs<AppRouter>;
type Task = RouterOutputs['task']['getAll'][number];

type TaskClientProps = {
  initialTasks: Task[];
};

export default function TasksClient({ initialTasks }: TaskClientProps) {
  const { data: tasks, isLoading } = api.task.getAll.useQuery(undefined, {
    initialData:initialTasks,
  });

  if (isLoading) return <div>Loading tasks...</div>;

  return <TaskManager initialTasks={tasks ?? []} />;
}