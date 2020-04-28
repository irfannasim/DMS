import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from "../../environments/environment";
import {LoaderService} from "./loader.service";

@Injectable()
export class RequestsService {

    constructor(private http: HttpClient,
                public loaderService: LoaderService) {
    };

    getToken() {
        return localStorage.getItem(btoa('access_token'));
    }

    getBEAPIServer() {
        let protocol = environment.http_protocol;
        let server = environment.api_end_point_url;
        let port = environment.api_end_point_port;
        let contextPath = '/' + environment.api_context_path;
        if (protocol === '' || !protocol || server === '' || !server)
            return '';
        else {
            if (port === '' || !port) {
                return protocol + environment.http_separator + server + ':' + port + contextPath;
            } else {
                return protocol + environment.http_separator + server + ':' + port + contextPath;
            }
        }
    }

    postRequestAccessToken(url: any, _params: any) {
        this.loaderService.inProgress = true;

        const reqHeader = new HttpHeaders(
            {
                'Authorization': 'Basic ' + btoa(_params['username'] + ':' + _params['password']),
                'X-TENANT-ID': _params['tenantId'],
            }
        );
        let URI = this.getBEAPIServer() + url;

        return this.http.post(URI, _params, {headers: reqHeader});
    }

    getRequest(url: any) {
        this.loaderService.inProgress = true;

        const reqHeader = new HttpHeaders(
            {
                'Authorization': 'Basic ' + this.getToken(),
                'Content-Type': 'application/json',
                'X-TENANT-ID': atob(localStorage.getItem(btoa('tenantId')))
            }
        );
        return this.http.get(this.getBEAPIServer() + url, {headers: reqHeader});
    }

    postRequest(url: any, _params: any) {
        this.loaderService.inProgress = true;

        const reqHeader = new HttpHeaders(
            {
                'Authorization': 'Basic ' + this.getToken(),
                'Content-Type': 'application/json',
                'X-TENANT-ID': atob(localStorage.getItem(btoa('tenantId')))
            }
        );
        return this.http.post(this.getBEAPIServer() + url, _params, {headers: reqHeader});
    }

    postUnAuthRequest(url: any, _params: any) {
        this.loaderService.inProgress = true;

        const reqHeader = new HttpHeaders(
            {
                'Content-Type': 'application/json',
                'X-TENANT-ID': atob(localStorage.getItem(btoa('tenantId')))
            }
        );
        return this.http.post(this.getBEAPIServer() + url, _params, {headers: reqHeader});
    }

    deleteRequest(url: any) {
        this.loaderService.inProgress = true;

        const reqHeader = new HttpHeaders(
            {
                'Authorization': 'Basic ' + this.getToken(),
                'Content-Type': 'application/json',
                'X-TENANT-ID': atob(localStorage.getItem(btoa('tenantId')))
            }
        );
        return this.http.delete(this.getBEAPIServer() + url, {headers: reqHeader});
    }

    putRequest(url: any, _params: any) {
        this.loaderService.inProgress = true;

        const reqHeader = new HttpHeaders(
            {
                'Authorization': 'Basic ' + this.getToken(),
                'Content-Type': 'application/json',
                'X-TENANT-ID': atob(localStorage.getItem(btoa('tenantId')))
            }
        );
        return this.http.put(this.getBEAPIServer() + url, _params, {headers: reqHeader});
    }

    putUnAuthRequest(url: any, _params: any) {
        this.loaderService.inProgress = true;

        const reqHeader = new HttpHeaders(
            {
                'Content-Type': 'application/json',
                'X-TENANT-ID': atob(localStorage.getItem(btoa('tenantId')))
            }
        );
        return this.http.put(this.getBEAPIServer() + url, _params, {headers: reqHeader});
    }

    getRequestFile(url: any) {
        this.loaderService.inProgress = true;

        const reqHeader = new HttpHeaders(
            {
                'Authorization': 'Basic ' + this.getToken(),
                'X-TENANT-ID': atob(localStorage.getItem(btoa('tenantId')))
            }
        );
        return this.http.get(this.getBEAPIServer() + url, {headers: reqHeader, responseType: 'arraybuffer'});
    }

}
