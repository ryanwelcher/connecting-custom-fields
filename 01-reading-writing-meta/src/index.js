/**
 * WordPress dependencies
 */
import { registerPlugin } from '@wordpress/plugins';
import { PluginDocumentSettingPanel } from '@wordpress/editor';
import { __ } from '@wordpress/i18n';

// List of registered meta for reference
//'author_name', 'author_title', 'author_email', 'author_bio', 'author_favorite_color', 'author_birthday',

/**
 * Register a SlotFill to the custom UI to the document settings panel.
 */
registerPlugin( 'simple-metabox-replacement', {
	render: () => {
		return (
			<>
				<PluginDocumentSettingPanel
					name="guest-author-meta"
					title={ __( 'Guest Author', 'ccf' ) }
				>
					<p>The UI will go here</p>
				</PluginDocumentSettingPanel>
			</>
		);
	},
} );
