function newOnClickDocumentLink(event) {
	
	const activateScene = event.shiftKey && game.settings.get("scene-link-view", "shiftActivate") && game.user.isGM;
	const viewJournal = event.ctrlKey && game.settings.get("scene-link-view", "ctrlJournal");
	const viewScene = game.user.isGM || ( this.ownership["default"] == 2 && game.settings.get("scene-link-view", "playerView") );
	
	if ( this.uuid.startsWith("Compendium") ) {
		ui.notifications.warn("SCENE_LINK_VIEW.WARNING.compendium", {localize: true});
		return;
	}
	
	if ( viewJournal ) {
		if ( !this.journal ) {
			ui.notifications.warn("SCENE_LINK_VIEW.WARNING.noJournal", {localize: true, console: false});
			return;
		} else return this.journal._onClickDocumentLink(event)
	}
	
	if ( activateScene ) {
		game.scenes.get(this.id).activate();
		return;
	}

	if ( viewScene ) {
		game.scenes.get(this.id).view();
		return;
	}
	
	ui.notifications.warn("SCENE_LINK_VIEW.WARNING.noView", {localize: true, console: false});
}

Hooks.once("init", () => {
	
	game.settings.register("scene-link-view", "shiftActivate", {
		name: "SCENE_LINK_VIEW.SETTINGS.shiftActivate.name",
		hint: "SCENE_LINK_VIEW.SETTINGS.shiftActivate.hint",
		scope: "world",
		config: true,
		requiresReload: false,
		type: Boolean,
		default: true
	});
	
	game.settings.register("scene-link-view", "ctrlJournal", {
		name: "SCENE_LINK_VIEW.SETTINGS.ctrlJournal.name",
		hint: "SCENE_LINK_VIEW.SETTINGS.ctrlJournal.hint",
		scope: "world",
		config: true,
		requiresReload: false,
		type: Boolean,
		default: true
	});
	
	game.settings.register("scene-link-view", "playerView", {
		name: "SCENE_LINK_VIEW.SETTINGS.playerView.name",
		hint: "SCENE_LINK_VIEW.SETTINGS.playerView.hint",
		scope: "world",
		config: true,
		requiresReload: false,
		type: Boolean,
		default: true
	});
	
	Scene.prototype._onClickDocumentLink = newOnClickDocumentLink;
});