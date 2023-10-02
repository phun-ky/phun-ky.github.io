---
layout: post

route: /2007/02/09/squid-log-parser
title: 'Squid log parser'
category: 'Archive'
tags: [squid, caching, server, backend, log, logging, parsing]
---

I was twisting my head trying to figure the best way to fetch data from the
squid log server for a new internal statistic project at work, when I decided to
make a parser myself rather than trying to find a pre-made parser and adjust it
to fit my needs.

After over 4 different prototypes getting a no-go from our DBA - the script had
to insert rows in intervals - I finally made myself and the DBA happy.

The script is free to use, but please keep the copyright.

```php
<?php
  /**
   * File for parsing squid logs
   *
   * This file fetches lines from the squid log on the squid server and parsing the data to a mysql database
   * @link http://phun-ky.net/2007/03/squid-log-parser
   * @author Alexander Vassbotn Røyne 
   * @license Creative Commons, see http://phun-ky.net/license for more information
   * @version 1.1
   * @name UMedia SquidParser 1.1
   */

  /**
    * Uncheck for error checking
    */
  #ini_set(error_reporting(E_ALL ^ E_NOTICE),0);
  #ini_set('display_errors', 1);

  /**
   * Connects to the database
   */
  $con = mysql_connect("127.0.0.1", 'username', 'password');

  if (!$con) {
    die("Could not connect: " . mysql_error());
  }

  mysql_select_db('databasename');

  $log        = 'tail -f /path/to/squid/access.log 2>&1';
  $handle     = popen($log, 'r');
  $replace    = array('www.','.no');
  $lastMinute = date('i');

  while(!feof($handle)){

    $line = fgets($handle);

    /**
     * A very simple preg_match() to get the desired chunks, could be made better and more safe
     */
    preg_match ('/http:\/\/(\S*)\/\S* \S* \S* (\S*) /iU' , $line, $chunks);

    $host          = str_replace($replace,'',$chunks[1]);
    $sites[$host]  += $chunks[2];
    $minute        = date('i');

    settype($minute, 'integer');

    /**
     * This script is set to fetch the bytes and add them up, insert them in the database each 5 minutes
     * The script was intended on a system with log rotation each 2 hours, so some quirks was made to start
     * it again when the file was renamed.
     */
    if((($minute%5) == 0) && ($lastMinute != date('i'))){

      $lastMinute = date('i');
      settype($lastMinute, 'integer');

      foreach($sites as $site => $bytes){

        $sql = 'INSERT INTO tableName VALUES ( ''.$site.'',''.$bytes.'',''.date('Y-m-d H:i:s').'')';
        echo $sql.'\n';
        mysql_query($sql, $con);
      }

      unset($sites);
      unset($sql);
    }
  }

  pclose($handle);
  mysql_close($con);
  
?>
```
