import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/models/Employee';
import { Report } from 'src/app/models/Report';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private contentHeaders: HttpHeaders;

  private urlEmployees = "http://localhost:8080/employees/";
  private urlEmployeeById = "http://localhost:8080/employees/by-id/"; 
  private urlEmployeeReportExtension = "/reports/";


  constructor(private http: HttpClient) {
    this.contentHeaders = new HttpHeaders().set('Content-Type', 'application/json');
   }

  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.urlEmployees, { headers: this.contentHeaders });
  }

  getEmployeeById(id: string): Observable<Employee> {
    return this.http.get<Employee>(this.urlEmployeeById + id, { headers: this.contentHeaders });
  }

  postReportIdToEmployee(employeeId: string, reportId: String): Observable<String> {
    return this.http.post<String>(this.urlEmployees + employeeId + this.urlEmployeeReportExtension, reportId, { headers: this.contentHeaders });
  }

  getAllReports(id: string): Observable<Report[]>{
    return this.http.get<Report[]>(this.urlEmployees + id + this.urlEmployeeReportExtension, { headers: this.contentHeaders });
  }
}
