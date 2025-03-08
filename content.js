(function () {
  let enabled = true;
  let observerBillboard = null;
  let observerGameRow = null;

  function removeBillboard() {
    const el = document.querySelector(".billboard-row-games");
    if (el) el.remove();
  }

  function removeGameRow() {
    const el = document.querySelector(".mobile-games-row");
    if (el) el.remove();
  }

  function startObservers() {
    observerBillboard = new MutationObserver(() => {
      if (enabled) removeBillboard();
    });
    observerBillboard.observe(document.body, {
      childList: true,
      subtree: true,
    });
    removeBillboard();

    observerGameRow = new MutationObserver(() => {
      if (enabled) removeGameRow();
    });
    observerGameRow.observe(document.body, { childList: true, subtree: true });
    removeGameRow();
  }

  function stopObservers() {
    if (observerBillboard) observerBillboard.disconnect();
    if (observerGameRow) observerGameRow.disconnect();
  }

  function updateObservers() {
    if (enabled) {
      startObservers();
    } else {
      stopObservers();
    }
  }

  function loadState() {
    console.log("loadState", browser.storage.local.get("blockGames"));
    return browser.storage.local.get("blockGames").then((data) => {
      enabled = typeof data.blockGames !== "undefined" ? data.blockGames : true;
    });
  }

  function saveState() {
    return browser.storage.local.set({ blockGames: enabled });
  }

  browser.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.command === "toggle") {
      enabled = !enabled;
      saveState().then(() => {
        updateObservers();
        sendResponse({ enabled });
      });
      return true;
    }
  });

  loadState().then(() => {
    updateObservers();
  });
})();
