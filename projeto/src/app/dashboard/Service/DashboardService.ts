import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private dashboardId = new BehaviorSubject<number | null>(null);

  dashboardId$ = this.dashboardId.asObservable();

  setDashboard(id: number) {
    this.dashboardId.next(id);
  }

}