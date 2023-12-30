import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Router } from '@angular/router';
import { Geolocation } from '@capacitor/geolocation';


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
  fullAddress: string = '';

  constructor(
    private storage: Storage,
    private router: Router
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

  async getCurrentLocation() {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      this.mapLat = coordinates.coords.latitude;
      this.mapLng = coordinates.coords.longitude;
  
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${this.mapLat}&lon=${this.mapLng}&format=json`);
      const data = await response.json();
  
      console.log('Fetched address data:', data); // Check the data retrieved
  
      this.fullAddress = data.display_name;
    } catch (error) {
      console.error('Error getting location', error);
    }
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
      // Navigate to home page after saving entry
      this.router.navigate(['/home']);
  }
}
