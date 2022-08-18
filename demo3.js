window.onload = function () {
 
  let loader = document.getElementById("preloader_bg");
  let content = document.getElementById("content");
  setTimeout(function(){
    loader.style.opacity = 0;
    content.style.opacity = 1;
    }, 1500);
  setTimeout(function(){
      loader.style.display = "none";
      }, 4000);

      
  let pageVisible = true;
  let videoVisible = true;
  let videoElement = document.getElementById("airplane");

  let hidden, visibilityChange;
  if (typeof document.hidden !== "undefined") {
    
    hidden = "hidden";
    visibilityChange = "visibilitychange";
  } else if (typeof document.msHidden !== "undefined") {
    hidden = "msHidden";
    visibilityChange = "msvisibilitychange";
  } else if (typeof document.webkitHidden !== "undefined") {
    hidden = "webkitHidden";
    visibilityChange = "webkitvisibilitychange";
  }

  
  document
    .getElementsByClassName("left_arrow")[0]
    .addEventListener("click", clickLeftArrow);
  document
    .getElementsByClassName("right_arrow")[0]
    .addEventListener("click", clickRightArrow);


  let touchstartX = 0;
  let touchstartY = 0;
  let touchendX = 0;
  let touchendY = 0;


  document.getElementById("book_trip_bn").addEventListener("click", ()=>{
    bookTrip(true);
  });

  document.getElementById("menu_bn").addEventListener("click", () => {
    document.getElementsByClassName("menu_panel_wrap")[0].style.transform =
      "translateX(0%)";
    document.getElementsByTagName("BODY")[0].style.overflow = "hidden";
  });

  /**************Booking Panel, Menu Panel***************************** */
  const private_jet_booking_bn = document.getElementById("private_jet_booking");
  const regular_flight_booking_bn = document.getElementById(
    "regular_flight_booking"
  );
  const close_panel_bns = document.getElementsByClassName("close_bn");
  const booking_text = document.getElementById("booking_text");
  const one_way_bn = document.getElementById("one_way_bn");
  const round_trip_bn = document.getElementById("round_trip_bn");
  const booking_form = document.getElementById("booking_form_id");
  const booking_inputs = document.getElementsByClassName("booking_input");
  private_jet_booking_bn.addEventListener("click", () => {
    private_jet_booking_bn.dataset.active = "true";
    regular_flight_booking_bn.dataset.active = "false";
    booking_text.textContent = "Book a private jet";
  });

  regular_flight_booking_bn.addEventListener("click", () => {
    private_jet_booking_bn.dataset.active = "false";
    regular_flight_booking_bn.dataset.active = "true";
    booking_text.textContent = "Book a regular flight";
  });

  for (const bn of close_panel_bns) {
    bn.addEventListener("click", () => {
      bn.closest(".panel_wrap").style.transform = "translateX(100%)";
      document.getElementsByTagName("BODY")[0].style.overflow = "auto";
    });
  }

  one_way_bn.addEventListener("click", () => {
    one_way_bn.dataset.active = "true";
    round_trip_bn.dataset.active = "false";
  });

  round_trip_bn.addEventListener("click", () => {
    round_trip_bn.dataset.active = "true";
    one_way_bn.dataset.active = "false";
  });

  booking_form.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputFields = booking_form.querySelectorAll("input");
    for (const input of inputFields) {
      if (!input.value) {
        input
          .closest(".input_container")
          .querySelector(".booking_error").style.display = "block";
      }
    }
  });

  for (const booking_input of booking_inputs) {
    booking_input.addEventListener("input", () => {
      if (booking_input.value) {
        booking_input
          .closest(".input_container")
          .querySelector(".booking_error").style.display = "none";
      } else {
        booking_input
          .closest(".input_container")
          .querySelector(".booking_error").style.display = "block";
      }
    });
  }

  playVideoWhenVisible();
  playVideoWhenPageVisible();
  showImgWhenHover();

  function playVideoWhenVisible() {
    let callback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.target.id === "airplane") {
          if (entry.isIntersecting) {
            videoVisible = true;
            if (pageVisible) {
              entry.target.play();
            }
          } else {
            videoVisible = false;
            entry.target.pause();
          }
        }
      });
    };

    let observer = new IntersectionObserver(callback, { threshold: 0.2 });
    observer.observe(document.querySelector("#airplane"));
  }

  function playVideoWhenPageVisible() {
    if (
      typeof document.addEventListener === "undefined" ||
      hidden === undefined
    ) {
      console.log(
        "This demo requires a browser, such as Google Chrome or Firefox, that supports the Page Visibility API."
      );
    } else {
      document.addEventListener(
        visibilityChange,
        handleVisibilityChange,
        false
      );

    }
  }

  function handleVisibilityChange() {
    if (document[hidden]) {
      videoElement.pause();
    } else {
      if (videoVisible) {
        videoElement.play();
      }
    }
  }

  function showImgWhenHover() {
    const santoriniDiv = document.getElementById("santorini");
    const santoriniImg = document.getElementById("santorini_img");
    const mont_saint_michel_Div = document.getElementById("mont_saint_michel");
    const mont_saint_michel_Img = document.getElementById(
      "mont_saint_michel_img"
    );
    const cinque_terre_Div = document.getElementById("cinque_terre");
    const cinque_terre_Img = document.getElementById("cinque_terre_img");
    const auroraDiv = document.getElementById("aurora");
    const auroraImg = document.getElementById("aurora_img");

    const images = document.getElementsByClassName("destination_img");


    santoriniDiv.addEventListener("mouseover", () => {
      for (var i = 0; i < images.length; i++) {
        images[i].style.display = "none";
      }
      santoriniImg.style.display = "inline-block";
    });

    mont_saint_michel_Div.addEventListener("mouseover", () => {
      for (var i = 0; i < images.length; i++) {
        images[i].style.display = "none";
      }
      mont_saint_michel_Img.style.display = "inline-block";
    });

    cinque_terre_Div.addEventListener("mouseover", () => {
      for (var i = 0; i < images.length; i++) {
        images[i].style.display = "none";
      }
      cinque_terre_Img.style.display = "inline-block";
    });

    auroraDiv.addEventListener("mouseover", () => {
      for (var i = 0; i < images.length; i++) {
        images[i].style.display = "none";
      }
      auroraImg.style.display = "inline-block";
    });
  }

  const slideImages = document.getElementsByClassName("slide_img");
  let slideNum = document.getElementsByClassName("slide_num")[0];
  let visibleSlideImgIndex = 0;
  slideNum.textContent = `${visibleSlideImgIndex + 1}/${slideImages.length}`;

  function clickLeftArrow() {
    slideImages[visibleSlideImgIndex].style.opacity = 0;
    if (visibleSlideImgIndex > 0) {
      visibleSlideImgIndex--;
    } else {
      //=0
      visibleSlideImgIndex = slideImages.length - 1;
    }
    slideImages[visibleSlideImgIndex].style.opacity = 1;
    slideNum.textContent = `${visibleSlideImgIndex + 1}/${slideImages.length}`;
  }

  function clickRightArrow() {
    slideImages[visibleSlideImgIndex].style.opacity = 0;
    if (visibleSlideImgIndex < slideImages.length - 1) {
      visibleSlideImgIndex++;
    } else {
      visibleSlideImgIndex = 0;
    }
    slideImages[visibleSlideImgIndex].style.opacity = 1;
    slideNum.textContent = `${visibleSlideImgIndex + 1}/${slideImages.length}`;
  }
};

function bookTrip(isPrivate) {
  document.getElementsByClassName("book_trip_panel_wrap")[0].style.transform =
    "translateX(0%)";
  document.getElementsByTagName("BODY")[0].style.overflow = "hidden";

  const privateBn = document.getElementById("private_jet_booking");
  const regularBn = document.getElementById("regular_flight_booking");

  if(isPrivate){
    privateBn.setAttribute("data-active", "true");
    regularBn.setAttribute("data-active", "false");
  }else {
    privateBn.setAttribute("data-active", "false");
    regularBn.setAttribute("data-active", "true");
  }
}