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
import PodsMeta from './retrieve-pods-meta';

registerPlugin( 'retrieve-and-display-meta', {
	render: () => {
		return (
			<>
				<PluginDocumentSettingPanel
					name="core-meta"
					title={ __( 'Core Meta' ) }
				>
					<CoreMeta />
				</PluginDocumentSettingPanel>
				<PluginDocumentSettingPanel
					name="pods-meta"
					title={ __( 'Pods Meta' ) }
				>
					<PodsMeta />
				</PluginDocumentSettingPanel>
				<PluginDocumentSettingPanel
					name="ascf-meta"
					title={ __( 'ASCF Meta' ) }
				>
					<AscfMeta />
				</PluginDocumentSettingPanel>
			</>
		);
	},
} );
