#后台介绍

## /bin /node_modules /public /util /views 生成必须文件 不用修改

## /conf/db.js保存数据库链接所用用户名密码的等信息

##-------------------------------------------------------------

## /dao

### /dao/acc.js 测试链接文件

### /dao/userdao.js 操作数据库的方法集合，包括增啥改查用户以及评测信息

### /dao/userSqlMapping.js 储存所有sql语句

##-------------------------------------------------------------

## /routes

### /routes/index.js 固定文件 

### /routes/users.js 路由文件 当前端页面寻找某个接口时 ， 用users.js分配他应该指向userdao的那个方法




