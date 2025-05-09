/**
 * WordPress Dependencies
 */
import { TextControl } from '@wordpress/components';

/**
 * Internal dependencies
 */
import useUpdateNonCoreMeta from './useUpdateNonCoreMeta';

const PodsMeta = () => {
	// Use the custom hook to manage the reading and saving of Pods meta.
	const [ message, updateMessage ] = useUpdateNonCoreMeta(
		'a_message_from_pods'
	);

	return (
		<>
			<TextControl
				label="Meta to retrieve"
				value={ message }
				onChange={ ( message ) => updateMessage( message ) }
				__next40pxDefaultSize
				__nextHasNoMarginBottom
			/>
		</>
	);
};

export default PodsMeta;
