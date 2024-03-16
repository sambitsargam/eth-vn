import React, { useContext } from 'react';

const NavigationBar = () => {
  return (
    <div className="sidenav flex-col flex w-48">
      <div className="links-container ml-10">

        <div>
            <button id="verifierBtn" >
            Verifier
            </button>
            <button id="adminBtn" >
            Admin
            </button>
            <button id="orgaizationBtn" >
              Organization
            </button>
        </div>
      </div>
    </div>
  );
}

const Header = () => {
  return (
    <div className="heading-container bg-main">
      <NavigationBar />
    </div>
  );
}

export default Header
