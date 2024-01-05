import supabase from './supabase';

export async function getProjects() {
  const { data, error } = await supabase.from('projects').select('*');

  if (error) throw new Error(error.message);

  return data;
}

export async function getProject(projectId) {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('project_id', projectId);

  if (error) throw new Error(error.message);

  return data;
}

export async function getProjectTasks(projectId) {
  const { data, error } = await supabase
    .from('project_tasks')
    .select('*')
    .eq('project_id', projectId);

  if (error) throw new Error(error.message);

  return data;
}

export async function createProject(newProject) {
  const { data, error } = await supabase
    .from('projects')
    .insert([newProject])
    .select();

  if (error) throw new Error(error.message);

  return data;
}

export async function updateProject({ newProject, projectId }) {
  const { data: userData, error: userError } = await supabase
    .from('profiles')
    .select('*');

  if (userError) throw new Error(error.message);

  const origNewProject = { ...newProject };
  delete newProject.points;

  const { error } = await supabase
    .from('projects')
    .update({ ...newProject })
    .eq('project_id', projectId);

  if (error) throw new Error(error.message);
  if (!origNewProject.points) return;

  const { error: publicError } = await supabase
    .from('public_profiles')
    .update({ points: origNewProject?.points })
    .eq('user_id', userData?.at(0)?.user_id);

  if (publicError) throw new Error(publicError);

  return;
}

export async function deleteProject(projectId) {
  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('project_id', projectId);

  if (error) throw new Error(error.message);
}

export async function createProjectTask({ projectId, newTask }) {
  const { data, error: getTaskError } = await supabase
    .from('projects')
    .select('tasks')
    .eq('project_id', projectId);

  if (getTaskError) throw new Error(getTaskError.message);

  const tasks = data?.at(0)?.tasks;

  const { data: createdTask, error: createError } = await supabase
    .from('projects')
    .update({ tasks: [...tasks, ...newTask] })
    .eq('project_id', projectId)
    .single();

  if (createError) throw new Error(createError.message);

  return createdTask;
}

export async function updateProjectTask({ projectId, id, complete, points }) {
  const { data: userData, error: userError } = await supabase
    .from('profiles')
    .select('*');

  if (userError) throw new Error(userError.message);

  const { data, error: getTaskError } = await supabase
    .from('projects')
    .select('tasks')
    .eq('project_id', projectId);

  if (getTaskError) throw new Error(getTaskError.message);

  let newTasks;

  if (data) {
    const tasks = data?.at(0)?.tasks;
    newTasks = tasks?.map(tasks =>
      tasks.id === id ? { ...tasks, complete } : tasks
    );
  } else newTasks = [{}];

  const { data: updatedTasks, error: updateError } = await supabase
    .from('projects')
    .update({ tasks: newTasks })
    .eq('project_id', projectId)
    .select();

  if (updateError) throw new Error(updateError.message);
  if (!points) return;

  const { error: publicError } = await supabase
    .from('public_profiles')
    .update({ points: points })
    .eq('user_id', userData?.at(0)?.user_id);

  if (publicError) throw new Error(publicError.message);

  return updatedTasks;
}

export async function deleteProjectTask({ projectId, taskId }) {
  const { data, error: getTaskError } = await supabase
    .from('projects')
    .select('tasks')
    .eq('project_id', projectId);

  if (getTaskError) throw new Error(getTaskError.message);

  const tasks = data?.at(0)?.tasks;
  const newTasks = tasks.filter(tasks => tasks.id !== taskId);

  const { data: updatedTasks, error: updateError } = await supabase
    .from('projects')
    .update({ tasks: newTasks })
    .eq('project_id', projectId)
    .select();

  if (updateError) throw new Error(updateError.message);

  return updatedTasks;
}
