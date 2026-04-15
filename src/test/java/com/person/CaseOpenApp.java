package com.person;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.testng.annotations.Test;

public class CaseOpenApp extends BaseTest {
    @Test
    public void successLoginTest() {
        driver.get(getUrl("/"));

        wait.until(
                ExpectedConditions.visibilityOfElementLocated(By.id("login"))
        ).sendKeys("admin");

        driver.findElement(By.id("password")).sendKeys("1234");
        driver.findElement(By.id("signin")).click();

        wait.until(
                ExpectedConditions.visibilityOfElementLocated(
                        By.xpath("//div[@class='hero-title']"))

        );

        driver.findElement(By.xpath("//div[@class='card-top-label' and contains(text(), 'Продажи')]")).click();
        WebElement button = wait.until(
                ExpectedConditions.visibilityOfElementLocated(
                        By.xpath("//button[contains(text(), 'Открыть приложение')]"))

        );

        button.click();

        wait.until(
                ExpectedConditions.visibilityOfElementLocated(
                        By.xpath("//div[@class='page-title']"))

        );

        driver.findElement(By.id("fieldName")).sendKeys("Фтн ФИН");
        driver.findElement(By.id("fieldEufr")).sendKeys("EAH");

        driver.findElement(By.xpath("//button[@class='btn-search']")).click();

        try {
            Thread.sleep(3600);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }

    }
}
