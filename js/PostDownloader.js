const puppeteer = require("puppeteer");
const BASE_URL = "https://www.instagram.com/accounts/login/?source=auth_switcher";
function start() {
  try {
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
      document.getElementById("log").innerHTML = "Loaded Instagram";
 
      await instagramPage.waitFor(1000);
      // writing username and password to the site////////////////////////////////////////////////////////////////////////////////
      await instagramPage.type('input[name="username"]', username, {
         delay: 55
       });
       document.getElementById("log").innerHTML = "Entered Username";
       await instagramPage.type('input[name="password"]', password, {
         delay: 55
       });
       document.getElementById("log").innerHTML = "Entered Password";
 
     // clcking on the login Button//////////////////////////////////////////////////////////////////////////////////////////////
      loginButton = await instagramPage.$x('//div[contains(text(), "Log In")]');
      await loginButton[0].click();
  
      await instagramPage.waitForNavigation({ waitUntil: "networkidle2" });
      await instagramPage.waitFor('a > svg[aria-label="Profile"]');
      document.getElementById("log").innerHTML ="Logged In";
  
      await instagramPage.waitFor(1000);

      await instagramPage.goto(url, { waitUntil: "networkidle2" });
      await instagramPage.waitFor(3000);
 
      const element = await instagramPage.$('div[class="_9AhH0"]');
      await element.screenshot({ path: 'post.png' }).then(document.getElementById("log").innerHTML =  "The image was successfully downloaded </br> and saved as 'post.png' in the main folder"); 

        await browser.close();
  })();
}
catch(error) {
  document.getElementById("log").innerHTML ="error go back and retry" + "<br>" + error;
}
}
