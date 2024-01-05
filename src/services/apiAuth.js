import supabase from './supabase';

export async function signUp({ userId, username, email, password }) {
  let isSignedUp;

  if (userId.length < 4) throw new Error('아이디는 최소 4자 이상이어야 합니다');

  const { data: profilesData } = await supabase
    .from('public_profiles')
    .select('*');

  profilesData?.filter(
    profile => profile.user_id === userId && (isSignedUp = true)
  );

  if (isSignedUp) throw new Error('이미 등록된 아이디입니다');

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        user_id: userId,
        username,
        avatar: '',
        background_img: '',
      },
    },
  });

  if (error) throw new Error(error.message);

  const { error: profilesError } = await supabase
    .from('profiles')
    .insert([{ username, user_id: userId, id: data?.user?.id }]);

  if (profilesError) throw new Error(profilesError.message);

  const { error: publicProfilesError } = await supabase
    .from('public_profiles')
    .insert([{ username, user_id: userId, id: data?.user?.id }]);

  if (publicProfilesError) throw new Error(publicProfilesError.message);

  return data;
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error)
    throw new Error(
      error.message === 'Invalid login credentials'
        ? '이메일 혹은 비밀번호를 다시 확인해주세요'
        : error.message
    );

  return data;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);

  return;
}

export async function getUserAuth() {
  const { data } = await supabase.auth.getUser();

  return data?.user;
}

export async function getCurrentUser() {
  const { data, error } = await supabase.from('profiles').select('*');

  if (error) throw new Error(error.message);

  return data;
}
