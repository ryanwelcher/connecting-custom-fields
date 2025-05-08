/**
 * WordPress dependencies
 */
import { registerPlugin } from '@wordpress/plugins';
import { __ } from '@wordpress/i18n';
import {
	PluginSidebar,
	PluginSidebarMoreMenuItem,
	PluginPrePublishPanel,
	PluginPostStatusInfo,
	PluginPostPublishPanel,
	PluginMoreMenuItem,
	PluginDocumentSettingPanel,
	PluginBlockSettingsMenuItem,
} from '@wordpress/editor';
import { PanelBody } from '@wordpress/components';

/**
 * Internal Dependencies
 */
import CoreMeta from './retrieve-core-meta';

registerPlugin( 'retrieve-and-display-meta', {
	render: () => {
		return (
			<PluginDocumentSettingPanel
				name="retrieving-meta"
				title={ __( 'Retrieving Meta' ) }
			>
				<CoreMeta />
			</PluginDocumentSettingPanel>
		);
	},
} );
