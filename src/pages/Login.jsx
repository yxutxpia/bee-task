import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { useLogin } from '../hooks/useLogin';
import FormRow from '../ui/FormRow';
import Input from '../ui/Input';
import Button from '../ui/Button';
import ButtonText from '../ui/ButtonText';
import { Link } from 'react-router-dom';
import LogoText from '../ui/LogoText';

const StyledLogin = styled.div`
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

  & > button:last-child {
    display: unset;
    align-self: center;
    margin-top: -6px;
  }

  @media only screen and (max-width: 640px) {
    max-width: 90%;
  }
`;

function Login() {
  const { login, isLoading: isLoggingIn } = useLogin();
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  function onSubmit({ email, password }) {
    login({ email, password });
  }

  return (
    <StyledLogin>
      <LogoText />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormRow label="Email" errors={errors?.email?.message}>
          <Input
            type="text"
            id="email"
            name="email"
            disabled={isLoggingIn}
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
            disabled={isLoggingIn}
            {...register('password', {
              required: 'This field is required',
            })}
          />
        </FormRow>
        <Button type="primary" disabled={isLoggingIn}>
          Login
        </Button>
        <ButtonText onClick={e => e.preventDefault()}>
          <Link to="/signup">Join BeeTask</Link>
        </ButtonText>
      </Form>
    </StyledLogin>
  );
}

export default Login;
