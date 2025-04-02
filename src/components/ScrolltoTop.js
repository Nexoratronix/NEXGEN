import React from "react";
import { Button } from "reactstrap";

const ScrolltoTop = () => {
  window.onscroll = function () {
    scrollFunction();
  };

  function scrollFunction() {
    const mybutton = document.getElementById("back-href-top");
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      mybutton.style.display = "block";
    } else {
      mybutton.style.display = "none";
    }
  }
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <Button id="back-href-top" className="p-0" onClick={scrollTop}>
      <i className="mdi mdi-arrow-up"></i>
    </Button>
  );
};

export default ScrolltoTop;
