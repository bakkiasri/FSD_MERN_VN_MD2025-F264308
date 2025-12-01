import { useState } from "react";
import { Button } from "react-bootstrap";

const LoggingIn = () => {
  const [login, setLogin] = useState(false);

  const handleLogin = () => {
    setLogin(!login); // toggles state correctly
  };

  return (
    <>
      <div className="d-flex flex-column gap-5 mt-5 justify-content-center align-items-center">
        <Button onClick={handleLogin}>Login</Button>

        {login ? <div>Welcome back</div> : <div>Please Login</div>}
      </div>
    </>
  );
};

export default LoggingIn;
