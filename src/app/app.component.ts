import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Spring_7_Tasca';

  constructor(private activatedRoute:ActivatedRoute,
    ) {}
    

  ngOnInit() {
    this.activatedRoute.queryParams
    .subscribe(params=>{
      this.started=params['start'] || false

    })
      
   }              
   

  started:boolean=false


}
