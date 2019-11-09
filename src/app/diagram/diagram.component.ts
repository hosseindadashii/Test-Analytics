import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/service/crud.service';

@Component({
  selector: 'app-diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.scss']
})
export class DiagramComponent implements OnInit {

  constructor(private crudService : CrudService) { }
  users;
  countries;
  maleVotes = [0,0,0,0];
  femaleVotes = [0,0,0,0];
  chartDatasets;
  ngOnInit() {
    this.crudService.getData().subscribe(data => {
      this.users = data;
      this.countryCalc();
    });
  }

  countryCalc() {
    this.countries = [...new Set(this.users.map(user => user.country))];
    this.maleVotes = [0,0,0,0];
    this.femaleVotes = [0,0,0,0];
    for (var i = 0; i < this.countries.length ; i++) {
      // this.maleVotes.push(0)
      // this.femaleVotes.push(0)
      for (var j = 0 ; j < this.users.length; j++) {
        if (this.countries[i] === this.users[j].country && this.users[j].gender === 'male'){
          this.maleVotes[i]++
        }else if (this.countries[i] === this.users[j].country && this.users[j].gender === 'female'){
          this.femaleVotes[i]++
        }
      }                 
    }
    this.chartDatasets = [
      { data: this.maleVotes, label: 'Male' },
      { data: this.femaleVotes, label: 'Female' },
    ];
    console.log(this.maleVotes, this.femaleVotes)
  }
  
  public chartType: string = 'bar';

// public chartDatasets: Array<any> = [
//   { data: this.maleVotes, label: 'Male' },
//   { data: this.femaleVotes, label: 'Female' },
// ];
  public chartColors: Array<any> = [
    {
      backgroundColor: [
        'rgba(255,98,159,1)',
        'rgba(255,98,159,1)',
        'rgba(255,98,159,1)',
        'rgba(255,98,159,1)',
        'rgba(255,98,159,1)',
      ],
    },
    {
      backgroundColor: [
        'rgba(249,182,208,1)',
        'rgba(249,182,208,1)',
        'rgba(249,182,208,1)',
        'rgba(249,182,208,1)',
        'rgba(249,182,208,1)',
        'rgba(249,182,208,1)',
        
      ],
    },
    ];

    public chartOptions: any = {
      responsive: true,
        scales: {
          xAxes: [{
            stacked: true
            }],
          yAxes: [
          {
            stacked: true
          }
        ]
      }
    };
    public chartClicked(e: any): void { }
    public chartHovered(e: any): void { }

}
