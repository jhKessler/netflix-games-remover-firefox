(function() {
    function removeBillboard() {
      var el = document.querySelector(".billboard-row-games");
      if (el) el.remove();
    }

    function removeGameRow() {
      var el = document.querySelector(".mobile-games-row");
      if (el) el.remove();
    }

    var observer = new MutationObserver(removeBillboard);
    observer.observe(document.body, { childList: true, subtree: true });
    removeBillboard();

    var observer = new MutationObserver(removeGameRow);
    observer.observe(document.body, { childList: true, subtree: true });
    removeGameRow();
  })();
  