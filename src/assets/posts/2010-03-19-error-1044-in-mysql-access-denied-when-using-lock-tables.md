---
layout: post

route: /2010/03/19/error-1044-in-mysql-access-denied-when-using-lock-tables
title: 'Error 1044 in MySQL: Access denied when using LOCK TABLES'
description: 'Had some issues during a standard mysqldump. I have never encountered it before, and I have made similar dumps on identical mysql servers all day. Basically, it auto sets to lock tables somehow.'
category: 'Programming'
tags: ['mysql']
---

It is a reported [bug at MySQL](http://bugs.mysql.com/bug.php?id=21527), and the page states that the bug is closed. According to the [forums at MySQL](http://forums.mysql.com/read.php?10,108835,108835#msg-108835) it seemed to be an easy fix;

```sql
GRANT SELECT,LOCK TABLES ON database.* TO 'username'@'localhost'; 
```

But I double checked, the user had ALL priviliges (yeah, not that safe). The
same post mentioned above had a simpler solution that worked brilliantly:

```shell-session
mysqldump -u username -p database --single-transaction >dump.sql
```
