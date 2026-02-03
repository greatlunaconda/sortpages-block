import { __ } from '@wordpress/i18n';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, SelectControl, TextControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';

export default function Edit({ attributes, setAttributes }) {
    const { sortField, sortOrder, postType, numberOfPosts } = attributes;

    const postTypes = useSelect((select) => {
        const { getPostTypes } = select('core');
        const types = getPostTypes({ per_page: -1, context: 'edit' });
        console.log('Available post types:', types); // デバッグ用
        return types ? types.filter(type => type.viewable && type.slug !== 'attachment').map(type => ({
            label: type.name,
            value: type.slug
        })) : [];
    }, []);

    const customFields = useSelect((select) => {
        if (!postType) return [];
        const { getEntityRecords } = select('core');
        const posts = getEntityRecords('postType', postType, { per_page: 100, context: 'edit' });
        console.log('Posts for', postType, ':', posts); // デバッグ用
        if (!posts) return [];
        
        const fieldKeys = new Set();
        posts.forEach(post => {
            console.log('Post meta:', post.meta); // デバッグ用
            if (post.meta) {
                Object.keys(post.meta).forEach(key => {
                    if (!key.startsWith('_')) fieldKeys.add(key);
                });
            }
        });
        
        console.log('Found custom fields:', Array.from(fieldKeys)); // デバッグ用
        return Array.from(fieldKeys).map(key => ({ label: key, value: key }));
    }, [postType]);

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Sort Settings', 'sortpages-block')}>
                    <SelectControl
                        label={__('Post Type', 'sortpages-block')}
                        value={postType}
                        options={postTypes}
                        onChange={(value) => setAttributes({ postType: value })}
                    />
                    <SelectControl
                        label={__('Sort Field (Custom Field Key)', 'sortpages-block')}
                        value={sortField}
                        options={[
                            { label: 'Select a field...', value: '' },
                            { label: 'Menu Order', value: 'menu_order' },
                            ...customFields
                        ]}
                        onChange={(value) => setAttributes({ sortField: value })}
                    />
                    <SelectControl
                        label={__('Sort Order', 'sortpages-block')}
                        value={sortOrder}
                        options={[
                            { label: 'Ascending', value: 'ASC' },
                            { label: 'Descending', value: 'DESC' }
                        ]}
                        onChange={(value) => setAttributes({ sortOrder: value })}
                    />
                    <TextControl
                        type="number"
                        label={__('Number of Posts', 'sortpages-block')}
                        value={numberOfPosts}
                        onChange={(value) => setAttributes({ numberOfPosts: parseInt(value) })}
                    />
                </PanelBody>
            </InspectorControls>
            <div {...useBlockProps()}>
                <p>{__('Sort Pages Block - Preview in frontend', 'sortpages-block')}</p>
                <p>{__('Sort by:', 'sortpages-block')} {sortField} ({sortOrder})</p>
            </div>
        </>
    );
}
