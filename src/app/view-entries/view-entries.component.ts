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
    this.retrieveEntries();
  }

  async ngOnInit() {
    this.retrieveEntries();
  }

  async retrieveEntries() {
    try {
      const entries = await this.storage.get('entries');
      if (entries) {
        this.retrievedEntries = entries;
        console.log('Retrieved entries:', this.retrievedEntries);
      } else {
        console.log('No entries found.');
      }
    } catch (error) {
      console.error('Error retrieving entries:', error);
    }
  }
  async clearEntries() {
    try {
      await this.storage.remove('entries');
      this.retrievedEntries = [];
      console.log('Entries cleared.');
    } catch (error) {
      console.error('Error clearing entries:', error);
    }
  }
}
  