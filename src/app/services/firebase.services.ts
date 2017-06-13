import {Injectable} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2';
import 'rxjs/add/operator/map';
import {Business} from '../shared/business';
import {Category} from '../shared/category';
import * as firebase from 'firebase/app';

@Injectable()

export class FirebaseService{
    businessses: FirebaseListObservable<Business[]>;
    categories: FirebaseListObservable<Category[]>;

    constructor(private af:AngularFireDatabase){
        console.log(this.af.list('items'));
    }

    getBusinesses(category:string=null)
    {
        
        if(category!=null && category.length>0){
            this.businessses = this.af.list('businesses',{
                query:{
                    orderByChild: 'category',
                    equalTo:category
                }
            }) as FirebaseListObservable<Business[]>;
        }
        else{
            this.businessses = this.af.list('businesses') as FirebaseListObservable<Business[]>;
        }
        return this.businessses;
    }

    getCategories(category:string=null)
    {
        this.categories = this.af.list('categories') as FirebaseListObservable<Category[]>;
        return this.categories;
    }

    addBusiness(business)
    {
        this.af.list('businesses').push(business);
        return this.businessses = this.af.list('businesses') as FirebaseListObservable<Business[]>;

    }

    editBusiness(key:string,business)
    {
        return this.af.list('businesses').update(key,business);
        //return this.businessses = this.af.list('businesses') as FirebaseListObservable<Business[]>;

    }

    deleteBusiness(key:string)
    {
        return this.af.list('businesses').remove(key);
        //return this.businessses = this.af.list('businesses') as FirebaseListObservable<Business[]>;
    }

}