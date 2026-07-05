function locomotiveAnimation() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}

function loadingAnimation() {
  let t1 = gsap.timeline();

  t1.from(".line h1", {
    y: 150,
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
    delay: 3,
    display: "none",
  });

  t1.from("#page1", {
    y: 1600,
    opacity: 0,
    delay: 0.2,
    duration: 0.6,
    //   ease: "Power4",
  });

  t1.from("#nav", {
    opacity: 0,
  });

  t1.from(".hero-line h1, #hero3 h2", {
    y: 150,
    stagger: 0.2,
  });

  t1.from(
    "#page2",
    {
      opacity: 0,
    },
    "-=1.2",
  );
}

function cursorAnimation() {
  document.addEventListener("mousemove", function (event) {
    gsap.to(".crsr", {
      x: event.x + "px",
      y: event.y + "px",
    });
  });

  Shery.makeMagnet(".nav-part2 h4");
}

function h1SlidingAnimation() {
  gsap.to(".elem h1", {
    transform: "translateX(calc(-100% - 4px))",
    duration: 10,
    ease: "none",
    repeat: -1,
  });

  gsap.from(".line2", {
    transform: "translateX(calc(-100% - 4px))",
    duration: 15,
    ease: "none",
    repeat: -1,
  });
}

loadingAnimation();
cursorAnimation();
h1SlidingAnimation();
locomotiveAnimation();
