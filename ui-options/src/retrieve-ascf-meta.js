/**
 * WordPress Dependencies
 */
import { TextControl } from '@wordpress/components';
/**
 * Internal dependencies
 */
import useUpdateNonCoreMeta from './useUpdateNonCoreMeta';

const AscfMeta = () => {
	// Use the custom hook to manage the reading and saving of ASCF meta.
	const [ ascf, updateASCF ] = useUpdateNonCoreMeta( 'acf' );
	return (
		<>
			<TextControl
				label="Meta to retrieve"
				value={ ascf?.message }
				onChange={ ( message ) => updateASCF( { ...ascf, message } ) }
				__next40pxDefaultSize
				__nextHasNoMarginBottom
			/>
		</>
	);
};

export default AscfMeta;
