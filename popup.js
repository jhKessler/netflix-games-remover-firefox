const toggleSwitch = document.getElementById('toggleSwitch');
const toggleStatus = document.getElementById('toggleStatus');

toggleSwitch.addEventListener('change', function() {
  browser.tabs.query({ active: true, currentWindow: true }).then(tabs => {
    browser.tabs.sendMessage(tabs[0].id, { command: "toggle" }).then(response => {
      if (response && typeof response.enabled !== 'undefined') {
        toggleStatus.textContent = response.enabled ? 'Enabled' : 'Disabled';
      }
    });
  });
});

browser.tabs.query({ active: true, currentWindow: true }).then(tabs => {
  browser.tabs.sendMessage(tabs[0].id, { command: "status" }).then(response => {
    if (response && typeof response.enabled !== 'undefined') {
      toggleSwitch.checked = response.enabled;
      toggleStatus.textContent = response.enabled ? 'Enabled' : 'Disabled';
    }
  });
});
