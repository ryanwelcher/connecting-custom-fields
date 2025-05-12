/**
 * WordPress dependencies
 */
import { registerPlugin } from '@wordpress/plugins';
import { PluginDocumentSettingPanel } from '@wordpress/editor';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import CoreMETA from './core-meta';
import AscfMeta from './ascf-meta';
import PodsMETA from './pods-meta';

/**
 * Register a SlotFill to the custom UI to the document settings panel.
 */
registerPlugin( 'simple-metabox-replacement', {
	render: () => {
		return (
			<>
				<PluginDocumentSettingPanel
					name="core-meta"
					title={ __( 'Core meta', 'ccf' ) }
				>
					<CoreMETA />
				</PluginDocumentSettingPanel>
				<PluginDocumentSettingPanel
					name="pods-meta"
					title={ __( 'Pods meta', 'ccf' ) }
				>
					<PodsMETA />
				</PluginDocumentSettingPanel>
				<PluginDocumentSettingPanel
					name="ascf-meta"
					title={ __( 'ASCF meta', 'ccf' ) }
				>
					<AscfMeta />
				</PluginDocumentSettingPanel>
			</>
		);
	},
} );
