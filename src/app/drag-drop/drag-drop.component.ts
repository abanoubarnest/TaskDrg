import { CdkDrag, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexGrid, ApexStroke, ApexTitleSubtitle, ApexXAxis, ChartComponent } from 'ng-apexcharts';

import { DragDropService } from '../shared/services/drag-drop.service';
import { Column } from './model/column';
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};
@Component({
  selector: 'app-drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.scss']
})
export class DragDropComponent implements OnInit {

  constructor(private dragDropService: DragDropService) { }
  columns: Column[] = []
  measureList = [];
  dimensionList = [];
  body = { measures: [], dimension: '' }
  showChart=false;
  title = 'Drag & Drop in Angular 11';
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  ngOnInit(): void {
    this.getColumns()
    this.chartOptions = {
      series: [
        {
          name: "Dimensions",
          data: []
        }
      ],
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight"
      },
      title: {
        text: "Measure by Dimension",
        align: "left"
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      xaxis: {
        categories: []
      }
    };
  }

  getColumns() {
    this.dragDropService.getColumns().subscribe((res: Column[]) => {
      if (res && res.length) {
        this.columns = res;
      }

    }, errr => {
      console.log(errr)
    })
  }
  // onDrop(event: CdkDragDrop<string[]>) {
  //   if (event.previousContainer === event.container) {
  //     moveItemInArray(event.container.data,
  //       event.previousIndex,
  //       event.currentIndex);
  //   } else {
  //     transferArrayItem(event.previousContainer.data,
  //       event.container.data,
  //       event.previousIndex, event.currentIndex);
  //   }
  // }

  onDrop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
    if ((this.measureList && this.measureList.length) && (this.dimensionList && this.dimensionList.length)) {
      this.body.measures.push(this.measureList[0].name)
      this.body.dimension = this.dimensionList[0].name
      this.dragDropService.getData(this.body).subscribe((data:any[]) => {
        if(data && data.length){
        
          this.chartOptions.series[0].data=data[1].values.map(item=>item.toFixed(1)); 
          this.chartOptions.xaxis.categories=data[0].values;
          this.showChart=true;


        }
        
      }, error => {
        console.log(error);
      })

    }
    else{
      this.showChart=false;
    }
  }

  dimensionPredicate(item: CdkDrag<Column>, drop?) {
    // if (!(this.dimensionList && this.dimensionList.length)) {
    //   return item.data["name"] === ("Product"|| "Year"|| "Country");
    // }
    // return false;
    if (drop.data.length <= 0) {
      if (["Product", "Year", "Country"].includes(item['_viewContainerRef'].element.nativeElement.outerText)) {
        return true;
      }
    }

    return false;


  }
  measurePredicate(item: CdkDrag<Column>, drop?) {
    if (drop.data.length <= 0) {
      if (["Cost", "Revenue", "Units sold"].includes(item['_viewContainerRef'].element.nativeElement.outerText)) {
        return true;
      }
    }

    return false;
  }
  noReturnPredicate() {
    return false;
  }
  clearMeasure() {
    if (this.measureList.length) {

      this.columns.push(this.measureList[0]);
      this.measureList = [];
      this.showChart=false;

    }
  }
  clearDimension() {
    if (this.dimensionList.length) {
      this.columns.push(this.dimensionList[0])
      this.dimensionList = [];
      this.showChart=false;

    }


  }
}

