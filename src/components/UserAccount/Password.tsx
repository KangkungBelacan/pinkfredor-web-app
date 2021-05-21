import "./../../pages/UserAccount";
import React, { useState } from 'react';

const Password = (props: any) => {
    function visibility(event: any) {
      var x = event.currentTarget.nextElementSibling;
      if (x.type === "password") {
        x.type = "text";
      } else {
        x.type = "password";
      }
    }
    return (
        <div>
            <h2>Change your password</h2>
            <label className="Label" htmlFor="CurrentPass">Current Password</label>
            <button onClick={visibility}>Show</button>
            <input id="CurrentPass" type="text" placeholder="Current Password"></input>
            <label className="Label" htmlFor="NewPass">New Password</label>
            <button onClick={visibility}>Show</button>
            <input id="NewPass" type="text" placeholder="New Password"></input>
            <br/>
            <button>UPDATE</button>
        </div>
    );
};

export default Password;