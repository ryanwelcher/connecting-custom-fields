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
import AscfMeta from './retrieve-ascf-meta';

registerPlugin( 'retrieve-and-display-meta', {
	render: () => {
		return (
			<>
				<PluginDocumentSettingPanel
					name="retrieving-meta"
					title={ __( 'Core Meta' ) }
				>
					<CoreMeta />
				</PluginDocumentSettingPanel>
				<PluginDocumentSettingPanel
					name="retrieving-meta"
					title={ __( 'ASCF Meta' ) }
				>
					<AscfMeta />
				</PluginDocumentSettingPanel>
			</>
		);
	},
} );
