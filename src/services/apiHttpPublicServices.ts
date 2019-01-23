import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ApiStorageService } from './apiStorageService';

@Injectable()
export class ApiHttpPublicService {

    resourceServer = ApiStorageService.resourceServer;

    constructor(private httpClient: HttpClient) {}

    /**
     * Lay danh sach cac quoc gia ve Ma so dien thoai, co, ten, ngon ngu, tien...
     */
    getAllCoutries(){
        return this.httpClient.get('https://restcountries.eu/rest/v2/all')
        .toPromise()
        .then(countries=>{
            return countries;
        })
        .catch(err=>{
            throw err;
        })
    }
    
    /**
     * Lay danh sach user demo phuc vu so lieu demo
     */
    getRandomUser(nRecord: undefined | number){
        return this.httpClient.get('https://randomuser.me/api/?results=' + (nRecord?nRecord:20))
        .toPromise()
        .then(data=>{
           return data['results'];
        })    
        .catch(err=>{
            console.log('err ',err);
            
        })
    }
}