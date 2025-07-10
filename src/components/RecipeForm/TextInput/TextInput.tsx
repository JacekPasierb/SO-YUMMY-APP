type TextInputProps = {
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
    name: string;
    isTextarea?: boolean;
    className?: string;
  };
  
  export const TextInput = ({
    value,
    onChange,
    placeholder,
    name,
    isTextarea = false,
    className = '',
  }: TextInputProps) => {
    const inputProps = {
      name,
      value,
      placeholder,
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        onChange(e.target.value),
      className,
      id: name,
    };
  
    return isTextarea ? (
      <textarea {...inputProps} />
    ) : (
      <input type="text" {...inputProps} />
    );
  };
  