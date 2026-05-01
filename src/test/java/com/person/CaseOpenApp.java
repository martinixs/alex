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

        Thread.sleep(ONE_AND_HALF); //

        driver.findElement(By.id("password")).sendKeys("1234");

        Thread.sleep(ONE_AND_HALF); // ← пауза 2 секунды

        driver.findElement(By.className("btn-login")).click();

        wait.until(
                ExpectedConditions.visibilityOfElementLocated(
                        By.xpath("//div[@class='hero-title']")));

        Thread.sleep(ONE_AND_HALF); //
        driver.findElement(By.xpath("//div[@class='app-card']/div/button[contains(@onclick, 'Приложение ЕРУФР')]"))
                .click();

        Thread.sleep(ONE_AND_HALF); //
        wait.until(
                ExpectedConditions.visibilityOfElementLocated(
                        By.xpath("//button[@class='btn-open-app']")));
        Thread.sleep(ONE_AND_HALF);

        driver.findElement(By.xpath("//button[@class='panel-tab-btn' and contains(text(), 'Релизы')]"))
                .click();
        Thread.sleep(ONE_AND_HALF);

        driver.findElement(By.xpath("//button[contains(text(), 'О приложении')]")).click();
        Thread.sleep(ONE_AND_HALF);

        driver.findElement(By.xpath("//button[@class='btn-open-app']")).click();

        Thread.sleep(ONE_AND_HALF); //

        wait.until(
                ExpectedConditions.visibilityOfElementLocated(
                        By.xpath("//div[@class='page-title']")));

        WebElement radio = driver.findElement(By.xpath("//input[@value='fl']"));
        JavascriptExecutor js = (JavascriptExecutor) driver;
        js.executeScript("arguments[0].click();", radio);


        Thread.sleep(ONE_AND_HALF);

        driver.findElement(By.id("addFL")).click();

        wait.until(
                ExpectedConditions.visibilityOfElementLocated(
                        By.xpath("//div[@class='modal-fl-header']")));

        driver.findElement(By.id("verify-surname")).sendKeys("Иванов");
        Thread.sleep(ONE_AND_HALF);

        driver.findElement(By.id("verify-name")).sendKeys("Иван");
        Thread.sleep(ONE_AND_HALF);

        driver.findElement(By.id("verify-midname")).sendKeys("Платонович");
        Thread.sleep(ONE_AND_HALF);

        driver.findElement(By.id("verify-inn")).sendKeys("569205585045");
        Thread.sleep(ONE_AND_HALF);

        driver.findElement(By.id("verify-snils")).sendKeys("631-137-298 65");
        Thread.sleep(ONE_AND_HALF);

        driver.findElement(By.xpath("//button[@class='btn-modal-verify']")).click();
        Thread.sleep(ONE_AND_HALF);

        wait.until(
                ExpectedConditions.visibilityOfElementLocated(
                        By.xpath("//div[contains(text(),'Создание нового физического лица')]")));

        driver.findElement(By.xpath("//input[@value='male']")).click();
        Thread.sleep(ONE_AND_HALF);

        driver.findElement(By.id("fl-dob")).sendKeys("30.05.1980");
        Thread.sleep(ONE_AND_HALF);


        driver.findElement(By.id("doc-number"))
                .sendKeys("1");
        Thread.sleep(ONE_AND_HALF);

        driver.findElement(By.id("doc-date"))
                .sendKeys("04.04.2024");
        Thread.sleep(ONE_AND_HALF);


        driver.findElement(By.id("doc-start-date"))
                .sendKeys("04.05.2024");
        Thread.sleep(ONE_AND_HALF);

        driver.findElement(By.xpath("//button[@class='btn-modal-save']"))
                .click();


        wait.until(
                ExpectedConditions.visibilityOfElementLocated(
                        By.xpath("//main[@class='person-main']")));

        driver.findElement(By.id("search-form")).click();
        Thread.sleep(ONE_AND_HALF);

        WebElement radio1 = driver.findElement(By.xpath("//input[@value='fl']"));
        JavascriptExecutor js1 = (JavascriptExecutor) driver;
        js1.executeScript("arguments[0].click();", radio1);
        Thread.sleep(FIVE_SECOND);

        driver.findElement(By.id("search_surname")).sendKeys("Иванов");
        Thread.sleep(ONE_AND_HALF);

        driver.findElement(By.id("search_first_name")).sendKeys("Иван");
        Thread.sleep(ONE_AND_HALF);

        driver.findElement(By.id("search_middle")).sendKeys("Платонович");
        Thread.sleep(ONE_AND_HALF);

        driver.findElement(By.id("findFl")).click();

        Thread.sleep(TEN_SECOND);

    }
}
