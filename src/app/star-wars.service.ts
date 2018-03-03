import { Injectable } from '@angular/core'
import { Http } from '@angular/http'
import 'rxjs/add/operator/toPromise';


@Injectable()
export class StarWarsService {
    
    private dataUrl = 'https://swapi.co/api/'

    constructor(private http: Http) { }

    getInfo(element,page) {
         return this.http.get(this.dataUrl+element+'?page='+page).toPromise().then(response => {     
             return response.json();
            }).catch(this.handleError); 
    }

    getUrlData(urlItem){
    return this.http.get(urlItem).toPromise().then(response => response.json()).catch(this.handleError);  
  }



    private handleError(error: any): Promise<any> {
        /* console.error('An error occurred', error);  */
        /* alert("Page doesn't exist!"); */
        return Promise.reject(error.message || error);
    }

}
