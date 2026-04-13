package com.person;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import org.testng.annotations.Test;

import java.time.Duration;

public class LoginTest extends BaseTest {

    @Test
    public void successLoginTest() {
        driver.get(getUrl("/"));

        wait.until(
                ExpectedConditions.visibilityOfElementLocated(By.id("username"))
        ).sendKeys("admin");

        driver.findElement(By.id("password")).sendKeys("1234");
        driver.findElement(By.id("login-btn")).click();

        WebElement message = wait.until(
                ExpectedConditions.visibilityOfElementLocated(By.id("message"))
        );

        Assert.assertEquals(message.getText(), "Успешный вход!");
    }

    @Test
    public void failLoginTest() {
        driver.get("http://localhost:8080");

        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        driver.findElement(By.id("username")).sendKeys("wronguser");
        driver.findElement(By.id("password")).sendKeys("wrongpass");
        driver.findElement(By.id("login-btn")).click();

        WebElement message = wait.until(
                ExpectedConditions.visibilityOfElementLocated(By.id("message"))
        );

        Assert.assertEquals(message.getText(), "Неверный логин или пароль!");
    }
}