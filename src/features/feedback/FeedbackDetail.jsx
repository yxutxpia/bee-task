import styled from 'styled-components';

import { useForm } from 'react-hook-form';
import { HiOutlineEnvelope } from 'react-icons/hi2';

import FormRow from '../../ui/FormRow';
import Button from '../../ui/Button';
import { useFeedback } from '../../hooks/useFeedback';

const StyledFeedbackDetail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
  padding: 32px;
  border-radius: var(--round-md);
  background-color: var(--color-gray-0);
  transition: background-color var(--transition);
`;

const Icon = styled.div`
  width: 54px;
  height: 54px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: var(--round-sm);
  background-color: var(--color-pale-purple-100);
  transition: background-color var(--transition);

  & > svg {
    width: 32px;
    height: 32px;
  }
`;

const Description = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  border-radius: var(--round-sm);
  background-color: var(--color-primary-50);
  transition: color var(--transition), background-color var(--transition);

  & > li {
    line-height: 1.4;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 24px;
`;

const Textarea = styled.textarea`
  height: 120px;
  margin: 12px 0;
  line-height: 1.6;
  border-radius: var(--round-sm);
  background-color: var(--color-pale-purple-50);
  transition: color var(--transition), background-color var(--transition);
`;

function FeedbackDetail() {
  const { createFeedback, isLoading: isSubmitting } = useFeedback();
  const { register, handleSubmit, formState, reset } = useForm();
  const { errors } = formState;

  function onSubmit({ feedback }) {
    createFeedback(feedback, {
      onSettled: () => reset(),
    });
  }

  return (
    <StyledFeedbackDetail>
      <Icon>
        <HiOutlineEnvelope />
      </Icon>
      <Description>
        <li>&bull; 불편한 점, 개선할 점, 좋았던 점 등을 남겨주세요!</li>
        <li>
          &bull; 작성자의 아이피, 계정명 등의 개인정보는 전혀 수집되지 않습니다.
        </li>
        <li>
          &bull; 수집되는 항목은 다음과 같습니다: 피드백 작성일 및 작성 시간,
          작성 내용.
        </li>
        <li>&bull; 수집된 내용은 제작자만 열람 가능합니다.</li>
      </Description>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormRow label="피드백 작성하기" error={errors?.feedback?.message}>
          <Textarea
            id="feedback"
            name="feedback"
            disabled={isSubmitting}
            {...register('feedback', {
              required: '내용을 작성해주세요',
            })}
          ></Textarea>
        </FormRow>
        <Button type="primary" disabled={isSubmitting}>
          전송
        </Button>
      </Form>
    </StyledFeedbackDetail>
  );
}

export default FeedbackDetail;
