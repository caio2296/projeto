import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private dashboardId = new BehaviorSubject<number | null>(null);

  dashboardId$ = this.dashboardId.asObservable();

   setDashboard(id: number) {
    if (this.dashboardId.value === id) return; // 🔥 evita duplicado
    this.dashboardId.next(id);
  }

}