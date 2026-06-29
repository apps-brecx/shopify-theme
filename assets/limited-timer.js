(function () {
  // Only on Limited Time Offers collection
  if (!location.pathname.includes("/collections/limited-time-offers")) return;

  function getDiscountFromTags(tags) {
    if (!Array.isArray(tags)) return null;

    const tag = tags.find(t => /^badge_\d+off$/i.test(t));
    if (!tag) return null;

    return tag.match(/\d+/)[0]; // extract number
  }

  async function injectDiscountBadges() {
    const cards = document.querySelectorAll(".spf-product-card");
    if (!cards.length) return;

    for (const card of cards) {
      if (card.querySelector(".badge-20off")) continue;

      const link = card.querySelector('a[href*="/products/"]');
      if (!link) continue;

      const handle = link.getAttribute("href").split("/products/")[1]?.split("?")[0];
      if (!handle) continue;

      try {
        const res = await fetch(`/products/${handle}.js`);
        const product = await res.json();

        const discount = getDiscountFromTags(product.tags);
        if (!discount) continue;

        const imgWrap =
          card.querySelector(".spf-product-card__image-wrapper") ||
          card.querySelector(".spf-product-card__image") ||
          card.querySelector(".spf-product-card__inner") ||
          card;

        imgWrap.style.position = "relative";

        const badge = document.createElement("div");
        badge.className = "badge-20off";
        badge.textContent = `${discount}% OFF`;

        imgWrap.appendChild(badge);

      } catch (e) {
        // silent fail
      }
    }
  }

  // Globo re-renders → poll
  setInterval(injectDiscountBadges, 800);
})();

(function () {
  // Only run on Limited Time Offers collection
  if (!location.pathname.includes("/collections/limited-time-offers")) return;

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function findDealEndTag(tags) {
    if (!Array.isArray(tags)) return null;
    const t = tags.find(tag => tag.startsWith("deal_end:"));
    return t ? t.replace("deal_end:", "").trim() : null;
  }

  async function injectTimers() {
    const cards = document.querySelectorAll(".spf-product-card");
    if (!cards.length) return;

    for (const card of cards) {
      // ✅ HARD STOP: already processed
      if (card.dataset.timerInit === "1") continue;
      card.dataset.timerInit = "1";

      const link = card.querySelector('a[href*="/products/"]');
      if (!link) continue;

      const handle = link.href.split("/products/")[1]?.split("?")[0];
      if (!handle) continue;

      try {
        const res = await fetch(`/products/${handle}.js`);
        const product = await res.json();

        const endStr = findDealEndTag(product.tags);
        if (!endStr) return;

        const end = new Date(endStr);
        if (isNaN(end.getTime())) return;

        const info = card.querySelector(".spf-product__info") || card;

        // ✅ Remove any stray timers (extra safety)
        info.querySelectorAll(".limited-timer").forEach(el => el.remove());

        const timer = document.createElement("div");
        timer.className = "limited-timer";
        timer.innerHTML = `
          <span class="limited-timer__label">Limited Time Deal</span>
          <span class="limited-timer__countdown">00:00:00</span>
        `;
        info.appendChild(timer);

        const out = timer.querySelector(".limited-timer__countdown");

        function tick() {
          const diff = end - new Date();
          if (diff <= 0) {
            clearInterval(timer._interval);
            timer.remove();
            return;
          }

          const totalSeconds = Math.floor(diff / 1000);
          const hours = Math.floor(totalSeconds / 3600);
          const minutes = Math.floor((totalSeconds % 3600) / 60);
          const seconds = totalSeconds % 60;

          out.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
        }

        tick();

        // ✅ Store interval on element so it can’t duplicate
        timer._interval = setInterval(tick, 1000);

      } catch (e) {
        // fail silently
      }
    }
  }

  // ✅ Controlled polling (safe with Globo)
  setInterval(injectTimers, 1200);
})();