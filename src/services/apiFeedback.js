import supabase from './supabase';

export async function createFeedback(feedback) {
  const { error } = await supabase.from('feedback').insert([{ feedback }]);

  if (error) throw new Error(error.message);
}
