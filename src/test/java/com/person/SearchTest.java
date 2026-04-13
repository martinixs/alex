package com.person;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.testng.Assert;
import org.testng.annotations.Test;

// Наследуемся от BaseTest — драйвер уже настроен
public class SearchTest extends BaseTest {

    @Test
    public void searchAndSelectTest() {
        // Открыть страницу поиска
        driver.get(getUrl("search.html"));

        // Найти поле и ввести запрос
        WebElement input = wait.until(
                ExpectedConditions.visibilityOfElementLocated(By.id("search-input"))
        );
        input.sendKeys("java");

        // Нажать кнопку
        driver.findElement(By.id("search-btn")).click();

        // Ждать пропадания лоадера
        wait.until(
                ExpectedConditions.invisibilityOfElementLocated(By.id("loader"))
        );

        // Выбрать первый результат
        WebElement firstResult = wait.until(
                ExpectedConditions.visibilityOfElementLocated(By.id("result-0"))
        );

        String resultText = firstResult.getText();
        firstResult.click();

        // Проверить результат
        WebElement selected = wait.until(
                ExpectedConditions.visibilityOfElementLocated(By.id("selected-result"))
        );

        Assert.assertEquals(selected.getText(), "Выбрано: " + resultText);
    }
}