import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuotationService } from '../quotation.service';

@Component({
  selector: 'app-panell',
  templateUrl: './panell.component.html',
  styleUrls: ['./panell.component.css']
})
export class PanellComponent implements OnInit {


  constructor(private calcTotal:QuotationService,
              private fb:FormBuilder) { }

 
  myform:FormGroup= this.fb.group({
    pages:[0,[Validators.required,Validators.min(0),Validators.pattern('^([1-9]+\\d*)|[0]')]],
    languages:[0,[Validators.required,Validators.min(0),Validators.pattern('^([1-9]+\\d*)|[0]')]]
  })


  ngOnInit(): void {
  }


@Output() sendTotalToHome:EventEmitter<number>=new EventEmitter<number>();
@Output() sendPagesLabnToHome:EventEmitter<[number,number]>=new EventEmitter<[number,number]>();


     
 calculate(){
   let extraToAdd:number=0
  if(this.myform.get('pages')?.invalid && this.myform.get('languages')?.valid) {
   extraToAdd=this.calcTotal.calculateExtraToAdd(0 , parseInt(this.myform.get('languages')?.value))
   this.sendPagesLabnToHome.emit([0 , parseInt(this.myform.get('languages')?.value)])
  }
  if(this.myform.get('pages')?.valid && this.myform.get('languages')?.invalid) {
     extraToAdd=this.calcTotal.calculateExtraToAdd(parseInt(this.myform.get('pages')?.value) ,0)
     this.sendPagesLabnToHome.emit([parseInt(this.myform.get('pages')?.value) ,0])
   }
   if(this.myform.valid) {
     extraToAdd=this.calcTotal.calculateExtraToAdd(parseInt(this.myform.get('pages')?.value) , parseInt(this.myform.get('languages')?.value))  
     this.sendPagesLabnToHome.emit([parseInt(this.myform.get('pages')?.value),parseInt(this.myform.get('languages')?.value)])
   }
   this.sendTotalToHome.emit(extraToAdd)
 }
 
}

  


