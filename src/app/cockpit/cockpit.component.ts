import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {
  @Output() serverCreated = new EventEmitter<{ name: string, content: string }>();
  @Output() blueprintCreated = new EventEmitter<{ name: string, content: string }>();

  constructor() { }

  ngOnInit() {
  }

  onAddServer({ value: name }, { value: content }) {
    this.serverCreated.emit({ name, content });
  }

  onAddBlueprint({ value: name }, { value: content }) {
    this.blueprintCreated.emit({ name, content });
  }

}
