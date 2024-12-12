// Importierte Module
const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

describe('Login-Tests mit Selenium', function () {
  let driver;

  // Setup der Testumgebung vor den Tests
  before(async function () {
    driver = await new Builder().forBrowser('chrome').build();
  });

  // Schließen des Browsers nach den Tests
  after(async function () {
    await driver.quit();
  });

  // Testfall: Erfolgreicher Login
  it('Erfolgreicher Login', async function () {
    await driver.get('https://seleniumbase.io/simple/login');

    await driver.findElement(By.name('username')).sendKeys('demo_user');
    await driver.findElement(By.name('password')).sendKeys('secret_password');
    await driver.findElement(By.css('button[type="submit"]')).click();

    // Warte auf die Weiterleitung und überprüfe den Seitentitel
    await driver.wait(until.titleIs('Dashboard'), 5000);
    const title = await driver.getTitle();
    assert.strictEqual(title, 'Dashboard');
  });

  // Testfall: Ungültige Anmeldedaten
  it('Ungültige Anmeldedaten', async function () {
    await driver.get('https://seleniumbase.io/simple/login');

    await driver.findElement(By.name('username')).sendKeys('wrong_user');
    await driver.findElement(By.name('password')).sendKeys('wrong_password');
    await driver.findElement(By.css('button[type="submit"]')).click();

    // Warte auf die Fehlermeldung und überprüfe den Text
    const errorMessage = await driver.findElement(By.css('.error-message')).getText();
    assert.strictEqual(errorMessage, 'Invalid username or password');
  });

  // Testfall: Leere Felder
  it('Leere Felder', async function () {
    await driver.get('https://seleniumbase.io/simple/login');

    await driver.findElement(By.css('button[type="submit"]')).click();

    // Überprüfe, ob eine Fehlermeldung für den Benutzernamen angezeigt wird
    const usernameError = await driver.findElement(By.css('.username-error')).getText();
    assert.strictEqual(usernameError, 'The Username is Required!');

    // Überprüfe, ob eine Fehlermeldung für das Passwort angezeigt wird
    const passwordError = await driver.findElement(By.css('.password-error')).getText();
    assert.strictEqual(passwordError, 'The Password is Required!');
  });
});
