let t1 = gsap.timeline();

t1.from(".line h1", {
  y: 150,
  //   opacity: 0,s
  stagger: 0.25,
  duration: 0.6,
  delay: 0.5,
});

t1.to(".line h2", {
  animationName: "now",
  opacity: 1,
});

t1.from(".line1-part1", {
  opacity: 0,
  onStart: function () {
    let h5Timer = document.querySelector(".line1-part1 h5");

    let grow = 0;
    h5Timer.innerHTML = `<h5>${grow}</h5>`;

    let id = setInterval(function () {
      h5Timer.innerHTML = ++grow;
      //   console.log(grow);
      if (grow === 100) {
        clearInterval(id);
      }
    }, 35);
  },
});

t1.to("#loader", {
  opacity: 0,
  duration: 0.2,
  delay: 4,
  display: "none",
});

t1.from("#page1", {
  y: 1600,
  opacity: 0,
  delay: 0.2,
  duration: 0.5,
  //   ease: "Power4",
});

// t1.to("#loader", {});
