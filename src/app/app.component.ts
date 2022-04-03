import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { SpeedtestService } from './services/speedtest.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  color: ThemePalette = 'primary';
  mode: ProgressBarMode = 'determinate';
  value: number = 0;
  downloadSpeed: number = 0;
  ping: number = 0;
  uploadSpeed: number = 0;


  constructor(private speedtest: SpeedtestService) { }

  ngOnInit() {
    this.download()
  }

  download() {
    var start = performance.now()
    this.speedtest.Download('https://juanykty.github.io/speedtest/assets/speedtest').subscribe(event => {
      if (event.type == HttpEventType.Sent) {
        this.ping = Math.ceil(performance.now() - start)
      }
      if (event.type === HttpEventType.DownloadProgress) {
        this.value = Number(((10 / Number(event.total)) * event.loaded).toFixed(2))
        // console.log('time' + String((performance.now() - start) / 1000) + 'progress' + (100 / Number(event.total)) * event.loaded);

      }
      if (event.type === HttpEventType.Response) {
        // this.downloadSpeed 
        this.value = 100
        this.downloadSpeed = Number((10/((performance.now()-start)/1000)).toFixed(2))
        console.log("donwload completed");
      }

    })
  }

}
