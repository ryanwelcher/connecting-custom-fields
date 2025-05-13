<?php
/**
 * Render file.
 *
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

?>
<?php
$testimonial = 'Testimonial content';
$author_name = 'Author Name';
?>
<blockquote <?php echo wp_kses_data( get_block_wrapper_attributes() ); ?>>
	<p><?php echo esc_html( $testimonial ); ?></p>
	<cite>
		<span><?php echo esc_html( $author_name ); ?></span>
	</cite>
</blockquote>
