// Demo-only theme switcher. Sets <html data-theme> and remembers the choice.
(function () {
  var K = "dinsor-theme", root = document.documentElement;
  try { var saved = localStorage.getItem(K); if (saved) root.setAttribute("data-theme", saved); } catch (e) {}
  document.addEventListener("DOMContentLoaded", function () {
    var select = document.getElementById("theme");
    if (!select) return;
    select.value = root.getAttribute("data-theme") || "emerald";
    select.addEventListener("change", function () {
      root.setAttribute("data-theme", select.value);
      try { localStorage.setItem(K, select.value); } catch (e) {}
    });
  });
})();
