import { __ } from '@wordpress/i18n';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, SelectControl, TextControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';

export default function Edit({ attributes, setAttributes }) {
    const { sortField, sortOrder, postType, numberOfPosts } = attributes;

    const postTypes = useSelect((select) => {
        const { getPostTypes } = select('core');
        const types = getPostTypes({ per_page: -1 });
        return types ? types.filter(type => type.viewable).map(type => ({
            label: type.name,
            value: type.slug
        })) : [];
    }, []);

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
                    <TextControl
                        label={__('Sort Field (Custom Field Key)', 'sortpages-block')}
                        value={sortField}
                        onChange={(value) => setAttributes({ sortField: value })}
                        help={__('Enter custom field key or "menu_order" for page order', 'sortpages-block')}
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
