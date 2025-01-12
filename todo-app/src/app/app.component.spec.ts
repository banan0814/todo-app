import { AppComponent } from './app.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        RouterTestingModule,
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should display the title in the toolbar', () => {
    const toolbarTitle = fixture.debugElement.query(By.css('mat-toolbar h1')).nativeElement.textContent;
    expect(toolbarTitle).toContain(component.title);
  });

  it('should toggle sidenav when menu button is clicked', () => {
    const sidenav = fixture.debugElement.query(By.css('mat-sidenav')).componentInstance;
    const toggleSpy = spyOn(sidenav, 'toggle');

    const menuButton = fixture.debugElement.query(By.css('[id=\"menu-button\"]')).nativeElement;
    menuButton.click();

    expect(toggleSpy).toHaveBeenCalled();
  });

  it('should close sidenav on navigation link click', () => {
    const sidenav = fixture.debugElement.query(By.css('mat-sidenav')).componentInstance;
    const toggleSpy = spyOn(sidenav, 'toggle');

    const navLinks = fixture.debugElement.queryAll(By.css('.nav-element'));
    navLinks.forEach((link) => {
      link.nativeElement.click();
    });

    expect(toggleSpy.calls.count()).toBe(navLinks.length);
  });
});
