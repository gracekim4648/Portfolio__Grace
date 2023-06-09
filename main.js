'use strict';

// make navbar transparent when it's on top

const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  if (window.scrollY > navbarHeight) {
    navbar.classList.add('navbar--dark');
  } else {
    navbar.classList.remove('navbar--dark');
  }
});

// Handle scrolling when tapping on the navbar menu

const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (event) => {
  const target = event.target;
  const link = target.dataset.link;
  if (link == null) {
    return;
  }
  navbarMenu.classList.remove('open');
  scrollIntoView(link);
  // console.log(event.target.dataset.link);
});

//Navbar toggle button for small screen
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');
navbarToggleBtn.addEventListener('click', () => {
  navbarMenu.classList.toggle('open');
});

//Handle click on 'contact me' button on home

const homeContactMe = document.querySelector('.home__contact');
homeContactMe.addEventListener('click', () => {
  scrollIntoView('#contact');
});

// Home fading to transparent as scrolling down

const home = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  home.style.opacity = 1 - window.scrollY / homeHeight;
});

// Show "arrow up" button when scrolling down
const arrowUp = document.querySelector('.arrow-up');
document.addEventListener('scroll', () => {
  if (window.scrollY > homeHeight / 2) {
    arrowUp.classList.add('visible');
  } else {
    arrowUp.classList.remove('visible');
  }
});

// Handle click on the "arrow up" button
arrowUp.addEventListener('click', () => {
  scrollIntoView('#home');
});

// Projects
const workBtnContainer = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project');
workBtnContainer.addEventListener('click', (e) => {
  const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
  if (filter == null) {
    return;
  }

  //Remove selection from the previous item and select the new one

  const active = document.querySelector('.category__btn.selected');
  if (active != null) {
    active.classList.remove('selected');
  }
  const target =
    e.target.nodeName === 'BUTTON' ? e.target : e.target.parentNode;
  target.classList.add('selected');

  // console.log(filter);
  projectContainer.classList.add('anim-out');
  setTimeout(() => {
    projects.forEach((project) => {
      console.log(project.dataset.type);
      if (filter === '*' || filter === project.dataset.type) {
        project.classList.remove('invisible');
      } else {
        project.classList.add('invisible');
      }
    });
    projectContainer.classList.remove('anim-out');
  }, 300);
});

function scrollIntoView(selector) {
  const scrollTo2 = document.querySelector(selector);
  scrollTo2.scrollIntoView({ behavior: 'smooth' });
}

// 1. 모든 색션 요소들과 메뉴 아이템들을 가져 온다
// 2. IntersectionObserver를 이용해서 모든 색션들을 관찰 한다
// 3. 2 번을 통해서 관찰 된 보여지는 색션에 해당하는 메뉴 아이템을 활성화 시킨다

// const sectionIds = [
//   '#home',
//   '#about',
//   '#skills',
//   '#work',
//   '#testimonials',
//   '#contact',
// ];

// const sections = sectionIds.map((id) => document.querySelector(id));
// const navItems = sectionIds.map((id) =>
//   document.querySelector(`[data-link="${id}"]`)
// );
// // console.log(sections);

// //2

// let selectedNavIndex = 0;
// let selectedNavItem = navItems[0];
// function selectNavItem(selected) {
//   selectedNavItem.classList.remove('active');
//   selectedNavItem = selected;
//   selectedNavItem.classList.add('active');
// }

// const observerOptions = {
//   root: null,
//   rootMargin: '0px',
//   threshold: 0.3,
// };

// const observerCallback = (entries, observer) => {
//   entries.forEach((entry) => {
//     if (!entry.isIntersecting && entry.intersectionRatio > 0) {
//       const index = sectionIds.indexOf(`#${entry.target.id}`);
//       // scrolling down, page up
//       if (entry.boundingClientRect.y < 0) {
//         selectedNavIndex = index + 1;
//       } else {
//         selectedNavIndex = index - 1;
//       }
//     }
//   });
// };
// const observer = new IntersectionObserver(observerCallback, observerOptions);
// sections.forEach((section) => observer.observe(section));
