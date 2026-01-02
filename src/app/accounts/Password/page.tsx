'use client'
import Button from "@/component/common/Button";
import Input from "@/component/common/Input";
import Text from "@/component/common/Text";
import Flex from "@/component/common/styles/Flex";
import { useForm } from "react-hook-form";

type PasswordFormInputs  = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const Password = () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PasswordFormInputs >();

  const newPassword = watch('newPassword');

  const onSubmit =async (data: PasswordFormInputs ) => {
    const jsonData = JSON.stringify(data);
    const res = await fetch(`${baseUrl}/auth/editPassword`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }, 
      body: jsonData,
      credentials: 'include',
    });
    if (!res.ok) {
      console.error('Failed to update profile:', await res.json());
    } else {
      const userData = await res.json();
    }
  };

  return (
    <Flex $margin="2rem 0 0 3rem" $flex_direction="column" $width="40%" $height="fit-content">
      <Text $variants="Large">Password</Text>
      <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: '400px', margin: '2rem auto' }}>
        <div style={{ marginBottom: '1rem' }}>
          <Text $fontSize="1.5rem">Old password</Text>
          <Input
            id="oldPassword"
            type="password"
            $variants="account"
            {...register('oldPassword', { required: 'Old password is required' })}
          />
          {errors.oldPassword && <p style={{ color: 'red' }}>{errors.oldPassword.message}</p>}
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <Text $fontSize="1.5rem">New password</Text>
          <Input
            id="newPassword"
            type="password"
            $variants="account"
            {...register('newPassword', {
              required: 'New password is required',
              minLength: { value: 6, message: 'At least 6 characters' },
            })}
          />
          {errors.newPassword && <p style={{ color: 'red' }}>{errors.newPassword.message}</p>}
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <Text $fontSize="1.5rem">Confirm new password</Text>
          <Input
            id="confirmPassword"
            type="password"
            $variants="account"
            {...register('confirmPassword', {
              required: 'Please confirm your new password',
              validate: value =>
                value === newPassword || 'Passwords do not match',
            })}
          />
          {errors.confirmPassword && <p style={{ color: 'red' }}>{errors.confirmPassword.message}</p>}
        </div>

        <Button $width="100%" $height="5rem" $fontSize="2rem" $marginTop="6rem" type="submit">Save</Button>
      </form>
    </Flex>
  );
};
export default Password