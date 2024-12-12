   // Testfall 2: Ungültige Anmeldedaten
   it('sollte Fehlermeldung bei falschen Anmeldedaten anzeigen', async function () {
    await driver.get(LOGIN_URL);

    // Felder ausfüllen und absenden
    await fillField('input[name="username"]', INVALID_USERNAME);
    await fillField('input[name="password"]', INVALID_PASSWORD);
    await clickButton('button[type="submit"]');

    // Fehlermeldung überprüfen
    const errorMessageElement = await driver.wait(until.elementLocated(By.css('.error-message')), 5000);
    const errorMessage = await errorMessageElement.getText();
    assert.strictEqual(errorMessage, 'Invalid username or password', 'Die Fehlermeldung bei ungültigen Anmeldedaten ist nicht korrekt.');
});