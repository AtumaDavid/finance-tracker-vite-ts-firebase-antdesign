import "./Button.css";

interface ButtonProps {
  text: string;
  onClick: () => void;
  blue?: boolean;
  disabled?: boolean;
}

export default function Button({ text, onClick, blue, disabled }: ButtonProps) {
  return (
    <div
      onClick={disabled ? undefined : onClick}
      className={blue ? "btn btn-blue" : "btn"}
    >
      {text}
    </div>
  );
}
