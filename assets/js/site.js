/* ==========================================================================
   Greedy navigation: moves masthead links that don't fit into a dropdown.
   Based on http://codepen.io/lukejacksonn/pen/PwmwWV
   ========================================================================== */

(function () {
  var nav = document.getElementById("site-nav");
  if (!nav) return;

  var btn = nav.querySelector("button");
  var vlinks = nav.querySelector(".visible-links");
  var hlinks = nav.querySelector(".hidden-links");
  var breaks = [];

  function availableSpace() {
    return btn.classList.contains("hidden") ? nav.offsetWidth : nav.offsetWidth - btn.offsetWidth - 30;
  }

  function lastMovableLink() {
    var items = vlinks.querySelectorAll(":scope > li:not(.persist)");
    return items[items.length - 1];
  }

  function updateNav() {
    if (vlinks.offsetWidth > availableSpace()) {
      // The visible list is overflowing the nav
      while (vlinks.offsetWidth > availableSpace() && lastMovableLink()) {
        breaks.push(vlinks.offsetWidth);
        hlinks.insertBefore(lastMovableLink(), hlinks.firstChild);
        btn.classList.remove("hidden");
      }
    } else {
      // There is space for another item in the nav
      while (breaks.length > 0 && availableSpace() > breaks[breaks.length - 1]) {
        vlinks.appendChild(hlinks.firstElementChild);
        breaks.pop();
      }
      if (breaks.length < 1) {
        btn.classList.add("hidden");
        btn.classList.remove("close");
        hlinks.classList.add("hidden");
      }
    }
    btn.setAttribute("count", breaks.length);
  }

  btn.addEventListener("click", function () {
    hlinks.classList.toggle("hidden");
    btn.classList.toggle("close");
  });

  window.addEventListener("resize", updateNav);
  updateNav();
})();

/* ==========================================================================
   Back-to-top button
   ========================================================================== */

(function () {
  var topBtn = document.getElementById("scroll-to-top");
  if (!topBtn) return;

  window.addEventListener("scroll", function () {
    topBtn.classList.toggle("show", window.scrollY > 300);
  });

  topBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
})();

/* ==========================================================================
   Publications: toggle the venue and summary boxes under each paper.
   Opening one box closes the other box of the same paper.
   ========================================================================== */

document.querySelectorAll(".pub-list .meta-btn[data-toggle]").forEach(function (btn) {
  var item = btn.closest("li");
  var target = item && item.querySelector(".info-box--" + btn.dataset.toggle);
  if (!target) {
    btn.disabled = true;
    return;
  }

  btn.addEventListener("click", function () {
    var open = !target.classList.contains("open");

    item.querySelectorAll(".info-box").forEach(function (box) {
      box.classList.remove("open");
    });
    item.querySelectorAll(".meta-btn[data-toggle]").forEach(function (b) {
      b.setAttribute("aria-expanded", "false");
    });

    target.classList.toggle("open", open);
    btn.setAttribute("aria-expanded", String(open));
  });
});

/* ==========================================================================
   Footer "Last Updated": show the date of the latest commit to the site's
   repository. The build date rendered by Jekyll stays as the fallback.
   ========================================================================== */

(function () {
  var el = document.getElementById("last-updated");
  if (!el || !el.dataset.repo || !window.fetch) return;

  fetch("https://api.github.com/repos/" + el.dataset.repo + "/commits?per_page=1")
    .then(function (res) { return res.ok ? res.json() : null; })
    .then(function (commits) {
      var date = commits && commits[0] && new Date(commits[0].commit.committer.date);
      if (!date || isNaN(date)) return;
      el.setAttribute("datetime", date.toISOString());
      el.textContent = date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    })
    .catch(function () {});
})();
