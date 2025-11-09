document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Thanks for reaching out! I'll get back to you soon.");
      form.reset();
    });
  }

  // Mobile menu toggle
  const mobileMenuButton = document.querySelector(".mobile-menu-button");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  if (mobileMenuButton && navMenu) {
    mobileMenuButton.addEventListener("click", () => {
      const isExpanded = mobileMenuButton.getAttribute("aria-expanded") === "true";
      mobileMenuButton.setAttribute("aria-expanded", !isExpanded);
      navMenu.classList.toggle("active");
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        mobileMenuButton.setAttribute("aria-expanded", "false");
        navMenu.classList.remove("active");
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!navMenu.contains(e.target) && !mobileMenuButton.contains(e.target)) {
        mobileMenuButton.setAttribute("aria-expanded", "false");
        navMenu.classList.remove("active");
      }
    });
  }

  // Smooth scroll with offset for navbar links
  const allNavLinks = document.querySelectorAll('a[href^="#"]');
  allNavLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (href === "#" || href === "") return;
      
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        e.preventDefault();
        const headerHeight = window.innerWidth <= 768 ? 70 : 80;
        const targetPosition = targetElement.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth"
        });
      }
    });
  });

  // Navbar scroll behavior: hide on scroll down, show on scroll up
  const header = document.querySelector("header");
  let lastScrollTop = 0;
  let scrollThreshold = 10; // Minimum scroll distance to trigger hide/show

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Only trigger if scrolled more than threshold
    if (Math.abs(scrollTop - lastScrollTop) < scrollThreshold) {
      return;
    }

    // Don't hide navbar on mobile if menu is open
    if (window.innerWidth <= 767 && navMenu && navMenu.classList.contains("active")) {
      return;
    }

    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // Scrolling down - hide navbar
      header.classList.remove("navbar-visible");
      header.classList.add("navbar-hidden");
    } else {
      // Scrolling up - show navbar
      header.classList.remove("navbar-hidden");
      header.classList.add("navbar-visible");
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For mobile or negative scrolling
  });
});
