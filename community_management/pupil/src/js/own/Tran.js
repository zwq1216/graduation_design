import { PubSub } from 'pubsub-js';
class Trans{
      constructor(){
          this.data=[]
      }
      cacl(arr, callback) {
            var ret;
            for (var i = 0; i < arr.length; i++) {
                  ret = callback(arr[i], ret);
            }
            return ret;
      }
      max(arr) {
            return this.cacl(arr, (item, max)=>{
                  if (!(max > item)) {
                        return item;
                  } else {
                        return max;
                  }
            });
      }
      min(arr) {
            return this.cacl(arr, (item, min)=>{
                  if (!(min < item)) {
                        return item;
                  } else {
                        return min;
                  }
            });
      }
      sum(arr) {
            return this.cacl(arr, (item, sum)=>{
                  if (typeof (sum) === 'undefined') {
                        return item;
                  } else {
                        return sum += item;
                  }
            });
      }
      avg(arr) {
            if (this.length === 0) {
                  return 0;
            }
            return (this.max(arr) + this.min(arr)) / 2;
      }
      filterObj(obj){
            let newobj = {};
            for (let k in obj) {
                  if (obj[k] !== "") {
                        newobj[k] = obj[k]
                  }
            }
            return newobj;
      }
      spliceObj(obj){
          let str="?";
          for (let k in obj){
             str += `${k}=${obj[k]}&`
          }
          return str;
      }
      toThousands(num) {
            let nums = (num || 0).toString(), result = '';
            while (nums.length > 3) {
                  result = ',' + nums.slice(-3) + result;
                  nums = nums.slice(0, nums.length - 3);
            }
            if (nums) {
                  result = nums + result;
            }
            return result;
      }
      dealError(error){
            PubSub.publish("alert", {
                  type: "error",
                  name: error.detail
            })
      }
      changeDataLevelTwo(originNumber, size) {
            let resultMap = {};
            //Byte直接返回
            if (originNumber < 1024 ) {
                  resultMap.result = originNumber;
                  resultMap.size = size;
                  return resultMap;
            }
            let result = originNumber;
            let ifContinue = false;
            //最大到4层，对应TB
            if (size < 4) {
                  result = originNumber / 1024;
                  size++;
                  ifContinue = true;
            }
            if (ifContinue) {
                  resultMap = this.changeDataLevelTwo(result, size);
            } else {
                  resultMap.result = result;
                  resultMap.size = size;
            }
            return resultMap;
      }
      getChangeStrs(origin) {
            let str = "",size=0,resultMap;
            resultMap = this.changeDataLevelTwo(parseFloat(origin), size)
            switch (resultMap.size) {
                  case 0:
                        str = " B/S";
                        break;
                  case 1:
                        str = " KB/S";
                        break;
                  case 2:
                        str = " MB/S";
                        break;
                  case 3:
                        str = " GB/S";
                        break;
                  case 4:
                        str = " TB/S";
                        break;
                  default:
                        str = " B/S";
                        break;
            }
            return resultMap.result.toFixed(2)+str;
      }
      getChangeDan(origin) {
            let str = "",size=0,resultMap;
            resultMap = this.changeDataLevelTwo(parseFloat(origin), size)
            switch (resultMap.size) {
                  case 0:
                        str = " B";
                        break;
                  case 1:
                        str = " KB";
                        break;
                  case 2:
                        str = " MB";
                        break;
                  case 3:
                        str = " GB";
                        break;
                  case 4:
                        str = " TB";
                        break;
                  default:
                        str = " B";
                        break;
            }
            return resultMap.result.toFixed(2)+str;
      }
      dealTree(data){
          data.forEach((val, k) => {
              if(!val.children){
                  val.children=[]
              }
              val.count = val.children.length;
              this.dealTree(val.children)
          })
          return data;
      }
      dealTreeToArr(data){
          for(let i=0,j=data;i<j.length;i++){
              this.data.push(j[i])
              this.dealTreeToArr(j[i].children)
          }
          return this.data;
      }
      getNameId(id,data) {
          let newarr = this.dealTreeToArr(data);
          let val = newarr.find(vas=>vas.id===id);
          return val;
      }
      getTree(id,data,way){
          if (id === 0) return []
          let trees=this.getNameId(id, data);
          if (way){
              return trees.name;
          }else{
              let result = [...this.getTree(trees.pid,data),trees.name];
              return result;
          }
      }
      getTreeId(id, data) {
          if (id === 0) return []
          let trees = this.getNameId(id, data);
          var result = [...this.getTreeId(trees.pid, data), trees.id]
          return result;
      }
      getTreePId(id, data) {
          if (id === 0) return []
          let trees = this.getNameId(id, data);
          return trees.pid ? trees.pid:0;
      }
      getTreeTopId(id, data) {
          if (id === 0) return []
          let trees = this.getNameId(id, data);
          let treefs=data.find(val=>{
              if (trees.level === 1) {
                  return val.id===trees.id;
              }else{
                  return val.id === trees.project_id;
              }
              
          })
          return treefs;
      }
      getTreeLevel(id, data) {
          if (id === 0) return []
          let trees = this.getNameId(id, data);
          return trees.level;
      }
      clone(obj) {
            let temp = null;
            if (obj instanceof Array) {
                  temp = obj.concat();
            } else if (obj instanceof Function) {
                  //函数是共享的是无所谓的，js也没有什么办法可以在定义后再修改函数内容
                  temp = obj;
            } else {
                  temp = {};
                  for (let item in obj) {
                        let val = obj[item];
                        temp[item] = typeof val === 'object' ? this.clone(val) : val; //这里也没有判断是否为函数，因为对于函数，我们将它和一般值一样处理
                  }
            }
            return temp;
      }
      cloneArr(arr) {
            var a = [];
            for (var i = 0, l = arr.length; i < l; i++) a.push(arr[i]);
            return a;
      }
      toNumber(number){
            let arr=[];
            number.forEach(value => {
                  arr.push(Number(value))
            });
            return arr;
      }
      toObj(arr) {
            let obj = {};
            arr.forEach(value => {
                 obj[value.id] = value
            });
            return obj;
      }
      dealselect(lists,num,addtype){
          let newarr = [];
          if(num===2){
            lists.forEach(val => {
                if (val.type === 2) {
                    newarr.push(val)
                }
            });    
          }
          if (num === 1) {
              lists.forEach(val => {
                  if (val.type === 1) {
                      newarr.push(val)
                  }
              });
          }
          if(num===3){
            lists.forEach(val => {
                if (val.type === 3 && val.add_type === addtype) {
                    newarr.push(val)
                }
            });
          }
          return newarr;
      }
      dealcheck(lists, num, addtype) {
          let arr = [];
          if (num === 2) {
            lists.forEach(val => {
                if (val.type === 2 && val.check) {
                    arr.push(val.id)
                }
            });    
          }
          if (num === 3) {
              lists.forEach(val => {
                  if (val.type === 3 && val.add_type === addtype && val.check) {
                      arr.push(val.id)
                  }
              });
          }
          return arr;
      }
      isChinese(s) {
         return /[\u4e00-\u9fa5]/.test(s);
      } 
      unicode2Ch(str) {
            if (!str) {
                return;
            }
            // 控制循环跃迁
            var len = 1;
            var result = '';
            // 注意，这里循环变量的变化是i=i+len 了
            for (var i = 0; i < str.length; i = i + len) {
                len = 1;
                var temp = str.charAt(i);
                if (temp === '\\') {
                    // 找到形如 \u 的字符序列
                    if (str.charAt(i + 1) === 'u') {
                        // 提取从i+2开始(包括)的 四个字符
                        var unicode = str.substr((i + 2), 4);
                        // 以16进制为基数解析unicode字符串，得到一个10进制的数字
                        result += String.fromCharCode(parseInt(unicode, 16).toString(10));
                        // 提取这个unicode经过了5个字符， 去掉这5次循环
                        len = 6;
                    } else {
                        result += temp;
                    }
                } else {
                    result += temp;
                }
            }
            return result;
        }
      ch2Unicdoe(str){
        if(!str){
            return;
        }
        let unicode = '';
        for (let i = 0; i <  str.length; i++) {
            let temp = str.charAt(i);
            if(this.isChinese(temp)){
                unicode += '\\u' +  temp.charCodeAt(0).toString(16);
            }
            else{
                unicode += temp;
            }
        }
        return unicode;
      }
}

let Tran = new Trans();


export default Tran;