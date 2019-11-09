import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { User } from '../../models/user.model';
import { CrudService } from 'src/service/crud.service';
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  // static Data
  comments = [
    {name : 'Erica Sanders', text: 'i am a die hard porsche fan. their history in unparalleled in the world of motorsport. Prod oener of a Boxer S ; (^_^)' , img : 'assets/face1.png'},
    {name : 'Elizabeth Hungerhoff', text: 'i have always loved the 911s but this looks really sporty!' , img: 'assets/face2.png'},
    {name : 'Katie Lorenzo' , text : 'Does anyone know if they are doing interest free financing ', img : 'assets/face3.png'}
  ];
  countries = [
    {name: 'England', img: 'assets/England.jpg'},
    {name: 'France', img: 'assets/France.jpg'},
    {name: 'Germany', img: 'assets/germany.jpg'},
    {name: 'Us', img: 'assets/Us.jpg'},
    ];
  gender = ['male', 'female'];


  totalThis = 0;
  totalThat = 0;
  users = [];
  currentUser = {
  gender : '',
    country : '',
    isLove : false
  };

  constructor( private crudService: CrudService) {
  }

  ngOnInit() {
    this.crudService.getData().subscribe(data => {
      this.currentUser.country = this.countries[Math.floor(Math.random() * this.countries.length)].name;
      this.currentUser.gender = this.gender[Math.floor(Math.random() * this.gender.length)];
      this.users = data;
      this.totalThisThat();
    });
  }

  totalThisThat() {
    this.totalThat =0;
    this.totalThis = 0;
    for (var i = 0; i < this.users.length; i++) {
      if (this.users[i].isLove === true) {
        this.totalThis++;
      }else {
        this.totalThat++;
      }
    }
  }

  getCountryLogo(countryName) {
    var userCont = this.countries.find(country => country.name == countryName);
    return userCont.img;
  }

  userAction(loveAction) {
    this.currentUser.isLove = loveAction;
    console.log(this.currentUser)
    this.crudService.setUser(this.currentUser);
  }
}
