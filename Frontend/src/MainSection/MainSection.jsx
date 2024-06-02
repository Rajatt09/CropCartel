import React, { useEffect, useState } from "react";
import ProfilePage from "../Profile/Profile";
import { useParams } from "react-router-dom";
import ItemListing from "../Items/ItemListing";
import ParticularItem from "../Items/ParticularItem";
import History from "../Items/History";
import SavedItems from "../Items/SavedItems";
import AddItem from "../Items/AddItem";
import BidderHistory from "../Items/BidderHistory";

const MainSection = () => {
  const [section, setSection] = useState("");
  const [itemUrl, setItemUrl] = useState("");
  const { id } = useParams();
  // console.log("id: ", id);

  useEffect(() => {
    // console.log("Inside MainSection useEffect");
    var currentURL = window.location.href;
    currentURL = currentURL.split("/");
    // console.log(currentURL);
    // let urlsection1 = currentURL[currentURL.length - 1];
    // let urlsection2 = currentURL[currentURL.length - 2];
    setSection(currentURL[currentURL.length - 1]);
    setItemUrl(currentURL[currentURL.length - 2]);
  }, [id]);

  if (section === "myprofile") return <ProfilePage />;
  if (section === "dashboard") return <ItemListing />;
  if (section === "savedItems") return <SavedItems />;
  if (section === "sold-history") return <History type="Sold" status="SOLD" />;
  if (section === "bought-history")
    return <BidderHistory type="Bought" status="BOUGHT" />;

  if (section === "additem") return <AddItem />;
  if (itemUrl === "item") return <ParticularItem />;
  else return <div></div>;
};

export default MainSection;
