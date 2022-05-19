import "./styles.css";

type Props = {
  text: string;
};

const BasicButton = ({ text }: Props) => {
  return <button className="btn btn-primary button">{text}</button>;
};

export default BasicButton;
