<?php
$sort_field = $attributes['sortField'] ?? 'menu_order';
$sort_order = $attributes['sortOrder'] ?? 'ASC';
$post_type = $attributes['postType'] ?? 'page';
$number_of_posts = $attributes['numberOfPosts'] ?? 10;

$query_args = array(
    'post_type' => $post_type,
    'post_status' => 'publish',
    'posts_per_page' => $number_of_posts,
    'orderby' => $sort_field === 'menu_order' ? 'menu_order' : 'meta_value',
    'order' => $sort_order
);

if ($sort_field !== 'menu_order') {
    $query_args['meta_key'] = $sort_field;
    $query_args['meta_type'] = 'CHAR';
}

$posts = get_posts($query_args);

if (!empty($posts)) {
    echo '<div ' . get_block_wrapper_attributes(['class' => 'sortpages-block']) . '>';
    echo '<div class="sortpages-grid">';
    
    foreach ($posts as $post) {
        $thumbnail = get_the_post_thumbnail($post->ID, 'medium');
        $permalink = get_permalink($post->ID);
        $title = get_the_title($post->ID);
        $custom_field_value = get_post_meta($post->ID, $sort_field, true);
        
        echo '<div class="sortpages-item">';
        if ($thumbnail) {
            echo '<div class="sortpages-thumbnail">';
            echo '<a href="' . esc_url($permalink) . '">' . $thumbnail . '</a>';
            echo '</div>';
        }
        echo '<div class="sortpages-content">';
        echo '<h3><a href="' . esc_url($permalink) . '">' . esc_html($title) . '</a></h3>';
        if ($custom_field_value && $sort_field !== 'menu_order') {
            echo '<p class="sortpages-meta">' . esc_html($sort_field) . ': ' . esc_html($custom_field_value) . '</p>';
        }
        echo '</div>';
        echo '</div>';
    }
    
    echo '</div>';
    echo '</div>';
}
?>

<style>
.sortpages-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
    margin: 20px 0;
}

.sortpages-item {
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    transition: box-shadow 0.3s ease;
}

.sortpages-item:hover {
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.sortpages-thumbnail img {
    width: 100%;
    height: 200px;
    object-fit: cover;
}

.sortpages-content {
    padding: 15px;
}

.sortpages-content h3 {
    margin: 0 0 10px 0;
    font-size: 1.2em;
}

.sortpages-content a {
    text-decoration: none;
    color: #333;
}

.sortpages-content a:hover {
    color: #0073aa;
}

.sortpages-meta {
    font-size: 0.9em;
    color: #666;
    margin: 5px 0 0 0;
}
</style>
