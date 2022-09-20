export class Note {
    constructor(name, text, category, dates) {
      this.id = Math.random();
      this.title = name;
      this.text = text;
      this.date_created = new Date().toLocaleDateString();
      this.dates = dates
      this.category = category
      this.archived = false;
    }
}