import {
    AfterViewInit,
    Component,
    ElementRef,
    HostListener,
    ViewChild,
} from "@angular/core";

type NodeDescription = { label: string; value: number };
type ChartData = Map<string, NodeDescription> | Map<number, NodeDescription>;

@Component({
    selector: "app-chart",
    templateUrl: "./chart.component.html",
    styleUrls: ["./chart.component.scss"],
})
export class ChartComponent implements AfterViewInit {
    breakpoints = 5;
    maxInterval: number = 0;
    paneWidth: number = 0;
    paneHeight: number = 0;
    data: ChartData = new Map<number, NodeDescription>([
        [1, { label: "January", value: 6 }],
        [2, { label: "February", value: 3 }],
        [3, { label: "March", value: 3 }],
        [4, { label: "April", value: 4 }],
        [5, { label: "June", value: 5 }],
        [6, { label: "July", value: 6 }],
    ]);

    get values(): NodeDescription[] {
        return Array.from(this.data.values());
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

    get yRangeLabels() {
        const max = this.yRange.at(-1) ?? 0;
        return this.yRange.splice(0, this.yRange.length - 1).map((it, i) => {
            return {
                label: it.toString(),
                style: {
                    bottom: `${Number(((i / max) * 100).toFixed(4))}%`,
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
        const maxNumber: number = this.yRange.at(-1) ?? 0;
        return this.values.map((it, i) => ({
            ...it,
            percentage: Number(((it.value / maxNumber) * 100).toFixed(4)),
            line: this.calculateLine(
                this.values[i - 1]?.value
                    ? Number(
                          (
                              (this.values[i - 1]?.value / maxNumber) *
                              100
                          ).toFixed(4)
                      )
                    : 0,
                Number(((it.value / maxNumber) * 100).toFixed(4))
            ),
        }));
    }

    @ViewChild("chartItem")
    chartGridItem: ElementRef = {} as ElementRef;

    ngAfterViewInit() {
        this.paneWidth = this.chartGridItem.nativeElement.offsetWidth;
        this.paneHeight = this.chartGridItem.nativeElement.offsetHeight;
    }

    @HostListener("window:resize")
    onResize() {
        this.paneWidth = this.chartGridItem.nativeElement.offsetWidth;
        this.paneHeight = this.chartGridItem.nativeElement.offsetHeight;
    }
}
