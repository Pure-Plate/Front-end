// useSearchRestaurants.js

import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const useSearchRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [restaurantsSet, setRestaurantsSet] = useState({});
  const [query, setQuery] = useState("");
  const [isHaveQuery, setIsHaveQuery] = useState(false);
  const [dropDownList, setDropDownList] = useState([]);
  const [dropDownItemIndex, setDropDownItemIndex] = useState(-1);
  const { URL } = useAuth();
  const navigate = useNavigate();

  const fetchRestaurant = async () => {
    try {
      const response = await axios.get(`${URL}/api/restaurant/list`);

      const restaurantNames = response.data.data.map((element) => element.Name);
      const restaurantSet = response.data.data.reduce((acc, element) => {
        acc[element.Name] = element.Id;
        return acc;
      }, {});
      setRestaurantsSet(restaurantSet);
      setRestaurants(restaurantNames);
    } catch (error) {
      if (error.response) {
        console.error(
          "Server response error:",
          error.response.status,
          error.response.data
        );
      } else if (error.request) {
        console.error(
          "No response from server. This could be a network issue.",
          error.request
        );
      } else {
        console.error("Error in setting up request:", error.message);
      }
    }
  };

  useEffect(() => {
    fetchRestaurant();
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    const link = restaurantsSet[query.trim()];
    if (link) {
      navigate(`/${link}`);
      setQuery("");
    }
  };

  const onChange = (event) => {
    setQuery(event.target.value);
    setIsHaveQuery(true);
  };

  const showDropDownList = () => {
    if (query === "") {
      setIsHaveQuery(false);
      setDropDownList([]);
    } else {
      const lowerCaseQuery = query.toLowerCase();
      const choosenTextList = restaurants.filter((textItem) =>
        textItem.toLowerCase().includes(lowerCaseQuery)
      );
      setDropDownList(choosenTextList);
    }
  };

  const clickDropDownItem = (clickedItem) => {
    setQuery(clickedItem);
    setIsHaveQuery(false);
  };

  const handleDropDownKey = (event) => {
    if (
      event.key === "ArrowDown" &&
      dropDownList.length - 1 > dropDownItemIndex
    ) {
      setDropDownItemIndex(dropDownItemIndex + 1);
    }

    if (event.key === "ArrowUp" && dropDownItemIndex >= 0) {
      setDropDownItemIndex(dropDownItemIndex - 1);
    }

    if (event.key === "Enter") {
      event.preventDefault();
      if (dropDownItemIndex >= 0) {
        clickDropDownItem(dropDownList[dropDownItemIndex]);
      } else if (restaurantsSet[query.trim()]) {
        onSubmit(event);
      }
      setDropDownItemIndex(-1);
    }
  };

  useEffect(showDropDownList, [query]);

  return {
    query,
    onChange,
    onSubmit,
    isHaveQuery,
    dropDownList,
    dropDownItemIndex,
    handleDropDownKey,
    clickDropDownItem,
  };
};

export default useSearchRestaurants;
