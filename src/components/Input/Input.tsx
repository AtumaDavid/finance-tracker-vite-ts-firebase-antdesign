import "./InputStyles.css";

interface InputProps {
  label: string;
  placeholder: string;
  state: string;
  setState:
    | React.Dispatch<React.SetStateAction<string>>
    | ((value: string) => void);
}

export default function Input({
  label,
  state,
  setState,
  placeholder,
}: InputProps) {
  return (
    <div className="input-wrapper">
      <p className="label-input">{label}</p>
      <input
        value={state}
        onChange={(e) => setState(e.target.value)}
        placeholder={placeholder}
        className="custom-input"
      />
    </div>
  );
}
