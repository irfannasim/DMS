import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from "../../environments/environment";

@Injectable()
export class RequestsService {

    constructor(private http: HttpClient) {
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

    postRequestOauth2Token(url: any, _params: any) {
        const reqHeader = new HttpHeaders({'Authorization': 'Basic ' + btoa(environment.api_access_client + ':' + environment.api_access_secret)});
        let URI = this.getBEAPIServer() + url + '?username=' + _params['userName'] + '&password=' + _params['password'] + '&grant_type=' + _params['grantType'];

        return this.http.post(URI, _params, {headers: reqHeader});
    }

    getRequest(url: any) {
        const reqHeader = new HttpHeaders(
            {
                'Authorization': 'Bearer ' + atob(this.getToken()),
                'X-TENANT-ID': atob(localStorage.getItem(btoa('tenantId'))),
                'Accept-Language': atob(localStorage.getItem(btoa('language'))),
                'Content-Type': 'application/json'
            }
        );
        return this.http.get(this.getBEAPIServer() + url, {headers: reqHeader});
    }

    postRequest(url: any, _params: any) {
        const reqHeader = new HttpHeaders(
            {
                'Authorization': 'Bearer ' + atob(this.getToken()),
                'X-TENANT-ID': atob(localStorage.getItem(btoa('tenantId'))),
                'Accept-Language': atob(localStorage.getItem(btoa('language'))),
                'Content-Type': 'application/json'
            }
        );
        return this.http.post(this.getBEAPIServer() + url, _params, {headers: reqHeader});
    }

    deleteRequest(url: any) {
        const reqHeader = new HttpHeaders(
            {
                'Authorization': 'Bearer ' + atob(this.getToken()),
                'X-TENANT-ID': atob(localStorage.getItem(btoa('tenantId'))),
                'Accept-Language': atob(localStorage.getItem(btoa('language'))),
                'Content-Type': 'application/json'
            }
        );
        return this.http.delete(this.getBEAPIServer() + url, {headers: reqHeader});
    }

    putRequest(url: any, _params: any) {
        const reqHeader = new HttpHeaders(
            {
                'Authorization': 'Bearer ' + atob(this.getToken()),
                'X-TENANT-ID': atob(localStorage.getItem(btoa('tenantId'))),
                'Accept-Language': atob(localStorage.getItem(btoa('language'))),
                'Content-Type': 'application/json'
            }
        );
        return this.http.put(this.getBEAPIServer() + url, _params, {headers: reqHeader});
    }

    postRequestMultipartFormData(url: any, data: any) {
        const reqHeader = new HttpHeaders(
            {
                'Authorization': 'Bearer ' + atob(this.getToken()),
                'X-TENANT-ID': atob(localStorage.getItem(btoa('tenantId'))),
                'Accept-Language': atob(localStorage.getItem(btoa('language'))),
            }
        );
        let formData: FormData = new FormData();
        formData.append('file', data, data.name);
        return this.http.post(this.getBEAPIServer() + url, formData, {headers: reqHeader});
    }

    postRequestMultipartFormAndData(url: any, file: any, data: any) {
        const reqHeader = new HttpHeaders(
            {
                'Authorization': 'Bearer ' + atob(this.getToken()),
                'X-TENANT-ID': atob(localStorage.getItem(btoa('tenantId'))),
                'Accept-Language': atob(localStorage.getItem(btoa('language'))),
            }
        );
        let formData: FormData = new FormData();
        formData.append('data', new Blob([JSON.stringify(data)], {
            type: 'application/json'
        }));
        if (file) {
            formData.append('file', file, file.name);
        }
        return this.http.post(this.getBEAPIServer() + url, formData, {headers: reqHeader});
    }

    putRequestMultipartFormAndData(url: any, file: File, data: any) {
        const reqHeader = new HttpHeaders(
            {
                'Authorization': 'Bearer ' + atob(this.getToken()),
                'X-TENANT-ID': atob(localStorage.getItem(btoa('tenantId'))),
                'Accept-Language': atob(localStorage.getItem(btoa('language'))),
            });

        let formData: FormData = new FormData();
        formData.append('data', new Blob([JSON.stringify(data)],
            {
                type: 'application/json'
            }));
        if (file != null) {
            formData.append('file', file, file.name);
        }
        return this.http.put(this.getBEAPIServer() + url, formData, {headers: reqHeader});
    }

    getRequestUnAuth(url: any, tenantId: string) {
        const reqHeader = new HttpHeaders(
            {
                'X-TENANT-ID': tenantId,
                'Accept-Language': 'en',
                'Content-Type': 'application/json'
            }
        );
        return this.http.get(this.getBEAPIServer() + url, {headers: reqHeader});
    }

    postRequestUnAuth(url: any, _params: any, tenantId: string) {
        const reqHeader = new HttpHeaders(
            {
                'X-TENANT-ID': tenantId,
                'Accept-Language': 'en',
                'Content-Type': 'application/json'
            }
        );
        return this.http.post(this.getBEAPIServer() + url, _params, {headers: reqHeader});
    }
}
