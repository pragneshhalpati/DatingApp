import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/User';
import { UserService } from 'src/app/_services/User.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

@Component({
  selector: 'app-MemberDetail',
  templateUrl: './MemberDetail.component.html',
  styleUrls: ['./MemberDetail.component.css']
})
export class MemberDetailComponent implements OnInit {
  user: User;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  constructor(private userService: UserService, private alertify: AlertifyService,
              private route: ActivatedRoute) { }


  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data.user;
    });

    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ];
    this.galleryImages = this.getImages();
  }
  getImages() {
    const imageUrls = [];
    // this.user.photos.forEach(element => {
    //   imageUrls.push({
    //     small: element.url,
    //     medium: element.url,
    //     big: element.url,
    //     description: element.description
    //   });
    //  });
    for (const i of this.user.photos) {
      imageUrls.push({
        small: i.url,
        medium: i.url,
        big: i.url,
        description: i.description
      });
    }
    return imageUrls;
  }
}
