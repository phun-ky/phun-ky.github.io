---
layout: post

route: /2010/03/17/how-to-add-a-search-feature-to-your-blog-for-cakephp
title: 'How to add a search feature to your blog for cakephp'
description: 'I was looking for a decent search feature to add to my blog, and after some reading around, I found this feature very easy and interesting. I found a [how to in the bakery](http://bakery.cakephp.org/articles/view/search-feature-to-cakephp-blog-example), but as several users pointed out, it lacked simplicity and a reindex feature. I kept it to the basics and hope this will work as easy for you as it did for me.'
category: 'Archive'
tags: ['php', 'cakephp']
---

**Table of Contents**

1. [Step 1: Download Searchable Behaviour](#step-1-download-searchable-behaviour)
2. [Step 2: Create Table For Indexes](#step-2-create-table-for-indexes)
3. [Step 3: Add SearchIndex Model](#step-3-add-searchindex-model)
4. [Step 4: Update Your Post Model](#step-4-update-your-post-model)
5. [Step 5: Add Actions In Your Post Controller](#step-5-add-actions-in-your-post-controller)
6. [Step 6: Add Search Input Field](#step-6-add-search-input-field)
7. [Step 7: Add search.ctp](#step-7-add-searchctp)
8. [Step 8: Update Routes](#step-8-update-routes)
9. [Step 9: Reindex Your Data](#step-9-reindex-your-data)
10. [Step 10: Add functions to your post model](#step-10-add-functions-to-your-post-model)
11. [Step 11: Add function to Post Controller](#step-11-add-function-to-post-controller)

## Step 1: Download Searchable Behaviour

Download the latest
[Searchable Behaviour from here](http://code.google.com/p/searchable-behaviour-for-cakephp/)
and upload the contents to your app/models directory.

## Step 2: Create Table For Indexes

Notice that We've added UNIQUE to the key 'association_key'.

```sql
CREATE TABLE `search_index` (
        `id` int(11) NOT NULL auto_increment,
        `association_key` varchar(36) NOT NULL,
        `model` varchar(128) collate utf8_unicode_ci NOT NULL,
        `data` longtext collate utf8_unicode_ci NOT NULL,
        `created` datetime NOT NULL,
        `modified` datetime NOT NULL,
        PRIMARY KEY  (`id`),
        UNIQUE KEY `association_key` (`association_key`,`model`),
        FULLTEXT KEY `data` (`data`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
```

## Step 3: Add SearchIndex Model

```php
<?php
class SearchIndex extends AppModel {
  var $name = 'SearchIndex';
  var $useTable = 'search_index';
  private $models = array();

  private function bindTo($model) {
    $this->bindModel(
      array(
        'belongsTo' => array(
          $model => array (
            'className' => $model,
            'conditions' => 'SearchIndex.model = \''.$model.'\'',
            'foreignKey' => 'association_key'
          )
        )
      ),false
    );
  }


  function searchModels($models = array()) {
    if (is_string($models)) $models = array($models);
    $this->models = $models;
    foreach ($models as $model) {
      $this->bindTo($model);
    }
  }

  function beforeFind($queryData) {
    $models_condition = false;
    if (!empty($this->models)) {
      $models_condition = array();
      foreach ($this->models as $model) {
        $Model = ClassRegistry::init($model);
        $models_condition[] = $model . '.'.$Model->primaryKey.' IS NOT NULL';
      }
    }

    if (isset($queryData['conditions'])) {
      if ($models_condition) {
        if (is_string($queryData['conditions'])) {
          $queryData['conditions'] .= ' AND (' . join(' OR ',$models_condition) . ')';
        } else {
          $queryData['conditions'][] = array('OR' => $models_condition);
        }
      }
    } else {
      if ($models_condition) {
        $queryData['conditions'][] = array('OR' => $models_condition);
      }
    }
    return $queryData;
  }
}
?>
```

## Step 4: Update Your Post Model

We want to make the model Searchable and to have a minimal of validation of the
fields.

```php
var $actsAs   = array('Searchable');
var $validate = array(
  'title' => array(
    'rule' => array('minLength', 1)
  ),
    'text' => array(
      'rule' => array('minLength', 1)
  )
);
```

## Step 5: Add Actions In Your Post Controller

```php
function search() {
  $this->set('results', $this->Post->search($this->data['Post']['q']));
  $this->set('query',$this->data['Post']['q']);
}
```

## Step 6: Add Search Input Field

Just add this wherever you want your users to search from.

```php
<?php
echo $form->create("Post",array('action' => 'search'));
echo $form->input("q",'label' => 'Search'));
echo $form->end("Search");
?>
```

## Step 7: Add search.ctp

Here you can see that I've added some nice higlightning and excerpts to the
results.

```php
<h1>
Search results <?php if(!empty($query)){ echo 'for <em>"' . $query . '"</em>';} ?>
</h1>
<?php foreach ($results as $post): ?>
<div style="" class="searchResultHolder curved-5">
<?php echo '[' . ucfirst($post['Post']['title']) . '](/' . date('Y',$post['Post']['published']) . '/' . date('m',$post['Post']['published']) . '/' . $post['Post']['slug'] . '), <em>published: '.date('Y-m-d H:i:s',$post['Post']['published']).' </em>';?><br />
<?php
$str = $post['Post']['text'];
$str = $text->excerpt($str, $query, 200);

?>
<div style="margin-top:5px;" class="summary"><?php echo $text->highlight($str, $query);?></div>
</div>
<?php endforeach; ?>
```

## Step 8: Update Routes

As a precautin, add this to routes just to safeguard that the link works.

```php
Router::connect('/posts/search/', array('controller' => 'post', 'action' => 'search'));
```

## Step 9: Reindex Your Data

Per default, the new search feature you just added will not index old data. It
will only index new data you add from now on. To reindex your old data, follow
these steps:

## Step 10: Add functions to your post model

Add these functions into your Post Model. Remember, you can change the field you
want index.

```php
function indexData() {
  $index = $this->data['Post']['text'];
  return $index;
}

function reindexAll() {
  if (!$this->SearchIndex) {
    $this->SearchIndex = ClassRegistry::init('SearchIndex');
  }
  ini_set('max_execution_time', 360); // increase execution time
  App::import('Model', $this->name);
  $newmodel = new $this->name();
  $data = $newmodel->findAll();
  foreach ($data as $i=>$row) {
    $newmodel->data = $row;
    $index = $newmodel->indexData();
    if ($index) {
      $searchEntry = $this->SearchIndex->find('first', array(
          'fields'=>  array(
              'id'
            ),
            'conditions'  =>  array(
              'model' =>  $this->name,
              'association_key' =>  $row[$this->name]['id']
          )
        ));
      $index_data = array(
      'SearchIndex' => array(
        'model' => $this->name,
        'id' => empty($searchEntry) ? 0 : $searchEntry['SearchIndex']['id'],'association_key' => $row[$this->name]['id'],
        'data' => $index
      )
      );
    $res = $this->SearchIndex->save($index_data);
    }
  }
}
```

## Step 11: Add function to Post Controller

Add this to your Post Controller:

```php
function admin_reindex() {
  $this->Post->reindexAll();
  die();
}
```

And presto! You have a fully functional search function with all your data
indexed! Just remember to hide or comment out the reindex functionality after
you've finished with it.
