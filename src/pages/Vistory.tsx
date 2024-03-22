import { useParams } from "react-router-dom";
import VistoryByID from "../components/VistoryById/VistoryByID";

const Vistory = () => {
  const { id } = useParams();

  return (
    <div>
      <VistoryByID id={id} />
    </div>
  );
};

export default Vistory;
