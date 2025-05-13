# Overview

In this recipe, you will create a Testimonial block that will store the testimonial in custom post meta and save the Author Name to a block attribute. This block is based on the one created for [Creating a custom block that stores post meta](https://developer.wordpress.org/news/2023/03/03/creating-a-custom-block-that-stores-post-meta/) from [developer.wordpress.org/news](developer.wordpress.org/news). It uses a single attribute to store the name of the testimonial author while the actual testimonial content will be stored in post meta.

## Step 1 - Block configuration

The block.json file that was created during the scaffold needs a few updates. For starters, we need to save the Author of the testimonial as a block attribute. Add the following snippet to register a new attribute to store the author name. We can also update the `example` property to match

```json
"attributes": {
	"authorName": {
		"type": "string"
	}
},
"example": {
	"attributes": {
		"authorName": "WordPress"
	}
},
```

Next, we want to only allow a single instance of this block as having multiple blocks would overwrite the post meta for each. The `supports.multiple` property allows us to define this.

```js
"supports": {
	"multiple": false
},
```

Finally, we want to use some [block context](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-context/) to know post ID and post type of the post where the block has been inserted. We can enable that functionality via the `usesContext` property.

```js
"usesContext": [ "postId", "postType" ]
```

Step 2 - Registering the post meta.

Before the block can read from and write to post meta, you will need to register some!

Add the following code to the `testimonial.php` file to register the `testimonial` custom field to Posts inside the same hook where we are registering our block.

```php
function testimonial_block_init() {
	// Register the custom post meta.
	register_post_meta(
		'post',
		'testimonial',
		array(
			'show_in_rest'      => true,
			'single'            => true,
			'type'              => 'string',
			'sanitize_callback' => 'wp_kses_post',
		)
	);

	// Register our block.
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'testimonial_block_init' );
```

This code registers the `testimonial` field and associates it to the `post` post type. The `show_is_rest` field is required to be set to `true` in order to access this field in our block.

## Step 3 - Saving the Author Name to block attributes

Open the `./src/edit.js` file and it should looked like this:

```js
/**
 * WordPress Dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @param {*} props
 * @return {Element} Element to render.
 */
export default function Edit( props ) {
	return (
		<blockquote { ...useBlockProps() }>
			<p>This is where the testimonial content will go.</p>
			<cite>Author Name goes here</cite>
		</blockquote>
	);
}
```

At this point, we only have hard coded contents. Let’s start by making it editable. Import the `RichText` component from the `@wordpress/block-editor` package and replace the `<cite />` tag with it.

```js
/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @param {*} props
 * @return {Element} Element to render.
 */
export default function Edit( props ) {
	return (
		<blockquote { ...useBlockProps() }>
			<p>This is where the testimonial content will go.</p>
			<RichText
				tagName="cite"
				placeholder={ __( 'Author name', 'block-developer-cookbook' ) }
				allowedFormats={ [] }
				disableLineBreaks
				value={ 'Author Name goes here' }
				onChange={ ( newAuthorName ) => console.log( newAuthorName ) }
			/>
		</blockquote>
	);
}
```

In the code above, we are setting the `tagName` property to `cite` to make sure the wrapping element for our editable content is a `<cite />` tag.

The `placeholder` prop is the content that is shown when there is no text in the field.

The `allowedFormats` prop accepts an array of formats that can be applied to this field. In this case, we don’t want any so we pass an empty array so that no formats are available.

`disableLinkBreaks` ensures that if the user hits the enter key, a new line is not created.

The `value` and `onChange` props are still hard coded as we need to use items from the `props` object passed to the Edit component to complete them.

Let’s use object destructuring to retrieve the `authorName` attribute and `setAttributes` functions and use them for the `value` and `onChange` props.

```js
/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @param {*} props
 * @return {Element} Element to render.
 */
export default function Edit( { attributes: { authorName }, setAttributes } ) {
	return (
		<blockquote { ...useBlockProps() }>
			<p>This is where the testimonial content will go.</p>
			<RichText
				tagName="cite"
				placeholder={ __( 'Author name', 'block-developer-cookbook' ) }
				allowedFormats={ [] }
				disableLineBreaks
				value={ authorName }
				onChange={ ( newAuthorName ) =>
					setAttributes( { authorName: newAuthorName } )
				}
			/>
		</blockquote>
	);
}
```

Save and test this out! Our block should now be saving the authorName as expected in the block editor (the front end comes later).

## Step 4 - Saving and retrieving the testimonial content

Next, let’s look at how we can access the `testimonial` custom field in our block. To do this, we’re going to use a hook called `useEntityProp` which we can import from the `@wordpress/core-data` package.

```js
import { useEntityProp } from '@wordpress/core-data';
```

useEntityProp accepts 4 parameters:

kind The entity kind.
name The entity name.
prop The property name.
id An entity ID to use instead of the context-provided one.

In our case, the `kind` is going to be `postType`, the `name` is `post`, the `prop` we want is `meta` and we’re going to use the current post ID as the `id`. Remember we set `usesContext` to use `postType` and `postId`? Well we can get those values from the `props` passed to the `Edit` component. Let’s do that now and and set up the `useEntityProp` hook

```js
/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import { useEntityProp } from '@wordpress/core-data';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @param {*} props
 * @return {Element} Element to render.
 */
export default function Edit( {
	attributes: { authorName },
	setAttributes,
	context: { postType, postId },
} ) {
	const [ meta, updateMeta ] = useEntityProp(
		'postType',
		postType,
		'meta',
		postId
	);

	return (
		<blockquote { ...useBlockProps() }>
			<p>This is where the testimonial content will go.</p>
			<RichText
				tagName="cite"
				placeholder={ __( 'Author name', 'block-developer-cookbook' ) }
				allowedFormats={ [] }
				disableLineBreaks
				value={ authorName }
				onChange={ ( newAuthorName ) =>
					setAttributes( { authorName: newAuthorName } )
				}
			/>
		</blockquote>
	);
}
```

Now that we have the hook set up, let’s talk about what it returns.

As with many hooks in React, `useEntityProp` returns a tuple of two items ( A tuple is simply an array of known length with items that are typed ).

The items in order are the data that is being retrieved ( in our case the post meta ) and a function to update that same data. Because it returns an array, we can use array destructuring to retrieve those items in order and name them whatever we want.

Once we have the post meta, we need to retrieve the `testimonial` field from the object that is returned that contains ALL of the post meta for this piece of content.

```js
/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import { useEntityProp } from '@wordpress/core-data';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @param {*} props
 * @return {Element} Element to render.
 */
export default function Edit( {
	attributes: { authorName },
	setAttributes,
	context: { postType, postId },
} ) {
	const [ meta, updateMeta ] = useEntityProp(
		'postType',
		postType,
		'meta',
		postId
	);

	const { testimonial } = meta;

	return (
		<blockquote { ...useBlockProps() }>
			<p>This is where the testimonial content will go.</p>
			<RichText
				tagName="cite"
				placeholder={ __( 'Author name', 'block-developer-cookbook' ) }
				allowedFormats={ [] }
				disableLineBreaks
				value={ authorName }
				onChange={ ( newAuthorName ) =>
					setAttributes( { authorName: newAuthorName } )
				}
			/>
		</blockquote>
	);
}
```

Let’s replace that `<p>` tag with another RichText component so we can edit it in the block editor.

```js
/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import { useEntityProp } from '@wordpress/core-data';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @param {*} props
 * @return {Element} Element to render.
 */
export default function Edit( {
	attributes: { authorName },
	setAttributes,
	context: { postType, postId },
} ) {
	const [ meta, updateMeta ] = useEntityProp(
		'postType',
		postType,
		'meta',
		postId
	);

	const { testimonial } = meta;

	return (
		<blockquote { ...useBlockProps() }>
			<RichText
				tagName="p"
				placeholder={ __(
					'Testimonial goes here',
					'block-developer-cookbook'
				) }
				value={ testimonial }
				onChange={ ( newTestimonialContent ) =>
					console.log( newTestimonialContent )
				}
			/>
			<RichText
				tagName="cite"
				placeholder={ __( 'Author name', 'block-developer-cookbook' ) }
				allowedFormats={ [] }
				disableLineBreaks
				value={ authorName }
				onChange={ ( newAuthorName ) =>
					setAttributes( { authorName: newAuthorName } )
				}
			/>
		</blockquote>
	);
}
```

Now the block should be displaying the value of the `testimonial` field.

Congratulations! Your block is now reading post meta but we’re not quite done. We still need to update the post meta from the block.

To do that, we use the function provided by the `useEntityProp` hook that we called `updateMeta`. It’s important to note that this function will update all of the post meta so we need to be careful to only change the `testimonial` field and keep the value of any others the same.

We can use the [spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) to do this.

```js
updateMeta( {
	...meta,
	testimonial: newTestimonialContent,
} );
```

This syntax is creating a new object by spreading the contents of the `meta` object and then overriding the `testimonial` field with the new value.

Add that the `onChange` property now:

```js
/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import { useEntityProp } from '@wordpress/core-data';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @param {*} props
 * @return {Element} Element to render.
 */
export default function Edit( {
	attributes: { authorName },
	setAttributes,
	context: { postType, postId },
} ) {
	const [ meta, updateMeta ] = useEntityProp(
		'postType',
		postType,
		'meta',
		postId
	);

	const { testimonial } = meta;

	return (
		<blockquote { ...useBlockProps() }>
			<RichText
				tagName="p"
				placeholder={ __(
					'Testimonial goes here',
					'block-developer-cookbook'
				) }
				value={ testimonial }
				onChange={ ( newTestimonialContent ) =>
					updateMeta( {
						...meta,
						testimonial: newTestimonialContent,
					} )
				}
			/>
			<RichText
				tagName="cite"
				placeholder={ __( 'Author name', 'block-developer-cookbook' ) }
				allowedFormats={ [] }
				disableLineBreaks
				value={ authorName }
				onChange={ ( newAuthorName ) =>
					setAttributes( { authorName: newAuthorName } )
				}
			/>
		</blockquote>
	);
}
```

At this point, we’re done in the block editor. Save and test this block to ensure that you’re both reading and writing from post meta.

## Step 5 - Setting up the render.php

Let’s get the front end of this block wired up. Open the `src/render.php` file:

```php
<?php
/**
* Render file.
*
* @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
*/


?>
<?php
$testimonial = 'Testimonial content';
$author_name = 'Author Name'
?>
<blockquote <?php echo wp_kses_data( get_block_wrapper_attributes() ); ?>>
   <p><?php echo esc_html( $testimonial ); ?></p>
   <cite>
       <span><?php echo esc_html( $author_name ); ?></span>
   </cite>
</blockquote>
```

The values are again hard coded, so let’s get them from the block attributes and context.

There are three variables that are available in this file:

`$attributes` - the saved block attributes
`$content` - any content that the block outputs. This used for innerBlocks.
`$block` - the block instance

For our purposes we only need the `$attributes` to access `authorName` and `$block` to access the context and get the `postId` which is then used to retrieve the post meta value.

```php
<?php
/**
* Render file.
*
* @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
*/


?>
<?php
$testimonial = get_post_meta( $block->context['postId'], 'testimonial', true );
$author_name = $attributes['authorName'];
?>
<blockquote <?php echo wp_kses_data( get_block_wrapper_attributes() ); ?>>
  <p><?php echo esc_html( $testimonial ); ?></p>
  <cite>
      <span><?php echo esc_html( $author_name ); ?></span>
  </cite>
</blockquote>
```

You now have a fully functional block that is connected to post meta.

Bon appetite!
