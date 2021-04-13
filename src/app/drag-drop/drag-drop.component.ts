import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';

import { DragDropService } from '../shared/services/drag-drop.service';
import { User } from './model/user';

@Component({
  selector: 'app-drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.scss']
})
export class DragDropComponent implements OnInit {

  constructor(private dragDropService: DragDropService) { }
  users: User[] = []
  title = 'Drag & Drop in Angular 11';
  ngOnInit(): void {
    this.getUser()
  }

  getUser() {
    this.dragDropService.getUsers().subscribe((res: any) => {
      if (res && res.data) {
        this.users = res.data;
      }

    }, errr => {
      console.log(errr)
    })
  }
  onDrop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data,
        event.previousIndex,
        event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex, event.currentIndex);
    }
  }
}
