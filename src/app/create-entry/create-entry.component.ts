import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Storage } from '@ionic/storage-angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-create-entry',
  templateUrl: './create-entry.component.html',
  styleUrls: ['./create-entry.component.scss'],
})
export class CreateEntryComponent {
  entry = {
    title: '',
    content: '',
    date: new Date().toISOString(),
    location: '',
    imageURI: ''
  };

  mapLat: number = 0;
  mapLng: number = 0;
  mapZoom: number = 15;

  constructor(
    private geolocation: Geolocation,
    private storage: Storage
  ) {
    this.initStorage();
  }

  async initStorage() {
    await this.storage.create();
  }

  onSubmit() {
    // Save entry to Filesystem
    this.saveEntry();
  }

  resetForm() {
    this.entry = {
      title: '',
      content: '',
      date: new Date().toISOString(),
      location: '',
      imageURI: ''
    };
    this.mapLat = 0;
    this.mapLng = 0;
  }

  getGeolocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.mapLat = resp.coords.latitude;
      this.mapLng = resp.coords.longitude;
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  async takePicture() {
    try {
      const image = await Camera.getPhoto({
        quality: 100,
        allowEditing: true,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        saveToGallery: false
      });
  
      if (image && image.webPath) {
        this.entry.imageURI = image.webPath;
        this.getGeolocation();
        await this.saveEntry();
      } else {
        console.log('No image path available.');
      }
    } catch (err) {
      console.log('Error taking picture:', err);
    }
  }

  async saveEntry() {
    try {
      // Save entry to storage
      const entries = await this.storage.get('entries') || [];
      entries.push(this.entry);
      await this.storage.set('entries', entries);

      console.log('Entry saved successfully:', this.entry);
      this.resetForm();
    } catch (error) {
      console.error('Error saving entry:', error);
    }
  }
}
