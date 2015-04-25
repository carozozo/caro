# Caro.js
通用函式 by caro

## 安裝

```bash
$ npm install caro
```

```javascript
var validator = require('caro');
caro.isArr(['caro']); // true
```

## CORE -
### console
- **log(msg, variable)** - 輸出有顏色的 console 訊息
- **log2(msg, variable)** - 輸出有顏色的 console 訊息
- **log3(msg, variable)** - 輸出有顏色的 console 訊息
### log
- **readLog(logPath)** - 讀取 .log 檔
- **writeLog(logPath, data)** - 寫入 .log 檔，如檔案已存在則覆寫
- **updateLog(logPath, data, opt)** - 如入資料至 .log 檔

## HELPER -
### array
- **extendArr(arr1, arr2, opt)** - 合併2個陣列
- **cloneArr(arr)** - 複製陣列
- **sortByObjKey(arr,key,sort)** - 如果陣列中的值是物件，則可指定物件的 key 值排序
- **sumOfArr(arr)** - 加總陣列中的數字
- **removeByIndex(arr,i)** - 依 index 移除陣列中的元素
- **removeByArrVal(arr,i)** - 依 value 移除陣列中的元素
- **removeDup(arr,i)** - 移除陣列中重覆的值
- **pushNoDup(arr,i)** - 不重覆 push 值至陣列
- **pushNoEmpty(arr,i)** - 如果值不為空值，才會 push 至陣列
- **hasEmptyInArr(arr,i)** - 判斷陣列中是否有空值