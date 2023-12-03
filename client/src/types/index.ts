import React, { HTMLInputTypeAttribute } from 'react';

type FormData = {
  name: string;
  value: string;
  label: string;
  placeholder: string;
  textarea: boolean;
  type?: HTMLInputTypeAttribute;
};

type InputHandler = {
  handleInput: (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
};

export type { FormData, InputHandler };
