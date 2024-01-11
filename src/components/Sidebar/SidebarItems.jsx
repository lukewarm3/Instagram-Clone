import React from "react";
import Home from "./Home";
import Create from "./Create";
import Search from "./Search";
import Notification from "./Notification";
import ProfileLink from "./ProfileLink";

const SidebarItems = () => {
  return (
    <>
      <Home />
      <Search />
      <Notification />
      <Create />
      <ProfileLink />
    </>
  );
};

export default SidebarItems;
