import supabase, { supabaseUrl } from './supabase';

export async function getProfile() {
  const { data, error } = await supabase.from('profiles').select('*');

  if (error) throw new Error(error.message);

  return data;
}

export async function getProfileById(userId) {
  const { data, error } = await supabase
    .from('public_profiles')
    .select('*')
    .eq('user_id', userId);

  if (error) throw new Error(error.message);

  return data;
}

export async function getProfiles() {
  const { data, error } = await supabase.from('public_profiles').select('*');

  if (error) throw new Error(error.message);

  return data;
}

export async function getPublicProfile(userId) {
  const { data, error } = await supabase
    .from('public_profiles')
    .select('*')
    .eq('user_id', userId);

  if (error) throw new Error(error.message);

  return data;
}

export async function updateProfile({ avatar, username, newUserId, userId }) {
  let updateData;
  let isSignedUp;

  if (newUserId.length < 4)
    throw new Error('아이디는 최소 4자 이상이어야 합니다');

  const isIdNotChanged = newUserId === userId;

  const { data: profilesData } = await supabase
    .from('public_profiles')
    .select('*');

  profilesData?.filter(
    profile => profile.user_id === newUserId && (isSignedUp = true)
  );

  if (isSignedUp && !isIdNotChanged)
    throw new Error('이미 등록된 아이디입니다');

  if (!avatar) updateData = { username, user_id: newUserId };
  else updateData = { avatar, username, user_id: newUserId };

  const { data: profiles, error: profilesError } = await supabase
    .from('profiles')
    .update(updateData)
    .eq('user_id', userId)
    .select();

  if (profilesError) throw new Error(profilesError.message);

  const { data: publicProfiles, error: publicProfilesError } = await supabase
    .from('public_profiles')
    .update(updateData)
    .eq('user_id', userId)
    .select();

  if (publicProfilesError) throw new Error(publicProfilesError.message);
  if (!avatar) return profiles;

  const fileName = `avatar-${profiles?.at(0)?.user_id}-${Math.floor(
    Math.random() * 100_000_000_000
  )}`;

  const { error: storageError } = await supabase.storage
    .from('avatars')
    .upload(fileName, avatar);

  if (storageError) throw new Error(storageError.message);

  const fileUrl = `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`;

  const { data: profiles2, error: profilesError2 } = await supabase
    .from('profiles')
    .update({ avatar: fileUrl })
    .eq('user_id', userId)
    .select();

  const { data: publicProfiles2, error: publicProfilesError2 } = await supabase
    .from('public_profiles')
    .update({ avatar: fileUrl })
    .select('points')
    .eq('user_id', userId);
}

export async function deleteAvatar(userId) {
  const { error: profilesError } = await supabase
    .from('profiles')
    .update({ avatar: null })
    .eq('user_id', userId);

  if (profilesError) throw new Error(profilesError.message);

  const { error: publicProfilesError } = await supabase
    .from('public_profiles')
    .update({ avatar: null })
    .eq('user_id', userId);

  if (publicProfilesError) throw new Error(publicProfilesError.message);
}

export async function getPoints() {
  const { data: user, error: userError } = await supabase
    .from('profiles')
    .select('*');

  if (userError) throw new Error(userError.message);

  const { data, error } = await supabase
    .from('public_profiles')
    .select('points')
    .eq('user_id', user?.at(0)?.user_id);

  if (error) throw new Error(error.message);

  return data;
}

export async function getMessages(userId) {
  const { data, error } = await supabase
    .from('public_profiles')
    .select('messages')
    .eq('user_id', userId);

  if (error) throw new Error(error.message);

  return data?.at(0)?.messages;
}

export async function updateMessage(obj, userId) {
  let msgData;

  const { data, error: userError } = await supabase
    .from('profiles')
    .select('messages')
    .eq('user_id', userId);

  if (userError) throw new Error(userError.message);

  if (data?.at(0)?.messages) msgData = data?.at(0)?.messages;
  else msgData = data;

  const updatedMsg = [...msgData, obj];

  const { error: profilesError } = await supabase
    .from('profiles')
    .update({ messages: updatedMsg })
    .eq('user_id', userId);

  if (profilesError) throw new Error(profilesError.message);

  const { error: publicProfilesError } = await supabase
    .from('public_profiles')
    .update({ messages: updatedMsg })
    .eq('user_id', userId);

  if (publicProfilesError) throw new Error(publicProfilesError.message);
}

export async function deleteMessage(messageId, userId) {
  let updatedMsg;

  const { data, error: error } = await supabase
    .from('profiles')
    .select('messages')
    .eq('user_id', userId);

  if (error) throw new Error(error.message);

  const messages = data?.at(0)?.messages;

  if (messages?.length)
    updatedMsg = messages.filter(msg => msg.id !== messageId);
  else updatedMsg = data;

  const { error: profilesError } = await supabase
    .from('profiles')
    .update({ messages: updatedMsg })
    .eq('user_id', userId);

  if (profilesError) throw new Error(profilesError.message);

  const { error: publicProfilesError } = await supabase
    .from('public_profiles')
    .update({ messages: updatedMsg })
    .eq('user_id', userId);

  if (publicProfilesError) throw new Error(publicProfilesError.message);
}
