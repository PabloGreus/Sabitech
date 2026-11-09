export class page {
  constructor({ items }) {
    this.items = items;
  }

  static fromJson(json, listkey, mapFn) {
    const rawItems = Array.isArray(json[listkey]) ? json[listkey] : [];
    return rawItems.map(mapFn);
  }
}
