# Caro.js
通用函式 by caro

## 安裝及使用##

```bash
$ npm install caro
```

```javascript
var validator = require('caro');
caro.isArr(['caro']); // true
```

***

## HELPER 類別- ##
### array ###
- **extendArr(arr1 [, arr2, arr3...] [, opt])** - 合併2個陣列
- **cloneArr(arr)** - 複製陣列
- **sortByObjKey(arr, key [, sort])** - 如果陣列中的值是物件，則可指定物件的 key 值排序
- **sumOfArr(arr)** - 加總陣列中的數字
- **removeByIndex(arr, i)** - 依 index 移除陣列中的元素
- **removeByArrVal(arr, val)** - 依 value 移除陣列中的元素
- **removeDup(arr)** - 移除陣列中重覆的值
- **pushNoDup(arr, val)** - 不重覆 push 值至陣列
- **pushNoEmpty(arr, val)** - 如果值不為空值，才會 push 至陣列
- **hasEmptyInArr(arr)** - 判斷陣列中是否有空值

### helper ###
- **isBool(arg)** - 判斷是否為 boolean
- **isStr(arg)** - 判斷是否為 string
- **isNum(arg)** - 判斷是否為 number
- **isFn(arg)** - 判斷是否為 function
- **isObj(arg)** - 判斷是否為 object
- **isArr(arg)** - 判斷是否為 array
- **isBasicVal(arg)** - 判斷是否為 boolean 或 string 或 number
- **isTrue(arg)** - 判斷是否為 true 或 'true' 或 1
- **isFalse(arg)** - 判斷是否為 false 或 'false' 或 0
- **isEmptyVal(arg)** - 判斷是否為空值
- **executeIfFn(fn [, arg0, arg1...])** - 如果是 function 的話則執行
- **coverToArr(arg)** - 將變數轉為 array
- **coverToStr(arg [, opt])** - 將變數轉為 string
- **coverToInt(arg [, opt])** - 將變數轉為 integer
- **coverToNum(arg [, opt])** - 將變數轉為 number
- **coverToObj(arg [, opt])** - 將變數轉為 object
- **coverToJson(arg [, opt])** - 將變數轉為 JSON

### object ###
- **eachObj(obj, cb)** - 遍歷 arr/obj 中的 key 和 val， 並回傳至 cb 中(用法同 jQuery.each)
- **getObjLength(obj)** - 取得 obj 長度(element 數量)
- **extendObj(obj1, obj2 [, deep])** - 將 obj2 合併至 obj1
- **cloneObj(obj [, deep])** - 複製 obj
- **copyByObjKey(obj1, keys [, opt])** - 指定 key 複製 obj 中的 element
- **replaceObjKey(obj, replaceFn [, opt])** - 轉換 obj 中的 key
- **replaceObjVal(obj, replaceFn [, opt])** - 轉換 obj 中的 val
- **upperCaseByObjKey(obj, aKey [, opt])** - 指定 key 將對應的 val 轉為大寫
- **lowerCaseByObjKey(obj, aKey [, opt])** - 指定 key 將對應的 val 轉為小寫
- **upperFirstByObjKey(obj, aKey [, opt])** - 指定 key 將對應的 val 的第一個字母轉為大寫
- **trimObjVal(obj [, opt])** - obj 中 val 為 str 的值，去除頭尾空白
- **keysInObj(obj [, keys])** - 確認 obj 中的 key 是否存在
- **getKeysInObj(obj [, levelLimit])** - 取得 obj 中的 key
- **coverFnToStrInObj(obj [, opt])** - 如果 obj 中的 val 是 fn，則轉為字串(for 文字輸出用)

***

## LIBRARY 類別- ##
### console ###
- **log(msg, variable)** - 輸出有顏色的 console 訊息
- **log2(msg, variable)** - 輸出有顏色的 console 訊息
- **log3(msg, variable)** - 輸出有顏色的 console 訊息

### log ###
- **readLog(logPath)** - 讀取 .log 檔
- **writeLog(logPath, data)** - 寫入 .log 檔，如檔案已存在則覆寫
- **updateLog(logPath, data, [opt])** - 如入資料至 .log 檔