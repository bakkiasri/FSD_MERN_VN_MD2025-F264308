import { Image } from "react-bootstrap";
const Profile_card = ({ name, role, image }) => {
  return (
    <div className="d-flex justify-content-center align-items-center h5">
      <p>{name}</p>
      <p>{role}</p>
      <p>
        <Image src={image} className="w-25 rounded-5" />
      </p>
    </div>
  );
};
export default Profile_card;
