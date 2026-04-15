package com.person;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;

import java.time.Duration;

public class BaseTest {

    protected WebDriver driver;
    protected WebDriverWait wait;

    // Читаем из properties
    private static final String DRIVER_PATH = ConfigReader.get("webdriver.chrome.driver");
    private static final String BASE_URL = ConfigReader.get("base.url");
    private static final int TIMEOUT = ConfigReader.getInt("webdriver.timeout");

    @BeforeMethod
    public void setUp() {
        // Путь из properties
        System.setProperty("webdriver.chrome.driver", DRIVER_PATH);

        ChromeOptions options = new ChromeOptions();
        options.addArguments("--start-maximized");
        // options.addArguments("--headless");

        driver = new ChromeDriver(options);
        wait = new WebDriverWait(driver, Duration.ofSeconds(TIMEOUT));

        // Открыть базовый URL
        driver.get(BASE_URL);
    }

    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }

    // Получить полный URL страницы
    public String getUrl(String page) {
        return BASE_URL + "/" + page;
    }
}