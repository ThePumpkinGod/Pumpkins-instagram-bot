const puppeteer = require("puppeteer");
const BASE_URL = "https://www.instagram.com/accounts/login/?source=auth_switcher"; // 
const TAG_URL = tag => `https://www.instagram.com/explore/tags/${tag}/`;
const { webContents } = require('electron')

function start() {
  try {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var num = document.getElementById("likenum").value;
    var num = Number(num);

    var tags = document.getElementById("tags").value;
    var tags = tags.split(',');

    document.getElementById("info").innerHTML = `<b>username:</b> ${username} <br> <b>password:</b> no peeking <br> <b>tags:</b> ${tags} <br> ${num}`;
    document.getElementById("log").innerHTML = `the logs will be shown here soon`;

    (async () => {
        const browser = await puppeteer.launch({
            headless: true,
            args: ["--start-maximized"]
          });
          // creating a new browser and a new page with the BASE_URL //////////////////////////////////////////////////////////////////
         const instagramPage = await browser.newPage();
         await instagramPage.setViewport({ width: 1920, height: 1080 });
         await instagramPage.goto(BASE_URL, { waitUntil: "networkidle2" });
         document.getElementById("log").innerHTML = `entered instagram`;
    
         await instagramPage.waitFor(1000);
    /*
          // clicking on the login text ////////////////////////////////////////////////////////////////////////////////////////////////
         let loginButton = await instagramPage.$x('//a[contains(text(), "Log in")]');
         await loginButton[0].click();
    
         await instagramPage.waitForNavigation({ waitUntil: "networkidle2" });
         await instagramPage.waitFor(3000);
    */
         // writing username and password to the site////////////////////////////////////////////////////////////////////////////////
         await instagramPage.type('input[name="username"]', username, {
            delay: 55
          });
          document.getElementById("log").innerHTML = "i entered the username" ;
          await instagramPage.type('input[name="password"]', password, {
            delay: 55
          });
          document.getElementById("log").innerHTML = "i entered the password" ;
    
         // clcking on the login Button//////////////////////////////////////////////////////////////////////////////////////////////
          loginButton = await instagramPage.$x('//div[contains(text(), "Log In")]');
          await loginButton[0].click();
      
          await instagramPage.waitForNavigation({ waitUntil: "networkidle2" });
          await instagramPage.waitFor('a > svg[aria-label="Profile"]');
          document.getElementById("log").innerHTML = "Logged in !";
      
          await instagramPage.waitFor(1000);
    
          for (let tag of tags) {
          // go to the tag page//////////////////////////////////////////////////////////////////////////////////////////////////////
            await instagramPage.goto(TAG_URL(tag), { waitUntil: "networkidle2" });
            await instagramPage.waitFor(1000);
    
            let posts = await instagramPage.$$('article > div:nth-child(3) img[decoding="auto"]');
            
            for (let i = 0; i < num; i++) {
                let post = posts[i];
        
                // click on the post/////////////////////////////////////////////////////////////////////////////////////////////////////
                await post.click();
        
                // wait for the module to appar//////////////////////////////////////////////////////////////////////////////////////////
                await instagramPage.waitFor('div[role="dialog"]');
                await instagramPage.waitFor(1000);
        
                let isLikeble = await instagramPage.$('span[aria-label="Like"]');
        
                if (isLikeble) {
                   await instagramPage.click('span[aria-label="Like"]');
                   var name = await instagramPage.$('a[class="FPmhX notranslate nJAzx"]');
                   var name = await instagramPage.evaluate(name => name.innerText, name);
        
                   document.getElementById("log").innerHTML =`I liked the picture ${instagramPage.url()} by ${name}`;
        /*
                   if(followUser === true){
                    await instagramPage.waitFor(5000);
                    await instagramPage.click('button[class="oW_lN sqdOP yWX7d    y3zKF     "]');
                    document.getElementById("log").innerHTML =`i followed ${name}`;
                   }
        
                   if(moreInfo === true){
                   var bio = await instagramPage.$('div[class="C4VMK"] > span');
                   var bio = await instagramPage.evaluate(bio => bio.innerText, bio);
        
                   var time = await instagramPage.$('time[class="FH9sR Nzb55"]');
                   var time = await instagramPage.evaluate(time => time.innerText, time);
        
                   document.getElementById("log").innerHTML =`Bio: \n ${bio} \n time posted : ${time}`;
                   document.getElementById("log").innerHTML ='\n--------------------------------------------------------------------------------------------\n';
                   }
        */
                }else{
                  document.getElementById("log").innerHTML ="post aready liked!";
                }
                await instagramPage.waitFor(2000);
        
                // close the module/////////////////////////////////////////////////////////////////////////////////////////////
        
                let closeButtonModle = await instagramPage.$x('//button[contains(text(), "Close")]');
    
                await closeButtonModle[0].click();
                await instagramPage.waitFor(2000);
              }
              await instagramPage.waitFor(15000);
              document.getElementById("log").innerHTML ="waiting 15 sec until next hashtag";
            }
            document.getElementById("log").innerHTML ="done! closing the bot click start to start again";
            await browser.close();
      })();
    } catch (error) {
      document.getElementById("log").innerHTML ="error go back and retry" + "<br>" + error;
    }
  }