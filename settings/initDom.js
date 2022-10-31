function shadowRootInit(root) {
	// need for append styles and reload in serve run mode
	// for working shadow
	// noinspection JSUnresolvedVariable
	const rootNode = root.el.getRootNode();

	if (rootNode instanceof ShadowRoot) {
		// console.debug('shadowRoot found! Using as root node ');
		root.shadowRoot = rootNode;
	} else {
		// console.debug('shadowRoot not found! Using document head ');
		root.shadowRoot = document.head;
	}

	return root;
}

export {shadowRootInit};
