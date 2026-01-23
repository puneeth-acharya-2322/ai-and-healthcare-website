$("#cat-1").owlCarousel({
  items: 33,
  loop: !0,
  margin: 15,
  nav: !1,
  dots: !1,
  autoplay: !0,
  slideTransition: "linear",
  autoplayTimeout: 2e3,
  autoplaySpeed: 2e3,
  responsive: { 0: { items: 2 }, 600: { items: 3 }, 1e3: { items: 3 } },
}),
  $("#cat-2").owlCarousel({
    items: 3,
    loop: !0,
    margin: 15,
    nav: !1,
    dots: !1,
    autoplay: !0,
    slideTransition: "linear",
    autoplayTimeout: 2e3,
    autoplaySpeed: 2e3,
    rtl: !0,
    responsive: { 0: { items: 2 }, 600: { items: 3 }, 1e3: { items: 3 } },
  }),
  $("#cat-3").owlCarousel({
    items: 4,
    loop: !0,
    margin: 20,
    nav: !0,
    dots: !1,
    autoplay: !0,
    autoplayTimeout: 2e3,
    autoplaySpeed: 2e3,
    responsive: { 0: { items: 1 }, 600: { items: 3 }, 1e3: { items: 4 } },
  }),
  $("#cat-4").owlCarousel({
    items: 4,
    loop: !0,
    margin: 20,
    nav: !0,
    dots: !1,
    autoplay: !0,
    autoplayTimeout: 2e3,
    autoplaySpeed: 2e3,
    responsive: { 0: { items: 1 }, 600: { items: 3 }, 1e3: { items: 4 } },
  }),
  $("#cat-5").owlCarousel({
    items: 4,
    loop: !0,
    margin: 20,
    nav: !0,
    dots: !1,
    autoplay: !0,
    autoplayTimeout: 2e3,
    autoplaySpeed: 2e3,
    responsive: { 0: { items: 1 }, 600: { items: 3 }, 1e3: { items: 4 } },
  }),
  $("#cat-6").owlCarousel({
    items: 4,
    loop: !1,
    margin: 20,
    nav: !0,
    dots: !1,
    autoplay: !1,
    autoplayTimeout: 2e3,
    autoplaySpeed: 2e3,
    responsive: { 0: { items: 1 }, 600: { items: 3 }, 1e3: { items: 4 } },
  }),
  $("#cat-7").owlCarousel({
    items: 33,
    loop: !0,
    margin: 15,
    nav: !1,
    dots: !1,
    autoplay: !0,
    slideTransition: "linear",
    autoplayTimeout: 2e3,
    autoplaySpeed: 2e3,
    responsive: { 0: { items: 2 }, 600: { items: 3 }, 1e3: { items: 3 } },
  }),
  $("#cat-8").owlCarousel({
    items: 3,
    loop: !0,
    margin: 15,
    nav: !1,
    dots: !1,
    autoplay: !0,
    slideTransition: "linear",
    autoplayTimeout: 2e3,
    autoplaySpeed: 2e3,
    rtl: !0,
    responsive: { 0: { items: 2 }, 600: { items: 3 }, 1e3: { items: 3 } },
  }),
  $("#cat-9").owlCarousel({
    items: 1,
    loop: !0,
    margin: 20,
    nav: !0,
    dots: !1,
    autoplay: !1,
  });

document.addEventListener('DOMContentLoaded', function () {
    // UTM Script

    const params = new URLSearchParams(window.location.search);

    // Exit if no UTM params
    if (![...params.keys()].some(k => k.startsWith('utm_'))) return;

    const links = document.querySelectorAll('a');

    links.forEach(link => {
        const href = link.getAttribute('href')      ;

        // Skip empty or anchor links
        if (!href || href.startsWith('#')) return;

        try {
            const url = new URL(href, window.location.origin);

            // Append ONLY UTM params
            params.forEach((value, key) => {
                if (key.startsWith('utm_')) {
                    url.searchParams.set(key, value);
                }
            });

            link.href = url.toString();

        } catch (e) {
            console.warn('Invalid URL skipped:', href);
        }
    });    
});