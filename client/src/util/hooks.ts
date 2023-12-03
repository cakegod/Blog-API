import type { FormData } from '@/types/index';
import { useState } from 'react';

function useForm(data: FormData[]) {
  const [formData, setFormData] = useState(data);

  const handleInput = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData(
      formData.map((input) => {
        if (e.currentTarget.name === input.name) {
          return { ...input, value: e.currentTarget.value };
        }
        return input;
      }),
    );
  };
  return { formData, handleInput };
}

export { useForm };
