import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import FormRow from '../ui/FormRow';
import Input from '../ui/Input';
import { useSignUp } from '../hooks/useSignUp';
import Button from '../ui/Button';
import LogoText from '../ui/LogoText';

const StyledSignUp = styled.div`
  height: 100dvh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 48px;

  & > a:link,
  & > a:visited {
    font-size: 36px;
  }
`;

const Form = styled.form`
  width: 420px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding: 32px;
  border-radius: var(--round-md);
  background-color: var(--color-gray-0--50);
  transition: background-color var(--transition);

  &:hover {
    background-color: var(--color-gray-0);
  }

  & > div {
    width: unset;
  }

  & > button {
    width: 320px;
    margin-top: 12px;
    text-align: center;
  }

  @media only screen and (max-width: 640px) {
    max-width: 90%;
  }
`;

function SignUp() {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const { signUp, isLoading: isSigningUp } = useSignUp();

  function onSubmit({ username, userId, email, password }) {
    signUp({ username, userId, email, password });
  }

  return (
    <StyledSignUp>
      <LogoText />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormRow label="Username" errors={errors?.username?.message}>
          <Input
            type="text"
            id="username"
            name="username"
            disabled={isSigningUp}
            {...register('username', {
              required: 'This field is required',
            })}
          />
        </FormRow>
        <FormRow label="User ID" errors={errors?.userId?.message}>
          <Input
            type="text"
            id="userId"
            name="userId"
            disabled={isSigningUp}
            {...register('userId', {
              required: 'This field is required',
              min: {
                value: 4,
                message: 'ID should be at least 4 characters long',
              },
            })}
          />
        </FormRow>
        <FormRow label="Email" errors={errors?.email?.message}>
          <Input
            type="text"
            id="email"
            name="email"
            disabled={isSigningUp}
            {...register('email', {
              required: 'This field is required',
            })}
          />
        </FormRow>
        <FormRow label="Password" errors={errors?.password?.message}>
          <Input
            type="password"
            id="password"
            name="password"
            disabled={isSigningUp}
            {...register('password', {
              required: 'This field is required',
            })}
          />
        </FormRow>
        <Button type="primary" disabled={isSigningUp}>
          Join BeeTask
        </Button>
      </Form>
    </StyledSignUp>
  );
}

export default SignUp;
