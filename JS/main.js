// Start Navbar
let theNabar = document.querySelector(".navbar");

window.addEventListener("scroll", (e) => {
  if (window.scrollY > 0) {
    theNabar.classList.add("upFixed");
  } else {
    theNabar.classList.remove("upFixed");
  }
});

// Slider

const wrapper = document.querySelector(".wrapper");
const theSlider = document.querySelector(".slider");
// Width Of item
let theItem = theSlider.querySelector(".item").offsetWidth;
let theChildren = [...theSlider.children];
const arrows = wrapper.querySelectorAll("i");

// Setoption
let isDragging = false;
let thePgX, theLeftScroll;
let thePlay;

let cardPerView = Math.round(theSlider.offsetWidth / theItem);

theChildren
  .slice(-cardPerView)
  .reverse()
  .forEach((item) => {
    theSlider.insertAdjacentHTML("afterbegin", item.outerHTML);
  });
theChildren.slice(0, cardPerView).forEach((item) => {
  theSlider.insertAdjacentHTML("beforeend", item.outerHTML);
});
arrows.forEach((btn) => {
  btn.addEventListener("click", () => {
    theSlider.scrollLeft += btn.id === "left" ? -theItem : theItem;
  });
});

const dragStart = (e) => {
  isDragging = true;
  theSlider.classList.add("dragging");
  thePgX = e.pageX;
  theLeftScroll = theSlider.scrollLeft;
};

const dragging = (e) => {
  if (!isDragging) return;
  theSlider.scrollLeft = theLeftScroll - (e.pageX - thePgX);
};

const dragEnd = () => {
  isDragging = false;
  theSlider.classList.remove("dragging");
};

const autoPlay = () => {
  thePlay = setTimeout(() => (theSlider.scrollLeft += theItem), 5000);
}

const infinteScroll = () => {
  if (theSlider.scrollLeft === 0) {
    theSlider.classList.add("no-trans");
    theSlider.scrollLeft = theSlider.scrollWidth - 2 * theSlider.offsetWidth;
    theSlider.classList.remove("no-trans");
  } else if (
    Math.ceil(theSlider.scrollLeft) ===
    theSlider.scrollWidth - theSlider.offsetWidth
  ) {
    theSlider.classList.add("no-trans");
    theSlider.scrollLeft = theSlider.offsetWidth;
    theSlider.classList.remove("no-trans");
  }
  clearTimeout(autoPlay);
  if (!wrapper.matches(":hover")) autoPlay();
};

theSlider.addEventListener("mousedown", dragStart);
theSlider.addEventListener("mousemove", dragging);
theSlider.addEventListener("mouseup", dragEnd);
theSlider.addEventListener("scroll", infinteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(thePlay))
wrapper.addEventListener("mouseleave", autoPlay )

