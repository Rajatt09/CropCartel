import React from "react";
import CommonItem from "./Commonitem";
import { useState, useEffect } from "react";
import ApiCall from "../../utils/ApiCall";
import axios from "axios";

const EditItem = ({ id }) => {
  return (
    <div>
      <CommonItem name="Edit" id={id} />
    </div>
  );
};

export default EditItem;