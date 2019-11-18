const puppeteer = require("puppeteer");
const BASE_URL = "https://www.instagram.com/accounts/login/?source=auth_switcher";
function start() {
try{
var username = document.getElementById("username").value;
var password = document.getElementById("password").value;

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
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
  
      // go to your profile and get a list of all the followers //////////////////////////////////////////////////////////////////
      await instagramPage.waitFor(1000);
      const Following_URL = `https://www.instagram.com/${username}`;
  
      await instagramPage.goto(Following_URL, { waitUntil: "networkidle2" });
      await instagramPage.waitFor(2000);

      followersButton = await instagramPage.$('ul[class="k9GMp "] > li[class="Y8-fY "]:nth-child(3) > a[class="-nal3 "]'); // error here !
      await followersButton.click();

      document.getElementById("log").innerHTML ="I can see all your followers";
      await instagramPage.waitFor(5000);

      var followers = await instagramPage.$$('div[class="isgrP"] > ul[class="jSC57  _6xe7A"] > div[class="PZuss"] a[class="FPmhX notranslate _0imsa "]');
      
      document.getElementById("log").innerHTML =`you got ${followers.length} followers`;

      console.log(followers[3]);

      var i = 0;
      while(i < 22){
        document.getElementById("log").innerHTML = followers[i] + ` [${i}]`;
        debugger;
        i = i+1;
      }

      // start on a loop to see if they follow you or not

       await browser.close();
  })();
  }catch(error) {
    document.getElementById("log").innerHTML ="error go back and retry" + "<br>" + error;
  }
}