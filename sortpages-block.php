<?php
/**
 * Plugin Name:       Sort Pages Block
 * Description:       Display sorted pages with thumbnails and links based on custom field values.
 * Version:           1.0.0
 * Requires at least: 6.0
 * Requires PHP:      7.4
 * Author:            Your Name
 * License:           GPL-2.0-or-later
 * Text Domain:       sortpages-block
 */

if (!defined('ABSPATH')) {
    exit;
}

function sortpages_block_init() {
    register_block_type(__DIR__ . '/build');
}
add_action('init', 'sortpages_block_init');
