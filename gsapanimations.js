// https://codepen.io/alvarotrigo/pen/KKvOGNb
gsap.registerPlugin(ScrollTrigger);
const slideInAnimation = className => {
  gsap.utils.toArray(`.${className}`).forEach(function (elem) {
    ScrollTrigger.create({
      trigger: elem,
      start: "top 95%",
      end: "bottom 5%",
      markers: false,
      onEnter: function () {
        gsap.fromTo(
          elem,
          { x: -100, autoAlpha: 0 }, // debug: starts page 100px down and offsets start/end of onscreen elements by 100px
          {
            duration: 1.25,
            x: 0,
            autoAlpha: 1,
            ease: "back",
            overwrite: "auto"
          }
        );
      },
      onLeave: function () {
        gsap.fromTo(elem, { autoAlpha: 1 }, { autoAlpha: 0, overwrite: "auto" });
      },
      onEnterBack: function () {
        gsap.fromTo(
          elem,
          { x: -100, autoAlpha: 0 },
          {
            duration: 1.25,
            x: 0,
            autoAlpha: 1,
            ease: "back",
            overwrite: "auto"
          }
        );
      },
      onLeaveBack: function () {
        gsap.fromTo(elem, { autoAlpha: 1 }, { autoAlpha: 0, overwrite: "auto" });
      }
    });
  });
};
slideInAnimation("featuredWork");
slideInAnimation("featuredIssue");