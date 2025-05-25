import React from "react";
import funnyImage from "../assets/newmike.png";
import "../styles/NotFoundPage.css"; 

function NotFoundPage() {
   return (
      <>
         <div className="not-found-page">
            <div className="content-wrapper">
               <div className="image-container">
                  <img
                     src={funnyImage}
                     alt="Mike, the mascot, with a 404 error sign"
                     className="funny-image"
                  />
               </div>

               <div className="text-container">
                  <h1 className="heading">404</h1>
                  <h2 className="subheading">This is not the page you're looking for.</h2>
                  <p className="description">at least you found Mike lol </p>
                  <a href="/" className="home-button">
                     Return Home
                  </a>
               </div>
            </div>
         </div>
      </>
   );
}

export default NotFoundPage;
