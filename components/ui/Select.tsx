type Option = {
  value: string | number;
  label: string;
};

type SelectProps = {
  label: string;
  options: Option[];
  value?: string | number;
  onChange?: (value: string | number) => void;
};

function Select({
  label,
  options,
  value,
  onChange,
}: SelectProps) {
  return (
    <div>
      <label>{label}</label>

      <select
        value={String(value ?? "")}
        onChange={(e) => {
          const selected = options.find(
            (option) => String(option.value) === e.target.value
          );

          if (selected) {
            onChange?.(selected.value);
          }
        }}
      >
        <option value="">Select {label}</option>

        {options.map((option) => (
          <option
            key={option.value}
            value={String(option.value)}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;