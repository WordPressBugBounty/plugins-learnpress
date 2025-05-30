/**
 * Register block course filter.
 */
import { edit } from './edit';
import { save } from './save';
import metadata from './block.json';
import { registerBlockType } from '@wordpress/blocks';

registerBlockType( 'learnpress/course-filter', {
	...metadata,
	icon: {
		src: (
			<svg
				xmlns="http://www.w3.org/2000/SVG"
				viewBox="0 0 24 24"
				width="24"
				height="24"
				className="wc-block-editor-components-block-icon wc-block-editor-components-block-icon--stacks"
				aria-hidden="true"
				focusable="false"
			>
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M4.5 19.375L4.5 7.625C4.5 7.55596 4.55596 7.5 4.625 7.5L16.375 7.5C16.444 7.5 16.5 7.55596 16.5 7.625L16.5 19.375C16.5 19.444 16.444 19.5 16.375 19.5L4.625 19.5C4.55596 19.5 4.5 19.444 4.5 19.375ZM4.625 21C3.72754 21 3 20.2725 3 19.375L3 7.625C3 6.72754 3.72754 6 4.625 6L16.375 6C17.2725 6 18 6.72754 18 7.625L18 19.375C18 20.2725 17.2725 21 16.375 21L4.625 21ZM19 3.75L8 3.75L8 2.25L19 2.25C20.5183 2.25 21.75 3.4796 21.75 4.99891L21.75 18L20.25 18L20.25 4.99891C20.25 4.30909 19.6909 3.75 19 3.75Z"
				></path>
			</svg>
		),
	},
	edit,
	save,
} );
