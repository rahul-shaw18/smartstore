import { Component, inject, OnInit } from '@angular/core';
import { Api } from '../../core/services/api';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
})
export class Home implements OnInit {
  private api = inject(Api)

ngOnInit(): void {
  this.api.currentUser().subscribe({
    next: (res) => {console.log(res)},
    error:() => {}
  })
}


}
