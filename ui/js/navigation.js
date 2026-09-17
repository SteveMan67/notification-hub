export class Nav {
    constructor(pageManager) {
        this.pageManager = pageManager;
    }
    notifications(sort, filter) {
        this.pageManager.navigate({
            page: "notifications",
            sort: sort,
            filter: filter,
        });
    }
    plugin(pluginId) {
        this.pageManager.navigate({
            page: "plugin",
            pluginId: pluginId,
        });
    }
    plugins() {
        this.pageManager.navigate({
            page: "plugins",
        });
    }
}
