//* HOME TEXT ANIMATION */
const words = ['Serhan Ramadan.', 'A Designer.', 'A Developer.', 'A Coder.'];

let curser = gsap.to('.curser', {
  opacity: 0,
  ease: 'power2.inOut',
  repeat: -1,
  duration: 1.2,
});

let boxTl = gsap.timeline();

boxTl
  .to('.box', {
    duration: 1,
    width: '13%',
    delay: 0.5,
    ease: 'poer4.inOut',
  })
  .from('.hi', {
    duration: 1.0,
    y: '7vw',
    ease: 'power3.out',
    onComplete: () => masterTl.play(),
  })
  .to('.box', { duration: 1, autoAlpha: 0.6, yoyo: true, repeat: -1, ease: "rough({ template: none.out, strength:  1, points: 20, taper: 'none', randomize: true, clamp: false})" })
  .to('.box', {
    duration: 1.0,
    height: '2vw',
    ease: 'elastic.out',
    y: '-35',
  });

let masterTl = gsap.timeline({ repeat: -1 }).pause();

words.forEach((word) => {
  let tl = gsap.timeline({ repeat: 1, yoyo: true, repeatDelay: 1 });
  tl.to('.text', { duration: 2, text: word });
  masterTl.add(tl);
});
