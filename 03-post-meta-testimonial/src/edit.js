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
