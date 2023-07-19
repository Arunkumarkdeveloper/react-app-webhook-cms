import React, { useState } from "react";
import MainItems from "./MainItems";

const PopupPage = () => {
  const [popup, setPopup] = useState(false);

  return (
   <React.Fragment>
      <div style={{ display: popup && "none" }} className="savebutton" >
        <button onClick={(e) => setPopup(true)}>Save segment</button>
      </div>
      {popup && <MainItems popup={popup} setPopup={setPopup} />}
    </React.Fragment>
  )
}

export default PopupPage
