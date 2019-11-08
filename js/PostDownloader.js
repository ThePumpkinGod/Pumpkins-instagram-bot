const puppeteer = require("puppeteer");
const BASE_URL = "https://www.instagram.com/accounts/login/?source=auth_switcher";

function start() {
var url = document.getElementById("url").value;
var username = document.getElementById("username").value;
var password = document.getElementById("password").value;

(async () => {
    const browser = await puppeteer.launch({
        headless: true,
        args: ["--start-maximized"]
      });
      // creating a new browser and a new page with the BASE_URL //////////////////////////////////////////////////////////////////
     const instagramPage = await browser.newPage();
     await instagramPage.setViewport({ width: 1920, height: 1080 });
     await instagramPage.goto(BASE_URL, { waitUntil: "networkidle2" });
     document.getElementById("log").innerHTML = "i entered instagram";

     await instagramPage.waitFor(1000);
     // writing username and password to the site////////////////////////////////////////////////////////////////////////////////
     await instagramPage.type('input[name="username"]', username, {
        delay: 55
      });
      document.getElementById("log").innerHTML = "i entered the username";
      await instagramPage.type('input[name="password"]', password, {
        delay: 55
      });
      document.getElementById("log").innerHTML = "i entered the password";

     // clcking on the login Button//////////////////////////////////////////////////////////////////////////////////////////////
      loginButton = await instagramPage.$x('//div[contains(text(), "Log In")]');
      await loginButton[0].click();
  
      await instagramPage.waitForNavigation({ waitUntil: "networkidle2" });
      await instagramPage.waitFor('a > svg[aria-label="Profile"]');
      document.getElementById("log").innerHTML ="Logged in !";
  
      await instagramPage.waitFor(1000);

      await instagramPage.goto(url, { waitUntil: "networkidle2" });
      await instagramPage.waitFor(3000);
 
      await instagramPage.screenshot({path: 'post.png',  clip: {x: 485, y: 218, width: 600, height: 600}}).then(document.getElementById("log").innerHTML = "took a pic saved as post.png in the softwere files!"); 

        await browser.close();
  })();
}