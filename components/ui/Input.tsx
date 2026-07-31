type InputProps = {
  label: string;
  type?: string;
  value?: string | number;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

function Input({
  label,
  type = "text",
  value,
  onChange,
}: InputProps) {
  return (
    <div>
      <label>{label}</label>

      <input
        type={type}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default Input;