import ShowAlertButtotn from "./showalertbutton";

const ShowAlert = () => {
  const handle_alert = () => {
    alert("the button has been clickedd");
  };
  return (
    <>
      <h1>this is the parent compopnent</h1>
      <div>
        <ShowAlertButtotn handle_alert={handle_alert} />
      </div>
    </>
  );
};
export default ShowAlert;
