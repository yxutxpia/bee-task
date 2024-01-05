import styled from 'styled-components';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import Loader from '../../ui/Loader';
import { useEffect } from 'react';
import { useState } from 'react';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import { useUpdateProfile } from '../../hooks/useUpdateProfile';
import { useDeleteAvatar } from '../../hooks/useDeleteAvatar';
import Avatar from '../../ui/Avatar';
import { Link } from 'react-router-dom';

const StyledSettingForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 32px;
  border-radius: var(--round-md);
  background-color: var(--color-gray-0);
  transition: background-color var(--transition);

  & > div:not(:last-child) {
    margin-bottom: 32px;
    padding-bottom: 32px;
    border-bottom: var(--border-solid);
    transition: border-color var(--transition);
  }

  & > div:has(button):last-child {
    margin-left: auto;
  }
`;

const AvatarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const AvatarInputWrapper = styled.span`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const FileInput = styled.input.attrs({ type: 'file' })`
  font-size: var(--font-size-regular);
  border-radius: var(--border-radius-sm);
  transition: color var(--transition);

  &::file-selector-button {
    margin-right: 12px;
    padding: 8px 12px;
    font: inherit;
    font-weight: 500;
    border: none;
    border-radius: 5px;
    color: var(--color-primary-text);
    background-color: var(--color-primary-500);
    transition: color var(--transition), background-color var(--transition);
    cursor: pointer;

    &:hover {
      background-color: var(--color-primary-600);
    }
  }
`;

const ButtonDelete = styled.button`
  color: var(--color-danger-500);
  font-weight: var(--font-weight-semibold);
  transition: color var(--transition);

  &:hover {
    color: var(--color-danger-600);
  }
`;

const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SignOutButton = styled(Link)`
  &:link,
  &:visited {
    color: var(--color-danger-500);
    font-weight: var(--font-weight-semibold);
    transition: color var(--transition);
  }

  &:hover,
  &:active {
    color: var(--color-danger-600);
  }
`;

function SettingForm() {
  const { user, isLoading } = useCurrentUser();
  const { updateProfile, isLoading: isUpdating } = useUpdateProfile();
  const { deleteAvatar, isLoadine: isDeletingAvatar } = useDeleteAvatar();

  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState(null);

  useEffect(
    function () {
      if (!isLoading) {
        setUserId(user?.at(0)?.user_id);
        setUsername(user?.at(0)?.username);
      }
    },
    [isLoading, user]
  );

  if (isLoading) return <Loader />;

  function handleSubmit(e) {
    e.preventDefault();

    if (!userId.trim() || !username) return;

    const newData = {
      avatar,
      username,
      newUserId: userId.trim(),
      userId: user?.at(0)?.user_id,
    };

    updateProfile(newData);
  }

  function handleDeleteAvatar(e) {
    e.preventDefault();
    deleteAvatar(user?.at(0)?.user_id);
  }

  return (
    <StyledSettingForm onSubmit={handleSubmit}>
      <AvatarWrapper>
        <Avatar size={72} avatar={user?.at(0)?.avatar} shape="rounded" />
        <AvatarInputWrapper>
          <FileInput
            type="file"
            id="avatar"
            accept="image/*"
            disabled={isUpdating}
            onChange={e => setAvatar(e.target.files[0])}
          />
          {user?.at(0)?.avatar && (
            <ButtonDelete onClick={handleDeleteAvatar}>
              이미지 삭제하기
            </ButtonDelete>
          )}
        </AvatarInputWrapper>
      </AvatarWrapper>
      <div>
        <FormRow label="이름">
          <Input
            type="text"
            id="username"
            value={username}
            disabled={isUpdating}
            onChange={e => setUsername(e.target.value)}
          />
        </FormRow>
      </div>
      <div>
        <FormRow label="아이디">
          <Input
            type="text"
            id="user_id"
            value={userId}
            disabled={isUpdating}
            onChange={e => setUserId(e.target.value)}
          />
        </FormRow>
      </div>
      <Footer>
        <SignOutButton to="/signout">탈퇴하기</SignOutButton>
        <Button type="primary" disabled={isUpdating}>
          업데이트하기
        </Button>
      </Footer>
    </StyledSettingForm>
  );
}

export default SettingForm;
