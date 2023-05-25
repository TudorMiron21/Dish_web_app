import { useGetUserId } from "../hooks/useGetUserID";
import axios from "axios";
import { useCookies } from "react-cookie";
import Carousel from "../components/carousel.js";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const Home = () => {
  const userID = useGetUserId();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    {
      url: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
      title: "Make Food Better",
    },
    {
      url: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      title: "Taste The New Flavours",
    },
    {
      url: "https://images.unsplash.com/photo-1496412705862-e0088f16f791?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
      title: "Make It Your Own",
    },
    {
      url: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8NXx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=60",
      title: "Easy To Make",
    },
    {
      url: "https://images.unsplash.com/photo-1515088167831-556650cef41d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80",
      title: "Cook, cook, cook!",
    },
  ];
  const containerStyles = {
    width: "100%",
    height: "500px",
    margin: "0 auto",
  };

  const categories = [
    {
      url: "https://images.unsplash.com/photo-1598030304671-5aa1d6f21128?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fHZlZ2V0YWJsZXN8ZW58MHx8MHx8&auto=format&fit=crop&w=1000&q=60",
      text: "Healthy",
    },
    {
      url: "https://images.unsplash.com/photo-1613564834361-9436948817d1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTJ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=60",
      text: "Pizza",
    },
    {
      url: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YnVyZ2VyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1000&q=60",
      text: "Burger",
    },
    {
      url: "https://images.unsplash.com/photo-1584583570840-0a3d88497593?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHN1c2hpfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1000&q=60",
      text: "Sushi",
    },
    {
      url:"https://images.unsplash.com/photo-1586195831572-9608b4f48230?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGNob2NvbGF0ZSUyMGRlc3NlcnRzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1000&q=60",
      text: "Desserts",
    },
    {
      url:"https://images.unsplash.com/photo-1506458539166-34079f9e1d2c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=709&q=80",
      text:"Other"
    },
    {
      url:"https://images.unsplash.com/photo-1554520735-0a6b8b6ce8b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
      text:"BreakFast"
    }

  ];

  const goToMain = (categoryText) => {
    navigate("/main-listing?argValue="+categoryText);
  };
  const [cookies, _] = useCookies(["access_token"]);

  if (userID) {
    return (
      <div>
        <div style={containerStyles}>
          <Carousel slides={slides} />
        </div>

        <ul className="ul-btn">
          {categories.map((category) => (
            <li className="li-button">
              <button
                onClick={()=>goToMain(category.text)}
                className="category-btn"
                style={{backgroundImage:`url(${category.url})`, backgroundSize:"cover", backgroundPosition:"center", fontFamily:"\"Pacifico\", cursive",color:"white"}}
              >
                {category.text}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  } else {
    return <h1>please login first</h1>;
  }
};
