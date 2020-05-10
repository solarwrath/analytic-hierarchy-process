import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-priority-table',
  templateUrl: './priority-table.component.html',
  styleUrls: ['./priority-table.component.scss']
})
export class PriorityTableComponent implements OnInit {
  public priorities = [];

  constructor() {
  }

  ngOnInit(): void {
  }

  addColumn(event: any) {
    this.priorities.push({
      title: event.target.value,
    });
  }
}
