import React, { TextareaHTMLAttributes } from 'react';
import clsx from 'clsx';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    // additional props
}

const Textarea: React.FC<TextareaProps> = ({ className, ...props }) => {
  return (
    <textarea
      className={clsx(
        'w-full border border-border p-2 rounded bg-transparent outline-none ring-highlight/50 ring-offset-background focus:ring-offset-2 focus:ring-2 focus:bg-accent-foreground/5 transition duration-200',
        className
      )}
      {...props}
    />
  );
}

export default Textarea;
