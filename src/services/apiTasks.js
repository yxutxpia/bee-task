import supabase from './supabase';

export async function getTasks() {
  const { data, error } = await supabase.from('tasks').select('*');

  if (error) throw new Error(error.message);

  return data;
}

export async function getTask(taskId) {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('task_id', taskId);

  if (error) throw new Error(error.message);

  return data;
}

export async function createTask(newTask) {
  const { error } = await supabase.from('tasks').insert([newTask]);

  if (error) throw new Error(error.message);

  return;
}

export async function updateTask(updatedTask) {
  const origTaskObj = { ...updatedTask };
  delete updatedTask.points;

  const { data, error } = await supabase
    .from('tasks')
    .update({ ...updatedTask })
    .eq('task_id', updatedTask?.task_id)
    .single();

  if (error) throw new Error(error.message);
  if (!origTaskObj.points) return;

  const { data: public_profiles, error: publicError } = await supabase
    .from('public_profiles')
    .update({ points: origTaskObj?.points })
    .eq('user_id', origTaskObj?.user_id)
    .select();

  if (publicError) throw new Error(publicError.message);

  const { data: profiles, error: profilesError } = await supabase
    .from('profiles')
    .update({ points: origTaskObj?.points })
    .eq('user_id', origTaskObj?.user_id)
    .select();

  if (profilesError) throw new Error(profilesError.message);

  return data;
}

export async function deleteTask(taskId) {
  const { error } = await supabase.from('tasks').delete().eq('task_id', taskId);

  if (error) throw new Error(error.message);

  return;
}
