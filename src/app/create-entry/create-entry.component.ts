import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-create-entry',
  templateUrl: './create-entry.component.html',
  styleUrls: ['./create-entry.component.scss'],
})
export class CreateEntryComponent {
  entry = {
    title: '',
    content: '',
    date: ''
    // Other fields
  };
  constructor(private geolocation: Geolocation,
              private camera: Camera) {}

  onSubmit() {
    // Here you can implement the logic to save the entry
    // For example, using services, local storage, or API calls

    // For demonstration purposes, let's log the entry to the console
    console.log('Submitted Entry:', this.entry);

    // After saving, you might want to clear the form or navigate elsewhere
    this.resetForm();
  }
  resetForm() {
    // Clear the form fields after submission
    this.entry = {
      title: '',
      content: '',
      date: '',
      // Reset other fields if needed
    }
  }
  getGeolocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      // Use resp.coords.latitude and resp.coords.longitude to save location
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  takePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: true,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };
  
    this.camera.getPicture(options).then((imageData) => {
      // imageData is the URI of the image
      // Save this URI with the journal entry
    }, (err) => {
      console.log('Error taking picture:', err);
    });
  }
}