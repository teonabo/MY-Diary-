import { Component, OnDestroy, OnInit } from '@angular/core';
import { DiaryDataService } from '../shared/diary-data.component';
import { DiaryEntry } from '../shared/diary-entry.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import {AuthService} from '../shared/auth-service';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrl: './diary.component.css'
})
export class DiaryComponent implements OnInit, OnDestroy {
  [x: string]: any;

  private authenticationSub: Subscription;
  isAuthenticated = false;

  constructor(private diaryDataService: DiaryDataService, private router:Router, private authService: AuthService) { }

  ngOnDestroy(): void {
    this.diaryEntriesSub.unsubscribe();
    this.authenticationSub.unsubscribe();
  }

  diaryEntries: DiaryEntry[] = [];
  diaryEntriesSub = new Subscription();

  ngOnInit(): void {
    this.diaryDataService.getDiaryEntries();
    this.diaryEntriesSub = this.diaryDataService.diarySubject.subscribe(entries => {
      this.diaryEntries=entries;
    })
    this.authenticationSub = this.authService.getAuthenticatedSub().subscribe(status => {
      this.isAuthenticated = status;
    })
    this.isAuthenticated = this.authService.getIsAuthenticated();
  }

  onDelete(id: string){
    this.diaryDataService.onDeleteEntry(id);
  }

  onEdit(id: string){
    this.router.navigate(["edit", id])
  }
}