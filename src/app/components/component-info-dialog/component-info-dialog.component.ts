import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ComponentOption } from '../../models/component-option';

@Component({
  selector: 'app-component-info-dialog',
  templateUrl: './component-info-dialog.component.html',
  styleUrls: ['./component-info-dialog.component.scss']
})
export class ComponentInfoDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ComponentOption>,
    @Inject(MAT_DIALOG_DATA) public component: ComponentOption,
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}
