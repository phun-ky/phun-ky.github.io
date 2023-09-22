---
layout: post

route: /2010/03/17/how-to-add-a-search-feature-to-your-blog-for-cakephp
title: 'How to add a search feature to your blog for cakephp'
description: ''
category: 'Archive'
tags: []
---

I was looking for a decent search feature to add to my blog, and after some
reading around, I found this feature very easy and interesting. I found a
[how to in the bakery](http://bakery.cakephp.org/articles/view/search-feature-to-cakephp-blog-example),
but as several users pointed out, it lacked simplicity and a reindex feature. I
kept it to the basics and hope this will work as easy for you as it did for me.

## Step 1: Download Searchable Behaviour

Download the latest
[Searchable Behaviour from here](http://code.google.com/p/searchable-behaviour-for-cakephp/)
and upload the contents to your app/models directory.

## Step 2: Create Table For Indexes

Notice that We've added UNIQUE to the key 'association_key'.

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

## Step 3: Add SearchIndex Model

    &lt;?php
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

## Step 4: Update Your Post Model

We want to make the model Searchable and to have a minimal of validation of the
fields.

    var $actsAs   = array('Searchable');
    var $validate = array(
     'title' => array(
        'rule' => array('minLength', 1)
      ),
       'text' => array(
         'rule' => array('minLength', 1)
      )
    );

## Step 5: Add Actions In Your Post Controller

    function search() {
    $this->set('results', $this->Post->search($this->data['Post']['q']));
    $this->set('query',$this->data['Post']['q']);
    }

## Step 6: Add Search Input Field

Just add this wherever you want your users to search from.

    &lt;?php
    echo $form->create("Post",array('action' => 'search'));
    echo $form->input("q",'label' => 'Search'));
    echo $form->end("Search");
    ?>

## Step 7: Add search.ctp

Here you can see that I've added some nice higlightning and excerpts to the
results.

    <h1>
    Search results &lt;?php if(!empty($query)){ echo 'for &lt;em>"' . $query . '"&lt;/em>';} ?>
    </h1>
    &lt;?php foreach ($results as $post): ?>
    &lt;div style="" class="searchResultHolder curved-5">
    &lt;?php echo '&lt;a style="font-size:14px;text-transform:capitalize;" href="/' . date('Y',$post['Post']['published']) . '/' . date('m',$post['Post']['published']) . '/' . $post['Post']['slug'] . '">' . ucfirst($post['Post']['title']) . '&lt;/a>, &lt;em>published: '.date('Y-m-d H:i:s',$post['Post']['published']).' &lt;/em>';?>&lt;br />
    &lt;?php
    $str = $post['Post']['text'];
    $str = $text->excerpt($str, $query, 200);

    ?>
    &lt;div style="margin-top:5px;" class="summary">&lt;?php echo $text->highlight($str, $query);?>&lt;/div>
    &lt;/div>
    &lt;?php endforeach; ?>

## Step 8: Update Routes

As a precautin, add this to routes just to safeguard that the link works.

    Router::connect('/posts/search/', array('controller' => 'post', 'action' => 'search'));

## Step 9: Reindex Your Data

Per default, the new search feature you just added will not index old data. It
will only index new data you add from now on. To reindex your old data, follow
these steps:

## Step 10: Add functions to your post model

Add these functions into your Post Model. Remember, you can change the field you
want index.

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


## Step 11: Add function to Post Controller

Add this to your Post Controller:

    function admin_reindex() {
    $this->Post->reindexAll();
    die();
    }

And presto! You have a fully functional search function with all your data
indexed! Just remember to hide or comment out the reindex functionality after
you've finished with it.
