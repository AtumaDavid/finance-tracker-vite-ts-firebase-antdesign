import "./Button.css";

interface ButtonProps {
  text: string;
  onClick: () => void;
  blue?: boolean;
}

export default function Button({ text, onClick, blue }: ButtonProps) {
  return (
    <div onClick={onClick} className={blue ? "btn btn-blue" : "btn"}>
      {text}
    </div>
  );
}
