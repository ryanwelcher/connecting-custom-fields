/**
 * WordPress dependencies
 */
import { registerPlugin } from '@wordpress/plugins';
import {
	PluginDocumentSettingPanel,
	PluginSidebar,
	PluginPostStatusInfo,
} from '@wordpress/editor';
import { __ } from '@wordpress/i18n';
import { useEntityProp } from '@wordpress/core-data';
import { Panel, PanelBody } from '@wordpress/components';
/**
 * Internal dependencies
 */
import BasicUIReplacement from './basic-ui-replacement';
import DropdownExample from './dropdown-example';
import ToolsPanelExample from './tools-panel-example';

const Render = () => {
	const [ meta, setMeta ] = useEntityProp( 'postType', 'post', 'meta' );
	return (
		<>
			<PluginDocumentSettingPanel
				name="basic-ui"
				title={ __( 'Guest Author', 'block-development-examples' ) }
				initialOpen={ false }
			>
				<BasicUIReplacement meta={ meta } updateMeta={ setMeta } />
			</PluginDocumentSettingPanel>
			{ /* <PluginDocumentSettingPanel
				name="dropdown-ui"
				title={ __(
					'Dropdown Component UI',
					'block-development-examples'
				) }
				initialOpen={ false }
			>
				<DropdownExample meta={ meta } updateMeta={ setMeta } />
			</PluginDocumentSettingPanel>
			<PluginDocumentSettingPanel
				name="tools-panel-ui"
				title={ __(
					'Tools Panel Component UI',
					'block-development-examples'
				) }
				initialOpen={ false }
			>
				<ToolsPanelExample meta={ meta } updateMeta={ setMeta } />
			</PluginDocumentSettingPanel>
			<PluginPostStatusInfo>
				<DropdownExample meta={ meta } updateMeta={ setMeta } />
			</PluginPostStatusInfo> */ }
			<PluginSidebar name="ui-options-7f51b6" icon="businessperson">
				<PanelBody title={ __( 'Guest Author' ) } opened>
					<BasicUIReplacement meta={ meta } updateMeta={ setMeta } />
				</PanelBody>

				{ /* <PanelBody
					title={ __(
						'Dropdown Component',
						'block-development-examples'
					) }
					initialOpen={ false }
				>
					<DropdownExample meta={ meta } updateMeta={ setMeta } />
				</PanelBody>

				<ToolsPanelExample meta={ meta } updateMeta={ setMeta } /> */ }
			</PluginSidebar>
		</>
	);
};

registerPlugin( 'ui-options-7f51b6', {
	render: Render,
} );
