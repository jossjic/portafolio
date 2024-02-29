const browserDetect = () => {
  let agent = navigator.userAgent.toLowerCase();
  let browser = "";
  if (agent.indexOf("edge") > -1) {
    browser = "edge";
  } else if (agent.indexOf("chrome") > -1 && !!window.chrome) {
    browser = "chrome";
  } else if (agent.indexOf("safari") > -1) {
    browser = "safari";
  } else if (agent.indexOf("firefox") > -1) {
    browser = "firefox";
  } else if (agent.indexOf("opera") > -1 && !!window.opera) {
    browser = "opera";
  } else if (agent.indexOf("msie") > -1) {
    browser = "ie";
  } else {
    browser = "unknown";
  }
  document.body.classList.add(browser);
  document.querySelector(".waves").classList.add(browser);
};
