import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Storage } from '@ionic/storage-angular';


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
    private camera: Camera,
    private storage: Storage
  ) {
    this.initStorage();
  }

  async initStorage() {
    // Initialize Capacitor Filesystem
    try {
      await Filesystem.mkdir({ path: 'entries' });
    } catch (error) {
      console.error('Error creating directory:', error);
    }
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
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: true,
      saveToPhotoAlbum: false,
      correctOrientation: true,
    };

    try {
      const imageData = await this.camera.getPicture(options);
      this.entry.imageURI = 'data:image/jpeg;base64,' + imageData;
      this.getGeolocation();
      await this.saveEntry();
    } catch (err) {
      console.log('Error taking picture:', err);
    }
  }

  async saveEntry() {
    try {
      const content = JSON.stringify(this.entry);
      await Filesystem.writeFile({
        path: `entries/entry_${Date.now()}.txt`,
        data: content,
        directory: Directory.Data,
        encoding: Encoding.UTF8
      });
      console.log('Entry saved successfully:', this.entry);
      this.resetForm();
    } catch (error) {
      console.error('Error saving entry:', error);
    }
  }
}
