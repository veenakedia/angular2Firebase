import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable'
import { environment } from '../environments/environment';
import {FirebaseService} from './services/firebase.services';
import {Business} from './shared/business';
import {Category} from './shared/category';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[FirebaseService]
})

export class AppComponent implements OnInit{
  businesses:Business[];
  categories:Category[];
  appState:string;
  activeKey:string;
  
  activeCompany:string;
  activeCategory:string;
  activeYears_in_business:number;
  activeDescription:string;
  activePhone:string;
  activeEmail:string;
  activeStreet_address:string;
  activeCity:string;
  activeState:string;
  activeZipcode:string;
  activeCreated_at:string;

  constructor(private _fs: FirebaseService){
    //console.log(this._fs.getBusinesses());
  }

  ngOnInit(){
    this._fs.getBusinesses(null).subscribe(bus=>
    {this.businesses=bus});

    this._fs.getCategories().subscribe(cat=>
    {this.categories=cat});
  }

  changeState(state, key)
  {
    if(key){
      this.activeKey = key;
      console.log('key:' + key);
    }
    if(state){
      this.appState = state;
    }
  }
  
  filterCategory(category){
    console.log(category);
    this._fs.getBusinesses(category).subscribe(bus=>
    {this.businesses=bus});
    this.changeState('default','');
  }

  addBusiness(company:string, category:string, years_in_business:number,description:string,
      phone:string, email:string, street_address:string,city:string, state:string, zipcode:string
      ){
        var created_at = new Date().toString();
        var newBusiness ={
          company:company,
          category:category,
          years_in_business:years_in_business,
          description:description,
          phone:phone,
          email:email,
          street_address:street_address,
          city:city,
          state:state,
          zipcode:zipcode,
          created_at:created_at
        };

        this._fs.addBusiness(newBusiness);
        this.changeState('default',null);

      }

      deleteBusiness(key:string){
        this._fs.deleteBusiness(key);
      }

      showEdit(business:Business)
      {
          this.changeState('edit',null);
          this.activeCompany=business.company;
          this.activeCategory=business.category;
          this.activeYears_in_business=business.years_in_business;
          this.activeDescription=business.description;
          this.activePhone=business.phone;
          this.activeEmail=business.phone;
          this.activeStreet_address=business.street_address;
          this.activeCity=business.city;
          this.activeState=business.state;
          this.activeZipcode=business.zipcode;
          

      }


      updateBusiness(){
        var created_at = new Date().toString();

        var editBusiness ={
          company:this.activeCompany,
          category:this.activeCategory,
          years_in_business:this.activeYears_in_business,
          description:this.activeDescription,
          phone:this.activePhone,
          email:this.activeEmail,
          street_address:this.activeStreet_address,
          city:this.activeCity,
          state:this.activeState,
          zipcode:this.activeZipcode
        };
        console.log(editBusiness);
        this._fs.editBusiness(this.activeKey, editBusiness);
        this.changeState('default',null);

      }
}
