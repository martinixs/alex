package com.person;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.testng.annotations.Test;

import java.time.Duration;

import static com.person.TimeSleep.*;

public class CaseOpenApp extends BaseTest {


    @Test
    public void successLoginTest() throws InterruptedException {
        driver.get(getUrl("/"));

        wait.until(
                ExpectedConditions.visibilityOfElementLocated(By.id("login"))
        ).sendKeys("admin");
        Thread.sleep(TWO_SECOND); //

        driver.findElement(By.id("password")).sendKeys("1234");

        Thread.sleep(TWO_SECOND); // ← пауза 2 секунды

        driver.findElement(By.id("signin")).click();

        wait.until(
                ExpectedConditions.visibilityOfElementLocated(
                        By.xpath("//div[@class='hero-title']"))

        );

        Thread.sleep(TWO_SECOND); //
        driver.findElement(By.xpath("//div[@class='app-card']/div/button[contains(@onclick, 'Приложение ЕУФР')]"))
                .click();

        Thread.sleep(TWO_SECOND); //
       wait.until(
                ExpectedConditions.visibilityOfElementLocated(
                        By.xpath("//button[@class='btn-open-app']"))
        );
        Thread.sleep(TWO_SECOND);

        driver.findElement(By.xpath("//button[@class='panel-tab-btn' and contains(text(), 'Релизы')]")).click();
        Thread.sleep(TWO_SECOND);

        driver.findElement(By.xpath("//button[contains(text(), 'О приложении')]")).click();
        Thread.sleep(TWO_SECOND);

        driver.findElement(By.xpath("//button[@class='btn-open-app']")).click();

        Thread.sleep(TWO_SECOND); //

        wait.until(
                ExpectedConditions.visibilityOfElementLocated(
                        By.xpath("//div[@class='page-title']"))

        );

        WebElement radio = driver.findElement(By.xpath("//input[@value='fl']"));
        JavascriptExecutor js = (JavascriptExecutor) driver;
        js.executeScript("arguments[0].click();", radio);


        Thread.sleep(TEN_SECOND); //

    }
}
