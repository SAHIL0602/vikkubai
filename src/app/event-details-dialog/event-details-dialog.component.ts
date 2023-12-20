import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-event-details-dialog',
  template: `
    <h2>{{ eventData.title }}</h2>
    <p>Time: {{ eventData.startTime }} to {{ eventData.endTime }}</p>
    <p>Description: {{ eventData.description }}</p>
  `,
})
export class EventDetailsDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public eventData: any) {}
}
