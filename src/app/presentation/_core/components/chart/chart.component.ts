import {
    AfterViewInit,
    Component,
    ElementRef,
    HostListener,
    Input,
    OnChanges,
    SimpleChanges,
    ViewChild,
} from "@angular/core";

export type NodeDescription = { label: string; value: number };
export type ChartData = Array<NodeDescription>;

@Component({
    selector: "app-chart",
    templateUrl: "./chart.component.html",
    styleUrls: ["./chart.component.scss"],
})
export class ChartComponent implements AfterViewInit, OnChanges {
    breakpoints = 5;
    maxInterval: number = 0;
    paneWidth: number = 0;
    paneHeight: number = 0;
    @Input("chart-data") data: ChartData = [];
yRangeLabels: { label: string; style: { bottom: string; }; }[] = [];
    constructor( ) {}

    get values(): NodeDescription[] {
        return this.data;
    }

    get intervalDetails(): {
        minInterval: number;
        maxInterval: number;
        intervalLength: number;
    } {
        const maxValue = Math.max(...this.values.map((it) => it.value));
        const minValue = Math.min(...this.values.map((it) => it.value));
        const _intervalLength = Number(
            ((maxValue - minValue) / this.breakpoints).toFixed(4)
        );
        const intervalLength =
            _intervalLength < 0.0001 ? 0.0001 : _intervalLength;
        const minInterval = minValue - intervalLength;
        const maxInterval = maxValue + intervalLength;

        return {
            minInterval,
            maxInterval,
            intervalLength,
        };
    }

    get yRange(): number[] {
        const { minInterval, intervalLength } = this.intervalDetails;
        const chartNumbers: number[] = [];
        let currentInterval = minInterval;
        for (let i = 0; i <= this.breakpoints + 2; i++) {
            chartNumbers.push(Number(currentInterval.toFixed(4)));
            currentInterval += intervalLength;
        }
        this.maxInterval = Number(
            (currentInterval - intervalLength).toFixed(4)
        );
        return chartNumbers;
    }

    calculatePercentage(value: number) {
        const max = this.yRange.at(-1) ?? 0;
        const min = this.yRange[0];
        return ((value - min) / (max - min)) * 100;
    }

     calculateYRangeLabels() {
        return this.yRange.splice(0, this.yRange.length - 1).map((it) => {
            return {
                label: it.toFixed(3),
                style: {
                    bottom: `${Number(
                        this.calculatePercentage(it).toFixed(4)
                    )}%`,
                },
            };
        });
    }

    calculateLine(x: number, y: number) {
        const adjacent = this.paneWidth;
        const opposite = (this.paneHeight * Math.abs(y - x)) / 100;
        const hypotenuse = Math.sqrt(adjacent ** 2 + opposite ** 2);
        const _theta = Math.atan(opposite / adjacent) * (180 / Math.PI);
        const theta = y - x > 0 ? -1 * _theta : _theta;
        return {
            hypotenuse: {
                left: "0",
                width: `${hypotenuse}px`,
                bottom: `${x}%`,
                "transform-origin": "center left",
                transform: `rotate(${theta}deg)`,
            },
        };
    }

    get points(): {
        label: string;
        line: any;
        value: number;
        percentage: number;
    }[] {
        return this.values.map((it, i) => ({
            ...it,
            percentage: Number(this.calculatePercentage(it.value).toFixed(4)),
            line: this.calculateLine(
                this.values[i - 1]?.value
                    ? Number(
                          this.calculatePercentage(
                              this.values[i - 1]?.value
                          ).toFixed(4)
                      )
                    : 0,
                Number(this.calculatePercentage(it.value).toFixed(4))
            ),
        }));
    }

    @ViewChild("chartItem")
    chartGridItem: ElementRef = {} as ElementRef;

    recalculateLines() {
        this.paneWidth = this.chartGridItem.nativeElement.offsetWidth;
        this.paneHeight = this.chartGridItem.nativeElement.offsetHeight;
    }

    recalculate() {
      this.calculateYRangeLabels();
    }

    ngAfterViewInit() {
        this.recalculateLines();
    }

    ngOnChanges(changes: SimpleChanges) {
        this.recalculateLines();
        this.recalculate();
    }

    @HostListener("window:resize")
    onResize() {
        this.recalculateLines();
    }
}
