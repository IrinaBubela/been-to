// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { ChartsComponent } from './charts.component';
// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

// describe('ChartsComponent', () => {
//   let component: ChartsComponent;
//   let fixture: ComponentFixture<ChartsComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ChartsComponent],
//       schemas: [CUSTOM_ELEMENTS_SCHEMA] // Required for <apx-chart> to avoid unknown element error
//     }).compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(ChartsComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges(); // Trigger initial data binding and lifecycle hooks
//   });

//   it('should create the component', () => {
//     expect(component).toBeTruthy(); // Ensures the component is created
//   });

//   it('should have correct chart series data', () => {
//     expect(component.chartSeries).toEqual([50, 145]); // Verifies the chart data
//   });

//   it('should have correct chart labels', () => {
//     expect(component.chartLabels).toEqual(['Visited Countries', 'Remaining Countries']); // Verifies the chart labels
//   });

//   it('should have correct chart options', () => {
//     expect(component.chartOptions.type).toBe('pie'); // Ensures that chart type is 'pie'
//     expect(component.chartOptions.height).toBe(350); // Ensures that chart height is 350
//   });

//   it('should have correct chart legend configuration', () => {
//     expect(component.chartLegend.position).toBe('top'); // Verifies legend position
//     expect(component.chartLegend.horizontalAlign).toBe('center'); // Verifies horizontal alignment
//     expect(component.chartLegend.floating).toBeFalse(); // Checks that legend is not floating
//     expect(component.chartLegend.fontSize).toBe('14px'); // Ensures correct font size
//     expect(component.chartLegend.offsetY).toBe(10); // Checks Y offset value
//   });

//   it('should render the chart component', () => {
//     const compiled = fixture.nativeElement as HTMLElement;
//     expect(compiled.querySelector('apx-chart')).toBeTruthy(); // Ensures that the <apx-chart> element is present
//   });
// });
