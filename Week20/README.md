学习笔记

### 持續集成

- daily build

- BVT- build verification test

- lint - code style check

  - 放到pre-commit中
  - chmod -x pre-commit -  執行的權限

- git hooks的基本用法 - hook 函數

  - 以sample结尾的不會執行

- git stash 機制

  - git stash push -k
  - Git stash pop

- phatomJS過時

- chrome 的headless模式

  - Puppeteer

  - ```
    alias chrome="/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome"
    
    chrome --headless
    chrome --headless --dump-dom about:blank
    ```

  

### 学习总结

```
發佈系統的這兩週是利用工具進行git oauth權限驗證，實作 client,server與publisher-server的系統間的發佈流程
CD/CI 這部份的經驗分享很好，讓我看到了很多關於team work 完成CD / CI 的更多有用的方法來協助完善。像是 pre-commit、eslint、child-process
可以完成檢查commit code的規模。 
```



