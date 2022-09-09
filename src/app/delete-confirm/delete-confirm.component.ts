import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-delete-confirm',
  templateUrl: './delete-confirm.component.html',
  styleUrls: ['./delete-confirm.component.css']
})
export class DeleteConfirmComponent implements OnInit {

  //variable in child,value get from parent
  @Input() item: string | undefined//to get a value from parent child must be in inputdecorator
  @Output() onCancel = new EventEmitter()//generate a event named onCancel  in the class EventEmitter (value give from child to parent)
  @Output() onDelete = new EventEmitter()//generate a event named onDelete  in the class EventEmitter (value give from child to parent)

  constructor() { }

  ngOnInit(): void {
  }
  cancel() {
    this.onCancel.emit()
  }
  delete() {
    this.onDelete.emit(this.item)

  }
}
