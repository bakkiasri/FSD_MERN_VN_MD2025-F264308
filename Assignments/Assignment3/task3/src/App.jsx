import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import DisplayArrayOfObject from "./Component/Display_AoO";
import LoggingIn from "./Component/logging_in";
import Display_profile_card from "./Component/display_profilecard";
import Input_Live_show from "./Component/InputTypeName";
import Fomsss from "./Component/form";
import ProductOfMap from "./Component/ProductMap";
import ShowAlertButtotn from "./Component/showalertbutton";
import ShowAlert from "./Component/showAlert";
import Filter_Map from "./Component/filter_map";
import Search_Student from "./Component/searchstudent";
import Json_Display from "./Component/Json_Display";
import Dummy_Json_Display from "./Component/dummy_api";
import Dummy_Json_Display_Loading from "./Component/Loading";
import Dynamicaly_insertion from "./Component/Dynamically_insert";
import ProfileForm from "./Component/Edit&&Update";
import PostForm from "./Component/post_dummyapi";
import EditUser from "./Component/put_edit_dummy";
import UsersPagination from "./Component/next_page";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <DisplayArrayOfObject /> */}
      {/* <LoggingIn /> */}
      {/* <Display_profile_card /> */}
      {/* <Input_Live_show /> */}
      {/* <Fomsss /> */}
      {/* <ProductOfMap /> */}
      {/* <ShowAlert /> */}
      {/* <Json_Display /> */}
      {/* <Dynamicaly_insertion /> */}
      <UsersPagination />
    </>
  );
}

export default App;
