<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

global $post;

$name           = get_post_meta( $post->ID, 'guest_name', true );
$email          = get_post_meta( $post->ID, 'guest_email', true );
$birthday       = get_post_meta( $post->ID, 'guest_birthday', true );
$favorite_color = get_post_meta( $post->ID, 'guest_favorite_color', true );
?>
<section <?php echo wp_kses_data( get_block_wrapper_attributes() ); ?>>
	<?php esc_html_e( 'Post Meta Block – hello from a dynamic block!', 'post-meta-block' ); ?>
	<?php if ( $name ) : ?>
			<p><?php echo esc_html( $name ); ?></p>
	<?php endif; ?>
	<?php if ( $email ) : ?>
			<p><?php echo esc_html( $email ); ?></p>
	<?php endif; ?>
	<?php if ( $favorite_color ) : ?>
			<p><?php echo esc_html( $name ); ?></p>
	<?php endif; ?>
</section>
