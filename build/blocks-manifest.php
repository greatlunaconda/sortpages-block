<?php
// This file is generated. Do not modify it manually.
return array(
	'build' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'sortpages/sort-pages-block',
		'version' => '1.0.0',
		'title' => 'Sort Pages Block',
		'category' => 'widgets',
		'description' => 'Display sorted pages with custom field values',
		'attributes' => array(
			'sortField' => array(
				'type' => 'string',
				'default' => 'menu_order'
			),
			'sortOrder' => array(
				'type' => 'string',
				'default' => 'ASC'
			),
			'postType' => array(
				'type' => 'string',
				'default' => 'page'
			),
			'numberOfPosts' => array(
				'type' => 'number',
				'default' => 10
			)
		),
		'supports' => array(
			'html' => false
		),
		'textdomain' => 'sortpages-block',
		'editorScript' => 'file:./index.js',
		'render' => 'file:./render.php'
	)
);
