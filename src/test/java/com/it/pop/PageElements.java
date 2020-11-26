package com.it.pop;

import org.openqa.selenium.*;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

public class PageElements extends BaseClass{
    public void ClickLinkItem(String menu)
    {
        driver.findElement(By.xpath("//a[contains(text(),'"+menu+"')]")).click();
    }

    public void CheckTitle(String title){
        assertEquals(title,driver.getTitle());
    }

    public void ClickElementXpath(String xpath){
        driver.findElement(By.xpath(xpath)).click();
    }

    public void ClickElementByCss(String css){
        driver.findElement(By.cssSelector(css)).click();
    }
    public void CheckUrl(String url){
        assertEquals(url,driver.getCurrentUrl());
    }
    public void ClickElementById(String id){
        driver.findElement(By.id(id)).click();
    }

    public void EnterText(String locator,String text){//Make sure to use only xpath
        driver.findElement(By.xpath(locator)).sendKeys(text);
    }

    public void CompareTextFilter(String value){
        assertEquals(value,driver.findElement(By.xpath("//section[@id='js-active-search-filters']/ul/li")).getText());
    }
    public void ClearFilter(){
        ClickElementXpath("//div[2]/div[2]/div/button");
    }

    public  void waitForClearAllButtn(){
        WebDriverWait wait = new WebDriverWait(driver, 10);
        WebElement element = wait.until(ExpectedConditions.visibilityOfElementLocated (By.xpath("//div[2]/div[2]/div/button")));
    }



}
