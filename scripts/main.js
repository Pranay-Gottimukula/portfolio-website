document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Thanks for reaching out! I'll get back to you soon.");
      form.reset();
    });
  }

  // Smooth scroll with offset for navbar links
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (href === "#" || href === "") return;
      
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        e.preventDefault();
        const headerHeight = 70; // Height of navbar
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
