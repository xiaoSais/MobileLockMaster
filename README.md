手机锁屏界面
==


## 界面
* 为了能够正确实现功能，已经禁止用户缩放

* 锁屏区域采用九宫格自适应布局

* 触摸点大小统一设置为 30 px， 左右间距 30 px

* 底部区留出 50px 用来显示功能选择框以及提示语句

## 设计思路
首先计算出各个触摸点的圆心坐标，对页面进行 touch 事件监听，如果当前触摸位置在触摸点范围之内，保存当前触摸点的索引号，这也是
用户输入的密码，然后判断如果密码长度多于两位，从密码的最后一位以及倒数第二位进行绘制直线。绘制的基本思路是通过添加子节点，根据
两点间的位置，js控制直线的长度，倾斜角度。如果监听到手指离开屏幕区域，此时移除添加的所有子节点，样式。之后保存的密码就是用户输入
的密码。根据保存的密码，完成相应的localStorage存取操作。

### 触摸点圆心坐标计算

* 获取当前页面工作区域的尺寸

* 根据页面尺寸，以及自适应的特点，循环遍历计算各个点圆心坐标

### 判断当前触摸位置是否在触摸点区域

* 对页面进行touchmove监听,获取当前触摸位置坐标

* 循环遍历圆心坐标数组，如果两者距离小于30，那么当前触摸位置在触摸点内

* 如果在触摸点区域内将当前圆心坐标数组索引压入 passward 数组当中 

* 如果 passward 相邻的数位相同，那么弹出栈顶元素，因为此时手指仍然未离开该触摸点

### 绘制直线类型判断

* 类型 0
    
    * 水平直线 
        
        * 绘制起始坐标以 x 坐标最小的为基准
        
        * 长度是两个圆心 x 坐标之差
        
        * 无旋转角度

* 类型 1
    
    * 竖直直线
        
        * 绘制起始位置以 y 坐标最小的为基准
        
        * 长度是两者 y 坐标的差值
        
        * 旋转角度 90 度
 
 * 类型 2
     
     * 正斜率直线
      
        * 绘制起始坐标以 x 坐标最小的为基准
        
        * 长度根据两者圆心坐标计算 
        
        * 旋转角度是 ( y1-y2 )/( x1-x2 ) 的反正切值
 
 * 类型 3
        
     * 负斜率直线
        
        * 绘制起始坐标以 x 坐标最大的为基准
                
        * 长度根据两者圆心坐标计算 
                
        * 旋转角度是 ( x1-x2 )/( y2-y1 ) 的反正切值 + 90
        
### 绘制直线

* 根据起始点坐标定位，创建 div 子节点

* 根据不同的直线类型，动态改变直线的样式

* 改变直线旋转时的基准点，以起始点为基准

### 密码重置与验证

* 对页面 touched 事件进行监听

* touched 触发
    
    * 移除所有子节点以及样式
    
    * 判断当前保存的密码
        
    * 根据当前保存的密码，按照题目要求进行相应本地存储操作
      
    * 每次判断过后，都要对参数进行重置，并进行事件监听  

### 页面 onload 事件触发

* 显示相应的提示信息

* 清除保存在本地的密码信息

* 对页面进行 touch 事件监听

## 兼容性测试

* 在安卓主流型号手机、浏览器下都可以正常运行

* 在ios主流型号上运行正常
