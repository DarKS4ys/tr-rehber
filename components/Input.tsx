import React, { InputHTMLAttributes } from 'react';
import clsx from 'clsx';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    // additional props
}

const Input: React.FC<InputProps> = ({ className, ...props }) => {
  return (
    <input
      className={clsx(
        'w-full border border-border p-2 rounded bg-transparent outline-none ring-highlight/50 ring-offset-background focus:ring-offset-2 focus:ring-2 focus:bg-accent-foreground/5 transition duration-200',
        className
      )}
      {...props}
    />
  );
}

export default Input;
