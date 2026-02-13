import { Component, DebugElement } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MenuItem, RgMainPageComponent } from "ng-redgrape-ui"
import { RgSideMenuComponent } from "../rg-side-menu/rg-side-menu.component";
import { By } from "@angular/platform-browser";


describe("RgMainPageComponent Tests", () => {
  let component : RgMainPageComponent;
  let fixture: ComponentFixture<RgMainPageComponent>;
  let debugElement: DebugElement;

  beforeEach(async ()=>{
    await TestBed.configureTestingModule({
      imports : [RgSideMenuComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(RgMainPageComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  })

  it('should set instance correctly', () =>{
    expect(component).not.toBeNull()
  })

  it("Should 'mobileView' be false at the beginning" , () => {
    expect(component.mobileView).toBeFalse();
  })

  it("Should 'sideMenuCollapsed' be false at the beginning" , () => {
    expect(component.sideMenuCollapsed).toBeFalse();
  })

  it("should 'menuItems' be empty", () => {
    expect(component.menuItems.length).toBe(0);
  })

  it('should sideMenuCollapsed toggle when call toggleSideMenu method' , () => {
    component.toggleSideMenu();
    expect(component.sideMenuCollapsed).toBeTrue();
  })

  it("should 'menuItems' has length 1 when add 1 item", () => {
    let menuItem = <MenuItem>{
      text : "sample test",
      children: [],
      expanded: false,
      icon: "icon path",
      link: "link",
      tag: {value: "sample"}
    };
    component.menuItems.push(menuItem);

    expect(component.menuItems.length).toBe(1)
  })

  it("shold page will correct render wehen change 'sideMenuCollapsed'" , () => {
    component.sideMenuCollapsed = true;
    fixture.detectChanges();
    let element = debugElement.query(By.css('.main-container'));
    expect(element.classes['menu-collapsed']).toBeTruthy();
    
  })
})