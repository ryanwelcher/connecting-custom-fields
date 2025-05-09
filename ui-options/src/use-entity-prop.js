/**
 * WordPress dependencies
 */
import { useEntityProp } from '@wordpress/core-data';
import { TextControl } from '@wordpress/components';

const CoreMeta = () => {
	// Retrieve the meta property from a post
	const [ meta, updateMeta ] = useEntityProp( 'postType', 'post', 'meta' );

	return (
		<TextControl
			label="Author Name"
			value={ meta?.author_name } // Change this to the meta key you want to display
			onChange={ ( author_name ) => {
				// Update the datastore with the new value.
				// Use the spread operator to copy the existing meta object and update the author_name property.
				updateMeta( { ...meta, author_name } );
			} }
			__next40pxDefaultSize
			__nextHasNoMarginBottom
		/>
	);
};

const GuestAuthor = () => {
	// Retrieve the meta property from a post
	const [ meta ] = useEntityProp(
		'postType',
		'post',
		'meta',
		1 // Optional, depending on the context.
	);

	return <h2>Guest Author: { meta?.author_name }</h2>;
};

// Example usage of useEntityProp to retrieve a property from a post
const [ property, updateProperty ] = useEntityProp(
	entityKind, // Entity kind such as postType or taxonomy
	entityType, // Entity name such as post or page
	prop, // Entity property from the REST API response
	entityID // Entity ID such as post ID or term ID
);

// display the retrieved property
console.log( property );

// update the property with a new value - depending on the property.
updateProperty( 'new value' );
