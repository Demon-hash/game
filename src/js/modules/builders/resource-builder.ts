export default class ResourceBuilder<T> {
    private readonly collection: T[];

    constructor() {
        this.collection = [];
    }

    add(resource: T) {
        this.collection.push(resource);
        return this;
    }

    build(): T[] {
        return this.collection;
    }
}