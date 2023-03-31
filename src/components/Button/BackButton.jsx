import { useNavigate } from "react-router-dom";

export function BackButton(nameOfClass) {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return <button onClick={goBack} id={nameOfClass}>Go back</button>;
}

export default BackButton;
