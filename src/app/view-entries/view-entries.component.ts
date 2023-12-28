import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-view-entries',
  templateUrl: './view-entries.component.html',
  styleUrls: ['./view-entries.component.scss'],
})
export class ViewEntriesComponent {
  retrievedEntries: any[] = [];

  constructor(private storage: Storage) {
    this.initStorage();
  }

  async initStorage() {
    await this.storage.create();
  }

  async ngOnInit() {
    this.retrieveEntries();
  }

  async retrieveEntries() {
    try {
      const entry = await this.storage.get('entry');
      if (entry) {
        // If there are existing entries, push the new entry to the array
        this.retrievedEntries.push(entry);
        console.log('Retrieved entry:', entry);
      } else {
        console.log('No entry found.');
      }
    } catch (error) {
      console.error('Error retrieving entry:', error);
    }
  }
}
  