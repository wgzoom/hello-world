//var p = require('process');

//var dCode = p.argv.splice(2)[0];
//require('console').log('Your code is: %s', dCode);

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var token;
var driver;

var webdriver = require('selenium-webdriver'), By = webdriver.By, until = webdriver.until;

rl.question('Please input your dynamic token: ', (answer) => {
  token = answer;
  rl.close();
  console.log("Your dynamic token is: '" + token + "'");
  loginFirst();
});

function loginFirst() {
	driver = new webdriver.Builder()
	.forBrowser('ie')
	.build();
	driver.get('https://cn.wmremote.com');
	driver.getTitle().then(function(title) {
	  console.log('Page title is: ' + title);
	});
	driver.wait(until.titleIs('Instant Virtual Extranet'), 10000);
	//console.log('first page loaded');
	var eleUser = driver.findElement(By.name('username'));
	//eleUser.sendKeys('ldeng7');
	driver.executeScript("document.frmLogin.username.value ='ldeng7';");
	driver.findElement(By.name('password')).sendKeys('Cmsland1' + token);
	eleUser.submit();
	//driver.findElement(By.name('btnSubmit')).click();
	//var but = driver.wait(until.elementLocated(By.id('special'), 10000));
	//console.log('button found!');
	//but.click();
	
	
	driver.wait(driver.isElementPresent(By.id('special')).then(loginSecond), 20000);
}

function loginSecond() {
	driver.wait(driver.isElementPresent(By.id('special')).then(function(){
		console.log('goning to second page...');
		driver.executeScript("document.getElementById('password').value ='??????';document.frmLogin.submit();");
		driver.wait(until.titleIs('abc'), 10000);
	}
	), 20000);
	//driver.quit();
}
	
