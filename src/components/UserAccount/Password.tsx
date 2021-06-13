import "./../../pages/UserAccount";

const Password = (props: any) => {
    function visibility(event: any) {
      var Text = event.currentTarget.nextElementSibling;
      Text.classList.toggle("PassVisibility");
      if (Text.type === "text") {
        Text.type = "password";
      } 
      else {
        Text.type = "text";
      }
    }
    return (
        <div>
          <br/><h2 className="Text" style={{margin:"10px"}}>Change your password</h2>
          <div className="flex">
            <div style={{margin:"10px"}}>
              <label className="Label" htmlFor="CurrentPass">Current Password</label><br/>
              <button className="PassButton" onClick={visibility}>Show</button>
              <input className="Input" id="CurrentPass" type="text" placeholder="Current Password"></input>
            </div>
            <div style={{margin:"10px"}}>
              <label className="Label" htmlFor="NewPass">New Password</label><br/>
              <button className="PassButton" onClick={visibility}>Show</button>
              <input className="Input" id="NewPass" type="text" placeholder="New Password"></input>
            </div>
          </div>
          <div className="flex">
            <div style={{margin:"10px"}}><button className="Button">UPDATE</button></div>
          </div>           
        </div>
    );
};

export default Password;